import Plate from './Plate';
import { Spot, type SpotId } from './Spots';
import { COUNTS } from '@/lib/product';

/* 🔴 이 절이 존재하는 이유 (2026-09-10 오너): *"웹사이트에 우리가 패널 몇 개 있는지도,
   구체적으로 어떤 용도인지도 잘 모르겠고, 커스텀 패널 만들어놓은 것도 언급 없음."*
   그 전엔 Press 헤드라인이 **"One panel, seven tools."** 였는데 **틀린 말**이다 —
   패널이 7개고 툴은 42개다(`donys/CSXS/manifest.xml` Extension 7개 실측).

   🔴 패널명은 **로케일 무관 영문**이다 (CLAUDE.md 닫힌 결정 2026-09-01) — AE 메뉴 라벨과
      같은 문자열이라 한국어로 번역하지 마라. 사는 사람이 AE 창 메뉴에서 이 이름을 찾는다. */

type Panel = {
  n: string;
  name: string;
  body: string;
  count?: string;
  spot: SpotId;
};

const PANELS: Panel[] = [
  {
    n: '01',
    name: 'Chat',
    body: 'Describe what is in your head. It reads your comp and builds on your layers — not a render you import back.',
    count: `${COUNTS.tools} tools · ${COUNTS.skills} skills`,
    spot: 'textExploder',
  },
  {
    n: '02',
    name: 'Toolbox',
    body: 'One-click utilities — parenting, nulls, sequencing, GIF export, RGB split — across every selected layer at once.',
    count: `${COUNTS.scripts} scripts`,
    spot: 'gifConverter',
  },
  {
    n: '03',
    name: 'Library',
    body: 'Motion and text presets, gradients and effects. Every one stays re-tunable from Effect Controls after it lands.',
    count: `${COUNTS.motion} + ${COUNTS.textPresets} presets · ${COUNTS.gradients} gradients`,
    spot: 'carouselRig',
  },
  {
    n: '04',
    name: 'Curves',
    body: 'Read a curve off a key, reshape it, apply it back. The graph editor stops being a place you avoid.',
    count: `${COUNTS.curves} curve presets`,
    spot: 'resetKeys',
  },
  {
    n: '05',
    name: 'Expressions',
    body: 'A live editor that applies as you type, on the right property. No dialog, no guessing which layer it landed on.',
    count: `${COUNTS.expressions} snippets`,
    spot: 'typewriterCursor',
  },
  {
    n: '06',
    name: 'Custom',
    body: 'Build your own panel. Keep only the tools you actually use, arrange the layout your way, and switch between saved layouts from one dropdown.',
    count: 'your layout',
    spot: 'patternLab',
  },
];

/* 🔴 Support 는 카드로 안 만든다. ⑴ 7개는 3열 그리드에서 **하나가 혼자 남고**
   ⑵ 39장 시트 중 "업데이트·라이선스" 를 보여주는 게 없어서 아무거나 붙이면
   **의미가 안 맞는 그림**이 된다. 얇은 띠 한 줄이 정직하다. */

export default function Panels() {
  return (
    <section id="panels" className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
      <div className="trim-rule" style={{ marginBottom: 34 }} />
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mono" style={{ marginBottom: 12 }}>Plate 04 / 08 — the panels</p>
          <Plate as="h2" tone="black" className="headline">Seven panels. One licence.</Plate>
        </div>
        <p style={{ maxWidth: 420, fontSize: 15, lineHeight: 1.65 }}>
          They dock like any other After Effects panel, under{' '}
          <b>Window → Extensions</b>. Open the ones you use, close the rest — or build
          your own out of the pieces.
        </p>
      </div>

      <div className="sweep grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {PANELS.map((p) => (
          <article key={p.name} className="card-rim">
            <div className="card" style={{ padding: 18, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Spot id={p.spot} label={false} />
              <div className="fig-cap" style={{ marginTop: 14 }}>
                <span className="fig-no">{p.n}</span>
                <span>{p.name}</span>
                {p.count && <span className="fig-hint">{p.count}</span>}
              </div>
              <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: '#4a555b' }}>
                {p.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="fig-cap" style={{ marginTop: 26 }}>
        <span className="fig-no">07</span>
        <span>Support — update checks, licence status, and a way to reach a person</span>
        <span className="fig-hint">2 devices per licence</span>
      </div>
    </section>
  );
}
