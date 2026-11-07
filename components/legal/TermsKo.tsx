import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import PolicyNotice from '@/components/PolicyNotice';
import { BUSINESS, FTC_BIZ_URL, PORTAL_URL, PR, PRICE } from '@/lib/product';
import { human, policyDate, prDate, prPostedDate, prText } from '@/lib/policy';

/* 약관 본문 — `/ko/terms`(현재 판)와 `/ko/terms/upcoming`(개정 예정본)이 **같은 본문**을 그린다(복사본은 갈라진다).
   `pr`(= You Name It PR Plugin 조항을 싣는가)가 거짓이면 10-23 판 그대로다 — 고지 단계의 현재 판. 참이면 개정본이다.
   PR 조항 초안 = PR 플러그인 repo `gtm/legal/terms-additions.md`(⚖️ 전문가 검토 전). `{pr ? 새 : 옛}` 의 옛 갈래는 시행 뒤 지운다(`lib/policy.ts`). */

/* 🔴 2026-09-30 오너 *"법조인 롤로 직접 작성"* — 조항마다 근거가 있다. 정본 검토서 = 플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다)
   (쟁점 번호 A·B·C·D). 조항을 고치기 전에 그 표의 해당 줄부터 봐라. 영문판(`components/legal/TermsEn.tsx`)은 **같은 20개 조**다 —
   한쪽을 고치면 다른 쪽도 같이 고쳐라(제20조가 "다르면 고객에게 유리한 쪽" 이라 갈라지면 불리한 쪽이 조용히 죽는다).
   근거 요약: 제4조 = 약관규제법 §12 1호 · 제5조 = 전자상거래법 §13③ · 제10조 ② = 저작권법 §101의4 ·
   제15조 = 전자상거래법 §17·§18 · 제17조 = 약관규제법 §7 · 제18조 = 약관규제법 §9 · 제19조 = 국제사법 §42·§47 ·
   약관규제법 §14 · 제20조 = 약관규제법 §5②. 중요 조항 굵게 = 약관규제법 §3①.
   PR 조항 근거: 제6조 ⑤ = 전자상거래법 §13②(거래조건 고지) · 제12조의2 ③ = 같은 법 §17③ 과 같은 방향 · 제14조의2 = 같은 법 §15 · §17① 단서.
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

export default function TermsKo({ view }: { view: 'current' | 'upcoming' }) {
  const pr = prText(view);
  const delivery = (
    <>
      결제가 끝나면 라이선스 키와 설치 파일을 바로 제공합니다. 키와 설치 파일은 구매하신 이메일로 로그인하는{' '}
      <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
        고객 포털
      </a>
      에서 언제든 다시 받으실 수 있습니다.
    </>
  );
  return (
    <ReadingShell lang="ko" plate="s.ft.terms">
      <header className="max-w-3xl">
        <p className="lab">{pr ? 'You Name It' : 'You Name It AE Plugin'}</p>
        <InkTitle>이용약관</InkTitle>
        <p className="text-sm">시행일: {pr ? prDate('ko') : policyDate('ko')}</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        {/* 고지 단계: 현재 판 위에는 개정 예정 띠, 예정본 위에는 현재 판으로 가는 띠. 시행 뒤에는 띠가 없다. */}
        <PolicyNotice lang="ko" doc="terms" view={view} />
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className={H2}>제1조(목적)</h2>
            {pr ? (
              <p>
                이 약관은 {BUSINESS.name.ko}({BUSINESS.name.en}, 이하 &quot;저희&quot;)이 만들어 파는 You Name It AE Plugin 과 You
                Name It PR Plugin(각각 또는 함께 이하 &quot;제품&quot;)을 고객이 구매하거나 내려받아 이용할 때 저희와 고객 사이의
                권리·의무와 책임을 정합니다.
              </p>
            ) : (
              <p>
                이 약관은 {BUSINESS.name.ko}({BUSINESS.name.en}, 이하 &quot;저희&quot;)이 만들어 파는 You Name It AE
                Plugin(이하 &quot;제품&quot;)을 고객이 구매하고 이용할 때 저희와 고객 사이의 권리·의무와 책임을 정합니다.
              </p>
            )}
          </section>

          <section>
            <h2 className={H2}>제2조(정의)</h2>
            <ol className={OL}>
              {pr
                ? <li>&quot;제품&quot;이란 Adobe After Effects 용 확장 프로그램인 You Name It AE Plugin, Adobe Premiere Pro 용 확장 프로그램과 동반 플러그인으로 이루어진 You Name It PR Plugin, 그리고 그 업데이트와 함께 제공하는 프리셋·스크립트·스타일 프리셋·문서를 말합니다.</li>
                : <li>&quot;제품&quot;이란 Adobe After Effects 용 확장 프로그램인 You Name It AE Plugin 과 그 업데이트, 함께 제공하는 프리셋·스크립트·문서를 말합니다.</li>}
              <li>&quot;고객&quot;이란 이 약관에 따라 제품을 구매했거나 이용하는 분을 말합니다.</li>
              <li>&quot;라이선스 키&quot;란 구매하시면 발급되어 제품을 활성화하는 데 쓰는 고유 문자열을 말합니다.</li>
              <li>&quot;판매 대행자&quot;란 저희를 대신해 결제를 받고 세금을 처리하는 Polar Software Inc.(이하 &quot;Polar&quot;)를 말합니다.</li>
              {pr
                ? <li>&quot;작업물&quot;이란 고객이 제품을 이용해 만든 레이어·키프레임·익스프레션·시퀀스·클립·자막·마커·렌더 결과물·프로젝트 파일을 말합니다.</li>
                : <li>&quot;작업물&quot;이란 고객이 제품을 이용해 만든 레이어·키프레임·익스프레션·렌더 결과물·프로젝트 파일을 말합니다.</li>}
              {pr ? (
                <>
                  <li>&quot;무료판&quot;이란 PR Plugin 가운데 라이선스 키 없이 이용하는 기능, 곧 PR Plugin 의 무료 버전(제3조의2)을 말합니다. 무료판은 Polar 의 무료 상품으로 내려받습니다.</li>
                  <li>&quot;Pro&quot;란 PR Plugin 가운데 라이선스 키로 여는 기능을 말합니다.</li>
                  <li>&quot;번들&quot;이란 AE Plugin 과 PR Plugin Pro 를 함께 파는 상품을 말합니다.</li>
                  <li>&quot;사전예약&quot;이란 제14조의2에 따라 Pro 기능이 열리기 전에 Pro 를 구매하는 것을 말합니다.</li>
                  <li>&quot;보조 프로그램&quot;이란 제품의 일부 기능이 처음 필요할 때 공식 배포처에서 고객 컴퓨터로 내려받는 제3자 프로그램(예: ffmpeg)을 말합니다. 보조 프로그램은 제품에 포함되지 않으며 각 프로그램의 라이선스를 따릅니다.</li>
                </>
              ) : null}
            </ol>
          </section>

          <section>
            <h2 className={H2}>제3조(약관의 게시와 효력)</h2>
            <ol className={OL}>
              <li>저희는 이 약관을 웹사이트(younameit.works) 첫 화면에서 연결되는 곳에 게시하고, 고객이 요청하시면 사본을 이메일로 보내 드립니다.</li>
              {pr
                ? <li>이 약관은 고객이 제품을 구매하거나 무료판을 내려받는 때부터 효력이 생깁니다.</li>
                : <li>이 약관은 고객이 제품을 구매하는 때부터 효력이 생깁니다.</li>}
              <li>이 약관에 없는 사항은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」 등 관계 법령과 일반적인 상관례에 따릅니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>제3조의2(무료 버전)</h2>
            <ol className={OL}>
              <li>
                제품은 구매 없이 내려받아 쓰실 수 있는 무료 버전으로도 제공합니다. 무료 버전을 내려받아 이용하시는 때부터 이
                약관이 똑같이 적용됩니다. 다만 청약철회·환불, 무료 업데이트처럼 제품을 구매하신 분께 드리는 권리는 구매하신
                분께만 적용됩니다.
              </li>
              <li>
                Pro 기능은 구매하셔서 받은 라이선스 키를 넣어야 쓰실 수 있습니다. 라이선스 키 없이 Pro 기능을 쓰려고 확인
                절차를 우회하는 행위는 제10조가 금지하는 행위입니다.
              </li>
              <li>
                무료 버전은 대가 없이 제공하는 것이라 <strong>있는 그대로 제공하며, 기능이 바뀌거나 줄어들거나 중단될 수
                있습니다.</strong> 구매하신 기능은 이 항이 아니라 제8조와 제12조를 따르고, 제17조 제4항(고의·중대한 과실 등에는
                책임 제한을 적용하지 않는다)은 무료 버전에도 똑같이 적용됩니다.
              </li>
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
              {pr ? (
                <li>
                  제품은 <strong>일회성 구매</strong>이며 구독이 아닙니다. AE Plugin 은 {PRICE} USD, PR Plugin Pro 는 {PR.price} USD,
                  번들은 {PR.bundlePrice} USD 입니다. 무료판은 결제 없이 내려받습니다. 결제는 판매 대행자인 Polar 의 결제 화면에서
                  이루어집니다.
                </li>
              ) : (
                <li>
                  제품은 {PRICE} USD 의 <strong>일회성 구매</strong>이며 구독이 아닙니다. 결제는 판매 대행자인 Polar 의 결제
                  화면에서 이루어집니다.
                </li>
              )}
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
              {pr ? (
                <>
                  <li>
                    <strong>할인은 결제 한 번에 하나만 적용됩니다.</strong> 둘 이상의 할인에 해당하면 고객에게 더 큰 할인을 적용하며,
                    번들에는 다른 할인을 적용하지 않습니다.
                  </li>
                  <li>
                    AE Plugin 구매자에게 드리는 PR Plugin Pro 할인 코드는 AE Plugin 주문 하나에 한 번 쓸 수 있고,{' '}
                    <strong>{human(PR.aeCouponEnd, 'ko')}까지 유효</strong>하며, 다른 사람에게 팔거나 넘길 수 없습니다. 번들에는 쓸 수
                    없습니다.
                  </li>
                  <li>얼리버드 등 기간 한정 가격은 그 가격과 기간을 웹사이트와 결제 화면에 표시한 대로 적용합니다.</li>
                  <li>
                    제6항의 코드는 AE Plugin 구매자께서 구매하신 이메일 주소나 주문 번호(다른 판매처 aescripts 에서 구매하신 경우 그
                    주문 메일)를 보내 요청하시면 드립니다. 광고성 정보 수신에 동의하신 구매자께는 요청 없이 이메일로 보내 드릴 수
                    있습니다.
                  </li>
                </>
              ) : null}
            </ol>
          </section>

          <section>
            <h2 className={H2}>제7조(제품의 제공)</h2>
            {pr ? (
              <ol className={OL}>
                <li>{delivery}</li>
                <li>무료판은 내려받기를 마치는 즉시 제공되며, 설치 파일은 고객 포털에서 언제든 다시 받으실 수 있습니다.</li>
                <li>사전예약의 경우 라이선스 키는 결제가 끝나면 바로 제공하고, Pro 기능은 제14조의2에 따라 그 기능을 여는 업데이트로 제공합니다.</li>
              </ol>
            ) : (
              <p>{delivery}</p>
            )}
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
              {pr ? (
                <>
                  <li>
                    무료판에 대해 저희는 고객에게 개인 작업과 상업 작업 모두에 무료로 이용할 수 있는 비독점적이고 양도할 수 없는
                    라이선스를 드립니다. 무료판은 설치하는 컴퓨터 수를 제한하지 않으며, 제10조는 무료판에도 똑같이 적용됩니다.
                  </li>
                  <li>
                    번들을 구매하시면 두 플러그인을 모두 여는 번들 전용 라이선스 키 하나를 드리며, 이 키에 제1항이 적용됩니다. 한
                    컴퓨터에서 두 플러그인을 쓰면 플러그인마다 한 번씩 활성화되므로, 번들 키의 활성화 한도는 4회(컴퓨터 2대)입니다.
                  </li>
                  <li>
                    <strong>
                      AE Plugin 의 라이선스 키로는 PR Plugin 의 Pro 를, PR Plugin 의 라이선스 키로는 AE Plugin 을 이용할 수 없습니다.
                    </strong>
                  </li>
                </>
              ) : null}
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
              {pr ? (
                <>
                  <li>
                    PR Plugin 의 Pro 는 마지막으로 확인에 성공한 뒤 30일이 지나도록 확인하지 못하면 잠기고, 다시 연결되어 확인을 마치면
                    저절로 다시 열립니다. <strong>무료판 기능은 이와 관계없이 계속 이용하실 수 있습니다.</strong>
                  </li>
                  <li>환불되었거나 제18조에 따라 해지된 라이선스 키는 제품이 다음에 확인할 때(길어야 7일 뒤) 잠깁니다.</li>
                </>
              ) : null}
            </ol>
          </section>

          {pr ? (
            <>
              <section>
                <h2 className={H2}>제9조의2(편집 방식과 되돌리기)</h2>
                <ol className={OL}>
                  <li>
                    PR Plugin 은 <strong>미디어 파일과 프로젝트 파일을 수정하거나 삭제하지 않도록</strong> 만들어져 있습니다. 시퀀스를
                    크게 바꾸는 기능은 복제한 시퀀스나 새 트랙에서 작업하고, 고객이 고른 클립에 바로 적용하는 기능은 적용 전 상태를
                    기록해 제품 안에서 되돌릴 수 있게 합니다.
                  </li>
                  <li>
                    PR Plugin 은 편집을 적용하기 전에 무엇을 바꿀지 계획을 보여 드리고, <strong>고객이 승인한 것만 적용합니다.</strong>{' '}
                    Chat 기능도 같습니다.
                  </li>
                  <li>PR Plugin 이 만든 결과는 Premiere Pro 안의 일반적인 클립·트랙·자막·키프레임이며, 고객은 이를 자유롭게 고치거나 지울 수 있습니다.</li>
                  <li>Premiere Pro 자체의 오류 등으로 결과가 계획과 다를 수 있으므로, 프로젝트를 저장하고 백업해 두시기 바랍니다(제17조 제5항).</li>
                </ol>
              </section>

              <section>
                <h2 className={H2}>제9조의3(키 자동화)</h2>
                <ol className={OL}>
                  <li>
                    키 자동화는 Premiere Pro 에 프로그램으로 실행할 방법이 없는 동작을 위해 PR Plugin 이 Premiere Pro 의 단축키를 대신
                    누르는 기능입니다. <strong>기본으로 꺼져 있으며, 고객이 설정에서 직접 켰을 때만 작동합니다.</strong>
                  </li>
                  <li>
                    PR Plugin 은 고객의 단축키 설정 파일을 읽기만 하고 바꾸지 않습니다. 실행 전에 Premiere Pro 가 맨 앞에 있는지
                    확인하고, 실행 뒤에 결과를 확인하며, 확인에 실패하면 멈추고 알려 드립니다.
                  </li>
                  <li>macOS 에서는 손쉬운 사용 권한이 필요하며, 이 권한은 고객이 운영체제 설정에서 직접 주고 거둘 수 있습니다.</li>
                </ol>
              </section>
            </>
          ) : null}

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
              {pr ? <li>사전예약 고객에게 Pro 기능을 여는 업데이트는 무료입니다.</li> : null}
            </ol>
          </section>

          {pr ? (
            <section>
              <h2 className={H2}>제12조의2(기능의 원격 중지)</h2>
              <ol className={OL}>
                <li>
                  Premiere Pro 의 업데이트나 제품의 결함 때문에 PR Plugin 의 어떤 기능이 고객의 프로젝트를 손상시킬 위험이 확인되면,
                  저희는 업데이트 정보 파일을 통해 <strong>그 기능만</strong> 원격으로 끌 수 있습니다. 원격 중지는 기능을 끄는
                  데에만 쓰며, 제품에 들어 있지 않은 기능을 켜는 데에는 쓰지 않습니다.
                </li>
                <li>기능을 끄면 제품 안에 그 사실과 이유를 표시하고, 문제를 고치는 대로 다시 켭니다.</li>
                <li>
                  <strong>
                    Pro 기능이 원격 중지 때문에 30일 넘게 이용할 수 없으면, 고객은 제15조의 기간이 지났더라도 환불을 요청하실 수
                    있습니다.
                  </strong>{' '}
                  번들은 제15조 제6항에 따라 전체를 환불합니다.
                </li>
              </ol>
            </section>
          ) : null}

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
              {pr ? (
                <>
                  <li>
                    PR Plugin 의 자막 음성 인식은 고객이 본인의 ElevenLabs API 키를 넣으신 경우에만 작동하며,{' '}
                    <strong>그 사용료는 고객이 ElevenLabs 에 직접 냅니다.</strong> 음성 인식을 위해 고객 컴퓨터에서 ElevenLabs 로
                    보내는 정보는 개인정보 처리방침 제2조에 적었습니다.
                  </li>
                  <li>보조 프로그램은 제품이 공식 배포처에서 고객 컴퓨터로 내려받으며, 각 프로그램의 라이선스를 따릅니다. 저희는 보조 프로그램을 다시 배포하지 않습니다.</li>
                  <li>설치 스크립트는 Adobe 의 설치 도구(Unified Plugin Installer Agent)를 이용하며, 그 도구에는 Adobe 의 약관이 적용됩니다.</li>
                </>
              ) : null}
            </ol>
          </section>

          <section>
            <h2 className={H2}>제14조(시스템 요구 사항)</h2>
            <p>
              {pr ? 'AE Plugin 은' : '제품은'} Windows 또는 macOS 에서 실행되는 Adobe After Effects 2022 이상이 필요합니다. Depth Pass 는 인텔 기반
              Mac 에서 실행되지 않습니다. 구매하시기 전에 요구 사항을 확인해 주세요. 요구 사항에 맞지 않는 환경에서 생긴
              문제도 제15조의 환불 기간 안이면 환불받으실 수 있습니다.
            </p>
            {pr ? (
              <p className="mt-2">
                PR Plugin 은 Windows 또는 macOS 에서 실행되는 Adobe Premiere Pro {PR.minPremiere} 이상과, 설치를 위한 Adobe Creative
                Cloud 데스크톱 앱이 필요합니다. 저희가 테스트한 운영체제와 Premiere Pro 버전은 웹사이트의 사양에 적습니다. 요구 사항에
                맞지 않는 환경에서 생긴 문제도 제15조의 환불 기간 안이면 환불받으실 수 있습니다.
              </p>
            ) : null}
          </section>

          {pr ? (
            <section>
              <h2 className={H2}>제14조의2(사전예약)</h2>
              <ol className={OL}>
                <li>
                  Pro 기능이 저희가 정한 완성 기준을 통과하기 전에는, 저희는 Pro 를 사전예약으로 판매할 수 있습니다. 이 경우 판매
                  화면과 결제 화면에{' '}
                  <strong>사전예약이라는 사실, 지금 받으시는 것(무료판과 라이선스 키), 업데이트로 열리는 기능</strong>을 표시합니다.
                </li>
                <li>
                  사전예약 고객은 결제 즉시 라이선스 키를 받고, Pro 기능은 그 기능을 여는 업데이트가 나오면 같은 키로 이용합니다.
                  추가 요금은 없습니다.
                </li>
                <li>저희는 Pro 기능이 열리는 날짜를 정하면 구매하신 이메일로 알려 드립니다.</li>
                <li>
                  <strong>
                    사전예약 고객은 Pro 기능이 열리기 전에는 언제든, 열린 날부터 14일 이내에는 이유를 묻지 않고 청약을 철회하고
                    전액을 돌려받으실 수 있습니다.
                  </strong>
                </li>
                <li>
                  <strong>
                    Pro 기능이 {human(PR.preorderDeadline, 'ko')}까지 열리지 않으면, 저희는 고객의 요청을 기다리지 않고 모든
                    사전예약을 전액 환불합니다.
                  </strong>{' '}
                  이 경우 라이선스 키는 해지되고, 무료판은 계속 이용하실 수 있습니다.
                </li>
                <li>
                  사전예약의 가격은 결제 화면에 표시한 얼리버드 가격({PR.earlyPrice} USD)이며, 이 가격은 Pro 기능이 열릴 때까지
                  유지합니다. Pro 기능이 열리면 열린 날부터 {PR.openEarlyDays}일 동안 같은 가격으로 팝니다.
                </li>
              </ol>
            </section>
          ) : null}

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
              {pr ? (
                <>
                  <li>사전예약의 청약철회는 제14조의2 제4항을 따릅니다.</li>
                  <li>
                    <strong>번들은 전체로만 환불하며, 한 플러그인만 따로 환불하지 않습니다.</strong> 번들을 환불하시면 번들 라이선스
                    키가 해지되어 두 플러그인 모두에서 사용할 수 없습니다.
                  </li>
                </>
              ) : null}
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
              {pr
                ? <li>After Effects 와 Premiere Pro 프로젝트는 정기적으로 저장하고 백업해 주세요.</li>
                : <li>After Effects 프로젝트는 정기적으로 저장하고 백업해 주세요.</li>}
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
            {pr ? (
              <p>
                이 약관은 {prDate('ko')}부터 시행합니다({prPostedDate('ko')} 게시). {policyDate('ko')}부터 시행한 약관에 You Name It PR
                Plugin 에 관한 내용을 더한 것으로, 제1조·제2조·제3조·제6조·제7조·제8조·제9조·제12조·제13조·제14조·제15조·제17조를
                고치고 제9조의2·제9조의3·제12조의2·제14조의2를 새로 두었습니다.
              </p>
            ) : (
              <p>
                이 약관은 {policyDate('ko')}부터 시행합니다. 2026년 9월 30일부터 시행한 약관에 제3조의2(무료 버전)를 더한 것이고, 그 밖의
                조항은 그대로입니다.
              </p>
            )}
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
            {FTC_BIZ_URL ? (
              <p className="mt-2">
                <a href={FTC_BIZ_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                  사업자정보 확인
                </a>
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
