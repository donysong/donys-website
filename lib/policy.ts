/* 개정 방침·약관의 시행일 — 한 곳. 법 면의 헤더·부칙·방침 제16조와 deployCheck `[policy]` 가 여기서 읽는다.
   🔴 방침 제16조·약관 제4조가 *"시행 7일 전부터 이 사이트에 알린다"* 고 약속한다 — 시행일은 **고지가 사이트에 실제로 뜬 날 + 7일 이후**여야 한다.
      기간을 센다면 고지한 날은 빼는 쪽이 보수적이다(2026-10-15 오너 판정: 오늘 고지 → 8일째인 10-23 시행).
   🔴 이 날짜 전에는 새 방침이 현재 판이 아니다 → 이메일을 받는 폼(무료 다운로드)을 배포하지 마라. `npm run deploy` 의 deployCheck 가 막는다.

   두 번째 개정 = 동의 기반 방문 통계(Google Analytics, 2026-10-20 오너 승인 — 설계서 ANALYTICS_PLAN §12). 그 시행일은 `lib/analytics.ts` 의 `ANALYTICS_EFFECTIVE` 이고
   (켜는 날과 같다), 이 파일이 사람이 읽는 꼴(`analyticsDate`)을 낸다.
   → **시행됨**(2026-10-31, 07957ae 에서 `GTM_ID` 채움): 방침 본문의 `rev` = `ANALYTICS_ON`.
     아래 PR 개정과는 상수·deployCheck 갈래가 따로다(분석 = `lib/analytics.ts`, PR = 이 파일의 `PR_*`). 섞지 마라.

   세 번째 개정 = You Name It PR Plugin 을 약관·방침·환불 정책에 더했다. 초안 = PR 플러그인 repo `gtm/legal/*-additions.md`(⚖️ 전문가 검토 전).
   2026-11-07 오너 판정(PR repo PRD §14 "출시 재계획"): 11-07 고지 → 11-14 시행, Pro 결제는 시행일부터 연다(11-10 오너 판정: 사전예약이 아니라 정식 판매 — 약관 제14조의2 사전예약 조항은 쓰이지 않는다).
   🔴 셈법: 약관 제4조 ② "시행일 7일 전부터 게시" 를 시행일에서 거꾸로 센 날이 게시일이다(11-14 의 7일 전 = 11-07).
      위 10-15 판정(고지한 날을 빼고 8일째)으로 세면 11-15 다 — 어느 쪽인지는 PR repo `gtm/legal/README.md` 의 ⚖️ 질문이다.
   → **시행됨**(2026-11-14): PR_IN_FORCE = true. 고지 띠(`components/PolicyNotice.tsx`)·예정본 6장(`/…/{terms,privacy,refund}/upcoming`)·
     법 본문의 옛 갈래(`{pr ? 새 : 옛}`)와 `view` 를 이 시행 커밋에서 지웠다 — 법 면은 개정본 한 벌이다.
     PR_IN_FORCE 는 이제 deployCheck `[policy]` 만 읽는다: 현재 판이 PR 시행일을 말하는지 보고, 시행일(KST) 전 `--release` 배포를 막는다.
   다음 개정에 고지 단계(띠 + noindex 예정본 + 본문 `view`)가 필요하면 3d9f4c8(feat(legal): PR Plugin 개정 예정 안내)을 되살린다. */
import { ANALYTICS_EFFECTIVE } from './analytics';

export const POLICY_EFFECTIVE = '2026-10-23';

export const PR_POSTED = '2026-11-07';
export const PR_EFFECTIVE = '2026-11-14';
export const PR_IN_FORCE: boolean = true;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** `YYYY-MM-DD` → 국문 `2026년 10월 23일` · 영문 `October 23, 2026`. 법 면이 `PR.preorderDeadline` 같은 날짜도 이걸로 쓴다. */
export function human(iso: string, lang: 'en' | 'ko'): string {
  const [Y, M, D] = iso.split('-').map(Number);
  return lang === 'ko' ? `${Y}년 ${M}월 ${D}일` : `${MONTHS[M - 1]} ${D}, ${Y}`;
}

/** 사람이 읽는 시행일 — 국문 `2026년 10월 23일` · 영문 `October 23, 2026`. */
export const policyDate = (lang: 'en' | 'ko') => human(POLICY_EFFECTIVE, lang);

/** 동의 기반 방문 통계 조항의 시행일(= 분석을 켜는 첫 날). 고지 단계 전(상수가 빔)에는 부르면 안 된다. */
export function analyticsDate(lang: 'en' | 'ko'): string {
  if (!ANALYTICS_EFFECTIVE) throw new Error('ANALYTICS_EFFECTIVE 가 비어 있다 — 고지 단계에서만 시행일을 쓴다');
  return human(ANALYTICS_EFFECTIVE, lang);
}

/** PR Plugin 개정의 시행일 · 게시일 — 국문 `2026년 11월 14일` · 영문 `November 14, 2026`. */
export const prDate = (lang: 'en' | 'ko') => human(PR_EFFECTIVE, lang);
export const prPostedDate = (lang: 'en' | 'ko') => human(PR_POSTED, lang);
