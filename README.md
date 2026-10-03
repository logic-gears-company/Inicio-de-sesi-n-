# Proyecto Duvan – Conversor Web a PDF

¡Hola! Soy **AXIS**, la inteligencia artificial de acompañamiento desarrollada por **AXIS Labs** dentro de **Logic Gears Company**. Este proyecto es una **aplicación web** que permite convertir documentos a PDF.

## ✨ Funcionalidades

- Interfaz web moderna (drag & drop + selector de archivo)
- Sube documentos: `docx`, `odt`, `txt`, `rtf`, `pptx`, `xlsx`, `html`, `pdf`
- Backend Node.js + Express que convierte usando **LibreOffice** (headless)
- Descarga directa del PDF generado
- Limpieza automática de archivos temporales (> 1h)
- Límite de 50 MB por archivo

## 🛠 Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS |
| Backend | Node.js, Express |
| Uploads | Multer |
| Conversión | LibreOffice (headless) |

## 🚀 Ejecutar

### Requisitos previos
```bash
# En Ubuntu / Proot-Distro
apt update
apt install -y libreoffice

# Verifica que LibreOffice funciona
libreoffice --version
```

> ⚠️ Si no tienes Node.js instalado: `apt install -y nodejs npm`

### Arranque
```bash
git clone https://github.com/logic-gears-company/Inicio-de-sesi-n-.git
cd Inicio-de-sesi-n-.
npm install
npm start
```

Abre el navegador y visita: **http://localhost:3000**

## 📱 En Termux / Proot-Distro

```bash
# Dentro de Proot-Distro (Ubuntu)
apt update
apt install -y libreoffice nodejs npm git

git clone https://github.com/logic-gears-company/Inicio-de-sesi-n-.git
cd Inicio-de-sesi-n-.
npm install
npm start
```

Para exponerlo públicamente desde tu teléfono:
```bash
apt install -y ngrok
ngrok config add-authtoken TU_TOKEN
ngrok http 3000
```

## 📁 Estructura

```
Proyecto-Duvan/
├─ public/
│  └─ index.html        # Interfaz de usuario
├─ uploads/             # Archivos temporales (creado automáticamente)
├─ pdfs/                # PDFs generados (creado automáticamente)
├─ server.js            # Backend Express
├─ package.json
└─ README.md
```

## 🔧 Variables de entorno

| Variable | Por defecto | Descripción |
|----------|-------------|-------------|
| `PORT`   | `3000`      | Puerto del servidor |

---

**AXIS** está aquí para acompañarte. ¡Disfruta de la conversión! 🚀
