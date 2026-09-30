'use client';
/* 세 페이지(`/` · `/ae` · `/ae/docs`)의 공용 셸 — 종이·그레인·등록 마크·커서·잉크 바·네비·푸터·레일.
   🔴 디자인은 발명하지 않았다: `site3p.css` 의 어휘를 그대로 쓰고, 크롬 동작도 `site3p/Chrome.tsx`
   를 재사용한다. 이 파일이 새로 하는 일은 **페이지별로 갈라지는 것**(판 수·네비 항목·푸터 열)뿐이다.

   레인 계약 — 페이지는 이렇게만 쓴다:
     <Page4 page="home" plateTotal={3} links={[{href:'#lineup',k:'home.nav.lineup'}]} cta={{href:'/ae',k:'s.toProduct'}}>
       …섹션…
     </Page4>
   섹션은 `<section id="who" data-plate="01" data-name="ae.nav.who">` 를 달면 네비 판 번호가 따라온다.
   🔴 `links`·`cta` 는 **루트와 읽는 면(`ownNav`)만** 읽는다. 제품 면(`ae` · `docs`)의 네비는 `AE_NAV` 한 벌이다(§16-23). */
import { useEffect, useState } from 'react';
import { useLang, useT } from '@/components/site3p/lang';
import { Defs, Surface, useChrome } from '@/components/site3p/Chrome';
import { penPath } from '@/components/site3p/pen';
import { BUSINESS, CHECKOUT_URL, FTC_BIZ_URL } from '@/lib/product';

export type NavLink = { href: string; k: string };
export type Page4Kind = 'home' | 'ae' | 'docs';

/* ── 네비 ─────────────────────────────────────────────────────────────
   🔴 브랜드 루트는 `/about` 을 안 가진다(레퍼런스도 앵커다).
   🔴 **`/ae` 이하는 전부 이 한 벌이다** — `/ae` · `/ae/docs` · 국문판 둘 (오너 2026-09-28 §16-23, 재인 *"상단 UI 가
   바뀌니까 헷갈려서 하나로 통일하기"*). 전엔 Docs 가 자기 목차를 네비에 넘기고 CSS 로 숨겨서 `AE Plugin` 외곽선만
   남았다 — 같은 제품 안에서 네비가 두 모양이었다. 절 링크는 `/ae` 의 앵커라 Docs 에선 `/ae#…` 로 간다(`navHref`). */
const AE_NAV: { links: NavLink[]; cta: NavLink } = {
  links: [
    { href: '#who', k: 'ae.nav.who' },
    { href: '#what', k: 'ae.nav.what' },
    { href: '#price', k: 'ae.nav.price' },
    { href: '#faq', k: 'ae.nav.faq' },
    { href: '/ae/docs', k: 's.docs' },
  ],
  cta: { href: CHECKOUT_URL, k: 's.buy.price' },
};

function Nav4({ page, plateTotal, links, cta, logo, product }: {
  page: Page4Kind; plateTotal: number; links: NavLink[]; cta?: NavLink; logo: string; product: boolean;
}) {
  const { t } = useT();
  const href = useHref();
  const [plate, setPlate] = useState({ no: '00', name: 's.plate.cover' });
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target as HTMLElement;
      setPlate({ no: el.dataset.plate || '00', name: el.dataset.name || 's.plate.cover' });
      /* 같은 면의 앵커만 켠다(네비 · Docs 목차 칩). `/ae#who` 같은 딴 면 링크와 현재 면 표시(`aria-current`)는 안 건드린다. */
      document.querySelectorAll('#p4-navlinks a[href^="#"], .toc a').forEach((a) => {
        a.classList.toggle('on', a.getAttribute('href') === '#' + el.id);
      });
    }), { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('section[data-plate]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  const total = String(plateTotal).padStart(2, '0');
  /* 제품 네비의 절 앵커는 `/ae` 에서만 앵커다 — Docs 에선 `/ae#who` 로 가야 산다. */
  const navHref = (h: string) => href(product && page !== 'ae' && h.startsWith('#') ? '/ae' + h : h);
  return (
    <nav data-nav={product ? 'ae' : undefined}>
      <div className="label lab">
        <span>{t('s.plate')}</span> <b>{plate.no}</b> / {total} &nbsp;·&nbsp; <b>{t(plate.name)}</b>
      </div>
      <a className="logo" href={page === 'home' ? '#top' : href('/')} data-cur>
        <img src={`/riso/${logo}`} alt="You Name It" />
      </a>
      <div className="links" id="p4-navlinks">
        {/* 🔴 네비 링크도 로캘을 탄다 — `/ko/ae` 의 `Docs` 가 영문 `/ae/docs` 로 떨어지던 결함(2026-09-26). */}
        {links.map((l) => (
          <a key={l.href} href={navHref(l.href)} aria-current={page === 'docs' && l.href === '/ae/docs' ? 'page' : undefined} data-cur>
            {t(l.k)}
          </a>
        ))}
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
/* 🔴 국문 면의 내부 링크는 국문 면으로 간다(VOICE_AND_TERMS §5-4). `/update` 는 `/ko/update` 가 있다(2026-09-19).
   법 3장(`/terms` `/privacy` `/refund`)도 이제 국문판이 있다 — 2026-09-30 오너가 사업자 등록(09-22) 뒤 구 "영문 전용"(09-19)을
   다시 열었다(개인정보 처리방침은 국문 독자가 읽을 수 있어야 한다). 푸터 링크가 이 함수를 타고, deployCheck `[legal]` 이
   국문 면에선 `/ko/…` 를 요구한다. 앵커(`#…`)·외부 주소·`mailto:` 는 그대로 둔다 — 앵커를 여기 통과시키면 `/ko#who` 가 된다. */
const LOCALIZED = ['/', '/ae', '/ae/docs', '/update', '/terms', '/privacy', '/refund', '/newsletter'];
export function useHref() {
  const { lang, locked } = useLang();
  return (p: string) => {
    if (!p.startsWith('/')) return p;
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
   🔴 레일이 뜨면 `.has-rail` 이 본문 오른쪽 차선을 비운다(FAQ 판정어를 46px 덮은 전례).
   §16-5 (오너 2026-09-28 *"규칙 유지 — 레일 버튼만 시각 강조"*): CTA 는 늘리지 않고 이 하나를 세게 만든다.
   **처음 점화할 때 한 번** 빨간 펜이 버튼을 두르고(`pen.ts` ring) 버튼이 찍힌다(`.lit`). 다시 숨었다 떠도
   되풀이하지 않는다 — 원은 그려진 채로 남는다. 줄인 모션에선 원이 바로 보인다(site4.css §16 B3). */
export function BuyRail() {
  const { t } = useT();
  const [on, setOn] = useState(false);
  const [lit, setLit] = useState(false);
  const ring = penPath('ring', 'rail');
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const now = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) > 0.45;
      setOn(now);
      if (now) setLit(true);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a className={`rail${on ? ' on' : ''}${lit ? ' lit' : ''}`} href={CHECKOUT_URL} data-cur>
      <span className="buy">{t('s.buy')}<small>{t('s.buy.price').replace(/^.*—\s*/, '')}</small></span>
      <svg className="pen pen-ring" viewBox={ring.vb} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={ring.d} pathLength={1} />
      </svg>
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
      <div className="grid cols">
        <div className="logo">
          <img src="/riso/logo-mix.webp" alt="You Name It" />
          {/* 🔴 채움(`.buy`)은 **구매**에만 쓴다(REBRAND §9.9 ③). 루트의 이 버튼은 제품 진입이라
              헤더의 `AE Plugin` 과 같은 외곽선(`.btn-line`)이다 — 같은 목적지·같은 라벨에 모양이 둘이면
              둘 중 하나는 거짓말이다. `/ae`·`/ae/docs` 는 실제 결제라 채움 그대로. */}
          <div className="cta-row" style={{ marginTop: 22 }}>
            {page === 'home'
              ? <a className="btn-line" href={href('/ae')} data-cur>{t('s.toProduct')}</a>
              : <a className="buy" href={CHECKOUT_URL} data-cur>{t('s.buy.price')}</a>}
          </div>
        </div>
        <div>
          <h4>{t('s.ft.made')}</h4>
          <ul>
            <li><a href={href('/ae')} data-cur>{t('s.product')}</a></li>
            <li><a href={href('/update')} data-cur>{t('s.ft.notes')}</a></li>
            {/* 광고성 정보 수신 동의 창구(2026-09-30) — 동의한 분께만 보낸다(정보통신망법 §50). */}
            <li><a href={href('/newsletter')} data-cur>{t('s.ft.news')}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t('s.ft.support')}</h4>
          <ul>
            <li><a href={href('/ae/docs')} data-cur>{t('s.ft.docs')}</a></li>
            <li><a href={href('/ae#faq')} data-cur>{t('s.ft.faq')}</a></li>
            {/* 설치 순서는 읽는 면(`/ae/docs#install`)에 산다 — 사양도 같은 절에 있다. */}
            <li><a href={href('/ae/docs#install')} data-cur>{t('s.ft.specs')}</a></li>
            <li><a href="mailto:support@younameit.works" data-cur>{t('s.ft.contact')}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t('s.ft.legal')}</h4>
          <ul>
            <li><a href={href('/terms')} data-cur>{t('s.ft.terms')}</a></li>
            {/* 🔴 굵게 — 개인정보 보호위원회 처리방침 작성지침: "개인정보 처리방침" 명칭을 쓰고 글자 크기·색 등으로 다른 고지와 구분한다. */}
            <li><a href={href('/privacy')} className="ft-privacy" data-cur>{t('s.ft.privacy')}</a></li>
            <li><a href={href('/refund')} data-cur>{t('s.ft.refund')}</a></li>
            {page !== 'home' ? <li><a href={href('/')} data-cur>{t('s.toBrand')}</a></li> : null}
          </ul>
          {/* 돌은 열의 **끝**이다 — 라벨과 링크 사이에 있으면 라벨이 그림에 붙고 링크가 떨어진다. */}
          <img className="stone-sm" src="/riso/stones/stone-3.webp" alt="" style={{ marginTop: 26 }} />
        </div>
      </div>
      <div className="legal"><span>{t('s.copyright')}</span><span>{t('s.legal.line')}</span></div>
      <BizLine />
    </footer>
  );
}

/* 사업자 줄 — 전자상거래법 §10(사이버몰 **초기화면** 표시 + 공정위 공개페이지 연결) · §13(통신판매업 신고번호).
   셸 푸터라 모든 면(첫 화면 포함)에 같이 선다. 값 = `lib/product.ts` BUSINESS 한 곳 · 라벨 = 사전 `s.biz.*`.
   빈 값(전화 · 신고번호 — 오너 입력 대기)은 줄을 안 그리고, 대신 deployCheck `[biz]` 가 배포를 세운다. */
function BizLine() {
  const { t } = useT();
  const { lang } = useLang();
  const b = BUSINESS;
  const rows: [string, React.ReactNode][] = [
    ['s.biz.name', b.name[lang]],
    ['s.biz.ceo', b.ceo[lang]],
    ['s.biz.regNo', <>{b.regNo} <a href={FTC_BIZ_URL} target="_blank" rel="noopener noreferrer" data-cur>{t('s.biz.verify')}</a></>],
    ...(b.mailOrderNo ? [['s.biz.mailOrder', b.mailOrderNo] as [string, React.ReactNode]] : []),
    ['s.biz.address', b.address[lang]],
    ...(b.phone ? [['s.biz.phone', <a key="tel" href={`tel:${b.phone.replace(/[^\d+]/g, '')}`} data-cur>{b.phone}</a>] as [string, React.ReactNode]] : []),
    ['s.biz.email', <a key="mail" href={`mailto:${b.email}`} data-cur>{b.email}</a>],
    ['s.biz.hosting', b.hosting],
  ];
  return (
    <address className="biz">
      {rows.map(([k, v]) => <span key={k}><b>{t(k)}</b> {v}</span>)}
    </address>
  );
}

export default function Page4({ page, plateTotal, links = [], cta, logo = 'logo-red.webp', rail = false, ownNav = false, children }: {
  page: Page4Kind; plateTotal: number; links?: NavLink[]; cta?: NavLink;
  logo?: string; rail?: boolean;
  /** 제품 네비 대신 넘긴 `links`·`cta` 를 쓴다 — 읽는 면(`ReadingShell`: `/update` · 법 3장 · 404)만. */
  ownNav?: boolean; children: React.ReactNode;
}) {
  const { lang } = useLang();
  useChrome();
  const product = page !== 'home' && !ownNav;
  const nav = product ? AE_NAV : { links, cta };
  return (
    <div className={`p3 p4${page === 'home' ? ' root' : ''}${rail ? ' has-rail' : ''}`} data-lang={lang} data-page={page} id="top">
      <Defs />
      <Surface />
      <div className="ink-bar" id="p3-inkbar" aria-hidden="true" />
      <div className="cur" id="p3-cur" aria-hidden="true" />
      {/* 빈 바탕을 끌어 긋는 빨간 펜의 종이 — 클릭을 막지 않는다(`pointer-events:none`). 획은 scrawl.ts 가 넣는다. */}
      <svg className="scrawl" id="p3-scrawl" aria-hidden="true" focusable="false" />
      <Nav4 page={page} plateTotal={plateTotal} links={nav.links} cta={nav.cta} logo={logo} product={product} />
      {children}
      {rail ? <BuyRail /> : null}
      <Footer4 page={page} />
    </div>
  );
}
