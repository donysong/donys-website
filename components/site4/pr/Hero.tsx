'use client';
/* `/pr` 표지 — 워드마크 → 약속문 → 호스트·버전 → 원 두 개 → 도장. `/ae` 히어로(`ae/Hero.tsx`)와 같은 어휘다.
   두 원 = *아직 안 받았다 → 무료판*(외곽선) / *산다 → Pro*(채움 — 🔴 채움은 구매에만, REBRAND §9.9 ③). 원문 `pr-page.full.md` 1절 주석.
   원 밑 줄: 구매 쪽 = 사양으로 · 무료 쪽 = 이미 받은 사람의 설치 안내로(`/ae` 의 *샀다 → 설치* 원 자리).
   🔴 가운데 판(데모 영상)은 아직 없다 — 5분 데모는 동결 뒤(10/28~29) 출고본으로 찍는다(PR repo `gtm/video/demo-5min.md`).
      나오면 `/ae` 처럼 `.pstage` 가운데에 `<figure className="demo">` 를 넣고 `pr-nodemo` 를 뗀다. 판 B 에선 Pro 화면을 싣지 않는다.
   얼리버드 동안 원의 숫자 = 얼리버드 가격 + "~까지" 한 줄, 끝나면 정가 + "한 번 사면 계속"(브라우저가 지금 시각으로 다시 정한다, `state.tsx`). */
import { Html, useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { PR, PR_MODE } from '@/lib/product';
import { prClaimable } from '@/lib/pr';
import { Checkout, usePr } from './state';

export default function Hero() {
  const { t } = useT();
  const { early } = usePr();
  const pre = PR_MODE === 'preorder';
  const amount = early ? PR.earlyPrice : PR.price;
  /* 판 B 의 원 밑 한 줄 = "키는 지금, Pro 기능은 업데이트로"(사전예약이라는 사실이 원 안에서 읽혀야 한다).
     가격이 Pro 가 열릴 때까지 그대로라는 말은 가격 판(`pr.price.early`)이 한다. */
  const note = pre ? t('pr.hero.buy.note') : early ? t('pr.hero.buy.early.note') : t('pr.hero.buy.note');
  const stamps = ['pr.meta.once', 'pr.meta.two', 'pr.meta.refund'];
  return (
    <header className="phero" data-pr-mode={PR_MODE}>
      <h1 className="disp">
        <span className="brandpart">{t('s.brand')}</span>
        <Plate3 k="pr.hero.plugin" />
      </h1>
      <Html k="pr.hero.promise" as="p" className="promise" />
      <p className="lab lc" style={{ color: 'var(--muted)' }}>{t('pr.hero.sub')}</p>

      <div className="pstage pr-nodemo">
        <div className="side">
          <Checkout kind="pro" className="circ fill">
            <span><b>{amount}</b><small>{note}</small></span>
          </Checkout>
          <a className="undercirc" href="#specs" data-cur>{t('pr.hero.specs')}</a>
        </div>
        <div className="side">
          <Checkout kind="free" className="circ line">
            <span><b>{t('pr.hero.free')}</b><small>{t('pr.hero.free.note')}</small></span>
          </Checkout>
          <a className="undercirc" href="#install" data-cur>{t('pr.hero.install')} {t('pr.hero.install.note')} →</a>
        </div>
      </div>

      <div className="metas">
        {stamps.map((k) => (
          <span className="stamp black" key={k}><span className="dot" />{t(k)}</span>
        ))}
        {/* Chat 이 이 판에 들어 있을 때만 — 판 B 에선 Chat 이 아직 안 열렸다 */}
        {prClaimable('chat') ? <span className="stamp red"><span className="dot" />{t('pr.meta.chat')}</span> : null}
      </div>
    </header>
  );
}
