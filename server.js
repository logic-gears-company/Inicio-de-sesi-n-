const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { execFile, execFileSync } = require('child_process');

const app = express();
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'pdfs');

// Crear carpetas si no existen
[uploadDir, outputDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Borrar archivos antiguos de más de 1 hora cada 5 minutos
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  [uploadDir, outputDir].forEach(dir => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.mtimeMs < oneHourAgo) fs.unlinkSync(filePath);
    });
  });
}, 5 * 60 * 1000);

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^\w.\-]/g, '_');
    cb(null, Date.now() + '-' + safeName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB máx
  fileFilter: (req, file, cb) => {
    const allowed = /\.(docx?|odt|txt|rtf|pptx?|xlsx?|html?|pdf)$/i;
    if (allowed.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Formato no soportado. Aceptado: docx, odt, txt, rtf, pptx, xlsx, html, pdf'), false);
    }
  }
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para convertir archivo a PDF
app.post('/convert', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

  const inputPath = req.file.path;
  const baseName = req.file.originalname.replace(/\.[^/.]+$/, '');
  const outputName = baseName + '.pdf';
  const outputPath = path.join(outputDir, outputName);

  // Buscar libreoffice en varias rutas posibles
  const possiblePaths = ['libreoffice', 'soffice', '/usr/bin/libreoffice', '/usr/bin/soffice'];
  let found = null;
  for (const p of possiblePaths) {
    try {
      execFileSync('which', [p]);
      found = p;
      break;
    } catch { continue; }
  }
  if (!found) {
    fs.unlinkSync(inputPath);
    return res.status(500).json({
      error: 'LibreOffice no está instalado',
      detail: 'Instálalo con: apt install -y libreoffice'
    });
  }

  const cmd = found;
  const args = ['--headless', '--convert-to', 'pdf', '--outdir', outputDir, inputPath];
  const env = { ...process.env, HOME: '/tmp', USERPROFILE: '/tmp' };

  console.log(`Conviertiendo: ${inputPath} → ${outputDir}`);

  execFile(cmd, args, { timeout: 120000, env }, (error, stdout, stderr) => {
    if (error) {
      console.error('Conversión fallida:', error.message);
      console.error('Stderr:', stderr);
      fs.unlinkSync(inputPath);
      return res.status(500).json({
        error: 'La conversión falló',
        detail: stderr || error.message
      });
    }

    // Buscar el PDF generado (puede tener un nombre ligeramente distinto)
    const pdfFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.pdf'));
    const targetPdf = pdfFiles.find(f => f.includes(baseName)) || pdfFiles[pdfFiles.length - 1];

    if (targetPdf) {
      fs.unlinkSync(inputPath);
      return res.json({
        success: true,
        fileName: targetPdf,
        downloadUrl: `/pdfs/${encodeURIComponent(targetPdf)}`
      });
    }

    fs.unlinkSync(inputPath);
    return res.status(500).json({ error: 'El PDF no se generó correctamente' });
  });
});

// Ruta para servir PDFs generados
app.use('/pdfs', express.static(outputDir));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Duvan server listening on http://localhost:${PORT}`);
});
