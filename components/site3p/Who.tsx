'use client';
/* 01 Who — 타깃은 AE 를 여는 **모든** 사람이다(오너 2차 판정 §12.6).
   카드에 손을 올리면 "이렇게 말하면" 빨간 판이 들어오고, 모서리의 제품 판이 **버튼 쪽 길**을 같이 보여준다
   = 버튼 하나, 또는 문장 하나. */
import { useT } from './lang';
import { Plate3 } from './Plate3';
import { Spot } from './Spot';

/* 역할 ↔ 그 잡일을 버튼으로 하는 툴. 이름은 패널 정본(builtinScripts.ts `name`)이라 국문에서도 영문이다. */
const ROLES = [
  { n: '01', k: 'r1', spot: 'sequenceLayers', tool: 'Sequence Layers' },
  { n: '02', k: 'r2', spot: 'resizeToComp', tool: 'Fit Layer to Comp' },
  { n: '03', k: 'r3', spot: 'writeOn', tool: 'Write On' },
  { n: '04', k: 'r4', spot: 'anchorPoint', tool: 'Anchor Point' },
];

export default function Who() {
  const { t } = useT();
  return (
    <section className="sec" id="who" data-plate="01" data-name="nav.who">
      <div className="sec-head">
        <div className="no lab"><img src="/riso/stones/stone-6.webp" alt="" />01 &nbsp;·&nbsp; <span>{t('nav.who')}</span></div>
        <h2><Plate3 k="who.h2" black reg press={false} boil={false} /></h2>
        <div className="tag">{t('who.tag')}</div>
      </div>
      <p className="lead" dangerouslySetInnerHTML={{ __html: t('who.lead') }} />
      <div className="roles sweep">
        {ROLES.map((r) => (
          <div className="role gridp tape" key={r.k} tabIndex={0} data-cur>
            <div className="in">
              <div className="top lab"><span>{t('role.l')}</span> {r.n} <i>■</i></div>
              <div>
                <h3>{t(`${r.k}.h`)}</h3>
                <p>{t(`${r.k}.p`)}</p>
              </div>
              <div className="hint">{t('role.hint')}</div>
              <div className="say">
                <b>{t('role.say')}</b>
                <q>{t(`${r.k}.q`)}</q>
                <small>{t(`${r.k}.s`)}</small>
              </div>
            </div>
            <Spot id={r.spot} name={r.tool} or={t('spot.or')} />
          </div>
        ))}
      </div>
    </section>
  );
}
