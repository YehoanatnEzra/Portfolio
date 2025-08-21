import fs from 'fs';
import { cp } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const photosSrc = path.join(root, 'photos');
const pdfSrc = path.join(root, 'Yehonatan_Ezra.pdf');

async function run() {
  try {
    if (fs.existsSync(photosSrc)) {
      await cp(photosSrc, path.join(dist, 'photos'), { recursive: true });
      console.log('Copied photos/ to dist/photos/');
    } else {
      console.log('No photos/ directory found.');
    }

    if (fs.existsSync(pdfSrc)) {
      await cp(pdfSrc, path.join(dist, 'Yehonatan_Ezra.pdf'));
      console.log('Copied Yehonatan_Ezra.pdf to dist/');
    } else {
      console.log('No Yehonatan_Ezra.pdf found.');
    }

    const indexPath = path.join(dist, 'index.html');
    const fallbackPath = path.join(dist, '404.html');
    if (fs.existsSync(indexPath)) {
      await cp(indexPath, fallbackPath);
      console.log('Created dist/404.html from dist/index.html');
    }

    console.log('Postbuild asset copy finished.');
  } catch (err) {
    console.error('Error copying assets:', err);
    process.exit(1);
  }
}

run();
