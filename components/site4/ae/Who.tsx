'use client';
/* 01 Who — 구매자는 기능 목록 앞에서 **자기를 먼저 찾는다.**
   카드마다 "당신이 말할 문장"(호버하면 들어오는 빨간 판)을 둔다.
   🔴 툴 연결(`Spot` 판 + "또는 누르기 <툴>")은 2026-09-28 에 뺐다(§16-7b 오너 — *"페르소나별 기능이 매치가
      안 된다"*). 카드는 **페르소나 + 말할 문장**만 든다. 툴 판을 다시 달지 마라 — 증거 판은 03 기능이 갖는다.
   판 = 파란 종이(2026-09-29 — 구 검정 판을 걷었다, AePage 머리 주석). 크림 모눈 카드는 파랑 위에서 서는 하우스 부품이라
   노트 판에 올리지 않았다 — 모눈 위 모눈은 카드가 바닥에 묻힌다.
   🔴 EN 은 v3.3 번역 그대로지만 **KO 는 프로토4 가 다시 썼다**(v33 은 반말, 이 페이지는 존댓말).
      그래서 키가 `ae.r1.*` 로 네임스페이스돼 있다 — `r1.*` 로 되돌리면 말투가 여기서만 튄다.
   🔴 마크업은 하우스 계약이다: article.role.gridp > div.in + div.say. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';

const ROLES = [
  { n: '01', k: 'r1' },
  { n: '02', k: 'r2' },
  { n: '03', k: 'r3' },
  { n: '04', k: 'r4' },
];

export default function Who() {
  const { t } = useT();
  return (
    <section id="who" data-plate="01" data-name="ae.plate.who">
      <div className="sec tight">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-2.webp" alt="" /> <span className="lab">01</span></div>
          <h2 className="disp"><Plate3 k="ae.who.h" boil={false} /></h2>
          <Html k="ae.who.tag" as="p" className="tag" />
        </div>
        <div className="roles sweep">
          {ROLES.map((r) => (
            <article className="role gridp" tabIndex={0} data-cur key={r.k}>
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
