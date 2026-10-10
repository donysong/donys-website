/* `/pr` 판 B — **무료판 + Pro 사전예약**(PRD §0 대안). 판 A(`pr.ts`) 위에 **덮는 키만** 있다.
   원문 = PR 플러그인 repo `gtm/site/pr-page.preorder.md`("Keys that change" · "New block") · `pr-faq.md`("Pre-order" 묶음).
   `lib/copy.ts` 가 `PR_MODE === 'preorder'` 일 때만 이 파일을 합친다 — 판 A 로 구우면 이 문자열은 아예 안 내려간다.
   규칙(원문 "Rules that differ from variant A"): Pro 기능은 "들어 있다" 가 아니라 사전예약 블록에만 이름으로 · 날짜 약속 없음 ·
   환불 문구가 더 강하다(열리기 전 언제든 · 열린 뒤 14일 · 마감일까지 안 열리면 자동 전액).
   🔴 원문에 없는 키(사이트가 더한 것 — 오너 확인 전): `pr.buy.pre` · `pr.tbl.coming` · `pr.plate.prp` · `pr.meta.desc`(판 B 판) ·
      `pr.faq.q21.early`(판 B 판) · `pr.posi.plain`(판 B 판 — 원문 지시 "자막, 을 뺀다" 에 더해 Pro 인 `이펙트 적용` 과 결과의 `자막` 도 뺐다:
      판 B 는 그 둘이 아직 없다). */
import type { Dict } from './types';

const PR_PREORDER: Dict = {
  en: {
    'pr.hero.buy': 'Pre-order Pro — {earlyPrice}',
    'pr.hero.buy.early': 'Pre-order Pro — {earlyPrice}',
    'pr.hero.buy.early.note': 'Early-bird price until Pro opens',
    'pr.hero.buy.note': 'Key now, Pro features in an update',
    'pr.hero.free.note': 'Silence cuts free, no limit · available now',
    'pr.buy.pre': 'Pre-order',

    'pr.posi.plain': 'A Premiere Pro panel for the work that repeats with every video: silence cuts, bin cleanup. It <b>shows you the plan first</b>. Once you approve, it works on a copy of the sequence or on new tracks, then reports <b>what it did, what it skipped and why, and how to undo it</b>. What it leaves behind is ordinary Premiere clips and tracks, so you can open and change all of it.',
    'pr.diff3.h': 'Ask in words, see the plan first (Pro · coming)',
    'pr.diff3.p': 'We are building Chat so that you write the edit you want, it reads your Premiere sequence, shows you a plan, and applies only what you approve. It arrives when Pro opens, and runs on your own Claude Code or Codex plan.',

    'pr.tbl.pro': 'Pro · pre-order (opens in an update)',
    'pr.tbl.note': 'Nothing in the Pro column is open yet. Your pre-order key switches them on in the update that opens them.',
    'pr.tbl.coming': 'coming',

    'pr.price.h': 'Reserve it now, use it when it opens',
    'pr.price.amount': '{earlyPrice}',
    'pr.price.early': 'Pre-order price · until Pro opens',
    'pr.price.incl1': 'Everything in Free now, plus Pro as it opens',
    'pr.price.keep': 'Once Pro is open, the version you have keeps working even if you skip later updates.',

    /* ── 사전예약 블록(가격 바로 위) ── */
    'pr.plate.prp': 'Pre-order',
    'prp.h': 'Pro is open for pre-order',
    'prp.p': 'You can download and use the free version now. Pro has not passed all of our completion criteria yet, so we take pre-orders before it opens. Pre-order and you get a license key right away; the Pro features open in an update as they pass.',
    'prp.why': 'We kept the launch date and moved what was not ready, rather than switching on features that were not done.',
    'prp.now.h': 'What you get now',
    'prp.now.p': 'The whole free version and a Pro license key. You can activate the key now.',
    'prp.open.h': 'What arrives when Pro opens',
    'prp.open.li1': 'Silence cut advanced settings: padding, J and L cuts, threshold',
    'prp.open.li2': 'Captions: long-form caption tracks and short-form highlight captions',
    'prp.open.li3': 'Chat: ask in words, see the plan, only what you approve is applied',
    'prp.later.h': 'Coming in later updates',
    'prp.later.p': 'The other Pro tools come in one by one as they pass. We do not promise dates.',
    'prp.date': 'When the opening date is set, we email you at the address you bought with.',
    'prp.price': 'The pre-order price stays at the early-bird {earlyPrice} until Pro opens, and for {openEarlyDays} days from the day it opens (to {earlyEnd} if it opens before then).',
    'prp.refund': 'Refunds: any time before Pro opens, and within {refundDays} days after it opens, no reason needed.',
    'prp.longstop': 'If Pro has not opened by {preorderDeadline}, every pre-order is refunded in full automatically. You do not have to ask.',
    'prp.same': 'Nothing to buy again when Pro opens. The same key switches it on.',

    /* ── FAQ — 판 B 에선 `pr.faq.q20`(환불)을 이 묶음이 대신한다 ── */
    'pr.faq.q21.early': 'Only one discount applies per checkout, so while the pre-order price applies, the code cannot take the price below it.',
    'pr.faq.g4': 'Pre-order',
    'pr.faq.p1.q': 'What do I get when I pre-order?',
    'pr.faq.p1.v': 'A key and the free version',
    'pr.faq.p1.a': 'You get the whole free version and a Pro license key right away. You can activate the key now; when you install the update that opens Pro, the same key switches the Pro features on.',
    'pr.faq.p2.q': 'When does Pro open?',
    'pr.faq.p2.v': 'When it passes our criteria',
    'pr.faq.p2.a': 'We do not promise a date. Pro opens in an update once silence cut advanced settings, captions and Chat all pass our completion criteria. When the date is set, we email you at the address you bought with.',
    'pr.faq.p3.q': 'Can I get a refund before it opens?',
    'pr.faq.p3.v': 'Any time',
    'pr.faq.p3.a': 'Any time before Pro opens, and within {refundDays} days after it opens, in full and with no reason needed. Email <a href="mailto:support@younameit.works">support@younameit.works</a> with your order number or the email you paid with. If Pro has not opened by {preorderDeadline}, we refund you in full without being asked.',
    'pr.faq.p4.q': 'What does the pre-order cost?',
    'pr.faq.p4.v': '{earlyPrice}',
    'pr.faq.p4.a': 'That is the early-bird price, and it stays until Pro opens, even after {earlyEnd}. When Pro opens, the early-bird price runs for {openEarlyDays} days from that day (to {earlyEnd} if it opens before then); after that the list price is {price}.',
    'pr.faq.p5.q': 'Do I pay again when Pro opens?',
    'pr.faq.p5.v': 'No',
    'pr.faq.p5.a': 'The same key switches it on. Nothing else to pay.',
    'pr.faq.p6.q': 'What if Pro never opens?',
    'pr.faq.p6.v': 'An automatic full refund',
    'pr.faq.p6.a': 'If Pro has not opened by {preorderDeadline}, every pre-order is refunded in full without anyone having to ask, and we email you when it is done. The refund revokes the Pro key; the free version keeps working.',

    'pr.meta.desc': 'A Premiere Pro panel. Silence cuts are free with no limit, available now; Pro is open for pre-order. It shows the plan first, applies only what you approve, and leaves your originals alone.',
  },

  ko: {
    'pr.hero.buy': 'Pro 사전예약 — {earlyPrice}',
    'pr.hero.buy.early': 'Pro 사전예약 — {earlyPrice}',
    'pr.hero.buy.early.note': 'Pro 가 열릴 때까지 얼리버드 가격',
    'pr.hero.buy.note': '키는 지금, Pro 기능은 업데이트로',
    'pr.hero.free.note': '무음 컷은 무료 · 횟수 제한 없음 · 지금 받는 판',
    'pr.buy.pre': '사전예약',

    'pr.posi.plain': 'Premiere Pro 패널입니다. 무음 컷, 빈 정리처럼 영상마다 되풀이되는 일을 맡습니다. 무엇을 할지 <b>계획을 먼저 보여 드리고</b>, 승인하시면 복제한 시퀀스나 새 트랙에 적용한 뒤 <b>한 일 · 건너뛴 일과 이유 · 되돌리는 방법</b>을 보고합니다. 결과는 전부 Premiere 안의 평범한 클립 · 트랙이라 열어서 고칠 수 있습니다.',
    'pr.diff3.h': '말로 부탁하면, 계획부터 봅니다 (Pro · 준비 중)',
    'pr.diff3.p': 'Chat 패널에 하고 싶은 편집을 적으면, Chat 이 Premiere 시퀀스를 읽고 바꿀 계획을 세워 보여 드리고, 승인하신 것만 적용하도록 만들고 있습니다. Pro 가 열릴 때 함께 들어옵니다. 본인의 Claude Code 나 Codex 구독으로 돕습니다.',

    'pr.tbl.pro': 'Pro · 사전예약 (업데이트로 열림)',
    'pr.tbl.note': 'Pro 열 항목은 아직 열리지 않았습니다. 사전예약하신 키로, 열리는 업데이트에서 켜집니다.',
    'pr.tbl.coming': '준비 중',

    'pr.price.h': '지금 예약하고, 열리면 씁니다',
    'pr.price.amount': '{earlyPrice}',
    'pr.price.early': '사전예약 가격 · Pro 가 열릴 때까지',
    'pr.price.incl1': '무료판 전부 지금 + Pro 기능은 열리는 대로',
    'pr.price.keep': 'Pro 가 열린 뒤에는 업데이트를 안 받아도 갖고 계신 버전이 계속 돕니다.',

    /* ── 사전예약 블록(가격 바로 위) ── */
    'pr.plate.prp': '사전예약',
    'prp.h': 'Pro 는 사전예약 중입니다',
    'prp.p': '무료판은 지금 받아 쓰실 수 있습니다. Pro 는 아직 저희 완성 기준을 다 통과하지 못해서, 열기 전에 먼저 예약을 받습니다. 예약하시면 라이선스 키를 바로 드리고, Pro 기능은 기준을 통과하는 대로 업데이트로 열립니다.',
    'prp.why': '출시일은 정해 두고, 기준에 못 미친 기능은 뒤로 미루는 쪽을 골랐습니다. 덜 된 기능을 켜 두는 것보다 낫다고 봤습니다.',
    'prp.now.h': '지금 받는 것',
    'prp.now.p': '무료판 전체와 Pro 라이선스 키. 키는 지금 활성화해 두셔도 됩니다.',
    'prp.open.h': 'Pro 가 열릴 때 들어오는 것',
    'prp.open.li1': '무음 컷 고급 설정 — 여유 시간 · J컷 · L컷 · 기준값',
    'prp.open.li2': '자막 — 롱폼 자막 트랙, 숏폼 강조 자막',
    'prp.open.li3': 'Chat — 말로 부탁하시면 계획을 보여 드리고, 승인하신 것만 적용',
    'prp.later.h': '그 뒤 업데이트에서 준비 중',
    'prp.later.p': '나머지 Pro 툴은 하나씩 기준을 통과하는 대로 들어옵니다. 날짜는 약속하지 않습니다.',
    'prp.date': '열리는 날이 정해지면 구매하신 메일로 알려 드립니다.',
    'prp.price': '사전예약 가격은 Pro 가 열릴 때까지 얼리버드 가격 {earlyPrice} 그대로이고, Pro 가 열린 날부터 {openEarlyDays}일 동안 이어집니다({earlyEnd} 전에 열리면 {earlyEnd}까지).',
    'prp.refund': '환불: Pro 가 열리기 전에는 언제든, 열린 뒤에는 {refundDays}일 안에 이유 없이 전액 돌려드립니다.',
    'prp.longstop': '{preorderDeadline}까지 Pro 가 열리지 않으면, 요청하지 않으셔도 모든 사전예약을 전액 환불해 드립니다.',
    'prp.same': 'Pro 가 열려도 다시 사실 것은 없습니다. 같은 키로 켜집니다.',

    /* ── FAQ — 판 B 에선 `pr.faq.q20`(환불)을 이 묶음이 대신한다 ── */
    'pr.faq.q21.early': '할인은 결제 한 번에 하나만 적용되므로, 사전예약 가격이 적용되는 동안에는 코드를 쓰셔도 그 가격보다 내려가지 않습니다.',
    'pr.faq.g4': '사전예약',
    'pr.faq.p1.q': '사전예약하면 지금 뭘 받나요?',
    'pr.faq.p1.v': '키와 무료판',
    'pr.faq.p1.a': '무료판 전체와 Pro 라이선스 키를 바로 받으십니다. 키는 지금 활성화해 두셔도 되고, Pro 가 열리는 업데이트를 받으시면 같은 키로 Pro 기능이 켜집니다.',
    'pr.faq.p2.q': 'Pro 는 언제 열리나요?',
    'pr.faq.p2.v': '기준을 통과하면',
    'pr.faq.p2.a': '날짜는 약속하지 않습니다. 무음 컷 고급 설정 · 자막 · Chat 이 모두 저희 완성 기준을 통과하면 업데이트로 엽니다. 날짜가 정해지면 구매하신 메일로 알려 드립니다.',
    'pr.faq.p3.q': '열리기 전에 환불되나요?',
    'pr.faq.p3.v': '언제든',
    'pr.faq.p3.a': 'Pro 가 열리기 전에는 언제든, 열린 뒤에는 {refundDays}일 안에 이유 없이 전액 돌려드립니다. 주문 번호나 결제한 메일 주소와 함께 <a href="mailto:support@younameit.works">support@younameit.works</a> 로 메일을 보내시면 됩니다. {preorderDeadline}까지 Pro 가 열리지 않으면 요청하지 않으셔도 전액 환불해 드립니다.',
    'pr.faq.p4.q': '사전예약 가격은 얼마인가요?',
    'pr.faq.p4.v': '{earlyPrice}',
    /* 원문 `{earlyEnd}가` → `{earlyEnd}이` — 이 사이트의 국문 날짜는 `…13일` 로 끝나서(받침) `가` 가 틀린 조사가 된다. */
    'pr.faq.p4.a': '얼리버드 가격이고, Pro 가 열릴 때까지는 {earlyEnd}이 지나도 그대로입니다. Pro 가 열리면 그날부터 {openEarlyDays}일 동안 얼리버드 가격이 이어지고({earlyEnd} 전에 열리면 {earlyEnd}까지), 그 뒤 정가는 {price} 입니다.',
    'pr.faq.p5.q': 'Pro 가 열리면 다시 사야 하나요?',
    'pr.faq.p5.v': '아닙니다',
    'pr.faq.p5.a': '같은 키로 켜집니다. 따로 결제하실 것은 없습니다.',
    'pr.faq.p6.q': 'Pro 가 끝내 열리지 않으면요?',
    'pr.faq.p6.v': '자동 전액 환불',
    'pr.faq.p6.a': '{preorderDeadline}까지 Pro 가 열리지 않으면, 요청하지 않으셔도 모든 사전예약을 전액 환불해 드리고 메일로 알려 드립니다. 환불되면 Pro 키는 해지되지만, 무료판은 그대로 쓰실 수 있습니다.',

    'pr.meta.desc': 'Premiere Pro 패널. 무음 컷은 지금 무료로 제한 없이 쓰실 수 있고, Pro 는 사전예약 중입니다. 계획을 먼저 보여 드리고 승인하신 것만 적용하며, 원본은 그대로 둡니다.',
  },
};

export default PR_PREORDER;
