import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import fs from 'fs';
import https from 'https';

// Safeguard download of custom favicon
try {
  const destDir = path.resolve(__dirname, 'public');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const destPath = path.join(destDir, 'favicon.png');
  const imageUrl = 'https://i.ibb.co/n8RTvYqD/Blue-and-White-Circle-Surfing-Club-Logo-2.png';
  
  https.get(imageUrl, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
      https.get(response.headers.location || '', (redirectResponse) => {
        const file = fs.createWriteStream(destPath);
        redirectResponse.pipe(file);
      });
    } else {
      const file = fs.createWriteStream(destPath);
      response.pipe(file);
    }
  }).on('error', (err) => {
    console.error('Error downloading favicon:', err);
  });
} catch (e) {
  console.error('Failed executing favicon download:', e);
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
