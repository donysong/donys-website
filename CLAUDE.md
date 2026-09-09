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
## 🔴 이 사이트는 **인쇄물**이다 (2026-09-09 전면 재작성)

파란 필드 종이 위에 잉크를 찍는다. 구 "블랙 배경 + `screen` 가산" 은 **폐기**됐다 —
오너 판정: *"삼류 디지털 글리치지 리소가 아니다."* 검정 위 `screen` 은 빛이고, 잉크는 `multiply` 다.

- **`mix-blend-mode: screen` 을 다시 들이지 마라.** 어긋남은 `text-shadow` 가 아니라 **밀려 깔린 판**(`.plate > .rim`)이 낸다.
- **흰 녹아웃 판(`.plate > .knock`)을 지우지 마라** — 빨강을 파란 종이에 바로 곱하면 대비 **1.56:1** 이다(실측). 녹아웃 위에서 4.60:1.
- **11px 레드 라벨 금지.** 레드는 디스플레이 크기 + 흰 판 위에만. 그 외는 검정 잉크.
- **라이브 SVG 필터는 소면적만** — 종이·얼룩·알갱이는 구운 이미지다(Safari 가 대면적 필터를 거부한다).
- 재료 원본 = 오너 저작 `../Dony-s-AE-Plugin/donys/seed-presets/effects/riso-print/assets/`.

| 🔴 **리뉴얼 계획** — 구조·디자인 시스템·단계·오너 판정 (2026-09-09 *"처음부터"*) | **`../Dony-s-AE-Plugin/donys/docs/WEBSITE_RENEWAL_PLAN.md`** — 이 repo 의 현 코드 1,500줄은 그 계획에서 **전부 폐기 대상**이다. 살아남는 값 = `lib/product.ts` · `RELEASES` · 법 페이지 본문 |

⚠️ **이 파일에 값을 복사하지 마라.** 2026-08-31 감사에서 이 문서가 *"Linear 스타일 ·
Indigo `#6366f1`"* 라고 선언하는데 실제 `globals.css` 는 크림 `#d4ccc0` 이었던 게
적발됐다. 복사본은 원본과 갈라진다 — 링크만 걸어라.

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 스타일 | Tailwind 4 + `app/globals.css` 의 CSS 변수 |
| 빌드 | 정적 export (`output: 'export'`) → `out/` |
| 호스팅 | **현재 = Vercel** (실측 `server: Vercel`) · **이전 중 → Cloudflare Pages** |
| 도메인 | ✅ **`younameit.works` 가 정본이다** (apex 200 · `www` 308 → apex) |
| 결제 | Polar (merchant of record) |

🔴 **`donys.dev` 는 죽었다 — 되살리지 마라.** NS 조차 없다(2026-09-09 실측).
`metadataBase`·`openGraph.url`·JSON-LD·sitemap·robots 는 전부 **`younameit.works`** 다.
주소는 `lib/product.ts` 의 `SITE` 한 곳에서 읽는다 — 컴포넌트에 다시 박지 마라.

🔴 **`canonical` 을 `app/layout.tsx` 에 두지 마라.** 루트 레이아웃 metadata 는 하위 페이지가
상속해서 `/update`·`/terms`·`/privacy`·`/refund` 가 전부 "홈의 중복" 이 된다(실측). 페이지마다 선언한다.

🔴 **`app/robots.ts`·`app/sitemap.ts` 의 `export const dynamic = 'force-static'` 을 지우지 마라** —
`output:'export'` 가 요구한다. 없으면 빌드가 `Failed to collect page data` 로 죽는다.

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
  layout.tsx     # SEO 메타 · 폰트 CDN 3종 · metadataBase · viewport(themeColor)
  page.tsx       # 판 순서 = 인쇄 순서 (Hero→Loop→Proof→Press→Stance→Pricing→FAQ→Notes)
  globals.css    # 🔴 인쇄 디자인 시스템 정본 (종이·잉크 판·녹아웃·스크린·CTA)
  update/        # 릴리스 노트 — 패널 version.json 의 `url` 이 여기를 가리킨다
  terms|privacy|refund/
components/      # RisoDefs Plate Navbar Hero Loop Proof Press Stance Pricing FAQ Notes Footer
lib/product.ts   # 🔴 가격 · 체크아웃 URL 한 곳
lib/releases.ts  # 🔴 릴리스 노트 이력 한 곳 — /update 와 홈 Notes 가 같이 읽는다
public/riso/     # 종이 결 · 잉크 알갱이 마스크 · 로고 (오너 저작 텍스처에서 구움)
public/
  images/promo/  # ../Dony-s-AE-Plugin/tools/promo/out 에서 복사해 온 것
  videos/        # 같음
  logo-lockup.png
  donys.zxp · version.json   # 🔴 지우지 마라 — 출고본의 UPDATE_MANIFEST_URL 이
                             #    donys-website.vercel.app/version.json 로 컴파일돼 있고
                             #    updateCheck.ts 는 404 를 조용히 먹는다. 플러그인 Phase D
                             #    (URL 교체 + 지인 전원 새 빌드) 뒤에 지운다.
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
