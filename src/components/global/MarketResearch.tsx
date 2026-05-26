import {
  Globe2,
  Download,
  TrendingUp,
  ArrowUpRight,
  Eye,
  FileText,
  ChevronRight,
} from 'lucide-react';

const mockMarketData = [
  { region: '北美市场', marketSize: '¥50亿', growth: 15.2, opportunity: 'high', competitors: 25, barriers: '合规要求高' },
  { region: '欧洲市场', marketSize: '¥35亿', growth: 12.8, opportunity: 'high', competitors: 32, barriers: '文化差异' },
  { region: '东南亚', marketSize: '¥20亿', growth: 25.3, opportunity: 'very_high', competitors: 18, barriers: '基础设施' },
  { region: '中东市场', marketSize: '¥15亿', growth: 18.5, opportunity: 'high', competitors: 12, barriers: '宗教文化' },
  { region: '南美市场', marketSize: '¥10亿', growth: 8.2, opportunity: 'medium', competitors: 15, barriers: '汇率波动' },
];

const opportunityColors: Record<string, { bg: string; text: string; label: string }> = {
  very_high: { bg: 'bg-green-100', text: 'text-green-700', label: '极高' },
  high: { bg: 'bg-blue-100', text: 'text-blue-700', label: '高' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '中' },
  low: { bg: 'bg-gray-100', text: 'text-gray-700', label: '低' },
};

export default function MarketResearch() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">目标市场调研</h3>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>全部地区</option>
            <option>北美</option>
            <option>欧洲</option>
            <option>亚太</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">地区</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">市场规模</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">增长率</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">市场机会</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">竞争程度</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">主要壁垒</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {mockMarketData.map((market, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-800">{market.region}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-800">{market.marketSize}</td>
                  <td className="px-4 py-4">
                    <div className={`flex items-center gap-1 ${market.growth > 15 ? 'text-green-600' : 'text-blue-600'}`}>
                      {market.growth > 15 ? <TrendingUp className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      <span>+{market.growth}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${opportunityColors[market.opportunity].bg} ${opportunityColors[market.opportunity].text}`}>
                      {opportunityColors[market.opportunity].label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{market.competitors}家</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {market.barriers}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
