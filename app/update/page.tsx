import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "업데이트 — Dony's Garage",
  description: "Dony's Garage 최신 버전 다운로드 및 설치 안내.",
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

const RELEASES = [
  {
    version: '2.3.0',
    date: '2026-08-20',
    items: [
      '모서리 둥글리기가 툴박스에 들어왔습니다. 셰이프뿐 아니라 텍스트·솔리드·푸티지·프리컴프 레이어에도 걸 수 있고, 네 모서리에 서로 다른 반지름을 줄 수 있습니다. 적용한 뒤에도 Effect Controls 에서 값을 계속 바꿀 수 있어서 다시 걸 필요가 없습니다. 레이어 크기를 키우거나 줄여도 모서리 반지름은 그대로 유지됩니다. 지우실 때는 툴박스 버튼을 Alt 누른 채 클릭하시면 됩니다.',
      'Proximity 툴의 이름이 Effector 로 바뀌었습니다. 버튼 이름과 설명만 바뀐 것이고 동작은 같습니다. 리그 안에서 만들어지는 널도 "이펙터 널" 로 이름을 맞췄습니다.',
      '패널이 검은 화면으로만 뜨던 문제에 대응했습니다. 어떤 환경에서는 패널이 로딩 상태 그대로 멈추고 아무 메시지도 나오지 않았습니다. 이제 그런 경우 화면에 원인을 표시합니다. 원인 자체를 없앤 것이 아니라 보이게 만든 것이라, 여전히 문제가 보이시면 그 메시지를 알려주시면 됩니다.',
      '툴박스 툴팁이 패널 가로 폭을 넘어가던 문제를 고쳤습니다. 패널을 좁게 쓰실 때 설명 글이 그리드 밖으로 삐져나왔습니다.',
      'Program Files 아래에 설치하신 경우, 업데이트할 때 예전 버전 파일이 정리되지 않고도 아무 표시가 없던 문제를 고쳤습니다. 그 위치는 파일 삭제에 관리자 권한이 필요합니다. 이제 실패하면 기록이 남아 원인을 확인할 수 있습니다.',
      '이펙트 프리셋 자동 복구가 일부 사용자에게만 적용되지 않던 문제를 고쳤습니다. 파일 줄바꿈 형식 차이 때문에 같은 내용인데도 다른 파일로 인식되던 것이 원인이었습니다.',
    ],
  },
  {
    version: '2.2.1',
    date: '2026-08-13',
    items: [
      'v2.1.0 에서 올라오신 분들의 설치 폴더에 예전 버전의 스크립트 파일 61개가 그대로 남아 있었습니다. 설치 과정이 파일을 덮어쓰기만 하고 지우지는 않기 때문입니다. 동작에는 문제가 없었지만 v2.2.0 이 목표했던 소스 보호가 그분들에게만 적용되지 않은 상태였습니다. 이제 새 버전이 처음 실행될 때 알아서 정리합니다.',
      '업데이트 알림에 "변경 내용 · 수동 설치" 링크를 항상 표시합니다. 전에는 설치가 실패했다고 표시될 때만 나타나서, 정작 설치가 조용히 실패했을 때는 이 페이지로 올 방법이 없었습니다.',
    ],
  },
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
        <p className="mb-10 text-sm text-[var(--text-muted)]">최신 버전 v2.3.0 · 2026년 8월 20일</p>

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
            donys.zxp 내려받기 (v2.3.0)
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
