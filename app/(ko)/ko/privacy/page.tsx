import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { BUSINESS } from '@/lib/product';
import { share } from '@/lib/meta';

const DESCRIPTION = 'You Name It AE Plugin 의 개인정보 처리방침입니다.';

export const metadata: Metadata = {
  alternates: { canonical: '/ko/privacy', languages: { en: '/privacy', ko: '/ko/privacy', 'x-default': '/privacy' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: '개인정보 처리방침',
  description: DESCRIPTION,
  ...share({ path: '/ko/privacy', title: '개인정보 처리방침 — You Name It', description: DESCRIPTION, card: 'brand', lang: 'ko' }),
};

/* 🔴 2026-09-30 오너 *"법조인 롤로 직접 작성"* — 정본 검토서 = 플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다) §2 C·D.
   조항 순서 = 「개인정보 보호법」 §30① 각 호 + 시행령 §31①(항목 · 국외 이전 근거와 §28의8② 사항 · 안전성 확보조치)
   + 개인정보보호위원회 작성지침(2025.4.)의 해당 시 필수 항목. 영문판(`app/(en)/privacy/page.tsx`)과 **사실이 같아야 한다**.
   🔴 **법 문서는 출고본과 대조해서 고친다** — 제2조 ③ 은 **플러그인 출고 태그의 네트워크 호출 전수**다.
   대조 명령과 경위는 영문판 주석에 있다. 호스트가 늘면 제2조 ③ · 제6조 · 제7조를 같이 고치고 시행일을 올려라.
   수탁자·이전받는 자의 주소·연락처 = 각 사 개인정보 처리방침에서 2026-09-30 확인(polar.sh · cloudflare.com ·
   policies.google.com · resend.com · vercel.com). 문의 메일 경로(Cloudflare 수신 → Gmail · Resend 발신) = 플러그인
   WORK_LOG 2026-09-28 (15). 🔴 수신함을 옮기면(예: Google Workspace) 제6조·제7조의 Google 줄을 같이 고쳐라.
   의도된 영문판과의 차이: 아동 기준 만 14세(§22의2 · 영문은 미국 관례 13세) · 제3조 ② 법정 보존 기간(국내법). */

const LINK = 'text-[var(--text-primary)] underline underline-offset-4 font-semibold';
const H2 = 'mb-3 text-lg font-semibold text-[var(--text-primary)]';
const H3 = 'mb-2 mt-5 text-[15px] font-semibold text-[var(--text-primary)]';
const OL = 'mt-2 list-decimal space-y-1.5 pl-6';
const UL = 'mt-2 list-disc space-y-1.5 pl-6';
const TH = 'py-2 pr-4 align-top font-semibold text-[var(--text-primary)]';

function Out({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
    </a>
  );
}

function Mail() {
  return (
    <a href={`mailto:${BUSINESS.email}`} className={LINK}>
      {BUSINESS.email}
    </a>
  );
}

/* 여러 열 표 — 머리줄 + 행. 390 폭에선 가로로 스크롤한다(`overflow-x-auto`). */
function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-black/40">
            {head.map((h) => (
              <th key={h} scope="col" className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-black/15">
              {r.map((c, j) => (
                <td key={j} className="py-2 pr-4 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* 국외 이전 표 — 이전받는 자 하나당 한 장. §28의8② 다섯 항목 + 근거 · 보유 기간. 행 머리라 390 폭에서도 두 칸으로 읽힌다. */
function TransferTable({ caption, rows }: { caption: string; rows: [string, React.ReactNode][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="mb-2 text-left font-semibold text-[var(--text-primary)]">{caption}</caption>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-t border-black/15">
              <th scope="row" className={`w-28 sm:w-40 ${TH}`}>
                {k}
              </th>
              {/* 긴 이메일·주소가 390 폭에서 칸을 밀어 글자가 잘렸다 — 아무 데서나 꺾는다(표 최소 폭 계산에도 먹는 건 `anywhere` 뿐). */}
              <td className="py-2 align-top [overflow-wrap:anywhere]">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const REFUSE_BUY = '결제 화면에서 결제하지 않으시면 이전되지 않습니다. 이 경우 제품을 구매하실 수 없습니다.';

export default function PrivacyKoPage() {
  return (
    <ReadingShell lang="ko" plate="s.ft.privacy">
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>개인정보 처리방침</InkTitle>
        <p className="text-sm">시행일: 2026년 9월 30일</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <p>
              {BUSINESS.name.ko}({BUSINESS.name.en}, 이하 &quot;저희&quot;)은 「개인정보 보호법」 제30조에 따라 정보주체의
              개인정보를 보호하고 관련 고충을 신속하고 원활하게 처리하기 위해 이 개인정보 처리방침을 정해 공개합니다. 이
              방침은 웹사이트(younameit.works)를 방문하시거나 You Name It AE Plugin(이하 &quot;제품&quot;)을 구매·이용하실 때
              적용됩니다.
            </p>
            <p className="mt-2">
              <strong>
                저희는 이름, 이메일 주소, 주문 정보처럼 판매와 지원에 꼭 필요한 정보만 받습니다. 결제 카드 정보, 프로젝트
                파일, 작업 내용은 받지 않습니다.
              </strong>
            </p>
          </section>

          <section>
            <h2 className={H2}>제1조(개인정보의 처리 목적)</h2>
            <p>
              저희는 다음 목적으로만 개인정보를 처리하며, 목적이 바뀌면 「개인정보 보호법」 제18조에 따라 필요한 조치를
              하겠습니다.
            </p>
            <ol className={OL}>
              <li>제품 판매 계약의 이행 — 라이선스 키와 설치 파일 제공, 라이선스 활성화와 주기적 확인, 업데이트 제공</li>
              <li>고객 지원 — 문의 응답, 청약철회·환불 처리, 분쟁 처리</li>
              <li>법령상 의무 이행 — 전자상거래 거래기록 보존, 세무</li>
              <li>웹사이트 운영 — 페이지 제공, 보안, 쿠키를 쓰지 않는 방문 통계</li>
              <li>광고성 정보 전송 — <a href="/ko/newsletter" className={LINK}>소식 받기</a>에 따로 동의하신 분께만</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제2조(처리하는 개인정보의 항목, 수집 방법과 처리 근거)</h2>
            <p>소식 메일(선택)만 동의를 받아 처리하고, 나머지 항목은 아래 근거에 따라 동의 없이 처리합니다.</p>

            <h3 className={H3}>① 항목과 근거</h3>
            <Table
              head={['구분', '항목', '수집 방법', '처리 근거(「개인정보 보호법」)']}
              rows={[
                [
                  '구매',
                  '이름, 이메일 주소, 주문 정보(주문 번호·일시·금액·국가)',
                  'Polar 결제 화면에서 입력하시면 Polar 가 저희에게 전달',
                  '계약 이행(제15조 제1항 제4호) · 거래기록 보존 의무(같은 항 제2호)',
                ],
                [
                  '라이선스',
                  '라이선스 키, 컴퓨터 식별자(해시값), 활성화 일시',
                  '제품이 활성화·확인할 때 자동 전송',
                  '계약 이행(제15조 제1항 제4호)',
                ],
                [
                  '고객 문의',
                  '이메일 주소, 이름(적으신 경우), 문의 내용',
                  '보내 주신 이메일',
                  '계약 이행(제15조 제1항 제4호) · 분쟁처리 기록 보존 의무(같은 항 제2호)',
                ],
                [
                  '소식 메일(선택)',
                  '이메일 주소, 동의 일시, 언어',
                  '소식 받기 페이지에서 입력하고 확인 메일의 버튼으로 확정',
                  '동의(제15조 제1항 제1호)',
                ],
                [
                  '웹사이트 접속',
                  'IP 주소, 브라우저 정보, 접속 일시, 방문한 페이지',
                  '방문하실 때 자동 생성',
                  '정당한 이익 — 사이트 제공·보안·통계(제15조 제1항 제6호)',
                ],
              ]}
            />
            <p className="mt-2">결제 카드 정보는 Polar 가 직접 받으며 저희는 <strong>받지도 보관하지도 않습니다.</strong></p>

            <h3 className={H3}>② 웹사이트 방문 통계</h3>
            <p>
              웹사이트는 <strong>Cloudflare Web Analytics</strong> 하나만 씁니다. 쿠키를 설정하지 않고 여러 사이트에 걸친
              식별자도 만들지 않으며, 이름·이메일 주소·입력하신 내용을 모으지 않습니다. 다만 IP 주소는 개인정보로 다뤄지므로
              이 통계가 완전히 익명이라고 말씀드리지는 않습니다.
            </p>

            <h3 className={H3}>③ 제품(플러그인)이 네트워크와 통신하는 경우 — 전부</h3>
            <p>
              제품은 레이어·이펙트·키프레임을 만드는 실제 작업을 전부 고객 컴퓨터에서 하며, <strong>프로젝트 파일을 업로드하지
              않습니다.</strong> 제품이 네트워크와 통신하는 경우는 다음 일곱 가지이며, 이것이 전부입니다.
            </p>
            <ol className="mt-2 list-decimal space-y-2 pl-6">
              <li>
                <strong>라이선스 활성화와 주기적 확인.</strong> 라이선스 키를 입력하시면 제품이 그 키를{' '}
                <strong>컴퓨터 식별자</strong>와 함께 Polar 로 보냅니다. 컴퓨터 식별자는 운영체제가 이미 제공하는 하드웨어
                ID 를 단방향 해시한 값이며, 그 ID 를 쓸 수 없으면 네트워크 어댑터 주소와 호스트 이름을 해시한 값으로
                대신합니다. 라이선스 하나로 쓸 수 있는 컴퓨터 수를 제한하기 위한 것이며, 저희는 원래의 하드웨어 ID 를 받지
                않고 추적이나 광고에 쓰지 않습니다. 확인은 활성화할 때와 그 뒤 7일마다 한 번 합니다.
              </li>
              <li>
                <strong>컴퓨터 안의 암호화된 라이선스 캐시.</strong> 확인 결과는 고객 컴퓨터에 AES-256 으로 암호화해
                저장하며 어디로도 전송하지 않습니다. 이 캐시를 지우면 다시 확인할 뿐입니다.
              </li>
              <li>
                <strong>업데이트 확인.</strong> 제품은 주기적으로 저희 다운로드 호스트에서 작은 버전 정보 파일을 받아
                옵니다. 다른 웹 요청과 마찬가지로 이때 IP 주소와 요청 시각이 그 호스트에 전달됩니다. 라이선스 키·계정·이용
                데이터는 담기지 않습니다. 업데이트 설치를 고르시면 새 버전도 같은 호스트에서 내려받습니다.
              </li>
              <li>
                <strong>Chat 패널.</strong> Chat 을 쓰시면 제품은 고르신 AI 툴 — Anthropic 의 Claude Code 또는 OpenAI 의
                Codex — 을 <strong>고객 본인의 Claude 또는 ChatGPT 계정으로</strong> 실행하고, 답하는 데 필요한 것을
                보냅니다. 입력하신 메시지, 작업 중인 컴프의 구조(레이어 이름, 이펙트와 속성 값 같은 메타데이터), 첨부하신
                이미지, 그리고 작업 결과를 확인하려고 컴프에서 렌더하거나 주신 레퍼런스 영상에서 가져온 정지 프레임입니다.{' '}
                <strong>저희는 이 가운데 어떤 것도 받거나 저장하지 않습니다.</strong> 고객 컴퓨터에서 Anthropic 또는 OpenAI 로
                바로 가며, 그 처리는 고객이 그 회사와 맺은 계약과 그 회사의 방침을 따릅니다.
              </li>
              <li>
                <strong>보조 프로그램의 1회 다운로드.</strong> 일부 기능은 처음 필요할 때 무료 보조 프로그램을 받아 고객
                컴퓨터에 둡니다. Depth Pass 는 실행 환경과 깊이 모델을 저희 다운로드 호스트에서, GIF Converter 는 FFmpeg 와
                Gifsicle 을 GitHub 에서, 영상 프레임을 읽는 Chat 툴은 FFmpeg 를 공개 빌드 사이트(macOS 는 evermeet.cx,
                Windows 는 GitHub 또는 gyan.dev)에서 받습니다. 이때 IP 주소와 요청 시각이 그 호스트에 전달됩니다. 라이선스
                키·계정·프로젝트 데이터는 담기지 않습니다.
              </li>
              <li>
                <strong>스톡 소재 검색 — 직접 설정하신 경우에만.</strong> Pexels, Giphy, Freesound 의 API 키를 직접
                입력하시면 실행하신 검색이 본인 계정으로 해당 서비스에 전송됩니다. 키를 비워 두시면 요청은 전혀 일어나지
                않습니다.
              </li>
              <li>
                <strong>Chat 음성 — 직접 설정하신 경우에만.</strong> ElevenLabs API 키를 직접 입력하시면 음성으로 바꿔 달라고
                하신 텍스트와 받아쓰기를 요청하신 오디오가 본인 계정으로 ElevenLabs 에 전송됩니다. 키를 비워 두시면 요청은
                전혀 일어나지 않습니다.
              </li>
            </ol>
            <p className="mt-2">
              제품은 <strong>분석 데이터, 이용 통계, 오류(크래시) 보고를 보내지 않습니다.</strong>
            </p>
          </section>

          <section>
            <h2 className={H2}>제3조(개인정보의 처리 및 보유 기간)</h2>
            <ol className={OL}>
              <li>
                저희는 처리 목적을 이루면 개인정보를 지체 없이 파기합니다. 구매·라이선스·문의 정보는 고객 지원과 업데이트
                제공에 필요한 동안 보유하며, 삭제를 요청하시면 아래 ②의 기록을 뺀 나머지를 지웁니다.
              </li>
              <li>
                다만 「전자상거래 등에서의 소비자보호에 관한 법률」 제6조와 같은 법 시행령 제6조에 따라 다음 기록은 정해진
                기간 동안 보존합니다.
                <ul className={UL}>
                  <li>표시·광고에 관한 기록: 6개월</li>
                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                </ul>
              </li>
              <li>웹사이트 접속 기록은 Cloudflare 가 서비스 제공에 필요한 기간 동안만 보관합니다(제7조).</li>
              <li>소식 메일 정보는 동의를 철회하실 때까지 보유하고, 철회하시면 처리 결과를 알려 드린 뒤 지체 없이 삭제합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제4조(개인정보의 파기 절차 및 방법)</h2>
            <ol className={OL}>
              <li>
                파기 절차: 보유 기간이 끝났거나 처리 목적을 이룬 개인정보는 지체 없이 파기합니다. 제3조 ②에 따라 보존하는
                기록은 다른 개인정보와 분리해 보관하고 보존 기간이 끝나면 파기합니다.
              </li>
              <li>파기 방법: 전자 파일은 복구하거나 재생할 수 없는 방법으로 삭제합니다. 종이 문서는 만들지 않습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제5조(개인정보의 제3자 제공)</h2>
            <p>
              저희는 개인정보를 제3자에게 제공하지 않으며, 판매·대여하거나 마케팅 목적으로 공유하지 않습니다. 다만 법률에
              특별한 규정이 있는 등 「개인정보 보호법」 제17조·제18조가 허용하는 경우는 예외입니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제6조(개인정보 처리의 위탁)</h2>
            <p>저희는 원활한 판매와 지원을 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.</p>
            <Table
              head={['수탁자', '위탁 업무']}
              rows={[
                ['Polar Software Inc.', '결제 처리와 판매 대행(merchant of record), 라이선스 키 발급·확인, 고객 포털 운영'],
                ['Cloudflare, Inc.', '웹사이트·다운로드 호스팅, 방문 통계, ' + BUSINESS.email + ' 로 오는 메일의 수신·전달'],
                ['Google LLC', `${BUSINESS.email} 로 받은 문의 메일의 보관(Gmail)`],
                ['Plus Five Five, Inc. (Resend)', '문의에 대한 답장 메일 발송, 소식 메일 구독자 명단 보관과 발송'],
                ['Vercel Inc.', '2.5.0 이하 버전 설치본의 업데이트 확인 응답(2027년 3월 15일 종료 예정)'],
              ]}
            />
            <p className="mt-2">
              Polar 는 판매 대행자(재판매자)로서 결제 화면에서 고객에게서 정보를 직접 받는 <strong>독자적인 개인정보처리자</strong>이기도
              합니다. 세금 처리·부정 결제 방지 등 Polar 자신의 의무를 위한 처리는 Polar 의 개인정보 처리방침을 따릅니다(Polar 와
              저희 사이의 데이터 처리 부속서가 적용됩니다). 위탁 업무나 수탁자가 바뀌면 이 방침으로 알려
              드립니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제7조(개인정보의 국외 이전)</h2>
            <p>
              ① 저희는 고객과의 계약을 체결·이행하기 위해 개인정보의 처리를 위탁하거나 보관하는 데 필요하므로, 「개인정보
              보호법」 <strong>제28조의8 제1항 제3호 가목</strong>에 따라 아래 사항을 이 방침에 공개하고 개인정보를 국외로
              이전합니다. 이전은 모두 암호화된 통신(HTTPS·TLS)으로 이루어집니다.
            </p>

            <TransferTable
              caption="Polar Software Inc."
              rows={[
                ['이전받는 자', <>Polar Software Inc. · 3500 South DuPont Highway, Dover, DE 19901, USA · privacy@polar.sh</>],
                ['이전 국가', '미국(및 Polar 가 이용하는 미국·캐나다 등의 시설)'],
                ['이전 항목', '이름, 이메일 주소, 주문 정보, 라이선스 키, 컴퓨터 식별자(해시값)'],
                ['이전 시기와 방법', '결제할 때, 라이선스를 활성화하거나 확인할 때 네트워크로 전송'],
                ['이용 목적', '결제 처리, 판매 대행, 라이선스 키 발급·확인, 고객 포털'],
                [
                  '보유·이용 기간',
                  <>
                    위탁 계약이 끝날 때까지. 다만 Polar 가 판매자로서 지는 법적 의무에 따른 보존은{' '}
                    <Out href="https://polar.sh/legal/privacy">Polar 방침</Out>을 따름
                  </>,
                ],
                ['거부 방법과 효과', REFUSE_BUY],
              ]}
            />

            <TransferTable
              caption="Cloudflare, Inc."
              rows={[
                ['이전받는 자', <>Cloudflare, Inc. · 101 Townsend St, San Francisco, CA 94107, USA · privacyquestions@cloudflare.com</>],
                ['이전 국가', '미국(주 저장지 미국·유럽경제지역, 전 세계 데이터센터에서 처리)'],
                ['이전 항목', 'IP 주소, 브라우저 정보, 접속 일시, 방문 페이지, 문의 메일의 주소·내용(전달 과정)'],
                ['이전 시기와 방법', '웹사이트에 접속하거나 파일을 내려받을 때, 문의 메일을 보내실 때 네트워크로 전송'],
                ['이용 목적', '웹사이트·다운로드 제공, 보안, 방문 통계, 메일 수신·전달'],
                ['보유·이용 기간', <>위탁 계약이 끝날 때까지 · 세부 기간은 <Out href="https://www.cloudflare.com/privacypolicy/">Cloudflare 방침</Out></>],
                ['거부 방법과 효과', '웹사이트에 접속하지 않으시면 이전되지 않습니다. 이 경우 웹사이트와 이메일 지원을 이용하실 수 없습니다.'],
              ]}
            />

            <TransferTable
              caption="Google LLC"
              rows={[
                ['이전받는 자', <>Google LLC · 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA · <Out href="https://policies.google.com/privacy">policies.google.com/privacy</Out></>],
                ['이전 국가', '미국(Google 데이터센터 소재국)'],
                ['이전 항목', '문의 메일의 발신 주소, 이름(적으신 경우), 내용과 첨부'],
                ['이전 시기와 방법', `${BUSINESS.email} 로 메일을 보내실 때 네트워크로 전송`],
                ['이용 목적', '문의 메일 보관과 응답'],
                ['보유·이용 기간', '제3조의 기간(분쟁처리 기록 3년)이 끝날 때까지'],
                ['거부 방법과 효과', '이메일로 문의하지 않으시면 이전되지 않습니다. 이 경우 이메일 지원을 받으실 수 없습니다.'],
              ]}
            />

            <TransferTable
              caption="Plus Five Five, Inc. (Resend)"
              rows={[
                ['이전받는 자', <>Plus Five Five, Inc. (Resend) · support@resend.com</>],
                ['이전 국가', '미국(발송 처리 지역: 일본 도쿄)'],
                ['이전 항목', '문의: 받는 분의 이메일 주소, 이름(적으신 경우), 답장 내용 · 소식 메일: 이메일 주소, 동의 일시, 언어'],
                ['이전 시기와 방법', '저희가 문의에 답장할 때, 소식 메일 구독을 확인하실 때 네트워크로 전송'],
                ['이용 목적', '답장 메일 발송 · 소식 메일 구독자 명단 보관과 발송'],
                ['이전 근거', '문의: 제28조의8 제1항 제3호 가목 · 소식 메일: 같은 항 제1호(구독하실 때 따로 받는 국외 이전 동의)'],
                ['보유·이용 기간', <>문의: 위탁 계약이 끝날 때까지 · 소식 메일: 동의를 철회하실 때까지 · 세부는 <Out href="https://resend.com/legal/privacy-policy">Resend 방침</Out></>],
                ['거부 방법과 효과', '이메일로 문의하지 않으시거나 국외 이전에 동의하지 않으시면 이전되지 않습니다. 이 경우 이메일 답장이나 소식 메일을 받으실 수 없습니다.'],
              ]}
            />

            <TransferTable
              caption="Vercel Inc."
              rows={[
                ['이전받는 자', <>Vercel Inc. · 440 N Barranca Avenue #4133, Covina, CA 91723, USA · privacy@vercel.com</>],
                ['이전 국가', '미국'],
                ['이전 항목', 'IP 주소, 요청 일시'],
                ['이전 시기와 방법', '2.5.0 이하 버전 설치본이 업데이트를 확인할 때 네트워크로 전송'],
                ['이용 목적', '구 버전 설치본의 업데이트 확인 응답'],
                ['보유·이용 기간', '2027년 3월 15일 서비스 종료 시까지'],
                ['거부 방법과 효과', '제품을 2.6.0 이상으로 업데이트하시면 이전되지 않습니다. 불이익은 없습니다.'],
              ]}
            />

            <p className="mt-4">
              ② 웹사이트는 글꼴을 포함한 모든 파일을 저희 도메인에서 제공하며, 방문하시는 브라우저가 다른 회사의 서버에 직접
              요청하게 하지 않습니다.
            </p>
            <p className="mt-2">
              ③ 제2조 ③의 4·5·6·7번(Anthropic, OpenAI, GitHub·evermeet.cx·gyan.dev, Pexels·Giphy·Freesound, ElevenLabs)은
              고객의 컴퓨터가 <strong>고객 본인의 계정이나 공개 주소로 직접</strong> 연결하는 것이며 저희를 거치지 않습니다.
              저희가 이전하는 개인정보가 아니므로 각 서비스와 고객 사이의 약관·방침을 따릅니다.{' '}
              <Out href="https://www.anthropic.com/legal/privacy">Anthropic</Out> ·{' '}
              <Out href="https://openai.com/policies/privacy-policy/">OpenAI</Out> ·{' '}
              <Out href="https://elevenlabs.io/privacy-policy">ElevenLabs</Out>
            </p>
          </section>

          <section>
            <h2 className={H2}>제8조(광고성 정보의 전송)</h2>
            <ol className={OL}>
              <li>
                업데이트·보안·라이선스·환불처럼 구매하신 제품의 이용과 거래에 필요한 안내는 광고가 아니며, 구매하신 이메일로
                보내 드릴 수 있습니다.
              </li>
              <li>
                새 도구나 할인 같은 <strong>광고성 정보는 <a href="/ko/newsletter" className={LINK}>소식 받기</a>에서 미리
                명시적으로 동의하신 분께만</strong> 보냅니다(「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제50조). 동의는 확인
                메일의 버튼을 누르셔야 끝납니다.
              </li>
              <li>
                동의하시거나 철회하시면 그 처리 결과(전송자, 동의·철회 사실과 날짜, 처리 결과)를 바로 메일로 알려 드리고, 동의하신
                날부터 2년마다 수신 동의 여부를 확인해 드립니다.
              </li>
              <li>
                광고 메일은 제목에 &quot;(광고)&quot;를 표시하고, 전송자 정보와 무료 수신 거부 링크를 넣습니다. 메일 하단 링크,
                동의 처리 결과 메일의 링크, 또는 <Mail /> 로 언제든 철회하실 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제9조(정보주체와 법정대리인의 권리·의무 및 행사 방법)</h2>
            <ol className={OL}>
              <li>
                정보주체는 언제든 저희에게 자신의 개인정보 <strong>열람, 정정·삭제, 처리정지</strong>를 요구하실 수
                있습니다.
              </li>
              <li>
                요구는 <Mail />
                {BUSINESS.phone ? <> 또는 전화({BUSINESS.phone})</> : null}로 하실 수 있으며, 본인 확인을 위해 구매하신 이메일
                주소에서 보내 주시기 바랍니다. 법정대리인이나 위임을 받은 분도 대신 요구하실 수 있습니다.
              </li>
              <li>
                저희는 열람 요구를 받은 날부터 <strong>10일 이내</strong>에 열람하실 수 있게 하고, 정정·삭제·처리정지 요구는
                지체 없이 처리한 뒤 결과를 알려 드립니다.
              </li>
              <li>
                다른 법령이 보존하도록 정한 기록(제3조 ②)은 그 기간 동안 삭제를 요구하실 수 없으며, 처리를 멈추면 계약을
                이행할 수 없는 경우에는 처리정지 요구를 거절할 수 있습니다. 이 경우 그 사유를 알려 드립니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제10조(개인정보 자동 수집 장치의 설치·운영 및 거부)</h2>
            <p>
              저희 웹사이트는 <strong>쿠키를 설치하지 않으며</strong>, 맞춤형 광고를 위한 행태정보를 수집하지 않습니다.
              방문 통계(제2조 ②)는 쿠키 없이 동작합니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제11조(개인정보의 안전성 확보 조치)</h2>
            <ul className={UL}>
              <li>관리적 조치: 개인정보와 수탁자 관리 화면에 접근할 수 있는 사람을 대표자 1인으로 제한합니다.</li>
              <li>
                기술적 조치: 결제 카드 정보를 받거나 보관하지 않습니다. 웹사이트와 제품의 통신은 모두 암호화(HTTPS)합니다.
                제품의 라이선스 확인 결과는 고객 컴퓨터에 AES-256 으로 암호화해 저장합니다.
              </li>
              <li>물리적 조치: 개인정보를 종이로 출력하거나 보관하지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className={H2}>제12조(만 14세 미만 아동의 개인정보)</h2>
            <p>
              제품은 만 14세 미만 아동을 대상으로 하지 않으며, 저희는 만 14세 미만 아동의 개인정보를 알면서 수집하지
              않습니다. 그런 정보를 받았다는 사실을 알게 되면 지체 없이 파기합니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제13조(자동화된 결정)</h2>
            <p>저희는 개인정보를 완전히 자동화된 시스템으로 처리해 정보주체의 권리나 의무에 영향을 주는 결정을 하지 않습니다.</p>
          </section>

          <section>
            <h2 className={H2}>제14조(개인정보 보호책임자와 고충 처리)</h2>
            <p>개인정보 처리에 관한 문의·불만·피해 구제는 아래 책임자에게 연락해 주세요. 지체 없이 답변하고 처리합니다.</p>
            <ul className={UL}>
              <li>
                개인정보 보호책임자: {BUSINESS.ceo.ko} (대표)
              </li>
              <li>
                이메일: <Mail />
              </li>
              {BUSINESS.phone ? <li>전화: {BUSINESS.phone}</li> : null}
            </ul>
          </section>

          <section>
            <h2 className={H2}>제15조(권익침해 구제 방법)</h2>
            <p>개인정보 침해에 대한 신고나 상담이 필요하시면 아래 기관에 문의하실 수 있습니다.</p>
            <ul className={UL}>
              <li>
                개인정보분쟁조정위원회: 국번 없이 1833-6972 (<Out href="https://www.kopico.go.kr">www.kopico.go.kr</Out>)
              </li>
              <li>
                개인정보침해신고센터: 국번 없이 118 (<Out href="https://privacy.kisa.or.kr">privacy.kisa.or.kr</Out>)
              </li>
              <li>
                대검찰청: 국번 없이 1301 (<Out href="https://www.spo.go.kr">www.spo.go.kr</Out>)
              </li>
              <li>
                경찰청: 국번 없이 182 (<Out href="https://ecrm.police.go.kr">ecrm.police.go.kr</Out>)
              </li>
            </ul>
          </section>

          <section>
            <h2 className={H2}>제16조(개인정보 처리방침의 변경)</h2>
            <p>
              이 방침은 2026년 9월 30일부터 적용됩니다. 내용이 바뀌면 시행 7일 전부터 이 페이지에 알리고, 정보주체에게
              불리하게 바뀌면 30일 전부터 알리며 이메일로도 알려 드립니다. 이 방침과 저희와 맺은 계약의 내용이 다르면
              정보주체에게 유리한 것을 적용합니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>사업자 정보</h2>
            <ul className={UL}>
              <li>
                상호: {BUSINESS.name.ko} ({BUSINESS.name.en}) · 대표: {BUSINESS.ceo.ko}
              </li>
              <li>주소: {BUSINESS.address.ko}</li>
              <li>사업자등록번호: {BUSINESS.regNo}</li>
            </ul>
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
