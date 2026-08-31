/* You Name It — 실물 브랜드 락업. 🔴 활자로 다시 조판하지 마라.
   구 육각너트 SVG 는 2026-08-31 에 폐기됐다(플러그인 쪽도 같이 삭제). `Name` 의 브러시
   스크립트·스캔라인·색수차는 폰트로 재현이 안 된다. 판독 하한은 실측 22px.
   락업 안에 워드마크가 이미 들어 있으니 옆에 이름을 활자로 또 쓰지 마라. */
export default function BrandMark({ size = 20 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-lockup.png"
      alt="You Name It"
      style={{ height: size * 1.35, width: 'auto', display: 'block' }}
    />
  );
}
