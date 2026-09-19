'use client';
/* Docs 섹션 머리 — 돌 + 판 번호 + 잉크 제목 + 오른쪽 태그.
   `site3p.css` 의 `.sec-head` 어휘 그대로다(새 클래스 0). 제목은 Plate3 = 흰 녹아웃 위 빨간 잉크. */
import { Plate3 } from '@/components/site3p/Plate3';
import { Html } from '@/components/site3p/lang';

export default function SecHead({ no, stone, k, tag }: { no: string; stone: number; k: string; tag: string }) {
  return (
    <div className="sec-head">
      <div className="no">
        <img src={`/riso/stones/stone-${stone}.webp`} alt="" /> <span className="lab">{no}</span>
      </div>
      <h2 className="disp"><Plate3 k={k} /></h2>
      <Html k={tag} as="p" className="tag" />
    </div>
  );
}
