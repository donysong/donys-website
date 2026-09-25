'use client';
/* 02 포지셔닝 — 신화 한 줄, 그 **바로 다음**에 명사로 갚는 줄.
   처음 온 사람이 멋부린 줄만 들고 나가는 일이 없게 한다(레퍼런스가 예외 없이 지키는 규칙).
   🔴 2026-09-26 — 판 머리(`02` + 제목)를 달았다. 전엔 이 판만 머리가 없어서 화면의 번호가
   01 → 03 으로 튀었다(네비는 `PLATE 02` 를 세는데 면에는 02 가 없었다). 판 머리는 이 페이지의 문법이다. */
import { Html } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

export default function Posi() {
  return (
    <section id="posi" data-plate="02" data-name="ae.plate.posi">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-5.webp" alt="" /> <span className="lab">02</span></div>
          <h2 className="disp"><Plate3 k="ae.plate.posi" boil={false} /></h2>
        </div>
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
