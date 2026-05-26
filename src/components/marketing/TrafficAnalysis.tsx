import {
  TrendingUp,
  Download,
} from 'lucide-react';

const mockTrafficData = [
  { source: '有机搜索', value: 45, visitors: 32100, color: 'bg-green-500' },
  { source: '直接访问', value: 25, visitors: 17800, color: 'bg-blue-500' },
  { source: '社交媒体', value: 15, visitors: 10700, color: 'bg-purple-500' },
  { source: '付费广告', value: 10, visitors: 7100, color: 'bg-orange-500' },
  { source: '其他', value: 5, visitors: 3600, color: 'bg-gray-400' },
];

export default function TrafficAnalysis() {
  return (
    <div className="p-6 space-y-6">
      {/* 页面标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">流量分析</h1>
          <p className="text-gray-500 mt-1">分析流量来源，获取AI流量优化建议</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span>AI流量分析</span>
          </button>
        </div>
      </div>

      {/* 流量来源占比分析 + AI流量建议面板 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 流量来源占比 */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 pb-4">
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
          <div className="p-6 pt-0">
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
        </div>

        {/* AI流量建议面板 */}
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
  );
}
