import {
  Globe,
  ArrowUpRight,
  Download,
} from 'lucide-react';

const mockGEOData = [
  { region: '华东地区', visitors: 28500, conversion: 4.2, growth: 12.5 },
  { region: '华南地区', visitors: 18200, conversion: 3.8, growth: 8.3 },
  { region: '华北地区', visitors: 15600, conversion: 3.5, growth: 15.2 },
  { region: '海外市场', visitors: 12400, conversion: 2.9, growth: 28.7 },
  { region: '其他地区', visitors: 8300, conversion: 2.4, growth: 5.1 },
];

export default function GEOOptimization() {
  return (
    <div className="p-6 space-y-6">
      {/* 页面标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">GEO优化</h1>
          <p className="text-gray-500 mt-1">地域分布优化，精准定位高价值市场</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Globe className="w-4 h-4" />
            <span>生成优化报告</span>
          </button>
        </div>
      </div>

      {/* 地域分布优化表格 + GEO优化洞察面板 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 地域分布优化表格 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="font-semibold text-gray-800">地域分布优化</h3>
          </div>
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
        </div>

        {/* GEO优化洞察面板 */}
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
  );
}
