'use client';
/* 사양 8필드 — 마지막에 온다. 판 번호를 안 갖는다(프로토 동일). */
import { useT } from '@/components/site3p/lang';

const FIELDS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Specs() {
  const { t } = useT();
  return (
    <section id="specs">
      <div className="sec" style={{ paddingTop: 0 }}>
        <h3 className="lab" style={{ marginBottom: 18, color: 'var(--typeink)' }}>{t('ae.spec.h')}</h3>
        <div className="specs">
          {FIELDS.map((n) => (
            <div className="f" key={n}>
              <span className="k lab">{t(`ae.sp${n}.k`)}</span>
              <span className="v">{t(`ae.sp${n}.v`)}<span className="n">{t(`ae.sp${n}.n`)}</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
