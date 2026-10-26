/* 릴리스 노트 이력 — 정본. /update 페이지와 홈의 Notes 절이 **같은 배열**을 읽는다.
   🔴 "최신 버전" 의 정본은 여기가 아니라 lib/product.ts 의 VERSION 이다 (다운로드 URL 이
      그 값으로 조립된다). RELEASES[0].version 과 VERSION 이 갈라지면 update 페이지가
      빌드를 깨뜨린다 — 그 단정은 app/update/page.tsx 에 있다.

   🔴 **`items.ko` 와 `items.en` 은 같은 길이여야 한다 — 항목이 1:1 로 대응한다.**
      둘이 어긋나면 안 된다: 한쪽에만 항목을 더하는 순간 같은 릴리스가 언어마다 다른
      내용을 말하게 되고, 건수 배지(`docs.log.n`)도 언어마다 달라진다. 노트를 고칠 때는
      **항상 두 배열을 같은 인덱스에서** 고쳐라. 항목을 지울 때도 같다.

   🔴 EN 은 번역이지 새 카피가 아니다. 한국어가 말하는 것만 옮긴다 — 수치·버전·OS 조건은
      글자 그대로다(`512` · `240` · `3.5MB → 5.1MB` · `Apple Silicon 에서만`). 로그는 역사라
      그 버전 당시의 사실을 현재값으로 고치지 않는다(v2.4.0 의 `툴 41개`·`패널 최대 3개`,
      그 뒤 은퇴한 `Torn Paper`). 톤 정본 = lib/copy/ae.ts 의 `en`.

   🔴 툴·패널·이펙트 이름은 로케일 무관 영문이다 — 양쪽 배열에서 같은 문자열을 쓴다. */
/* `card` = 홈·/ae 릴리스 카드용 한두 문장(해요체 · 오너 2026-10-26 *"카드만 따로 짧게"*). 노트(`items`)가 정본이고 카드는 그 요약이다 —
   노트에 없는 사실을 카드에 쓰지 마라. 없으면 카드는 노트 첫 문장을 쓴다(V5.tsx). */
export type Release = { version: string; date: string; card?: { ko: string; en: string }; items: { ko: string[]; en: string[] } };

export const RELEASES: Release[] = [
  /* 날짜 = 출고일 2026-10-23(개정 방침 시행일 — 웹 배포 · R2 · Polar 같은 날). 근거 = 플러그인 태그 `v2.10.0`(2026-10-23 재봉인 `8f5bf416` · 서명 zxp sha256 `9894e160…` — 10-21 봉인 `0cac8d04` 뒤 챗 buildLayoutFromRef 확인 수리만 더했다(노트 줄 변화 없음) · 10-17 봉인 `35db945f` 뒤 챗 업그레이드·10-18/10-20 배치 동승 · 추가 15줄 = 챗 5 + 배치 4 + 10-20 레인 4 + 캐러셀 경로 칸 1 + 캐러셀 경량화 1(오너 10-21), 정본 FREE_PRO_SPLIT §7 · ko 영상 줄의 탭 이름은 UI 그대로 '영상').
     문구 정본 = 플러그인 `docs/FREE_PRO_SPLIT.md` §7(2026-10-17 사실 확인판 — 개수 26/13 · 검출기 · 감도 · 크레딧 · Codex 기록 위치를 코드·실측으로 대조했다).
     마크다운 굵게만 걷었다(다른 회차처럼 평문).
     §7 끝 *"남은 오너 판단"* 3개 = 오너 판정 2026-10-17: 좁은 도킹 수리 줄은 **넣었다**(플러그인 `0972ce93` Library 132px flex-wrap · 자 libraryNarrow.test ·
     `3445064e` Effector 링크 피커 가로 밀림 — 둘 다 v2.9.0..v2.10.0). ⚠️ **뺀 것**: 수동 이전 팁(robocopy — 해당자 극소 · 실데이터 미시험, 문의 오면 1:1) ·
     "분석이 느려질 수 있음"(실측 반증 2026-10-17 — 윈도 GPU WebGL 1080p 프레임당 tiny 12 ms · SSD 7 ms · 읽기 13 ms 공통. 근거 = 플러그인 FREE_PRO_SPLIT §7). */
  {
    version: '2.10.0',
    date: '2026-10-23',
    card: { ko: '무료 버전이 생겼어요. Library, Curves, Expressions와 Toolbox 툴 26개는 키 없이 써요.', en: 'There’s a free version now. Library, Curves, Expressions and 26 Toolbox tools work without a key.' },
    items: {
      ko: [
        '무료판이 생겼어요. 라이선스 키가 없어도 Library, Curves, Expressions 전부와 Toolbox 툴 26개를 써요. Chat, Custom 1, Toolbox의 Pro 툴 13개는 Pro 키가 있어야 열리고, 잠긴 툴은 목록에 잠금 아이콘이 붙어요. Library의 \'이펙트\' 탭은 이름이 \'내 이펙트\'로 바뀌었어요.',
        '무료판도 업데이트 알림을 받아요.',
        'Face Track: 장면이 바뀌는 컷에서 박스가 끝나고, 얼굴이 화면 밖으로 나가면 박스가 사라져요. 컷은 이웃 프레임의 색 차이로 판정해서 디졸브처럼 서서히 바뀌는 전환은 못 잡아요. 0.3초 이하로 끊긴 구간은 이어 붙여요. 얼굴 검출기를 SSD MobileNet v1으로 바꿔 더 정확해졌어요(감도 3단, 기본은 \'정밀\'). 블러와 모자이크는 화면 가장자리를 드나드는 얼굴이 반쪽만 드러나지 않게 마스크를 앞뒤로 더 길게 켜고, 움직임을 이어서 예측하고, 더 넓게 잡아요. 화면 높이의 5%가 안 되는 작은 얼굴은 아직 놓칠 수 있어요.',
        'AE+PR 번들 키로도 After Effects 플러그인을 활성화해요(2.9.0에서는 번들 키를 거절했어요).',
        'Library 무료 검색: Pexels와 Freesound 결과에 작가와 출처를 표기해요(Freesound는 CC BY-NC 음원을 기본으로 빼요). 출처 표기 줄은 GIPHY를 포함해 늘 보여요. 제3자 고지에 gifsicle과 얼굴 검출 모델(SSD MobileNet)을 더했어요.',
        'Library를 좁게 도킹하면 맨 위 탭 줄, 서브탭 줄, 무료 검색 키 연결 안내가 넘치거나 겹치던 걸 고쳤어요. Effector의 대상 속성 목록이 가로로 밀리던 것도 고쳤어요.',
        '(2.8.0 누락분) 윈도에서 로컬 앱 데이터 폴더(LOCALAPPDATA)를 다른 곳으로 옮겨 뒀다면 패널 데이터도 거기에 저장해요. 예전 위치의 데이터는 자동으로 옮기지 않아요.',
        '(2.8.0 누락분) 윈도에서 Codex 대화 기록 위치가 바뀌어서, 2.8.0 전에 시작한 Codex 탭 대화는 이어 갈 수 없어요. Codex를 쓰는 윈도 사용자 모두 해당돼요.',
        'Chat: 웹에서 이미지를 찾아 바로 넣어요. 모델이 웹을 검색해 기사나 페이지의 이미지를 미리보기로 보여 주고, 고른 이미지를 받아 프로젝트에 넣어요(webp, avif는 PNG로 바꿔요). Pexels, Wikimedia Commons, GIPHY 스톡 검색도 돼요(Pexels와 GIPHY는 Library에 저장한 키를 써요). 받은 파일마다 옆에 출처를 적고, 프로젝트 폴더의 CREDITS.md에도 한 줄씩 남겨요. 써도 되는지, 출처를 어떻게 표기할지는 직접 확인해 주세요.',
        'Chat: 영상 다운로드(선택 기능). 설정 → 영상에서 켜면 yt-dlp를 내려받고, 영상 페이지에서 원하는 구간만 After Effects용 mp4로 받아요. 기본은 꺼져 있고, 사이트 약관과 저작권 판단은 사용자 몫이에요. 내 컴퓨터에 있는 영상의 구간 자르기도 돼요.',
        'Chat: 렌더하는 동안에도 After Effects를 쓸 수 있어요. Chat이 렌더를 별도 프로세스로 돌리고, 진행률을 보거나 취소할 수 있어요. 저장된 프로젝트를 렌더하기 때문에, 저장 안 한 변경이 있으면 먼저 저장할지 물어봐요.',
        'Chat: 덜 막혀요. 이펙트 이름을 잘못 짐작해도 맞는 이펙트를 찾아 넣고, 없는 속성을 고치려 하면 실제 이름 목록을 보여 줘요. 표현식 값이 파라미터 범위에서 잘리거나, 레이어 이름을 바꿔서 다른 표현식이 깨지면 바로 알려 줘요. 같은 파일을 다시 가져와도 프로젝트에 중복 항목을 만들지 않아요.',
        'Chat: 중간에 다시 시작하느라 멈추던 일이 없어졌어요. 이미지를 첨부하거나 큰 작업을 시킬 때 Chat이 한 번 다시 시작하며 생기던 지연이 사라졌어요.',
        'Chat: 글쓰기 스킬 2개. 한국어 자막과 문구의 맞춤법, 띄어쓰기, 문법을 이유와 함께 고쳐 주고, AI가 쓴 티가 나는 한국어 글을 자연스럽게 다듬어요. "맞춤법 봐줘", "자연스럽게 다듬어줘"처럼 말하면 돼요.',
        'Chat: Toolbox 툴을 직접 실행해요. Write On, Parent to Null, Unprecomp, RGB Split처럼 다이얼로그가 없는 Toolbox 툴 16개를 버튼을 누를 때와 같은 방식으로 실행해요. 실행 전에는 다른 After Effects 변경처럼 승인 창이 떠요.',
        'Chat: 웹 페이지 렌더(선택 기능). 설정 → 웹 렌더에서 켜면, 자바스크립트로 그려서 그냥 읽으면 비어 보이는 페이지를 설치된 Chrome, Edge, Brave로 한 장 열어 글과 이미지 후보를 읽어요. 기본은 꺼져 있고, 켤 때 오픈소스 도구 agent-browser(약 18MB, Apache-2.0)를 내려받아요. 쿠키와 로그인은 쓰지 않아요.',
        'Organize Project: 폴더 구성을 직접 정해요. 폴더 이름과 위치를 바꾸고, 종류마다 분류 낱말과 확장자를 고칠 수 있어요. 판정 순서는 그대로고, 같은 낱말을 두 종류에 넣으면 저장하기 전에 알려 줘요. 템플릿 하나를 저장해 두고 파일로 내보내거나 가져올 수도 있어요. 다시 정리할 때 이미 템플릿 폴더 안에 있는 항목은 건드리지 않고, \'다시 분류\'를 켜면 바뀐 템플릿 자리로 옮겨요. 저장 안 한 편집을 덮어쓰기 전에는 한 번 물어봐요. 무료판에서도 써요.',
        'Carousel: 경로 따라가기를 찾기 쉬워졌어요. 창 본문의 \'경로 따라가기\' 칸에 경로 프리셋(스마일 아크, 직선 패스, 궤도 패스) 바로가기와 버튼이 있어요. 펜, 사각형, 타원으로 그린 셰이프 레이어 하나를 고르고 누르면 새 캐러셀도 바로 그 경로를 따라가요(창을 연 채로 골라도 돼요).',
        'Carousel: 가벼워졌어요. 카드 20장 캐러셀 기준으로 미리보기와 모션 블러 렌더가 20~35%쯤 짧아졌고, 만들기는 2배 넘게 빨라졌어요(측정한 PC 기준). Hero Slider가 아니면 그림자 사본 레이어를 만들지 않아요. Effect Controls 드롭다운에서 Hero Slider로 바꿨다면 창에서 다시 적용해야 그림자가 생겨요.',
        '텍스트 퇴장 모션이 레이어 끝에서 잘리지 않아요. 스프링 퇴장처럼 끝맺음이 긴 모션은 레이어가 끝나기 전에 다 끝나도록 일찍 시작해요. 끝맺음이 짧은 프리셋은 타이밍이 그대로예요.',
        'Round Corners, Points to Nulls, Auto Marker가 프로젝트 패널에 빈 \'Solids\' 폴더나 안 쓰는 널을 남기지 않아요.',
        'Parent to Null이 잠긴 레이어를 만나면 부모 없는 널을 남기는 대신 먼저 알려 줘요. Unprecomp가 프리컴프 안의 잠긴 레이어에서 멈추면서 복사본을 반쯤 남기던 것도 고쳤어요.',
        'After Effects를 두 개 띄워도 한쪽 Chat이 다른 쪽 Chat 연결을 끊지 않아요.',
      ],
      en: [
        'There is now a free version. Without a license key you can use all of Library, Curves and Expressions, plus 26 Toolbox tools. Chat, Custom 1 and the 13 Pro Toolbox tools need a Pro key; locked tools appear in the list with a lock icon. The Library "Effects" tab is now called "My Effects".',
        'Free users get update notices too.',
        'Face Track: boxes now end at scene cuts (detected from the color difference between neighboring frames; gradual transitions such as dissolves are not caught) and disappear when the face leaves the frame. Detection gaps of 0.3 s or less are bridged. The face detector is now SSD MobileNet v1 for better accuracy (three sensitivity levels; the default is unchanged). For blur and mosaic, the mask now starts earlier and ends later around the frame edges, follows the face\'s motion through them, and is slightly wider, so a half-visible face is not exposed. Faces smaller than 5% of the frame height can still be missed.',
        'AE+PR bundle keys now activate the After Effects plugin (2.9.0 rejected them).',
        'Library free search: author/source credit is now shown for Pexels and Freesound results (Freesound CC BY-NC sounds are excluded by default), and the credit row is always visible, GIPHY included. The third-party notices now list gifsicle and the face-detection model (SSD MobileNet).',
        'Fixed the top tab row, sub-tab row and the free-search key notice overflowing or overlapping when Library is docked narrow. The Effector Target property list no longer shifts sideways.',
        '(Owed from 2.8.0) On Windows, if you moved your local app data folder (LOCALAPPDATA), the panel now stores its data there too. Data at the old location is not moved automatically.',
        '(Owed from 2.8.0) On Windows, the Codex conversation history moved, so Codex tab conversations started before 2.8.0 can\'t be continued (this applies to every Windows user of Codex).',
        'Chat: finds web images and brings them in. The model searches the web, shows previews of the images on an article or page, then downloads the one you pick into the project (webp/avif are converted to PNG). Stock search covers Pexels, Wikimedia Commons and GIPHY (Pexels and GIPHY use the keys saved in Library). Each downloaded file gets its source recorded beside it and a line in CREDITS.md in the project folder. Check usage rights and attribution yourself.',
        'Chat: video download (optional). Turn it on in Settings → Video to install yt-dlp, then download just the section you need from a video page as an After Effects–ready mp4. It is off by default; site terms and copyright are your responsibility. Chat can also cut a section out of a local video.',
        'Chat: After Effects stays usable while rendering. Chat renders in a separate process, with progress and cancel. It renders the saved project, so if there are unsaved changes it asks before saving.',
        'Chat: fewer dead ends. A mistyped effect name still finds the right effect, and setting a property that does not exist shows the real names. Chat warns right away when an expression\'s value is clipped by the parameter\'s range, or when renaming a layer breaks another expression. Importing the same file again no longer adds a duplicate item.',
        'Chat: no more restart delay. Attaching an image or asking for a large job no longer makes Chat restart once first.',
        'Chat: two writing skills. Chat checks Korean captions and copy for spelling, spacing and grammar and explains each fix, and rewrites Korean text that reads as AI-written so it sounds natural. Ask with phrases like "check the spelling" or "make this read naturally".',
        'Chat: runs Toolbox tools directly. Chat can run the 16 Toolbox tools that have no dialog, such as Write On, Parent to Null, Unprecomp and RGB Split, the same way the buttons do. Like any other After Effects change, it asks for approval first.',
        'Chat: web page rendering (optional). Turn it on in Settings → Web Render to let Chat open one page that draws its content with JavaScript (and looks empty to a plain read) in your installed Chrome, Edge or Brave and read its text and image candidates. It is off by default; turning it on downloads the open-source tool agent-browser (about 18 MB, Apache-2.0). No cookies or logins are used.',
        'Organize Project: set up your own folders. Rename and move folders, and edit the classification words and file extensions for each kind (the order of the checks stays the same, and a word put in two kinds is flagged before saving). Save one template and export or import it as a file. When you organize again, items already inside the template folders are left where they are; turn on "Reclassify" to move them to the changed template\'s places. You are asked once before unsaved edits are overwritten. Available in the free version.',
        'Carousel: Follow a path is easier to find. The new "Follow a path" section in the dialog has shortcuts to the path presets (Path Smile · Path Line · Orbit Path) and the button. Select one shape layer drawn with the pen, rectangle or ellipse tool and press it. A new carousel now follows that path straight away (you can pick the layer while the window is open).',
        'Carousel: lighter. On a 20-card carousel, preview and motion-blur renders take about 20–35% less time, and building one is more than twice as fast (measured on our test PC). Presets other than Hero Slider no longer create shadow-copy layers. If you switch a carousel to Hero Slider from the Effect Controls dropdown, reapply it from the dialog to add that shadow.',
        'Text exit animations are no longer cut off at the end of the layer. Exits with a long settle, such as the spring exit, start early enough to finish before the layer ends. Presets with a short settle keep their timing.',
        'Round Corners, Points to Nulls and Auto Marker no longer leave an empty "Solids" folder or unused nulls in the Project panel.',
        'Parent to Null now stops with a message when it meets locked layers, instead of leaving a null with no children. Unprecomp no longer stops halfway on a locked layer inside a precomp and leaves half the copies behind.',
        'With two After Effects windows open, Chat in one no longer cuts off Chat in the other.',
      ],
    },
  },
  /* 날짜 = 실제 출고일 2026-10-13(태그 · R2 · Polar · 배포 같은 날).
     근거 = 플러그인 태그 `v2.9.0`(`5b261f8b`) 의 `git log v2.8.0..v2.9.0` 중 유저가 체감하는 feat·fix·perf 만.
     카탈로그 숫자(COUNTS)는 이 태그에서 그대로다 — src/data/* diff 0 · schemas.ts 는 설명 문구만 바뀌었다.
     ⚠️ **뺀 것**: 하네스·bench·린트·문서 · 의사 이펙트 matchName 개명 등 내부 수리 · Chat 프롬프트 다듬기와 토큰 절감 ·
     evalScript 와이어 교체(체감은 빨라짐뿐이라 항목을 세우지 않았다) · 캐러셀 호버 시트 재제작(기능 변화 아님). */
  {
    version: '2.9.0',
    date: '2026-10-13',
    card: { ko: '툴 9개의 조절 값이 이펙트 한 장에 모였어요. 슬라이더를 찾아다닐 일이 줄었어요.', en: 'Controls for nine tools now sit in one effect, so there’s less slider hunting.' },
    items: {
      ko: [
        'Effector, Click React, Cursor Click, Round Corners, Master Shadow, Depth Pass, Overshoot, Edge Boil, Typewriter의 조절 값이 Effect Controls에서 이펙트 한 장으로 모였어요. 이제 슬라이더 여러 개를 찾아다니지 않아도 돼요.',
        '이전 버전에서 위 툴로 만든 리그는 그대로 다시 적용할 수 없어요. 해제하거나 그 컨트롤을 지우고 다시 적용해 주세요. 패널도 같은 안내를 띄워요.',
        'Effector에서 가끔 나던 "내부 오류"를 고쳤어요. 한국어 After Effects에서 Fill Opacity 같은 % 속성이 목록에서 빠지던 것, 오디오 이펙트와 구형 이펙트가 이펙트 고르기에 섞이던 것도 고쳤어요.',
        'Chat을 Claude나 Codex 구독 대신 API 키로도 써요. 설정의 계정 탭에서 백엔드마다 구독 로그인과 API 키 중 하나를 고르면 돼요. 키는 맥에서는 키체인에, 윈도에서는 암호화해서 저장해요.',
        'Chat에 이미지를 레퍼런스로 주면 색을 못 뽑던 걸 고쳤어요. 여러 시점을 미리 볼 때 일부 프레임이 실패해도 나머지 프레임은 그대로 보여 줘요.',
        'Bento Grid의 Fill과 Cut이 빨라졌고, 적용이 끝났는데도 시간 초과라고 알리던 걸 고쳤어요.',
        '드롭다운이 After Effects 안에서 안 열리던 걸 고쳤어요. 좁게 도킹한 패널에서 다이얼로그 버튼이 넘치거나 Effector 이펙트 고르기 칸이 찌그러지던 것도 고쳤어요.',
        'Carousel 갤러리 미리보기가 초당 30프레임으로 부드럽게 돌아요. 툴 미리보기 이미지는 7.7MB에서 3.5MB로 가벼워졌어요.',
        '맥의 Pattern Lab 폰트 목록에서 시스템이 숨긴 폰트를 뺐어요. After Effects가 받지 않는 폰트 이름도 목록에 넣지 않아요.',
        '잘못된 라이선스 키를 넣어도 기존 활성화가 풀리지 않아요. 윈도에서 오프라인인데 CLI가 "이미 최신"이라고 나오던 것도 고쳤어요.',
      ],
      en: [
        'The controls for Effector, Click React, Cursor Click, Round Corners, Master Shadow, Depth Pass, Overshoot, Edge Boil and Typewriter now sit in a single effect in Effect Controls. No more hunting through separate sliders.',
        'Rigs made with these tools in an earlier version can\'t be re-applied as they are. Release them or delete their controls, then apply again. The panel shows the same message.',
        'Fixed the intermittent "internal error" in the Effector. In Korean After Effects, % properties such as Fill Opacity no longer drop out of the list, and audio and obsolete effects no longer show up in the effect picker.',
        'Chat can run on an API key instead of a Claude or Codex subscription. In the Account tab of settings, choose subscription login or API key for each backend. Keys are kept in the Keychain on Mac and stored encrypted on Windows.',
        'Fixed Chat failing to pull colors from an image reference. When previewing several times at once, the frames that succeed are still shown if some fail.',
        'Bento Grid Fill and Cut are faster, and they no longer report a timeout after the apply has finished.',
        'Fixed dropdowns not opening inside After Effects. In a narrowly docked panel, dialog buttons no longer overflow and the Effector effect picker no longer collapses.',
        'Carousel gallery previews play smoothly at 30 fps. Tool preview images went from 7.7MB to 3.5MB.',
        'The Pattern Lab font list on Mac leaves out fonts the system hides, and skips font names After Effects won\'t accept.',
        'Entering a wrong license key no longer undoes an existing activation. Fixed the CLI saying "already up to date" on Windows while offline.',
      ],
    },
  },
  /* 날짜 = 실제 출고일 2026-10-05(태그 · R2 · Polar · 배포 같은 날).
     🔴 **초안 근거 = 플러그인 main `bb6be638`(v2.8.0 후보)** 의 `git log v2.7.1..main` · `donys/usage/{ko,en}` · i18n.
     태그가 서면 한 번 더 대조해라. 항목마다 코드에서 찾은 것만 적었다(Carousel Controls · 내 카드 수에 맞추기 / 프리셋에 맞추기 ·
     선택한 경로 따라가기 · Reasoning effort · CLI Update 버튼 · Comp Library 탭 · Distribute Values · Vertex Grid ·
     Bento 셀 모양/Cut 타일 등).
     ⚠️ **뺀 것**(다음 사람이 "왜 빠졌지"로 되돌리지 않게):
     ⑴ Riso Print · Vox Original — 2026-10-01 오너 판정으로 로컬 전용(출고 중단). 2.7.1 항목의 Riso Print 는 역사라 그대로 둔다 ·
     ⑵ 호버 프리뷰·패널 영상·썸네일 재제작 — 눈에 보이지만 기능 변화가 아니다 ·
     ⑶ 토스트(붉은 돌)·텍스트 3단·다이얼로그 폭·한국어 문구 전수 정리·라이선스 안내 문구 — 표면 다듬기 ·
     ⑷ Chat 의 ElevenLabs(Enhance·모델 고르기)·`renameLayers` 툴 — 이 릴리스가 처음인지·유저가 부르는 면인지 확정 못 해 뺐다
        (`renameLayers` 는 COUNTS.tools 56 → 57 에 걸린다) ·
     ⑸ Effector 3D 모델/메쉬 멤버·Depth Pass 프리필·벤토/이펙터 레이어 수 상한 해제 — 세부 개선 ·
     ⑹ 하네스·bench·자·린트·문서·리팩터·검증 수리 전부 ·
     ⑺ 초안의 "Chat 이 대화를 몰래 압축하지 않는다 · 사용량 % · 80% 배너" — **v2.7.1 에 이미 있던 기능**이라 뺐다(태그 i18n 실측).
        게다가 CLI 는 창이 차면 스스로 요약할 수 있다(사용법 panel-chat 한계 줄) → "몰래 압축 안 함" 은 사실도 아니다.
     문구는 humanizer 기준으로 다듬었다(2026-10-05): 백틱 제거(2.7.1 판처럼 평문) · 대조 수사("~뿐 아니라") 제거 · 화면 이름은 한국어 UI 그대로. */
  {
    version: '2.8.0',
    date: '2026-10-05',
    card: { ko: 'Carousel을 새로 지었어요. 드롭다운 하나로 레이아웃 35가지를 바꿔요.', en: 'Carousel was rebuilt. One dropdown switches between 35 layouts.' },
    items: {
      ko: [
        'Carousel을 새로 지었어요. Carousel Controls 이펙트 맨 위의 Preset 드롭다운에서 레이아웃 35가지를 바로 바꿔요. 적용하면 캐러셀은 따로 만든 스테이지 컴프에 들어가고, 내 컴프에는 레이어 하나만 놓여요.',
        'Carousel에 고른 레이어가 프리셋 카드 수보다 적으면, 내 카드 수에 맞출지(기본) 프리셋에 맞출지 골라요. 앞쪽은 내 레이어 수로 다시 배치하고, 뒤쪽은 프리셋 카드 수를 지키면서 내 레이어를 반복해 채워요. 셰이프 레이어의 경로를 따라 카드가 흐르게 할 수도 있어요.',
        '이전 버전에서 만든 캐러셀은 편집할 수 없어요. 해제하고 다시 만들어 주세요. 이전 Carousel로 저장한 프리셋은 옮겨지지 않아요.',
        'Chat 모델 목록은 설치된 Claude Code와 Codex CLI가 지원하는 모델을 그대로 보여 줘요. 목록에서 CLI 버전을 확인하고 버튼 한 번으로 업데이트하고, CLI가 없으면 패널이 설치해요.',
        'Chat에서 추론 강도(Reasoning effort)를 골라요. 고를 수 있는 단계는 모델마다 달라요.',
        'Copy/Paste Keys가 Curves 패널로 옮겨 왔고, 역순으로도 붙여 넣어요. Elastic과 Bounce는 꺾이는 자리마다 키프레임을 넣고, 그래프의 첫 꺾임 손잡이를 끌어 크기와 횟수를 정해요.',
        'Library에 Comp 탭이 생겼어요. 열린 컴프를 담아 뒀다가 다른 프로젝트에서 꺼내 써요.',
        'Distribute Values는 고른 레이어의 위치, 회전, 스케일, 불투명도를 간격이나 범위, 수식으로 나눠 넣어요. Vertex Grid는 레이어 꼭짓점에서 컴프 끝까지 뻗는 그리드 선과 마크를 셰이프로 그려요. 둘 다 새 툴이에요.',
        'Bento Grid 칸 모양을 사각형, 타원, 폴리곤, 스타 중에서 골라요. Cut은 칸마다 원본의 그 영역만 담은 프리컴프를 만들어요.',
        'Effector에 After Effects 이펙트를 바로 얹을 수 있고, 얹으면 거리에 반응하도록 곧바로 연결돼요. Text Preset의 Glitch In은 박스 모자이크로 다시 만들었어요.',
        'Loop In/Out이 엉뚱한 오류를 내던 것, Position에 오버슈트 곡선을 걸면 분리만 하고 멈추던 것을 고쳤어요.',
        'Anchor Point가 스케일, 회전, 3D 방향을 따르지 않던 것, Multi Fill의 색 입력 칸이 닫히던 것, Pattern Lab의 ASCII 색과 폰트 목록이 안 열리던 것을 고쳤어요.',
      ],
      en: [
        'Carousel was rebuilt. The Preset dropdown at the top of the Carousel Controls effect switches between 35 layouts. Applying it puts the carousel in a stage comp of its own, and your comp gets a single layer.',
        'When you pick fewer layers than the preset has cards, choose Fit to my cards (the default) or Fit to preset. The first lays the preset out for your layer count; the second keeps the preset\'s card count and repeats your layers to fill it. Cards can also flow along a shape layer\'s path.',
        'Carousels made in an earlier version can\'t be edited. Release them and make them again. Presets saved with the old Carousel are not carried over.',
        'The Chat model list shows the models your installed Claude Code and Codex CLI support. You can check the CLI version in the list and update it with one button, and the panel installs the CLI if it\'s missing.',
        'Chat lets you pick a reasoning effort. The available steps depend on the model.',
        'Copy/Paste Keys moved to the Curves panel, and it can paste in reverse. Elastic and Bounce add a keyframe at every turn, and you drag the first bend handle on the graph to set size and count.',
        'The Library has a Comp tab. Save an open comp there and bring it into another project.',
        'Distribute Values spreads position, rotation, scale or opacity across the selected layers by step, range or formula. Vertex Grid draws grid lines and marks as shapes, running from a layer\'s corners to the comp edge. Both are new tools.',
        'Bento Grid cells can be rectangles, ellipses, polygons or stars. Cut makes a precomp per cell holding only that region of the original.',
        'The Effector takes any After Effects effect directly and links it to distance as soon as you apply it. The Text Preset Glitch In was rebuilt as a box mosaic.',
        'Fixed Loop In/Out raising false errors, and the overshoot curve stopping after it separated Position.',
        'Fixed Anchor Point ignoring scale, rotation and 3D orientation, the Multi Fill color input closing, and the Pattern Lab ASCII color and font list not opening.',
      ],
    },
  },
  /* 🔴 **출고본은 `2.7.1` 이다. `2.7.0` 은 태그까지 갔지만 나가지 않았다** (오너 2026-09-19) —
     R2 에 오른 `donys-2.7.0.zxp` 가 오너 수정 11건 **이전** 판이었고, 같은 이름으로 덮으면 엣지가
     최대 한 달(`.zxp` 캐시 1개월) 구판을 먹인다. 그래서 이름을 바꿔 재컷했다. 알림은 아직 안 나갔으므로
     (`version.json` 이 2.6.0 이었다) 깨지는 사용자는 없다. **`2.7.0` 을 되살리지 마라.**
     🔴 Codex 항목(`ko[2]`/`en[2]`)은 오너 판정으로 들어왔다. 근거는 전언이 아니라
     태그 실측이다 — `v2.7.0`(`8286c1d`, 2.7.1 의 부모) 에 `src/chat/provider/codex.ts` 가 있고, `i18n/{ko,en}.ts`
     의 `onboarding.altBackend` 가 **양 로캘에서** 유저에게 "Codex CLI 를 깔고 백엔드 선택에서 고르라"고
     말하며, `LoginGate.tsx` 에 Codex 전용 로그인 흐름이 있다. 숨은 기능이 아니라 제품이 이미 말하는 것이다.
     🟢 가격 논거는 그대로 선다 — Codex 인증이 `auth_mode="chatgpt"`(유저 본인 구독)라 "우리가 토큰을
     되팔지 않는다"가 유지된다. 같은 이유로 카피 7키를 Claude 단독 → 양쪽 병기로 고쳤다.
     ⚠️ **뺀 것 4건**(다음 사람이 "왜 빠졌지"로 되돌리지 않게): ⑴ 프리뷰/호버 — 죽은칸 5개 미해결 ·
     ⑵ 이펙터 텍스트 채널 — jsx 는 서 있으나 다이얼로그 UI 가 없어 **유저가 못 쓴다** ·
     ⑶ 재시작 배너 — v2.6.0 jsx 에 버전 스탬프가 없어 `unknown` 으로 빠지고 조용히 넘어간다, 즉
     2.6.0→2.7.1 에선 **안 뜬다**(처음 일하는 건 2.7.1→다음 판) · ⑷ 내부 계기·리그 변경. */
  {
    version: '2.7.1',
    date: '2026-09-19',
    card: { ko: '이펙터가 이펙트도 걸어요. Chat은 ChatGPT로도 돌아가요.', en: 'The Effector applies effects now, and Chat runs on ChatGPT too.' },
    items: {
      ko: [
        '이펙터가 이펙트도 걸어요. 프리셋을 고르면 멤버 전원에 한 번에 걸고, 거리에 반응할 속성까지 바로 이어 줘요.',
        '직접 만든 이펙트도 이펙터에 물려요. 멤버 하나에 걸고 나머지에 복사한 다음 그 파라미터를 고르면 돼요.',
        'Chat 패널이 ChatGPT도 써요. Codex CLI를 설치하면 패널 아래 백엔드 선택에서 고를 수 있고, 로그인도 패널이 안내해요. 어느 쪽이든 본인 구독으로 돌아가요. 우리는 토큰을 팔지 않아요.',
        'Chat 로그인을 이제 터미널 없이 패널 안에서 바로 해요.',
        'Auto Marker가 무엇을 기준으로 찍었는지 화면에 보여요.',
        'Riso Print를 하우스 잉크 체인으로 다시 지었어요. 텍스처가 아예 안 붙던 문제도 고쳤어요.',
        'Bento Grid 간격이 화면에서 줄어들던 것, 이미지가 컴프 밖에 남던 것을 고쳤어요.',
        'Chat 툴바가 화면 밖으로 나가던 것, 헤더에 엉뚱한 버전이 적히던 것을 고쳤어요.',
      ],
      en: [
        'The Effector can apply effects now. Pick a preset and it lands on every member at once, then links the property that reacts to distance.',
        'Your own effects work with the Effector too. Apply one to a single member, copy it to the rest, then pick that parameter.',
        'The Chat panel runs on ChatGPT too. Install the Codex CLI and you can pick it in the backend selector at the bottom of the panel; the panel walks you through signing in. Either way it runs on your own plan, and we do not sell tokens.',
        'You now sign in to Chat inside the panel instead of the terminal.',
        'Auto Marker shows on screen what it based its marks on.',
        'Riso Print was rebuilt on the house ink chain, and the texture that never attached is fixed.',
        'Fixed Bento Grid gaps shrinking on screen, and images being left outside the comp.',
        'Fixed the Chat toolbar escaping the screen and the header showing the wrong version.',
      ],
    },
  },
  {
    version: '2.6.0',
    date: '2026-09-15',
    items: {
      ko: [
        'Depth Pass가 들어왔어요. 영상이나 사진 레이어를 고르고 실행하면 깊이 맵을 만들어 그 레이어 아래에 깔고 Camera Lens Blur를 걸어 줘요. 초점은 Focus Distance 슬라이더로 정해도 되고, Auto Focus를 켜고 Focus Point를 화면에서 원하는 지점으로 끌어다 놓으면 그 지점의 깊이를 매 프레임 읽어 초점을 맞춰요. 배경 흐림은 나중에 얼마든지 다시 조절할 수 있고, 시차(깊이에 따라 밀리는 정도)도 노브로 조절해요.',
        'Depth Pass는 처음 한 번만 실행 환경을 내려받아요. 버튼을 누르면 진행률이 보이고, 끝나면 다음부터는 바로 실행돼요. 인터넷이 필요한 건 이 첫 회뿐이에요. macOS는 Apple Silicon에서만 돌아가요(Intel Mac은 지원하지 않아요). Windows에서는 그래픽카드로 계산해요.',
        'Pattern Lab의 Apply to layer에서 가로 칸 수를 512까지 올릴 수 있어요(전에는 240이었어요). 다만 칸 수를 올리면 만들어지는 도형 수가 제곱으로 늘어나니, 촘촘하게 쓸 때는 작은 값으로 먼저 확인해 보세요. 그리고 구운 타일 PNG가 프로젝트 파일 옆에 저장되도록 바뀌어서, 프로젝트를 옮겨도 그림이 따라가요.',
        'Toolbox를 정리했어요. 팔레트를 순서대로 배정하는 Sequential Fill과 무작위로 배정하는 Random Fill이 들어왔고, Parent to Null이 돌아왔어요. 안 쓰이던 툴 6종은 뺐어요. 툴 안의 숫자 조절 항목은 모두 슬라이더와 숫자 입력을 나란히 두는 방식으로 맞췄어요.',
        'Multi Fill이 색을 배정하는 순서를 타임라인 아래에서 위로(레이어를 만든 순서대로) 바꿨어요.',
        '출고 이펙트에 Riso Print가 더해져 다섯 가지가 됐어요. 리소 인쇄 특유의 잉크 번짐과 종이 질감을 실제 텍스처로 입혀요.',
        'Auto Marker가 AIFF 파일도 읽어요.',
        '패널 일곱 개의 색과 모양을 한 번 더 손봤어요. Toolbox 패널 크기 조절이 패널 끝에서 멈추지 않던 문제, Custom 패널 제목이 어긋나던 문제도 같이 고쳤어요.',
        '업데이트 알림이 하루 늦게 뜨던 문제, 인앱 설치가 실패하면 내부 오류 문구를 그대로 보여 주던 문제를 고쳤어요. 업데이트 파일을 받는 경로도 새 서버로 옮겨서 더 빠르고 안정적이에요.',
      ],
      en: [
        'Depth Pass is in. Select a video or photo layer and run it. It builds a depth map, lays it under that layer, and applies Camera Lens Blur. Set where the focus sits with the Focus Distance slider, or turn on Auto Focus and drag Focus Point to the spot you want on screen: it reads the depth under that point every frame and focuses there. The background blur stays adjustable afterwards, and parallax (how far things shift with depth) sits on a knob.',
        'Depth Pass downloads its runtime once, the first time. Press the button and you get progress; after that it runs straight away. The internet connection is only needed for that first run. On macOS it works on Apple Silicon only (Intel Macs are not supported). On Windows it computes on the graphics card.',
        'Apply to layer in Pattern Lab goes up to 512 columns (it was 240). Raising the column count grows the number of shapes it makes by the square, so when you are going dense it is better to check a small value first. Baked tile PNGs are now saved next to the project file, so the artwork travels with the project when you move it.',
        'The Toolbox has been tidied. Sequential Fill, which assigns the palette in order, and Random Fill, which assigns it at random, are in, and Parent to Null is back. Six tools that were not being used are gone. Every numeric control inside a tool now puts a slider and a number field side by side.',
        'Multi Fill now assigns colors bottom to top in the timeline, in the order you made the layers.',
        'Riso Print joins the bundled effects, making five. It lays the ink bleed and paper tooth of riso printing on as real texture.',
        'Auto Marker reads AIFF files too.',
        'All seven panels got another pass on color and shape. Two fixes came with it: resizing the Toolbox panel now stops at the panel edge, and the Custom panel title no longer sits out of line.',
        'The update notice was arriving a day late, and a failed in-app install showed the internal error text as it was. Both are fixed. Update files now come from a new server, which is faster and steadier.',
      ],
    },
  },
  {
    version: '2.5.0',
    date: '2026-09-07',
    items: {
      ko: [
        'Pattern Lab이 들어왔어요. 도트 격자, 해치, 체커, 하프톤, 트뤼셰, 동심원, 아스키, 그레인까지 여덟 가지 패턴을 슬라이더로 만들고, 벡터 셰이프나 PNG로 구워요. 스크롤, 회전, 플리커 움직임도 붙일 수 있어요. 익스프레션이나 이펙트 없이 키프레임만 찍어서 재생이 무거워지지 않아요.',
        'Pattern Lab에는 방식이 하나 더 있어요. 레이어를 고르고 열면, 그 레이어의 밝기가 패턴 농도가 되는 모드로 열려요. 밝은 곳은 빽빽하게, 어두운 곳은 성기게 찍혀서 영상이나 사진을 패턴으로 바꿀 수 있어요. 아스키 모드에서는 쓸 글자를 직접 적어요.',
        'Shadow Caster의 이름이 Master Shadow로 바뀌었어요. 접힌 서랍 안에 있던 조절 항목을 밖으로 꺼냈고, 그림자에 그라디언트를 넣을 수 있게 했어요.',
        'Cursor Click이 훨씬 커졌어요. macOS 커서 아이콘 열 가지를 쓸 수 있고, 커서가 움직이는 동안 아이콘이 바뀌어요(끌 때는 손 모양처럼요). 클릭 한 번이 아니라 여러 지점을 잇는 경로를 만들 수 있고, 각 지점 위치는 이미 있는 레이어에서 집어 와요. 클릭 리플과 도착 지점의 튕김도 조절해요.',
        'Library의 모션 프리셋이 등장과 퇴장으로 나뉘었어요. 전에는 하나를 고르면 등장과 퇴장이 같이 붙었는데, 이제 따로 고르고 각각 타이밍을 마커로 잡아요. 이동 거리는 적용한 뒤에도 Effect Controls에서 계속 바꿀 수 있어요. 텍스트 프리셋도 같은 방식이에요.',
        'Library 카드에 마우스를 올리면 나오는 미리보기가 실제로 만들어지는 결과와 다르던 문제를 고쳤어요. 곡선만 바뀌고 숫자는 그대로이던 것, 퇴장이 등장 경로를 그대로 되짚던 것, 사라진 뒤에도 잔상이 남던 것도 같이 고쳤어요.',
        '커스텀 툴박스 패널이 3개에서 1개로 줄었어요. 대신 그 패널 안에서 저장해 둔 배치를 드롭다운으로 골라 써요. 저장한 배치는 그대로 남아 있고 고르는 방식만 바뀌어서, 만들어 둔 걸 다시 만들 필요는 없어요.',
        'Fit Precomps가 한 단계 아래 프리컴프에서 멈추고 더 안쪽으로 들어가지 않던 문제를 고쳤어요. 참고로 Trim Layers to Comp는 일부러 현재 컴프만 잘라요. 안쪽까지 자르려면 After Effects의 Alt+[와 Alt+]를 쓰는 편이 나아요.',
        'Toolbox 셀 크기를 숫자로 넣을 때 두 값 말고는 입력이 안 되던 문제, 큰 타일에 이름이 안 보이던 문제를 고쳤어요.',
      ],
      en: [
        'Pattern Lab is in. It builds eight patterns on sliders (dots, hatch, checker, halftone, truchet, concentric, ASCII and grain) and bakes them to vector shapes or PNG. You can add scroll, rotate and flicker motion, and it writes keyframes only, no expressions and no effects, so playback does not get heavy.',
        'Pattern Lab has a second way in. Select a layer before you open it and it opens in the mode where that layer\'s luminance becomes the density of the pattern. Bright areas come out dense and dark areas sparse, so a video or a photo turns into a pattern. In ASCII mode you type the characters it uses yourself.',
        'Shadow Caster is now called Master Shadow. The controls that were folded away in a drawer are out in the open, and the shadow can take a gradient.',
        'Cursor Click grew a lot. Ten macOS cursor icons are available, and the icon changes as the cursor moves (a hand while dragging, for instance). Instead of a single click you can build a path through several points, and each point can take its position from a layer that is already there. The click ripple and the bounce at the arrival point are adjustable too.',
        'Motion presets in the Library are split into in and out. Picking one used to attach both; now you pick them separately and set the timing of each with a marker. The travel distance stays editable in Effect Controls after you apply it. Text presets work the same way.',
        'The preview you see when you hover a Library card did not match what actually got built. Fixed, together with three things underneath it: the curve changing while the numbers did not, the out retracing the path of the in exactly, and a trail left behind after the layer was gone.',
        'Custom Toolbox panels went from three to one. Inside that one you pick a saved layout from a dropdown instead. The layouts you saved are still there and only the way you choose them changed, so there is nothing to build again.',
        'Fit Precomps now goes deeper than one level of precomp; it used to stop there. Trim Layers to Comp still trims only the current comp, on purpose. To trim further in, After Effects’ own Alt+[ and Alt+] are the better route.',
        'Typing a Toolbox cell size as a number took only two values, and large tiles showed no name. Both are fixed.',
      ],
    },
  },
  {
    version: '2.4.0',
    date: '2026-08-31',
    items: {
      ko: [
        '제품 이름이 You Name It으로 바뀌었어요. After Effects 창 메뉴에 뜨는 이름도 같이 바뀌어서, 업데이트한 뒤 예전 이름으로 찾으면 안 보일 수 있어요. 창 메뉴에서 You Name It으로 시작하는 항목을 찾아 주세요. 설치 위치와 저장된 데이터는 그대로고, 라이선스도 다시 넣을 필요 없어요.',
        '패널 전체의 색과 모양을 새로 했어요. 크림색 계열이 파랑 단색 팔레트로 바뀌었고, 버튼은 평소엔 면을 채우지 않다가 누르는 순간에만 반전돼요. 익스프레션 에디터의 구문 색도 같은 팔레트로 맞췄어요.',
        'Toolbox를 직접 배치할 수 있어요. 버튼을 원하는 자리로 끌어다 놓고 크기를 바꾸면 되고, 겹치면 아래 버튼이 밀려나요. 빈 칸은 그대로 여백으로 남아요.',
        'Toolbox 패널을 최대 3개까지 따로 띄워요. 패널마다 다른 배치를 저장하고, 배치를 파일로 내보내거나 가져올 수 있어요.',
        '자주 쓰는 설정을 버튼으로 굳혀 둘 수 있어요. 툴을 실행할 때 넣은 값까지 같이 저장돼서, 다음부터는 한 번만 누르면 같은 설정으로 실행돼요. Library의 그라디언트, 텍스트 프리셋, 이징 커브, 익스프레션, 이펙트도 Toolbox 패널에 담을 수 있어요.',
        '새 툴 3개가 들어왔어요. Auto Marker는 오디오 박자를 읽어 마커를 찍어요. Start Marker는 작업 시작점을 표시해요. Torn Paper는 찢어진 종이 가장자리와 접힌 자국을 만들어요.',
        '툴 41개에 미리보기 그림이 붙었어요. 컴프 화면에 결과가 바로 드러나지 않는 툴도 버튼 위에서 뭘 하는지 확인할 수 있어요.',
        '설치 파일이 3.5MB에서 5.1MB로 늘었어요. 위 미리보기 그림이 들어간 만큼이에요.',
      ],
      en: [
        'The product is now called You Name It. The name in the After Effects Window menu changed with it, so after updating you may not find it under the old name. Look for the entries that start with You Name It. The install location and your saved data are unchanged, and you do not need to enter your license again.',
        'Every panel got a new color and shape. The old cream tones became a single blue palette, and buttons no longer carry a filled face; they invert only at the moment you press them. The syntax colors in the expression editor were brought onto the same palette.',
        'You arrange the Toolbox yourself now. Drag a button where you want it and resize it; when buttons overlap, the one underneath is pushed aside. Empty cells stay as empty space.',
        'Up to three Toolbox panels can be open separately. Each panel holds its own layout, and layouts export and import as files.',
        'A setting you reach for often can be frozen into a button. The values you entered when you ran the tool are saved with it, so one press runs it the same way next time. Gradients, text presets, easing curves, expressions and effects from the Library can go into a Toolbox panel too.',
        'Three new tools are in. Auto Marker reads the beat out of the audio and drops markers. Start Marker marks where the work begins. Torn Paper makes torn paper edges and fold creases.',
        '41 tools got a preview image. Even the tools whose result does not show up in the comp straight away now say what they do on the button itself.',
        'The installer grew from 3.5MB to 5.1MB. That is what the preview images above cost.',
      ],
    },
  },
  {
    version: '2.3.3',
    date: '2026-08-23',
    items: {
      ko: [
        '일주일쯤 지나면 라이선스가 풀려서 키를 다시 넣어야 하던 문제를 고쳤어요. 원인이 세 가지 겹쳐 있었어요. 컴퓨터를 알아보는 값을 재부팅이나 네트워크 상태에 따라 흔들릴 수 있는 정보로 만들었고, 오프라인 확인 중에 잠깐 통신 오류가 나면 유예 없이 바로 잠갔고, 여러 패널이 한꺼번에 켜지면 저장된 라이선스 정보가 서로 덮어쓰다 깨질 수 있었어요. 이제는 운영체제가 보장하는 영구 식별자를 쓰고, 통신이 잠깐 안 될 때는 잠그지 않고 기다려요.',
        '위 수리로 기존에 저장된 라이선스 정보는 새 방식으로 자동으로 옮겨져요. 다만 그사이 컴퓨터 이름을 바꾼 적이 있다면 업데이트 뒤 딱 한 번 키를 다시 넣어야 할 수 있어요. 그다음부터는 풀리지 않아요.',
        'Round Corners에서 네 모서리에 다른 반경을 줘도, Effect Controls의 체크박스를 손으로 켜기 전까지는 모든 모서리가 같은 값으로 보이던 문제를 고쳤어요. 이제 모서리별로 값을 주면 처음부터 다르게 적용돼요.',
        '참고로, 한 모서리 반경을 아주 크게 주면 이웃 모서리가 덜 둥글어 보이는 건 결함이 아니라 의도한 동작이에요. 두 모서리의 라운드가 한 변 위에서 겹치지 않게 비례해서 줄이는 규칙이고, Figma나 웹 CSS와 같은 방식이에요. 슬라이더에 넣은 값은 그대로 남아요.',
        '설치 파일이 14MB에서 3.5MB로 가벼워졌어요. 안 쓰게 된 대용량 리소스를 덜어 냈어요.',
      ],
      en: [
        'Fixed the license coming loose after about a week, which meant entering the key again. Three causes were stacked on top of each other: the value that identifies the computer was built out of information that can shift with a reboot or with the state of the network; a temporary network error during an offline check locked it immediately, with no grace period; and when several panels were open at once the stored license data could overwrite itself and break. It now uses the permanent identifier the operating system guarantees, and when the connection drops for a moment it waits instead of locking.',
        'With that repair, license data that is already stored is carried over to the new scheme automatically. Some of you who renamed your computer along the way may have to enter the key once more after updating. After that it stays put.',
        'In Round Corners, giving the four corners different radii and applying them still showed every corner at the same value until you turned on the checkbox in Effect Controls by hand. Per-corner values now apply as they are from the start.',
        'For reference: when a very large radius on one corner makes the neighboring corner look less round, that is intended behavior, not a defect. It is the rule that scales two roundings down proportionally so they do not overlap on the same edge, the same way Figma and web CSS do it. The value you typed into the slider is kept as it is.',
        'The installer came down from 14MB to 3.5MB. Large resources that were no longer in use were taken out.',
      ],
    },
  },
  {
    version: '2.3.2',
    date: '2026-08-21',
    items: {
      ko: [
        'After Effects 2022, 2023에서 플러그인을 설치해도 패널 목록에 아무것도 안 뜨던 문제를 고쳤어요. 설치 파일에 적힌 실행 환경 버전이 실제로 필요한 것보다 높아서, 그 버전의 After Effects가 플러그인을 아예 못 찾았어요. 안내한 지원 범위(2022 이상)와 어긋나 있던 부분이에요.',
        '이번 수정은 2022, 2023에서 설치가 되게 한 것이고, 그 버전에서 모든 동작을 확인한 건 아니에요. 이상한 점이 있으면 알려 주세요. 바로 손볼게요.',
      ],
      en: [
        'Fixed an empty panel list after installing on After Effects 2022 and 2023. The installer declared a higher runtime version than it actually needs, so those versions of After Effects never found the plugin at all. It was out of line with the support range we state (2022 and newer).',
        'That solves it as far as installing on 2022 and 2023 goes; it is not a full check of how everything behaves on those versions. If something looks off, tell us and we will deal with it right away.',
      ],
    },
  },
  {
    version: '2.3.1',
    date: '2026-08-21',
    items: {
      ko: [
        '패널이 로딩 표시만 계속 돌고 열리지 않던 문제를 고쳤어요. 설치된 폴더 이름 때문에 패널 화면을 그리는 프로세스가 켜지자마자 꺼지고, 다시 켜지기를 반복한 게 원인이었어요. 이번 버전을 설치하면 폴더 이름이 바뀌면서 증상이 사라져요.',
        '설치 프로그램이 정식 경로로 설치를 끝내지 못하던 문제를 고쳤어요. 지금까지 모든 버전이 이랬는데, 설치 프로그램이 자기 방식으로 대신 풀어 넣어서 겉으로는 설치된 것처럼 보였어요. 위의 폴더 이름 문제도 여기서 생겼어요.',
        '예전 폴더는 남아 있지만 더는 쓰이지 않아요. After Effects는 같은 확장을 여러 벌 찾으면 버전이 높은 쪽만 쓰기 때문에, 이번 버전을 설치하면 자동으로 정리된 것과 같아요. 디스크 공간이 아깝다면 예전 폴더를 지워도 돼요. Windows는 %APPDATA%\\Adobe\\CEP\\extensions, macOS는 ~/Library/Application Support/Adobe/CEP/extensions 안에 예전 이름으로 남아 있어요. Program Files 아래에 설치했다면 관리자 권한이 필요해요.',
      ],
      en: [
        'Fixed the panel spinning on its loading indicator and never opening. The name of the installed folder made the process that draws the panel exit the moment it started, and it restarted again every time. Installing this version changes the folder name, and the symptom goes away.',
        'The installer could not finish the install through the official path. Every version up to now was in this state, and because the installer unpacked the files its own way instead, it looked from the outside like the install had worked. The folder name problem above came from this.',
        'The old folder stays where it is but is no longer used. When After Effects finds several copies of the same extension it uses only the one with the higher version, so installing this version leaves you where you would be if it had been cleaned up. If you want the disk space back, you can delete the old folder. It sits under %APPDATA%\\Adobe\\CEP\\extensions on Windows and ~/Library/Application Support/Adobe/CEP/extensions on macOS, under the old name. If yours was installed under Program Files, deleting it needs administrator rights.',
      ],
    },
  },
  {
    version: '2.3.0',
    date: '2026-08-20',
    items: {
      ko: [
        'Round Corners가 Toolbox에 들어왔어요. 셰이프뿐 아니라 텍스트, 솔리드, 푸티지, 프리컴프 레이어에도 걸 수 있고, 네 모서리에 반경을 따로 줄 수 있어요. 적용한 뒤에도 Effect Controls에서 값을 계속 바꿀 수 있어서 다시 걸 필요가 없어요. 레이어 크기를 키우거나 줄여도 모서리 반경은 그대로예요. 지울 때는 Toolbox 버튼을 Alt를 누른 채 클릭하면 돼요.',
        'Proximity 툴 이름이 Effector로 바뀌었어요. 버튼 이름과 설명만 바뀌었고 동작은 같아요. 리그 안에서 만들어지는 널도 이름을 "이펙터 널"로 맞췄어요.',
        '패널이 검은 화면으로만 뜨던 문제에 대응했어요. 어떤 환경에서는 패널이 로딩 상태 그대로 멈추고 아무 메시지도 안 나왔어요. 이제는 그럴 때 화면에 원인을 띄워요. 원인을 없앤 게 아니라 보이게 한 거라서, 계속 문제가 생기면 그 메시지를 알려 주세요.',
        'Toolbox 툴팁이 패널 폭을 넘어가던 문제를 고쳤어요. 패널을 좁게 쓰면 설명 글이 그리드 밖으로 삐져나왔어요.',
        'Program Files 아래에 설치했을 때, 업데이트하면서 예전 버전 파일이 정리되지 않았는데도 아무 표시가 없던 문제를 고쳤어요. 그 위치는 파일을 지우려면 관리자 권한이 필요해요. 이제 실패하면 기록이 남아서 원인을 확인할 수 있어요.',
        '이펙트 프리셋 자동 복구가 일부 사용자에게만 안 되던 문제를 고쳤어요. 파일 줄바꿈 형식이 달라서, 내용이 같은데도 다른 파일로 알아본 게 원인이었어요.',
      ],
      en: [
        'Round Corners is in the Toolbox. It goes on text, solid, footage and precomp layers as well as shapes, and the four corners can each take a different radius. The values stay editable in Effect Controls after you apply it, so there is no need to run it again. The corner radius holds as you scale the layer up or down. To remove it, Alt+click the Toolbox button.',
        'The Proximity tool is now called Effector. Only the button name and its description changed, and it behaves the same. The null the rig creates was renamed to match ("effector null").',
        'Panels that opened as nothing but a black screen now show why. In some environments the panel stopped at the loading state and said nothing at all; now it prints the cause on screen. This makes the cause visible rather than removing it, so if you still see the problem, send us that message.',
        'Fixed Toolbox tooltips running past the width of the panel, which pushed the description text out past the grid when the panel was kept narrow.',
        'When installed under Program Files, an update could leave the old version files uncleaned with nothing said about it. Deleting files in that location needs administrator rights; now a failure leaves a record, so the cause can be checked.',
        'Fixed automatic effect preset repair not applying for some users. A difference in the line-ending format of the files made identical contents read as different files.',
      ],
    },
  },
  {
    version: '2.2.1',
    date: '2026-08-13',
    items: {
      ko: [
        'v2.1.0에서 업데이트한 분들의 설치 폴더에 예전 버전 스크립트 파일 61개가 그대로 남아 있었어요. 설치 과정이 파일을 덮어쓰기만 하고 지우지는 않았기 때문이에요. 동작에는 문제가 없었지만, v2.2.0에서 노린 소스 보호가 그분들에게만 적용되지 않았어요. 이제 새 버전이 처음 실행될 때 알아서 정리해요.',
        '업데이트 알림에 "변경 내용 · 수동 설치" 링크를 늘 보여 줘요. 전에는 설치가 실패했다고 뜰 때만 나와서, 정작 설치가 조용히 실패하면 이 페이지로 올 길이 없었어요.',
      ],
      en: [
        'For anyone who came up from v2.1.0, 61 script files from the old version were still sitting in the install folder. The install only overwrites files, it does not delete them. Nothing behaved badly, but the source protection v2.2.0 was aiming for was not in place for those people alone. The new version now clears them out on its first run.',
        'The update notice always shows the "What\'s new · manual install" link. It used to appear only when an install was reported as failed, which meant that when an install failed quietly there was no way to reach this page.',
      ],
    },
  },
  {
    version: '2.2.0',
    date: '2026-08-12',
    items: {
      ko: [
        'Cursor Click에 조절 항목이 생겼어요. 적용한 뒤에도 Effect Controls에서 누르는 크기, 누름·유지·복원 시간, 튕김, 클릭 횟수와 간격을 바꿀 수 있고, 리플 링에는 지속 시간과 불투명도가 따로 붙어요. 전에는 이 값들이 스크립트 안에 박혀 있어서 클릭 횟수 하나만 바꾸려 해도 툴을 다시 돌려야 했고, 그때마다 손으로 맞춰 둔 위치, 크기, 색이 날아갔어요.',
        'Cursor Click과 Click React의 시작 시각이 타임라인에 마커로 보여요. 모션이 어디서 시작하는지 눈으로 확인하고, 마커를 끌면 모션 전체가 따라와요.',
        'Typewriter로 글자가 찍히는 동안 텍스트 레이어가 좌우로 흔들리던 문제를 고쳤어요. 한글 왼쪽 정렬에서 특히 눈에 띄었고, 가운데 정렬에서는 정렬 자체가 왼쪽으로 무너졌어요.',
        'Toolbox의 키프레임 버튼 6개를 3개로 줄이고, 버튼에 숨어 있던 동작은 우클릭 메뉴로 모았어요. 메뉴 항목마다 옆에 단축키도 같이 보여 줘요.',
        '이징 복사·붙여넣기에서 값의 부호가 뒤집히거나 클립이 어긋나던 문제 3건을 고쳤어요.',
        '인앱 업데이트가 설치에 실패하고도 성공했다고 표시하던 문제를 고쳤어요. 이 수정은 다음 업데이트부터 효과가 있어요. v2.1.0에서 올라오는 경우 이번 한 번은 직접 설치해 주세요.',
      ],
      en: [
        'Cursor Click has controls. After you apply it you can change the press size, the press, hold and release times, the bounce, and the click count and interval in Effect Controls, and the ripple ring carries its own duration and opacity. These values used to be fixed inside the script, so changing the click count alone meant running the tool again. Every time you did, the position, size and color you had set by hand were lost.',
        'Cursor Click and Click React show their start time as a marker on the timeline. You can see where the motion begins, and dragging the marker brings the whole motion with it.',
        'Fixed the text layer in Typewriter shaking left and right while the characters were being typed. It was most visible with left-aligned Korean, and with center alignment the alignment itself collapsed to the left.',
        'The six keyframe buttons in the Toolbox became three, and the actions that were hidden inside the buttons are gathered into a right-click menu. The menu shows the keyboard shortcut next to each entry.',
        'Fixed three problems in easing copy and paste, among them values coming back with the sign flipped and a stored clip not lining up with the property it was pasted onto.',
        'Fixed an in-app update reporting success even when the install had failed. The fix takes effect from the next update onward, so if you are coming from v2.1.0, this one upgrade has to be installed by hand.',
      ],
    },
  },
];
