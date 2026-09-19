'use client';
/* 03 기능 — 증거(판) 좌 60% / 명사 헤드라인 + 불릿 우 40%. 블록 5개 + 툴박스 후킹 6장.
   🔴 39개를 나열하면 카탈로그가 되고, 몇 개를 풀면 제품이 된다 — 나머지는 Docs 로 넘긴다.
   🔴 `{rest}` 만 여기서 채운다(= 전체 툴 − 여기 푼 6장). 사전에 숫자를 박으면 그 순간 낡는다. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { COUNTS } from '@/lib/product';

/* 패널 스크린샷 판 — `.feat .fig .spot` 은 시트(.spot)용 규칙이라 정지 스크린샷(img)엔 안 붙는다.
   프로토가 인라인으로 들고 있던 그 값 그대로다(밑판 = --m 배율, 등록 애니가 여기를 탄다). */
const PANEL_IMG: React.CSSProperties = {
  width: '100%',
  aspectRatio: '16/9',
  objectFit: 'cover',
  boxShadow: 'calc(var(--rx)*var(--m,1.6)) calc(var(--ry)*var(--m,1.6)) 0 var(--white)',
};

/* 카테고리 라벨·툴 이름은 패널 정본이라 국문에서도 영문이다. */
const HOOKS = [
  { id: 'copyKeyframes', alt: 'Copy Keys', cat: 'Motion', name: 'Copy / Paste Keys' },
  { id: 'proximityRig', alt: 'Effector', cat: 'Motion', name: 'Effector' },
  { id: 'bentoGrid', alt: 'Bento Grid', cat: 'Shape', name: 'Bento Grid' },
  { id: 'autoMarker', alt: 'Auto Marker', cat: 'Motion', name: 'Auto Marker' },
  { id: 'typewriterCursor', alt: 'Typewriter (Cursor)', cat: 'Stylize', name: 'Typewriter (Cursor)' },
  { id: 'patternLab', alt: 'Pattern Lab', cat: 'Shape', name: 'Pattern Lab' },
];

/* 정지는 2× 스틸, 호버는 1× 시트가 위에 얹혀 돈다(`.hook-fig` 계약). */
function Hook({ h, n }: { h: (typeof HOOKS)[number]; n: number }) {
  return (
    <article className="hook">
      <figure className="spot-fig hook-fig">
        <img src={`/riso/spots/still/${h.id}.webp`} alt={h.alt} />
        <i className="spot" aria-hidden="true" style={{ backgroundImage: `url(/riso/spots/${h.id}.webp)` }} />
      </figure>
      <h4><em>{h.cat}</em>{h.name}</h4>
      <Html k={`ae.hook${n}.p`} as="p" />
    </article>
  );
}

/* 패널 스크린샷을 쓰는 기능 블록(Chat · Library · Curves · Custom). */
function Feat({ k, img, capTop = 12 }: { k: string; img: string; capTop?: number }) {
  const { t, list } = useT();
  return (
    <div className="feat sweep">
      <figure className="fig">
        <figure className="spot-fig">
          <img src={`/riso/spots/${img}.webp`} alt={t(`${k}.alt`)} style={PANEL_IMG} />
          <figcaption className="cap" style={{ marginTop: capTop }}><Html k={`${k}.cap`} /></figcaption>
        </figure>
      </figure>
      <div>
        <h3><Html k={`${k}.h`} /></h3>
        <Html k={`${k}.p1`} as="p" />
        <Html k={`${k}.p2`} as="p" />
        <ul>
          {list(`${k}.li`).map((li) => <li key={li} dangerouslySetInnerHTML={{ __html: li }} />)}
        </ul>
      </div>
    </div>
  );
}

export default function Features() {
  const { t, list } = useT();
  const rest = COUNTS.scripts - HOOKS.length;
  return (
    <section id="what" data-plate="03" data-name="ae.plate.what">
      <div className="sec" style={{ paddingBottom: 40 }}>
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-4.webp" alt="" /> <span className="lab">03</span></div>
          <h2 className="disp"><Plate3 k="ae.what.h" boil={false} /></h2>
          <Html k="ae.what.tag" as="p" className="tag" />
        </div>

        <Feat k="ae.f1" img="panel-chat" />

        {/* 기능 2 — Toolbox. 🔴 여기만 진짜 자산이 있다(패널이 버튼 위에 띄우는 그 시트) */}
        <div className="feat sweep">
          <figure className="fig">
            <figure className="spot-fig">
              <i className="spot" role="img" aria-label="Effector" style={{ backgroundImage: 'url(/riso/spots/proximityRig.webp)' }} />
            </figure>
            <figcaption className="cap" style={{ marginTop: 20 }}><Html k="ae.f2.cap" /></figcaption>
          </figure>
          <div>
            <h3><Html k="ae.f2.h" /></h3>
            <Html k="ae.f2.p1" as="p" />
            <Html k="ae.f2.p2" as="p" />
            <ul>
              {list('ae.f2.li').map((li) => <li key={li} dangerouslySetInnerHTML={{ __html: li }} />)}
            </ul>
          </div>
        </div>

        <div className="hooks sweep">
          {HOOKS.map((h, n) => <Hook h={h} n={n + 1} key={h.id} />)}
        </div>

        <div className="docs-cta">
          <span className="txt" dangerouslySetInnerHTML={{ __html: t('ae.docs.txt').replace('{rest}', String(rest)) }} />
          <a className="btn-fill" href="/ae/docs#tools" data-cur>{t('ae.docs.btn')} <span aria-hidden="true">→</span></a>
        </div>

        <Feat k="ae.f3" img="panel-library" />
        <Feat k="ae.f4" img="panel-curves" />
        <Feat k="ae.f5" img="panel-custom" />
      </div>
    </section>
  );
}
