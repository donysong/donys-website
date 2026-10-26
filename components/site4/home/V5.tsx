'use client';
/* 루트 `/` v5 — 브랜드 소개 면 (2026-10-26 오너 *"홈은 브랜드 소개 · 철학은 (a) 타일 하나 + 끝 한 줄 · 문장은 짧게"*).
   뼈대 = mindmarket 홈(플러그인 repo WEBSITE_RENEWAL_PLAN §17.11 · CONTENT 대조): 섹션마다 **주장형 제목 + 한 문단 + 행동 하나**.
   소개(P2) → 타일 넷(P3) → 무료 콜아웃 → 최근에 만든 것(릴리스 카드) + 툴 이름 레일 → 끝 한 줄 → 푸터.
   🔴 사실은 전부 기존 카피·FAQ·`lib/product.ts`·`lib/releases.ts` 에서 왔다 — 숫자·주장을 여기서 새로 짓지 마라.
   등장 = 하우스 모션 — Posterize Time 6fps 4프레임 + 필름 위브 떨림(site4.css `v5-weave-in`). 구 AE 팝(탄성)은 오너 2026-10-26 *"방정맞다"* 로 버렸다. 줄인 모션이면 정지 상태. */
import { useEffect, useRef } from 'react';
import { Plate3 } from '@/components/site3p/Plate3';
import { useT } from '@/components/site3p/lang';
import { useHref } from '@/components/site4/Shell';
import { RELEASES } from '@/lib/releases';
import { DOCS_TOOLS } from '@/lib/docsData';
import { rePress, StoneCard } from './Hero';
import { IG_REELS, SOCIAL } from '@/lib/product';

/* 화면에 들어오면 `.in` — 한 번만. CSS 가 팝·지연을 쥔다(site4.css `.v5-*`). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current; if (!root) return;
    const els = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.25 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* 01 — 소개 한 문단 + 행동 둘 + 큰 그림(돌 카드), 그 밑에 만든 것 행 */
export function Intro() {
  const { t } = useT();
  const href = useHref();
  return (
    <section id="lineup" data-plate="02" data-name="home.nav.lineup">
      <div className="sec v5-intro-sec">
        <div className="lu-intro v5-intro">
          <div className="v5-intro-copy">
            {/* 두 문장 = 두 줄(오너 2026-10-26 문구 그대로 · 줄은 마침표에서만) */}
            <p className="v5-lead">{t('home.v5.intro').split('|').map((l, i) => <span className="v5-lead-l" key={i}>{l}</span>)}</p>
            <div className="ctas">
              <a className="btn-fill" href={href('/download')} data-cur>{t('home.v5.cta.free')} <span aria-hidden="true">↓</span></a>
              <a className="btn-line" href={href('/ae')} data-cur>{t('home.v5.cta.plugin')} <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <StoneCard caption={false} />
        </div>
      </div>
      <ul className="lineup sweep">
        <li className="row open">
          <a className="hit" href={href('/ae')} aria-label={t('home.row1.aria')} data-cur />
          {/* 브랜드 필름 스틸(33s · 로고 콜라주) — 구 Bento Grid 호버 시트는 오너 2026-10-26 *"개 구림"* 으로 뺐다.
              원본 = 영상 R2 의 `younameit-brand-film-2026-10.mp4` 프레임(1920×1080) → 1280×720 webp. 호버 = 레퍼런스(이미지 1.05). */}
          <figure className="row-fig v5-still">
            <img src="/riso/brand/film-still-row.webp" alt={t('home.v5.row.still')} width={1280} height={720} loading="lazy" decoding="async" />
          </figure>
          <div className="row-body">
            <div className="row-name">
              <span className="disp" lang="en">
                <span className="brandpart">{t('home.row1.brand')}</span>
                <Plate3 k="home.row1.name" />
              </span>
              <span className="stamp red badge" onClick={rePress}><span className="dot" />{t('home.row1.badge')}</span>
            </div>
            <p className="one">{t('home.v5.row.one')}</p>
            <div className="lmeta">
              <span className="chips"><span className="chip">{t('home.row1.chip')}</span></span>
              <span className="dash" />
              <span className="price v5-price">{t('home.v5.row.price')}</span>
              <span className="go">{t('home.row1.go')} <span className="arrow">→</span></span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}

/* 02 — 일하는 방식, 타일 넷. 1번이 철학 타일(오너 판정 a). 돌 = Rive 캐릭터가 올 자리(§17.10). */
const TILES = [
  { k: 't1', stone: 'stone-7' },
  { k: 't2', stone: 'stone-4' },
  { k: 't3', stone: 'stone-2' },
  { k: 't4', stone: 'stone-5' },
];
export function Tiles() {
  const { t } = useT();
  const ref = useReveal<HTMLElement>();
  return (
    <section id="how" className="onnote" data-plate="03" data-name="home.nav.how" ref={ref}>
      <div className="sec">
        <ol className="v5-tiles">
          {TILES.map((x) => (
            <li className="v5-tile" key={x.k} data-reveal>
              <span className="v5-tile-bg" aria-hidden="true" />
              <img className="v5-tile-art" src={`/riso/stones/${x.stone}.webp`} alt="" width={160} height={160} />
              <h3 className="v5-tile-h">{t(`home.v5.${x.k}.h`)}</h3>
              <p className="v5-tile-p">{t(`home.v5.${x.k}.p`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 콜아웃 — 무료로 시작. 레퍼런스 *"Ready when you are!"* 자리. 증거 셋 = 기존 약속(`ae.price.vow` · FAQ q11). */
export function FreeCallout() {
  const { t, list } = useT();
  const href = useHref();
  const ref = useReveal<HTMLElement>();
  return (
    <section className="v5-free" ref={ref}>
      <div className="sec">
        <h2 className="disp v5-free-h" data-reveal><Plate3 k="home.v5.free.h" boil={false} /></h2>
        <p className="v5-free-p">{t('home.v5.free.p')}</p>
        <a className="btn-fill v5-free-cta" href={href('/download')} data-cur>{t('home.v5.cta.free')} <span aria-hidden="true">↓</span></a>
        <ul className="v5-proof">{list('home.v5.free.proof').map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
    </section>
  );
}

/* 릴리스 노트 첫 항목의 머리 — 첫 ` — ` 또는 첫 마침표까지(Who.tsx 와 같은 규칙). 문장은 `lib/releases.ts` 가 정본.
   카드 문장은 `card`(해요체 요약)가 있으면 그걸 쓴다(오너 2026-10-26 *"카드만 따로 짧게"*). */
function head(s: string) {
  const cut = s.split(/\s—\s|\.\s/)[0].trim();
  return cut.endsWith('.') ? cut : cut + '.';
}

/* 릴리스 카드 4장 — 홈 03 · /ae 05 가 같이 쓴다(레퍼런스 아티클 벤토). 카드마다 6fps 위브 등장(한 프레임씩 늦게). */
export function ReleaseCards({ n = 4 }: { n?: number }) {
  const { lang } = useT();
  const href = useHref();
  return (
    <ol className="v5-rel">
      {RELEASES.slice(0, n).map((r, i) => (
        <li key={r.version} className={`v5-rel-card c${i}`} data-reveal style={{ ['--d' as string]: `${(i * 0.167).toFixed(3)}s` }}>
          <a href={href('/update')} data-cur>
            <span className="v5-rel-top"><span className="v5-rel-v">v{r.version}</span><span className="v5-rel-d">{r.date}</span></span>
            <span className="v5-rel-t">{r.card?.[lang] ?? head(r.items[lang][0])}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/* 03 — 최근에 만든 것: 릴리스 카드 4장(레퍼런스 아티클 벤토 자리) + 툴 이름 레일(로고 레일 자리) */
export function Recent() {
  const { t, lang } = useT();
  const href = useHref();
  const ref = useReveal<HTMLElement>();
  const names = DOCS_TOOLS.map((x) => x.name);
  const half = Math.ceil(names.length / 2);
  const rails = [names.slice(0, half), names.slice(half)];
  return (
    <section id="recent" className="onnote" data-plate="04" data-name="home.nav.recent" ref={ref}>
      <div className="sec">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-3.webp" alt="" /> <span className="lab">04</span></div>
          <h2 className="disp"><Plate3 k="home.nav.recent" boil={false} /></h2>
          <a className="tag" href={href('/update')} data-cur>{t('home.v5.rel.all')} →</a>
        </div>
        <ReleaseCards />
      </div>
      <div className="v5-rail" aria-label={t('home.v5.tools.h')}>
        <p className="v5-rail-h">{t('home.v5.tools.h')}</p>
        {rails.map((row, i) => (
          <div className={`v5-rail-row r${i}`} key={i} aria-hidden={i > 0}>
            <ul>{[...row, ...row].map((n, j) => <li key={j} aria-hidden={j >= row.length}>{n}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 끝 한 줄 — 철학의 나머지(오너 판정 a). 구 `home.brand.pull` 문장을 다듬은 것. */
export function Outro() {
  return (
    <section className="v5-out">
      <div className="sec">
        {/* 하우스 잉크 판(Plate3) 두 장 — 일반 글자로 두었다가 오너 2026-10-26 *"여기는 왜 하우스 스타일 반영 안함?"* */}
        <p className="disp v5-out-q">
          <Plate3 k="home.v5.out.a" block />
          <Plate3 k="home.v5.out.b" block />
        </p>
      </div>
    </section>
  );
}

/* 01 영상 — 인스타 릴 세 장(오너 2026-10-26 *"셋 다 넣는 건 좋음. 근데 플러그인 이야기하는 자리에 들어가면 안 되지. 따로 빼 줘"*).
   표지 문구(*"창작자를 위한 콘텐츠와 툴을 만듭니다"*)의 **콘텐츠** 쪽 증거 — 툴(01)과 따로 선다. 자리 = 표지 바로 뒤, 플러그인(02) 위(오너 2026-10-26 *"위치 플러그인 위로 올릴까"*) — 표지 문구 순서(콘텐츠 → 툴) 그대로. 판 = 모눈(표지 파랑 다음).
   표지만 우리 서버에(우리 게시물 썸네일) · 영상은 인스타가 튼다 — 영화 장면이 섞인 편을 우리 상업 서버에서 직접 틀지 않는다. */
export function Films() {
  const { t, lang } = useT();
  const ig = SOCIAL.find((n) => n.id === 'instagram')!;
  /* 위계 = 02 플러그인 소개와 같다(오너 2026-10-26 *"얘와 같은 위계로 — 번호 빼고"*): 판 제목·번호 없이 한 문단 + 행동 하나 + 오른쪽 큰 그림(릴 세 장 부채꼴). */
  return (
    <section id="films" className="onnote" data-plate="01" data-name="home.nav.films">
      <div className="sec v5-intro-sec">
        <div className="lu-intro v5-intro v5-films">
          <div className="v5-intro-copy">
            <p className="v5-lead">{t('home.v5.films.lead')}</p>
            <div className="ctas">
              <a className="btn-line" href={ig.url} target="_blank" rel="noopener noreferrer" data-cur>{t('home.v5.reels.more')} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <ul className="v5-reels">
            {IG_REELS.map((r) => (
              <li key={r.id}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" data-cur>
                  <img src={`/riso/ig/${r.id}.webp`} alt={r.alt[lang]} width={540} height={960} loading="lazy" decoding="async" />
                  <span className="v5-reel-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M8 5v14l11-7z" /></svg></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
