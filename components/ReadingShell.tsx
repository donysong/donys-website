/* 읽는 면 셸 — `/update` · `/ko/update` · 법 3장(`/terms` `/privacy` `/refund`) · 404.
   🔴 셸은 **site4 `Page4` 를 가져다 쓰기만** 한다. 구 `Navbar`/`Footer` 는 2026-09-26 에 지웠다 —
   그 네비의 `Buy`·`Pricing`·`Proof`·`Panels` 가 전부 브랜드 루트에 **없는 앵커**(`/#pricing` 등)로 갔고,
   내부 색번호(`INK E50437`)를 노출했고, 국문 면에서도 영어였다. 되살리지 마라.

   네비 = 로고 · `AE Plugin`(외곽선, 제품 진입) · EN/KO — `/ae/docs` 네비와 같은 모양. 이 면들의 독자는 대부분 **이미 산 사람**이라
   네비에 결제 버튼을 두지 않는다(결제는 셸 푸터의 `Buy — $49.99` 한 곳).
   🔴 `langSwitch={false}` = 짝 언어가 없는 면(법 3장·404). 셸의 전환은 `/ko` 를 앞에 붙인 주소로 가므로
   켜 두면 **404 로 가는 버튼**이 된다. 국문 독자에게 이유는 셸 푸터의 한 줄(`s.ft.legal.lang`)이 말한다. */
import { LangProvider } from '@/components/site3p/lang';
import Page4 from '@/components/site4/Shell';

export default function ReadingShell({ lang, plate, langSwitch = true, children }: {
  lang: 'en' | 'ko';
  /** 네비 판 라벨에 찍힐 사전 키(`lib/copy/shared.ts`) — 예: `s.ft.notes` */
  plate: string;
  langSwitch?: boolean;
  children: React.ReactNode;
}) {
  /* `page="docs"` = 읽는 면 판면(`--field:1160px`)과 Docs 네비 규칙(절 링크 숨김 — site4.css)을 같이 탄다.
     그래서 네비 링크는 비운다: Docs 로 가는 길은 본문(설치 안내 링크)과 셸 푸터가 갖는다. */
  const shell = (
    <Page4 page="docs" plateTotal={1} links={[]} cta={{ href: '/ae', k: 's.toProduct' }}>
      <section className="sec" data-plate="01" data-name={plate}>{children}</section>
    </Page4>
  );
  return (
    <LangProvider initial={lang}>
      {/* `!` = important — `.p3 .langs` 가 레이어 밖 규칙이라 Tailwind 유틸리티(레이어 안)가 평소엔 진다. */}
      {langSwitch ? shell : <div className="[&_.langs]:hidden!">{shell}</div>}
    </LangProvider>
  );
}

/* 제목 잉크 판 — `site3p/Plate3` 와 같은 마크업(흰 테 · 녹아웃 · 빨간 잉크)을 **사전 키 없이** 쓴다.
   Plate3 는 사전 키만 받는데, 이 면들의 제목은 `lib/copy` 밖(페이지 지역 사전·법 문서)에 산다.
   🔴 `width:auto` — `.p3 h1 .pl` 이 `max-content` 라 긴 제목("Terms of Service")이 390 폭에서 판 밖으로 나간다. */
export function InkTitle({ children }: { children: string }) {
  return (
    <h1 className="disp" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.4rem)', margin: '8px 0 14px' }}>
      <span className="pl press boil" style={{ width: 'auto' }}>
        <span className="rim" aria-hidden="true">{children}</span>
        <span className="ko" aria-hidden="true">{children}</span>
        <span className="ink">{children}</span>
      </span>
    </h1>
  );
}
