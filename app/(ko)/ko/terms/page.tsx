import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { BUSINESS, FTC_BIZ_URL, PORTAL_URL, PRICE } from '@/lib/product';
import { share } from '@/lib/meta';

const DESCRIPTION = 'You Name It AE Plugin 의 이용약관입니다.';

export const metadata: Metadata = {
  alternates: { canonical: '/ko/terms', languages: { en: '/terms', ko: '/ko/terms', 'x-default': '/terms' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: '이용약관',
  description: DESCRIPTION,
  ...share({ path: '/ko/terms', title: '이용약관 — You Name It', description: DESCRIPTION, card: 'brand', lang: 'ko' }),
};

/* 🔴 2026-09-30 오너 *"법조인 롤로 직접 작성"* — 조항마다 근거가 있다. 정본 검토서 = 플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다)
   (쟁점 번호 A·B·C·D). 조항을 고치기 전에 그 표의 해당 줄부터 봐라. 영문판(`app/(en)/terms/page.tsx`)은 **같은 20개 조**다 —
   한쪽을 고치면 다른 쪽도 같이 고쳐라(제20조가 "다르면 고객에게 유리한 쪽" 이라 갈라지면 불리한 쪽이 조용히 죽는다).
   근거 요약: 제4조 = 약관규제법 §12 1호 · 제5조 = 전자상거래법 §13③ · 제10조 ② = 저작권법 §101의4 ·
   제15조 = 전자상거래법 §17·§18 · 제17조 = 약관규제법 §7 · 제18조 = 약관규제법 §9 · 제19조 = 국제사법 §42·§47 ·
   약관규제법 §14 · 제20조 = 약관규제법 §5②. 중요 조항 굵게 = 약관규제법 §3①.
   단어는 `donys/docs/VOICE_AND_TERMS.md` §3 — "기기" 가 아니라 **컴퓨터**, 컴포지션이 아니라 컴프. */

const LINK = 'text-[var(--text-primary)] underline underline-offset-4 font-semibold';
const H2 = 'mb-3 text-lg font-semibold text-[var(--text-primary)]';
const OL = 'mt-2 list-decimal space-y-1.5 pl-6';

function Mail() {
  return (
    <a href={`mailto:${BUSINESS.email}`} className={LINK}>
      {BUSINESS.email}
    </a>
  );
}

export default function TermsKoPage() {
  return (
    <ReadingShell lang="ko" plate="s.ft.terms">
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>이용약관</InkTitle>
        <p className="text-sm">시행일: 2026년 9월 30일</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className={H2}>제1조(목적)</h2>
            <p>
              이 약관은 {BUSINESS.name.ko}({BUSINESS.name.en}, 이하 &quot;저희&quot;)이 만들어 파는 You Name It AE
              Plugin(이하 &quot;제품&quot;)을 고객이 구매하고 이용할 때 저희와 고객 사이의 권리·의무와 책임을 정합니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제2조(정의)</h2>
            <ol className={OL}>
              <li>&quot;제품&quot;이란 Adobe After Effects 용 확장 프로그램인 You Name It AE Plugin 과 그 업데이트, 함께 제공하는 프리셋·스크립트·문서를 말합니다.</li>
              <li>&quot;고객&quot;이란 이 약관에 따라 제품을 구매했거나 이용하는 분을 말합니다.</li>
              <li>&quot;라이선스 키&quot;란 구매하시면 발급되어 제품을 활성화하는 데 쓰는 고유 문자열을 말합니다.</li>
              <li>&quot;판매 대행자&quot;란 저희를 대신해 결제를 받고 세금을 처리하는 Polar Software Inc.(이하 &quot;Polar&quot;)를 말합니다.</li>
              <li>&quot;작업물&quot;이란 고객이 제품을 이용해 만든 레이어·키프레임·익스프레션·렌더 결과물·프로젝트 파일을 말합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제3조(약관의 게시와 효력)</h2>
            <ol className={OL}>
              <li>저희는 이 약관을 웹사이트(younameit.works) 첫 화면에서 연결되는 곳에 게시하고, 고객이 요청하시면 사본을 이메일로 보내 드립니다.</li>
              <li>이 약관은 고객이 제품을 구매하는 때부터 효력이 생깁니다.</li>
              <li>이 약관에 없는 사항은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」 등 관계 법령과 일반적인 상관례에 따릅니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제4조(약관의 변경)</h2>
            <ol className={OL}>
              <li>저희는 관계 법령을 어기지 않는 범위에서 이 약관을 바꿀 수 있습니다.</li>
              <li>
                약관을 바꿀 때는 바뀌는 내용과 시행일을 <strong>시행일 7일 전부터</strong> 웹사이트에 게시합니다. 고객에게
                불리하게 바뀌는 경우에는 <strong>시행일 30일 전부터</strong> 게시하고, 구매하실 때 알려 주신 이메일로도
                따로 알려 드립니다.
              </li>
              <li>
                제2항에 따라 알리면서 &quot;시행일까지 거부 의사를 밝히지 않으면 동의한 것으로 본다&quot;는 뜻을 명확하게
                함께 알렸는데도 고객이 시행일까지 거부하지 않으시면, 바뀐 약관에 동의하신 것으로 봅니다.
              </li>
              <li>
                바뀐 약관에 동의하지 않으시면 제품 이용을 멈추실 수 있습니다. 불리하게 바뀐 약관 때문에 이용을 멈추시는
                경우에는 저희와 협의해 이용 기간 등을 고려한 금액을 환불받으실 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제5조(미성년자의 구매)</h2>
            <p>
              <strong>
                미성년자가 법정대리인의 동의 없이 제품을 구매한 경우, 미성년자 본인 또는 법정대리인은 그 계약을 취소할 수
                있습니다.
              </strong>{' '}
              취소하시면 결제하신 금액 전액을 제15조의 방법으로 돌려드립니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제6조(구매와 결제)</h2>
            <ol className={OL}>
              <li>
                제품은 {PRICE} USD 의 <strong>일회성 구매</strong>이며 구독이 아닙니다. 결제는 판매 대행자인 Polar 의 결제
                화면에서 이루어집니다.
              </li>
              <li>
                세금이 가격에 들어 있는지, 가격에 더해지는지는 구매하시는 지역에 따라 다릅니다. Polar 가 세금을 계산해{' '}
                <strong>결제하시기 전에 결제 화면에 최종 금액을 보여 드립니다.</strong>
              </li>
              <li>구매 계약은 Polar 결제 화면에서 결제가 끝난 때 성립합니다.</li>
              <li>
                결제 절차에는 Polar 의 구매자 약관도 적용됩니다. 다만 제품의 이용 조건은 이 약관이 정하고,{' '}
                <strong>청약철회와 환불에 대해서는 저희가 Polar 와 함께 책임을 집니다.</strong> 고객은 이 약관과 관계
                법령에 따라 저희에게 직접 환불을 요청하실 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제7조(제품의 제공)</h2>
            <p>
              결제가 끝나면 라이선스 키와 설치 파일을 바로 제공합니다. 키와 설치 파일은 구매하신 이메일로 로그인하는{' '}
              <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                고객 포털
              </a>
              에서 언제든 다시 받으실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제8조(라이선스)</h2>
            <ol className={OL}>
              <li>
                저희는 구매하신 <strong>고객 1인</strong>에게, 라이선스 키 하나당 <strong>최대 2대의 컴퓨터</strong>에 제품을
                설치해 이용할 수 있는 비독점적이고 양도할 수 없는 라이선스를 드립니다.
              </li>
              <li>이 라이선스로 개인 작업과 상업 작업(클라이언트 작업 포함) 모두에 제품을 이용하실 수 있습니다.</li>
              <li>제품의 저작권과 그 밖의 지식재산권은 저희에게 있습니다. 라이선스는 이용할 권리이지 제품을 파는 것이 아닙니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제9조(라이선스 확인과 컴퓨터 변경)</h2>
            <ol className={OL}>
              <li>
                제품은 라이선스를 활성화할 때, 그리고 그 뒤 <strong>7일마다 한 번</strong> 인터넷으로 라이선스를
                확인합니다. 연결이 없어도 <strong>30일까지는</strong> 그대로 쓰실 수 있습니다. 확인에 오가는 정보는{' '}
                <a href="/ko/privacy" className={LINK}>
                  개인정보 처리방침
                </a>{' '}
                제2조에 적었습니다.
              </li>
              <li>컴퓨터를 바꾸시면 고객 포털이나 제품 안에서 기존 컴퓨터의 활성화를 해제하고 새 컴퓨터에서 활성화하시면 됩니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제10조(금지 행위)</h2>
            <p>고객은 다음 행위를 할 수 없습니다.</p>
            <ol className={OL}>
              <li>제품을 재배포·재판매·대여하거나 다른 사람에게 재라이선스하는 행위</li>
              <li>
                제품을 수정하거나 리버스 엔지니어링·디컴파일하는 행위. 다만 「저작권법」 제101조의4 등{' '}
                <strong>법률이 허용하는 범위는 제외</strong>합니다.
              </li>
              <li>라이선스 키를 다른 사람과 공유하거나, 확인 절차를 우회하는 행위</li>
              <li>제품의 프리셋이나 스크립트를 자신의 상품으로 내놓는 행위(예: 프리셋 팩, 스크립트 번들)</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제11조(작업물의 권리)</h2>
            {/* 2026-09-26 오너 판정("명시 추가") — 만든 것은 유저 것, 넘기면 안 되는 것은 제품 자체.
                제3자 소재 한 줄은 사실 교정이다: Library 의 무료 소스(Pexels · Giphy · Freesound —
                플러그인 `utils/freeSourceApi.ts`)는 각자 라이선스를 달고 오고, Freesound 는 저작자 표시를
                요구하는 CC-BY 가 섞여 있다. */}
            <ol className={OL}>
              <li>
                <strong>작업물은 모두 고객의 것입니다.</strong> 클라이언트에게 넘기는 프로젝트 파일을 포함해 개인·클라이언트·상업
                프로젝트 어디에든 쓰실 수 있으며, 저희나 제품을 출처로 표시하실 필요가 없습니다.
              </li>
              <li>
                제품을 통해 가져오신 제3자 소재(예: Pexels, Giphy, Freesound 의 이미지·영상·GIF·사운드)는 각 소재의
                라이선스를 따릅니다.
              </li>
              <li>프로젝트 파일을 받은 클라이언트가 제품의 라이선스까지 받는 것은 아닙니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제12조(업데이트)</h2>
            <ol className={OL}>
              <li>구매에는 <strong>무료 마이너 업데이트</strong>가 포함됩니다.</li>
              <li>메이저 버전 업그레이드는 할인된 가격의 추가 구매가 필요할 수 있으며, 그런 경우 미리 알려 드립니다.</li>
              <li>업데이트를 받지 않으셔도 구매하신 버전은 계속 작동합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제13조(외부 서비스)</h2>
            <ol className={OL}>
              <li>
                Chat 패널은 고객 본인의 Claude Code(Claude Pro 또는 Max 요금제) 또는 Codex(ChatGPT 요금제)와 인터넷
                연결이 있어야 작동합니다. 이 서비스들의 요금은 <strong>제품 가격에 포함되어 있지 않으며</strong>, 이용에는
                각 서비스의 약관이 적용됩니다.
              </li>
              <li>
                Pexels·Giphy·Freesound 검색과 ElevenLabs 음성 기능은 고객이 본인의 API 키를 넣으신 경우에만 작동하며,
                각 서비스의 약관이 적용됩니다.
              </li>
              <li>
                외부 서비스가 멈추거나 조건을 바꿔 해당 기능을 쓸 수 없게 된 경우, 저희는 그 기능을 대체하거나 고치기
                위해 노력합니다. 이것이 저희 책임 있는 사유로 일어난 경우가 아니면 저희는 그로 인한 손해를 책임지지
                않습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제14조(시스템 요구 사항)</h2>
            <p>
              제품은 Windows 또는 macOS 에서 실행되는 Adobe After Effects 2022 이상이 필요합니다. Depth Pass 는 인텔 기반
              Mac 에서 실행되지 않습니다. 구매하시기 전에 요구 사항을 확인해 주세요. 요구 사항에 맞지 않는 환경에서 생긴
              문제도 제15조의 환불 기간 안이면 환불받으실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제15조(청약철회와 환불)</h2>
            <ol className={OL}>
              <li>
                고객은 구매일부터 <strong>14일 이내에 이유를 묻지 않고</strong> 청약을 철회하고 전액을 돌려받으실 수
                있습니다. 이 기간은 법이 정한 7일보다 깁니다.
              </li>
              <li>
                제품이 표시·광고한 내용과 다르거나 계약한 내용과 다르게 제공된 경우에는 14일이 지나도,{' '}
                <strong>제품을 받은 날부터 3개월 이내 또는 그 사실을 안 날이나 알 수 있었던 날부터 30일 이내</strong>에
                청약을 철회하실 수 있습니다.
              </li>
              <li>
                청약철회 의사가 저희에게 도착한 날부터 <strong>3영업일 이내</strong>에 환불을 처리합니다. 수수료나 위약금은
                받지 않습니다.
              </li>
              <li>
                방법과 세부 사항은{' '}
                <a href="/ko/refund" className={LINK}>
                  환불 정책
                </a>
                에 적었습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제16조(고객 지원)</h2>
            <p>
              저희는 <Mail /> 로 이메일 지원을 제공하며, 영업일 기준 48시간 안에 답변하는 것을 목표로 합니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>제17조(책임의 제한)</h2>
            <ol className={OL}>
              <li>
                저희는 제품이 모든 컴퓨터 환경이나 타사 플러그인과 오류 없이 함께 작동한다고 보증하지는 않습니다. 제품이
                설명과 다르게 작동하면 제15조에 따라 환불받으실 수 있습니다.
              </li>
              <li>
                저희는 <strong>저희의 고의 또는 과실 없이</strong> 생긴 손해, 천재지변 등 불가항력으로 생긴 손해, 고객의
                귀책사유로 생긴 손해를 책임지지 않습니다.
              </li>
              <li>
                저희의 <strong>경과실</strong>로 생긴 손해에 대한 배상은 통상의 손해로 한정하며, 그 금액은 고객이 제품에
                지급한 금액을 한도로 합니다.
              </li>
              <li>
                <strong>
                  저희의 고의 또는 중대한 과실로 생긴 손해, 사람의 생명·신체에 대한 손해, 그리고 법률상 배제하거나 제한할 수
                  없는 책임에는 제2항과 제3항을 적용하지 않습니다.
                </strong>
              </li>
              <li>After Effects 프로젝트는 정기적으로 저장하고 백업해 주세요.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제18조(라이선스의 해지)</h2>
            <ol className={OL}>
              <li>
                고객이 제10조를 위반한 경우, 저희는 상당한 기간을 정해 바로잡아 달라고 요청하고, 그 기간 안에 바로잡지
                않으시면 라이선스를 해지할 수 있습니다. 다만 제품을 재배포·재판매하거나 라이선스 키를 공개적으로 공유하는
                등 위반이 중대하고 명백한 경우에는 바로 해지할 수 있습니다.
              </li>
              <li>해지하는 경우 저희는 그 사유를 이메일로 알립니다. 해지되면 제품 이용을 멈추고 설치된 사본을 삭제해 주셔야 합니다.</li>
              <li>고객은 언제든 제품 이용을 멈추실 수 있습니다. 환불은 제15조를 따릅니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제19조(준거법과 분쟁 해결)</h2>
            <ol className={OL}>
              <li>
                이 약관은 대한민국 법에 따릅니다. 다만 고객이 거주하는 국가의 소비자 보호 강행규정이 주는 보호는 이 조항으로
                빼앗기지 않습니다.
              </li>
              <li>
                저희와 고객 사이의 소송은 「민사소송법」에 따른 관할 법원에 제기합니다.{' '}
                <strong>대한민국에 사는 고객은 언제나 대한민국 법원에 소송을 제기하실 수 있습니다.</strong> 다른 나라에 사는
                고객은 그 나라 법이 허용하면 그 나라 법원에도 소송을 제기하실 수 있습니다.
              </li>
              <li>
                분쟁이 생기면 먼저 <Mail /> 로 알려 주세요. 원만히 해결되지 않으면 한국소비자원(국번 없이 1372) 또는
                전자거래분쟁조정위원회에 조정을 신청하실 수 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제20조(언어와 해석)</h2>
            <p>
              이 약관은 국문판과 영문판이 모두 정본입니다. 두 판의 내용이 다르거나 뜻이 분명하지 않은 경우에는{' '}
              <strong>고객에게 유리한 쪽</strong>을 따릅니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>부칙</h2>
            <p>이 약관은 2026년 9월 30일부터 시행합니다.</p>
          </section>

          <section>
            <h2 className={H2}>사업자 정보</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                상호: {BUSINESS.name.ko} ({BUSINESS.name.en})
              </li>
              <li>대표: {BUSINESS.ceo.ko}</li>
              <li>주소: {BUSINESS.address.ko}</li>
              <li>사업자등록번호: {BUSINESS.regNo}</li>
              {BUSINESS.mailOrderNo ? <li>통신판매업 신고번호: {BUSINESS.mailOrderNo}</li> : null}
              {BUSINESS.phone ? <li>전화: {BUSINESS.phone}</li> : null}
              <li>
                이메일: <Mail />
              </li>
              <li>호스팅 제공: {BUSINESS.hosting}</li>
            </ul>
            <p className="mt-2">
              <a href={FTC_BIZ_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                사업자정보 확인
              </a>
            </p>
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
