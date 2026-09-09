/* 잉크 판 한 쌍 — 하우스 레시피의 핵심 (HOVER_PREVIEW_RECIPE.md §1).
   같은 글자를 두 번 찍는다: 흰 판(rim)이 (-3,-4)px 밀려 아래, 잉크가 위.
   🔴 흰 테는 스트로크가 아니다. `border`/`text-shadow` 로 바꾸지 마라 —
      그건 화면의 어휘고, 우리가 2026-09-09 에 기각당한 바로 그 룩이다. */

type Tone = 'red' | 'black' | 'white';

export default function Plate({
  children,
  as: Tag = 'span',
  tone = 'red',
  className = '',
  register = false,
  style,
}: {
  children: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3';
  tone?: Tone;
  className?: string;
  /** 판이 밀려 들어와 정렬되는 진입 모션 (reduced-motion 에서는 정렬 상태 정적) */
  register?: boolean;
  style?: React.CSSProperties;
}) {
  const toneClass = tone === 'black' ? ' plate-black' : tone === 'white' ? ' plate-white' : '';
  return (
    <Tag
      className={`plate${toneClass}${register ? ' reg-in' : ''} ${className}`.trim()}
      style={style}
    >
      {/* rim · knock 은 같은 글자를 더 그린 판이라 스크린리더에서 중복된다 */}
      <span className="rim" aria-hidden="true">
        {children}
      </span>
      <span className="knock" aria-hidden="true">
        {children}
      </span>
      <span className="ink">{children}</span>
    </Tag>
  );
}
