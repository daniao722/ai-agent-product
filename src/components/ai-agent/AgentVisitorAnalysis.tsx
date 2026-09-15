import { useState } from 'react';
import {
  Search,
  Activity,
  TrendingDown,
  Filter,
  GitBranch,
  AlertTriangle,
  Target,
  Lightbulb,
  ArrowRight,
  Database,
  Play,
  Loader2,
  CheckCircle2,
  Eye,
  Users,
  RefreshCw,
  Send,
  BarChart3,
  ShieldCheck,
  MousePointerClick,
  Gauge,
} from 'lucide-react';

// ===== Types =====
type TimeRange = 'today' | '7d' | '30d';
type RunStatus = 'idle' | 'running' | 'done';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  lossRate: number;
  benchmark: number;
  isBottleneck: boolean;
  lossScale: number;
}

interface RootCause {
  id: string;
  stage: string;
  cause: string;
  suggestion: string;
  icon: typeof AlertTriangle;
}

interface Recommendation {
  id: string;
  content: string;
  expectedGain: string;
  gainValue: number;
  agent: string;
  priority: 'P0' | 'P1' | 'P2';
  adopted: boolean;
}

interface LiveVisitor {
  id: string;
  keyword: string;
  rootType: string;
  intent: 'high' | 'medium' | 'low';
  pages: number;
  staySec: number;
  currentPage: string;
  ctaAction: string;
}

// ===== 智能体运行结果数据 =====
const funnelByRange: Record<TimeRange, FunnelStage[]> = {
  today: [
    { id: 'f1', name: '到达', count: 612, lossRate: 0, benchmark: 0, isBottleneck: false, lossScale: 0 },
    { id: 'f2', name: '浏览', count: 398, lossRate: 35, benchmark: 28, isBottleneck: true, lossScale: 214 },
    { id: 'f3', name: '互动', count: 142, lossRate: 64, benchmark: 52, isBottleneck: true, lossScale: 256 },
    { id: 'f4', name: '留资', count: 31, lossRate: 78, benchmark: 68, isBottleneck: true, lossScale: 111 },
  ],
  '7d': [
    { id: 'f1', name: '到达', count: 5000, lossRate: 0, benchmark: 0, isBottleneck: false, lossScale: 0 },
    { id: 'f2', name: '浏览', count: 3200, lossRate: 36, benchmark: 28, isBottleneck: true, lossScale: 1800 },
    { id: 'f3', name: '互动', count: 1100, lossRate: 65.6, benchmark: 52, isBottleneck: true, lossScale: 2100 },
    { id: 'f4', name: '留资', count: 230, lossRate: 79, benchmark: 68, isBottleneck: true, lossScale: 870 },
  ],
  '30d': [
    { id: 'f1', name: '到达', count: 21800, lossRate: 0, benchmark: 0, isBottleneck: false, lossScale: 0 },
    { id: 'f2', name: '浏览', count: 14200, lossRate: 35, benchmark: 28, isBottleneck: true, lossScale: 7600 },
    { id: 'f3', name: '互动', count: 4960, lossRate: 65, benchmark: 52, isBottleneck: true, lossScale: 9240 },
    { id: 'f4', name: '留资', count: 1082, lossRate: 78, benchmark: 68, isBottleneck: true, lossScale: 3878 },
  ],
};

const intentByRange: Record<TimeRange, { high: number; medium: number; low: number; online: number }> = {
  today: { high: 8, medium: 21, low: 16, online: 45 },
  '7d': { high: 38, medium: 92, low: 70, online: 200 },
  '30d': { high: 168, medium: 412, low: 310, online: 890 },
};

const rootCauses: RootCause[] = [
  {
    id: 'rc1',
    stage: '浏览 → 互动',
    cause: 'CTA 不醒目 / 与意图不匹配',
    suggestion: '按意图分层重写 CTA 文案：高意向强导询价、中意向强导案例、低意向强导选型指南',
    icon: MousePointerClick,
  },
  {
    id: 'rc2',
    stage: '到达 → 浏览',
    cause: '首屏内容与搜索意图不匹配',
    suggestion: '按搜索词类型动态调取首屏模块（产品词→产品卡、方案词→选型指南、行业词→资质案例）',
    icon: Eye,
  },
  {
    id: 'rc3',
    stage: '互动 → 留资',
    cause: '留资门槛过高 / 信任要素缺失',
    suggestion: '简化表单为「电话+阀门品类」2字段，并加入资质徽章、客户 LOGO 墙、ISO 认证标识',
    icon: ShieldCheck,
  },
];

const recommendations: Recommendation[] = [
  {
    id: 'r1',
    content: '互动→留资环节：简化表单至 2 字段，并加入资质徽章 + 客户 LOGO 墙，降低信任摩擦',
    expectedGain: '+86 条线索 / 月',
    gainValue: 870,
    agent: '对接 AI 内容运营',
    priority: 'P0',
    adopted: false,
  },
  {
    id: 'r2',
    content: '浏览→互动环节：按意图分层重写 CTA（高意向→一键询价、中意向→查看案例、低意向→下载选型指南）',
    expectedGain: '+132 条线索 / 月',
    gainValue: 2100,
    agent: '对接 AI 内容运营',
    priority: 'P0',
    adopted: false,
  },
  {
    id: 'r3',
    content: '到达→浏览环节：按搜索词类型动态调取首屏模块，使首屏与搜索意图对齐',
    expectedGain: '+54 条线索 / 月',
    gainValue: 1800,
    agent: '对接 AI 增长策略',
    priority: 'P1',
    adopted: false,
  },
  {
    id: 'r4',
    content: '产品详情页新增「规格对比 + 选型推荐器」，承接产品词流量的精准需求',
    expectedGain: '+28 条线索 / 月',
    gainValue: 420,
    agent: '对接 AI 智能客服',
    priority: 'P2',
    adopted: false,
  },
];

const liveVisitors: LiveVisitor[] = [
  { id: 'v1', keyword: '不锈钢球阀 DN100', rootType: '产品词', intent: 'high', pages: 4, staySec: 187, currentPage: '/products/ss-ball-valve', ctaAction: '查看报价' },
  { id: 'v2', keyword: '阀门厂家', rootType: '行业词', intent: 'medium', pages: 3, staySec: 64, currentPage: '/about', ctaAction: '浏览中' },
  { id: 'v3', keyword: 'XX阀门有限公司', rootType: '公司词', intent: 'high', pages: 6, staySec: 312, currentPage: '/contact', ctaAction: '二次回访' },
  { id: 'v4', keyword: '高温阀门怎么选', rootType: '方案词', intent: 'medium', pages: 2, staySec: 48, currentPage: '/blog/selection-guide', ctaAction: '阅读中' },
  { id: 'v5', keyword: '阀门', rootType: '泛词', intent: 'low', pages: 1, staySec: 8, currentPage: '/', ctaAction: '即将离开' },
];

// ===== Helpers =====
const getIntentBadge = (level: LiveVisitor['intent']) => {
  switch (level) {
    case 'high':
      return { label: '高意向', color: 'bg-rose-100 text-rose-700 border-rose-200', dot: 'bg-rose-500' };
    case 'medium':
      return { label: '中意向', color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' };
    case 'low':
      return { label: '低意向', color: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' };
  }
};

const getPriorityBadge = (p: 'P0' | 'P1' | 'P2') => {
  switch (p) {
    case 'P0':
      return 'bg-rose-100 text-rose-700 border-rose-200';
    case 'P1':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'P2':
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

// ===== Main Component =====
export default function AgentVisitorAnalysis() {
  const [url, setUrl] = useState('https://www.xx-valve.com');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [runStatus, setRunStatus] = useState<RunStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [recs, setRecs] = useState<Recommendation[]>(recommendations);
  const [trackedIds, setTrackedIds] = useState<Set<string>>(new Set());

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: 'today', label: '今日' },
    { value: '7d', label: '近 7 天' },
    { value: '30d', label: '近 30 天' },
  ];

  const handleRun = () => {
    if (!url.trim()) {
      alert('请输入要诊断的网站 URL，例如 https://www.xx-valve.com');
      return;
    }
    setRunStatus('running');
    setProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += 4;
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setRunStatus('done');
      }
    }, 180);
  };

  const handleAdopt = (id: string) => {
    setRecs((prev) => prev.map((r) => (r.id === id ? { ...r, adopted: !r.adopted } : r)));
    const rec = recs.find((r) => r.id === id);
    if (rec && !rec.adopted) {
      alert(`已采纳建议：${rec.content.slice(0, 30)}...\n将自动${rec.agent}生成承接内容并下发执行。`);
    }
  };

  const handleTrack = (id: string) => {
    setTrackedIds((prev) => new Set(prev).add(id));
    alert('已开启改后数据追踪，将在 24 小时后回流对比数据；如瓶颈未消除，自动进入下一轮诊断。');
  };

  const sortedRecs = [...recs].sort((a, b) => b.gainValue - a.gainValue);
  const funnelStages = funnelByRange[timeRange];
  const intentData = intentByRange[timeRange];
  const totalIntent = intentData.high + intentData.medium + intentData.low;
  const onlineCount = intentData.online;
  const intentHighCount = intentData.high;
  const intentMediumCount = intentData.medium;
  const intentLowCount = intentData.low;
  const intentHighPct = Math.round((intentData.high / totalIntent) * 100);
  const intentMediumPct = Math.round((intentData.medium / totalIntent) * 100);
  const intentLowPct = Math.round((intentData.low / totalIntent) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/40 p-6 space-y-6">
      {/* ===== Header ===== */}
      <header className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-2xl p-8 text-white shadow-xl shadow-amber-200/50 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-white/15 backdrop-blur rounded-full font-medium tracking-wider">
                    诊断层 · DIAGNOSIS
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-1">AI 访客行为分析智能体</h1>
                <p className="text-amber-50/90 text-sm">看见看不见的商机流失</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/20 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-amber-50/80">知识库连接状态</div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  分析基准维度已连接
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 运行控制 ===== */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Play className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-gray-800">运行控制</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-5">
            <label className="text-xs text-gray-500 mb-1.5 block">网站 URL</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.xx-valve.com"
                className="w-full text-sm border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <label className="text-xs text-gray-500 mb-1.5 block">时间段</label>
            <div className="flex gap-1.5 bg-gray-50 rounded-lg p-1 border border-gray-200">
              {timeRangeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTimeRange(opt.value)}
                  className={`flex-1 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                    timeRange === opt.value
                      ? 'bg-white text-amber-600 shadow-sm border border-amber-200'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <button
              onClick={handleRun}
              disabled={runStatus === 'running'}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity shadow-md shadow-amber-200 disabled:opacity-60"
            >
              {runStatus === 'running' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : runStatus === 'done' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {runStatus === 'running' ? '诊断中...' : runStatus === 'done' ? '诊断完成' : '开始诊断'}
            </button>
          </div>
        </div>

        {runStatus !== 'idle' && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-500">
                {runStatus === 'done'
                  ? '✓ 诊断完成，已识别 3 个瓶颈环节、4 条改进建议'
                  : '正在采集全站行为数据并识别异常信号...'}
              </span>
              <span className="font-bold text-amber-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* ===== 实时访客意图分布 ===== */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-gray-800">实时访客意图分布</h3>
          </div>
          <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            在线 {onlineCount}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: '高意向', count: intentHighCount, percent: intentHighPct, color: 'text-rose-600', bg: 'bg-rose-500' },
            { label: '中意向', count: intentMediumCount, percent: intentMediumPct, color: 'text-amber-600', bg: 'bg-amber-500' },
            { label: '低意向', count: intentLowCount, percent: intentLowPct, color: 'text-slate-500', bg: 'bg-slate-400' },
          ].map((d) => (
            <div key={d.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 ${d.bg} rounded-full`} />
                  <span className={`text-sm font-bold ${d.color}`}>{d.label}</span>
                </div>
                <div className="text-gray-600 text-sm">
                  <span className="font-bold text-base">{d.count}</span> 人 · {d.percent}%
                </div>
              </div>
              <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-gray-200">
                <div
                  className={`h-full ${d.bg} rounded-full transition-all duration-700`}
                  style={{ width: `${d.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 实时访客列表 */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-gray-800">实时在线访客</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-amber-50/60 text-left text-xs text-gray-600">
                  <th className="px-3 py-2.5 font-semibold rounded-l-lg">访客</th>
                  <th className="px-3 py-2.5 font-semibold">搜索词</th>
                  <th className="px-3 py-2.5 font-semibold">词根类型</th>
                  <th className="px-3 py-2.5 font-semibold">意图</th>
                  <th className="px-3 py-2.5 font-semibold">浏览页数</th>
                  <th className="px-3 py-2.5 font-semibold">停留</th>
                  <th className="px-3 py-2.5 font-semibold">当前页</th>
                  <th className="px-3 py-2.5 font-semibold rounded-r-lg">行为</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {liveVisitors.map((v, i) => {
                  const badge = getIntentBadge(v.intent);
                  return (
                    <tr key={v.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-3 py-2.5 font-medium text-gray-800">访客 #{i + 1}</td>
                      <td className="px-3 py-2.5 text-gray-700">{v.keyword}</td>
                      <td className="px-3 py-2.5">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{v.rootType}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${badge.color} flex items-center gap-1 w-fit`}>
                          <span className={`w-1 h-1 ${badge.dot} rounded-full`} />
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-700">{v.pages} 页</td>
                      <td className="px-3 py-2.5 text-gray-700">{v.staySec}s</td>
                      <td className="px-3 py-2.5 text-xs text-cyan-600 font-mono">{v.currentPage}</td>
                      <td className="px-3 py-2.5 text-gray-600 text-xs">{v.ctaAction}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 转化漏斗诊断结果 ===== */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-600 rounded-lg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">转化漏斗诊断结果</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 漏斗可视化 */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-bold text-gray-800">4 环节漏斗</h4>
              </div>
              <span className="text-xs text-gray-400">红色为瓶颈环节</span>
            </div>
            <div className="space-y-2">
              {funnelStages.map((stage, idx) => {
                const maxCount = funnelStages[0].count;
                const widthPercent = (stage.count / maxCount) * 100;
                return (
                  <div key={stage.id}>
                    <div className="flex items-center gap-3">
                      <div className="w-16 text-right">
                        <div className="text-sm font-bold text-gray-800">{stage.name}</div>
                      </div>
                      <div className="flex-1 relative">
                        <div
                          className={`h-12 rounded-lg flex items-center justify-between px-4 transition-all duration-700 ${
                            stage.isBottleneck
                              ? 'bg-gradient-to-r from-rose-500 to-red-600'
                              : 'bg-gradient-to-r from-amber-400 to-orange-500'
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
                      {idx > 0 ? (
                        <div className="w-20 text-right">
                          <div className={`text-sm font-bold ${stage.isBottleneck ? 'text-rose-600' : 'text-gray-600'}`}>
                            流失 {stage.lossRate}%
                          </div>
                          <div className="text-xs text-gray-400">规模 {stage.lossScale}</div>
                        </div>
                      ) : (
                        <div className="w-20" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 行业基准对比 */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-bold text-gray-800">行业基准对比</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-amber-50/60 text-left text-xs text-gray-600">
                      <th className="px-3 py-2 font-semibold rounded-l-lg">环节</th>
                      <th className="px-3 py-2 font-semibold">我的流失率</th>
                      <th className="px-3 py-2 font-semibold">行业基准</th>
                      <th className="px-3 py-2 font-semibold">超出幅度</th>
                      <th className="px-3 py-2 font-semibold rounded-r-lg">判定</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {funnelStages.slice(1).map((stage) => {
                      const over = stage.lossRate - stage.benchmark;
                      const overPercent = ((over / stage.benchmark) * 100).toFixed(0);
                      const isBottleneck = over >= 20;
                      return (
                        <tr key={stage.id} className={isBottleneck ? 'bg-rose-50/50' : ''}>
                          <td className="px-3 py-2.5 font-semibold text-gray-800">{stage.name}</td>
                          <td className="px-3 py-2.5 text-gray-700">{stage.lossRate}%</td>
                          <td className="px-3 py-2.5 text-gray-500">{stage.benchmark}%</td>
                          <td className={`px-3 py-2.5 font-semibold ${isBottleneck ? 'text-rose-600' : 'text-gray-600'}`}>
                            +{overPercent}%
                          </td>
                          <td className="px-3 py-2.5">
                            {isBottleneck ? (
                              <span className="text-xs px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full border border-rose-200 flex items-center gap-1 w-fit">
                                <AlertTriangle className="w-3 h-3" />
                                瓶颈
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full border border-green-200">
                                正常
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 热力图/回放（占位） */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 border-dashed p-5 text-center">
              <div className="w-12 h-12 mx-auto bg-gray-200 rounded-xl flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="text-sm font-bold text-gray-500 mb-1">热力图定位</h4>
              <p className="text-xs text-gray-400 mb-3">瓶颈环节点击冷区可视化</p>
              <span className="inline-block text-xs px-2 py-1 bg-gray-200 text-gray-500 rounded">暂无</span>
            </div>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 border-dashed p-5 text-center">
              <div className="w-12 h-12 mx-auto bg-gray-200 rounded-xl flex items-center justify-center mb-3">
                <Play className="w-6 h-6 text-gray-400" />
              </div>
              <h4 className="text-sm font-bold text-gray-500 mb-1">会话回放</h4>
              <p className="text-xs text-gray-400 mb-3">瓶颈环节典型访客路径还原</p>
              <span className="inline-block text-xs px-2 py-1 bg-gray-200 text-gray-500 rounded">暂无</span>
            </div>
          </div>
        </div>

        {/* 根因归类结果 */}
        <div className="mt-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h4 className="text-sm font-bold text-gray-800">瓶颈根因归类</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rootCauses.map((rc) => {
              const Icon = rc.icon;
              return (
                <div key={rc.id} className="rounded-xl border border-rose-100 bg-rose-50/30 p-4 hover:bg-rose-50/60 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">{rc.stage}</div>
                      <div className="text-sm font-bold text-gray-800">{rc.cause}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600 leading-relaxed">{rc.suggestion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 改进建议（按收益排序） ===== */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-gray-800">改进建议（按收益排序）</h3>
          </div>
        </div>
        <div className="space-y-3">
          {sortedRecs.map((rec, idx) => (
            <div
              key={rec.id}
              className={`rounded-xl border p-4 transition-all ${
                rec.adopted
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-gray-200 bg-white hover:border-amber-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-amber-700">#{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${getPriorityBadge(rec.priority)}`}>
                          {rec.priority}
                        </span>
                        {rec.adopted && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            已采纳
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">{rec.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-gray-500">预期收益</span>
                        <span className="font-bold text-amber-700">{rec.expectedGain}</span>
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="flex items-center gap-1.5">
                        <GitBranch className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-500">{rec.agent}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTrack(rec.id)}
                        disabled={trackedIds.has(rec.id)}
                        className="text-xs px-2.5 py-1 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        {trackedIds.has(rec.id) ? '追踪中' : '追踪'}
                      </button>
                      <button
                        onClick={() => handleAdopt(rec.id)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                          rec.adopted
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-amber-500 text-white hover:bg-amber-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {rec.adopted ? '已采纳' : '采纳'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 协作串联 ===== */}
      <footer className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-amber-200/50">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5 text-white" />
          <h3 className="text-lg font-bold">协作串联 · 闭环落地</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => {
              alert('已将瓶颈根因 + 建议方案发送到「AI 内容运营」，即将跳转查看承接内容生成...');
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'agent-content' }));
            }}
            className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur hover:bg-white/25 rounded-xl px-4 py-3 border border-white/20 transition-colors"
          >
            <Send className="w-4 h-4" />
            <div className="text-left">
              <div className="text-sm font-semibold">发送到 AI 内容运营</div>
              <div className="text-xs text-amber-50/80">生成承接内容</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
          <button
            onClick={() => alert('已开启改后数据追踪，24 小时后回流对比：跳出率、互动率、留资率是否达到目标改善区间。')}
            className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur hover:bg-white/25 rounded-xl px-4 py-3 border border-white/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <div className="text-left">
              <div className="text-sm font-semibold">追踪改后数据</div>
              <div className="text-xs text-amber-50/80">24h 对比回流</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
          <button
            onClick={() => {
              setRunStatus('idle');
              setProgress(0);
              setTrackedIds(new Set());
              setRecs(recommendations);
              alert('已进入下一轮诊断，请重新配置 URL 与时间段后启动。本轮基线数据已归档用于对比。');
            }}
            className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur hover:bg-white/25 rounded-xl px-4 py-3 border border-white/20 transition-colors"
          >
            <Play className="w-4 h-4" />
            <div className="text-left">
              <div className="text-sm font-semibold">进入下一轮诊断</div>
              <div className="text-xs text-amber-50/80">瓶颈未消除时迭代</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
        </div>
      </footer>
    </div>
  );
}
