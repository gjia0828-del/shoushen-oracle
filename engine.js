const TRADITIONS = {
  origin: '道教神系',
  stars: '星斗与岁时信仰',
  mountains: '山川与地方信仰',
  waters: '水域、航海与民间信仰',
  ward: '道教、民间与文学神格',
  fate: '文运与财神信仰',
  kinship: '家庭、姻缘与地方信仰',
  underworld: '佛教与幽冥信仰',
  wanderer: '道教散仙与民间传说',
  ancient: '上古神话与瑞兽传统'
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const LOW_DIMENSION_COPY = {
  break: '你很少允许自己毫无计划地闯一次，所以当生活突然失控时，你会比别人更想先抓住一个确定答案。',
  guard: '你不喜欢被规则和承诺绑住，但越是缺少稳定的边界，越容易在关系里用突然抽离来保护自己。',
  insight: '你更愿意相信当下的感受，而不是反复分析；可当情绪太复杂时，你也可能因为缺少解释而更加不安。',
  intuition: '你习惯用道理说服自己，却偶尔会在某个瞬间被直觉击中，才发现自己早已察觉到答案。',
  care: '你不是没有共情，而是不愿让照顾别人成为自己的默认职责；可当你真正在乎时，又会比谁都放不下。',
  independence: '你很容易进入关系，也很容易被关系占满；你真正需要练习的，是在靠近别人时仍然保留自己的中心。',
  control: '你不喜欢控制别人，也不喜欢被控制；但当局面完全失控时，你会发现自己比想象中更想拿回主导权。',
  shine: '你不一定想成为焦点，但被忽视时仍会失落。你需要的不是更多掌声，而是被重要的人准确看见。',
  stability: '你习惯在变化里保持敏捷，却不一定允许自己真正安定。你越不肯停下来，越容易在深夜感到疲惫。',
  obsession: '你懂得及时转身，却也可能因为太快放手，错过一个本来可以更深的关系。'
};

const TRIGGER_COPY = {
  control: '当对方含糊其辞、不回应，或者试图替你做决定时，你最容易从稳定切换到掌控。你真正害怕的不是分歧，而是自己在关系里失去位置。',
  care: '当你付出很多却被视为理所当然时，你最容易受伤。你嘴上可能说没关系，心里却会开始重新计算这段关系是否值得。',
  independence: '当关系要求你交出空间、随时报备，或把你的独立理解成不在乎时，你会本能地后退。你需要的是并肩，不是被收紧。',
  guard: '当承诺被轻易打破、边界被反复试探时，你会迅速变冷。你不是突然绝情，而是很久以前就已经给过提醒。',
  insight: '当对方说一套做一套时，你会立刻警觉。你难以接受的不是犯错，而是被当成看不懂的人。',
  intuition: '当关系里的气氛突然变了，而对方坚持说没事时，你会反复感受那些没有被说出口的部分。',
  break: '当关系变成消耗、争执或无法推进的僵局时，你会想直接掀开问题。你宁愿痛一次，也不愿长期困在含糊里。',
  shine: '当你真正想被看见的部分被忽略时，你会用更强烈的方式证明自己。你需要的不是更多观众，而是一个认真回应你的人。',
  stability: '当不确定性持续太久时，你会一边说没事，一边把所有风险都预演一遍。你需要一个能让节奏慢下来的人。',
  obsession: '当你认定一个人或一件事时，很难接受它没有结果。你最容易卡住的地方，不是开始，而是承认有些事已经结束。'
};

const GROWTH_COPY = {
  break: '练习在行动前多问一句：我是真的想改变，还是只是不想再感到无力。',
  guard: '练习把边界说清楚，而不是等到忍无可忍才一次性关门。',
  insight: '练习在分析之外多停留一会儿，让感受也有资格成为答案。',
  intuition: '练习相信那些还没有证据的直觉，但不要用猜测替代沟通。',
  care: '练习接受照顾，也练习在不牺牲自己的前提下继续爱别人。',
  independence: '练习在保持自我的同时，允许一个人真正靠近。',
  control: '练习把一部分决定权交出去，看看关系是否仍然安全。',
  shine: '练习在没有掌声的时候确认自己的价值，也允许自己偶尔不被看见。',
  stability: '练习停下来，不是停下来就代表你输了。',
  obsession: '练习分辨坚持和执念：前者让你生长，后者只让你反复疼痛。'
};

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function normalizedDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    const delta = (a[i] - b[i]) / 100;
    sum += delta * delta;
  }
  return Math.sqrt(sum / a.length);
}

function computeProfile(answers) {
  const raw = Object.fromEntries(DIMENSIONS.map(dimension => [dimension.key, 0]));

  answers.forEach((optionIndex, questionIndex) => {
    const option = QUESTIONS[questionIndex]?.options?.[optionIndex];
    if (!option) return;
    Object.entries(option.score).forEach(([key, value]) => {
      raw[key] = (raw[key] || 0) + value;
    });
  });

  const maxRaw = Math.max(1, ...Object.values(raw));
  const normalized = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, Math.round((value / maxRaw) * 100)])
  );

  return { raw, normalized };
}

function computeResult(answers) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    throw new Error(`需要完整的 ${QUESTIONS.length} 道答案`);
  }

  const profile = computeProfile(answers);
  const userVector = DIMENSIONS.map(dimension => profile.normalized[dimension.key]);
  const topKeys = [...DIMENSIONS]
    .sort((a, b) => profile.normalized[b.key] - profile.normalized[a.key])
    .slice(0, 3)
    .map(dimension => dimension.key);

  const ranked = GODS.map(god => {
    const godVector = god.vector.map(value => value * 20);
    const cosine = cosineSimilarity(userVector, godVector);
    const distance = normalizedDistance(userVector, godVector);
    const shapeScore = cosine * 0.72 + (1 - distance) * 0.28;
    const topAffinity = topKeys.reduce((sum, key, index) => {
      const dimensionIndex = DIMENSIONS.findIndex(dimension => dimension.key === key);
      const weight = index === 0 ? 0.5 : index === 1 ? 0.3 : 0.2;
      return sum + (god.vector[dimensionIndex] / 5) * weight;
    }, 0);
    return { god, score: shapeScore * 0.82 + topAffinity * 0.18, cosine };
  }).sort((a, b) => b.score - a.score || a.god.name.localeCompare(b.god.name, 'zh-CN'));

  const winner = ranked[0];
  const runnerUp = ranked[1];
  const margin = Math.max(0, winner.score - runnerUp.score);
  const resonance = clamp(Math.round(89 + winner.score * 5 + margin * 18), 90, 96);
  const affinities = [];
  for (const candidate of ranked.slice(1)) {
    if (candidate.god.group !== winner.god.group) affinities.push(candidate);
    if (affinities.length === 2) break;
  }

  const group = GROUPS[winner.god.group];
  const rankIndex = GODS.findIndex(god => god.id === winner.god.id);
  const topDimensions = topKeys.map(key => DIMENSIONS.find(dimension => dimension.key === key));
  const lowDimension = [...DIMENSIONS].sort((a, b) => profile.normalized[a.key] - profile.normalized[b.key])[0];
  const surfaceText = `别人最先感受到的，是你的「${topDimensions[0].label}」：${topDimensions[0].surface}。再靠近一点，会发现你也很擅长用「${topDimensions[1].label}」处理关系——${topDimensions[1].surface}。但这不是全部的你，真正驱动你的，往往要等到压力出现才会显形。`;
  const radarLead = `你最容易调动的是「${topDimensions[0].label}」与「${topDimensions[1].label}」，它们构成了你面对世界时最自然的姿势。相对的，「${lowDimension.label}」被你使用得最少，却常常藏着你在关系里最不愿意承认的需要。`;
  const relationKeys = ['control', 'care', 'independence', 'guard'];
  const triggerKey = relationKeys.sort((a, b) => profile.normalized[b] - profile.normalized[a])[0];
  const tensionText = `你最自然的姿态是「${topDimensions[0].label}」：${topDimensions[0].surface}。但「${lowDimension.label}」这一维被你压得很深。${LOW_DIMENSION_COPY[lowDimension.key]} 这不是缺陷，而是你为了维持强大，暂时没有让那一部分被看见。`;
  const triggerText = TRIGGER_COPY[triggerKey];
  const growthText = `${winner.god.misstep} ${GROWTH_COPY[lowDimension.key]} 你不需要变成另一个人，只需要让自己多一些可以不被防御占满的空间。`;
  const resemblanceText = `你和${winner.god.name}最像的，不是神话里的某一个动作，而是面对世界时同一种底层反应：${winner.god.essence} 在你的十维神格里，「${topDimensions[0].label}」与「${topDimensions[1].label}」最明显，所以你会本能地先用${topDimensions[0].label}进入局面，再用${topDimensions[1].label}确认自己是否安全。这也意味着，你越在意一件事，越容易把「${lowDimension.label}」藏起来。${winner.god.hit}`;
  const dimensionReadings = DIMENSIONS.map(dimension => {
    const value = profile.normalized[dimension.key];
    const level = value >= 78 ? 'high' : value >= 48 ? 'mid' : 'low';
    const levelLabel = level === 'high' ? '高能调用' : level === 'mid' ? '稳定可用' : '低频保护';
    return {
      dimension,
      value,
      displayValue: clamp(36 + Math.round(value * 0.6), 36, 96),
      level,
      levelLabel,
      reading: dimension[level]
    };
  });
  const archiveSections = [
    winner.god.intro,
    `${group.world} ${group.gift}`,
    `不过，这组神格也有它的阴影：${group.warning} 对${winner.god.name}来说，真正重要的不是永远维持强大，而是学会在需要的时候让力量换一种方式出现。`
  ];

  return {
    god: winner.god,
    affinities: affinities.map(item => ({ god: item.god, score: item.score })),
    rankIndex,
    resonance,
    profile,
    topDimensions,
    lowDimension,
    surfaceText,
    radarLead,
    tensionText,
    triggerText,
    growthText,
    resemblanceText,
    dimensionReadings,
    archiveSections,
    group,
    tradition: TRADITIONS[winner.god.group],
    shareCode: String(rankIndex + 1).padStart(3, '0')
  };
}

const GuardianEngine = {
  TRADITIONS,
  computeProfile,
  computeResult,
  cosineSimilarity,
  normalizedDistance
};

if (typeof window !== 'undefined') window.GuardianEngine = GuardianEngine;
if (typeof module !== 'undefined' && module.exports) module.exports = GuardianEngine;
