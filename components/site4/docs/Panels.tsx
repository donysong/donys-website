'use client';
/* 01 — 패널 표. 행은 `lib/docsData.ts` 의 `DOCS_PANELS`(CEP manifest 에서 읽은 것)가 정하고,
   설명만 사전에서 온다. 🔴 패널 이름은 로케일 무관 영문이다 — AE 창 메뉴 라벨과 같은 문자열이라
   한국어로 되돌리지 마라(오너 2026-09-01 닫힌 결정).

   ⚠️ 프로토와 한 곳 다르다: 프로토는 머리글이 3칸인데 2번째 칸을 `width:1px` 빈 칸으로 두고
   "정체" 를 1번 칸 안에 쌓았다 — 즉 **"정체" 머리글이 빈 칸 위에 떠 있었다.** 여기서는 그
   칸에 실제로 정체를 넣는다(머리글 3개 = 칸 3개). 스페이서 인라인 스타일도 같이 사라진다.
   표 밑 주석(`docs.panels.note`)은 국문 면에만 있다 — 영문 독자에게 "이름이 영문" 은 정보가 아니다. */
import { useT } from '@/components/site3p/lang';
import { DOCS_PANELS } from '@/lib/docsData';
import SecHead from './SecHead';

export default function Panels() {
  const { t } = useT();
  const note = t('docs.panels.note');
  return (
    <section id="panels" className="sec" data-plate="01" data-name="docs.nav.panels">
      <SecHead no="01" stone={4} k="docs.panels.h" tag="docs.panels.tag" />
      <table className="ptable">
        <thead>
          <tr><th>{t('docs.th.panel')}</th><th>{t('docs.th.what')}</th><th>{t('docs.th.does')}</th></tr>
        </thead>
        <tbody>
          {DOCS_PANELS.map((p) => (
            <tr key={p.key}>
              <td>{p.name}</td>
              <td><span className="k">{t(`docs.panel.${p.key}.k`)}</span></td>
              <td dangerouslySetInnerHTML={{ __html: t(`docs.panel.${p.key}.d`) }} />
            </tr>
          ))}
        </tbody>
      </table>
      {note ? <p className="lab lc">{note}</p> : null}
    </section>
  );
}
