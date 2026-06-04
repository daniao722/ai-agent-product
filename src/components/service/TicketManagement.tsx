import {
  Ticket,
  Search,
  Filter,
  MessageSquare,
  Edit,
  MoreVertical,
  User,
  Plus
} from 'lucide-react';
import { getTicketStatusColor, getTicketStatusLabel, getPriorityColor } from '../../lib/agent-utils';

const mockTickets = [
  { id: 'T202605001', title: '产品使用咨询', customer: '张三', company: 'ABC科技', type: 'consultation', status: 'open', priority: 'medium', assignee: '客服小李', createdAt: '2026-05-20 10:30', updatedAt: '2026-05-20 14:20' },
  { id: 'T202605002', title: '技术支持请求', customer: '李四', company: 'XYZ集团', type: 'technical', status: 'pending', priority: 'high', assignee: '技术小王', createdAt: '2026-05-20 09:15', updatedAt: '2026-05-20 11:45' },
  { id: 'T202605003', title: '投诉反馈', customer: '王五', company: 'DEF制造', type: 'complaint', status: 'resolved', priority: 'high', assignee: '客服小赵', createdAt: '2026-05-19 16:00', updatedAt: '2026-05-20 10:30' },
  { id: 'T202605004', title: '功能建议', customer: '赵六', company: 'GHI贸易', type: 'suggestion', status: 'open', priority: 'low', assignee: null, createdAt: '2026-05-19 14:30', updatedAt: '2026-05-19 14:30' },
  { id: 'T202605005', title: '账单问题', customer: '孙七', company: 'JKL物流', type: 'billing', status: 'pending', priority: 'medium', assignee: '财务小张', createdAt: '2026-05-18 11:00', updatedAt: '2026-05-20 09:00' },
];

export default function TicketManagement() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">工单管理</h1>
          <p className="text-gray-500 mt-1">跟踪和管理客户服务工单</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>新建工单</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* 搜索和筛选 */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
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
        </div>

        {/* 工单列表表格 */}
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority === 'high' ? '高' : ticket.priority === 'medium' ? '中' : '低'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTicketStatusColor(ticket.status)}`}>
                      {getTicketStatusLabel(ticket.status)}
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
    </div>
  );
}
