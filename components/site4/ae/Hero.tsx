'use client';
/* 제품 히어로 — 워드마크 → 약속문 → 호스트·버전 → 브랜드 영상 + 양옆 원 2개 → 도장 4.
   🔴 `$49.99` 원은 **체크아웃으로 간다**(프로토는 `#price` 로 갔고, 가격 섹션엔 버튼이 없어서
   거기서 길이 끊겼다). 오른쪽 원은 **이미 산 사람**의 자리 — Docs 의 설치 안내로 간다.
   두 원 = *아직 안 샀다 → 구매* / *샀다 → 설치*. 그게 둘이 나란한 이유다.
   🔴 약속문은 락업 **아래**다(2026-09-26). 전엔 14px 링크색으로 락업 위에 떠서 페이지의 유일한
   약속이 제일 작은 글자였다. 락업 비율(브랜드 작게 / 제품 크게, §14.3)은 안 건드렸다.
   🔴 도장에 `AE 2022+` · `Windows · macOS` 를 다시 넣지 마라 — 바로 위 호스트 줄이 같은 말을 한다.

   🔴 가운데 판 = **브랜드 영상**(`Film.tsx`, 2026-10-05 오너 *"ae 페이지 센터에 들어가야할거같은데"*). WEBSITE_RENEWAL §14.6.1
   *"#1 에는 우리 브랜딩 영상"* · §14.8.1 *"영상이 나오면 이 블록만 갈아 끼운다"* 가 예약한 그 자리다 — 판 폭(760)·양옆 원 2개는 그대로.
   ⚠️ 영상 내용이 브랜드 문장이라 §14.1 ④(제품 면 브랜드 서사 0단어)와 부딪히는데, **이 자리 지정이 오너 판정이다**(문서보다 오너가 이긴다).
   구 툴 호버 시트 몽타주(`REEL` 6툴 · `Spot` · `.rotator` · `Made with one button` · 캡션)는 걷었다. 툴 시트 자체는 Docs·후킹 카드가 계속 쓴다. */
import { useT } from '@/components/site3p/lang';
import { Plate3 } from '@/components/site3p/Plate3';
import { useHref } from '@/components/site4/Shell';
import { CHECKOUT_URL, PRICE } from '@/lib/product';
import Film from './Film';

export default function Hero() {
  const { t } = useT();
  const href = useHref();
  return (
    <header className="phero">
      <h1 className="disp">
        <span className="brandpart">{t('s.brand')}</span>
        <Plate3 k="ae.hero.plugin" />
      </h1>
      <p className="promise">{t('ae.hero.promise')}</p>
      <p className="lab lc" style={{ color: 'var(--muted)' }}>{t('ae.hero.sub')}</p>

      <div className="pstage">
        <div className="side">
          <a className="circ fill" href={CHECKOUT_URL} data-cur>
            <span><b>{PRICE}</b><small>{t('ae.hero.buy.note')}</small></span>
          </a>
          <a className="undercirc" href="#specs" data-cur>{t('ae.hero.specs')}</a>
        </div>

        <figure className="demo">
          <Film />
        </figure>

        <div className="side">
          <a className="circ line" href={href('/ae/docs#install')} data-cur>
            <span><b>{t('ae.hero.install')}</b><small>{t('ae.hero.install.note')}</small></span>
          </a>
          <a className="undercirc" href="#faq" data-cur>{t('ae.hero.faq')}</a>
        </div>
      </div>

      <div className="metas">
        {['ae.meta.once', 'ae.meta.two', 'ae.meta.refund'].map((k) => (
          <span className="stamp black" key={k}><span className="dot" />{t(k)}</span>
        ))}
        <span className="stamp red"><span className="dot" />{t('ae.meta.chat')}</span>
      </div>
    </header>
  );
}
