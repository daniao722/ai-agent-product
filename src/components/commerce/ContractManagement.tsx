import { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Download,
  Send,
  Plus,
  MoreVertical,
  Building,
  FileText
} from 'lucide-react';

const mockContracts = [
  { id: 'C202605001', code: 'CT-20260520-001', customer: 'ABC科技', title: '工业机器人采购合同', amount: 296000, status: 'pending', type: 'sale', createdAt: '2026-05-20' },
  { id: 'C202605002', code: 'CT-20260519-002', customer: 'XYZ集团', title: '协作机器人采购合同', amount: 425000, status: 'signed', type: 'sale', createdAt: '2026-05-19' },
  { id: 'C202605003', code: 'CT-20260518-003', customer: 'DEF制造', title: '自动化生产线合同', amount: 1280000, status: 'performing', type: 'sale', createdAt: '2026-05-18' },
  { id: 'C202605004', code: 'CT-20260517-004', customer: 'MNO电子', title: '技术服务协议', amount: 80000, status: 'completed', type: 'service', createdAt: '2026-05-17' },
  { id: 'C202605005', code: 'CT-20260516-005', customer: 'JKL物流', title: '智能分拣系统采购合同', amount: 560000, status: 'signed', type: 'sale', createdAt: '2026-05-16' },
  { id: 'C202605006', code: 'CT-20260515-006', customer: 'PQR设备', title: '设备维护服务合同', amount: 45000, status: 'performing', type: 'service', createdAt: '2026-05-15' },
];

const contractStatus: Record<string, { color: string; label: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-700', label: '待签署' },
  signed: { color: 'bg-blue-100 text-blue-700', label: '已签署' },
  performing: { color: 'bg-purple-100 text-purple-700', label: '执行中' },
  completed: { color: 'bg-green-100 text-green-700', label: '已完成' },
  cancelled: { color: 'bg-red-100 text-red-700', label: '已取消' },
};

const contractType: Record<string, string> = {
  sale: '销售合同',
  service: '服务合同',
};

export default function ContractManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredContracts = mockContracts.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">合同管理</h1>
          <p className="text-gray-500 mt-1">管理所有合同，跟踪签署与执行状态</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>新建合同</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索合同编号、客户、合同名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部状态</option>
                <option value="pending">待签署</option>
                <option value="signed">已签署</option>
                <option value="performing">执行中</option>
                <option value="completed">已完成</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">
              <Filter className="w-4 h-4" />
              更多筛选
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">合同编号</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">客户</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">合同名称</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">金额</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">类型</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">创建日期</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-blue-600">{contract.code}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-800">{contract.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{contract.title}</td>
                  <td className="px-4 py-4 font-semibold text-gray-800">¥{contract.amount.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {contractType[contract.type]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${contractStatus[contract.status].color}`}>
                      {contractStatus[contract.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{contract.createdAt}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="查看">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="下载">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="发送">
                        <Send className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="更多">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredContracts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>暂无匹配的合同</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
