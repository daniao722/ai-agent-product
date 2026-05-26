import { useState } from 'react';
import {
  Search,
  Eye,
  Download,
  MoreVertical,
  Building,
  RefreshCw,
  DollarSign
} from 'lucide-react';

const mockPayments = [
  { id: 'P202605001', receiptNo: 'RC-20260520-001', orderNo: 'SO-20260520-001', customer: 'ABC科技', amount: 296000, method: 'bank_transfer', status: 'received', paidAt: '2026-05-20 15:30' },
  { id: 'P202605002', receiptNo: 'RC-20260519-002', orderNo: 'SO-20260519-002', customer: 'XYZ集团', amount: 425000, method: 'credit_card', status: 'received', paidAt: '2026-05-19 14:20' },
  { id: 'P202605003', receiptNo: 'RC-20260518-003', orderNo: 'SO-20260518-003', customer: 'DEF制造', amount: 640000, method: 'bank_transfer', status: 'received', paidAt: '2026-05-18 16:45' },
  { id: 'P202605004', receiptNo: 'RC-20260517-004', orderNo: 'SO-20260517-004', customer: 'PQR设备', amount: 180000, method: 'paypal', status: 'pending', paidAt: null },
  { id: 'P202605005', receiptNo: 'RC-20260516-005', orderNo: 'SO-20260516-005', customer: 'JKL物流', amount: 560000, method: 'bank_transfer', status: 'received', paidAt: '2026-05-16 10:15' },
  { id: 'P202605006', receiptNo: 'RC-20260515-006', orderNo: 'SO-20260515-006', customer: 'MNO电子', amount: 276000, method: 'credit_card', status: 'refunded', paidAt: '2026-05-15 09:30' },
];

const paymentStatus: Record<string, { color: string; label: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-700', label: '待支付' },
  received: { color: 'bg-green-100 text-green-700', label: '已收款' },
  refunded: { color: 'bg-red-100 text-red-700', label: '已退款' },
};

const paymentMethod: Record<string, string> = {
  bank_transfer: '银行转账',
  credit_card: '信用卡',
  paypal: 'PayPal',
};

export default function PaymentSettlement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPayments = mockPayments.filter((p) => {
    const matchesSearch =
      p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">收款结算</h1>
          <p className="text-gray-500 mt-1">管理收款记录，确保款项安全到账</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>对账</span>
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
                  placeholder="搜索收款单号、关联订单、客户..."
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
                <option value="pending">待支付</option>
                <option value="received">已收款</option>
                <option value="refunded">已退款</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">收款单号</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">关联订单</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">客户</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">金额</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">支付方式</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">收款时间</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-blue-600">{payment.receiptNo}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-gray-600">{payment.orderNo}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-800">{payment.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-800">¥{payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {paymentMethod[payment.method]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentStatus[payment.status].color}`}>
                      {paymentStatus[payment.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{payment.paidAt || '-'}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="查看">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="下载">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="更多">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    <DollarSign className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>暂无匹配的收款记录</p>
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
