'use client';
/* 03 What — 실험대. **시뮬레이션이라고 화면에 적어 둔다**(정직성 가드): 진짜 패널은 AE 에 쓴다.
   왼쪽에서 문장을 고르거나 버튼을 누르면 오른쪽 스테이지와 타임라인이 그 동작을 보여준다. */
import { useEffect, useRef, useState } from 'react';
import { useT } from './lang';
import { Plate3 } from './Plate3';
import { Spot } from './Spot';
import { COUNTS } from '@/lib/product';

const TITLE = 'YOU NAME IT';
const CHIPS = ['pop', 'stagger', 'drift', 'riso'];
const TOOLS: [string, string][] = [['center', 'act.center'], ['fit', 'act.fit'], ['wiggle', 'act.wiggle'], ['pop', 'act.pop.t'], ['stagger', 'act.stagger.t'], ['riso', 'act.riso.t']];

/* 패널 7 — 숫자는 전부 lib/product.ts(제품 정본)에서 읽는다. 사이트가 없는 걸 광고한 전례가 두 번 있다. */
const PANELS: [string, string, string][] = [
  [String(COUNTS.scripts), 'Toolbox', 'p.tool'],
  [String(COUNTS.motion), 'Motion', 'p.motion'],
  [String(COUNTS.textPresets), 'Text', 'p.text'],
  [String(COUNTS.gradients), 'Gradient', 'p.grad'],
  [String(COUNTS.curves), 'Graph', 'p.graph'],
  [String(COUNTS.expressions), 'Expression', 'p.expr'],
  ['∞', 'Chat', 'p.chat'],
];

const PLATES: [string, string][] = [
  ['bentoGrid', 'Bento Grid'], ['typewriterCursor', 'Typewriter (Cursor)'], ['carouselRig', 'Carousel'], ['shadowCaster', 'Master Shadow'],
  ['proximityRig', 'Effector'], ['textExploder', 'Text Exploder'], ['autoMarker', 'Auto Marker'], ['addNull', 'Parent to Null'],
];

export default function What() {
  const { t, lang } = useT();
  const [mode, setMode] = useState<'chat' | 'tool'>('chat');
  const [chip, setChip] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [log, setLog] = useState<{ html: string; ok: boolean }[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const grp = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const shape = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const typing = useRef<number | undefined>(undefined);

  const buildTitle = () => {
    const el = title.current; if (!el) return;
    el.innerHTML = TITLE.split('').map((c, k) => `<span style="--i:${k}">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
  };
  useEffect(buildTitle, []);
  /* 언어를 바꾸면 로그를 비운다 — 안 그러면 영문 줄과 국문 줄이 한 상자에 섞인다(실측). */
  useEffect(() => { setLog([]); setTyped(''); setChip(null); }, [lang]);

  const say = (html: string, ok = false) => setLog((l) => [...l, { html, ok }].slice(-4));
  const restart = (el: HTMLElement | null, cls: string) => { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
  const on = (name: string) => document.getElementById('p3-n-' + name)?.classList.add('on');
  const keys = (track: string, list: number[], cls = '') => {
    const tr = document.getElementById('p3-t-' + track); if (!tr) return;
    list.forEach((p, k) => {
      const d = document.createElement('i');
      d.className = 'k' + (cls ? ' ' + cls : '');
      d.style.setProperty('--k', p + '%'); d.style.animationDelay = (k * 40) + 'ms';
      tr.appendChild(d);
    });
  };
  const expr = (track: string, p: number, txt: string) => {
    const tr = document.getElementById('p3-t-' + track); if (!tr) return;
    const d = document.createElement('i'); d.className = 'expr'; d.style.setProperty('--k', p + '%'); d.textContent = txt; tr.appendChild(d);
  };

  const ACTS: Record<string, () => void> = {
    pop: () => { restart(title.current, 'pop'); on('title'); keys('title', [0, 38]); say(t('log.pop'), true); },
    stagger: () => { buildTitle(); restart(title.current, 'stagger'); on('title'); keys('title', TITLE.split('').map((_, k) => 6 + k * 5.5)); say(t('log.stagger').replace('{n}', String(TITLE.replace(/ /g, '').length * 2)), true); },
    drift: () => { restart(grp.current, 'drift'); on('null'); on('title'); on('shape'); keys('null', [0], 'red'); expr('null', 8, 'wiggle(0.3, 14)'); say(t('log.drift'), true); },
    riso: () => { stage.current?.classList.add('riso'); on('title'); on('shape'); say(t('log.riso'), true); },
    center: () => { anchor.current?.style.setProperty('--ax', '50%'); anchor.current?.style.setProperty('--ay', '50%'); on('title'); on('shape'); say(t('log.center'), true); },
    fit: () => { shape.current?.classList.add('fit'); on('shape'); keys('shape', [0]); say(t('log.fit'), true); },
    wiggle: () => { grp.current?.classList.remove('drift'); restart(grp.current, 'wiggle'); on('null'); expr('null', 30, 'wiggle(2, 6)'); say(t('log.wiggle'), true); },
  };

  const reset = () => {
    stage.current?.classList.remove('riso');
    if (grp.current) grp.current.className = 'grp';
    if (title.current) title.current.className = 'lyr title';
    if (shape.current) shape.current.className = 'lyr shape';
    buildTitle();
    anchor.current?.style.setProperty('--ax', '20%'); anchor.current?.style.setProperty('--ay', '22%');
    document.querySelectorAll('.p3 .tl .track').forEach((x) => { x.innerHTML = ''; });
    document.querySelectorAll('.p3 .tl .name').forEach((x) => x.classList.remove('on'));
    setChip(null); setTyped(''); setLog([]);
  };

  const runChip = (act: string) => {
    const s = t('act.' + act);
    setChip(act); say(`${t('log.you')} “${s}”`);
    if (typing.current) clearInterval(typing.current);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let k = 0; setTyped('');
    typing.current = window.setInterval(() => {
      setTyped(s.slice(0, ++k));
      if (k >= s.length) { clearInterval(typing.current); typing.current = undefined; setTimeout(() => ACTS[act]?.(), 220); }
    }, reduce ? 0 : 22);
  };

  /* 뷰포트에 들어오면 첫 문장을 한 번 시연한다 — 실험대는 눌러야 말을 하는데 아무도 안 누른다 */
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    let done = false;
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting && !done) { done = true; setTimeout(() => runChip('pop'), 600); io.disconnect(); }
    }), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec" id="what" data-plate="03" data-name="nav.what">
      <div className="sec-head">
        <div className="no lab"><img src="/riso/stones/stone-5.webp" alt="" />03 &nbsp;·&nbsp; <span>{t('nav.what')}</span></div>
        <h2><Plate3 k="what.h2" black reg press={false} boil={false} /></h2>
        <div className="tag">{t('what.tag')}</div>
      </div>
      <p className="lead" dangerouslySetInnerHTML={{ __html: t('what.lead') }} />

      <div className="labwrap" ref={wrap}>
        <div className="lab-l sheet gridp tape">
          <div className="tabs" role="tablist">
            <button className={mode === 'chat' ? 'on' : ''} onClick={() => setMode('chat')} data-cur>{t('lab.say')}</button>
            <button className={mode === 'tool' ? 'on' : ''} onClick={() => setMode('tool')} data-cur>{t('lab.press')}</button>
          </div>
          {mode === 'chat' ? (
            <div>
              <div className="chips">
                {CHIPS.map((a) => (
                  <button key={a} className={chip === a ? 'on' : ''} onClick={() => runChip(a)} data-cur>{t('act.' + a)}</button>
                ))}
              </div>
              <div className="prompt" style={{ marginTop: 12 }}><span>{typed}</span><i className="caret" /></div>
            </div>
          ) : (
            <div>
              <div className="tools">
                {TOOLS.map(([act, k]) => (
                  <button key={k} onClick={() => { say(`${t('log.press')} ${t(k)}`); ACTS[act]?.(); }} data-cur><i />{t(k)}</button>
                ))}
              </div>
              <div className="lab lc" style={{ marginTop: 12, color: '#555', fontSize: 12.5 }}>{t('lab.toolnote')}</div>
            </div>
          )}
          <div className="log">
            {log.length === 0
              ? <span style={{ color: '#777' }}>{t('lab.ready')}</span>
              : log.map((l, i) => (
                  <div key={i}>
                    {l.ok ? <span className="ok">✓</span> : <span style={{ color: '#777' }}>›</span>}{' '}
                    <span dangerouslySetInnerHTML={{ __html: l.html }} />
                  </div>
                ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="lab lc" style={{ color: '#777' }}>{t('lab.sim')}</span>
            <button className="lab" onClick={reset} data-cur style={{ border: '1.5px solid #0b0b0b', borderRadius: 4, padding: '6px 10px' }}>{t('lab.reset')}</button>
          </div>
        </div>

        <div className="lab-r">
          <div className="stage" ref={stage} data-cur>
            <div className="hud">Comp 1 · <b>1920×1080</b> · 30fps</div>
            <div className="comp"><div className="grp" ref={grp}><div className="lyr title" ref={title} /><div className="lyr shape" ref={shape} /></div></div>
            <div className="anchor" ref={anchor} />
          </div>
          <div className="tl">
            <div className="row"><div className="name">{t('tl.layer')}</div><div className="ruler"><i style={{ left: 0 }}>0f</i><i style={{ left: '25%' }}>15f</i><i style={{ left: '50%' }}>30f</i><i style={{ left: '75%' }}>45f</i><i style={{ right: 0 }}>60f</i></div></div>
            <div className="row"><div className="name" id="p3-n-null">Null 1</div><div className="track" id="p3-t-null" /></div>
            <div className="row"><div className="name" id="p3-n-title">Title</div><div className="track" id="p3-t-title" /></div>
            <div className="row"><div className="name" id="p3-n-shape">Shape 1</div><div className="track" id="p3-t-shape" /></div>
          </div>
        </div>
      </div>

      <div className="panels sweep">
        {PANELS.map(([n, name, k]) => (
          <div key={name}><em>{n}</em><b>{name}</b><span>{t(k)}</span></div>
        ))}
      </div>
      <p className="counts-note">{t('p.note')}</p>

      <div className="plates">
        <div className="plates-head lab"><span>{t('plates.h')}</span><span className="lc">{t('plates.hint')}</span></div>
        <div className="plates-row sweep">
          {PLATES.map(([id, name]) => <Spot key={id} id={id} name={name} desc={t('tip.' + id)} tabIndex={0} />)}
        </div>
      </div>
    </section>
  );
}
