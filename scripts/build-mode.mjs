// An explicit npm build always produces the requested static upload folder,
// even when the terminal inherits Lovable's environment variables.
export function shouldExportStatic(env) {
  if (env.npm_config_user_agent?.startsWith('npm/')) return true;
  return env.LOVABLE_SANDBOX !== '1' && !env.DEV_SERVER__PROJECT_PATH;
}