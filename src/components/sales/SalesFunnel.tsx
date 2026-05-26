import { useState } from 'react';
import {
  TrendingUp,
  Target,
  Brain,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Download,
  Calendar,
  Users,
  DollarSign,
  ArrowRight,
  Lightbulb,
  BarChart3,
  PieChart,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  Award,
} from 'lucide-react';

// 模拟漏斗数据
const funnelStages = [
  { id: 'awareness', name: '初步接触', count: 1250, amount: 0, conversionRate: 100, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500' },
  { id: 'interest', name: '意向确认', count: 680, amount: 2450000, conversionRate: 54.4, color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500' },
  { id: 'evaluation', name: '方案评估', count: 320, amount: 5680000, conversionRate: 47.1, color: 'from-teal-500 to-teal-600', bgColor: 'bg-teal-500' },
  { id: 'negotiation', name: '商务谈判', count: 145, amount: 8920000, conversionRate: 45.3, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500' },
  { id: 'closed', name: '成交签约', count: 68, amount: 12800000, conversionRate: 46.9, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500' },
];

// AI预测数据
const aiPredictions = {
  monthly: {
    target: 15000000,
    predicted: 14250000,
    confidence: 87,
    trend: 'up',
    growth: 12.5,
  },
  quarterly: {
    target: 45000000,
    predicted: 46800000,
    confidence: 82,
    trend: 'up',
    growth: 8.3,
  },
};

// 漏斗健康度诊断
const healthDiagnosis = {
  score: 78,
  status: '良好',
  issues: [
    { id: 1, stage: '意向确认→方案评估', problem: '转化率偏低', rate: 47.1, benchmark: 55, severity: 'medium' },
    { id: 2, stage: '商务谈判', problem: '周期过长', avgDays: 28, benchmark: 21, severity: 'high' },
  ],
  suggestions: [
    { id: 1, title: '优化意向培育流程', impact: '预计提升转化率8%', priority: 'high' },
    { id: 2, title: '引入自动化跟进', impact: '缩短谈判周期30%', priority: 'medium' },
    { id: 3, title: '加强方案模板化', impact: '提升方案产出效率', priority: 'medium' },
  ],
};

// 销售目标追踪
const targetTracking = {
  team: {
    current: 12800000,
    target: 15000000,
    members: [
      { name: '张经理', current: 4200000, target: 5000000, avatar: '张' },
      { name: '李主管', current: 3800000, target: 4500000, avatar: '李' },
      { name: '王专员', current: 2800000, target: 3500000, avatar: '王' },
      { name: '赵顾问', current: 2000000, target: 2000000, avatar: '赵' },
    ],
  },
};

// 业绩归因分析
const attributionData = {
  won: {
    total: 68,
    reasons: [
      { reason: '产品匹配度高', count: 28, percentage: 41.2 },
      { reason: '价格竞争力', count: 18, percentage: 26.5 },
      { reason: '服务响应快', count: 12, percentage: 17.6 },
      { reason: '品牌信任度', count: 10, percentage: 14.7 },
    ],
  },
  lost: {
    total: 77,
    reasons: [
      { reason: '价格超出预算', count: 32, percentage: 41.6 },
      { reason: '需求不匹配', count: 22, percentage: 28.6 },
      { reason: '竞争对手优势', count: 15, percentage: 19.5 },
      { reason: '决策周期长', count: 8, percentage: 10.4 },
    ],
  },
};

// 历史趋势数据
const trendData = [
  { month: '1月', leads: 980, deals: 45, revenue: 8500000 },
  { month: '2月', leads: 1100, deals: 52, revenue: 9800000 },
  { month: '3月', leads: 1250, deals: 58, revenue: 11200000 },
  { month: '4月', leads: 1180, deals: 55, revenue: 10500000 },
  { month: '5月', leads: 1250, deals: 68, revenue: 12800000 },
];

export default function SalesFunnel() {
  const [activeTab, setActiveTab] = useState<'funnel' | 'prediction' | 'health' | 'target' | 'attribution'>('funnel');
  const [predictionPeriod, setPredictionPeriod] = useState<'monthly' | 'quarterly'>('monthly');
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const [showHealthDetail, setShowHealthDetail] = useState(false);
  const [selectedAttribution, setSelectedAttribution] = useState<'won' | 'lost'>('won');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs = [
    { id: 'funnel', label: '销售漏斗', icon: BarChart3 },
    { id: 'prediction', label: 'AI预测', icon: Brain },
    { id: 'health', label: '健康诊断', icon: AlertCircle },
    { id: 'target', label: '目标追踪', icon: Target },
    { id: 'attribution', label: '归因分析', icon: PieChart },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      alert('数据已更新');
    }, 1500);
  };

  const handleExport = () => {
    alert('正在导出销售漏斗报告...');
  };

  const handleApplySuggestion = (suggestionId: number) => {
    alert(`已采纳建议 #${suggestionId}，将自动创建优化任务`);
  };

  const handleViewDetail = (stageId: string) => {
    console.log('查看阶段详情:', stageId);
    alert(`查看 ${stageId} 阶段详细数据`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio >= 1) return 'bg-green-500';
    if (ratio >= 0.8) return 'bg-blue-500';
    if (ratio >= 0.6) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6">
      {/* 顶部标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">销售漏斗与预测</h1>
          <p className="text-gray-500 mt-1">可视化销售漏斗，AI驱动业绩预测与优化建议</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>刷新数据</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
        </div>
      </div>

      {/* 快速统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">漏斗总值</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">¥3,185万</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+18.5% vs 上月</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">整体转化率</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">5.44%</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+0.8% vs 上月</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">平均客单价</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">¥188万</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
            <ArrowDownRight className="w-4 h-4" />
            <span>-2.3% vs 上月</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">预测达成率</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">95%</p>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
            <Sparkles className="w-4 h-4" />
            <span>AI置信度 87%</span>
          </div>
        </div>
      </div>

      {/* 导航标签 */}
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
          {/* 销售漏斗可视化 */}
          {activeTab === 'funnel' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">销售漏斗全景</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('切换到金额视图')}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    按金额
                  </button>
                  <button
                    onClick={() => alert('切换到数量视图')}
                    className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg"
                  >
                    按数量
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 漏斗图 */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {funnelStages.map((stage, index) => (
                      <div key={stage.id} className="relative">
                        <div className="flex items-center gap-4">
                          {/* 漏斗条 */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">{stage.count} 个商机</span>
                                {index > 0 && (
                                  <span className="text-xs text-gray-400">
                                    转化率 {stage.conversionRate}%
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="relative">
                              <div
                                className={`h-12 rounded-lg bg-gradient-to-r ${stage.color} flex items-center justify-between px-4 transition-all hover:shadow-md cursor-pointer`}
                                style={{ width: `${stage.conversionRate}%`, minWidth: '120px' }}
                                onClick={() => handleViewDetail(stage.id)}
                              >
                                <span className="text-white font-semibold">{stage.count}</span>
                                <ArrowRight className="w-4 h-4 text-white/70" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < funnelStages.length - 1 && (
                          <div className="flex justify-center my-2">
                            <ChevronDown className="w-5 h-5 text-gray-300" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 阶段详情 */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-800 mb-4">阶段详情</h4>
                  <div className="space-y-4">
                    {funnelStages.map((stage) => (
                      <div
                        key={stage.id}
                        className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow"
                        onClick={() => handleViewDetail(stage.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">{stage.name}</span>
                          <span className={`w-3 h-3 rounded-full ${stage.bgColor}`} />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">商机数</p>
                            <p className="font-semibold text-gray-800">{stage.count}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">金额</p>
                            <p className="font-semibold text-gray-800">
                              ¥{(stage.amount / 10000).toFixed(0)}万
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 趋势图表 */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-800 mb-4">近5个月趋势</h4>
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-end justify-between h-48 gap-4">
                    {trendData.map((data, index) => (
                      <div key={data.month} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex gap-1 items-end justify-center h-36">
                          <div
                            className="w-1/2 bg-blue-400 rounded-t"
                            style={{ height: `${(data.leads / 1250) * 100}%` }}
                            title={`线索: ${data.leads}`}
                          />
                          <div
                            className="w-1/2 bg-green-500 rounded-t"
                            style={{ height: `${(data.deals / 70) * 100}%` }}
                            title={`成交: ${data.deals}`}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded" />
                      <span className="text-sm text-gray-600">线索数</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded" />
                      <span className="text-sm text-gray-600">成交数</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI销售预测 */}
          {activeTab === 'prediction' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">AI销售预测</h3>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setPredictionPeriod('monthly')}
                    className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                      predictionPeriod === 'monthly'
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    月度预测
                  </button>
                  <button
                    onClick={() => setPredictionPeriod('quarterly')}
                    className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                      predictionPeriod === 'quarterly'
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    季度预测
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 预测卡片 */}
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">AI预测业绩</span>
                  </div>
                  <p className="text-4xl font-bold mb-2">
                    ¥{(aiPredictions[predictionPeriod].predicted / 10000).toFixed(0)}万
                  </p>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>预计增长 {aiPredictions[predictionPeriod].growth}%</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">置信度</span>
                      <span className="font-semibold">{aiPredictions[predictionPeriod].confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* 目标对比 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-800">目标对比</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">设定目标</span>
                        <span className="font-semibold text-gray-800">
                          ¥{(aiPredictions[predictionPeriod].target / 10000).toFixed(0)}万
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="w-full bg-gray-300 h-2 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">AI预测</span>
                        <span className="font-semibold text-blue-600">
                          ¥{(aiPredictions[predictionPeriod].predicted / 10000).toFixed(0)}万
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${(aiPredictions[predictionPeriod].predicted / aiPredictions[predictionPeriod].target) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      {aiPredictions[predictionPeriod].predicted >= aiPredictions[predictionPeriod].target
                        ? 'AI预测显示有望超额完成目标'
                        : 'AI预测显示需要加强销售力度'}
                    </p>
                  </div>
                </div>

                {/* 预测依据 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-gray-800">预测依据</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">历史成交数据</p>
                        <p className="text-xs text-gray-500">基于过去12个月数据</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">当前漏斗状态</p>
                        <p className="text-xs text-gray-500">{funnelStages[2].count}个商机在评估阶段</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">季节性因素</p>
                        <p className="text-xs text-gray-500">Q2为传统旺季</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">市场趋势</p>
                        <p className="text-xs text-gray-500">行业增长预期8.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 预测趋势图 */}
              <div className="mt-6 bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-800 mb-4">预测趋势</h4>
                <div className="flex items-end gap-2 h-40">
                  {[65, 72, 78, 85, 87, 82, 88, 92, 89, 95, 94, 96].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-full rounded-t transition-all ${
                          index >= 8 ? 'bg-purple-400' : 'bg-blue-400'
                        }`}
                        style={{ height: `${value}%` }}
                      />
                      <span className="text-xs text-gray-400 mt-1">{index + 1}月</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded" />
                    <span className="text-sm text-gray-600">历史实际</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded" />
                    <span className="text-sm text-gray-600">AI预测</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 漏斗健康度诊断 */}
          {activeTab === 'health' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-gray-800">漏斗健康度诊断</h3>
                </div>
                <button
                  onClick={() => setShowHealthDetail(!showHealthDetail)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {showHealthDetail ? '收起详情' : '查看详情'}
                  {showHealthDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* 健康度评分 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center">
                  <p className="text-white/80 mb-2">健康度评分</p>
                  <p className="text-6xl font-bold">{healthDiagnosis.score}</p>
                  <p className="text-white/80 mt-2">{healthDiagnosis.status}</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm text-white/70">行业平均: 72分</p>
                  </div>
                </div>

                <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">诊断概览</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">优势</span>
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 线索获取能力强</li>
                        <li>• 成交阶段转化稳定</li>
                        <li>• 客单价保持增长</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="font-medium text-amber-800">待改进</span>
                      </div>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• 意向到评估转化偏低</li>
                        <li>• 谈判周期过长</li>
                        <li>• 部分线索质量待提升</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 问题列表 */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">发现问题</h4>
                <div className="space-y-3">
                  {healthDiagnosis.issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                            {issue.severity === 'high' ? '高' : '中'}优先级
                          </span>
                          <span className="font-medium text-gray-800">{issue.stage}</span>
                          <span className="text-gray-500">{issue.problem}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            当前: {issue.rate || issue.avgDays}
                            {issue.rate ? '%' : '天'}
                          </span>
                          {expandedIssue === issue.id ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {expandedIssue === issue.id && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">
                              行业基准: {issue.benchmark}
                              {issue.rate ? '%' : '天'}
                            </span>
                            <span className="text-red-600">
                              差距: {issue.rate ? (issue.benchmark - issue.rate).toFixed(1) : (issue.avgDays - issue.benchmark)}
                              {issue.rate ? '%' : '天'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 优化建议 */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">AI优化建议</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {healthDiagnosis.suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {suggestion.priority === 'high' ? '高优先级' : '中优先级'}
                        </span>
                      </div>
                      <h5 className="font-medium text-gray-800 mb-2">{suggestion.title}</h5>
                      <p className="text-sm text-green-600 mb-4">{suggestion.impact}</p>
                      <button
                        onClick={() => handleApplySuggestion(suggestion.id)}
                        className="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        采纳建议
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 销售目标追踪 */}
          {activeTab === 'target' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">销售目标追踪</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('切换到团队视图')}
                    className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg"
                  >
                    团队视图
                  </button>
                  <button
                    onClick={() => alert('切换到个人视图')}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    个人视图
                  </button>
                </div>
              </div>

              {/* 团队总览 */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/80">团队月度目标</p>
                    <p className="text-3xl font-bold mt-1">
                      ¥{(targetTracking.team.current / 10000).toFixed(0)}万 / ¥{(targetTracking.team.target / 10000).toFixed(0)}万
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80">完成率</p>
                    <p className="text-3xl font-bold mt-1">
                      {((targetTracking.team.current / targetTracking.team.target) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full transition-all"
                    style={{ width: `${(targetTracking.team.current / targetTracking.team.target) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-white/70">
                  <span>本月已过 25 天</span>
                  <span>剩余目标: ¥{((targetTracking.team.target - targetTracking.team.current) / 10000).toFixed(0)}万</span>
                </div>
              </div>

              {/* 成员进度 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {targetTracking.team.members.map((member, index) => {
                  const progress = (member.current / member.target) * 100;
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{member.name}</p>
                            <p className="text-sm text-gray-500">销售目标</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{progress.toFixed(0)}%</p>
                          <p className="text-xs text-gray-500">
                            ¥{(member.current / 10000).toFixed(0)}万 / ¥{(member.target / 10000).toFixed(0)}万
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getProgressColor(member.current, member.target)}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs ${
                          progress >= 100 ? 'text-green-600' : progress >= 80 ? 'text-blue-600' : 'text-amber-600'
                        }`}>
                          {progress >= 100 ? '已达标' : progress >= 80 ? '进度良好' : '需加把劲'}
                        </span>
                        <button
                          onClick={() => alert(`查看 ${member.name} 的详细业绩`)}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          查看详情
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 排行榜 */}
              <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="font-semibold text-gray-800">本月销售排行</h4>
                </div>
                <div className="space-y-3">
                  {targetTracking.team.members
                    .sort((a, b) => b.current - a.current)
                    .map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-amber-100 text-amber-700' :
                            index === 1 ? 'bg-gray-200 text-gray-700' :
                            index === 2 ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-800">{member.name}</span>
                        </div>
                        <span className="font-semibold text-gray-800">
                          ¥{(member.current / 10000).toFixed(0)}万
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* 业绩归因分析 */}
          {activeTab === 'attribution' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">业绩归因分析</h3>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedAttribution('won')}
                    className={`px-4 py-1.5 text-sm rounded-md transition-colors flex items-center gap-1 ${
                      selectedAttribution === 'won'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    成交分析
                  </button>
                  <button
                    onClick={() => setSelectedAttribution('lost')}
                    className={`px-4 py-1.5 text-sm rounded-md transition-colors flex items-center gap-1 ${
                      selectedAttribution === 'lost'
                        ? 'bg-white text-red-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    丢单分析
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 归因图表 */}
                <div className="lg:col-span-2">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      {selectedAttribution === 'won' ? '成交原因分布' : '丢单原因分布'}
                    </h4>
                    <div className="space-y-4">
                      {attributionData[selectedAttribution].reasons.map((reason, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">{reason.reason}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500">{reason.count} 单</span>
                              <span className="text-sm font-semibold text-gray-800">{reason.percentage}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                selectedAttribution === 'won' ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${reason.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 统计卡片 */}
                <div className="space-y-4">
                  <div className={`rounded-xl p-5 text-white ${
                    selectedAttribution === 'won'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-gradient-to-br from-red-500 to-rose-600'
                  }`}>
                    <p className="text-white/80">
                      {selectedAttribution === 'won' ? '本月成交' : '本月丢单'}
                    </p>
                    <p className="text-4xl font-bold mt-1">
                      {attributionData[selectedAttribution].total} 单
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-sm text-white/70">
                        {selectedAttribution === 'won'
                          ? `成交率 ${((attributionData.won.total / (attributionData.won.total + attributionData.lost.total)) * 100).toFixed(1)}%`
                          : `丢单率 ${((attributionData.lost.total / (attributionData.won.total + attributionData.lost.total)) * 100).toFixed(1)}%`
                        }
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h5 className="font-medium text-gray-800 mb-3">AI洞察</h5>
                    <div className="space-y-3">
                      {selectedAttribution === 'won' ? (
                        <>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <p className="text-sm text-gray-600">
                              产品匹配度是成交的首要因素，建议继续强化产品定位
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <p className="text-sm text-gray-600">
                              价格竞争力占26.5%，说明定价策略较为合理
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                            <p className="text-sm text-gray-600">
                              价格超出预算是最主要的丢单原因，建议推出更多价格档位
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                            <p className="text-sm text-gray-600">
                              需求不匹配占28.6%，需要加强售前需求调研
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 改进建议 */}
              <div className="mt-6 bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h4 className="font-semibold text-gray-800">改进建议</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAttribution === 'won' ? (
                    <>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-2">强化产品优势传播</h5>
                        <p className="text-sm text-gray-600">
                          基于成交数据分析，客户最看重产品匹配度。建议在营销材料中更突出产品功能与客户需求的对应关系。
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-2">优化服务响应机制</h5>
                        <p className="text-sm text-gray-600">
                          服务响应速度是第三大成交因素，建议建立更完善的客户服务体系，确保快速响应客户需求。
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-2">推出灵活价格方案</h5>
                        <p className="text-sm text-gray-600">
                          针对价格敏感客户，考虑推出基础版、标准版、高级版等不同档位，满足不同预算需求。
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-2">加强需求匹配筛选</h5>
                        <p className="text-sm text-gray-600">
                          优化线索评分模型，更早识别需求不匹配的客户，将精力集中在高匹配度线索上。
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
