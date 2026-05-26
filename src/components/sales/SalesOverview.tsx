import { useState } from 'react';
import {
  Users,
  Zap,
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Clock,
  Lightbulb,
  Target,
  CheckCircle,
  MessageSquare,
  DollarSign,
  BarChart3,
  GraduationCap,
  ClipboardList,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Filter,
  Search,
  Bot,
} from 'lucide-react';

const funnelData = [
  { label: '新线索', count: 328, color: 'bg-blue-500', percentage: 100 },
  { label: '已联系', count: 186, color: 'bg-yellow-500', percentage: 56.7 },
  { label: '已认证', count: 94, color: 'bg-purple-500', percentage: 28.7 },
  { label: '已转化', count: 47, color: 'bg-green-500', percentage: 14.3 },
];

const moduleCards = [
  { id: 'leads', icon: Users, label: '智能线索中心', desc: 'AI评分+智能分配', color: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 'reply', icon: MessageSquare, label: 'AI智能响应', desc: '5秒极速回复', color: 'from-green-500 to-green-600', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 'follow-up', icon: Target, label: '智能跟进管理', desc: 'AI节奏+意图识别', color: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 'quotes', icon: DollarSign, label: '智能报价成交', desc: '数据驱动最优报价', color: 'from-orange-500 to-orange-600', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { id: 'sales-funnel', icon: BarChart3, label: '漏斗与预测', desc: 'AI预测+健康诊断', color: 'from-pink-500 to-pink-600', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
  { id: 'sales-enablement', icon: GraduationCap, label: 'AI销售赋能', desc: '话术推荐+培训', color: 'from-cyan-500 to-cyan-600', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
  { id: 'deal-review', icon: ClipboardList, label: '成交复盘优化', desc: '语义级丢单归因', color: 'from-red-500 to-red-600', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
];

const ongoingTasks = [
  { id: '1', task: '跟进ABC科技张三 - 发送产品资料', priority: 'high', dueDate: '2026-05-21', assignee: '销售员A', module: 'follow-up' },
  { id: '2', task: 'XYZ集团李四 - 电话跟进报价', priority: 'medium', dueDate: '2026-05-21', assignee: '销售员B', module: 'quotes' },
  { id: '3', task: 'DEF制造王五 - 安排现场演示', priority: 'high', dueDate: '2026-05-22', assignee: '销售员A', module: 'follow-up' },
  { id: '4', task: 'JKL物流孙七 - 发送合作方案', priority: 'low', dueDate: '2026-05-23', assignee: '销售员C', module: 'reply' },
];

const aiInsights = [
  { id: '1', title: '高价值线索提醒', content: '赵六(GHI贸易)评分95分，建议优先跟进，上次联系已过3天', type: 'warning' },
  { id: '2', title: '报价即将过期', content: 'DEF制造报价单还有5天有效期，请及时跟进确认', type: 'danger' },
  { id: '3', title: '转化率提升建议', content: '已认证→已转化阶段流失率较高，建议加强报价环节的个性化方案', type: 'info' },
];

const topPerformers = [
  { name: '销售员A', deals: 12, amount: 386, conversion: 32.5 },
  { name: '销售员B', deals: 9, amount: 278, conversion: 28.3 },
  { name: '销售员C', deals: 7, amount: 195, conversion: 24.1 },
];

export default function SalesOverview() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
    window.dispatchEvent(new CustomEvent('navigate', { detail: moduleId }));
  };

  const priorityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };

  const priorityLabels: Record<string, string> = {
    high: '高',
    medium: '中',
    low: '低',
  };

  const insightColors: Record<string, string> = {
    warning: 'border-yellow-300 bg-yellow-50',
    danger: 'border-red-300 bg-red-50',
    info: 'border-blue-300 bg-blue-50',
  };

  const insightIconColors: Record<string, string> = {
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-blue-600',
  };

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">销售转化中心</h1>
        <p className="text-gray-500 mt-1">AI驱动的全链路销售转化与CRM管理平台</p>
      </div>

      {/* 核心业务数据汇总 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">本月线索</p>
              <p className="text-2xl font-bold mt-1">328</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-blue-100 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+15.3% vs 上月</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">平均响应时间</p>
              <p className="text-2xl font-bold mt-1">5秒</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-green-100 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>-80% vs 人工响应</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">本月成交</p>
              <p className="text-2xl font-bold mt-1">¥128万</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-purple-100 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+23.5% vs 上月</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">成交率</p>
              <p className="text-2xl font-bold mt-1">28.6%</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-orange-100 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+3.2% vs 上月</span>
          </div>
        </div>
      </div>

      {/* 七大功能模块入口 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">功能模块</h2>
          <span className="text-sm text-gray-500">7大模块，覆盖销售全链路</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {moduleCards.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`flex flex-col items-center p-4 rounded-xl border transition-all hover:shadow-md ${
                selectedModule === module.id
                  ? 'border-blue-300 bg-blue-50 shadow-md'
                  : 'border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className={`w-12 h-12 ${module.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <module.icon className={`w-6 h-6 ${module.iconColor}`} />
              </div>
              <span className="text-sm font-medium text-gray-800">{module.label}</span>
              <span className="text-xs text-gray-500 mt-1 text-center">{module.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 转化漏斗 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">转化漏斗</h2>
          <div className="space-y-3">
            {funnelData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className={`${item.color} h-8 rounded-full flex items-center justify-end pr-3 transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  >
                    <span className="text-white text-sm font-semibold">{item.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 销售排行榜 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">销售排行榜</h2>
          <div className="space-y-3">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{performer.name}</p>
                  <p className="text-xs text-gray-500">{performer.deals}单 · ¥{performer.amount}万</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{performer.conversion}%</p>
                  <p className="text-xs text-gray-500">转化率</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 正在进行的任务 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">正在进行的任务</h2>
          <div className="space-y-3">
            {ongoingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-700 block">{task.task}</span>
                    <span className="text-xs text-gray-400">{task.assignee} · {task.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {priorityLabels[task.priority]}
                  </span>
                  <button 
                    onClick={() => handleModuleClick(task.module)}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    处理
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI洞察 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">AI洞察</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight) => (
            <div key={insight.id} className={`border rounded-xl p-4 ${insightColors[insight.type]}`}>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className={`w-4 h-4 ${insightIconColors[insight.type]}`} />
                <span className="font-medium text-gray-800 text-sm">{insight.title}</span>
              </div>
              <p className="text-sm text-gray-600">{insight.content}</p>
              <button 
                onClick={() => alert('已标记处理: ' + insight.title)}
                className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                立即处理 →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
