'use client';
/* 05 가격 — `/ae` 04 가격 판과 같은 장부(`.pricing` = 가격 + 구매 버튼 + 풀이 | 약속 셋 크게 · 포함 셋은 캡션 한 줄).
   🔴 `#price` 안의 링크는 **구매 버튼 하나**다(deployCheck `[pr]` 가 센다 — `/ae` `[price]` 와 같은 규칙). 그 버튼이 보이는 동안
      레일이 비킨다(Shell `BuyRail` 이 `data-price-cta` 를 본다) — 한 화면에 결제 CTA 하나.
      ⚠️ 원문 6절 주석은 *"`#price` 에 링크 0 · 버튼은 히어로와 레일"* 인데 그건 2026-09-30 전 규칙이다(오너가 가격 판에 버튼 하나를 달았다).
   그래서 번들(다른 상품 = 다른 결제 링크) · AE 쿠폰 · 할인/세금/AI 비용 안내 · 법 링크는 `#price` **밖**, 같은 종이 한 장의 아랫단(`#bundle`)이다.
   번들 버튼은 외곽선이다 — 채움은 Pro 구매 하나(REBRAND §9.9 ③).
   얼리버드 줄(`pr.price.early`)은 기간 안에만 선다 — 끝나면 페이지 어디에도 "얼리버드" 가 남지 않는다(원문 6절 주석).
   AE 쿠폰 안내는 `PR.aeCouponEnd` 가 지나면 스스로 걷힌다(지난 코드를 권하지 않는다). 둘 다 브라우저가 지금 시각으로 다시 정한다(`state.tsx`). */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { useHref } from '@/components/site4/Shell';
import { PR_LEGAL, PR_MODE } from '@/lib/product';
import Head from './Head';
import { Checkout, usePr, type Plate } from './state';

export default function Price({ no, note }: Plate) {
  const { t } = useT();
  const href = useHref();
  const { early, aeCoupon } = usePr();
  const pre = PR_MODE === 'preorder';
  const legal: [string, string][] = [
    [PR_LEGAL.terms, t('s.ft.terms')],
    [PR_LEGAL.refund, t('s.ft.refund')],
    [PR_LEGAL.privacy, t('s.ft.privacy')],
    ...(PR_LEGAL.notices ? [[PR_LEGAL.notices, t('pr.legal.notices')] as [string, string]] : []),
  ];
  return (
    <section className={note ? 'onnote' : undefined}>
      <section id="price" data-plate={no} data-name="pr.plate.price">
        <div className="sec tight">
          <Head no={no} stone={3} k="pr.price.h" />
          <div className="pricing">
            <div className="pamt">
              <Plate3 k="pr.price.amount" boil={false} className="big disp" />
              {pre || early ? <p className="pr-early">{t('pr.price.early')}</p> : null}
              <Checkout kind="pro" className="btn-fill pbuy" data-price-cta>
                {pre ? t('pr.buy.pre') : t('s.buy')} <span aria-hidden="true">→</span>
              </Checkout>
              <Html k="pr.price.keep" as="p" className="pkeep" />
            </div>
            <ul className="pvow disp">
              {[1, 2, 3].map((n) => <li key={n}>{t(`pr.price.vow${n}`)}</li>)}
            </ul>
          </div>
          <ul className="incl">
            {[1, 2, 3].map((n) => <li key={n}>{t(`pr.price.incl${n}`)}</li>)}
          </ul>
          <p className="pr-wit">{t('pr.price.wit')}</p>
        </div>
      </section>

      <div id="bundle" className="sec tight" style={{ paddingTop: 0 }}>
        <div className="howto pr-after">
          {aeCoupon ? (
            <div>
              <h3>{t('pr.price.ae.h')}</h3>
              <p>{t('pr.price.ae.p')}</p>
            </div>
          ) : null}
          <div>
            <h3>{t('pr.price.bundle.h')}</h3>
            <p>{t('pr.price.bundle.p')}</p>
            <p className="pr-bundle"><Checkout kind="bundle" className="btn-line">{t('pr.price.bundle.btn')}</Checkout></p>
          </div>
          <div>
            <ul>
              {['pr.price.one', 'pr.price.tax', 'pr.price.ai'].map((k) => <li key={k}>{t(k)}</li>)}
            </ul>
            <p className="pr-legal">
              <b>{t('s.ft.legal')}</b>{' '}
              {legal.map(([p, label], i) => (
                <span key={p}>{i ? ' · ' : ''}<a href={href(p)} data-cur>{label}</a></span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
