export type AgentId = 
  | 'global-insight'
  | 'content-localization'
  | 'growth-acquisition'
  | 'sales-customer-success'
  | 'data-insight-strategy'
  | 'admin-copilot';

export type AgentStatus = 'active' | 'idle' | 'working';

export interface Agent {
  id: AgentId;
  name: string;
  icon: string;
  color: string;
  position: 'front' | 'back';
  description: string;
  status: AgentStatus;
  metrics: { name: string; value: string | number; change?: string; changeType?: 'positive' | 'negative' | 'neutral'; unit?: string }[];
  keyResponsibilities: string[];
  recentActivities: { time: string; action: string; result?: string }[];
}

export interface ValueMetric {
  category: 'cost' | 'efficiency' | 'revenue' | 'capability';
  name: string;
  value: string;
  beforeValue: string;
  improvement: string;
  unit?: string;
  description: string;
}

export interface BusinessData {
  revenue: {
    current: number;
    growth: number;
    trend: { date: string; value: number }[];
  };
  leads: {
    current: number;
    growth: number;
    quality: number;
  };
  conversion: {
    rate: number;
    improvement: number;
  };
  responseTime: {
    current: string;
    before: string;
    improvement: string;
  };
}

export const AGENTS_DATA: Agent[] = [
  {
    id: 'global-insight',
    name: '全球市场洞察',
    icon: '🌍',
    color: 'from-purple-500 to-indigo-600',
    position: 'front',
    description: '战略导航员 - 降低试错成本',
    status: 'active',
    metrics: [
      { name: '市场机会发现', value: 12, change: '+5', changeType: 'positive' },
      { name: '风险预警准确率', value: '92%', change: '+3%', changeType: 'positive' },
      { name: '竞品情报更新频率', value: '24次/周', change: '0', changeType: 'neutral' },
    ],
    keyResponsibilities: ['实时竞品监控', '合规/风险预警', '市场机会扫描', '文化适配建议'],
    recentActivities: [
      { time: '2分钟前', action: '发现德国市场新机会', result: '推荐3个关键词' },
      { time: '15分钟前', action: '监控到竞品价格调整', result: '已生成应对建议' },
      { time: '1小时前', action: '完成欧盟合规审查', result: '无风险点' },
    ],
  },
  {
    id: 'content-localization',
    name: '多语言内容本地化',
    icon: '✍️',
    color: 'from-blue-500 to-cyan-600',
    position: 'front',
    description: '品牌翻译官 - 建立文化信任',
    status: 'working',
    metrics: [
      { name: '内容产出效率', value: 15, unit: '篇/周', change: '+8', changeType: 'positive' },
      { name: 'SEO关键词排名提升', value: 28, unit: '个', change: '+12', changeType: 'positive' },
      { name: '内容互动率', value: '8.5%', change: '+2.1%', changeType: 'positive' },
    ],
    keyResponsibilities: ['文化适配文案生成', '多语种SEO优化', '多媒体内容创作', '本地话题趋势'],
    recentActivities: [
      { time: '5分钟前', action: '正在生成德语产品描述', result: '进行中...' },
      { time: '30分钟前', action: '完成5篇英文博客优化', result: '已发布' },
      { time: '2小时前', action: '捕捉到LinkedIn热门话题', result: '已生成内容计划' },
    ],
  },
  {
    id: 'growth-acquisition',
    name: '全渠道获客与引流',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600',
    position: 'front',
    description: '精准猎手 - 主动获取高质量线索',
    status: 'active',
    metrics: [
      { name: '线索获取成本', value: '¥256', change: '-¥89', changeType: 'positive' },
      { name: '线索质量评分', value: 8.2, change: '+1.5', changeType: 'positive' },
      { name: '渠道ROI', value: '4.2x', change: '+0.8x', changeType: 'positive' },
    ],
    keyResponsibilities: ['LinkedIn自动化拓客', 'EDM个性化营销', '落地页A/B测试', 'Google Ads智能投放'],
    recentActivities: [
      { time: '10分钟前', action: '发送200封个性化EDM', result: '已送达' },
      { time: '45分钟前', action: '完成落地页版本A测试', result: '转化率+12%' },
      { time: '3小时前', action: 'LinkedIn触达50位决策人', result: '8人响应' },
    ],
  },
  {
    id: 'sales-customer-success',
    name: '智能销售与客户成功',
    icon: '🤝',
    color: 'from-orange-500 to-amber-600',
    position: 'front',
    description: '金牌跟单员 - 缩短成交周期',
    status: 'working',
    metrics: [
      { name: '询盘响应速度', value: '3分钟', change: '-2小时', changeType: 'positive' },
      { name: '线索转化率', value: '12.5%', change: '+5.2%', changeType: 'positive' },
      { name: '客户满意度', value: 4.8, change: '+0.3', changeType: 'positive' },
      { name: '复购率', value: '35.2%', change: '+8.5%', changeType: 'positive' },
    ],
    keyResponsibilities: ['7×24h多语言响应', '智能报价与合同辅助', '客户生命周期管理', '复购与转介绍'],
    recentActivities: [
      { time: '1分钟前', action: '正在回复德国客户询盘', result: '进行中...' },
      { time: '20分钟前', action: '生成智能报价单', result: '已发送给客户' },
      { time: '1小时前', action: '跟进样品寄送进度', result: '已通知客户' },
      { time: '4小时前', action: '完成合同风险审查', result: '无风险' },
    ],
  },
  {
    id: 'data-insight-strategy',
    name: '运营数据分析',
    icon: '📊',
    color: 'from-pink-500 to-rose-600',
    position: 'back',
    description: 'AI参谋长 - 从看报表到给建议',
    status: 'active',
    metrics: [
      { name: '数据诊断准确率', value: '94%', change: '+2%', changeType: 'positive' },
      { name: '策略建议采纳率', value: '78%', change: '+5%', changeType: 'positive' },
      { name: '自动任务创建率', value: '85%', change: '+10%', changeType: 'positive' },
    ],
    keyResponsibilities: ['智能诊断报告', '策略建议生成', '自动化任务日历', '异常预警'],
    recentActivities: [
      { time: '5分钟前', action: '识别到首页跳出率异常', result: '已生成优化建议' },
      { time: '1小时前', action: '完成周度运营报告', result: '已推送给老板' },
      { time: '3小时前', action: '创建下周二内容发布任务', result: '已添加到日历' },
    ],
  },
  {
    id: 'admin-copilot',
    name: '网站后台AI运营助手',
    icon: '🎛️',
    color: 'from-violet-500 to-fuchsia-600',
    position: 'back',
    description: 'AI指挥官 - 自然语言指令',
    status: 'active',
    metrics: [
      { name: '功能调用成功率', value: '96%', change: '+1%', changeType: 'positive' },
      { name: '操作时长缩短', value: '65%', change: '+5%', changeType: 'positive' },
      { name: '指令理解准确率', value: '95%', change: '+2%', changeType: 'positive' },
    ],
    keyResponsibilities: ['自然语言配置', '内容快速发布', '消息提醒管理', '系统状态查询'],
    recentActivities: [
      { time: '8分钟前', action: '执行用户指令：绑定域名', result: '已完成' },
      { time: '25分钟前', action: '发布新产品文章到英文站', result: '已发布' },
      { time: '2小时前', action: '配置新询盘通知规则', result: '已生效' },
    ],
  },
];

export const VALUE_METRICS: ValueMetric[] = [
  {
    category: 'cost',
    name: '人力成本',
    value: '¥40万/年',
    beforeValue: '¥75万/年',
    improvement: '47%',
    description: '虚拟团队替代5个专业岗位',
  },
  {
    category: 'efficiency',
    name: '询盘响应时间',
    value: '3分钟',
    beforeValue: '2小时',
    improvement: '97%',
    description: '从"天"级降到"分钟"级',
  },
  {
    category: 'efficiency',
    name: '运营操作时间',
    value: '2小时/天',
    beforeValue: '6小时/天',
    improvement: '67%',
    description: '自然语言操作，零学习成本',
  },
  {
    category: 'revenue',
    name: '线索转化率',
    value: '12.5%',
    beforeValue: '4.5%',
    improvement: '178%',
    description: 'AI辅助谈判，7×24h响应',
  },
  {
    category: 'revenue',
    name: '营销ROI',
    value: '4.2x',
    beforeValue: '2.1x',
    improvement: '100%',
    description: '精准触达，智能投放',
  },
  {
    category: 'capability',
    name: '客户满意度',
    value: '4.8/5.0',
    beforeValue: '3.9/5.0',
    improvement: '23%',
    description: '专业响应，及时跟进',
  },
];

export const BUSINESS_DATA: BusinessData = {
  revenue: {
    current: 8500000,
    growth: 35,
    trend: Array.from({ length: 6 }, (_, i) => ({
      date: `2026-0${i + 10 < 10 ? '0' + i + 10 : i + 10}`,
      value: 5200000 + i * 550000 + Math.random() * 200000,
    })),
  },
  leads: {
    current: 328,
    growth: 65,
    quality: 8.2,
  },
  conversion: {
    rate: 12.5,
    improvement: 178,
  },
  responseTime: {
    current: '3分钟',
    before: '2小时',
    improvement: '97%',
  },
};
