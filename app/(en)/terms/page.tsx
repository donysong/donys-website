import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { PRICE } from '@/lib/product';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Terms of Service for You Name It AE Plugin.';

export const metadata: Metadata = {
  alternates: { canonical: '/terms' },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: 'Terms of Service',
  description: DESCRIPTION,
  ...share({ path: '/terms', title: 'Terms of Service — You Name It', description: DESCRIPTION, card: 'brand', lang: 'en' }),
};

/* 🔴 법 문서 — **사실만** 고친다. 조항 구조·책임 문구·새 조항은 오너 사안이다.
   §3 세금: "포함"·"별도" 둘 다 일부 구매자에게 거짓이다(Polar 가 나라마다 다르게 붙인다 — 한국은 포함 표시,
   미국·캐나다는 별도). 정본 = 플러그인 `donys/docs/VOICE_AND_TERMS.md` §4. */
export default function TermsPage() {
  return (
    <ReadingShell lang="en" plate="s.ft.terms" langSwitch={false}>
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>Terms of Service</InkTitle>
        <p className="text-sm">Last updated: September 26, 2026</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">1. Overview</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your purchase and use of
              You Name It AE Plugin (&quot;Product&quot;) sold by You Name It
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By purchasing or using the
              Product, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">2. License</h2>
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
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">3. Payment</h2>
            <p>
              The Product is sold as a one-time purchase for {PRICE} USD through our payment
              processor and merchant of record, Polar. All prices are in USD. Whether tax is
              included in that price or added to it depends on where you are; Polar calculates it
              and shows it at checkout before you pay.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">4. Updates</h2>
            <p>
              Your purchase includes free minor updates. Major version upgrades may require an
              additional purchase at a discounted rate, announced in advance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">5. Support</h2>
            <p>
              We provide best-effort support via email at{' '}
              <a href="mailto:support@younameit.works" className="text-[var(--text-primary)] underline underline-offset-4 font-semibold">
                support@younameit.works
              </a>
              . We aim to respond within 48 hours on business days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">6. System Requirements</h2>
            <p>
              The Product requires Adobe After Effects 2022 or later, running on Windows or
              macOS. The Chat panel also requires your own Claude Code (with a Claude Pro or Max
              plan) or Codex (with a ChatGPT plan) and an internet connection; these are not
              included in the price. Depth Pass does not run on Intel-based Macs. We are not
              responsible for compatibility issues with unsupported versions or third-party
              plugins.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">7. Limitation of Liability</h2>
            <p>
              The Product is provided &quot;as is&quot; without warranty of any kind. To the
              maximum extent permitted by law, we shall not be liable for any indirect,
              incidental, or consequential damages arising from the use or inability to use the
              Product.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">8. Termination</h2>
            <p>
              We may terminate your license if you violate these Terms. Upon termination, you
              must stop using the Product and delete all copies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">9. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Changes will be posted on this page
              with an updated date. Continued use of the Product constitutes acceptance of the
              revised Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">10. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
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
