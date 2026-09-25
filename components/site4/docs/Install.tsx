'use client';
/* 05 — 설치 · 사양, 그리고 이 페이지의 CTA 하나.
   🔴 앵커 `#install` 은 **들어오는 링크의 목적지**다 — `/ae` 히어로 원(`이미 사셨나요? · 설치 3단계`) ·
   FAQ · 사양표 · 푸터 · (Polar 결제 뒤 이동, 오너 설정). 이름을 바꾸면 그 약속이 전부 죽는다.
   전에는 이름만 Install 이고 **순서가 0줄**이었다(사양 8필드뿐) — 구매 직후 첫 질문에 답이 없었다.

   순서: 3단계 → 메뉴 항목(평면 7개) → 업데이트 · 제거 · 수동 설치 · 안 될 때 → 사양 8필드 → CTA.
   사실 정본 = 플러그인 `donys/docs/VOICE_AND_TERMS.md` §4 · `INSTALL_GUIDE.md`(방법 2 · 안 될 때).
   🔴 메뉴는 **하위 메뉴가 아니다** — `You Name It - Toolbox` 같은 항목 7개가 `Extensions` 바로 밑에 나란히 선다.
   그래서 목록은 `DOCS_PANELS`(= 출고 태그 manifest 의 `<Menu>`)에서 그대로 찍는다.

   🔴 CTA 는 **맨 끝 하나**고 중간에 뿌리지 않는다. 그리고 그 하나는 `lib/product.ts` 의 `CHECKOUT_URL`
   (= 실제 결제 진입점)로 간다. 프로토는 `ae.html#price` 로 보냈는데 그건 죽은 링크였다 — 앵커로 되돌리지 마라.
   라벨은 사이트 공통 `s.buy.price`(`Buy — $49.99`) — 같은 행동 = 같은 라벨(VOICE §5-3). */
import { useT } from '@/components/site3p/lang';
import { useHref } from '@/components/site4/Shell';
import { CHECKOUT_URL, PORTAL_URL } from '@/lib/product';
import { DOCS_PANELS } from '@/lib/docsData';
import SecHead from './SecHead';

const FIELDS = ['price', 'host', 'form', 'os', 'license', 'lang', 'net', 'support'] as const;
const STEPS = [1, 2, 3] as const;
const HOWTO = ['upd', 'rm', 'hand'] as const;

export default function Install() {
  const { t, list } = useT();
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
        {STEPS.map((n) => (
          <li key={n}>
            <h4>{t(`docs.step${n}.t`)}</h4>
            <p dangerouslySetInnerHTML={html(`docs.step${n}.d`)} />
          </li>
        ))}
      </ol>
      <p className="menu-list">
        {t('docs.install.menu')}{' '}
        {DOCS_PANELS.map((p, i) => (
          <span key={p.key}>{i ? ' · ' : ''}<code>You Name It - {p.name}</code></span>
        ))}
      </p>

      <div className="howto">
        {HOWTO.map((k) => (
          <div key={k}>
            <h4>{t(`docs.${k}.h`)}</h4>
            <p dangerouslySetInnerHTML={html(`docs.${k}.d`)} />
            {k === 'hand' ? (
              <dl className="paths">
                <dt>Windows</dt><dd><code>%APPDATA%\Adobe\CEP\extensions\com.donys.plugin.cep</code></dd>
                <dt>macOS</dt><dd><code>~/Library/Application Support/Adobe/CEP/extensions/com.donys.plugin.cep</code></dd>
              </dl>
            ) : null}
          </div>
        ))}
        <div>
          <h4>{t('docs.fix.h')}</h4>
          <ul>{list('docs.fix.list').map((s, i) => <li key={i} dangerouslySetInnerHTML={{ __html: s }} />)}</ul>
          <p dangerouslySetInnerHTML={html('docs.fix.mail')} />
        </div>
      </div>

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
        <a className="btn-fill" href={CHECKOUT_URL} data-cur>{t('s.buy.price')}</a>
      </div>
    </section>
  );
}
