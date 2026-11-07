import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import PolicyNotice from '@/components/PolicyNotice';
import { BUSINESS, FTC_BIZ_URL, PORTAL_URL, PR, PRICE } from '@/lib/product';
import { human, policyDate, prDate, prPostedDate, prText } from '@/lib/policy';

/* 약관 본문(영문) — `/terms`(현재 판)와 `/terms/upcoming`(개정 예정본)이 **같은 본문**을 그린다. `pr` 이 거짓이면 10-23 판 그대로다.
   PR 조항 초안 = PR 플러그인 repo `gtm/legal/terms-additions.md`(⚖️ 전문가 검토 전). `{pr ? 새 : 옛}` 의 옛 갈래는 시행 뒤 지운다(`lib/policy.ts`). */

/* 🔴 2026-09-30 오너 *"법조인 롤로 직접 작성"* — 국문판(`components/legal/TermsKo.tsx`)과 **같은 20개 조**다.
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

export default function TermsEn({ view }: { view: 'current' | 'upcoming' }) {
  const pr = prText(view);
  const delivery = (
    <>
      As soon as payment is complete, you receive your license key and the installer. You can download them again at
      any time from the{' '}
      <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
        customer portal
      </a>
      , where you sign in with the email you bought with.
    </>
  );
  return (
    <ReadingShell lang="en" plate="s.ft.terms">
      <header className="max-w-3xl">
        <p className="lab">{pr ? 'You Name It' : 'You Name It AE Plugin'}</p>
        <InkTitle>Terms of Service</InkTitle>
        <p className="text-sm">Effective: {pr ? prDate('en') : policyDate('en')}</p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        {/* 고지 단계: 현재 판 위에는 개정 예정 띠, 예정본 위에는 현재 판으로 가는 띠. 시행 뒤에는 띠가 없다. */}
        <PolicyNotice lang="en" doc="terms" view={view} />
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className={H2}>1. Purpose</h2>
            {pr ? (
              <p>
                These Terms set out the rights, duties and responsibilities between {BUSINESS.name.en} (&quot;we&quot;,
                &quot;us&quot;) and you when you buy or download and use You Name It AE Plugin and You Name It PR Plugin (each, or
                together, the &quot;Product&quot;), which we make and sell.
              </p>
            ) : (
              <p>
                These Terms set out the rights, duties and responsibilities between {BUSINESS.name.en} (&quot;we&quot;,
                &quot;us&quot;) and you when you buy and use You Name It AE Plugin (the &quot;Product&quot;), which we make and
                sell.
              </p>
            )}
          </section>

          <section>
            <h2 className={H2}>2. Definitions</h2>
            <ol className={OL}>
              {pr
                ? <li>&quot;Product&quot; means You Name It AE Plugin, an extension for Adobe After Effects; You Name It PR Plugin, an extension and companion plugin for Adobe Premiere Pro; and their updates and the presets, scripts, style presets and documentation that come with them.</li>
                : <li>&quot;Product&quot; means You Name It AE Plugin, an extension for Adobe After Effects, together with its updates and the presets, scripts and documentation that come with it.</li>}
              <li>&quot;You&quot; means the person who bought or uses the Product under these Terms.</li>
              <li>&quot;License key&quot; means the unique string issued when you buy, used to activate the Product.</li>
              <li>&quot;Reseller&quot; means Polar Software Inc. (&quot;Polar&quot;), which takes payment and handles tax on our behalf as merchant of record.</li>
              {pr
                ? <li>&quot;Your work&quot; means the layers, keyframes, expressions, sequences, clips, captions, markers, renders and project files you make with the Product.</li>
                : <li>&quot;Your work&quot; means the layers, keyframes, expressions, renders and project files you make with the Product.</li>}
              {pr ? (
                <>
                  <li>&quot;Free Version&quot; means the features of the PR Plugin that you use without a license key, that is, the PR Plugin&apos;s free version under Section 3-2. It is downloaded as a free product on Polar.</li>
                  <li>&quot;Pro&quot; means the features of the PR Plugin that a license key unlocks.</li>
                  <li>&quot;Bundle&quot; means the AE Plugin and PR Plugin Pro sold together.</li>
                  <li>&quot;Pre-order&quot; means buying Pro before its features open, under Section 14-2.</li>
                  <li>&quot;Helper Program&quot; means a third-party program (for example, ffmpeg) that some features download from its official source to your computer the first time they are needed. Helper Programs are not part of the Product and are governed by their own licenses.</li>
                </>
              ) : null}
            </ol>
          </section>

          <section>
            <h2 className={H2}>3. Publication and Effect</h2>
            <ol className={OL}>
              <li>We publish these Terms where they can be reached from the front page of our website (younameit.works), and we will email you a copy on request.</li>
              {pr
                ? <li>These Terms take effect when you buy the Product or download the Free Version.</li>
                : <li>These Terms take effect when you buy the Product.</li>}
              <li>Anything these Terms do not cover is governed by applicable law and ordinary commercial practice.</li>
            </ol>
          </section>

          <section>
            <h2 className={H2}>3-2. Free Version</h2>
            <ol className={OL}>
              <li>
                The Product is also offered as a free version that you can download and use without buying. These Terms apply to
                you in the same way from the time you download and use the free version. Rights that come with a purchase, such
                as cancellation and refunds and free updates, apply only to people who bought the Product.
              </li>
              <li>
                Pro features open only with a license key you bought. Getting around the license check to use Pro features
                without a key is a prohibited use under Section 10.
              </li>
              <li>
                The free version is provided free of charge, <strong>&quot;as is&quot;, and its features may change, shrink or
                stop.</strong> What you bought stays under Sections 8 and 12, not this clause, and Section 17.4 applies to the
                free version in the same way.
              </li>
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
              {pr ? (
                <li>
                  The Product is a <strong>one-time purchase</strong>, not a subscription. The AE Plugin is {PRICE} USD, PR Plugin Pro is{' '}
                  {PR.price} USD, and the Bundle is {PR.bundlePrice} USD. The Free Version is downloaded without payment. Payment happens on
                  the checkout page of our reseller, Polar.
                </li>
              ) : (
                <li>
                  The Product is a <strong>one-time purchase</strong> of {PRICE} USD, not a subscription. Payment happens on the
                  checkout page of our reseller, Polar.
                </li>
              )}
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
              {pr ? (
                <>
                  <li>
                    <strong>Only one discount applies per checkout.</strong> If more than one discount applies, you get the larger one.
                    No other discount applies to the Bundle.
                  </li>
                  <li>
                    A PR Plugin Pro discount code given to an AE Plugin buyer works once per AE Plugin order,{' '}
                    <strong>is valid until {human(PR.aeCouponEnd, 'en')}</strong>, and may not be sold or passed to anyone else. It does
                    not apply to the Bundle.
                  </li>
                  <li>Time-limited prices such as the early-bird price apply as shown, with their dates, on our website and the checkout page.</li>
                  <li>
                    AE Plugin buyers receive the code in paragraph 6 on request, by sending us the email address they bought with or the
                    order number (for another store, aescripts, that order email). Buyers who agreed to receive promotional email may
                    receive it by email without a request.
                  </li>
                </>
              ) : null}
            </ol>
          </section>

          <section>
            <h2 className={H2}>7. Delivery</h2>
            {pr ? (
              <ol className={OL}>
                <li>{delivery}</li>
                <li>The Free Version is delivered as soon as the download completes, and you can download the installer again from the customer portal at any time.</li>
                <li>For a Pre-order, the license key is delivered as soon as payment completes, and the Pro features are delivered by the update that opens them, under Section 14-2.</li>
              </ol>
            ) : (
              <p>{delivery}</p>
            )}
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
              {pr ? (
                <>
                  <li>
                    For the Free Version, we grant you a non-exclusive, non-transferable license to use it free of charge for both
                    personal and commercial work. The Free Version has no limit on the number of computers, and Section 10 applies to
                    it in the same way.
                  </li>
                  <li>
                    If you buy the Bundle, you receive one Bundle-only license key that opens both plugins, and paragraph 1 applies to
                    that key. Each plugin on a computer activates the key once, so the Bundle key allows 4 activations (2 computers).
                  </li>
                  <li>
                    <strong>An AE Plugin license key does not unlock PR Plugin Pro, and a PR Plugin license key does not unlock the AE Plugin.</strong>
                  </li>
                </>
              ) : null}
            </ol>
          </section>

          <section>
            <h2 className={H2}>9. License Checks and Changing Computers</h2>
            <ol className={OL}>
              <li>
                The Product checks your license over the internet when you activate it and then <strong>once every 7 days</strong>.
                Without a connection, it keeps working for <strong>up to 30 days</strong>. What is sent during a check is described
                in {pr ? 'Sections 2.3 (AE Plugin) and 2.4 (PR Plugin)' : 'Section 2.3'} of our{' '}
                <a href="/privacy" className={LINK}>
                  Privacy Policy
                </a>
                .
              </li>
              <li>To move to a new computer, deactivate the old one in the customer portal or inside the Product, then activate on the new one.</li>
              {pr ? (
                <>
                  <li>
                    PR Plugin Pro locks if it cannot complete a check for 30 days after the last successful one, and opens again by itself
                    once it reconnects and the check completes. <strong>The Free Version features keep working regardless.</strong>
                  </li>
                  <li>A license key that has been refunded, or terminated under Section 18, locks at the Product&apos;s next check (at most 7 days later).</li>
                </>
              ) : null}
            </ol>
          </section>

          {pr ? (
            <>
              <section>
                <h2 className={H2}>9-2. How Edits Are Made and Undone</h2>
                <ol className={OL}>
                  <li>
                    The PR Plugin is built <strong>not to change or delete media files or project files</strong>. Features that reshape a
                    sequence work on a copy of the sequence or on new tracks, and features that act on clips you selected record their
                    prior state so you can undo from inside the Product.
                  </li>
                  <li>
                    Before applying an edit, the PR Plugin shows you a plan of what will change, and <strong>applies only what you approve</strong>.
                    The Chat feature works the same way.
                  </li>
                  <li>What the PR Plugin makes stays as ordinary clips, tracks, captions and keyframes in Premiere Pro, which you can freely change or delete.</li>
                  <li>Because results can differ from the plan, for example through errors in Premiere Pro itself, please save and back up your projects (Section 17.5).</li>
                </ol>
              </section>

              <section>
                <h2 className={H2}>9-3. Key Automation</h2>
                <ol className={OL}>
                  <li>
                    Key automation is a feature in which the PR Plugin presses Premiere Pro keyboard shortcuts for actions that Premiere
                    Pro offers no programmatic way to run. <strong>It is off by default and works only after you switch it on in Settings.</strong>
                  </li>
                  <li>
                    The PR Plugin reads your keyboard shortcut file and never changes it. Before running, it checks that Premiere Pro is in
                    front; afterwards, it checks the result; if a check fails, it stops and tells you.
                  </li>
                  <li>On macOS it needs Accessibility permission, which you grant and revoke yourself in the system settings.</li>
                </ol>
              </section>
            </>
          ) : null}

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
              {pr ? <li>The update that opens the Pro features for Pre-order customers is free.</li> : null}
            </ol>
          </section>

          {pr ? (
            <section>
              <h2 className={H2}>12-2. Remote Switch-Off of Features</h2>
              <ol className={OL}>
                <li>
                  If a Premiere Pro update or a defect in the Product creates a confirmed risk that a PR Plugin feature could damage your
                  projects, we may switch <strong>that feature alone</strong> off remotely through the update information file. The remote
                  switch is used only to turn features off, never to turn on a feature the Product does not contain.
                </li>
                <li>When we switch a feature off, the Product shows that it is off and why, and we switch it back on once the problem is fixed.</li>
                <li>
                  <strong>
                    If a Pro feature remains unavailable because of a remote switch-off for more than 30 days, you may request a refund
                    even after the period in Section 15.
                  </strong>{' '}
                  For the Bundle, the whole Bundle is refunded under Section 15.6.
                </li>
              </ol>
            </section>
          ) : null}

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
              {pr ? (
                <>
                  <li>
                    Caption speech recognition in the PR Plugin works only if you enter your own ElevenLabs API key, and{' '}
                    <strong>you pay ElevenLabs directly for that use.</strong> What is sent from your computer to ElevenLabs for speech
                    recognition is described in Section 2 of the Privacy Policy.
                  </li>
                  <li>Helper Programs are downloaded by the Product from their official source to your computer and are governed by their own licenses. We do not redistribute Helper Programs.</li>
                  <li>The installer script uses Adobe&apos;s installer (Unified Plugin Installer Agent), which is governed by Adobe&apos;s terms.</li>
                </>
              ) : null}
            </ol>
          </section>

          <section>
            <h2 className={H2}>14. System Requirements</h2>
            <p>
              {pr ? 'The AE Plugin requires' : 'The Product requires'} Adobe After Effects 2022 or later on Windows or macOS. Depth Pass does not run on
              Intel-based Macs. Please check the requirements before you buy. Problems on a setup that does not meet them are
              still covered by the refund period in Section 15.
            </p>
            {pr ? (
              <p className="mt-2">
                The PR Plugin requires Adobe Premiere Pro {PR.minPremiere} or newer running on Windows or macOS, and the Adobe Creative
                Cloud desktop app for installation. The operating systems and Premiere Pro versions we tested are listed in the specs on
                our website. Problems in an environment that does not meet the requirements can still be refunded within the period in
                Section 15.
              </p>
            ) : null}
          </section>

          {pr ? (
            <section>
              <h2 className={H2}>14-2. Pre-orders</h2>
              <ol className={OL}>
                <li>
                  Before the Pro features pass our completion criteria, we may sell Pro as a Pre-order. In that case the product page and
                  checkout state{' '}
                  <strong>that it is a Pre-order, what you receive now (the Free Version and a license key), and which features open later in an update</strong>.
                </li>
                <li>
                  Pre-order customers receive a license key at payment and use the Pro features with the same key once the update that
                  opens them is released. There is no extra charge.
                </li>
                <li>When we set the date on which the Pro features open, we tell you by email at the address you bought with.</li>
                <li>
                  <strong>
                    Pre-order customers may cancel and receive a full refund, with no reason needed, at any time before the Pro features
                    open and within 14 days from the day they open.
                  </strong>
                </li>
                <li>
                  <strong>
                    If the Pro features have not opened by {human(PR.preorderDeadline, 'en')}, we refund every Pre-order in full without
                    waiting for a request.
                  </strong>{' '}
                  The license key is then terminated, and the Free Version keeps working.
                </li>
                <li>
                  The Pre-order price is the early-bird price shown at checkout ({PR.earlyPrice} USD), and it stays until the Pro features
                  open. Once they open, we sell at that price for {PR.openEarlyDays} days from the opening day.
                </li>
              </ol>
            </section>
          ) : null}

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
              {pr ? (
                <>
                  <li>Cancellation of a Pre-order follows Section 14-2.4.</li>
                  <li>
                    <strong>The Bundle is refunded only as a whole, never one plugin on its own.</strong> Refunding the Bundle terminates
                    the Bundle license key in both plugins.
                  </li>
                </>
              ) : null}
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
              {pr
                ? <li>Please save and back up your After Effects and Premiere Pro projects regularly.</li>
                : <li>Please save and back up your After Effects projects regularly.</li>}
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
            {pr ? (
              <p>
                These Terms apply from {prDate('en')} (posted {prPostedDate('en')}). They add the You Name It PR Plugin to the Terms in
                force since {policyDate('en')}: Sections 1, 2, 3, 6, 7, 8, 9, 12, 13, 14, 15 and 17 change, and Sections 9-2, 9-3, 12-2
                and 14-2 are new.
              </p>
            ) : (
              <p>
                These Terms apply from {policyDate('en')}. They add Section 3-2 (Free Version) to the Terms in force since September 30,
                2026; nothing else changes.
              </p>
            )}
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
            {FTC_BIZ_URL ? (
              <p className="mt-2">
                <a href={FTC_BIZ_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Verify business information (Korea Fair Trade Commission)
                </a>
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
