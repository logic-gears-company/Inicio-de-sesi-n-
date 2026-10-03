const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'pdfs');

// Crear carpetas si no existen
[uploadDir, outputDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para convertir archivo a PDF
app.post('/convert', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const inputPath = req.file.path;
  const baseName = req.file.originalname.replace(/\.[^/.]+$/, '');
  const outputName = baseName + '.pdf';
  const outputPath = path.join(outputDir, outputName);

  const cmd = `libreoffice --headless --convert-to pdf --outdir ${outputDir} ${inputPath}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Conversion failed', stderr });
      return;
    }

    // Eliminar el archivo original
    fs.unlinkSync(inputPath);

    res.json({ success: true, fileName: outputName, downloadUrl: `/pdfs/${outputName}` });
  });
});

// Ruta para servir PDFs generados
app.use('/pdfs', express.static(outputDir));

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Duvan server listening on http://localhost:${PORT}`);
});
