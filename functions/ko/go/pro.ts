/* /ko/go/pro — 국문 면. 본체와 설정 방법 = `functions/_lib/goPro.ts`. */
import { type GoProEnv, goPro } from '../../_lib/goPro';

type Ctx = { request: Request; env: GoProEnv };
export const onRequestGet = (c: Ctx) => goPro(c, 'ko');
export const onRequestHead = (c: Ctx) => goPro(c, 'ko', false);
