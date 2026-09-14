'use client';
/* 잉크 판 — 흰 녹아웃(ko) 위에 빨간 잉크(multiply), 그 뒤로 밀린 흰 테(rim).
   어긋남 폭 = --pl-rx/--pl-ry (오너 2026-09-11 판정으로 밑판 그림자와 분리됐다). */
import { useT } from './lang';

export function Plate3({ k, className = '', black = false, press = true, boil = true, reg = false, block = false }: {
  k: string; className?: string; black?: boolean; press?: boolean; boil?: boolean; reg?: boolean; block?: boolean;
}) {
  const { t } = useT();
  const s = t(k);
  const cls = ['pl', black ? 'black' : '', press ? 'press' : '', boil ? 'boil' : '', reg ? 'reg' : '', block ? 'block' : '', className]
    .filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <span className="rim" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s }} />
      {!black && <span className="ko" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s }} />}
      <span className="ink" dangerouslySetInnerHTML={{ __html: s }} />
    </span>
  );
}
