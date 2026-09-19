/* `/update` 본문 — **영문판과 국문판이 이 한 벌을 공유한다.**

   🔴 이 경로는 패널 `version.json` 의 `url` 이 가리키는 **계약**이다(라이브 R2 매니페스트가
   `younameit.works/update` 를 싣고 있다). 경로를 옮기면 기존 설치본의 업데이트 안내가 죽는다.
   그래서 `/update` 는 그대로 두고, 국문판을 `/ko/update` 로 **옆에** 붙였다.

   🔴 왜 갈랐나: 릴리스 노트가 EN/KO 양쪽으로 서면서(2026-09-19) 이 페이지가 **반반**이 됐다 —
   크롬은 한국어인데 노트만 영어. 그 상태가 제일 나쁘다.

   ⚠️ 이 페이지는 구 페이지 계통이라 `lib/copy` 사전도 `LangProvider` 도 안 쓴다(globals.css 어휘).
   문자열이 적고 이 파일 밖에서 안 쓰이므로 **여기 지역 사전으로 둔다** — 사전에 올리면
   세 페이지가 쓰는 공용 사전에 이 페이지만의 문장이 섞인다. */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { VERSION, DOWNLOAD_URL } from '@/lib/product';
import { RELEASES } from '@/lib/releases';

// 🔴 버전 문구를 손으로 박지 마라 — v2.5.0 을 컷한 뒤에도 이 페이지가 두 자리에서
// v2.4.0 을 계속 보여주고 있었다.
//
// 🔴 "최신 버전" 의 정본은 lib/product.ts 의 VERSION 이다 (다운로드 URL 이 그 값으로 조립되므로
// 링크와 문구가 한 값에서 나온다). RELEASES 는 릴리스 *노트 이력*이라 항목마다 자기 version 을
// 갖는 게 맞고, 그래서 진실이 둘로 갈라질 수 있다. 아래 단정이 그걸 막는다 — 정적 export 빌드는
// 이 모듈을 프리렌더 중에 평가하므로, 어긋나면 배포가 아니라 빌드가 죽는다.
if (RELEASES[0].version !== VERSION) {
  throw new Error(
    `버전 불일치: lib/product.ts 의 VERSION=${VERSION} 인데 RELEASES[0].version=${RELEASES[0].version} 이다. ` +
      '릴리스를 컷했으면 둘을 같이 올려라 — VERSION 이 정본이고 RELEASES[0] 은 그 버전의 노트다.',
  );
}

const LATEST = RELEASES[0];

const T = {
  en: {
    h1: 'Updates',
    latest: (d: string) => `Latest v${VERSION} · ${d}`,
    date: (iso: string) => {
      const [y, m, d] = iso.split('-');
      const mm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][Number(m) - 1];
      return `${mm} ${Number(d)}, ${y}`;
    },
    otherLang: '한국어로 보기 →',
    otherHref: '/ko/update',
    card: {
      h: 'On v2.1.0? Install by hand this once',
      p: 'The in-panel installer in v2.1.0 has a defect: it reports "update complete" even when the install failed, and the notice keeps coming back. That is fixed in v2.2.0 — but the fix lives inside the new build. The Install button you press today still runs the old path, so this one upgrade has to be done by hand.',
      li1: (f: string) => <>Download <code>{f}</code> with the button below.</>,
      li2a: 'Install that file with ',
      li2b: ' (free).',
      li3: 'Quit After Effects completely, then reopen it.',
      after: 'From the next update on, the panel installs it for you.',
      dl: (f: string) => `Download ${f}`,
    },
  },
  ko: {
    h1: '업데이트',
    latest: (d: string) => `최신 버전 v${VERSION} · ${d}`,
    date: (iso: string) => {
      const [y, m, d] = iso.split('-');
      return `${y}년 ${Number(m)}월 ${Number(d)}일`;
    },
    otherLang: 'Read in English →',
    otherHref: '/update',
    card: {
      h: 'v2.1.0 을 쓰고 계신다면 이번만 손으로 설치해 주세요',
      p: 'v2.1.0 의 인앱 설치 기능에 결함이 있습니다. 설치가 실패해도 "업데이트 완료" 라고 표시되고, 알림이 계속 다시 뜹니다. 이 결함은 v2.2.0 에서 고쳤지만, 고친 코드는 새 버전 안에 들어 있습니다. 즉 지금 패널에서 누르는 설치 버튼은 여전히 예전 방식으로 돌기 때문에 이번 한 번은 아래 순서로 설치해 주셔야 합니다.',
      li1: (f: string) => <>아래 버튼으로 <code>{f}</code> 를 내려받습니다.</>,
      li2a: '',
      li2b: ' (무료) 로 그 파일을 설치합니다.',
      li3: 'After Effects 를 완전히 종료했다가 다시 켭니다.',
      after: '다음 업데이트부터는 패널 안에서 바로 설치됩니다.',
      dl: (f: string) => `${f} 내려받기`,
    },
  },
} as const;

export default function UpdateBody({ lang }: { lang: 'en' | 'ko' }) {
  const t = T[lang];
  const file = `donys-${VERSION}.zxp`;
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24">
        {/* T3 — 긴 읽는 면은 파란 대지가 아니라 흰 종이 위다 (globals.css 3단 규약) */}
        <div className="sheet">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">{t.h1}</h1>
          <p className="mb-2 text-sm text-[var(--text-muted)]">{t.latest(t.date(LATEST.date))}</p>
          {/* 🔴 패널은 로캘과 무관하게 `/update` 로 보낸다(매니페스트 한 벌). 한국어 유저가
              영문 면에 떨어지므로 전환 링크가 **첫 화면에** 있어야 한다. */}
          <p className="mb-10 text-sm">
            <a href={t.otherHref} hrefLang={lang === 'en' ? 'ko' : 'en'} className="underline underline-offset-4">
              {t.otherLang}
            </a>
          </p>

          <div className="card mb-12 p-6">
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">{t.card.h}</h2>
            <div className="space-y-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <p>{t.card.p}</p>
              <ol className="ml-5 list-decimal space-y-1">
                <li>{t.card.li1(file)}</li>
                <li>
                  {t.card.li2a}
                  <a
                    href="https://aescripts.com/learn/zxp-installer/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4"
                  >
                    ZXP Installer
                  </a>
                  {t.card.li2b}
                </li>
                <li>{t.card.li3}</li>
              </ol>
              <p>{t.card.after}</p>
            </div>
            <a href={DOWNLOAD_URL} className="cta-buy mt-5" style={{ padding: '11px 22px', fontSize: 14 }}>
              {t.card.dl(file)}
            </a>
          </div>

          {RELEASES.map((r) => (
            <section key={r.version} className="mb-12">
              <h2 className="mb-1 text-xl font-semibold text-[var(--text-primary)]">v{r.version}</h2>
              <p className="mb-5 text-sm text-[var(--text-muted)]">{r.date}</p>
              <ul className="space-y-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {r.items[lang].map((it, i) => (
                  <li key={i} className="border-l-2 border-[var(--line)] pl-4">
                    {it}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
