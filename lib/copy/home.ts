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
    'home.hero.h1a': 'YOU',
    'home.hero.h1b': 'NAME IT.',
    /* 🔴 한 문장이다 — 오너 2026-09-19 (*"이것만 남겨"*). 구 판본은 뒤에 "Video, tools, writing —
       the medium is open." 이 붙어 있었다. 되살리지 마라. */
    'home.hero.sub': 'We make tools and content for people who create.',
    'home.hero.typed': 'We don’t hand you the answer. The [[creator]] names it.',
    'home.hero.fig1': 'One stone becomes [[a story.]]',
    'home.hero.fig2': 'Same stone, __different name.__',

    /* 01 만든 것 — 🔴 5% 지점. 철학보다 먼저 제품이 있다 */
    /* 🔴 둘째·셋째 줄 = 구 `아직 무제` 행의 문장(2026-09-28 재인 *"이거 빼고 처음 소개 부분에 내용 합치기"*).
       히어로 부제(`home.hero.sub`)가 아니라 여기인 이유: 부제는 오너가 **한 문장으로 잠갔고**
       매체 나열(*"Video, tools, writing"*)을 되살리지 말라고 적어 두었다 — 같은 뜻이 거기 붙으면 그걸 되살리는 것이다. */
    'home.lineup.tag': 'We only sell what we’ve used ourselves first.<br>The next one doesn’t have a name yet.<br>It could be a tool, a film, or something written.',
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
    'home.brand.h2': 'Who we are',
    'home.brand.tag': 'It’s all in the name.',
    'home.brand.col.biz': 'in business',
    'home.brand.col.brd': 'in the brand',
    'home.brand.you.biz': 'People who make things. Our customers, and us',
    'home.brand.you.brd': 'I make the call. Not someone else',
    'home.brand.name.biz': 'Giving things meaning. Tools take the handwork, you keep the judgment',
    'home.brand.name.brd': 'I put my own words on what I lived through',
    'home.brand.it.biz': 'Any medium at all. Video, tools, writing, whatever comes next',
    'home.brand.it.brd': 'The thing with no name yet. The blank file in front of me',
    'home.brand.pull.a': 'Your own thinking —',
    'home.brand.pull.b': 'not someone else’s definitions.',
    'home.brand.pull.src': '— what we fight',
    /* `You [   ] It` 빈칸(§16-20) — 힌트는 한 줄, 조용히. 설명하지 않는다(빈칸이 스스로 읽힌다).
       🔴 두 로캘 다 **서술**이다(VOICE_AND_TERMS R4 — 힌트에 명령형 금지: EN plain present · KO 합니다체).
       `Write yours in.` 은 명령형이라 안 썼다. `비우기` = clear(§3 단어장). */
    'home.youit.hint': 'You fill in the blank.',
    'home.youit.clear': 'Clear',
    'home.brand.lead': 'A tool <b>stands in for your hands, not your judgment.</b> You do the thinking and we help with the making, so everything our tools leave behind is <b>easy to take apart</b>: layers and keyframes you can still edit. We don’t build things that spit out a finished piece from a one-line brief. That would take the judgment away from you.',
    /* 🔴 병렬이 아니라 순서다 (브랜드 가이드 PERSONALITY 장) */
    'home.brand.p1.h': 'Take apart',
    'home.brand.p1.p': 'What looks obvious was designed to look that way. Take it apart and you see conditions, not taste.',
    'home.brand.p2.h': 'Give it meaning',
    'home.brand.p2.p': 'Put your own name where you opened it up. Erase the box someone else filled in and write it again. We don’t hand out answers.',
    'home.brand.p3.h': 'Keep going',
    'home.brand.p3.p': 'Not one big awakening, but doing it again and again. Not so far ahead that you burn out, not so slow that you fall behind.',
    'home.brand.order': '↑ Not a list. An order: take apart → give it meaning → keep going.',

    /* 03 만드는 사람 */
    'home.who.tag': 'We use it on our own work first.',
    'home.who.myth': 'People who introduce themselves not by company or title, but by what they created this week.',
    'home.who.mythcap': '— what it looks like when we have won',
    'home.who.p1': 'One day, deep in a video, we set up the same thing for the tenth time and started building something to do it for us. It became an After Effects plugin. <b>We use it every day</b>, and anything we don’t use isn’t in it.',
    'home.who.p2': 'Same goes from here: we hit the problem first, use the fix first, and sell it after. Pro-level results, honest process.',
    /* 🔴 표제(`myth`) 바로 밑 증거 한 줄 — 버전·날짜·문장은 **`lib/releases.ts` 에서 읽는다**(Who.tsx).
       캡션(`— what it looks like when we have won`)이 빠진 뒤 표제가 "누구 얘기인지" 안 읽혔다.
       우리가 이번 주에 만든 것을 그 자리에 놓아 표제를 우리가 실천한다는 걸 보인다. */
    'home.who.latest': 'Our latest',
    'home.who.latest.go': 'Release notes →',
    'home.who.nots.h': 'What we don’t do',
    'home.who.nots': ['Course channels', 'Tutorials', 'Self-help', 'Tool reviews', 'Struggle porn'],

    /* ── v5 홈 (2026-10-26 오너 *"홈은 브랜드 소개 · 철학은 타일 하나 + 끝 한 줄 · 짧게"*) ──
       뼈대 = mindmarket 홈(주장형 제목 + 한 문단 + 행동 하나). 사실은 전부 기존 카피·FAQ·`lib/product.ts` 에서 왔다 — 지어낸 것 0.
       구 키(hero.stamp·typed · brand.* · who.*)는 판정이 굳을 때까지 둠다. */
    'home.nav.how': 'How we work',
    'home.nav.recent': 'Fresh off the desk',
    'home.nav.films': 'We make films, too',
    'home.v5.films.lead': 'We make content that helps creators.',
    'home.v5.tagline': 'We make content and tools for creators.',
    'home.v5.intro': 'Worn out by endless repetitive work, we built our own tools.|First up: an After Effects plugin.',
    'home.v5.reels.more': 'More on Instagram',
    'home.v5.cta.free': 'Get it free',
    'home.v5.cta.plugin': 'Peek at the plugin',
    'home.v5.row.one': 'All-in-one After Effects plugin',
    'home.v5.row.price': 'Free · Pro {price}',
    'home.v5.row.still': 'A still from the You Name It brand film',
    'home.v5.t1.h': 'You name it.',
    'home.v5.t1.p': 'We’ll happily take the tedious parts. You decide what to make, and we’ll help.',
    'home.v5.t2.h': 'Our archenemy: busywork.',
    'home.v5.t2.p': 'Every tool started as a repetitive task. We use it on real work for a while and sell it once it feels right.',
    'home.v5.t3.h': 'You can edit all of it.',
    'home.v5.t3.p': 'What stays in your comp is plain layers and keyframes. Don’t like a move? Open the keyframe and change it. Uninstall us and the work is still there.',
    'home.v5.t4.h': 'What’s next?',
    'home.v5.t4.p': 'A tool, a film, maybe something written. It doesn’t have a name yet. Whatever it is, we’ll use it ourselves before you see it.',
    'home.v5.free.h': 'Free to start. No card.',
    'home.v5.free.p': 'Leave an email and the download link comes to you. Library, Curves, Expressions and 26 Toolbox tools are free to keep using. Want Chat and the rest? Pro is one payment.',
    'home.v5.free.proof': ['No subscription', 'Pay once for Pro', '14-day refund'],
    'home.v5.rel.all': 'Every release note',
    'home.v5.tools.h': 'What’s in the toolbox',
    'home.v5.out.a': 'Whatever you want,',
    'home.v5.out.b': 'YOU NAME IT.',
  },

  ko: {
    'home.nav.lineup': '만든 것',
    'home.nav.brand': '우리는',
    'home.nav.who': '만드는 사람',

    /* 🔴 EN 과 **같은 문자열이다** — 번역 금지(오너 2026-09-19). 위 EN 블록 주석 참조. */
    'home.hero.stamp': '스튜디오 · 2026',
    'home.hero.h1a': 'YOU',
    'home.hero.h1b': 'NAME IT.',
    /* 🔴 오너가 문장을 직접 줬다 — 토씨 그대로 둬라 (2026-09-19). */
    'home.hero.sub': '만드는 사람들이 쓸 도구와 콘텐츠를 만들어요.',
    'home.hero.typed': '정답은 안 줘요. 이름은 [[창작자]]가 붙여요.',
    'home.hero.fig1': '돌 하나가 [[이야기]]가 돼요.',
    'home.hero.fig2': '같은 돌, __다른 이름.__',

    'home.lineup.tag': '우리가 먼저 써 본 것만 팔아요.<br>다음 건 아직 이름이 없어요.<br>도구일지, 영상일지, 글일지 몰라요.',
    'home.row1.aria': 'You Name It AE Plugin 보기',
    'home.row1.spot': 'Bento Grid 미리보기',
    'home.row1.brand': 'You Name It',
    'home.row1.name': 'AE Plugin',
    'home.row1.badge': 'PLUGIN',
    'home.row1.one': '반복 셋업은 버튼 하나면 끝나요. 나머지는 말로 설명하면 내 레이어 위에 고칠 수 있는 채로 들어와요.',
    'home.row1.chip': 'Ae',
    'home.row1.price': '{price} <em>USD</em>',
    'home.row1.go': '플러그인 보기',

    'home.brand.h2': '우리 이야기',
    'home.brand.tag': '이름에 다 들어 있어요.',
    'home.brand.col.biz': '사업에선',
    'home.brand.col.brd': '브랜드에선',
    'home.brand.you.biz': '만드는 개인. 우리 손님이자 우리 자신',
    'home.brand.you.brd': '판단은 내가 해요. 남이 아니라',
    'home.brand.name.biz': '의미를 붙이는 일. 손일은 도구가 덜고, 판단은 내 몫으로',
    'home.brand.name.brd': '내가 겪은 일에 내 말을 붙여요',
    'home.brand.it.biz': '매체는 안 가려요. 영상, 도구, 글, 뭐든',
    'home.brand.it.brd': '아직 이름 없는 것. 내 앞의 빈 파일',
    'home.brand.pull.a': '타인의 생각과 정의가 아닌,',
    'home.brand.pull.b': '나의 생각.',
    'home.brand.pull.src': '— 우리가 싸우는 것',
    'home.youit.hint': '빈칸은 당신이 채워요.',
    'home.youit.clear': '비우기',
    'home.brand.lead': '도구는 <b>손을 대신해요. 판단은 대신하지 않아요.</b> 생각은 당신이 하고, 만드는 건 우리가 거들어요. 그래서 우리 도구가 남기는 건 전부 <b>뜯어볼 수 있는</b> 레이어와 키프레임이고, 나중에 얼마든지 고칠 수 있어요. 브리프 한 줄 넣으면 완성본이 툭 나오는 물건은 안 만들어요. 그러면 판단까지 도구가 가져가니까요.',
    'home.brand.p1.h': '분해',
    'home.brand.p1.p': '당연해 보이는 건 그렇게 보이게 설계된 거예요. 뜯어보면 취향이 아니라 조건이 보여요.',
    'home.brand.p2.h': '의미 부여',
    'home.brand.p2.p': '뜯은 자리에 내 이름을 붙여요. 남이 채워 둔 칸을 지우고 다시 쓰는 거예요. 정답은 안 줘요.',
    'home.brand.p3.h': '계속하기',
    'home.brand.p3.p': '한 번 깨닫고 끝나는 게 아니라 계속하는 거예요. 너무 앞서가다 쓰러지지도, 뒤처지지도 않게요.',
    'home.brand.order': '↑ 나란히가 아니라 순서예요. 분해 → 의미 부여 → 계속하기.',

    'home.who.tag': '우리 작업에 먼저 써요.',
    'home.who.myth': '첫 만남에 회사나 직책이 아니라,<br>이번 주에 창작한 것으로<br>자신을 소개하는 사람들.',
    'home.who.mythcap': '— 우리가 성공했을 때의 그림',
    'home.who.p1': '영상 만들다 같은 셋업을 열 번째 반복하던 날, 그걸 대신할 걸 직접 만들기 시작했어요. 그게 After Effects 플러그인이 됐어요. <b>우리가 매일 쓰는 도구</b>예요. 우리가 안 쓰는 기능은 넣지 않았어요.',
    'home.who.p2': '앞으로도 똑같아요. 우리가 먼저 겪고, 먼저 써 보고, 그다음에 팔아요. 결과는 프로답게, 과정은 정직하게요.',
    'home.who.latest': '최근에 만든 것',
    'home.who.latest.go': '업데이트 노트 →',
    'home.who.nots.h': '이건 안 해요',
    'home.who.nots': ['강의 채널', '튜토리얼', '자기계발', '툴 리뷰', '시행착오 포르노'],

    /* ── v5 홈 — en 과 같은 키(대칭) ── */
    'home.nav.how': '일하는 방식',
    'home.nav.recent': '갓 만든 것',
    'home.nav.films': '영상도 만들어요',
    'home.v5.films.lead': '창작자들에게 도움이 될 콘텐츠를 만들어요.',
    'home.v5.tagline': '창작자를 위한 콘텐츠와 툴을 만듭니다.',
    'home.v5.intro': '끝없는 반복 작업에 지쳐 직접 만들었어요.|첫 번째는 After Effects 플러그인이에요.',
    'home.v5.reels.more': '인스타에서 더 보기',
    'home.v5.cta.free': '무료로 받기',
    'home.v5.cta.plugin': '플러그인 구경하기',
    'home.v5.row.one': '올인원 After Effects 플러그인',
    'home.v5.row.price': '무료 · Pro {price}',
    'home.v5.row.still': 'You Name It 브랜드 필름의 한 장면',
    'home.v5.t1.h': '이름은 당신이 붙여요.',
    'home.v5.t1.p': '귀찮은 일은 기꺼이 가져갈게요. 무엇을 만들지만 직접 정하세요. 우리가 거들게요.',
    'home.v5.t2.h': '우리의 주적은 반복과 비효율.',
    'home.v5.t2.p': '도구는 전부 반복 작업에서 출발했어요. 실제 작업에 한동안 써 보고, 괜찮다 싶을 때 팔아요.',
    'home.v5.t3.h': '전부 수정 가능해요.',
    'home.v5.t3.p': '컴프에 남는 건 평범한 레이어와 키프레임이에요. 움직임이 마음에 안 들면 키프레임을 열어서 고치면 돼요. 플러그인을 지워도 작업은 그대로 남아요.',
    'home.v5.t4.h': '다음은 뭘까요?',
    'home.v5.t4.p': '도구일지, 영상일지, 글일지 아직 몰라요. 이름도 없어요. 대신 이번처럼 우리가 먼저 써 보고 내놓을게요.',
    'home.v5.free.h': '카드 없이, 지금 바로.',
    'home.v5.free.p': '이메일만 넣으면 다운로드 링크가 와요. Library, Curves, Expressions와 Toolbox 툴 26개는 무료로 계속 써요. Chat까지 쓰고 싶어지면 그때 Pro를 한 번 결제하세요.',
    'home.v5.free.proof': ['구독 없음', 'Pro는 한 번 결제', '14일 환불'],
    'home.v5.rel.all': '업데이트 노트 전부 보기',
    'home.v5.tools.h': '공구함 속',
    'home.v5.out.a': '원하는 게 무엇이든,',
    'home.v5.out.b': 'YOU NAME IT.',
  },
};

export default HOME;
