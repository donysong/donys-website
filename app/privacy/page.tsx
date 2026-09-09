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
            <p>Our website uses two analytics services:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Cloudflare Web Analytics</strong> — cookieless. It does not set cookies
                and does not create a cross-site identifier.
              </li>
              <li>
                <strong>Google Analytics 4</strong> — sets cookies (such as <code>_ga</code>) that
                assign a randomly generated identifier to your browser, and processes your IP
                address to estimate approximate location. Its enhanced measurement also records
                outbound link clicks, including when you click through to our checkout page.
              </li>
            </ul>
            <p className="mt-2">
              We do not collect your name, email address, or anything you type through analytics.
              However, cookie identifiers and IP addresses are treated as personal data under the
              GDPR and similar laws, so we do not claim this analytics data is fully anonymous.
            </p>

            <h3 className="mb-2 mt-4 text-[15px] font-semibold text-[var(--text-primary)]">
              2.3 Plugin Data
            </h3>
            <p>
              The plugin does its actual work — creating layers, effects, and keyframes —
              entirely on your machine, and it never uploads your project file. There are five
              cases where it does talk to the network, and this is all of them:
            </p>
            <ol className="mt-2 list-decimal space-y-2 pl-6">
              <li>
                <strong>License activation and periodic re-validation.</strong> When you enter your
                license key, the plugin sends that key together with a <strong>device identifier</strong>{' '}
                to our payment provider (Polar). The identifier is a one-way hash of a hardware ID
                your operating system already exposes; if that is unavailable it falls back to a
                hash of your network adapter address and hostname. It exists so that one license
                covers a limited number of machines. We never receive the raw hardware ID, and it
                is not used for tracking or advertising.
              </li>
              <li>
                <strong>A local, encrypted license cache.</strong> The result is stored on your
                machine, encrypted with AES-256. It is not transmitted anywhere. Deleting it simply
                forces a re-check.
              </li>
              <li>
                <strong>Update checks.</strong> The plugin periodically fetches a small version
                manifest from our download host. Like any web request, this reveals your IP address
                and the time of the request to that host. It carries no license key, no account,
                and no usage data.
              </li>
              <li>
                <strong>The Chat panel.</strong> When you use Chat, the plugin runs Anthropic&apos;s
                Claude on your behalf <strong>using your own Claude credentials</strong>, and sends
                it what it needs to answer you: your messages, and the structure of the composition
                you are working on — layer names, effect and property values, and similar metadata.
                Rendered frames and source media files are not uploaded. We do not receive or store
                any of this; it goes from your machine to Anthropic directly.
              </li>
              <li>
                <strong>Stock asset search, only if you set it up.</strong> If you enter your own
                API keys for Pexels, Giphy, or Freesound, searches you run go to those services
                under your own account. Leave the keys empty and no request is ever made.
              </li>
            </ol>
            <p className="mt-2">
              The plugin sends <strong>no analytics, no usage statistics, and no crash reports.</strong>
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
                <strong>Anthropic</strong> — powers the Chat panel, under your own Claude
                credentials, and receives the data described in 2.3. Their privacy policy is
                available at{' '}
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-light)] hover:underline"
                >
                  anthropic.com/legal/privacy
                </a>
                .
              </li>
              <li>
                <strong>Cloudflare</strong> — DNS, CDN, download hosting, and cookieless web
                analytics. Their privacy policy is available at{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-light)] hover:underline"
                >
                  cloudflare.com/privacypolicy
                </a>
                .
              </li>
              <li>
                <strong>Google</strong> — Google Analytics 4 (website usage measurement). Their
                privacy policy is available at{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-light)] hover:underline"
                >
                  policies.google.com/privacy
                </a>
                .
              </li>
              <li>
                <strong>Pexels, Giphy, Freesound</strong> — asset search, and only if you supply
                your own API keys for them.
              </li>
              <li>
                <strong>Vercel</strong> — website hosting. We are migrating hosting to Cloudflare
                Pages; this entry will be removed once that migration is complete. Their privacy
                policy is available at{' '}
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
