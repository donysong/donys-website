'use client';
/* 판 B 전용 — 사전예약 판(무료와 Pro 표 ↔ 가격 사이, 원문 `pr-page.preorder.md` "New block").
   🔴 약속은 **출시 묶음 넷**(`PR_LAUNCH_SET` — 무음 컷 고급 · 자막 두 갈래 · Chat)만이다. `prp.open.li1~3` 이 그 세 묶음과 정확히 같아야 한다 —
      하나가 첫 업데이트에서 빠지면 이 목록과 사전예약 메일(PR repo `gtm/email/03`)이 같이 바뀐다.
   그 뒤 Pro 툴은 **이름만, 날짜 없이**(`prp.later.*`). 날짜를 쓰지 마라 — 원문 규칙 3("No date promise"). */
import { Html, useT } from '@/components/site3p/lang';
import { PR_FEATURES, PR_LAUNCH_SET, PR_OFF, type PrFeature } from '@/lib/product';
import Head from './Head';
import { joinNames, type Plate } from './state';

const LATER = PR_FEATURES
  .filter((f) => f.tier === 'pro' && !PR_LAUNCH_SET.includes(f.id) && !PR_OFF.includes(f.id))
  .map((f) => f.id as PrFeature);

export default function Preorder({ no, note }: Plate) {
  const { t, lang } = useT();
  return (
    <section id="preorder" className={note ? 'onnote' : undefined} data-plate={no} data-name="pr.plate.prp">
      <div className="sec tight">
        <Head no={no} stone={7} k="prp.h" />
        <div className="posi">
          <Html k="prp.p" as="p" className="plain" />
          <Html k="prp.why" as="p" className="plain" style={{ opacity: 0.82 }} />
        </div>
        <div className="howto">
          <div>
            <h3>{t('prp.now.h')}</h3>
            <p>{t('prp.now.p')}</p>
          </div>
          <div>
            <h3>{t('prp.open.h')}</h3>
            <ul>{[1, 2, 3].map((n) => <li key={n}>{t(`prp.open.li${n}`)}</li>)}</ul>
          </div>
          <div>
            <h3>{t('prp.later.h')}</h3>
            <p>{t('prp.later.p')}</p>
            {LATER.length ? <p className="pr-more">{joinNames(lang, LATER.map((id) => t(`pr.f.${id}.name`)))}</p> : null}
          </div>
        </div>
        <div className="howto pr-one">
          <div>
            <ul>
              {['prp.date', 'prp.price', 'prp.refund', 'prp.longstop', 'prp.same'].map((k) => <li key={k}>{t(k)}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
