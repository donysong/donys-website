/* 🔴 **생성물이다. 손으로 고치지 마라.**
   고칠 곳은 플러그인 repo 의 `donys/usage/{ko,en}/<id>.md` 이고(사이트 repo 에서 사용법 문장을 고치지 마라),
   파서·변환기는 `tools/usageMd.mjs`, 읽는 쪽은 `tools/build-docs-data.mjs`. 고친 뒤  npm run build:docs  를 돌려라.
   읽은 곳 = `DOCS_USAGE_SRC`. 기본은 출고 태그(`lib/product.ts` VERSION)다 — `dev:…` 는 `DOCS_PLUGIN_REF` 개발용 우회이고
   `deployCheck` 가 그 상태의 배포를 막는다.

   `id` = 툴 id · `panel-<key>`(`custom-1` = `panel-custom`) · `catalog-<kind>`. 여기 없는 id 는 그 카드에 토글이 안 뜬다(에러 아님).
   🔴 값은 **이스케이프를 거친 최소 HTML**(`p ul li table thead tbody tr th td code b`)이다 — `dangerouslySetInnerHTML` 로 넣는다.
   `requires` 는 일반 텍스트다. 표의 컨트롤 칸은 생성 때 제품 라벨(`{{ns.key}}`)로 이미 풀려 있다. */

/** 이 파일을 찍은 곳 — 태그(`v2.8.0`) 또는 개발 우회(`dev:<ref>`). */
export const DOCS_USAGE_SRC = "v2.7.1";

export type DocsUsageKind = 'tool' | 'panel' | 'catalog';

/** 한 로캘의 사용법 — 4절(선택 · 컨트롤 · 수식어 · 한계·되돌리기)이 HTML 이다. */
export type DocsUsageLoc = {
  /** 요구 사항 한 줄씩(없으면 `[]`). 배지로 그린다. */
  requires: string[];
  sel: string;
  ctl: string;
  mod: string;
  lim: string;
};

export type DocsUsage = { kind: DocsUsageKind; ko: DocsUsageLoc; en: DocsUsageLoc };

export const DOCS_USAGE: Readonly<Record<string, DocsUsage>> = {};
