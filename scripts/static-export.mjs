import { cp, mkdir, readdir, readFile, rename, rm, stat } from 'node:fs/promises';
import path from 'node:path';

export const staticRoutes = ['/', '/about', '/product', '/book', '/contact', '/privacy', '/terms'];

export async function exportStaticSite({ clientDir, publicDir, outputDir, projectIndexFile }) {
  const source = path.resolve(clientDir);
  const destination = path.resolve(outputDir);
  if (source === destination) throw new Error('Static export requires a separate client source directory.');
  // Validate every page before replacing any existing upload folder.
  for (const route of staticRoutes) {
    const file = path.join(source, route.slice(1), 'index.html');
    const html = await readFile(file, 'utf8');
    if (!/<html[\s>]/i.test(html) || !/<\/html>/i.test(html)) {
      throw new Error(`Missing complete prerendered document for ${route}`);
    }
  }
  const assets = await stat(path.join(source, 'assets'));
  if (!assets.isDirectory()) throw new Error('The build is missing its assets directory.');
  const staging = `${destination}.static-staging`;
  await rm(staging, { recursive: true, force: true });
  await mkdir(staging, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    // Publish only browser files, never server bundles or hosting metadata.
    if (entry.name.startsWith('.') || ['server', 'client', '_worker.js', 'wrangler.json', 'wrangler.jsonc'].includes(entry.name)) continue;
    await cp(path.join(source, entry.name), path.join(staging, entry.name), { recursive: true });
  }
  await mkdir(path.join(staging, 'public'), { recursive: true });
  await cp(publicDir, path.join(staging, 'public'), { recursive: true });
  // Vite's root copies remain in place: /favicon.ico and /robots.txt still resolve.
  await rm(destination, { recursive: true, force: true });
  await rename(staging, destination);
  if (projectIndexFile) {
    // The root copy is provided for inspection; dist remains the upload folder.
    await cp(path.join(destination, 'index.html'), projectIndexFile);
  }
}