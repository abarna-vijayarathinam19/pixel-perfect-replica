export const staticRoutes: readonly string[];
export function exportStaticSite(options: {
  clientDir: string;
  publicDir: string;
  outputDir: string;
  projectIndexFile?: string;
}): Promise<void>;