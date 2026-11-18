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
    version: '1.0.2',
    date: '2026-11-18',
    sha256: 'c51705ac410e2b57c1e03210b83049db3c3f9712bda1263187f91376d7eae6c9',
    items: {
      en: [
        'Silence cut no longer stops at its first cut when Sync Lock is turned off on the sequence\'s tracks. In 1.0.0 and 1.0.1 it stopped there. It works on a copy, so your original sequence was not changed.',
        'On a Mac, your API keys (ElevenLabs, GIPHY, Pexels, Freesound) are now kept in the macOS Keychain, next to the Chat keys that were already there. A key saved by an earlier version moves there the first time the plugin looks for it, and the old file is removed only after the Keychain returns the same key. If macOS denies access to the Keychain, the panel says so and what to do (code E-KEYCHAIN). On Windows nothing changed: keys are still encrypted with Windows\' per-user encryption.',
        'Audio tracks are now judged by what the ffmpeg in use can decode, including an ffmpeg you set in Settings. A file with one audio track that ffmpeg cannot decode (iPhone spatial audio or AC-4, for example) next to one it can is no longer skipped by Captions and Silence cut as having several audio streams; the plugin uses the track it can read. Project collect copies such a file whole, and its report says why, so the track is not lost.',
        'The wording in the panels is shorter and clearer. Only the words changed.',
      ],
      ko: [
        '시퀀스 트랙의 동기화 잠금(Sync Lock)을 끈 상태에서 무음 컷이 첫 컷에서 멈추던 문제를 고쳤어요. 1.0.0과 1.0.1에서는 거기서 멈췄어요. 무음 컷은 복제본에서 일하기 때문에 원래 시퀀스는 바뀌지 않았어요.',
        'Mac에서 API 키(ElevenLabs, GIPHY, Pexels, Freesound)를 macOS 키체인에 저장해요. Chat 키는 이미 거기에 있었어요. 이전 버전에서 저장한 키는 플러그인이 처음 찾을 때 키체인으로 옮겨지고, 키체인이 같은 키를 돌려준 뒤에야 옛 파일을 지워요. macOS가 키체인 접근을 거부하면 패널이 그렇게 알리고 할 일을 안내해요(코드 E-KEYCHAIN). Windows는 그대로예요. 키는 Windows의 사용자별 암호화로 저장해요.',
        '쓰고 있는 ffmpeg(설정에서 직접 지정한 ffmpeg 포함)가 실제로 읽을 수 있는 오디오 트랙인지 확인해요. 읽을 수 없는 트랙(예: iPhone 공간 오디오, AC-4)과 읽을 수 있는 트랙이 함께 든 파일을 자막과 무음 컷이 "오디오 스트림이 여러 개"라며 건너뛰던 것을 고쳤고, 이제 읽을 수 있는 트랙을 써요. 프로젝트 수집은 이런 파일을 통째로 복사하고 이유를 보고서에 적어서 그 트랙을 잃지 않게 해요.',
        '패널 문구를 더 짧고 분명하게 다듬었어요. 바뀐 것은 문구뿐이에요.',
      ],
    },
  },
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
