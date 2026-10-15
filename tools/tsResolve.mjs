/* `functions/` 의 TS 를 Node 가 그대로 돌리게 하는 resolve 훅 — `tools/functions.test.mjs` 가 등록한다.
   Node(≥ 22.18)는 타입을 지우고 .ts 를 실행하지만 확장자 없는 상대 import(`'../_lib/newsletter'`)는 못 푼다.
   Pages Functions 번들러(wrangler)와 tsc 는 확장자 없는 쪽을 요구하므로 소스를 바꾸지 않고 여기서 `.ts` 를 붙여 준다. 테스트 전용이다. */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier.split('/').pop() ?? '') && context.parentURL?.startsWith('file:')) {
    const url = new URL(specifier + '.ts', context.parentURL);
    if (existsSync(fileURLToPath(url))) return nextResolve(url.href, context);
  }
  return nextResolve(specifier, context);
}
