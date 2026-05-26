import {
  AlertTriangle,
  Plus,
  CheckCircle,
  Clock,
} from 'lucide-react';

const mockRiskData = [
  { type: '合规风险', level: 'medium', description: '欧盟GDPR新规将于Q3生效', action: '更新隐私政策', status: 'pending', deadline: '2026-07-01' },
  { type: '市场风险', level: 'low', description: '北美市场竞争加剧', action: '差异化竞争策略', status: 'resolved', deadline: '2026-04-15' },
  { type: '汇率风险', level: 'high', description: '欧元汇率波动增大', action: '启用本地结算', status: 'in_progress', deadline: '2026-06-01' },
  { type: '物流风险', level: 'medium', description: '东南亚物流时效不稳定', action: '建立本地仓', status: 'pending', deadline: '2026-08-01' },
];

const riskLevelColors: Record<string, { bg: string; text: string }> = {
  high: { bg: 'bg-red-100', text: 'text-red-700' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  low: { bg: 'bg-green-100', text: 'text-green-700' },
};

export default function RiskMonitoring() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">风控监测</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
          <Plus className="w-4 h-4" />
          添加预警
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 风险数据表格 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">风险类型</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">风险等级</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">描述</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">建议措施</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">截止日期</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRiskData.map((risk, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-5 h-5 ${risk.level === 'high' ? 'text-red-500' : risk.level === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
                          <span className="font-medium text-gray-800">{risk.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskLevelColors[risk.level].bg} ${riskLevelColors[risk.level].text}`}>
                          {risk.level === 'high' ? '高' : risk.level === 'medium' ? '中' : '低'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600 max-w-xs">{risk.description}</td>
                      <td className="px-4 py-4 text-gray-600">{risk.action}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          risk.status === 'resolved' ? 'bg-green-100 text-green-700' :
                          risk.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {risk.status === 'resolved' ? '已解决' : risk.status === 'in_progress' ? '进行中' : '待处理'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{risk.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 风险预警面板 */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <h4 className="font-semibold mb-4">风险预警</h4>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">高风险</span>
              </div>
              <p className="text-sm opacity-80">欧元汇率波动</p>
              <p className="text-xs opacity-60 mt-1">建议启用本地结算</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">即将到期</span>
              </div>
              <p className="text-sm opacity-80">GDPR新规</p>
              <p className="text-xs opacity-60 mt-1">剩余40天</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">已解决</span>
              </div>
              <p className="text-sm opacity-80">北美市场竞争</p>
              <p className="text-xs opacity-60 mt-1">差异化策略已执行</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
