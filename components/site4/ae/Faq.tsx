'use client';
/* 06 FAQ — 🔴 답이 **판정어 한 마디**로 시작한다(펼치기 전에 읽힌다). 12문 3그룹.
   부정문을 피하지 않는다 — *"브리프 한 줄 넣으면 영상이 나오나요? — 아닙니다"* 가 이 제품의 정의다.
   `{portal}` 은 여기서 채운다(`lib/copy.ts` 자리표시자 표에 없다) — 이미 산 사람의 유일한 자기 서비스 창구다. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { PORTAL_URL } from '@/lib/product';

const GROUPS = [
  { lab: 'ae.faq.g1', qs: [1, 2, 3] },
  { lab: 'ae.faq.g2', qs: [4, 5, 6, 7] },
  { lab: 'ae.faq.g3', qs: [8, 9, 10, 11, 12] },
];

export default function Faq() {
  const { t } = useT();
  return (
    <section id="faq" data-plate="06" data-name="ae.plate.faq">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-1.webp" alt="" /> <span className="lab">06</span></div>
          <h2 className="disp"><Plate3 k="ae.faq.h" boil={false} /></h2>
          <Html k="ae.faq.tag" as="p" className="tag" />
        </div>
        {GROUPS.map((g) => (
          <div className="faq-group" key={g.lab}>
            <span className="lab">{t(g.lab)}</span>
            {g.qs.map((n) => (
              <details className="qa" key={n}>
                <summary data-cur>
                  <span className="q">{t(`ae.q${n}.q`)}</span>
                  <span className="verdict">{t(`ae.q${n}.v`)}</span>
                </summary>
                <p className="a" dangerouslySetInnerHTML={{ __html: t(`ae.q${n}.a`).split('{portal}').join(PORTAL_URL) }} />
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
