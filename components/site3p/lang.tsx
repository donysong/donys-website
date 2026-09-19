'use client';
/* EN/KO — 사전 하나로 페이지 전체를 갈아끼운다. 국문은 부제가 아니라 **별도 운용**이다(플랜 §12.7).
   상태는 `.p3` 루트의 data-lang 으로 내려가고, CSS 가 거기서 폰트·자간·대문자화를 가른다.

   🔴 **2026-09-19 — 언어는 이제 URL 이 정한다.** 전에는 `?lang=ko` + localStorage 클라이언트 스왑이라
   정적 export 가 구워내는 HTML 이 **EN 한 벌뿐**이었다: 국문에 주소가 없어서 링크로 보낼 수도,
   검색에 잡힐 수도 없었다(계획서 §4~5 는 원래 `/ko` 정적 경로라고 적혀 있었는데 구현이 갈라졌다).
   지금은 `/ko` · `/ko/ae` · `/ko/ae/docs` 가 **각각 구워진다** ⇒ `locked` 로 로캘을 박는다.
   그 경로에서는 토글이 상태를 바꾸는 게 아니라 **짝 페이지로 이동**한다(Shell 의 Nav4). */
import { createContext, useContext, useEffect, useState } from 'react';
import { T, t as pick, list as pickList, type Lang } from '@/lib/copy';

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; locked: boolean }>({
  lang: 'en', setLang: () => {}, locked: false,
});

export function LangProvider({ initial, children }: { initial?: Lang; children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial ?? 'en');
  const locked = initial !== undefined;
  /* 로캘이 URL 로 박힌 페이지는 아무것도 조회하지 않는다 — 서버 렌더와 첫 클라이언트 렌더가 같아야 한다.
     박히지 않은 경우에만 옛 경로(`?lang=`·localStorage)를 본다: 구 링크가 아직 돌아다닌다. */
  useEffect(() => {
    if (locked) return;
    const q = new URLSearchParams(location.search).get('lang');
    let saved: string | null = null;
    try { saved = localStorage.getItem('yni-lang'); } catch { /* 사파리 프라이빗 */ }
    const next = (q || saved || 'en') as Lang;
    if (T[next]) setLang(next);
  }, [locked]);
  useEffect(() => {
    document.documentElement.lang = lang;
    if (locked) return;
    try { localStorage.setItem('yni-lang', lang); } catch { /* 무시 */ }
  }, [lang, locked]);
  return <Ctx.Provider value={{ lang, setLang, locked }}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }
export function useT() {
  const { lang } = useContext(Ctx);
  return { t: (k: string) => pick(lang, k), list: (k: string) => pickList(lang, k), lang };
}

/* 사전 문자열은 <b> 같은 인라인 태그를 품는다(카피가 강조를 들고 있다) — 그래서 innerHTML 로 넣는다.
   🔴 이 사전은 우리가 쓴 정적 텍스트이고 유저 입력이 아니다. 외부 입력을 여기로 보내지 마라. */
export function Html({ k, as: As = 'span', ...rest }: { k: string; as?: 'span' | 'p' | 'div' | 'q' | 'b' | 'small' } & React.HTMLAttributes<HTMLElement>) {
  const { t } = useT();
  return <As {...rest} dangerouslySetInnerHTML={{ __html: t(k) }} />;
}
