'use client';
/* 분석·광고 측정 — 동의 배너 + GTM 로더 + 위임 이벤트 리스너. 설계서 = 플러그인 repo donys/docs/ANALYTICS_PLAN.md.
   `SiteHtml` 이 한 번 마운트한다. `GTM_ID` 가 비면 아무것도 렌더·실행하지 않는다(= 지금).

   🔴 이벤트 후크는 **href·`data-plate`·`details` 클래스로 잡는 위임 방식**이다 — 리뉴얼 v5 가 DOM 을 계속 바꾸므로
      GTM 의 CSS 선택자 클릭 트리거에 기대지 않고, 컴포넌트마다 onClick 을 심지도 않는다. 명시 호출은 폼 둘과 필름뿐(상태를 아는 곳).
   🔴 `fixed!` — `.sheet`(site CSS, 레이어 밖)가 `position: relative` 를 줘서 Tailwind 의 `fixed` 를 이긴다. 중요 표시(`!`) 없이는 배너가 문서 맨 끝에 박혀 안 보인다(2026-10-20 실측 — DOM 만 보면 놓친다).
   🔴 배너의 수락/거부는 **같은 크기·같은 무게**다 — 거부를 숨기면 EU 에서 동의가 무효다. 카피는 오너 확인 대상(ANALYTICS_PLAN A6). */
import { useEffect, useState } from 'react';
import { readConsent, writeConsent, type Consent } from '@/lib/consent';
import {
  ANALYTICS_ON, classifyLink, pageKindOf, placementOf, startGtm, stopAndReload, track, trackCommerce,
} from '@/lib/analytics';
import { ROWS } from '@/lib/googleTransfer';   // 국외 이전 5항목 — 방침 제7조 표와 같은 글자(이 배너가 동의 화면을 겸한다)

const T = {
  en: {
    text: 'We would like to use cookies to count visits (Google Analytics). Nothing from Google loads unless you say yes. Pressing Accept also means you agree to the transfer abroad described below. Cookie-free visit stats from Cloudflare run either way.',
    more: 'Transfer abroad — details',
    accept: 'Accept',
    reject: 'Reject',
    policy: 'Privacy Policy',
    href: '/privacy',
  },
  ko: {
    text: '방문 통계(Google Analytics)를 위해 쿠키를 쓰려 합니다. 동의하시기 전에는 Google 에서 아무것도 불러오지 않습니다. ‘동의’를 누르시면 아래 국외 이전에도 동의하시는 것입니다. 쿠키 없는 방문 통계(Cloudflare)는 어느 쪽이든 동작합니다.',
    more: '국외 이전 안내 — 자세히',
    accept: '동의',
    reject: '거부',
    policy: '개인정보 처리방침',
    href: '/ko/privacy',
  },
} as const;

/** Polar `{CHECKOUT_ID}` 치환값. 없으면 구매로 세지 않는다. */
const checkoutId = () => new URLSearchParams(location.search).get('checkout_id');

/** 위임 리스너를 걸고 해제 함수를 돌려준다. 동의 granted 이후에만 부른다. */
function attachEvents(): () => void {
  /* 사용자가 summary 를 눌러 연 토글만 센다 — Docs 는 해시 앵커로 들어오면 카드가 *자동으로* 펼쳐진다(Usage.tsx). */
  let pressed: { el: Element | null; t: number } = { el: null, t: 0 };

  const onClick = (e: MouseEvent) => {
    const target = e.target as Element | null;
    const sum = target?.closest('summary');
    if (sum) pressed = { el: sum.parentElement, t: Date.now() };
    const a = target?.closest('a[href]') as HTMLAnchorElement | null;
    if (!a) return;
    const ev = classifyLink({ href: a.getAttribute('href') || '', hreflang: a.getAttribute('hreflang'), dl: a.dataset.dl });
    if (!ev) return;
    const placement = placementOf(a);
    if (ev.kind === 'checkout') trackCommerce('begin_checkout', ev.item, { placement });
    else if (ev.kind === 'download') track('file_download', { file_name: ev.file, file_extension: ev.ext, placement, ...(ev.tier ? { tier: ev.tier } : {}) });
    else if (ev.kind === 'mail') track('contact_click', { placement });
    else if (ev.kind === 'lang') track('language_switch', { to_lang: ev.to });
  };

  const onToggle = (e: Event) => {
    const d = e.target as HTMLDetailsElement | null;
    if (!d || d.tagName !== 'DETAILS' || !d.open) return;
    if (pressed.el !== d || Date.now() - pressed.t > 1000) return;
    if (d.classList.contains('qa')) track('faq_open', { faq_id: d.dataset.faq || 'unknown' });
    else if (d.classList.contains('usage')) {
      /* 앵커 id(`tool-…` · `catalog-…`)는 카드가 쥐고 사용법이 그 안에 있다. 패널만 표라서 사용법이 앵커 행(`tr#panel-…`) *다음 행* 에 있다(Panels.tsx). */
      const owner = d.closest('[id^="tool-"],[id^="catalog-"]') ?? d.closest('tr.usage-row')?.previousElementSibling;
      track('docs_usage_open', { tool_id: owner?.id || 'unknown' });
    }
  };

  /* 판(plate) 도달 — 50% 보이거나, 판이 화면보다 커서 50% 가 불가능하면 화면 절반 이상이 판일 때. 판당 한 번. */
  const seen = new Set<string>();
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const el = en.target as HTMLElement;
      if (!en.isIntersecting || seen.has(el.id)) continue;
      if (en.intersectionRatio < 0.5 && en.intersectionRect.height < innerHeight * 0.5) continue;
      seen.add(el.id);
      track('section_view', { section_id: el.id || 'unknown', plate_no: el.dataset.plate || '' });
    }
  }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
  document.querySelectorAll('section[data-plate]').forEach((s) => io.observe(s));

  document.addEventListener('click', onClick);
  document.addEventListener('auxclick', onClick);   // 가운데 버튼으로 새 탭에 여는 결제 링크도 의도다
  document.addEventListener('toggle', onToggle, true);   // toggle 은 버블하지 않는다 — 캡처로 받는다
  return () => {
    document.removeEventListener('click', onClick);
    document.removeEventListener('auxclick', onClick);
    document.removeEventListener('toggle', onToggle, true);
    io.disconnect();
  };
}

/** 페이지 종류별 1회성 이벤트. */
function pageEvents(): void {
  const kind = pageKindOf(location.pathname);
  if (kind === 'ae') trackCommerce('view_item', 'ae-pro');
  if (kind === 'thanks') {
    const id = checkoutId();
    if (!id) return;
    /* 새로고침으로 구매가 늘지 않게 — 주문 ID 당 이 브라우저에서 한 번. 저장소가 막히면 매번 센다(과대 집계 방향이라 드문 경우만 받아들인다). */
    const key = `yni-purchase-${id}`;
    try { if (localStorage.getItem(key)) return; localStorage.setItem(key, '1'); } catch { /* 저장소 없음 */ }
    trackCommerce('purchase', 'ae-pro', {}, { transaction_id: id });
  }
}

export default function Analytics({ lang }: { lang: 'en' | 'ko' }) {
  const [choice, setChoice] = useState<Consent | null | undefined>(undefined);   // undefined = 아직 안 읽음(SSR 과 첫 렌더가 같아야 한다)
  const [reopen, setReopen] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_ON) return;
    setChoice(readConsent());
    const onChange = () => { setChoice(readConsent()); setReopen(false); };
    const onOpen = () => setReopen(true);
    window.addEventListener('yni:consent', onChange);
    window.addEventListener('yni:consent-open', onOpen);
    return () => { window.removeEventListener('yni:consent', onChange); window.removeEventListener('yni:consent-open', onOpen); };
  }, []);

  useEffect(() => {
    if (choice !== 'granted') return;
    startGtm();
    pageEvents();
    return attachEvents();
  }, [choice]);

  if (!ANALYTICS_ON || (choice !== null && !reopen)) return null;
  const t = T[lang];
  const decide = (c: Consent) => {
    const was = readConsent();
    writeConsent(c);
    if (c === 'denied' && was === 'granted') stopAndReload();
  };
  const btn = 'btn-line font-bold';   // 두 버튼 같은 클래스 — 크기·무게 동일(거부를 숨기지 않는다)
  return (
    <div role="dialog" aria-label="Cookies" aria-live="polite" className="sheet fixed! inset-x-4! bottom-4! z-[60]! mx-auto max-h-[85vh] max-w-2xl overflow-y-auto p-5 [--m:1]">
      <p className="text-[14px] leading-relaxed">
        {t.text}{' '}
        <a className="font-semibold underline underline-offset-4" href={t.href} data-cur>{t.policy}</a>
      </p>
      <details className="mt-3">
        <summary className="cursor-pointer text-[14px] font-semibold" data-cur>{t.more}</summary>
        <dl className="mt-2 grid grid-cols-1 gap-x-3 gap-y-1 text-[13px] leading-snug text-[var(--text-secondary)] sm:grid-cols-[minmax(0,7.5rem)_1fr]">
          {ROWS[lang].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-semibold text-[var(--text-primary)]">{k}</dt>
              <dd className="m-0 [overflow-wrap:anywhere] max-sm:mb-1.5">{v}</dd>
            </div>
          ))}
        </dl>
      </details>
      <p className="mt-4 flex flex-wrap gap-3">
        <button type="button" className={btn} onClick={() => decide('granted')} data-cur>{t.accept}</button>
        <button type="button" className={btn} onClick={() => decide('denied')} data-cur>{t.reject}</button>
      </p>
    </div>
  );
}
