import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: "Privacy Policy — You Name It",
  description: "Privacy Policy for You Name It After Effects plugin.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mb-10 text-sm text-[var(--text-muted)]">Last updated: April 2, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">1. Introduction</h2>
            <p>
              You Name It (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your
              privacy. This Privacy Policy explains how we collect, use, and protect your
              information when you visit our website (younameit.works) or purchase and use the
              You Name It After Effects plugin.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">2. Information We Collect</h2>

            <h3 className="mb-2 mt-4 text-[15px] font-semibold text-[var(--text-primary)]">
              2.1 Information You Provide
            </h3>
            <p>
              When you purchase the Product through Polar, they collect your name,
              email address, and payment information. We receive your name, email, and order
              details — we do <strong>not</strong> receive or store your payment card
              information.
            </p>

            <h3 className="mb-2 mt-4 text-[15px] font-semibold text-[var(--text-primary)]">
              2.2 Automatically Collected Information
            </h3>
            <p>
              Our website may use basic analytics (e.g., Vercel Analytics) to collect
              anonymized usage data such as page views, browser type, and country. No
              personally identifiable information is collected through analytics.
            </p>

            <h3 className="mb-2 mt-4 text-[15px] font-semibold text-[var(--text-primary)]">
              2.3 Plugin Data
            </h3>
            <p>
              The You Name It plugin runs entirely within Adobe After Effects on your local
              machine. It does <strong>not</strong> collect, transmit, or store any personal
              data, project files, or usage telemetry.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">3. How We Use Your Information</h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>To deliver your license key and product updates</li>
              <li>To provide customer support</li>
              <li>To send important product announcements (you can opt out at any time)</li>
            </ul>
            <p className="mt-2">
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Polar</strong> — payment processing, merchant of record, and license
                management. Their privacy policy is available at{' '}
                <a
                  href="https://polar.sh/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-light)] hover:underline"
                >
                  polar.sh/legal/privacy
                </a>
                .
              </li>
              <li>
                <strong>Vercel</strong> — website hosting. Their privacy policy is available at{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-light)] hover:underline"
                >
                  vercel.com/legal/privacy-policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">5. Data Retention</h2>
            <p>
              We retain your email and order information for as long as necessary to provide
              support and product updates. You may request deletion of your data at any time by
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, email us at{' '}
              <a href="mailto:donysong96@gmail.com" className="text-[var(--accent-light)] hover:underline">
                donysong96@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">7. Children&apos;s Privacy</h2>
            <p>
              Our Product is not directed to children under 13. We do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">9. Contact</h2>
            <p>
              For privacy-related questions, contact us at{' '}
              <a href="mailto:donysong96@gmail.com" className="text-[var(--accent-light)] hover:underline">
                donysong96@gmail.com
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
