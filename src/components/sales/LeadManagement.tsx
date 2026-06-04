import { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  Star,
  MoreVertical,
  Filter,
  Plus,
  Download,
  MessageSquare,
} from 'lucide-react';
import { getLeadStatusColor, getLeadStatusLabel } from '../../lib/agent-utils';

const mockLeads = [
  { id: '1', name: '张三', company: 'ABC科技', position: '采购经理', email: 'zhangsan@abc.com', phone: '13800138001', source: '官网表单', score: 92, status: 'new', lastContact: null, createdAt: '2026-05-20 14:30' },
  { id: '2', name: '李四', company: 'XYZ集团', position: '技术总监', email: 'lisi@xyz.com', phone: '13900139002', source: 'Google广告', score: 78, status: 'contacted', lastContact: '2026-05-20 10:00', createdAt: '2026-05-20 09:15' },
  { id: '3', name: '王五', company: 'DEF制造', position: '厂长', email: 'wangwu@def.com', phone: '13700137003', source: 'LinkedIn', score: 85, status: 'qualified', lastContact: '2026-05-19 15:30', createdAt: '2026-05-19 11:45' },
  { id: '4', name: '赵六', company: 'GHI贸易', position: '总经理', email: 'zhaoliu@ghi.com', phone: '13600136004', source: '官网表单', score: 95, status: 'converted', lastContact: '2026-05-18 16:20', createdAt: '2026-05-18 16:20' },
  { id: '5', name: '孙七', company: 'JKL物流', position: '运营总监', email: 'sunqi@jkl.com', phone: '13500135005', source: '展会', score: 65, status: 'new', lastContact: null, createdAt: '2026-05-17 14:00' },
  { id: '6', name: '周八', company: 'MNO电子', position: '采购主管', email: 'zhouba@mno.com', phone: '13400134006', source: '邮件营销', score: 72, status: 'contacted', lastContact: '2026-05-16 11:00', createdAt: '2026-05-16 10:30' },
];

export default function LeadManagement() {
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">线索管理</h1>
          <p className="text-gray-500 mt-1">管理和追踪所有销售线索</p>
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          {/* 搜索和筛选 */}
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

          {/* 线索列表表格 */}
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeadStatusColor(lead.status)}`}>
                        {getLeadStatusLabel(lead.status)}
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
      </div>
    </div>
  );
}
