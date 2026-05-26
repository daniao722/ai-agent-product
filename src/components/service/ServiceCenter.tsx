import { useState } from 'react';
import {
  Headphones,
  Ticket,
  Smile,
  Plus,
  Search,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Filter,
  Download,
  Send,
  User,
  Bot,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Edit
} from 'lucide-react';

const mockTickets = [
  { id: 'T202605001', title: '产品使用咨询', customer: '张三', company: 'ABC科技', type: 'consultation', status: 'open', priority: 'medium', assignee: '客服小李', createdAt: '2026-05-20 10:30', updatedAt: '2026-05-20 14:20' },
  { id: 'T202605002', title: '技术支持请求', customer: '李四', company: 'XYZ集团', type: 'technical', status: 'pending', priority: 'high', assignee: '技术小王', createdAt: '2026-05-20 09:15', updatedAt: '2026-05-20 11:45' },
  { id: 'T202605003', title: '投诉反馈', customer: '王五', company: 'DEF制造', type: 'complaint', status: 'resolved', priority: 'high', assignee: '客服小赵', createdAt: '2026-05-19 16:00', updatedAt: '2026-05-20 10:30' },
  { id: 'T202605004', title: '功能建议', customer: '赵六', company: 'GHI贸易', type: 'suggestion', status: 'open', priority: 'low', assignee: null, createdAt: '2026-05-19 14:30', updatedAt: '2026-05-19 14:30' },
  { id: 'T202605005', title: '账单问题', customer: '孙七', company: 'JKL物流', type: 'billing', status: 'pending', priority: 'medium', assignee: '财务小张', createdAt: '2026-05-18 11:00', updatedAt: '2026-05-20 09:00' },
];

const mockChatHistory = [
  { id: '1', customer: '张三', company: 'ABC科技', message: '您好，我想咨询一下工业机器人的操作培训服务', time: '10:30', source: 'website', status: 'resolved' },
  { id: '2', customer: 'AI客服', type: 'bot', message: '您好！我是AI客服，很高兴为您服务。关于操作培训，我们提供以下服务：\n1. 线上视频培训（免费）\n2. 现场实操培训（付费）\n3. 定制化培训方案\n\n请问您对哪种方式感兴趣？', time: '10:30' },
  { id: '3', customer: '张三', company: 'ABC科技', message: '对现场实操培训比较感兴趣，请问怎么收费？', time: '10:32', source: 'website', status: 'resolved' },
  { id: '4', customer: 'AI客服', type: 'bot', message: '现场实操培训根据内容和时长收费：\n- 标准课程（2天）：¥5000/人\n- 高级课程（5天）：¥12000/人\n- 企业内训（定制）：需评估后报价\n\n您公司有多少人需要参加培训呢？我可以为您推荐最合适的方案。', time: '10:32' },
];

const mockSatisfaction = [
  { month: '1月', score: 92.5, responses: 156 },
  { month: '2月', score: 91.8, responses: 142 },
  { month: '3月', score: 93.2, responses: 168 },
  { month: '4月', score: 94.1, responses: 175 },
  { month: '5月', score: 94.5, responses: 89 },
];

const mockAIResponses = [
  { keyword: '价格咨询', response: '您好，我们的产品价格根据型号和配置不同，从15万到80万不等。具体报价需要根据您的生产需求定制。', usage: 234 },
  { keyword: '培训服务', response: '我们提供线上视频培训和现场实操培训两种方式。现场培训标准课程¥5000/人，高级课程¥12000/人。', usage: 156 },
  { keyword: '售后服务', response: '我们提供12个月免费质保，以及终身技术支持。响应时间为：紧急问题4小时内，一般问题24小时内。', usage: 189 },
];

export default function ServiceCenter() {
  const [activeTab, setActiveTab] = useState<'ai-support' | 'tickets' | 'satisfaction'>('ai-support');
  const [showNewTicket, setShowNewTicket] = useState(false);

  const tabs = [
    { id: 'ai-support', label: 'AI客服', icon: Headphones },
    { id: 'tickets', label: '工单管理', icon: Ticket },
    { id: 'satisfaction', label: '满意度分析', icon: Smile },
  ];

  const statusColors: Record<string, string> = {
    open: 'bg-blue-100 text-blue-700',
    pending: 'bg-yellow-100 text-yellow-700',
    resolved: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
  };

  const statusLabels: Record<string, string> = {
    open: '待处理',
    pending: '处理中',
    resolved: '已解决',
    closed: '已关闭',
  };

  const priorityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">服务体验中心</h1>
          <p className="text-gray-500 mt-1">提供优质服务，提升客户满意度和留存</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>新建工单</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
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
          {activeTab === 'ai-support' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chat History */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">实时会话</h3>
                <div className="bg-gray-50 rounded-xl p-4 h-[500px] overflow-y-auto space-y-4">
                  {mockChatHistory.map((chat) => (
                    <div key={chat.id} className={`flex ${chat.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[80%] ${chat.type === 'bot' ? 'order-1' : ''}`}>
                        <div className={`rounded-2xl p-4 ${
                          chat.type === 'bot'
                            ? 'bg-white border border-gray-200'
                            : 'bg-blue-600 text-white'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            {chat.type === 'bot' ? (
                              <>
                                <Bot className="w-4 h-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-600">AI客服</span>
                              </>
                            ) : (
                              <>
                                <User className="w-4 h-4 text-white" />
                                <span className="text-sm font-medium">{chat.customer}</span>
                              </>
                            )}
                            <span className="text-xs opacity-60">{chat.time}</span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="输入消息..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <Send className="w-4 h-4" />
                    发送
                  </button>
                </div>
              </div>

              {/* AI Knowledge Base */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">AI回复知识库</h3>
                <div className="space-y-4">
                  {mockAIResponses.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                          {item.keyword}
                        </span>
                        <span className="text-xs text-gray-500">使用 {item.usage} 次</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{item.response}</p>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                          <Edit size={12} />
                          编辑
                        </button>
                        <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                          <TrendingUp size={12} />
                          查看使用统计
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg py-3 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  添加知识库条目
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索工单..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">全部状态</option>
                    <option value="open">待处理</option>
                    <option value="pending">处理中</option>
                    <option value="resolved">已解决</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">
                  <Filter className="w-4 h-4" />
                  更多筛选
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">工单编号</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">标题</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">客户</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">类型</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">优先级</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">负责人</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">更新时间</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono text-sm text-blue-600">{ticket.id}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-medium text-gray-800">{ticket.title}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-gray-800">{ticket.customer}</p>
                            <p className="text-sm text-gray-500">{ticket.company}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {ticket.type === 'consultation' ? '咨询' :
                             ticket.type === 'technical' ? '技术' :
                             ticket.type === 'complaint' ? '投诉' :
                             ticket.type === 'suggestion' ? '建议' : '账单'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
                            {ticket.priority === 'high' ? '高' : ticket.priority === 'medium' ? '中' : '低'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                            {statusLabels[ticket.status]}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {ticket.assignee ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                <User className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm text-gray-700">{ticket.assignee}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">未分配</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-500">{ticket.updatedAt}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
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

          {activeTab === 'satisfaction' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">满意度分析</h3>
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>最近6个月</option>
                    <option>最近12个月</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    导出报告
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Satisfaction Trend */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">满意度趋势</h4>
                    <div className="flex items-end justify-between h-48 gap-3">
                      {mockSatisfaction.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-blue-200 rounded-t-lg relative" style={{ height: `${item.score}%` }}>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-800">
                              {item.score}%
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Satisfaction Breakdown */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">评分分布</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 w-20">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">5星</span>
                        </div>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }} />
                        </div>
                        <span className="text-sm text-gray-600 w-12">72%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 w-20">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">4星</span>
                        </div>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '18%' }} />
                        </div>
                        <span className="text-sm text-gray-600 w-12">18%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 w-20">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">3星</span>
                        </div>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: '6%' }} />
                        </div>
                        <span className="text-sm text-gray-600 w-12">6%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 w-20">
                          <Star className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">2星</span>
                        </div>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: '2%' }} />
                        </div>
                        <span className="text-sm text-gray-600 w-12">2%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 w-20">
                          <Star className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">1星</span>
                        </div>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '2%' }} />
                        </div>
                        <span className="text-sm text-gray-600 w-12">2%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* AI Insights */}
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                    <h4 className="font-semibold mb-4">AI分析洞察</h4>
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ThumbsUp className="w-5 h-5" />
                          <span className="font-medium">客户好评要点</span>
                        </div>
                        <p className="text-sm opacity-80">响应速度快、解答专业、服务态度好</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-medium">待改进方面</span>
                        </div>
                        <p className="text-sm opacity-80">复杂技术问题处理时间较长</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-medium">提升建议</span>
                        </div>
                        <p className="text-sm opacity-80">加强技术问题知识库建设</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-4">本月数据</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">评价数</span>
                        </div>
                        <span className="font-semibold text-gray-800">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-600">好评率</span>
                        </div>
                        <span className="font-semibold text-green-600">90%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-500" />
                          <span className="text-sm text-gray-600">平均评分</span>
                        </div>
                        <span className="font-semibold text-gray-800">4.7</span>
                      </div>
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