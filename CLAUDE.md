# You Name It — 제품 랜딩 페이지

## 🔴 진행 중 — 리뉴얼 v5: mindmarket 레퍼런스 (2026-10-09 · 브랜치 `renewal-v5`)

색·텍스처·폰트만 우리 것, **컴포넌트·레이아웃·모션은 mindmarket.com 에 맞춘다** · 일러스트에 스크롤+리깅(Rive).
**세션을 열면 정본부터 읽어라 — `../Dony-s-AE-Plugin/donys/docs/WEBSITE_RENEWAL_PLAN.md` §17.**
오너 작업 규약 5개 · 충돌 판정 5건 · 설치물 · 레퍼런스 실측 · 다음 할 일 순서가 전부 거기 있다. 여기엔 링크만 둔다.

- 🔴 **추가할 내용은 먼저 보여주고, 오너가 확인한 뒤에 쓴다**(§17.1 ⑤). 바깥 자료를 쓸 때마다 출처와 바꾼 곳을 보고한다.
- 이 폴더에서 세션을 열어야 impeccable(이 repo local 플러그인)이 뜬다. Refero MCP 는 `/mcp` 에서 connected 인지 확인.
- 🔴 **공개 repo** — 오너 PSD 원본 · 레퍼런스 사이트 원본 코드(mindmarket JS · `.riv`)를 커밋하지 마라. 우리 `.riv` 와 구운 출력만.
- `main` = 프로덕션 거울. v5 작업은 `renewal-v5` 에서만.

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
- 재료 원본 = 오너 저작 하우스 푸티지 `../Dony-s-AE-Plugin/donys/tools/hoverPreview/project/(Footage)/` (`Risoprint_tex*.png` · `BlackPaper*`). 구 자리 `seed-presets/effects/riso-print/assets/` 는 2026-10-01 출고 중단과 함께 사라졌다(리소는 로컬 전용 `donys/local-presets/`).

| 🔴 **리뉴얼 계획** — 구조·디자인 시스템·단계·오너 판정 (2026-09-09 *"처음부터"*) | **`../Dony-s-AE-Plugin/donys/docs/WEBSITE_RENEWAL_PLAN.md`** — 이 repo 의 현 코드 1,500줄은 그 계획에서 **전부 폐기 대상**이다. 살아남는 값 = `lib/product.ts` · `RELEASES` · 법 페이지 본문 |

⚠️ **이 파일에 값을 복사하지 마라.** 2026-08-31 감사에서 이 문서가 *"Linear 스타일 ·
Indigo `#6366f1`"* 라고 선언하는데 실제 `globals.css` 는 크림 `#d4ccc0` 이었던 게
적발됐다. 복사본은 원본과 갈라진다 — 링크만 걸어라.

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 스타일 | Tailwind 4 + `app/globals.css` 의 CSS 변수 |
| 모션 (v5) | Rive `@rive-app/react-canvas-lite` · GSAP(DrawSVG·CustomEase) · Lenis — 2026-10-09 오너 지시로 구 *"라이브러리 0"* 폐기(`WEBSITE_RENEWAL_PLAN.md` §17.2) |
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

🔴 **홈은 `.p3` 로 갈려 있다** (2026-09-14, 프로토 v3.3 이식). CSS 체계가 **둘**이고, 어디를 고칠지 이게 정한다:

| 면 | 구조 | CSS |
|---|---|---|
| **홈 `/`** | `components/site3p/*` — 프로토 v3.3 이식본. 판 순서 = 인쇄 순서: 표지(Hero) → 01 Who → 02 Why → 03 What → 04 Made by → 05 Price+FAQ | `app/site3p.css` — **전 선택자가 `.p3` 아래**라 아래 globals 와 안 부딪힌다 |
| `/motion` · `/update` · `/terms` · `/privacy` · `/refund` | `Navbar` · `Footer` · `Plate` · `MotionLab` | `app/globals.css` — 구 판 어휘(`.plate > .rim/.knock`) |

⚠️ **홈에 `.plate` 를 쓰지 마라.** 홈의 잉크 판은 `.p3 .pl`(rim/ko/ink) 이고 어긋남 토큰도 다르다
(`--pl-rx/--pl-ry`, 오너 2026-09-11 판정으로 밑판 그림자 `--rx/--ry` 와 분리됐다).
구 홈 섹션 컴포넌트 10종(Hero·Loop·Proof·Press·Panels·Spots·Stance·Pricing·FAQ·Notes)과 globals 의 `.spot` 블록은
**이식하면서 지웠다** — 되살리지 마라. 두 디자인을 남기면 다음 사람이 어느 쪽을 고칠지 모른다.

```
app/
  layout.tsx     # SEO 메타 · 폰트 CDN · metadataBase · viewport(themeColor)
  page.tsx       # JSON-LD + <LangProvider><Page3P/>
  site3p.css     # 🔴 홈 디자인 정본 (.p3 스코프)
  globals.css    # 나머지 페이지의 인쇄 어휘
  update/ terms/ privacy/ refund/ motion/
components/
  site3p/        # 🔴 홈 — Page Chrome Hero Who Why What MadeBy Price Footer3P Plate3 Typed lang
  RisoDefs Plate Navbar Footer MotionLab   # 나머지 페이지용
functions/       # 🔴 Cloudflare Pages Functions — `wrangler pages deploy out` 이 cwd 의 이 폴더를 같이 올린다.
                 #    지금은 소식 메일(광고성 정보 수신 동의)뿐: api/newsletter/* · 설정 = tools/newsletterSetup.mjs
                 #    법 근거·검토서 = 플러그인 repo donys/docs/LEGAL_KR_REVIEW.md (🔴 이 repo 는 **공개**다 — 검토서를 여기 두지 마라)
lib/copy.ts      # 🔴 홈 카피 정본 — EN/KO 사전 하나. 카피 수정은 **여기서만**(양 언어 같이)
lib/product.ts   # 🔴 가격 · 체크아웃 URL · 카탈로그 숫자
lib/releases.ts  # 🔴 릴리스 노트 이력 — /update 가 읽는다
lib/docsData.ts · lib/docsUsage.ts  # 🔴 생성물 — Docs 카탈로그(출고 태그)와 툴·패널·카탈로그별 사용법(플러그인 repo `donys/usage/{ko,en}/<id>.md`).
                 #    손으로 고치지 마라 — `npm run build:docs`. 사용법 문장은 플러그인 repo 에서 고친다. 파서 = `tools/usageMd.mjs`(`npm run test:docs`)
public/riso/     # 종이·잉크·그레인 · stones/ (돌 7) · spots/ (제품 판 = 툴박스 호버 시트) · brand/ (브랜드 영상 **포스터만** — 영상 본체는 R2 `dl.younameit.works/brand/…mp4`, 주소 = `components/site4/ae/Film.tsx` `FILM_SRC` 한 줄. 🔴 영상 파일을 public/ 에 넣지 마라 — 공개 repo 이력에 영구히 남는다 · `deployCheck [film]`)
public/
  images/promo/ (og 카드 2장만) · logo-lockup.png
  donys.zxp · version.json   # 🔴 지우지 마라 — 출고본의 UPDATE_MANIFEST_URL 이
                             #    donys-website.vercel.app/version.json 로 컴파일돼 있고
                             #    updateCheck.ts 는 404 를 조용히 먹는다. 플러그인 Phase D 뒤에 지운다.
```

🔴 **홈에서 이미 닫힌 판정 3건** (다시 열지 마라 — 근거·실측은 플러그인 repo `donys/docs/WEBSITE_RENEWAL_PLAN.md` §13):
- **국문 = Pretendard 가변.** *"영문과 같은 폰트"* 는 원리상 불가다 — Google Sans Flex 는 한글 글리프가 있는데
  `text=` 서브셋 **CSS 는 200 인데 폰트 파일이 400** 이다(축·고정/가변 전수 · Noto Sans KR 은 같은 절차로 200).
  ⚠️ CSS 200 을 "폰트 뜬다" 로 읽지 마라 — 파일까지 받아야 판정이다.
- **브랜드 월 크롭 2점은 안 싣는다.** 큐브릭 = 제3자 촬영 사진 + 초상 · 시지프스 = 신문 원문이 읽힌다.
  비공개 프로토와 **공개·상업 사이트는 기준이 다르다.** 대체 = 돌 + 인용 조판.
  🟢 **예외 — 브랜드 영상은 싣는다** (오너 2026-10-05 *"그대로 공개해"*). `/ae` 히어로의 35초 필름은 끝 장면의 시지프스 신문 지면 +
  초상까지 **영상 그대로** 공개 승인됐다. 승인 범위는 그 영상 하나다 — 위 크롭 두 점을 **스틸·포스터·카드로 따로 싣는 건 여전히 금지**다
  (포스터가 `We ink it.` 프레임인 이유이기도 하다).
- **숫자는 사전에 박지 않는다.** `lib/copy.ts` 는 `{scripts}` 같은 자리표시자만 들고 `lib/product.ts` 가 채운다.

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

사용법을 아직 태그에 없는 판(v2.8.0 전)에서 개발할 땐 `DOCS_PLUGIN_REF=<브랜치 · SHA · 플러그인 체크아웃 경로> npm run build:docs`.
🔴 그 상태로 배포하지 마라 — `docsUsage.ts` 에 `dev:…` 가 찍히고 `deployCheck [usage]` 가 막는다. 풀려면 변수 없이 `npm run build:docs`.

## 관련

- 플러그인 소스: `../Dony-s-AE-Plugin/donys/`
- 홍보 자산 렌더러: `../Dony-s-AE-Plugin/tools/promo/` (`node shot.mjs pages/og.html og-ae`). 🔴 구 목업(`f-*` · `poster-*` · `anim-*` · `hero`)은 2026-09-28 삭제 — 없는 기능을 그리고 있었다. 패널 그림은 출고 태그에서만.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
