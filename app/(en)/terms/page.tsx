import type { Metadata } from 'next';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { BUSINESS, FTC_BIZ_URL, PORTAL_URL, PRICE } from '@/lib/product';
import { share } from '@/lib/meta';

const DESCRIPTION = 'Terms of Service for You Name It AE Plugin.';

export const metadata: Metadata = {
  alternates: { canonical: '/terms', languages: { en: '/terms', ko: '/ko/terms', 'x-default': '/terms' } },
  /* 🔴 브랜드명을 붙이지 마라 — 루트 레이아웃의 `template: '%s — You Name It'` 이 이미 붙인다.
     붙이면 "… — You Name It — You Name It" 으로 **두 번** 나간다(실측 2026-09-19). */
  title: 'Terms of Service',
  description: DESCRIPTION,
  ...share({ path: '/terms', title: 'Terms of Service — You Name It', description: DESCRIPTION, card: 'brand', lang: 'en' }),
};

/* 🔴 2026-09-30 오너 *"법조인 롤로 직접 작성"* — 국문판(`app/(ko)/ko/terms/page.tsx`)과 **같은 20개 조**다.
   조항 근거·쟁점 = 플러그인 repo `donys/docs/LEGAL_KR_REVIEW.md`(비공개 — 이 repo 는 공개다)(국문판 머리 주석에 조항별 법령 요약). 한쪽을 고치면 다른 쪽도 같이 고쳐라 —
   §20 이 "두 판이 다르면 고객에게 유리한 쪽" 이라, 갈라진 불리한 문장은 조용히 효력을 잃는다.
   §6 세금: "포함"·"별도" 둘 다 일부 구매자에게 거짓이다(Polar 가 나라마다 다르게 붙인다 — 한국은 포함 표시,
   미국·캐나다는 별도). 정본 = 플러그인 `donys/docs/VOICE_AND_TERMS.md` §4. */

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

export default function TermsPage() {
  return (
    <ReadingShell lang="en" plate="s.ft.terms">
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>Terms of Service</InkTitle>
        <p className="text-sm">Effective: September 30, 2026</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className={H2}>1. Purpose</h2>
            <p>
              These Terms set out the rights, duties and responsibilities between {BUSINESS.name.en} (&quot;we&quot;,
              &quot;us&quot;) and you when you buy and use You Name It AE Plugin (the &quot;Product&quot;), which we make and
              sell.
            </p>
          </section>

          <section>
            <h2 className={H2}>2. Definitions</h2>
            <ol className={OL}>
              <li>&quot;Product&quot; means You Name It AE Plugin, an extension for Adobe After Effects, together with its updates and the presets, scripts and documentation that come with it.</li>
              <li>&quot;You&quot; means the person who bought or uses the Product under these Terms.</li>
              <li>&quot;License key&quot; means the unique string issued when you buy, used to activate the Product.</li>
              <li>&quot;Reseller&quot; means Polar Software Inc. (&quot;Polar&quot;), which takes payment and handles tax on our behalf as merchant of record.</li>
              <li>&quot;Your work&quot; means the layers, keyframes, expressions, renders and project files you make with the Product.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>3. Publication and Effect</h2>
            <ol className={OL}>
              <li>We publish these Terms where they can be reached from the front page of our website (younameit.works), and we will email you a copy on request.</li>
              <li>These Terms take effect when you buy the Product.</li>
              <li>Anything these Terms do not cover is governed by applicable law and ordinary commercial practice.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>4. Changes to These Terms</h2>
            <ol className={OL}>
              <li>We may change these Terms within the limits of applicable law.</li>
              <li>
                When we do, we post the change and its effective date on our website <strong>at least 7 days in advance</strong>.
                If the change is unfavorable to you, we post it <strong>at least 30 days in advance</strong> and also email you at
                the address you bought with.
              </li>
              <li>
                If that notice clearly told you that not objecting by the effective date counts as agreement, and you do not
                object by then, you are treated as having agreed to the revised Terms.
              </li>
              <li>
                If you do not agree, you may stop using the Product. If you stop because of an unfavorable change, you may get a
                refund of an amount we agree on together, taking into account how long you have used it.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>5. Purchases by Minors</h2>
            <p>
              <strong>
                If a minor buys the Product without the consent of a parent or legal guardian, the minor or the guardian may
                cancel the purchase.
              </strong>{' '}
              We then refund the full amount as set out in Section 15.
            </p>
          </section>

          <section>
            <h2 className={H2}>6. Purchase and Payment</h2>
            <ol className={OL}>
              <li>
                The Product is a <strong>one-time purchase</strong> of {PRICE} USD, not a subscription. Payment happens on the
                checkout page of our reseller, Polar.
              </li>
              <li>
                Whether tax is included in that price or added to it depends on where you are. Polar calculates it and{' '}
                <strong>shows the final amount on the checkout page before you pay.</strong>
              </li>
              <li>The purchase contract is formed when payment is completed on Polar&apos;s checkout page.</li>
              <li>
                Polar&apos;s buyer terms also apply to the checkout. The conditions for using the Product, however, are set by
                these Terms, and <strong>we are responsible, together with Polar, for cancellations and refunds.</strong> You may
                ask us directly for a refund under these Terms and applicable law.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>7. Delivery</h2>
            <p>
              As soon as payment is complete, you receive your license key and the installer. You can download them again at
              any time from the{' '}
              <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                customer portal
              </a>
              , where you sign in with the email you bought with.
            </p>
          </section>

          <section>
            <h2 className={H2}>8. License</h2>
            <ol className={OL}>
              <li>
                We grant <strong>you, the one person who bought it</strong>, a non-exclusive, non-transferable license to install
                and use the Product on <strong>up to 2 computers</strong> per license key.
              </li>
              <li>You may use the Product for both personal and commercial work, including client work.</li>
              <li>We keep the copyright and all other intellectual property rights in the Product. The license lets you use the Product; it does not sell it to you.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>9. License Checks and Changing Computers</h2>
            <ol className={OL}>
              <li>
                The Product checks your license over the internet when you activate it and then <strong>once every 7 days</strong>.
                Without a connection, it keeps working for <strong>up to 30 days</strong>. What is sent during a check is described
                in Section 2.3 of our{' '}
                <a href="/privacy" className={LINK}>
                  Privacy Policy
                </a>
                .
              </li>
              <li>To move to a new computer, deactivate the old one in the customer portal or inside the Product, then activate on the new one.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>10. Prohibited Uses</h2>
            <p>You may not:</p>
            <ol className={OL}>
              <li>Redistribute, resell or rent the Product, or sublicense it to anyone</li>
              <li>
                Modify, reverse-engineer or decompile the Product, <strong>except to the extent the law allows</strong> (for
                example, where needed for interoperability)
              </li>
              <li>Share your license key with others, or get around the license check</li>
              <li>Offer the Product&apos;s presets or scripts as a product of your own (for example, as a preset pack or script bundle)</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>11. Your Work</h2>
            {/* 2026-09-26 오너 판정("명시 추가") — 만든 것은 유저 것, 넘기면 안 되는 것은 제품 자체.
                제3자 소재 한 줄은 사실 교정이다: Library 의 무료 소스(Pexels · Giphy · Freesound —
                플러그인 `utils/freeSourceApi.ts`)는 각자 라이선스를 달고 오고, Freesound 는 저작자 표시를
                요구하는 CC-BY 가 섞여 있다. */}
            <ol className={OL}>
              <li>
                <strong>Everything you make is yours.</strong> You may use it in any personal, client or commercial project,
                including project files you deliver to clients, and you do not need to credit us or the Product.
              </li>
              <li>Third-party media you bring in through the Product, such as images, video, GIFs or sounds from Pexels, Giphy or Freesound, stays under its own license.</li>
              <li>A client who receives your project file does not receive a license to the Product.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>12. Updates</h2>
            <ol className={OL}>
              <li>Your purchase includes <strong>free minor updates</strong>.</li>
              <li>A major version upgrade may require an additional purchase at a discounted price. If so, we will tell you in advance.</li>
              <li>If you skip updates, the version you bought keeps working.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>13. Third-Party Services</h2>
            <ol className={OL}>
              <li>
                The Chat panel needs your own Claude Code (with a Claude Pro or Max plan) or Codex (with a ChatGPT plan) and an
                internet connection. Those services are <strong>not included in the price</strong>, and their own terms apply.
              </li>
              <li>Stock search (Pexels, Giphy, Freesound) and ElevenLabs voice work only if you enter your own API keys, and those services&apos; terms apply.</li>
              <li>
                If a third-party service stops or changes its terms so that a feature no longer works, we will try to replace
                or fix that feature. Unless it happened for a reason we are responsible for, we are not liable for resulting
                loss.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>14. System Requirements</h2>
            <p>
              The Product requires Adobe After Effects 2022 or later on Windows or macOS. Depth Pass does not run on
              Intel-based Macs. Please check the requirements before you buy. Problems on a setup that does not meet them are
              still covered by the refund period in Section 15.
            </p>
          </section>

          <section>
            <h2 className={H2}>15. Cancellation and Refunds</h2>
            <ol className={OL}>
              <li>
                You may cancel your purchase and get a full refund <strong>within 14 days of purchase, no questions asked</strong>.
              </li>
              <li>
                If the Product is not as we described or advertised it, or is not delivered as agreed, you may cancel even after
                14 days, <strong>within 3 months of receiving it or within 30 days of when you learned or could have learned of
                it</strong>.
              </li>
              <li>
                We process the refund <strong>within 3 business days</strong> of receiving your request. We charge no fee or
                penalty.
              </li>
              <li>
                Details are in our{' '}
                <a href="/refund" className={LINK}>
                  Refund Policy
                </a>
                .
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>16. Support</h2>
            <p>
              We provide email support at <Mail /> and aim to respond within 48 hours on business days.
            </p>
          </section>

          <section>
            <h2 className={H2}>17. Limitation of Liability</h2>
            <ol className={OL}>
              <li>
                We do not promise that the Product works without errors on every computer setup or alongside every third-party
                plugin. If the Product does not work as described, you can get a refund under Section 15.
              </li>
              <li>
                We are not liable for loss caused <strong>without intent or negligence on our part</strong>, by force majeure such
                as natural disasters, or by reasons attributable to you.
              </li>
              <li>
                For loss caused by our <strong>ordinary negligence</strong>, our liability is limited to ordinary, foreseeable
                damages and to the amount you paid for the Product.
              </li>
              <li>
                <strong>
                  Sections 17.2 and 17.3 do not apply to loss caused by our intent or gross negligence, to injury to life or
                  body, or to any liability that cannot be excluded or limited by law.
                </strong>
              </li>
              <li>Please save and back up your After Effects projects regularly.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>18. Termination of the License</h2>
            <ol className={OL}>
              <li>
                If you breach Section 10, we will ask you to put it right within a reasonable period and may terminate your
                license if you do not. We may terminate immediately if the breach is serious and obvious, such as redistributing
                or reselling the Product or publicly sharing your license key.
              </li>
              <li>We will tell you the reason by email. After termination, you must stop using the Product and delete installed copies.</li>
              <li>You may stop using the Product at any time. Refunds follow Section 15.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>19. Governing Law and Disputes</h2>
            <ol className={OL}>
              <li>
                These Terms are governed by the laws of the Republic of Korea. This does not take away the protection that the
                mandatory consumer laws of the country where you live give you.
              </li>
              <li>
                Lawsuits between us are brought in the court that has jurisdiction under applicable law.{' '}
                <strong>If you live in the Republic of Korea, you can always sue in a Korean court.</strong> If you live
                elsewhere, you may also bring a claim in the courts of the country where you live, where its law allows.
              </li>
              <li>
                If a dispute arises, please tell us first at <Mail />. If it is not resolved, consumers in Korea may apply for
                mediation to the Korea Consumer Agency (1372) or the E-Commerce Mediation Committee.
              </li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>20. Language and Interpretation</h2>
            <p>
              These Terms are published in Korean and English, and both are official. If the two differ, or if the meaning is
              unclear, <strong>the reading more favorable to you</strong> applies.
            </p>
          </section>

          <section>
            <h2 className={H2}>Effective Date</h2>
            <p>These Terms apply from September 30, 2026.</p>
          </section>

          <section>
            <h2 className={H2}>Business Information</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Company: {BUSINESS.name.en}</li>
              <li>CEO: {BUSINESS.ceo.en}</li>
              <li>Address: {BUSINESS.address.en}</li>
              <li>Business Registration No.: {BUSINESS.regNo}</li>
              {BUSINESS.mailOrderNo ? <li>Mail-order Sales Registration No.: {BUSINESS.mailOrderNo}</li> : null}
              {BUSINESS.phone ? <li>Tel: {BUSINESS.phone}</li> : null}
              <li>
                Email: <Mail />
              </li>
              <li>Hosting: {BUSINESS.hosting}</li>
            </ul>
            <p className="mt-2">
              <a href={FTC_BIZ_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                Verify business information (Korea Fair Trade Commission)
              </a>
            </p>
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
