import { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  Users,
  CheckCircle,
  XCircle,
  ChevronRight,
  Star,
  MessageSquare,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  RefreshCw,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Radar
} from 'lucide-react';

const mockLostDealReasons = [
  { reason: '价格因素', count: 28, percentage: 35, trend: '+5%', color: 'bg-red-500' },
  { reason: '竞品对比', count: 22, percentage: 27.5, trend: '-3%', color: 'bg-orange-500' },
  { reason: '需求不匹配', count: 15, percentage: 18.75, trend: '-2%', color: 'bg-yellow-500' },
  { reason: '跟进不及时', count: 10, percentage: 12.5, trend: '+8%', color: 'bg-purple-500' },
  { reason: '决策人变更', count: 5, percentage: 6.25, trend: '0%', color: 'bg-gray-500' },
];

const mockLostDealCases = [
  { id: '1', company: '深圳某科技', product: '工业机器人', reason: '价格因素', amount: '¥45万', date: '2026-05-15', analysis: '客户预算有限，竞品报价低15%' },
  { id: '2', company: '广州某制造', product: '自动化产线', reason: '竞品对比', amount: '¥82万', date: '2026-05-12', analysis: '客户选择了竞品的整体解决方案' },
  { id: '3', company: '东莞某电子', product: '智能仓储', reason: '跟进不及时', amount: '¥36万', date: '2026-05-10', analysis: '响应时间超过48小时，客户已做决定' },
];

const mockSuccessCases = [
  { id: '1', company: '华为技术', product: '协作机器人套装', amount: '¥128万', date: '2026-05-20', score: 95, keyFactors: ['充分了解需求', '定制化方案', '快速响应'], sales: '张三' },
  { id: '2', company: '比亚迪汽车', product: '自动化检测设备', amount: '¥95万', date: '2026-05-18', score: 92, keyFactors: ['高层关系维护', '技术方案优势', '成功案例展示'], sales: '李四' },
  { id: '3', company: '宁德时代', product: '智能物流系统', amount: '¥156万', date: '2026-05-15', score: 98, keyFactors: ['全方位服务', '长期合作关系', '差异化竞争'], sales: '王五' },
];

const mockOptimizationSuggestions = [
  { id: '1', category: '定价策略', title: '优化价格体系', priority: 'high', impact: '预计提升成交率8%', description: '针对中小客户推出入门级产品套餐，降低购买门槛', icon: DollarSign, actionable: true },
  { id: '2', category: '跟进效率', title: '缩短响应时间', priority: 'high', impact: '预计挽回流失客户15%', description: '建立5分钟响应机制，确保第一时间触达客户', icon: Phone, actionable: true },
  { id: '3', category: '竞品应对', title: '强化差异化优势', priority: 'medium', impact: '预计提升竞品对比胜率20%', description: '提炼产品独特卖点，制作竞品对比手册', icon: Target, actionable: true },
  { id: '4', category: '客户关系', title: '建立高层关系', priority: 'medium', impact: '预计缩短决策周期30%', description: '针对重点客户建立高层沟通渠道', icon: Users, actionable: false },
  { id: '5', category: '需求挖掘', title: '深入了解需求', priority: 'low', impact: '预计提升方案匹配度25%', description: '使用标准化需求诊断工具，提高需求挖掘深度', icon: Lightbulb, actionable: false },
];

const mockTeamCapabilities = [
  { capability: '产品知识', score: 85, teamAvg: 78 },
  { capability: '销售技巧', score: 72, teamAvg: 75 },
  { capability: '客户沟通', score: 88, teamAvg: 80 },
  { capability: '谈判能力', score: 65, teamAvg: 70 },
  { capability: '时间管理', score: 78, teamAvg: 72 },
  { capability: '数据分析', score: 82, teamAvg: 68 },
];

const mockTeamMembers = [
  { name: '张三', deals: 12, winRate: 68, amount: '¥285万', trend: '+12%', avatar: 'Z' },
  { name: '李四', deals: 15, winRate: 72, amount: '¥342万', trend: '+8%', avatar: 'L' },
  { name: '王五', deals: 10, winRate: 75, amount: '¥398万', trend: '+15%', avatar: 'W' },
  { name: '赵六', deals: 8, winRate: 62, amount: '¥198万', trend: '+5%', avatar: 'Z' },
];

export default function DealReview() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [showCases, setShowCases] = useState<'lost' | 'success'>('lost');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const handleReasonClick = (reason: string) => {
    setSelectedReason(selectedReason === reason ? null : reason);
    alert(`查看${reason}详细分析`);
  };

  const handleCaseClick = (caseId: string) => {
    setSelectedCase(selectedCase === caseId ? null : caseId);
    console.log(`查看案例详情: ${caseId}`);
  };

  const handleSuggestionClick = (suggestionId: string) => {
    alert(`执行优化建议: ${suggestionId}`);
  };

  const handleExportClick = () => {
    alert('导出复盘报告');
  };

  const handleRefreshClick = () => {
    alert('刷新数据');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">成交复盘与优化</h1>
            <p className="text-gray-500 mt-1">深度分析丢单原因，沉淀成功案例，优化销售策略</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshClick}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>刷新数据</span>
            </button>
            <button
              onClick={handleExportClick}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>导出报告</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月丢单数</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">80</p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
            <TrendingDown className="w-4 h-4" />
            <span>+5% vs 上月</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月成交数</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">47</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+12% vs 上月</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">平均成交周期</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">18天</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingDown className="w-4 h-4" />
            <span>-3天 vs 上月</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">成交率</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">37%</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+4% vs 上月</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold text-gray-800">丢单归因分析</h2>
            </div>
            <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>本月</option>
              <option>近三月</option>
              <option>本季度</option>
            </select>
          </div>

          <div className="space-y-4">
            {mockLostDealReasons.map((item, index) => (
              <div
                key={index}
                onClick={() => handleReasonClick(item.reason)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedReason === item.reason
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-semibold text-gray-800">{item.reason}</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {item.count}个案例
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${
                      item.trend.startsWith('+') ? 'text-red-600' : item.trend.startsWith('-') ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {item.trend}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage * 2.5}%` }}
                  />
                </div>
                {selectedReason === item.reason && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>语义分析结果：</strong>
                      {item.reason === '价格因素' && '客户对价格敏感度较高，竞品报价平均低10-20%，建议优化定价策略或增加价值展示'}
                      {item.reason === '竞品对比' && '客户在多个供应商中进行比较，我们的产品在某些方面存在劣势，需要强化差异化优势'}
                      {item.reason === '需求不匹配' && '客户需求与产品功能存在一定差距，需要加强需求挖掘和方案定制能力'}
                      {item.reason === '跟进不及时' && '响应时间超过客户预期，错失最佳跟进时机，需要提升响应效率'}
                      {item.reason === '决策人变更' && '项目关键决策人发生变化，新决策人对我们产品了解不足'}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('查看详细案例');
                        }}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      >
                        查看详细案例
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('生成改进建议');
                        }}
                        className="px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                      >
                        生成改进建议
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">丢单案例详情</h2>
            <Filter className="w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-3">
            {mockLostDealCases.map((caseItem) => (
              <div
                key={caseItem.id}
                onClick={() => handleCaseClick(caseItem.id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedCase === caseItem.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{caseItem.company}</p>
                    <p className="text-sm text-gray-500">{caseItem.product}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{caseItem.amount}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    caseItem.reason === '价格因素' ? 'bg-red-100 text-red-700' :
                    caseItem.reason === '竞品对比' ? 'bg-orange-100 text-orange-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {caseItem.reason}
                  </span>
                  <span className="text-xs text-gray-400">{caseItem.date}</span>
                </div>
                {selectedCase === caseItem.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>AI分析：</strong>{caseItem.analysis}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('学习此案例');
                      }}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      学习此案例 →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-800">成交案例库</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCases('lost')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  showCases === 'lost'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                失败案例
              </button>
              <button
                onClick={() => setShowCases('success')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  showCases === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                成功案例
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {mockSuccessCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="p-5 border-2 border-green-200 bg-green-50 rounded-xl hover:border-green-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">{caseItem.company}</p>
                    <p className="text-sm text-gray-500 mt-1">{caseItem.product}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-bold text-gray-800">{caseItem.score}</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{caseItem.amount}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>成功关键因素：</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.keyFactors.map((factor, index) => (
                      <span key={index} className="px-2 py-1 bg-white border border-green-200 text-green-700 rounded text-xs">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-green-200">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {caseItem.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {caseItem.sales}
                    </span>
                  </div>
                  <button
                    onClick={() => alert(`学习案例: ${caseItem.company}`)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    学习此案例
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">销售策略优化</h2>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              AI生成
            </span>
          </div>

          <div className="space-y-4">
            {mockOptimizationSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      suggestion.priority === 'high' ? 'bg-red-100' :
                      suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <suggestion.icon className={`w-5 h-5 ${
                        suggestion.priority === 'high' ? 'text-red-600' :
                        suggestion.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{suggestion.title}</p>
                      <p className="text-xs text-gray-500">{suggestion.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {suggestion.priority === 'high' ? '高优先级' :
                     suggestion.priority === 'medium' ? '中优先级' : '低优先级'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{suggestion.impact}</span>
                  </div>
                  {suggestion.actionable && (
                    <button
                      onClick={() => handleSuggestionClick(suggestion.id)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      立即执行
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Radar className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-800">团队能力评估</h2>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-gray-600">我的能力</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-xs text-gray-600">团队平均</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {mockTeamCapabilities.map((cap, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{cap.capability}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">团队平均: {cap.teamAvg}</span>
                    <span className="text-sm font-bold text-blue-600">{cap.score}</span>
                  </div>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gray-300 rounded-full"
                    style={{ width: `${cap.teamAvg}%` }}
                  />
                  <div
                    className="absolute h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${cap.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-800">能力提升建议</span>
            </div>
            <p className="text-sm text-gray-600">
              基于您的能力评估，<strong>谈判能力</strong>和<strong>销售技巧</strong>有较大提升空间。建议参加专项培训课程，并主动参与复杂项目的谈判过程以积累经验。
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">团队业绩排行</h2>
            <Users className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {mockTeamMembers.map((member, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {member.avatar}
                    </div>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-500">
                      {member.deals}个成交 | {member.winRate}%成交率
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{member.amount}</p>
                    <p className="text-xs text-green-600 flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {member.trend}
                    </p>
                  </div>
                </div>

                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${member.winRate}%` }}
                  />
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => alert(`查看${member.name}的详细业绩`)}
                    className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                  >
                    查看详情
                  </button>
                  <button
                    onClick={() => alert(`学习${member.name}的成功经验`)}
                    className="flex-1 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    学习经验
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
