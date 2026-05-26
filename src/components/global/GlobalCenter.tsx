import { useState } from 'react';
import {
  Globe2,
  Search,
  Shield,
  Map,
  AlertTriangle,
  Download,
  Plus,
  Filter,
  RefreshCw,
  CheckCircle,
  Clock,
  Building,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Users,
  Calendar,
  Eye,
  Edit,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

const mockMarketData = [
  { region: '北美市场', marketSize: '¥50亿', growth: 15.2, opportunity: 'high', competitors: 25, barriers: '合规要求高' },
  { region: '欧洲市场', marketSize: '¥35亿', growth: 12.8, opportunity: 'high', competitors: 32, barriers: '文化差异' },
  { region: '东南亚', marketSize: '¥20亿', growth: 25.3, opportunity: 'very_high', competitors: 18, barriers: '基础设施' },
  { region: '中东市场', marketSize: '¥15亿', growth: 18.5, opportunity: 'high', competitors: 12, barriers: '宗教文化' },
  { region: '南美市场', marketSize: '¥10亿', growth: 8.2, opportunity: 'medium', competitors: 15, barriers: '汇率波动' },
];

const mockComplianceData = [
  { country: '美国', requirements: 'FCC认证, FDA注册(医疗相关), 加州65号提案', riskLevel: 'medium', status: 'passed', lastCheck: '2026-05-15' },
  { country: '欧盟', requirements: 'CE认证, GDPR合规, WEEE注册', riskLevel: 'high', status: 'in_progress', lastCheck: '2026-05-10' },
  { country: '日本', requirements: 'PSE认证, JIS标准,  METI备案', riskLevel: 'low', status: 'passed', lastCheck: '2026-05-18' },
  { country: '东南亚', requirements: 'SIRIM认证(马来西亚), NBTC(泰国)', riskLevel: 'low', status: 'in_progress', lastCheck: '2026-05-12' },
];

const mockLocalizationData = [
  { region: '北美英语', completion: 95, status: 'completed', tasks: 45, done: 43 },
  { region: '欧盟德语', completion: 88, status: 'completed', tasks: 45, done: 40 },
  { region: '欧盟法语', completion: 85, status: 'completed', tasks: 45, done: 38 },
  { region: '日语', completion: 72, status: 'in_progress', tasks: 45, done: 32 },
  { region: '韩语', completion: 65, status: 'in_progress', tasks: 45, done: 29 },
  { region: '阿拉伯语', completion: 30, status: 'in_progress', tasks: 45, done: 14 },
];

const mockRiskData = [
  { type: '合规风险', level: 'medium', description: '欧盟GDPR新规将于Q3生效', action: '更新隐私政策', status: 'pending', deadline: '2026-07-01' },
  { type: '市场风险', level: 'low', description: '北美市场竞争加剧', action: '差异化竞争策略', status: 'resolved', deadline: '2026-04-15' },
  { type: '汇率风险', level: 'high', description: '欧元汇率波动增大', action: '启用本地结算', status: 'in_progress', deadline: '2026-06-01' },
  { type: '物流风险', level: 'medium', description: '东南亚物流时效不稳定', action: '建立本地仓', status: 'pending', deadline: '2026-08-01' },
];

export default function GlobalCenter() {
  const [activeTab, setActiveTab] = useState<'market' | 'compliance' | 'localization' | 'risk'>('market');

  const tabs = [
    { id: 'market', label: '市场调研', icon: Search },
    { id: 'compliance', label: '合规评估', icon: Shield },
    { id: 'localization', label: '本地化部署', icon: Map },
    { id: 'risk', label: '风控监测', icon: AlertTriangle },
  ];

  const opportunityColors: Record<string, { bg: string; text: string; label: string }> = {
    very_high: { bg: 'bg-green-100', text: 'text-green-700', label: '极高' },
    high: { bg: 'bg-blue-100', text: 'text-blue-700', label: '高' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '中' },
    low: { bg: 'bg-gray-100', text: 'text-gray-700', label: '低' },
  };

  const riskLevelColors: Record<string, { bg: string; text: string }> = {
    high: { bg: 'bg-red-100', text: 'text-red-700' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    low: { bg: 'bg-green-100', text: 'text-green-700' },
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">全球拓展中心</h1>
          <p className="text-gray-500 mt-1">支持海外市场合规运营</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>新建调研</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">覆盖国家</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">18个</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+3个新增</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">合规通过率</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">85%</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>+5% vs 上季度</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本地化进度</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">72%</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Map className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
            <RefreshCw className="w-4 h-4" />
            <span>6种语言</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">风险预警</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">2个</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-orange-600">
            <Clock className="w-4 h-4" />
            <span>需关注</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'market' && (
            <div>
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
          )}

          {activeTab === 'compliance' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">合规评估</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  添加国家
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          )}

          {activeTab === 'localization' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">本地化部署进度</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  添加语言
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {mockLocalizationData.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Globe2 className="w-5 h-5 text-blue-500" />
                            <span className="font-medium text-gray-800">{item.region}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {item.status === 'completed' ? '已完成' : '进行中'}
                            </span>
                            <span className="font-semibold text-gray-800">{item.completion}%</span>
                          </div>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${item.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${item.completion}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>任务进度: {item.done}/{item.tasks}</span>
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-700">查看详情</button>
                            <button className="text-gray-500 hover:text-gray-700">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                  <h4 className="font-semibold mb-4">本地化洞察</h4>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">最快完成</p>
                      <p className="font-medium mt-1">北美英语</p>
                      <p className="text-sm opacity-80 mt-1">进度 95%，即将上线</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">重点推进</p>
                      <p className="font-medium mt-1">日语</p>
                      <p className="text-sm opacity-80 mt-1">日本市场增长强劲</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">挑战最大</p>
                      <p className="font-medium mt-1">阿拉伯语</p>
                      <p className="text-sm opacity-80 mt-1">RTL排版和文化适配复杂</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">风控监测</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  添加预警
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
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
          )}
        </div>
      </div>
    </div>
  );
}