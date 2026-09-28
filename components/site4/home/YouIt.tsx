'use client';
/* `You [      ] It` — 이름의 가운데가 빈칸이고, 방문자가 빨간 펜으로 거기 쓴다 (오너 2026-09-28 §16-20 2라운드:
   *"루트 브랜드 섹션, 방문자가 빨간 펜 커서로 빈칸에 쓴다"* · 21 드로잉과 한 세트).
   브랜드 원칙 NAMING *"정답은 주지 않는다 — 붙이는 건 창작자가 한다"* 를 설명하지 않고 **해 보게** 한다.

   - 획은 페이지에 있는 동안 남는다(페이지 획은 바래지만 여기는 아니다). 저장하지 않는다 — 새로 열면 다시 빈칸이다.
   - 손가락으로도 쓴다: `touch-action:none` 은 **빈칸 안에만** 건다(페이지 스크롤을 뺏지 않는다).
   - 🔴 빈칸을 채워 두지 마라(예시 글씨 · 자리표시자). 비어 있는 게 내용이다.
   - 대괄호·글자는 검정 잉크 — 리소 어긋남은 히어로 큰 제목만(§16-13). */
import { useRef, useState } from 'react';
import { useT } from '@/components/site3p/lang';
import { startStroke } from '@/components/site3p/scrawl';

export default function YouIt() {
  const { t } = useT();
  const svg = useRef<SVGSVGElement>(null);
  const [inked, setInked] = useState(false);

  const down = (e: React.PointerEvent<SVGSVGElement>) => {
    const s = svg.current;
    if (!s || e.button !== 0) return;
    e.preventDefault();   // 옆 글자(`You [`)로 선택이 번지지 않게
    startStroke(s, e.nativeEvent, (m) => {
      const r = s.getBoundingClientRect();
      return [m.clientX - r.left, m.clientY - r.top];
    }, { dot: true, onEnd: (p) => { if (p) setInked(true); } });
  };
  const clear = () => { svg.current?.replaceChildren(); setInked(false); };

  return (
    <div className="youit">
      <p className="youit-line disp">
        <span>You</span>
        <span className="youit-br">[</span>
        <span className="youit-slot">
          <svg ref={svg} onPointerDown={down} aria-hidden="true" focusable="false" />
        </span>
        <span className="youit-br">]</span>
        <span>It</span>
      </p>
      <p className="youit-note">
        <span>{t('home.youit.hint')}</span>
        {inked ? <button type="button" className="youit-clear" onClick={clear} data-cur>{t('home.youit.clear')}</button> : null}
      </p>
    </div>
  );
}
