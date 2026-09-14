import Plate from './Plate';

/* 브랜드 가이드 12장(재인↔도니 약속 문서)에서 그대로 옮긴 네 문장이다.
   🔴 발명하지 마라 · 문구를 부드럽게 고치지 마라. 출처 =
      NAMING("정답은 주지 않는다") · 도구 칸("손을 대신함, 판단은 아님")
      TEARDOWN("뜯어볼 수 있는 설계") · 지속가능성("우리가 먼저 쓴 물건만 판매").
   이 절은 브랜드 가이드가 "둘이 합의해도 안 바꾸는 것" 으로 못 박은 자리다. */
const LINES = [
  'It doesn’t give answers.',
  'It replaces your hands, not your judgment.',
  'Built to be taken apart.',
  'We only sell what we use first.',
];

export default function Stance() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
      <div className="trim-rule" style={{ marginBottom: 34 }} />
      <p className="mono" style={{ color: 'var(--text-muted)', marginBottom: 26 }}>
        Plate 06 / 08 — what this is
      </p>

      {/* 🔴 `min-w-0` — Panels.tsx 와 같은 이유(flex 아이템이 max-content 판을 못 줄인다). */}
      <div className="flex min-w-0 flex-col gap-3 md:gap-4">
        {LINES.map((line, i) => (
          <Plate
            key={line}
            as="div"
            tone={i % 2 === 0 ? 'red' : 'black'}
            className="headline"
            /* 🔴 `18ch` 단독은 뷰포트를 모른다 — 32px 폰트에서 정확히 424px 이라 390px 기기에서
               페이지가 가로로 스크롤됐다(실측 2026-09-14). 인라인 스타일이라 `.plate` 의 상한을
               이긴다. 두 상한 중 작은 쪽을 쓴다: 조판 의도(18자)는 넓은 화면에서 그대로 살고,
               좁은 화면에서는 뷰포트가 이긴다. */
            style={{ maxWidth: 'min(18ch, var(--vw-cap))' }}
          >
            {line}
          </Plate>
        ))}
      </div>

      <p
        style={{
          marginTop: 30,
          maxWidth: '52ch',
          fontSize: 15.5,
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
        }}
      >
        A tool that decides for you is a tool that makes your work look like everyone else’s. This
        one waits for you to say what you want, then does the part your hands would have done.
      </p>
    </section>
  );
}
