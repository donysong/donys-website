/* `ae` 페이지 사전 — EN/KO. 🔴 이 파일은 **이 페이지 레인만** 고친다.
   v3.3 에 같은 문장이 이미 있으면 새 키를 만들지 말고 그 키를 그대로 써라(EN 번역이 붙어 있다).

   재사용 중인 v33 키(여기 다시 적지 마라 — `lib/copy/v33.ts` 가 정본이다):
     r1.* ~ r4.*  역할 카드 4장 · role.l · role.hint · role.say · spot.or
     meta.once · meta.two · meta.refund   히어로 도장 3
   셸 키(`shared.ts`): s.brand · s.docs · s.buy · s.buy.price

   🔴 숫자는 박지 마라 — {scripts} {motion} {textPresets} {gradients} {curves} {expressions}
   {tools} {skills} {effects} {price} {version} 는 `lib/copy.ts` 가 `lib/product.ts` 로 채운다.
   {rest}(= Docs 로 넘기는 나머지 툴 수)와 {portal}(= `PORTAL_URL`)만 컴포넌트가 채운다 — `lib/copy.ts` 의
   자리표시자 표에 없어서다(Features · Faq · Specs).
   🔴 사이트는 **출고 태그**를 설명한다, 플러그인 HEAD 가 아니다 — 숫자·툴·화면 전부 (`lib/product.ts` 주석).
   🔴 `#price` 안의 문자열에는 `<a` 를 넣지 마라 — deployCheck `[price]` 가 세운다(가격 섹션 CTA 0 규칙).
   🔴 낱말·말투 정본 = 플러그인 `donys/docs/VOICE_AND_TERMS.md` §2~§3 — 컴퓨터(machine·기기 금지) ·
   activate/deactivate(release·인증 금지) · 불투명도(투명도 = 반대 뜻) · 속성 · US 철자 · KO 합니다체(안내에 명령형 금지). */
import type { Dict } from './types';

const AE: Dict = {
  en: {
    /* 히어로 스탬프 — v33 은 `한 번 결제`인데 이 페이지의 사양표가 `일회 구매`라 용어가 갈렸다.
       프로토4(확정본) 쪽으로 맞춘다. EN 은 v33 그대로. */
    'ae.meta.once': 'Pay once',
    'ae.meta.two': '2 computers',
    'ae.meta.refund': '14-day refund',


    /* 🔴 역할 카드 4장 — v3.3 에서 온 섹션이지만 **KO 는 프로토4 가 다시 썼다.**
       v33 의 국문은 반말·축약("매 프로젝트" · "네 레이어에" · "원하면 고쳐라")이고
       이 페이지 전체는 존댓말이다. `r1.*` 를 그대로 쓰면 구매자가 처음 읽는 섹션에서
       말투가 한 번 튄다. EN 은 v33 그대로 재사용한다(번역이 갈라질 이유가 없다).
       🔴 v33 의 `r1.*` 자체를 덮지 않는다 — 덮으면 다른 페이지 사전까지 조용히 이긴다. */
    'ae.r1.h': 'Motion designer',
    'ae.r1.p': 'Same intro rig, same null chain, same ease on twelve layers — every project.',
    'ae.r1.q': 'Stagger the title letters by two frames, soft overshoot.',
    'ae.r1.s': '→ 24 keyframes on your layer, in your comp.',
    'ae.r2.h': 'Marketer',
    'ae.r2.p': 'Three variants of the same promo by Thursday. Different copy, same motion, no time.',
    'ae.r2.q': 'Swap the headline, keep the motion, export three sizes.',
    'ae.r2.s': '→ same rig, new copy, three comps.',
    'ae.r3.h': 'Video editor',
    'ae.r3.p': 'You know Premiere by heart. AE is where you go for one title and lose an hour.',
    'ae.r3.q': 'Lower-third, slides in from the left, holds four seconds, out.',
    'ae.r3.s': '→ built on real layers, editable like any other.',
    'ae.r4.h': 'Studio of one',
    'ae.r4.p': 'You are the designer, the animator, the renderer and the client call — all before lunch.',
    'ae.r4.q': 'Center all anchors, fit the precomps, add a wiggle to the camera null.',
    'ae.r4.s': '→ one sentence, three chores gone.',
    'ae.role.l': 'Role',
    'ae.role.hint': 'hover → what you\'d say',
    'ae.role.say': 'You\'d say',
    'ae.spot.or': 'or press',
    /* ── 네비 · 판 이름 ───────────────────────────────────────── */
    'ae.nav.who': 'Who',
    'ae.nav.what': 'Features',
    'ae.nav.price': 'Price',
    'ae.nav.faq': 'FAQ',
    'ae.plate.who': 'Who it is for',
    'ae.plate.posi': 'What it is',
    'ae.plate.what': 'Features',
    'ae.plate.news': 'What is new',
    'ae.plate.price': 'Price',
    'ae.plate.faq': 'Common questions',

    /* ── 히어로 ──────────────────────────────────────────────── */
    /* 🔴 페이지의 유일한 약속문이다 — 락업 **아래**, 잉크색, 20px 이상. 전엔 14px 링크색으로 락업 위에 있었다. */
    'ae.hero.promise': 'The bottleneck is not the idea. It is the hands.',
    'ae.hero.plugin': 'AE PLUGIN',
    'ae.hero.sub': 'After Effects 2022+ · Windows · macOS · v{version}',
    'ae.hero.buy.note': 'Pay once, keep it',
    'ae.hero.specs': 'See the specs →',
    /* 두 원판 = *아직 안 샀다 → 구매* / *샀다 → 설치*. 그게 둘이 나란한 이유다. 설치 순서는 Docs 에 산다. */
    'ae.hero.install': 'Already bought?',
    'ae.hero.install.note': 'Install in 3 steps',
    'ae.hero.faq': 'Common questions →',
    'ae.hero.rot.tag': 'Made with one button',
    'ae.hero.cap': 'Every frame here was rendered in real After Effects. What you get is not a video — it is <b>layers in your comp</b>.',
    'ae.meta.chat': 'Chat needs your own AI plan',

    /* ── 01 Who (역할 카드 문장은 v33 r1~r4) ─────────────────── */
    'ae.who.h': 'Everyone who opens After Effects',
    'ae.who.tag': 'If the same setup is waiting every day,<br>this is for you.',

    /* ── 02 포지셔닝 ─────────────────────────────────────────── */
    'ae.posi.myth': 'Where your hands were,<br>the tool sits down.',
    'ae.posi.plain': '<b>Seven</b> After Effects panels. The repetitive setup goes in <b>one button</b>; the thing you cannot quite name goes in <b>one sentence</b>. Either way the result lands in <b>the comp you have open right now</b> — real layers, real keyframes, real expressions. All of it opens up and edits.',
    'ae.posi.plain2': 'It does not make the video for you, and it does not decide for you.',

    /* ── 03 기능 ─────────────────────────────────────────────── */
    'ae.what.h': 'What is inside',
    'ae.what.tag': 'Seven panels.<br>Only what gets used every day.',

    'ae.f1.alt': 'Chat panel — model picker, trust mode, lint',
    /* 🔴 이 컷은 신뢰 모드 ON 이다(촬영 상태). 기본값은 OFF(`chatStore.ts` loadTrust — v2.7.1 태그 동일).
       재촬영 전까지 캡션이 그 차이를 말한다 — 옆 문장("바꾸는 동작은 먼저 묻는다")과 증거가 어긋나지 않게. */
    'ae.f1.cap': 'The actual Chat panel — trust mode is switched on in this shot; it is off by default, and every change asks first.',
    'ae.f1.h': 'Say it, <span class="u">it lands on layers</span>',
    'ae.f1.p1': 'Describe it in plain language and it gets built inside AE. It is not making you a video — it <b>writes layers and keyframes into your comp.</b>',
    'ae.f1.p2': 'It runs on <b>Claude Code</b> or <b>Codex</b>, installed on your computer and signed in with <b>your own plan</b> — the panel walks you through both. We do not sell tokens.',
    'ae.f1.li': [
      '<b>Reads</b> the comp you are in before it changes anything <i>— it looks before it touches</i>',
      'Anything that changes something <b>asks first</b> · checkpoints and undo',
      'Lint — stray fonts, overlaps and low contrast, checked <b>from a button</b>',
    ],

    /* 판 = Click React — 히어로(판 교대)·후킹 6장·역할 카드 어디에도 없는 툴이다. 같은 증거를 두 번 쓰지 않는다. */
    'ae.f2.cap': 'Click React — the selected layers press in and spring back, scale and brightness together. Hover it: this is the same preview the panel shows on the button.',
    'ae.f2.h': '<span class="u">{scripts}</span> chores, one button each',
    'ae.f2.p1': 'If you can name the chore, pressing it is the whole job. Motion 12 · Layer 8 · Comp 6 · Shape 6 · Stylize 4 · Export 3.',
    'ae.f2.p2': 'The preview on each button is not a mockup — it is <b>16 frames rendered in real AE</b>, so you see what comes out <b>before you press</b>. Settings you have dialed in freeze into <b>your own button</b>.',
    'ae.f2.li': [
      'Find it by category or search',
      'Hover a button to watch what it does before you press',
      '<b>Your own button</b> — arguments saved with it',
    ],

    'ae.hook1.p': 'Alt-click copies <b>the easing only</b>. Velocity is normalized on the way in, so the <b>feel carries over</b> even when the distance and the duration differ. Paste it reversed if you want.',
    'ae.hook2.p': 'Rigs the selected layers into an effector. Move one null and scale and opacity answer <b>nearest first</b>. Radius and falloff sit on knobs.',
    'ae.hook3.p': 'Pick a layout pattern and the cells lay down as <b>real layers</b> — shapes or precomps. Each cell gets its own entrance.',
    'ae.hook4.p': 'Pulls markers out of the audio. Choose <b>onsets</b> (bass hits and the like) or a <b>tempo grid</b>. No more staring at a waveform tapping beats.',
    'ae.hook5.p': 'Korean types <b>jamo by jamo</b> — ㅎ → 하 → 한, blinking cursor attached. Typing presets built for Latin text cannot do this.',
    'ae.hook6.p': 'Dots, hatch, checker, halftone, truchet, concentric, ASCII and grain — <b>eight</b> patterns built on sliders and baked to vector or PNG. Feed it a layer and its <b>luminance drives the density</b>.',
    'ae.docs.txt': 'The other <b>{rest}</b> are all in the Docs with their plates — what each tool does and what it runs on. <b>Read it before you buy.</b>',
    'ae.docs.btn': 'See all {scripts} tools',

    /* 🔴 판은 **Text Preset 탭**이다(`panel-library.{en,ko}.webp` 육안). Motion 탭 컷이 생기면 캡션을 되돌려라. */
    'ae.f3.alt': 'Library panel — Text Preset tab',
    'ae.f3.cap': 'The real Library panel — <b>{textPresets} text presets</b>, split by characters, words and lines.',
    'ae.f3.h': 'In and out, <span class="u">separately</span>',
    'ae.f3.p1': 'One property takes an entrance and an exit as two separate moves. You drag both start points as <b>timeline markers</b> — no hunting the keyframes down again.',
    'ae.f3.p2': 'After it is applied you keep tuning it on the Effect Controls sliders. Apply it again and it <b>will not overwrite the values you set.</b>',
    'ae.f3.li': [
      '<b>{motion}</b> motion presets <i>— baked from spring physics</i>',
      '<b>{textPresets}</b> text presets <i>— four variable-font axes included</i>',
      '<b>{gradients}</b> gradients · <b>{effects}</b> effect presets',
      '<b>Capture</b> a comp effect stack <b>as your own preset</b> · export it as a pack',
    ],

    'ae.f4.alt': 'Curves panel — bezier easing editor',
    'ae.f4.cap': 'The real Curves panel. Drag the handles or type the numbers. <b>Read</b> pulls from AE, <b>Apply</b> puts it back.',
    'ae.f4.h': 'Easing and <span class="u">code</span>',
    'ae.f4.p1': 'Drag handles in the graph editor or type the numbers. It can <b>read the easing that is on</b> an AE keyframe right now and put it somewhere else unchanged.',
    'ae.f4.p2': 'Edit an expression and it <b>applies itself 0.6 seconds later</b> — no toggling back and forth to check.',
    'ae.f4.li': [
      '<b>{curves}</b> easing curves · save your own',
      '<b>{expressions}</b> expressions · 11 bundles',
      'Springs <b>baked to keyframes</b> <i>— keys, not expressions, so playback stays light</i>',
    ],

    'ae.f5.alt': 'Custom 1 panel — mixed grid',
    'ae.f5.cap': 'The real Custom 1 panel. <b>Curve editor, expressions and gradients</b> sit in the same grid as the tools.',
    'ae.f5.h': 'A panel <span class="u">shaped to your hand</span>',
    'ae.f5.p1': 'Pick only what you use and put it where you want it. It does not hold tools alone — <b>gradients, text presets, expressions, effects and curves</b> mix into the same grid.',
    'ae.f5.p2': 'Save several layouts and swap them from a dropdown. Export one to a file and carry it to another computer.',
    'ae.f5.li': [
      'A coordinate grid <i>— cells 24–160px, overlaps push each other aside</i>',
      '<b>Several</b> saved layouts · pass them around as files',
    ],

    /* ── 04 새로 들어온 것 ───────────────────────────────────── */
    'ae.news.h': 'What is new',
    'ae.news.tag': 'Minor updates are free.',
    /* 🔴 항목·버전·날짜는 `lib/releases.ts` 에서 읽는다(News.tsx). 손으로 쓴 카드 3장은 전부 `v2.7.1` 딱지였는데
       그중 둘이 v2.6.0 기능이었다 — 손으로 쓰면 버전이 거짓말을 한다. */
    'ae.news.all': 'All release notes →',

    /* ── 도그푸드 증거 ───────────────────────────────────────── */
    'ae.dog.lab': 'We use it first',
    /* 근거 = WEBSITE_RENEWAL_PLAN §3.0 — 종이 = riso-print `BlackPaper00N.jpg`, 알갱이 = `Risoprint.png`. 사이트가
       플러그인 산출물은 아니다(텍스처를 나눠 쓸 뿐) — "이 사이트가 제품의 출력물" 은 과장이라 지웠다. */
    'ae.dog.p': 'The paper tooth and ink grain on this page are the same textures the <b>Riso Print</b> effect ships with.',
    'ae.dog.cap': 'Library ▸ Effects ▸ Riso Print',

    /* ── 05 가격 (🔴 버튼 없음 — 레일이 CTA 를 갖는다) ────────── */
    'ae.price.h': 'Buy it once. It stays yours.',
    'ae.price.tag': 'Not a subscription.',
    'ae.price.amount': '{price}',
    'ae.price.incl': ['All seven panels', 'Two computers', 'Minor updates free', '14-day refund'],
    'ae.price.why.h': 'Why it is not a subscription',
    'ae.price.why.p1': 'Charge every month and you have to invent a reason every month. Then it stops being a tool and becomes <b>a thing that keeps a subscription alive</b>.',
    'ae.price.why.p2': 'The Chat panel runs on <b>your own AI plan</b> for the same reason — Claude or ChatGPT, whichever you already pay for. If we resold tokens, we would earn more the more you used the tool — and that breaks the tool.',
    'ae.price.why.p3': 'It keeps working as long as your AE and your computer do. Skip every update and the version you bought keeps working.',
    /* 결제 뒤 경로 — 🔴 텍스트만. `#price` 안이라 링크도 버튼도 못 단다(deployCheck [price]). */
    'ae.after.h': 'After you pay',
    'ae.after.s': [
      'Your license key and the installer (.zxp) arrive in your order email — and stay in the customer portal.',
      'Quit After Effects and drop the file on the free ZXP Installer — the install guide is in the Docs.',
      'Open Window ▸ Extensions ▸ You Name It - Support and paste the key. The other six panels open.',
    ],

    /* ── 06 FAQ — 🔴 답은 판정어 한 마디로 시작한다 ──────────── */
    'ae.faq.h': 'Common questions',
    'ae.faq.tag': 'Answer first.',
    'ae.faq.g1': 'Work',
    'ae.faq.g2': 'Technical',
    'ae.faq.g3': 'License',
    'ae.q1.q': 'Where does my work go?',
    /* 🔴 구 판정어 `Nowhere` 는 거짓이었다 — Chat 은 입력과 컴프에서 읽은 내용을 유저 계정으로 Anthropic/OpenAI 에 보낸다. */
    'ae.q1.v': 'Not to us',
    'ae.q1.a': 'Everything except Chat runs on your computer — Depth Pass and Face Track included. Chat sends what you type, and what it reads from your comp, to Anthropic or OpenAI through your own Claude Code or Codex account — the same as using those tools directly. <b>None of your work reaches our servers.</b>',
    'ae.q2.q': 'Type one brief and get a finished video?',
    'ae.q2.v': 'No',
    'ae.q2.a': 'We decided not to build that. You do the thinking, the tool <b>helps you build it.</b> Describe what you want and it lands as layers — it will not settle the finished piece for you.',
    'ae.q3.q': 'Can I edit what comes out?',
    'ae.q3.v': 'All of it',
    'ae.q3.a': 'Button or sentence, what comes out is <b>ordinary AE layers, keyframes and expressions</b>. Delete the plugin and everything you made stays.',
    'ae.q4.q': 'What do I need to use Chat?',
    'ae.q4.v': 'Your own AI plan',
    'ae.q4.a': 'Install <b>Claude Code</b> and sign in with a Claude Pro or Max account — or <b>Codex</b>, with a ChatGPT account. One of the two is enough, and the panel walks you through it. The plugin price does not include AI usage and we do not charge for it separately. <b>Only the Chat panel</b> needs this — the other six just run.',
    'ae.q5.q': 'Do I need an internet connection?',
    'ae.q5.v': 'Partly',
    'ae.q5.a': 'Toolbox, Library, Curves and Expressions run without one. <b>Chat needs a connection.</b> The license checks in quietly once every seven days, and you can keep working up to 30 days without one.',
    'ae.q6.q': 'Which After Effects does it run on?',
    'ae.q6.v': '2022 and up',
    'ae.q6.a': 'Windows and macOS both. Install with the free ZXP Installer — <a href="/ae/docs#install">install guide</a>.',
    'ae.q7.q': 'Does Depth Pass run on every computer?',
    'ae.q7.v': 'Not on Intel Macs',
    'ae.q7.a': 'On macOS it runs <b>on Apple Silicon only</b>. On Windows it computes on the graphics card. It downloads its runtime once, and after that it starts straight away.',
    'ae.q8.q': 'Is it a subscription?',
    'ae.q8.v': 'No',
    'ae.q8.a': 'One payment and that is it. Checkout is handled by Polar.',
    'ae.q9.q': 'How many computers can I use it on?',
    'ae.q9.v': 'Two',
    'ae.q9.a': 'Two active at a time. When you change computers you deactivate one yourself, from the customer portal or inside the panel, and activate the new one. <a href="{portal}" target="_blank" rel="noopener">Manage your computers</a> — sign in with the email you paid with.',
    'ae.q10.q': 'Do updates cost extra?',
    'ae.q10.v': 'Minors are free',
    'ae.q10.a': 'A notice appears inside the panel and you install it right there.',
    'ae.q11.q': 'Can I get a refund?',
    'ae.q11.v': '14 days',
    /* 사실 = `/refund` (14일 · 이유 안 물음 · 주문 번호나 결제 메일). 어긋나면 둘 중 하나가 거짓이다. */
    'ae.q11.a': 'Email <a href="mailto:support@younameit.works">support@younameit.works</a> within 14 days of purchase, with your order number or the email you paid with. No need to explain why.',
    'ae.q12.q': 'Lost your key?',
    'ae.q12.v': 'It is in the portal',
    'ae.q12.a': 'Sign in to the <a href="{portal}" target="_blank" rel="noopener">customer portal</a> with the email you paid with — your key and the installer are there.',

    /* ── 사양 8필드 ─────────────────────────────────────────── */
    'ae.spec.h': 'Specs',
    'ae.sp1.k': 'Price',
    'ae.sp1.v': '{price} USD',
    'ae.sp1.n': 'One-time · tax depends on your country, shown at checkout · Polar',
    'ae.sp2.k': 'Host app',
    'ae.sp2.v': 'After Effects 2022 or newer',
    'ae.sp2.n': 'Seven panels · AE Window menu ▸ Extensions',
    'ae.sp3.k': 'Install',
    'ae.sp3.v': 'ZXP extension',
    'ae.sp3.n': 'Free ZXP Installer, or by hand — <a href="/ae/docs#install">install guide</a>',
    'ae.sp4.k': 'Operating system',
    'ae.sp4.v': 'Windows · macOS',
    'ae.sp4.n': 'Depth Pass runs on Apple Silicon and on Windows GPUs only',
    'ae.sp5.k': 'License',
    'ae.sp5.v': '2 computers · 1 person',
    'ae.sp5.n': '<a href="{portal}" target="_blank" rel="noopener">Deactivate a computer yourself</a> in the customer portal',
    'ae.sp6.k': 'Language',
    'ae.sp6.v': '한국어 · English',
    'ae.sp6.n': 'Switch it inside the panel',
    'ae.sp7.k': 'Network',
    'ae.sp7.v': 'Checks in every 7 days',
    'ae.sp7.n': 'Up to 30 days without one · Chat needs a connection',
    'ae.sp8.k': 'Support',
    'ae.sp8.v': 'support@younameit.works',
    'ae.sp8.n': 'In-app update notices · <a href="/ae/docs#install">install guide</a>',
  },

  ko: {
    /* 히어로 스탬프 — `일회 구매`가 사양표와 같은 말이다(v33 은 `한 번 결제`). */
    'ae.meta.once': '일회 구매',
    'ae.meta.two': '컴퓨터 2대',
    'ae.meta.refund': '14일 환불',


    /* 🔴 역할 카드 4장 — v3.3 에서 온 섹션이지만 **KO 는 프로토4 가 다시 썼다.**
       v33 의 국문은 반말·축약("매 프로젝트" · "네 레이어에" · "원하면 고쳐라")이고
       이 페이지 전체는 존댓말이다. `r1.*` 를 그대로 쓰면 구매자가 처음 읽는 섹션에서
       말투가 한 번 튄다. EN 은 v33 그대로 재사용한다(번역이 갈라질 이유가 없다).
       🔴 v33 의 `r1.*` 자체를 덮지 않는다 — 덮으면 다른 페이지 사전까지 조용히 이긴다. */
    'ae.r1.h': '모션 디자이너',
    'ae.r1.p': '같은 인트로 리그, 같은 널 체인, 열두 레이어에 같은 이징 — 프로젝트마다.',
    'ae.r1.q': '타이틀 글자를 두 프레임씩 스태거, 부드러운 오버슈트.',
    'ae.r1.s': '→ 당신 컴프, 당신 레이어에 키프레임 24개.',
    'ae.r2.h': '마케터',
    'ae.r2.p': '목요일까지 같은 홍보물 세 버전. 카피만 다르고 모션은 같은데 시간이 없습니다.',
    'ae.r2.q': '헤드라인만 바꾸고 모션은 그대로, 세 사이즈로.',
    'ae.r2.s': '→ 같은 리그, 새 카피, 컴프 세 개.',
    'ae.r3.h': '영상 편집자',
    'ae.r3.p': '프리미어는 손에 익었는데, AE 는 타이틀 하나 만들러 들어갔다 한 시간을 씁니다.',
    'ae.r3.q': '왼쪽에서 들어와 4초 머무는 로어서드.',
    'ae.r3.s': '→ 진짜 레이어로 만들어집니다. 다른 레이어처럼 고칠 수 있습니다.',
    'ae.r4.h': '1인 스튜디오',
    'ae.r4.p': '디자이너이자 애니메이터이자 렌더 담당이자 클라이언트 통화까지 — 점심 전에 다.',
    'ae.r4.q': '앵커 전부 가운데로, 프리컴프 맞추고, 카메라 널에 위글.',
    'ae.r4.s': '→ 문장 하나에 잡일 셋이 사라집니다.',
    'ae.role.l': '역할',
    'ae.role.hint': '올리면 → 당신이 말할 문장',
    'ae.role.say': '당신이 말할 문장',
    'ae.spot.or': '또는 누르기',
    /* ── 네비 · 판 이름 ───────────────────────────────────────── */
    'ae.nav.who': '누구를',
    'ae.nav.what': '기능',
    'ae.nav.price': '가격',
    'ae.nav.faq': 'FAQ',
    'ae.plate.who': '누구를 위한 것',
    'ae.plate.posi': '무엇인가',
    'ae.plate.what': '기능',
    'ae.plate.news': '새로 들어온 것',
    'ae.plate.price': '가격',
    'ae.plate.faq': '자주 묻는 것',

    /* ── 히어로 ──────────────────────────────────────────────── */
    'ae.hero.promise': '병목은 아이디어가 아니라 손이다',
    'ae.hero.plugin': 'AE PLUGIN',
    'ae.hero.sub': 'After Effects 2022+ · Windows · macOS · v{version}',
    'ae.hero.buy.note': '한 번 사면 계속',
    'ae.hero.specs': '사양 보기 →',
    'ae.hero.install': '이미 사셨나요?',
    'ae.hero.install.note': '설치 3단계',
    'ae.hero.faq': '자주 묻는 것 →',
    'ae.hero.rot.tag': '버튼 하나로 만든 것',
    'ae.hero.cap': '전부 실제 After Effects 에서 렌더한 화면입니다. 결과는 영상이 아니라 <b>당신 컴프의 레이어</b>입니다.',
    'ae.meta.chat': 'Chat 은 당신의 AI 구독 필요',

    /* ── 01 Who (역할 카드 문장은 v33 r1~r4) ─────────────────── */
    'ae.who.h': 'After Effects 를 여는 사람',
    'ae.who.tag': '매일 같은 셋업이 기다리고 있다면<br>당신을 위한 것입니다.',

    /* ── 02 포지셔닝 ─────────────────────────────────────────── */
    /* 🔴 `네` 는 반말이다 — 이 페이지의 2인칭은 전부 `당신` 이다(역할 카드 KO 를 다시 쓴 이유와 같다). */
    'ae.posi.myth': '당신 손이 하던 자리에<br>도구가 앉는다.',
    'ae.posi.plain': 'After Effects 패널 <b>일곱 개</b>입니다. 반복 셋업은 <b>버튼 하나</b>로, 이름 붙이기 애매한 건 <b>문장 하나</b>로 처리합니다. 어느 쪽이든 결과는 <b>지금 열려 있는 그 컴프</b>에 들어갑니다 — 진짜 레이어, 진짜 키프레임, 진짜 익스프레션. 전부 열어서 고칠 수 있습니다.',
    'ae.posi.plain2': '영상을 대신 만들어 주지 않고, 대신 정하지도 않습니다.',

    /* ── 03 기능 ─────────────────────────────────────────────── */
    'ae.what.h': '무엇이 들어 있나',
    'ae.what.tag': '패널 7개.<br>매일 쓰는 것만 남겼습니다.',

    'ae.f1.alt': 'Chat 패널 — 모델 선택 · 신뢰 모드 · 검사',
    'ae.f1.cap': '실제 Chat 패널입니다 — 이 화면은 신뢰 모드를 켠 상태입니다. 기본은 꺼져 있고, 그때는 바꾸는 동작마다 먼저 묻습니다.',
    'ae.f1.h': '말하면 <span class="u">레이어에 앉는다</span>',
    'ae.f1.p1': '자연어로 설명하면 AE 안에서 그게 만들어집니다. 영상을 생성하는 게 아니라 <b>당신 컴프에 레이어와 키프레임을 씁니다.</b>',
    'ae.f1.p2': '<b>Claude Code</b> 나 <b>Codex</b> 로 돕니다 — 당신 컴퓨터에 설치하고 <b>당신의 구독</b>으로 로그인한 것으로요. 설치와 로그인 모두 패널이 안내합니다. 우리는 토큰을 팔지 않습니다.',
    'ae.f1.li': [
      '바꾸기 전에 지금 컴프를 먼저 <b>읽습니다</b> <i>— 보고 나서 손댑니다</i>',
      '바꾸는 동작은 <b>매번 승인 창</b> · 체크포인트와 되돌리기',
      '검사 — 엉뚱한 폰트 · 겹침 · 낮은 대비를 <b>버튼 하나로</b>',
    ],

    'ae.f2.cap': 'Click React — 선택한 레이어가 눌렸다가 스프링처럼 돌아옵니다. 크기와 밝기가 같이 움직입니다. 마우스를 올리면 패널이 버튼 위에 띄우는 그 그림 그대로 돕니다.',
    'ae.f2.h': '버튼 하나로 <span class="u">{scripts}가지</span>',
    'ae.f2.p1': '이름을 아는 잡일은 누르면 끝납니다. 모션 12 · 레이어 8 · 컴프 6 · 셰이프 6 · 스타일 4 · 내보내기 3.',
    'ae.f2.p2': '버튼 위 미리보기는 목업이 아니라 <b>실제 AE 에서 렌더한 16프레임</b>입니다 — 무엇이 나오는지 <b>누르기 전에</b> 봅니다. 한 번 맞춘 설정은 굳혀서 <b>내 버튼</b>으로 만듭니다.',
    'ae.f2.li': [
      '카테고리나 검색으로 찾습니다',
      '버튼에 올리면 누르기 전에 무엇을 하는지 보입니다',
      '인자까지 저장되는 <b>내 버튼</b>',
    ],

    'ae.hook1.p': 'Alt+클릭이면 <b>이징만</b> 복사합니다. 속도를 정규화해서 담기 때문에 이동 거리와 길이가 달라도 <b>느낌이 그대로 옮겨갑니다.</b> 붙일 땐 반전해서 붙이는 것도 됩니다.',
    'ae.hook2.p': '선택한 레이어들을 이펙터 리그로 묶습니다. 널 하나를 움직이면 <b>가까운 것부터</b> 크기와 불투명도가 반응합니다. 반경과 감쇠를 노브로 잡습니다.',
    'ae.hook3.p': '배치 패턴을 고르면 셀이 <b>실물 레이어</b>로 깔립니다 — 셰이프 또는 프리컴프. 셀마다 등장 애니를 따로 줍니다.',
    'ae.hook4.p': '오디오에서 마커를 땁니다. <b>온셋</b>(베이스 타격 지점)이나 <b>템포 격자</b> 중에 고릅니다. 박자 찍느라 파형을 노려보던 시간이 사라집니다.',
    'ae.hook5.p': '한글이 <b>자소 단위</b>로 쳐집니다 — ㅎ → 하 → 한. 깜빡이는 커서까지 같이 붙습니다. 영문 기준으로 만든 타이핑 프리셋은 이걸 못 합니다.',
    'ae.hook6.p': '도트·해치·체커·하프톤·트뤼셰·동심원·아스키·그레인 <b>8종</b>을 슬라이더로 만들고 벡터 또는 PNG 로 굽습니다. 레이어를 넣으면 그 <b>밝기가 패턴의 농도</b>가 됩니다.',
    'ae.docs.txt': '나머지 <b>{rest}개</b>는 Docs 에 판과 함께 전부 있습니다 — 무엇을 하는 툴인지, 어떤 레이어에 되는지. <b>사기 전에 읽으셔도 됩니다.</b>',
    'ae.docs.btn': '툴 {scripts}종 전부 보기',

    'ae.f3.alt': 'Library 패널 — Text Preset 탭',
    'ae.f3.cap': '실제 Library 패널 — <b>텍스트 프리셋 {textPresets}가지</b>, 글자·단어·줄 단위로 나뉩니다.',
    'ae.f3.h': '등장과 퇴장을 <span class="u">따로</span>',
    'ae.f3.p1': '한 속성에 들어오는 동작과 나가는 동작을 각각 겁니다. 두 시작점은 <b>타임라인 마커</b>로 끕니다 — 키프레임을 다시 찾아 옮길 일이 없습니다.',
    'ae.f3.p2': '적용한 뒤에도 Effect Controls 슬라이더로 계속 만집니다. 다시 적용해도 <b>당신이 맞춘 값을 안 덮습니다.</b>',
    'ae.f3.li': [
      '모션 <b>{motion}</b> <i>— 스프링 물리로 구웠습니다</i>',
      '텍스트 <b>{textPresets}</b> <i>— 가변 폰트 축 4종 포함</i>',
      '그라디언트 <b>{gradients}</b> · 이펙트 프리셋 <b>{effects}</b>',
      '컴프의 이펙트 스택을 <b>캡처해 내 프리셋으로</b> 저장 · 팩으로 내보내기',
    ],

    'ae.f4.alt': 'Curves 패널 — 베지어 이징 에디터',
    'ae.f4.cap': '실제 Curves 패널. 핸들을 끌거나 숫자를 칩니다. <b>Read</b> 로 AE 에서 읽고 <b>Apply</b> 로 겁니다.',
    'ae.f4.h': '이징과 <span class="u">코드</span>',
    'ae.f4.p1': '그래프 에디터에서 핸들을 끌거나 숫자를 칩니다. AE 키프레임에서 <b>지금 이징을 읽어</b> 와서 다른 데 그대로 붙일 수 있습니다.',
    'ae.f4.p2': '익스프레션 에디터는 고치면 <b>0.6초 뒤 자동 적용</b>됩니다 — 껐다 켜며 확인할 일이 없습니다.',
    'ae.f4.li': [
      '이징 커브 <b>{curves}</b> · 내 커브 저장',
      '익스프레션 <b>{expressions}</b> · 11개 묶음',
      '스프링을 <b>키프레임으로 굽습니다</b> <i>— 익스프레션이 아니라 키프레임이라서 재생이 가볍습니다</i>',
    ],

    'ae.f5.alt': 'Custom 1 패널 — 혼합 격자',
    'ae.f5.cap': '실제 Custom 1 패널. 툴 옆에 <b>커브 에디터·익스프레션·그라디언트</b>가 같은 격자에 있습니다.',
    'ae.f5.h': '패널을 <span class="u">내 손에 맞춘다</span>',
    'ae.f5.p1': '쓰는 것만 골라 원하는 자리에 놓습니다. 툴만 담기는 게 아닙니다 — <b>그라디언트·텍스트 프리셋·익스프레션·이펙트·커브</b>를 같은 격자에 섞습니다.',
    'ae.f5.p2': '배치는 여러 개 저장하고 드롭다운으로 갈아 낍니다. 파일로 내보내 다른 컴퓨터에 옮깁니다.',
    'ae.f5.li': [
      '좌표 격자 <i>— 셀 24~160px, 겹치면 서로 밀어냅니다</i>',
      '저장한 배치 <b>여러 개</b> · 파일로 주고받기',
    ],

    /* ── 04 새로 들어온 것 ───────────────────────────────────── */
    'ae.news.h': '새로 들어온 것',
    'ae.news.tag': '마이너 업데이트는 무료입니다.',
    'ae.news.all': '업데이트 노트 전부 →',

    /* ── 도그푸드 증거 ───────────────────────────────────────── */
    'ae.dog.lab': '우리가 먼저 씁니다',
    'ae.dog.p': '이 페이지의 종이 결과 잉크 알갱이는 <b>Riso Print</b> 이펙트에 들어 있는 바로 그 텍스처입니다.',
    'ae.dog.cap': 'Library ▸ Effects ▸ Riso Print',

    /* ── 05 가격 (🔴 버튼 없음 — 레일이 CTA 를 갖는다) ────────── */
    'ae.price.h': '한 번 사면 계속 당신 것',
    'ae.price.tag': '구독이 아닙니다.',
    'ae.price.amount': '{price}',
    'ae.price.incl': ['패널 7개 전부', '컴퓨터 2대', '마이너 업데이트 무료', '14일 환불'],
    'ae.price.why.h': '왜 구독이 아닌가',
    'ae.price.why.p1': '매달 돈을 받으면 매달 이유를 만들어야 합니다. 그러면 도구가 아니라 <b>구독을 유지시키는 물건</b>이 됩니다.',
    'ae.price.why.p2': 'Chat 패널도 같은 이유로 <b>당신의 AI 구독</b>을 씁니다 — Claude 든 ChatGPT 든 이미 내고 계신 것으로요. 우리가 토큰을 되팔면 당신이 도구를 많이 쓸수록 우리가 버는 구조가 되고, 그건 도구를 망가뜨립니다.',
    'ae.price.why.p3': 'AE 와 컴퓨터가 버티는 한 계속 돕니다. 업데이트를 안 받아도 갖고 계신 버전은 계속 돕니다.',
    'ae.after.h': '결제한 뒤',
    'ae.after.s': [
      '라이선스 키와 설치 파일(.zxp)이 결제 확인 메일로 옵니다 — 고객 포털에도 남아 있습니다.',
      'After Effects 를 닫고 무료 ZXP Installer 에 파일을 끌어다 놓습니다 — 설치 안내는 Docs 에 있습니다.',
      'Window ▸ Extensions ▸ You Name It - Support 를 열어 키를 넣으면 나머지 여섯 패널이 열립니다.',
    ],

    /* ── 06 FAQ — 🔴 답은 판정어 한 마디로 시작한다 ──────────── */
    'ae.faq.h': '자주 묻는 것',
    'ae.faq.tag': '답부터 적었습니다.',
    'ae.faq.g1': '작업',
    'ae.faq.g2': '기술',
    'ae.faq.g3': '라이선스',
    'ae.q1.q': '내 작업물이 어디로 나가나요?',
    'ae.q1.v': '우리에겐 안 옵니다',
    'ae.q1.a': 'Chat 을 뺀 나머지는 전부 당신 컴퓨터에서 돕니다 — Depth Pass 와 Face Track 도요. Chat 은 당신이 입력한 내용과 컴프에서 읽은 내용을 당신의 Claude Code 또는 Codex 계정을 통해 Anthropic 이나 OpenAI 로 보냅니다 — 그 도구들을 직접 쓸 때와 같습니다. <b>당신의 작업물은 우리 서버에 오지 않습니다.</b>',
    'ae.q2.q': '브리프 한 줄 넣으면 영상이 나오나요?',
    'ae.q2.v': '아닙니다',
    'ae.q2.a': '그건 만들지 않기로 했습니다. 생각은 당신이 하고, 도구는 <b>구현을 돕습니다.</b> 원하는 걸 문장으로 설명하면 그게 레이어로 앉습니다 — 완성본을 대신 정해 주지는 않습니다.',
    'ae.q3.q': '나온 결과를 고칠 수 있나요?',
    'ae.q3.v': '전부요',
    'ae.q3.a': '버튼으로 만들든 문장으로 만들든 결과는 <b>평범한 AE 레이어·키프레임·익스프레션</b>입니다. 플러그인을 지워도 만들어 둔 것은 그대로 남습니다.',
    'ae.q4.q': 'Chat 을 쓰려면 뭐가 필요한가요?',
    'ae.q4.v': '당신의 AI 구독',
    'ae.q4.a': '<b>Claude Code</b> 를 설치해 Claude Pro 또는 Max 계정으로 로그인하시거나, <b>Codex</b> 를 ChatGPT 계정으로 로그인하시면 됩니다. 둘 중 하나면 되고, 순서는 패널이 안내합니다. 플러그인 값에 AI 사용료가 포함돼 있지 않고, 우리가 따로 받지도 않습니다. <b>Chat 패널만</b> 이게 필요합니다 — 나머지 여섯 패널은 그냥 돕니다.',
    'ae.q5.q': '인터넷이 있어야 하나요?',
    'ae.q5.v': '일부만',
    'ae.q5.a': '툴박스·라이브러리·커브·익스프레션은 오프라인에서 돕니다. <b>Chat 은 연결이 필요합니다.</b> 라이선스는 7일마다 한 번 조용히 확인하고, 연결이 없어도 30일까지는 그대로 쓰실 수 있습니다.',
    'ae.q6.q': '어떤 After Effects 에서 되나요?',
    'ae.q6.v': '2022 이상',
    'ae.q6.a': 'Windows 와 macOS 둘 다 지원합니다. 무료 ZXP Installer 로 설치합니다 — <a href="/ko/ae/docs#install">설치 안내</a>.',
    'ae.q7.q': 'Depth Pass 는 모든 컴퓨터에서 되나요?',
    'ae.q7.v': '인텔 맥은 안 됩니다',
    'ae.q7.a': 'macOS 는 <b>Apple Silicon 에서만</b> 돕니다. Windows 에서는 그래픽카드를 써서 계산합니다. 처음 한 번만 실행 환경을 내려받고, 그 뒤로는 바로 돕니다.',
    'ae.q8.q': '구독인가요?',
    'ae.q8.v': '아닙니다',
    'ae.q8.a': '한 번 결제하고 끝입니다. 결제는 Polar 로 처리됩니다.',
    'ae.q9.q': '몇 대에서 쓸 수 있나요?',
    'ae.q9.v': '2대',
    'ae.q9.a': '동시에 두 대까지 활성화됩니다. 컴퓨터를 바꾸시면 고객 포털이나 패널 안에서 직접 활성화 해제하고 새 컴퓨터에서 활성화하시면 됩니다. <a href="{portal}" target="_blank" rel="noopener">컴퓨터 관리</a> — 구매한 메일로 로그인합니다.',
    'ae.q10.q': '업데이트는 돈을 더 내나요?',
    'ae.q10.v': '마이너는 무료',
    'ae.q10.a': '패널 안에서 알림이 뜨고 그 자리에서 받아 설치합니다.',
    'ae.q11.q': '환불되나요?',
    'ae.q11.v': '14일',
    'ae.q11.a': '구매 후 14일 안에 주문 번호나 결제한 메일 주소와 함께 <a href="mailto:support@younameit.works">support@younameit.works</a> 로 메일을 보내시면 됩니다. 이유는 적지 않으셔도 됩니다.',
    'ae.q12.q': '키를 잃어버렸나요?',
    'ae.q12.v': '포털에 있습니다',
    'ae.q12.a': '<a href="{portal}" target="_blank" rel="noopener">고객 포털</a>에 구매한 메일로 로그인하면 키와 설치 파일이 그대로 있습니다.',

    /* ── 사양 8필드 ─────────────────────────────────────────── */
    'ae.spec.h': '사양',
    'ae.sp1.k': '가격',
    'ae.sp1.v': '{price} USD',
    'ae.sp1.n': '일회 구매 · 세금은 나라마다 달라 결제 화면에 표시 · Polar',
    'ae.sp2.k': '호스트 앱',
    'ae.sp2.v': 'After Effects 2022 이상',
    'ae.sp2.n': '패널 7개 · AE 창 메뉴 ▸ Extensions',
    'ae.sp3.k': '설치 형태',
    'ae.sp3.v': 'ZXP 확장',
    'ae.sp3.n': '무료 ZXP Installer 또는 수동 설치 — <a href="/ko/ae/docs#install">설치 안내</a>',
    'ae.sp4.k': '운영체제',
    'ae.sp4.v': 'Windows · macOS',
    'ae.sp4.n': 'Depth Pass 는 Apple Silicon · Windows GPU 에서만',
    'ae.sp5.k': '라이선스',
    'ae.sp5.v': '컴퓨터 2대 · 1인',
    'ae.sp5.n': '활성화 해제는 <a href="{portal}" target="_blank" rel="noopener">고객 포털</a>에서 직접',
    'ae.sp6.k': '언어',
    'ae.sp6.v': '한국어 · English',
    'ae.sp6.n': '패널 안에서 전환',
    'ae.sp7.k': '네트워크',
    'ae.sp7.v': '7일마다 확인',
    'ae.sp7.n': '오프라인 30일까지 · Chat 은 연결 필요',
    'ae.sp8.k': '지원',
    'ae.sp8.v': 'support@younameit.works',
    'ae.sp8.n': '인앱 업데이트 알림 · <a href="/ko/ae/docs#install">설치 안내</a>',
  },
};

export default AE;
