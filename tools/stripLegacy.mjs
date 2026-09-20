/* Cloudflare 업로드에서만 레거시 봉투를 뺀다 — `out/` 을 고치고 `public/` 은 안 건드린다.

   🔴 왜 지우면 안 되고 "빼야" 하는가:
     v2.5.0 이하 설치본의 `UPDATE_MANIFEST_URL` 이 `donys-website.vercel.app` 으로 **컴파일돼
     있다**. `public/{donys.zxp,version.json}` 을 repo 에서 지우면 그 호스트가 파일을 잃고
     구버전 유저 업데이트가 **조용히** 죽는다(`updateCheck.ts` 가 404 를 `return null` 로 먹는다).
     존치 시한 = 2027-03-15 (`CLAUDE.md` Cloudflare 규약).

   ⚠️ **정정 (2026-09-20 저녁).** 이 주석은 원래 *"vercel 은 지금도 이 repo 를 빌드하는 살아있는
     미러다"* 라고 단정했는데 **틀렸다.** 근거로 쓴 "홈 타이틀이 당일 커밋과 일치" 는 약한 자였다 —
     그 타이틀은 그날 **낮 푸시**에서 온 것이고, 이후 푸시 둘(14:09·16:02)은 3시간이 지나도
     안 올라갔다(02 조판 `posi` 0건 · zxp 5,250,531 B 그대로 = `48938c7` 시점 파일). **Vercel 은
     이 repo 에 붙어 있긴 하나 반영이 지연되거나 멈춘다.** 🟢 그래도 이 스크립트의 동작은 안 바뀐다 —
     `public/` 원본을 남기는 이유는 "언제 빌드하든 그때 올바른 파일이 있어야 한다" 이기 때문이다.

   ⚠️ 그리고 이 경로가 **실제로 하는 일은 좁다** (2026-09-20 코드 확인): `hasNewer` 가
     `compareVersions(latest, APP_VERSION) > 0` 이라 **v2.5.0 유저는 manifest 2.5.0 을 받아도
     알림이 없고, 404 를 받아도 알림이 없다 — 두 경우가 같다.** 실제 수혜자는 **sub-2.5.0
     설치본 하나**뿐이고 그 수는 계측이 없어 모른다.

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
