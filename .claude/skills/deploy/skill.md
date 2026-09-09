---
name: deploy
description: "Dony's 사이트를 빌드 검증 후 git commit & push하여 Cloudflare Pages에 배포하는 스킬. '배포해줘', 'deploy', '푸시해줘', '커밋하고 배포', '웹사이트 업데이트 반영' 등의 요청 시 사용. 빌드가 실패하면 배포를 중단하고 에러를 보고한다."
---

# Deploy — 빌드 검증 + 배포

변경사항을 빌드 검증 후 git commit & push하여 Cloudflare Pages에 자동 배포한다.

## 워크플로우

### Step 1: 빌드 검증
1. `./node_modules/.bin/next build` 실행 (정적 export, 산출 디렉토리 `out/`)
2. 빌드 실패 시 **배포 중단** — 에러 메시지를 사용자에게 보고

3. **산출물 검사 — 소스가 아니라 나가는 물건을 본다.** 빌드 직후 `out/` 에서:

```bash
# GA 태그가 붙었는데 개인정보 방침이 Google 을 고지하지 않으면 배포 중단.
# NEXT_PUBLIC_* 는 빌드 타임에 인라인되므로 out/ 하나에서 둘의 상태를 같이 볼 수 있다.
# 🔴 판별자에 `?id=G-` 를 반드시 붙여라. `googletagmanager.com/gtag/js` 만 찾으면
#    @next/third-parties 라이브러리 청크 안의 **템플릿 문자열**(`gtag/js?id=${t}`)에 걸려
#    측정 ID 가 비어 있어도 매 배포 발화한다(2026-09-09 실증: HTML 0건인데 GA=1).
#    항상 빨간 게이트는 곧 꺼진다 — 위양성이 위음성만큼 나쁘다.
GA=$(grep -rlE 'googletagmanager\.com/gtag/js\?id=G-[A-Z0-9]+' out/ 2>/dev/null | wc -l | tr -d ' ')
# 🔴 `|| echo 0` 을 쓰지 마라 — `grep -c` 는 0건일 때 "0" 을 찍고 **exit 1** 이라
#    폴백이 같이 발화해 POL="0\n0" 이 되고, `[ -eq ]` 가 그 자리에서 죽어 검사가
#    조용히 통과한다(2026-09-09 뮤턴트 실증: 차단해야 할 칸이 통과했다).
POL=$(grep -c "Google Analytics" out/privacy.html 2>/dev/null) || POL=0
: "${POL:=0}"
if [ "$GA" -gt 0 ] && [ "$POL" -eq 0 ]; then
  echo "🔴 GA 태그가 붙었는데 privacy 가 Google 을 고지하지 않는다 — 배포 중단"
  exit 1
fi
```

| GA 태그 | 방침에 Google | 판정 |
|---|---|---|
| 없음 | 미고지 | 🟢 통과 (현재 상태 — `NEXT_PUBLIC_GA_ID` 가 비어 태그가 안 붙는다) |
| 없음 | 고지됨 | 🟢 통과 (방침 선배포) |
| 있음 | 고지됨 | 🟢 통과 |
| **있음** | **미고지** | 🔴 **차단** ← 유일하게 막는 칸 |

> **왜 문서가 아니라 검사인가** — 이 레포는 *"릴리스 때 같이 고친다"* 를 문서에만 둬서 두 번 샜다
> (`112 motion presets` 두 달 · `/update` 가 v2.4.0 고정). 사람이 기억해야 하는 규칙은 잊힌다.
>
> ⚠️ `privacy` 는 **법적 문서다.** 방침 문안은 오너 승인 없이 고치지 마라. 이 검사는 코드가
> 방침보다 앞서 나가는 것만 막는다 — 문안을 대신 써주지 않는다.

### Step 2: 변경 확인
1. `git status`로 변경 파일 확인
2. `git diff`로 변경 내용 확인
3. 변경이 없으면 "배포할 변경사항 없음" 보고 후 종료

### Step 3: 커밋
1. 변경 내용을 분석하여 커밋 메시지 작성
2. 관련 파일만 `git add` (민감 파일 제외: `.env`, `credentials` 등)
3. `git commit`

### Step 4: 푸시
1. `git push origin main`
2. Cloudflare Pages가 Git 연동으로 자동 빌드·배포 시작
3. 사용자에게 완료 보고:
   - 커밋 메시지
   - 변경된 파일 목록
   - 배포 URL: https://younameit.works

### Step 5: 배포 후 라이브 검사 — **오리진이 이번 빌드를 실제로 내주는가**

```bash
SITE=https://younameit.works
# 팔레트는 소스에서 뽑는다 — **자에 값을 복제하지 않는다. 토큰이 정본이다.**
# (사이트 액센트 자체는 닫힌 결정이다 — 오너 2026-09-04·09-07: 블루 #2AB5EA 지배,
#  레드 #E20039 는 로고 이미지 안에만. 그래도 리터럴을 자에 박으면 정본이 둘이 된다.)
ACCENT=$(grep -oE -- '--accent:[[:space:]]*#[0-9a-fA-F]{6}' app/globals.css | grep -oE '[0-9a-fA-F]{6}$' | head -1)
CSS=$(curl -s "$SITE/" | grep -oE '/_next/static/[^"]*\.css' | head -1)
LIVE=$(curl -s "$SITE$CSS" | grep -ci -- "$ACCENT") || LIVE=0
: "${LIVE:=0}"
if [ -z "$ACCENT" ] || [ -z "$CSS" ] || [ "$LIVE" -eq 0 ]; then
  echo "🔴 라이브 CSS 에 이번 팔레트($ACCENT)가 없다 — 오리진이 옛 청크를 내주고 있다"
  exit 1
fi
```

> **왜 여기인가** — 같은 검사가 플러그인 레포 `donys/CLAUDE.md` **릴리스 체크리스트**에도 있다.
> 그런데 스테일 CSS 가 실제로 터진 배포는 **웹 단독 배포**였고, 그날은 그 체크리스트가 안 돈다.
> **검사가 실패 모드와 다른 트리거에 걸려 있었다.** 양쪽에 있는 건 중복이 아니라 커버리지다 —
> 플러그인 쪽을 지우지 마라(릴리스 때는 zxp·`version.json` 과 같이 봐야 한다).
>
> ⚠️ **HTML 만 보면 통과한다.** 증상은 육안으로 크다(구 팔레트 · CTA 가 스타일 없는 맨 텍스트).
> 청크 이름이 내용이 아니라 그래프 파생이라, 앞 빌드가 캐시 히트로 옛 청크를 실어 보낼 수 있다.
> 걸리면 다음 커밋을 밀어 새 청크를 만드는 것으로 자체 해소된다(`Cache-Control: no-cache` 로는 안 된다 — CDN 이 아니라 오리진이 들고 있다).

## ⚠️ 이 배포 = 사이트 콘텐츠만. 플러그인 업데이트와는 분리 **예정**

배포 채널은 R2(`dl.younameit.works`)로 옮긴다. 다만 **아직 이전이 안 끝났다**:

🔴 **`public/version.json` 과 `public/donys.zxp` 를 지우지 마라.** 출고된 설치본의
`UPDATE_MANIFEST_URL` 이 `https://donys-website.vercel.app/version.json` 으로 **컴파일돼 있고**
(`donys/src/utils/version.ts:15`), `updateCheck.ts` 는 404 를 `return null` 로 **조용히 먹는다** —
지우면 기존 유저는 업데이트가 안 뜨는 줄도 모른다. 두 파일은 플러그인 Phase D(플러그인 URL 3곳
교체 + 지인 전원 새 빌드 내려받기)가 끝난 뒤에 지운다. 그 전에 지우면 배포가 곧 유저 유기다.

**릴리스(플러그인 버전업)를 반영하는 배포일 때만**: Step 3 커밋에 아래 두 파일이 같이 올라가는지
확인해라 — 릴리스인데 둘 다 안 바뀌었으면 사용자에게 알려라. R2 업로드(zxp·version.json)는 이
스킬 범위 밖이다.
- `lib/product.ts` 의 `VERSION`
- `app/update/page.tsx` 의 `RELEASES` (맨 앞에 새 항목 추가)

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 빌드 실패 | 배포 중단, 에러 내용 보고 |
| push 실패 | 원인 확인 (인증, 충돌 등) 후 사용자에게 안내 |
| 변경사항 없음 | 조기 종료, "배포할 내용 없음" 보고 |
