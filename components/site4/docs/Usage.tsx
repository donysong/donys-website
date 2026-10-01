'use client';
/* 사용법 토글 — 툴 카드 · 패널 행 · 카탈로그 칸이 **같은 부품**을 쓴다.
   🔴 본문은 여기서 쓰지 않는다. 플러그인 repo `donys/usage/{ko,en}/<id>.md` 가 정본이고 `lib/docsUsage.ts` 가 생성물이다
   (`tools/build-docs-data.mjs`). 문서가 없는 id 는 토글이 **안 뜰 뿐**이다(에러 아님 — `carouselRig` 는 이월 중이라 지금 그렇다).
   4절 HTML 은 생성기가 이스케이프를 거쳐 낸 최소 태그뿐이라 `dangerouslySetInnerHTML` 로 넣는다(사전 문자열과 같은 규약, `lang.tsx`).

   🔴 해시 규약: 앵커(`#tool-<id>` · `#panel-<key>` · `#catalog-<kind>`)는 그대로고, **그 앵커로 들어오면 그 토글이 자동으로 펼쳐진다**.
   카드가 열려 있다고 앵커가 바뀌지 않는다 — 외부 링크 · `/ae` 의 "무엇에서 도는지는 Docs 에" 약속이 그대로다.
   서브페이지(`/ae/docs/<id>`)는 2단계 후보다 — 이 해시가 이미 "열린 상태" 를 가리키므로 이행이 쉽다. */
import { useEffect, useState } from 'react';
import { useT } from '@/components/site3p/lang';
import { DOCS_USAGE, type DocsUsage } from '@/lib/docsUsage';

/* 🔴 죽은 앵커 — 옛 링크가 새 자리로 떨어지게 한다. **그 앵커가 DOM 에 없을 때만** 움직인다(`resolveHash`):
   태그 v2.7.1 에서는 아직 셋 다 살아 있고, 개명·이사가 나간 판(v2.8.0 — Copy/Paste Keys 는 Curves 패널로, `proximityRig` 는
   `effectorRig` 로)에서만 발동한다. 그래서 이 표는 지금 넣어도 안전하고 판이 바뀔 때 손댈 곳이 없다.
   새 개명이 생기면 한 줄을 더하라 — 외부(오너 DM · 커뮤니티 글 · 검색 결과)에 이미 박힌 주소는 우리가 못 고친다. */
const HASH_REDIRECT: Readonly<Record<string, string>> = {
  'tool-copyKeyframes': 'panel-curves',
  'tool-pasteKeyframes': 'panel-curves',
  'tool-proximityRig': 'tool-effectorRig',
};

function currentHash(): string {
  try { return decodeURIComponent(location.hash.slice(1)); } catch { return location.hash.slice(1); }
}

/** 지금 해시를 (필요하면 새 앵커로 갈아) 돌려준다. 이미 새 앵커면 아무것도 안 한다 — 멱등. */
function resolveHash(): string {
  const id = currentHash();
  const to = HASH_REDIRECT[id];
  if (!to || document.getElementById(id)) return id;
  history.replaceState(null, '', `#${to}`);
  document.getElementById(to)?.scrollIntoView();
  return to;
}

/** 사용법이 하나도 없어도(지금 v2.7.1) 죽은 앵커는 갈아야 한다 — 그래서 토글과 별개로 DocsPage 가 한 번 건다. */
export function HashRedirect() {
  useEffect(() => {
    resolveHash();
    window.addEventListener('hashchange', resolveHash);
    return () => window.removeEventListener('hashchange', resolveHash);
  }, []);
  return null;
}

/** 이 id 의 사용법과 펼침 상태. 해시가 `anchor` 면 펼치고 그 자리로 다시 스크롤한다(펼치면 레이아웃이 밀린다).
    🔴 스크롤은 펼침이 **커밋된 뒤**(`jump` 효과)에 건다. 구판은 `setOpen` 직후 rAF 에서 불렀는데 그 rAF 가 커밋보다 먼저 돌아
    접힌 자리를 겨눴고, 펼친 카드가 다음 줄로 내려가면서(전폭 행) 1440 폭에서 카드 머리가 화면 중간(≈500px)에 섰다(2026-10-02 검증 적발).
    `jump` 는 카운터라 이미 펼친 카드로 같은 앵커가 다시 와도 스크롤한다. */
export function useUsage(usageId: string, anchor: string) {
  const entry: DocsUsage | undefined = DOCS_USAGE[usageId];
  const [open, setOpen] = useState(false);
  const [jump, setJump] = useState(0);
  useEffect(() => {
    if (!entry) return;
    const sync = () => {
      if (resolveHash() !== anchor) return;
      setOpen(true);
      setJump((n) => n + 1);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [entry, anchor]);
  useEffect(() => {
    if (jump) document.getElementById(anchor)?.scrollIntoView();
  }, [jump, anchor]);
  return { entry, open, setOpen };
}

const SECTIONS = ['sel', 'ctl', 'mod', 'lim'] as const;

/** `<details>` 한 벌. 열림은 상위가 쥔다(카드가 전폭 행으로 커지는 클래스가 거기서 갈린다). */
export function Usage({ entry, open, onOpen }: { entry: DocsUsage; open: boolean; onOpen: (o: boolean) => void }) {
  const { t, lang } = useT();
  const loc = entry[lang];
  return (
    <details className="usage" open={open} onToggle={(e) => onOpen(e.currentTarget.open)}>
      <summary data-cur>{t('docs.usage')} <span className="pm" aria-hidden="true">+</span></summary>
      <div className="usage-body">
        {loc.requires.length ? (
          <div className="usage-req">
            <span className="usage-h">{t('docs.usage.requires')}</span>
            <ul>{loc.requires.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        ) : null}
        {SECTIONS.map((k) => (
          <div key={k}>
            <h5 className="usage-h">{t(`docs.usage.${k}`)}</h5>
            <div className="usage-md" dangerouslySetInnerHTML={{ __html: loc[k] }} />
          </div>
        ))}
      </div>
    </details>
  );
}
