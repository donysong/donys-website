'use client';
/* 06 연결하기 — Chat 연결(Pro) · Library 무료 검색 키(무료). 2026-10-26 오너 *"닥스에 챗 패널 연동하는 법이랑 라이브러리 giphy 나 pexel 등
   API 연결하는 방법도 적혀있어야할듯. 홍보해도 좋고"*. 🔴 버튼·메뉴 이름은 패널 문자열 그대로다(플러그인 i18n) — 바꾸면 화면과 어긋난다.
   컨트롤 하나하나는 01 패널 절의 사용법(`donys/usage/` 생성물)이 정본이고, 여기는 처음 연결하는 순서만 적는다.
   `/ae` 기능 판(Chat · Library 블록)이 `#connect` 로 들어온다. */
import { useT } from '@/components/site3p/lang';
import SecHead from './SecHead';

function Guide({ id, k, tier }: { id: string; k: 'chat' | 'search'; tier: 'free' | 'pro' }) {
  const { t, list } = useT();
  return (
    <article className="guide" id={id}>
      <div className="guide-h">
        <h3>{t(`docs.${k}.h`)}</h3>
        <span className={`stamp ${tier === 'pro' ? 'red' : 'black'}`}><span className="dot" />{t(`docs.connect.${tier}`)}</span>
      </div>
      <p className="guide-lead">{t(`docs.${k}.lead`)}</p>
      <ol className="guide-steps">
        {list(`docs.${k}.steps`).map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: s }} />)}
      </ol>
      <ul className="guide-notes">
        {list(`docs.${k}.notes`).map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </article>
  );
}

export default function Connect() {
  const { t } = useT();
  return (
    <section id="connect" className="sec" data-plate="06" data-name="docs.nav.connect">
      <SecHead no="06" stone={7} k="docs.connect.h" tag="docs.connect.tag" />
      <div className="guides">
        <Guide id="connect-chat" k="chat" tier="pro" />
        <Guide id="connect-search" k="search" tier="free" />
      </div>
      <p className="guide-more"><a href="#panels" data-cur>{t('docs.connect.usage')}</a></p>
    </section>
  );
}
