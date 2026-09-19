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
      그 버전 당시의 사실을 현재값으로 고치지 않는다(v2.4.0 의 `도구 41개`·`패널 최대 3개`,
      그 뒤 은퇴한 `Torn Paper`). 톤 정본 = lib/copy/ae.ts 의 `en`.

   🔴 툴·패널·이펙트 이름은 로케일 무관 영문이다 — 양쪽 배열에서 같은 문자열을 쓴다. */
export type Release = { version: string; date: string; items: { ko: string[]; en: string[] } };

export const RELEASES: Release[] = [
  {
    version: '2.6.0',
    date: '2026-09-15',
    items: {
      ko: [
        'Depth Pass 가 들어왔습니다. 영상이나 사진 레이어를 고르고 실행하시면 깊이 맵을 만들어 그 레이어 아래에 깔고, Camera Lens Blur 를 걸어 줍니다. 초점을 어디에 둘지는 Focus Distance 슬라이더로 정하시거나, Auto Focus 를 켜고 Focus Point 를 화면 위 원하는 지점으로 끌어다 놓으시면 그 지점의 깊이를 매 프레임 읽어 초점을 맞춥니다. 배경 흐림을 나중에 얼마든지 다시 조절하실 수 있고, 시차(깊이에 따라 밀리는 정도)도 노브로 조절됩니다.',
        'Depth Pass 는 처음 한 번만 실행 환경을 내려받습니다. 버튼을 누르시면 진행률이 표시되고, 끝나면 다음부터는 바로 실행됩니다. 인터넷 연결이 필요한 것은 이 첫 회뿐입니다. macOS 는 Apple Silicon 에서만 동작합니다 (Intel Mac 은 지원하지 않습니다). Windows 에서는 그래픽카드를 써서 계산합니다.',
        'Pattern Lab 의 Apply to layer 에서 가로 칸 수를 512 까지 올리실 수 있습니다 (전에는 240 이었습니다). 다만 칸 수를 올리면 만들어지는 도형 수가 제곱으로 늘어나므로, 촘촘하게 쓰실 때는 먼저 작은 값으로 확인해 보시는 편이 좋습니다. 또 구운 타일 PNG 가 프로젝트 파일 옆에 저장되도록 바뀌어, 프로젝트를 옮기셔도 그림이 따라갑니다.',
        '툴박스가 정리됐습니다. 팔레트를 순서대로 배정하는 Sequential Fill 과 무작위로 배정하는 Random Fill 이 들어왔고, Parent to Null 이 돌아왔습니다. 쓰이지 않던 도구 6종은 뺐습니다. 도구 안의 숫자 조절 항목은 모두 슬라이더와 숫자 입력을 나란히 두는 방식으로 통일했습니다.',
        'Multi Fill 이 색을 배정하는 순서를 타임라인 아래에서 위로 (레이어를 만드신 순서대로) 바꿨습니다.',
        '출고 이펙트에 riso-print 가 더해져 다섯 가지가 됐습니다. 리소 인쇄 특유의 잉크 번짐과 종이 질감을 실제 텍스처로 입힙니다.',
        'Auto Marker 가 AIFF 파일도 읽습니다.',
        '패널 일곱 개의 색과 모양을 한 번 더 손봤습니다. 툴박스 패널의 크기 조절이 패널 끝에서 멈추지 않던 문제, 커스텀 패널 제목이 어긋나던 문제를 함께 고쳤습니다.',
        '업데이트 알림이 하루 늦게 뜨던 문제와, 인앱 설치가 실패했을 때 내부 오류 문구를 그대로 보여 주던 문제를 고쳤습니다. 업데이트 파일을 받는 경로도 새 서버로 옮겨 더 빠르고 안정적입니다.',
      ],
      en: [
        'Depth Pass is in. Select a video or photo layer and run it — it builds a depth map, lays it under that layer, and applies Camera Lens Blur. Set where the focus sits with the Focus Distance slider, or turn on Auto Focus and drag Focus Point to the spot you want on screen: it reads the depth under that point every frame and focuses there. The background blur stays adjustable afterwards, and parallax — how far things shift with depth — sits on a knob.',
        'Depth Pass downloads its runtime once, the first time. Press the button and you get progress; after that it runs straight away. The internet connection is only needed for that first run. On macOS it works on Apple Silicon only (Intel Macs are not supported). On Windows it computes on the graphics card.',
        'Apply to layer in Pattern Lab goes up to 512 columns (it was 240). Raising the column count grows the number of shapes it makes by the square, so when you are going dense it is better to check a small value first. Baked tile PNGs are now saved next to the project file, so the artwork travels with the project when you move it.',
        'The Toolbox has been tidied. Sequential Fill, which assigns the palette in order, and Random Fill, which assigns it at random, are in, and Parent to Null is back. Six tools that were not being used are gone. Every numeric control inside a tool now puts a slider and a number field side by side.',
        'Multi Fill assigns colours bottom to top in the timeline now — in the order you made the layers.',
        'riso-print joins the bundled effects, making five. It lays the ink bleed and paper tooth of riso printing on as real texture.',
        'Auto Marker reads AIFF files too.',
        'The colour and shape of all seven panels got another pass. Resizing the Toolbox panel not stopping at the panel edge, and the Custom panel title sitting out of line, are fixed along with it.',
        'The update notice was arriving a day late, and a failed in-app install showed the internal error text as it was. Both are fixed. The path the update files come down is now on a new server — faster and steadier.',
      ],
    },
  },
  {
    version: '2.5.0',
    date: '2026-09-07',
    items: {
      ko: [
        'Pattern Lab 이 들어왔습니다. 도트 격자·해치·체커·하프톤·트뤼셰·동심원·아스키·그레인 여덟 가지 패턴을 슬라이더로 만들고, 벡터 셰이프 또는 PNG 로 굽습니다. 스크롤·회전·플리커 움직임을 붙일 수 있는데 익스프레션이나 이펙트를 쓰지 않고 키프레임만 찍기 때문에 재생이 무거워지지 않습니다.',
        'Pattern Lab 에는 두 번째 방식이 하나 더 있습니다. 레이어를 고르고 여시면 그 레이어의 밝기가 패턴의 농도가 되는 모드로 열립니다. 밝은 곳은 빽빽하게, 어두운 곳은 성기게 찍히므로 영상이나 사진을 패턴으로 바꿀 수 있습니다. 아스키 모드에서는 어떤 글자를 쓸지 직접 적으실 수 있습니다.',
        'Shadow Caster 의 이름이 Master Shadow 로 바뀌었습니다. 접힌 서랍 안에 들어 있던 조절 항목들을 밖으로 꺼냈고, 그림자에 그라디언트를 넣을 수 있게 했습니다.',
        'Cursor Click 이 크게 늘었습니다. macOS 커서 아이콘 열 가지를 쓸 수 있고, 커서가 움직이는 동안 아이콘이 바뀝니다(예: 끌 때는 손 모양). 클릭 한 번이 아니라 여러 지점을 잇는 경로를 만들 수 있고, 각 지점의 위치는 이미 있는 레이어에서 집어올 수 있습니다. 클릭 리플과 도착 지점의 튕김도 조절됩니다.',
        '라이브러리의 모션 프리셋이 등장과 퇴장으로 나뉘었습니다. 전에는 하나를 고르면 등장과 퇴장이 같이 붙었는데, 이제 따로 고르고 각각의 타이밍을 마커로 잡습니다. 이동 거리는 적용한 뒤에도 Effect Controls 에서 계속 바꾸실 수 있습니다. 텍스트 프리셋도 같은 방식입니다.',
        '라이브러리 카드에 마우스를 올렸을 때 보이는 미리보기가 실제로 만들어지는 것과 달랐던 문제를 고쳤습니다. 곡선만 바뀌고 숫자는 안 바뀌던 것, 퇴장이 등장의 길을 그대로 되짚던 것, 사라진 뒤에도 잔상이 남던 것을 함께 고쳤습니다.',
        '커스텀 툴박스 패널이 3개에서 1개로 줄었습니다. 대신 그 하나 안에서 저장해 두신 배치를 드롭다운으로 골라 쓰십니다. 저장하신 배치는 그대로 남아 있고 고르는 방식만 바뀐 것이라, 만들어 두신 것을 다시 만드실 필요는 없습니다.',
        'Fit Precomps 가 한 단계 아래의 프리컴프에서 멈추고 더 안쪽까지 들어가지 않던 문제를 고쳤습니다. 참고로 Trim Layers to Comp 는 의도적으로 현재 컴프만 자릅니다 — 안쪽까지 자르시려면 After Effects 의 Alt+[ · Alt+] 를 쓰시는 편이 낫습니다.',
        '툴박스 셀 크기를 숫자로 입력할 때 두 값 말고는 입력이 안 되던 문제와, 큰 타일에 이름이 표시되지 않던 문제를 고쳤습니다.',
      ],
      en: [
        'Pattern Lab is in. Dots, hatch, checker, halftone, truchet, concentric, ASCII and grain — eight patterns built on sliders and baked to vector shapes or PNG. You can add scroll, rotate and flicker motion, and it writes keyframes only, no expressions and no effects, so playback does not get heavy.',
        'Pattern Lab has a second way in. Select a layer before you open it and it opens in the mode where that layer\'s luminance becomes the density of the pattern. Bright areas come out dense and dark areas sparse, so a video or a photo turns into a pattern. In ASCII mode you type the characters it uses yourself.',
        'Shadow Caster is now called Master Shadow. The controls that were folded away in a drawer are out in the open, and the shadow can take a gradient.',
        'Cursor Click grew a lot. Ten macOS cursor icons are available, and the icon changes as the cursor moves (a hand while dragging, for instance). Instead of a single click you can build a path through several points, and each point can take its position from a layer that is already there. The click ripple and the bounce at the arrival point are adjustable too.',
        'Motion presets in the Library are split into in and out. Picking one used to attach both; now you pick them separately and set the timing of each with a marker. The travel distance stays editable in Effect Controls after you apply it. Text presets work the same way.',
        'The preview you see when you hover a Library card did not match what actually got built. Fixed, together with three things underneath it: the curve changing while the numbers did not, the out retracing the path of the in exactly, and a trail left behind after the layer was gone.',
        'Custom Toolbox panels went from three to one. Inside that one you pick a saved layout from a dropdown instead. The layouts you saved are still there and only the way you choose them changed, so there is nothing to build again.',
        'Fit Precomps stopped at one level of precomp down and did not go any deeper. That is fixed. Note that Trim Layers to Comp trims the current comp only, deliberately — to trim further in, the Alt+[ and Alt+] of After Effects are the better route.',
        'Typing a Toolbox cell size as a number took only two values, and large tiles showed no name. Both are fixed.',
      ],
    },
  },
  {
    version: '2.4.0',
    date: '2026-08-31',
    items: {
      ko: [
        '제품 이름이 You Name It 으로 바뀌었습니다. After Effects 의 창 메뉴에 뜨는 이름도 함께 바뀌므로, 업데이트 후 예전 이름으로 찾으시면 안 보일 수 있습니다. 창 메뉴에서 You Name It 으로 시작하는 항목을 찾아 주세요. 설치 위치와 저장된 데이터는 그대로이며, 라이선스도 다시 입력하실 필요 없습니다.',
        '패널 전체의 색과 모양을 새로 했습니다. 기존의 크림색 계열이 파랑 단색 팔레트로 바뀌었고, 버튼은 평소에 면을 채우지 않고 누르는 순간에만 반전됩니다. 익스프레션 에디터의 구문 색상도 같은 팔레트로 정리했습니다.',
        '툴박스를 직접 배치하실 수 있게 됐습니다. 버튼을 원하는 자리로 끌어다 놓고 크기를 조절할 수 있으며, 겹치면 아래 버튼이 밀려납니다. 빈 칸은 그대로 여백으로 남습니다.',
        '툴박스 패널을 최대 3개까지 따로 띄울 수 있습니다. 패널마다 다른 배치를 저장할 수 있고, 배치를 파일로 내보내고 가져올 수 있습니다.',
        '자주 쓰는 설정을 버튼으로 굳힐 수 있습니다. 도구를 실행할 때 넣은 값까지 함께 저장되므로, 다음부터는 한 번 누르면 같은 설정으로 실행됩니다. 라이브러리의 그라디언트·텍스트 프리셋·이징 커브·익스프레션·이펙트도 툴박스 패널에 담을 수 있습니다.',
        '새 도구 3개가 들어왔습니다. Auto Marker 는 오디오의 박자를 읽어 마커를 찍습니다. Start Marker 는 작업 시작점을 표시합니다. Torn Paper 는 찢어진 종이 가장자리와 접힌 자국을 만듭니다.',
        '도구 41개에 미리보기 그림이 붙었습니다. 컴프 화면에 결과가 바로 드러나지 않는 도구들도 무엇을 하는 도구인지 버튼 위에서 확인하실 수 있습니다.',
        '설치 파일이 3.5MB 에서 5.1MB 로 늘었습니다. 위의 미리보기 그림들이 들어간 만큼입니다.',
      ],
      en: [
        'The product is now called You Name It. The name in the After Effects Window menu changed with it, so after updating you may not find it under the old name. Look for the entries that start with You Name It. The install location and your saved data are unchanged, and you do not need to enter your license again.',
        'The colour and shape of every panel was redone. The old cream tones became a single blue palette, and buttons no longer carry a filled face — they invert only at the moment you press them. The syntax colours in the expression editor were brought onto the same palette.',
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
        '일주일쯤 지나면 라이선스가 풀려서 키를 다시 입력해야 하던 문제를 고쳤습니다. 컴퓨터를 식별하는 값이 재부팅이나 네트워크 상태에 따라 흔들릴 수 있는 정보로 만들어져 있었고, 오프라인 확인 중에 일시적인 통신 오류가 나면 유예 없이 바로 잠기던 것, 여러 패널이 동시에 켜질 때 저장된 인증 정보가 서로 덮어쓰며 깨질 수 있던 것까지 세 가지 원인이 겹쳐 있었습니다. 이제 운영체제가 보증하는 영구 식별자를 쓰고, 통신이 잠시 안 되는 경우는 잠그지 않고 기다립니다.',
        '위 수리로 기존에 저장된 인증 정보는 새 방식으로 자동 이전됩니다. 다만 그동안 컴퓨터 이름을 바꾸신 적이 있는 일부 분들은 업데이트 후 딱 한 번 키를 다시 입력하시게 될 수 있습니다. 그 뒤로는 더 이상 풀리지 않습니다.',
        '모서리 둥글리기에서 네 모서리에 서로 다른 반지름을 주고 적용해도, Effect Controls 의 체크박스를 손으로 켜기 전까지는 모든 모서리가 같은 값으로 보이던 문제를 고쳤습니다. 이제 모서리별 값을 주시면 처음부터 다르게 적용됩니다.',
        '참고로, 한 모서리의 반지름을 아주 크게 주면 이웃 모서리의 둥글기가 줄어 보이는 것은 결함이 아니라 의도된 동작입니다. 두 모서리의 라운드가 한 변 위에서 겹치지 않도록 비례해서 줄이는 규칙으로, Figma 나 웹 CSS 와 같은 방식입니다. 슬라이더에 입력하신 값 자체는 그대로 보존됩니다.',
        '설치 파일이 14MB 에서 3.5MB 로 가벼워졌습니다. 쓰이지 않게 된 대용량 리소스를 내려보냈습니다.',
      ],
      en: [
        'After about a week the license came loose and the key had to be entered again. That is fixed. Three causes were stacked on top of each other: the value that identifies the machine was built out of information that can shift with a reboot or with the state of the network; a temporary network error during an offline check locked it immediately, with no grace period; and when several panels were open at once the stored authentication could overwrite itself and break. It now uses the permanent identifier the operating system guarantees, and when the connection drops for a moment it waits instead of locking.',
        'With that repair, authentication that is already stored is carried over to the new scheme automatically. Some of you who renamed your computer along the way may have to enter the key once more after updating. After that it stays put.',
        'In Round Corners, giving the four corners different radii and applying them still showed every corner at the same value until you turned on the checkbox in Effect Controls by hand. That is fixed — per-corner values now apply as they are from the start.',
        'For reference: when a very large radius on one corner makes the neighbouring corner look less round, that is intended behaviour, not a defect. It is the rule that scales two roundings down proportionally so they do not overlap on the same edge — the same way Figma and web CSS do it. The value you typed into the slider is kept as it is.',
        'The installer came down from 14MB to 3.5MB. Large resources that were no longer in use were taken out.',
      ],
    },
  },
  {
    version: '2.3.2',
    date: '2026-08-21',
    items: {
      ko: [
        'After Effects 2022 · 2023 을 쓰시는 분들이 플러그인을 설치해도 패널 목록에 아무것도 나타나지 않던 문제를 고쳤습니다. 설치 파일이 요구하는 실행 환경 버전이 실제로 필요한 것보다 높게 적혀 있어서, 해당 버전의 After Effects 가 플러그인을 아예 발견하지 못했습니다. 안내해 드린 지원 범위(2022 이상)와 어긋나 있던 부분입니다.',
        '위 문제는 2022 · 2023 에서 설치가 되도록 푼 것이고, 그 버전들에서의 동작을 전부 확인한 것은 아닙니다. 이상한 점이 있으시면 알려주시면 바로 대응하겠습니다.',
      ],
      en: [
        'On After Effects 2022 and 2023, installing the plugin left nothing in the panel list. That is fixed. The installer declared a higher runtime version than it actually needs, so those versions of After Effects never found the plugin at all. It was out of line with the support range we state (2022 and newer).',
        'That solves it as far as installing on 2022 and 2023 goes; it is not a full check of how everything behaves on those versions. If something looks off, tell us and we will deal with it right away.',
      ],
    },
  },
  {
    version: '2.3.1',
    date: '2026-08-21',
    items: {
      ko: [
        '패널이 로딩 표시만 계속 돌고 열리지 않던 문제를 고쳤습니다. 설치된 폴더 이름 때문에 패널 화면을 그리는 프로세스가 시작하자마자 종료되고, 그때마다 다시 시작되기를 반복하던 것이 원인이었습니다. 이번 버전을 설치하시면 폴더 이름이 바뀌면서 증상이 사라집니다.',
        '설치 프로그램이 정식 경로로 설치를 끝내지 못하던 문제를 고쳤습니다. 지금까지의 모든 버전이 이 상태였고, 설치 프로그램이 자체 방식으로 대신 풀어 넣었기 때문에 겉으로는 설치가 되는 것처럼 보였습니다. 위의 폴더 이름 문제도 여기서 비롯된 것입니다.',
        '예전 폴더는 그대로 남지만 더 이상 사용되지 않습니다. After Effects 가 같은 확장을 여러 벌 발견하면 버전이 높은 쪽만 사용하기 때문에, 이번 버전을 설치하시면 자동으로 정리된 것과 같은 상태가 됩니다. 디스크 공간이 아까우시면 예전 폴더를 지우셔도 됩니다 — Windows 는 %APPDATA%\\Adobe\\CEP\\extensions, macOS 는 ~/Library/Application Support/Adobe/CEP/extensions 안에 예전 이름으로 남아 있습니다. Program Files 아래에 깔리신 경우에는 관리자 권한이 필요합니다.',
      ],
      en: [
        'The panel kept spinning on its loading indicator and never opened. That is fixed. The name of the installed folder made the process that draws the panel exit the moment it started, and it restarted again every time. Installing this version changes the folder name, and the symptom goes away.',
        'The installer could not finish the install through the official path. Every version up to now was in this state, and because the installer unpacked the files its own way instead, it looked from the outside like the install had worked. The folder name problem above came from this.',
        'The old folder stays where it is but is no longer used. When After Effects finds several copies of the same extension it uses only the one with the higher version, so installing this version leaves you where you would be if it had been cleaned up. If you want the disk space back, you can delete the old folder — it sits under %APPDATA%\\Adobe\\CEP\\extensions on Windows and ~/Library/Application Support/Adobe/CEP/extensions on macOS, under the old name. If yours was installed under Program Files, deleting it needs administrator rights.',
      ],
    },
  },
  {
    version: '2.3.0',
    date: '2026-08-20',
    items: {
      ko: [
        '모서리 둥글리기가 툴박스에 들어왔습니다. 셰이프뿐 아니라 텍스트·솔리드·푸티지·프리컴프 레이어에도 걸 수 있고, 네 모서리에 서로 다른 반지름을 줄 수 있습니다. 적용한 뒤에도 Effect Controls 에서 값을 계속 바꿀 수 있어서 다시 걸 필요가 없습니다. 레이어 크기를 키우거나 줄여도 모서리 반지름은 그대로 유지됩니다. 지우실 때는 툴박스 버튼을 Alt 누른 채 클릭하시면 됩니다.',
        'Proximity 툴의 이름이 Effector 로 바뀌었습니다. 버튼 이름과 설명만 바뀐 것이고 동작은 같습니다. 리그 안에서 만들어지는 널도 "이펙터 널" 로 이름을 맞췄습니다.',
        '패널이 검은 화면으로만 뜨던 문제에 대응했습니다. 어떤 환경에서는 패널이 로딩 상태 그대로 멈추고 아무 메시지도 나오지 않았습니다. 이제 그런 경우 화면에 원인을 표시합니다. 원인 자체를 없앤 것이 아니라 보이게 만든 것이라, 여전히 문제가 보이시면 그 메시지를 알려주시면 됩니다.',
        '툴박스 툴팁이 패널 가로 폭을 넘어가던 문제를 고쳤습니다. 패널을 좁게 쓰실 때 설명 글이 그리드 밖으로 삐져나왔습니다.',
        'Program Files 아래에 설치하신 경우, 업데이트할 때 예전 버전 파일이 정리되지 않고도 아무 표시가 없던 문제를 고쳤습니다. 그 위치는 파일 삭제에 관리자 권한이 필요합니다. 이제 실패하면 기록이 남아 원인을 확인할 수 있습니다.',
        '이펙트 프리셋 자동 복구가 일부 사용자에게만 적용되지 않던 문제를 고쳤습니다. 파일 줄바꿈 형식 차이 때문에 같은 내용인데도 다른 파일로 인식되던 것이 원인이었습니다.',
      ],
      en: [
        'Round Corners is in the Toolbox. It goes on text, solid, footage and precomp layers as well as shapes, and the four corners can each take a different radius. The values stay editable in Effect Controls after you apply it, so there is no need to run it again. The corner radius holds as you scale the layer up or down. To remove it, Alt+click the Toolbox button.',
        'The Proximity tool is now called Effector. Only the button name and its description changed — it behaves the same. The null the rig creates was renamed to match ("effector null").',
        'Something was done about panels that opened as nothing but a black screen. In some environments the panel stopped at the loading state and said nothing at all. Now it prints the cause on screen when that happens. This makes the cause visible rather than removing it, so if you still see the problem, send us that message.',
        'Toolbox tooltips ran past the width of the panel. That is fixed — with the panel kept narrow, the description text stuck out past the grid.',
        'When installed under Program Files, an update could leave the old version files uncleaned with nothing said about it. That is fixed. Deleting files in that location needs administrator rights; now a failure leaves a record, so the cause can be checked.',
        'Automatic effect preset repair was not applying for some users. That is fixed. A difference in the line-ending format of the files made identical contents read as different files.',
      ],
    },
  },
  {
    version: '2.2.1',
    date: '2026-08-13',
    items: {
      ko: [
        'v2.1.0 에서 올라오신 분들의 설치 폴더에 예전 버전의 스크립트 파일 61개가 그대로 남아 있었습니다. 설치 과정이 파일을 덮어쓰기만 하고 지우지는 않기 때문입니다. 동작에는 문제가 없었지만 v2.2.0 이 목표했던 소스 보호가 그분들에게만 적용되지 않은 상태였습니다. 이제 새 버전이 처음 실행될 때 알아서 정리합니다.',
        '업데이트 알림에 "변경 내용 · 수동 설치" 링크를 항상 표시합니다. 전에는 설치가 실패했다고 표시될 때만 나타나서, 정작 설치가 조용히 실패했을 때는 이 페이지로 올 방법이 없었습니다.',
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
        '커서 클릭에 조절 항목이 생겼습니다. 적용한 뒤에도 Effect Controls 에서 누르는 크기, 누름·유지·복원 시간, 튕김, 클릭 횟수와 간격을 바꿀 수 있고, 리플 링에는 지속 시간과 투명도가 따로 붙습니다. 전에는 이 값들이 스크립트 안에 박혀 있어서 클릭 횟수 하나를 바꾸려 해도 툴을 다시 돌려야 했고, 그때마다 손으로 맞춰둔 위치·크기·색이 날아갔습니다.',
        '커서 클릭과 클릭 리액트의 시작 시각이 타임라인에 마커로 보입니다. 모션이 어디서 시작하는지 눈으로 확인할 수 있고, 마커를 끌면 모션 전체가 따라옵니다.',
        '타입라이터에서 글자가 찍히는 동안 텍스트 레이어가 좌우로 흔들리던 문제를 고쳤습니다. 한글 좌정렬에서 특히 눈에 띄었고, 가운데 정렬에서는 정렬 자체가 왼쪽으로 무너졌습니다.',
        '툴박스의 키프레임 버튼 6개를 3개로 줄이고, 버튼에 숨어 있던 동작들은 우클릭 메뉴로 모았습니다. 메뉴가 각 항목 옆에 단축키를 같이 알려줍니다.',
        '이징 복사·붙여넣기에서 값의 부호가 뒤집히거나 클립이 어긋나던 문제 3건을 고쳤습니다.',
        '인앱 업데이트가 설치에 실패하고도 성공했다고 표시하던 문제를 고쳤습니다. 이 수정은 다음 업데이트부터 효과가 있습니다 — v2.1.0 에서 올라오시는 경우 이번 한 번은 손으로 설치하셔야 합니다.',
      ],
      en: [
        'Cursor Click has controls. After you apply it you can change the press size, the press, hold and release times, the bounce, and the click count and interval in Effect Controls, and the ripple ring carries its own duration and opacity. These values used to be fixed inside the script, so changing the click count alone meant running the tool again — and every time you did, the position, size and colour you had set by hand were lost.',
        'Cursor Click and Click React show their start time as a marker on the timeline. You can see where the motion begins, and dragging the marker brings the whole motion with it.',
        'In Typewriter, the text layer shook left and right while the characters were being typed. That is fixed. It was most visible with left-aligned Korean, and with centre alignment the alignment itself collapsed to the left.',
        'The six keyframe buttons in the Toolbox became three, and the actions that were hidden inside the buttons are gathered into a right-click menu. The menu shows the keyboard shortcut next to each entry.',
        'Three problems in easing copy and paste are fixed — values coming back with the sign flipped, and a stored clip not lining up with the property it was pasted onto.',
        'An in-app update reported success even when the install had failed. That is fixed, and the fix takes effect from the next update onward — if you are coming from v2.1.0, this one upgrade has to be installed by hand.',
      ],
    },
  },
];
