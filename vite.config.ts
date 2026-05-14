import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import fs from 'fs';
import https from 'https';

// Safeguard download of custom favicon
async function ensureFavicon() {
  try {
    const destDir = path.resolve(__dirname, 'public');
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const pngPath = path.join(destDir, 'favicon.png');
    const icoPath = path.join(destDir, 'favicon.ico');
    const imageUrl = 'https://i.ibb.co/n8RTvYqD/Blue-and-White-Circle-Surfing-Club-Logo-2.png';

    const downloadAndSave = async (url: string): Promise<Buffer> => {
      if (typeof fetch === 'function') {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const arr = await res.arrayBuffer();
        return Buffer.from(arr);
      } else {
        return new Promise((resolve, reject) => {
          const fetchUrl = (currentUrl: string) => {
            https.get(currentUrl, (res) => {
              if (res.statusCode === 301 || res.statusCode === 302) {
                fetchUrl(res.headers.location || '');
              } else if (res.statusCode === 200) {
                const chunks: any[] = [];
                res.on('data', (chunk) => chunks.push(chunk));
                res.on('end', () => resolve(Buffer.concat(chunks)));
                res.on('error', reject);
              } else {
                reject(new Error(`HTTP ${res.statusCode}`));
              }
            }).on('error', reject);
          };
          fetchUrl(url);
        });
      }
    };

    const buffer = await downloadAndSave(imageUrl);
    if (buffer && buffer.length > 0) {
      fs.writeFileSync(pngPath, buffer);
      fs.writeFileSync(icoPath, buffer);
      console.log(`[Favicon] Successfully downloaded and saved favicon.png and favicon.ico. Size: ${buffer.length} bytes`);
    } else {
      console.error('[Favicon] Downloaded buffer is empty.');
    }
  } catch (e) {
    console.error('[Favicon] Failed downloading favicon:', e);
  }
}

export default defineConfig(async ({mode}) => {
  await ensureFavicon();
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
