import type { Metadata } from 'next';
import UpdateBody from '@/components/UpdateBody';

/* 🔴 이 경로는 패널 `version.json` 의 `url` 이 가리키는 **계약**이다 — 라이브 R2 매니페스트가
   `https://younameit.works/update` 를 싣고 있다. **옮기지도, 지우지도 마라.**
   본문은 `components/UpdateBody.tsx` 한 벌을 국문판(`/ko/update`)과 공유한다.

   ⚠️ 이 페이지는 판매 랜딩에서 링크되지 않는다. 패널 업데이트 카드의 링크로만 열린다.
   🔴 패널은 version.json 의 `notes` 를 **읽지 않는다** — `updateCheck.ts` 가 {version, url, download}
   만 파싱한다. **릴리스 노트의 정본은 `lib/releases.ts` 이고 이 페이지가 그걸 보여준다.**
   ⚠️ 도달 가능성이 버전마다 다르다:
     v2.2.1+ : `변경 내용 · 수동 설치` 링크가 카드에 **항상** 뜬다 → 언제든 여기로 온다.
     v2.2.0  : 설치 실패가 **보고될 때만** 링크가 뜬다(구 UI 는 설치 버튼과 배타).
     v2.1.0  : 실패를 성공으로 읽는 결함 때문에 `완료` 로 가고 **버튼이 통째로 사라진다**
               → 이 페이지에 올 방법이 없다. **오너가 직접 링크를 보내야 한다.** */
export const metadata: Metadata = {
  alternates: {
    canonical: '/update',
    languages: { en: '/update', ko: '/ko/update', 'x-default': '/update' },
  },
  title: 'Updates — You Name It',
  description: 'Download the latest You Name It build, and read what changed.',
};

export default function UpdatePage() {
  return <UpdateBody lang="en" />;
}
