import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Refund Policy — Dony's",
  description: "Refund Policy for Dony's After Effects plugin.",
};

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Refund Policy</h1>
        <p className="mb-10 text-sm text-[var(--text-muted)]">Last updated: April 2, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">14-Day Money-Back Guarantee</h2>
            <p>
              We want you to be completely satisfied with your purchase. If the Dony&apos;s
              plugin does not meet your expectations, you may request a full refund within{' '}
              <strong>14 days</strong> of your purchase date — no questions asked.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">How to Request a Refund</h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Email us at{' '}
                <a href="mailto:support@donys.dev" className="text-[var(--accent-light)] hover:underline">
                  support@donys.dev
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
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">After 14 Days</h2>
            <p>
              Refund requests made after the 14-day window will be reviewed on a case-by-case
              basis. We may offer a refund if you experience a critical technical issue that we
              are unable to resolve.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">License Deactivation</h2>
            <p>
              Upon receiving a refund, your license key will be deactivated. You will need to
              uninstall the plugin from your devices.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">Contact</h2>
            <p>
              If you have any questions about our refund policy, please contact us at{' '}
              <a href="mailto:support@donys.dev" className="text-[var(--accent-light)] hover:underline">
                support@donys.dev
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
