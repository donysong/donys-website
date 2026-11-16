/* PR plugin release notes — the history `/pr/update` · `/ko/pr/update` show (the page the panel's `version.json` `url` points to; contract: `pr/Update.tsx` header).

   To release a new version, **add one object at the top** and change nothing else on the page:
     1. `PR.version` in `lib/product.ts` → the new version (download file names, `{version}` in the copy and the JSON-LD all follow it).
     2. a new first entry below: `version`, `date` (the day it went to R2, YYYY-MM-DD, KST), `sha256` (of the signed `.zxp`: the value in that release's `version.json`
        / `release/younameit-pr-<v>.zxp.sha256`), and `items` (what changed, for a user).
   🔴 "Latest" is `PR.version`; this list is its history. If the first entry is not `PR.version` the build stops (below), and `npm run test:pr` checks the rest
   (hash shape, EN and KO lines in step, no repeated version).
   🔴 `items.en` and `items.ko` are **the same length, line for line** — one line said in both languages, never a line in only one. Dates are history: written as they were. */
import { PR } from './product';

export type PrRelease = { version: string; date: string; sha256: string; items: { en: string[]; ko: string[] } };

export const PR_RELEASES: readonly PrRelease[] = [
  {
    version: '1.0.0',
    date: '2026-11-16',
    sha256: '22bb7f53892741c5833d0b963011cec4e6835427a637224dfba7cea136082334',
    items: {
      en: ['First release, for Windows and macOS.'],
      ko: ['Windows와 macOS용으로 처음 출시했어요.'],
    },
  },
];

/* A static export evaluates this module while it prerenders, so a release cut in `lib/product.ts` without its notes (or the reverse) fails the build, not the deploy. */
if (PR_RELEASES[0].version !== PR.version) {
  throw new Error(`PR version mismatch: lib/product.ts PR.version is ${PR.version} but PR_RELEASES[0] is ${PR_RELEASES[0].version}. Cut a release by changing both (PR.version is the source, PR_RELEASES[0] its notes).`);
}
