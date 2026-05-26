import { useState } from 'react';
import {
  Users,
  MessageSquare,
  DollarSign,
  Clock,
  Plus,
  Search,
  Phone,
  Mail,
  Building,
  Star,
  MoreVertical,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  RefreshCw,
  Zap,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Send,
  Calendar
} from 'lucide-react';

const mockLeads = [
  { id: '1', name: '张三', company: 'ABC科技', position: '采购经理', email: 'zhangsan@abc.com', phone: '13800138001', source: '官网表单', score: 92, status: 'new', lastContact: null, createdAt: '2026-05-20 14:30' },
  { id: '2', name: '李四', company: 'XYZ集团', position: '技术总监', email: 'lisi@xyz.com', phone: '13900139002', source: 'Google广告', score: 78, status: 'contacted', lastContact: '2026-05-20 10:00', createdAt: '2026-05-20 09:15' },
  { id: '3', name: '王五', company: 'DEF制造', position: '厂长', email: 'wangwu@def.com', phone: '13700137003', source: 'LinkedIn', score: 85, status: 'qualified', lastContact: '2026-05-19 15:30', createdAt: '2026-05-19 11:45' },
  { id: '4', name: '赵六', company: 'GHI贸易', position: '总经理', email: 'zhaoliu@ghi.com', phone: '13600136004', source: '官网表单', score: 95, status: 'converted', lastContact: '2026-05-18 16:20', createdAt: '2026-05-18 16:20' },
  { id: '5', name: '孙七', company: 'JKL物流', position: '运营总监', email: 'sunqi@jkl.com', phone: '13500135005', source: '展会', score: 65, status: 'new', lastContact: null, createdAt: '2026-05-17 14:00' },
  { id: '6', name: '周八', company: 'MNO电子', position: '采购主管', email: 'zhouba@mno.com', phone: '13400134006', source: '邮件营销', score: 72, status: 'contacted', lastContact: '2026-05-16 11:00', createdAt: '2026-05-16 10:30' },
];

const mockAIReplies = [
  { id: '1', type: '产品咨询', subject: '工业机器人价格咨询', content: '尊敬的用户，感谢您的咨询。我们的工业机器人产品线覆盖多种型号，从入门级到高端配置价格从15万到80万不等。具体价格取决于您的生产需求和配置要求。', quality: 95 },
  { id: '2', type: '技术方案', subject: '自动化改造方案咨询', content: '您好，针对您的自动化改造需求，我们建议采用"智能协作机器人+视觉系统"的组合方案。该方案可提升生产效率40%以上，投资回报周期约18个月。', quality: 88 },
  { id: '3', type: '商务合作', subject: '代理商合作咨询', content: '感谢您对我们产品的认可。我们诚邀有志之士成为区域代理商。代理政策包括：极具竞争力的代理价格、全面的技术培训、丰富的市场支持。', quality: 92 },
];

const mockQuotes = [
  { id: '1', code: 'QT-20260520-001', customer: 'ABC科技', product: 'IRB-2000工业机器人', quantity: 2, amount: 296000, status: 'pending', validUntil: '2026-06-19' },
  { id: '2', code: 'QT-20260519-002', customer: 'XYZ集团', product: '协作机器人套装', quantity: 5, amount: 425000, status: 'accepted', validUntil: '2026-06-18' },
  { id: '3', code: 'QT-20260518-003', customer: 'DEF制造', product: '自动化生产线', quantity: 1, amount: 1280000, status: 'negotiating', validUntil: '2026-06-17' },
];

const mockFollowUps = [
  { id: '1', leadName: '张三', task: '发送产品资料', dueDate: '2026-05-21', priority: 'high', status: 'pending', assignee: '销售员A' },
  { id: '2', leadName: '李四', task: '电话跟进报价', dueDate: '2026-05-21', priority: 'medium', status: 'pending', assignee: '销售员B' },
  { id: '3', leadName: '王五', task: '安排现场演示', dueDate: '2026-05-22', priority: 'high', status: 'in_progress', assignee: '销售员A' },
  { id: '4', leadName: '孙七', task: '发送合作方案', dueDate: '2026-05-23', priority: 'low', status: 'pending', assignee: '销售员C' },
];

export default function SalesCenter() {
  const [activeTab, setActiveTab] = useState<'leads' | 'reply' | 'quotes' | 'follow-up'>('leads');
  const [filterStatus, setFilterStatus] = useState('all');

  const tabs = [
    { id: 'leads', label: '线索管理', icon: Users },
    { id: 'reply', label: '智能回复', icon: MessageSquare },
    { id: 'quotes', label: '智能报价', icon: DollarSign },
    { id: 'follow-up', label: '跟进管理', icon: Clock },
  ];

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
  };

  const statusLabels: Record<string, string> = {
    new: '新线索',
    contacted: '已联系',
    qualified: '已认证',
    converted: '已转化',
    lost: '已流失',
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
          <h1 className="text-2xl font-bold text-gray-800">销售转化中心</h1>
          <p className="text-gray-500 mt-1">将询盘转化为订单，提高成交率</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出数据</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>添加线索</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月线索</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">328</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+15.3% vs 上月</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">平均响应时间</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">5秒</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowDownRight className="w-4 h-4" />
            <span>-80% vs 人工响应</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月成交</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">¥128万</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+23.5% vs 上月</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">成交率</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">28.6%</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+3.2% vs 上月</span>
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
          {activeTab === 'leads' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索线索..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">全部状态</option>
                    <option value="new">新线索</option>
                    <option value="contacted">已联系</option>
                    <option value="qualified">已认证</option>
                    <option value="converted">已转化</option>
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
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">客户信息</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">联系方式</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">来源</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">评分</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">最近联系</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{lead.name}</p>
                              <p className="text-sm text-gray-500">{lead.position} @ {lead.company}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {lead.source}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold text-gray-800">{lead.score}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                            {statusLabels[lead.status]}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-500">
                            {lead.lastContact || '未联系'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Phone className="w-4 h-4" />
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

          {activeTab === 'reply' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">AI智能回复</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Zap className="w-4 h-4" />
                  启用AI自动回复
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {mockAIReplies.map((reply) => (
                    <div key={reply.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {reply.type}
                          </span>
                          <span className="text-sm text-gray-500">{reply.subject}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-700">{reply.quality}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{reply.content}</p>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                          <Edit className="w-3 h-3" />
                          编辑
                        </button>
                        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                          <Send className="w-3 h-3" />
                          发送
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                          <RefreshCw className="w-3 h-3" />
                          重新生成
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <h4 className="font-semibold mb-4">AI回复优势</h4>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5" />
                        <span className="font-medium">5秒极速响应</span>
                      </div>
                      <p className="text-sm opacity-80">24小时即时回复，不流失任何商机</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">RAG知识库支撑</span>
                      </div>
                      <p className="text-sm opacity-80">基于企业真实数据，避免AI幻觉</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-medium">多版本草稿</span>
                      </div>
                      <p className="text-sm opacity-80">生成3个版本供选择，质量更有保障</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">智能报价</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  新建报价
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">报价单号</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">客户</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">产品</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">数量</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">金额</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">有效期至</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockQuotes.map((quote) => (
                      <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono text-sm text-gray-800">{quote.code}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-800">{quote.customer}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{quote.product}</td>
                        <td className="px-4 py-4 text-gray-600">{quote.quantity}</td>
                        <td className="px-4 py-4 font-semibold text-gray-800">¥{quote.amount.toLocaleString()}</td>
                        <td className="px-4 py-4 text-gray-600">{quote.validUntil}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            quote.status === 'accepted' ? 'bg-green-100 text-green-700' :
                            quote.status === 'negotiating' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {quote.status === 'accepted' ? '已接受' : quote.status === 'negotiating' ? '洽谈中' : '待处理'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
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

          {activeTab === 'follow-up' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">跟进管理</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  添加任务
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {mockFollowUps.map((task) => (
                      <div key={task.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{task.leadName}</p>
                              <p className="text-sm text-gray-500">{task.task}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                              {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                            </span>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pl-13">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {task.dueDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {task.assignee}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className={`px-3 py-1 rounded-lg text-sm ${
                              task.status === 'pending' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-green-50 text-green-600'
                            }`}>
                              {task.status === 'pending' ? '开始处理' : '进行中'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
                  <h4 className="font-semibold mb-4">AI跟进建议</h4>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">优先跟进</p>
                      <p className="font-medium mt-1">赵六 - GHI贸易</p>
                      <p className="text-sm opacity-80 mt-1">评分95分，上次联系3天前</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">即将过期</p>
                      <p className="font-medium mt-1">DEF制造报价</p>
                      <p className="text-sm opacity-80 mt-1">还有5天有效期，请及时跟进</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80">建议行动</p>
                      <p className="font-medium mt-1">发送产品演示视频</p>
                      <p className="text-sm opacity-80 mt-1">高优先级线索未充分培育</p>
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