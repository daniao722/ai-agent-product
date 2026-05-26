import {
  BarChart3,
  TrendingUp,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Eye,
  Calendar,
  TrendingDown,
  DollarSign,
  Database,
  Brain,
  Lightbulb,
  Zap,
  ChevronRight,
} from 'lucide-react';

const mockDashboardData = {
  totalVisitors: 82340,
  visitorGrowth: 12.5,
  pageViews: 245680,
  avgSessionDuration: '5:23',
  bounceRate: 42.3,
  conversionRate: 3.8,
};

const mockConversionFunnel = [
  { stage: '访问', count: 82340, rate: 100 },
  { stage: '浏览产品', count: 41200, rate: 50 },
  { stage: '加入询盘', count: 8230, rate: 10 },
  { stage: '提交询盘', count: 4120, rate: 5 },
  { stage: '成交', count: 3128, rate: 3.8 },
];

const valueChain = [
  { icon: Database, label: '数据采集', desc: '多渠道数据整合', color: 'bg-blue-500' },
  { icon: BarChart3, label: '数据分析', desc: '智能分析引擎', color: 'bg-purple-500' },
  { icon: Brain, label: '智能洞察', desc: 'AI驱动洞察', color: 'bg-green-500' },
  { icon: Target, label: '决策优化', desc: '数据支撑决策', color: 'bg-orange-500' },
];

const ongoingTasks = [
  { name: '5月流量分析报告', progress: 85, status: 'in_progress' },
  { name: '渠道归因模型优化', progress: 60, status: 'in_progress' },
  { name: '竞品B监控预警', progress: 100, status: 'completed' },
];

const aiInsights = [
  { title: '转化率提升机会', desc: '询盘到提交环节转化率偏低，建议优化询盘跟进流程', type: 'opportunity' },
  { title: '流量异常预警', desc: '付费广告流量下降3.2%，建议检查广告投放策略', type: 'warning' },
  { title: '高价值渠道发现', desc: 'LinkedIn渠道单客户价值最高，建议增加投入', type: 'insight' },
];

export default function AnalyticsOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* 核心价值链 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">核心价值链</h3>
        <div className="flex items-center justify-between">
          {valueChain.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-2`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="font-medium text-gray-800 text-sm">{item.label}</span>
                <span className="text-xs text-gray-500 mt-1">{item.desc}</span>
              </div>
              {index < valueChain.length - 1 && (
                <ChevronRight className="w-6 h-6 text-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 转化漏斗 */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-4">转化漏斗</h3>
        <div className="space-y-3">
          {mockConversionFunnel.map((stage, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm opacity-80">{stage.stage}</span>
                <span className="text-sm font-semibold">{stage.count.toLocaleString()}</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${stage.rate * 10}%` }}
                />
              </div>
              <span className="text-xs opacity-60">{stage.rate}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 数据汇总卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">总访客</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{(mockDashboardData.totalVisitors / 10000).toFixed(1)}万</p>
            </div>
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+{mockDashboardData.visitorGrowth}%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">页面浏览</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{(mockDashboardData.pageViews / 10000).toFixed(1)}万</p>
            </div>
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.3%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">平均时长</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{mockDashboardData.avgSessionDuration}</p>
            </div>
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+30秒</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">跳出率</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{mockDashboardData.bounceRate}%</p>
            </div>
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+2.1%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">转化率</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{mockDashboardData.conversionRate}%</p>
            </div>
            <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-cyan-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+0.5%</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">本月成交</p>
              <p className="text-xl font-bold text-gray-800 mt-1">¥328万</p>
            </div>
            <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
            <ArrowUpRight className="w-3 h-3" />
            <span>+23.5%</span>
          </div>
        </div>
      </div>

      {/* 正在进行的任务 + AI洞察 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 正在进行的任务 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">正在进行的任务</h3>
          <div className="space-y-4">
            {ongoingTasks.map((task, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{task.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {task.status === 'completed' ? '已完成' : '进行中'}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">进度 {task.progress}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI洞察 */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">AI洞察</h3>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {insight.type === 'opportunity' && <TrendingUp className="w-4 h-4" />}
                  {insight.type === 'warning' && <ArrowDownRight className="w-4 h-4" />}
                  {insight.type === 'insight' && <Lightbulb className="w-4 h-4" />}
                  <span className="font-medium">{insight.title}</span>
                </div>
                <p className="text-sm opacity-80">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
