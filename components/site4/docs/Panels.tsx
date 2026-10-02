'use client';
/* 01 — 패널. 위 = 개관 판(7패널을 한눈에), 아래 = 상세 표. 둘을 가른 건 §16-12(2026-09-28 오너,
   재인 *"전체적으로 시각적으로 들어오고 아래 디테일 설명 부분이랑은 구분되면"*).

   ⑴ 개관 판 = 검정 판 위에 **출고본 패널 7개의 클립**을 AE 에서 도킹하듯 나란히 놓은 HTML/CSS 배치다.
      클립 = `PanelClip`(v2.7.1 태그 패널 앱을 그대로 띄워 30fps 로 찍은 루프 — 툴 호버 프리뷰 · 모션 카드 호버 ·
      손잡이 끌기 · 익스프레션 고르기 · 요청 쳐 넣기(보내지 않는다) · 저장한 패널 전환 · 언어 전환).
      `/ae` 기능 블록과 같은 파일이다(그쪽은 대지를 두르고, 여기는 패널만). 프레임 한 줄의 높이는 같다 —
      `flex-grow` = 클립의 가로세로비. 🔴 클립을 다시 찍으면 `PanelClip.tsx` 의 `CLIPS` 크기도 같이 바꿔라.
   ⑵ 상세 표 — 행은 `lib/docsData.ts` 의 `DOCS_PANELS`(CEP manifest 에서 읽은 것)가 정하고 설명만 사전에서 온다.
      행마다 앵커 `#panel-<key>` — 개관 판의 탭이 여기로 온다.
   🔴 패널 이름은 로케일 무관 영문이다 — AE 창 메뉴 라벨과 같은 문자열이라 한국어로 되돌리지 마라(오너 2026-09-01).
   표 밑 주석(`docs.panels.note`)은 국문 면에만 있다 — 영문 독자에게 "이름이 영문" 은 정보가 아니다.
   판 = 노트(`.onnote`, 2026-09-29) — Docs 는 절마다 노트(01·03·05) ↔ 파랑(02·04)이 번갈아 온다(DocsPage 머리 주석). */
import { Fragment } from 'react';
import { useT } from '@/components/site3p/lang';
import { DOCS_PANELS } from '@/lib/docsData';
import SecHead from './SecHead';
import { Usage, useUsage } from './Usage';
import PanelClip, { CLIPS, type ClipId } from '@/components/site4/PanelClip';

/* 줄 = AE 의 도킹 프레임 줄. 위 둘은 세 칸, 맨 아래는 Chat 한 줄(입력 툴바 띠 — `/ae` 기능 1 과 같은 크롭). */
const ROWS: readonly (readonly ClipId[])[] = [['toolbox', 'library', 'curves'], ['expressions', 'custom-1', 'support']];
const STRIP: ClipId = 'chat';

const nameOf = (key: string) => DOCS_PANELS.find((p) => p.key === key)?.name ?? key;

/* 행 하나 = 표 행 + (사용법이 있으면) 그 밑 전폭 행. 사용법 id 는 `panel-<key>` 에서 슬롯 번호를 뗀 것(`custom-1` → `panel-custom`),
   앵커는 기존 그대로 `#panel-<key>`. 펼침 행은 표 열 폭에 갇히지 않게 colSpan 3 이다. */
function PanelRows({ p }: { p: { key: string; name: string } }) {
  const { t } = useT();
  const anchor = `panel-${p.key}`;
  const { entry, open, setOpen } = useUsage(`panel-${p.key.replace(/-\d+$/, '')}`, anchor);
  return (
    <Fragment>
      <tr id={anchor} className={entry ? 'has-usage' : undefined}>
        <td>{p.name}</td>
        <td><span className="k">{t(`docs.panel.${p.key}.k`)}</span></td>
        <td dangerouslySetInnerHTML={{ __html: t(`docs.panel.${p.key}.d`) }} />
      </tr>
      {entry ? <tr className="usage-row"><td colSpan={3}><Usage entry={entry} open={open} onOpen={setOpen} /></td></tr> : null}
    </Fragment>
  );
}

function Frame({ id }: { id: ClipId }) {
  const { t } = useT();
  const [w, h] = CLIPS[id];
  return (
    /* flex-grow = 가로세로비 → 한 줄의 프레임들이 같은 높이로 선다(flex-basis 0). */
    <div className="dock-frame" style={{ flexGrow: w / h }}>
      <div className="dock-tabs">
        <a href={`#panel-${id}`} className="on" data-cur>{nameOf(id)}</a>
      </div>
      <div className="dock-shot">
        <PanelClip id={id} label={t('docs.panels.dock.alt').replace('{name}', nameOf(id))} />
      </div>
    </div>
  );
}

export default function Panels() {
  const { t } = useT();
  const note = t('docs.panels.note');
  return (
    <section id="panels" className="sec onnote" data-plate="01" data-name="docs.nav.panels">
      <SecHead no="01" stone={4} k="docs.panels.h" tag="docs.panels.tag" />

      <figure className="dock-fig sweep">
        <div className="dock">
          {ROWS.map((row) => <div className="dock-row" key={row.join()}>{row.map((id) => <Frame key={id} id={id} />)}</div>)}
          <div className="dock-strip"><Frame id={STRIP} /></div>
        </div>
        <figcaption>{t('docs.panels.dock.cap')}</figcaption>
      </figure>

      <h3 className="lab dock-detail">{t('docs.panels.detail')}</h3>
      <table className="ptable">
        <thead>
          <tr><th>{t('docs.th.panel')}</th><th>{t('docs.th.what')}</th><th>{t('docs.th.does')}</th></tr>
        </thead>
        <tbody>
          {DOCS_PANELS.map((p) => <PanelRows key={p.key} p={p} />)}
        </tbody>
      </table>
      {note ? <p className="lab lc">{note}</p> : null}
    </section>
  );
}
