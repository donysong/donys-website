/* 사이트 카피 사전 — EN/KO. 정본은 프로토 v3.3(플러그인 repo `donys/docs/research/website-2026-09/proto3/`)
   이고 이 파일이 그 이식본이다. 🔴 숫자는 여기 박지 마라 — `lib/product.ts` 에서 읽어 `{scripts}` 같은
   자리표시자로 꽂는다(사이트가 없는 숫자를 광고한 전례가 두 번 있다).
   타자기 문장 표기: [[말]] = 동그라미가 그려진다 · __말__ = 밑줄. */
import { COUNTS, PRICE, VERSION } from './product';

export type Lang = 'en' | 'ko';
type Entry = string | string[];

const RAW: Record<Lang, Record<string, Entry>> = {

    en: {
      'nav.plate':'Plate','nav.cover':'Cover','nav.who':'Who','nav.why':'Why','nav.what':'What','nav.made':'Made by','nav.price':'Price','nav.buy':'Buy',
      'hero.stamp':'After Effects panel · {price} once · Win & macOS','hero.h1a':'Make things','hero.h1b':'that don\u2019t have','hero.h1c':'names yet.',
      'hero.sub':'The After Effects panel that takes the repetitive work off your hands — <b>one button</b>, or <b>one sentence</b> — so your day goes to the idea, not the setup.',
      'hero.cta':'Get it — {price}','hero.try':'Try it below ↓','meta.once':'Pay once','meta.two':'2 machines','meta.refund':'14-day refund',
      'hero.typed':'It begins the moment we give it a [[name]].','hero.fig':'A stone becomes a story.','hero.note':'Same stone, different name. Click a mark. Hover to hold.',
      'who.h2':'For everyone who opens After Effects.','who.tag':'Motion designers, marketers, editors, studios of one.',
      'who.lead':'Motion designers. Marketers who cut their own promos. Editors who live in the timeline. Studios of one. If you open AE and the same chores are waiting — <b>this is for you.</b> Hover a card for what you\'d say.',
      'role.l':'Role','role.hint':'hover → what you\'d say','role.say':'You\'d say',
      'r1.h':'Motion designer','r1.p':'Same intro rig, same null chain, same ease on twelve layers — every project.','r1.q':'Stagger the title letters by two frames, soft overshoot.','r1.s':'→ 24 keyframes on your layer, in your comp.',
      'r2.h':'Marketer','r2.p':'Three variants of the same promo by Thursday. Different copy, same motion, no time.','r2.q':'Swap the headline, keep the motion, export three sizes.','r2.s':'→ same rig, new copy, three comps.',
      'r3.h':'Video editor','r3.p':'You know Premiere by heart. AE is where you go for one title and lose an hour.','r3.q':'Lower-third, slides in from the left, holds four seconds, out.','r3.s':'→ built on real layers. Edit it if you want.',
      'r4.h':'Studio of one','r4.p':'You are the designer, the animator, the renderer and the client call — all before lunch.','r4.q':'Center all anchors, fit the precomps, add a wiggle to the camera null.','r4.s':'→ one sentence, three chores gone.',
      'why.h2':'The same afternoon, every day.','why.tag':'Work slips. Planning starves. Tomorrow, again.',
      'why.c1':'The idea takes a second.','why.c2':'The setup takes the afternoon.','why.typed':'__Meaning is not given.__ Neither is the afternoon.','why.sisy':'Fig. 2 — The same stone. Every day.',
      'l1.h':'Repeat','l1.p':'Null, parent, ease, stagger, rename, precomp. Not once — every comp, every day.',
      'l2.h':'Delay','l2.p':'The work slips. Deadlines eat the evening. The render starts at eleven.',
      'l3.h':'Starve the idea','l3.p':'Planning gets what\'s left. Which is nothing. Tomorrow, the same afternoon again.','l.so':'↓ so','l.again':'↺ repeat',
      'day.l':'◀ By hand','day.drag':'Drag','day.h':'the handle','day.r':'With You Name It ▶',
      'd.null':'null rig','d.ease':'ease ×12','d.idea':'idea','d.rename':'rename','d.stagger':'stagger','d.fix':'fix','d.precomp':'precomp','d.render':'render fix','d.say':'say it','d.press':'press it','d.plan':'idea & planning','d.done':'done early',
      'day.f1':'↻ = repetitive chore','day.f2':'Proportions are illustrative — no time claims.','day.f3':'■ = idea & planning',
      'what.h2':'One button. Or one sentence.','what.tag':'Try it — this one is a simulation.',
      'what.lead':'Six panels of one-click tools for the chores you know by name, and a chat panel with Claude built in for the ones you\'d rather just say. Either way it lands <b>on your layers</b> — real keyframes, real expressions, editable.',
      'lab.say':'Say it','lab.press':'Press it','lab.toolnote':'Toolbox · {scripts} tools · each one a real, undoable action','lab.ready':'— ready. pick a sentence or a button.','lab.sim':'Simulation — the real panel writes to AE','lab.reset':'Reset','tl.layer':'Layer',
      'act.pop':'Make the title pop in with a soft overshoot.','act.stagger':'Stagger every letter by two frames.','act.drift':'Parent everything to a null and let it drift.','act.riso':'Print it like a riso — red ink, blue paper.',
      'act.center':'Center anchor','act.fit':'Fit to comp','act.wiggle':'Wiggle','act.pop.t':'Overshoot in','act.stagger.t':'Text stagger','act.riso.t':'Riso print',
      'log.pop':'<b>2 keyframes</b> · Scale · overshoot ease · layer <b>Title</b>','log.stagger':'<b>1 text animator</b> · offset by character · <b>{n} keys</b>','log.drift':'<b>1 null</b> · 2 parents · <b>1 expression</b> you can read','log.riso':'<b>Riso print</b> · ink #E50437 · paper #1F9BE3 · grain .3','log.center':'<b>Anchor → center</b> · 2 layers · position kept','log.fit':'<b>Fit to comp</b> · Shape 1 · scale 520% × 160%','log.wiggle':'<b>wiggle(2, 6)</b> · Null 1 · Position · 1 expression','log.you':'you:','log.press':'press:','log.reset':'— reset. pick a sentence or a button.',
      'p.tool':'one-click chores','p.motion':'presets · spring · ease','p.text':'animators · jaso','p.grad':'library · apply','p.graph':'curve editor','p.expr':'editor · snippets','p.chat':'Claude built in','p.note':'Counts as of v{version} · Chat uses your own Claude plan — no extra fee, no tokens sold.',
      'spot.or':'or press','plates.h':'Plates from the Toolbox','plates.hint':'Hover one. It runs the same preview the panel shows on its button.',
      /* 툴 설명 = 패널 en.ts scripts 사전 그대로 (새로 쓰지 마라 — 사는 사람이 패널에서 같은 문장을 본다) */
      'tip.bentoGrid':'Build bento grid cells — pick a layout pattern + per-cell entrance (real shape/precomp layers)','tip.typewriterCursor':'Jamo-by-jamo typing + blinking cursor on selected text','tip.carouselRig':'Rig selected layers as a carousel — linear scroll or radial orbit + centre scale-up','tip.shadowCaster':'Stacked shadows · a light null aims each layer','tip.proximityRig':'Rig selected layers into an effector rig — scale/opacity shift as the effector null gets closer (radius + falloff)','tip.textExploder':'Split text into char/word/line layers','tip.autoMarker':'Auto-generate markers from the selected layer\'s audio — onset (bass hits etc.) or a tempo grid','tip.addNull':'Create a null and parent selected layers to it',
      'made.h2':'Made by an AE user. Used first, then sold.','made.tag':'Tried it, kept only what earned its place.',
      'made.lead':'No two-hundred-preset landfill. Every tool in here earned its place in someone\'s actual week. The point isn\'t to replace you — it\'s to give you the afternoon back, so we can both make better things. <b>Let\'s create together.</b>',
      's1':'Your hands, not your judgment.','s1.k':'It replaces the repetitive part. The deciding stays yours.',
      's2':'Only what we needed. Nothing for the brochure.','s2.k':'If we didn\'t use it, it\'s not in here.',
      's3':'Built to be taken apart.','s3.k':'Every keyframe is a normal keyframe. Every expression is readable.',
      's4':'Let\'s create together.','s4.k':'Same AE, same afternoons. We\'d rather spend them on ideas too.',
      'q.name':'It begins the moment we give it a [[name]].','q.meaning':'__Meaning is not given.__','q.stone':'A stone becomes a story.',
      'kub.h':'If it can be written, or thought, it can be filmed.','wall':'on the record','kub.hover':'a quote, set in lead',
      'play.h':'Misregister it yourself.','play.p':'Drag the plates — the overlap is a new color.','play.reg':'Register',
      'price.h2':'Buy it once. It stays yours.','price.tag':'Not a subscription. Two machines. Refund in 14 days.','price.stamp':'Pay once','price.kind':'After Effects panel','price.once':'once','price.h3':'One license. Two machines. Yours.',
      'pl1':'Chat panel — Claude built in','pl1b':'your own Claude plan','pl2b':'6 panels','pl3b':'2 machines','pl4':'Minor updates','pl4b':'free','pl5':'Refund','pl5b':'14 days · no questions','price.buy':'Buy — {price}','price.fine':'Checkout by Polar · Manage license anytime',
      'aside.h':'Pay once. Not a subscription.','aside.p':'It\'s a tool, not a service. You buy it, it\'s on your machine, it keeps working when you\'re offline and when we\'re asleep.',
      'vs.once':'Pay once','vs.once.p':'{price}. Two machines. Minor updates free. Refund in 14 days if it isn\'t yours.','vs.paid':'paid','vs.done':'done','vs.sub':'Subscription','vs.sub.p':'Pay every month for the same tool. Stop paying, lose the tool. Not this one.','vs.still':'still paying','vs.hover':'(hover)','vs.month':'month',
      'f1.q':'Does it make the video for me?','f1.a':'No. You decide what; it builds it on your layers. Every keyframe it writes is a normal keyframe you can move, ease or delete. It replaces your hands, not your judgment.',
      'f2.q':'Do I need a Claude subscription?','f2.a':'For the chat panel, yes — it runs on your own Claude plan (Pro or Max). We don\'t resell tokens and there\'s no extra fee. The other six panels don\'t need it at all.',
      'f3.q':'Which After Effects versions?','f3.a':'After Effects 2022 and newer, Windows and macOS. One license covers two machines.',
      'f4.q':'What if it isn\'t for me?','f4.a':'Fourteen-day refund, no questions. Email us and it\'s done.',
      'f5.q':'Is it a subscription?','f5.a':'No. {price} once. Minor updates are free. If a major version ever costs money, you keep the one you bought.',
      'f6.q':'Can I see what it does before buying?','f6.a':'Try the simulation above, hover the plates (they are the panel\'s own button previews), and read the update notes — everything it does is listed there. Real AE recordings are on the way.',
      'ft.typed':'If it can be written, or thought, it can be __filmed__. — Kubrick','ft.meta':'Pay once · 14-day refund','ft.plates':'Plates','ft.paper':'Paper','ft.notes':'Update notes','ft.terms':'Terms','ft.privacy':'Privacy','ft.refund':'Refund','ft.contact':'Contact','ft.legal':'Printed on blue field · red ink · one plate',
      mq1:['Null controller','Parent chain ×8','Ease 75 / 0','Stagger 3f','Overshoot 8%','wiggle(2, 6)','Precomp','Anchor → center','Duplicate ×12','Rename ×12','Graph editor','Time-remap','loopOut()','Slider control','Trim paths','Offset by character','Hold keyframe','Motion blur on','Pick-whip','Bezier handle','Solo · unsolo','Keyframe velocity','Easy ease · again'],
      mq2:['Monday: same rig','Tuesday: same rig','Wednesday: still the rig','the idea took a second','the setup took the afternoon','12 layers · 24 keys · by hand','one null · eight parents · by hand','planning: whatever is left','again','again']
    },
    ko: {
      'nav.plate':'판','nav.cover':'표지','nav.who':'누구','nav.why':'왜','nav.what':'무엇','nav.made':'만든 사람','nav.price':'가격','nav.buy':'구매',
      'hero.stamp':'애프터 이펙트 패널 · {price} 한 번 · Win & macOS','hero.h1a':'아직 이름이 없는','hero.h1b':'것을 만든다.','hero.h1c':'',
      'hero.sub':'반복 작업을 손에서 덜어내는 AE 패널. <b>버튼 하나</b>, 또는 <b>문장 하나</b>. 하루가 셋업이 아니라 아이디어에 쓰이게.',
      'hero.cta':'구매 — {price}','hero.try':'아래에서 써보기 ↓','meta.once':'한 번 결제','meta.two':'2대','meta.refund':'14일 환불',
      'hero.typed':'[[이름]]을 붙이는 순간, 시작된다.','hero.fig':'돌은 이야기가 된다.','hero.note':'같은 돌, 다른 이름. 마크를 눌러 골라라. 올리면 멈춘다.',
      'who.h2':'애프터 이펙트를 여는 모든 사람에게.','who.tag':'모션 디자이너, 마케터, 편집자, 1인 스튜디오.',
      'who.lead':'모션 디자이너. 직접 홍보영상을 만드는 마케터. 타임라인에서 사는 편집자. 혼자 하는 스튜디오. AE 를 열면 같은 잡일이 기다리고 있다면 — <b>당신 것이다.</b> 카드에 올려보면 당신이 말할 문장이 나온다.',
      'role.l':'역할','role.hint':'올리면 → 당신이 말할 문장','role.say':'이렇게 말하면',
      'r1.h':'모션 디자이너','r1.p':'같은 인트로 리그, 같은 널 체인, 열두 레이어에 같은 이징 — 매 프로젝트.','r1.q':'타이틀 글자를 2프레임씩 스태거, 부드러운 오버슈트.','r1.s':'→ 네 레이어에, 네 컴프에, 키프레임 24개.',
      'r2.h':'마케터','r2.p':'목요일까지 같은 홍보영상 변주 세 개. 카피만 다르고 모션은 같고, 시간은 없고.','r2.q':'헤드라인만 바꾸고 모션은 유지, 세 가지 사이즈로.','r2.s':'→ 같은 리그, 새 카피, 컴프 세 개.',
      'r3.h':'영상 편집자','r3.p':'프리미어는 손에 익었는데, 타이틀 하나 하러 AE 에 들어가면 한 시간이 사라진다.','r3.q':'로어서드, 왼쪽에서 들어와서 4초 유지, 나가기.','r3.s':'→ 진짜 레이어로. 원하면 고쳐라.',
      'r4.h':'1인 스튜디오','r4.p':'디자이너이자 애니메이터이자 렌더 담당이자 클라이언트 통화 — 전부 점심 전에.','r4.q':'앵커 전부 가운데로, 프리컴프 맞추고, 카메라 널에 위글.','r4.s':'→ 문장 하나, 잡일 셋 끝.',
      'why.h2':'매일, 같은 오후.','why.tag':'작업은 밀리고, 기획은 굶고, 내일 또.',
      'why.c1':'아이디어는 1초.','why.c2':'셋업은 오후 내내.','why.typed':'__의미는 주어지지 않는다.__ 오후도 그렇다.','why.sisy':'Fig. 2 — 같은 돌. 매일.',
      'l1.h':'반복','l1.p':'널, 부모, 이징, 스태거, 이름 바꾸기, 프리컴프. 한 번이 아니라 매 컴프, 매일.',
      'l2.h':'지체','l2.p':'작업이 밀린다. 마감이 저녁을 먹는다. 렌더는 열한 시에 시작한다.',
      'l3.h':'기획이 굶는다','l3.p':'기획은 남는 시간을 받는다. 남는 게 없다. 내일 또 같은 오후.','l.so':'↓ 그래서','l.again':'↺ 반복',
      'day.l':'◀ 손으로','day.drag':'핸들을','day.h':'끌어봐라','day.r':'You Name It 과 ▶',
      'd.null':'널 리그','d.ease':'이징 ×12','d.idea':'아이디어','d.rename':'이름 바꾸기','d.stagger':'스태거','d.fix':'수정','d.precomp':'프리컴프','d.render':'렌더 수정','d.say':'말한다','d.press':'누른다','d.plan':'아이디어 · 기획','d.done':'일찍 끝',
      'day.f1':'↻ = 반복 잡일','day.f2':'비율은 설명용 — 시간 수치는 적지 않는다.','day.f3':'■ = 아이디어 · 기획',
      'what.h2':'버튼 하나. 또는 문장 하나.','what.tag':'직접 눌러봐라 — 이건 시뮬레이션이다.',
      'what.lead':'이름을 아는 잡일은 원클릭 도구 패널 6개로, 그냥 말하고 싶은 건 Claude 가 내장된 채팅 패널로. 어느 쪽이든 <b>네 레이어에</b> 앉는다 — 진짜 키프레임, 진짜 익스프레션, 편집 가능.',
      'lab.say':'말하기','lab.press':'누르기','lab.toolnote':'툴박스 · {scripts}개 · 전부 실제 되돌릴 수 있는 동작','lab.ready':'— 준비됨. 문장이나 버튼을 골라라.','lab.sim':'시뮬레이션 — 실제 패널은 AE 에 쓴다','lab.reset':'초기화','tl.layer':'레이어',
      'act.pop':'타이틀이 부드러운 오버슈트로 튀어나오게.','act.stagger':'글자마다 2프레임씩 스태거.','act.drift':'전부 널에 붙이고 천천히 흐르게.','act.riso':'리소처럼 찍어줘 — 빨간 잉크, 파란 종이.',
      'act.center':'앵커 가운데로','act.fit':'컴프에 맞추기','act.wiggle':'위글','act.pop.t':'오버슈트 인','act.stagger.t':'텍스트 스태거','act.riso.t':'리소 프린트',
      'log.pop':'<b>키프레임 2개</b> · Scale · 오버슈트 이징 · 레이어 <b>Title</b>','log.stagger':'<b>텍스트 애니메이터 1</b> · 글자별 오프셋 · <b>키 {n}개</b>','log.drift':'<b>널 1</b> · 부모 2 · 읽을 수 있는 <b>익스프레션 1</b>','log.riso':'<b>리소 프린트</b> · 잉크 #E50437 · 종이 #1F9BE3 · 그레인 .3','log.center':'<b>앵커 → 가운데</b> · 레이어 2 · 위치 유지','log.fit':'<b>컴프에 맞춤</b> · Shape 1 · scale 520% × 160%','log.wiggle':'<b>wiggle(2, 6)</b> · Null 1 · Position · 익스프레션 1','log.you':'나:','log.press':'누름:','log.reset':'— 초기화. 문장이나 버튼을 골라라.',
      'p.tool':'원클릭 잡일','p.motion':'프리셋 · 스프링 · 이징','p.text':'애니메이터 · 자소','p.grad':'라이브러리 · 적용','p.graph':'커브 에디터','p.expr':'에디터 · 스니펫','p.chat':'Claude 내장','p.note':'v{version} 기준 · 채팅은 본인 Claude 플랜으로 — 추가 요금 없음, 토큰 판매 없음.',
      'spot.or':'또는 누르기','plates.h':'툴박스에서 뽑은 판','plates.hint':'올려봐라. 패널이 버튼 위에 띄우는 그 프리뷰가 그대로 돈다.',
      'tip.bentoGrid':'벤토 그리드 셀 생성 — 배치 패턴 선택 + 셀별 등장 애니 (셰이프/프리컴프 실물 레이어)','tip.typewriterCursor':'선택 텍스트에 자소 타이핑 + 깜빡이는 커서','tip.carouselRig':'선택 레이어를 캐루젤 리그로 — 종/횡 스크롤 또는 원형 궤도 + 중앙 확대','tip.shadowCaster':'겹겹이 쌓는 그림자 · 광원 널이 레이어마다 방향을 정한다','tip.proximityRig':'선택 레이어를 이펙터 리그로 — 이펙터 널이 가까울수록 크기/투명도가 변함 (반경 + 감쇠)','tip.textExploder':'텍스트를 글자/단어/줄 레이어로 분리','tip.autoMarker':'선택 레이어의 오디오에서 마커 자동 생성 — 온셋(베이스 등 타격 지점) 또는 템포 격자','tip.addNull':'널 생성 + 선택 레이어 일괄 페어런트',
      'made.h2':'AE 유저가 만들었다. 먼저 쓰고, 그다음 판다.','made.tag':'써보고, 자리를 얻은 것만 남겼다.',
      'made.lead':'200개짜리 프리셋 매립지가 아니다. 여기 있는 도구는 전부 누군가의 실제 한 주에서 자리를 얻었다. 당신을 대신하려는 게 아니라 오후를 돌려주려는 것이다 — 그래야 둘 다 더 좋은 걸 만든다. <b>같이 창작하자.</b>',
      's1':'손을 대신하지, 판단은 아니다.','s1.k':'반복되는 부분을 대신한다. 정하는 건 당신 몫이다.',
      's2':'필요했던 것만. 브로슈어용은 없다.','s2.k':'우리가 안 쓴 건 여기 없다.',
      's3':'뜯어볼 수 있게 만들었다.','s3.k':'모든 키프레임이 보통 키프레임이다. 모든 익스프레션을 읽을 수 있다.',
      's4':'같이 창작하자.','s4.k':'같은 AE, 같은 오후. 우리도 그 시간을 아이디어에 쓰고 싶다.',
      'q.name':'[[이름]]을 붙이는 순간, 시작된다.','q.meaning':'__의미는 주어지지 않는다.__','q.stone':'돌은 이야기가 된다.',
      'kub.h':'쓸 수 있거나 생각할 수 있다면, 찍을 수 있다.','wall':'기록','kub.hover':'납으로 짠 인용',
      'play.h':'직접 어긋내 봐라.','play.p':'판을 끌어라 — 겹친 자리가 새 색이다.','play.reg':'정합',
      'price.h2':'한 번 사면, 계속 네 것.','price.tag':'구독 아님. 2대. 14일 환불.','price.stamp':'한 번 결제','price.kind':'애프터 이펙트 패널','price.once':'한 번','price.h3':'라이선스 하나. 두 대. 네 것.',
      'pl1':'채팅 패널 — Claude 내장','pl1b':'본인 Claude 플랜','pl2b':'패널 6','pl3b':'2대','pl4':'마이너 업데이트','pl4b':'무료','pl5':'환불','pl5b':'14일 · 이유 안 묻음','price.buy':'구매 — {price}','price.fine':'결제 Polar · 라이선스 관리 언제든',
      'aside.h':'한 번 결제. 구독이 아니다.','aside.p':'도구지 서비스가 아니다. 사면 네 컴퓨터에 있고, 오프라인에서도, 우리가 자는 동안에도 돈다.',
      'vs.once':'한 번 결제','vs.once.p':'{price}. 두 대. 마이너 업데이트 무료. 네 것이 아니면 14일 안에 환불.','vs.paid':'결제','vs.done':'끝','vs.sub':'구독','vs.sub.p':'같은 도구에 매달 낸다. 안 내면 도구를 잃는다. 이건 아니다.','vs.still':'아직 내는 중','vs.hover':'(올려봐라)','vs.month':'개월',
      'f1.q':'영상을 대신 만들어 주나요?','f1.a':'아니다. 뭘 만들지는 당신이 정하고, 도구는 레이어에 앉힌다. 쓰는 키프레임 전부가 옮기고 이징하고 지울 수 있는 보통 키프레임이다. 손을 대신하지, 판단을 대신하지 않는다.',
      'f2.q':'Claude 구독이 필요한가요?','f2.a':'채팅 패널은 그렇다 — 본인 Claude 플랜(Pro/Max)으로 돈다. 토큰을 되팔지 않고 추가 요금도 없다. 나머지 여섯 패널은 아예 필요 없다.',
      'f3.q':'어떤 애프터 이펙트 버전?','f3.a':'AE 2022 이상, Windows 와 macOS. 라이선스 하나로 두 대.',
      'f4.q':'나한테 안 맞으면?','f4.a':'14일 환불, 이유 안 묻는다. 메일 한 통이면 끝.',
      'f5.q':'구독인가요?','f5.a':'아니다. {price} 한 번. 마이너 업데이트 무료. 메이저가 유료가 되더라도 산 버전은 계속 쓴다.',
      'f6.q':'사기 전에 뭘 하는지 볼 수 있나요?','f6.a':'위 시뮬레이션을 써보고, 판에 올려보고(패널 버튼이 실제로 띄우는 프리뷰다), 업데이트 노트를 읽어라 — 하는 일이 전부 거기 있다. 실제 AE 녹화는 준비 중.',
      'ft.typed':'쓸 수 있거나 생각할 수 있다면, __찍을 수 있다__. — 큐브릭','ft.meta':'한 번 결제 · 14일 환불','ft.plates':'판','ft.paper':'종이','ft.notes':'업데이트 노트','ft.terms':'이용약관','ft.privacy':'개인정보','ft.refund':'환불','ft.contact':'문의','ft.legal':'파란 필드 위 · 빨간 잉크 · 판 하나',
      mq1:['널 컨트롤러','부모 체인 ×8','이징 75 / 0','스태거 3f','오버슈트 8%','wiggle(2, 6)','프리컴프','앵커 → 가운데','복제 ×12','이름 바꾸기 ×12','그래프 에디터','타임 리맵','loopOut()','슬라이더 컨트롤','트림 패스','글자별 오프셋','홀드 키프레임','모션 블러 켜기','픽위프','베지어 핸들','솔로 · 해제','키프레임 속도','이지 이즈 · 또'],
      mq2:['월요일: 같은 리그','화요일: 같은 리그','수요일: 아직 그 리그','아이디어는 1초 걸렸다','셋업은 오후 내내 걸렸다','레이어 12 · 키 24 · 손으로','널 하나 · 부모 여덟 · 손으로','기획: 남는 만큼','또','또']
    }};

/* 숫자 자리표시자를 제품 정본으로 바꾼다. 사전에 숫자를 적으면 그 순간 낡는다. */
const NUMS: Record<string, string> = {
  '{scripts}': String(COUNTS.scripts),
  '{motion}': String(COUNTS.motion),
  '{gradients}': String(COUNTS.gradients),
  '{textPresets}': String(COUNTS.textPresets),
  '{curves}': String(COUNTS.curves),
  '{expressions}': String(COUNTS.expressions),
  '{tools}': String(COUNTS.tools),
  '{skills}': String(COUNTS.skills),
  '{price}': PRICE,
  '{version}': VERSION,
};

function fill(v: Entry): Entry {
  if (Array.isArray(v)) return v.map((s) => fill(s) as string);
  let out = v;
  for (const [k, n] of Object.entries(NUMS)) out = out.split(k).join(n);
  return out;
}

export const T: Record<Lang, Record<string, Entry>> = {
  en: Object.fromEntries(Object.entries(RAW.en).map(([k, v]) => [k, fill(v)])),
  ko: Object.fromEntries(Object.entries(RAW.ko).map(([k, v]) => [k, fill(v)])),
};

export function t(lang: Lang, key: string): string {
  const v = T[lang][key] ?? T.en[key] ?? key;
  return Array.isArray(v) ? v.join(' · ') : v;
}
export function list(lang: Lang, key: string): string[] {
  const v = T[lang][key] ?? T.en[key] ?? [];
  return Array.isArray(v) ? v : [v];
}
