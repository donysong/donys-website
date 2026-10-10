'use client';
/* 01 누구를 — `/ae` 01 과 같은 카드(`article.role.gridp > div.in + div.say`, 하우스 계약).
   카드마다 원문의 기능 태그가 붙어 있다 — 태그가 **전부** 이 판에서 못 쓰는 기능이면 카드가 빠진다(판 B 에선 Pro 카드 둘이 빠진다).
   빨간 판 문장은 `/ae` 의 "당신이 말할 문장" 이 아니라 "당신이 하는 것"(누르는 순서)이라 따옴표를 끈다(`q.pr-act`) — 넷째 카드는 원문이 따옴표를 들고 있다. */
import { Html, useT } from '@/components/site3p/lang';
import { prAny } from '@/lib/pr';
import type { PrFeature } from '@/lib/product';
import Head from './Head';
import type { Plate } from './state';

const CARDS: { k: string; tags: PrFeature[] }[] = [
  { k: 'r1', tags: ['autocut.basic'] },
  { k: 'r2', tags: ['facetrack', 'captions.shortform'] },
  { k: 'r3', tags: ['watchfolder', 'bins'] },
  { k: 'r4', tags: ['chat'] },
];

export default function Who({ no, note }: Plate) {
  const { t } = useT();
  const cards = CARDS.filter((c) => prAny(c.tags));
  return (
    <section id="who" className={note ? 'onnote' : undefined} data-plate={no} data-name="pr.plate.who">
      <div className="sec tight">
        <Head no={no} stone={2} k="pr.who.h" tag="pr.who.tag" />
        <div className="roles sweep">
          {cards.map((c, i) => (
            <article className="role gridp" tabIndex={0} data-cur key={c.k}>
              <div className="in">
                <div className="top"><span className="lab lc">{t('pr.role.l')}</span><i>{String(i + 1).padStart(2, '0')}</i></div>
                <h3>{t(`pr.${c.k}.h`)}</h3>
                <p>{t(`pr.${c.k}.p`)}</p>
                <div className="hint">{t('pr.role.hint')}</div>
              </div>
              <div className="say">
                <b>{t('pr.role.say')}</b>
                <Html k={`pr.${c.k}.q`} as="q" className="pr-act" />
                <small>{t(`pr.${c.k}.s`)}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
