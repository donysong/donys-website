/* 개정 예정 안내 띠 — 약관·방침·환불 정책 개정을 시행 7일 전부터 알린다(방침 제16조 · 약관 제4조).
   방식: **현재 판은 시행일까지 그대로 효력이 있고 그대로 보인다.** 그 위에 이 띠가 시행일과 바뀌는 점을 알리고 개정 예정본(`/…/upcoming`)으로 잇는다.
   예정본 페이지는 반대 방향(현재 판으로) 띠 하나를 달고 noindex 다. 걸린 개정이 없으면 아무것도 그리지 않는다.
   지금 걸릴 수 있는 개정 둘:
   · 분석 — 동의 기반 방문 통계(방침만). 시행일 = `lib/analytics.ts` 의 `ANALYTICS_EFFECTIVE`. 설계 = 플러그인 repo ANALYTICS_PLAN §12 ①.
     🔴 그 문구의 핵심은 **"동의하신 경우에만 · 거부하면 달라지는 것 없음"** 이다 — 불리한 변경이 아니라는 논거(7일 고지)가 이 문장에 있다. 고칠 때 이 두 말을 빼지 마라.
   · PR — You Name It PR Plugin 추가(약관·방침·환불). 시행일·게시일 = `lib/policy.ts` 의 `PR_EFFECTIVE`·`PR_POSTED`. 약관 제4조 ② = "바뀌는 내용과 시행일" 을 알린다.
   🔴 개정이 시행되면(`GTM_ID` 채움 · `PR_IN_FORCE`) 띠는 저절로 빠지고, 걸린 개정이 없어진 문서의 `upcoming` 페이지는 같은 커밋에서 지운다 — deployCheck `[policy]` 가 남은 것을 잡는다. */
import { ANALYTICS_NOTICE, PR_NOTICE, analyticsDate, prDate, prPostedDate } from '@/lib/policy';

type Lang = 'en' | 'ko';
type Doc = 'terms' | 'privacy' | 'refund';

/* 문장은 조사까지 통째로 적는다 — "은(는)" 같은 조합 문장을 만들지 않으려고 표를 펼쳤다. */
const T = {
  ko: {
    analytics: (d: string) => `이 개인정보 처리방침은 ${d}에 개정됩니다. 동의하신 경우에만 Google Tag Manager·Google Analytics 4(Google LLC, 미국)로 방문 통계를 내는 내용이 더해집니다. 동의하지 않으시면 달라지는 것이 없고, 지금처럼 쿠키 없는 통계(Cloudflare Web Analytics)만 작동합니다. 개정 방침이 시행되기 전까지는 지금 보시는 방침이 그대로 적용됩니다.`,
    pr: {
      terms: (d: string, p: string) => `이 이용약관은 ${d}에 개정됩니다(${p} 게시). You Name It PR Plugin(Adobe Premiere Pro 용 확장 프로그램)의 무료판·Pro·사전예약·번들에 관한 내용이 더해집니다. 제1조·제2조·제3조·제6조~제9조·제12조~제15조·제17조와 부칙을 고치고, 제9조의2(편집 방식과 되돌리기)·제9조의3(키 자동화)·제12조의2(기능의 원격 중지)·제14조의2(사전예약)를 새로 둡니다. 개정 약관이 시행되기 전까지는 지금 보시는 약관이 그대로 적용됩니다.`,
      privacy: (d: string, p: string) => `이 개인정보 처리방침은 ${d}에 개정됩니다(${p} 게시). You Name It PR Plugin 에 관한 내용이 더해집니다: 무료판 내려받기, Pro 라이선스(활성화 라벨), PR Plugin 결제 화면의 소식 메일 동의(선택), 보내 주신 지원 묶음, 그리고 PR Plugin 이 네트워크와 통신하는 경우 전부입니다. 개정 방침이 시행되기 전까지는 지금 보시는 방침이 그대로 적용됩니다.`,
      refund: (d: string, p: string) => `이 환불 정책은 ${d}에 개정됩니다(${p} 게시). You Name It PR Plugin 의 무료판(1-2), 사전예약(1-3), 번들(1-4), AE 구매자 할인 코드로 사신 경우(1-5)가 더해지고, 5(그 밖의 경우)와 6(환불 뒤 라이선스)이 바뀝니다. 개정 정책이 시행되기 전까지는 지금 보시는 정책이 그대로 적용됩니다.`,
    },
    up: {
      terms: (p: string) => `이 약관은 ${p}부터 적용됩니다. 그날까지는 현재 약관이 적용됩니다.`,
      refund: (p: string) => `이 환불 정책은 ${p}부터 적용됩니다. 그날까지는 현재 정책이 적용됩니다.`,
      privacyAnalytics: (a: string) => `이 방침은 ${a}부터 적용됩니다. 그날까지는 현재 방침이 적용됩니다.`,
      privacyPr: (p: string) => `이 방침은 ${p}부터 적용됩니다. 그날까지는 현재 방침이 적용됩니다.`,
      privacyBoth: (p: string, a: string) => `이 방침의 You Name It PR Plugin 에 관한 내용은 ${p}부터, 동의 기반 방문 통계에 관한 내용은 ${a}부터 적용됩니다. 그때까지는 현재 방침이 적용됩니다.`,
    },
    links: {
      terms: ['개정 예정 약관 보기', '현재 약관 보기'],
      privacy: ['개정 예정 방침 보기', '현재 방침 보기'],
      refund: ['개정 예정 환불 정책 보기', '현재 환불 정책 보기'],
    },
    labels: ['개정 예정 안내', '시행 예정본'],
  },
  en: {
    analytics: (d: string) => `This Privacy Policy will be revised on ${d}. The revision adds visit statistics through Google Tag Manager and Google Analytics 4 (Google LLC, United States) — only if you consent. If you do not, nothing changes: only Cloudflare’s cookieless analytics keep running. The policy on this page stays in force until the revised one takes effect.`,
    pr: {
      terms: (d: string, p: string) => `These Terms will be revised on ${d} (posted ${p}). The revision adds the You Name It PR Plugin (an extension for Adobe Premiere Pro): its Free Version, Pro, Pre-orders and the Bundle. Sections 1, 2, 3, 6 to 9, 12 to 15, 17 and the Effective Date change, and Sections 9-2 (How Edits Are Made and Undone), 9-3 (Key Automation), 12-2 (Remote Switch-Off of Features) and 14-2 (Pre-orders) are new. The Terms on this page stay in force until the revised ones take effect.`,
      privacy: (d: string, p: string) => `This Privacy Policy will be revised on ${d} (posted ${p}). The revision adds the You Name It PR Plugin: the Free Version download, the Pro license (activation label), the optional newsletter consent on the PR Plugin checkout, support bundles you send us, and every case in which the PR Plugin talks to the network. The policy on this page stays in force until the revised one takes effect.`,
      refund: (d: string, p: string) => `This Refund Policy will be revised on ${d} (posted ${p}). The revision adds the You Name It PR Plugin: the Free Version (1-2), Pre-orders (1-3), the Bundle (1-4) and purchases made with an AE buyer code (1-5), and changes Sections 5 (Other Cases) and 6 (Your License After a Refund). The policy on this page stays in force until the revised one takes effect.`,
    },
    up: {
      terms: (p: string) => `These Terms apply from ${p}. Until then the current Terms apply.`,
      refund: (p: string) => `This Refund Policy applies from ${p}. Until then the current policy applies.`,
      privacyAnalytics: (a: string) => `This policy applies from ${a}. Until then the current policy applies.`,
      privacyPr: (p: string) => `This policy applies from ${p}. Until then the current policy applies.`,
      privacyBoth: (p: string, a: string) => `The parts of this policy about the You Name It PR Plugin apply from ${p}, and the parts about consent-based visit statistics from ${a}. Until then the current policy applies.`,
    },
    links: {
      terms: ['Read the revised Terms', 'Read the current Terms'],
      privacy: ['Read the revised policy', 'Read the current policy'],
      refund: ['Read the revised Refund Policy', 'Read the current Refund Policy'],
    },
    labels: ['Notice of upcoming change', 'Not yet in force'],
  },
} as const;

function Band({ label, body, href, link }: { label: string; body: string; href: string; link: string }) {
  return (
    <aside role="note" aria-label={label} className="mb-8 border-2 border-[var(--ink-black)] px-4 py-3 text-[15px] leading-relaxed text-[var(--text-primary)]">
      <p>
        <strong>{label}</strong> · {body}{' '}
        <a href={href} className="font-semibold underline underline-offset-4">{link} →</a>
      </p>
    </aside>
  );
}

export default function PolicyNotice({ lang, doc, view }: { lang: Lang; doc: Doc; view: 'current' | 'upcoming' }) {
  const t = T[lang];
  const analytics = doc === 'privacy' && ANALYTICS_NOTICE;
  const pr = PR_NOTICE;
  if (!analytics && !pr) return null;
  const base = `${lang === 'ko' ? '/ko' : ''}/${doc}`;
  const [toUpcoming, toCurrent] = t.links[doc];
  if (view === 'current') {
    /* 개정마다 띠 하나 — 바뀌는 내용과 시행일이 서로 다르다. 둘 다 같은 예정본으로 잇는다. */
    return (
      <>
        {analytics ? <Band label={t.labels[0]} body={t.analytics(analyticsDate(lang))} href={`${base}/upcoming`} link={toUpcoming} /> : null}
        {pr ? <Band label={t.labels[0]} body={t.pr[doc](prDate(lang), prPostedDate(lang))} href={`${base}/upcoming`} link={toUpcoming} /> : null}
      </>
    );
  }
  /* 예정본은 걸린 개정 전부를 싣는다(`revisedText`·`prText`) — 띠는 하나로, 부분마다 시행일을 적는다. */
  const body =
    doc !== 'privacy'
      ? t.up[doc](prDate(lang))
      : analytics && pr
        ? t.up.privacyBoth(prDate(lang), analyticsDate(lang))
        : analytics
          ? t.up.privacyAnalytics(analyticsDate(lang))
          : t.up.privacyPr(prDate(lang));
  return <Band label={t.labels[1]} body={body} href={base} link={toCurrent} />;
}
