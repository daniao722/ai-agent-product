import {
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

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

export default function DataDashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 流量来源分析 */}
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

        {/* 转化漏斗 */}
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
    </div>
  );
}
