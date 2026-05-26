import { useState } from 'react';
import {
  Target,
  Download,
} from 'lucide-react';

const mockAttributionData = [
  { channel: 'Google Ads', conversions: 892, revenue: 1280000, cost: 128000, roi: 9.0 },
  { channel: 'SEO自然搜索', conversions: 756, revenue: 1080000, cost: 0, roi: 999 },
  { channel: 'LinkedIn', conversions: 423, revenue: 605000, cost: 35000, roi: 16.3 },
  { channel: '邮件营销', conversions: 312, revenue: 446000, cost: 12000, roi: 36.2 },
  { channel: 'Facebook', conversions: 189, revenue: 270000, cost: 28000, roi: 8.6 },
];

const attributionModels = [
  { id: 'last_click', label: '最后点击' },
  { id: 'first_click', label: '首次点击' },
  { id: 'linear', label: '线性' },
  { id: 'time_decay', label: '时间衰减' },
];

export default function AttributionAnalysis() {
  const [selectedModel, setSelectedModel] = useState('last_click');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">归因分析</h3>
        <div className="flex items-center gap-2">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {attributionModels.map((model) => (
              <option key={model.id} value={model.id}>{model.label}归因</option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>
      </div>

      {/* 归因模式选择 */}
      <div className="flex items-center gap-3 mb-6">
        {attributionModels.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedModel === model.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {model.label}
          </button>
        ))}
      </div>

      {/* 归因数据表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
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
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-800">{item.channel}</span>
                    </div>
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
      </div>

      {/* AI归因洞察面板 */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
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
  );
}
