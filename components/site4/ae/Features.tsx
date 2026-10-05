'use client';
/* 03 기능 — 증거(판) 좌 60% / 명사 헤드라인 + 불릿 우 40%. 블록 5개 + 툴박스 후킹 6장.
   🔴 툴 전부를 나열하면 카탈로그가 되고, 몇 개를 풀면 제품이 된다 — 나머지는 Docs 로 넘긴다.
   🔴 `{rest}` 만 여기서 채운다(= 전체 툴 − 여기 푼 6장). 사전에 숫자를 박으면 그 순간 낡는다. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { COUNTS } from '@/lib/product';
import { useHref } from '@/components/site4/Shell';
import PanelClip, { type WideId } from '@/components/site4/PanelClip';

/* 카테고리 라벨·툴 이름은 패널 정본이라 국문에서도 영문이다. */
const HOOKS = [
  { id: 'distributeValues', alt: 'Distribute Values', cat: 'Layer', name: 'Distribute Values' },
  { id: 'effectorRig', alt: 'Effector', cat: 'Motion', name: 'Effector' },
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

/* 기능 블록 다섯 = 판(좌) + 글(우). 판 = 그 패널의 클립(`PanelClip wide` — 출고본 패널을 16:9 창에 넓게 도킹해
   자기 동작을 하는 루프, 로캘마다 한 벌). f2 Toolbox 는 버튼 호버 프리뷰 셋, f5 Custom 1 은 저장한 패널 전환.
   🔴 판은 **출고 태그**에서 뽑는다 — dev 빌드에서 찍었다가 못 사는 기능을 판 전례가 있다(§15.3).
   다시 찍기 = 플러그인 리포 `tools/promo/panelClips/` `record wide`. */
function Feat({ k, clip, capTop = 12 }: { k: string; clip: WideId; capTop?: number }) {
  const { t, list } = useT();
  return (
    <div className="feat sweep">
      <figure className="fig">
        <figure className="spot-fig">
          <PanelClip id={clip} label={t(`${k}.alt`)} wide />
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
  const href = useHref();
  const rest = COUNTS.scripts - HOOKS.length;
  return (
    <section id="what" data-plate="03" data-name="ae.plate.what">
      <div className="sec" style={{ paddingBottom: 40 }}>
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-4.webp" alt="" /> <span className="lab">03</span></div>
          <h2 className="disp"><Plate3 k="ae.what.h" boil={false} /></h2>
          <Html k="ae.what.tag" as="p" className="tag" />
        </div>

        <Feat k="ae.f1" clip="chat" />

        {/* 기능 2 — Toolbox. 판 = 실제 Toolbox 클립(버튼 셋에 올리면 그 툴의 프리뷰가 버튼 위에서 돈다).
            구판은 Click React 시트 한 장이었다 — 패널 UI 가 안 보여서 "버튼 위에 뜬다" 가 전해지지 않았다(오너 2026-09-28). */}
        <Feat k="ae.f2" clip="toolbox" />

        <div className="hooks sweep">
          {HOOKS.map((h, n) => <Hook h={h} n={n + 1} key={h.id} />)}
        </div>

        <div className="docs-cta">
          <span className="txt" dangerouslySetInnerHTML={{ __html: t('ae.docs.txt').replace('{rest}', String(rest)) }} />
          <a className="btn-fill" href={href('/ae/docs#tools')} data-cur>{t('ae.docs.btn')} <span aria-hidden="true">→</span></a>
        </div>

        <Feat k="ae.f3" clip="library" />
        {/* 구 도그푸드 줄(*"이 페이지의 종이결·잉크 알갱이 = Riso Print 텍스처"*)은 2026-09-28 에 뺐다(§16 2라운드 오너 — 삭제). */}
        <Feat k="ae.f4" clip="curves" />
        <Feat k="ae.f5" clip="custom-1" />
      </div>
    </section>
  );
}
