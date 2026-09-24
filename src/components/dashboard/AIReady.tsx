import { useState, useMemo } from 'react';
import {
  CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronRight,
  FileText, Code2, Bot, Shield, Zap, Eye, RefreshCw, Loader2,
  Sparkles, ExternalLink, Search, Clock, Activity, Bug,
  TrendingUp, FileCheck, Globe, Cpu, Database, ArrowRight,
} from 'lucide-react';

// ============================================================
// 类型定义
// ============================================================
type ReadyStatus = 'pass' | 'warn' | 'fail';

interface ReadyCheck {
  id: string;
  name: string;
  status: ReadyStatus;
  concept: string;
  importance: string;
  detail: string;
  expandable?: boolean;
  expandContent?: React.ReactNode;
}

interface ProductDiagnosis {
  id: string;
  name: string;
  url: string;
  score: number;
  issues: { key: string; desc: string; severity: 'high' | 'mid' | 'low'; autoFix: boolean }[];
  status: 'pending' | 'optimizing' | 'need-knowledge' | 'done';
  knowledgeMissing?: string[];
}

interface CrawlLog {
  time: string;
  bot: string;
  page: string;
  status: number;
  duration: string;
  ua: string;
}

// ============================================================
// 模拟数据
// ============================================================
const READY_CHECKS: ReadyCheck[] = [
  {
    id: 'llms-txt',
    name: 'llms.txt 配置',
    status: 'pass',
    concept: '这是一份放在网站里、专门给 AI 看的"网站说明书"。它用简短的文字告诉 ChatGPT、豆包这些 AI 引擎：我们公司是做什么的、有哪些产品、哪些页面最值得看。',
    importance: '没有这份说明书，AI 引擎需要自己一点点摸索你的网站，可能找不到产品信息，或者抓错内容。有了它，AI 一眼就能看到你的品牌介绍和产品目录，用户问相关问题时，AI 更有可能推荐你的产品。',
    detail: '已自动生成标准 llms.txt，包含品牌摘要、产品目录、核心页面链接',
    expandable: true,
    expandContent: <LlmsTxtPreview />,
  },
  {
    id: 'schema-jsonld',
    name: 'Schema JSON-LD 结构化数据',
    status: 'pass',
    concept: '这是给 AI 看的"产品标签"。就像超市商品上的条形码一样，它把产品的名称、价格、品牌、库存等关键信息，用 AI 能直接读懂的方式标注出来。',
    importance: '没有这个标签，AI 只能从网页大段文字里"猜"你的产品信息，容易看错或看漏。有了它，AI 能准确知道"这是哪款产品、多少钱"，在回答用户问题时可以直接引用你的产品信息。',
    detail: '核心页面已配置 4 类标签：公司信息、产品、文章、常见问题',
    expandable: true,
    expandContent: <SchemaJsonLdPreview />,
  },
  {
    id: 'robots-txt',
    name: 'robots.txt AI 爬虫准入',
    status: 'pass',
    concept: '这是网站的"访客规则"，明确告诉各个 AI 引擎（比如 ChatGPT、豆包、文心一言等）：欢迎来抓取我网站的内容。',
    importance: '如果规则写得不清楚，部分 AI 引擎会默认不抓取你的网站，等于把产品信息挡在 AI 门外。我们已经明确对全部主流 AI 引擎开放访问，确保你的网站内容能被它们收录。',
    detail: '8 类 AI 引擎全部放行：ChatGPT、Claude、Perplexity、豆包、Google、Bing、Apple、Meta',
    expandable: true,
    expandContent: <RobotsTxtPreview />,
  },
  {
    id: 'ssr',
    name: '服务端渲染 SSR',
    status: 'pass',
    concept: '这是一种让网页在"打开瞬间就准备好全部内容"的方式。不需要用户和 AI 等待加载，一打开就能看到完整的页面。',
    importance: 'AI 不像人那样有耐心等待。如果网页要等一会儿才显示内容，AI 可能看到一个空白页就走了，完全抓不到产品信息。我们的网站在 AI 访问时立刻呈现全部内容，确保产品信息不被漏掉。',
    detail: '全站采用即时内容输出，打开即可看到完整内容',
  },
  {
    id: 'https',
    name: 'HTTPS 安全协议',
    status: 'pass',
    concept: 'HTTPS 是网站的"安全锁"，它加密了用户和网站之间的所有信息传输，防止数据被窃取。浏览器地址栏显示的小锁图标就是它。',
    importance: '主流 AI 引擎只信任有安全锁的网站。没有安全锁，AI 可能认为你的网站不安全，降低信任度甚至不收录内容。我们的网站已启用最高级别的安全加密。',
    detail: '全站启用安全加密，达到最高安全级别',
  },
  {
    id: 'sitemap',
    name: 'XML Sitemap 站点地图',
    status: 'pass',
    concept: '这是一份网站的"目录清单"，把网站所有页面的地址列出来，方便 AI 引擎快速找到全部内容。',
    importance: '没有这份目录，AI 可能漏掉网站深处的页面，比如某个产品详情页。有了它，AI 能系统地发现并收录你网站的每一个页面，让产品信息更全面地被 AI 引用。',
    detail: '已自动生成站点地图，包含 48 个页面',
  },
  {
    id: 'og-tags',
    name: 'Open Graph 标签',
    status: 'warn',
    concept: '这是网页分享时的"名片"。当别人把你的网页链接分享到微信、朋友圈或 AI 平台时，名片决定了显示什么标题、描述和图片。',
    importance: 'AI 在回答问题时，会参考这张"名片"来理解你的页面。如果名片信息不全，AI 可能用错误的标题和描述介绍你的产品。我们有 3 个产品页还缺少分享图片，补充后会更完整。',
    detail: '3 个产品页缺少分享图片，需补充产品主图',
    expandable: true,
    expandContent: <OgTagsPreview />,
  },
  {
    id: 'perf',
    name: '页面加载性能',
    status: 'pass',
    concept: '这是网页打开的速度，主要看三点：主要内容多久显示出来、点击后多久有反应、页面布局会不会突然跳动。',
    importance: 'AI 抓取网页也有耐心上限，打开太慢的页面可能还没加载完就被放弃了。同时，打开快的网站体验更好，AI 引擎也更愿意推荐。我们的网站三项速度指标都达到优秀水平。',
    detail: '主要内容 1.2 秒显示 · 点击 0.08 秒响应 · 布局不跳动，全部达到优秀标准',
  },
];

const PRODUCT_DIAGNOSES: ProductDiagnosis[] = [
  {
    id: 'p1',
    name: '六角螺栓 M8×30',
    url: '/products/hex-bolt-m8x30',
    score: 62,
    issues: [
      { key: 'schema', desc: '产品缺少 AI 可识别的信息标签，AI 无法准确获取产品规格和价格', severity: 'high', autoFix: true },
      { key: 'faq', desc: '产品页没有常见问题解答区域，AI 难以提取用户关心的问答', severity: 'mid', autoFix: true },
      { key: 'content', desc: '产品介绍只有 80 个字，缺少技术参数表和使用场景说明', severity: 'high', autoFix: false },
    ],
    status: 'pending',
    knowledgeMissing: ['产品技术参数表', '应用场景说明文档'],
  },
  {
    id: 'p2',
    name: '法兰螺母 M10',
    url: '/products/flange-nut-m10',
    score: 78,
    issues: [
      { key: 'alt', desc: '3 张产品图片没有文字说明，AI 无法知道图片展示的是什么', severity: 'low', autoFix: true },
      { key: 'schema', desc: '产品信息标签缺少品牌和价格字段', severity: 'mid', autoFix: true },
    ],
    status: 'pending',
  },
  {
    id: 'p3',
    name: '膨胀锚栓 M12',
    url: '/products/anchor-bolt-m12',
    score: 85,
    issues: [
      { key: 'og', desc: '分享名片缺少产品图片', severity: 'low', autoFix: true },
    ],
    status: 'pending',
  },
  {
    id: 'p4',
    name: '平垫圈 D16',
    url: '/products/flat-washer-d16',
    score: 91,
    issues: [],
    status: 'done',
  },
];

const CRAWL_LOGS: CrawlLog[] = [
  { time: '2026-09-23 14:32:18', bot: 'GPTBot', page: '/products/hex-bolt-m8x30', status: 200, duration: '0.42s', ua: 'GPTBot/1.0' },
  { time: '2026-09-23 14:28:05', bot: 'ClaudeBot', page: '/products/flange-nut-m10', status: 200, duration: '0.38s', ua: 'ClaudeBot/1.0' },
  { time: '2026-09-23 14:15:33', bot: 'PerplexityBot', page: '/', status: 200, duration: '0.51s', ua: 'PerplexityBot/1.0' },
  { time: '2026-09-23 13:58:22', bot: 'Googlebot', page: '/products/anchor-bolt-m12', status: 200, duration: '0.33s', ua: 'Googlebot/2.1' },
  { time: '2026-09-23 13:42:10', bot: 'GPTBot', page: '/products/flat-washer-d16', status: 200, duration: '0.29s', ua: 'GPTBot/1.0' },
  { time: '2026-09-23 13:20:47', bot: 'Bytespider', page: '/', status: 200, duration: '0.45s', ua: 'Bytespider/1.0' },
  { time: '2026-09-23 12:55:18', bot: 'ClaudeBot', page: '/products/hex-bolt-m8x30', status: 200, duration: '0.41s', ua: 'ClaudeBot/1.0' },
  { time: '2026-09-23 12:30:05', bot: 'Bingbot', page: '/products/flange-nut-m10', status: 200, duration: '0.36s', ua: 'Bingbot/2.0' },
  { time: '2026-09-23 11:48:33', bot: 'PerplexityBot', page: '/products/anchor-bolt-m12', status: 200, duration: '0.44s', ua: 'PerplexityBot/1.0' },
  { time: '2026-09-23 11:15:22', bot: 'AppleBot', page: '/', status: 200, duration: '0.39s', ua: 'AppleBot/1.0' },
];

// ============================================================
// 子组件
// ============================================================
const statusConfig: Record<ReadyStatus, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  pass: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100', label: '已就绪' },
  warn: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100', label: '需关注' },
  fail: { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-100', label: '未通过' },
};

function ReadyCheckCard({ check }: { check: ReadyCheck }) {
  const [expanded, setExpanded] = useState(false);
  const sc = statusConfig[check.status];
  const Icon = sc.icon;
  const checkIcons: Record<string, React.ElementType> = {
    'llms-txt': FileText, 'schema-jsonld': Code2, 'robots-txt': Bot,
    ssr: Globe, https: Shield, sitemap: FileCheck, 'og-tags': ExternalLink, perf: Zap,
  };
  const CheckIcon = checkIcons[check.id] || FileText;

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all hover:shadow-sm hover:border-gray-300">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* 左侧图标 + 状态 */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className={`w-10 h-10 rounded-lg ${sc.bg} flex items-center justify-center`}>
              <CheckIcon className={`w-5 h-5 ${sc.color}`} />
            </div>
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${sc.bg} ${sc.color} whitespace-nowrap`}>
              <Icon className="w-3 h-3" /> {sc.label}
            </span>
          </div>
          {/* 右侧内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-gray-800">{check.name}</span>
              {check.expandable && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex-shrink-0 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                >
                  {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  {expanded ? '收起' : '查看详情'}
                </button>
              )}
            </div>
            <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{check.concept}</p>
            <div className="mt-2 p-2.5 bg-blue-50/60 rounded-md border border-blue-100">
              <p className="text-[12px] text-gray-600 leading-relaxed">
                <span className="font-semibold text-blue-700">为什么重要：</span>{check.importance}
              </p>
            </div>
            <p className="mt-2 text-[12px] text-gray-400">{check.detail}</p>
          </div>
        </div>
      </div>
      {expanded && check.expandContent && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-4">
          {check.expandContent}
        </div>
      )}
    </div>
  );
}

function LlmsTxtPreview() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-600">/llms.txt 当前内容</span>
        <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
          <ExternalLink className="w-3.5 h-3.5" /> 访问 URL
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-200 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto"><code>{`# 越通紧固件 Fasteners

> 邯郸市越通紧固件有限公司，专注高品质紧固件制造 20 年，产品涵盖螺栓、螺母、垫圈、锚栓全品类，服务全球工业客户。

## 产品目录
- [六角螺栓系列](/products/hex-bolts): 规格 M6-M48，材质碳钢/不锈钢
- [法兰螺母系列](/products/flange-nuts): 规格 M6-M24，防松动设计
- [膨胀锚栓系列](/products/anchor-bolts): 规格 M6-M24，重型锚固方案

## 核心页面
- [关于我们](/about): 公司资质、认证、产能介绍
- [产品目录](/products): 全品类紧固件在线目录
- [技术资料](/tech): 选型指南、扭矩表、材质说明
- [FAQ](/faq): 常见问题与解答`}</code></pre>
    </div>
  );
}

function SchemaJsonLdPreview() {
  const pages = [
    { name: '首页', type: 'Organization', status: 'pass' },
    { name: '产品详情页', type: 'Product', status: 'pass' },
    { name: '文章页', type: 'Article', status: 'pass' },
    { name: 'FAQ页', type: 'FAQPage', status: 'pass' },
  ];
  return (
    <div>
      <div className="text-xs font-bold text-gray-600 mb-2">核心页面 Schema 配置一览</div>
      <div className="space-y-2">
        {pages.map(p => (
          <div key={p.name} className="flex items-center gap-3 p-2.5 bg-white rounded-md border border-gray-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 flex-shrink-0">{p.name}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-medium">{p.type}</span>
            <button className="ml-auto text-xs text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" /> 查看代码
            </button>
            <button className="text-xs text-amber-600 hover:text-amber-700 cursor-pointer flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> AI 重新生成
            </button>
          </div>
        ))}
      </div>
      <pre className="bg-slate-900 text-slate-200 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto mt-3"><code>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "六角螺栓 M8×30",
  "brand": { "@type": "Brand", "name": "越通紧固件" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "CNY",
    "price": "0.85",
    "availability": "https://schema.org/InStock"
  }
}
</script>`}</code></pre>
    </div>
  );
}

function RobotsTxtPreview() {
  const bots = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Bytespider', 'Googlebot', 'Bingbot', 'AppleBot', 'Meta-ExternalAgent'];
  return (
    <div>
      <div className="text-xs font-bold text-gray-600 mb-2">AI 爬虫准入状态</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {bots.map(b => (
          <div key={b} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-md border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-medium text-gray-700">{b}</span>
            <span className="text-xs text-emerald-600 font-medium">Allow</span>
          </div>
        ))}
      </div>
      <pre className="bg-slate-900 text-slate-200 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto"><code>{`User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://www.ytfasteners.com/sitemap.xml`}</code></pre>
    </div>
  );
}

function OgTagsPreview() {
  return (
    <div>
      <div className="text-xs font-bold text-gray-600 mb-2">Open Graph 标签检查</div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-md border border-emerald-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-sm text-gray-700">og:title · og:description · og:url</span>
          <span className="ml-auto text-xs text-emerald-600 font-medium">已配置</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-md border border-amber-100">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-gray-700">og:image</span>
          <span className="ml-auto text-xs text-amber-600 font-medium">3 个产品页缺失</span>
          <button className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer font-medium ml-2">一键补全</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 产品诊断卡片
// ============================================================
function ProductDiagnosisCard({ diag, onOptimize }: { diag: ProductDiagnosis; onOptimize: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const tone = diag.score >= 90 ? 'text-emerald-600' : diag.score >= 70 ? 'text-amber-600' : 'text-rose-600';
  const barColor = diag.score >= 90 ? 'bg-emerald-500' : diag.score >= 70 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-gray-800">{diag.name}</span>
              <a href={diag.url} className="text-xs text-blue-500 hover:underline truncate">{diag.url}</a>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${diag.score}%` }} />
                </div>
                <span className={`text-sm font-bold ${tone}`}>{diag.score}</span>
              </div>
              {diag.status === 'done' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 已优化
                </span>
              )}
              {diag.status === 'optimizing' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> 优化中
                </span>
              )}
            </div>
          </div>
          {diag.issues.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-shrink-0 p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              {expanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
            </button>
          )}
        </div>

        {expanded && diag.issues.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
            {diag.issues.map(issue => (
              <div key={issue.key} className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-md">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  issue.severity === 'high' ? 'bg-rose-500' : issue.severity === 'mid' ? 'bg-amber-500' : 'bg-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-gray-600">{issue.desc}</span>
                  {issue.autoFix ? (
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium">可自动修复</span>
                  ) : (
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">需补充资料</span>
                  )}
                </div>
              </div>
            ))}

            {diag.status === 'need-knowledge' && diag.knowledgeMissing && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-700">缺少必要知识，需补充以下文档</span>
                </div>
                <div className="space-y-1.5">
                  {diag.knowledgeMissing.map(k => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">{k}</span>
                      <button className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer font-medium">上传文档 →</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {diag.status === 'pending' && (
              <button
                onClick={() => onOptimize(diag.id)}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 shadow-md cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {diag.issues.some(i => !i.autoFix) ? '生成优化策略' : '一键优化'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 主组件
// ============================================================
export default function AIReady() {
  const [diagnoses, setDiagnoses] = useState<ProductDiagnosis[]>(PRODUCT_DIAGNOSES);
  const [expandedAll, setExpandedAll] = useState(false);
  const [botFilter, setBotFilter] = useState<string>('all');

  const passCount = READY_CHECKS.filter(c => c.status === 'pass').length;
  const warnCount = READY_CHECKS.filter(c => c.status === 'warn').length;
  const overallScore = Math.round((passCount * 100 + warnCount * 60) / READY_CHECKS.length);

  const handleOptimize = (id: string) => {
    const diag = diagnoses.find(d => d.id === id);
    if (!diag) return;
    if (diag.issues.some(i => !i.autoFix)) {
      setDiagnoses(prev => prev.map(d => d.id === id ? { ...d, status: 'need-knowledge' } : d));
    } else {
      setDiagnoses(prev => prev.map(d => d.id === id ? { ...d, status: 'optimizing' } : d));
      setTimeout(() => {
        setDiagnoses(prev => prev.map(d => d.id === id ? { ...d, status: 'done', score: Math.min(99, d.score + 20) } : d));
      }, 1500);
    }
  };

  const filteredLogs = useMemo(() => {
    if (botFilter === 'all') return CRAWL_LOGS;
    return CRAWL_LOGS.filter(l => l.bot === botFilter);
  }, [botFilter]);

  const botStats = useMemo(() => {
    const map: Record<string, number> = {};
    CRAWL_LOGS.forEach(l => { map[l.bot] = (map[l.bot] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, []);

  const pendingDiag = diagnoses.filter(d => d.status === 'pending').length;
  const crawlCount = CRAWL_LOGS.length;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 页面头部 */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">AI READY</span>
          <span className="text-xs text-gray-400">数字门户 · AI 友好性保障</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">AI Ready · AI 友好性保障中心</h1>
        <p className="text-sm text-gray-500 max-w-3xl">
          确保网站在制作和交付时，AI 友好性的关键项全部就绪。围绕「让 AI 看见、让 AI 看懂」两大核心价值，从技术配置、内容质量到爬虫监控，构建完整的 AI 友好性保障闭环。
        </p>
      </div>

      {/* KPI 概览卡 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{overallScore}<span className="text-sm text-gray-400 font-normal">/100</span></div>
            <div className="text-xs text-gray-500">AI 就绪度</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{passCount}<span className="text-sm text-gray-400 font-normal">/8</span></div>
            <div className="text-xs text-gray-500">检查项已就绪</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Search className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{pendingDiag}</div>
            <div className="text-xs text-gray-500">产品页待优化</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{crawlCount}</div>
            <div className="text-xs text-gray-500">今日 AI 爬虫访问</div>
          </div>
        </div>
      </div>

      {/* Sticky 分区导航 */}
      <div className="sticky top-16 z-30 -mx-1 mb-6">
        <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-xl px-2 py-1.5 flex items-center gap-1 shadow-sm">
          <button onClick={() => scrollTo('section-checks')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
            <Shield className="w-4 h-4 text-blue-600" /> 关键项检查
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <button onClick={() => scrollTo('section-products')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
            <Search className="w-4 h-4 text-purple-600" /> 产品页诊断
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <button onClick={() => scrollTo('section-crawlers')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
            <Bot className="w-4 h-4 text-cyan-600" /> 爬虫访问日志
          </button>
        </div>
      </div>

      {/* 第一部分：AI 友好性关键项检查 */}
      <section id="section-checks" className="mb-8 scroll-mt-24">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-blue-600 rounded-full" />
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            AI 友好性关键项检查
          </h2>
          <span className="text-xs text-gray-400 ml-auto">网站交付时确保关键项全部就绪</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {READY_CHECKS.map(c => <ReadyCheckCard key={c.id} check={c} />)}
        </div>
      </section>

      {/* 第二部分：产品页内容诊断 */}
      <section id="section-products" className="mb-8 scroll-mt-24">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-purple-600 rounded-full" />
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-600" />
              产品页内容诊断
            </h2>
          </div>
          <button
            onClick={() => setExpandedAll(!expandedAll)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
          >
            {expandedAll ? '全部收起' : '全部展开'}
            {expandedAll ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* 紧凑优化流程条 */}
        <div className="bg-purple-50/40 border border-purple-100 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-0.5">
            {['内容诊断', '生成策略', '用户确认', '补充知识', '自动优化'].map((step, i) => (
              <div key={step} className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`px-2.5 py-1 rounded-md font-medium border ${
                  i === 3 ? 'bg-amber-100 text-amber-700 border-amber-200' :
                  i === 4 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                  'bg-white text-gray-700 border-gray-200'
                }`}>{step}</span>
                {i < 4 && <ArrowRight className="w-3 h-3 text-purple-400 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {diagnoses.map(d => (
            <ProductDiagnosisCard key={d.id} diag={d} onOptimize={handleOptimize} />
          ))}
        </div>
      </section>

      {/* 第三部分：AI 爬虫访问日志 */}
      <section id="section-crawlers" className="mb-8 scroll-mt-24">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-cyan-600 rounded-full" />
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-600" />
            AI 爬虫访问日志
          </h2>
          <span className="text-xs text-gray-400 ml-auto">实时记录各 AI 引擎爬虫的访问行为</span>
        </div>

        {/* 爬虫统计 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-4">
          {botStats.map(([bot, count]) => (
            <div
              key={bot}
              onClick={() => setBotFilter(botFilter === bot ? 'all' : bot)}
              className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                botFilter === bot
                  ? 'bg-cyan-50 border-cyan-300 ring-2 ring-cyan-100'
                  : 'bg-white border-gray-200 hover:border-cyan-200'
              }`}
            >
              <div className="text-lg font-bold text-gray-800">{count}</div>
              <div className="text-[11px] text-gray-500 mt-0.5 truncate">{bot}</div>
            </div>
          ))}
        </div>

        {/* 日志表格 */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">
                访问日志 {botFilter !== 'all' && <span className="text-cyan-600">· {botFilter}</span>}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 最近 24 小时</span>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                <RefreshCw className="w-3 h-3" /> 刷新
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500">时间</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500">AI 爬虫</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500">访问页面</th>
                  <th className="text-center py-2.5 px-4 text-xs font-semibold text-gray-500">状态</th>
                  <th className="text-center py-2.5 px-4 text-xs font-semibold text-gray-500">耗时</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500">User-Agent</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 text-xs text-gray-500 font-mono">{log.time}</td>
                    <td className="py-2.5 px-4">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-cyan-50 text-cyan-700">{log.bot}</span>
                    </td>
                    <td className="py-2.5 px-4 text-xs text-gray-600 font-mono">{log.page}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">{log.status}</span>
                    </td>
                    <td className="py-2.5 px-4 text-center text-xs text-gray-500">{log.duration}</td>
                    <td className="py-2.5 px-4 text-xs text-gray-400 font-mono">{log.ua}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLogs.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-400">
              <Bug className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              暂无 {botFilter} 的访问记录
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
