import {
  LineChart,
  Download,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

const mockReports = [
  { id: '1', title: '月度流量分析报告', period: '2026年5月', createdAt: '2026-05-20', status: 'ready' },
  { id: '2', title: '转化率优化报告', period: '2026年5月', createdAt: '2026-05-18', status: 'ready' },
  { id: '3', title: '渠道效果对比报告', period: '2026年Q1', createdAt: '2026-04-01', status: 'ready' },
  { id: '4', title: '用户行为分析报告', period: '2026年4月', createdAt: '2026-05-01', status: 'generating' },
];

export default function SmartReports() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">智能报表</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
          <RefreshCw className="w-4 h-4" />
          生成新报告
        </button>
      </div>

      {/* 报表卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockReports.map((report) => (
          <div key={report.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <LineChart className="w-5 h-5 text-blue-600" />
              </div>
              {report.status === 'ready' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <RefreshCw className="w-5 h-5 text-yellow-600 animate-spin" />
              )}
            </div>
            <h4 className="font-medium text-gray-800 mb-1">{report.title}</h4>
            <p className="text-sm text-gray-500 mb-3">{report.period}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{report.createdAt}</span>
              {report.status === 'ready' ? (
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 text-sm hover:text-blue-700">查看</button>
                  <button className="text-gray-500 text-sm hover:text-gray-700">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="text-xs text-yellow-600">生成中...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
