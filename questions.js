const DIMENSIONS = [
  {
    key: 'break', label: '破阵', english: 'BREAK', description: '改写局面的行动力',
    surface: '敢先动，也敢把死局重新打开',
    meaning: '你主动打破惯性、承担风险并把局面重新打开的能力。它不是单纯的冲动，而是当所有人都停在原地时，你愿意先迈出那一步。',
    high: '你很可能是那个先行动的人。面对僵局，你不太依赖许可，更相信试出来的答案。你的存在会推动事情发生，但有时也可能快过别人的心理准备。',
    mid: '你有破局能力，但不会为破而破。你会先判断局势是否值得出手，在必要时也能承担不确定性，通常能兼顾行动和分寸。',
    low: '你更重视稳定与可预期，不喜欢在信息不足时贸然行动。这不是胆小，而是你更愿意通过观察、积累和等待来降低代价。'
  },
  {
    key: 'guard', label: '镇守', english: 'GUARD', description: '责任、秩序与边界',
    surface: '可靠、有底线，关键时刻不会消失',
    meaning: '你承担承诺、维护边界并保护重要事物的能力。它决定你在关系、团队和危机中，是那个会留下、会负责、会把门守住的人。',
    high: '你对责任非常敏感，答应的事会放在心上。别人容易把你当成靠山，但你也可能把太多重量自动揽到自己身上，忘了责任本来应该被分配。',
    mid: '你有清晰的底线，也愿意承担应尽的责任。你通常不会逃避，但也不会无条件替所有人兜底，能在守护和自我保护之间保持平衡。',
    low: '你不太愿意被承诺和规则束缚，更看重当下的自由和真实感受。你可能对僵化秩序过敏，但也需要留意，过度抽离会让别人难以确认你的立场。'
  },
  {
    key: 'insight', label: '观微', english: 'INSIGHT', description: '理性辨识与洞察',
    surface: '清醒、敏锐，习惯先看清再行动',
    meaning: '你观察细节、拆解动机、识别模式和判断风险的能力。它让你不轻易被表面叙事带走，也让你更容易看见一件事真正的结构。',
    high: '你很难被骗过。你会听一句话背后的动机，也会从细节里还原全局。清醒是你的保护，但知道太多时，你也容易对人性保持过度警惕。',
    mid: '你有不错的分析力，但不会把所有事情都变成推理题。你能在需要时保持清醒，也允许自己凭感受和信任做一部分决定。',
    low: '你更相信体验、直觉和当下的连接，而不是反复分析。你可能因此活得更轻盈，但也需要在重大选择前给自己留出确认事实的时间。'
  },
  {
    key: 'intuition', label: '通灵', english: 'INTUITION', description: '直觉、感受与氛围捕捉',
    surface: '能感知别人没说出口的情绪与暗流',
    meaning: '你感知气氛、情绪暗流和未说出口信息的能力。它不依赖证据，而是来自你对细微变化的敏锐接收，像一根无形的天线。',
    high: '你经常在别人开口前就知道气氛变了。你的直觉很强，也很容易吸收环境里的情绪。你需要学会分辨：哪些感受属于你，哪些只是你替别人接住的。',
    mid: '你能感受到关系和环境的细微变化，但不会被每一次波动带走。你的直觉通常能给你提示，同时你也会用现实信息进行校验。',
    low: '你更依赖明确表达和可验证的信息，不太喜欢靠猜。你会显得直接、稳定，但有时也可能错过别人没有说出口的求助。'
  },
  {
    key: 'care', label: '渡人', english: 'CARE', description: '共情、照顾与关系连接',
    surface: '温柔、能接住人，是很多人的安全区',
    meaning: '你理解、照顾并接住他人的能力。它让你能进入别人的情绪世界，也让你在关系里愿意给出时间、耐心和实际的帮助。',
    high: '你很容易成为别人的安全区。你愿意听、愿意帮，也能在别人崩掉时保持温柔。但你需要警惕：被需要不等于被爱，照顾别人也不该以耗尽自己为代价。',
    mid: '你有共情力，也保有自己的边界。你愿意帮助重要的人，但不会把所有关系都变成自己的责任，能在关心和自保之间切换。',
    low: '你不喜欢被情绪绑架，也更重视独立和效率。你并非没有感情，只是不习惯用照顾来表达爱。你需要让重要的人知道，你的在乎通常藏在行动里。'
  },
  {
    key: 'independence', label: '自守', english: 'SOVEREIGN', description: '独立、距离与自我完整',
    surface: '有清晰的精神领地，不轻易被定义',
    meaning: '你保持自我完整、守住心理空间和不过度依附他人的能力。它让你在关系里仍有自己的中心，也让你不容易被环境吞没。',
    high: '你非常需要自己的空间，也有很强的自我边界。你能够在孤独里恢复，但别人可能误以为你不需要任何人。你真正要练习的，是在独立中允许靠近。',
    mid: '你有自己的精神领地，也能进入关系。你不会轻易失去自己，通常能在独处和亲密之间找到相对舒服的距离。',
    low: '你更愿意和重要的人保持紧密连接，关系会显著影响你的情绪和选择。你重视陪伴，但需要留意不要把对方的态度当成自己价值的唯一来源。'
  },
  {
    key: 'control', label: '掌局', english: 'CONTROL', description: '主导、掌控与领导',
    surface: '有掌控力，习惯为局面定方向',
    meaning: '你主导局面、做决定并承担领导责任的能力。它让你在不确定中倾向于建立方向感，也让你更难接受被动和失控。',
    high: '你习惯把方向盘握在手里。你决策快、责任感强，但也可能在焦虑时过度控制，把别人的参与理解成不确定因素。',
    mid: '你愿意在需要时主导，但不执着于控制一切。你能接住责任，也愿意让别人参与，通常知道什么时候该出手、什么时候该放手。',
    low: '你不太喜欢控制别人，也不愿意被控制。你更相信自然流动和彼此自愿，但遇到需要明确决策的局面时，可能需要更主动地表达立场。'
  },
  {
    key: 'shine', label: '显曜', english: 'RADIANCE', description: '表达、影响与存在感',
    surface: '有鲜明的存在感，能让人看见你的能量',
    meaning: '你表达自己、影响他人并被看见的能力。它不一定等于爱出风头，而是你的能量是否愿意走到台前，被世界准确地接收。',
    high: '你有很强的存在感，容易成为气氛的中心。你愿意表达，也有能力让事情被看见。但你需要留意：被关注能带来能量，却不应该成为自我价值的唯一来源。',
    mid: '你能自在地表达自己，但不需要时刻站在中心。你知道什么时候该发光，也能在别人的高光里退后一步。',
    low: '你不太需要成为焦点，更愿意把能量放在具体的行动和关系里。你可能不喜欢表演，但需要确保自己的真实需要也被看见。'
  },
  {
    key: 'stability', label: '定海', english: 'STILLNESS', description: '稳定、耐力与复原能力',
    surface: '稳、能扛，也习惯独自消化风浪',
    meaning: '你在压力中保持稳定、持续忍耐并从低谷恢复的能力。它让你不容易被一时情绪带走，也让你在混乱里成为能撑住的人。',
    high: '你很能扛，也擅长在风浪里保持表面平静。你常把情绪自己消化，但稳定不等于没有痛。你需要允许自己在安全的人面前不那么稳。',
    mid: '你有稳定的底盘，也有正常的波动。你能在压力里维持基本秩序，同时不会把所有情绪都压成沉默，恢复力相对健康。',
    low: '你对变化和情绪更敏感，不太喜欢长期压抑。你可能更容易被波动影响，但也因此更能及时感知问题，不必等到彻底崩掉才处理。'
  },
  {
    key: 'obsession', label: '执念', english: 'DEVOTION', description: '坚持、目标与不肯放下',
    surface: '认定的事很难放手，有一种不肯认输的劲',
    meaning: '你坚持目标、投入长期感情并不肯轻易放手的能力。它既能让你穿过别人放弃的地方，也可能让你困在一个早已没有回应的故事里。',
    high: '你一旦认真就很难放下。你的坚持能创造奇迹，但也会让你在明知无解时继续消耗。你需要分辨：这是值得的长期主义，还是不愿承认失去。',
    mid: '你有坚持，也懂得止损。你会为重要的事投入，但不会把所有人生都押在一个结果上，通常能在执着和放手之间找到余地。',
    low: '你更愿意接受变化和结束，不喜欢在一件事上反复消耗。你恢复得快，但也可能因为太快转身，错过一些需要时间才会出现的关系和答案。'
  }
];

const CHAPTERS = {
  self: { label: '自我与世界', english: 'FIRST REFLEX', copy: '看你在没有被安排的时候，如何回应世界。' },
  bond: { label: '关系与边界', english: 'THE BOND', copy: '看你怎么靠近、怎么撤退，又怎么守住自己。' },
  shadow: { label: '压力与暗面', english: 'THE SHADOW', copy: '看你崩下去时，会变成谁，又会怎样回来。' },
  oath: { label: '欲望与命运', english: 'THE OATH', copy: '看你真正想守住什么，又拒绝成为什么。' }
};

const QUESTIONS = [
  {
    chapter: 'self',
    title: '你走进一个所有人都在等别人开口的房间。你会先做什么？',
    note: '没有人在看你，但空气里已经有一点点僵。',
    options: [
      { text: '直接开口，把方向定下来', score: { control: 2, break: 1, shine: 1 } },
      { text: '观察谁最焦虑、谁最有话语权', score: { insight: 2, intuition: 1, control: 1 } },
      { text: '私下问最安静的人发生了什么', score: { care: 2, intuition: 1, independence: 1 } },
      { text: '不急着动，等局势自己浮出来', score: { stability: 2, independence: 1, insight: 1 } }
    ]
  },
  {
    chapter: 'self',
    title: '你做了一个重要决定，但没有人支持你。你更可能？',
    note: '你不是没有犹豫，只是没有把犹豫给别人看。',
    options: [
      { text: '立刻做给他们看', score: { break: 2, shine: 1, obsession: 1 } },
      { text: '重新检验自己的判断', score: { insight: 2, stability: 2 } },
      { text: '找一个真正懂你的人商量', score: { care: 2, intuition: 1 } },
      { text: '保留决定，但不再解释', score: { independence: 2, stability: 1, obsession: 1 } }
    ]
  },
  {
    chapter: 'self',
    title: '如果只能使用一次神力，你会用它来？',
    note: '只能改变一件事。你最舍不得的，会先浮出来。',
    options: [
      { text: '改写一个已经无法挽回的决定', score: { obsession: 2, break: 1 } },
      { text: '看清一个你始终看不懂的人', score: { insight: 2, intuition: 1 } },
      { text: '保护一个你害怕失去的人', score: { care: 2, guard: 1 } },
      { text: '让自己彻底安静一天', score: { stability: 2, independence: 1 } }
    ]
  },
  {
    chapter: 'self',
    title: '如果你的人生是一部神话，开场最像？',
    note: '不是你想成为谁，而是你已经带着怎样的命运感活着。',
    options: [
      { text: '天生反骨，大闹一场', score: { break: 2, shine: 1, obsession: 1 } },
      { text: '跌入谷底，死而复生', score: { obsession: 2, stability: 1, break: 1 } },
      { text: '一直在等一个使命', score: { guard: 2, intuition: 1, care: 1 } },
      { text: '表面平静，暗潮汹涌', score: { intuition: 2, insight: 1, independence: 1 } }
    ]
  },
  {
    chapter: 'self',
    title: '面对一个你不认同、但暂时无法改变的环境，你会？',
    note: '反抗、适应、保护别人，或者保护自己。你会先选哪一个？',
    options: [
      { text: '表面遵守，暗中寻找突破口', score: { insight: 2, control: 1, stability: 1 } },
      { text: '直接对抗，哪怕代价很大', score: { break: 2, guard: 1, shine: 1 } },
      { text: '先保护身边的人不受影响', score: { care: 2, guard: 1 } },
      { text: '把自己抽离，保留内心自由', score: { independence: 2, stability: 1, intuition: 1 } }
    ]
  },
  {
    chapter: 'self',
    title: '别人第一次见你，最可能误会你什么？',
    note: '误会往往不是因为你装，而是因为你最外层的那层保护太明显。',
    options: [
      { text: '以为你什么都不在乎', score: { independence: 2, stability: 1, insight: 1 } },
      { text: '以为你很好说话', score: { care: 2, guard: 1, intuition: 1 } },
      { text: '以为你没有野心', score: { control: 2, obsession: 1, stability: 1 } },
      { text: '以为你永远不会累', score: { guard: 2, care: 1, stability: 1 } }
    ]
  },
  {
    chapter: 'bond',
    title: '在一段亲密关系里，你最害怕失去什么？',
    note: '你最想守住的，往往也是你最容易过度保护的东西。',
    options: [
      { text: '自由', score: { independence: 2, break: 1 } },
      { text: '控制权', score: { control: 2, guard: 1 } },
      { text: '连接', score: { care: 2, intuition: 1 } },
      { text: '自我', score: { independence: 1, obsession: 1, stability: 1 } }
    ]
  },
  {
    chapter: 'bond',
    title: '你在乎的人对你说：“我不需要你了。”你会？',
    note: '这句话可能不是结束，也可能不是真的。你第一反应是什么？',
    options: [
      { text: '尊重对方，并退出', score: { independence: 2, guard: 1 } },
      { text: '问清楚到底发生了什么', score: { insight: 2, care: 1 } },
      { text: '表面接受，心里重新评估关系', score: { control: 1, stability: 1, independence: 1 } },
      { text: '仍然在暗处确保对方没事', score: { care: 2, obsession: 1, guard: 1 } }
    ]
  },
  {
    chapter: 'bond',
    title: '你发现朋友在利用你的善良。你会？',
    note: '你不是没有察觉，只是一直在决定要不要拆穿。',
    options: [
      { text: '直接拆掉这层关系', score: { guard: 2, break: 1 } },
      { text: '继续观察，看他能走多远', score: { insight: 2, stability: 1 } },
      { text: '提醒对方一次，再给一次机会', score: { care: 2, guard: 1 } },
      { text: '不戳破，但从此不再付出', score: { independence: 2, guard: 1 } }
    ]
  },
  {
    chapter: 'bond',
    title: '如果必须在一个团队里扮演角色，你会选？',
    note: '不是你能做什么，而是你最自然地会站到哪里。',
    options: [
      { text: '做决定的人', score: { control: 2, break: 1, shine: 1 } },
      { text: '看穿问题的人', score: { insight: 2, guard: 1 } },
      { text: '托住所有人的人', score: { care: 2, guard: 1, stability: 1 } },
      { text: '随时能离开的人', score: { independence: 2, intuition: 1, break: 1 } }
    ]
  },
  {
    chapter: 'bond',
    title: '有人试图控制你。你的第一反应是？',
    note: '你的边界是被触碰时，才会真正显形。',
    options: [
      { text: '立刻反抗', score: { break: 2, guard: 1 } },
      { text: '先判断对方的真实目的', score: { insight: 2, control: 1 } },
      { text: '表面顺着，心里划清界限', score: { stability: 2, insight: 1, independence: 1 } },
      { text: '直接离开，不浪费解释', score: { independence: 2, guard: 1, break: 1 } }
    ]
  },
  {
    chapter: 'bond',
    title: '当你真正信任一个人，你会？',
    note: '信任不是一句“我信你”，而是你愿意交出什么。',
    options: [
      { text: '把一部分决定权交给他', score: { care: 1, control: 1, guard: 1 } },
      { text: '把自己的秘密告诉他', score: { care: 1, intuition: 1, independence: 1 } },
      { text: '在关键时刻替对方挡事', score: { guard: 2, care: 1, obsession: 1 } },
      { text: '允许他看见你不完美的一面', score: { independence: 1, care: 2, intuition: 1 } }
    ]
  },
  {
    chapter: 'shadow',
    title: '你跌到人生最低谷时，最可能？',
    note: '低谷不会改变你，它只会把你原本的应对方式放大。',
    options: [
      { text: '咬牙反击', score: { break: 2, obsession: 1 } },
      { text: '彻底消失一段时间', score: { independence: 2, stability: 1 } },
      { text: '抓住一个人不放手', score: { care: 2, obsession: 1 } },
      { text: '靠秩序和习惯撑过去', score: { guard: 2, stability: 2 } }
    ]
  },
  {
    chapter: 'shadow',
    title: '你明知道自己该停下来，却还是继续，通常是因为？',
    note: '那个让你停不下来的理由，比目标更接近你的内核。',
    options: [
      { text: '不甘心', score: { obsession: 2, break: 1 } },
      { text: '怕失去现在的位置', score: { control: 2, guard: 1 } },
      { text: '有人还在等你', score: { care: 2, obsession: 1 } },
      { text: '停下后不知道该面对什么', score: { intuition: 2, stability: 1 } }
    ]
  },
  {
    chapter: 'shadow',
    title: '你最常用来保护自己的方式是？',
    note: '你受伤时最先拿出来的，不一定是武器，也可能是角色。',
    options: [
      { text: '攻击', score: { break: 2, guard: 1 } },
      { text: '沉默', score: { independence: 2, stability: 1 } },
      { text: '幽默', score: { intuition: 2, shine: 1, insight: 1 } },
      { text: '照顾别人', score: { care: 2, guard: 1 } }
    ]
  },
  {
    chapter: 'shadow',
    title: '当你的努力没有得到回报，你会？',
    note: '没有得到回应时，你如何对待自己，比结果本身更重要。',
    options: [
      { text: '加倍证明自己', score: { obsession: 2, shine: 1 } },
      { text: '复盘规则到底出了什么问题', score: { insight: 2, guard: 1 } },
      { text: '怀疑自己是不是不够好', score: { care: 1, intuition: 1, stability: 1 } },
      { text: '收回投入，及时止损', score: { independence: 2, stability: 1, break: 1 } }
    ]
  },
  {
    chapter: 'shadow',
    title: '你被别人伤得最深，通常是因为？',
    note: '同样的行为，别人可能无所谓，但正好击中了你的命门。',
    options: [
      { text: '对方挑战了你的尊严', score: { guard: 2, control: 1 } },
      { text: '对方辜负了你的信任', score: { care: 2, intuition: 1 } },
      { text: '对方否定了你的付出', score: { care: 2, obsession: 1 } },
      { text: '对方看见了你的脆弱', score: { independence: 2, intuition: 1 } }
    ]
  },
  {
    chapter: 'shadow',
    title: '如果你突然拥有绝对权力，你最想？',
    note: '权力不会凭空创造你，它只会放大你本来最在意的东西。',
    options: [
      { text: '重建规则', score: { control: 2, guard: 1, break: 1 } },
      { text: '保护弱者', score: { care: 2, guard: 1 } },
      { text: '清除背叛者', score: { guard: 2, control: 1, obsession: 1 } },
      { text: '证明自己不可替代', score: { shine: 2, control: 1, obsession: 1 } }
    ]
  },
  {
    chapter: 'oath',
    title: '你最不愿意成为哪种人？',
    note: '你排斥的东西，往往也定义了你真正想守住的东西。',
    options: [
      { text: '被人安排的人', score: { independence: 2, break: 1 } },
      { text: '毫无影响力的人', score: { shine: 2, control: 1 } },
      { text: '伤害别人却不自知的人', score: { care: 2, guard: 1 } },
      { text: '永远在证明自己的人', score: { obsession: 1, shine: 1, stability: 1 } }
    ]
  },
  {
    chapter: 'oath',
    title: '守护神告诉你：“你这一生最重要的功课，是学会放手。”你会？',
    note: '你第一反应里的抗拒，可能就是你一直抓着的那个东西。',
    options: [
      { text: '不服，想证明命运错了', score: { break: 2, obsession: 2 } },
      { text: '问清楚到底该放下什么', score: { insight: 2, control: 1 } },
      { text: '先想到自己会失去谁', score: { care: 2, intuition: 1 } },
      { text: '沉默很久，因为你已经知道答案', score: { stability: 2, intuition: 1, obsession: 1 } }
    ]
  },
  {
    chapter: 'oath',
    title: '你更相信哪一种命运观？',
    note: '你如何理解命运，也会决定你如何做选择。',
    options: [
      { text: '命运会被人的选择改写', score: { break: 2, control: 1 } },
      { text: '万事都有因果和规则', score: { guard: 2, insight: 2 } },
      { text: '人与人的连接会改变命运', score: { care: 2, intuition: 1 } },
      { text: '直觉比道理更早抵达真相', score: { intuition: 2, insight: 1 } }
    ]
  },
  {
    chapter: 'oath',
    title: '你心里的“神性”是什么？',
    note: '不是神的样子，而是你最愿意相信的那种力量。',
    options: [
      { text: '敢改变别人不敢改变的东西', score: { break: 2, shine: 1 } },
      { text: '看穿真相后依然守住底线', score: { guard: 2, insight: 1, stability: 1 } },
      { text: '明知会受伤也愿意去爱', score: { care: 2, intuition: 1 } },
      { text: '在混乱里不被吞没', score: { stability: 2, independence: 1 } }
    ]
  },
  {
    chapter: 'oath',
    title: '你还欠自己一个怎样的答案？',
    note: '有些问题，你已经问了自己很多年。',
    options: [
      { text: '我到底想要什么', score: { independence: 1, insight: 1, break: 1 } },
      { text: '我为什么不能输', score: { control: 1, obsession: 2 } },
      { text: '我值不值得被爱', score: { care: 2, intuition: 1 } },
      { text: '我什么时候才算够好', score: { stability: 1, shine: 1, guard: 1 } }
    ]
  },
  {
    chapter: 'oath',
    title: '如果你可以继承一位神明的某一种“缺陷”，你会选？',
    note: '最后选中的，往往不是缺陷，而是你愿意为它付出代价的天赋。',
    options: [
      { text: '太骄傲，所以永不低头', score: { control: 1, shine: 2, guard: 1 } },
      { text: '太执着，所以不肯放手', score: { obsession: 2, break: 1 } },
      { text: '太心软，所以总被辜负', score: { care: 2, intuition: 1 } },
      { text: '太孤独，所以必须成为自己的光', score: { independence: 2, stability: 1, shine: 1 } }
    ]
  }
];

if (QUESTIONS.length !== 24) throw new Error('题目数量必须为24');
if (new Set(QUESTIONS.map(q => q.title)).size !== 24) throw new Error('题目不可重复');

window.DIMENSIONS = DIMENSIONS;
window.CHAPTERS = CHAPTERS;
window.QUESTIONS = QUESTIONS;
