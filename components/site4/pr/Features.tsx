'use client';
/* 03 기능 — 블록 넷(무음 컷 · 자막 · Chat · 툴킷) + 할 수 없는 것 + 준비 중.
   블록마다 = 명사 헤드라인과 풀이(좌) | 그 묶음의 **켜진 기능** 한 줄씩(우, 원문 `feature-claims.json` 의 claim + 작은 글씨 note).
   🔴 증거 판(패널 화면)이 아직 없다 — `/ae` 의 `.feat` 는 판(좌 60%) + 글(우 40%)인데 여기는 글뿐이라 `pr-text`(좌 40% · 우 60%)로 앉혔다.
      화면은 **출고 태그 빌드**에서만 찍는다(AE §15.3 — dev 빌드에서 찍었다가 못 사는 기능을 판 전례). 판 B 에선 Pro 화면을 싣지 않는다.
   🔴 원문 태그: 블록 머리(`pr.cut.h` = autocut.basic · `pr.cap.h` = captions.longform · `pr.chat.h` = chat)가 꺼지면 블록째 빠진다.
      `pr.cant.li3` 는 speedramp 태그 — 꺼지면 그 줄이 빠진다.
   준비 중 = 출고에서 꺼진 기능의 **이름만**(원문 4b — 주장 · 화면 · 날짜 없음). 판 B 에선 Pro 기능을 여기 안 싣는다(사전예약 판이 갖는다).
   `keyauto` 는 파는 기능이 아니라 설정이라 어디에도 안 나온다(FAQ 만). */
import { Html, useT } from '@/components/site3p/lang';
import { PR_MODE, PR_OFF, type PrFeature } from '@/lib/product';
import { prClaimable, prFeaturesIn, prTier } from '@/lib/pr';
import { T } from '@/lib/copy';
import Head from './Head';
import type { Plate } from './state';

/* note 가 없는 기능도 있다(사전에 키가 없다) — `t()` 는 없는 키를 키 이름으로 돌려주므로 사전을 직접 본다. */
const hasNote = (id: PrFeature) => `pr.f.${id}.note` in T.en;

function Claims({ ids }: { ids: PrFeature[] }) {
  const { t } = useT();
  return (
    <ul className="pr-claims">
      {ids.map((id) => (
        <li key={id}>
          <b>{t(`pr.f.${id}.name`)}</b> — {t(`pr.f.${id}.claim`)}
          {hasNote(id) ? <i>{t(`pr.f.${id}.note`)}</i> : null}
        </li>
      ))}
    </ul>
  );
}

export default function Features({ no, note }: Plate) {
  const { t } = useT();
  const pre = PR_MODE === 'preorder';
  const on = (group: string) => prFeaturesIn(group).filter(prClaimable);
  const tools = on('toolkit');
  const planned = PR_OFF.filter((id) => id !== 'keyauto' && (!pre || prTier(id) === 'free'));
  const cant = [1, 2, 3, 4, 5].filter((n) => n !== 3 || prClaimable('speedramp'));
  return (
    <section id="what" className={note ? 'onnote' : undefined} data-plate={no} data-name="pr.plate.what">
      <div className="sec" style={{ paddingBottom: 40 }}>
        <Head no={no} stone={4} k="pr.what.h" tag="pr.what.tag" />

        {prClaimable('autocut.basic') ? (
          <div className="feat pr-text sweep">
            <div>
              <h3>{t('pr.cut.h')}</h3>
              <Html k="pr.cut.p" as="p" />
              <p className="pr-note">{t('pr.cut.note')}</p>
            </div>
            <Claims ids={on('autocut')} />
          </div>
        ) : null}

        {prClaimable('captions.longform') ? (
          <div className="feat pr-text sweep">
            <div>
              <h3>{t('pr.cap.h')}</h3>
              <Html k="pr.cap.p" as="p" />
            </div>
            <Claims ids={on('captions')} />
          </div>
        ) : null}

        {prClaimable('chat') ? (
          <div className="feat pr-text sweep">
            <div>
              <h3>{t('pr.chat.h')}</h3>
              <Html k="pr.chat.p1" as="p" />
              <Html k="pr.chat.p2" as="p" />
            </div>
            <ul>
              {[1, 2, 3, 4].map((n) => <li key={n} dangerouslySetInnerHTML={{ __html: t(`pr.chat.li${n}`) }} />)}
            </ul>
          </div>
        ) : null}

        {tools.length ? (
          <div className="feat pr-text pr-wide sweep">
            <div>
              <h3>{t('pr.tools.h')}</h3>
              <Html k="pr.tools.p" as="p" />
            </div>
            <table className="ptable">
              <thead>
                <tr><th>{t('pr.tools.col.name')}</th><th>{t('pr.tools.col.tier')}</th><th>{t('pr.tools.col.what')}</th></tr>
              </thead>
              <tbody>
                {tools.map((id) => (
                  <tr key={id}>
                    <td>{t(`pr.f.${id}.name`)}</td>
                    <td><span className="lab">{t(`pr.tier.${prTier(id)}`)}</span></td>
                    <td>
                      {t(`pr.f.${id}.claim`)}
                      {hasNote(id) ? <span className="k">{t(`pr.f.${id}.note`)}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="feat pr-text sweep">
          <div>
            <h3>{t('pr.cant.h')}</h3>
            <p>{t('pr.cant.p')}</p>
          </div>
          <ul>{cant.map((n) => <li key={n}>{t(`pr.cant.li${n}`)}</li>)}</ul>
        </div>

        {planned.length ? (
          <div className="feat pr-text sweep">
            <div>
              <h3>{t('pr.planned.h')}</h3>
              <p>{t('pr.planned.p')}</p>
            </div>
            <ul>{planned.map((id) => <li key={id}>{t(`pr.f.${id}.name`)}</li>)}</ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
