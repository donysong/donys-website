/* 스팟 판 — 여백에 놓는 작은 인쇄 판.
   🔴 재료는 새로 그린 게 아니라 **패널의 호버 프리뷰 시트**다(툴 39종 × 16프레임,
      하우스 리소로 이미 텍스처링됨). 그래서 장식이 아니라 제품이다 — 여백이 카탈로그가 된다.
      새 아트웍을 그리기 전에 `donys/src/assets/previews/sheets/` 를 먼저 봐라. */

export type SpotId =
  | 'bentoGrid' | 'carouselRig' | 'proximityRig' | 'sequenceLayers'
  | 'rgbSplit' | 'textExploder' | 'roundCorners' | 'edgeBoil'
  | 'writeOn' | 'pointsToNulls' | 'shadowCaster' | 'autoMarker' | 'clickReact'
  | 'typewriterCursor' | 'resetKeys' | 'copyKeyframes' | 'gifConverter'
  | 'organizeProject' | 'patternLab';

/* 라벨은 패널의 툴 이름 그대로다. 여기서 새로 짓지 마라 — 사는 사람이 패널에서 그 이름을 찾는다. */
const LABEL: Record<SpotId, string> = {
  bentoGrid: 'Bento Grid',
  carouselRig: 'Carousel Rig',
  proximityRig: 'Proximity Rig',
  sequenceLayers: 'Sequence Layers',
  rgbSplit: 'RGB Split',
  textExploder: 'Text Exploder',
  roundCorners: 'Round Corners',
  edgeBoil: 'Edge Boil',
  writeOn: 'Write On',
  pointsToNulls: 'Points to Nulls',
  shadowCaster: 'Shadow Caster',
  autoMarker: 'Auto Marker',
  clickReact: 'Click React',
  typewriterCursor: 'Typewriter Cursor',
  resetKeys: 'Reset Keys',
  copyKeyframes: 'Copy Keyframes',
  gifConverter: 'GIF Export',
  organizeProject: 'Organize Project',
  patternLab: 'Pattern Lab',
};

export function Spot({ id, label = true }: { id: SpotId; label?: boolean }) {
  return (
    <div>
      <span
        className="spot"
        role="img"
        tabIndex={0}
        aria-label={`${LABEL[id]} — a tool preview from the panel`}
        style={{ backgroundImage: `url(/riso/spots/${id}.webp)` }}
      />
      {label && <div className="spot-cap">{LABEL[id]}</div>}
    </div>
  );
}

export function SpotStrip({ ids, note }: { ids: SpotId[]; note?: string }) {
  return (
    <div>
      {note && (
        <div className="fig-cap" style={{ marginTop: 0, marginBottom: 18 }}>
          <span className="fig-no">Plate samples</span>
          <span>{note}</span>
          <span className="fig-hint">hover to run</span>
        </div>
      )}
      <div className="spot-strip">
        {ids.map((id) => (
          <Spot key={id} id={id} />
        ))}
      </div>
    </div>
  );
}
