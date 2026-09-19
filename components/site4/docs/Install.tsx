'use client';
/* 설치 · 사양 8필드 + 마지막 구매 CTA.
   🔴 Docs 는 읽는 면이다 — CTA 는 **맨 끝 하나**고 중간에 뿌리지 않는다. 그리고 그 하나는
   `lib/product.ts` 의 `CHECKOUT_URL`(= 실제 결제 진입점)로 간다. 프로토는 `ae.html#price` 로
   보냈는데 그건 죽은 링크였다 — 앵커로 되돌리지 마라. */
import { useT } from '@/components/site3p/lang';
import { CHECKOUT_URL } from '@/lib/product';

const FIELDS = ['price', 'host', 'form', 'os', 'license', 'lang', 'net', 'support'] as const;

export default function Install() {
  const { t } = useT();
  return (
    <section id="install" className="sec">
      <h3 className="lab">{t('docs.install.h')}</h3>
      <div className="specs">
        {FIELDS.map((f) => (
          <div className="f" key={f}>
            <span className="k lab">{t(`docs.spec.${f}.k`)}</span>
            <span className="v">
              {t(`docs.spec.${f}.v`)}
              <span className="n">{t(`docs.spec.${f}.n`)}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="docs-cta">
        <span className="txt">{t('docs.cta.txt')}</span>
        <a className="btn-fill" href={CHECKOUT_URL} data-cur>
          {t('docs.cta.btn')} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
