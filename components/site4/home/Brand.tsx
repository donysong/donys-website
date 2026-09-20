'use client';
/* 02 우리는 무엇인가 — 🔴 여기가 35% 지점이다. 위가 아니라 여기.
   레퍼런스의 `WHAT IS BATTLE AXE?` 자리. **예산 = 풀쿼트 1개 + ≈120단어.** 지금이 정확히 그 예산이다.

   🔴 2026-09-19 오너 판정 — **내부 브랜딩 문서를 그대로 싣지 않는다.**
   걷어낸 것 셋, 전부 "브랜드가 자기 프레임워크를 설명하는" 자리였다:
     ⑴ 이름 풀이 2열 표(`사업에선` / `브랜드에선` × YOU·NAME·IT) — 같은 단어에 답이 둘이면
        밖에선 엄밀함이 아니라 **얼버무림**으로 읽힌다. 게다가 `고객` 이라는 말이 독자 면전에 뜬다.
        이름 뜻풀이는 로고가 이미 한다. 정본은 브랜드 가이드 ESSENCE 장에 남는다.
     ⑵ 성격 카드 3장(분해·의미 부여·지속가능성) — 번호 붙은 기둥 셋은 어느 덱에나 있는 모양이고,
        한국어 `지속가능성` 은 ESG 로 읽혀 뜻이 반대로 샌다.
     ⑶ `↑ 병렬이 아니라 순서입니다` 각주 — **자기 프레임 읽는 법을 각주로 고쳐주는 자리**였다.
        각주가 필요하면 조판이 틀린 거다. ⑵ 를 걷으면 이 각주도 가리킬 게 없다.
   그리고 풀쿼트의 `— 우리가 싸우는 것` 캡션도 뗐다 — ENEMY 는 브랜드 가이드의 **슬롯 이름**이지
   독자에게 할 말이 아니다. **인용 자체는 세다, 캡션만 무대 뒤였다.**

   ⚠️ 사전 키(`home.brand.{col,you,name,it}.*` · `p1~p3` · `order` · `pull.src` · `tag`)는 **아직 안 지웠다** —
   오너가 되돌릴 수 있게 둔 것이다. 이 판정이 굳으면 지워라(안 지우면 방문자마다 내려가는 죽은 문자열이다,
   구 `v33.ts` 171키가 그랬다). */
import { Plate3 } from '@/components/site3p/Plate3';
import { Html } from '@/components/site3p/lang';

export default function Brand() {
  return (
    <section id="brand" data-plate="02" data-name="home.nav.brand">
      <div className="sec">
        <div className="sec-head">
          <div className="no"><img src="/riso/stones/stone-1.webp" alt="" /> <span className="lab">02</span></div>
          <h2 className="disp"><Plate3 k="home.brand.h2" boil={false} /></h2>
        </div>

        <blockquote className="pull">
          <Plate3 k="home.brand.pull.a" className="disp" />
          <Plate3 k="home.brand.pull.b" className="disp" />
        </blockquote>

        {/* 🔴 사이트에서 제일 좋은 문단이다 — 약속이고, 구체적이고, **독자에게 말한다**.
            표와 카드가 지금까지 이걸 가리고 있었다. 이 자리를 다른 걸로 채우지 마라. */}
        <Html k="home.brand.lead" as="p" className="lead" />
      </div>
    </section>
  );
}
