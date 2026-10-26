/* 이벤트 사양 정본 — 코드(`lib/analytics.ts` · 폼/필름의 `track` 호출)와 GTM 컨테이너(`tools/gtmContainer.mjs`)가 둘 다 여기서 읽는다.
   설계서 = 플러그인 repo `donys/docs/ANALYTICS_PLAN.md` §4. 이벤트를 더하면 `npm run test:analytics` 가
   ① 소스 어딘가에 발화 지점이 있는지 ② 컨테이너에 태그가 생기는지를 본다.
   🔴 순수 데이터다 — import 를 두지 마라(Node 가 타입만 지우고 그대로 읽는다 · 생성기·시험이 이 파일을 직접 import 한다). */
export const SPEC = {
  version: 1,
  /** 모든 GA4 이벤트에 Google 태그 구성이 붙이는 파라미터 */
  common: ['page_lang', 'page_kind'],
  items: {
    'ae-pro': { item_name: 'You Name It AE Plugin Pro', item_category: 'plugin', price: 49.99, currency: 'USD' },
  },
  /** params = 이벤트별 GA4 파라미터 · ecommerce = 전자상거래 객체를 같이 보냄 · meta = Meta 표준 이벤트 · key = GA4 핵심 이벤트 */
  events: {
    view_item:             { params: [], ecommerce: true, meta: 'ViewContent' },
    section_view:          { params: ['section_id', 'plate_no'] },
    film_sound_on:         { params: ['film_id'] },
    faq_open:              { params: ['faq_id'] },
    docs_usage_open:       { params: ['tool_id'] },
    begin_checkout:        { params: ['placement'], ecommerce: true, meta: 'InitiateCheckout', key: true },
    free_download_request: { params: ['placement'] },
    generate_lead:         { params: ['lead_type'], meta: 'Lead', key: true },
    file_download:         { params: ['file_name', 'file_extension', 'tier', 'placement'] },
    newsletter_request:    { params: [] },
    newsletter_confirm:    { params: [] },
    contact_click:         { params: ['placement'] },
    language_switch:       { params: ['to_lang'] },
    form_error:            { params: ['form', 'reason'] },
    purchase:              { params: [], ecommerce: true, meta: 'Purchase', key: true },
  },
} as const;
