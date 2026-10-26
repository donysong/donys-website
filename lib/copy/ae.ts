/* `ae` 페이지 사전 — EN/KO. 🔴 이 파일은 **이 페이지 레인만** 고친다.
   v3.3 에 같은 문장이 이미 있으면 새 키를 만들지 말고 그 키를 그대로 써라(EN 번역이 붙어 있다).

   재사용 중인 v33 키(여기 다시 적지 마라 — `lib/copy/v33.ts` 가 정본이다):
     r1.* ~ r4.*  역할 카드 4장 · role.l · role.hint · role.say
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
    'ae.r1.p': 'Every project: the same intro rig, the same null chain, the same ease on twelve layers.',
    'ae.r1.q': 'Stagger the title letters by two frames, soft overshoot.',
    'ae.r1.s': '→ 24 keyframes on your layer, in your comp.',
    'ae.r2.h': 'Marketer',
    'ae.r2.p': 'Three versions of the same promo are due Thursday. Only the copy changes, and there’s no time.',
    'ae.r2.q': 'Swap the headline, keep the motion, export three sizes.',
    'ae.r2.s': '→ three comps on the same rig, each with the new copy.',
    'ae.r3.h': 'Video editor',
    'ae.r3.p': 'You know Premiere by heart. AE is where you go for one title and lose an hour.',
    'ae.r3.q': 'Lower-third, slides in from the left, holds four seconds, out.',
    'ae.r3.s': '→ built as real layers. Edit them like any other.',
    'ae.r4.h': 'Studio of one',
    'ae.r4.p': 'You are the designer, the animator, the renderer and the client call, all before lunch.',
    'ae.r4.q': 'Center all anchors, fit the precomps, add a wiggle to the camera null.',
    'ae.r4.s': '→ one sentence, three chores gone.',
    'ae.role.l': 'Role',
    'ae.role.hint': 'hover → what you\'d say',
    'ae.role.say': 'You\'d say',
    /* ── 네비 · 판 이름 ───────────────────────────────────────── */
    'ae.nav.who': 'Who',
    'ae.nav.what': 'Features',
    'ae.nav.price': 'Free · Pro',
    'ae.nav.faq': 'FAQ',
    'ae.plate.who': 'Who it is for',
    'ae.plate.posi': 'All-in-one AE plugin',
    'ae.plate.what': 'Features',
    'ae.plate.news': 'What’s new',
    'ae.plate.price': 'Free and Pro',
    'ae.plate.faq': 'Common questions',

    /* ── 히어로 ──────────────────────────────────────────────── */
    /* 🔴 페이지의 유일한 약속문이다 — 락업 **아래**, 잉크색, 20px 이상. 전엔 14px 링크색으로 락업 위에 있었다. */
    'ae.hero.promise': 'Focus on the idea.|Leave the repetitive work to the plugin.',
    'ae.hero.plugin': 'AE PLUGIN',
    'ae.hero.sub': 'After Effects 2022+ · Windows · macOS · v{version}',
    'ae.hero.buy.note': 'Pay once, keep it',
    'ae.hero.specs': 'See the specs →',
    /* 두 원판 = *아직 안 샀다 → 구매* / *샀다 → 설치*. 그게 둘이 나란한 이유다. 설치 순서는 Docs 에 산다. */
    'ae.hero.install': 'Already bought?',
    'ae.hero.install.note': 'Install in 3 steps',
    'ae.hero.faq': 'Common questions →',
    /* 히어로 가운데 브랜드 영상(ae/Film.tsx). `play` = 버튼 라벨(R1 · 동사로 시작) — aria 이름도 이 낱말로 시작한다(보이는 라벨 ⊂ 이름).
       `{n}` 은 Film.tsx 의 `SECONDS` 가 채운다(영상 길이는 사전이 아니라 파일 옆에 산다). 자막은 영상에 구워져 있다.
       구 몽타주 키(`ae.hero.rot.tag` · `ae.hero.cap`)는 2026-10-05 몽타주와 같이 지웠다. */
    'ae.film.title': 'You Name It brand film',
    'ae.film.soundOn': 'Turn sound on',
    'ae.film.soundOff': 'Turn sound off',
    'ae.film.subs': 'English and Korean subtitles are part of the picture.',
    'ae.meta.chat': 'Chat needs your own AI plan',

    /* ── 01 Who (역할 카드 문장은 v33 r1~r4) ─────────────────── */
    'ae.who.h': 'Repeating yourself again today?',
    'ae.who.tag': 'Motion designers, marketers, editors, studios of one.<br>They all get stuck in the same place.',

    /* ── 02 포지셔닝 ─────────────────────────────────────────── */
    'ae.posi.myth': 'No more dull,<br>painful busywork.',
    'ae.posi.plain': 'An After Effects plugin with seven panels. Chores you can name take one button; the thing you can only describe goes to Chat. Either way it lands in the comp you have open, as real layers.',
    'ae.posi.plain2': 'It won’t make the video for you. It takes the busywork off your hands.',

    /* ── 03 기능 ─────────────────────────────────────────────── */
    'ae.what.h': 'Seven panels, only what we use',
    'ae.what.tag': 'Everything else<br>we cut.',

    'ae.f1.alt': 'Chat panel with the model picker, trust mode and lint',
    /* 컷 = v2.7.1 태그 · 신뢰 모드 OFF(기본값) · 새 탭(in 0 out 0) — 2026-09-28 재촬영(`tools/promo/panelSpot.mjs`). */
    'ae.f1.cap': 'The Chat panel as it ships. Trust mode is off by default, so it asks before every change.',
    /* 🔴 쉼표 뒤에서 끊는다(2026-09-28 재인) — 쉼표 앞뒤가 한 줄에 섞여 접히면 `SAY IT, IT LANDS ON / LAYERS` 가 된다.
       국문 표제는 쉼표가 없어 그대로 둔다. */
    'ae.f1.h': 'One sentence, 24 keyframes',
    'ae.f1.p1': 'Type “stagger the title letters by two frames, soft overshoot” and Chat writes the keyframes straight into your comp. It runs on Claude Code or Codex on your computer, signed in with your own plan.',
    'ae.f1.p2': 'It runs on <b>Claude Code</b> or <b>Codex</b>, installed on your computer and signed in with <b>your own plan</b>. The panel walks you through installing and signing in. We don’t sell tokens.',
    'ae.f1.li': [
      '<b>Reads</b> the comp you are in before it changes anything',
      'Anything that changes your comp <b>asks first</b> · checkpoints and undo',
      'Lint checks for stray fonts, overlaps and low contrast <b>with one button</b>',
    ],

    /* 판 = Click React — 히어로(판 교대)·후킹 6장·역할 카드 어디에도 없는 툴이다. 같은 증거를 두 번 쓰지 않는다. */
    /* 판 = 실제 Toolbox 클립(v2.7.1 · 16:9) — 버튼 셋에 차례로 올린다. 툴 이름은 패널 정본이라 국문에서도 영문. */
    'ae.f2.alt': 'Toolbox panel, with a preview playing on the hovered button',
    'ae.f2.cap': 'The real Toolbox panel. Point at a button and what it builds plays on top of it: here, Overshoot and Sequence Layers.',
    'ae.f2.h': '<span class="u">{scripts}</span> chores,<br>one button each',
    'ae.f2.p1': 'Center the anchors, fit the precomps, sequence the layers. If you can name the chore, pressing a button is the whole job. Hover first and a preview of the result plays on the button.',
    'ae.f2.p2': 'The preview on each button is <b>16 frames rendered in real AE</b>, so you see what comes out <b>before you press</b>. Settings you have dialed in freeze into <b>your own button</b>.',
    'ae.f2.li': [
      'Find it by category or search',
      'Hover a button to watch what it does before you press',
      '<b>Your own button</b>, with its arguments saved',
    ],

    'ae.hook1.p': 'Gives each selected layer <b>its own value</b> on position, rotation, scale or opacity, by step, range or formula. It writes values, not expressions, so <b>you keep editing them in AE</b>.',
    'ae.hook2.p': 'Rigs the selected layers into an effector. Move one null and scale and opacity answer <b>nearest first</b>. Radius and falloff sit on knobs.',
    'ae.hook3.p': 'Pick a layout pattern and the cells come in as <b>real layers</b>, shapes or precomps, each with its own entrance.',
    'ae.hook4.p': 'Pulls markers out of the audio, at <b>onsets</b> (bass hits and the like) or on a <b>tempo grid</b>, so you are not tapping beats against a waveform.',
    'ae.hook5.p': 'Korean types <b>jamo by jamo</b> (ㅎ → 하 → 한) with a blinking cursor. Typing presets built for Latin text cannot do this.',
    'ae.hook6.p': '<b>Eight</b> patterns built on sliders and baked to vector or PNG: dots, hatch, checker, halftone, truchet, concentric, ASCII and grain. Feed it a layer and its <b>luminance drives the density</b>.',
    'ae.docs.txt': 'The other <b>{rest}</b> are in the Docs, each with its plate, what it does and what it runs on. You can read all of it before you buy.',
    'ae.docs.btn': 'See all {scripts} tools',

    /* 컷 = **Motion 탭**(v2.7.1 태그 · 위치 4 · 회전 4 · 스케일 4 · 믹스 14 = {motion}) — 2026-09-28 재촬영. 이 절(등장·퇴장)의 판이다. */
    'ae.f3.alt': 'Library panel, Motion tab',
    'ae.f3.cap': 'The real Library panel, with <b>{motion} motion presets</b> grouped by position, rotation, scale and mix.',
    'ae.f3.h': 'In and out, <span class="u">separately</span>',
    'ae.f3.p1': 'One property takes an entrance and an exit as two separate moves, with start points you drag as timeline markers. The Assets tab also searches GIPHY, Pexels and Freesound without leaving AE.',
    'ae.f3.p2': 'Once it’s applied, keep tuning it on the Effect Controls sliders. Apply it again and it <b>won’t overwrite the values you set.</b>',
    'ae.f3.li': [
      '<b>{motion}</b> motion presets <i>baked from spring physics</i>',
      '<b>{textPresets}</b> text presets, <i>including 4 that animate variable-font axes</i>',
      '<b>{gradients}</b> gradients · <b>{effects}</b> effect presets',
      '<b>Capture</b> a comp effect stack <b>as your own preset</b> · export it as a pack',
    ],

    'ae.f4.alt': 'Curves panel, the bezier easing editor',
    'ae.f4.cap': 'The real Curves panel. <b>Read</b> pulls the easing from AE and <b>Apply</b> puts it back.',
    'ae.f4.h': 'Copy that easing',
    'ae.f4.p1': 'Drag handles or type the numbers. Read the easing off a keyframe you like and paste it anywhere unchanged. Edit an expression and it applies itself 0.6 seconds later.',
    'ae.f4.p2': 'Edit an expression and it <b>applies itself 0.6 seconds later</b>, so there is no toggling back and forth to check.',
    'ae.f4.li': [
      '<b>{curves}</b> easing curves · save your own',
      '<b>{expressions}</b> expressions · 11 bundles',
      'Springs <b>baked to keyframes</b> <i>with no expressions, so playback stays light</i>',
    ],

    'ae.f5.cap': 'The real Custom 1 panel. <b>Curve editor, expressions and gradients</b> sit in the same grid as the tools.',
    'ae.f5.h': 'A panel shaped to your hand',
    'ae.f5.p1': 'Lay out just the tools, presets and curves you reach for on one board. Save a layout per job and swap them from a dropdown.',
    'ae.f5.p2': 'Save several layouts and swap them from a dropdown. Export one to a file and carry it to another computer.',
    'ae.f5.li': [
      'A coordinate grid <i>with cells from 24 to 160px that push each other aside when they overlap</i>',
      '<b>Several</b> saved layouts · pass them around as files',
    ],

    /* ── 05 새로 들어온 것 (가격 아래 — 오너 2026-09-29) ───────────────────────────────────── */
    'ae.news.h': 'What’s new',
    'ae.news.tag': 'Minor updates are free.',
    /* 🔴 항목·버전·날짜는 `lib/releases.ts` 에서 읽는다(News.tsx). 손으로 쓴 카드 3장은 전부 `v2.7.1` 딱지였는데
       그중 둘이 v2.6.0 기능이었다 — 손으로 쓰면 버전이 거짓말을 한다. */
    'ae.news.all': 'All release notes →',

    /* ── 04 Free · Pro (구매 버튼 하나 = `s.buy` · 무료 다운로드 폼 = Free 칸 — Price.tsx 머리 주석) ────────── */
    /* 2026-10-15 오너 — v2.10.0 부터 Free/Pro. Free = Library · Curves · Expressions · Support + Toolbox {freeTools}개. Pro = Chat · Custom + Toolbox {proTools}개.
       Pro 한 줄 = *"tell AE what to do in words (Chat) + tools you won't easily find elsewhere"*(10-15 오너: 절대형 "nobody else has"·"다른 곳에 없는" 을 낮췄다 — 비교 주장은 입증 부담이 크다).
       🔴 경쟁 제품 이름·비교·"없다"류 단정을 쓰지 마라. */
    'ae.price.h': 'Start free. Pay once for Pro.',
    'ae.price.free.l': 'Free',
    'ae.price.free.amount': '$0',
    'ae.price.free.keep': 'No card needed. Enter your email and we’ll send the download link.',
    'ae.price.free.list': ['Library', 'Curves', 'Expressions', 'Support', '{freeTools} Toolbox tools'],
    'ae.price.pro.l': 'Pro',
    /* §16-1·15·16 (2026-09-28) — 구 "왜 구독이 아닌가" 카드는 걷었다. 🔴 `lifetime`·평생 금지(약관 §4 — 메이저는 유료일 수 있다). */
    'ae.price.amount': '{price}',
    /* 가격 옆 한 줄 = 구 카드의 결론 문장(`why.p3` 둘째 문장) 그대로. 새 주장 0. */
    'ae.price.keep': 'Skip every update and the version you bought keeps working.',
    'ae.price.pro.lead': 'Everything in Free, plus',
    'ae.price.pro.list': [
      '<b>Chat</b>: tell AE what to do in words. It runs on your own Claude or ChatGPT plan.',
      '<b>Custom</b> panel: your own layout of tools, presets and curves',
      '<b>{proTools} Pro-only Toolbox tools</b>',
    ],
    /* 약속 셋 + 포함 셋은 Pro 칸 밑 캡션 한 줄로 합친다(칸이 둘이 되면서 구 큰 약속 목록 `.pvow` 는 걷었다). */
    'ae.price.vow': ['Pay once', 'No subscription', 'Minor updates free'],
    'ae.price.incl': ['All seven panels', 'Two computers', '14-day refund'],
    /* 구 `ae.after.*`(결제한 뒤 3단계)는 2026-09-29 오너 1-8 로 가격 판에서 뺐다 — Docs `docs.step1~3` 이 같은 순서를 갖는다. */

    /* ── 06 FAQ — 🔴 답은 판정어 한 마디로 시작한다 ──────────── */
    'ae.faq.h': 'Common questions',
    'ae.faq.tag': 'Answers first.',
    'ae.faq.g1': 'Work',
    'ae.faq.g2': 'Technical',
    'ae.faq.g3': 'License',
    'ae.q1.q': 'Where does my work go?',
    /* 🔴 구 판정어 `Nowhere` 는 거짓이었다 — Chat 은 입력과 컴프에서 읽은 내용을 유저 계정으로 Anthropic/OpenAI 에 보낸다. */
    'ae.q1.v': 'Not to us',
    'ae.q1.a': 'Everything except Chat runs on your computer, Depth Pass and Face Track included. Chat sends what you type, and what it reads from your comp, to Anthropic or OpenAI through your own Claude Code or Codex account, just as those tools do when you use them directly. <b>None of your work reaches our servers.</b>',
    'ae.q2.q': 'Type one brief and get a finished video?',
    'ae.q2.v': 'No',
    'ae.q2.a': 'We decided not to build that. You do the thinking and the tool <b>helps you build it.</b> Describe what you want and it lands as layers, but the finished piece is still yours to decide.',
    'ae.q3.q': 'Can I edit what comes out?',
    'ae.q3.v': 'All of it',
    'ae.q3.a': 'Button or sentence, what comes out is <b>ordinary AE layers, keyframes and expressions</b>. Delete the plugin and everything you made stays.',
    'ae.q4.q': 'What do I need to use Chat?',
    'ae.q4.v': 'Your own AI plan',
    'ae.q4.a': 'Install <b>Claude Code</b> and sign in with a Claude Pro or Max account, or install <b>Codex</b> and sign in with a ChatGPT account. Either one works, and the panel walks you through it. The plugin price doesn’t include AI usage, and we don’t charge for it separately. <b>Only the Chat panel</b> needs this. The other six run without it.',
    'ae.q5.q': 'Do I need an internet connection?',
    'ae.q5.v': 'Partly',
    'ae.q5.a': 'Toolbox, Library, Curves and Expressions run without one. <b>Chat needs a connection.</b> The license checks in quietly once every seven days, and you can keep working up to 30 days without one.',
    'ae.q6.q': 'Which After Effects does it run on?',
    'ae.q6.v': '2022 and up',
    'ae.q6.a': 'Windows and macOS both. It installs with the free ZXP Installer (<a href="/ae/docs#install">install guide</a>).',
    'ae.q7.q': 'Does Depth Pass run on every computer?',
    'ae.q7.v': 'Not on Intel Macs',
    'ae.q7.a': 'On macOS it runs <b>on Apple Silicon only</b>. On Windows it uses the graphics card and falls back to the CPU when it has to. The first run downloads about 110 MB once; after that it starts straight away.',
    'ae.q8.q': 'Is it a subscription?',
    'ae.q8.v': 'No',
    'ae.q8.a': 'One payment and that’s it. Checkout is handled by Polar.',
    'ae.q9.q': 'How many computers can I use it on?',
    'ae.q9.v': 'Two',
    'ae.q9.a': 'Two active at a time. When you change computers you deactivate one yourself, from the customer portal or inside the panel, and activate the new one. To <a href="{portal}" target="_blank" rel="noopener">manage your computers</a>, sign in with the email you paid with.',
    'ae.q10.q': 'Do updates cost extra?',
    'ae.q10.v': 'Minors are free',
    'ae.q10.a': 'A notice appears inside the panel and you install it right there.',
    'ae.q11.q': 'Can I get a refund?',
    'ae.q11.v': '14 days',
    /* 사실 = `/refund` (14일 · 이유 안 물음 · 주문 번호나 결제 메일). 어긋나면 둘 중 하나가 거짓이다. */
    'ae.q11.a': 'Email <a href="mailto:support@younameit.works">support@younameit.works</a> within 14 days of purchase, with your order number or the email you paid with. No need to explain why.',
    'ae.q12.q': 'Lost your key?',
    'ae.q12.v': 'It’s in the portal',
    'ae.q12.a': 'Sign in to the <a href="{portal}" target="_blank" rel="noopener">customer portal</a> with the email you paid with. Your key and the installer are there.',

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
    'ae.sp3.n': 'Free ZXP Installer, or by hand · <a href="/ae/docs#install">install guide</a>',
    'ae.sp4.k': 'Operating system',
    'ae.sp4.v': 'Windows · macOS',
    'ae.sp4.n': 'Depth Pass runs on Apple Silicon Macs and on Windows, not on Intel Macs',
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

    /* 기능 5 판(Custom 1 클립)의 접근성 이름 — 화면엔 안 보인다. */
    'ae.f5.alt': 'Custom 1 panel with two saved layouts, swapped from the dropdown',
    /* ── v5 /ae (2026-10-26) — Pro 딱지 · 연결 링크 ── */
    'ae.v5.pro': 'Pro',
    'ae.v5.more.chat': 'How to connect Chat',
    'ae.v5.more.search': 'Connect GIPHY, Pexels and Freesound',
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
    'ae.r1.p': '프로젝트마다 같은 인트로 리그, 같은 널 체인, 열두 레이어에 같은 이징.',
    'ae.r1.q': '타이틀 글자 두 프레임씩 엇갈리게, 오버슈트 살짝.',
    'ae.r1.s': '→ 지금 컴프의 그 레이어에 키프레임 24개.',
    'ae.r2.h': '마케터',
    'ae.r2.p': '목요일까지 같은 홍보물을 세 버전으로 내야 해요. 카피만 다르고 모션은 같은데 시간이 없어요.',
    'ae.r2.q': '헤드라인만 바꾸고 모션은 그대로, 세 사이즈로.',
    'ae.r2.s': '→ 같은 리그에 새 카피를 얹은 컴프 세 개.',
    'ae.r3.h': '영상 편집자',
    'ae.r3.p': '프리미어는 손에 익었는데, AE는 타이틀 하나 만들러 들어갔다가 한 시간을 써요.',
    'ae.r3.q': '왼쪽에서 들어와 4초 머무는 로어서드.',
    'ae.r3.s': '→ 진짜 레이어로 들어와요. 평소처럼 고치면 돼요.',
    'ae.r4.h': '1인 스튜디오',
    'ae.r4.p': '디자이너이자 애니메이터이자 렌더 담당이고, 점심 전에 클라이언트 통화까지 해요.',
    'ae.r4.q': '앵커 전부 가운데로, 프리컴프 맞추고, 카메라 널에 위글.',
    'ae.r4.s': '→ 문장 하나에 잡일 셋이 사라져요.',
    'ae.role.l': '역할',
    'ae.role.hint': '올려 보면 → 이렇게 말하면 돼요',
    'ae.role.say': '이렇게 말하면 돼요',
    /* ── 네비 · 판 이름 ───────────────────────────────────────── */
    'ae.nav.who': '누구를',
    'ae.nav.what': '기능',
    'ae.nav.price': '무료 · Pro',
    'ae.nav.faq': 'FAQ',
    'ae.plate.who': '누구를 위한 것',
    'ae.plate.posi': '올인원 에펙 플러그인',
    'ae.plate.what': '기능',
    'ae.plate.news': '새로 들어온 것',
    'ae.plate.price': '무료와 Pro',
    'ae.plate.faq': '자주 묻는 것',

    /* ── 히어로 ──────────────────────────────────────────────── */
    'ae.hero.promise': '아이디어에 집중하세요.|반복 작업은 플러그인이 맡을게요.',
    'ae.hero.plugin': 'AE PLUGIN',
    'ae.hero.sub': 'After Effects 2022+ · Windows · macOS · v{version}',
    'ae.hero.buy.note': '한 번 사서 계속 써요',
    'ae.hero.specs': '사양 보기 →',
    'ae.hero.install': '이미 사셨나요?',
    'ae.hero.install.note': '설치는 3단계',
    'ae.hero.faq': '자주 묻는 것 →',
    'ae.film.title': 'You Name It 브랜드 영상',
    'ae.film.soundOn': '소리 켜기',
    'ae.film.soundOff': '소리 끄기',
    'ae.film.subs': '영어·한국어 자막이 화면에 들어 있어요.',
    'ae.meta.chat': 'Chat은 본인 AI 구독 필요',

    /* ── 01 Who (역할 카드 문장은 v33 r1~r4) ─────────────────── */
    'ae.who.h': '오늘도 반복 작업 하시나요?',
    'ae.who.tag': '모션 디자이너, 마케터, 편집자, 1인 스튜디오.<br>넷 다 같은 데서 막혀요.',

    /* ── 02 포지셔닝 ─────────────────────────────────────────── */
    /* 🔴 `네` 는 반말이다 — 이 페이지의 2인칭은 전부 `당신` 이다(역할 카드 KO 를 다시 쓴 이유와 같다). */
    'ae.posi.myth': '지루하고 괴로운 반복 작업은<br>이제 그만.',
    'ae.posi.plain': '패널 일곱 개짜리 After Effects 플러그인이에요. 이름 붙일 수 있는 잡일은 버튼 하나로, 말로밖에 설명 못 하는 건 Chat에 시키면 돼요. 결과는 지금 열린 컴프에 진짜 레이어로 들어와요.',
    'ae.posi.plain2': '영상을 대신 만들어 주진 않아요. 만드는 손을 덜어 줄 뿐이에요.',

    /* ── 03 기능 ─────────────────────────────────────────────── */
    'ae.what.h': '패널 일곱 개, 매일 쓰는 것만',
    'ae.what.tag': '나머지는<br>다 뺐어요.',

    'ae.f1.alt': 'Chat 패널 화면. 모델 선택, 신뢰 모드, 검사 버튼이 보여요',
    'ae.f1.cap': '지금 배포 중인 Chat 패널 그대로예요. 신뢰 모드가 기본으로 꺼져 있어서 뭘 바꾸기 전에 꼭 물어봐요.',
    'ae.f1.h': '말 한 줄에 키프레임 24개',
    'ae.f1.p1': '“타이틀 글자 두 프레임씩 엇갈리게, 오버슈트 살짝”이라고 치면 Chat이 지금 컴프에 키프레임을 직접 넣어요. 내 컴퓨터의 Claude Code나 Codex에 본인 구독으로 로그인해서 돌아가요.',
    'ae.f1.p2': '내 컴퓨터에 설치하고 <b>본인 구독</b>으로 로그인한 <b>Claude Code</b>나 <b>Codex</b>로 돌아가요. 설치와 로그인은 패널이 차근차근 알려 줘요. 우리는 토큰을 팔지 않아요.',
    'ae.f1.li': [
      '바꾸기 전에 지금 컴프부터 <b>읽어요</b>',
      '바꾸는 동작은 <b>매번 승인 창</b> · 체크포인트와 되돌리기',
      '엉뚱한 폰트 · 겹침 · 낮은 대비를 <b>버튼 하나로</b> 검사',
    ],

    /* 판 = 실제 Toolbox 클립(v2.7.1 · 16:9) — 버튼 셋에 차례로 올린다. 툴 이름은 패널 정본이라 국문에서도 영문. */
    'ae.f2.alt': 'Toolbox 패널 화면. 버튼에 올리면 그 위에서 미리보기가 돌아요',
    'ae.f2.cap': '실제 Toolbox 패널이에요. 버튼에 마우스를 올리면 그 툴이 만들 결과가 버튼 위에서 돌아요. 여기선 Overshoot와 Sequence Layers예요.',
    'ae.f2.h': '잡일 {scripts}가지, 버튼 하나씩',
    'ae.f2.p1': '앵커 가운데로, 프리컴프 맞추기, 레이어 순차 배치. 이름 붙일 수 있는 잡일은 누르면 끝나요. 누르기 전에 올려 보면 결과 미리보기가 버튼 위에서 돌아요.',
    'ae.f2.p2': '버튼 위 미리보기는 <b>실제 AE에서 렌더한 16프레임</b>이라, <b>누르기 전에</b> 뭐가 나올지 보여요. 한 번 맞춘 설정은 굳혀서 <b>내 버튼</b>으로 만들어요.',
    'ae.f2.li': [
      '카테고리나 검색으로 찾아요',
      '버튼에 올리면 누르기 전에 뭘 하는지 보여요',
      '인자까지 저장되는 <b>내 버튼</b>',
    ],

    'ae.hook1.p': '선택한 레이어마다 위치, 회전, 스케일, 불투명도 중 하나에 각기 다른 값을 넣어요. 간격, 범위, 수식 중에 고르면 되고, 익스프레션이 아니라 값으로 들어가서 바로 고칠 수 있어요.',
    'ae.hook2.p': '선택한 레이어를 이펙터 리그로 묶어요. 널 하나를 움직이면 가까운 것부터 크기와 불투명도가 반응해요. 반경과 감쇠는 노브로 조절해요.',
    'ae.hook3.p': '배치 패턴을 고르면 셀이 셰이프나 프리컴프 같은 진짜 레이어로 깔리고, 셀마다 등장 애니메이션이 따로 붙어요.',
    'ae.hook4.p': '오디오에서 마커를 따요. 온셋(베이스가 치는 지점)이나 템포 격자 중에 골라요. 파형 보면서 박자를 손으로 찍을 일이 없어요.',
    'ae.hook5.p': '한글이 ㅎ → 하 → 한처럼 자모 단위로 쳐지고, 깜빡이는 커서도 같이 붙어요. 영문 기준 타이핑 프리셋으론 안 되는 거예요.',
    'ae.hook6.p': '도트, 해치, 체커, 하프톤, 트뤼셰, 동심원, 아스키, 그레인. 패턴 8종을 슬라이더로 만들고 벡터나 PNG로 구워요. 레이어를 넣으면 그 밝기대로 패턴 농도가 바뀌어요.',
    'ae.docs.txt': '나머지 {rest}개도 Docs에 그림과 함께 있어요. 툴마다 뭘 하는지, 어떤 레이어에 쓰는지 적어 뒀으니 사기 전에 한번 읽어 보세요.',
    'ae.docs.btn': '툴 {scripts}종 전부 보기',

    'ae.f3.alt': 'Library 패널의 Motion 탭',
    'ae.f3.cap': '실제 Library 패널이에요. 모션 프리셋 {motion}가지가 위치, 회전, 스케일, 믹스로 나뉘어 있어요.',
    'ae.f3.h': '등장 따로, 퇴장 따로',
    'ae.f3.p1': '한 속성에 등장과 퇴장을 따로 걸고, 시작점은 타임라인 마커로 끌어요. 에셋 탭에선 AE를 안 떠나고 GIPHY, Pexels, Freesound까지 뒤져요.',
    'ae.f3.p2': '적용한 뒤에도 Effect Controls 슬라이더로 계속 만질 수 있어요. 다시 적용해도 <b>내가 맞춘 값은 안 덮어써요.</b>',
    'ae.f3.li': [
      '모션 <b>{motion}</b> <i>(스프링 물리로 구움)</i>',
      '텍스트 <b>{textPresets}</b> <i>(가변 폰트 축을 움직이는 4종 포함)</i>',
      '그라디언트 <b>{gradients}</b> · 이펙트 프리셋 <b>{effects}</b>',
      '컴프의 이펙트 스택을 <b>캡처해 내 프리셋으로</b> 저장 · 팩으로 내보내기',
    ],

    'ae.f4.alt': 'Curves 패널의 베지어 이징 에디터',
    /* v2.7.1 부터 국문 Curves 버튼이 한글이다(`읽기`·`적용` — 구 v2.6.0 컷은 영문이었다). 판과 같은 말을 쓴다. */
    'ae.f4.cap': '실제 Curves 패널이에요. ‘읽기’로 AE의 이징을 가져오고 ‘적용’으로 다시 걸어요.',
    'ae.f4.h': '그 이징, 그대로 복사',
    'ae.f4.p1': '그래프에서 핸들을 끌거나 숫자를 쳐요. 마음에 드는 키프레임의 이징을 읽어 와서 다른 데 그대로 붙이고, 익스프레션은 고치면 0.6초 뒤에 알아서 걸려요.',
    'ae.f4.p2': '익스프레션은 고치면 <b>0.6초 뒤에 알아서 적용</b>돼요. 껐다 켜며 확인할 필요가 없어요.',
    'ae.f4.li': [
      '이징 커브 <b>{curves}</b> · 내 커브 저장',
      '익스프레션 <b>{expressions}</b> · 11개 묶음',
      '스프링을 <b>키프레임으로 구워요</b> <i>(익스프레션을 안 써서 재생이 가벼워요)</i>',
    ],

    'ae.f5.cap': '실제 Custom 1 패널이에요. 툴 옆에 커브 에디터, 익스프레션, 그라디언트가 한 격자에 같이 있어요.',
    'ae.f5.h': '내 손에 맞춘 패널',
    'ae.f5.p1': '자주 쓰는 툴과 프리셋, 커브만 골라 한 판에 깔아요. 배치는 작업마다 저장해 두고 드롭다운으로 바꿔 끼우세요.',
    'ae.f5.p2': '배치를 여러 개 저장해 두고 드롭다운으로 바꿔 끼워요. 파일로 내보내서 다른 컴퓨터로 옮길 수도 있어요.',
    'ae.f5.li': [
      '좌표 격자 <i>(셀 24~160px, 겹치면 서로 밀어내요)</i>',
      '저장한 배치 <b>여러 개</b> · 파일로 주고받기',
    ],

    /* ── 05 새로 들어온 것 (가격 아래 — 오너 2026-09-29) ───────────────────────────────────── */
    'ae.news.h': '새로 들어온 것',
    'ae.news.tag': '마이너 업데이트는 무료예요.',
    'ae.news.all': '업데이트 노트 전부 보기 →',

    /* ── 04 무료 · Pro (구매 버튼 하나 = `s.buy` · 무료 다운로드 폼 = Free 칸 — Price.tsx 머리 주석) ────────── */
    'ae.price.h': '무료로 시작, Pro는 한 번 결제',
    'ae.price.free.l': '무료',
    'ae.price.free.amount': '$0',
    'ae.price.free.keep': '카드는 필요 없어요. 이메일만 넣으면 다운로드 링크를 보내 드려요.',
    'ae.price.free.list': ['Library', 'Curves', 'Expressions', 'Support', 'Toolbox 툴 {freeTools}개'],
    'ae.price.pro.l': 'Pro',
    'ae.price.amount': '{price}',
    'ae.price.keep': '업데이트를 안 받아도, 갖고 있는 버전은 계속 돌아가요.',
    'ae.price.pro.lead': '무료 기능 전부에 더해',
    'ae.price.pro.list': [
      '<b>Chat</b>: AE에 할 일을 말로 시켜요. 본인의 Claude나 ChatGPT 구독으로 돌아가요.',
      '<b>Custom</b> 패널: 툴, 프리셋, 커브로 짜는 나만의 배치',
      'Pro 전용 <b>Toolbox 툴 {proTools}개</b>',
    ],
    'ae.price.vow': ['일회 구매', '구독 없음', '마이너 업데이트 무료'],
    'ae.price.incl': ['패널 7개 전부', '컴퓨터 2대', '14일 환불'],

    /* ── 06 FAQ — 🔴 답은 판정어 한 마디로 시작한다 ──────────── */
    'ae.faq.h': '자주 묻는 것',
    'ae.faq.tag': '답부터 적었어요.',
    'ae.faq.g1': '작업',
    'ae.faq.g2': '기술',
    'ae.faq.g3': '라이선스',
    'ae.q1.q': '내 작업물이 어디로 나가나요?',
    'ae.q1.v': '우리한텐 안 와요',
    'ae.q1.a': 'Chat만 빼면 전부 내 컴퓨터 안에서 돌아가요. Depth Pass와 Face Track도 마찬가지예요. Chat은 입력한 내용과 컴프에서 읽은 내용을 본인의 Claude Code나 Codex 계정을 거쳐 Anthropic이나 OpenAI로 보내요. 그 도구를 직접 쓸 때와 똑같아요. <b>작업물은 우리 서버로 오지 않아요.</b>',
    'ae.q2.q': '브리프 한 줄 넣으면 영상이 나오나요?',
    'ae.q2.v': '아니요',
    'ae.q2.a': '그런 물건은 안 만들기로 했어요. 생각은 당신이 하고 도구는 <b>만드는 걸 거들어요.</b> 원하는 걸 문장으로 설명하면 레이어로 들어오지만, 완성본까지 대신 정해 주지는 않아요.',
    'ae.q3.q': '나온 결과를 고칠 수 있나요?',
    'ae.q3.v': '전부요',
    'ae.q3.a': '버튼으로 만들든 문장으로 만들든 결과는 <b>평범한 AE 레이어, 키프레임, 익스프레션</b>이에요. 플러그인을 지워도 만들어 둔 건 그대로 남아요.',
    'ae.q4.q': 'Chat을 쓰려면 뭐가 필요한가요?',
    'ae.q4.v': '본인 AI 구독',
    'ae.q4.a': '<b>Claude Code</b>를 설치해 Claude Pro나 Max 계정으로 로그인하거나, <b>Codex</b>를 설치해 ChatGPT 계정으로 로그인하면 돼요. 둘 중 하나면 되고, 순서는 패널이 안내해요. 플러그인 값에 AI 사용료는 들어 있지 않고, 우리가 따로 받지도 않아요. 이게 필요한 건 <b>Chat 패널뿐</b>이고, 나머지 여섯 패널은 없어도 돌아가요.',
    'ae.q5.q': '인터넷이 있어야 하나요?',
    'ae.q5.v': '일부만',
    'ae.q5.a': 'Toolbox, Library, Curves, Expressions는 오프라인에서도 돌아가요. <b>Chat은 연결이 필요해요.</b> 라이선스는 7일마다 한 번 조용히 확인하고, 연결이 없어도 30일까지는 그대로 쓸 수 있어요.',
    'ae.q6.q': '어떤 After Effects에서 되나요?',
    'ae.q6.v': '2022 이상',
    'ae.q6.a': 'Windows와 macOS 둘 다 돼요. 무료 ZXP Installer로 설치해요(<a href="/ko/ae/docs#install">설치 안내</a>).',
    'ae.q7.q': 'Depth Pass는 모든 컴퓨터에서 되나요?',
    'ae.q7.v': '인텔 맥은 안 돼요',
    'ae.q7.a': 'macOS는 <b>Apple Silicon에서만</b> 돌아가요. Windows에서는 그래픽카드로 계산하고, 안 되면 CPU로 계산해요. 처음 쓸 때 약 110MB를 한 번 내려받고, 그다음부터는 바로 실행돼요.',
    'ae.q8.q': '구독인가요?',
    'ae.q8.v': '아니요',
    'ae.q8.a': '한 번 결제하면 끝이에요. 결제는 Polar가 처리해요.',
    'ae.q9.q': '몇 대에서 쓸 수 있나요?',
    'ae.q9.v': '2대',
    'ae.q9.a': '동시에 두 대까지 활성화할 수 있어요. 컴퓨터를 바꿀 땐 고객 포털이나 패널에서 직접 활성화를 해제하고, 새 컴퓨터에서 다시 활성화하면 돼요. <a href="{portal}" target="_blank" rel="noopener">컴퓨터 관리</a> 페이지에는 구매한 메일로 로그인해요.',
    'ae.q10.q': '업데이트는 돈을 더 내나요?',
    'ae.q10.v': '마이너는 무료',
    'ae.q10.a': '패널 안에 알림이 뜨면 그 자리에서 받아 설치하면 돼요.',
    'ae.q11.q': '환불되나요?',
    'ae.q11.v': '14일',
    'ae.q11.a': '구매 후 14일 안에 주문 번호나 결제한 메일 주소를 적어 <a href="mailto:support@younameit.works">support@younameit.works</a>로 메일을 보내 주세요. 이유는 안 적으셔도 돼요.',
    'ae.q12.q': '키를 잃어버렸어요',
    'ae.q12.v': '포털에 있어요',
    'ae.q12.a': '<a href="{portal}" target="_blank" rel="noopener">고객 포털</a>에 구매한 메일로 로그인하면 키와 설치 파일이 그대로 있어요.',

    /* ── 사양 8필드 ─────────────────────────────────────────── */
    'ae.spec.h': '사양',
    'ae.sp1.k': '가격',
    'ae.sp1.v': '{price} USD',
    'ae.sp1.n': '일회 구매 · 세금은 나라마다 달라서 결제 화면에 나와요 · 결제는 Polar',
    'ae.sp2.k': '호스트 앱',
    'ae.sp2.v': 'After Effects 2022 이상',
    'ae.sp2.n': '패널 7개 · AE 창(Window) ▸ 확장명(Extensions)',
    'ae.sp3.k': '설치 형태',
    'ae.sp3.v': 'ZXP 확장',
    'ae.sp3.n': '무료 ZXP Installer 또는 수동 설치 · <a href="/ko/ae/docs#install">설치 안내</a>',
    'ae.sp4.k': '운영체제',
    'ae.sp4.v': 'Windows · macOS',
    'ae.sp4.n': 'Depth Pass는 Apple Silicon Mac과 Windows에서 돌고, 인텔 Mac에서는 안 돼요',
    'ae.sp5.k': '라이선스',
    'ae.sp5.v': '컴퓨터 2대 · 1인',
    'ae.sp5.n': '활성화 해제는 <a href="{portal}" target="_blank" rel="noopener">고객 포털</a>에서 직접 해요',
    'ae.sp6.k': '언어',
    'ae.sp6.v': '한국어 · English',
    'ae.sp6.n': '패널 안에서 바꿔요',
    'ae.sp7.k': '네트워크',
    'ae.sp7.v': '7일마다 확인',
    'ae.sp7.n': '오프라인으로 30일까지 · Chat은 연결 필요',
    'ae.sp8.k': '지원',
    'ae.sp8.v': 'support@younameit.works',
    'ae.sp8.n': '패널 안 업데이트 알림 · <a href="/ko/ae/docs#install">설치 안내</a>',

    /* 기능 5 판(Custom 1 클립)의 접근성 이름 — 화면엔 안 보인다. */
    'ae.f5.alt': 'Custom 1 패널 화면. 저장한 배치 두 개를 드롭다운으로 바꿔요',
    /* ── v5 /ae (2026-10-26) — 숫자 판 · Pro 딱지. 숫자 자체는 lib/product.ts COUNTS ── */
    'ae.v5.pro': 'Pro',
    'ae.v5.more.chat': 'Chat 연결하는 법',
    'ae.v5.more.search': 'GIPHY·Pexels·Freesound 연결하는 법',
  },
};

export default AE;
