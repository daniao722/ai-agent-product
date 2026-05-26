import {
  Globe,
  Search,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const mockCompetitors = [
  { name: '竞品A', traffic: 125000, change: 8.2, strength: 'SEO优化强', weakness: '客户服务差' },
  { name: '竞品B', traffic: 98000, change: 15.3, strength: '内容质量高', weakness: '价格偏高' },
  { name: '竞品C', traffic: 72000, change: -2.5, strength: '产品线丰富', weakness: '网站体验差' },
];

export default function CompetitorAnalysis() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">竞品分析</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
          <Search className="w-4 h-4" />
          添加竞品
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 竞品数据表格 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
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
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-gray-800">{competitor.name}</span>
                        </div>
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
        </div>

        {/* 竞争洞察面板 */}
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
  );
}
