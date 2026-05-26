import { useState } from 'react';
import {
  TrendingUp,
  Search,
  BarChart3,
  Globe,
  FileText,
  Zap,
  Target,
  Eye,
  Plus,
  Settings,
  RefreshCw,
  Download,
  Filter,
  ChevronRight,
  TrendingDown,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const mockSEOData = [
  { keyword: '工业机器人', rank: 3, change: 5, volume: 12800, difficulty: 72, trend: 'up' },
  { keyword: '自动化设备', rank: 8, change: -2, volume: 8600, difficulty: 65, trend: 'down' },
  { keyword: '智能制造解决方案', rank: 12, change: 8, volume: 5200, difficulty: 58, trend: 'up' },
  { keyword: '工业自动化系统', rank: 15, change: 3, volume: 4100, difficulty: 55, trend: 'up' },
  { keyword: '机器人维修服务', rank: 22, change: -5, volume: 2800, difficulty: 42, trend: 'down' },
];

const mockChannelData = [
  { name: 'Google Ads', visits: 45200, conversions: 892, cost: 12800, roi: 3.2, status: 'excellent' },
  { name: 'SEO自然搜索', visits: 32100, conversions: 456, cost: 0, roi: 999, status: 'excellent' },
  { name: 'LinkedIn', visits: 12800, conversions: 234, cost: 5600, roi: 2.1, status: 'good' },
  { name: 'Facebook', visits: 8900, conversions: 89, cost: 4200, roi: 1.5, status: 'medium' },
  { name: '邮件营销', visits: 5600, conversions: 178, cost: 800, roi: 4.5, status: 'excellent' },
];

const mockTrafficData = [
  { source: '有机搜索', value: 45, visitors: 32100, color: 'bg-green-500' },
  { source: '直接访问', value: 25, visitors: 17800, color: 'bg-blue-500' },
  { source: '社交媒体', value: 15, visitors: 10700, color: 'bg-purple-500' },
  { source: '付费广告', value: 10, visitors: 7100, color: 'bg-orange-500' },
  { source: '其他', value: 5, visitors: 3600, color: 'bg-gray-400' },
];

const mockGEOData = [
  { region: '华东地区', visitors: 28500, conversion: 4.2, growth: 12.5 },
  { region: '华南地区', visitors: 18200, conversion: 3.8, growth: 8.3 },
  { region: '华北地区', visitors: 15600, conversion: 3.5, growth: 15.2 },
  { region: '海外市场', visitors: 12400, conversion: 2.9, growth: 28.7 },
  { region: '其他地区', visitors: 8300, conversion: 2.4, growth: 5.1 },
];

export default function MarketingCenter() {
  const [activeTab, setActiveTab] = useState<'seo' | 'channels' | 'geo' | 'traffic'>('seo');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const tabs = [
    { id: 'seo', label: '智能SEO优化', icon: Search },
    { id: 'channels', label: '渠道推荐', icon: BarChart3 },
    { id: 'geo', label: 'GEO优化', icon: Globe },
    { id: 'traffic', label: '流量分析', icon: TrendingUp },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">营销增长中心</h1>
          <p className="text-gray-500 mt-1">获取高质量流量，提高网站曝光和询盘率</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
          <button
            onClick={handleAnalyze}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>分析中...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>AI智能分析</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
          {activeTab === 'seo' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">关键词排名追踪</h3>
                <button className="flex items-center gap-2 text-blue-600 text-sm hover:text-blue-700">
                  <Plus className="w-4 h-4" />
                  添加关键词
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">关键词</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">当前排名</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">排名变化</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">搜索量</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">难度</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">优化建议</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSEOData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-blue-500" />
                            <span className="font-medium text-gray-800">{item.keyword}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-semibold text-gray-800">#{item.rank}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className={`flex items-center gap-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span>{Math.abs(item.change)}名</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{(item.volume / 10000).toFixed(1)}万</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${item.difficulty > 70 ? 'bg-red-500' : item.difficulty > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{ width: `${item.difficulty}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{item.difficulty}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1">
                            查看建议 <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'channels' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">渠道效果分析</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">
                    <Filter className="w-4 h-4" />
                    筛选
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">
                    <Download className="w-4 h-4" />
                    导出
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">渠道</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">访客</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">转化</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">ROI</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockChannelData.map((channel, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <span className="font-medium text-gray-800">{channel.name}</span>
                          </td>
                          <td className="px-4 py-4 text-gray-600">{(channel.visits / 1000).toFixed(1)}k</td>
                          <td className="px-4 py-4 text-gray-600">{channel.conversions}</td>
                          <td className="px-4 py-4">
                            <span className={`font-semibold ${channel.roi > 3 ? 'text-green-600' : channel.roi > 2 ? 'text-blue-600' : 'text-orange-600'}`}>
                              {channel.roi}x
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              channel.status === 'excellent' ? 'bg-green-100 text-green-700' :
                              channel.status === 'good' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {channel.status === 'excellent' ? '优秀' : channel.status === 'good' ? '良好' : '一般'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">AI渠道推荐</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium text-gray-800">首选推荐：SEO自然搜索</span>
                      </div>
                      <p className="text-sm text-gray-500">ROI最高，无需付费，建议加大内容投入</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-800">次选推荐：Google Ads</span>
                      </div>
                      <p className="text-sm text-gray-500">转化效果好，建议优化关键词出价</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        <span className="font-medium text-gray-800">潜力渠道：邮件营销</span>
                      </div>
                      <p className="text-sm text-gray-500">ROI高达4.5x，建议建立邮件列表</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'geo' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">地域分布优化</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Globe className="w-4 h-4" />
                  生成优化报告
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">地区</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">访客数</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">转化率</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">增长率</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">优化建议</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockGEOData.map((region, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-gray-800">{region.region}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-600">{(region.visitors / 10000).toFixed(1)}万</td>
                          <td className="px-4 py-4 text-gray-600">{region.conversion}%</td>
                          <td className="px-4 py-4">
                            <div className={`flex items-center gap-1 ${region.growth > 15 ? 'text-green-600' : region.growth > 5 ? 'text-blue-600' : 'text-gray-600'}`}>
                              <ArrowUpRight className="w-4 h-4" />
                              <span>+{region.growth}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <button className="text-blue-600 text-sm hover:text-blue-700">查看详情</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <h4 className="font-semibold mb-4">GEO优化洞察</h4>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">最佳表现地区</p>
                      <p className="text-xl font-bold mt-1">华东地区</p>
                      <p className="text-sm opacity-80 mt-1">转化率 4.2%，高于平均 35%</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">高增长地区</p>
                      <p className="text-xl font-bold mt-1">海外市场</p>
                      <p className="text-sm opacity-80 mt-1">增长率 28.7%，建议加大投入</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">优化机会</p>
                      <p className="text-xl font-bold mt-1">其他地区</p>
                      <p className="text-sm opacity-80 mt-1">转化率偏低，可针对性优化</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'traffic' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">流量来源分析</h3>
                <div className="flex items-center gap-2">
                  <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                    <option>最近7天</option>
                    <option>最近30天</option>
                    <option>最近90天</option>
                  </select>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">
                    <Download className="w-4 h-4" />
                    导出
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">流量来源占比</h4>
                    <div className="space-y-4">
                      {mockTrafficData.map((source, index) => (
                        <div key={index} className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${source.color}`} />
                              <span className="font-medium text-gray-800">{source.source}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-500">{source.visitors.toLocaleString()} 访客</span>
                              <span className="font-semibold text-gray-800">{source.value}%</span>
                            </div>
                          </div>
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${source.color} rounded-full transition-all duration-500`}
                              style={{ width: `${source.value * 2}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                  <h4 className="font-semibold mb-4">AI流量建议</h4>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">增长机会</p>
                      <p className="font-medium mt-1">社交媒体流量偏低</p>
                      <p className="text-sm opacity-80 mt-1">仅占15%，有较大增长空间</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">优化建议</p>
                      <p className="font-medium mt-1">加大LinkedIn投入</p>
                      <p className="text-sm opacity-80 mt-1">B2B客户获取效果显著</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">本月目标</p>
                      <p className="font-medium mt-1">提升自然搜索占比</p>
                      <p className="text-sm opacity-80 mt-1">目标从45%提升至50%</p>
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