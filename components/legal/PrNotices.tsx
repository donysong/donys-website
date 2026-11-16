import type { ReactNode } from 'react';
import ReadingShell, { InkTitle } from '@/components/ReadingShell';
import { t } from '@/lib/copy';
import { loadPrNotices, type NoticeBlock } from '@/lib/notices';

/* `/pr/notices` · `/ko/pr/notices` — third-party license notices of the You Name It PR Plugin (PRD §8).
   The body is the plugin's own `THIRD-PARTY-NOTICES.md`, copied into `content/pr/` and drawn by `lib/notices.ts`; its re-copy
   rule is in that file's header. Only this page's chrome (title, intro) is localized — the license texts are English in both
   locales, exactly as their authors published them (a translated license is not the license). Chrome strings = `lib/copy/pr.ts`
   (`pr.legal.notices`, `pr.notices.*`), as for the other `/pr` strings.
   The file's own `#` title is not drawn: this page's title is the localized one above it. Everything else in the file is. */

const H2 = 'mt-10 mb-3 text-lg font-semibold text-[var(--text-primary)]';
const H3 = 'mt-8 mb-2 text-base font-semibold text-[var(--text-primary)]';
const H4 = 'mt-6 mb-2 text-[15px] font-semibold text-[var(--text-primary)]';
const LINK = 'text-[var(--text-primary)] underline underline-offset-4 font-semibold [overflow-wrap:anywhere]';
const CODE = 'rounded-[3px] bg-[rgba(13,42,56,.07)] px-1 font-mono text-[0.88em] [overflow-wrap:anywhere]';

/* `code` · <https://autolink> · ~~struck~~ — the only inline forms the file uses. Anything else is drawn as plain text. */
const INLINE = /(`[^`\n]+`|<https?:\/\/[^>\s]+>|~~.+?~~)/g;
function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith('`')) return <code key={i} className={CODE}>{part.slice(1, -1)}</code>;
    if (part.startsWith('<http')) {
      const url = part.slice(1, -1);
      return <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={LINK}>{url}</a>;
    }
    if (part.startsWith('~~')) return <del key={i}>{inline(part.slice(2, -2))}</del>;
    return part;
  });
}

function Block({ b }: { b: NoticeBlock }) {
  switch (b.kind) {
    case 'heading': {
      const Tag = b.level <= 2 ? 'h2' : b.level === 3 ? 'h3' : 'h4';
      return <Tag className={b.level <= 2 ? H2 : b.level === 3 ? H3 : H4}>{inline(b.text)}</Tag>;
    }
    case 'code':
      /* a license text: the lines as they are. `pre-wrap` only changes where a long line breaks on screen, not the text. */
      return <pre className="mt-3 border border-[var(--line-strong)] bg-[rgba(13,42,56,.04)] p-4 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]">{b.text}</pre>;
    case 'table':
      return (
        <div className="mt-3 overflow-x-auto" tabIndex={0}>
          <table className="w-full border-collapse text-left text-[13.5px] leading-snug">
            <thead>
              <tr>{b.head.map((c, i) => <th key={i} className="border-b-2 border-[var(--line-strong)] py-2 pr-4 align-bottom font-semibold">{inline(c)}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} className="border-b border-[var(--line)] py-2 pr-4 align-top [overflow-wrap:anywhere]">{inline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul';
      return <Tag className={`mt-3 space-y-1.5 pl-6 ${b.ordered ? 'list-decimal' : 'list-disc'}`}>{b.items.map((s, i) => <li key={i}>{inline(s)}</li>)}</Tag>;
    }
    case 'para':
      return <p className="mt-3">{inline(b.text)}</p>;
  }
}

export default function PrNotices({ lang }: { lang: 'en' | 'ko' }) {
  /* skip the file's own H1 (see the header) */
  const blocks = loadPrNotices().filter((b, i) => !(i === 0 && b.kind === 'heading' && b.level === 1));
  return (
    <ReadingShell lang={lang} plate="pr.legal.notices" prFooter>
      <header className="max-w-3xl">
        <p className="lab">You Name It PR Plugin</p>
        <InkTitle>{t(lang, 'pr.legal.notices')}</InkTitle>
        <p className="text-sm">{t(lang, 'pr.notices.intro')}</p>
      </header>
      {/* T3 — a long reading page sits on paper, not on the blue field. `.p3 a` removes underlines, so restore them. */}
      <div className="sheet mt-10 max-w-3xl [--m:1] [&_a]:underline!">
        <div className="text-[15px] leading-relaxed text-[var(--text-secondary)] [&>:first-child]:mt-0">
          {blocks.map((b, i) => <Block key={i} b={b} />)}
        </div>
      </div>
    </ReadingShell>
  );
}
