'use client';
/* 세 페이지(`/` · `/ae` · `/ae/docs`)의 공용 셸 — 종이·그레인·등록 마크·커서·잉크 바·네비·푸터·레일.
   🔴 디자인은 발명하지 않았다: `site3p.css` 의 어휘를 그대로 쓰고, 크롬 동작도 `site3p/Chrome.tsx`
   를 재사용한다. 이 파일이 새로 하는 일은 **페이지별로 갈라지는 것**(판 수·네비 항목·푸터 열)뿐이다.

   레인 계약 — 페이지는 이렇게만 쓴다:
     <Page4 page="ae" plateTotal={7} links={[{href:'#who',k:'ae.nav.who'}]} cta={{href:'#price',k:'s.buy'}}>
       …섹션…
     </Page4>
   섹션은 `<section id="who" data-plate="01" data-name="ae.nav.who">` 를 달면 네비 판 번호가 따라온다. */
import { useEffect, useState } from 'react';
import { useLang, useT } from '@/components/site3p/lang';
import { Defs, Surface, useChrome } from '@/components/site3p/Chrome';
import { CHECKOUT_URL } from '@/lib/product';

export type NavLink = { href: string; k: string };
export type Page4Kind = 'home' | 'ae' | 'docs';

/* ── 네비 ─────────────────────────────────────────────────────────────
   🔴 브랜드 루트는 `/about` 을 안 가진다(레퍼런스도 앵커다). 제품·Docs 는 서로를 가리킨다. */
function Nav4({ page, plateTotal, links, cta, logo }: {
  page: Page4Kind; plateTotal: number; links: NavLink[]; cta?: NavLink; logo: string;
}) {
  const { t } = useT();
  const href = useHref();
  const [plate, setPlate] = useState({ no: '00', name: 's.plate.cover' });
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target as HTMLElement;
      setPlate({ no: el.dataset.plate || '00', name: el.dataset.name || 's.plate.cover' });
      document.querySelectorAll('#p4-navlinks a:not(.btn-line)').forEach((a) => {
        a.classList.toggle('on', a.getAttribute('href') === '#' + el.id);
      });
    }), { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('section[data-plate]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  const total = String(plateTotal).padStart(2, '0');
  return (
    <nav>
      <div className="label lab">
        <span>{t('s.plate')}</span> <b>{plate.no}</b> / {total} &nbsp;·&nbsp; <b>{t(plate.name)}</b>
      </div>
      <a className="logo" href={page === 'home' ? '#top' : href('/')} data-cur>
        <img src={`/riso/${logo}`} alt="You Name It" />
      </a>
      <div className="links" id="p4-navlinks">
        {links.map((l) => <a key={l.href} href={l.href} data-cur>{t(l.k)}</a>)}
        {cta ? <a className="btn-line" href={href(cta.href)} data-cur>{t(cta.k)}</a> : null}
        <LangSwitch />
      </div>
    </nav>
  );
}

/* 🔴 언어 전환은 **주소를 바꾼다**, 상태가 아니라. 정적 export 라 언어마다 HTML 이 따로 구워지고,
   그래야 국문에 공유 가능한 주소가 생기고 검색에도 잡힌다(구 `?lang=ko` 스왑은 둘 다 못 했다).
   로캘이 URL 로 안 박힌 옛 경로에서는 예전처럼 상태만 바꾼다. */
export const KO_PREFIX = '/ko';
/* 🔴 국문 면의 내부 링크는 국문 면으로 간다. 법 페이지(`/terms` `/privacy` `/refund`)와
   `/update` 는 국문 판본이 없으므로 **접두사를 붙이지 마라** — 붙이면 404 다. */
const LOCALIZED = ['/', '/ae', '/ae/docs'];
function useHref() {
  const { lang, locked } = useLang();
  return (p: string) => {
    if (!locked || lang !== 'ko') return p;
    const base = p.split('#')[0].replace(/\/$/, '') || '/';
    if (!LOCALIZED.includes(base)) return p;
    return KO_PREFIX + (p === '/' ? '' : p);
  };
}
export function enPath(p: string) { return p.replace(/^\/ko(?=\/|$)/, '') || '/'; }
export function koPath(p: string) { return p.startsWith('/ko') ? p : KO_PREFIX + (p === '/' ? '' : p); }

function LangSwitch() {
  const { lang, setLang, locked } = useLang();
  const [path, setPath] = useState('/');
  useEffect(() => { setPath(location.pathname.replace(/\/$/, '') || '/'); }, []);
  if (!locked) {
    return (
      <span className="langs">
        <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} data-cur>EN</button>
        <button className={lang === 'ko' ? 'on' : ''} onClick={() => setLang('ko')} data-cur>KO</button>
      </span>
    );
  }
  return (
    <span className="langs">
      <a className={lang === 'en' ? 'on' : ''} href={enPath(path)} hrefLang="en" data-cur>EN</a>
      <a className={lang === 'ko' ? 'on' : ''} href={koPath(path)} hrefLang="ko" data-cur>KO</a>
    </span>
  );
}

/* ── 스티키 구매 레일 (제품 페이지) ────────────────────────────────────
   레퍼런스 원리 7: 가격 섹션은 버튼을 안 가지고, **레일이 CTA 를 독점**한다. 45% 에서 점화.
   🔴 여기가 사이트의 실제 결제 진입점이다 — `#price` 앵커로 바꾸지 마라(proto4 가 그래서 팔 수 없었다).
   🔴 레일이 뜨면 `.has-rail` 이 본문 오른쪽 차선을 비운다(FAQ 판정어를 46px 덮은 전례). */
export function BuyRail() {
  const { t } = useT();
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setOn(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) > 0.45);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a className={`rail${on ? ' on' : ''}`} href={CHECKOUT_URL} data-cur>
      <span className="buy">{t('s.buy')}<small>{t('s.buy.price').replace(/^.*—\s*/, '')}</small></span>
    </a>
  );
}

/* ── 푸터 ─────────────────────────────────────────────────────────────
   🔴 법 4줄(약관·개인정보·환불·연락처)은 **실링크**다. proto4 정적본은 이걸 텍스트로 잃어버렸고,
   결제 페이지가 약관 없이 나가는 상태였다. `/update` 도 패널 `version.json` 이 가리키는 계약 경로다. */
function Footer4({ page }: { page: Page4Kind }) {
  const { t } = useT();
  const href = useHref();
  return (
    <footer>
      <div className="band lines" />
      <div className="grid">
        <div className="logo">
          <img src="/riso/logo-mix.webp" alt="You Name It" />
          <div className="cta-row" style={{ marginTop: 22 }}>
            <a className="buy" href={page === 'home' ? href('/ae') : CHECKOUT_URL} data-cur>
              {page === 'home' ? t('s.toProduct') : t('s.buy.price')}
            </a>
          </div>
        </div>
        <div>
          <h4>{t('s.ft.made')}</h4>
          <ul>
            <li><a href={href('/ae')} data-cur>{t('s.product')}</a></li>
            <li><a href="/update" data-cur>{t('s.ft.notes')}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t('s.ft.support')}</h4>
          <ul>
            <li><a href={href('/ae/docs')} data-cur>{t('s.ft.docs')}</a></li>
            <li><a href={href('/ae#faq')} data-cur>{t('s.ft.faq')}</a></li>
            <li><a href={href('/ae#specs')} data-cur>{t('s.ft.specs')}</a></li>
            <li><a href="mailto:support@younameit.works" data-cur>{t('s.ft.contact')}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t('s.ft.legal')}</h4>
          <img className="stone-sm" src="/riso/stones/stone-3.webp" alt="" />
          <ul style={{ marginTop: 18 }}>
            <li><a href="/terms" data-cur>{t('s.ft.terms')}</a></li>
            <li><a href="/privacy" data-cur>{t('s.ft.privacy')}</a></li>
            <li><a href="/refund" data-cur>{t('s.ft.refund')}</a></li>
            {page !== 'home' ? <li><a href={href('/')} data-cur>{t('s.toBrand')}</a></li> : null}
          </ul>
        </div>
      </div>
      <div className="legal"><span>{t('s.copyright')}</span><span>{t('s.legal.line')}</span></div>
    </footer>
  );
}

export default function Page4({ page, plateTotal, links, cta, logo = 'logo-red.webp', rail = false, children }: {
  page: Page4Kind; plateTotal: number; links: NavLink[]; cta?: NavLink;
  logo?: string; rail?: boolean; children: React.ReactNode;
}) {
  const { lang } = useLang();
  useChrome();
  return (
    <div className={`p3 p4${page === 'home' ? ' root' : ''}${rail ? ' has-rail' : ''}`} data-lang={lang} data-page={page} id="top">
      <Defs />
      <Surface />
      <div className="ink-bar" id="p3-inkbar" aria-hidden="true" />
      <div className="cur" id="p3-cur" aria-hidden="true" />
      <Nav4 page={page} plateTotal={plateTotal} links={links} cta={cta} logo={logo} />
      {children}
      {rail ? <BuyRail /> : null}
      <Footer4 page={page} />
    </div>
  );
}
