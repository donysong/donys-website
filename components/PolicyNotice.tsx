/* 개정 예정 안내 띠 — 방침·약관 개정을 시행 7일 전부터 알린다(방침 제16조 · 약관 제4조).
   방식: **현재 판은 시행일까지 그대로 효력이 있고 그대로 보인다.** 그 위에 이 띠가 시행일과 바뀌는 점을 알리고 시행 예정본(`/…/upcoming`)으로 잇는다.
   시행 예정본 페이지는 같은 띠를 반대 방향(현재 판으로)으로 달고 noindex 다. 시행일 = `lib/policy.ts` 한 곳.
   🔴 시행일에 새 판이 현재 판 자리로 들어가면(`free-tier-download`) 띠와 `upcoming` 페이지는 같이 지운다 — deployCheck `[policy]` 가 남은 것을 잡는다. */
import { policyDate } from '@/lib/policy';

type Lang = 'en' | 'ko';
type Doc = 'privacy' | 'terms';

/* 문장은 조사까지 통째로 적는다 — "은(는)" 같은 조합 문장을 만들지 않으려고 표를 펼쳤다. */
const T = {
  ko: {
    privacy: {
      cur: (d: string) => `이 개인정보 처리방침은 ${d}에 개정됩니다. 무료 버전 다운로드 신청(이메일 주소·신청 일시·언어)과 제품 안 Pro 버튼 클릭의 합계 집계가 더해집니다. 개정 방침이 시행되기 전까지는 지금 보시는 방침이 그대로 적용됩니다.`,
      up: (d: string) => `이 방침은 ${d}부터 적용됩니다. 그날까지는 현재 방침이 적용됩니다.`,
      links: ['개정 예정 방침 보기', '현재 방침 보기'],
    },
    terms: {
      cur: (d: string) => `이 이용약관은 ${d}에 개정됩니다. 무료 버전에 관한 제3조의2가 더해지고, 그 밖의 조항은 그대로입니다. 개정 약관이 시행되기 전까지는 지금 보시는 약관이 그대로 적용됩니다.`,
      up: (d: string) => `이 약관은 ${d}부터 적용됩니다. 그날까지는 현재 약관이 적용됩니다.`,
      links: ['개정 예정 약관 보기', '현재 약관 보기'],
    },
    labels: ['개정 예정 안내', '시행 예정본'],
  },
  en: {
    privacy: {
      cur: (d: string) => `This Privacy Policy will be revised on ${d}. The revision adds the free-version download (email address, time and language) and an aggregate count of Pro-button clicks inside the product. The policy on this page stays in force until the revised one takes effect.`,
      up: (d: string) => `This policy applies from ${d}. Until then the current policy applies.`,
      links: ['Read the revised policy', 'Read the current policy'],
    },
    terms: {
      cur: (d: string) => `These Terms will be revised on ${d}. The revision adds Section 3-2 (Free Version); nothing else changes. The Terms on this page stay in force until the revised ones take effect.`,
      up: (d: string) => `These Terms apply from ${d}. Until then the current Terms apply.`,
      links: ['Read the revised Terms', 'Read the current Terms'],
    },
    labels: ['Notice of upcoming change', 'Not yet in force'],
  },
} as const;

export default function PolicyNotice({ lang, doc, view }: { lang: Lang; doc: Doc; view: 'current' | 'upcoming' }) {
  const i = view === 'current' ? 0 : 1;
  const t = T[lang][doc];
  const label = T[lang].labels[i];
  const body = (i === 0 ? t.cur : t.up)(policyDate(lang));
  const href = `${lang === 'ko' ? '/ko' : ''}/${doc}${i === 0 ? '/upcoming' : ''}`;
  return (
    <aside role="note" aria-label={label} className="mb-8 border-2 border-[var(--ink-black)] px-4 py-3 text-[15px] leading-relaxed text-[var(--text-primary)]">
      <p>
        <strong>{label}</strong> · {body}{' '}
        <a href={href} className="font-semibold underline underline-offset-4">{t.links[i]} →</a>
      </p>
    </aside>
  );
}
