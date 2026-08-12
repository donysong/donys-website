import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "업데이트 — Dony's Garage",
  description: "Dony's Garage 최신 버전 다운로드 및 설치 안내.",
};

// 이 페이지는 판매 랜딩에서 링크되지 않는다. 패널의 업데이트 카드에서 "다운로드 페이지" 를
// 눌렀을 때만 열린다 (version.json 의 `url` 이 여기를 가리킨다).
//
// 🔴 왜 따로 만들었나: 패널은 version.json 의 `notes` 를 **읽지 않는다** — updateCheck.ts 가
// {version, url, download} 만 파싱한다. 그래서 v2.1.0 사용자에게 "수동으로 설치하세요" 를
// 전할 수 있는 경로가 이 페이지뿐이다. 그들이 누르는 인앱 설치 버튼은 v2.1.0 코드라
// 우리가 지금 무엇을 고쳐도 그 사람 화면에서는 안 바뀐다.

const RELEASES = [
  {
    version: '2.2.0',
    date: '2026-08-12',
    items: [
      '커서 클릭에 조절 항목이 생겼습니다. 적용한 뒤에도 Effect Controls 에서 누르는 크기, 누름·유지·복원 시간, 튕김, 클릭 횟수와 간격을 바꿀 수 있고, 리플 링에는 지속 시간과 투명도가 따로 붙습니다. 전에는 이 값들이 스크립트 안에 박혀 있어서 클릭 횟수 하나를 바꾸려 해도 툴을 다시 돌려야 했고, 그때마다 손으로 맞춰둔 위치·크기·색이 날아갔습니다.',
      '커서 클릭과 클릭 리액트의 시작 시각이 타임라인에 마커로 보입니다. 모션이 어디서 시작하는지 눈으로 확인할 수 있고, 마커를 끌면 모션 전체가 따라옵니다.',
      '타입라이터에서 글자가 찍히는 동안 텍스트 레이어가 좌우로 흔들리던 문제를 고쳤습니다. 한글 좌정렬에서 특히 눈에 띄었고, 가운데 정렬에서는 정렬 자체가 왼쪽으로 무너졌습니다.',
      '툴박스의 키프레임 버튼 6개를 3개로 줄이고, 버튼에 숨어 있던 동작들은 우클릭 메뉴로 모았습니다. 메뉴가 각 항목 옆에 단축키를 같이 알려줍니다.',
      '이징 복사·붙여넣기에서 값의 부호가 뒤집히거나 클립이 어긋나던 문제 3건을 고쳤습니다.',
      '인앱 업데이트가 설치에 실패하고도 성공했다고 표시하던 문제를 고쳤습니다. 이 수정은 다음 업데이트부터 효과가 있습니다 (아래 안내 참고).',
    ],
  },
];

export default function UpdatePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">업데이트</h1>
        <p className="mb-10 text-sm text-[var(--text-muted)]">최신 버전 v2.2.0 · 2026년 8월 12일</p>

        <div className="mb-12 rounded-lg border border-[var(--border-strong)] bg-[var(--accent-dim)] p-6">
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
              <li>아래 버튼으로 <code>donys.zxp</code> 를 내려받습니다.</li>
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
            href="/donys.zxp"
            className="mt-5 inline-block rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black"
          >
            donys.zxp 내려받기 (v2.2.0)
          </a>
        </div>

        {RELEASES.map((r) => (
          <section key={r.version} className="mb-12">
            <h2 className="mb-1 text-xl font-semibold text-[var(--text-primary)]">v{r.version}</h2>
            <p className="mb-5 text-sm text-[var(--text-muted)]">{r.date}</p>
            <ul className="space-y-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {r.items.map((it, i) => (
                <li key={i} className="border-l-2 border-[var(--border)] pl-4">
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
