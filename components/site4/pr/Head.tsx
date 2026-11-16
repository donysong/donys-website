'use client';
/* `/pr` plate head — the **same markup** as the v5 `/ae` sections (`.sec-head` > stone + plate number · ink title · tag on the right,
   title not boiled). */
import { Html } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { asset } from '@/lib/asset';

export default function Head({ no, stone, k, tag }: { no: string; stone: number; k: string; tag?: string }) {
  return (
    <div className="sec-head">
      <div className="no"><img src={asset(`/riso/stones/stone-${stone}.webp`)} alt="" /> <span className="lab">{no}</span></div>
      <h2 className="disp"><Plate3 k={k} boil={false} /></h2>
      {tag ? <Html k={tag} as="p" className="tag" /> : null}
    </div>
  );
}
