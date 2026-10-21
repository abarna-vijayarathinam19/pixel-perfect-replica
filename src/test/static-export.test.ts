import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { exportStaticSite, staticRoutes } from '../../scripts/static-export.mjs';
import { shouldExportStatic } from '../../scripts/build-mode.mjs';

const roots: string[] = [];
afterEach(async () => { await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true }))); });

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'avenset-static-'));
  roots.push(root);
  const outputDir = path.join(root, 'dist');
  const clientDir = path.join(outputDir, 'client');
  const publicDir = path.join(root, 'public');
  await mkdir(path.join(clientDir, 'assets'), { recursive: true });
  await mkdir(path.join(outputDir, 'server'), { recursive: true });
  await mkdir(publicDir);
  await writeFile(path.join(clientDir, 'assets', 'app.js'), 'console.log("Avenset")');
  await writeFile(path.join(publicDir, 'robots.txt'), 'User-agent: *');
  for (const route of staticRoutes) {
    const directory = path.join(clientDir, route.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), '<html><body>Avenset</body></html>');
  }
  return { outputDir, clientDir, publicDir };
}

describe('FileZilla static export', () => {
  it('exports npm run build into dist even with inherited managed environment flags', () => {
    expect(shouldExportStatic({ npm_config_user_agent: 'npm/11.0.0 node/v22.0.0', LOVABLE_SANDBOX: '1', DEV_SERVER__PROJECT_PATH: '/project' })).toBe(true);
  });
  it('preserves server output for managed Lovable builds', () => {
    expect(shouldExportStatic({ npm_config_user_agent: 'bun/1.3.0', LOVABLE_SANDBOX: '1' })).toBe(false);
  });
  it('exports ordinary local builds into dist', () => {
    expect(shouldExportStatic({})).toBe(true);
  });
  it('also provides the generated homepage as a project-level index.html', async () => {
    const config = await fixture();
    const projectIndexFile = path.join(path.dirname(config.outputDir), 'index.html');
    await exportStaticSite({ ...config, projectIndexFile });
    expect(await readFile(projectIndexFile, 'utf8')).toBe(await readFile(path.join(config.outputDir, 'index.html'), 'utf8'));
  });
  it('produces index.html, public/ and assets/ directly inside dist without client/server folders', async () => {
    const config = await fixture();
    await exportStaticSite(config);
    const entries = await readdir(config.outputDir);
    expect(entries).toEqual(expect.arrayContaining(['index.html', 'public', 'assets']));
    expect(entries).not.toContain('client');
    expect(entries).not.toContain('server');
    expect(await readFile(path.join(config.outputDir, 'assets/app.js'), 'utf8')).toContain('Avenset');
    expect(await readFile(path.join(config.outputDir, 'public/robots.txt'), 'utf8')).toBe('User-agent: *');
  });
  it('keeps static documents for all seven existing pages', async () => {
    const config = await fixture();
    await exportStaticSite(config);
    for (const route of ['/', '/about', '/product', '/book', '/contact', '/privacy', '/terms']) {
      expect(await readFile(path.join(config.outputDir, route.slice(1), 'index.html'), 'utf8')).toContain('Avenset');
    }
  });
  it('does not destroy the existing output when prerendering omitted a page', async () => {
    const config = await fixture();
    await rm(path.join(config.clientDir, 'about/index.html'));
    await expect(exportStaticSite(config)).rejects.toThrow();
    expect(await readdir(config.outputDir)).toContain('server');
  });
});