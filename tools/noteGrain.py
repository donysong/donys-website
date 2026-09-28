#!/usr/bin/env python3
"""노트 판 결 타일 굽기 — `public/riso/note-grain.webp` (2026-09-29, 오너 1-6).

소스 = 오너 스캔 `BG_Gridtex.png` (1920×1080 · 오프화이트 종이 + 옅은 파란 모눈 ≈28.6px · 결 · 티끌).
repo 밖이다(오너 로컬 `~/Downloads/2026-09-28/`) — 경로를 인자로 준다.

왜 스캔을 그대로 안 쓰나 (site4.css `.onnote` 주석과 같은 이야기):
  ⑴ 모눈이 **색 차이로만** 선다 — webp 손실(4:2:0)이 선 대비를 q75 에서 17.9 → 5.9 로 깎는다.
  ⑵ 스캔이 기울어 있다(세로선 3px · 가로선 2px 흐름) — 통째로 타일링하면 이음매마다 선이 꺾인다.
  ⑶ 3.1MB.
그래서 결(밝기)만 굽고 선은 CSS 가 긋는다. 단계:
  1. 선 검출 — 파랑−빨강 채널 차의 띠별 투영 봉우리(포물선 보간). 세로선 67 × 띠 17 · 가로선 38 × 띠 31.
  2. 최소제곱 맞춤 — x = a + b·i + c·y + d·i² + e·i·y (가로선도 같은 꼴). 잔차 rms 0.27 / 0.18 px.
  3. 펴기 — 선 i 가 u = (i−1)·28 에 오도록 역사상 + 쌍선형 표본. 36×36칸 = 1008².
     🔴 1008 = 28 의 정수배이고 선 코어가 x·y ≡ 0 이다 — CSS 격자(`.onnote`)가 같은 원점에서 선을 긋고,
        타일 이음매가 그 선 밑에 숨는다. 칸(28)이나 타일 크기를 바꾸면 CSS 도 같이 바꿔라.
  4. 티끌 걷기 — 로컬 중앙값보다 크게 어두운 점(스캔 먼지)을 중앙값으로. 타일이 반복되므로 남기면 같은 자리에 되풀이된다.
  5. 선 걷기 — 선 띠(±2px)를 양옆 종이로 보간하고 이웃 칸의 결을 되얹는다.
  6. 큰 얼룩 누르기 — 반경 ~12px 보다 큰 명암 변화는 60% 줄인다(1008px 마다 같은 얼룩이 되풀이되는 게 보였다).
  7. 흰색 기준 정규화(곱하기 층이라 255 = 변화 없음) → 회색 webp q88.

실행:  python3 -m venv /tmp/ng && /tmp/ng/bin/pip install pillow numpy
       /tmp/ng/bin/python tools/noteGrain.py ~/Downloads/2026-09-28/BG_Gridtex.png public/riso/note-grain.webp
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

P, N = 28, 36  # 칸(px) · 타일 칸 수


def peaks(p):
    thr = p.mean() + p.std()
    out = []
    for i in range(1, len(p) - 1):
        if p[i] > thr and p[i] >= p[i - 1] and p[i] > p[i + 1]:
            y0, y1, y2 = p[i - 1], p[i], p[i + 1]
            den = y0 - 2 * y1 + y2
            out.append(i + (0.5 * (y0 - y2) / den if den else 0))
    return out


def blur(a, r):
    return np.asarray(Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))).astype(float)


def main(src, dst):
    a = np.asarray(Image.open(src).convert('RGB')).astype(float)
    H, W, _ = a.shape
    d = a[..., 2] - a[..., 0]  # 파란 선 = 파랑 − 빨강

    # 1–2. 선 검출 + 맞춤
    nv, nh = len(peaks(d.mean(0))), len(peaks(d.mean(1)))
    V = [(i, y0 + 30, x) for y0 in range(0, H - 60, 60) for pk in [peaks(d[y0:y0 + 60].mean(0))] if len(pk) == nv for i, x in enumerate(pk)]
    Hs = [(j, x0 + 30, y) for x0 in range(0, W - 60, 60) for pk in [peaks(d[:, x0:x0 + 60].mean(1))] if len(pk) == nh for j, y in enumerate(pk)]
    V, Hs = np.array(V), np.array(Hs)
    basis = lambda k, t: np.c_[np.ones(len(k)), k, t, k ** 2, k * t]
    cv = np.linalg.lstsq(basis(V[:, 0], V[:, 1]), V[:, 2], rcond=None)[0]
    ch = np.linalg.lstsq(basis(Hs[:, 0], Hs[:, 1]), Hs[:, 2], rcond=None)[0]

    # 3. 펴기 — 출력 (u,v) 의 선 번호 → 입력 (x,y), 고정점 반복
    S = N * P
    u, v = np.meshgrid(np.arange(S, dtype=float), np.arange(S, dtype=float))
    fi, fj = u / P + 1, v / P + 1
    x, y = cv[0] + cv[1] * fi, ch[0] + ch[1] * fj
    for _ in range(8):
        x = cv[0] + cv[1] * fi + cv[2] * y + cv[3] * fi ** 2 + cv[4] * fi * y
        y = ch[0] + ch[1] * fj + ch[2] * x + ch[3] * fj ** 2 + ch[4] * fj * x
    x0 = np.clip(np.floor(x).astype(int), 0, W - 2); y0 = np.clip(np.floor(y).astype(int), 0, H - 2)
    fx, fy = (x - x0)[..., None], (y - y0)[..., None]
    r = a[y0, x0] * (1 - fx) * (1 - fy) + a[y0, x0 + 1] * fx * (1 - fy) + a[y0 + 1, x0] * (1 - fx) * fy + a[y0 + 1, x0 + 1] * fx * fy
    L = r.mean(2)

    # 4. 티끌
    med = np.asarray(Image.fromarray(np.clip(L, 0, 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(11))).astype(float)
    speck = np.asarray(Image.fromarray(((blur(L, 1) < med - 9) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
    L = np.where(speck, med, L)

    # 5. 선 띠
    noise = L - blur(L, 2)
    G = L.copy()
    for c in range(0, S, P):
        lo, hi = (c - 3) % S, (c + 3) % S
        for k, xx in enumerate(range(c - 2, c + 3)):
            t = (k + 1) / 6
            G[:, xx % S] = L[:, lo] * (1 - t) + L[:, hi] * t + noise[:, (xx + 7) % S]
    G2 = G.copy()
    for c in range(0, S, P):
        lo, hi = (c - 3) % S, (c + 3) % S
        for k, yy in enumerate(range(c - 2, c + 3)):
            t = (k + 1) / 6
            G2[yy % S, :] = G[lo, :] * (1 - t) + G[hi, :] * t + noise[(yy + 9) % S, :]

    # 6. 큰 얼룩
    low = blur(G2, 12)
    G3 = G2 - (low - low.mean()) * 0.6

    # 7. 정규화 · 굽기
    g = np.clip(G3 / np.percentile(G3, 99.5) * 255, 0, 255).astype(np.uint8)
    Image.fromarray(g).convert('RGB').save(dst, 'WEBP', quality=88, method=6)
    print(f'{dst}: {S}x{S} · mean {g.mean():.1f} · specks {int(speck.sum())} px')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
