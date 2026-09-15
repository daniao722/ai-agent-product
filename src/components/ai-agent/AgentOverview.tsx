import { useState, useEffect } from 'react';
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
  ArrowDown,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Filter as FilterIcon,
  BarChart3,
  Clock,
} from 'lucide-react';

// ===== Types =====
interface FlywheelNode {
  id: string;
  name: string;
  desc: string;
  icon: typeof Database;
  theme: 'purple' | 'amber' | 'cyan';
  status: 'active' | 'idle';
  metrics: { label: string; value: string }[];
}

interface FlywheelFlow {
  from: string;
  to: string;
  label: string;
  data: string;
}

interface FunnelStage {
  name: string;
  count: number;
  rate: number;
  isBottleneck: boolean;
}

interface AgentLog {
  time: string;
  agent: '访客分析' | '内容运营' | '知识库';
  action: string;
  result: string;
  next?: string;
}

// ===== 模拟数据 =====
const flywheelNodes: FlywheelNode[] = [
  {
    id: 'kb',
    name: 'AI知识基座',
    desc: '企业 + 行业双知识库',
    icon: Database,
    theme: 'purple',
    status: 'active',
    metrics: [
      { label: '知识条目', value: '1,286' },
      { label: '语料切片', value: '18,942' },
      { label: '覆盖度', value: '87%' },
    ],
  },
  {
    id: 'visitor',
    name: 'AI访客行为分析',
    desc: '诊断层 · 识别流失',
    icon: Eye,
    theme: 'amber',
    status: 'active',
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
    theme: 'cyan',
    status: 'active',
    metrics: [
      { label: '生成营销页', value: '12' },
      { label: '推送位', value: '5' },
      { label: 'CTR提升', value: '+18%' },
    ],
  },
];

const flywheelFlows: FlywheelFlow[] = [
  { from: 'kb', to: 'visitor', label: '提供分析基准', data: '行业流失率/词根映射' },
  { from: 'kb', to: 'content', label: '提供专业语料', data: 'RAG检索增强' },
  { from: 'visitor', to: 'content', label: '意图指纹', data: '词根+阶段+画像' },
  { from: 'content', to: 'visitor', label: '改后数据回流', data: 'CTR/转化对比' },
  { from: 'content', to: 'kb', label: '效果校准', data: '三柱权重迭代' },
];

const overallFunnel: FunnelStage[] = [
  { name: '到达', count: 5000, rate: 100, isBottleneck: false },
  { name: '浏览', count: 3200, rate: 64, isBottleneck: false },
  { name: '互动', count: 1100, rate: 22, isBottleneck: true },
  { name: '留资', count: 230, rate: 4.6, isBottleneck: true },
];

// 闭环执行日志（模拟数据）
const closedLoopLogs: AgentLog[] = [
  { time: '10:42:15', agent: '访客分析', action: '识别浏览→互动瓶颈', result: 'CTA 不匹配意图', next: '→ 内容运营' },
  { time: '10:42:18', agent: '知识库', action: '召回承接语料', result: 'RAG 命中 18 切片' },
  { time: '10:42:21', agent: '内容运营', action: '生成营销页', result: '对比阶段 · 行业知识型' },
  { time: '10:42:24', agent: '内容运营', action: '推送至首屏Banner', result: '曝光+1' },
  { time: '10:48:33', agent: '访客分析', action: '采集改后行为', result: 'CTR 5%→11%' },
  { time: '10:48:36', agent: '内容运营', action: '回流校准三柱', result: '新鲜度权重↑' },
  { time: '10:48:39', agent: '知识库', action: '更新基准值', result: '本环节基线+3pp' },
];

const themeColors = {
  purple: {
    grad: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-600',
    ring: 'ring-violet-200',
  },
  amber: {
    grad: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
    ring: 'ring-amber-200',
  },
  cyan: {
    grad: 'from-cyan-500 to-teal-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-600',
    ring: 'ring-cyan-200',
  },
};

export default function AgentOverview() {
  const [activeLogIdx, setActiveLogIdx] = useState(0);
  const [isLoopRunning, setIsLoopRunning] = useState(true);

  const goTo = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  // 自动轮播日志
  useEffect(() => {
    if (!isLoopRunning) return;
    const timer = setInterval(() => {
      setActiveLogIdx((prev) => (prev + 1) % closedLoopLogs.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isLoopRunning]);

  // 关键指标
  const kpis = [
    { label: '今日访问量', value: '5,000', delta: '+12%', trend: 'up', icon: Users },
    { label: '整体转化率', value: '4.6%', delta: '+1.2pp', trend: 'up', icon: Target },
    { label: 'AI承接后CTR', value: '11.3%', delta: '+18%', trend: 'up', icon: TrendingUp },
    { label: 'AI来源流量占比', value: '12.4%', delta: '+3.2pp', trend: 'up', icon: Sparkles },
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
                <h1 className="text-2xl font-bold mb-1">价值飞轮 · 闭环运行总览</h1>
                <p className="text-purple-50/90 text-sm">知识库 × 智能体协同 · 自动承接 · 持续校准</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
                <RefreshCw className={`w-5 h-5 text-white ${isLoopRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
              </div>
              <div>
                <div className="text-xs text-purple-50/80">飞轮状态</div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  {isLoopRunning ? '自动闭环运行中' : '已暂停'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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

      {/* ===== 价值飞轮（核心可视化）===== */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">价值飞轮 · 三方协同闭环</h2>
          </div>
          <span className="text-xs text-gray-400">知识库 × 访客分析 × 内容运营</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          {/* 三节点 */}
          {flywheelNodes.map((node) => {
            const Icon = node.icon;
            const theme = themeColors[node.theme];
            return (
              <div
                key={node.id}
                className={`relative bg-gradient-to-br ${theme.bg} rounded-2xl border-2 ${theme.border} p-5 shadow-sm`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${theme.grad} rounded-xl flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-800">{node.name}</h3>
                    <p className="text-xs text-gray-500">{node.desc}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full flex items-center gap-1 flex-shrink-0">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    运行中
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-white/60 rounded-xl p-3 border border-white">
                  {node.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className={`text-lg font-bold ${theme.text}`}>{m.value}</div>
                      <div className="text-[10px] text-gray-500">{m.label}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => goTo(node.id === 'kb' ? 'ai-knowledge-base' : node.id === 'visitor' ? 'agent-visitor' : 'agent-content')}
                  className={`mt-3 w-full text-xs py-2 rounded-lg border ${theme.border} ${theme.text} ${theme.bg} hover:opacity-80 transition-opacity flex items-center justify-center gap-1`}
                >
                  进入详情 <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}

          {/* 中央闭环箭头标识（lg 屏可见）*/}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-purple-200 flex items-center justify-center">
              <RefreshCw className="w-7 h-7 text-purple-600 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>
        </div>

        {/* 流向说明 */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-purple-600" />
            <h4 className="text-sm font-bold text-gray-800">自动串联流</h4>
            <span className="text-xs text-gray-400">五条数据流向 · 无需人工干预</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {flywheelFlows.map((f, i) => {
              const fromNode = flywheelNodes.find((n) => n.id === f.from)!;
              const toNode = flywheelNodes.find((n) => n.id === f.to)!;
              return (
                <div key={i} className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-xs font-bold ${themeColors[fromNode.theme].text}`}>{fromNode.name}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs font-bold ${themeColors[toNode.theme].text}`}>{toNode.name}</span>
                  </div>
                  <div className="text-xs text-gray-700 font-medium">{f.label}</div>
                  <div className="text-[10px] text-gray-400">{f.data}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 转化漏斗 + 闭环日志 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* 整体转化漏斗 */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-bold text-gray-800">整体转化漏斗</h3>
            </div>
            <span className="text-xs text-gray-400">今日累计</span>
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
                          stage.isBottleneck
                            ? 'bg-gradient-to-r from-rose-500 to-red-600'
                            : 'bg-gradient-to-r from-violet-400 to-purple-500'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      >
                        <div className="text-white">
                          <span className="text-lg font-bold">{stage.count.toLocaleString()}</span>
                          <span className="text-xs ml-1 opacity-80">人</span>
                        </div>
                        {stage.isBottleneck && (
                          <span className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            瓶颈
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
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700">
                <strong>瓶颈定位：</strong>「互动 → 留资」环节流失 79%（基准 68%），已被访客分析智能体识别并自动派单至内容运营智能体生成承接营销页。
              </div>
            </div>
          </div>
        </div>

        {/* 闭环执行日志 */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-bold text-gray-800">闭环执行日志</h3>
            </div>
            <button
              onClick={() => setIsLoopRunning(!isLoopRunning)}
              className={`text-xs px-2 py-1 rounded-md border flex items-center gap-1 transition-colors ${
                isLoopRunning
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-emerald-50 text-emerald-600 border-emerald-200'
              }`}
            >
              {isLoopRunning ? '暂停' : '启动'} <RefreshCw className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {closedLoopLogs.map((log, idx) => {
              const isActive = idx === activeLogIdx;
              const agentColor =
                log.agent === '访客分析' ? 'text-amber-600 bg-amber-50 border-amber-200'
                : log.agent === '内容运营' ? 'text-cyan-600 bg-cyan-50 border-cyan-200'
                : 'text-violet-600 bg-violet-50 border-violet-200';
              return (
                <div
                  key={idx}
                  className={`rounded-lg p-3 border transition-all ${
                    isActive ? 'border-purple-300 bg-purple-50/50 shadow-sm scale-[1.02]' : 'border-gray-100 bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-500 font-mono">{log.time}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${agentColor}`}>{log.agent}</span>
                  </div>
                  <div className="text-xs text-gray-800 font-medium mb-0.5">{log.action}</div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-gray-600">{log.result}</span>
                    {log.next && (
                      <span className="text-[10px] text-purple-500 ml-auto flex items-center gap-0.5">
                        <ArrowRight className="w-3 h-3" /> {log.next}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== 闭环价值产出 ===== */}
      <section className="bg-gradient-to-br from-purple-50 to-cyan-50 rounded-2xl border border-purple-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-bold text-gray-800">闭环价值产出</h2>
          <span className="text-xs text-gray-400">飞轮转动 1 周后回流</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-gray-500">线索增长</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600">+132</div>
            <div className="text-[10px] text-gray-400">线索 / 月</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-rose-500" />
              <span className="text-xs text-gray-500">跳出率下降</span>
            </div>
            <div className="text-2xl font-bold text-rose-600">-23%</div>
            <div className="text-[10px] text-gray-400">瓶颈环节改善</div>
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
            <h3 className="text-sm font-bold text-gray-800">知识库底座</h3>
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
          <p className="text-xs text-gray-500 mb-3">查看实时访客意图分布、漏斗瓶颈与改进建议</p>
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
          <p className="text-xs text-gray-500 mb-3">查看内容完整度评分、营销页生成与推送效果</p>
          <span className="text-xs text-cyan-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            进入 <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </section>
    </div>
  );
}
