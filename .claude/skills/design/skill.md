---
name: design
description: "DESIGN.md 기반 디자인 시스템 관리 스킬. 외부 디자인 레퍼런스 가져오기, 프로젝트 DESIGN.md 생성/갱신, 디자인 감사, 컴포넌트 스타일 가이드 생성을 수행한다. 'design', '디자인', '디자인 시스템', '디자인 가이드', '스타일 가이드', 'DESIGN.md' 등의 요청 시 사용."
---

# Design System Manager

DESIGN.md 기반으로 프로젝트의 디자인 시스템을 관리하는 스킬. designer 에이전트가 디자인 의사결정을, site-developer가 코드 반영을 담당한다.

## 실행 모드: 서브 에이전트

## 에이전트 구성

| 에이전트 | subagent_type | 역할 | 출력 |
|---------|--------------|------|------|
| designer | designer | 디자인 분석/가이드 생성 | 디자인 스펙, DESIGN.md 갱신 |
| site-developer | site-developer | 디자인 → 코드 반영 | 수정된 CSS/컴포넌트 |
| qa-reviewer | qa-reviewer | 디자인 일관성 검증 | qa_report.md |

## 커맨드

사용자 요청에 따라 아래 워크플로우 중 하나를 실행한다.

---

### 커맨드 1: `import` — 외부 디자인 레퍼런스 가져오기

**트리거**: "~~ 디자인 참고해줘", "~~ 스타일 가져와", "DESIGN.md 가져와"

**워크플로우:**

1. `npx getdesign@latest add <site-name>` 실행하여 DESIGN.md 다운로드
   - 사용 가능한 사이트: linear.app, vercel, stripe, figma, notion 등 59개
   - 전체 목록: `VoltAgent/awesome-design-md` 레포 참고
2. 다운로드된 DESIGN.md 분석
3. designer 에이전트 실행:
   - 현재 프로젝트 디자인 시스템(globals.css, CLAUDE.md)과 비교
   - 적용 가능한 요소 추출 (컬러, 타이포, 컴포넌트 패턴)
   - 충돌/차이점 리포트
4. 사용자에게 적용 제안 요약 보고

**출력:**
```
## DESIGN.md Import 결과

### 소스: [site-name]
### 적용 가능 요소
- [항목]: [값] — [현재 프로젝트와의 관계]

### 충돌 요소
- [항목]: 소스 [값] vs 현재 [값]

### 적용 제안
1. [구체적 제안]
```

---

### 커맨드 2: `guide` — 컴포넌트/페이지 디자인 가이드 생성

**트리거**: "~~ 디자인 가이드 만들어줘", "~~ 스타일 스펙", "~~ 어떻게 디자인하면 좋을까"

**워크플로우:**

1. 사용자 요청 분석 — 어떤 컴포넌트/페이지인지 파악
2. designer 에이전트 실행:
   - DESIGN.md에서 관련 섹션 참조
   - 유사 기존 컴포넌트 분석 (components/ 디렉토리)
   - 구체적 스타일 스펙 생성 (색상, 타이포, 레이아웃, 상태)
3. 사용자에게 디자인 가이드 제시
4. (선택) 사용자 승인 후 site-developer에게 전달하여 구현

---

### 커맨드 3: `audit` — 디자인 시스템 감사

**트리거**: "디자인 감사해줘", "디자인 일관성 체크", "DESIGN.md랑 맞는지 확인"

**워크플로우:**

1. 현재 DESIGN.md 로드
2. designer 에이전트 실행:
   - globals.css CSS 변수와 DESIGN.md 컬러 비교
   - 각 컴포넌트(.tsx)의 스타일이 DESIGN.md 스펙과 일치하는지 검토
   - 하드코딩된 값 탐지
3. 감사 리포트 생성 (MATCH / DRIFT 판정)
4. DRIFT 항목에 대해 수정 제안

---

### 커맨드 4: `sync` — DESIGN.md ↔ 코드 동기화

**트리거**: "디자인 동기화", "DESIGN.md 반영해줘", "디자인 토큰 업데이트"

**워크플로우:**

1. designer 에이전트 실행:
   - DESIGN.md의 Color Palette → globals.css CSS 변수 매핑 생성
   - 변경이 필요한 토큰 식별
2. site-developer 에이전트 실행:
   - globals.css 업데이트 (CSS 변수 추가/수정)
   - 필요 시 컴포넌트 스타일 업데이트
3. qa-reviewer 에이전트 실행:
   - 빌드 검증
   - 디자인 일관성 재검증

---

## 데이터 흐름

```
사용자 요청
  ├── import → npx getdesign → DESIGN.md → [designer] → 분석 리포트
  ├── guide  → [designer] → 스타일 스펙 → (승인) → [site-developer] → 코드
  ├── audit  → [designer] → DESIGN.md vs 코드 비교 → 감사 리포트
  └── sync   → [designer] → 매핑 → [site-developer] → 코드 → [qa-reviewer] → 검증
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| DESIGN.md 없음 | import 커맨드 안내 또는 수동 작성 제안 |
| npx getdesign 실패 | 사이트명 확인, 사용 가능 목록 제시 |
| 디자인 충돌 다수 | 우선순위 높은 항목(컬러, 타이포)만 먼저 처리 제안 |
| 코드 반영 후 빌드 실패 | site-developer에게 롤백/수정 지시 |

## 참고

### awesome-design-md 사용 가능 사이트 (주요)
- **AI/ML**: claude, cohere, elevenlabs, mistral.ai, ollama, replicate, x.ai
- **Dev Tools**: cursor, expo, linear.app, lovable, mintlify, posthog, raycast, resend, sentry, supabase, vercel, warp, zapier
- **Design**: airtable, cal, figma, framer, intercom, miro, notion, pinterest, webflow
- **Infra**: clickhouse, composio, hashicorp, mongodb, sanity, stripe
- **Enterprise**: airbnb, apple, ibm, nvidia, spacex, spotify, uber

### DESIGN.md 9개 섹션 구조
1. Visual Theme & Atmosphere
2. Color Palette & Roles
3. Typography Rules
4. Component Stylings
5. Layout Principles
6. Depth & Elevation
7. Do's and Don'ts
8. Responsive Behavior
9. Agent Prompt Guide
