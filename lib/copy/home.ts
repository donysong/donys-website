/* `home` 페이지 사전 — EN/KO. 🔴 이 파일은 **이 페이지 레인만** 고친다.
   v3.3 에 같은 문장이 이미 있으면 새 키를 만들지 말고 그 키를 그대로 써라(EN 번역이 붙어 있다).

   국문은 `docs/research/website-2026-09/proto4/index.html` 에서 옮겨 왔고, 2026-09-29 오너 요청(1-5)으로
   양 로캘 모두 humanizer 패스를 한 번 거쳤다(대시·대구·마무리 경구 정리). 🔴 표시된 오너 잠금 문장
   (`hero.h1a·h1b·sub·typed` · `brand.pull.*`)은 그 패스에서도 건드리지 않았다.
   (v33 대조 결과: 프로토4 루트의 문장 중 v33 과 **글자까지 같은 것은 하나도 없다** —
    `돌은 이야기가 된다`(v33 q.stone) ↔ `돌 하나가 이야기가 된다. 같은 돌, 다른 이름.` 처럼
    비슷한 쌍은 있지만 다른 문장이라 재사용하지 않았다.)

   🔴 숫자를 여기 박지 마라 — `{price}` 자리표시자를 `lib/copy.ts` 가 `lib/product.ts` 로 채운다. */
import type { Dict } from './types';

const HOME: Dict = {
  en: {
    /* 네비 · 판 이름 (섹션 data-name 이 같은 키를 쓴다) */
    'home.nav.lineup': 'What we made',
    'home.nav.brand': 'What we are',
    'home.nav.who': 'Who makes it',

    /* 00 표지 — 태그라인 2줄, 그게 전부다.
       🔴 **h1a·h1b 는 양 로캘이 같은 문자열이다 — 번역하지 마라** (오너 2026-09-19).
       브랜드명 자체가 표제다. 구 판본은 EN `Anything. / Just say it.` · KO `뭐든 / 말만 해.` 로
       양쪽이 이 관용구를 **각자 의역**하고 있었고, 그래서 같은 면의 워드마크와 어긋났다. */
    'home.hero.stamp': 'Studio · 2026',
    'home.hero.h1a': 'You',
    'home.hero.h1b': 'Name It.',
    /* 🔴 한 문장이다 — 오너 2026-09-19 (*"이것만 남겨"*). 구 판본은 뒤에 "Video, tools, writing —
       the medium is open." 이 붙어 있었다. 되살리지 마라. */
    'home.hero.sub': 'We make tools and content for people who create.',
    'home.hero.typed': 'We don’t give you the answer — the [[creator]] names it.',
    'home.hero.fig1': 'One stone becomes [[a story.]]',
    'home.hero.fig2': 'Same stone, __different name.__',

    /* 01 만든 것 — 🔴 5% 지점. 철학보다 먼저 제품이 있다 */
    /* 🔴 둘째·셋째 줄 = 구 `아직 무제` 행의 문장(2026-09-28 재인 *"이거 빼고 처음 소개 부분에 내용 합치기"*).
       히어로 부제(`home.hero.sub`)가 아니라 여기인 이유: 부제는 오너가 **한 문장으로 잠갔고**
       매체 나열(*"Video, tools, writing"*)을 되살리지 말라고 적어 두었다 — 같은 뜻이 거기 붙으면 그걸 되살리는 것이다. */
    'home.lineup.tag': 'We only sell what we use first.<br>The next one has no name yet.<br>It could be a tool, a film, or writing.',
    'home.row1.aria': 'See You Name It AE Plugin',
    'home.row1.spot': 'Bento Grid preview',
    'home.row1.brand': 'You Name It',
    'home.row1.name': 'AE Plugin',
    'home.row1.badge': 'PLUGIN',
    'home.row1.one': 'Repetitive setup takes one button. The rest you describe in plain words, and it lands on your layers, still editable.',
    'home.row1.chip': 'Ae',
    'home.row1.price': '{price} <em>USD</em>',
    'home.row1.go': 'See the plugin',

    /* 02 우리는 무엇인가 — 🔴 35% 지점. 위가 아니라 여기 */
    'home.brand.h2': 'What we are',
    'home.brand.tag': 'It is all in the name.',
    'home.brand.col.biz': 'in business',
    'home.brand.col.brd': 'in the brand',
    'home.brand.you.biz': 'The individual who creates — our customer, and us',
    'home.brand.you.brd': 'I do the deciding. Not someone else',
    'home.brand.name.biz': 'The work of giving meaning — tools take the hands, the judgment stays',
    'home.brand.name.brd': 'I put my own words on what I lived through',
    'home.brand.it.biz': 'The clause that picks no medium — video, tools, writing, anything',
    'home.brand.it.brd': 'The thing with no name yet. The blank file in front of me',
    'home.brand.pull.a': 'Your own thinking —',
    'home.brand.pull.b': 'not someone else’s definitions.',
    'home.brand.pull.src': '— what we fight',
    /* `You [   ] It` 빈칸(§16-20) — 힌트는 한 줄, 조용히. 설명하지 않는다(빈칸이 스스로 읽힌다).
       🔴 두 로캘 다 **서술**이다(VOICE_AND_TERMS R4 — 힌트에 명령형 금지: EN plain present · KO 합니다체).
       `Write yours in.` 은 명령형이라 안 썼다. `비우기` = clear(§3 단어장). */
    'home.youit.hint': 'You fill in the blank.',
    'home.youit.clear': 'Clear',
    'home.brand.lead': 'A tool <b>stands in for your hands. It does not stand in for your judgment.</b> You do the thinking and we help with the building, so everything our tools leave behind comes out <b>ready to be taken apart</b>, as layers and keyframes you can still edit. We do not build things that spit out a finished piece from one line of a brief, because that would take your judgment away.',
    /* 🔴 병렬이 아니라 순서다 (브랜드 가이드 PERSONALITY 장) */
    'home.brand.p1.h': 'Take apart',
    'home.brand.p1.p': 'What looks obvious was designed to look that way. Take it apart and you see conditions, not taste.',
    'home.brand.p2.h': 'Give it meaning',
    'home.brand.p2.p': 'Put your own name on the place you opened up. Erase the box someone else filled in and write it again. We do not hand out answers.',
    'home.brand.p3.h': 'Keep going',
    'home.brand.p3.p': 'Not one awakening but doing it again and again. Not so far ahead that you die on the hill, and not falling behind either.',
    'home.brand.order': '↑ Not a list — an order. Take apart → give it meaning → keep going.',

    /* 03 만드는 사람 */
    'home.who.tag': 'We use it on our own work first.',
    'home.who.myth': 'People who introduce themselves not by company or title, but by what they created this week.',
    'home.who.mythcap': '— what it looks like when we have won',
    'home.who.p1': 'One day, in the middle of making a video, we repeated the same setup for the tenth time and started building the thing that would do it instead. It became an After Effects plugin. <b>It is the tool we use every day</b>, and anything we do not use is not in it.',
    'home.who.p2': 'It stays that way: we run into it first, use it first, and sell it after. We hold the result to a professional level and keep the process honest.',
    /* 🔴 표제(`myth`) 바로 밑 증거 한 줄 — 버전·날짜·문장은 **`lib/releases.ts` 에서 읽는다**(Who.tsx).
       캡션(`— what it looks like when we have won`)이 빠진 뒤 표제가 "누구 얘기인지" 안 읽혔다.
       우리가 이번 주에 만든 것을 그 자리에 놓아 표제를 우리가 실천한다는 걸 보인다. */
    'home.who.latest': 'What we made most recently',
    'home.who.latest.go': 'Release notes →',
    'home.who.nots.h': 'We don’t do',
    'home.who.nots': ['Course channels', 'Tutorials', 'Self-help', 'Tool reviews', 'Struggle porn'],

    /* ── v5 홈 (2026-10-26 오너 *"홈은 브랜드 소개 · 철학은 타일 하나 + 끝 한 줄 · 짧게"*) ──
       뼈대 = mindmarket 홈(주장형 제목 + 한 문단 + 행동 하나). 사실은 전부 기존 카피·FAQ·`lib/product.ts` 에서 왔다 — 지어낸 것 0.
       구 키(hero.stamp·typed · brand.* · who.*)는 판정이 굳을 때까지 둠다. */
    'home.nav.how': 'How we work',
    'home.nav.recent': 'Fresh off the desk',
    'home.v5.tagline': 'For people who make things.',
    'home.v5.intro': 'Hi, we’re You Name It. We make tools and content for people who create, and we only sell what we’ve already used on our own work. The first one is an After Effects plugin.',
    'home.v5.cta.free': 'Get it free',
    'home.v5.cta.plugin': 'Peek at the plugin',
    'home.v5.row.one': 'Press one button for the boring setup and describe the rest in words. It lands on your layers, and you can still edit it.',
    'home.v5.row.price': 'Free · Pro {price}',
    'home.v5.row.still': 'A still from the You Name It brand film',
    'home.v5.t1.h': 'You name it.',
    'home.v5.t1.p': 'We’ll happily take the tedious parts. You decide what to make, and we’ll help.',
    'home.v5.t2.h': 'Our archenemy: busywork.',
    'home.v5.t2.p': 'Every tool started as a repetitive task. We use it on real work for a while and sell it once it feels right.',
    'home.v5.t3.h': 'You can edit all of it.',
    'home.v5.t3.p': 'Our tools leave plain layers, keyframes and expressions in your comp. Change anything you like. If you uninstall us, the work stays.',
    'home.v5.t4.h': 'What’s next?',
    'home.v5.t4.p': 'It could be a tool, a film or something we write. It doesn’t have a name yet. Whatever it turns out to be, we’ll make it the way we made this one.',
    'home.v5.free.h': 'Try it on us.',
    'home.v5.free.p': 'The After Effects plugin has a free version, and all you need to get it is an email address. If you want more later, Pro is a one-time payment.',
    'home.v5.free.proof': ['No subscription', 'Pay once for Pro', '14-day refund'],
    'home.v5.rel.all': 'Every release note',
    'home.v5.tools.h': 'What’s in the toolbox',
    'home.v5.out.a': 'Your own thinking,',
    'home.v5.out.b': 'not someone else’s answers.',
  },

  ko: {
    'home.nav.lineup': '만든 것',
    'home.nav.brand': '우리는',
    'home.nav.who': '만드는 사람',

    /* 🔴 EN 과 **같은 문자열이다** — 번역 금지(오너 2026-09-19). 위 EN 블록 주석 참조. */
    'home.hero.stamp': '스튜디오 · 2026',
    'home.hero.h1a': 'You',
    'home.hero.h1b': 'Name It.',
    /* 🔴 오너가 문장을 직접 줬다 — 토씨 그대로 둬라 (2026-09-19). */
    'home.hero.sub': '창작하는 사람들을 위한 도구와 콘텐츠를 만듭니다.',
    'home.hero.typed': '정답은 주지 않는다 — 붙이는 건 [[창작자]]가 한다.',
    'home.hero.fig1': '돌 하나가 [[이야기]]가 된다.',
    'home.hero.fig2': '같은 돌, __다른 이름.__',

    'home.lineup.tag': '우리가 먼저 쓰는 물건만 팝니다.<br>다음 것은 아직 이름이 없습니다.<br>도구일 수도, 영상일 수도, 글일 수도 있습니다.',
    'home.row1.aria': 'You Name It AE Plugin 보기',
    'home.row1.spot': 'Bento Grid 미리보기',
    'home.row1.brand': 'You Name It',
    'home.row1.name': 'AE Plugin',
    'home.row1.badge': 'PLUGIN',
    'home.row1.one': '반복 셋업은 버튼 하나로 끝납니다. 나머지는 말로 설명하면 당신 레이어 위에 고칠 수 있는 채로 앉습니다.',
    'home.row1.chip': 'Ae',
    'home.row1.price': '{price} <em>USD</em>',
    'home.row1.go': '플러그인 보기',

    'home.brand.h2': '우리는 무엇인가',
    'home.brand.tag': '이름에 다 들어 있습니다.',
    'home.brand.col.biz': '사업에선',
    'home.brand.col.brd': '브랜드에선',
    'home.brand.you.biz': '창작하는 개인 — 고객이자 우리 자신',
    'home.brand.you.brd': '판단하는 건 나다. 남이 아니라',
    'home.brand.name.biz': '의미를 붙이는 일 — 손은 도구가 덜고 판단이 남게',
    'home.brand.name.brd': '내가 겪은 것에 내 말을 붙인다',
    'home.brand.it.biz': '매체를 안 가리는 확장 조항 — 영상·도구·글·무엇이든',
    'home.brand.it.brd': '아직 이름 없는 것. 내 앞의 빈 파일',
    'home.brand.pull.a': '타인의 생각과 정의가 아닌,',
    'home.brand.pull.b': '나의 생각.',
    'home.brand.pull.src': '— 우리가 싸우는 것',
    'home.youit.hint': '빈칸은 당신이 채웁니다.',
    'home.youit.clear': '비우기',
    'home.brand.lead': '도구는 <b>손을 대신합니다. 판단은 대신하지 않습니다.</b> 생각은 당신이 하고 구현은 우리가 돕습니다. 그래서 우리 도구가 남기는 건 전부 <b>뜯어볼 수 있는</b> 레이어와 키프레임이고, 나중에도 고칠 수 있습니다. 브리프 한 줄로 완성본을 뱉는 물건은 만들지 않습니다. 그러면 판단까지 도구가 가져가기 때문입니다.',
    'home.brand.p1.h': '분해',
    'home.brand.p1.p': '당연해 보이는 건 그렇게 보이도록 설계된 것입니다. 뜯어보면 취향이 아니라 조건이 보입니다.',
    'home.brand.p2.h': '의미 부여',
    'home.brand.p2.p': '뜯은 자리에 내 이름을 붙입니다. 남이 써놓은 칸을 지우고 다시 쓰는 것. 정답은 주지 않습니다.',
    'home.brand.p3.h': '지속가능성',
    'home.brand.p3.p': '한 번의 각성이 아니라 계속 그러는 것. 앞서가서 순직하지 않고, 뒤처지지도 않습니다.',
    'home.brand.order': '↑ 병렬이 아니라 순서입니다. 분해 → 의미 부여 → 지속.',

    'home.who.tag': '우리 작업에 먼저 씁니다.',
    'home.who.myth': '첫 만남에 회사나 직책이 아니라,<br>이번 주에 창작한 것으로<br>자신을 소개하는 사람들.',
    'home.who.mythcap': '— 우리가 성공했을 때의 그림',
    'home.who.p1': '영상을 만들다가 같은 셋업을 열 번째 반복하던 날, 이걸 대신할 물건을 직접 만들기 시작했습니다. 그게 After Effects 플러그인이 됐습니다. <b>우리가 매일 쓰는 도구</b>이고, 우리가 쓰지 않는 기능은 넣지 않았습니다.',
    'home.who.p2': '앞으로도 같습니다. 우리가 먼저 겪고, 먼저 쓰고, 그다음에 팝니다. 결과는 프로 수준으로 내고, 과정은 정직하게 밟습니다.',
    'home.who.latest': '가장 최근에 만든 것',
    'home.who.latest.go': '업데이트 노트 →',
    'home.who.nots.h': '안 합니다',
    'home.who.nots': ['강의 채널', '튜토리얼', '자기계발', '툴 리뷰', '시행착오 포르노'],

    /* ── v5 홈 — en 과 같은 키(대칭) ── */
    'home.nav.how': '일하는 방식',
    'home.nav.recent': '갓 만든 것',
    'home.v5.tagline': '뭔가 만드는 사람을 위해.',
    'home.v5.intro': '안녕하세요, You Name It이에요. 창작하는 사람을 위한 도구와 콘텐츠를 만드는데, 우리 작업에 직접 안 써 본 물건은 팔지 않아요. 첫 번째는 After Effects 플러그인이에요.',
    'home.v5.cta.free': '무료로 받기',
    'home.v5.cta.plugin': '플러그인 구경하기',
    'home.v5.row.one': '지루한 셋업은 버튼 하나로 끝내고, 나머지는 말로 시키면 돼요. 결과는 고칠 수 있는 레이어로 들어와요.',
    'home.v5.row.price': '무료 · Pro {price}',
    'home.v5.row.still': 'You Name It 브랜드 필름의 한 장면',
    'home.v5.t1.h': '이름은 당신이 붙여요.',
    'home.v5.t1.p': '귀찮은 일은 기꺼이 가져갈게요. 무엇을 만들지만 직접 정하세요. 우리가 거들게요.',
    'home.v5.t2.h': '우리의 주적은 반복과 비효율.',
    'home.v5.t2.p': '도구는 전부 반복 작업에서 출발했어요. 실제 작업에 한동안 써 보고, 괜찮다 싶을 때 팔아요.',
    'home.v5.t3.h': '전부 수정 가능해요.',
    'home.v5.t3.p': '컴프에 남는 건 평범한 레이어와 키프레임, 익스프레션이에요. 마음대로 고쳐도 되고, 플러그인을 지워도 작업은 그대로예요.',
    'home.v5.t4.h': '다음은 뭘까요?',
    'home.v5.t4.p': '도구가 될지 영상이나 글이 될지 아직 몰라요. 이름도 아직 없고요. 어떤 거든 이번처럼 만들게요.',
    'home.v5.free.h': '일단 공짜로 써 보세요.',
    'home.v5.free.p': 'After Effects 플러그인은 무료 버전이 있어요. 이메일 주소만 있으면 받을 수 있고, 나중에 더 필요해지면 Pro는 한 번 결제로 끝나요.',
    'home.v5.free.proof': ['구독 없음', 'Pro는 한 번 결제', '14일 환불'],
    'home.v5.rel.all': '업데이트 노트 전부 보기',
    'home.v5.tools.h': '공구함 속',
    'home.v5.out.a': '남이 정해 준 답 말고,',
    'home.v5.out.b': '당신 생각대로.',
  },
};

export default HOME;
