#!/usr/bin/env node
/* Polar 결제 화면에 **약관·환불 동의 체크박스**를 단다 — 전자상거래법 §13②(계약 전 거래조건 고지 · 약관 확인 방법)
   (2026-09-30 오너 *"니가 못함?"* → Polar 접근 토큰만 있으면 이 스크립트가 한다. 검토서 A4.)
   Polar Custom Fields 의 checkbox(라벨은 마크다운 링크 가능)를 만들고 상품에 **필수**로 붙인다 — 안 누르면 결제 버튼이 안 넘어간다.
   값은 주문의 `custom_field_data.terms_agree` 에 남는다(= 약관을 보여 주고 동의받은 증거).

   준비: Polar 대시보드 → Settings → Developers → **Organization Access Token** (scopes: products:read · products:write ·
         custom_fields:read · custom_fields:write). 🔴 토큰은 채팅·커밋에 붙이지 마라 — 터미널 환경변수로만.
   실행: set -a; . ~/.config/younameit/secrets.env; set +a     ← 토큰은 이 파일(chmod 600)에만 둔다
         node tools/polarCheckoutFields.mjs            ← 할 일만 출력
         node tools/polarCheckoutFields.mjs --apply    ← 만들고 붙인다(이미 있으면 건너뛴다) */
const TOKEN = process.env.POLAR_TOKEN, APPLY = process.argv.includes('--apply');
if (!TOKEN) { console.error('POLAR_TOKEN 이 필요하다.'); process.exit(1); }
const api = async (method, path, body) => {
  const r = await fetch(`https://api.polar.sh/v1${path}`, { method, headers: { authorization: `Bearer ${TOKEN}`, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${JSON.stringify(j)}`); return j;
};

const SLUG = 'terms_agree';
const FIELD = {
  type: 'checkbox', slug: SLUG, name: 'Terms and refund policy',
  properties: {
    form_label: 'I agree to the [Terms](https://younameit.works/terms) and [Refund Policy](https://younameit.works/refund) · [이용약관](https://younameit.works/ko/terms)·[환불 정책](https://younameit.works/ko/refund)에 동의합니다',
    form_help_text: '14-day refund, no questions asked · 14일 이내 이유 없이 전액 환불',
  },
};

const fields = (await api('GET', '/custom-fields/?limit=100')).items || [];
let field = fields.find((f) => f.slug === SLUG);
console.log(field ? `✓ 체크박스 '${SLUG}' 있음 (${field.id})` : `+ 체크박스 '${SLUG}' 만들기`);
if (!field && APPLY) field = await api('POST', '/custom-fields/', FIELD);

const products = ((await api('GET', '/products/?limit=100&is_archived=false')).items || []).filter((p) => !p.is_recurring);
for (const p of products) {
  const attached = (p.attached_custom_fields || []).map((a) => ({ custom_field_id: a.custom_field_id, required: a.required }));
  const has = field && attached.some((a) => a.custom_field_id === field.id);
  console.log(`${has ? '✓' : '+'} 상품 '${p.name}' (${p.id}) ${has ? '— 이미 붙어 있음' : '— 필수로 붙이기'}`);
  if (!has && APPLY && field) await api('PATCH', `/products/${p.id}`, { attached_custom_fields: [...attached, { custom_field_id: field.id, required: true }] });
}
if (!APPLY) console.log('\n(미리보기 — 적용하려면 --apply)');
