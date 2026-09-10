/* 인쇄 재질 — 종이 두 겹(결 · 롤러 얼룩)과 눌린 가장자리 필터.
   레이아웃에서 한 번만 렌더된다.

   🔴 필터를 대면적에 걸지 마라 (globals.css 주석 · 계획서 §3.3).
      `feTurbulence` 는 가장 비싼 프리미티브고 Safari 는 큰 요소에서 렌더를 거부한다.
      여기 정의만 두고, 거는 자리는 헤드라인 · CTA · 카드 테두리 같은 소면적이다.
   🔴 `#roller` 는 예외적으로 화면 전체에 걸린다 — 저주파(baseFrequency .002)라
      타일 계산이 가볍고, 이게 "잉크 농도가 고르지 않다" 를 만드는 유일한 신호다.
      느려지면 여기를 구운 PNG 로 바꾼다(계획서 §6 이미지 항). */
export default function RisoDefs() {
  return (
    <>
      <div className="paper-stock" aria-hidden="true">
        <div className="fiber" />
        <div className="grain" />
        <div className="roller" />
      </div>
      {/* 인쇄된 것 위에도 한 겹 — 실제 필름 그레인은 피사체를 덮는다 */}
      <div className="film-grain" aria-hidden="true" />

      <div className="trim-marks" aria-hidden="true">
        <span className="regmark" style={{ top: 0, left: 0 }} />
        <span className="regmark" style={{ top: 0, right: 0 }} />
        <span className="regmark" style={{ bottom: 0, left: 0 }} />
        <span className="regmark" style={{ bottom: 0, right: 0 }} />
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      >
        <defs>
          {/* 눌린 가장자리 — 하우스 Roughen Edges(border 4 · scale 20)의 웹 대응 */}
          <filter id="press" x="-6%" y="-10%" width="112%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={2} seed={4} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="0.35" />
          </filter>

          {/* 🔴 하우스 위글 — 판이 **6fps 로 다시 그려진다**.
              정본 = `HOVER_PREVIEW_RECIPE` §4 `Posterize Time (6)` + §6-b 의 실측:
              동봉 텍스처 6장은 "진행하는 애니가 아니라 **독립 노이즈 draw**" 다
              (인접 프레임 diff 5.2~5.8 · f1↔f7 도 5.35 = 순서가 없다).
              ⇒ 부드럽게 흔드는 게 아니라 **discrete 로 갈아끼운다.** 이게 기각당한
                 "삼류 디지털 글리치" 와 갈리는 지점이다 — 글리치는 매끄럽게 움직인다. */}
          <filter id="press-boil" x="-6%" y="-10%" width="112%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={2} seed={4} result="n">
              <animate
                attributeName="seed"
                values="4;23;41;12;58;31"
                dur="1s"
                calcMode="discrete"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="0.35" />
          </filter>

          {/* 흰 판은 **다른 draw** 를 탄다 — 두 판이 같이 떨면 한 덩어리로 읽힌다.
              어긋남 자체가 숨쉬는 게 리소다. 값 순서·길이 둘 다 다르게 둔다. */}
          <filter id="press-boil-rim" x="-6%" y="-10%" width="112%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={2} seed={17} result="n">
              <animate
                attributeName="seed"
                values="17;52;8;36;61;27"
                dur="1.16s"
                calcMode="discrete"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="0.35" />
          </filter>

          {/* 작은 요소용 — 같은 결, 약한 압력 */}
          <filter id="press-fine" x="-6%" y="-10%" width="112%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves={2} seed={9} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* 롤러 얼룩 — 저주파 저채도 노이즈. 알파를 1로 눌러 면 전체를 덮는다 */}
          <filter id="roller" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.004" numOctaves={3} seed={11} result="n" />
            <feColorMatrix in="n" type="saturate" values="0" result="g" />
            <feComponentTransfer in="g">
              <feFuncR type="gamma" amplitude={1} exponent={1.6} />
              <feFuncG type="gamma" amplitude={1} exponent={1.6} />
              <feFuncB type="gamma" amplitude={1} exponent={1.6} />
              <feFuncA type="linear" slope={0} intercept={1} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
    </>
  );
}
