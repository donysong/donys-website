import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Refund Policy for You Name It AE Plugin.';

export const metadata: Metadata = {
  alternates: { canonical: '/refund' },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: 'Refund Policy',
  description: DESCRIPTION,
  ...share({ path: '/refund', title: 'Refund Policy — You Name It', description: DESCRIPTION, card: 'brand', lang: 'en' }),
};

/* 🔴 법 문서 — **사실만** 고친다. 조항 구조·책임 문구·새 조항은 오너 사안이다. */
export default function RefundPage() {
  return (
    <ReadingShell lang="en" plate="s.ft.refund" langSwitch={false}>
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>Refund Policy</InkTitle>
        <p className="text-sm">Last updated: September 26, 2026</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">14-Day Money-Back Guarantee</h2>
            <p>
              We want you to be completely satisfied with your purchase. If You Name It AE
              Plugin does not meet your expectations, you may request a full refund within{' '}
              <strong>14 days</strong> of your purchase date — no questions asked.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">How to Request a Refund</h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Email us at{' '}
                <a href="mailto:support@younameit.works" className="text-[var(--text-primary)] underline underline-offset-4 font-semibold">
                  support@younameit.works
                </a>{' '}
                with the subject line &quot;Refund Request&quot;.
              </li>
              <li>Include your order number or the email address used at checkout.</li>
              <li>
                We will process your refund within <strong>5–7 business days</strong>. The
                refund will be issued to the original payment method.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">After 14 Days</h2>
            <p>
              Refund requests made after the 14-day window will be reviewed on a case-by-case
              basis. We may offer a refund if you experience a critical technical issue that we
              are unable to resolve.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">License Deactivation</h2>
            <p>
              Upon receiving a refund, your license key will be deactivated. You will need to
              uninstall the plugin from your devices.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">Contact</h2>
            <p>
              If you have any questions about our refund policy, please contact us at{' '}
              <a href="mailto:support@younameit.works" className="text-[var(--text-primary)] underline underline-offset-4 font-semibold">
                support@younameit.works
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
