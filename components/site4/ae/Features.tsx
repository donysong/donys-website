'use client';
/* 03 기능 — 증거(판) 좌 60% / 명사 헤드라인 + 불릿 우 40%. 블록 5개 + 툴박스 후킹 6장.
   🔴 툴 전부를 나열하면 카탈로그가 되고, 몇 개를 풀면 제품이 된다 — 나머지는 Docs 로 넘긴다.
   🔴 `{rest}` 만 여기서 채운다(= 전체 툴 − 여기 푼 6장). 사전에 숫자를 박으면 그 순간 낡는다. */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import type { Lang } from '@/lib/copy';
import { COUNTS } from '@/lib/product';
import { useHref } from '@/components/site4/Shell';

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

/* 패널 실화면은 **로캘마다 한 벌씩**이다 — 영문 면에 한국어 UI 가 떠 있던 게 2026-09-19 의 결함이다.
   🔴 목업이 아니라 오너의 살아 있는 CEP 패널을 CDP 로 찍은 것이다(§14.11).

   🔴 **8장 전부 출고본 v2.6.0(`bd274fb`) 빌드에서 찍었다 — 이 규칙을 깨지 마라.**
   사이트가 파는 건 v2.6.0 인데 이 맥의 패널은 그 뒤 55커밋 dev 빌드다. 처음 판본은 dev 에서 찍었고,
   그 결과 **출고본에 존재하지 않는 Codex 백엔드**(`Codex` · `GPT-5.6-Luna` 모델 피커)가 화면에 떠
   있었다 — 못 사는 기능을 파는 그림이었다. 같은 이유로 Library 의 신규 라벨(`gradientLabels` 등)과
   Curves 의 한글화도 dev 에만 있다. **찍을 때마다 빌드가 출고 태그인지 먼저 확인해라.**
   절차 = 계획서 §15.3(워크트리 빌드 → CEP 심볼릭 링크 교체 → 한 패널씩 리로드 → 촬영 → 원복).

   ⚠️ `panel-curves.ko` 와 `.en` 은 **바이트가 같다** — v2.6.0 Curves 판엔 한국어 문자열이 0개다
   (`In`·`Both`·`Out`·`Read`·`Apply`·`Saved`). 버그가 아니라 출고본의 실제 상태다. dev 는 한글이라
   다음 릴리스에서 갈라진다. 그때 두 장을 다시 찍어라 — 지금 합치면 그 자리를 잃는다.

   크롭 법칙: 폭 = 패널 innerWidth 전체, 높이 = 폭 × (판면 속 비율). `chat` 만 하단(크롬) 크롭이고
   나머지는 상단. 🔴 `clip.scale` 도 `setDeviceMetricsOverride` 도 쓰지 마라 — 둘 다 §14.11 의 이중
   그리기를 낸다. 네이티브 배율로 찍고 sharp 로 맞춘다. */
const PANEL_SHOT = {
  'panel-chat': { ko: 'panel-chat.ko', en: 'panel-chat.en' },
  'panel-library': { ko: 'panel-library.ko', en: 'panel-library.en' },
  'panel-curves': { ko: 'panel-curves.ko', en: 'panel-curves.en' },
  'panel-custom': { ko: 'panel-custom.ko', en: 'panel-custom.en' },
} satisfies Record<string, Record<Lang, string>>;

/* 패널 스크린샷을 쓰는 기능 블록(Chat · Library · Curves · Custom). */
function Feat({ k, img, capTop = 12 }: { k: string; img: keyof typeof PANEL_SHOT; capTop?: number }) {
  const { t, list, lang } = useT();
  return (
    <div className="feat sweep">
      <figure className="fig">
        <figure className="spot-fig">
          <img src={`/riso/spots/${PANEL_SHOT[img][lang]}.webp`} alt={t(`${k}.alt`)} style={PANEL_IMG} />
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

        <Feat k="ae.f1" img="panel-chat" />

        {/* 기능 2 — Toolbox. 🔴 여기만 진짜 자산이 있다(패널이 버튼 위에 띄우는 그 시트).
            🔴 판 = Click React — 히어로 판 교대·후킹 6장·역할 카드 어디에도 없는 툴을 고른다.
            구판은 Effector 였는데 바로 아래 후킹에 Effector 가 또 있었다(같은 증거 두 번).
            정지 = 2× 스틸, 호버 = 1× 시트(`.hook-fig` 계약 — 후킹 카드와 같은 부품). */}
        <div className="feat sweep">
          <figure className="fig">
            <figure className="spot-fig hook-fig">
              <img src="/riso/spots/still/clickReact.webp" alt="Click React" />
              <i className="spot" aria-hidden="true" style={{ backgroundImage: 'url(/riso/spots/clickReact.webp)' }} />
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
          <a className="btn-fill" href={href('/ae/docs#tools')} data-cur>{t('ae.docs.btn')} <span aria-hidden="true">→</span></a>
        </div>

        <Feat k="ae.f3" img="panel-library" />

        {/* 도그푸드 증거 — 🔴 Library 판(이펙트 프리셋 불릿) **바로 뒤**다. 여기서 말하는 Riso Print 가
            바로 위 불릿의 `이펙트 프리셋` 중 하나라서 이 자리에 온다. 증언을 지어내지 않는다 —
            인용할 사용자가 아직 없다. 대신 검증 가능한 사실 하나(§3.0: 종이 = BlackPaper, 알갱이 = Risoprint). */}
        <div className="dogfood sweep">
          <div>
            <Html k="ae.dog.lab" as="span" className="lab" />
            <Html k="ae.dog.p" as="p" />
          </div>
          <figure style={{ margin: 0 }}>
            <img src="/riso/spots/fx-riso-print.webp" alt="Riso Print" />
            <figcaption className="lab lc" style={{ marginTop: 9, opacity: 0.7 }}>
              <Html k="ae.dog.cap" />
            </figcaption>
          </figure>
        </div>

        <Feat k="ae.f4" img="panel-curves" />
        <Feat k="ae.f5" img="panel-custom" />
      </div>
    </section>
  );
}
