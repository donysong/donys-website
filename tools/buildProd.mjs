// Production build: `npm run build` with the asset host set (next.config.ts `assetPrefix` explains why: younameit.works is served from LAX in Korea,
// the project's pages.dev address from ICN). Used by `npm run deploy`; a local or preview build stays on the same origin.
import { spawnSync } from 'node:child_process';

export const ASSET_HOST = 'https://younameit.pages.dev';
const r = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', shell: true, env: { ...process.env, YNI_ASSET_PREFIX: ASSET_HOST } });
process.exit(r.status ?? 1);
