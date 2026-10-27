import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import firebaseConfig from './firebase-applet-config.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Endpoint de verificación de estado y backend
  app.get('/api/status', (_req, res) => {
    res.json({
      status: 'online',
      service: 'Observatorio y Simulador de Mercado UMSS - Acreditación ARCU-SUR',
      backend: 'Node.js + Express',
      database: 'Firebase Firestore Persistente',
      projectId: firebaseConfig.projectId,
      timestamp: new Date().toISOString()
    });
  });

  // Configuración de Vite o archivos estáticos
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Node.js Express activo en el puerto ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error al iniciar el servidor backend:', err);
});
