import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { exportStaticSite } from './static-export.mjs';

const result = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build'], {
  stdio: 'inherit',
  env: process.env,
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

// Lovable publishing needs its original server/client output. Local npm builds
// instead package the prerendered browser output for ordinary static hosting.
const managedBuild = process.env.LOVABLE_SANDBOX === '1' || Boolean(process.env.DEV_SERVER__PROJECT_PATH);
if (!managedBuild) {
  const clientDir = ['dist/client', '.output/public'].find((directory) =>
    existsSync(path.join(directory, 'index.html')),
  );
  if (!clientDir) throw new Error('No prerendered index.html found. Static export was not produced.');
  await exportStaticSite({ clientDir, publicDir: 'public', outputDir: 'dist' });
  console.log('Static upload ready: dist/index.html, dist/assets/, dist/public/, and all page directories.');
  console.warn('Static hosting cannot execute the contact form server function. Keep a hosted service for contact submissions.');
}