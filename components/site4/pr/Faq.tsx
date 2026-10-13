'use client';
/* 06 FAQ — `/ae` 06 과 같은 판정어 먼저 조판(`details.qa` · summary = 질문 + 판정어). 원문 = PR repo `gtm/site/pr-faq.md`.
   묶음: 작업 q1–q10 · 기술 q11–q17 · 라이선스 q18–q27 · (판 B) 사전예약 p1–p6 — 판 B 에선 p 묶음이 q20(환불)을 대신한다.
   🔴 원문 태그대로 빠지는 문답: q2 autocut.basic · q4 captions.longform · q5·q6 chat · q7 autocut.ngTakes ·
      q8 (autocut.advanced · captions.longform · chat — 전부 꺼져야 빠진다) · q15 keyauto. 판 B 에선 Pro 태그 문답이 전부 빠진다.
   🔴 q16(한글 입력 상자)은 **싣지 않았다** — 스파이크 D1 결과 대기(원문 지시: 문제가 없으면 빼고, 자체 입력기를 넣으면 답을 바꾼다).
   q21(AE 쿠폰)은 `PR.aeCouponEnd` 가 지나면 빠진다. 그 마지막 문장(얼리버드 동안 쿠폰이 얼리버드가 아래로 못 내린다)은
   얼리버드 기간에만 붙는다(`pr.faq.q21.early` — 판 B 는 "사전예약 가격이 적용되는 동안" 판). */
import { Html, useT } from '@/components/site3p/lang';
import { PR, PR_MODE, type PrFeature } from '@/lib/product';
import { prAny } from '@/lib/pr';
import Head from './Head';
import { usePr, type Plate } from './state';

const TAGS: Record<string, PrFeature[]> = {
  q2: ['autocut.basic'],
  q4: ['captions.longform'],
  q5: ['chat'],
  q6: ['chat'],
  q7: ['autocut.ngTakes'],
  q8: ['autocut.advanced', 'captions.longform', 'chat'],
  q15: ['keyauto'],
};

const GROUPS: { lab: string; qs: string[]; pre?: boolean }[] = [
  { lab: 'pr.faq.g1', qs: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'] },
  { lab: 'pr.faq.g2', qs: ['q11', 'q12', 'q13', 'q14', 'q15', 'q17'] },
  { lab: 'pr.faq.g3', qs: ['q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27'] },
  { lab: 'pr.faq.g4', qs: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'], pre: true },
];

export default function Faq({ no }: { no: string }) {
  const { t } = useT();
  const { early, aeCoupon } = usePr();
  const pre = PR_MODE === 'preorder';
  const shown = (q: string) => {
    if (TAGS[q] && !prAny(TAGS[q])) return false;
    if (q === 'q20' && pre) return false;
    if (q === 'q21' && !aeCoupon) return false;
    return true;
  };
  const answer = (q: string) => {
    if (q === 'q12' && !PR.companion) return t('pr.faq.q12.a.nocx');
    if (q === 'q21' && (pre || early)) return `${t('pr.faq.q21.a')} ${t('pr.faq.q21.early')}`;
    return t(`pr.faq.${q}.a`);
  };
  return (
    <section id="faq" data-plate={no} data-name="pr.plate.faq">
      <div className="sec tight">
        <Head no={no} stone={1} k="pr.faq.h" tag="pr.faq.tag" />
        {GROUPS.filter((g) => !g.pre || pre).map((g) => {
          const qs = g.qs.filter(shown);
          return qs.length ? (
            <div className="faq-group" key={g.lab}>
              <span className="lab">{t(g.lab)}</span>
              {qs.map((q) => (
                <details className="qa" key={q}>
                  <summary data-cur>
                    <span className="q">{t(`pr.faq.${q}.q`)}</span>
                    <span className="verdict">{t(`pr.faq.${q}.v`)}</span>
                  </summary>
                  <p className="a" dangerouslySetInnerHTML={{ __html: answer(q) }} />
                </details>
              ))}
            </div>
          ) : null;
        })}
      </div>
    </section>
  );
}

/* 사양 9필드 — 판 번호 없음(`/ae` 와 같다). FAQ 와 **한 장**이다(PrPage 가 둘을 한 판으로 감싼다). */
const FIELDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Specs() {
  const { t } = useT();
  const n = (i: number) => (i === 3 && !PR.companion ? t('pr.sp3.n.nocx') : t(`pr.sp${i}.n`));
  return (
    <section id="specs">
      <div className="sec" style={{ paddingTop: 0 }}>
        <h3 className="lab" style={{ marginBottom: 18, color: 'var(--typeink)' }}>{t('pr.spec.h')}</h3>
        <div className="specs">
          {FIELDS.map((i) => (
            <div className="f" key={i}>
              <span className="k lab">{t(`pr.sp${i}.k`)}</span>
              <span className="v">
                {t(`pr.sp${i}.v`)}
                <span className="n" dangerouslySetInnerHTML={{ __html: n(i) }} />
              </span>
            </div>
          ))}
        </div>
        <Html k="pr.tm" as="p" className="pr-tm" />
      </div>
    </section>
  );
}
