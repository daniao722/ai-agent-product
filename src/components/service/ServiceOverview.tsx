import {
  MessageSquare,
  Bot,
  Zap,
  Smile,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  Headphones,
  Ticket
} from 'lucide-react';

const funnelData = [
  { stage: '客户咨询', count: 128, color: 'bg-blue-500' },
  { stage: 'AI解决', count: 96, color: 'bg-purple-500' },
  { stage: '人工处理', count: 32, color: 'bg-orange-500' },
  { stage: '满意评价', count: 89, color: 'bg-green-500' },
];

const valueChain = [
  { label: '客户咨询', icon: MessageSquare, color: 'text-blue-600 bg-blue-50' },
  { label: 'AI接待', icon: Bot, color: 'text-purple-600 bg-purple-50' },
  { label: '工单处理', icon: Ticket, color: 'text-orange-600 bg-orange-50' },
  { label: '满意度提升', icon: Smile, color: 'text-green-600 bg-green-50' },
];

const ongoingTasks = [
  { id: '1', title: '处理张三的产品使用咨询', status: 'processing', assignee: 'AI客服', time: '10:30', type: 'ai' },
  { id: '2', title: '跟进李四的技术支持请求', status: 'pending', assignee: '技术小王', time: '09:15', type: 'human' },
  { id: '3', title: '回复王五的投诉反馈', status: 'urgent', assignee: '客服小赵', time: '16:00', type: 'human' },
  { id: '4', title: '评估赵六的功能建议', status: 'pending', assignee: '未分配', time: '14:30', type: 'human' },
  { id: '5', title: 'AI自动回复账单问题', status: 'processing', assignee: 'AI客服', time: '11:00', type: 'ai' },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  processing: { color: 'bg-blue-100 text-blue-700', label: '处理中' },
  pending: { color: 'bg-yellow-100 text-yellow-700', label: '待处理' },
  urgent: { color: 'bg-red-100 text-red-700', label: '紧急' },
};

export default function ServiceOverview() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">服务体验中心</h1>
          <p className="text-gray-500 mt-1">提供优质服务，提升客户满意度和留存</p>
        </div>
      </div>

      {/* 核心业务数据汇总卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">今日咨询</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">128</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12.5% vs 昨日</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">AI接待率</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">96.8%</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>首响时间 3秒</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">平均响应</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">5秒</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowDownRight className="w-4 h-4" />
            <span>-85% vs 人工</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">客户满意度</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">94.5%</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Smile className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+2.3% vs 上月</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 核心价值链 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-5">核心价值链</h3>
          <div className="flex items-center justify-between">
            {valueChain.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 mt-2">{item.label}</span>
                </div>
                {index < valueChain.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-300 mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 转化漏斗 */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-5">转化漏斗</h3>
          <div className="space-y-3">
            {funnelData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm opacity-80">{item.stage}</span>
                  <span className="text-sm font-semibold">{item.count}</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${(item.count / 128) * 100}%` }}
                  />
                </div>
                <span className="text-xs opacity-60">{((item.count / 128) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 正在进行的任务 */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">正在进行的任务</h3>
            <span className="text-sm text-gray-500">{ongoingTasks.length} 个任务</span>
          </div>
          <div className="space-y-3">
            {ongoingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${task.type === 'ai' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                    {task.type === 'ai' ? (
                      <Bot className="w-4 h-4 text-purple-600" />
                    ) : (
                      <Headphones className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">负责人: {task.assignee}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {task.time}
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[task.status].color}`}>
                  {statusConfig[task.status].label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI洞察模块 */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold">AI洞察</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">服务趋势</span>
              </div>
              <p className="text-sm opacity-80">AI接待率持续提升，本月已达96.8%，较上月提升3.2%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">风险预警</span>
              </div>
              <p className="text-sm opacity-80">投诉类工单较上周增加15%，建议关注产品质量问题</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">客户洞察</span>
              </div>
              <p className="text-sm opacity-80">高价值客户满意度达98%，但新客户满意度仅87%，需优化新客引导流程</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
