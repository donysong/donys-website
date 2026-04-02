---
name: deploy
description: "Dony's 사이트를 빌드 검증 후 git commit & push하여 Vercel에 배포하는 스킬. '배포해줘', 'deploy', '푸시해줘', '커밋하고 배포', '웹사이트 업데이트 반영' 등의 요청 시 사용. 빌드가 실패하면 배포를 중단하고 에러를 보고한다."
---

# Deploy — 빌드 검증 + 배포

변경사항을 빌드 검증 후 git commit & push하여 Vercel에 자동 배포한다.

## 워크플로우

### Step 1: 빌드 검증
1. `./node_modules/.bin/next build` 실행
2. 빌드 실패 시 **배포 중단** — 에러 메시지를 사용자에게 보고

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
2. Vercel이 자동으로 배포 시작
3. 사용자에게 완료 보고:
   - 커밋 메시지
   - 변경된 파일 목록
   - 배포 URL: https://donys-website.vercel.app/

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 빌드 실패 | 배포 중단, 에러 내용 보고 |
| push 실패 | 원인 확인 (인증, 충돌 등) 후 사용자에게 안내 |
| 변경사항 없음 | 조기 종료, "배포할 내용 없음" 보고 |
