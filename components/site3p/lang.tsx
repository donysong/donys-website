'use client';
/* EN/KO — 사전 하나로 페이지 전체를 갈아끼운다. 국문은 부제가 아니라 **별도 운용**이다(플랜 §12.7).
   상태는 `.p3` 루트의 data-lang 으로 내려가고, CSS 가 거기서 폰트·자간·대문자화를 가른다. */
import { createContext, useContext, useEffect, useState } from 'react';
import { T, t as pick, list as pickList, type Lang } from '@/lib/copy';

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  /* 시작 언어 = ?lang → localStorage → en. 🔴 서버 렌더와 첫 클라이언트 렌더가 같아야 하므로
     (정적 export = HTML 이 EN 으로 구워진다) 언어 결정은 effect 에서만 한다. */
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('lang');
    let saved: string | null = null;
    try { saved = localStorage.getItem('yni-lang'); } catch { /* 사파리 프라이빗 */ }
    const next = (q || saved || 'en') as Lang;
    if (T[next]) setLang(next);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('yni-lang', lang); } catch { /* 무시 */ }
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
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
