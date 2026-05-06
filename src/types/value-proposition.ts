export type ValueId = 
  | 'traffic-growth'
  | 'lead-conversion'
  | 'service-efficiency'
  | 'content-compliance'
  | 'global-expansion';

export type ValueCategory = 'growth' | 'conversion' | 'service' | 'compliance' | 'expansion';

export interface ValueProposition {
  id: ValueId;
  category: ValueCategory;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  painPoint: string;
  beforeState: string;
  afterState: string;
  quantifiedValue: string;
  targetCustomer: string;
  metrics: {
    name: string;
    value: string;
    target: string;
    before: string;
    improvement: string;
  }[];
  capabilities: {
    agentId: string;
    agentName: string;
    agentIcon: string;
    contribution: string;
    subAgents: string[];
  }[];
  pricing: {
    name: string;
    price: string;
    period: string;
    description: string;
    included: string[];
  };
  enabled: boolean;
}

export const VALUE_PROPOSITIONS: ValueProposition[] = [
  {
    id: 'traffic-growth',
    category: 'growth',
    name: '流量增长',
    icon: '📈',
    color: 'from-purple-500 to-indigo-600',
    tagline: '让海外买家主动找到你',
    painPoint: '官网建好了，但没有流量，海外客户根本搜不到你，网站形同虚设',
    beforeState: '月均流量<1000，自然搜索占比<10%，广告费花了不少但ROI很低',
    afterState: '月均流量增长15%+，自然搜索占比>40%，广告ROI>3:1',
    quantifiedValue: '流量增长3-5倍，获客成本降低60%',
    targetCustomer: '有官网但缺乏流量的外贸企业',
    metrics: [
      { name: '官网月均流量', value: '45,230', target: '月均增长15%+', before: '<1,000', improvement: '45倍' },
      { name: '自然搜索流量占比', value: '42%', target: '>40%', before: '<10%', improvement: '4倍' },
      { name: '广告ROI', value: '3.8x', target: '>3:1', before: '<1.5:1', improvement: '2.5倍' },
      { name: '线索获取成本', value: '¥256', target: '低于行业均值30%', before: '¥800+', improvement: '-68%' },
    ],
    capabilities: [
      {
        agentId: 'mia',
        agentName: 'Mia · 推广专员',
        agentIcon: '🚀',
        contribution: '核心驱动：SEO优化+广告投放+主动拓客',
        subAgents: ['SEO Agent', 'Ads Agent', 'Outreach Agent', 'Intel Agent'],
      },
      {
        agentId: 'coco',
        agentName: 'Coco · 内容运营',
        agentIcon: '✍️',
        contribution: '内容支撑：SEO内容创作+多语言内容+博客',
        subAgents: ['Blog Agent', 'Localization Agent'],
      },
      {
        agentId: 'ada',
        agentName: 'Ada · 运营主管',
        agentIcon: '👩‍💼',
        contribution: '数据驱动：流量分析+策略建议+团队协调',
        subAgents: ['Analytics Agent', 'Coordination Agent'],
      },
    ],
    pricing: {
      name: '流量增长版',
      price: '¥9,999',
      period: '年',
      description: '让海外买家主动找到你，流量持续增长',
      included: ['Mia·推广专员', 'Coco·内容运营(基础)', 'Ada·运营主管(基础)', 'SEO全套', 'Google Ads管理', '主动拓客'],
    },
    enabled: true,
  },
  {
    id: 'lead-conversion',
    category: 'conversion',
    name: '线索转化率提升',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600',
    tagline: '让每一条询盘都不被浪费',
    painPoint: '有流量有询盘，但转化率极低，50%询盘因时差无人回复而流失，报价慢丢单',
    beforeState: '询盘响应2小时+，转化率<5%，A级线索识别率<50%，复购率<15%',
    afterState: '询盘响应<5分钟，转化率>8%，A级线索识别率>85%，复购率>25%',
    quantifiedValue: '询盘转化率提升60-100%，客户流失率降低50%',
    targetCustomer: '有询盘但转化率低的外贸企业',
    metrics: [
      { name: '询盘响应时间', value: '3分钟', target: '<5分钟', before: '2小时+', improvement: '97%' },
      { name: '询盘转化率', value: '9.2%', target: '>8%', before: '<5%', improvement: '84%' },
      { name: 'A级线索识别率', value: '88%', target: '>85%', before: '<50%', improvement: '76%' },
      { name: '客户复购率', value: '28%', target: '>25%', before: '<15%', improvement: '87%' },
    ],
    capabilities: [
      {
        agentId: 'leo',
        agentName: 'Leo · 外贸业务员',
        agentIcon: '💼',
        contribution: '核心驱动：7×24h询盘响应+智能报价+线索培育',
        subAgents: ['Inquiry Agent', 'Quote Agent', 'Nurture Agent', 'Account Agent'],
      },
      {
        agentId: 'sara',
        agentName: 'Sara · 客服专员',
        agentIcon: '🤝',
        contribution: '服务支撑：售前咨询转线索+客户信任建立',
        subAgents: ['Q&A Agent', 'PreSales Agent'],
      },
      {
        agentId: 'coco',
        agentName: 'Coco · 内容运营',
        agentIcon: '✍️',
        contribution: '内容支撑：产品内容优化+选型指南+FAQ',
        subAgents: ['Product Content Agent'],
      },
      {
        agentId: 'ada',
        agentName: 'Ada · 运营主管',
        agentIcon: '👩‍💼',
        contribution: '数据驱动：转化漏斗分析+优化建议+团队协调',
        subAgents: ['Analytics Agent', 'Coordination Agent'],
      },
    ],
    pricing: {
      name: '线索转化版',
      price: '¥12,999',
      period: '年',
      description: '7×24h响应询盘，让每条线索都不浪费',
      included: ['Leo·外贸业务员', 'Sara·客服专员(基础)', 'Coco·内容运营(基础)', 'Ada·运营主管(基础)', '智能报价', '线索培育', '客户管理'],
    },
    enabled: true,
  },
  {
    id: 'service-efficiency',
    category: 'service',
    name: '服务效率与质量提升',
    icon: '⚡',
    color: 'from-orange-500 to-amber-600',
    tagline: '让海外买家随时找到人',
    painPoint: '客服只能覆盖8小时，海外客户咨询无人应答，售后工单处理慢，客户满意度低',
    beforeState: '响应时间>5分钟，问题解决率<50%，满意度<3.5分，售后结案率<60%',
    afterState: '响应时间<30秒，问题解决率>75%，满意度>4.2分，售后结案率>90%',
    quantifiedValue: '服务效率提升10倍，客户满意度提升30%',
    targetCustomer: '需要提升海外客户服务质量的企业',
    metrics: [
      { name: '问题解决率', value: '78%', target: '>75%', before: '<50%', improvement: '56%' },
      { name: '平均响应时间', value: '25秒', target: '<30秒', before: '>5分钟', improvement: '97%' },
      { name: '服务转线索率', value: '17%', target: '>15%', before: '<5%', improvement: '240%' },
      { name: '客户满意度(CSAT)', value: '4.4/5.0', target: '>4.2', before: '<3.5', improvement: '26%' },
    ],
    capabilities: [
      {
        agentId: 'sara',
        agentName: 'Sara · 客服专员',
        agentIcon: '🤝',
        contribution: '核心驱动：7×24h智能问答+售前咨询+售后工单',
        subAgents: ['Q&A Agent', 'PreSales Agent', 'AfterSales Agent', 'Verify Agent'],
      },
      {
        agentId: 'leo',
        agentName: 'Leo · 外贸业务员',
        agentIcon: '💼',
        contribution: '业务支撑：高意向线索转交+客户跟进',
        subAgents: ['Inquiry Agent', 'Account Agent'],
      },
      {
        agentId: 'ada',
        agentName: 'Ada · 运营主管',
        agentIcon: '👩‍💼',
        contribution: '数据驱动：服务质量分析+优化建议',
        subAgents: ['Analytics Agent', 'Report Agent'],
      },
    ],
    pricing: {
      name: '服务提升版',
      price: '¥7,999',
      period: '年',
      description: '7×24h多语言客服，让买家随时找到人',
      included: ['Sara·客服专员', 'Leo·外贸业务员(基础)', 'Ada·运营主管(基础)', '智能问答', '售后工单', '防伪溯源'],
    },
    enabled: true,
  },
  {
    id: 'content-compliance',
    category: 'compliance',
    name: '内容安全与合规',
    icon: '🛡️',
    color: 'from-red-500 to-pink-600',
    tagline: '让官网内容安全合规、专业可信',
    painPoint: '多语言内容翻译不准、文化不适配、隐私政策缺失、产品描述不合规，面临法律风险',
    beforeState: '翻译质量差、文化冲突频发、合规审查缺失、内容过时无人维护',
    afterState: '文化适配翻译、合规自动审查、内容持续更新、风险预警覆盖',
    quantifiedValue: '合规风险降低95%，内容专业度提升80%',
    targetCustomer: '面向欧美市场、对合规要求高的外贸企业',
    metrics: [
      { name: '内容合规率', value: '98%', target: '>95%', before: '<60%', improvement: '63%' },
      { name: '多语言覆盖率', value: '85%', target: '>80%', before: '<30%', improvement: '183%' },
      { name: '内容更新及时率', value: '92%', target: '>90%', before: '<40%', improvement: '130%' },
      { name: '合规风险预警', value: '24h内', target: '<24h', before: '无预警', improvement: '从0到1' },
    ],
    capabilities: [
      {
        agentId: 'coco',
        agentName: 'Coco · 内容运营',
        agentIcon: '✍️',
        contribution: '核心驱动：文化适配翻译+内容合规审查+持续更新',
        subAgents: ['Localization Agent', 'Product Content Agent', 'Blog Agent', 'Media Agent'],
      },
      {
        agentId: 'mia',
        agentName: 'Mia · 推广专员',
        agentIcon: '🚀',
        contribution: '合规支撑：市场合规检查+竞品风险监控',
        subAgents: ['Intel Agent'],
      },
      {
        agentId: 'ada',
        agentName: 'Ada · 运营主管',
        agentIcon: '👩‍💼',
        contribution: '管理支撑：合规报告+风险预警+内容审核',
        subAgents: ['Analytics Agent', 'Report Agent', 'SiteOps Agent'],
      },
    ],
    pricing: {
      name: '内容合规版',
      price: '¥8,999',
      period: '年',
      description: '多语言文化适配，内容安全合规无忧',
      included: ['Coco·内容运营', 'Mia·推广专员(基础)', 'Ada·运营主管(基础)', '文化适配翻译', '合规审查', '风险预警'],
    },
    enabled: true,
  },
  {
    id: 'global-expansion',
    category: 'expansion',
    name: '全球市场拓展',
    icon: '🌍',
    color: 'from-cyan-500 to-blue-600',
    tagline: '一站式解决出海全链路问题',
    painPoint: '想拓展海外市场但缺乏完整团队，招人难、成本高、效率低，各环节脱节',
    beforeState: '团队不完整、各环节脱节、数据孤岛、运营效率低下',
    afterState: '5大AI数字员工协同、全链路闭环、数据驱动、运营效率提升80%',
    quantifiedValue: '年节省80-130万人力成本，全链路运营效率提升80%',
    targetCustomer: '计划或正在拓展海外市场的中小企业',
    metrics: [
      { name: '人力成本节省', value: '¥80万+/年', target: '>80%', before: '¥80-130万/年', improvement: '>90%' },
      { name: '运营效率提升', value: '80%', target: '>70%', before: '基线', improvement: '80%' },
      { name: '全链路覆盖率', value: '100%', target: '100%', before: '<30%', improvement: '233%' },
      { name: '数据驱动决策率', value: '85%', target: '>80%', before: '<20%', improvement: '325%' },
    ],
    capabilities: [
      {
        agentId: 'ada',
        agentName: 'Ada · 运营主管',
        agentIcon: '👩‍💼',
        contribution: '统筹全局：数据分析+团队协调+网站管理+运营报告',
        subAgents: ['Analytics Agent', 'Coordination Agent', 'SiteOps Agent', 'Report Agent'],
      },
      {
        agentId: 'mia',
        agentName: 'Mia · 推广专员',
        agentIcon: '🚀',
        contribution: '引流获客：SEO+广告+拓客+市场情报',
        subAgents: ['SEO Agent', 'Ads Agent', 'Outreach Agent', 'Intel Agent'],
      },
      {
        agentId: 'coco',
        agentName: 'Coco · 内容运营',
        agentIcon: '✍️',
        contribution: '内容承接：产品内容+博客+翻译+多媒体',
        subAgents: ['Product Content Agent', 'Blog Agent', 'Localization Agent', 'Media Agent'],
      },
      {
        agentId: 'leo',
        agentName: 'Leo · 外贸业务员',
        agentIcon: '💼',
        contribution: '成交转化：询盘响应+报价+培育+客户管理',
        subAgents: ['Inquiry Agent', 'Quote Agent', 'Nurture Agent', 'Account Agent'],
      },
      {
        agentId: 'sara',
        agentName: 'Sara · 客服专员',
        agentIcon: '🤝',
        contribution: '服务信任：智能问答+售前咨询+售后+验证',
        subAgents: ['Q&A Agent', 'PreSales Agent', 'AfterSales Agent', 'Verify Agent'],
      },
    ],
    pricing: {
      name: '全球营销版',
      price: '¥39,999',
      period: '年',
      description: '5大AI数字员工，一站式出海全链路解决方案',
      included: ['Ada·运营主管', 'Mia·推广专员', 'Coco·内容运营', 'Leo·外贸业务员', 'Sara·客服专员', '全部99个Skills', '优先技术支持'],
    },
    enabled: true,
  },
];
