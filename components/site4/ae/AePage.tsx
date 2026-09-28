'use client';
/* `/ae` — 제품 페이지. 정본 = 정적 프로토 `proto4/ae.html` (플러그인 repo research/website-2026-09).
   판 순서 = 인쇄 순서: 표지(히어로) → 01 누구를 → 02 무엇인가 → 03 기능 → 04 가격 →
   05 새 기능 → 06 FAQ → 사양.
   🔴 04 가격 ↔ 05 새 기능은 **오너 판정 2026-09-29** 로 자리를 바꿨다(*"업데이트 로그와 구매란 순서 바꾸는 게 좋을 듯"*).
   종이 = 파랑 ↔ 노트(`.onnote`) 교대: 표지·01 파랑 · 02 노트 · 03 파랑 · 04 노트 · 05 파랑 · 06+사양 노트 · 푸터 검정
   (같은 날 오너 *"파란 배경과 노트 재질 배경이 적당히 서로 왔다갔다"* — 구 검정 판 01·05 를 걷었다). 판 클래스는 각 섹션이 단다 —
   🔴 06 FAQ 와 사양만 **감싸개 한 장**이다: 사양은 윗여백 없이 FAQ 를 잇는 부록이라, 따로 칠하면 경계에서 모눈 위상이 끊기고
   파랑이면 `SPECS` 머리가 종이 경계에 붙는다(2026-09-29 실측). Docs 끝(05 설치 노트 → 푸터)과 같은 마감이다.
   🔴 구 `07 다음 것`(*"Untitled, still"*)은 2026-09-26 에 뺐다 — 브랜드 서사 0 규칙(아래 ①) 위반이었고
   구매자에게 그 자리에 있을 이유가 없었다. 라인업의 빈 행은 브랜드 루트(`/`)가 갖는다.
   🔴 설치 순서는 이 페이지에 없다 — 읽는 면(`/ae/docs#install`)이 갖고, 히어로 원·FAQ·사양표가 거기로 보낸다.

   🔴 이 페이지가 지키는 규칙 셋(레퍼런스 battleaxe.co 실측):
     ① 본문에 브랜드 서사 0단어 — 브랜드로 가는 길은 푸터뿐이다(셸이 건다).
     ② 가격 전에 증거 — 기능 5블록 · 후킹 6장이 가격 위에 있다.
        ⚠️ 구 문구는 *"릴리스가 전부 가격 위"* 였다 — 오너 판정 2026-09-29 로 **뒤집혔다**: 업데이트 로그(05)는 가격(04) 아래다.
     ③ 가격 섹션에 버튼이 없다 — 스티키 레일(45% 점화)이 CTA 를 독점한다.
   🔴 CTA 는 전부 **실제 체크아웃**으로 간다(레일 · 히어로 원 · 네비 버튼). 프로토는 셋 다 `#price`
   였고 그 섹션엔 버튼이 없어서 **팔 수 없는 페이지**였다 — 그 결함을 이식하지 마라. */
import Page4 from '@/components/site4/Shell';
import Hero from './Hero';
import Who from './Who';
import Posi from './Posi';
import Features from './Features';
import News from './News';
import Price from './Price';
import Faq from './Faq';
import Specs from './Specs';

/* 네비(절 링크 · 구매 버튼)는 셸의 `AE_NAV` 한 벌이다(§16-23) — 여기서 `links`·`cta` 를 넘기지 마라. */
export default function AePage() {
  return (
    <Page4 page="ae" plateTotal={6} rail>
      <Hero />
      <Who />
      <Posi />
      <Features />
      <Price />
      <News />
      <div className="onnote">
        <Faq />
        <Specs />
      </div>
    </Page4>
  );
}
