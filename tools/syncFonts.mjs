// syncFonts.mjs — 원스토어 ONE 모바일고딕(본문 Regular·Bold + 제목체) 공식 OTF 를 빌드 전에 준비한다.
// 🔴 이 사이트 repo 는 공개다. 라이선스(원스토어 · https://www.onestorecorp.com/sv/fordev_font/): 상업 이용·웹사이트 탑재(임베딩) 가능,
//    **글꼴 파일의 수정·재배포 금지** → 파일을 git 에 올리지 않는다(.gitignore `assets/fonts/one-mobile/`).
//    변환(woff2·서브셋)도 안 한다 — 공식 zip 의 OTF 를 그대로 탑재한다(next/font/local 이 해시 이름으로 굽는다).
// + GS 혜자로운 Bold(GS리테일 · https://hyejaroun.com) — 국문 빨간 잉크 판 제목 전용(오너 2026-10-26). 웹폰트 탑재 허용 · 수정·재배포 금지 · BI/CI(브랜드명·슬로건) 용도 금지.
// 순서: assets/fonts/one-mobile/ 에 이미 있으면 그대로 · 없으면 공식 zip 두 개를 받아 `tar -xf` 로 푼다(윈10+ · 맥 bsdtar 둘 다 zip 을 푼다).
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dst = join(root, 'assets/fonts/one-mobile');
const FILES = { 'ONE Mobile OTF Regular.otf': 'ONE Mobile Regular.zip', 'ONE Mobile OTF Bold.otf': 'ONE Mobile Regular.zip', 'ONE Mobile Title OTF.otf': 'ONE Mobile Title.zip' };
const BASE = 'https://www.onestorecorp.com/assets/fonts/';
mkdirSync(dst, { recursive: true });
const need = Object.keys(FILES).filter((f) => !existsSync(join(dst, f)));
if (need.length) {
  const work = mkdtempSync(join(tmpdir(), 'onemobile-'));
  for (const zip of new Set(need.map((f) => FILES[f]))) {
    const res = await fetch(BASE + encodeURIComponent(zip));
    if (!res.ok) { console.error(`✗ ${zip} 받기 실패 ${res.status}`); process.exit(1); }
    const zp = join(work, zip);
    writeFileSync(zp, Buffer.from(await res.arrayBuffer()));
    execFileSync('tar', ['-xf', zp, '-C', work]);
  }
  for (const f of need) {
    const from = join(work, f);
    if (!existsSync(from)) { console.error(`✗ ${f} 가 공식 zip 에 없다 — 원스토어 배포본이 바뀌었는지 확인`); process.exit(1); }
    copyFileSync(from, join(dst, f));
  }
}
const HJ = join(root, 'assets/fonts/one-mobile/GSHYEJAROUN-Bold.otf');
if (!existsSync(HJ)) {
  const res = await fetch('https://hyejaroun.com/public/downloads/gs-hyejaroun/GSHYEJAROUN-Bold.otf');
  if (!res.ok) { console.error(`✗ GS 혜자로운 받기 실패 ${res.status}`); process.exit(1); }
  writeFileSync(HJ, Buffer.from(await res.arrayBuffer()));
}
console.log(`ONE 모바일고딕 ${Object.keys(FILES).length}개 준비 → assets/fonts/one-mobile/ (git 에 안 올라간다)`);
