'use client';
/* 잉크 판 — 세 겹: rim(판이 앉은 종이색 바닥) · ko(좌상단으로 밀린 흰 판) · ink(빨간 잉크, multiply + 롤러·알갱이 결).
   잉크가 흰 판 밖으로 나간 쪽은 종이에 곱해져 짙은 테가 된다(§16-13, 2026-09-28 — 빨간 판 전부). 규칙 = site3p.css `.pl` 블록.
   흰 판 어긋남의 바닥 = --pl-rx/--pl-ry (오너 2026-09-11 판정으로 밑판 그림자와 분리됐다).
   (구 `black` 검정 판 — 흰 판 없는 변형 — 은 쓰는 곳이 0 이라 2026-09-28 에 뺐다.)
   (구 `reg` — 스크롤 진입 때 흰 테가 제자리로 오는 판 — 은 쓰는 곳이 0 이었고 rim 이 종이판이 되면서 뜻을 잃어 뺐다.) */
import { useT } from './lang';

export function Plate3({ k, className = '', press = true, boil = true, block = false }: {
  k: string; className?: string; press?: boolean; boil?: boolean; block?: boolean;
}) {
  const { t } = useT();
  const s = t(k);
  const cls = ['pl', press ? 'press' : '', boil ? 'boil' : '', block ? 'block' : '', className]
    .filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <span className="rim" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s }} />
      <span className="ko" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s }} />
      <span className="ink" dangerouslySetInnerHTML={{ __html: s }} />
    </span>
  );
}
