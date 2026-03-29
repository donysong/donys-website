# Dony's Website — 제품 랜딩 페이지

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 스타일 | Tailwind CSS 4 |
| 빌드 | 정적 사이트 (`output: 'export'`) |
| 호스팅 | Vercel (예정) |
| 도메인 | donys.dev (예정) |

## 디렉토리

```
donys-website/
├── app/
│   ├── layout.tsx          # SEO 메타, Inter 폰트, OG 태그
│   ├── page.tsx            # 메인 페이지 (섹션 조합)
│   └── globals.css         # 디자인 토큰 + Tailwind + 커스텀 유틸리티
├── components/
│   ├── Navbar.tsx          # 고정 네비 + 모바일 햄버거
│   ├── Hero.tsx            # 메인 비주얼 + CTA 버튼 2개
│   ├── Features.tsx        # 6개 기능 카드 그리드
│   ├── Demo.tsx            # 영상 임베드 + GIF 3개 그리드
│   ├── Pricing.tsx         # $30 가격 카드 + 포함 내역
│   ├── FAQ.tsx             # 아코디언 6문항
│   └── Footer.tsx          # 연락처 + 소셜 링크
├── public/images/          # 스크린샷, GIF, 로고 등 에셋
├── next.config.ts          # 정적 export 설정
├── postcss.config.mjs      # Tailwind PostCSS
└── tsconfig.json
```

## 빌드

```bash
npm run dev       # 로컬 개발 (localhost:3000)
npm run build     # 정적 사이트 빌드 → out/
```

## 디자인 시스템

- 배경: `#0a0a0a` (다크), 카드: `#141414`
- 액센트: Indigo `#6366f1` (플러그인과 동일)
- 폰트: Inter (Google Fonts CDN)
- `.gradient-text` — 애니메이션 그라데이션 텍스트
- `.glow` / `.glow-hover` — 인디고 글로우 이펙트

## TODO — 에셋 교체 필요

- [ ] Hero 스크린샷/GIF (`components/Hero.tsx` placeholder)
- [ ] Demo 영상 YouTube URL (`components/Demo.tsx`)
- [ ] Feature GIF 3개 (Text Presets, Graph Editor, Gradient)
- [ ] 로고 이미지 (`public/images/`)
- [ ] 구매 링크 → Lemon Squeezy URL (`components/Pricing.tsx` href)
- [ ] 소셜 링크 — Twitter, YouTube URL (`components/Footer.tsx`)
- [ ] Vercel 배포 + donys.dev 도메인 연결

## 관련 프로젝트

- **플러그인 소스**: `../Dony-s-AE-Plugin/donys/`
- **플러그인 PRD/TRD**: `../Dony-s-AE-Plugin/PRD.md`, `TRD.md`
