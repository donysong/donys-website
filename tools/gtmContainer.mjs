#!/usr/bin/env node
/* GTM 컨테이너 가져오기 파일 생성기 — `lib/analyticsSpec.ts` 에서 컨테이너를 **만든다**(손으로 클릭하지 않는다).
   사양 한 줄을 고치면 GTM 도 같이 바뀌고, 클릭으로 만든 컨테이너와 문서가 갈라지지 않는다. 설계 = 플러그인 repo ANALYTICS_PLAN §5.

   실행: node tools/gtmContainer.mjs --ga4-id G-XXXXXXXXXX [--meta-pixel-id 1234567890123456] [--out gtm-container.json]
         (Node ≥ 22.18 — 타입 제거 실행 + `tools/tsResolve.mjs`. 22.6~22.17 은 `node --experimental-strip-types …`)
   적용: GTM ▸ 관리 ▸ 컨테이너 가져오기 ▸ 파일 선택 ▸ **새 작업공간** ▸ **병합(덮어쓰기 아님)** ▸ 미리보기로 확인 ▸ 그 뒤에야 게시(ANALYTICS_PLAN A9).

   🔴 Meta ID 가 없으면 Meta 태그 5개를 **빼고** 낸다 — 빈 ID 로 태그가 조용히 도는 일이 없다.
   🔴 가져오기 JSON 스키마는 GTM 이 문서화하지 않는다. 필드 이름은 내보내기 파일 관례(`gaawe` · `googtag` · `eventSettingsTable` …)를 따랐고,
      **가져오기 화면의 검증 결과가 최종 판정이다** — 거부되면 이 파일의 해당 키를 고친다(시험은 구조·스펙 일치만 본다). */
import { register } from 'node:module';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

register('./tsResolve.mjs', import.meta.url);
const { SPEC } = await import('../lib/analyticsSpec.ts');

const ACC = '0', CON = '0';
const base = { accountId: ACC, containerId: CON };
const T = (key, value) => ({ type: 'TEMPLATE', key, value: String(value) });
const mapTable = (rows) => ({
  type: 'LIST',
  list: rows.map(([k, v]) => ({ type: 'MAP', map: [T('parameter', k), T('parameterValue', v)] })),
});

/** 사양 → 컨테이너 객체. 순수 함수 — 시험이 직접 부른다. */
export function buildContainer({ ga4Id, metaPixelId = '' }) {
  if (!/^G-[A-Z0-9]{6,}$/.test(ga4Id || '')) throw new Error(`GA4 측정 ID 가 필요하다(G-…): ${ga4Id}`);
  if (metaPixelId && !/^\d{15,16}$/.test(metaPixelId)) throw new Error(`Meta 픽셀 ID 는 15~16자리 숫자다: ${metaPixelId}`);

  const events = Object.entries(SPEC.events);
  const ga4Names = events.map(([n]) => n);
  const gaParams = [...new Set(events.flatMap(([, e]) => e.params))];
  const commerce = ['ecommerce.value', 'ecommerce.currency', 'ecommerce.transaction_id', 'item_id'];

  let vid = 0;
  const variable = [];
  const constant = (name, value) => { variable.push({ ...base, variableId: String(++vid), name, type: 'c', parameter: [T('value', value)] }); return `{{${name}}}`; };
  const dlv = (key) => {
    const name = `DLV - ${key}`;
    if (!variable.some((v) => v.name === name))
      variable.push({ ...base, variableId: String(++vid), name, type: 'v', parameter: [{ type: 'INTEGER', key: 'dataLayerVersion', value: '2' }, { type: 'BOOLEAN', key: 'setDefaultValue', value: 'false' }, T('name', key)] });
    return `{{${name}}}`;
  };
  const ga4Var = constant('GA4 Measurement ID', ga4Id);
  const metaVar = metaPixelId ? constant('Meta Pixel ID', metaPixelId) : '';

  let tid = 0;
  const trigger = [];
  const customEvent = (name, names) => {
    trigger.push({
      ...base, triggerId: String(++tid), name, type: 'CUSTOM_EVENT',
      customEventFilter: [{ type: 'MATCH_REGEX', parameter: [T('arg0', '{{_event}}'), T('arg1', `^(${names.join('|')})$`)] }],
    });
    return String(tid);
  };
  /* GTM 내장 트리거 ID — 내보내기 파일에서 이 숫자로 참조된다. */
  const INIT_ALL = '2147479573', ALL_PAGES = '2147479553';

  let gid = 0;
  const tag = [];
  /* 🔴 열거값은 대문자다 — 소문자(`needed`)는 GTM 가져오기가 `Unrecognized value [needed]` 로 거부했다(2026-10-20 실측). */
  const needs = (type) => ({ consentStatus: 'NEEDED', consentType: { type: 'LIST', list: [{ type: 'TEMPLATE', value: type }] } });

  /* Google 태그(GA4 구성) — 공통 파라미터를 기본값으로 */
  tag.push({
    ...base, tagId: String(++gid), name: 'Google tag - GA4', type: 'googtag',
    parameter: [T('tagId', ga4Var), { ...mapTable(SPEC.common.map((k) => [k, dlv(k)])), key: 'configSettingsTable' }],
    firingTriggerId: [INIT_ALL], tagFiringOption: 'ONCE_PER_EVENT', consentSettings: needs('analytics_storage'),
  });

  /* GA4 이벤트 — 태그 하나, 이름 = {{Event}}. 사양의 파라미터 합집합을 DLV 로 받고, 값이 없으면 GA4 가 파라미터를 보내지 않는다. */
  tag.push({
    ...base, tagId: String(++gid), name: 'GA4 - events', type: 'gaawe',
    parameter: [
      { type: 'BOOLEAN', key: 'sendEcommerceData', value: 'true' },
      T('getEcommerceDataFrom', 'dataLayer'),
      T('eventName', '{{Event}}'),
      T('measurementIdOverride', ga4Var),
      { ...mapTable(gaParams.map((k) => [k, dlv(k)])), key: 'eventSettingsTable' },
    ],
    firingTriggerId: [customEvent('CE - GA4 events', ga4Names)], tagFiringOption: 'ONCE_PER_EVENT', consentSettings: needs('analytics_storage'),
  });

  /* Meta Pixel — 오너가 ID 를 줘야 만들어진다 */
  if (metaPixelId) {
    const html = (name, code, trig) => tag.push({
      ...base, tagId: String(++gid), name, type: 'html',
      parameter: [T('html', `<script>\n${code}\n</script>`), { type: 'BOOLEAN', key: 'supportDocumentWrite', value: 'false' }],
      firingTriggerId: [trig], tagFiringOption: 'ONCE_PER_EVENT', consentSettings: needs('ad_storage'),
    });
    html('Meta - base', [
      "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};",
      "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;",
      "s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');",
      `fbq('init','${metaVar}');`,
      "fbq('track','PageView');",
    ].join('\n'), ALL_PAGES);

    /* 값·통화는 알려진 상품일 때만 보낸다 — 모르는 상품(`item_id:'unknown'`)은 값이 없고, 문자열 "undefined" 가 통화로 새면 안 된다. */
    const commerceProps = [
      `var v=Number('${dlv('ecommerce.value')}');`,
      `var p={content_ids:['${dlv('item_id')}'],content_type:'product'};`,
      `if(!isNaN(v)){p.value=v;p.currency='${dlv('ecommerce.currency')}';}`,
    ];
    for (const [name, e] of events) {
      if (!e.meta) continue;
      const trig = customEvent(`CE - Meta ${e.meta}`, [name]);
      const code = e.ecommerce
        ? [...commerceProps, name === 'purchase'
            ? `fbq('track','Purchase',p,{eventID:'${dlv('ecommerce.transaction_id')}'});`
            : `fbq('track','${e.meta}',p);`].join('\n')
        : `fbq('track','${e.meta}',${e.params[0] ? `{content_name:'${dlv(e.params[0])}'}` : '{}'});`;
      html(`Meta - ${e.meta}`, code, trig);
    }
  }
  for (const k of commerce) dlv(k);   // 위에서 안 부른 변수도 컨테이너에 있게(미리보기에서 값을 볼 수 있다)

  return {
    exportFormatVersion: 2,
    exportTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
    containerVersion: {
      path: `accounts/${ACC}/containers/${CON}/versions/0`, ...base, containerVersionId: '0',
      container: { path: `accounts/${ACC}/containers/${CON}`, ...base, name: 'younameit.works', usageContext: ['WEB'] },
      tag, trigger, variable,
      builtInVariable: ['EVENT', 'PAGE_URL', 'PAGE_HOSTNAME', 'PAGE_PATH', 'REFERRER'].map((type) => ({ ...base, type, name: { EVENT: 'Event', PAGE_URL: 'Page URL', PAGE_HOSTNAME: 'Page Hostname', PAGE_PATH: 'Page Path', REFERRER: 'Referrer' }[type] })),
    },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : ''; };
  const out = arg('--out') || 'gtm-container.json';
  const c = buildContainer({ ga4Id: arg('--ga4-id'), metaPixelId: arg('--meta-pixel-id') });
  fs.writeFileSync(out, JSON.stringify(c, null, 2) + '\n');
  const cv = c.containerVersion;
  console.log(`${out}: 태그 ${cv.tag.length} · 트리거 ${cv.trigger.length} · 변수 ${cv.variable.length}${arg('--meta-pixel-id') ? '' : ' (Meta 태그 없음 — --meta-pixel-id 를 주면 5개가 더해진다)'}`);
}
