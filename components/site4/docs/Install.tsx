'use client';
/* 05 — 설치 · 사양, 그리고 이 페이지의 CTA 하나.
   🔴 앵커 `#install` 은 **들어오는 링크의 목적지**다 — `/ae` 히어로 원(`이미 사셨나요? · 설치 3단계`) ·
   FAQ · 사양표 · 푸터 · (Polar 결제 뒤 이동, 오너 설정). 이름을 바꾸면 그 약속이 전부 죽는다.
   전에는 이름만 Install 이고 **순서가 0줄**이었다(사양 8필드뿐) — 구매 직후 첫 질문에 답이 없었다.

   순서: 3단계 → 메뉴 칩(패널 이름 7개 + 접두어 한 줄) → 업데이트 · 제거 · 안 될 때
         → [접힘: 수동 설치 · 파일 위치] → 사양 8필드 → CTA.
   사실 정본 = 플러그인 `donys/docs/VOICE_AND_TERMS.md` §4 · `INSTALL_GUIDE.md`(방법 2 · 안 될 때).
   🔴 메뉴는 **하위 메뉴가 아니다** — `You Name It - Toolbox` 같은 항목 7개가 `Extensions` 바로 밑에 나란히 선다.
   칩은 패널 이름만 찍고(§16-4) 접두어는 밑 한 줄이 말한다. 목록 = `DOCS_PANELS`(= 출고 태그 manifest 의 `<Menu>`).

   🔴 경로는 **접힘 하나 안에만** 있다(§16-3, 2026-09-28 오너 — `donys` 가 덜 보이게). 세 단계는 펼친 채다.
   `com.donys.plugin.cep` · `donys` 데이터 폴더 · `donys-update.log` 는 **출고본에 컴파일된 값**이라
   글자를 바꾸면 안내가 거짓이 된다(REBRAND §10.8 R8 신원 키). 값 = 아래 `LOCS`, 정본 = INSTALL_GUIDE 의 같은 표.
   제거·안 될 때 문장은 경로를 적지 않고 "아래" 를 가리킨다 — 그래서 접힘은 그 둘보다 **뒤**에 온다.

   🔴 CTA 는 **맨 끝 하나**고 중간에 뿌리지 않는다. 그리고 그 하나는 `lib/product.ts` 의 `CHECKOUT_URL`
   (= 실제 결제 진입점)로 간다. 프로토는 `ae.html#price` 로 보냈는데 그건 죽은 링크였다 — 앵커로 되돌리지 마라.
   라벨은 사이트 공통 `s.buy.price`(`Buy — $49.99`) — 같은 행동 = 같은 라벨(VOICE §5-3).
   버튼 밑 한 줄(`docs.cta.quip`)은 §16-17 오너 확정 문구다 — 버튼이 아니다(버튼 수 1 유지). */
import { useT } from '@/components/site3p/lang';
import { useHref } from '@/components/site4/Shell';
import { CHECKOUT_URL, PORTAL_URL } from '@/lib/product';
import { DOCS_PANELS } from '@/lib/docsData';
import SecHead from './SecHead';

const FIELDS = ['price', 'host', 'form', 'os', 'license', 'lang', 'net', 'support'] as const;
const STEPS = [1, 2, 3] as const;
/* 단계별 화면 — 찍을 수 있는 것만 있다(오너 2026-09-28: 접힌 채, 누르면 열림 · 빈 자리표시 없음).
   3 = Support 패널 활성화 화면(출고 태그 패널을 하네스로 띄워 찍음 · 키는 자리표시 XXXXX-…, 진짜 키 아님 ·
   다시 찍기 = 플러그인 리포 `tools/promo/panelClips` `shot support-activate`). [파일, 가로, 세로]
   1(구매 메일)·AE 메뉴는 오너가 찍는다 — AE 메뉴를 자동으로 여는 건 금지다. 2(ZXP Installer 창)는 이 맥에
   화면 기록 권한이 없어 창 내용이 비어 찍혔다(2026-09-28) — 권한이 생기면 같은 자리에 한 줄 더한다. */
const SHOTS: Partial<Record<(typeof STEPS)[number], readonly [string, number, number]>> = {
  3: ['support-activate', 840, 532],
};
const HOWTO = ['upd', 'rm'] as const;
/* [사전 키, Windows, macOS] — INSTALL_GUIDE.md "설치 앱 없이" 표 · "지우기" · "안 될 때" 와 글자까지 같아야 한다. */
const LOCS = [
  ['plugin', '%APPDATA%\\Adobe\\CEP\\extensions\\com.donys.plugin.cep', '~/Library/Application Support/Adobe/CEP/extensions/com.donys.plugin.cep'],
  ['data', '%LOCALAPPDATA%\\donys', '~/Library/Application Support/donys'],
  ['log', '%TEMP%\\donys-update.log', '$TMPDIR/donys-update.log'],
] as const;

export default function Install() {
  const { t, list, lang } = useT();
  const href = useHref();
  /* 사전의 자리표시자 — 숫자·주소는 여기서 채운다(사전에 박으면 낡는다). */
  const fill = (s: string) => s
    .split('{portal}').join(PORTAL_URL)
    .split('{notes}').join(href('/update'))
    .split('{panels}').join(String(DOCS_PANELS.length))
    .split('{others}').join(String(DOCS_PANELS.length - 1));
  const html = (k: string) => ({ __html: fill(t(k)) });
  return (
    <section id="install" className="sec" data-plate="05" data-name="docs.nav.install">
      <SecHead no="05" stone={5} k="docs.install.h" tag="docs.install.tag" />

      <ol className="steps">
        {STEPS.map((n) => {
          const shot = SHOTS[n];
          return (
            <li key={n}>
              <h4>{t(`docs.step${n}.t`)}</h4>
              <p dangerouslySetInnerHTML={html(`docs.step${n}.d`)} />
              {shot ? (
                <details className="step-shot">
                  <summary data-cur>{t('docs.step.shot')} <span className="pm" aria-hidden="true">+</span></summary>
                  <img src={`/riso/install/${shot[0]}.${lang}.webp`} alt={t(`docs.step${n}.alt`)}
                    width={shot[1]} height={shot[2]} loading="lazy" decoding="async" />
                </details>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="menu-list">
        {t('docs.install.menu')}{' '}
        {DOCS_PANELS.map((p, i) => (
          <span key={p.key}>{i ? ' · ' : ''}<code>{p.name}</code></span>
        ))}
      </p>
      <p className="menu-note" dangerouslySetInnerHTML={html('docs.install.prefix')} />

      <div className="howto">
        {HOWTO.map((k) => (
          <div key={k}>
            <h4>{t(`docs.${k}.h`)}</h4>
            <p dangerouslySetInnerHTML={html(`docs.${k}.d`)} />
          </div>
        ))}
        <div>
          <h4>{t('docs.fix.h')}</h4>
          <ul>{list('docs.fix.list').map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: s }} />)}</ul>
          <p dangerouslySetInnerHTML={html('docs.fix.mail')} />
        </div>
      </div>

      <details className="byhand">
        <summary data-cur>
          <span className="h">{t('docs.hand.h')}</span>
          <span className="pm" aria-hidden="true">+</span>
        </summary>
        <p className="byhand-d" dangerouslySetInnerHTML={html('docs.hand.d')} />
        <div className="locs">
          {LOCS.map(([k, win, mac]) => (
            <div key={k}>
              <h5>{t(`docs.loc.${k}`)}</h5>
              <dl className="paths">
                <dt>Windows</dt><dd><code>{win}</code></dd>
                <dt>macOS</dt><dd><code>{mac}</code></dd>
              </dl>
            </div>
          ))}
        </div>
      </details>

      <h3 className="lab spec-h">{t('docs.spec.h')}</h3>
      <div className="specs">
        {FIELDS.map((f) => (
          <div className="f" key={f}>
            <span className="k lab">{t(`docs.spec.${f}.k`)}</span>
            <span className="v">
              <span dangerouslySetInnerHTML={html(`docs.spec.${f}.v`)} />
              <span className="n" dangerouslySetInnerHTML={html(`docs.spec.${f}.n`)} />
            </span>
          </div>
        ))}
      </div>

      <div className="docs-cta">
        <span className="txt">
          {t('docs.cta.txt')}{' '}
          <a className="faq-link" href={href('/ae#faq')} data-cur>{t('docs.cta.faq')}</a>
        </span>
        <span className="buy-stack">
          <a className="btn-fill" href={CHECKOUT_URL} data-cur>{t('s.buy.price')}</a>
          <span className="quip">{t('docs.cta.quip')}</span>
        </span>
      </div>
    </section>
  );
}
