'use client';
/* 01 Who — 구매자는 기능 목록 앞에서 **자기를 먼저 찾는다.**
   카드마다 "당신이 말할 문장"(호버하면 들어오는 빨간 판) + 같은 잡일의 **버튼 쪽**을 같이 둔다.
   🔴 EN 은 v3.3 번역 그대로지만 **KO 는 프로토4 가 다시 썼다**(v33 은 반말, 이 페이지는 존댓말).
      그래서 키가 `ae.r1.*` 로 네임스페이스돼 있다 — `r1.*` 로 되돌리면 말투가 여기서만 튄다.
   🔴 마크업은 하우스 계약이다: article.role.gridp > figure.spot-fig + div.in + div.say. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { Spot } from '@/components/site3p/Spot';

/* 역할 ↔ 그 잡일을 버튼으로 하는 툴. 툴 이름은 패널 정본이라 국문에서도 영문이다. */
const ROLES = [
  { n: '01', k: 'r1', spot: 'sequenceLayers', tool: 'Sequence Layers' },
  { n: '02', k: 'r2', spot: 'resizeToComp', tool: 'Fit Layer to Comp' },
  { n: '03', k: 'r3', spot: 'writeOn', tool: 'Write On' },
  { n: '04', k: 'r4', spot: 'anchorPoint', tool: 'Anchor Point' },
];

export default function Who() {
  const { t } = useT();
  return (
    <section id="who" data-plate="01" data-name="ae.plate.who">
      <div className="sec tight" style={{ paddingBottom: 40 }}>
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-2.webp" alt="" /> <span className="lab">01</span></div>
          <h2 className="disp"><Plate3 k="ae.who.h" boil={false} /></h2>
          <Html k="ae.who.tag" as="p" className="tag" />
        </div>
        <div className="roles sweep">
          {ROLES.map((r) => (
            <article className="role gridp" tabIndex={0} data-cur key={r.k}>
              <Spot id={r.spot} name={r.tool} or={t('ae.spot.or')} />
              <div className="in">
                <div className="top"><span className="lab lc">{t('ae.role.l')}</span><i>{r.n}</i></div>
                <h3>{t(`ae.${r.k}.h`)}</h3>
                <p>{t(`ae.${r.k}.p`)}</p>
                <div className="hint">{t('ae.role.hint')}</div>
              </div>
              <div className="say">
                <b>{t('ae.role.say')}</b>
                <q>{t(`ae.${r.k}.q`)}</q>
                <small>{t(`ae.${r.k}.s`)}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
