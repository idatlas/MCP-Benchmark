/* Responsible ChatGPT Use at Work — course behavior.
   Every screen is plain HTML in index.html; this file adds navigation,
   Chad's narration, the interactions, and saved progress. */
(() => {
  'use strict';

  const KEY = 'rcu-course-v1';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const screens = $$('.screen');
  const audio = $('#narrator');
  const announcer = $('#announcer');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { state = {}; }
  state.visited = state.visited || [];
  if (typeof state.auto !== 'boolean') state.auto = true;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ } };

  function announce(msg) {
    announcer.textContent = '';
    setTimeout(() => { announcer.textContent = msg; }, 50);
  }

  function tag(btn, icon, text) {
    const t = $('.tag', btn);
    if (t) t.innerHTML = `<svg class="ic" aria-hidden="true"><use href="#i-${icon}"/></svg>${text}`;
  }

  function show(el) { el.hidden = false; }
  function hide(el) { el.hidden = true; }

  /* ---------- Chad's narration ---------- */

  const SAY = { play: 'Hear Chad', pause: 'Pause Chad', replay: 'Replay Chad' };
  let speaking = null;
  let finished = false;

  function setMode(chad, mode) {
    const b = $('.say', chad);
    if (!b) return;
    b.dataset.mode = mode;
    $('.say-label', b).textContent = SAY[mode];
  }

  $$('.chad[data-clip]').forEach(chad => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'say';
    b.innerHTML =
      '<svg class="ic" aria-hidden="true" data-icon="play"><use href="#i-play"/></svg>' +
      '<svg class="ic" aria-hidden="true" data-icon="pause"><use href="#i-pause"/></svg>' +
      '<svg class="ic" aria-hidden="true" data-icon="replay"><use href="#i-replay"/></svg>' +
      '<span class="say-label"></span>';
    $('.bubble', chad).appendChild(b);
    setMode(chad, 'play');
    b.addEventListener('click', () => {
      const mode = b.dataset.mode;
      if (mode === 'pause') audio.pause();
      else if (mode === 'play' && speaking === chad && !finished && audio.currentTime > 0) audio.play();
      else speak(chad);
    });
  });

  function speak(chad) {
    if (!chad || !chad.dataset.clip) return;
    pauseVideos();
    if (speaking && speaking !== chad) {
      setMode(speaking, 'play');
      speaking.classList.remove('talking');
    }
    speaking = chad;
    finished = false;
    audio.src = encodeURI(chad.dataset.clip);
    setMode(chad, 'pause');
    chad.classList.add('talking');
    const p = audio.play();
    if (p) p.catch(() => {
      // Autoplay blocked or file missing: leave the button ready to press.
      if (speaking === chad) { setMode(chad, 'play'); chad.classList.remove('talking'); }
    });
  }

  function finish() {
    if (!speaking || finished) return;
    finished = true;
    setMode(speaking, 'replay');
    speaking.classList.remove('talking');
  }

  function stopNarration() {
    if (!speaking) return;
    if (!finished) setMode(speaking, 'play');
    speaking.classList.remove('talking');
    audio.pause();
  }

  audio.addEventListener('play', () => {
    if (speaking) { setMode(speaking, 'pause'); speaking.classList.add('talking'); }
  });
  audio.addEventListener('pause', () => {
    if (speaking && !finished) { setMode(speaking, 'play'); speaking.classList.remove('talking'); }
  });
  audio.addEventListener('ended', finish);
  // Two clips carry long trailing silence; data-end stops them when Chad stops talking.
  audio.addEventListener('timeupdate', () => {
    if (speaking && speaking.dataset.end && audio.currentTime >= Number(speaking.dataset.end)) {
      finish();
      audio.pause();
    }
  });

  const videos = $$('video');
  function pauseVideos(except) { videos.forEach(v => { if (v !== except && !v.paused) v.pause(); }); }
  videos.forEach(v => v.addEventListener('play', () => { stopNarration(); pauseVideos(v); }));

  const narrToggle = $('#narr-toggle');
  function renderToggle() { narrToggle.setAttribute('aria-pressed', String(state.auto)); }
  narrToggle.addEventListener('click', () => {
    state.auto = !state.auto;
    save();
    renderToggle();
    if (!state.auto) stopNarration();
    announce(state.auto
      ? 'Auto-play is on. Chad will talk when each screen opens.'
      : 'Auto-play is off. Use the Hear Chad buttons to listen.');
  });
  renderToggle();

  /* ---------- Navigation ---------- */

  const prevBtn = $('#prev');
  const nextBtn = $('#next');
  const menu = $('#menu');
  const menuBtn = $('#menu-btn');
  const menuList = $('#menu-list');
  let current = -1;
  let menuNavigating = false;

  const indexOfId = id => screens.findIndex(s => s.id === id);

  function go(i, opts = {}) {
    i = Math.max(0, Math.min(screens.length - 1, i));
    stopNarration();
    pauseVideos();
    screens.forEach((s, n) => { s.hidden = n !== i; });
    current = i;
    const s = screens[i];

    document.title = `${s.dataset.title} – Responsible ChatGPT Use at Work`;
    $('#count').textContent = `Screen ${i + 1} of ${screens.length}`;
    $('#progress-bar').style.width = `${((i + 1) / screens.length) * 100}%`;
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === screens.length - 1;

    if (!state.visited.includes(s.id)) state.visited.push(s.id);
    state.screen = s.id;
    save();
    renderMenu();

    if (opts.push !== false && location.hash !== `#${s.id}`) history.pushState(null, '', `#${s.id}`);
    window.scrollTo(0, 0);
    if (opts.focus !== false) {
      const h = $('h1', s);
      if (h) h.focus({ preventScroll: true });
    }
    if (state.auto && opts.auto !== false) {
      const chad = $('.chad[data-auto]:not([hidden])', s);
      if (chad) speak(chad);
    }
  }

  prevBtn.addEventListener('click', () => go(current - 1));
  nextBtn.addEventListener('click', () => go(current + 1));
  $$('[data-next]').forEach(b => b.addEventListener('click', () => go(current + 1)));
  $$('[data-restart]').forEach(b => b.addEventListener('click', () => go(0)));
  window.addEventListener('popstate', () => {
    const i = indexOfId(location.hash.slice(1));
    go(i < 0 ? 0 : i, { push: false });
  });

  function renderMenu() {
    menuList.innerHTML = '';
    screens.forEach((s, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${s.id}`;
      const visited = state.visited.includes(s.id);
      a.innerHTML = `<span class="num">${i + 1}.</span><span>${s.dataset.title}</span>` +
        (visited ? '<span class="done"><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg><span class="visually-hidden">(visited)</span></span>' : '');
      if (i === current) a.setAttribute('aria-current', 'step');
      a.addEventListener('click', e => {
        e.preventDefault();
        menuNavigating = true;
        menu.close();
        go(i);
      });
      li.appendChild(a);
      menuList.appendChild(li);
    });
  }

  menuBtn.addEventListener('click', () => {
    menu.showModal();
    const cur = $('[aria-current="step"]', menuList);
    if (cur) cur.focus();
  });
  $('#menu-close').addEventListener('click', () => menu.close());
  menu.addEventListener('click', e => { if (e.target === menu) menu.close(); }); // backdrop
  menu.addEventListener('close', () => {
    if (menuNavigating) {
      menuNavigating = false;
      const h = $('h1', screens[current]);
      if (h) h.focus({ preventScroll: true });
    } else {
      menuBtn.focus();
    }
  });

  /* ---------- Disclosures (terms, use cases, examples, revised draft) ---------- */

  document.addEventListener('click', e => {
    const b = e.target.closest('button[aria-expanded][aria-controls]');
    if (!b || b.classList.contains('hl')) return;
    const target = document.getElementById(b.getAttribute('aria-controls'));
    if (!target) return;
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open));
    target.hidden = !open;
    if (b.classList.contains('linkish')) b.textContent = open ? 'Hide example' : 'Show an example';
    b.dataset.seen = '1';
    const group = b.closest('[data-reveal-group]');
    if (group) updateCounter(group);
  });

  function updateCounter(group) {
    const counter = $('[data-counter]', group.parentElement);
    if (!counter) return;
    const btns = $$('[aria-expanded]', group);
    const seen = btns.filter(x => x.dataset.seen).length;
    if (!counter.dataset.word) counter.dataset.word = counter.textContent.replace(/^\d+ of \d+ /, '');
    counter.textContent = seen === btns.length
      ? `All ${btns.length} ${counter.dataset.word}. Nice.`
      : `${seen} of ${btns.length} ${counter.dataset.word}`;
  }

  /* ---------- Screen 2: spot the glitch ---------- */

  (() => {
    const box = $('[data-glitch]');
    const fb = $('[data-feedback]', box);
    const fixRow = $('#glitch-fix');
    const [a, b, c] = ['#glitch-a', '#glitch-b', '#glitch-c'].map(id => $(id));
    const choices = $$('.choice', box);
    let solved = false;

    choices.forEach(btn => btn.addEventListener('click', () => {
      if (solved) return;
      if (btn.hasAttribute('data-correct')) {
        solved = true;
        choices.forEach(x => x.setAttribute('aria-disabled', 'true'));
        btn.classList.add('is-right');
        tag(btn, 'check', 'You got it');
        fb.className = 'feedback ok';
        fb.textContent = 'Yes! Count them: a thumb plus five fingers. Six digits on one hand is a classic AI image mistake.';
        hide(a); show(b);
        show(fixRow);
        if (state.auto) speak(b);
      } else {
        btn.classList.add('is-tried');
        tag(btn, 'x', 'Not it');
        fb.className = 'feedback no';
        fb.textContent = `Not quite. ${btn.dataset.hint}`;
      }
    }));
    fb.setAttribute('aria-live', 'polite');

    $('button', fixRow).addEventListener('click', () => {
      hide(b); show(c); hide(fixRow);
      const take = $('#glitch-takeaway');
      show(take);
      if (state.auto) speak(c);
      take.focus();
    });
  })();

  /* ---------- Screen 7: paste it or not? ---------- */

  (() => {
    const list = $('[data-sort]');
    const items = $$(':scope > li', list);
    const score = $('[data-sort-score]');
    const resetRow = $('[data-sort-reset]');

    items.forEach(li => $$('[data-pick]', li).forEach(btn => btn.addEventListener('click', () => {
      if (li.dataset.done) return;
      li.dataset.done = '1';
      const right = btn.dataset.pick === li.dataset.answer;
      $$('[data-pick]', li).forEach(x => {
        x.setAttribute('aria-disabled', 'true');
        x.setAttribute('aria-pressed', String(x === btn));
      });
      btn.classList.add(right ? 'is-right' : 'is-wrong');
      if (!right) $(`[data-pick="${li.dataset.answer}"]`, li).classList.add('is-right');
      const r = $('.result', li);
      r.className = `result ${right ? 'ok' : 'no'}`;
      const verdict = li.dataset.answer === 'ok' ? 'OK to paste.' : 'Don’t paste.';
      r.innerHTML = `<strong><svg class="ic" aria-hidden="true"><use href="#i-${right ? 'check' : 'x'}"/></svg>${right ? 'Correct' : 'Not quite'}:</strong> ${verdict} ${li.dataset.why}`;

      const done = items.filter(x => x.dataset.done);
      if (done.length === items.length) {
        const n = items.filter(x => $('.is-right[aria-pressed="true"]', x)).length;
        score.textContent = n === items.length
          ? `${n} of ${items.length}. Your privacy instincts are sharp.`
          : `${n} of ${items.length}. Read the notes on the ones you missed—those are the slips that end up in audit logs.`;
        show(score); show(resetRow);
      }
    })));

    $('button', resetRow).addEventListener('click', () => {
      items.forEach(li => {
        delete li.dataset.done;
        $$('[data-pick]', li).forEach(x => {
          x.removeAttribute('aria-disabled'); x.removeAttribute('aria-pressed');
          x.classList.remove('is-right', 'is-wrong');
        });
        const r = $('.result', li); r.className = 'result'; r.textContent = '';
      });
      hide(score); hide(resetRow);
      $('[data-pick]', items[0]).focus();
    });
  })();

  /* ---------- Screen 8: highlighted draft ---------- */

  (() => {
    const hls = $$('.hl');
    const panel = $('#note-panel');
    const tpl = $('#notes');
    const counter = $('[data-hl-counter]');
    const revisedRow = $('#revised-btn');

    // Highlights are inline spans with role="button" so they wrap with the sentence.
    hls.forEach(h => h.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); h.click(); }
    }));
    hls.forEach(h => h.addEventListener('click', () => {
      hls.forEach(x => x.setAttribute('aria-expanded', String(x === h)));
      const note = tpl.content.querySelector(`[data-id="${h.dataset.note}"]`).cloneNode(true);
      panel.replaceChildren(...note.childNodes);
      panel.dataset.kind = h.dataset.kind;
      h.classList.add('seen');
      const seen = hls.filter(x => x.classList.contains('seen')).length;
      counter.textContent = seen === hls.length ? 'All 5 reviewed.' : `${seen} of ${hls.length} reviewed`;
      if (seen === hls.length) show(revisedRow);
      announce(panel.textContent.trim());
      panel.scrollIntoView({ block: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }));
  })();

  /* ---------- Screens 10–12: branching scenarios ---------- */

  $$('.scenario').forEach(sc => {
    const best = sc.dataset.best;
    const choices = $$('[data-choice]', sc);
    const retry = $('[data-role="retry"]', sc);
    const win = $('[data-role="win"]', sc);
    const after = $('[data-role="after"]', sc);
    const others = $('[data-others]', sc);

    choices.filter(c => c.dataset.choice !== best).forEach(c => {
      const h = document.createElement('h3');
      h.textContent = $('.text', c).textContent;
      const p = document.createElement('p');
      p.textContent = $(`[data-outcome="${c.dataset.choice}"] [data-story]`, sc).textContent;
      others.append(h, p);
    });

    choices.forEach(c => c.addEventListener('click', () => {
      if (sc.dataset.locked) return;
      sc.dataset.locked = '1';
      choices.forEach(x => x.setAttribute('aria-disabled', 'true'));
      const ok = c.dataset.choice === best;
      c.classList.remove('is-tried');
      c.classList.add(ok ? 'is-right' : 'is-wrong');
      tag(c, ok ? 'check' : 'warn', ok ? 'Best move' : 'Risky');
      const out = $(`[data-outcome="${c.dataset.choice}"]`, sc);
      show(out);
      if (ok) {
        show(win); show(after);
        choices.forEach(x => { if (x !== c) x.classList.add('is-dim'); });
        if (state.auto) speak(win);
      } else {
        show(retry);
      }
      out.focus();
    }));

    $('[data-retry]', sc).addEventListener('click', () => {
      const tried = choices.find(x => x.classList.contains('is-wrong'));
      tried.classList.remove('is-wrong');
      tried.classList.add('is-tried');
      tag(tried, 'x', 'Tried');
      $$('[data-outcome]', sc).forEach(hide);
      hide(retry);
      delete sc.dataset.locked;
      choices.forEach(x => x.removeAttribute('aria-disabled'));
      (choices.find(x => !x.classList.contains('is-tried')) || choices[0]).focus();
    });
  });

  /* ---------- Screen 13: Should You Chad? flowchart ---------- */

  (() => {
    const flow = $('[data-flow]');
    const steps = $$(':scope > li', flow);
    const summary = $('[data-flow-summary]');
    const resetRow = $('[data-flow-reset]');

    steps.forEach((li, i) => {
      if (i > 0) li.hidden = true;
      $$('[data-yn]', li).forEach(btn => btn.addEventListener('click', () => {
        const ans = btn.dataset.yn;
        $$('[data-yn]', li).forEach(x => x.setAttribute('aria-pressed', String(x === btn)));
        $$('[data-res]', li).forEach(r => { r.hidden = r.dataset.res !== ans; });
        const res = $(`[data-res="${ans}"]`, li);
        const isGo = res.classList.contains('go');
        li.classList.toggle('go', isGo);
        li.classList.toggle('stop', !isGo);
        li.dataset.answered = isGo ? 'go' : 'stop';

        const nextLi = steps[i + 1];
        if (!isGo && nextLi && !$('.keep-going', res)) {
          const p = document.createElement('p');
          p.className = 'keep-going caption';
          p.textContent = 'In real life, you’d stop here and fix this first. Keep going to see the rest of the flow.';
          res.appendChild(p);
        }
        let msg = res.textContent.trim();
        if (nextLi && nextLi.hidden) { show(nextLi); msg += ` Step ${i + 2} is now showing below.`; }

        const answered = steps.filter(x => x.dataset.answered);
        if (answered.length === steps.length) {
          const stops = steps.filter(x => x.dataset.answered === 'stop').length;
          summary.className = `feedback ${stops ? 'no' : 'ok'}`;
          summary.textContent = stops
            ? `${stops} of 5 steps said “not yet.” Sort those out before you prompt—or before you hit send.`
            : 'All five steps say go. Let’s Chad—proceed with confidence!';
          show(summary); show(resetRow);
          msg += ` ${summary.textContent}`;
        }
        announce(msg);
      }));
    });

    $('button', resetRow).addEventListener('click', () => {
      steps.forEach((li, i) => {
        delete li.dataset.answered;
        li.classList.remove('go', 'stop');
        $$('[data-yn]', li).forEach(x => x.setAttribute('aria-pressed', 'false'));
        $$('[data-res]', li).forEach(hide);
        if (i > 0) li.hidden = true;
      });
      hide(summary); hide(resetRow);
      $('[data-yn]', steps[0]).focus();
    });
  })();

  /* ---------- Screen 14: knowledge check ---------- */

  (() => {
    const qs = $$('[data-quiz] .quiz-q');
    const result = $('#quiz-result');
    const win = $('[data-role="quiz-win"]', result);
    const retry = $('[data-role="quiz-retry"]', result);

    qs.forEach((q, qi) => $$('.choice', q).forEach(btn => btn.addEventListener('click', () => {
      if (q.dataset.done) return;
      const ok = btn.hasAttribute('data-correct');
      q.dataset.done = ok ? 'right' : 'wrong';
      $$('.choice', q).forEach(x => x.setAttribute('aria-disabled', 'true'));
      btn.classList.add(ok ? 'is-right' : 'is-wrong');
      tag(btn, ok ? 'check' : 'x', ok ? 'Correct' : 'Your answer');
      if (!ok) {
        const c = $('[data-correct]', q);
        c.classList.add('is-right');
        tag(c, 'check', 'Best answer');
      }
      const fb = $('.feedback', q);
      fb.className = `feedback ${ok ? 'ok' : 'no'}`;
      fb.textContent = `${ok ? 'Correct!' : 'Not quite.'} ${q.dataset.explain}`;

      if (qs.every(x => x.dataset.done)) {
        const n = qs.filter(x => x.dataset.done === 'right').length;
        $('[data-score]', result).textContent =
          `Question ${qi + 1}: ${ok ? 'correct' : 'not quite'}. Your score: ${n} of ${qs.length}.`;
        show(result);
        const strong = n >= qs.length - 1;
        win.hidden = !strong;
        retry.hidden = strong;
        result.focus();
        if (strong && state.auto) speak(win);
      }
    })));

    $('[data-quiz-reset]', result).addEventListener('click', () => {
      stopNarration();
      qs.forEach(q => {
        delete q.dataset.done;
        $$('.choice', q).forEach(x => {
          x.removeAttribute('aria-disabled');
          x.classList.remove('is-right', 'is-wrong');
          tag(x, 'check', '');
          $('.tag', x).textContent = '';
        });
        const fb = $('.feedback', q); fb.className = 'feedback'; fb.textContent = '';
      });
      hide(result);
      $('.choice', qs[0]).focus();
    });
  })();

  /* ---------- Screen 15: commitments and reflection ---------- */

  const commits = $$('[data-commit] input');
  const reflection = $('#reflection');
  state.commit = state.commit || [];
  commits.forEach(cb => {
    cb.checked = state.commit.includes(cb.value);
    cb.addEventListener('change', () => {
      state.commit = commits.filter(x => x.checked).map(x => x.value);
      save();
    });
  });
  reflection.value = state.reflection || '';
  reflection.addEventListener('input', () => { state.reflection = reflection.value; save(); });

  /* ---------- Printable / downloadable checklist ---------- */

  const STEPS = [
    'Is the task suitable for ChatGPT? (routine, creative, or time-sensitive)',
    'Does it include confidential or personal info? If yes, stop: remove or anonymize it first.',
    'Do you have a clear goal and audience? Put both in your prompt.',
    'Will you review and refine the output? Fact-check, fix the tone, edit for brand fit.',
    'Does it meet company standards? Original, on-brand, boss-ready.'
  ];
  const REMEMBER = () => $$('#flow .remember li').map(li => li.textContent.trim());

  function sheetSections() {
    const sections = [
      { h: 'Should You Chad? Five questions before you prompt', items: STEPS, ordered: true },
      { h: 'When using ChatGPT at work, remember to:', items: REMEMBER() }
    ];
    if (state.commit && state.commit.length) sections.push({ h: 'My commitments', items: state.commit, checked: true });
    if (state.reflection && state.reflection.trim()) sections.push({ h: 'My reflection', text: state.reflection.trim() });
    return sections;
  }

  const esc = s => s.replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  $$('[data-print]').forEach(b => b.addEventListener('click', () => {
    const area = $('#print-area');
    area.innerHTML = '<h1>Responsible ChatGPT Use at Work: My Checklist</h1>' + sheetSections().map(s => {
      if (s.text) return `<h2>${esc(s.h)}</h2><p>${esc(s.text).replace(/\n/g, '<br>')}</p>`;
      const tagName = s.ordered ? 'ol' : 'ul';
      return `<h2>${esc(s.h)}</h2><${tagName}>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</${tagName}>`;
    }).join('');
    window.print();
  }));

  $$('[data-download]').forEach(b => b.addEventListener('click', () => {
    const lines = ['RESPONSIBLE CHATGPT USE AT WORK: MY CHECKLIST', ''];
    sheetSections().forEach(s => {
      lines.push(s.h.toUpperCase());
      if (s.text) lines.push(s.text);
      else s.items.forEach((item, i) => lines.push(`${s.ordered ? `${i + 1}.` : s.checked ? '[x]' : '[ ]'} ${item}`));
      lines.push('');
    });
    const blob = new Blob([lines.join('\r\n')], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'responsible-chatgpt-checklist.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    announce('Checklist downloaded.');
  }));

  /* ---------- Start ---------- */

  const resume = $('#resume');
  const saved = indexOfId(state.screen || '');
  const fromHash = indexOfId(location.hash.slice(1));
  if (fromHash >= 0) {
    go(fromHash, { push: false, focus: false, auto: false });
  } else {
    go(0, { push: false, focus: false, auto: false });
    if (saved > 0) {
      resume.textContent = `Pick up where you left off (screen ${saved + 1})`;
      show(resume);
      resume.addEventListener('click', () => go(saved));
    }
  }
})();
