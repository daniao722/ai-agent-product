import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Download,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
  Eye,
  Globe,
  Users,
  ShoppingCart,
  DollarSign,
  CheckCircle,
  AlertCircle,
  TrendingDown
} from 'lucide-react';

const mockDashboardData = {
  totalVisitors: 82340,
  visitorGrowth: 12.5,
  pageViews: 245680,
  avgSessionDuration: '5:23',
  bounceRate: 42.3,
  conversionRate: 3.8,
};

const mockTrafficSources = [
  { source: '有机搜索', visitors: 32100, percentage: 39, growth: 15.2, color: 'bg-green-500' },
  { source: '直接访问', visitors: 18500, percentage: 22.5, growth: 8.3, color: 'bg-blue-500' },
  { source: '社交媒体', visitors: 12400, percentage: 15.1, growth: 25.6, color: 'bg-purple-500' },
  { source: '付费广告', visitors: 11200, percentage: 13.6, growth: -3.2, color: 'bg-orange-500' },
  { source: '引荐链接', visitors: 8140, percentage: 9.8, growth: 5.8, color: 'bg-cyan-500' },
];

const mockConversionFunnel = [
  { stage: '访问', count: 82340, rate: 100 },
  { stage: '浏览产品', count: 41200, rate: 50 },
  { stage: '加入询盘', count: 8230, rate: 10 },
  { stage: '提交询盘', count: 4120, rate: 5 },
  { stage: '成交', count: 3128, rate: 3.8 },
];

const mockAttributionData = [
  { channel: 'Google Ads', conversions: 892, revenue: 1280000, cost: 128000, roi: 9.0 },
  { channel: 'SEO自然搜索', conversions: 756, revenue: 1080000, cost: 0, roi: 999 },
  { channel: 'LinkedIn', conversions: 423, revenue: 605000, cost: 35000, roi: 16.3 },
  { channel: '邮件营销', conversions: 312, revenue: 446000, cost: 12000, roi: 36.2 },
  { channel: 'Facebook', conversions: 189, revenue: 270000, cost: 28000, roi: 8.6 },
];

const mockReports = [
  { id: '1', title: '月度流量分析报告', period: '2026年5月', createdAt: '2026-05-20', status: 'ready' },
  { id: '2', title: '转化率优化报告', period: '2026年5月', createdAt: '2026-05-18', status: 'ready' },
  { id: '3', title: '渠道效果对比报告', period: '2026年Q1', createdAt: '2026-04-01', status: 'ready' },
  { id: '4', title: '用户行为分析报告', period: '2026年4月', createdAt: '2026-05-01', status: 'generating' },
];

const mockCompetitors = [
  { name: '竞品A', traffic: 125000, change: 8.2, strength: 'SEO优化强', weakness: '客户服务差' },
  { name: '竞品B', traffic: 98000, change: 15.3, strength: '内容质量高', weakness: '价格偏高' },
  { name: '竞品C', traffic: 72000, change: -2.5, strength: '产品线丰富', weakness: '网站体验差' },
];

export default function AnalyticsCenter() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'attribution' | 'reports' | 'competitors'>('dashboard');
  const [dateRange, setDateRange] = useState('last30days');

  const tabs = [
    { id: 'dashboard', label: '数据仪表盘', icon: BarChart3 },
    { id: 'attribution', label: '归因分析', icon: Target },
    { id: 'reports', label: '智能报表', icon: LineChart },
    { id: 'competitors', label: '竞品分析', icon: Globe },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">增长智能中心</h1>
          <p className="text-gray-500 mt-1">提供数据洞察，支撑决策优化</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last7days">最近7天</option>
            <option value="last30days">最近30天</option>
            <option value="last90days">最近90天</option>
            <option value="thisyear">今年</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出数据</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>刷新数据</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
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

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Traffic Sources */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">流量来源分析</h3>
                  <div className="space-y-4">
                    {mockTrafficSources.map((source, index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${source.color}`} />
                            <span className="font-medium text-gray-800">{source.source}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500">{source.visitors.toLocaleString()} 访客</span>
                            <span className="font-semibold text-gray-800">{source.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${source.color} rounded-full transition-all duration-500`}
                            style={{ width: `${source.percentage * 2}%` }}
                          />
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-xs ${source.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {source.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          <span>{Math.abs(source.growth)}% vs 上期</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conversion Funnel */}
              <div>
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
              </div>
            </div>
          )}

          {activeTab === 'attribution' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">归因分析</h3>
                <div className="flex items-center gap-2">
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>最后点击归因</option>
                    <option>首次点击归因</option>
                    <option>线性归因</option>
                    <option>时间衰减归因</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    导出
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">渠道</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">转化数</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">收入</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">成本</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">ROI</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">贡献占比</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAttributionData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-medium text-gray-800">{item.channel}</span>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{item.conversions}</td>
                        <td className="px-4 py-4 font-semibold text-gray-800">¥{(item.revenue / 10000).toFixed(0)}万</td>
                        <td className="px-4 py-4 text-gray-600">¥{(item.cost / 10000).toFixed(0)}万</td>
                        <td className="px-4 py-4">
                          <span className={`font-semibold ${item.roi > 10 ? 'text-green-600' : item.roi > 5 ? 'text-blue-600' : 'text-orange-600'}`}>
                            {item.roi}x
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${item.conversions / 10}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{((item.conversions / 2572) * 100).toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-4">AI归因洞察</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm opacity-80">最佳ROI渠道</p>
                    <p className="text-xl font-bold mt-1">邮件营销</p>
                    <p className="text-sm opacity-80 mt-1">ROI高达36.2倍</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm opacity-80">高价值渠道</p>
                    <p className="text-xl font-bold mt-1">LinkedIn</p>
                    <p className="text-sm opacity-80 mt-1">单客户价值最高</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm opacity-80">优化建议</p>
                    <p className="text-xl font-bold mt-1">减少Facebook投入</p>
                    <p className="text-sm opacity-80 mt-1">ROI偏低，可优化</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">智能报表</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <RefreshCw className="w-4 h-4" />
                  生成新报告
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <LineChart className="w-5 h-5 text-blue-600" />
                      </div>
                      {report.status === 'ready' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <RefreshCw className="w-5 h-5 text-yellow-600 animate-spin" />
                      )}
                    </div>
                    <h4 className="font-medium text-gray-800 mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-500 mb-3">{report.period}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{report.createdAt}</span>
                      {report.status === 'ready' ? (
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 text-sm hover:text-blue-700">查看</button>
                          <button className="text-gray-500 text-sm hover:text-gray-700">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-yellow-600">生成中...</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'competitors' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">竞品分析</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Search className="w-4 h-4" />
                  添加竞品
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">竞品</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">预估流量</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">流量变化</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">优势</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">劣势</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockCompetitors.map((competitor, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <span className="font-medium text-gray-800">{competitor.name}</span>
                            </td>
                            <td className="px-4 py-4 text-gray-600">{(competitor.traffic / 10000).toFixed(1)}万</td>
                            <td className="px-4 py-4">
                              <div className={`flex items-center gap-1 ${competitor.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {competitor.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                <span>{Math.abs(competitor.change)}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                {competitor.strength}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                {competitor.weakness}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
                  <h4 className="font-semibold mb-4">竞争洞察</h4>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">市场定位</p>
                      <p className="font-medium mt-1">我方领先</p>
                      <p className="text-sm opacity-80 mt-1">流量高出竞品A 34%</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">威胁预警</p>
                      <p className="font-medium mt-1">竞品B增长快</p>
                      <p className="text-sm opacity-80 mt-1">需关注其内容策略</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">差异化机会</p>
                      <p className="font-medium mt-1">客户服务</p>
                      <p className="text-sm opacity-80 mt-1">竞品A服务差，可强化</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}