# Adestrat Certificate Registry - Apps Script

Servicio de emisión, consulta y revocación conectado al Google Sheet `ADESTRAT - Registro Maestro de Certificados`.

## Instalación

1. Abra el Google Sheet y seleccione **Extensiones > Apps Script**.
2. Sustituya `Code.gs` por el contenido de este directorio.
3. Cree el archivo HTML `Certificate` y pegue `Certificate.html`.
4. Ejecute `setupRegistry()` una sola vez y conserve la clave mostrada en el registro de ejecución. La función guarda internamente el ID de la hoja sin publicarlo en el código.
5. Implemente como **Aplicación web**, ejecutando como el propietario y permitiendo acceso a **Cualquiera**.
6. Copie la URL `/exec` del despliegue. Esa URL será la base de todos los QR.

## Implementación activa

`https://script.google.com/macros/s/AKfycbxJlfexeW8alQMkeBO6dYvdhIflyZE69XG86qyei5F1JRPwvzI0ioi---O3q4BrJKTL-g/exec`

La plantilla pública envía los datos por `POST`. El servicio valida la clave privada, genera el folio en el servidor, guarda el registro y devuelve la URL exacta que debe codificarse en el QR. Un folio no registrado muestra **Certificado no encontrado**; un registro revocado o alterado deja de mostrarse como vigente.

La clave de emisión no debe guardarse en GitHub ni escribirse dentro del HTML público. En la instalación de Adestrat se conserva únicamente en las propiedades privadas del script y en la pestaña privada `Config` del registro maestro.
