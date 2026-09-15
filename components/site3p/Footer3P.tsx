'use client';
/* 푸터 — 검정 종이로 뒤집는다(NFC 원리 6). 법 페이지·연락처는 기존 사이트 라우트를 그대로 쓴다. */
import { useT } from './lang';
import Typed from './Typed';

export default function Footer3P() {
  const { t } = useT();
  const plates: [string, string, string][] = [['#who', '01', 'nav.who'], ['#why', '02', 'nav.why'], ['#what', '03', 'nav.what'], ['#made', '04', 'nav.made'], ['#price', '05', 'nav.price']];
  return (
    <footer>
      <div className="band lines" />
      <div className="grid">
        <div className="logo">
          <img src="/riso/logo-mix.webp" alt="You Name It" />
          <Typed k="ft.typed" style={{ marginTop: 22 }} />
          <div className="cta-row">
            <a className="buy" href="#price" data-cur>{t('hero.cta')}</a>
            <span className="lab" style={{ color: '#7d8a90' }}>{t('ft.meta')}</span>
          </div>
        </div>
        <div>
          <h4>{t('ft.plates')}</h4>
          <ul>
            {plates.map(([href, n, k]) => <li key={href}><a href={href} data-cur>{n} · <span>{t(k)}</span></a></li>)}
            <li><a href="/update" data-cur>{t('ft.notes')}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t('ft.paper')}</h4>
          <img className="stone-sm" src="/riso/stones/stone-3.webp" alt="" />
          <ul style={{ marginTop: 18 }}>
            <li><a href="/terms" data-cur>{t('ft.terms')}</a></li>
            <li><a href="/privacy" data-cur>{t('ft.privacy')}</a></li>
            <li><a href="/refund" data-cur>{t('ft.refund')}</a></li>
            <li><a href="mailto:support@younameit.works" data-cur>{t('ft.contact')}</a></li>
          </ul>
        </div>
      </div>
      <div className="legal"><span>© 2026 You Name It</span><span>{t('ft.legal')}</span></div>
    </footer>
  );
}
