import { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Brain,
  Rocket,
  LineChart,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  TrendingUp,
  MousePointerClick,
  FileText,
  Search,
  Sparkles,
  ChevronRight,
  Play,
  Settings,
  Check,
  Clock,
  Lightbulb,
  BarChart3,
  Funnel,
  MessageSquare,
  Shield,
  Award,
} from 'lucide-react';

// ===== Types =====
type FlywheelStage = 0 | 1 | 2 | 3 | 4 | 5;
type DiagnosisStatus = 'pending' | 'scanning' | 'done';
type TaskStatus = 'pending' | 'running' | 'completed';

interface DiagnosisItem {
  id: string;
  dimension: string;
  icon: typeof Target;
  score: number;
  status: 'critical' | 'warning' | 'good';
  issues: string[];
  suggestion: string;
}

interface StrategyItem {
  id: string;
  title: string;
  priority: 'P0' | 'P1' | 'P2';
  category: string;
  impact: string;
  effort: '低' | '中' | '高';
  description: string;
  accepted: boolean;
}

interface ExecutionTask {
  id: string;
  name: string;
  type: string;
  status: TaskStatus;
  progress: number;
  result?: string;
}

interface AIMessage {
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

// ===== Mock Data =====
const northStarGoal = 3.0;
const currentConversion = 0.52;

const diagnosisData: DiagnosisItem[] = [
  {
    id: 'd1',
    dimension: '转化链路',
    icon: Funnel,
    score: 35,
    status: 'critical',
    issues: ['首屏无明确CTA按钮', '表单字段过多(8个)', '缺少引导留资路径'],
    suggestion: '重构转化链路：首屏CTA → 内容引导 → 精简表单 → 即时反馈',
  },
  {
    id: 'd2',
    dimension: '内容质量',
    icon: FileText,
    score: 48,
    status: 'critical',
    issues: ['产品描述过于简略', '缺少行业关键词', '无多语言版本'],
    suggestion: 'AI生成多语言、SEO优化的产品详情页，覆盖目标客户搜索意图',
  },
  {
    id: 'd3',
    dimension: '搜索可见性',
    icon: Search,
    score: 55,
    status: 'warning',
    issues: ['Meta标签不完整', '页面加载速度3.2s', '移动端适配待优化'],
    suggestion: '优化技术SEO，提升百度/Google双生态收录和排名',
  },
  {
    id: 'd4',
    dimension: '用户互动',
    icon: MessageSquare,
    score: 40,
    status: 'critical',
    issues: ['无AI智能客服', '无在线咨询入口', '访客来了就走'],
    suggestion: '部署AI智能客服，7×24小时引导访客留资',
  },
  {
    id: 'd5',
    dimension: '数据追踪',
    icon: BarChart3,
    score: 30,
    status: 'critical',
    issues: ['无转化路径埋点', '无法识别转化瓶颈', '流量来源不清晰'],
    suggestion: '部署全链路转化埋点，构建流量→内容→转化→线索数据闭环',
  },
  {
    id: 'd6',
    dimension: '信任建设',
    icon: Shield,
    score: 65,
    status: 'warning',
    issues: ['缺少客户案例', '无资质认证展示', '隐私政策不完整'],
    suggestion: '添加成功案例模块和资质认证，增强B2B信任感',
  },
];

const strategyData: StrategyItem[] = [
  {
    id: 's1',
    title: '首屏转化链路重构',
    priority: 'P0',
    category: '转化优化',
    impact: '预计转化率 +0.8%',
    effort: '低',
    description: '在首屏添加"立即询价"CTA按钮，精简表单至5个核心字段，添加即时成功反馈',
    accepted: false,
  },
  {
    id: 's2',
    title: 'AI内容生成引擎部署',
    priority: 'P0',
    category: '内容生产',
    impact: '预计转化率 +0.5%',
    effort: '中',
    description: '基于企业知识库，AI自动生成多语言、SEO优化的产品详情页，一键发布',
    accepted: false,
  },
  {
    id: 's3',
    title: 'AI智能客服PRO上线',
    priority: 'P0',
    category: '转化工具',
    impact: '预计转化率 +0.6%',
    effort: '中',
    description: '部署基于知识库的AI客服，支持多语言问答、产品推荐、主动引导留资',
    accepted: false,
  },
  {
    id: 's4',
    title: '全链路转化埋点',
    priority: 'P1',
    category: '数据分析',
    impact: '数据驱动决策',
    effort: '中',
    description: '部署流量→页面→行为→转化→线索全链路埋点，构建数据闭环分析体系',
    accepted: false,
  },
  {
    id: 's5',
    title: 'SEO技术优化',
    priority: 'P1',
    category: '搜索优化',
    impact: '预计流量 +30%',
    effort: '低',
    description: '修复Meta标签、优化页面速度至2s以内、完善移动端适配和结构化数据',
    accepted: false,
  },
  {
    id: 's6',
    title: '信任模块搭建',
    priority: 'P2',
    category: '信任建设',
    impact: '预计转化率 +0.2%',
    effort: '低',
    description: '添加客户成功案例、行业资质认证、隐私政策完善，增强B2B采购信任感',
    accepted: false,
  },
];

const executionTasks: ExecutionTask[] = [
  { id: 't1', name: '首屏CTA按钮部署', type: '转化优化', status: 'pending', progress: 0 },
  { id: 't2', name: '表单字段精简(8→5)', type: '转化优化', status: 'pending', progress: 0 },
  { id: 't3', name: 'AI产品内容生成(中/英)', type: '内容生产', status: 'pending', progress: 0 },
  { id: 't4', name: 'AI智能客服部署', type: '转化工具', status: 'pending', progress: 0 },
  { id: 't5', name: '全链路转化埋点', type: '数据分析', status: 'pending', progress: 0 },
  { id: 't6', name: 'SEO技术优化', type: '搜索优化', status: 'pending', progress: 0 },
  { id: 't7', name: '信任模块搭建', type: '信任建设', status: 'pending', progress: 0 },
];

const funnelData = [
  { stage: '网站访问', value: 8420, rate: '100%', color: 'from-blue-500 to-blue-600' },
  { stage: '深度浏览', value: 5052, rate: '60%', color: 'from-indigo-500 to-indigo-600' },
  { stage: 'CTA点击', value: 1263, rate: '15%', color: 'from-purple-500 to-purple-600' },
  { stage: '表单提交', value: 328, rate: '3.9%', color: 'from-pink-500 to-pink-600' },
  { stage: '有效线索', value: 197, rate: '2.3%', color: 'from-green-500 to-green-600' },
];

const stageNames = ['概览', '自动诊断', '策略建议', '自动执行', '数据追踪', '持续优化'];
const stageIcons = [Activity, Search, Lightbulb, Rocket, LineChart, RefreshCw];
const stageColors = [
  'text-blue-500',
  'text-amber-500',
  'text-purple-500',
  'text-cyan-500',
  'text-green-500',
  'text-pink-500',
];
const stageBgColors = [
  'bg-blue-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-cyan-500',
  'bg-green-500',
  'bg-pink-500',
];

// ===== Helper Components =====
const getScoreColor = (score: number) => {
  if (score >= 70) return '#10B981';
  if (score >= 50) return '#F59E0B';
  return '#EF4444';
};

const getScoreGrade = (score: number) => {
  if (score >= 70) return { label: '良好', color: 'text-green-600', bg: 'bg-green-50' };
  if (score >= 50) return { label: '待优化', color: 'text-amber-600', bg: 'bg-amber-50' };
  return { label: '需改进', color: 'text-red-600', bg: 'bg-red-50' };
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'critical': return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'good': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    default: return null;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'P0': return 'bg-red-100 text-red-700 border-red-200';
    case 'P1': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'P2': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getEffortColor = (effort: string) => {
  switch (effort) {
    case '低': return 'text-green-600';
    case '中': return 'text-amber-600';
    case '高': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

// ===== AI Assistant Chat =====
const AIAssistant = ({ messages }: { messages: AIMessage[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-800">AI 增长助手</span>
          <span className="ml-2 text-xs text-green-500 flex items-center gap-1 inline-flex">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />在线
          </span>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[320px]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
              msg.role === 'ai'
                ? 'bg-gray-100 text-gray-700'
                : 'bg-blue-600 text-white'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== Main Component =====
export default function GrowthFlywheel({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [stage, setStage] = useState<FlywheelStage>(0);
  const [diagnosisStatus, setDiagnosisStatus] = useState<DiagnosisStatus>('pending');
  const [diagnosedItems, setDiagnosedItems] = useState<Set<string>>(new Set());
  const [strategies, setStrategies] = useState<StrategyItem[]>(strategyData);
  const [tasks, setTasks] = useState<ExecutionTask[]>(executionTasks);
  const [isExecuting, setIsExecuting] = useState(false);
  const [conversionRate, setConversionRate] = useState(currentConversion);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      role: 'ai',
      content: '您好！我是 AI 增长助手。我将帮您构建从「流量→线索」的完整增长飞轮，目标是把转化率从 0.5% 提升到 3%。点击「启动飞轮」开始吧！',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Diagnosis effect - uses setTimeout chain with cancelled flag (StrictMode safe)
  useEffect(() => {
    if (stage !== 1 || diagnosisStatus !== 'scanning') return;

    let cancelled = false;
    let idx = 0;

    const diagnoseNext = () => {
      if (cancelled) return;
      if (idx < diagnosisData.length) {
        const item = diagnosisData[idx];
        if (item && item.id) {
          setDiagnosedItems(prev => new Set([...prev, item.id]));
        }
        idx++;
        setTimeout(diagnoseNext, 800);
      } else {
        setDiagnosisStatus('done');
        setAiMessages(prev => [...prev, {
          role: 'ai',
          content: '诊断完成！我发现 6 大维度存在转化瓶颈。其中「转化链路」和「数据追踪」评分最低，是影响转化率的核心原因。建议进入下一步查看优化策略。',
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        }]);
      }
    };

    const timeoutId = setTimeout(diagnoseNext, 800);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [stage, diagnosisStatus]);

  // Execution effect - uses setTimeout chain with cancelled flag (StrictMode safe)
  useEffect(() => {
    if (stage !== 3 || !isExecuting) return;

    let cancelled = false;
    let taskIdx = 0;

    const runNextTask = () => {
      if (cancelled) return;
      if (taskIdx >= tasks.length) {
        setIsExecuting(false);
        setConversionRate(2.8);
        setAiMessages(prev => [...prev, {
          role: 'ai',
          content: '所有优化任务执行完成！转化率已从 0.5% 提升至 2.8%，接近 3% 目标。进入数据追踪查看详细效果分析。',
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        }]);
        return;
      }

      // Mark task as running
      setTasks(prev => prev.map((t, i) =>
        i === taskIdx ? { ...t, status: 'running' as TaskStatus } : t
      ));

      let progress = 0;
      const updateProgress = () => {
        if (cancelled) return;
        progress += 20;
        if (progress >= 100) {
          setTasks(prev => prev.map((t, i) =>
            i === taskIdx ? { ...t, status: 'completed' as TaskStatus, progress: 100, result: '成功' } : t
          ));
          taskIdx++;
          setTimeout(runNextTask, 600);
        } else {
          setTasks(prev => prev.map((t, i) =>
            i === taskIdx ? { ...t, progress } : t
          ));
          setTimeout(updateProgress, 200);
        }
      };

      setTimeout(updateProgress, 200);
    };

    const timeoutId = setTimeout(runNextTask, 600);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [stage, isExecuting]);

  const startDiagnosis = () => {
    setStage(1);
    setDiagnosisStatus('scanning');
    setDiagnosedItems(new Set());
    setAiMessages(prev => [...prev, {
      role: 'ai',
      content: '正在对您的网站进行全方位诊断，扫描转化链路、内容质量、搜索可见性、用户互动等 6 大维度...',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const goToStrategies = () => {
    setStage(2);
    setAiMessages(prev => [...prev, {
      role: 'ai',
      content: '基于诊断结果，我为您生成了 6 项优化策略。P0 级策略预计可将转化率提升至 2.0%+。请审阅并选择要执行的策略。',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const toggleStrategy = (id: string) => {
    setStrategies(prev => prev.map(s => s.id === id ? { ...s, accepted: !s.accepted } : s));
  };

  const acceptAllStrategies = () => {
    setStrategies(prev => prev.map(s => ({ ...s, accepted: true })));
  };

  const goExecution = () => {
    const accepted = strategies.filter(s => s.accepted);
    if (accepted.length === 0) {
      setAiMessages(prev => [...prev, {
        role: 'ai',
        content: '请至少选择一项策略后再执行。建议全选以获得最佳效果。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      }]);
      return;
    }
    setStage(3);
    setAiMessages(prev => [...prev, {
      role: 'ai',
      content: `已采纳 ${accepted.length} 项策略。即将自动执行 ${accepted.length} 个优化任务，包括CTA部署、内容生成、AI客服上线等。整个过程无需人工干预。`,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const startExecution = () => {
    setIsExecuting(true);
  };

  const goToTracking = () => {
    setStage(4);
    setAiMessages(prev => [...prev, {
      role: 'ai',
      content: '转化率已提升至 2.8%！从转化漏斗可以看到，CTA点击率和表单提交率显著提升。不过距离 3% 目标还有 0.2% 的差距，建议进入持续优化阶段。',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const goToOptimize = () => {
    setStage(5);
    setAiMessages(prev => [...prev, {
      role: 'ai',
      content: '基于第一轮飞轮数据，我建议进入第二轮优化：1) A/B测试CTA文案，2) 优化AI客服话术，3) 增加行业关键词覆盖。预计可突破 3% 目标。点击「启动新一轮飞轮」继续优化！',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const restartFlywheel = () => {
    setStage(0);
    setDiagnosisStatus('pending');
    setDiagnosedItems(new Set());
    setStrategies(strategyData.map(s => ({ ...s, accepted: false })));
    setTasks(executionTasks.map(t => ({ ...t, status: 'pending' as TaskStatus, progress: 0 })));
    setConversionRate(currentConversion);
    setAiMessages([{
      role: 'ai',
      content: '开启新一轮增长飞轮！基于上一轮数据，AI 已调整优化策略，预计本次可突破 3% 转化率目标。',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  // ===== Render: Overview (Stage 0) =====
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-300" />
            <span className="text-sm text-purple-200 font-medium">AI 驱动的获客增长引擎</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">让每一个访客都更可能成为线索</h1>
          <p className="text-blue-200 mb-6 max-w-2xl">
            AI 增长飞轮自动完成「诊断→策略→执行→追踪→优化」闭环，无需进入传统后台菜单，1人即可运营整个获客体系
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={startDiagnosis}
              className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
            >
              <Zap className="w-5 h-5" />
              启动 AI 增长飞轮
            </button>
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <Clock className="w-4 h-4" />
              <span>全程约 3 分钟</span>
            </div>
          </div>
        </div>
      </div>

      {/* North Star Metric */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-medium">当前转化率</span>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{conversionRate.toFixed(2)}%</p>
          <div className="mt-3 flex items-center gap-1 text-sm text-red-500">
            <ArrowDownRight className="w-4 h-4" />
            <span>低于行业平均 2%</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm opacity-80 font-medium">目标转化率</span>
            <Award className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-3xl font-bold">{northStarGoal.toFixed(1)}%</p>
          <div className="mt-3 flex items-center gap-1 text-sm opacity-80">
            <TrendingUp className="w-4 h-4" />
            <span>行业中位数 2%-5%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-medium">提升空间</span>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-800">+{(northStarGoal - conversionRate).toFixed(2)}%</p>
          <div className="mt-3 flex items-center gap-1 text-sm text-green-500">
            <ArrowUpRight className="w-4 h-4" />
            <span>预计线索量 +476%</span>
          </div>
        </div>
      </div>

      {/* Flywheel Steps Preview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">增长飞轮 5 步闭环</h3>
        <div className="grid grid-cols-5 gap-2">
          {stageNames.slice(1).map((name, idx) => {
            const Icon = stageIcons[idx + 1];
            return (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 ${stageBgColors[idx + 1]} rounded-xl flex items-center justify-center mb-2`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{name}</span>
                <span className="text-xs text-gray-400 mt-1">Step {idx + 1}</span>
                {idx < 4 && (
                  <ChevronRight className="hidden md:block absolute" style={{ display: 'none' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ===== Render: Diagnosis (Stage 1) =====
  const renderDiagnosis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Search className={`w-6 h-6 ${stageColors[1]}`} />
            AI 自动诊断
          </h2>
          <p className="text-gray-500 mt-1">全方位扫描网站转化瓶颈</p>
        </div>
        {diagnosisStatus === 'done' && (
          <button
            onClick={goToStrategies}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            查看优化策略
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#E5E7EB" strokeWidth="8" />
              <circle
                cx="64" cy="64" r="56" fill="none" stroke={getScoreColor(diagnosisStatus === 'done' ? 46 : 0)}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${(diagnosisStatus === 'done' ? 46 : 0) / 100 * 351.7} 351.7`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-800">{diagnosisStatus === 'done' ? '46' : diagnosisStatus === 'scanning' ? '...' : '--'}</span>
              <span className="text-xs text-gray-500">综合评分</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {diagnosisStatus === 'pending' && '准备开始诊断'}
              {diagnosisStatus === 'scanning' && '正在扫描网站...'}
              {diagnosisStatus === 'done' && '诊断完成 - 发现 6 大转化瓶颈'}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              {diagnosisStatus === 'pending' && 'AI 将扫描您的网站转化链路、内容质量、搜索可见性等 6 大维度'}
              {diagnosisStatus === 'scanning' && `已扫描 ${diagnosedItems.size}/${diagnosisData.length} 个维度`}
              {diagnosisStatus === 'done' && '核心问题：转化链路断裂、内容薄弱、无AI客服。预计通过优化可将转化率提升至3%。'}
            </p>
            {diagnosisStatus === 'pending' && (
              <button
                onClick={() => setDiagnosisStatus('scanning')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                开始诊断
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Diagnosis Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diagnosisData.map((item) => {
          const isDiagnosed = diagnosedItems.has(item.id) || diagnosisStatus === 'done';
          const Icon = item.icon;
          const grade = getScoreGrade(item.score);
          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-5 border shadow-sm transition-all duration-500 ${
                isDiagnosed ? 'border-gray-100 opacity-100' : 'border-gray-50 opacity-40'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${grade.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${grade.color}`} />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">{item.dimension}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      {getStatusIcon(item.status)}
                      <span className={`text-xs ${grade.color}`}>{grade.label}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold" style={{ color: getScoreColor(item.score) }}>
                    {isDiagnosed ? item.score : '--'}
                  </span>
                  <span className="text-xs text-gray-400">/100</span>
                </div>
              </div>
              {isDiagnosed && (
                <div className="space-y-2">
                  {item.issues.map((issue, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{issue}</span>
                    </div>
                  ))}
                  <div className="mt-3 p-2.5 bg-blue-50 rounded-lg flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-700">{item.suggestion}</span>
                  </div>
                </div>
              )}
              {!isDiagnosed && diagnosisStatus === 'scanning' && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-4 h-4 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                  <span>扫描中...</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ===== Render: Strategies (Stage 2) =====
  const renderStrategies = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Lightbulb className={`w-6 h-6 ${stageColors[2]}`} />
            AI 策略建议
          </h2>
          <p className="text-gray-500 mt-1">基于诊断结果生成的优化策略</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={acceptAllStrategies}
            className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Check className="w-4 h-4" />
            全部采纳
          </button>
          <button
            onClick={goExecution}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            执行选中策略
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Strategy Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm opacity-80">已采纳策略</span>
            <p className="text-2xl font-bold mt-1">{strategies.filter(s => s.accepted).length} / {strategies.length}</p>
          </div>
          <div>
            <span className="text-sm opacity-80">预计转化率提升</span>
            <p className="text-2xl font-bold mt-1">+2.3%</p>
          </div>
          <div>
            <span className="text-sm opacity-80">预计达到</span>
            <p className="text-2xl font-bold mt-1">2.8%</p>
          </div>
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="space-y-3">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className={`bg-white rounded-xl p-5 border-2 shadow-sm transition-all cursor-pointer ${
              strategy.accepted ? 'border-blue-400 bg-blue-50/30' : 'border-transparent hover:border-gray-200'
            }`}
            onClick={() => toggleStrategy(strategy.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                strategy.accepted ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}>
                {strategy.accepted && <Check className="w-3 h-3 text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-800">{strategy.title}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getPriorityColor(strategy.priority)}`}>
                    {strategy.priority}
                  </span>
                  <span className="text-xs text-gray-400">{strategy.category}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-gray-500">影响：</span>
                    <span className="font-medium text-green-600">{strategy.impact}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500">工作量：</span>
                    <span className={`font-medium ${getEffortColor(strategy.effort)}`}>{strategy.effort}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ===== Render: Execution (Stage 3) =====
  const renderExecution = () => {
    const completedCount = tasks.filter(t => t.status === 'completed').length;
    const allDone = completedCount === tasks.length;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Rocket className={`w-6 h-6 ${stageColors[3]}`} />
              AI 自动任务执行
            </h2>
            <p className="text-gray-500 mt-1">
              {allDone ? `全部 ${tasks.length} 个任务已完成` : `${completedCount}/${tasks.length} 个任务完成`}
            </p>
          </div>
          {allDone ? (
            <button
              onClick={goToTracking}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              查看数据追踪
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            !isExecuting && (
              <button
                onClick={startExecution}
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                开始自动执行
              </button>
            )
          )}
        </div>

        {/* Execution Progress Bar */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">总体进度</span>
            <span className="text-sm font-bold text-blue-600">{Math.round((completedCount / tasks.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <span className="text-gray-500">待执行: {tasks.filter(t => t.status === 'pending').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-500">执行中: {tasks.filter(t => t.status === 'running').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-500">已完成: {completedCount}</span>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-4 border shadow-sm transition-all ${
                task.status === 'completed' ? 'border-green-200' :
                task.status === 'running' ? 'border-blue-300 ring-1 ring-blue-200' :
                'border-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  task.status === 'completed' ? 'bg-green-50' :
                  task.status === 'running' ? 'bg-blue-50' :
                  'bg-gray-50'
                }`}>
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : task.status === 'running' ? (
                    <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-800">{task.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{task.type}</span>
                    </div>
                    {task.status === 'completed' && task.result && (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> {task.result}
                      </span>
                    )}
                  </div>
                  {task.status === 'running' && (
                    <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-200"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ===== Render: Tracking (Stage 4) =====
  const renderTracking = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <LineChart className={`w-6 h-6 ${stageColors[4]}`} />
            数据追踪与分析
          </h2>
          <p className="text-gray-500 mt-1">全链路转化数据实时监控</p>
        </div>
        <button
          onClick={goToOptimize}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          进入持续优化
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Conversion Rate Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <span className="text-sm text-gray-500">优化前</span>
          <p className="text-2xl font-bold text-gray-400 mt-1">0.52%</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-5 text-white">
          <span className="text-sm opacity-80">当前转化率</span>
          <p className="text-2xl font-bold mt-1">{conversionRate.toFixed(2)}%</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <span className="text-sm text-gray-500">目标转化率</span>
          <p className="text-2xl font-bold text-gray-800 mt-1">3.00%</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <span className="text-sm text-gray-500">距目标差距</span>
          <p className="text-2xl font-bold text-amber-500 mt-1">{(northStarGoal - conversionRate).toFixed(2)}%</p>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">转化漏斗分析</h3>
        <div className="space-y-3">
          {funnelData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-600 font-medium">{item.stage}</div>
              <div className="flex-1">
                <div className={`h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center px-4`}
                  style={{ width: `${(item.value / funnelData[0].value) * 100}%` }}
                >
                  <span className="text-white text-sm font-medium">{item.value.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-16 text-right">
                <span className="text-sm font-bold text-gray-700">{item.rate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'CTA点击率', before: '1.8%', after: '3.2%', change: '+78%', icon: MousePointerClick, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '表单转化率', before: '2.3%', after: '3.8%', change: '+65%', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
          { label: '页面停留', before: '45s', after: '62s', change: '+38%', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '跳出率', before: '68%', after: '52%', change: '-24%', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${metric.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-xl font-bold text-gray-800">{metric.after}</span>
                <span className="text-sm text-gray-400 line-through">{metric.before}</span>
              </div>
              <p className="text-xs text-green-600 font-medium mt-1">{metric.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ===== Render: Optimization (Stage 5) =====
  const renderOptimization = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <RefreshCw className={`w-6 h-6 ${stageColors[5]}`} />
            持续优化与迭代
          </h2>
          <p className="text-gray-500 mt-1">飞轮持续运转，逼近 3% 目标</p>
        </div>
        <button
          onClick={restartFlywheel}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          启动新一轮飞轮
        </button>
      </div>

      {/* Current vs Goal */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm opacity-80">当前转化率</span>
            <p className="text-4xl font-bold mt-1">{conversionRate.toFixed(2)}%</p>
            <p className="text-sm opacity-80 mt-1">距 3% 目标仅差 {(northStarGoal - conversionRate).toFixed(2)}%</p>
          </div>
          <div className="text-right">
            <span className="text-sm opacity-80">提升幅度</span>
            <p className="text-4xl font-bold mt-1">+{((conversionRate - currentConversion) / currentConversion * 100).toFixed(0)}%</p>
            <p className="text-sm opacity-80 mt-1">较初始 baseline</p>
          </div>
        </div>
        <div className="mt-4 w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-1000"
            style={{ width: `${(conversionRate / northStarGoal) * 100}%` }}
          />
        </div>
      </div>

      {/* Next Round Suggestions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          下一轮飞轮优化建议
        </h3>
        <div className="space-y-3">
          {[
            { title: 'A/B 测试 CTA 文案', desc: '测试"立即询价"vs"获取报价"vs"免费咨询"，选择转化率最高的版本', impact: '预计 +0.1%' },
            { title: '优化 AI 客服话术', desc: '基于第一轮对话数据，优化客服引导留资的话术流程', impact: '预计 +0.05%' },
            { title: '增加行业关键词覆盖', desc: '扩展 20 个长尾关键词，覆盖更多目标客户搜索意图', impact: '预计 +0.05%' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-600">{idx + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{item.title}</span>
                  <span className="text-xs text-green-600 font-medium">{item.impact}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flywheel Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">第一轮飞轮总结</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stageNames.slice(1).map((name, idx) => {
            const Icon = stageIcons[idx + 1];
            return (
              <div key={idx} className="text-center">
                <div className={`w-12 h-12 ${stageBgColors[idx + 1]} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{name}</span>
                <div className="flex items-center justify-center mt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 ml-1">完成</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ===== Render: Stage Content =====
  const renderStage = () => {
    switch (stage) {
      case 0: return renderOverview();
      case 1: return renderDiagnosis();
      case 2: return renderStrategies();
      case 3: return renderExecution();
      case 4: return renderTracking();
      case 5: return renderOptimization();
      default: return renderOverview();
    }
  };

  // ===== Render: Step Indicator =====
  const renderStepIndicator = () => {
    if (stage === 0) return null;
    return (
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="flex items-center gap-2">
          {stageNames.slice(1).map((name, idx) => {
            const stepNum = idx + 1;
            const isActive = stage === stepNum;
            const isDone = stage > stepNum;
            const Icon = stageIcons[stepNum];
            return (
              <div key={idx} className="flex items-center">
                <button
                  onClick={() => isDone && setStage(stepNum as FlywheelStage)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'bg-blue-50 text-blue-700' :
                    isDone ? 'text-green-600 hover:bg-green-50 cursor-pointer' :
                    'text-gray-400'
                  }`}
                  disabled={!isDone && !isActive}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isActive ? 'bg-blue-600 text-white' :
                    isDone ? 'bg-green-500 text-white' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {isDone ? <Check className="w-3 h-3" /> : stepNum}
                  </div>
                  <span className="hidden md:inline">{name}</span>
                </button>
                {idx < 4 && <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-800">AI 增长飞轮</h1>
            <p className="text-xs text-gray-400">自动诊断 → 策略建议 → 任务执行 → 数据追踪 → 持续优化</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700 font-medium">北极星：{conversionRate.toFixed(2)}% → 3.0%</span>
          </div>
          <button
            onClick={() => onNavigate?.('dashboard')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">传统后台</span>
          </button>
        </div>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Main Content */}
      <div className="flex">
        {/* Left: Stage Content */}
        <div className="flex-1 p-6">
          {renderStage()}
        </div>

        {/* Right: AI Assistant */}
        <div className="hidden lg:block w-80 p-6 pl-0">
          <div className="sticky top-6">
            <AIAssistant messages={aiMessages} />
            {/* Quick Stats */}
            <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">飞轮轮次</span>
                <span className="text-sm font-bold text-gray-800">第 1 轮</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">当前阶段</span>
                <span className="text-sm font-bold text-blue-600">{stageNames[stage]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">转化率</span>
                <span className="text-sm font-bold text-green-600">{conversionRate.toFixed(2)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">已执行任务</span>
                <span className="text-sm font-bold text-gray-800">
                  {tasks.filter(t => t.status === 'completed').length}/{tasks.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
