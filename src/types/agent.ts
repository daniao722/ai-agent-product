export type AgentId = 
  | 'brand-strategy'
  | 'market-strategy'
  | 'marketing-strategy'
  | 'sales-followup'
  | 'customer-service'
  | 'customer-management'
  | 'website-operation'
  | 'content-generation'
  | 'social-media'
  | 'data-analysis';

export type AgentStatus = 'running' | 'idle' | 'offline' | 'maintenance';

export type AgentWorkStatus = 'working' | 'idle' | 'waiting' | 'paused';

export interface Agent {
  id: AgentId;
  name: string;
  icon: string;
  description: string;
  status: AgentStatus;
  workStatus: AgentWorkStatus;
  enabled: boolean;
  todayTasks: number;
  monthlyCompleted: number;
  currentTask?: string;
  currentTaskProgress?: number;
  startTime: string;
  totalWorkHours: number;
  successRate: number;
}

export interface AgentTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  estimatedCompletion?: string;
  result?: string;
}

export const AGENTS: Agent[] = [
  {
    id: 'brand-strategy',
    name: '品牌策略Agent',
    icon: '🎯',
    description: '制定品牌定位、内容策略',
    status: 'running',
    workStatus: 'working',
    enabled: true,
    todayTasks: 3,
    monthlyCompleted: 15,
    currentTask: '品牌内容策略制定',
    currentTaskProgress: 65,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 156,
    successRate: 92,
  },
  {
    id: 'market-strategy',
    name: '市场策略Agent',
    icon: '📊',
    description: '市场分析、竞品监控、渠道优化',
    status: 'running',
    workStatus: 'idle',
    enabled: true,
    todayTasks: 2,
    monthlyCompleted: 18,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 142,
    successRate: 88,
  },
  {
    id: 'marketing-strategy',
    name: '营销策略Agent',
    icon: '📣',
    description: '营销活动策划、内容生成、社媒运营',
    status: 'running',
    workStatus: 'working',
    enabled: true,
    todayTasks: 5,
    monthlyCompleted: 42,
    currentTask: '今日内容生成计划',
    currentTaskProgress: 30,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 189,
    successRate: 95,
  },
  {
    id: 'sales-followup',
    name: '销售跟进Agent',
    icon: '📞',
    description: '线索管理、智能回访、商机推送',
    status: 'running',
    workStatus: 'idle',
    enabled: true,
    todayTasks: 8,
    monthlyCompleted: 35,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 167,
    successRate: 90,
  },
  {
    id: 'customer-service',
    name: '智能客服Agent',
    icon: '💬',
    description: '7×24小时接待、多语言支持、智能留资',
    status: 'running',
    workStatus: 'working',
    enabled: true,
    todayTasks: 128,
    monthlyCompleted: 2856,
    startTime: '2026-04-01 00:00:00',
    totalWorkHours: 720,
    successRate: 98,
  },
  {
    id: 'customer-management',
    name: '客户管理Agent',
    icon: '👥',
    description: '客户画像、生命周期管理、个性化触达',
    status: 'running',
    workStatus: 'idle',
    enabled: true,
    todayTasks: 5,
    monthlyCompleted: 28,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 134,
    successRate: 91,
  },
  {
    id: 'website-operation',
    name: '网站运营Agent',
    icon: '🌐',
    description: '页面优化、A/B测试、流量运营',
    status: 'running',
    workStatus: 'working',
    enabled: true,
    todayTasks: 3,
    monthlyCompleted: 18,
    currentTask: '页面优化分析',
    currentTaskProgress: 45,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 145,
    successRate: 89,
  },
  {
    id: 'content-generation',
    name: '内容生成Agent',
    icon: '✍️',
    description: '文章撰写、素材制作、SEO优化',
    status: 'running',
    workStatus: 'idle',
    enabled: true,
    todayTasks: 2,
    monthlyCompleted: 35,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 178,
    successRate: 94,
  },
  {
    id: 'social-media',
    name: '社媒运营Agent',
    icon: '📱',
    description: '内容发布、互动管理、引流增长',
    status: 'running',
    workStatus: 'working',
    enabled: true,
    todayTasks: 4,
    monthlyCompleted: 45,
    currentTask: '社媒内容发布',
    currentTaskProgress: 75,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 192,
    successRate: 96,
  },
  {
    id: 'data-analysis',
    name: '数据分析Agent',
    icon: '📈',
    description: '数据采集、归因分析、增长洞察',
    status: 'running',
    workStatus: 'idle',
    enabled: true,
    todayTasks: 5,
    monthlyCompleted: 22,
    startTime: '2026-04-01 08:00:00',
    totalWorkHours: 156,
    successRate: 93,
  },
];
