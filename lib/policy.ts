/* 개정 방침·약관의 시행일 — 한 곳. 고지 띠(`components/PolicyNotice.tsx`)·시행 예정본 페이지·deployCheck `[policy]` 가 여기서 읽는다.
   🔴 방침 제16조·약관 제4조가 *"시행 7일 전부터 이 사이트에 알린다"* 고 약속한다 — 시행일은 **고지가 사이트에 실제로 뜬 날 + 7일 이후**여야 한다.
      고지 배포가 늦어지면 이 한 줄만 늦춘다(고지문·시행 예정본·점검이 같이 따라온다).
   🔴 이 날짜 전에는 새 방침이 현재 판이 아니다 → 이메일을 받는 폼(무료 다운로드)을 배포하지 마라. `npm run deploy` 의 deployCheck 가 막는다. */
export const POLICY_EFFECTIVE = '2026-10-22';

const [Y, M, D] = POLICY_EFFECTIVE.split('-').map(Number);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** 사람이 읽는 시행일 — 국문 `2026년 10월 22일` · 영문 `October 22, 2026`. */
export const policyDate = (lang: 'en' | 'ko') => (lang === 'ko' ? `${Y}년 ${M}월 ${D}일` : `${MONTHS[M - 1]} ${D}, ${Y}`);
