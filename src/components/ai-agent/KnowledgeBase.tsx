import { useState } from 'react';
import {
  Database,
  Brain,
  Layers,
  FileText,
  Upload,
  Search,
  TrendingUp,
  Zap,
  Shield,
  BookOpen,
  Building2,
  Globe,
  CheckCircle2,
  Clock,
  RefreshCw,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Activity,
  MessageSquare,
  Target,
  AlertCircle,
  Trash2,
  Edit3,
  Bell,
  ChevronRight,
  Cpu,
  HardDrive,
  Server,
  Network,
  Plus,
  Filter,
} from 'lucide-react';

// ===== Types =====
type KnowledgeCategory = '文档' | '网页' | '问答对' | '数据表';
type AgentStatus = 'active' | 'idle' | 'syncing';
type RetrievalStatus = 'success' | 'partial' | 'fail';

interface KnowledgeEntry {
  id: string;
  title: string;
  category: KnowledgeCategory;
  source: string;
  chunks: number;
  updatedAt: string;
  status: '已索引' | '处理中' | '待审核';
}

interface AgentSupport {
  id: string;
  dimension: string;
  description: string;
  agentName: string;
  agentIcon: typeof Brain;
  status: AgentStatus;
  callsToday: number;
  coverage: number;
  color: string;
}

interface RetrievalTest {
  id: string;
  query: string;
  matchedDoc: string;
  score: number;
  status: RetrievalStatus;
  snippet: string;
}

interface KnowledgeBaseInfo {
  name: string;
  type: 'enterprise' | 'industry';
  icon: typeof Database;
  color: string;
  bgColor: string;
  totalEntries: number;
  totalChunks: number;
  updatedAt: string;
  coverage: number;
  layers: {
    name: string;
    desc: string;
    count: string;
  }[];
  tags: string[];
}

// ===== Mock Data =====
const enterpriseKB: KnowledgeBaseInfo = {
  name: '企业知识库',
  type: 'enterprise',
  icon: Building2,
  color: 'from-blue-500 to-indigo-600',
  bgColor: 'from-blue-50 to-indigo-50',
  totalEntries: 1286,
  totalChunks: 18942,
  updatedAt: '2026-09-08 09:42',
  coverage: 87,
  layers: [
    { name: '数据层', desc: '原始资料沉淀', count: '1,286 条' },
    { name: '语料层', desc: '向量化语料切片', count: '18,942 块' },
    { name: '知识层', desc: '结构化知识图谱', count: '3,528 节点' },
  ],
  tags: ['产品资料', '解决方案', '客户案例', 'FAQ', '技术白皮书', '报价单'],
};

const industryKB: KnowledgeBaseInfo = {
  name: '行业知识库',
  type: 'industry',
  icon: Globe,
  color: 'from-emerald-500 to-teal-600',
  bgColor: 'from-emerald-50 to-teal-50',
  totalEntries: 8642,
  totalChunks: 95670,
  updatedAt: '2026-09-07 18:00',
  coverage: 92,
  layers: [
    { name: '数据层', desc: '行业公开资料', count: '8,642 条' },
    { name: '语料层', desc: '行业语义向量化', count: '95,670 块' },
    { name: '知识层', desc: '行业知识图谱', count: '12,108 节点' },
  ],
  tags: ['行业报告', '市场趋势', '竞品信息', '政策法规', '技术标准', '消费数据'],
};

const techStack = [
  {
    level: 1,
    name: '原始资料',
    desc: '文档 / 网页 / 问答 / 数据表',
    icon: FileText,
    color: 'from-slate-400 to-slate-500',
    count: '8,928 条',
  },
  {
    level: 2,
    name: '知识加工',
    desc: '清洗 / 分块 / 向量化 / 入库',
    icon: Cpu,
    color: 'from-blue-400 to-blue-500',
    count: '114,612 块',
  },
  {
    level: 3,
    name: 'AI知识库',
    desc: '向量库 + 知识图谱 + RAG 检索',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    count: '15,636 节点',
  },
  {
    level: 4,
    name: '智能体调用',
    desc: '五大智能体实时检索增强',
    icon: Brain,
    color: 'from-amber-500 to-orange-500',
    count: '日均 32,840 次',
  },
];

const agentSupports: AgentSupport[] = [
  {
    id: 'as1',
    dimension: '分析基准',
    description: '为访客行为分析提供行业基准与企业语境，让数据从「数字」变为「判断」',
    agentName: 'AI访客行为分析',
    agentIcon: Activity,
    status: 'active',
    callsToday: 4280,
    coverage: 88,
    color: 'text-blue-500',
  },
  {
    id: 'as2',
    dimension: '内容专业度',
    description: '基于 RAG 检索增强，每一篇内容都有企业知识背书，让网站内容自己会说话',
    agentName: 'AI内容运营',
    agentIcon: FileText,
    status: 'active',
    callsToday: 6890,
    coverage: 95,
    color: 'text-cyan-600',
  },
  {
    id: 'as3',
    dimension: '对话能力',
    description: '知识库让 AI 客服像企业的资深销售一样懂产品、懂客户、懂行业',
    agentName: 'AI智能客服PRO（即将上线）',
    agentIcon: MessageSquare,
    status: 'idle',
    callsToday: 0,
    coverage: 0,
    color: 'text-emerald-500',
  },
  {
    id: 'as4',
    dimension: '策略制定',
    description: '行业经验让 AI 优化建议从「试错」变为「有依据的判断」',
    agentName: 'AI个性化/A-B测试（即将上线）',
    agentIcon: Target,
    status: 'idle',
    callsToday: 0,
    coverage: 0,
    color: 'text-violet-500',
  },
];

const knowledgeEntries: KnowledgeEntry[] = [
  {
    id: 'k1',
    title: '2026 智能制造解决方案白皮书',
    category: '文档',
    source: '上传 · PDF · 18.6MB',
    chunks: 246,
    updatedAt: '2026-09-08 09:42',
    status: '已索引',
  },
  {
    id: 'k2',
    title: '智能仓储系统产品手册 V3.2',
    category: '文档',
    source: '上传 · DOCX · 4.2MB',
    chunks: 88,
    updatedAt: '2026-09-07 16:30',
    status: '已索引',
  },
  {
    id: 'k3',
    title: '某汽车集团数字化车间案例',
    category: '网页',
    source: '抓取 · www.client-case.com',
    chunks: 42,
    updatedAt: '2026-09-07 14:15',
    status: '已索引',
  },
  {
    id: 'k4',
    title: '产品选型与报价常见问答',
    category: '问答对',
    source: '导入 · 320 条 QA',
    chunks: 320,
    updatedAt: '2026-09-06 11:20',
    status: '已索引',
  },
  {
    id: 'k5',
    title: '行业竞品功能对比表',
    category: '数据表',
    source: '同步 · 行业知识库',
    chunks: 156,
    updatedAt: '2026-09-06 09:00',
    status: '处理中',
  },
  {
    id: 'k6',
    title: 'MES 系统功能清单 V2',
    category: '文档',
    source: '上传 · XLSX · 2.1MB',
    chunks: 64,
    updatedAt: '2026-09-05 17:45',
    status: '待审核',
  },
];

const retrievalTests: RetrievalTest[] = [
  {
    id: 'r1',
    query: '智能仓储系统的核心功能有哪些？',
    matchedDoc: '智能仓储系统产品手册 V3.2',
    score: 94,
    status: 'success',
    snippet: '系统核心功能包括：智能入库、动态盘点、出库调度、库存预警、多仓协同、AGV 路径规划与 WMS 对接...',
  },
  {
    id: 'r2',
    query: '你们的产品在汽车行业有哪些落地案例？',
    matchedDoc: '某汽车集团数字化车间案例',
    score: 89,
    status: 'success',
    snippet: '为某大型汽车集团部署数字化车间，实现生产节拍提升 23%、在制品库存降低 41%、OEE 提升至 86%...',
  },
  {
    id: 'r3',
    query: 'MES 系统的报价范围是多少？',
    matchedDoc: '产品选型与报价常见问答',
    score: 72,
    status: 'partial',
    snippet: 'MES 系统报价依据模块、用户数、部署方式浮动，标准版 18 万起，企业版 38 万起（详见报价单附件）...',
  },
];

const categoryOptions: { value: KnowledgeCategory; label: string; icon: typeof FileText }[] = [
  { value: '文档', label: '文档上传', icon: FileText },
  { value: '网页', label: '网页抓取', icon: Globe },
  { value: '问答对', label: '问答导入', icon: MessageSquare },
  { value: '数据表', label: '数据表同步', icon: Database },
];

// ===== Helper Functions =====
const getStatusBadge = (status: string) => {
  switch (status) {
    case '已索引':
      return 'bg-green-100 text-green-700 border-green-200';
    case '处理中':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case '待审核':
      return 'bg-gray-100 text-gray-600 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

const getRetrievalBadge = (status: RetrievalStatus) => {
  switch (status) {
    case 'success':
      return { label: '高匹配', color: 'bg-green-100 text-green-700', icon: CheckCircle2 };
    case 'partial':
      return { label: '部分匹配', color: 'bg-amber-100 text-amber-700', icon: AlertCircle };
    case 'fail':
      return { label: '未命中', color: 'bg-red-100 text-red-700', icon: AlertCircle };
  }
};

const getAgentStatusBadge = (status: AgentStatus) => {
  switch (status) {
    case 'active':
      return { label: '调用中', color: 'bg-green-50 text-green-600', dot: 'bg-green-500' };
    case 'syncing':
      return { label: '同步中', color: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500' };
    case 'idle':
      return { label: '即将上线', color: 'bg-gray-100 text-gray-400', dot: 'bg-gray-300' };
  }
};

// ===== Sub-components =====
const KnowledgeBaseCard = ({ kb }: { kb: KnowledgeBaseInfo }) => {
  const Icon = kb.icon;
  return (
    <div className={`bg-gradient-to-br ${kb.bgColor} rounded-2xl p-6 border border-white/60 shadow-sm`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${kb.color} rounded-xl flex items-center justify-center shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{kb.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-white/70 ${kb.type === 'enterprise' ? 'text-blue-600' : 'text-emerald-600'}`}>
              {kb.type === 'enterprise' ? '私有数字资产' : '平台预置智慧'}
            </span>
          </div>
        </div>
        <button
          onClick={() => alert(`即将进入「${kb.name}」详情面板，可查看完整条目与检索质量。`)}
          className="text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="查看更多"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white/70 rounded-lg px-3 py-2.5">
          <div className="text-xs text-gray-500">知识条目</div>
          <div className="text-lg font-bold text-gray-800">{kb.totalEntries.toLocaleString()}</div>
        </div>
        <div className="bg-white/70 rounded-lg px-3 py-2.5">
          <div className="text-xs text-gray-500">语料切片</div>
          <div className="text-lg font-bold text-gray-800">{kb.totalChunks.toLocaleString()}</div>
        </div>
        <div className="bg-white/70 rounded-lg px-3 py-2.5">
          <div className="text-xs text-gray-500">更新时间</div>
          <div className="text-sm font-bold text-gray-800">{kb.updatedAt}</div>
        </div>
      </div>

      {/* Coverage progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500">知识覆盖度</span>
          <span className="text-xs font-bold text-gray-700">{kb.coverage}%</span>
        </div>
        <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${kb.color} rounded-full transition-all duration-700`}
            style={{ width: `${kb.coverage}%` }}
          />
        </div>
      </div>

      {/* Three layers */}
      <div className="space-y-2 mb-4">
        {kb.layers.map((layer, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-white/50 rounded-lg px-3 py-2">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${kb.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">{layer.name}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-500">{layer.desc}</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{layer.count}</div>
            </div>
            {idx < kb.layers.length - 1 && <ArrowDown className="w-3 h-3 text-gray-300 hidden sm:block" />}
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {kb.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-white/60 text-gray-600 rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const AgentSupportCard = ({ support }: { support: AgentSupport }) => {
  const Icon = support.agentIcon;
  const statusBadge = getAgentStatusBadge(support.status);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ${support.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${statusBadge.color}`}>
          <span className={`w-1.5 h-1.5 ${statusBadge.dot} rounded-full ${support.status === 'syncing' ? 'animate-pulse' : ''}`} />
          {statusBadge.label}
        </span>
      </div>
      <h4 className="text-base font-bold text-gray-800 mb-1">{support.dimension}</h4>
      <p className="text-sm text-gray-500 leading-relaxed mb-3">{support.description}</p>
      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            关联智能体
          </span>
          <span className="font-semibold text-gray-700">{support.agentName}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 rounded-lg px-2.5 py-1.5">
            <div className="text-gray-400">今日调用</div>
            <div className="font-bold text-gray-700">{support.callsToday.toLocaleString()} 次</div>
          </div>
          <div className="bg-gray-50 rounded-lg px-2.5 py-1.5">
            <div className="text-gray-400">知识命中</div>
            <div className="font-bold text-gray-700">{support.coverage}%</div>
          </div>
        </div>
        {/* Coverage bar */}
        <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${support.color.replace('text-', 'from-')} to-gray-400 rounded-full transition-all duration-700`}
            style={{ width: `${support.coverage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// ===== Main Component =====
export default function KnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState<KnowledgeCategory>('文档');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<RetrievalTest[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [entries, setEntries] = useState<KnowledgeEntry[]>(knowledgeEntries);
  const [filterStatus, setFilterStatus] = useState<string>('全部');
  const [updateReminder, setUpdateReminder] = useState(true);

  // Upload simulation
  const handleUpload = () => {
    setShowUploadModal(true);
    setUploadProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += 10;
      if (p >= 100) {
        clearInterval(timer);
        setShowUploadModal(false);
        const newEntry: KnowledgeEntry = {
          id: `k${Date.now()}`,
          title: `新上传 · ${activeCategory}知识 ${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`,
          category: activeCategory,
          source: `上传 · 模拟文件 · ${Math.floor(Math.random() * 10 + 2)}.${Math.floor(Math.random() * 5 + 1)}MB`,
          chunks: Math.floor(Math.random() * 200 + 30),
          updatedAt: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
          status: '处理中',
        };
        setEntries((prev) => [newEntry, ...prev]);
        // Simulate indexing completion
        setTimeout(() => {
          setEntries((prev) => prev.map((e) => (e.id === newEntry.id ? { ...e, status: '已索引' } : e)));
        }, 2500);
      }
      setUploadProgress(p);
    }, 180);
  };

  // Retrieval test simulation
  const runRetrievalTest = () => {
    if (!searchQuery.trim()) {
      alert('请输入要测试检索的问题，例如"智能仓储系统的核心功能有哪些？"');
      return;
    }
    setIsSearching(true);
    setSearchResults(null);
    setTimeout(() => {
      // Match query against mock tests
      const matched = retrievalTests.filter(
        (r) => r.query.includes(searchQuery) || searchQuery.includes(r.query.slice(0, 6))
      );
      const results = matched.length > 0 ? matched : [
        {
          id: 'r-custom',
          query: searchQuery,
          matchedDoc: '智能仓储系统产品手册 V3.2',
          score: Math.floor(Math.random() * 30 + 60),
          status: 'partial' as RetrievalStatus,
          snippet: `基于"${searchQuery}"的语义检索，匹配到相关内容片段：系统支持多仓协同、动态盘点与 AGV 路径规划，适用于中大型制造企业的智能仓储改造...`,
        },
      ];
      setSearchResults(results);
      setIsSearching(false);
    }, 900);
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredEntries = entries.filter((e) => {
    const statusMatch = filterStatus === '全部' || e.status === filterStatus;
    return statusMatch;
  });

  const totalCalls = agentSupports.reduce((sum, a) => sum + a.callsToday, 0);
  const avgCoverage = Math.round(agentSupports.reduce((sum, a) => sum + a.coverage, 0) / agentSupports.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/40 p-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              AI 知识库
              <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full font-medium">地基层</span>
            </h1>
            <p className="text-sm text-gray-500">支撑 五大智能体的统一知识底座</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUpdateReminder(!updateReminder)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors border ${
              updateReminder
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            更新提醒 {updateReminder ? '开' : '关'}
          </button>
          <button
            onClick={handleUpload}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity shadow-md shadow-purple-200"
          >
            <Upload className="w-4 h-4" />
            上传知识
          </button>
        </div>
      </div>

      {/* ===== 1. Overview Callout ===== */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 rounded-2xl p-8 text-white shadow-xl shadow-purple-200/50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-14 h-14 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">AI 知识库：企业拥抱 AI 时代的敲门砖</h2>
              <p className="text-purple-50/90 leading-relaxed max-w-4xl">
                所有智能体的智能都来自知识。没有知识库，智能体只能输出通用内容；有了知识库，智能体输出的每一句文案、每一个推荐、每一次对话都带着客户企业的专业深度。
              </p>
            </div>
          </div>
          {/* Moat concept */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <Shield className="w-5 h-5 mb-2 text-purple-100" />
              <div className="text-sm font-semibold mb-1">知识越丰富，智能体越聪明</div>
              <div className="text-xs text-purple-100/80">检索召回率↑、回答专业度↑</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <TrendingUp className="w-5 h-5 mb-2 text-purple-100" />
              <div className="text-sm font-semibold mb-1">数字资产越厚，企业壁垒越深</div>
              <div className="text-xs text-purple-100/80">私有语料积累 → 不可复制的护城河</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <BookOpen className="w-5 h-5 mb-2 text-purple-100" />
              <div className="text-sm font-semibold mb-1">这是 AI 时代企业真正的护城河</div>
              <div className="text-xs text-purple-100/80">知识即竞争力，资产即壁垒</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 2. Dual Knowledge Base ===== */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-800">双知识库架构</h3>
          <span className="text-sm text-gray-400">企业私有 + 行业通用，双层赋能</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <KnowledgeBaseCard kb={enterpriseKB} />
          <KnowledgeBaseCard kb={industryKB} />
        </div>
      </section>

      {/* ===== 3. Four-Layer Tech Stack ===== */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Network className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-800">四层技术栈</h3>
          <span className="text-sm text-gray-400">从原始资料到智能体调用的知识链路</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {techStack.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div key={layer.level} className="relative">
                {idx < techStack.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-purple-200 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-purple-500" />
                    </div>
                  </div>
                )}
                <div className={`bg-gradient-to-br ${layer.color} rounded-xl p-5 text-white h-full relative overflow-hidden`}>
                  <div className="absolute top-3 right-3 text-5xl font-bold text-white/15">L{layer.level}</div>
                  <div className="relative">
                    <div className="w-11 h-11 bg-white/15 backdrop-blur rounded-lg flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold mb-1">{layer.name}</h4>
                    <p className="text-xs text-white/80 mb-3">{layer.desc}</p>
                    <div className="bg-white/15 backdrop-blur rounded-md px-2.5 py-1.5 inline-block">
                      <span className="text-xs font-semibold">{layer.count}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Flow line for mobile */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <HardDrive className="w-3.5 h-3.5" />
          <span>数据沉淀</span>
          <ArrowRight className="w-3 h-3" />
          <Cpu className="w-3.5 h-3.5" />
          <span>智能加工</span>
          <ArrowRight className="w-3 h-3" />
          <Database className="w-3.5 h-3.5" />
          <span>知识沉淀</span>
          <ArrowRight className="w-3 h-3" />
          <Server className="w-3.5 h-3.5" />
          <span>智能体赋能</span>
        </div>
      </section>

      {/* ===== 4. Agent Support Dashboard ===== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-800">知识库 × 五大智能体支撑看板</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-1.5">
              <span className="text-xs text-gray-500">今日总调用</span>
              <span className="ml-2 text-sm font-bold text-purple-600">{totalCalls.toLocaleString()}</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-1.5">
              <span className="text-xs text-gray-500">平均命中</span>
              <span className="ml-2 text-sm font-bold text-green-600">{avgCoverage}%</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agentSupports.map((support) => (
            <AgentSupportCard key={support.id} support={support} />
          ))}
        </div>
        <div className="mt-3 bg-purple-50/50 border border-purple-100 rounded-lg px-4 py-2.5 flex items-center gap-2 text-xs text-purple-600">
          <Shield className="w-3.5 h-3.5" />
          知识库为「内容生成、智能客服、行为分析、增长策略」4 大智能体提供四维度支撑，每个维度独立追踪调用频次与命中覆盖度。
        </div>
      </section>

      {/* ===== 5. Knowledge Management ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Knowledge list */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-800">知识分类管理</h3>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-200"
              >
                <option value="全部">全部状态</option>
                <option value="已索引">已索引</option>
                <option value="处理中">处理中</option>
                <option value="待审核">待审核</option>
              </select>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-gray-100">
            {categoryOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeCategory === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    setActiveCategory(opt.value);
                    console.log(`切换至知识分类：${opt.label}`);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Knowledge entries */}
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
                暂无匹配的知识条目
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all group"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-gray-800 truncate">{entry.title}</h4>
                      <span className={`text-xs px-1.5 py-0.5 rounded border ${getStatusBadge(entry.status)}`}>
                        {entry.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {entry.chunks} 块
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {entry.updatedAt}
                      </span>
                      <span className="truncate">{entry.source}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => alert(`查看「${entry.title}」详情：共 ${entry.chunks} 块语料，状态：${entry.status}`)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                      aria-label="编辑"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
                      aria-label="删除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add new entry */}
          <button
            onClick={handleUpload}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-purple-300 hover:text-purple-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            添加 {activeCategory} 知识
          </button>
        </div>

        {/* Right: Retrieval test */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-800">知识检索测试</h3>
          </div>
          <p className="text-xs text-gray-400 mb-3">输入问题，测试知识库的语义检索召回质量</p>

          {/* Search input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runRetrievalTest()}
              placeholder="例如：智能仓储系统的核心功能"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
            />
            <button
              onClick={runRetrievalTest}
              disabled={isSearching}
              className="flex items-center gap-1.5 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSearching ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              检索
            </button>
          </div>

          {/* Sample queries */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {retrievalTests.map((t) => (
              <button
                key={t.id}
                onClick={() => setSearchQuery(t.query)}
                className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded-md hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                {t.query.length > 12 ? t.query.slice(0, 12) + '...' : t.query}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {isSearching && (
              <div className="text-center py-8">
                <RefreshCw className="w-6 h-6 mx-auto text-purple-500 animate-spin mb-2" />
                <p className="text-xs text-gray-400">正在向量化查询并检索知识库...</p>
              </div>
            )}
            {!isSearching && searchResults && searchResults.map((r) => {
              const badge = getRetrievalBadge(r.status);
              const BadgeIcon = badge.icon;
              return (
                <div key={r.id} className="border border-gray-100 rounded-xl p-3 hover:border-purple-200 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400 mb-0.5">查询</div>
                      <div className="text-sm font-medium text-gray-700">{r.query}</div>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${badge.color} flex-shrink-0 ml-2`}>
                      <BadgeIcon className="w-3 h-3" />
                      {badge.label}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5 mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">命中文档</span>
                      <span className="text-xs font-bold text-purple-600">相似度 {r.score}%</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-1.5">{r.matchedDoc}</div>
                    <p className="text-xs text-gray-500 leading-relaxed">{r.snippet}</p>
                  </div>
                  {/* Score bar */}
                  <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        r.score >= 85 ? 'bg-green-500' : r.score >= 65 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {!isSearching && !searchResults && (
              <div className="text-center py-8 text-gray-400">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">输入问题开始测试</p>
                <p className="text-xs mt-1">支持自然语言语义检索</p>
              </div>
            )}
          </div>

          {/* Update reminder card */}
          {updateReminder && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Bell className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-amber-700 mb-0.5">知识更新提醒</div>
                  <p className="text-xs text-amber-600 leading-relaxed">
                    检测到 3 份产品手册超过 30 天未更新，建议同步最新版本以保持智能体回答准确性。
                  </p>
                  <button
                    onClick={() => alert('已安排在后台同步更新 3 份过期产品手册，预计 15 分钟内完成。')}
                    className="mt-2 text-xs font-medium text-amber-700 hover:text-amber-800 underline"
                  >
                    立即同步 →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">上传 {activeCategory} 知识</h3>
                <p className="text-xs text-gray-500">正在处理并向量化...</p>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-gray-600">进度</span>
              <span className="font-bold text-purple-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-150"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-3">
              {uploadProgress < 50
                ? '正在解析文件内容并清洗...'
                : uploadProgress < 90
                ? '正在分块、向量化并写入向量库...'
                : '正在更新知识图谱与索引...'}
            </p>
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="text-center text-xs text-gray-400 pt-2 pb-4">
        AI 知识库 · 知识越厚，智能体越聪明 · 数字资产即企业护城河
      </div>
    </div>
  );
}
