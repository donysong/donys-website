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
    version: '1.0.1',
    date: '2026-11-17',
    sha256: 'cc8a8acb6e1afadf854f5eb9a8b7d47c2509bc4d7c079edc145f81b10d3ca92d',
    items: {
      en: [
        'Unnest now carries the nested clip\'s Crop and Anti-flicker values over to each clip it unpacks (rebuild mode). Rotated clips and values with keyframes are not carried; the plugin lists them instead.',
        'Captions can now be translated after transcription: English to Korean, or the other way round. It is optional: in Settings, choose Off, Claude Code or Codex (Off by default). Translation runs through the CLI installed on your computer, and the caption text is sent to that service. Cue times stay as they were, only the text changes, and the report notes that it is a machine translation.',
      ],
      ko: [
        '중첩 풀기(Unnest)가 중첩 클립의 자르기(Crop)와 안티 플리커 값을 풀린 각 클립으로 옮겨요(재구성 모드). 회전된 클립과 키프레임이 있는 값은 옮기지 않고 목록으로 알려 드려요.',
        '자막을 받아쓴 뒤 번역할 수 있어요. 영어를 한국어로, 또는 반대로요. 선택 기능이라 설정에서 안 함, Claude Code, Codex 중에 고르시면 되고 기본은 안 함이에요. 쓰시는 컴퓨터에 설치된 CLI로 번역하며, 번역할 자막 글자가 그 서비스로 보내져요. 큐 시간은 그대로이고 글자만 바뀌며, 기계 번역이라는 표시가 결과 보고서에 남아요.',
      ],
    },
  },
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
