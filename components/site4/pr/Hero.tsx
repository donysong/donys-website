'use client';
/* `/pr` cover — wordmark → promise (two lines) → host · version → two circles. Same markup as the v5 `/ae` cover
   (`ae/Hero.tsx`) minus the centre film: there is no demo at launch (owner, 2026-11-07), so `.pr-nodemo` sets the circles side by side.
   Circles = *buy → Pro* (fill — purchase only, REBRAND §9.9 ③) / *free → free version* (outline).
   Before a checkout opens its circle shows the day instead of a link (`state.tsx` `Checkout`). No stamps (v5 `/ae` dropped them). */
import { useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { PR } from '@/lib/product';
import { Checkout } from './state';

export default function Hero() {
  const { t } = useT();
  return (
    <header className="phero">
      <h1 className="disp" lang="en">
        <span className="brandpart">{t('s.brand')}</span>
        <Plate3 k="pr.hero.plugin" />
      </h1>
      <p className="promise">{t('pr.hero.promise').split('|').map((s, i) => <span className="promise-l" key={i}>{s}</span>)}</p>
      <p className="lab lc" style={{ color: 'var(--muted)' }}>{t('pr.hero.sub')}</p>

      <div className="pstage pr-nodemo">
        <div className="side">
          <Checkout kind="pro" className="circ fill" closed={<span><b>{PR.earlyPrice}</b><small>{t('pr.hero.pro.soon')}</small></span>}>
            <span><b>{PR.earlyPrice}</b><small>{t('pr.hero.pro.note')}</small></span>
          </Checkout>
          <a className="undercirc" href="#specs" data-cur>{t('pr.hero.specs')}</a>
        </div>
        <div className="side">
          <Checkout kind="free" className="circ line" closed={<span><b>{t('pr.hero.free')}</b><small>{t('pr.hero.free.soon')}</small></span>}>
            <span><b>{t('pr.hero.free')}</b><small>{t('pr.hero.free.note')}</small></span>
          </Checkout>
          <a className="undercirc" href="#install" data-cur>{t('pr.hero.install')}</a>
        </div>
      </div>
    </header>
  );
}
