---
name: site-update
description: "Dony's 랜딩 페이지에 변경 작업을 수행하고 품질을 검증하는 오케스트레이터. 페이지 추가, 컴포넌트 수정, 콘텐츠 업데이트 등 사이트 변경 요청 시 site-developer로 구현하고 qa-reviewer로 검증한다. '사이트 업데이트', '페이지 추가', '컴포넌트 수정', '콘텐츠 변경' 등의 요청 시 사용."
---

# Site Update Orchestrator

Dony's 랜딩 페이지의 변경 작업을 조율하는 오케스트레이터. site-developer가 구현하고, qa-reviewer가 검증하는 생성-검증 패턴.

## 실행 모드: 서브 에이전트

## 에이전트 구성

| 에이전트 | subagent_type | 역할 | 출력 |
|---------|--------------|------|------|
| site-developer | site-developer | 코드 변경 구현 | 수정/생성된 파일들 |
| qa-reviewer | qa-reviewer | 빌드 + 품질 검증 | `_workspace/qa_report.md` |

## 워크플로우

### Phase 1: 준비
1. 사용자 요청 분석 — 어떤 파일을 변경/생성해야 하는지 파악
2. 작업 디렉토리에 `_workspace/` 생성 (없으면)
3. 현재 프로젝트 상태 확인 (git status, 기존 파일 구조)

### Phase 2: 구현

**실행 방식:** 순차

1. site-developer 실행:
   - 입력: 사용자의 변경 요청 + 관련 파일 컨텍스트
   - model: opus
   - 작업: 코드 변경/생성 수행

### Phase 3: 검증

1. qa-reviewer 실행:
   - 입력: Phase 2에서 변경된 파일 목록
   - model: opus
   - 작업: 빌드 검증, 디자인 일관성, 링크, 메타데이터 체크
   - 출력: `_workspace/qa_report.md`

### Phase 4: 수정 (조건부)

FIX 판정 항목이 있으면:
1. qa_report.md 내용을 site-developer에게 전달
2. site-developer가 수정 수행
3. qa-reviewer 재검증 (최대 2회 루프)

### Phase 5: 정리
1. `_workspace/` 보존
2. 사용자에게 결과 요약:
   - 변경/생성된 파일 목록
   - QA 결과 (PASS/FIX)
   - 빌드 상태

## 데이터 흐름

```
사용자 요청 → [site-developer] → 코드 변경
                                    ↓
                              [qa-reviewer] → qa_report.md
                                    ↓
                              FIX? → [site-developer] 재수정 → [qa-reviewer] 재검증
                                    ↓
                              결과 요약 → 사용자
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| site-developer 빌드 실패 | qa-reviewer 스킵, 에러를 site-developer에게 전달하여 수정 |
| qa-reviewer FIX 판정 | site-developer에게 수정 지시 전달, 최대 2회 재시도 |
| 2회 재시도 후에도 FIX | 사용자에게 남은 이슈 리포트, 수동 수정 제안 |
| 에이전트 실패 | 1회 재시도 후 재실패 시 사용자에게 알림 |

## 테스트 시나리오

### 정상 흐름
1. 사용자가 "FAQ에 새 질문 추가해줘"를 요청
2. Phase 1: FAQ.tsx 파일 확인
3. Phase 2: site-developer가 FAQ 데이터에 새 항목 추가
4. Phase 3: qa-reviewer가 빌드 + 디자인 검증 → PASS
5. Phase 5: 변경 요약 리포트
6. 예상 결과: FAQ.tsx 수정, 빌드 성공

### 에러 흐름
1. 사용자가 "새 About 페이지 추가해줘"를 요청
2. Phase 2: site-developer가 app/about/page.tsx 생성 (Navbar 누락)
3. Phase 3: qa-reviewer가 레이아웃 FIX 판정 — "Navbar/Footer 누락"
4. Phase 4: site-developer가 Navbar + Footer 추가
5. Phase 3 재실행: qa-reviewer PASS
6. Phase 5: 결과 요약 (1회 수정 후 통과)
