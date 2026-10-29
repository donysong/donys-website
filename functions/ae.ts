/* /ae — 영문 제품 면 입구. 한국어 브라우저가 바깥에서 오면 `/ko/ae` 로 보낸다. 본체 = `functions/_lib/koEntry.ts`. */
import { koEntry } from './_lib/koEntry';

export const onRequest = koEntry;
