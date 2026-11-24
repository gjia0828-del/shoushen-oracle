const STORAGE_KEY = 'guardian-oracle-draft-v1';
const app = {
  answers: Array(QUESTIONS.length).fill(null),
  optionOrders: Array.from({ length: QUESTIONS.length }, () => [0, 1, 2, 3]),
  index: 0,
  result: null,
  animating: false,
  timer: null
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const screens = {
  landing: $('#landingScreen'),
  test: $('#testScreen'),
  result: $('#resultScreen')
};

function shuffle(values) {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function freshOrders() {
  return Array.from({ length: QUESTIONS.length }, () => shuffle([0, 1, 2, 3]));
}

function safeSave() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers: app.answers,
      optionOrders: app.optionOrders,
      index: app.index
    }));
  } catch (error) {
    // Browsers with disabled storage can still run the full test.
  }
}

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved.answers) || saved.answers.length !== QUESTIONS.length) return null;
    return saved;
  } catch (error) {
    return null;
  }
}

function clearSaved() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (error) { /* noop */ }
}

function isComplete() {
  return app.answers.every(answer => Number.isInteger(answer));
}

function updateResumeButton() {
  const saved = safeLoad();
  const button = $('#resumeButton');
  if (!saved) {
    button.hidden = true;
    return;
  }
  const complete = saved.answers.every(answer => Number.isInteger(answer));
  button.textContent = complete ? '查看上次神谕' : `继续神谕 ${saved.answers.filter(answer => Number.isInteger(answer)).length + 1} / ${QUESTIONS.length}`;
  button.hidden = false;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle('is-active', key === name);
  });
  $('#siteHeader').classList.toggle('on-inner', name !== 'landing');
  if (name === 'landing') {
    document.title = '守神司 · 测一测你的本命守护神';
    updateResumeButton();
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function resetTest() {
  clearTimeout(app.timer);
  app.answers = Array(QUESTIONS.length).fill(null);
  app.optionOrders = freshOrders();
  app.index = 0;
  app.result = null;
  app.animating = false;
  clearSaved();
}

function startTest() {
  resetTest();
  showScreen('test');
  renderQuestion();
}

function resumeTest() {
  const saved = safeLoad();
  if (!saved) {
    startTest();
    return;
  }
  app.answers = saved.answers;
  app.optionOrders = Array.isArray(saved.optionOrders) && saved.optionOrders.length === QUESTIONS.length
    ? saved.optionOrders
    : freshOrders();
  app.index = Math.min(saved.index || 0, QUESTIONS.length - 1);

  if (isComplete()) {
    finishTest();
    return;
  }

  const firstEmpty = app.answers.findIndex(answer => !Number.isInteger(answer));
  app.index = firstEmpty >= 0 ? firstEmpty : app.index;
  showScreen('test');
  renderQuestion();
}

function chapterIndex(chapter) {
  return Object.keys(CHAPTERS).indexOf(chapter) + 1;
}

function renderSteps() {
  const steps = $('#questionSteps');
  steps.innerHTML = QUESTIONS.map((_, index) => {
    const classes = ['question-step'];
    if (index < app.index) classes.push('is-done');
    if (index === app.index) classes.push('is-current');
    return `<span class="${classes.join(' ')}"></span>`;
  }).join('');
}

function renderQuestion() {
  const question = QUESTIONS[app.index];
  const chapter = CHAPTERS[question.chapter];
  const number = String(app.index + 1).padStart(2, '0');
  const act = ['第一幕', '第二幕', '第三幕', '第四幕'][chapterIndex(question.chapter) - 1];

  $('#chapterEnglish').textContent = chapter.english;
  $('#chapterTitle').textContent = chapter.label;
  $('#chapterHint').textContent = `${act} · ${chapter.copy}`;
  $('#questionNumber').textContent = number;
  $('#questionIndex').textContent = `ORACLE ${number}`;
  $('#questionTitle').textContent = question.title;
  $('#questionNote').textContent = question.note;
  $('#progressBar').style.width = `${((app.index + 1) / QUESTIONS.length) * 100}%`;
  $('#backButton').disabled = app.index === 0;
  renderSteps();

  const optionsGrid = $('#optionsGrid');
  optionsGrid.innerHTML = '';
  app.optionOrders[app.index].forEach((originalIndex, visualIndex) => {
    const option = question.options[originalIndex];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.dataset.optionIndex = String(originalIndex);
    button.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + visualIndex)}</span>
      <span class="option-text">${option.text}</span>
      <span class="option-arrow">↗</span>
    `;
    if (app.answers[app.index] === originalIndex) button.classList.add('is-selected');
    optionsGrid.appendChild(button);
  });

  const card = $('#questionCard');
  card.classList.remove('question-in');
  void card.offsetWidth;
  card.classList.add('question-in');
  safeSave();
}

function selectOption(optionIndex) {
  if (app.animating) return;
  app.answers[app.index] = optionIndex;
  safeSave();

  $$('.option-button').forEach(button => {
    button.classList.toggle('is-selected', Number(button.dataset.optionIndex) === optionIndex);
  });

  app.animating = true;
  app.timer = setTimeout(() => {
    app.animating = false;
    if (app.index < QUESTIONS.length - 1) {
      app.index += 1;
      renderQuestion();
    } else {
      finishTest();
    }
  }, 260);
}

function previousQuestion() {
  if (app.animating || app.index === 0) return;
  app.index -= 1;
  renderQuestion();
}

function finishTest() {
  clearTimeout(app.timer);
  app.animating = false;
  app.result = GuardianEngine.computeResult(app.answers);
  safeSave();
  renderResult(app.result);
  showScreen('result');
}

function setAccent(accent) {
  const rgb = accent.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!rgb) return;
  const values = [parseInt(rgb[1], 16), parseInt(rgb[2], 16), parseInt(rgb[3], 16)].join(', ');
  screens.result.style.setProperty('--accent', accent);
  screens.result.style.setProperty('--accent-rgb', values);
}

function renderRadar(result) {
  const size = 520;
  const center = size / 2;
  const radius = 160;
  const labelRadius = 218;
  const rings = 4;
  const values = DIMENSIONS.map(dimension => result.profile.normalized[dimension.key]);
  const pointsFor = scale => DIMENSIONS.map((_, index) => {
    const angle = (Math.PI * 2 * index) / DIMENSIONS.length - Math.PI / 2;
    return [center + Math.cos(angle) * radius * scale, center + Math.sin(angle) * radius * scale];
  });
  const polygon = points => points.map(point => point.join(',')).join(' ');
  const grid = Array.from({ length: rings }, (_, ringIndex) => {
    const scale = (ringIndex + 1) / rings;
    return `<polygon class="radar-grid" points="${polygon(pointsFor(scale))}" />`;
  }).join('');
  const axes = DIMENSIONS.map((_, index) => {
    const angle = (Math.PI * 2 * index) / DIMENSIONS.length - Math.PI / 2;
    return `<line class="radar-axis" x1="${center}" y1="${center}" x2="${center + Math.cos(angle) * radius}" y2="${center + Math.sin(angle) * radius}" />`;
  }).join('');
  const shapePoints = DIMENSIONS.map((dimension, index) => {
    const angle = (Math.PI * 2 * index) / DIMENSIONS.length - Math.PI / 2;
    const scale = Math.max(0.12, values[index] / 100);
    return [center + Math.cos(angle) * radius * scale, center + Math.sin(angle) * radius * scale];
  });
  const dots = shapePoints.map(point => `<circle class="radar-dot" cx="${point[0]}" cy="${point[1]}" r="3.2" />`).join('');
  const labels = DIMENSIONS.map((dimension, index) => {
    const angle = (Math.PI * 2 * index) / DIMENSIONS.length - Math.PI / 2;
    const x = center + Math.cos(angle) * labelRadius;
    const y = center + Math.sin(angle) * labelRadius;
    const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
    return `<text class="radar-label" x="${x}" y="${y + 4}" text-anchor="${anchor}">${dimension.label}</text>`;
  }).join('');

  $('#resultRadar').innerHTML = `
    <svg class="radar-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="十维神格图">
      ${grid}${axes}
      <polygon class="radar-shape" points="${polygon(shapePoints)}" />
      ${dots}${labels}
    </svg>
  `;
}

function renderResult(result) {
  const god = result.god;
  const group = result.group;
  setAccent(group.accent);
  document.title = `${god.name} · ${god.title}｜我的本命守护神`;

  $('#resultCode').textContent = `GUARDIAN NO. ${result.shareCode}`;
  $('#resultGroup').textContent = `${group.name} · ${group.subtitle}`;
  $('#resultTradition').textContent = `${result.tradition} · 神格共鸣 ${result.resonance}%`;
  $('#godName').textContent = god.name;
  $('#godTitle').textContent = god.title;
  $('#godEssence').textContent = god.essence;
  $('#resemblanceText').textContent = result.resemblanceText;
  $('#godKeywords').innerHTML = result.topDimensions.map(dimension => `<span>${dimension.label} · ${dimension.description}</span>`).join('');
  $('#resultWatermark').textContent = god.glyph;
  $('#matchNumber').textContent = result.resonance;
  $('#matchLine').style.width = '0';
  requestAnimationFrame(() => { $('#matchLine').style.width = `${result.resonance}%`; });

  renderRadar(result);
  $('#radarLead').textContent = result.radarLead;
  $('#topDims').innerHTML = result.topDimensions.map((dimension, index) => `
    <div class="top-dim">
      <b>0${index + 1}</b>
      <strong>${dimension.label}</strong>
      <span>${dimension.surface}</span>
    </div>
  `).join('');
  $('#dimensionDetails').innerHTML = result.dimensionReadings.map((item, index) => `
    <article class="dimension-card">
      <div class="dimension-card-top">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <div><h3>${item.dimension.label}</h3><small>${item.dimension.english}</small></div>
        <b>${item.displayValue}</b>
      </div>
      <p class="dimension-meaning">${item.dimension.meaning}</p>
      <div class="dimension-meter"><i style="width:${item.displayValue}%"></i></div>
      <div class="dimension-level"><span>${item.levelLabel}</span><small>${item.dimension.description}</small></div>
      <p class="dimension-reading">${item.reading}</p>
    </article>
  `).join('');
  $('#surfaceText').textContent = result.surfaceText;
  $('#coreText').textContent = god.essence;
  $('#shadowText').textContent = god.shadow;
  $('#tensionText').textContent = result.tensionText;
  $('#triggerText').textContent = result.triggerText;
  $('#growthText').textContent = result.growthText;
  $('#relationText').textContent = god.relation;
  $('#pressureText').textContent = god.pressure;
  $('#misstepText').textContent = god.misstep;
  $('#godQuote').textContent = `“${god.quote}”`;
  $('#hitText').textContent = god.hit;
  $('#archiveSeal').textContent = god.glyph;
  $('#archiveName').textContent = `${god.name} · ${god.title}`;
  $('#introText').innerHTML = result.archiveSections.map(section => `<p>${section}</p>`).join('');
  $('#sourceText').textContent = result.tradition;
  $('#groupEnglish').textContent = group.english;

  $('#affinityGrid').innerHTML = result.affinities.map(item => `
    <article class="affinity-card">
      <div class="affinity-glyph">${item.god.glyph}</div>
      <div><h3>${item.god.name}</h3><p>${item.god.title} · ${GROUPS[item.god.group].name}</p></div>
      <span>SAME FREQUENCY ↗</span>
    </article>
  `).join('');

  $('#previewCode').textContent = `NO. ${result.shareCode}`;
  $('#previewGlyph').textContent = god.glyph;
  $('#previewName').textContent = god.name;
  $('#previewTitle').textContent = god.title;
  $('#previewQuote').textContent = `“${god.quote}”`;
  $('#sharePreview').style.setProperty('--accent', group.accent);
  $('#sharePreview').style.setProperty('--accent-rgb', screens.result.style.getPropertyValue('--accent-rgb'));
  $('#resultHero').style.setProperty('--accent', group.accent);
  $('#resultHero').style.setProperty('--accent-rgb', screens.result.style.getPropertyValue('--accent-rgb'));
}

function shareText(result = app.result) {
  if (!result) return '';
  const god = result.god;
  return `我的本命守护神是【${god.name} · ${god.title}】\n\n${god.quote}\n\n${god.essence}\n\n神格共鸣 ${result.resonance}%｜${result.group.name}\n24 道神谕，从 100 位中国神明中照见自己。\n#本命守护神 #人格测试 #中国神话 #心理测试`;
}

async function copyShareText() {
  const text = shareText();
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
  showToast('分享文案已复制');
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const chars = [...text];
  let line = '';
  let lines = 0;
  for (let index = 0; index < chars.length; index += 1) {
    const test = line + chars[index];
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      line = chars[index];
      lines += 1;
      if (lines >= maxLines - 1) {
        const rest = chars.slice(index).join('');
        let finalLine = rest;
        while (ctx.measureText(finalLine + '…').width > maxWidth && finalLine.length) finalLine = finalLine.slice(0, -1);
        ctx.fillText(finalLine === rest ? finalLine : finalLine + '…', x, y + lines * lineHeight);
        return;
      }
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y + lines * lineHeight);
}

function downloadShareCard() {
  if (!app.result) return;
  const result = app.result;
  const god = result.god;
  const group = result.group;
  const canvas = $('#shareCanvas');
  const ctx = canvas.getContext('2d');
  const accent = group.accent;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const bg = ctx.createLinearGradient(0, 0, 1080, 1440);
  bg.addColorStop(0, '#fffaf1');
  bg.addColorStop(0.52, '#f7efe2');
  bg.addColorStop(1, '#e9dcc7');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1080, 1440);

  const glow = ctx.createRadialGradient(540, 440, 20, 540, 440, 610);
  glow.addColorStop(0, `${accent}32`);
  glow.addColorStop(0.45, `${accent}10`);
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1080, 1000);

  ctx.strokeStyle = 'rgba(73,53,31,0.16)';
  ctx.lineWidth = 2;
  ctx.strokeRect(46, 46, 988, 1348);
  ctx.strokeStyle = 'rgba(73,53,31,0.08)';
  ctx.strokeRect(64, 64, 952, 1312);

  ctx.fillStyle = '#82725f';
  ctx.font = '22px "SFMono-Regular", Menlo, monospace';
  ctx.textAlign = 'left';
  ctx.fillText('守神司 · GUARDIAN ARCHIVE', 92, 116);
  ctx.textAlign = 'right';
  ctx.fillStyle = accent;
  ctx.fillText(`NO. ${result.shareCode}`, 988, 116);

  ctx.strokeStyle = `${accent}88`;
  ctx.lineWidth = 2;
  roundRect(ctx, 380, 210, 320, 320, 4);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(73,53,31,0.1)';
  roundRect(ctx, 397, 227, 286, 286, 2);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = accent;
  ctx.font = '190px "Songti SC", "STSong", serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(god.glyph, 540, 371);

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#262119';
  ctx.font = '88px "Songti SC", "STSong", serif';
  ctx.fillText(god.name, 540, 650);

  ctx.fillStyle = accent;
  ctx.font = '34px "Songti SC", "STSong", serif';
  ctx.fillText(god.title, 540, 708);

  ctx.fillStyle = '#5f5243';
  ctx.font = '31px "Songti SC", "STSong", serif';
  wrapCanvasText(ctx, `“${god.quote}”`, 540, 850, 760, 52, 3);

  ctx.strokeStyle = 'rgba(73,53,31,0.16)';
  ctx.beginPath();
  ctx.moveTo(170, 1118);
  ctx.lineTo(910, 1118);
  ctx.stroke();

  ctx.fillStyle = '#7d6d59';
  ctx.font = '22px "PingFang SC", sans-serif';
  ctx.fillText(`${result.tradition} · 神格共鸣 ${result.resonance}%`, 540, 1182);
  ctx.fillStyle = accent;
  ctx.font = '25px "Songti SC", "STSong", serif';
  ctx.fillText('24 道神谕 · 100 位中国神明', 540, 1240);
  ctx.fillStyle = '#9a8a76';
  ctx.font = '18px "SFMono-Regular", Menlo, monospace';
  ctx.fillText('YOUR UNSEEN POWER HAS ALWAYS HAD A NAME.', 540, 1318);

  const link = document.createElement('a');
  link.download = `本命守护神-${god.name}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('神谕卡已保存');
}

let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function handleAction(action) {
  if (action === 'start') startTest();
  if (action === 'resume') resumeTest();
  if (action === 'home') showScreen('landing');
  if (action === 'back') previousQuestion();
  if (action === 'restart') startTest();
  if (action === 'download') downloadShareCard();
  if (action === 'copy') copyShareText();
}

$$('[data-action]').forEach(button => {
  button.addEventListener('click', event => {
    const action = event.currentTarget.dataset.action;
    handleAction(action);
  });
});

$('#optionsGrid').addEventListener('click', event => {
  const button = event.target.closest('.option-button');
  if (!button) return;
  selectOption(Number(button.dataset.optionIndex));
});

window.addEventListener('scroll', () => {
  $('#siteHeader').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

document.addEventListener('keydown', event => {
  if (!screens.test.classList.contains('is-active') || app.animating) return;
  const key = event.key.toUpperCase();
  const visualIndex = ['A', 'B', 'C', 'D'].indexOf(key);
  if (visualIndex >= 0) selectOption(app.optionOrders[app.index][visualIndex]);
  if (event.key === 'ArrowLeft') previousQuestion();
});

updateResumeButton();
