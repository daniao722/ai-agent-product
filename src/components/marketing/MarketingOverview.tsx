import {
  TrendingUp,
  Eye,
  Target,
  BarChart3,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  ChevronRight,
  Search,
  Globe,
  Users,
  Funnel,
  Lightbulb,
  Clock,
} from 'lucide-react';

const funnelData = [
  { stage: '访问', value: 8420, percentage: 100, color: 'bg-blue-500' },
  { stage: '浏览', value: 5052, percentage: 60, color: 'bg-indigo-500' },
  { stage: '询盘', value: 328, percentage: 3.9, color: 'bg-purple-500' },
  { stage: '成交', value: 86, percentage: 1.0, color: 'bg-green-500' },
];

const ongoingTasks = [
  { name: 'SEO关键词优化 - 工业机器人', progress: 75, status: '进行中' },
  { name: 'Google Ads投放优化', progress: 45, status: '进行中' },
  { name: '海外市场GEO策略调整', progress: 20, status: '进行中' },
];

const aiInsights = [
  {
    icon: TrendingUp,
    color: 'text-green-600',
    bg: 'bg-green-50',
    title: '自然搜索流量持续增长',
    description: '近7天有机搜索流量增长12.5%，建议继续加大内容投入',
  },
  {
    icon: Target,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    title: '询盘转化率有提升空间',
    description: '当前转化率3.9%，行业平均5.2%，建议优化落地页体验',
  },
  {
    icon: Globe,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    title: '海外市场增长迅猛',
    description: '海外访客增长率28.7%，建议增加多语言页面支持',
  },
];

export default function MarketingOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">营销增长中心概览</h1>
          <p className="text-gray-500 mt-1">获取高质量流量，提高网站曝光和询盘率</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>刷新数据</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Zap className="w-4 h-4" />
            <span>AI智能分析</span>
          </button>
        </div>
      </div>

      {/* 核心价值链 */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-4">核心价值链</h3>
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Eye className="w-7 h-7" />
            </div>
            <p className="font-semibold">流量获取</p>
            <p className="text-sm opacity-80 mt-1">多渠道引流</p>
          </div>
          <ChevronRight className="w-6 h-6 opacity-60" />
          <div className="flex-1 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Funnel className="w-7 h-7" />
            </div>
            <p className="font-semibold">询盘转化</p>
            <p className="text-sm opacity-80 mt-1">精准转化</p>
          </div>
          <ChevronRight className="w-6 h-6 opacity-60" />
          <div className="flex-1 text-center">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="w-7 h-7" />
            </div>
            <p className="font-semibold">客户留存</p>
            <p className="text-sm opacity-80 mt-1">长期价值</p>
          </div>
        </div>
      </div>

      {/* 核心业务数据汇总 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">今日访客</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">8,420</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12.5% vs 昨日</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月询盘</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">328</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+8.3% vs 上月</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">转化率</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">3.9%</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+0.5% vs 上月</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">获客成本</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">¥128</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
            <ArrowDownRight className="w-4 h-4" />
            <span>-5.2% vs 上月</span>
          </div>
        </div>
      </div>

      {/* 转化漏斗 + 正在进行的任务 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 转化漏斗 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">转化漏斗</h3>
          <div className="space-y-4">
            {funnelData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-medium text-gray-800">{item.stage}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">{item.value.toLocaleString()}</span>
                    <span className="font-semibold text-gray-800">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 正在进行的任务 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">正在进行的任务</h3>
            <span className="text-sm text-gray-500">{ongoingTasks.length} 个任务</span>
          </div>
          <div className="space-y-4">
            {ongoingTasks.map((task, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-800">{task.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{task.status}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">进度</span>
                  <span className="text-xs font-medium text-blue-600">{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI洞察模块 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-800">AI洞察</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => (
            <div key={index} className={`${insight.bg} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
                <span className="font-medium text-gray-800">{insight.title}</span>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
