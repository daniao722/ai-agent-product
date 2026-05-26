import { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Send,
  Plus,
  Download,
  Building,
  FileText
} from 'lucide-react';

const mockQuotations = [
  { id: 'Q202605001', code: 'QT-20260520-001', customer: 'ABC科技', product: 'IRB-2000工业机器人', quantity: 2, unitPrice: 148000, totalAmount: 296000, status: 'draft', createdAt: '2026-05-20', validUntil: '2026-06-19' },
  { id: 'Q202605002', code: 'QT-20260519-002', customer: 'XYZ集团', product: '协作机器人套装', quantity: 5, unitPrice: 85000, totalAmount: 425000, status: 'sent', createdAt: '2026-05-19', validUntil: '2026-06-18' },
  { id: 'Q202605003', code: 'QT-20260518-003', customer: 'DEF制造', product: '自动化生产线', quantity: 1, unitPrice: 1280000, totalAmount: 1280000, status: 'accepted', createdAt: '2026-05-18', validUntil: '2026-06-17' },
  { id: 'Q202605004', code: 'QT-20260517-004', customer: 'GHI贸易', product: '机器人配件包', quantity: 10, unitPrice: 12000, totalAmount: 120000, status: 'rejected', createdAt: '2026-05-17', validUntil: '2026-06-16' },
  { id: 'Q202605005', code: 'QT-20260516-005', customer: 'JKL物流', product: '智能分拣系统', quantity: 1, unitPrice: 560000, totalAmount: 560000, status: 'sent', createdAt: '2026-05-16', validUntil: '2026-06-15' },
  { id: 'Q202605006', code: 'QT-20260515-006', customer: 'MNO电子', product: '焊接机器人', quantity: 3, unitPrice: 92000, totalAmount: 276000, status: 'accepted', createdAt: '2026-05-15', validUntil: '2026-06-14' },
];

const quotationStatus: Record<string, { color: string; label: string }> = {
  draft: { color: 'bg-gray-100 text-gray-700', label: '草稿' },
  sent: { color: 'bg-blue-100 text-blue-700', label: '已发送' },
  accepted: { color: 'bg-green-100 text-green-700', label: '已接受' },
  rejected: { color: 'bg-red-100 text-red-700', label: '已拒绝' },
};

export default function QuotationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotations = mockQuotations.filter((q) => {
    const matchesSearch =
      q.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">报价管理</h1>
          <p className="text-gray-500 mt-1">管理所有报价单，跟踪报价状态与转化</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>新建报价</span>
          </button>
        </div>
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
                  placeholder="搜索报价单号、客户、产品..."
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
                <option value="draft">草稿</option>
                <option value="sent">已发送</option>
                <option value="accepted">已接受</option>
                <option value="rejected">已拒绝</option>
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
              {filteredQuotations.map((quote) => (
                <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-blue-600">{quote.code}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-800">{quote.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{quote.product}</td>
                  <td className="px-4 py-4 text-gray-600">{quote.quantity}</td>
                  <td className="px-4 py-4 font-semibold text-gray-800">¥{quote.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-gray-600">{quote.validUntil}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${quotationStatus[quote.status].color}`}>
                      {quotationStatus[quote.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="查看">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="编辑">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="发送">
                        <Send className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredQuotations.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>暂无匹配的报价单</p>
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
