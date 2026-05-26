import { useState } from 'react';
import {
  Search,
  Plus,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  RefreshCw,
  Download,
} from 'lucide-react';

const mockSEOData = [
  { keyword: '工业机器人', rank: 3, change: 5, volume: 12800, difficulty: 72, trend: 'up' as const },
  { keyword: '自动化设备', rank: 8, change: -2, volume: 8600, difficulty: 65, trend: 'down' as const },
  { keyword: '智能制造解决方案', rank: 12, change: 8, volume: 5200, difficulty: 58, trend: 'up' as const },
  { keyword: '工业自动化系统', rank: 15, change: 3, volume: 4100, difficulty: 55, trend: 'up' as const },
  { keyword: '机器人维修服务', rank: 22, change: -5, volume: 2800, difficulty: 42, trend: 'down' as const },
];

export default function SEOOptimization() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">智能SEO优化</h1>
          <p className="text-gray-500 mt-1">追踪关键词排名，获取SEO优化建议</p>
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

      {/* 关键词排名追踪表格 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 pb-4">
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
    </div>
  );
}
