import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import PolicyNotice from '@/components/PolicyNotice';
import { BUSINESS, PR } from '@/lib/product';
import { human, prDate, prText } from '@/lib/policy';

/* 환불 정책 본문(영문) — `/refund`(현재 판)와 `/refund/upcoming`(개정 예정본)이 **같은 본문**을 그린다. `pr` 이 거짓이면 09-30 판 그대로다.
   초안 = PR 플러그인 repo `gtm/legal/refund-additions.md`(⚖️ 전문가 검토 전). `{pr ? 새 : 옛}` 의 옛 갈래는 시행 뒤 지운다(`lib/policy.ts`). */

/* 🔴 2026-09-30 오너 *"법조인 롤로 직접 작성"* — 국문판(`components/legal/RefundKo.tsx`)과 **같은 약속**이다. 근거·쟁점 =
   플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다) §2 A6~A11 (국문판 머리 주석에 조문 요약). 🔴 "5–7 business days" 로 되돌리지 마라 —
   한국 전자상거래법 §18② 는 디지털 콘텐츠 환불을 철회한 날부터 **3영업일** 안에 하라고 한다. 한 벌의 약속을 전 세계에 준다. */

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

export default function RefundEn({ view }: { view: 'current' | 'upcoming' }) {
  const pr = prText(view);
  return (
    <ReadingShell lang="en" plate="s.ft.refund">
      <header className="max-w-3xl">
        <p className="lab">{pr ? 'You Name It' : 'You Name It AE Plugin'}</p>
        <InkTitle>Refund Policy</InkTitle>
        <p className="text-sm">Effective: {pr ? prDate('en') : 'September 30, 2026'}</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        {/* 고지 단계: 현재 판 위에는 개정 예정 띠, 예정본 위에는 현재 판으로 가는 띠. 시행 뒤에는 띠가 없다. */}
        <PolicyNotice lang="en" doc="refund" view={view} />
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className={H2}>1. 14-Day Refund, No Questions Asked</h2>
            <p>
              Within <strong>14 days</strong> of your purchase date, we refund the <strong>full amount</strong> without asking
              why, even if you have already installed or used the Product.
            </p>
          </section>

          {pr ? (
            <>
              <section>
                <h2 className={H2}>1-2. Free Version</h2>
                <p>The Free Version involves no payment, so there is nothing to refund. You can delete it at any time, and your work stays as it is.</p>
              </section>

              <section>
                <h2 className={H2}>1-3. Pre-orders</h2>
                <p>
                  If you pre-ordered Pro, we refund you in full, with no reason needed,{' '}
                  <strong>at any time before the Pro features open and within 14 days from the day they open</strong>. We email you the
                  opening date at the address you bought with.{' '}
                  <strong>
                    If the Pro features have not opened by {human(PR.preorderDeadline, 'en')}, we refund every Pre-order in full without
                    waiting for a request.
                  </strong>{' '}
                  The license key is then terminated, and the Free Version keeps working.
                </p>
              </section>

              <section>
                <h2 className={H2}>1-4. Bundle</h2>
                <p>
                  The Bundle counts as one purchase and is refunded in full within 14 days.{' '}
                  <strong>The Bundle is refunded only as a whole; we do not make partial refunds that keep one of the two plugins.</strong>{' '}
                  A refund terminates the Bundle license key, which locks Pro in both plugins. A refund under Section 5 (remote switch-off)
                  also covers the whole Bundle.
                </p>
              </section>

              <section>
                <h2 className={H2}>1-5. Purchases Made with an AE Buyer Code</h2>
                <p>
                  If you refund PR Pro bought with an AE buyer discount code, that code counts as used. If you buy again later, you can ask
                  for a new code against the same AE order until {human(PR.aeCouponEnd, 'en')}.
                </p>
              </section>
            </>
          ) : null}

          <section>
            <h2 className={H2}>2. If the Product Is Not as Described</h2>
            <p>
              If the Product is not as we described or advertised it, or is not delivered as agreed, you may request a refund
              even after 14 days, <strong>within 3 months of receiving it or within 30 days of when you learned or could have
              learned of it</strong>.
            </p>
          </section>

          <section>
            <h2 className={H2}>3. How to Request a Refund</h2>
            <ol className={OL}>
              <li>
                Email <Mail /> saying you would like a refund. Any subject line or format is fine.
              </li>
              <li>Include your order number or the email address you paid with, so we can find the order.</li>
              <li>Your request takes effect on the day you send it.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>4. When and How You Are Refunded</h2>
            <ol className={OL}>
              <li>
                We process the refund through our reseller, Polar, <strong>within 3 business days</strong> of receiving your
                request, and email you when it is done.
              </li>
              <li>
                The same amount (in US dollars) goes back to the payment method you used. For card payments we ask for the
                charge to be cancelled right away; how long it takes to appear on your statement depends on your card issuer.
                Exchange-rate differences and foreign transaction fees follow your card issuer&apos;s policy.
              </li>
              <li>
                There is <strong>no fee or penalty</strong>. We absorb the payment processing fee.
              </li>
              <li>If we are late through our own fault, we add interest for the delay as the law requires.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>5. Other Cases</h2>
            <p>
              We also look at requests outside Sections 1 and 2. If you hit a serious technical problem we are unable to
              resolve, we may refund you after the period has passed.
              {pr ? (
                <>
                  {' '}
                  <strong>
                    If a PR Plugin Pro feature stays unavailable for more than 30 days because we switched it off remotely, we refund
                    you on request even after 14 days
                  </strong>{' '}
                  (Terms, Section 12-2). <strong>A Bundle is then refunded as a whole.</strong>
                </>
              ) : null}
            </p>
          </section>

          <section>
            <h2 className={H2}>6. Your License After a Refund</h2>
            {pr ? (
              <p>
                A refund terminates the license key. For the AE Plugin, the activation is released, so please delete the Product from your
                computer.{' '}
                <strong>For the PR Plugin, only the Pro features lock, at the next check (at most 7 days later); the Free Version features keep working.</strong>{' '}
                Either way, the work you have made stays as it is.
              </p>
            ) : (
              <p>After a refund, your license key is deactivated. Please uninstall the Product from your computers.</p>
            )}
          </section>

          <section>
            <h2 className={H2}>7. Questions and Disputes</h2>
            <p>
              For questions about refunds, contact <Mail />
              {BUSINESS.phone ? <> · {BUSINESS.phone}</> : null}. The full conditions are in Section 15 of our{' '}
              <a href="/terms" className={LINK}>
                Terms of Service
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
