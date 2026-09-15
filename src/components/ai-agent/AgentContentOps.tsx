import { useState } from 'react';
import {
  FileText,
  Sparkles,
  Eye,
  Shield,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Send,
  Database,
  Play,
  Loader2,
  Target,
  ScanLine,
  Gauge,
  GitBranch,
  PenLine,
  Send as SendIcon,
  Activity,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Layers,
} from 'lucide-react';

// ===== Types =====
type LayerKey = '基础层' | '价值层' | '信任层' | '转化层' | 'SEO层';
type DiagTone = 'red' | 'yellow' | 'green';

interface PageDiagnosis {
  id: string;
  pageName: string;
  url: string;
  scores: Record<LayerKey, number>;
  total: number;
  tone: DiagTone;
  issues: string[];
  lastUpdate: string;
  daysSinceUpdate: number;
  wordCount: number;
}

interface Pillar {
  key: 'seen' | 'understood' | 'trusted';
  title: string;
  icon: typeof Eye;
  color: string;
  bg: string;
  score: number;
}

// ===== 智能体运行结果数据 =====
const layerKeys: LayerKey[] = ['基础层', '价值层', '信任层', '转化层', 'SEO层'];

const pageDiagnoses: PageDiagnosis[] = [
  {
    id: 'p1',
    pageName: '电动蝶阀 D941X-16C',
    url: '/products/electric-butterfly-valve-d941x',
    scores: { '基础层': 88, '价值层': 72, '信任层': 60, '转化层': 45, 'SEO层': 80 },
    total: 71,
    tone: 'yellow',
    issues: ['转化层CTA位置过深', '信任层缺资质认证编号', 'FAQ条目少于3条'],
    lastUpdate: '2026-03-12',
    daysSinceUpdate: 187,
    wordCount: 420,
  },
  {
    id: 'p2',
    pageName: '气动球阀 Q641F-16P',
    url: '/products/pneumatic-ball-valve-q641f',
    scores: { '基础层': 95, '价值层': 90, '信任层': 85, '转化层': 88, 'SEO层': 92 },
    total: 91,
    tone: 'green',
    issues: ['Schema.org Product 字段缺少 brand'],
    lastUpdate: '2026-08-20',
    daysSinceUpdate: 26,
    wordCount: 1280,
  },
  {
    id: 'p3',
    pageName: '蒸汽截止阀 J41H-25',
    url: '/products/steam-globe-valve-j41h',
    scores: { '基础层': 50, '价值层': 40, '信任层': 30, '转化层': 25, 'SEO层': 35 },
    total: 37,
    tone: 'red',
    issues: ['参数表不完整', '无客户案例', '无CTA', '无Schema.org结构化数据', '正文<300字'],
    lastUpdate: '2025-11-08',
    daysSinceUpdate: 310,
    wordCount: 180,
  },
];

const pillars: Pillar[] = [
  {
    key: 'seen',
    title: '被AI看见',
    icon: Eye,
    color: 'text-cyan-600',
    bg: 'from-cyan-50 to-cyan-100',
    score: 90,
  },
  {
    key: 'understood',
    title: '被AI理解',
    icon: Layers,
    color: 'text-teal-600',
    bg: 'from-teal-50 to-emerald-100',
    score: 83,
  },
  {
    key: 'trusted',
    title: '被AI信任',
    icon: Shield,
    color: 'text-cyan-700',
    bg: 'from-sky-50 to-cyan-100',
    score: 78,
  },
];

const pushStats = [
  { method: '首屏Banner', exposures: 12450, clicks: 1245, entries: 980, conversions: 78, ctr: 10.0 },
  { method: '页中横幅', exposures: 8900, clicks: 623, entries: 410, conversions: 32, ctr: 7.0 },
  { method: '侧边广告位', exposures: 15600, clicks: 780, entries: 540, conversions: 45, ctr: 5.0 },
  { method: '底部弹出', exposures: 4200, clicks: 504, entries: 380, conversions: 41, ctr: 12.0 },
  { method: '智能客服推送', exposures: 680, clicks: 163, entries: 142, conversions: 28, ctr: 24.0 },
];

// ===== Helpers =====
const toneStyle = (tone: DiagTone) => {
  switch (tone) {
    case 'red':
      return { label: '待优化', bar: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    case 'yellow':
      return { label: '有短板', bar: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    case 'green':
      return { label: '达标', bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
  }
};

const judgmentTone = (score: number): DiagTone => (score >= 80 ? 'green' : score >= 65 ? 'yellow' : 'red');

// ===== Sub Components =====
const ScoreGauge = ({ score, label, tone, size = 'md' }: { score: number; label: string; tone: DiagTone; size?: 'sm' | 'md' | 'lg' }) => {
  const ts = toneStyle(tone);
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const dim = size === 'lg' ? 'w-40 h-40' : size === 'sm' ? 'w-24 h-24' : 'w-32 h-32';
  const font = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl';
  return (
    <div className={`relative ${dim} mx-auto`}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f3f4f6" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={`${ts.text} transition-all duration-1000`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${font} font-bold ${ts.text}`}>{score}</span>
        <span className="text-[10px] text-gray-400 mt-0.5">{label}</span>
      </div>
    </div>
  );
};

const FreshnessTag = ({ days, words }: { days: number; words: number }) => (
  <div className="flex flex-wrap gap-1.5">
    {days > 180 ? (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded">
        过时 · {days}天前
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded">
        新鲜 · {days}天前
      </span>
    )}
    {words < 300 && (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded">
        过短 · {words}字
      </span>
    )}
  </div>
);

const PageDiagRow = ({ page }: { page: PageDiagnosis }) => {
  const ts = toneStyle(page.tone);
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-cyan-600 flex-shrink-0" />
            <h5 className="text-sm font-bold text-gray-800 truncate">{page.pageName}</h5>
            <span className={`text-xs px-2 py-0.5 rounded-full ${ts.bg} ${ts.text} ${ts.border} border`}>{ts.label}</span>
          </div>
          <a className="text-xs text-cyan-600 hover:underline flex items-center gap-1" href={page.url} onClick={(e) => e.preventDefault()}>
            <ExternalLink className="w-3 h-3" /> {page.url}
          </a>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`text-2xl font-bold ${ts.text}`}>{page.total}</div>
          <div className="text-[10px] text-gray-400">完整度</div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {layerKeys.map((lk) => {
          const s = page.scores[lk];
          const tone: DiagTone = s < 60 ? 'red' : s <= 80 ? 'yellow' : 'green';
          const t = toneStyle(tone);
          return (
            <div key={lk} className="bg-gray-50 rounded p-1.5 text-center">
              <div className="text-[10px] text-gray-500 mb-0.5">{lk}</div>
              <div className={`text-sm font-bold ${t.text}`}>{s}</div>
              <div className={`mt-1 h-1 ${t.bar} rounded-full`} style={{ width: `${s}%` }} />
            </div>
          );
        })}
      </div>
      <FreshnessTag days={page.daysSinceUpdate} words={page.wordCount} />
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500 mb-1.5">问题清单：</div>
        <ul className="space-y-1">
          {page.issues.map((iss, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
              <AlertTriangle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>{iss}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const PillarCard = ({ pillar }: { pillar: Pillar }) => {
  const tone = judgmentTone(pillar.score);
  const ts = toneStyle(tone);
  return (
    <div className={`bg-gradient-to-br ${pillar.bg} rounded-xl border border-white p-5 shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-9 h-9 rounded-lg bg-white/70 flex items-center justify-center ${pillar.color}`}>
            <pillar.icon className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-800">{pillar.title}</h4>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${ts.text}`}>{pillar.score}</div>
          <div className="text-[10px] text-gray-400">得分</div>
        </div>
      </div>
      <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
        <div className={`h-full ${ts.bar} rounded-full transition-all duration-700`} style={{ width: `${pillar.score}%` }} />
      </div>
    </div>
  );
};

const MarketingPreview = ({ published }: { published: boolean }) => (
  <article className="bg-white rounded-xl border-2 border-cyan-200 overflow-hidden shadow-lg">
    <div className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4" />
        <span className="text-sm font-bold">营销页预览</span>
      </div>
      {published ? (
        <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> 已发布
        </span>
      ) : (
        <span className="text-xs px-2 py-0.5 bg-amber-400/30 text-amber-100 rounded-full">预览态</span>
      )}
    </div>
    <div className="p-5 space-y-4">
      <div>
        <div className="text-[10px] text-cyan-600 mb-1">SEO标题</div>
        <div className="text-base font-bold text-gray-800">电动蝶阀选型指南 · 工业4.0流体控制方案</div>
      </div>
      <div className="text-[10px] text-gray-400">Meta: 面向化工/水处理/能源行业的电动蝶阀选型指南，含参数对比、客户案例与报价咨询。</div>

      <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
        <div className="text-xs text-cyan-700 font-medium mb-1">Schema.org 结构化数据</div>
        <pre className="text-[10px] text-gray-600 font-mono leading-relaxed overflow-x-auto">
{`{
  "@type": "Product",
  "name": "电动蝶阀 D941X-16C",
  "brand": "ValveX",
  "category": "工业阀门/蝶阀",
  "dateModified": "2026-09-15"
}`}
        </pre>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-gray-700 leading-relaxed">
          <strong>结论前置：</strong>电动蝶阀 D941X-16C 适用于 DN50-DN1200 管道，工作温度 -20℃~150℃，最大压力 1.6MPa，
          广泛应用于化工、水处理、能源行业的流体控制与切断场景。
        </div>
        <div className="text-xs text-gray-700 leading-relaxed">
          <strong>原理：</strong>电动执行器驱动阀板 90° 旋转实现开闭，响应时间 ≤8 秒，扭矩 50-2000N·m 可调。
        </div>
        <div className="text-xs text-gray-700 leading-relaxed">
          <strong>权威信号：</strong>通过 ISO 9001 / CE / API 609 认证（编号可验证），作者：王工（流体控制高级工程师，从业 15 年）。
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-xs font-semibold text-gray-700 mb-2">参数表（结构化）</div>
        <table className="w-full text-xs">
          <tbody className="divide-y divide-gray-200">
            <tr><td className="py-1 text-gray-500">口径范围</td><td className="py-1 font-medium text-gray-800">DN50-DN1200</td></tr>
            <tr><td className="py-1 text-gray-500">压力等级</td><td className="py-1 font-medium text-gray-800">PN16</td></tr>
            <tr><td className="py-1 text-gray-500">材质</td><td className="py-1 font-medium text-gray-800">WCB + EPDM</td></tr>
            <tr><td className="py-1 text-gray-500">控制方式</td><td className="py-1 font-medium text-gray-800">开关型 / 调节型</td></tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={() => alert('点击将进入落地页表单')}
        className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <Target className="w-4 h-4" /> 获取报价 / 立即咨询
      </button>
    </div>
  </article>
);

// ===== Main Component =====
export default function AgentContentOps() {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanDone, setScanDone] = useState(true); // 默认已有结果
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(true); // 默认已生成
  const [intent, setIntent] = useState('');
  const [generatingPage, setGeneratingPage] = useState(false);
  const [pageReady, setPageReady] = useState(true);
  const [published, setPublished] = useState(false);
  // 扫描轮次：让重新扫描后三柱得分有微小变化，模拟数据回流
  const [scanRound, setScanRound] = useState(0);

  const avgScore = Math.round(pageDiagnoses.reduce((s, p) => s + p.total, 0) / pageDiagnoses.length);
  const overallTone = judgmentTone(avgScore);
  // 三柱得分随扫描轮次有微小波动（模拟回流校准）
  const pillarOffset = scanRound * 2;
  const pillarTotal = Math.min(95, Math.round(pillars.reduce((s, p) => s + p.score, 0) / pillars.length) + pillarOffset);
  const pillarTone = judgmentTone(pillarTotal);

  const runScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanDone(false);
    setScanProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += 8;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setScanning(false);
        setScanDone(true);
        setScanRound((r) => r + 1);
      }
      setScanProgress(p);
    }, 150);
  };

  const runGenerate = () => {
    if (generating) return;
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1400);
  };

  const runGenPage = () => {
    if (generatingPage) return;
    setGeneratingPage(true);
    setPageReady(false);
    setPublished(false);
    setTimeout(() => {
      setGeneratingPage(false);
      setPageReady(true);
    }, 1200);
  };

  const publishPage = () => {
    setPublished(true);
    alert('营销页已发布！浏览量与停留时长将自动追踪，未达预期将进入下一轮优化。');
  };

  const totalPushConv = pushStats.reduce((s, p) => s + p.conversions, 0);
  const totalPushExp = pushStats.reduce((s, p) => s + p.exposures, 0);
  const totalPushEntries = pushStats.reduce((s, p) => s + p.entries, 0);
  const totalPushClicks = pushStats.reduce((s, p) => s + p.clicks, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/40 to-teal-50/30 p-6 space-y-6">
      {/* ===== Header ===== */}
      <header className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200">
            <PenLine className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full font-medium">承接+支撑层 · CONTENT & LANDING</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">AI内容运营智能体（含营销页）</h1>
            <p className="text-sm text-gray-500">让网站内容自己会说话</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <Database className="w-3.5 h-3.5" />
            知识库已连接 · 内容专业度维度
          </div>
        </div>
      </header>

      {/* ===== 内容完整度诊断结果 ===== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-cyan-500 text-white rounded-lg flex items-center justify-center">
            <ScanLine className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">内容完整度诊断结果</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 评分仪表盘 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-4 h-4 text-cyan-600" />
              <h3 className="text-sm font-bold text-gray-800">完整度均值</h3>
            </div>
            <ScoreGauge score={avgScore} label="当前均值" tone={overallTone} size="lg" />
            <div className="mt-3 text-center">
              <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full ${toneStyle(overallTone).bg} ${toneStyle(overallTone).text} ${toneStyle(overallTone).border} border`}>
                {overallTone === 'green' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {toneStyle(overallTone).label}
              </span>
            </div>
          </div>

          {/* 页面诊断列表 */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-600" />
                页面诊断列表
              </h3>
              <span className="text-xs text-gray-400">{pageDiagnoses.length} 个产品页</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pageDiagnoses.map((p) => <PageDiagRow key={p.id} page={p} />)}
            </div>
          </div>
        </div>

        {/* 扫描控制 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-sm font-bold text-gray-800">全站扫描</h3>
              <p className="text-xs text-gray-500 mt-0.5">扫描所有产品页 / 营销页 / 文章页的完整度、新鲜度与正文深度</p>
            </div>
            <button
              onClick={runScan}
              disabled={scanning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                scanning ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 shadow-md shadow-cyan-200'
              }`}
            >
              {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {scanning ? '扫描中...' : scanDone ? '重新扫描' : '开始扫描'}
            </button>
          </div>
          {(scanning || scanDone) && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                <span>{scanning ? '正在扫描产品页与营销页...' : '扫描完成，共发现 3 个产品页需优化'}</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-150" style={{ width: `${scanProgress}%` }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== AI友好内容评分 ===== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-cyan-500 text-white rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">AI友好内容评分</h2>
        </div>

        {/* 三柱评分 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p) => <PillarCard key={p.key} pillar={p} />)}
        </div>

        {/* 发布判定 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <ScoreGauge score={pillarTotal} label="三柱总分" tone={pillarTone} size="md" />
              <div className="space-y-2">
                <div className="text-sm font-bold text-gray-800">发布判定</div>
                <div className={`text-xs px-2 py-1 rounded inline-block w-fit ${toneStyle(pillarTone).bg} ${toneStyle(pillarTone).text}`}>
                  当前：{pillarTotal >= 80 ? '可发布' : pillarTotal >= 65 ? '标黄警告' : '硬拦截'}
                </div>
              </div>
            </div>
            <button
              onClick={runGenerate}
              disabled={generating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all self-end ${
                generating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 shadow-md shadow-cyan-200'
              }`}
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {generating ? '生成中...' : generated ? '重新生成' : '生成AI友好内容'}
            </button>
          </div>
          {generated && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              已生成 llms.txt + Schema.org（Organization/Product/FAQPage/BreadcrumbList）+ 结构化参数表 + FAQ答案独立成义；权威信号已嵌入正文。
            </div>
          )}
        </div>

        {/* 外部追踪数据 */}
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-200 p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" /> 外部结果追踪
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 border border-cyan-100">
              <div className="text-[10px] text-gray-400">被引用次数</div>
              <div className="text-xl font-bold text-cyan-600">128</div>
              <div className="text-[10px] text-emerald-600">↑ 较上周 +18%</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-cyan-100">
              <div className="text-[10px] text-gray-400">AI来源流量占比</div>
              <div className="text-xl font-bold text-cyan-600">12.4%</div>
              <div className="text-[10px] text-emerald-600">↑ +3.2pp</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-cyan-100">
              <div className="text-[10px] text-gray-400">FAQ片段引用</div>
              <div className="text-xl font-bold text-cyan-600">42 次</div>
              <div className="text-[10px] text-emerald-600">↑ +9 次</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-cyan-100">
              <div className="text-[10px] text-gray-400">权重校准建议</div>
              <div className="text-sm font-bold text-cyan-600">新鲜度↑</div>
              <div className="text-[10px] text-gray-500">回流校准三柱</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 营销页生成 ===== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-cyan-500 text-white rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">营销页生成</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
              <PenLine className="w-4 h-4 text-cyan-600" /> 营销页生成器
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">意图指纹（来源词根 + 阶段 + 画像）</label>
                <input
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  placeholder="如：电动蝶阀选型 + 对比阶段 + 化工采购"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
              </div>
              <button
                onClick={runGenPage}
                disabled={generatingPage}
                className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  generatingPage ? 'bg-gray-100 text-gray-400' : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 shadow-md shadow-cyan-200'
                }`}
              >
                {generatingPage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {generatingPage ? 'RAG 生成中...' : '基于企业+行业知识库生成'}
              </button>
              {pageReady && (
                <button
                  onClick={publishPage}
                  disabled={published}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    published ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-white border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50'
                  }`}
                >
                  {published ? <><CheckCircle2 className="w-4 h-4" /> 已发布，追踪中</> : <><Send className="w-4 h-4" /> 客户确认后一键发布</>}
                </button>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-2">发布后追踪</div>
              {pageReady ? (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-gray-50 rounded p-2 text-center"><div className="text-gray-400">浏览量</div><div className="font-bold text-gray-700">--</div></div>
                  <div className="bg-gray-50 rounded p-2 text-center"><div className="text-gray-400">停留</div><div className="font-bold text-gray-700">--</div></div>
                  <div className="bg-gray-50 rounded p-2 text-center"><div className="text-gray-400">转化</div><div className="font-bold text-gray-700">--</div></div>
                </div>
              ) : (
                <div className="text-xs text-gray-400">生成后此处显示追踪数据，未达预期自动进入下一轮优化</div>
              )}
            </div>
          </div>

          <MarketingPreview published={published} />
        </div>
      </section>

      {/* ===== 推送效果追踪 ===== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-cyan-500 text-white rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">推送效果追踪</h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" /> 各推送位效果
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs">
                  <th className="text-left px-4 py-2.5 font-medium">推送方式</th>
                  <th className="text-right px-4 py-2.5 font-medium">曝光</th>
                  <th className="text-right px-4 py-2.5 font-medium">点击</th>
                  <th className="text-right px-4 py-2.5 font-medium">进入落地页</th>
                  <th className="text-right px-4 py-2.5 font-medium">转化</th>
                  <th className="text-right px-4 py-2.5 font-medium">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pushStats.map((s) => (
                  <tr key={s.method} className="hover:bg-cyan-50/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{s.method}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{s.exposures.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{s.clicks.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-cyan-700 font-medium">{s.entries.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">{s.conversions}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${s.ctr >= 15 ? 'bg-emerald-100 text-emerald-700' : s.ctr >= 8 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                        {s.ctr.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-cyan-50 font-bold">
                  <td className="px-4 py-3 text-gray-800">合计</td>
                  <td className="px-4 py-3 text-right text-gray-800">{totalPushExp.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{totalPushClicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-cyan-700">{totalPushEntries.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-emerald-700">{totalPushConv}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{((totalPushClicks / totalPushExp) * 100).toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== 协作串联 ===== */}
      <footer className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl shadow-cyan-200/50">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5" />
          <h2 className="text-base font-bold">协作串联</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => {
              alert('已向「AI访客行为分析」订阅意图指纹流，新意图将自动触发营销页生成与推送。即将跳转查看意图分析...');
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'agent-visitor' }));
            }}
            className="flex items-center gap-3 px-4 py-3 bg-white/15 backdrop-blur rounded-xl hover:bg-white/25 transition-colors text-left"
          >
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">对接AI访客行为分析</div>
              <div className="text-xs text-cyan-100">接收意图指纹</div>
            </div>
          </button>
          <button
            onClick={() => alert('已开启内容效果追踪：浏览量、停留时长、AI引用次数、AI来源流量将回流至本智能体。')}
            className="flex items-center gap-3 px-4 py-3 bg-white/15 backdrop-blur rounded-xl hover:bg-white/25 transition-colors text-left"
          >
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">追踪内容效果</div>
              <div className="text-xs text-cyan-100">浏览/停留/AI引用</div>
            </div>
          </button>
          <button
            onClick={() => alert('已启动下一轮优化：基于追踪数据重新评估完整度、刷新三柱评分、迭代营销页形态与推送策略。')}
            className="flex items-center gap-3 px-4 py-3 bg-white/15 backdrop-blur rounded-xl hover:bg-white/25 transition-colors text-left"
          >
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold">进入下一轮优化</div>
              <div className="text-xs text-cyan-100">闭环迭代</div>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
