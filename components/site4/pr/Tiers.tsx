'use client';
/* 04 무료와 Pro — 두 단 장부(무료 | Pro). 칸 이름 = 원문 5절 표(`pr.f.<id>.label`), 순서 = 레지스트리.
   판 A: 켜진 기능만 행이 된다. 판 B: 무료 단은 같고, Pro 단은 **전부 "준비 중" 딱지 + 이름만**이다(주장 문장 없음 — 원문 판 B 5절).
   출고에서 아예 빠진 기능(`PR_OFF`)은 어느 판에서도 행이 없다. 표에 `AI Chat` 이 아니라 `Chat` 이다(웹 표기 규칙). */
import { useT } from '@/components/site3p/lang';
import { PR_FEATURES, PR_MODE, PR_OFF, type PrFeature } from '@/lib/product';
import { prClaimable } from '@/lib/pr';
import Head from './Head';
import type { Plate } from './state';

const SOLD = PR_FEATURES.filter((f) => f.group !== 'infra');

export default function Tiers({ no, note }: Plate) {
  const { t } = useT();
  const pre = PR_MODE === 'preorder';
  const free = SOLD.filter((f) => f.tier === 'free' && prClaimable(f.id)).map((f) => f.id as PrFeature);
  const pro = SOLD.filter((f) => f.tier === 'pro' && (pre ? !PR_OFF.includes(f.id) : prClaimable(f.id))).map((f) => f.id as PrFeature);
  const cols: [string, PrFeature[]][] = [['pr.tbl.free', free], ['pr.tbl.pro', pro]];
  return (
    <section id="tiers" className={note ? 'onnote' : undefined} data-plate={no} data-name="pr.plate.tbl">
      <div className="sec tight">
        <Head no={no} stone={6} k="pr.tbl.h" />
        <div className="pr-tiers">
          {cols.map(([k, ids]) => (
            <div key={k}>
              <h3 className="lab">{t(k)}</h3>
              <ul>
                {ids.map((id) => (
                  <li key={id}>
                    <span>{t(`pr.f.${id}.label`)}</span>
                    {pre && k === 'pr.tbl.pro' ? <small className="lab">{t('pr.tbl.coming')}</small> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="pr-note">{t('pr.tbl.note')}</p>
      </div>
    </section>
  );
}
