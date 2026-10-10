'use client';
/* 07 설치 — 🔴 앵커 `#install` 은 들어오는 링크의 목적지다(히어로 원 밑 줄 · FAQ q12 · 사양 3 · 푸터 · 다운로드 안 `README.txt`).
   원문 = PR repo `gtm/site/pr-install.md`(설치 스크립트 하나로 `.zxp` + `.ccx`, 안 되면 수동). 원문은 `/pr/docs#install` 을 제안했는데
   PR 은 아직 읽는 면이 없어서 이 페이지의 절로 뒀다 — 🔴 PR repo `README.txt` 초안의 주소(`/pr/docs#install`)를 `/pr#install` 로 같이 고친다.
   순서: 설치 전 · Windows · macOS(3열) → 처음 열 때 · Pro 활성화 · 업데이트와 삭제(3열) → [접힘: 스크립트로 안 될 때].
   설치 절차라 지시형이 허용된다(VOICE_AND_TERMS §1) — 합니다체는 그대로.

   🔴 확인 안 된 줄(원문 ⟦…⟧ 표식 — 화면에서는 뺐다. D20 = 깨끗한 PC 설치 · D2 = 동반 플러그인 출고 여부):
     win.li3   D20 — 실제 경고 문구와 버튼 이름
     mac.li3   D20 — macOS 15 이상 문구 · 서명·공증된 설치 파일이면 이 단계가 빠진다
     mac.li4   D20 — 관리자 암호를 묻는지
     first.li1 KO 메뉴 이름(한국어 Premiere 의 창 ▸ 확장)
     update.li2 D20 — CEP 확장이 Creative Cloud 플러그인 관리 목록에 보이는지
     win.li4 · win.li5 · mac.li5 · manual.li2 · manual.li3 — D2. `PR.companion = false` 면 `.ccx` 줄이 빠지고 `*.nocx` 문장이 선다. */
import { Html, useT } from '@/components/site3p/lang';
import { PR } from '@/lib/product';
import Head from './Head';
import type { Plate } from './state';

const CX = PR.companion as boolean;

export default function Install({ no, note }: Plate) {
  const { t } = useT();
  const li = (k: string) => <li key={k} dangerouslySetInnerHTML={{ __html: t(k) }} />;
  const win = ['pr.inst.win.li1', 'pr.inst.win.li2', 'pr.inst.win.li3', CX ? 'pr.inst.win.li4' : 'pr.inst.win.li4.nocx', ...(CX ? ['pr.inst.win.li5'] : [])];
  const mac = ['pr.inst.mac.li1', 'pr.inst.mac.li2', 'pr.inst.mac.li3', 'pr.inst.mac.li4', ...(CX ? ['pr.inst.mac.li5'] : [])];
  const manual = ['pr.inst.manual.li1', ...(CX ? ['pr.inst.manual.li2', 'pr.inst.manual.li3'] : ['pr.inst.manual.li3.nocx'])];
  return (
    <section id="install" className={note ? 'onnote' : undefined} data-plate={no} data-name="pr.plate.install">
      <div className="sec tight">
        <Head no={no} stone={5} k="pr.inst.h" tag="pr.inst.tag" />
        <div className="howto pr-inst">
          <div>
            <h3>{t('pr.inst.before.h')}</h3>
            <ul>{[1, 2, 3].map((n) => li(`pr.inst.before.li${n}`))}</ul>
          </div>
          <div>
            <h3>{t('pr.inst.win.h')}</h3>
            <ol>{win.map(li)}</ol>
          </div>
          <div>
            <h3>{t('pr.inst.mac.h')}</h3>
            <ol>{mac.map(li)}</ol>
          </div>
        </div>
        <div className="howto pr-inst">
          <div>
            <h3>{t('pr.inst.first.h')}</h3>
            <ul>{[1, 2, 3].map((n) => li(`pr.inst.first.li${n}`))}</ul>
          </div>
          <div>
            <h3>{t('pr.inst.pro.h')}</h3>
            <ol>{[1, 2, 3, 4].map((n) => li(`pr.inst.pro.li${n}`))}</ol>
          </div>
          <div>
            <h3>{t('pr.inst.update.h')}</h3>
            <ul>{[1, 2, 3].map((n) => li(`pr.inst.update.li${n}`))}</ul>
          </div>
        </div>
        <details className="byhand">
          <summary data-cur>
            <span className="h">{t('pr.inst.manual.h')}</span>
            <span className="pm" aria-hidden="true">+</span>
          </summary>
          <Html k="pr.inst.manual.p" as="p" className="byhand-d" />
          <div className="howto pr-one">
            <div><ol>{manual.map(li)}</ol></div>
          </div>
        </details>
      </div>
    </section>
  );
}
