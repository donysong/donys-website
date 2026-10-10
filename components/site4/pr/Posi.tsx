'use client';
/* 02 무엇인가 — 신화 한 줄 → 명사로 갚는 줄(`/ae` 02 와 같은 `.posi`) → 다른 점 셋 → 원본 안전.
   `{names}` 자리 셋은 **켜진 기능 이름만** 채운다(원문 지시 "At freeze, rewrite it from the free features that are on"):
     pr.diff2.free  무료 툴(Offset · 앵커 · 빈 · Watch folder · 에셋) — 하나도 없으면 줄이 빠진다
     pr.safe.li1    시퀀스를 크게 바꾸는 작업의 예(무음 컷 · 자막 · 잡음 제거 · Chat)
     pr.safe.li2    고른 클립에 바로 적용하는 툴의 예(Offset · 앵커 · FX Console)
   셋째 다른 점(Chat)은 판 A 에선 Chat 이 켜졌을 때만, 판 B 에선 "Pro · 준비 중" 판 문장으로 선다. */
import { Html, useT } from '@/components/site3p/lang';
import { PR_MODE, PR_OFF, type PrFeature } from '@/lib/product';
import { prClaimable } from '@/lib/pr';
import Head from './Head';
import { joinNames, type Plate } from './state';

const FREE_TOOLS: PrFeature[] = ['offset', 'anchor', 'bins', 'watchfolder', 'assets'];
const RESHAPE: PrFeature[] = ['autocut.basic', 'captions.longform', 'denoise', 'chat'];
const DIRECT: PrFeature[] = ['offset', 'anchor', 'fxconsole'];

export default function Posi({ no, note }: Plate) {
  const { t, lang } = useT();
  const pre = PR_MODE === 'preorder';
  const fill = (k: string, names: string[]) => t(k).split('{names}').join(names.join(', '));
  const freeNames = FREE_TOOLS.filter(prClaimable).map((id) => t(`pr.f.${id}.name`));
  const reshape = RESHAPE.filter(prClaimable).map((id) => t(`pr.safe.ex.${id}`));
  const direct = DIRECT.filter(prClaimable).map((id) => t(`pr.f.${id}.name`));
  /* 판 B 의 Chat 은 사전예약 약속 묶음이라 "준비 중" 문장으로 남는다 — 출고에서 아예 빠졌으면(`PR_OFF`) 그것도 뺀다. */
  const diff3 = pre ? !PR_OFF.includes('chat') : prClaimable('chat');
  const diffs = ['pr.diff1', 'pr.diff2', ...(diff3 ? ['pr.diff3'] : [])];
  return (
    <section id="posi" className={note ? 'onnote' : undefined} data-plate={no} data-name="pr.plate.posi">
      <div className="sec tight">
        <Head no={no} stone={5} k="pr.plate.posi" />
        <div className="posi">
          <Html k="pr.posi.myth" as="p" className="myth" />
          <div>
            <Html k="pr.posi.plain" as="p" className="plain" />
            <Html k="pr.posi.plain2" as="p" className="plain" style={{ marginTop: 16, opacity: 0.82 }} />
          </div>
        </div>

        <h3 className="lab pr-subh">{t('pr.diff.h')}</h3>
        <div className="howto pr-diff">
          {diffs.map((k) => (
            <div key={k}>
              <h3>{t(`${k}.h`)}</h3>
              <Html k={`${k}.p`} as="p" />
              {k === 'pr.diff2' && freeNames.length
                ? <p className="pr-more">{t('pr.diff2.free').split('{names}').join(joinNames(lang, freeNames))}</p>
                : null}
            </div>
          ))}
        </div>

        <div className="feat pr-text">
          <div>
            <h3>{t('pr.safe.h')}</h3>
            <Html k="pr.safe.p" as="p" />
          </div>
          <ul>
            {reshape.length ? <li dangerouslySetInnerHTML={{ __html: fill('pr.safe.li1', reshape) }} /> : null}
            {direct.length ? <li dangerouslySetInnerHTML={{ __html: fill('pr.safe.li2', direct) }} /> : null}
            <li>{t('pr.safe.li3')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
