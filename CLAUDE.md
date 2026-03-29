# Dony's Website — 제품 랜딩 페이지

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 스타일 | Tailwind CSS 4 |
| 빌드 | 정적 사이트 (`output: 'export'`) |
| 호스팅 | Vercel |
| 배포 URL | https://donys-website.vercel.app/ |
| 도메인 | donys.dev (예정) |
| 레포 | https://github.com/donysong/donys-website |

## 디렉토리

```
donys-website/
├── app/
│   ├── layout.tsx          # SEO 메타, Inter 폰트, OG 태그
│   ├── page.tsx            # 메인 페이지 (섹션 조합)
│   └── globals.css         # 디자인 토큰 + Tailwind + 커스텀 유틸리티
├── components/
│   ├── Navbar.tsx          # 글래스모피즘 네비 + 모바일 햄버거
│   ├── Hero.tsx            # 메인 비주얼 + CTA 버튼 2개
│   ├── Features.tsx        # 6개 기능 카드 그리드
│   ├── Demo.tsx            # 영상 임베드 + 4개 패널 프리뷰
│   ├── Pricing.tsx         # $30 가격 카드 + 포함 내역
│   ├── FAQ.tsx             # 아코디언 6문항
│   └── Footer.tsx          # 연락처 + 소셜 링크
├── public/images/
│   ├── hero-screenshot.svg       # 3패널 풀 목업 (Script Grid + Library + Graph Editor)
│   ├── feature-text-presets.svg  # Text Presets 패널 목업
│   ├── feature-graph-editor.svg  # Graph Editor 패널 목업
│   ├── feature-gradient-library.svg  # Gradient Library 패널 목업
│   └── feature-expression-editor.svg # Expression Editor 패널 목업
├── next.config.ts          # 정적 export 설정
├── postcss.config.mjs      # Tailwind PostCSS
└── tsconfig.json
```

## 빌드

```bash
npm run dev       # 로컬 개발 (localhost:3000)
npm run build     # 정적 사이트 빌드 → out/
```

## 디자인 시스템 (Linear 스타일 리디자인)

- 배경: `#08080a` (다크), 카드: `#0f0f12`, 엘리베이트: `#141418`
- 액센트: Indigo `#6366f1` / Light `#818cf8` (플러그인과 동일)
- 텍스트 계층: `#ebebef` → `#a1a1aa` → `#52525b`
- 보더: `rgba(255,255,255,0.06)` (반투명)
- 폰트: Inter (Google Fonts CDN)
- `.gradient-text` — 인디고-퍼플 애니메이션 그라데이션
- `.glow` / `.glow-hover` — 다층 box-shadow 글로우
- `.fade-in-up` — 페이드인 애니메이션
- `.section-fade` — 그라데이션 섹션 구분선

## TODO — 에셋 교체 필요

- [x] Hero 스크린샷 (SVG 목업 제작 완료)
- [x] Feature 프리뷰 4개 (SVG 목업 제작 완료)
- [x] Vercel 배포
- [ ] Demo 영상 YouTube URL (`components/Demo.tsx`)
- [ ] 로고 이미지 (`public/images/`)
- [ ] 구매 링크 → Lemon Squeezy URL (`components/Pricing.tsx` href)
- [ ] 소셜 링크 — Twitter, YouTube URL (`components/Footer.tsx`)
- [ ] donys.dev 도메인 연결

## 관련 프로젝트

- **플러그인 소스**: `../Dony-s-AE-Plugin/donys/`
- **플러그인 PRD/TRD**: `../Dony-s-AE-Plugin/PRD.md`, `TRD.md`
