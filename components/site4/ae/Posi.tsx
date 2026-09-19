'use client';
/* 02 포지셔닝 — 신화 한 줄, 그 **바로 다음**에 명사로 갚는 줄.
   처음 온 사람이 멋부린 줄만 들고 나가는 일이 없게 한다(레퍼런스가 예외 없이 지키는 규칙). */
import { Html } from '@/components/site3p/lang';

export default function Posi() {
  return (
    <section id="posi" data-plate="02" data-name="ae.plate.posi">
      <div className="sec tight">
        <div className="posi">
          <Html k="ae.posi.myth" as="p" className="myth" />
          <div>
            <Html k="ae.posi.plain" as="p" className="plain" />
            <Html k="ae.posi.plain2" as="p" className="plain" style={{ marginTop: 16, opacity: 0.82 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
