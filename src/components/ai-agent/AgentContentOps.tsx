import { useState, useEffect, useMemo } from 'react';
import {
  FileText, Sparkles, Eye, Shield, CheckCircle2, AlertTriangle,
  TrendingUp, Send, Database, Play, Loader2, Target, ScanLine,
  Gauge, GitBranch, PenLine, Activity, ArrowRight, ExternalLink,
  RefreshCw, Layers, ChevronRight, X, Plus, Clock,
  Settings, Zap, Brain, Bell, Filter, Mic, CheckCircle,
  AlertOctagon, FileCheck, Calendar, Search, ShieldAlert,
  Cpu, Link2, Unlink, BookOpen, Wrench, Check,
} from 'lucide-react';

// ===== Existing Types =====
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

// ===== New Types (from HTML prototype) =====
type ViewKey = 'today' | 'content' | 'tasks' | 'settings';
type ContentStatus = 'pub' | 'rev' | 'auto' | 'run';
type TaskType = 'auto' | 'sch' | 'rev' | 'man';

interface ReviewItem {
  id: string;
  title: string;
  sub: string;
  score: number;
  why: string;
  ref: string[];
  self: string[];
  now: string;
}

interface ContentItem {
  id: string;
  title: string;
  st: ContentStatus;
  stT: string;
  desc: string;
  pv: string;
  dr: string;
  src: string;
  body: string;
}

interface DayTask {
  t: string;
  type: TaskType;
  nt?: string;
}

interface WeekDay {
  d: string;
  dt: string;
  today?: boolean;
  tasks: DayTask[];
}

interface TimelineEntry {
  tone: 'ok' | 'ai' | 'default';
  text: string;
  time: string;
}

// ===== Existing Data =====
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
  { key: 'seen', title: '被AI看见', icon: Eye, color: 'text-cyan-600', bg: 'from-cyan-50 to-cyan-100', score: 90 },
  { key: 'understood', title: '被AI理解', icon: Layers, color: 'text-teal-600', bg: 'from-teal-50 to-emerald-100', score: 83 },
  { key: 'trusted', title: '被AI信任', icon: Shield, color: 'text-cyan-700', bg: 'from-sky-50 to-cyan-100', score: 78 },
];

const pushStats = [
  { method: '首屏Banner', exposures: 12450, clicks: 1245, entries: 980, conversions: 78, ctr: 10.0 },
  { method: '页中横幅', exposures: 8900, clicks: 623, entries: 410, conversions: 32, ctr: 7.0 },
  { method: '侧边广告位', exposures: 15600, clicks: 780, entries: 540, conversions: 45, ctr: 5.0 },
  { method: '底部弹出', exposures: 4200, clicks: 504, entries: 380, conversions: 41, ctr: 12.0 },
  { method: '智能客服推送', exposures: 680, clicks: 163, entries: 142, conversions: 28, ctr: 24.0 },
];

// ===== New Data (from HTML prototype, adapted) =====
const initialReviewItems: ReviewItem[] = [
  {
    id: 'r1',
    title: 'SDPH 系列全国产大电流型 — 产品介绍',
    sub: '自动补强 · 来源：产品详情页 71',
    score: 96,
    why: '用户指令触发：按官网真实参数撰写，零虚构',
    ref: ['官网参数表', '高新技术企业自述'],
    self: ['经验23 专业25 权威23 可信25', '连续50A/峰值125A 已区分', '红线0命中'],
    now: '待你确认发布',
  },
  {
    id: 'r2',
    title: 'PT100 温度传感器选型指南（英文站）',
    sub: '主动补强 · 402 天未更新',
    score: 88,
    why: '监控触发：深度阅读率低于基线 12 个百分点',
    ref: ['旧文比对', '品牌词库 EN'],
    self: ['EEAT 88 分', '补入实测偏差 0.3°C', 'GEO 5 项全过'],
    now: '待你确认发布',
  },
];

const initialContentItems: ContentItem[] = [
  {
    id: 'c1', title: 'SDPH 系列全国产大电流型 — 产品介绍', st: 'rev', stT: '待审核',
    desc: '基于官网真实参数撰写，连续50A/峰值125A，全国产自主可控，附生产逻辑卡。',
    pv: '1.2k', dr: '—', src: '指令',
    body: '<h3>产品定位</h3><p>SDPH 系列是面向精密运动控制场景的全国产大电流伺服驱动器，强调"全链国产、自主可控"。</p><h3>核心技术参数</h3><ul><li>额定连续电流：50 A</li><li>峰值电流：125 A</li><li>通讯协议：EtherCAT、CANopen、RS485</li></ul><h3>全国产自主可控</h3><p>软硬件架构、底层算法及配置工具全自主研发，关键元器件实现国产化替代。</p>',
  },
  {
    id: 'c2', title: 'PT100 温度传感器选型指南（英文站）', st: 'rev', stT: '待审核',
    desc: '主动补强旧文，补齐实测偏差与选型对照，对标品牌词库。',
    pv: '860', dr: '—', src: '自动',
    body: '<h3>选型核心指标</h3><p>PT100 铂电阻是工业温度测量中最常用的元件之一。选型时应重点关注温度范围、精度等级、响应时间及安装方式。</p><h3>关键参数对照</h3><ul><li>测温范围：-200 ~ +850 °C</li><li>精度等级：A 级 ±0.15 °C / B 级 ±0.30 °C</li><li>实测偏差：-50 °C 典型工况下偏差可控制在 0.3 °C 以内</li></ul>',
  },
  {
    id: 'c3', title: '工业温度传感器校准白皮书解读', st: 'pub', stT: '已发布',
    desc: '环境感知触发：行业新标准发布，转化为科普增信内容。',
    pv: '3.4k', dr: '52%', src: '自动',
    body: '<h3>新标准要点</h3><p>2026 版校准规范对工业温度传感器的溯源链、不确定度评定和现场校准提出了更高要求。</p><h3>对企业的实际影响</h3><p>制造企业需要在出厂检验环节增加至少一个温度点的溯源记录，并保留至少 5 年。</p>',
  },
  {
    id: 'c4', title: 'servo 驱动器散热设计要点', st: 'pub', stT: '已发布',
    desc: '周排程生成，EEAT 91 分，已发布 6 天。',
    pv: '2.1k', dr: '47%', src: '排程',
    body: '<h3>为什么散热决定伺服寿命</h3><p>大电流伺服驱动器在峰值输出时会产生显著热量，散热设计直接影响连续工作能力和长期可靠性。</p><h3>设计三原则</h3><ul><li>保证足够散热面积</li><li>避免热区集中</li><li>预留 20% 以上余量</li></ul>',
  },
  {
    id: 'c5', title: '全国产运动控制方案（半导体场景）', st: 'auto', stT: '自主生成',
    desc: '监控驱动选题，起草中，预计今日完成自检。',
    pv: '—', dr: '—', src: '自动',
    body: '<p>内容正在由智能体生成中，完成后将显示完整正文。</p>',
  },
  {
    id: 'c6', title: 'SDM 系列调试软件使用说明', st: 'run', stT: '起草中',
    desc: '依据知识库只读资料组装，四维起草阶段。',
    pv: '—', dr: '—', src: '排程',
    body: '<p>内容正在由智能体生成中，完成后将显示完整正文。</p>',
  },
];

const weekDays: WeekDay[] = [
  { d: '周一', dt: '9/15', today: true, tasks: [
    { t: '趋势解读 ×3', type: 'sch' },
    { t: 'PT100 指南补强', type: 'auto', nt: '深度阅读率<基线时触发' },
    { t: 'SDPH 产品介绍', type: 'rev', nt: '待你审核' },
  ]},
  { d: '周二', dt: '9/16', tasks: [
    { t: 'servo 散热设计', type: 'sch' },
    { t: '行业 RSS 监测', type: 'auto', nt: '每日自动' },
  ]},
  { d: '周三', dt: '9/17', tasks: [
    { t: '白皮书解读', type: 'sch' },
    { t: '竞品 sitemap 比对', type: 'auto', nt: '接口暂未接入·暂缓' },
  ]},
  { d: '周四', dt: '9/18', tasks: [
    { t: '半导体场景方案', type: 'auto', nt: '监控触发补强' },
  ]},
  { d: '周五', dt: '9/19', tasks: [
    { t: '周报复盘 M7', type: 'auto', nt: '每周五自动进化' },
    { t: '趋势解读 ×2', type: 'sch' },
  ]},
  { d: '周六', dt: '9/20', tasks: [
    { t: '轻量维护', type: 'auto', nt: '基线巡检' },
  ]},
  { d: '周日', dt: '9/21', tasks: [] },
];

const timelineLog: TimelineEntry[] = [
  { tone: 'ok', text: '自检通过并发布 —《SDPH 系列全国产大电流型产品介绍》EEAT 96 分', time: '09-15 11:20' },
  { tone: 'default', text: '主动补强 — PT100 温度指南 402 天未更新，已重写并比对品牌词库', time: '09-15 09:05' },
  { tone: 'ai', text: '环境感知 — 监测到行业新标准发布，已加入选题候选', time: '09-14 22:40' },
  { tone: 'ai', text: '自我进化 — 深度阅读率周环比 +6%，将"参数实测"写法置信度上调至 0.82（全自动，无需你操作）', time: '09-14 06:00 · M7 复盘' },
];

// ===== Helpers =====
const toneStyle = (tone: DiagTone) => {
  switch (tone) {
    case 'red': return { label: '待优化', bar: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    case 'yellow': return { label: '有短板', bar: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    case 'green': return { label: '达标', bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
  }
};

const judgmentTone = (score: number): DiagTone => (score >= 80 ? 'green' : score >= 65 ? 'yellow' : 'red');

const statusStyle = (st: ContentStatus): { label: string; bg: string; text: string } => {
  switch (st) {
    case 'pub': return { label: '已发布', bg: 'bg-emerald-50', text: 'text-emerald-600' };
    case 'rev': return { label: '待审核', bg: 'bg-amber-50', text: 'text-amber-600' };
    case 'auto': return { label: '自主生成', bg: 'bg-gradient-to-r from-indigo-500 to-cyan-500', text: 'text-white' };
    case 'run': return { label: '起草中', bg: 'bg-blue-50', text: 'text-blue-600' };
  }
};

const taskTypeStyle: Record<TaskType, { bg: string; text: string; label: string }> = {
  auto: { bg: 'bg-blue-50', text: 'text-blue-600', label: '自动' },
  sch: { bg: 'bg-purple-50', text: 'text-purple-600', label: '排期' },
  rev: { bg: 'bg-amber-50', text: 'text-amber-600', label: '待审核' },
  man: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: '手动' },
};

// AI gradient constant
const AI_GRAD = 'from-indigo-500 via-purple-500 to-cyan-500';
const AI_TEXT = 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600';

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
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} className={`${ts.text} transition-all duration-1000`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${font} font-bold ${ts.text}`}>{score}</span>
        <span className="text-[10px] text-gray-400 mt-0.5">{label}</span>
      </div>
    </div>
  );
};

const PillarCard = ({ pillar, offset = 0 }: { pillar: Pillar; offset?: number }) => {
  const score = Math.min(95, pillar.score + offset);
  const tone = judgmentTone(score);
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
          <div className={`text-2xl font-bold ${ts.text}`}>{score}</div>
          <div className="text-[10px] text-gray-400">得分</div>
        </div>
      </div>
      <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
        <div className={`h-full ${ts.bar} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
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
        <pre className="text-[10px] text-gray-600 font-mono leading-relaxed overflow-x-auto">{`{
  "@type": "Product",
  "name": "电动蝶阀 D941X-16C",
  "brand": "ValveX",
  "category": "工业阀门/蝶阀",
  "dateModified": "2026-09-15"
}`}</pre>
      </div>
      <div className="space-y-2">
        <div className="text-xs text-gray-700 leading-relaxed">
          <strong>结论前置：</strong>电动蝶阀 D941X-16C 适用于 DN50-DN1200 管道，工作温度 -20°C~150°C，最大压力 1.6MPa，广泛应用于化工、水处理、能源行业的流体控制与切断场景。
        </div>
        <div className="text-xs text-gray-700 leading-relaxed">
          <strong>权威信号：</strong>通过 ISO 9001 / CE / API 609 认证（编号可验证），作者：王工（流体控制高级工程师，从业 15 年）。
        </div>
      </div>
      <button className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer">
        <Target className="w-4 h-4" /> 获取报价 / 立即咨询
      </button>
    </div>
  </article>
);

// ===== AI Voice Card =====
const VoiceCard = ({ message, agentOn }: { message: string; agentOn: boolean }) => (
  <div className={`relative flex items-start gap-3.5 rounded-2xl border p-4.5 transition-all overflow-hidden ${
    agentOn
      ? 'bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-cyan-50/60 border-indigo-200/40'
      : 'bg-gray-50 border-gray-200'
  }`} style={{ padding: '18px 20px' }}>
    {agentOn && (
      <div className="absolute right-[-40px] top-[-40px] w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)' }} />
    )}
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${agentOn ? `bg-gradient-to-br ${AI_GRAD} text-white shadow-lg shadow-indigo-300/50` : 'bg-gray-200 text-gray-400'}`}>
      <Sparkles className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0 relative">
      <div className={`text-xs font-bold tracking-wide mb-0.5 ${agentOn ? 'text-indigo-600' : 'text-gray-400'}`}>
        内容运营智能体 · {agentOn ? '自主运行中' : '已暂停'}
      </div>
      <div className="text-sm text-gray-800 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  </div>
);

// ===== KPI Card =====
const KPICard = ({ n, label, sub, tone }: { n: number | string; label: string; sub: string; tone: 'warn' | 'ok' | 'ai' }) => {
  const color = tone === 'warn' ? 'text-amber-600' : tone === 'ok' ? 'text-emerald-600' : 'text-indigo-600';
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4.5 shadow-sm hover:shadow-md transition-shadow" style={{ padding: '18px 20px' }}>
      <div className={`text-3xl font-bold font-mono leading-none ${color}`}>{n}</div>
      <div className="text-[13px] text-gray-600 mt-2">{label}</div>
      <div className="text-[12px] text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
};

// ===== Review Row =====
const ReviewRow = ({ item, onApprove, onReject, onView }: {
  item: ReviewItem;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onView: (item: ReviewItem) => void;
}) => (
  <div className="flex items-center gap-3.5 bg-white border border-gray-200 border-l-4 border-l-amber-400 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-shadow" style={{ padding: '14px 18px' }}>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold text-gray-800 truncate">{item.title}</div>
      <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
    </div>
    <div className="font-mono font-bold text-emerald-600 text-sm bg-emerald-50 px-2.5 py-1 rounded-lg whitespace-nowrap">{item.score}分</div>
    <div className="flex gap-2 flex-shrink-0">
      <button onClick={() => onView(item)} className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">看生产逻辑</button>
      <button onClick={() => onReject(item.id)} className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer">打回重写</button>
      <button onClick={() => onApprove(item.id)} className={`px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r ${AI_GRAD} text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer`}>批准发布</button>
    </div>
  </div>
);

// ===== Content Card =====
const ContentCard = ({ item, onView }: { item: ContentItem; onView: (item: ContentItem) => void }) => {
  const ss = statusStyle(item.st);
  return (
    <div onClick={() => onView(item)} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-300/50 transition-all cursor-pointer group" style={{ padding: '16px 18px' }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${ss.bg} ${ss.text}`}>{item.stT}</span>
        <span className="text-[11px] text-gray-400">· {item.src}</span>
      </div>
      <div className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-indigo-600 transition-colors">{item.title}</div>
      <div className="text-xs text-gray-500 mt-1.5 line-clamp-2">{item.desc}</div>
      <div className="flex items-center gap-3.5 mt-3 text-xs text-gray-400 border-t border-gray-100 pt-2.5">
        <span>PV <b className="font-mono text-gray-600">{item.pv}</b></span>
        <span>深度阅读率 <b className="font-mono text-gray-600">{item.dr}</b></span>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); onView(item); }}>生产逻辑</button>
        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:border-cyan-400 hover:text-cyan-600 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); onView(item); }}>查看内容</button>
      </div>
    </div>
  );
};

// ===== Week Calendar =====
const WeekCalendar = ({ filter }: { filter: string }) => (
  <div className="grid grid-cols-7 gap-2.5">
    {weekDays.map((day, i) => (
      <div key={i} className={`bg-white border rounded-xl p-2.5 min-h-[190px] flex flex-col ${day.today ? 'border-indigo-400 shadow-lg shadow-indigo-200/50' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-xs font-bold ${day.today ? 'text-indigo-600' : 'text-gray-600'}`}>{day.d}</span>
          <span className="text-[11px] font-mono text-gray-400">{day.dt}</span>
        </div>
        {(day.tasks || []).length === 0 ? (
          <div className="text-[11px] text-gray-300 mt-2">— 无排程 —</div>
        ) : (
          day.tasks.filter(t => filter === 'all' || t.type === filter).map((task, j) => {
            const ts = taskTypeStyle[task.type];
            return (
              <div key={j} className={`px-2 py-1.5 rounded-lg text-[11.5px] mb-1.5 leading-snug ${ts.bg} ${ts.text}`}>
                {task.t}
                {task.nt && <span className="block text-[10.5px] opacity-70 mt-0.5">{task.nt}</span>}
              </div>
            );
          })
        )}
      </div>
    ))}
  </div>
);

// ===== Settings Card =====
const SettingsCard = ({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm" style={{ padding: '20px 22px' }}>
    <div className="text-[15px] font-bold text-gray-800 mb-1">{title}</div>
    <div className="text-xs text-gray-500 mb-4">{desc}</div>
    {children}
  </div>
);

const FieldRow = ({ k, children }: { k: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-b-0">
    <div className="w-28 flex-shrink-0 text-[13px] font-semibold text-gray-600 pt-0.5">{k}</div>
    <div className="text-[13px] text-gray-800 flex-1">{children}</div>
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-blue-50 text-blue-600 text-[11.5px] px-2 py-0.5 rounded-md m-0.5">{children}</span>
);

const Redline = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-[13px] text-red-600 py-1">
    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
    <span>{children}</span>
  </div>
);

// ===== Detail Drawer =====
interface DrawerData {
  type: 'logic' | 'article';
  title: string;
  item?: ReviewItem | ContentItem;
}

const DetailDrawer = ({ data, onClose, onSwitchTab }: {
  data: DrawerData | null;
  onClose: () => void;
  onSwitchTab: (tab: 'logic' | 'article') => void;
}) => {
  if (!data) return null;
  const isReview = data.item && 'score' in (data.item as ReviewItem);
  const review = isReview ? (data.item as ReviewItem) : null;
  const content = data.item as ContentItem;

  const logicSteps = review ? [
    { h: '触发来源', b: review.why },
    { h: '资料依据', b: review.ref.join(' · ') },
    { h: '生成流程', b: '调取资料（只读）→ 四维起草（经验/专业/权威/可信）→ GEO 5 项结构 → 成稿' },
    { h: '质量自检', b: review.self.join(' · ') },
    { h: '当前状态', b: review.now },
  ] : [
    { h: '触发方式', b: content?.src === '自动' ? '监控/排程自动触发' : content?.src === '排程' ? '按固定节奏排程生成' : '用户手动指令' },
    { h: '资料依据', b: '知识库只读 · 品牌词库 · 站点基线' },
    { h: '生成流程', b: '调取资料（只读）→ 四维起草（经验/专业/权威/可信）→ GEO 5 项结构 → 成稿' },
    { h: '质量自检', b: 'EEAT 进行中 · 四维起草 · 风险红线实时查' },
    { h: '当前状态', b: content?.stT || '进行中' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/30 transition-opacity z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-screen w-[640px] max-w-[94vw] bg-white shadow-2xl flex flex-col z-50 transition-transform" style={{ transform: data ? 'translateX(0)' : 'translateX(100%)' }}>
        <div className="flex items-start gap-3 p-5 border-b border-gray-200">
          <div className="text-base font-bold text-gray-800 flex-1">{data.title}</div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-1 border-b border-gray-200 px-5 -mb-px">
          <button onClick={() => onSwitchTab('logic')} className={`px-3.5 py-2.5 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${data.type === 'logic' ? 'text-indigo-600 border-indigo-500' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>生产逻辑</button>
          <button onClick={() => onSwitchTab('article')} className={`px-3.5 py-2.5 text-[13px] font-semibold border-b-2 transition-colors cursor-pointer ${data.type === 'article' ? 'text-indigo-600 border-indigo-500' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>内容正文</button>
        </div>
        <div className="p-5 overflow-y-auto flex-1">
          {data.type === 'logic' ? (
            <div>
              {logicSteps.map((s, i) => (
                <div key={i} className="py-3 border-b border-dashed border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-2 text-[13.5px] font-bold text-gray-800">
                    <span className={`w-5.5 h-5.5 rounded-md bg-gradient-to-br ${AI_GRAD} text-white flex items-center justify-center text-xs font-mono`} style={{ width: '22px', height: '22px' }}>{i + 1}</span>
                    {s.h}
                  </div>
                  <div className="text-[13px] text-gray-600 mt-1.5 pl-7 leading-relaxed">{s.b}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="mb-3.5">
                <div className="text-lg font-bold text-gray-800 leading-snug mb-2">{data.title}</div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <span>来源：{content?.src || '指令'}</span>
                  <span>状态：{content?.stT || '进行中'}</span>
                  <span>PV {content?.pv || '—'}</span>
                  <span>深度阅读率 {content?.dr || '—'}</span>
                </div>
              </div>
              <div className="w-full h-44 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-[13px] mb-4">
                配图占位 · 开启配图后自动生成
              </div>
              <div className="text-[13.5px] text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content?.body || '<p>内容正在生成中</p>' }} />
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-600 font-semibold">关键词：</span>
                <span className="inline-block bg-gray-100 text-gray-600 text-[11.5px] px-2 py-0.5 rounded-md m-0.5">工业传感器</span>
                <span className="inline-block bg-gray-100 text-gray-600 text-[11.5px] px-2 py-0.5 rounded-md m-0.5">全国产</span>
                <span className="inline-block bg-gray-100 text-gray-600 text-[11.5px] px-2 py-0.5 rounded-md m-0.5">伺服驱动器</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ===== Main Component =====
export default function AgentContentOps() {
  // View state
  const [activeView, setActiveView] = useState<ViewKey>('today');
  const [agentOn, setAgentOn] = useState(true);

  // Existing engine states
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanDone, setScanDone] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(true);
  const [intent, setIntent] = useState('');
  const [generatingPage, setGeneratingPage] = useState(false);
  const [pageReady, setPageReady] = useState(true);
  const [published, setPublished] = useState(false);
  const [scanRound, setScanRound] = useState(0);
  const [contentScores, setContentScores] = useState<Record<string, number>>({
    completeness: Math.round(pageDiagnoses.reduce((s, p) => s + p.total, 0) / pageDiagnoses.length),
    seen: 90,
    understood: 83,
    trusted: 78,
  });
  const [optimizingKey, setOptimizingKey] = useState<string | null>(null);
  const [appliedOpts, setAppliedOpts] = useState<Set<string>>(new Set());
  const [autoGeneratedCount, setAutoGeneratedCount] = useState(12);
  const [lastAutoGen, setLastAutoGen] = useState('4 分钟前');

  // New console states
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>(initialReviewItems);
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContentItems);
  const [taskFilter, setTaskFilter] = useState('all');
  const [drawer, setDrawer] = useState<DrawerData | null>(null);
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);
  const [voiceMsg, setVoiceMsg] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);

  // Auto-accept loop (fused with agent toggle)
  useEffect(() => {
    if (!agentOn) return;
    const timer = setInterval(() => {
      setAutoGeneratedCount((c) => c + 1);
      setLastAutoGen('刚刚');
      setPageReady(true);
    }, 12000);
    return () => clearInterval(timer);
  }, [agentOn]);

  // Initialize voice message
  useEffect(() => {
    updateVoice();
  }, [reviewItems, autoGeneratedCount, agentOn]);

  const updateVoice = (override?: string) => {
    if (override) {
      setVoiceMsg(override);
      return;
    }
    if (!agentOn) {
      setVoiceMsg('智能体已暂停，所有自主任务待命中；需要时可随时重新开启。');
      return;
    }
    const published = contentItems.filter(c => c.st === 'pub').length;
    setVoiceMsg(`本周已自主生成并自检 <b class="text-indigo-600">${autoGeneratedCount}</b> 篇内容，其中 <b class="text-indigo-600">${published}</b> 篇已发布上线；目前有 <b class="text-indigo-600">${reviewItems.length}</b> 篇通过质检、正在等你确认发布。其余内容我按节奏继续推进，你只需在发布这一步把关。`);
  };

  // 统一内容质量评分：一个综合总分 + 四个子分数
  const subScoreDefs = [
    { key: 'completeness', title: '内容完整度', icon: FileCheck, color: 'text-cyan-600' },
    { key: 'seen', title: '被AI看见', icon: Eye, color: 'text-cyan-600' },
    { key: 'understood', title: '被AI理解', icon: Layers, color: 'text-teal-600' },
    { key: 'trusted', title: '被AI信任', icon: Shield, color: 'text-cyan-700' },
  ];
  const subScores = subScoreDefs.map(d => ({ ...d, score: contentScores[d.key] ?? 0 }));
  const compositeScore = Math.round(subScores.reduce((s, p) => s + p.score, 0) / subScores.length);
  const compositeTone = judgmentTone(compositeScore);

  const optimizeScore = (key: string) => {
    if (optimizingKey || appliedOpts.has(key)) return;
    setOptimizingKey(key);
    setTimeout(() => {
      setContentScores(prev => ({ ...prev, [key]: Math.min(99, (prev[key] ?? 0) + 8) }));
      setAppliedOpts(prev => new Set(prev).add(key));
      setOptimizingKey(null);
    }, 900);
  };

  const optSuggestionMap: Record<string, { title: string; desc: string; impact: string }> = {
    completeness: { title: '补充缺失的内容维度', desc: '部分页面转化层与信任层得分偏低，缺 CTA 与资质认证信息', impact: '预计提升 内容完整度 +8' },
    seen: { title: '补充结构化数据与元描述', desc: 'Schema.org 标记覆盖不足，AI 爬虫难以精准提取页面要素', impact: '预计提升 被AI看见 +8' },
    understood: { title: '增加 FAQ 问答与小标题层级', desc: '正文缺少 FAQ 片段与 H2/H3 层级，AI 难以拆解语义结构', impact: '预计提升 被AI理解 +8' },
    trusted: { title: '补充作者署名与引用来源', desc: '缺少作者信息与外部引用，E-E-A-T 信任信号薄弱', impact: '预计提升 被AI信任 +8' },
  };

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
    updateVoice('营销页已发布！浏览量与停留时长将自动追踪，未达预期将进入下一轮优化。');
  };

  const approveReview = (id: string) => {
    const item = reviewItems.find(r => r.id === id);
    setReviewItems(prev => prev.filter(r => r.id !== id));
    setContentItems(prev => prev.map(c => c.id === id ? { ...c, st: 'pub', stT: '已发布', dr: '待采集' } : c));
    updateVoice(`已批准发布，内容已上线。智能体将继续推进其余选题，有新的待审核再提醒你。`);
  };

  const rejectReview = (id: string) => {
    const item = reviewItems.find(r => r.id === id);
    setReviewItems(prev => prev.filter(r => r.id !== id));
    if (item) updateVoice(`已打回《${item.title.slice(0, 12)}…》重写，智能体会按你的反馈调整后再提交。`);
  };

  const openDrawerLogic = (item: ReviewItem | ContentItem) => {
    setDrawer({ type: 'logic', title: 'title' in item ? item.title : '', item });
  };

  const openDrawerArticle = (item: ReviewItem | ContentItem) => {
    setDrawer({ type: 'article', title: 'title' in item ? item.title : '', item });
  };

  const switchDrawerTab = (tab: 'logic' | 'article') => {
    setDrawer(prev => prev ? { ...prev, type: tab } : null);
  };

  const toggleAgent = () => {
    const newState = !agentOn;
    setAgentOn(newState);
    if (newState) {
      updateVoice('智能体已恢复自主运行，将继续按配置推进内容生产与发布流程。');
    } else {
      updateVoice('智能体已暂停，所有自主任务待命中；需要时可随时重新开启。');
    }
  };

  const publishedCount = contentItems.filter(c => c.st === 'pub').length;
  const totalPushConv = pushStats.reduce((s, p) => s + p.conversions, 0);
  const totalPushExp = pushStats.reduce((s, p) => s + p.exposures, 0);
  const totalPushEntries = pushStats.reduce((s, p) => s + p.entries, 0);
  const totalPushClicks = pushStats.reduce((s, p) => s + p.clicks, 0);

  const subnavTabs: { key: ViewKey; label: string; badge?: number }[] = [
    { key: 'today', label: '今天' },
    { key: 'content', label: '内容' },
    { key: 'tasks', label: '任务' },
    { key: 'settings', label: '设置' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col">
      {/* ===== Topbar with agent-switch ===== */}
      <header className="flex items-center gap-3.5 px-6 h-[58px] bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200">
            <PenLine className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full font-medium">CONTENT & LANDING</span>
            </div>
            <h1 className="text-lg font-bold text-gray-800">AI内容运营智能体 · 控制台</h1>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs">
          <Database className="w-3.5 h-3.5" />
          知识库已连接
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
          agentOn
            ? 'bg-gradient-to-br from-indigo-50/80 to-cyan-50/60 border-indigo-200/40'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${agentOn ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} style={agentOn ? { boxShadow: '0 0 0 4px rgba(16,185,129,0.18)' } : {}} />
          <span className="text-xs font-semibold text-gray-600">智能体</span>
          <button
            onClick={toggleAgent}
            className={`relative w-[42px] h-[23px] rounded-full transition-all cursor-pointer flex-shrink-0 ${agentOn ? `bg-gradient-to-r ${AI_GRAD}` : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all ${agentOn ? 'left-[21px]' : 'left-0.5'}`} />
          </button>
        </div>
      </header>

      {/* ===== Subnav ===== */}
      <nav className="flex gap-1 px-8 pt-3.5 bg-[#f5f7fb] flex-shrink-0">
        {subnavTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveView(tab.key)}
            className={`px-4 py-2 text-[13.5px] font-semibold rounded-t-lg relative transition-colors cursor-pointer ${
              activeView === tab.key ? 'text-indigo-600 bg-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.key === 'today' && reviewItems.length > 0 && (
              <span className="ml-1.5 bg-amber-400 text-white text-[10px] px-1.5 py-0.5 rounded-md align-middle">{reviewItems.length}</span>
            )}
            {activeView === tab.key && (
              <span className="absolute left-4 right-4 bottom-[-1px] h-0.5 bg-indigo-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* ===== Content ===== */}
      <div className="flex-1 overflow-y-auto px-8 pb-10 bg-[#f5f7fb]">
        <div className="max-w-[1120px] mx-auto pt-5">

          {/* ===== Today View ===== */}
          {activeView === 'today' && (
            <div className="space-y-5 animate-[fade_0.35s_ease]">
              <VoiceCard message={voiceMsg} agentOn={agentOn} />

              <div className="grid grid-cols-3 gap-4">
                <KPICard n={reviewItems.length} label="待你审核发布" sub="这是今天唯一需要你做的事" tone="warn" />
                <KPICard n={publishedCount} label="本周已发布" sub="全部通过 EEAT/GEO 门禁" tone="ok" />
                <KPICard n={autoGeneratedCount} label="本周自主产出" sub="无需你介入的生产" tone="ai" />
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="text-[15px] font-bold text-gray-800">待审核发布</span>
                  <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-md">{reviewItems.length}</span>
                  <span className="text-xs text-gray-400 ml-auto">智能体已完成写作与自检，发布前需你拍板</span>
                </div>
                <div className="flex flex-col gap-3">
                  {reviewItems.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-sm text-gray-400">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      当前没有待审核的内容，智能体继续自主运行中
                    </div>
                  ) : (
                    reviewItems.map(item => (
                      <ReviewRow
                        key={item.id}
                        item={item}
                        onApprove={approveReview}
                        onReject={rejectReview}
                        onView={(it) => openDrawerLogic(it)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Collapsible timeline */}
              <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="w-full px-4.5 py-3.5 flex items-center gap-2.5 text-[13.5px] font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ padding: '14px 18px' }}
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  查看智能体近期自主做了什么
                  <ChevronRight className={`ml-auto w-4 h-4 text-gray-400 transition-transform ${showTimeline ? 'rotate-90' : ''}`} />
                </button>
                {showTimeline && (
                  <div className="px-4.5 pb-4" style={{ padding: '4px 18px 16px' }}>
                    {timelineLog.map((entry, i) => (
                      <div key={i} className="flex gap-3 py-2.5 border-b border-dashed border-gray-100 last:border-b-0">
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          entry.tone === 'ok' ? 'bg-emerald-500' : entry.tone === 'ai' ? 'bg-cyan-500' : 'bg-indigo-500'
                        }`} />
                        <div>
                          <div className="text-[13px] text-gray-600" dangerouslySetInnerHTML={{ __html: entry.text }} />
                          <div className="text-[11px] text-gray-400 font-mono mt-0.5">{entry.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-center text-xs text-gray-400 pt-2">
                智能体在后台自主运行，你只需在发布时把关。需要时可随时查看
                <button onClick={() => setActiveView('content')} className="text-blue-500 hover:underline cursor-pointer ml-1">全部内容</button>
                或
                <button onClick={() => setActiveView('tasks')} className="text-blue-500 hover:underline cursor-pointer ml-1">本周计划</button>。
              </div>

              {/* 统一内容质量评分：综合总分 + 子分数 + 优化建议 */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm pt-2">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-cyan-600" /> 内容质量评分
                </h3>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* 综合总分 */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center">
                    <ScoreGauge score={compositeScore} label="综合总分" tone={compositeTone} size="lg" />
                    <button
                      onClick={runGenerate}
                      disabled={generating}
                      className={`mt-4 flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                        generating ? 'bg-gray-100 text-gray-400' : `bg-gradient-to-r ${AI_GRAD} text-white hover:opacity-90 shadow-md shadow-indigo-200`
                      }`}
                    >
                      {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {generating ? '生成中...' : generated ? '重新生成' : '生成AI友好内容'}
                    </button>
                  </div>

                  {/* 子分数列表 */}
                  <div className="flex-1 space-y-3">
                    {subScores.map(s => {
                      const tone = judgmentTone(s.score);
                      const ts = toneStyle(tone);
                      return (
                        <div key={s.key} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center ${s.color} flex-shrink-0`}>
                            <s.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[13px] font-semibold text-gray-700">{s.title}</span>
                              <span className={`text-sm font-bold ${ts.text}`}>{s.score}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                              <div className={`h-full ${ts.bar} rounded-full transition-all duration-700`} style={{ width: `${s.score}%` }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 建议优化内容列表 */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="text-[13px] font-bold text-gray-800 mb-2.5 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-amber-500" /> 建议优化内容列表
                  </div>
                  <div className="space-y-2">
                    {subScores.map(s => {
                      const sug = optSuggestionMap[s.key];
                      const applied = appliedOpts.has(s.key);
                      const isOptimizing = optimizingKey === s.key;
                      return (
                        <div key={s.key} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${applied ? 'bg-emerald-50/60 border-emerald-100' : 'bg-gray-50/70 border-gray-100 hover:border-amber-200'}`}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-semibold text-gray-800">{sug.title}</span>
                              <span className="text-[11px] text-gray-400">当前 {s.score} 分</span>
                            </div>
                            <div className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{sug.desc}</div>
                            <div className="text-[11px] text-emerald-600 mt-1 font-medium">{sug.impact}</div>
                          </div>
                          <button
                            onClick={() => optimizeScore(s.key)}
                            disabled={applied || isOptimizing || !!optimizingKey}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all cursor-pointer ${
                              applied
                                ? 'bg-emerald-100 text-emerald-700 cursor-default'
                                : isOptimizing
                                ? 'bg-gray-100 text-gray-400'
                                : optimizingKey
                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 shadow-sm'
                            }`}
                          >
                            {applied ? (
                              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> 已优化</span>
                            ) : isOptimizing ? (
                              <span className="flex items-center gap-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> 优化中</span>
                            ) : (
                              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> 一键优化</span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* External tracking */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-200 p-5">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-cyan-600" /> 外部结果追踪
                </h3>
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
            </div>
          )}

          {/* ===== Content View ===== */}
          {activeView === 'content' && (
            <div className="space-y-5 animate-[fade_0.35s_ease]">
              <div className="text-[13px] text-gray-500 mb-4">以内容为主维度 — 每篇可查看完整正文与生产逻辑。点击卡片展开详情。</div>
              <div className="grid grid-cols-2 gap-3.5">
                {contentItems.map(item => (
                  <ContentCard key={item.id} item={item} onView={(it) => openDrawerLogic(it)} />
                ))}
              </div>

              {/* Page diagnoses */}
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-cyan-500 text-white rounded-lg flex items-center justify-center">
                    <ScanLine className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">页面完整度诊断</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pageDiagnoses.map(p => {
                    const ts = toneStyle(p.tone);
                    return (
                      <article key={p.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                              <h5 className="text-sm font-bold text-gray-800 truncate">{p.pageName}</h5>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${ts.bg} ${ts.text} ${ts.border} border`}>{ts.label}</span>
                            </div>
                            <a className="text-xs text-cyan-600 hover:underline flex items-center gap-1" href={p.url} onClick={(e) => e.preventDefault()}>
                              <ExternalLink className="w-3 h-3" /> {p.url}
                            </a>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`text-2xl font-bold ${ts.text}`}>{p.total}</div>
                            <div className="text-[10px] text-gray-400">完整度</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 mb-3">
                          {layerKeys.map(lk => {
                            const s = p.scores[lk];
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
                        <div className="flex flex-wrap gap-1.5">
                          {p.daysSinceUpdate > 180 ? (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded">过时 · {p.daysSinceUpdate}天前</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded">新鲜 · {p.daysSinceUpdate}天前</span>
                          )}
                          {p.wordCount < 300 && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded">过短 · {p.wordCount}字</span>
                          )}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500 mb-1.5">问题清单：</div>
                          <ul className="space-y-1">
                            {p.issues.map((iss, i) => (
                              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                                <AlertTriangle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span>{iss}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Scanning control */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">全站扫描</h3>
                    <p className="text-xs text-gray-500 mt-0.5">扫描所有产品页/营销页/文章页的完整度、新鲜度与正文深度</p>
                  </div>
                  <button
                    onClick={runScan}
                    disabled={scanning}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
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

              {/* Push stats */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-5 py-3.5 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-600" /> 各推送位效果
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
                      {pushStats.map(s => (
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
            </div>
          )}

          {/* ===== Tasks View ===== */}
          {activeView === 'tasks' && (
            <div className="space-y-5 animate-[fade_0.35s_ease]">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-bold text-gray-800">发布任务 <span className="text-xs font-normal text-gray-400 ml-1">自主发布任务统一管理：自动 / 排期 / 手动</span></h2>
                <button
                  onClick={() => setTaskDrawerOpen(true)}
                  className={`ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold bg-gradient-to-r ${AI_GRAD} text-white shadow-md shadow-indigo-200 hover:opacity-90 transition-opacity cursor-pointer`}
                >
                  <Plus className="w-4 h-4" /> 新建发布任务
                </button>
              </div>
              <div className="text-[13px] text-gray-500">
                智能体以 <b className="text-indigo-600">三种模式</b> 自主运转：<b className="text-indigo-600">① 自动</b>（监控/环境触发）· <b className="text-indigo-600">② 排期</b>（按固定节奏生成）· <b className="text-indigo-600">③ 手动</b>（你下指令即时发起）。下方为本周计划，让你清楚"不在时它在干什么"。
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  {[
                    { f: 'all', l: '全部' },
                    { f: 'auto', l: '自动' },
                    { f: 'sch', l: '排期' },
                    { f: 'man', l: '手动' },
                    { f: 'rev', l: '待审核' },
                  ].map(opt => (
                    <button
                      key={opt.f}
                      onClick={() => setTaskFilter(opt.f)}
                      className={`px-3 py-1.5 rounded-md text-[12.5px] transition-all cursor-pointer ${
                        taskFilter === opt.f ? 'bg-white text-indigo-600 font-semibold shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3.5 text-xs text-gray-500 ml-auto">
                  <span className="flex items-center gap-1"><i className="w-2.5 h-2.5 rounded bg-blue-500 inline-block" /> 自动</span>
                  <span className="flex items-center gap-1"><i className="w-2.5 h-2.5 rounded bg-purple-500 inline-block" /> 排期</span>
                  <span className="flex items-center gap-1"><i className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> 手动</span>
                  <span className="flex items-center gap-1"><i className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> 待审核</span>
                </div>
              </div>
              <WeekCalendar filter={taskFilter} />
              <div className="text-xs text-gray-400 bg-white border border-dashed border-gray-200 rounded-xl p-4">
                说明：<b className="text-gray-600">自动</b>任务在触发条件满足时由智能体自行发起（如某篇深度阅读率跌破基线即补强）；<b className="text-gray-600">排期</b>任务按你设定的节奏运行；<b className="text-gray-600">待审核</b>是已写好、等你确认发布的队列。三者均由智能体调度，<b className="text-gray-600">无需你每天操作</b>。
              </div>

              {/* Marketing page generator (fused) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-cyan-600" /> 营销页生成器
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
                      className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                        generatingPage ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 shadow-md shadow-cyan-200'
                      }`}
                    >
                      {generatingPage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {generatingPage ? 'RAG 生成中...' : '基于企业+行业知识库生成'}
                    </button>
                    {pageReady && (
                      <button
                        onClick={publishPage}
                        disabled={published}
                        className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                          published ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' : 'bg-white border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50'
                        }`}
                      >
                        {published ? <><CheckCircle2 className="w-4 h-4" /> 已发布，追踪中</> : <><Send className="w-4 h-4" /> 客户确认后一键发布</>}
                      </button>
                    )}
                  </div>
                </div>
                <MarketingPreview published={published} />
              </div>
            </div>
          )}

          {/* ===== Settings View ===== */}
          {activeView === 'settings' && (
            <div className="flex flex-col gap-4.5 max-w-[780px] mx-auto animate-[fade_0.35s_ease]" style={{ gap: '18px' }}>
              <SettingsCard title="目标与范围（你定一次，长期生效）" desc={'这是你对智能体的"交待"，之后它在此框架内自主运行。'}>
                <FieldRow k="目标站点">termoline.com · 中文站 / 英文站 / 日文站（共 3 站）</FieldRow>
                <FieldRow k="内容目标">增信为主——让浏览者觉得专业、可信、有据可查；<b className="text-gray-600">不承诺收录与排名</b></FieldRow>
                <FieldRow k="默认语言"><Tag>中文</Tag><Tag>English</Tag><Tag>日本語</Tag></FieldRow>
              </SettingsCard>

              <SettingsCard title="品牌语气与红线" desc="语气由你定义；红线是智能体不可逾越的硬边界（命中即退回重写，任何策略下不破例）。">
                <FieldRow k="品牌语气"><Tag>专业克制</Tag><Tag>数据说话</Tag><Tag>有出处</Tag><Tag>不夸大</Tag></FieldRow>
                <div className="pt-1">
                  <Redline>虚构客户案例或应用故事</Redline>
                  <Redline>虚构资质、认证或奖项</Redline>
                  <Redline>承诺"保证收录 / 保证排名"</Redline>
                </div>
              </SettingsCard>

              <SettingsCard title="质量基线（按站点独立配置）" desc="深度阅读率低于基线即触发补强；基线由本站点过去 90 天滚动数据自动校准。">
                <div className="flex items-center gap-2.5 text-[13px] text-gray-500 flex-wrap">
                  <span>深度阅读率基线</span>
                  <input defaultValue={40} className="w-[74px] px-2.5 py-1.5 border border-gray-200 rounded-lg font-mono text-[13px]" />
                  <span>%</span>
                  <span className="mx-1">·</span>
                  <span>跳出率上限</span>
                  <input defaultValue={65} className="w-[74px] px-2.5 py-1.5 border border-gray-200 rounded-lg font-mono text-[13px]" />
                  <span>%</span>
                  <span className="mx-1">·</span>
                  <span>环比下滑预警</span>
                  <input defaultValue={15} className="w-[74px] px-2.5 py-1.5 border border-gray-200 rounded-lg font-mono text-[13px]" />
                  <span>%</span>
                </div>
              </SettingsCard>

              <SettingsCard title="信源与接口状态" desc="内容引用与监控依赖的外部接口。带「待建」项接入后智能体才能自动调用。">
                <div className="space-y-0">
                  {[
                    { nm: '知识库产品（只读调用）', stat: 'ok', label: '已接入' },
                    { nm: '站长平台 / GSC 数据', stat: 'ok', label: '已接入' },
                    { nm: 'GEO 引用率探针（商业 API）', stat: 'wait', label: '暂未接入' },
                    { nm: '竞品 sitemap / RSS', stat: 'wait', label: '暂未接入' },
                    { nm: '媒体权威度库', stat: 'build', label: '待自建' },
                  ].map((src, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-b-0 text-[13px]">
                      <span className="flex-1 text-gray-700">{src.nm}</span>
                      <span className={`text-[11.5px] font-bold px-2 py-0.5 rounded-md ${
                        src.stat === 'ok' ? 'bg-emerald-50 text-emerald-600' :
                        src.stat === 'build' ? 'bg-amber-50 text-amber-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>{src.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/60 to-cyan-50/50 border border-indigo-200/30 text-xs text-gray-600">
                  <b className="text-indigo-600">GEO 探针与竞品源暂未接入</b>：接入前，GEO 引用率改以"结构合规 + 人工抽检"判定，竞品比对任务暂缓；其余能力不受影响，接口就绪后自动恢复。
                </div>
                <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/60 to-cyan-50/50 border border-indigo-200/30 text-xs text-gray-600">
                  <Brain className="w-4 h-4 text-indigo-500 inline mr-1.5" />
                  <b className="text-indigo-600">工作记忆（智能体自沉淀，全自动）</b>：已积累 <b className="text-indigo-600">18 条</b>有效规律，置信度均值 <b className="text-indigo-600">0.79</b>，本周新增 <b className="text-indigo-600">3 条</b>。由 M7 每周复盘自动更新，<b className="text-indigo-600">无需你操作</b>——这正是智能体越用越准的方式。
                </div>
              </SettingsCard>

              {/* Collaboration footer in settings */}
              <div className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl p-5 text-white shadow-xl shadow-cyan-200/50 mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-5 h-5" />
                  <h2 className="text-base font-bold">协作串联</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      updateVoice('已向「AI访客行为分析」订阅意图指纹流，新意图将自动触发营销页生成与推送。即将跳转查看意图分析...');
                      window.dispatchEvent(new CustomEvent('navigate', { detail: 'agent-visitor' }));
                    }}
                    className="flex items-center gap-3 px-4 py-3 bg-white/15 backdrop-blur rounded-xl hover:bg-white/25 transition-colors text-left cursor-pointer"
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
                    onClick={() => updateVoice('已开启内容效果追踪：浏览量、停留时长、AI引用次数、AI来源流量将回流至本智能体。')}
                    className="flex items-center gap-3 px-4 py-3 bg-white/15 backdrop-blur rounded-xl hover:bg-white/25 transition-colors text-left cursor-pointer"
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
                    onClick={() => updateVoice('已启动下一轮优化：基于追踪数据重新评估完整度、刷新三柱评分、迭代营销页形态与推送策略。')}
                    className="flex items-center gap-3 px-4 py-3 bg-white/15 backdrop-blur rounded-xl hover:bg-white/25 transition-colors text-left cursor-pointer"
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
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ===== Detail Drawer ===== */}
      <DetailDrawer
        data={drawer}
        onClose={() => setDrawer(null)}
        onSwitchTab={switchDrawerTab}
      />

      {/* ===== Task Drawer ===== */}
      {taskDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/30 z-40" onClick={() => setTaskDrawerOpen(false)} />
          <div className="fixed top-0 right-0 h-screen w-[680px] max-w-[94vw] bg-white shadow-2xl flex flex-col z-50">
            <div className="flex items-start gap-3 p-5 border-b border-gray-200">
              <div className="text-base font-bold text-gray-800 flex-1">新建发布任务</div>
              <button onClick={() => setTaskDrawerOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto flex-1 space-y-5">
              <div className="space-y-3.5 pb-4 border-b border-gray-100">
                <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span className={`w-1 h-3.5 rounded bg-gradient-to-b ${AI_GRAD}`} /> 基本信息
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5"><span className="text-red-500 mr-0.5">*</span>任务标题</label>
                  <input placeholder="例如：9月工业传感器内容包" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5"><span className="text-red-500 mr-0.5">*</span>任务主题</label>
                  <div className="flex flex-wrap gap-1.5 p-2 border border-gray-200 rounded-lg min-h-[42px] items-center">
                    <input placeholder="输入主题回车添加" className="flex-1 min-w-[80px] border-none px-1 py-1 text-[13px] focus:outline-none" />
                  </div>
                  <div className="text-[11.5px] text-gray-400 mt-1.5">推荐主题（点击添加）：</div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['行业方案', '行业动态', '新闻资讯', '应用场景', '注意事项', '常见问题', '工作原理', '知识百科', '产品介绍', '行业案例'].map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 cursor-pointer hover:bg-gray-200 hover:text-blue-600 transition-colors">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5"><span className="text-red-500 mr-0.5">*</span>关键词</label>
                  <div className="flex flex-wrap gap-1.5 p-2 border border-gray-200 rounded-lg min-h-[42px] items-center">
                    <input placeholder="输入关键词回车添加" className="flex-1 min-w-[80px] border-none px-1 py-1 text-[13px] focus:outline-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 pb-4 border-b border-gray-100">
                <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span className={`w-1 h-3.5 rounded bg-gradient-to-b ${AI_GRAD}`} /> 推送设置
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">推送应用</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-white"><option>新闻资讯</option><option>产品中心</option><option>博客文章</option></select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">推送栏目</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-white"><option>新闻资讯</option><option>公司动态</option><option>技术解读</option></select>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span className={`w-1 h-3.5 rounded bg-gradient-to-b ${AI_GRAD}`} /> 推送规则
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">推送频率</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-white"><option value="once">仅一次</option><option value="daily">每天</option><option value="weekly">每周</option><option value="monthly">每月</option></select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">推送数量</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-white"><option>1 篇</option><option>2 篇</option><option>3 篇</option><option>5 篇</option></select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">推送开始时间</label>
                    <input type="date" defaultValue="2026-09-16" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">推送内容状态</label>
                  <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-white">
                    <option value="review">待审核（推荐：生成后先由你确认再发布）</option>
                    <option value="publish">立即发布（适合低风险的常规内容）</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-3.5 border-t border-gray-200 flex justify-end gap-2.5 bg-white">
              <button onClick={() => setTaskDrawerOpen(false)} className="px-3.5 py-2 rounded-lg text-[13px] font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">取消</button>
              <button
                onClick={() => {
                  setTaskDrawerOpen(false);
                  updateVoice('已创建发布任务，智能体将按规则起草，完成后由你把关发布。');
                }}
                className={`px-3.5 py-2 rounded-lg text-[13px] font-semibold bg-gradient-to-r ${AI_GRAD} text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer`}
              >
                创建并加入计划
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
