import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { BUSINESS } from '@/lib/product';
import { share } from '@/lib/meta';

const DESCRIPTION = 'You Name It AE Plugin 의 환불 정책입니다.';

export const metadata: Metadata = {
  alternates: { canonical: '/ko/refund', languages: { en: '/refund', ko: '/ko/refund', 'x-default': '/refund' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: '환불 정책',
  description: DESCRIPTION,
  ...share({ path: '/ko/refund', title: '환불 정책 — You Name It', description: DESCRIPTION, card: 'brand', lang: 'ko' }),
};

/* 🔴 2026-09-30 오너 *"법조인 롤로 직접 작성"* — 정본 검토서 = 플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다) §2 A6~A11.
   영문판(`app/(en)/refund/page.tsx`)과 **같은 약속**이다 — 한쪽을 고치면 다른 쪽도 같이 고쳐라.
   근거: 14일 = 약정(전자상거래법 §17① 괄호 — 법정 7일보다 길게 약정하면 그 기간이 법정 기간이 된다) ·
   3개월/30일 = §17③ · 서면 발송일 효력 = §17④ · **3영업일** = §18②2호(디지털 콘텐츠는 철회한 날부터) ·
   카드 취소 요청 = §18③ · 위약금 없음 = §18⑨ · 지연배상금 연 15% = 시행령 §21의3 · 형식 자유 = 약관규제법 §12 2호.
   🔴 "5~7 영업일" 로 되돌리지 마라 — §18② 의 법정 기한은 3영업일이다. 3영업일은 **환불을 여는** 기한이고(Polar 대시보드),
   카드사가 고객 명세서에 반영하는 날은 결제업자 몫이라 따로 적었다.
   FAQ(`lib/copy/ae.ts` `ae.q11.*`)가 같은 사실을 말한다 — 어긋나면 둘 중 하나가 거짓이다. */

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

export default function RefundKoPage() {
  return (
    <ReadingShell lang="ko" plate="s.ft.refund">
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>환불 정책</InkTitle>
        <p className="text-sm">시행일: 2026년 9월 30일</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className={H2}>1. 14일 무조건 환불</h2>
            <p>
              구매일부터 <strong>14일 이내</strong>에는 이유를 묻지 않고 <strong>전액</strong> 돌려드립니다. 제품을 이미
              설치하거나 쓰셨어도 마찬가지입니다. 이 기간은 「전자상거래 등에서의 소비자보호에 관한 법률」이 정한 청약철회
              기간(7일)보다 깁니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>2. 설명과 다른 경우</h2>
            <p>
              제품이 저희가 표시·광고한 내용과 다르거나 계약한 내용과 다르게 제공된 경우에는 14일이 지나도{' '}
              <strong>제품을 받은 날부터 3개월 이내, 또는 그 사실을 안 날이나 알 수 있었던 날부터 30일 이내</strong>에
              환불을 요청하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>3. 요청 방법</h2>
            <ol className={OL}>
              <li>
                <Mail /> 로 환불을 원한다는 메일을 보내 주세요. 제목이나 양식은 자유입니다.
              </li>
              <li>어느 주문인지 알 수 있도록 주문 번호나 결제하신 이메일 주소를 적어 주세요.</li>
              <li>환불 요청은 메일을 보내신 날 효력이 생깁니다.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>4. 처리 기한과 방법</h2>
            <ol className={OL}>
              <li>
                요청이 저희에게 도착한 날부터 <strong>3영업일 이내</strong>에 판매 대행자 Polar 를 통해 환불을 처리하고,
                처리했다는 사실을 메일로 알려 드립니다.
              </li>
              <li>
                결제하신 수단으로 같은 금액(미국 달러 기준)을 돌려드립니다. 카드로 결제하신 경우 저희는 결제 취소를 바로
                요청하며, 명세서에 반영되기까지 걸리는 기간은 카드사에 따라 다릅니다. 환율 변동과 해외 결제 수수료 처리는
                카드사 정책을 따릅니다.
              </li>
              <li>
                환불에 <strong>수수료나 위약금은 없습니다.</strong> 결제 처리 수수료는 저희가 부담합니다.
              </li>
              <li>
                저희 사정으로 환불이 늦어지면 늦어진 기간에 대해 법이 정한 지연배상금(연 15%)을 더해 드립니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>5. 그 밖의 경우</h2>
            <p>
              1번과 2번에 해당하지 않는 요청도 살펴봅니다. 저희가 해결하지 못하는 심각한 기술 문제가 있으면 기간이 지났어도
              환불해 드릴 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className={H2}>6. 환불 뒤 라이선스</h2>
            <p>환불하면 라이선스 키의 활성화가 해제됩니다. 컴퓨터에서 제품을 삭제해 주세요.</p>
          </section>

          <section>
            <h2 className={H2}>7. 문의와 분쟁</h2>
            <p>
              환불에 관한 문의는 <Mail />
              {BUSINESS.phone ? <> · {BUSINESS.phone}</> : null} 로 연락 주세요. 원만히 해결되지 않으면 한국소비자원(국번
              없이 1372)에 상담이나 피해구제를 신청하실 수 있습니다. 자세한 조건은{' '}
              <a href="/ko/terms" className={LINK}>
                이용약관
              </a>{' '}
              제15조를 따릅니다.
            </p>
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
