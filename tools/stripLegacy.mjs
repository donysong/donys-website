/* Cloudflare 업로드에서만 레거시 봉투를 뺀다 — `out/` 을 고치고 `public/` 은 안 건드린다.

   🔴 왜 지우면 안 되고 "빼야" 하는가 (2026-09-20 실측):
     `donys-website.vercel.app` 은 얼어붙은 스냅샷이 아니라 **이 repo 를 지금도 빌드하는 살아있는
     미러**다(홈 타이틀이 당일 커밋 내용과 일치). v2.5.0 이하 설치본의 `UPDATE_MANIFEST_URL` 이
     그 호스트로 컴파일돼 있어서 `public/{donys.zxp,version.json}` 을 repo 에서 지우면
     구버전 유저 업데이트가 **조용히** 죽는다(`updateCheck.ts` 가 404 를 `return null` 로 먹는다).
     존치 시한 = 2027-03-15 (`CLAUDE.md` Cloudflare 규약).

   🔴 그럼 왜 Cloudflare 에선 빼는가 (오너 판정 2026-09-20):
     `younameit.works/donys.zxp` 에 **v2.5.0 봉투가 공개로 서빙**되고 있었다. 사이트 코드 참조는
     0 이지만 *"위험 낮음과 공개돼 있음은 다른 문장"* 이다. 현행 배포 경로는
     `dl.younameit.works`(R2) 뿐이고 **younameit.works/version.json 을 보는 클라이언트는 없다**(실측).
     → 신 호스트에서만 내리고, 옛 북마크는 `public/_redirects` 가 제품 페이지로 보낸다. */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
const LEGACY = ['donys.zxp', 'version.json'];

if (!fs.existsSync(OUT)) {
  console.error('out/ 이 없다 — `npm run build` 를 먼저 돌려라.');
  process.exit(1);
}

let n = 0;
for (const f of LEGACY) {
  const p = path.join(OUT, f);
  if (fs.existsSync(p)) {
    const size = fs.statSync(p).size;
    fs.unlinkSync(p);
    console.log(`  뺐다  out/${f}  ${size.toLocaleString()} B`);
    n++;
  } else {
    console.log(`  없음  out/${f}`);
  }
}

/* public/ 쪽은 살아 있어야 한다 — 여기서 죽으면 Vercel 계약이 끊긴 것이다. */
const missing = LEGACY.filter((f) => !fs.existsSync(path.join(process.cwd(), 'public', f)));
if (missing.length) {
  console.error(`\n🔴 public/ 에서 사라졌다: ${missing.join(', ')}`);
  console.error('   Vercel 레거시 업데이트 계약이 끊긴다 — 되살려라 (2027-03-15 까지 존치).');
  process.exit(1);
}

console.log(`[strip] Cloudflare 업로드에서 레거시 ${n}건 제외 · public/ 원본 유지 확인`);
