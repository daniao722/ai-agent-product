import {
  Smile,
  Star,
  ThumbsUp,
  AlertCircle,
  TrendingUp,
  Users,
  BarChart3,
  Download
} from 'lucide-react';

const mockSatisfaction = [
  { month: '1月', score: 92.5, responses: 156 },
  { month: '2月', score: 91.8, responses: 142 },
  { month: '3月', score: 93.2, responses: 168 },
  { month: '4月', score: 94.1, responses: 175 },
  { month: '5月', score: 94.5, responses: 89 },
];

const ratingDistribution = [
  { stars: 5, percentage: 72, color: 'bg-green-500' },
  { stars: 4, percentage: 18, color: 'bg-blue-500' },
  { stars: 3, percentage: 6, color: 'bg-yellow-500' },
  { stars: 2, percentage: 2, color: 'bg-orange-500' },
  { stars: 1, percentage: 2, color: 'bg-red-500' },
];

export default function SatisfactionAnalysis() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">满意度分析</h1>
          <p className="text-gray-500 mt-1">客户满意度数据洞察与趋势分析</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>最近6个月</option>
            <option>最近12个月</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            导出报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 满意度趋势柱状图 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">满意度趋势</h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-end justify-between h-48 gap-3">
                {mockSatisfaction.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-200 rounded-t-lg relative" style={{ height: `${item.score}%` }}>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-800">
                        {item.score}%
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 评分分布 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">评分分布</h3>
            <div className="space-y-4">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-20">
                    <Star className={`w-4 h-4 ${item.stars >= 3 ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-700">{item.stars}星</span>
                  </div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* AI分析洞察面板 */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-4">AI分析洞察</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-medium">客户好评要点</span>
                </div>
                <p className="text-sm opacity-80">响应速度快、解答专业、服务态度好</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">待改进方面</span>
                </div>
                <p className="text-sm opacity-80">复杂技术问题处理时间较长</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">提升建议</span>
                </div>
                <p className="text-sm opacity-80">加强技术问题知识库建设</p>
              </div>
            </div>
          </div>

          {/* 本月数据统计 */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">本月数据</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">评价数</span>
                </div>
                <span className="font-semibold text-gray-800">89</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">好评率</span>
                </div>
                <span className="font-semibold text-green-600">90%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">平均评分</span>
                </div>
                <span className="font-semibold text-gray-800">4.7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
