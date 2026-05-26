import { useState } from 'react';
import {
  Calendar,
  Sparkles,
  TrendingUp,
  Target,
  BarChart3,
  Eye,
  ThumbsUp,
  Share2,
  RefreshCw,
  Download,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Flame,
  Zap,
  Lightbulb,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Globe,
  Users,
  FileText,
  Image,
  Video,
} from 'lucide-react';

// 内容计划项接口
interface ContentPlanItem {
  id: string;
  title: string;
  type: 'article' | 'image' | 'video';
  date: string;
  status: 'planned' | 'in_progress' | 'completed';
  channel: string;
  aiScore: number;
}

// 竞品分析项接口
interface CompetitorItem {
  id: string;
  name: string;
  logo: string;
  contentCount: number;
  engagement: number;
  trendingTopics: string[];
  lastUpdate: string;
}

// 热点趋势项接口
interface TrendingItem {
  id: string;
  topic: string;
  category: string;
  heat: number;
  growth: number;
  relatedKeywords: string[];
  suggestedContent: string;
}

// 模拟数据 - 内容计划
const mockContentPlans: ContentPlanItem[] = [
  { id: '1', title: '618大促产品种草文案', type: 'article', date: '2026-05-26', status: 'planned', channel: '微信公众号', aiScore: 92 },
  { id: '2', title: '夏季新品宣传海报', type: 'image', date: '2026-05-27', status: 'in_progress', channel: '小红书', aiScore: 88 },
  { id: '3', title: '品牌故事短视频', type: 'video', date: '2026-05-28', status: 'planned', channel: '抖音', aiScore: 95 },
  { id: '4', title: '行业白皮书解读', type: 'article', date: '2026-05-29', status: 'completed', channel: '知乎', aiScore: 90 },
  { id: '5', title: '用户案例分享', type: 'article', date: '2026-05-30', status: 'planned', channel: 'LinkedIn', aiScore: 87 },
];

// 模拟数据 - 竞品分析
const mockCompetitors: CompetitorItem[] = [
  { id: '1', name: '竞品A科技', logo: 'A', contentCount: 156, engagement: 4.8, trendingTopics: ['AI技术', '智能制造', '数字化转型'], lastUpdate: '2小时前' },
  { id: '2', name: '竞品B集团', logo: 'B', contentCount: 203, engagement: 3.2, trendingTopics: ['绿色能源', '可持续发展'], lastUpdate: '5小时前' },
  { id: '3', name: '竞品C公司', logo: 'C', contentCount: 89, engagement: 5.6, trendingTopics: ['创新设计', '用户体验'], lastUpdate: '1天前' },
];

// 模拟数据 - 热点趋势
const mockTrendingTopics: TrendingItem[] = [
  { id: '1', topic: 'AIGC内容创作', category: '技术趋势', heat: 98, growth: 45, relatedKeywords: ['ChatGPT', 'Midjourney', '内容生成'], suggestedContent: '发布AIGC在企业内容营销中的应用指南' },
  { id: '2', topic: 'ESG可持续发展', category: '行业热点', heat: 87, growth: 23, relatedKeywords: ['碳中和', '绿色办公', '社会责任'], suggestedContent: '制作企业ESG实践案例视频' },
  { id: '3', topic: '短视频营销', category: '营销策略', heat: 92, growth: 18, relatedKeywords: ['抖音', '快手', '视频号'], suggestedContent: '推出短视频制作最佳实践系列' },
  { id: '4', topic: '私域流量运营', category: '运营策略', heat: 85, growth: 12, relatedKeywords: ['社群运营', '会员体系', '复购率'], suggestedContent: '撰写私域流量运营白皮书' },
];

// 营销日历事件
const calendarEvents = [
  { date: '6月1日', event: '儿童节营销', type: '节日', priority: 'high' },
  { date: '6月18日', event: '618购物节', type: '大促', priority: 'high' },
  { date: '6月21日', event: '夏至节气', type: '节气', priority: 'medium' },
  { date: '6月22日', event: '端午节', type: '节日', priority: 'high' },
];

export default function ContentStrategy() {
  const [activeTab, setActiveTab] = useState<'planner' | 'competitor' | 'trending'>('planner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCompetitorModal, setShowCompetitorModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ContentPlanItem | null>(null);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorItem | null>(null);
  const [contentPlans, setContentPlans] = useState<ContentPlanItem[]>(mockContentPlans);
  const [selectedTrendFilter, setSelectedTrendFilter] = useState<string>('all');

  // 生成内容计划
  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newPlan: ContentPlanItem = {
        id: Date.now().toString(),
        title: 'AI生成的营销方案',
        type: 'article',
        date: new Date().toISOString().split('T')[0],
        status: 'planned',
        channel: '全渠道',
        aiScore: Math.floor(Math.random() * 20) + 80,
      };
      setContentPlans([newPlan, ...contentPlans]);
      alert('AI已为您生成新的内容计划！');
    }, 2000);
  };

  // 分析竞品
  const handleAnalyzeCompetitor = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('竞品分析报告已生成！');
    }, 1500);
  };

  // 刷新热点
  const handleRefreshTrends = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('热点数据已更新！');
    }, 1000);
  };

  // 采纳热点建议
  const handleAdoptTrend = (trend: TrendingItem) => {
    const newPlan: ContentPlanItem = {
      id: Date.now().toString(),
      title: trend.suggestedContent,
      type: 'article',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      status: 'planned',
      channel: '微信公众号',
      aiScore: trend.heat,
    };
    setContentPlans([newPlan, ...contentPlans]);
    alert(`已将"${trend.topic}"相关内容加入计划！`);
  };

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-gray-100 text-gray-600';
      case 'in_progress':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned':
        return '计划中';
      case 'in_progress':
        return '进行中';
      case 'completed':
        return '已完成';
      default:
        return '计划中';
    }
  };

  return (
    <div className="space-y-6">
      {/* 顶部标题和描述 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Target className="w-6 h-6" />
              内容策略层
            </h1>
            <p className="text-indigo-100 mt-2">AI驱动的内容战略规划中心，智能规划、竞品洞察、趋势捕捉</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">24</div>
              <div className="text-xs text-indigo-200">本周计划</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold">89%</div>
              <div className="text-xs text-indigo-200">完成率</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold">156</div>
              <div className="text-xs text-indigo-200">热点追踪</div>
            </div>
          </div>
        </div>
      </div>

      {/* 标签切换 */}
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('planner')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'planner'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          AI内容规划师
        </button>
        <button
          onClick={() => setActiveTab('competitor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'competitor'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          竞品内容分析
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'trending'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          热点趋势捕捉
        </button>
      </div>

      {/* AI内容规划师 */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          {/* 营销日历概览 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  营销日历
                </h3>
                <button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:bg-indigo-400"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  AI生成计划
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {calendarEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      event.priority === 'high'
                        ? 'bg-red-50 border-red-100'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="text-xs text-gray-500 mb-1">{event.date}</div>
                    <div className={`font-medium text-sm ${
                      event.priority === 'high' ? 'text-red-700' : 'text-gray-800'
                    }`}>
                      {event.event}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        event.type === '大促'
                          ? 'bg-orange-100 text-orange-600'
                          : event.type === '节日'
                          ? 'bg-pink-100 text-pink-600'
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 快速统计 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-4">本月数据概览</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-sm text-gray-600">计划内容</span>
                  </div>
                  <span className="font-semibold text-gray-800">48</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">已完成</span>
                  </div>
                  <span className="font-semibold text-gray-800">32</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">进行中</span>
                  </div>
                  <span className="font-semibold text-gray-800">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-600">待开始</span>
                  </div>
                  <span className="font-semibold text-gray-800">4</span>
                </div>
              </div>
            </div>
          </div>

          {/* 内容计划列表 */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">内容计划列表</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('筛选功能开发中')}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  筛选
                </button>
                <button
                  onClick={() => setShowPlanModal(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  新建计划
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {contentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        plan.type === 'article' ? 'bg-blue-100 text-blue-600' :
                        plan.type === 'image' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {getTypeIcon(plan.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{plan.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {plan.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {plan.channel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm">
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                          <span className="text-gray-600">AI评分</span>
                          <span className="font-semibold text-indigo-600">{plan.aiScore}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(plan.status)}`}>
                        {getStatusText(plan.status)}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 竞品内容分析 */}
      {activeTab === 'competitor' && (
        <div className="space-y-6">
          {/* 竞品概览卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+3</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">12</div>
              <div className="text-sm text-gray-500">监控竞品数</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+156</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">2,847</div>
              <div className="text-sm text-gray-500">分析内容数</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">4.2%</div>
              <div className="text-sm text-gray-500">平均互动率</div>
            </div>
          </div>

          {/* 竞品列表 */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">竞品监控列表</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAnalyzeCompetitor}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:bg-indigo-400"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <BarChart3 className="w-4 h-4" />
                  )}
                  生成分析报告
                </button>
                <button
                  onClick={() => setShowCompetitorModal(true)}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  添加竞品
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {mockCompetitors.map((competitor) => (
                <div
                  key={competitor.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {competitor.logo}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{competitor.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>更新于 {competitor.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{competitor.contentCount}</div>
                        <div className="text-xs text-gray-500">内容数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{competitor.engagement}%</div>
                        <div className="text-xs text-gray-500">互动率</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {competitor.trendingTopics.slice(0, 2).map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedCompetitor(competitor)}
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm"
                      >
                        详情
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 竞品洞察 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">热门话题对比</h3>
              <div className="space-y-3">
                {['AI技术', '智能制造', '数字化转型', '绿色能源'].map((topic, index) => (
                  <div key={topic} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">{topic}</span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        style={{ width: `${[85, 72, 68, 45][index]}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800 w-12 text-right">
                      {[85, 72, 68, 45][index]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">内容形式分布</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">45%</div>
                  <div className="text-sm text-gray-500">图文内容</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <Video className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">35%</div>
                  <div className="text-sm text-gray-500">短视频</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <Image className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">15%</div>
                  <div className="text-sm text-gray-500">海报图片</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">5%</div>
                  <div className="text-sm text-gray-500">其他</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 热点趋势捕捉 */}
      {activeTab === 'trending' && (
        <div className="space-y-6">
          {/* 热点统计 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <Flame className="w-8 h-8" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">实时</span>
              </div>
              <div className="text-3xl font-bold">98</div>
              <div className="text-sm text-red-100">当前热度指数</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-gray-800">24</div>
              <div className="text-sm text-gray-500">今日新增热点</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <Lightbulb className="w-8 h-8 text-indigo-500" />
              </div>
              <div className="text-3xl font-bold text-gray-800">156</div>
              <div className="text-sm text-gray-500">内容建议</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-800">89%</div>
              <div className="text-sm text-gray-500">采纳率</div>
            </div>
          </div>

          {/* 筛选和刷新 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedTrendFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTrendFilter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setSelectedTrendFilter('tech')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTrendFilter === 'tech'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                技术趋势
              </button>
              <button
                onClick={() => setSelectedTrendFilter('marketing')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTrendFilter === 'marketing'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                营销策略
              </button>
              <button
                onClick={() => setSelectedTrendFilter('industry')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTrendFilter === 'industry'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                行业热点
              </button>
            </div>
            <button
              onClick={handleRefreshTrends}
              disabled={isGenerating}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              刷新热点
            </button>
          </div>

          {/* 热点趋势列表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockTrendingTopics.map((trend) => (
              <div
                key={trend.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-800 text-lg">{trend.topic}</h4>
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs">
                        {trend.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-red-500" />
                        热度 {trend.heat}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        +{trend.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {trend.heat}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">相关关键词</div>
                  <div className="flex flex-wrap gap-2">
                    {trend.relatedKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-indigo-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-indigo-800">AI内容建议</div>
                      <div className="text-sm text-indigo-600 mt-1">{trend.suggestedContent}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdoptTrend(trend)}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    采纳建议
                  </button>
                  <button
                    onClick={() => alert(`已收藏"${trend.topic}"`)}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    收藏
                  </button>
                  <button
                    onClick={() => alert('分享功能开发中')}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 新建计划弹窗 */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">新建内容计划</h2>
              <button onClick={() => setShowPlanModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">计划标题</label>
                <input
                  type="text"
                  placeholder="输入内容计划标题"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容类型</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="article">图文文章</option>
                  <option value="image">海报图片</option>
                  <option value="video">短视频</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">发布日期</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">发布渠道</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>微信公众号</option>
                  <option>小红书</option>
                  <option>抖音</option>
                  <option>知乎</option>
                  <option>LinkedIn</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button onClick={() => setShowPlanModal(false)} className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                取消
              </button>
              <button
                onClick={() => {
                  alert('计划创建成功！');
                  setShowPlanModal(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                创建计划
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 添加竞品弹窗 */}
      {showCompetitorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">添加竞品监控</h2>
              <button onClick={() => setShowCompetitorModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">竞品名称</label>
                <input
                  type="text"
                  placeholder="输入竞品公司名称"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">官网链接</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">监控平台</label>
                <div className="flex flex-wrap gap-2">
                  {['微信公众号', '小红书', '抖音', '知乎', 'LinkedIn'].map((platform) => (
                    <label key={platform} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button onClick={() => setShowCompetitorModal(false)} className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                取消
              </button>
              <button
                onClick={() => {
                  alert('竞品添加成功！');
                  setShowCompetitorModal(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                添加监控
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 计划详情弹窗 */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">计划详情</h2>
              <button onClick={() => setSelectedPlan(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedPlan.type === 'article' ? 'bg-blue-100 text-blue-600' :
                  selectedPlan.type === 'image' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {getTypeIcon(selectedPlan.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedPlan.title}</h3>
                  <p className="text-sm text-gray-500">{selectedPlan.channel}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">发布日期</div>
                  <div className="font-medium text-gray-800">{selectedPlan.date}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">当前状态</div>
                  <div className="font-medium text-gray-800">{getStatusText(selectedPlan.status)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-indigo-800">AI评分: {selectedPlan.aiScore}/100</span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button onClick={() => setSelectedPlan(null)} className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                关闭
              </button>
              <button
                onClick={() => {
                  alert('已开始执行计划！');
                  setSelectedPlan(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                开始执行
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 竞品详情弹窗 */}
      {selectedCompetitor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">竞品详情</h2>
              <button onClick={() => setSelectedCompetitor(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {selectedCompetitor.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{selectedCompetitor.name}</h3>
                  <p className="text-sm text-gray-500">更新于 {selectedCompetitor.lastUpdate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-800">{selectedCompetitor.contentCount}</div>
                  <div className="text-sm text-gray-500">内容总数</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-800">{selectedCompetitor.engagement}%</div>
                  <div className="text-sm text-gray-500">平均互动率</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">热门话题</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCompetitor.trendingTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button onClick={() => setSelectedCompetitor(null)} className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                关闭
              </button>
              <button
                onClick={() => {
                  alert('已导出竞品分析报告！');
                  setSelectedCompetitor(null);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Download className="w-4 h-4" />
                导出报告
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
