const SHEET_NAME = 'Certificates';
const ISSUER = 'Adestrat';
const TIMEZONE = 'America/Mexico_City';

function doGet(e) {
  const folio = clean_(e && e.parameter && e.parameter.folio);
  const template = HtmlService.createTemplateFromFile('Certificate');
  template.record = folio ? findCertificate_(folio) : null;
  template.requestedFolio = folio;
  template.issuer = ISSUER;
  return template.evaluate()
    .setTitle(folio ? `Certificado ${folio}` : 'Verificación de certificados - Adestrat')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const action = clean_(payload.action || 'register').toLowerCase();
    validateIssuerSecret_(payload.issuer_secret);
    const result = action === 'revoke' ? revokeCertificate_(payload) : registerCertificate_(payload);
    return responsePage_(result, true);
  } catch (error) {
    return responsePage_({error: error.message || String(error)}, false);
  }
}

function setupRegistry() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Ejecute setupRegistry() desde el Apps Script vinculado al Google Sheet del registro.');
  const bytes = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
  PropertiesService.getScriptProperties().setProperties({
    ISSUER_SECRET: bytes,
    SPREADSHEET_ID: spreadsheet.getId()
  });
  console.log(`ISSUER_SECRET=${bytes}`);
  return bytes;
}

function registerCertificate_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const required = ['participant_name', 'course_name', 'completion_date', 'duration', 'instructor_name'];
    required.forEach(key => {
      if (!clean_(payload[key])) throw new Error(`Falta el campo obligatorio: ${key}`);
    });

    const sheet = getCertificateSheet_();
    const folio = generateFolio_(sheet);
    const issuedAt = new Date();
    const webAppUrl = ScriptApp.getService().getUrl();
    if (!webAppUrl) throw new Error('El Apps Script aún no está desplegado como aplicación web.');
    const certificateUrl = `${webAppUrl}?folio=${encodeURIComponent(folio)}`;

    const record = {
      Folio: folio,
      Status: 'ACTIVE',
      Participant_Name: clean_(payload.participant_name),
      Course_Name: clean_(payload.course_name),
      Completion_Date: clean_(payload.completion_date),
      Duration: clean_(payload.duration),
      Instructor_Name: clean_(payload.instructor_name),
      Instructor_Role: clean_(payload.instructor_role || 'Instructor - Adestrat'),
      Skills: clean_(payload.skills),
      Statement: clean_(payload.statement),
      Created_At: issuedAt,
      Issued_At: issuedAt,
      Revoked_At: '',
      Revocation_Reason: '',
      Certificate_URL: certificateUrl,
      QR_URL: certificateUrl,
      Record_Hash: ''
    };
    record.Record_Hash = hashRecord_(record);
    appendRecord_(sheet, record);
    return {folio, certificate_url: certificateUrl, status: 'ACTIVE'};
  } finally {
    lock.releaseLock();
  }
}

function revokeCertificate_(payload) {
  const folio = clean_(payload.folio);
  const reason = clean_(payload.reason);
  if (!folio || !reason) throw new Error('Para revocar se requieren folio y motivo.');
  const sheet = getCertificateSheet_();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const folioCol = headers.indexOf('Folio');
  const statusCol = headers.indexOf('Status');
  const revokedAtCol = headers.indexOf('Revoked_At');
  const reasonCol = headers.indexOf('Revocation_Reason');
  for (let row = 1; row < data.length; row++) {
    if (String(data[row][folioCol]).trim() === folio) {
      sheet.getRange(row + 1, statusCol + 1).setValue('REVOKED');
      sheet.getRange(row + 1, revokedAtCol + 1).setValue(new Date());
      sheet.getRange(row + 1, reasonCol + 1).setValue(reason);
      return {folio, status: 'REVOKED'};
    }
  }
  throw new Error('El folio no existe.');
}

function findCertificate_(folio) {
  const sheet = getCertificateSheet_();
  const values = sheet.getDataRange().getDisplayValues();
  if (!values.length) return null;
  const headers = values[0];
  const folioCol = headers.indexOf('Folio');
  for (let row = 1; row < values.length; row++) {
    if (values[row][folioCol] === folio) {
      const record = {};
      headers.forEach((header, col) => record[header] = values[row][col]);
      record.Hash_Valid = record.Status === 'REVOKED' || record.Record_Hash === hashRecord_(record);
      return record;
    }
  }
  return null;
}

function appendRecord_(sheet, record) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map(header => record[header] === undefined ? '' : record[header]));
}

function generateFolio_(sheet) {
  const date = Utilities.formatDate(new Date(), TIMEZONE, 'yyyyMMdd');
  for (let attempt = 0; attempt < 20; attempt++) {
    const random = Utilities.getUuid().replace(/-/g, '').substring(0, 12).toUpperCase();
    const folio = `AD-${date}-${random.substring(0, 4)}-${random.substring(4, 8)}-${random.substring(8, 12)}`;
    if (!findFolioInSheet_(sheet, folio)) return folio;
  }
  throw new Error('No fue posible generar un folio único.');
}

function findFolioInSheet_(sheet, folio) {
  if (sheet.getLastRow() < 2) return false;
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(folio).matchEntireCell(true).findNext() !== null;
}

function hashRecord_(record) {
  const fields = ['Folio','Participant_Name','Course_Name','Completion_Date','Duration','Instructor_Name','Instructor_Role','Skills','Statement'];
  const canonical = fields.map(key => `${key}=${clean_(record[key])}`).join('|');
  const secret = PropertiesService.getScriptProperties().getProperty('ISSUER_SECRET') || '';
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, canonical + '|' + secret, Utilities.Charset.UTF_8);
  return digest.map(byte => (byte < 0 ? byte + 256 : byte).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function validateIssuerSecret_(provided) {
  const expected = PropertiesService.getScriptProperties().getProperty('ISSUER_SECRET');
  if (!expected) throw new Error('El servicio no ha sido inicializado. Ejecute setupIssuerSecret().');
  if (clean_(provided) !== expected) throw new Error('Clave de emisión incorrecta.');
}

function getCertificateSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) throw new Error('El servicio no ha sido configurado. Ejecute setupRegistry().');
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`No existe la pestaña ${SHEET_NAME}.`);
  return sheet;
}

function parsePayload_(e) {
  if (!e || !e.postData) return {};
  const type = String(e.postData.type || '').toLowerCase();
  if (type.indexOf('application/json') >= 0) return JSON.parse(e.postData.contents || '{}');
  return e.parameter || {};
}

function responsePage_(result, success) {
  const safe = JSON.stringify({type:'adestrat-certificate-registration', success, ...result}).replace(/</g, '\\u003c');
  const title = success ? 'Certificado registrado' : 'No fue posible registrar el certificado';
  const detail = success ? `Folio: ${result.folio}` : result.error;
  return HtmlService.createHtmlOutput(`<!doctype html><html lang="es"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Arial,sans-serif;padding:32px;color:#17241f}h1{color:#0a3a2d}.card{max-width:560px;margin:auto;border:1px solid #d5ddda;padding:28px;border-radius:10px}</style></head><body><div class="card"><h1>${escapeHtml_(title)}</h1><p>${escapeHtml_(detail || '')}</p></div><script>const result=${safe};if(window.opener)window.opener.postMessage(result,'*');</script></body></html>`)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function clean_(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

function escapeHtml_(value) {
  return clean_(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
