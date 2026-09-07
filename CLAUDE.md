# You Name It — 제품 랜딩 페이지

## 🔴 브랜드 정본은 이 repo 밖이다

색·로고·폰트·톤·제품명은 **여기서 정하지 않는다.** 정본 =
`../Dony-s-AE-Plugin/donys/docs/REBRAND_BLUE_PLAN.md`

| 알고 싶은 것 | 정본 |
|---|---|
| 팔레트(블루 단독 `#2AB5EA`) | §2 |
| CTA 규칙 "액센트 면은 평시에 없다" | §3 |
| 제품명 · 로고 · 폰트 · 톤(리소그래피) | §9 |
| **웹 판정 4건** (리소 강도 · 판 수 · CTA 예외 · 비교 축) | **§9.9** |
| 텍스처 크기 게이트(색수차는 14px 이상만) | §10.2 |

⚠️ **이 파일에 값을 복사하지 마라.** 2026-08-31 감사에서 이 문서가 *"Linear 스타일 ·
Indigo `#6366f1`"* 라고 선언하는데 실제 `globals.css` 는 크림 `#d4ccc0` 이었던 게
적발됐다. 복사본은 원본과 갈라진다 — 링크만 걸어라.

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 스타일 | Tailwind 4 + `app/globals.css` 의 CSS 변수 |
| 빌드 | 정적 export (`output: 'export'`) → `out/` |
| 호스팅 | Vercel — **라이브 = `https://donys-website.vercel.app`** |
| 도메인 | `donys.dev` 는 **아직 안 붙었다** (2026-09-07 DNS 실측 실패) |
| 결제 | Polar (merchant of record) |

🔴 `metadataBase` 와 `openGraph.url` 은 **vercel 주소**여야 한다. `donys.dev` 로 두면
OG 카드 이미지가 죽은 호스트를 가리킨다. 도메인 붙는 날 둘을 같이 옮겨라.

## 🔴 연락처가 죽어 있다 (2026-09-07 실측 · 오너 액션)

`donys.dev` 에 **A 레코드도 MX 레코드도 없다** — `dig +short A donys.dev` · `dig +short MX donys.dev`
둘 다 빈 응답이고 `https://donys.dev` 는 000 이다. 그런데 **`support@donys.dev` 가 사이트의
유일한 연락처**다: 푸터 · `terms` · `privacy` · `refund` 네 곳에 있고, 환불 요청도 그리로
보내라고 적혀 있다. **지금 상태로는 산 사람이 연락할 방법이 없다.**

주소를 코드에서 임의로 바꾸지 마라 — 도메인을 붙일지 다른 주소를 쓸지는 오너 판정이다.
티켓 = `../Dony-s-AE-Plugin/donys/docs/NEXT_TASKS.md` 🔴 오너 판단 절.

## 디렉토리

```
app/
  layout.tsx     # SEO 메타 · 폰트 CDN 2종 · metadataBase
  page.tsx       # 섹션 조합
  globals.css    # 🔴 웹 디자인 시스템 정본 파일 (리소 클래스 · CTA · 토큰)
  update/        # 릴리스 노트 — 패널 version.json 의 `url` 이 여기를 가리킨다
  terms|privacy|refund/
components/      # Navbar Hero Features Demo Pricing FAQ Footer BrandMark
lib/product.ts   # 🔴 가격 · 체크아웃 URL 한 곳
public/
  images/promo/  # ../Dony-s-AE-Plugin/tools/promo/out 에서 복사해 온 것
  videos/        # 같음
  logo-lockup.png
  donys.zxp · version.json   # 릴리스마다 교체
```

## 값이 흩어지면 안 되는 자리 (전례가 있다)

- **가격** = `lib/product.ts` 하나. `$30` 이 Navbar·Hero·Pricing·메타·terms 다섯 군데
  박혀 있었고 가격이 오른 뒤에도 사이트가 옛 값을 계속 보여줬다.
- **최신 버전** = `app/update/page.tsx` 의 `RELEASES[0]`. v2.5.0 을 컷한 뒤에도
  두 자리가 v2.4.0 을 표시하고 있었다.
- **홍보 자산** = 플러그인 repo `tools/promo/` 에서 굽는다. 이 repo 에서 잘라 저장하지
  마라 — 다음 재생성 때 갈라진다. 카드 안 프레이밍은 CSS(`zoom`/`pos`)가 한다.

## 빌드

```bash
npm run dev     # localhost:3000
npm run build   # → out/
```

## 관련

- 플러그인 소스: `../Dony-s-AE-Plugin/donys/`
- 홍보 자산 렌더러: `../Dony-s-AE-Plugin/tools/promo/` (`node shot.mjs pages/f-toolbox.html f-toolbox`)
