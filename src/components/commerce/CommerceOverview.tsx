import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
  Package,
  FileText,
  CheckCircle,
  AlertCircle,
  Truck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart
} from 'lucide-react';

const funnelData = [
  { label: '报价单', value: 48, color: 'bg-blue-500', percentage: 100 },
  { label: '已接受', value: 32, color: 'bg-indigo-500', percentage: 66.7 },
  { label: '已签约', value: 24, color: 'bg-purple-500', percentage: 50 },
  { label: '已收款', value: 18, color: 'bg-green-500', percentage: 37.5 },
];

const summaryCards = [
  { title: '本月销售额', value: '¥328万', icon: BarChart3, iconBg: 'bg-green-50', iconColor: 'text-green-600', change: '+23.5% vs 上月', changeType: 'increase' as const, changeColor: 'text-green-600' },
  { title: '待收款', value: '¥120万', icon: Clock, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600', change: '5笔待确认', changeType: 'decrease' as const, changeColor: 'text-yellow-600' },
  { title: '进行中订单', value: '12', icon: Package, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', change: '3笔发货中', changeType: 'increase' as const, changeColor: 'text-blue-600' },
  { title: '本月合同', value: '8', icon: FileText, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', change: '6笔已签署', changeType: 'increase' as const, changeColor: 'text-green-600' },
];

const ongoingTasks = [
  { id: 1, title: 'DEF制造 - 自动化生产线交付', stage: '履约中', progress: 75, icon: Package, iconColor: 'text-blue-500' },
  { id: 2, title: 'XYZ集团 - 协作机器人发货跟进', stage: '发货中', progress: 60, icon: Truck, iconColor: 'text-purple-500' },
  { id: 3, title: 'ABC科技 - 工业机器人合同签署', stage: '签约中', progress: 90, icon: FileText, iconColor: 'text-indigo-500' },
  { id: 4, title: 'GHI贸易 - 配件包报价跟进', stage: '报价中', progress: 40, icon: DollarSign, iconColor: 'text-yellow-500' },
];

const aiInsights = [
  { id: 1, type: 'opportunity', title: 'DEF制造有追加采购意向', description: '基于历史交易频率和当前项目进展，DEF制造可能在Q3追加自动化产线订单，建议提前准备报价方案。', confidence: 87 },
  { id: 2, type: 'risk', title: 'GHI贸易报价过期风险', description: 'GHI贸易的配件包报价将于3天内到期，且当前状态为已拒绝，建议及时跟进或调整方案。', confidence: 92 },
  { id: 3, type: 'optimization', title: '收款周期可优化', description: '当前平均收款周期为45天，建议对信用良好的客户推行预付款模式，预计可缩短至30天。', confidence: 78 },
];

const insightTypeConfig: Record<string, { icon: typeof Sparkles; color: string; bg: string; label: string }> = {
  opportunity: { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', label: '商机' },
  risk: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', label: '风险' },
  optimization: { icon: Sparkles, color: 'text-blue-600', bg: 'bg-blue-50', label: '优化' },
};

export default function CommerceOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">交易履约概览</h1>
        <p className="text-gray-500 mt-1">核心业务数据与交易进展一览</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
            <div className={`flex items-center gap-1 mt-2 text-sm ${card.changeColor}`}>
              {card.changeType === 'increase' ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Value Chain */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">核心价值链</h3>
          <p className="text-sm text-gray-500 mb-6">报价 → 签约 → 履约 → 收款</p>
          <div className="flex items-center justify-between mb-6">
            {['报价', '签约', '履约', '收款'].map((step, idx) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-indigo-500' : idx === 2 ? 'bg-purple-500' : 'bg-green-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-xs text-gray-600 mt-2 font-medium">{step}</span>
                </div>
                {idx < 3 && (
                  <ArrowRight className="w-4 h-4 text-gray-300 mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">转化漏斗</h3>
          <p className="text-sm text-gray-500 mb-6">报价单 → 已接受 → 已签约 → 已收款</p>
          <div className="space-y-3">
            {funnelData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">{item.value}</span>
                    <span className="text-xs text-gray-400">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ongoing Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">正在进行的任务</h3>
              <p className="text-sm text-gray-500">当前活跃交易进展</p>
            </div>
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">{ongoingTasks.length} 进行中</span>
          </div>
          <div className="space-y-4">
            {ongoingTasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <task.icon className={`w-5 h-5 ${task.iconColor}`} />
                    <span className="font-medium text-gray-800 text-sm">{task.title}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{task.stage}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">AI 洞察</h3>
                <p className="text-sm text-gray-500">智能分析与建议</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight) => {
              const config = insightTypeConfig[insight.type];
              const InsightIcon = config.icon;
              return (
                <div key={insight.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <InsightIcon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-1.5 py-0.5 ${config.bg} ${config.color} rounded text-xs font-medium`}>{config.label}</span>
                        <span className="text-xs text-gray-400">置信度 {insight.confidence}%</span>
                      </div>
                      <p className="font-medium text-gray-800 text-sm mb-1">{insight.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
