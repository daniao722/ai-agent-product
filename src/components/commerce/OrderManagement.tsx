import { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Truck,
  MoreVertical,
  Building,
  ShoppingCart
} from 'lucide-react';
import { getOrderStatusColor, getOrderStatusLabel, getPaymentStatusColor, getPaymentStatusLabel, getDeliveryStatusColor, getDeliveryStatusLabel } from '../../lib/agent-utils';

const mockOrders = [
  { id: 'O202605001', orderNo: 'SO-20260520-001', customer: 'ABC科技', product: 'IRB-2000工业机器人 x2', amount: 296000, status: 'confirmed', paymentStatus: 'paid', deliveryStatus: 'preparing', createdAt: '2026-05-20' },
  { id: 'O202605002', orderNo: 'SO-20260519-002', customer: 'XYZ集团', product: '协作机器人套装 x5', amount: 425000, status: 'shipped', paymentStatus: 'paid', deliveryStatus: 'in_transit', createdAt: '2026-05-19' },
  { id: 'O202605003', orderNo: 'SO-20260518-003', customer: 'DEF制造', product: '自动化生产线 x1', amount: 1280000, status: 'delivered', paymentStatus: 'paid', deliveryStatus: 'delivered', createdAt: '2026-05-18' },
  { id: 'O202605004', orderNo: 'SO-20260517-004', customer: 'GHI贸易', product: '机器人配件包 x10', amount: 120000, status: 'processing', paymentStatus: 'unpaid', deliveryStatus: 'pending', createdAt: '2026-05-17' },
  { id: 'O202605005', orderNo: 'SO-20260516-005', customer: 'JKL物流', product: '智能分拣系统 x1', amount: 560000, status: 'confirmed', paymentStatus: 'paid', deliveryStatus: 'preparing', createdAt: '2026-05-16' },
  { id: 'O202605006', orderNo: 'SO-20260515-006', customer: 'MNO电子', product: '焊接机器人 x3', amount: 276000, status: 'shipped', paymentStatus: 'paid', deliveryStatus: 'in_transit', createdAt: '2026-05-15' },
];

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter((o) => {
    const matchesSearch =
      o.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">订单管理</h1>
        <p className="text-gray-500 mt-1">管理所有订单，跟踪订单、支付与发货状态</p>
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
                  placeholder="搜索订单号、客户、产品..."
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
                <option value="processing">处理中</option>
                <option value="confirmed">已确认</option>
                <option value="shipped">已发货</option>
                <option value="delivered">已送达</option>
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
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">订单号</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">客户</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">产品</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">金额</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">订单状态</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">支付状态</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">发货状态</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm text-blue-600">{order.orderNo}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-800">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{order.product}</td>
                  <td className="px-4 py-4 font-semibold text-gray-800">¥{order.amount.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliveryStatusColor(order.deliveryStatus)}`}>
                      {getDeliveryStatusLabel(order.deliveryStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="查看">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="发货">
                        <Truck className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="更多">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>暂无匹配的订单</p>
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
