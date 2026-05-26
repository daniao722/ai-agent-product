import {
  BarChart3,
  Filter,
  Download,
  Star,
  Zap,
  Target,
} from 'lucide-react';

const mockChannelData = [
  { name: 'Google Ads', visits: 45200, conversions: 892, cost: 12800, roi: 3.2, status: 'excellent' as const },
  { name: 'SEO自然搜索', visits: 32100, conversions: 456, cost: 0, roi: 999, status: 'excellent' as const },
  { name: 'LinkedIn', visits: 12800, conversions: 234, cost: 5600, roi: 2.1, status: 'good' as const },
  { name: 'Facebook', visits: 8900, conversions: 89, cost: 4200, roi: 1.5, status: 'medium' as const },
  { name: '邮件营销', visits: 5600, conversions: 178, cost: 800, roi: 4.5, status: 'excellent' as const },
];

export default function ChannelRecommendation() {
  return (
    <div className="p-6 space-y-6">
      {/* 页面标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">渠道推荐</h1>
          <p className="text-gray-500 mt-1">分析渠道效果，获取AI渠道推荐</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>AI渠道分析</span>
          </button>
        </div>
      </div>

      {/* 渠道效果分析表格 + AI渠道推荐面板 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 渠道效果分析表格 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 pb-4">
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
        </div>

        {/* AI渠道推荐面板 */}
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
  );
}
