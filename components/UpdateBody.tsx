/* `/update` 본문 — **영문판과 국문판이 이 한 벌을 공유한다.**

   🔴 이 경로는 패널 `version.json` 의 `url` 이 가리키는 **계약**이다(라이브 R2 매니페스트가
   `younameit.works/update` 를 싣고 있다). 경로를 옮기면 기존 설치본의 업데이트 안내가 죽는다.
   그래서 `/update` 는 그대로 두고, 국문판을 `/ko/update` 로 **옆에** 붙였다.

   🔴 **맨 위는 현행 버전이다** (2026-09-26). 전엔 첫 카드가 *"v2.1.0 쓰세요? 이번만 손으로"* 였고
   페이지의 **유일한** 다운로드 버튼이 그 안에 있었다 — 패널에서 *"설치 실패 — 다운로드 페이지"* 를 보고
   온 v2.6~2.7 유저가 엉뚱한 사연부터 읽었다. v2.1.0 사연은 그 결함을 고친 **v2.2.0 노트 밑**으로 내렸다.
   수동 설치 순서 = 플러그인 `donys/docs/INSTALL_GUIDE.md`(정본)의 사본이다 — 여기서 먼저 고치지 마라.

   ⚠️ 문자열이 적고 이 파일 밖에서 안 쓰이므로 **여기 지역 사전으로 둔다** — `lib/copy` 에 올리면
   세 페이지가 쓰는 공용 사전에 이 페이지만의 문장이 섞인다. 셸(네비·푸터)만 공용 사전을 쓴다. */
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
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
const ZXP = 'https://aescripts.com/learn/zxp-installer/';

const T = {
  en: {
    brand: 'You Name It AE Plugin',
    h1: 'Release notes',
    lead: 'What changed in each version — and how to install by hand when the in-panel update does not go through.',
    date: (iso: string) => {
      const [y, m, d] = iso.split('-');
      const mm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][Number(m) - 1];
      return `${mm} ${Number(d)}, ${y}`;
    },
    otherLang: '한국어로 보기 →',
    otherHref: '/ko/update',
    current: 'Current version',
    how: 'When a new version is out, the Support panel shows a notice and installs it right there. Restart After Effects to apply it — a running extension can’t replace itself.',
    manualH: 'If the in-panel install does not go through',
    steps: [
      'Download the file with the button below.',
      'Quit After Effects.',
      <>Drop the file on the free <a href={ZXP} target="_blank" rel="noreferrer">ZXP Installer</a>. It may warn about a self-signed certificate: we sign the file ourselves. Carry on and it installs.</>,
      'Open After Effects again.',
    ],
    dl: `Download v${VERSION} .zxp`,
    more: <>Manual install without the installer, uninstalling, and what to do when a panel opens blank: <a href="/ae/docs#install">Docs — Install</a>.</>,
    v210: 'Still on v2.1.0? Its in-panel installer can report success when the install failed — install this one update by hand with the steps at the top. From v2.2.0 on, the panel installs updates itself.',
  },
  ko: {
    brand: 'You Name It AE Plugin',
    h1: '업데이트 노트',
    lead: '버전마다 무엇이 바뀌었는지, 그리고 패널 안 업데이트가 안 될 때 손으로 설치하는 방법입니다.',
    date: (iso: string) => {
      const [y, m, d] = iso.split('-');
      return `${y}년 ${Number(m)}월 ${Number(d)}일`;
    },
    otherLang: 'Read in English →',
    otherHref: '/update',
    current: '현재 버전',
    how: '새 버전이 나오면 Support 패널에 알림이 뜨고, 그 자리에서 받아 설치합니다. 설치 뒤 After Effects 를 다시 켜면 적용됩니다 — 실행 중인 확장은 자기 자신을 바꿀 수 없습니다.',
    manualH: '패널 안 설치가 안 될 때',
    steps: [
      '아래 버튼으로 파일을 내려받습니다.',
      'After Effects 를 닫습니다.',
      <>무료 <a href={ZXP} target="_blank" rel="noreferrer">ZXP Installer</a> 에 파일을 끌어다 놓습니다. "자체 서명 인증서" 경고가 뜰 수 있습니다 — 우리가 직접 서명한 파일이라 그렇고, 계속 진행하면 설치됩니다.</>,
      'After Effects 를 다시 엽니다.',
    ],
    dl: `v${VERSION} .zxp 내려받기`,
    more: <>설치 앱 없이 설치하는 법, 지우는 법, 패널이 빈 창으로 열릴 때: <a href="/ko/ae/docs#install">Docs — 설치</a>.</>,
    v210: '아직 v2.1.0 이면 인앱 설치가 실패해도 성공으로 표시될 수 있습니다 — 이번 한 번은 맨 위 순서로 손으로 설치합니다. v2.2.0 부터는 패널이 직접 설치합니다.',
  },
} as const;

/* 문장 속 링크(`p`·`li` 안)는 링크로 보여야 한다 — `.p3 a` 가 밑줄을 지우므로 important 로 되살린다.
   버튼(`.btn-line`)은 문장 밖(`div`)에 둬서 이 규칙을 안 탄다. */
const LINKS = '[&_p_a]:underline! [&_li_a]:underline! [&_a]:underline-offset-4 [&_a]:font-semibold';

export default function UpdateBody({ lang }: { lang: 'en' | 'ko' }) {
  const t = T[lang];
  return (
    <ReadingShell lang={lang} plate="s.ft.notes">
      <header className={`max-w-3xl ${LINKS}`}>
        <p className="lab">{t.brand}</p>
        <InkTitle>{t.h1}</InkTitle>
        <p className="text-[17px] leading-relaxed">{t.lead}</p>
        {/* 🔴 패널은 로캘과 무관하게 `/update` 로 보낸다(매니페스트 한 벌). 한국어 유저가
            영문 면에 떨어지므로 전환 링크가 **첫 화면에** 있어야 한다. */}
        <p className="mt-3 text-sm">
          <a href={t.otherHref} hrefLang={lang === 'en' ? 'ko' : 'en'}>{t.otherLang}</a>
        </p>
      </header>

      <div id="install" className={`sheet mt-10 max-w-3xl [--m:1] ${LINKS}`}>
        <p className="lab">{t.current}</p>
        <h2 className="mt-2 mb-4 text-2xl font-extrabold tracking-tight">
          v{VERSION} <span className="text-base font-semibold opacity-70">· {t.date(LATEST.date)}</span>
        </h2>
        <p className="text-[15px] leading-relaxed">{t.how}</p>
        <h3 className="mt-6 mb-2 text-[15px] font-bold">{t.manualH}</h3>
        <ol className="ml-5 list-decimal space-y-1.5 text-[15px] leading-relaxed">
          {t.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        {/* 🔴 채움 버튼은 **구매**에만 쓴다(REBRAND §9.9 ③) — 다운로드는 외곽선이다.
            라벨에 파일명(`donys-…zxp`)을 쓰지 마라: 구 브랜드가 버튼 글자로 보인다. URL 은 그대로다. */}
        <div className="mt-6">
          <a className="btn-line" href={DOWNLOAD_URL} data-cur>{t.dl}</a>
        </div>
        <p className="mt-5 text-sm leading-relaxed">{t.more}</p>
      </div>

      <div className="mt-16">
        {RELEASES.map((r) => (
          /* 버전별 앵커(`#v2.7.1`) — Docs 의 최신 노트와 패널이 버전으로 바로 올 수 있게. */
          <article key={r.version} id={`v${r.version}`} className="rel">
            <h2 className="m-0 flex flex-wrap items-baseline gap-[18px]">
              <span className="v">v{r.version}</span>
              <span className="d">{t.date(r.date)}</span>
            </h2>
            {r.version === '2.2.0' ? <p className="mt-3 max-w-3xl text-sm font-semibold">{t.v210}</p> : null}
            <ul>{r.items[lang].map((it, i) => <li key={i}>{it}</li>)}</ul>
          </article>
        ))}
      </div>
    </ReadingShell>
  );
}
