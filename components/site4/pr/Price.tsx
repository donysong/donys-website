'use client';
/* 04 Free · Pro — the v5 `/ae` 04 two-plan ledger (`.pricing.plans`, `app/plans.css`), on the note sheet.
   Free = $0 + the claimable free features (table labels) + the free checkout (outline). Pro = launch price + the one filled
   button + what the same key opens: the launch set (labels) and, smaller, the Pro toolkit that is in this release (names) and
   the Pro tools that are not (names, no dates).
   🔴 `#price` holds exactly two links: the Pro button (`data-price-cta` — the rail hides while it is on screen) and the free
      checkout. deployCheck `[pr]` counts them. Before a checkout's day the button shows the date instead (`state.tsx`).
   🔴 No `<a` inside dictionary strings rendered here. Bundle · discounts · tax · AI costs · legal links sit below, outside
      `#price` but on the same sheet (`#bundle`) — the `.onnote` wrapper makes the two one sheet, like `/ae` FAQ + specs.
   The AE-owner code is not offered here: during the launch price it cannot go below that price (one discount per
   checkout), so it lives in FAQ q21 with that caveat. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { useHref } from '@/components/site4/Shell';
import { PR_LEGAL } from '@/lib/product';
import { prClaimable, prIn, prLater, prLaunchSet, prProTools } from '@/lib/pr';
import Head from './Head';
import { Checkout } from './state';

const FREE = [...prIn('autocut'), ...prIn('toolkit')].filter(prClaimable);

export default function Price() {
  const { t, list } = useT();
  const href = useHref();
  const tools = prProTools();
  const later = prLater();
  const names = (ids: string[]) => ids.map((x) => t(`pr.f.${x}.name`)).join(' · ');
  const legal: [string, string][] = [
    [PR_LEGAL.terms, t('s.ft.terms')],
    [PR_LEGAL.refund, t('s.ft.refund')],
    [PR_LEGAL.privacy, t('s.ft.privacy')],
    ...(PR_LEGAL.notices ? [[PR_LEGAL.notices, t('pr.legal.notices')] as [string, string]] : []),
  ];
  return (
    <div className="onnote">
      <section id="price" data-plate="04" data-name="pr.plate.price">
        <div className="sec tight">
          <Head no="04" stone={3} k="pr.price.h" />
          <div className="pricing plans">
            <div className="plan plan-free" id="free">
              <p className="lab plan-l">{t('pr.price.free.l')}</p>
              <Plate3 k="pr.price.free.amount" boil={false} className="big disp" />
              <Html k="pr.price.free.keep" as="p" className="pkeep" />
              <ul className="plan-list">
                {FREE.map((id) => <li key={id}>{t(`pr.f.${id}.label`)}</li>)}
              </ul>
              <Checkout kind="free" className="btn-line pbuy" closed={t('pr.price.free.soon')}>
                {t('pr.price.free.btn')} <span aria-hidden="true">↓</span>
              </Checkout>
            </div>
            <div className="plan plan-pro">
              <p className="lab plan-l">{t('pr.price.pro.l')}</p>
              <Plate3 k="pr.price.amount" boil={false} className="big disp" />
              <Checkout kind="pro" className="btn-fill pbuy" data-price-cta closed={t('pr.price.closed')}>
                {t('pr.price.pro.btn')} <span aria-hidden="true">→</span>
              </Checkout>
              <Html k="pr.price.pro.keep" as="p" className="pkeep" />
              <p className="plan-lead">{t('pr.price.pro.lead')}</p>
              <ul className="plan-list plan-list-pro">
                {prLaunchSet().map((id, i, all) => (
                  <li key={id}>
                    {t(`pr.f.${id}.label`)}
                    {/* the other Pro tools go under the last launch line, smaller (as `/ae` lists its Pro-only tool names):
                        first the ones in this release, then the ones that are not */}
                    {i === all.length - 1 && tools.length
                      ? <span className="plan-tools">{t('pr.price.pro.tools')} {names(tools)}</span>
                      : null}
                    {i === all.length - 1 && later.length
                      ? <span className="plan-tools">{t('pr.price.pro.later')} {names(later)}</span>
                      : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="incl">
            {list('pr.price.incl').map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </section>

      <section id="bundle">
        <div className="sec tight" style={{ paddingTop: 0 }}>
          <div className="howto pr-after">
            <div>
              <h3>{t('pr.bundle.h')}</h3>
              <p>{t('pr.bundle.p')}</p>
              <p className="pr-bundle">
                <Checkout kind="bundle" className="btn-line" closed={t('pr.bundle.closed')}>{t('pr.bundle.btn')}</Checkout>
              </p>
            </div>
            <div>
              <ul>
                {['pr.price.one', 'pr.price.tax'].map((k) => <li key={k}>{t(k)}</li>)}
              </ul>
            </div>
            <div>
              <ul><li>{t('pr.price.ai')}</li></ul>
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
    </div>
  );
}
