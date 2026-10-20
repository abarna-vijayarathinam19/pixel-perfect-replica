export const staticRoutes: readonly string[];
export function exportStaticSite(options: {
  clientDir: string;
  publicDir: string;
  outputDir: string;
}): Promise<void>;