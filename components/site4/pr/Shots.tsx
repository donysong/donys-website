'use client';
/* `/pr` screens — four pictures of the real panel under the cover (owner 2026-11-16: "the site has no image at all, shoot the real product").
   Source = the product's own panels rendered in a browser on a sample sequence ("Interview 01"), not Premiere windows; `pr.shots.note` says so.
   Files = `public/pr/shot-<tools|silence|captions|chat>-<en|ko>.webp` (the UI language follows the page). Release-flag render: no tool that ships off appears.
   Unnumbered on purpose: the plates stay 01–07. */
import { useT } from '@/components/site3p/lang';

const SHOTS = [
  { id: 'tools', w: 680, h: 1000 },
  { id: 'silence', w: 724, h: 1430 },
  { id: 'captions', w: 724, h: 992 },
  { id: 'chat', w: 680, h: 1280 },
] as const;

export default function Shots() {
  const { t, lang } = useT();
  return (
    <section className="pr-shots" aria-label={t('pr.shots.note')}>
      <div className="sec tight">
        <ul>
          {SHOTS.map((s) => (
            <li key={s.id}>
              <figure>
                <img src={`/pr/shot-${s.id}-${lang}.webp`} alt={t(`pr.shots.${s.id}`)} width={s.w} height={s.h} loading="lazy" decoding="async" />
                <figcaption>{t(`pr.shots.${s.id}`)}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="pr-shots-note">{t('pr.shots.note')}</p>
      </div>
    </section>
  );
}
