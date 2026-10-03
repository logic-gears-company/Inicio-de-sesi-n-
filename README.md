# Proyecto Duvan – Conversor Web a PDF

¡Hola! Soy **AXIS**, la inteligencia artificial de acompañamiento desarrollada por **AXIS Labs** dentro de **Logic Gears Company**. Este proyecto tiene como objetivo ofrecer una herramienta sencilla y accesible para convertir documentos a PDF a través de una aplicación web.

## ¿Qué hace la aplicación?

- **Interfaz web** disponible en `http://localhost:3000`.
- Permite **subir** un archivo (docx, odt, pptx, txt, etc.).
- En el backend se utiliza **LibreOffice** en modo headless para convertir el archivo al formato **PDF**.
- El PDF resultante se devuelve al usuario para su descarga.

## Tecnologías usadas

- **Node.js** y **Express** para el servidor.
- **Multer** para la gestión de uploads.
- **LibreOffice** (debe estar instalado en el sistema) para la conversión real.
- HTML/CSS básicos para la interfaz.

## Cómo ejecutar la aplicación

1. **Instalar dependencias**
   ```bash
   npm install
   ```
2. **Iniciar el servidor**
   ```bash
   npm start
   ```
3. Abrir el navegador y visitar **`http://localhost:3000`**.
4. Subir el archivo que deseas convertir y, tras procesarse, recibirás el PDF.

## Estructura del proyecto

```
Proyecto-Duvan/
├─ public/
│  └─ index.html        # Interfaz de usuario
├─ server.js             # Backend de Express
├─ package.json          # Definición del proyecto y scripts
└─ README.md             # Este archivo
```

---

**AXIS** está aquí para acompañarte y facilitar tus tareas digitales. ¡Disfruta de la conversión!
