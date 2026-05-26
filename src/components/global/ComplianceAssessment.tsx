import {
  Globe2,
  Shield,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
} from 'lucide-react';

const mockComplianceData = [
  { country: '美国', requirements: 'FCC认证, FDA注册(医疗相关), 加州65号提案', riskLevel: 'medium', status: 'passed', lastCheck: '2026-05-15' },
  { country: '欧盟', requirements: 'CE认证, GDPR合规, WEEE注册', riskLevel: 'high', status: 'in_progress', lastCheck: '2026-05-10' },
  { country: '日本', requirements: 'PSE认证, JIS标准, METI备案', riskLevel: 'low', status: 'passed', lastCheck: '2026-05-18' },
  { country: '东南亚', requirements: 'SIRIM认证(马来西亚), NBTC(泰国)', riskLevel: 'low', status: 'in_progress', lastCheck: '2026-05-12' },
];

const riskLevelColors: Record<string, { bg: string; text: string }> = {
  high: { bg: 'bg-red-100', text: 'text-red-700' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  low: { bg: 'bg-green-100', text: 'text-green-700' },
};

export default function ComplianceAssessment() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">合规评估</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
          <Plus className="w-4 h-4" />
          添加国家
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 合规状态表格 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">国家/地区</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">风险等级</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">最近检查</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockComplianceData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-800">{item.country}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskLevelColors[item.riskLevel].bg} ${riskLevelColors[item.riskLevel].text}`}>
                        {item.riskLevel === 'high' ? '高' : item.riskLevel === 'medium' ? '中' : '低'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'passed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status === 'passed' ? '已通过' : '进行中'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{item.lastCheck}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 合规要点面板 */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white">
          <h4 className="font-semibold mb-4">合规要点</h4>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-medium">CE认证 (欧盟)</span>
              </div>
              <p className="text-sm opacity-80">产品必须符合欧盟安全、健康、环保要求</p>
              <p className="text-xs opacity-60 mt-1">预计完成时间：2026年6月</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-medium">GDPR合规 (欧盟)</span>
              </div>
              <p className="text-sm opacity-80">严格的用户数据保护和隐私要求</p>
              <p className="text-xs opacity-60 mt-1">预计完成时间：2026年7月</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">FCC认证 (美国)</span>
              </div>
              <p className="text-sm opacity-80">电磁兼容性和射频设备要求</p>
              <p className="text-xs opacity-60 mt-1">已完成 ✓</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
