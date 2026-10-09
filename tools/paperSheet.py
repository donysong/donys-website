#!/usr/bin/env python3
"""파란 종이 판 결 굽기 — `public/riso/sheet-fiber.webp` · `public/riso/sheet-roller.webp` (2026-10-09, 리뉴얼 v5 §17.8 판 쌓기).

왜 굽나: 종이는 원래 고정 레이어 한 장(`.p3 .paper`, site3p.css)이고 섹션은 투명했다. v5 는 섹션마다 **종이 한 장**이
앞 판 위로 올라온다(mindmarket 의 둥근 판) — 그러려면 판이 불투명해야 하고, 결도 판이 들고 다녀야 한다.
고정 레이어는 결을 `filter:invert(1) contrast(1.2)` + `opacity` + `mix-blend-mode:multiply` 로 얹는데,
배경 레이어엔 filter·opacity 가 없다. 그래서 그 셋을 **픽셀에 미리 넣는다** — 결과가 `background-blend-mode:multiply` 한 줄로 같아진다.

공식 (sRGB, 채널별 · 곱하기 층이라 255 = 변화 없음):
  곱하기 + 불투명도 a  →  Cb · (1 − a·(1 − Cs))     ← 굽는 값 = 1 − a·(1 − Cs)
  fiber  : Cs = contrast(1.2)(invert(paper-field))  · a = .42   (site3p.css `.paper .fiber`)
  roller : Cs = ink-roller                           · a = .50   (site3p.css `.paper .roller`)
🔴 고정 레이어의 값(.42 · .5 · contrast 1.2)을 바꾸면 이걸 다시 구워라 — 판과 바닥 종이가 갈라진다.

실행:  py tools/paperSheet.py
"""
import numpy as np
from PIL import Image

SRC = 'public/riso/'


def bake(src, out, alpha, invert=False, contrast=1.0):
    c = np.asarray(Image.open(SRC + src).convert('RGB'), dtype=np.float32) / 255
    if invert:
        c = 1 - c
    c = np.clip((c - .5) * contrast + .5, 0, 1)
    v = 1 - alpha * (1 - c)
    Image.fromarray(np.round(v * 255).astype(np.uint8)).save(SRC + out, quality=86, method=6)
    print(out, Image.open(SRC + out).size, f'{v.min():.3f}–{v.max():.3f}')


bake('paper-field.webp', 'sheet-fiber.webp', .42, invert=True, contrast=1.2)
bake('ink-roller.png', 'sheet-roller.webp', .50)
