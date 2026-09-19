'use client';
/* 00 표지 — 태그라인 2줄, 그게 전부다 (레퍼런스는 14단어).
   🔴 `id="top"` 을 여기 달지 마라 — `Shell.tsx` 의 루트 div 가 이미 그 앵커를 들고 있다.
   스탠스 줄(타자기)이 브랜드 서사(#brand)로 가는 유일한 링크다 — 네비 항목이 아니라 문장이다. */
import { Plate3 } from '@/components/site3p/Plate3';
import Typed from '@/components/site3p/Typed';
import { Html, useT } from '@/components/site3p/lang';

/* 고무 스탬프 — 누르면 다시 찍힌다(proto4.js 와 같은 동작). 처음엔 안 찍는다. */
export function rePress(e: React.MouseEvent<HTMLSpanElement>) {
  const s = e.currentTarget;
  s.classList.remove('press');
  void s.offsetWidth;
  s.classList.add('press');
}

export default function Hero() {
  const { t } = useT();
  return (
    <header className="hero">
      <div>
        <span className="stamp black" onClick={rePress}><span className="dot" />{t('home.hero.stamp')}</span>
        {/* 🔴 `{' '}` 를 지우지 마라 — JSX 는 두 엘리먼트 사이의 **줄바꿈 공백을 없앤다**.
            `.pl` 은 inline-block 이라 공백이 사라지면 "뭐든말만 해." 로 붙는다(프로토 HTML 은 공백이 있다).
            같은 함정이 `components/site3p/Hero.tsx` 에 이미 걸려 있다 — 거기선 줄이 어차피 넘쳐서 안 보일 뿐이다. */}
        <h1 className="disp">
          <Plate3 k="home.hero.h1a" />{' '}
          <Plate3 k="home.hero.h1b" />
        </h1>
        <Html k="home.hero.sub" as="p" className="sub" />
        <a className="typed-link" href="#brand" data-cur>
          <Typed k="home.hero.typed" />
        </a>
      </div>
      <figure className="sticky" style={{ rotate: '-1.4deg', padding: 26 }}>
        <img src="/riso/stones/stone-5.webp" alt="" style={{ width: '100%' }} />
        <figcaption className="lab lc" style={{ marginTop: 14, opacity: 0.7 }}>{t('home.hero.fig')}</figcaption>
      </figure>
    </header>
  );
}
