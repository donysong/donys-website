/* `home` 페이지 사전 — EN/KO. 🔴 이 파일은 **이 페이지 레인만** 고친다.
   v3.3 에 같은 문장이 이미 있으면 새 키를 만들지 말고 그 키를 그대로 써라(EN 번역이 붙어 있다).

   🔴 국문은 `docs/research/website-2026-09/proto4/index.html` 에서 **그대로** 옮긴 것이다.
   의역·요약·개선 금지 — 프로토가 확정본이고 이 파일은 이식본이다.
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

    /* 00 표지 — 태그라인 2줄, 그게 전부다 */
    'home.hero.stamp': 'Studio · 2026',
    'home.hero.h1a': 'Anything.',
    'home.hero.h1b': 'Just say it.',
    'home.hero.sub': 'We make <b>tools that take work off your hands</b>, and content, for people who create. Video, tools, writing — the medium is open.',
    'home.hero.typed': 'We don’t give you the answer — the [[creator]] names it.',
    'home.hero.fig': 'One stone becomes a story. Same stone, different name.',

    /* 01 만든 것 — 🔴 5% 지점. 철학보다 먼저 제품이 있다 */
    'home.lineup.tag': 'We only sell what we use first.<br>If we don’t use it, we don’t sell it.',
    'home.row1.aria': 'See You Name It AE Plugin',
    'home.row1.spot': 'Bento Grid preview',
    'home.row1.brand': 'You Name It',
    'home.row1.name': 'AE Plugin',
    'home.row1.badge': 'PLUGIN',
    'home.row1.one': 'Say it and it lands on your layers. The repetitive setup is one button — the rest is one sentence.',
    'home.row1.chip': 'Ae',
    'home.row1.price': '{price} <em>USD</em>',
    'home.row1.go': 'Go and look',
    /* 🔴 "coming soon" 이 아니다 — 이름이 비어 있다는 게 내용이다. 날짜·예고를 붙이지 마라. */
    'home.row2.name': 'Still untitled',
    'home.row2.badge': 'UNTITLED',
    'home.row2.one': 'The next one has no name yet. It could be a tool, it could be a film, it could be writing.',
    'home.row2.chip': '?',
    'home.row2.note': 'The blank file in front of me',

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
    'home.brand.pull.a': 'Not my own thinking,',
    'home.brand.pull.b': 'but someone else’s definitions.',
    'home.brand.pull.src': '— what we fight',
    'home.brand.lead': 'A tool <b>stands in for your hands. It does not stand in for your judgment.</b> You do the thinking; we help with the building. That is why everything our tools leave behind comes out <b>ready to be taken apart</b> — as layers, as keyframes, still editable. We do not build the kind of thing that spits out a finished piece from one line of a brief. That would be taking your judgment away.',
    /* 🔴 병렬이 아니라 순서다 (브랜드 가이드 PERSONALITY 장) */
    'home.brand.p1.h': 'Take apart',
    'home.brand.p1.p': 'What looks obvious was designed to look that way. Take it apart and you see conditions, not taste.',
    'home.brand.p2.h': 'Give it meaning',
    'home.brand.p2.p': 'Put your own name on the place you opened up. Erase the box someone else filled in and write it again. We do not hand out answers.',
    'home.brand.p3.h': 'Keep going',
    'home.brand.p3.p': 'Not one awakening but doing it again and again. Not so far ahead that you die on the hill, and not falling behind either.',
    'home.brand.order': '↑ Not a list — an order. Take apart → give it meaning → keep going.',

    /* 03 만드는 사람 */
    'home.who.tag': 'A person makes it, not a company.',
    'home.who.myth': 'People who introduce themselves<br>not by company or title,<br>but by what they created this week.',
    'home.who.mythcap': '— what it looks like when we have won',
    'home.who.p1': 'One day, in the middle of making a video, we repeated the same setup for the tenth time and started building the thing that would do it instead. It became an After Effects plugin. <b>It is the tool we use every day</b>, and anything we do not use is not in it.',
    'home.who.p2': 'It stays that way — we run into it first, use it first, and sell it after. The result at a professional level, the process honest.',
    'home.who.nots.h': 'We don’t do',
    'home.who.nots': ['Course channels', 'Tutorials', 'Self-help', 'Tool reviews', 'Struggle porn'],
  },

  ko: {
    'home.nav.lineup': '만든 것',
    'home.nav.brand': '우리는',
    'home.nav.who': '만드는 사람',

    'home.hero.stamp': '스튜디오 · 2026',
    'home.hero.h1a': '뭐든',
    'home.hero.h1b': '말만 해.',
    'home.hero.sub': '창작하는 사람의 <b>손을 더는 도구</b>와 콘텐츠를 만듭니다. 영상·도구·글 — 매체는 안 가립니다.',
    'home.hero.typed': '정답은 주지 않는다 — 붙이는 건 [[창작자]]가 한다.',
    'home.hero.fig': '돌 하나가 이야기가 된다. 같은 돌, 다른 이름.',

    'home.lineup.tag': '우리가 먼저 쓰는 물건만 팝니다.<br>안 쓰는 건 안 팝니다.',
    'home.row1.aria': 'You Name It AE Plugin 보기',
    'home.row1.spot': 'Bento Grid 미리보기',
    'home.row1.brand': 'You Name It',
    'home.row1.name': 'AE Plugin',
    'home.row1.badge': 'PLUGIN',
    'home.row1.one': '말하면 네 레이어에 앉는다. 반복 셋업은 버튼 하나로, 나머지는 문장 하나로.',
    'home.row1.chip': 'Ae',
    'home.row1.price': '{price} <em>USD</em>',
    'home.row1.go': '보러 가기',
    'home.row2.name': '아직 무제',
    'home.row2.badge': 'UNTITLED',
    'home.row2.one': '다음 것은 아직 이름이 없습니다. 도구일 수도, 영상일 수도, 글일 수도 있습니다.',
    'home.row2.chip': '?',
    'home.row2.note': '내 앞의 빈 파일',

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
    'home.brand.pull.a': '나의 생각이 아닌,',
    'home.brand.pull.b': '타인의 생각과 정의.',
    'home.brand.pull.src': '— 우리가 싸우는 것',
    'home.brand.lead': '도구는 <b>손을 대신합니다. 판단은 대신하지 않습니다.</b> 생각은 당신이 하고, 구현을 우리가 돕습니다. 그래서 우리 도구의 결과물은 전부 <b>뜯어볼 수 있게</b> 나옵니다 — 레이어로, 키프레임으로, 고칠 수 있는 채로. 브리프 한 줄로 완성본을 뱉는 물건은 만들지 않습니다. 그건 당신의 판단을 가져가는 거니까요.',
    'home.brand.p1.h': '분해',
    'home.brand.p1.p': '당연해 보이는 건 그렇게 보이도록 설계된 것입니다. 뜯어보면 취향이 아니라 조건이 보입니다.',
    'home.brand.p2.h': '의미 부여',
    'home.brand.p2.p': '뜯은 자리에 내 이름을 붙입니다. 남이 써놓은 칸을 지우고 다시 쓰는 것. 정답은 주지 않습니다.',
    'home.brand.p3.h': '지속가능성',
    'home.brand.p3.p': '한 번의 각성이 아니라 계속 그러는 것. 앞서가서 순직하지 않고, 뒤처지지도 않습니다.',
    'home.brand.order': '↑ 병렬이 아니라 순서입니다. 분해 → 의미 부여 → 지속.',

    'home.who.tag': '회사가 아니라 사람이 만듭니다.',
    'home.who.myth': '첫 만남에 회사나 직책이 아니라,<br>이번 주에 창작한 것으로<br>자신을 소개하는 사람들.',
    'home.who.mythcap': '— 우리가 성공했을 때의 그림',
    'home.who.p1': '영상을 만들다가 같은 셋업을 열 번째 반복하던 날, 이걸 대신할 물건을 직접 만들기 시작했습니다. 그게 After Effects 플러그인이 됐습니다. <b>우리가 매일 쓰는 도구</b>이고, 우리가 쓰지 않는 기능은 넣지 않았습니다.',
    'home.who.p2': '앞으로도 같습니다 — 우리가 먼저 겪고, 먼저 쓰고, 그다음에 팝니다. 결과는 프로 수준으로, 과정은 정직하게.',
    'home.who.nots.h': '안 합니다',
    'home.who.nots': ['강의 채널', '튜토리얼', '자기계발', '툴 리뷰', '시행착오 포르노'],
  },
};

export default HOME;
