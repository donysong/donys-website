import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { VERSION, DOWNLOAD_URL } from '@/lib/product';
import { RELEASES } from '@/lib/releases';

export const metadata: Metadata = {
  alternates: { canonical: '/update' },
  title: '업데이트 — You Name It',
  description: 'You Name It 최신 버전 다운로드 및 설치 안내.',
};

// 이 페이지는 판매 랜딩에서 링크되지 않는다. 패널 업데이트 카드의 링크로만 열린다
// (version.json 의 `url` 이 여기를 가리킨다).
//
// 🔴 왜 따로 있나: 패널은 version.json 의 `notes` 를 **읽지 않는다** — updateCheck.ts 가
// {version, url, download} 만 파싱한다. **릴리스 노트의 정본은 이 페이지다.** `notes` 필드는
// 2026-08-13 에 삭제했다(읽는 코드 0곳).
//
// ⚠️ 도달 가능성이 버전마다 다르다:
//   v2.2.1+ : `변경 내용 · 수동 설치` 링크가 카드에 **항상** 뜬다 → 언제든 여기로 온다.
//   v2.2.0  : 설치 실패가 **보고될 때만** 링크가 뜬다(구 UI 는 설치 버튼과 배타).
//   v2.1.0  : 실패를 성공으로 읽는 결함 때문에 `완료` 로 가고 **버튼이 통째로 사라진다**
//             → 이 페이지에 올 방법이 없다. **오너가 직접 링크를 보내야 한다.**


// 🔴 버전 문구를 손으로 박지 마라 — v2.5.0 을 컷한 뒤에도 이 페이지가 두 자리에서
// v2.4.0 을 계속 보여주고 있었다.
//
// 🔴 "최신 버전" 의 정본은 이제 lib/product.ts 의 VERSION 이다 (다운로드 URL 이 그 값으로
// 조립되므로 링크와 문구가 한 값에서 나온다). RELEASES 는 릴리스 *노트 이력*이라 항목마다
// 자기 version 을 갖는 게 맞고, 그래서 진실이 둘로 갈라질 수 있다. 아래 단정이 그걸 막는다 —
// 정적 export 빌드는 이 모듈을 프리렌더 중에 평가하므로, 어긋나면 배포가 아니라 빌드가 죽는다.
if (RELEASES[0].version !== VERSION) {
  throw new Error(
    `버전 불일치: lib/product.ts 의 VERSION=${VERSION} 인데 RELEASES[0].version=${RELEASES[0].version} 이다. ` +
      '릴리스를 컷했으면 둘을 같이 올려라 — VERSION 이 정본이고 RELEASES[0] 은 그 버전의 노트다.',
  );
}

// 날짜만 최신 릴리스 노트에서 읽는다 (버전은 VERSION 이 정본).
const LATEST = RELEASES[0];
const LATEST_DATE = (() => {
  const [y, m, d] = LATEST.date.split('-');
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
})();

export default function UpdatePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">업데이트</h1>
        <p className="mb-10 text-sm text-[var(--text-muted)]">
          최신 버전 v{VERSION} · {LATEST_DATE}
        </p>

        <div className="card mb-12 p-6">
          <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">
            v2.1.0 을 쓰고 계신다면 이번만 손으로 설치해 주세요
          </h2>
          <div className="space-y-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            <p>
              v2.1.0 의 인앱 설치 기능에 결함이 있습니다. 설치가 실패해도 &quot;업데이트 완료&quot;
              라고 표시되고, 알림이 계속 다시 뜹니다. 이 결함은 v2.2.0 에서 고쳤지만, 고친 코드는
              새 버전 안에 들어 있습니다. 즉 지금 패널에서 누르는 <strong>설치</strong> 버튼은
              여전히 예전 방식으로 돌기 때문에 이번 한 번은 아래 순서로 설치해 주셔야 합니다.
            </p>
            <ol className="ml-5 list-decimal space-y-1">
              <li>아래 버튼으로 <code>donys-{VERSION}.zxp</code> 를 내려받습니다.</li>
              <li>
                <a
                  href="https://aescripts.com/learn/zxp-installer/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  ZXP Installer
                </a>
                (무료) 로 그 파일을 설치합니다.
              </li>
              <li>After Effects 를 완전히 종료했다가 다시 켭니다.</li>
            </ol>
            <p>다음 업데이트부터는 패널 안에서 바로 설치됩니다.</p>
          </div>
          <a
            href={DOWNLOAD_URL}
            className="cta-buy mt-5"
            style={{ padding: '11px 22px', fontSize: 14 }}
          >
            donys-{VERSION}.zxp 내려받기
          </a>
        </div>

        {RELEASES.map((r) => (
          <section key={r.version} className="mb-12">
            <h2 className="mb-1 text-xl font-semibold text-[var(--text-primary)]">v{r.version}</h2>
            <p className="mb-5 text-sm text-[var(--text-muted)]">{r.date}</p>
            <ul className="space-y-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {r.items.map((it, i) => (
                <li key={i} className="border-l-2 border-[var(--line)] pl-4">
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
