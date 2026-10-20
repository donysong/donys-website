/* 개정 예정 안내 띠 — 개인정보 처리방침 개정(동의 기반 방문 통계)을 시행 7일 전부터 알린다(방침 제16조). 설계 = 플러그인 repo ANALYTICS_PLAN §12 ①.
   방식: **현재 판은 시행일까지 그대로 효력이 있고 그대로 보인다.** 그 위에 이 띠가 시행일과 바뀌는 점을 알리고 개정 예정본(`/…/privacy/upcoming`)으로 잇는다.
   예정본 페이지는 같은 띠를 반대 방향(현재 판으로)으로 달고 noindex 다. 시행일 = `lib/analytics.ts` 의 `ANALYTICS_EFFECTIVE`(`lib/policy.ts` 가 사람이 읽는 꼴로 낸다).
   🔴 문구의 핵심은 **"동의하신 경우에만 · 거부하면 달라지는 것 없음"** 이다 — 불리한 변경이 아니라는 논거(7일 고지)가 이 문장에 있다. 고칠 때 이 두 말을 빼지 마라.
   🔴 분석을 켜는 날(`GTM_ID` 채움) 개정본이 현재 판 자리로 들어가면 띠와 `upcoming` 페이지는 같이 지운다 — deployCheck `[policy]` 가 남은 것을 잡는다. */
import { analyticsDate } from '@/lib/policy';

type Lang = 'en' | 'ko';

/* 문장은 조사까지 통째로 적는다 — "은(는)" 같은 조합 문장을 만들지 않으려고 표를 펼쳤다. */
const T = {
  ko: {
    cur: (d: string) => `이 개인정보 처리방침은 ${d}에 개정됩니다. 동의하신 경우에만 Google Tag Manager·Google Analytics 4(Google LLC, 미국)로 방문 통계를 내는 내용이 더해집니다. 동의하지 않으시면 달라지는 것이 없고, 지금처럼 쿠키 없는 통계(Cloudflare Web Analytics)만 작동합니다. 개정 방침이 시행되기 전까지는 지금 보시는 방침이 그대로 적용됩니다.`,
    up: (d: string) => `이 방침은 ${d}부터 적용됩니다. 그날까지는 현재 방침이 적용됩니다.`,
    links: ['개정 예정 방침 보기', '현재 방침 보기'],
    labels: ['개정 예정 안내', '시행 예정본'],
  },
  en: {
    cur: (d: string) => `This Privacy Policy will be revised on ${d}. The revision adds visit statistics through Google Tag Manager and Google Analytics 4 (Google LLC, United States) — only if you consent. If you do not, nothing changes: only Cloudflare’s cookieless analytics keep running. The policy on this page stays in force until the revised one takes effect.`,
    up: (d: string) => `This policy applies from ${d}. Until then the current policy applies.`,
    links: ['Read the revised policy', 'Read the current policy'],
    labels: ['Notice of upcoming change', 'Not yet in force'],
  },
} as const;

export default function PolicyNotice({ lang, view }: { lang: Lang; view: 'current' | 'upcoming' }) {
  const i = view === 'current' ? 0 : 1;
  const t = T[lang];
  const label = t.labels[i];
  const body = (i === 0 ? t.cur : t.up)(analyticsDate(lang));
  const href = `${lang === 'ko' ? '/ko' : ''}/privacy${i === 0 ? '/upcoming' : ''}`;
  return (
    <aside role="note" aria-label={label} className="mb-8 border-2 border-[var(--ink-black)] px-4 py-3 text-[15px] leading-relaxed text-[var(--text-primary)]">
      <p>
        <strong>{label}</strong> · {body}{' '}
        <a href={href} className="font-semibold underline underline-offset-4">{t.links[i]} →</a>
      </p>
    </aside>
  );
}
