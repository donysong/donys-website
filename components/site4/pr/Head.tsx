'use client';
/* `/pr` 판 머리 — `/ae` 섹션들과 **같은 마크업**이다(`.sec-head` > 돌 + 판 번호 · 잉크 제목 · 오른쪽 태그, 제목은 끓이지 않는다).
   판 번호는 PrPage 가 판 순서로 매긴다(판 B 에선 사전예약 판이 하나 끼어 번호가 밀린다). */
import { Html } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

export default function Head({ no, stone, k, tag }: { no: string; stone: number; k: string; tag?: string }) {
  return (
    <div className="sec-head">
      <div className="no"><img src={`/riso/stones/stone-${stone}.webp`} alt="" /> <span className="lab">{no}</span></div>
      <h2 className="disp"><Plate3 k={k} boil={false} /></h2>
      {tag ? <Html k={tag} as="p" className="tag" /> : null}
    </div>
  );
}
