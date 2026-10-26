import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import PolicyNotice from '@/components/PolicyNotice';
import { BUSINESS } from '@/lib/product';
import { GA_ITEMS } from '@/lib/googleTransfer';
import { ANALYTICS_NOTICE, analyticsDate, policyDate, revisedText } from '@/lib/policy';

/* 방침 본문 — `/privacy`(현재 판)와 `/privacy/upcoming`(개정 예정본)이 **같은 본문**을 그린다. `rev`(동의 기반 방문 통계 조항을 싣는가)가 거짓이면 10-23 판 그대로다.
   국문판(`components/legal/PrivacyKo.tsx`)과 **사실이 같아야 한다**. 설계서 ANALYTICS_PLAN §12 ③. */
/* 🔴 **법 문서는 출고본과 대조해서 고친다** (2026-09-26 — 처음 대조했더니 §2.3 이 출고본과 반대 말을 했다:
   *"렌더된 프레임은 업로드되지 않는다"* 인데 Chat 의 코어 툴 `previewFrame` 이 컴프를 PNG 로 렌더해 모델에 보낸다).
   §2.3 의 목록은 **플러그인 출고 태그의 네트워크 호출 전수**다 — 대조 명령:
     git -C ../Dony-s-AE-Plugin grep -ohE "https://[a-zA-Z0-9._-]+" v<VERSION> -- donys/src | sort -u
   호스트가 늘면 여기 항목과 §4 를 같이 고치고 개정일을 올려라(§8 이 스스로 약속한 것이다).
   조항 구조·책임 문구는 오너 사안이다 — 사실만 고친다. */
export default function PrivacyEn({ view }: { view: 'current' | 'upcoming' }) {
  const rev = revisedText(view);
  return (
    <ReadingShell lang="en" plate="s.ft.privacy">
      <header className="max-w-3xl">
        <p className="lab">You Name It AE Plugin</p>
        <InkTitle>Privacy Policy</InkTitle>
        <p className="text-sm">
          Last updated: {policyDate('en')}
          {rev ? <> · consent-based visit statistics take effect {analyticsDate('en')}</> : null}
        </p>
      </header>
      {/* T3 — 긴 읽는 면은 파란 대지가 아니라 종이 위다. `.p3 a` 가 밑줄을 지우므로 important 로 되살린다. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        {/* 고지 단계: 현재 판 위에는 개정 예정 띠, 예정본 위에는 현재 판으로 가는 띠. 켠 뒤(개정본이 현재 판)에는 띠가 없다. */}
        {ANALYTICS_NOTICE ? <PolicyNotice lang="en" view={view} /> : null}
        <div className="space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">1. Introduction</h2>
            <p>
              You Name It (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your
              privacy. This Privacy Policy explains how we collect, use, and protect your
              information when you visit our website (younameit.works) or download, buy and use
              You Name It AE Plugin.
            </p>
            <p className="mt-2">
              We are a sole proprietorship registered in the Republic of Korea ({BUSINESS.name.en} · CEO {BUSINESS.ceo.en} ·
              {' '}{BUSINESS.address.en} · Business Registration No. {BUSINESS.regNo}), and we handle personal data under
              Korea&apos;s Personal Information Protection Act. A Korean version of this policy is at{' '}
              <a href="/ko/privacy">/ko/privacy</a>.
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
            <p className="mt-2">
              <strong>Free download.</strong> If you ask for the free version, we collect your email address, the time you asked
              and your language. You confirm with the button in the email we send, and the download link opens only then. We use
              them to send the link, to keep a list of free-version users, and to send notices you need to use the Product
              (security and updates, not advertising).
            </p>

            <h3 className="mb-2 mt-4 text-[15px] font-semibold text-[var(--text-primary)]">
              2.2 Automatically Collected Information
            </h3>
            <p>{rev ? 'Our website uses Cloudflare Web Analytics by default, and Google Analytics only if you accept:' : 'Our website uses one analytics service:'}</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Cloudflare Web Analytics</strong> — cookieless. It does not set cookies
                and does not create a cross-site identifier.
              </li>
              {rev ? (
                <li>
                  <strong>Google Tag Manager and Google Analytics 4 (Google LLC, United States) — only if you accept.</strong> You can
                  accept or reject on the banner the first time you visit, and change your choice any time from “Cookie settings” at the
                  bottom of every page. Until you accept, nothing is requested from Google. If you accept, we send Google:{' '}
                  {GA_ITEMS.en.charAt(0).toLowerCase() + GA_ITEMS.en.slice(1)}. The cookies (_ga, _ga_*) last up to 2 years. We do not send your name, email address or anything you type, and we remove
                  the confirmation or unsubscribe token from the address before sending it. The purpose is visit statistics to improve the
                  site; we do not use it for advertising and we do not turn on Google signals or ad personalization. Your consent is the
                  legal basis, and for the transfer to the United States, your separate consent. Rejecting changes nothing about how the
                  site works.
                </li>
              ) : null}
            </ul>
            <p className="mt-2">
              {rev ? 'Except for Google Analytics when you accept, the' : 'The'} website serves every file, fonts included, from our own domain; your browser is not sent to other
              companies&apos; servers. We do not collect your name, email address, or anything you type through analytics.
              However, IP addresses are treated as personal data under the GDPR and similar laws,
              so we do not claim this analytics data is fully anonymous.
            </p>
            <p className="mt-2">
              Buttons marked Pro inside the plugin open a page on this website (/go/pro), which forwards you to the pricing
              section. We count those clicks <strong>in aggregate only</strong> — which feature&apos;s button was pressed and the
              language of the page. The count holds no IP address, browser details, cookie or other identifier. The request itself
              is handled by our host like any other page visit.
            </p>

            <h3 className="mb-2 mt-4 text-[15px] font-semibold text-[var(--text-primary)]">
              2.3 Plugin Data
            </h3>
            <p>
              The plugin does its actual work — creating layers, effects, and keyframes —
              entirely on your machine, and it never uploads your project file. There are seven
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
                and no usage data. When you choose to install an update, the new version is
                downloaded from the same host.
              </li>
              <li>
                <strong>The Chat panel.</strong> When you use Chat, the plugin runs the AI tool you
                chose — Anthropic&apos;s Claude Code or OpenAI&apos;s Codex —{' '}
                <strong>using your own Claude or ChatGPT account</strong>, and sends it what it needs
                to answer you: your messages; the structure of the composition you are working on —
                layer names, effect and property values, and similar metadata; any images you attach;
                and still frames it renders from the composition, or takes from a reference video you
                give it, to check its work. We do not receive or store any of this; it goes from your
                machine to Anthropic or OpenAI directly.
              </li>
              <li>
                <strong>One-time downloads of helper programs.</strong> Some features fetch a free
                helper program the first time they need it and keep it on your machine: Depth Pass
                downloads its runtime and depth model from our download host; GIF Converter downloads
                FFmpeg and Gifsicle from GitHub; Chat tools that read video frames download FFmpeg
                from its public build sites (evermeet.cx on macOS, GitHub or gyan.dev on Windows).
                Like any web request, this reveals your IP address and the time of the request to that
                host. It carries no license key, no account, and no project data.
              </li>
              <li>
                <strong>Stock asset search, only if you set it up.</strong> If you enter your own
                API keys for Pexels, Giphy, or Freesound, searches you run go to those services
                under your own account. Leave the keys empty and no request is ever made.
              </li>
              <li>
                <strong>Voice in Chat, only if you set it up.</strong> If you enter your own
                ElevenLabs API key, the text you ask Chat to turn into speech, and the audio you ask
                it to transcribe, go to ElevenLabs under your own account. Leave the key empty and no
                request is ever made.
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
              <li>To provide customer support, including cancellations and refunds</li>
              <li>To keep the transaction records the law requires (see Section 5)</li>
              <li>
                To send service notices about your purchase or your free download, such as updates, security, license and refund
                notices. These are not advertising.
              </li>
              <li>
                To send the free-version download link and keep a list of free-version users. We store your email address, the
                time you asked and your language with Resend for 3 years after the last notice email we send to that address, or until you
                ask us to delete them if that comes first. Downloading the free version does
                not by itself get you promotional email.
              </li>
              <li>
                To send our newsletter, <strong>only to people who opted in</strong> on the{' '}
                <a href="/newsletter">Newsletter</a> page, or in the optional box on the free-download form, and confirmed by email. We store your email address, the time you
                agreed and your language with Resend until you withdraw; when you do, we email you the result and delete them.
                We confirm your consent every two years, mark every newsletter as promotional, and include a free unsubscribe
                link.
              </li>
              {rev ? (
                <li>
                  To count visits to the website — with Cloudflare’s cookieless analytics, and with Google Analytics only if you accept
                  (Section 2.2).
                </li>
              ) : null}
            </ul>
            <p className="mt-2">
              We do not sell, rent, or share your personal information with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">4. Third-Party Services</h2>
            <p>
              We use the following third-party services. Most of them process data in the United States; we transfer data to
              them only as needed to sell and support the Product{rev ? ' — and, if you accept Google Analytics, to send visit statistics to Google (Section 2.2)' : ''} (details, including each recipient&apos;s contact, are in the
              Korean version, Article 7). If you ask for the free download, the confirmation email also tells you about the
              transfer to Resend: the recipient, the country, when and how, the purpose, how long it is kept, and how to refuse
              and what happens if you do.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Polar</strong> — payment processing, merchant of record, and license
                management. Their privacy policy is available at{' '}
                <a
                  href="https://polar.sh/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
                >
                  polar.sh/legal/privacy
                </a>
                .
              </li>
              <li>
                <strong>Anthropic</strong> — powers the Chat panel when you choose Claude Code,
                under your own Claude account, and receives the data described in 2.3. Their privacy policy is
                available at{' '}
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
                >
                  anthropic.com/legal/privacy
                </a>
                .
              </li>
              <li>
                <strong>OpenAI</strong> — powers the Chat panel when you choose Codex, under your
                own ChatGPT account, and receives the data described in 2.3. Their privacy policy is
                available at{' '}
                <a
                  href="https://openai.com/policies/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
                >
                  openai.com/policies/privacy-policy
                </a>
                .
              </li>
              <li>
                <strong>Cloudflare</strong> — website hosting, DNS, CDN, download hosting, processing free-download requests, receiving and
                forwarding email sent to support@younameit.works, and cookieless web analytics. Their privacy policy is available at{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
                >
                  cloudflare.com/privacypolicy
                </a>
                .
              </li>
              <li>
                <strong>Google (Gmail)</strong> — stores the support email you send us, where we read and
                answer it. Their privacy policy is available at{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
                >
                  policies.google.com/privacy
                </a>
                .
              </li>
              {rev ? (
                <li>
                  <strong>Google Tag Manager and Google Analytics</strong> — visit statistics, only if you accept (Section 2.2). Their privacy
                  policy is available at{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
                  >
                    policies.google.com/privacy
                  </a>
                  .
                </li>
              ) : null}
              <li>
                <strong>Resend (Plus Five Five, Inc.)</strong> — sends our email replies to you, sends the free-version download
                link and keeps the list of free-version users, and keeps the newsletter subscriber list and sends the newsletter
                if you subscribed. Their privacy
                policy is available at{' '}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
                >
                  resend.com/legal/privacy-policy
                </a>
                .
              </li>
              <li>
                <strong>Pexels, Giphy, Freesound</strong> — asset search, and only if you supply
                your own API keys for them.
              </li>
              <li>
                <strong>ElevenLabs</strong> — text-to-speech and speech-to-text in Chat, and only if
                you supply your own API key. Their privacy policy is available at{' '}
                <a
                  href="https://elevenlabs.io/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
                >
                  elevenlabs.io/privacy-policy
                </a>
                .
              </li>
              <li>
                <strong>GitHub, evermeet.cx, gyan.dev</strong> — host the free helper programs
                (FFmpeg, Gifsicle) that some features download once, as described in 2.3.
              </li>
              <li>
                <strong>Vercel</strong> — serves update checks to installs of version 2.5.0 and
                earlier, from this website&apos;s previous address. It is scheduled to be retired
                after March 15, 2027. Their privacy policy is available at{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] underline underline-offset-4 font-semibold"
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
              support and product updates, and delete it when you ask, except for the records Korean e-commerce law
              requires us to keep for a fixed period:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Records of advertising and product descriptions: 6 months</li>
              <li>Records of contracts and cancellations: 5 years</li>
              <li>Records of payment and delivery: 5 years</li>
              <li>Records of complaints and dispute handling: 3 years</li>
            </ul>
            <p className="mt-2">
              We keep those records separately and delete them when the period ends.
            </p>
            <p className="mt-2">
              Free-download information (email address, time and language) is deleted 3 years after the last notice email (the
              download link, or a notice you need to use the Product) we sent to that address. If you ask us to delete it sooner,
              we delete it without delay, and if you withdraw from the newsletter, we also delete the free-download record for
              the same address. An address that still receives the newsletter follows the newsletter rule in Section 3 (until you
              withdraw).
            </p>
            {rev ? (
              <p className="mt-2">
                Visit statistics sent to Google Analytics (only if you accept): Google keeps event data for 14 months, and the cookies
                (_ga, _ga_*) expire after up to 2 years. If you withdraw your consent we delete the cookies in your browser and stop
                sending, but data already sent stays at Google for that period.
              </p>
            ) : null}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Ask us to stop processing it</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, email us at{' '}
              <a href="mailto:support@younameit.works" className="text-[var(--text-primary)] underline underline-offset-4 font-semibold">
                support@younameit.works
              </a>
              {' '}from the address you bought with or used for the free download. We give you access <strong>within 10 days</strong> and handle
              correction, deletion and stop requests without delay. We cannot delete the records the law requires us to keep
              (Section 5) until their period ends.
            </p>
            {rev ? (
              <p className="mt-2">
                You can withdraw your analytics consent at any time from “Cookie settings” at the bottom of every page. Visit
                statistics are recorded only under a cookie identifier, so we cannot find a particular person’s record unless you tell us
                the value of your _ga cookie.
              </p>
            ) : null}
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
              We may update this Privacy Policy from time to time. We post changes on this page at least 7 days before they
              take effect, or at least 30 days before if they are less favorable to you, in which case we also email you.
              {rev ? <> The parts about consent-based visit statistics (Google Analytics) take effect on {analyticsDate('en')}; the rest of this policy takes effect on {policyDate('en')}.</> : null}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-[var(--text-primary)]">9. Contact</h2>
            <p>
              For privacy-related questions, contact our privacy officer, {BUSINESS.ceo.en} (CEO), at{' '}
              <a href="mailto:support@younameit.works" className="text-[var(--text-primary)] underline underline-offset-4 font-semibold">
                support@younameit.works
              </a>
              {BUSINESS.phone ? <> or {BUSINESS.phone}</> : null}.
            </p>
          </section>
        </div>
      </div>
    </ReadingShell>
  );
}
