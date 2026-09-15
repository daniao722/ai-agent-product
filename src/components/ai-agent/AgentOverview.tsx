import { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Database,
  Eye,
  PenLine,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Filter,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Brain,
  BarChart3,
  Clock,
  Play,
  Pause,
  Settings,
  Radio,
  Timer,
  Gauge,
  Cpu,
  Workflow,
  Bell,
} from 'lucide-react';

// ===== Types =====
type EngineState = 'running' | 'paused' | 'error';
type TriggerType = 'timer' | 'event' | 'threshold' | 'queue';

interface TriggerRule {
  id: string;
  type: TriggerType;
  name: string;
  condition: string;
  target: string;
  enabled: boolean;
  lastFired: string;
  firedToday: number;
}

interface RuntimeLog {
  id: number;
  time: string;
  ts: number;
  agent: '访客分析' | '内容运营' | '知识库' | '调度器';
  trigger: TriggerType;
  action: string;
  result: string;
  next?: string;
  status: 'success' | 'running' | 'pending';
}

interface ScheduledTask {
  id: string;
  agent: string;
  task: string;
  scheduledAt: string;
  countdownSec: number;
  reason: string;
}

// ===== 静态数据 =====
// AI知识库作为基座（底层），支撑多个智能体（上层）运转
const knowledgeBaseNode = {
  id: 'kb',
  name: 'AI知识库',
  desc: '企业 + 行业双知识库 · 支撑所有智能体的统一知识底座',
  icon: Database,
  theme: 'purple' as const,
  metrics: [
    { label: '知识条目', value: '1,286' },
    { label: '语料切片', value: '18,942' },
    { label: '覆盖度', value: '87%' },
    { label: 'RAG命中', value: '94%' },
  ],
};

const agentNodes = [
  {
    id: 'visitor',
    name: 'AI访客行为分析',
    desc: '诊断层 · 识别流失',
    icon: Eye,
    theme: 'amber' as const,
    status: 'active' as const,
    metrics: [
      { label: '在线访客', value: '200' },
      { label: '识别瓶颈', value: '3' },
      { label: '输出建议', value: '4' },
    ],
  },
  {
    id: 'content',
    name: 'AI内容运营',
    desc: '承接层 · 生成承接',
    icon: PenLine,
    theme: 'cyan' as const,
    status: 'active' as const,
    metrics: [
      { label: '生成营销页', value: '12' },
      { label: '推送位', value: '5' },
      { label: 'CTR提升', value: '+18%' },
    ],
  },
  {
    id: 'personalize',
    name: 'AI个性化体验',
    desc: '承接层 · 动态承接',
    icon: Sparkles,
    theme: 'rose' as const,
    status: 'coming' as const,
    metrics: [
      { label: '动态模块', value: '—' },
      { label: '推送位', value: '—' },
      { label: '承接率', value: '—' },
    ],
  },
  {
    id: 'service',
    name: 'AI智能客服PRO',
    desc: '对话层 · 意图承接',
    icon: Activity,
    theme: 'emerald' as const,
    status: 'coming' as const,
    metrics: [
      { label: '会话数', value: '—' },
      { label: '解决率', value: '—' },
      { label: '满意度', value: '—' },
    ],
  },
  {
    id: 'abtest',
    name: 'AI A/B测试',
    desc: '迭代层 · 效果优化',
    icon: BarChart3,
    theme: 'indigo' as const,
    status: 'coming' as const,
    metrics: [
      { label: '实验数', value: '—' },
      { label: '胜出方案', value: '—' },
      { label: '提升', value: '—' },
    ],
  },
];

const themeColors = {
  purple: { grad: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600' },
  amber: { grad: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600' },
  cyan: { grad: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-600' },
  rose: { grad: 'from-rose-400 to-pink-600', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600' },
  emerald: { grad: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600' },
  indigo: { grad: 'from-indigo-500 to-blue-600', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600' },
};

const triggerIcon = { timer: Clock, event: Radio, threshold: Gauge, queue: Workflow };
const triggerLabel = { timer: '定时触发', event: '事件触发', threshold: '阈值触发', queue: '队列调度' };
const triggerColor = {
  timer: 'bg-blue-50 text-blue-600 border-blue-200',
  event: 'bg-amber-50 text-amber-600 border-amber-200',
  threshold: 'bg-rose-50 text-rose-600 border-rose-200',
  queue: 'bg-violet-50 text-violet-600 border-violet-200',
};

const initialTriggers: TriggerRule[] = [
  {
    id: 't1', type: 'timer', name: '访客意图实时扫描',
    condition: '每 30 秒', target: '访客分析',
    enabled: true, lastFired: '刚刚', firedToday: 248,
  },
  {
    id: 't2', type: 'event', name: '新访客到达',
    condition: '在线访客 +1', target: '访客分析',
    enabled: true, lastFired: '5 秒前', firedToday: 612,
  },
  {
    id: 't3', type: 'threshold', name: '瓶颈超基准',
    condition: '流失率 > 行业基准 ×1.2', target: '访客分析 → 内容运营',
    enabled: true, lastFired: '1 分钟前', firedToday: 14,
  },
  {
    id: 't4', type: 'queue', name: '营销页自动派单',
    condition: '瓶颈识别后 5 分钟内', target: '内容运营',
    enabled: true, lastFired: '4 分钟前', firedToday: 9,
  },
  {
    id: 't5', type: 'threshold', name: '改后效果未达标',
    condition: 'CTR 改善 < 预期 50%', target: '内容运营 → 访客分析',
    enabled: true, lastFired: '23 分钟前', firedToday: 3,
  },
  {
    id: 't6', type: 'timer', name: '三柱权重回流校准',
    condition: '每 4 小时', target: '知识库',
    enabled: true, lastFired: '2 小时前', firedToday: 2,
  },
];

// 自动执行的动作模板池（按智能体分组，模拟真实闭环）
const actionTemplates: Record<string, { action: string; result: string; next?: string }[]> = {
  访客分析: [
    { action: '扫描实时访客意图', result: '识别 38 高意向 / 92 中意向 / 70 低意向', next: '→ 知识库' },
    { action: '检测浏览→互动瓶颈', result: '流失 36%，超基准 +8pp', next: '→ 内容运营' },
    { action: '识别 CTA 不匹配意图', result: '高意向被弱引导', next: '→ 内容运营' },
    { action: '采集改后行为', result: 'CTR 5.2% → 11.8%', next: '→ 内容运营' },
  ],
  知识库: [
    { action: '召回承接语料', result: 'RAG 命中 18 切片' },
    { action: '更新行业基准值', result: '本环节基线 +3pp' },
    { action: '回流校准三柱权重', result: '新鲜度权重 ↑' },
  ],
  内容运营: [
    { action: '生成承接营销页', result: '对比阶段 · 行业知识型' },
    { action: '推送至首屏 Banner', result: '曝光 +1' },
    { action: '回流校准三柱', result: '新鲜度权重 ↑', next: '→ 知识库' },
    { action: '生成 AI 友好内容', result: 'Schema.org + llms.txt' },
  ],
};

const overallFunnel = [
  { name: '到达', count: 5000, rate: 100, isBottleneck: false },
  { name: '浏览', count: 3200, rate: 64, isBottleneck: false },
  { name: '互动', count: 1100, rate: 22, isBottleneck: true },
  { name: '留资', count: 230, rate: 4.6, isBottleneck: true },
];

// ===== Helpers =====
const fmtTime = (ts: number) => {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
};

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ===== Main =====
export default function AgentOverview() {
  const [engineState, setEngineState] = useState<EngineState>('running');
  const [triggers, setTriggers] = useState<TriggerRule[]>(initialTriggers);
  const [logs, setLogs] = useState<RuntimeLog[]>([]);
  const [todayRuns, setTodayRuns] = useState(612);
  const [currentTask, setCurrentTask] = useState<ScheduledTask | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [queueDepth, setQueueDepth] = useState(2);
  const [bottlenecksClosed, setBottlenecksClosed] = useState(14);
  const [calibrations, setCalibrations] = useState(8);
  const logIdRef = useRef(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const goTo = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  // ===== 自动调度引擎核心循环 =====
  useEffect(() => {
    if (engineState !== 'running') return;
    // 每 3 秒模拟一次自动执行
    const timer = setInterval(() => {
      const now = Date.now();
      // 随机选择一个智能体执行
      const agents = Object.keys(actionTemplates);
      const agent = pickRandom(agents) as '访客分析' | '内容运营' | '知识库';
      const tpl = pickRandom(actionTemplates[agent]);
      // 随机触发器类型
      const types: TriggerType[] = ['timer', 'event', 'threshold', 'queue'];
      const trigger = pickRandom(types);

      const newLog: RuntimeLog = {
        id: logIdRef.current++,
        time: fmtTime(now),
        ts: now,
        agent,
        trigger,
        action: tpl.action,
        result: tpl.result,
        next: tpl.next,
        status: 'success',
      };

      setLogs((prev) => [newLog, ...prev].slice(0, 30));
      setTodayRuns((c) => c + 1);

      // 触发派单 → 队列深度变化
      if (tpl.next && tpl.next.includes('内容运营')) {
        setQueueDepth((d) => Math.min(d + 1, 6));
      } else if (tpl.next && tpl.next.includes('知识库')) {
        setCalibrations((c) => c + 1);
        setQueueDepth((d) => Math.max(0, d - 1));
      } else if (agent === '访客分析' && tpl.action.includes('瓶颈')) {
        setBottlenecksClosed((b) => b + 1);
      }

      // 重置倒计时
      setCountdown(Math.floor(Math.random() * 15) + 8);
    }, 3000);

    return () => clearInterval(timer);
  }, [engineState]);

  // 倒计时
  useEffect(() => {
    if (engineState !== 'running') return;
    const timer = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, [engineState]);

  const toggleEngine = () => {
    setEngineState((s) => (s === 'running' ? 'paused' : 'running'));
  };

  const toggleTrigger = (id: string) => {
    setTriggers((prev) => prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));
  };

  // 关键指标
  const kpis = [
    { label: '今日访问量', value: '5,000', delta: '+12%', trend: 'up', icon: Users },
    { label: '整体转化率', value: '4.6%', delta: '+1.2pp', trend: 'up', icon: Target },
    { label: 'AI承接后CTR', value: '11.3%', delta: '+18%', trend: 'up', icon: TrendingUp },
    { label: 'AI来源流量占比', value: '12.4%', delta: '+3.2pp', trend: 'up', icon: Sparkles },
  ];

  // 自动化统计
  const autoStats = [
    { label: '今日自动执行', value: todayRuns, unit: '次', icon: Cpu, color: 'text-violet-600' },
    { label: '自动闭环瓶颈', value: bottlenecksClosed, unit: '个', icon: Zap, color: 'text-amber-600' },
    { label: '权重回流校准', value: calibrations, unit: '次', icon: RefreshCw, color: 'text-cyan-600' },
    { label: '当前队列深度', value: queueDepth, unit: '任务', icon: Workflow, color: 'text-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-cyan-50/30 p-6 space-y-6">
      {/* ===== Header ===== */}
      <header className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-8 text-white shadow-xl shadow-purple-200/50 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-white/15 backdrop-blur rounded-full font-medium tracking-wider">
                    AI智能中心 · 总览
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-1">价值飞轮 · 自动化运行引擎</h1>
                <p className="text-purple-50/90 text-sm">无需人工触发 · 智能体自主调度 · 自动闭环 · 持续校准</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
                <Cpu className={`w-5 h-5 text-white ${engineState === 'running' ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <div className="text-xs text-purple-50/80">调度引擎状态</div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <span className={`w-1.5 h-1.5 rounded-full ${engineState === 'running' ? 'bg-green-400 animate-pulse' : engineState === 'paused' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                  {engineState === 'running' ? '自动运行中' : engineState === 'paused' ? '已暂停' : '异常'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 自动化运行引擎（核心模块）===== */}
      <section className="bg-white rounded-2xl border-2 border-violet-200 shadow-lg shadow-violet-100/50 p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">自动化运行引擎</h2>
            <span className="text-xs text-gray-400">自主调度 · 无需人工触发</span>
          </div>
          <button
            onClick={toggleEngine}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              engineState === 'running'
                ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {engineState === 'running' ? <><Pause className="w-4 h-4" /> 暂停引擎</> : <><Play className="w-4 h-4" /> 启动引擎</>}
          </button>
        </div>

        {/* 引擎状态卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {autoStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${s.color}`} />
                  <span className="text-[10px] text-gray-400">{s.unit}</span>
                </div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* 当前调度 + 下次执行 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
            <div className="flex items-center gap-2 mb-3">
              <Timer className="w-4 h-4 text-violet-600" />
              <h4 className="text-sm font-bold text-gray-800">下次自动执行</h4>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">倒计时</div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${engineState === 'running' ? 'text-violet-600' : 'text-gray-400'}`}>
                    {engineState === 'running' ? countdown : '—'}
                  </span>
                  <span className="text-xs text-gray-400">秒</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">下一个任务</div>
                <div className="text-sm font-medium text-gray-700">
                  {engineState === 'running' ? '访客意图扫描 + 瓶颈检测' : '引擎已暂停'}
                </div>
                <div className="text-[10px] text-violet-500 mt-0.5">触发器：定时 · 每 30 秒</div>
              </div>
            </div>
          </div>
          <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
            <div className="flex items-center gap-2 mb-3">
              <Workflow className="w-4 h-4 text-amber-600" />
              <h4 className="text-sm font-bold text-gray-800">待执行队列</h4>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-amber-600">{queueDepth}</span>
              <span className="text-xs text-gray-400">任务</span>
            </div>
            <div className="text-[10px] text-gray-500 leading-relaxed">
              内容运营待承接 {queueDepth} 个瓶颈派单，将在生成营销页后自动出队
            </div>
          </div>
        </div>
      </section>

      {/* ===== 关键价值指标 ===== */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-bold text-gray-800">关键价值指标</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {kpi.delta}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{kpi.value}</div>
                <div className="text-xs text-gray-500">{kpi.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== 价值飞轮 + 触发器 ===== */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">价值飞轮 · AI知识库支撑多智能体协同</h2>
          </div>
          <span className="text-xs text-gray-400">AI知识库（基座）支撑 · 智能体自治运行 · 自动闭环</span>
        </div>

        {/* 支撑架构图：上方多智能体 + 下方AI知识库基座 */}
        <div className="relative">
          {/* 上层：智能体矩阵（5个，2已上线+3即将上线） */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-0">
            {agentNodes.map((node) => {
              const Icon = node.icon;
              const theme = themeColors[node.theme];
              const isActive = node.status === 'active';
              return (
                <div
                  key={node.id}
                  className={`relative bg-gradient-to-br ${theme.bg} rounded-2xl border-2 ${theme.border} p-4 shadow-sm transition-all hover:shadow-md ${
                    isActive ? '' : 'opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className={`w-10 h-10 bg-gradient-to-br ${theme.grad} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-800 leading-tight">{node.name}</h3>
                      <p className="text-[10px] text-gray-500">{node.desc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-white/60 rounded-lg p-2 border border-white mb-2">
                    {node.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className={`text-sm font-bold ${isActive ? theme.text : 'text-gray-300'}`}>{m.value}</div>
                        <div className="text-[9px] text-gray-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  {isActive ? (
                    <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded-full flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      自治运行
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full">即将上线</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 支撑连接线区域 */}
          <div className="relative h-14 flex items-center justify-center">
            {/* 支撑线 SVG */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* 从下方基座向上发散的支撑线 */}
              <line x1="50" y1="100" x2="10" y2="0" stroke="#c4b5fd" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="50" y1="100" x2="30" y2="0" stroke="#c4b5fd" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="50" y1="100" x2="50" y2="0" stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="2,2" />
              <line x1="50" y1="100" x2="70" y2="0" stroke="#c4b5fd" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="50" y1="100" x2="90" y2="0" stroke="#c4b5fd" strokeWidth="0.5" strokeDasharray="2,2" />
            </svg>
            {/* 中央引擎标识 */}
            <div className={`relative z-10 ${engineState === 'running' ? '' : 'opacity-50'}`}>
              <div className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-violet-300 flex items-center justify-center">
                <RefreshCw className={`w-6 h-6 text-violet-600 ${engineState === 'running' ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              </div>
            </div>
            {/* 支撑说明 */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-violet-400 bg-violet-50/80 px-2 py-0.5 rounded">
              ↑ RAG 检索增强
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-violet-400 bg-violet-50/80 px-2 py-0.5 rounded">
              基准回流校准 ↓
            </div>
          </div>

          {/* 下层：AI知识库基座 */}
          <div className={`bg-gradient-to-br ${themeColors.purple.bg} rounded-2xl border-2 ${themeColors.purple.border} p-5 shadow-md`}>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className={`w-14 h-14 bg-gradient-to-br ${themeColors.purple.grad} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                <Database className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-800">{knowledgeBaseNode.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full font-medium">基座 · 地基层</span>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    持续沉淀
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{knowledgeBaseNode.desc}</p>
              </div>
              <button
                onClick={() => goTo('ai-knowledge-base')}
                className={`text-xs py-2 px-3 rounded-lg border ${themeColors.purple.border} ${themeColors.purple.text} ${themeColors.purple.bg} hover:opacity-80 transition-opacity flex items-center justify-center gap-1 flex-shrink-0`}
              >
                进入详情 <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/60 rounded-xl p-3 border border-white">
              {knowledgeBaseNode.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className={`text-2xl font-bold ${themeColors.purple.text}`}>{m.value}</div>
                  <div className="text-[10px] text-gray-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 自动触发器配置 */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-violet-600" />
              <h4 className="text-sm font-bold text-gray-800">自动触发器</h4>
              <span className="text-xs text-gray-400">6 条规则生效中 · 引擎自主调度</span>
            </div>
            <span className="text-xs text-gray-400">点击规则可启停</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {triggers.map((t) => {
              const TIcon = triggerIcon[t.type];
              return (
                <button
                  key={t.id}
                  onClick={() => toggleTrigger(t.id)}
                  className={`text-left rounded-lg p-3 border transition-all ${
                    t.enabled
                      ? 'bg-white border-violet-200 hover:border-violet-300'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <TIcon className={`w-3.5 h-3.5 flex-shrink-0 ${t.enabled ? 'text-violet-600' : 'text-gray-400'}`} />
                      <span className="text-xs font-bold text-gray-800 truncate">{t.name}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 ${t.enabled ? triggerColor[t.type] : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                      {triggerLabel[t.type]}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mb-1.5">{t.condition}</div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-400">→ {t.target}</span>
                    <span className="text-gray-500">今日 {t.firedToday} 次</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-gray-100">
                    <span className={`w-1.5 h-1.5 rounded-full ${t.enabled ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                    <span className="text-[10px] text-gray-500">{t.enabled ? `上次 ${t.lastFired}` : '已禁用'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 转化漏斗 + 实时运行时间轴 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* 整体转化漏斗 */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-bold text-gray-800">整体转化漏斗</h3>
            </div>
            <span className="text-xs text-gray-400">实时累计</span>
          </div>
          <div className="space-y-2">
            {overallFunnel.map((stage, idx) => {
              const maxCount = overallFunnel[0].count;
              const widthPercent = (stage.count / maxCount) * 100;
              const prevCount = idx > 0 ? overallFunnel[idx - 1].count : stage.count;
              const dropRate = idx > 0 ? (((prevCount - stage.count) / prevCount) * 100).toFixed(0) : '0';
              return (
                <div key={stage.name}>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-right">
                      <div className="text-sm font-bold text-gray-800">{stage.name}</div>
                    </div>
                    <div className="flex-1 relative">
                      <div
                        className={`h-12 rounded-lg flex items-center justify-between px-4 transition-all duration-700 ${
                          stage.isBottleneck ? 'bg-gradient-to-r from-rose-500 to-red-600' : 'bg-gradient-to-r from-violet-400 to-purple-500'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      >
                        <div className="text-white">
                          <span className="text-lg font-bold">{stage.count.toLocaleString()}</span>
                          <span className="text-xs ml-1 opacity-80">人</span>
                        </div>
                        {stage.isBottleneck && (
                          <span className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> 瓶颈
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-24 text-right">
                      <div className="text-sm font-bold text-gray-700">{stage.rate}%</div>
                      {idx > 0 && <div className="text-xs text-rose-500">流失 {dropRate}%</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 bg-amber-50/50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700">
                <strong>自动派单：</strong>「互动 → 留资」瓶颈已被访客分析自动识别，引擎已自动派单至内容运营生成承接营销页（队列中 {queueDepth} 个任务待执行）。
              </div>
            </div>
          </div>
        </div>

        {/* 实时运行时间轴 */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className={`w-5 h-5 ${engineState === 'running' ? 'text-violet-600 animate-pulse' : 'text-gray-400'}`} />
              <h3 className="text-base font-bold text-gray-800">实时运行时间轴</h3>
            </div>
            <span className="text-xs text-violet-500 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${engineState === 'running' ? 'bg-violet-500 animate-pulse' : 'bg-gray-300'}`} />
              {engineState === 'running' ? '实时流' : '已暂停'}
            </span>
          </div>
          <div ref={logContainerRef} className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <div className="text-center py-10 text-xs text-gray-400">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
                {engineState === 'running' ? '引擎启动中，等待首次自动执行...' : '引擎已暂停'}
              </div>
            ) : (
              logs.map((log) => {
                const agentColor =
                  log.agent === '访客分析' ? 'text-amber-600 bg-amber-50 border-amber-200'
                  : log.agent === '内容运营' ? 'text-cyan-600 bg-cyan-50 border-cyan-200'
                  : log.agent === '知识库' ? 'text-violet-600 bg-violet-50 border-violet-200'
                  : 'text-purple-600 bg-purple-50 border-purple-200';
                const TIcon = triggerIcon[log.trigger];
                return (
                  <div
                    key={log.id}
                    className="rounded-lg p-3 border border-gray-100 bg-gray-50/50 animate-[fadeIn_0.3s_ease-out]"
                  >
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] text-gray-500 font-mono">{log.time}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${agentColor}`}>{log.agent}</span>
                      <span className={`text-[9px] px-1 py-0.5 rounded border flex items-center gap-0.5 ${triggerColor[log.trigger]}`}>
                        <TIcon className="w-2.5 h-2.5" />
                        {triggerLabel[log.trigger]}
                      </span>
                    </div>
                    <div className="text-xs text-gray-800 font-medium mb-0.5">{log.action}</div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs text-gray-600">{log.result}</span>
                      {log.next && (
                        <span className="text-[10px] text-violet-500 ml-auto flex items-center gap-0.5">
                          <ArrowRight className="w-3 h-3" /> {log.next}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ===== 闭环价值产出 ===== */}
      <section className="bg-gradient-to-br from-purple-50 to-cyan-50 rounded-2xl border border-purple-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-bold text-gray-800">自动闭环价值产出</h2>
          <span className="text-xs text-gray-400">飞轮自动转动累计回流</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-gray-500">线索增长</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600">+132</div>
            <div className="text-[10px] text-gray-400">线索 / 月 · 自动承接</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-rose-500" />
              <span className="text-xs text-gray-500">跳出率下降</span>
            </div>
            <div className="text-2xl font-bold text-rose-600">-23%</div>
            <div className="text-[10px] text-gray-400">瓶颈自动优化</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-gray-500">AI承接转化</span>
            </div>
            <div className="text-2xl font-bold text-amber-600">+30%</div>
            <div className="text-[10px] text-gray-400">营销页承接率</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-xs text-gray-500">AI引用次数</span>
            </div>
            <div className="text-2xl font-bold text-violet-600">128</div>
            <div className="text-[10px] text-gray-400">外部 AI 引用</div>
          </div>
        </div>
      </section>

      {/* ===== 进入各模块入口 ===== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => goTo('ai-knowledge-base')}
          className="bg-white rounded-2xl border border-violet-200 p-5 text-left hover:shadow-md hover:border-violet-300 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">AI知识库</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">查看企业 + 行业双知识库的覆盖度与语料切片</p>
          <span className="text-xs text-violet-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            进入 <ArrowRight className="w-3 h-3" />
          </span>
        </button>
        <button
          onClick={() => goTo('agent-visitor')}
          className="bg-white rounded-2xl border border-amber-200 p-5 text-left hover:shadow-md hover:border-amber-300 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">AI访客行为分析</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">自动监控开关 · 实时识别瓶颈并自动派单</p>
          <span className="text-xs text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            进入 <ArrowRight className="w-3 h-3" />
          </span>
        </button>
        <button
          onClick={() => goTo('agent-content')}
          className="bg-white rounded-2xl border border-cyan-200 p-5 text-left hover:shadow-md hover:border-cyan-300 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
              <PenLine className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">AI内容运营</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">自动承接开关 · 接收派单自动生成与回流</p>
          <span className="text-xs text-cyan-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            进入 <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </section>

      {/* CSS 动画 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
