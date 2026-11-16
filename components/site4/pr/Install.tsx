'use client';
/* 07 Install — 🔴 the `#install` anchor is a destination for incoming links (cover circle · FAQ q12 · spec 3 · footer · the
   `README.txt` in the download). Source = PR repo `gtm/site/pr-install.md` (one installer script, manual route if it fails).
   Layout = the Docs install vocabulary (`.howto` columns + `.byhand` fold), which v5 keeps.
   macOS (variant `launch/pr-v5e`, owner 2026-11-16: Windows and macOS ship together): four steps taken from the Mac bundle's own README
   (`younameit-pr-<v>-mac.zip`; route 1 = the free ZXP Installer with the `.zxp`, route 2 = `Install You Name It PR.command`, in that order because the
   `.command` is not notarized and macOS 26.6 warns on it; Mac session 2026-11-16; same order as `scripts/release/bundle-installer.mjs` `readmeText`). The Windows-only variant `launch/pr-v5d`
   has one "not yet" line here instead.
   Install steps may instruct (VOICE_AND_TERMS §1).

   🔴 Lines not yet confirmed on a clean PC / Mac (D20) — check them before release:
     win.li3     the actual warning text and button name
     mac.li4     the Gatekeeper wording and System Settings names as macOS shows them (the README text; the Mac session did not record the exact wording)
     first.li1   the KO menu names (Korean Premiere: 창 ▸ 확장명)
     update.li2  whether the CEP extension shows in Creative Cloud's plugin list
   `PR.companion = false` → the `.ccx` lines (win.li4 · win.li5 · manual.li2 · manual.li3) give way to the `*.nocx` lines. The Mac steps never name the companion;
   if `PR.companion` turns true, the Mac bundle needs `--ccx` too and a Mac line for the untrusted-developer warning (like win.li5). */
import { Html, useT } from '@/components/site3p/lang';
import { PR } from '@/lib/product';
import Head from './Head';

const CX = PR.companion as boolean;

export default function Install() {
  const { t } = useT();
  const li = (k: string) => <li key={k} dangerouslySetInnerHTML={{ __html: t(k) }} />;
  const win = ['pr.inst.win.li1', 'pr.inst.win.li2', 'pr.inst.win.li3', CX ? 'pr.inst.win.li4' : 'pr.inst.win.li4.nocx', ...(CX ? ['pr.inst.win.li5'] : [])];
  const manual = ['pr.inst.manual.li1', ...(CX ? ['pr.inst.manual.li2', 'pr.inst.manual.li3'] : ['pr.inst.manual.li3.nocx'])];
  return (
    <section id="install" data-plate="07" data-name="pr.plate.install">
      <div className="sec tight">
        <Head no="07" stone={6} k="pr.inst.h" tag="pr.inst.tag" />
        <div className="howto pr-inst">
          <div>
            <h3>{t('pr.inst.before.h')}</h3>
            <ul>{[1, 2, 3].map((n) => li(`pr.inst.before.li${n}`))}</ul>
          </div>
          <div>
            <h3>{t('pr.inst.win.h')}</h3>
            <ol>{win.map(li)}</ol>
          </div>
          <div>
            <h3>{t('pr.inst.mac.h')}</h3>
            <ol>{[1, 2, 3, 4].map((n) => li(`pr.inst.mac.li${n}`))}</ol>
          </div>
        </div>
        <div className="howto pr-inst">
          <div>
            <h3>{t('pr.inst.first.h')}</h3>
            <ul>{[1, 2, 3, 4, 5].map((n) => li(`pr.inst.first.li${n}`))}</ul>
          </div>
          <div>
            <h3>{t('pr.inst.pro.h')}</h3>
            <ol>{[1, 2, 3, 4].map((n) => li(`pr.inst.pro.li${n}`))}</ol>
          </div>
          <div>
            <h3>{t('pr.inst.update.h')}</h3>
            <ul>{[1, 2, 3].map((n) => li(`pr.inst.update.li${n}`))}</ul>
          </div>
        </div>
        <details className="byhand">
          <summary data-cur>
            <span className="h">{t('pr.inst.manual.h')}</span>
            <span className="pm" aria-hidden="true">+</span>
          </summary>
          <Html k="pr.inst.manual.p" as="p" className="byhand-d" />
          <div className="howto pr-one">
            <div><ol>{manual.map(li)}</ol></div>
          </div>
        </details>
      </div>
    </section>
  );
}
