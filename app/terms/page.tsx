import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Terms of Service — Dony's",
  description: "Terms of Service for Dony's After Effects plugin.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mb-10 text-sm text-[var(--text-muted)]">Last updated: April 2, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">1. Overview</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your purchase and use of the
              Dony&apos;s After Effects plugin (&quot;Product&quot;) sold by Dony&apos;s
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By purchasing or using the
              Product, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">2. License</h2>
            <p>
              Upon purchase, we grant you a non-exclusive, non-transferable license to install
              and use the Product on up to <strong>2 devices</strong> per license key. This
              license is for personal or commercial use in your own projects.
            </p>
            <p className="mt-2">You may not:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Redistribute, resell, or sublicense the Product</li>
              <li>Reverse-engineer, decompile, or modify the Product&apos;s source code</li>
              <li>Share your license key with others</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">3. Payment</h2>
            <p>
              The Product is sold as a one-time purchase for $30 USD through our payment
              processor, Lemon Squeezy. All prices are in USD and include applicable taxes as
              determined by Lemon Squeezy at checkout.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">4. Updates</h2>
            <p>
              Your purchase includes free minor updates. Major version upgrades may require an
              additional purchase at a discounted rate, announced in advance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">5. Support</h2>
            <p>
              We provide best-effort support via email at{' '}
              <a href="mailto:support@donys.dev" className="text-[var(--accent-light)] hover:underline">
                support@donys.dev
              </a>
              . We aim to respond within 48 hours on business days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">6. System Requirements</h2>
            <p>
              The Product requires Adobe After Effects 2022 or later, running on Windows or
              macOS. We are not responsible for compatibility issues with unsupported versions
              or third-party plugins.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">7. Limitation of Liability</h2>
            <p>
              The Product is provided &quot;as is&quot; without warranty of any kind. To the
              maximum extent permitted by law, we shall not be liable for any indirect,
              incidental, or consequential damages arising from the use or inability to use the
              Product.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">8. Termination</h2>
            <p>
              We may terminate your license if you violate these Terms. Upon termination, you
              must stop using the Product and delete all copies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">9. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Changes will be posted on this page
              with an updated date. Continued use of the Product constitutes acceptance of the
              revised Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text)]">10. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
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
