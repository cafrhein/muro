# Adestrat Certificate Registry - Apps Script

Servicio de emisión, consulta y revocación conectado al Google Sheet `ADESTRAT - Registro Maestro de Certificados`.

## Instalación

1. Abra el Google Sheet y seleccione **Extensiones > Apps Script**.
2. Sustituya `Code.gs` por el contenido de este directorio.
3. Cree el archivo HTML `Certificate` y pegue `Certificate.html`.
4. Ejecute `setupRegistry()` una sola vez y conserve la clave mostrada en el registro de ejecución. La función guarda internamente el ID de la hoja sin publicarlo en el código.
5. Implemente como **Aplicación web**, ejecutando como el propietario y permitiendo acceso a cualquier persona que tenga el enlace.
6. Copie la URL `/exec` del despliegue. Esa URL será la base de todos los QR.

La clave de emisión no debe guardarse en GitHub ni escribirse dentro del HTML público.
