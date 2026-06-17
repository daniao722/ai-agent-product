import { useState } from 'react';
import {
  CreditCard,
  FileText,
  ShoppingCart,
  DollarSign,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  MoreVertical,
  Filter,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  User,
  Calendar,
  RefreshCw,
  Package,
  Truck,
  BarChart3
} from 'lucide-react';
import {
  getQuotationStatusColor,
  getQuotationStatusLabel,
  getContractStatusColor,
  getContractStatusLabel,
  getOrderStatusColor,
  getOrderStatusLabel,
  getPaymentStatusColor,
  getPaymentStatusLabel,
} from '../../lib/agent-utils';

const mockQuotations = [
  { id: 'Q202605001', code: 'QT-20260520-001', customer: 'ABC科技', product: 'IRB-2000工业机器人', quantity: 2, unitPrice: 148000, totalAmount: 296000, status: 'draft', createdAt: '2026-05-20', validUntil: '2026-06-19' },
  { id: 'Q202605002', code: 'QT-20260519-002', customer: 'XYZ集团', product: '协作机器人套装', quantity: 5, unitPrice: 85000, totalAmount: 425000, status: 'sent', createdAt: '2026-05-19', validUntil: '2026-06-18' },
  { id: 'Q202605003', code: 'QT-20260518-003', customer: 'DEF制造', product: '自动化生产线', quantity: 1, unitPrice: 1280000, totalAmount: 1280000, status: 'accepted', createdAt: '2026-05-18', validUntil: '2026-06-17' },
  { id: 'Q202605004', code: 'QT-20260517-004', customer: 'GHI贸易', product: '机器人配件包', quantity: 10, unitPrice: 12000, totalAmount: 120000, status: 'rejected', createdAt: '2026-05-17', validUntil: '2026-06-16' },
];

const mockContracts = [
  { id: 'C202605001', code: 'CT-20260520-001', customer: 'ABC科技', title: '工业机器人采购合同', amount: 296000, status: 'pending', type: 'sale', createdAt: '2026-05-20' },
  { id: 'C202605002', code: 'CT-20260519-002', customer: 'XYZ集团', title: '协作机器人采购合同', amount: 425000, status: 'signed', type: 'sale', createdAt: '2026-05-19' },
  { id: 'C202605003', code: 'CT-20260518-003', customer: 'DEF制造', title: '自动化生产线合同', amount: 1280000, status: 'performing', type: 'sale', createdAt: '2026-05-18' },
  { id: 'C202605004', code: 'CT-20260517-004', customer: 'MNO电子', title: '技术服务协议', amount: 80000, status: 'completed', type: 'service', createdAt: '2026-05-17' },
];

const mockOrders = [
  { id: 'O202605001', orderNo: 'SO-20260520-001', customer: 'ABC科技', product: 'IRB-2000工业机器人 x2', amount: 296000, status: 'confirmed', paymentStatus: 'paid', deliveryStatus: 'preparing', createdAt: '2026-05-20' },
  { id: 'O202605002', orderNo: 'SO-20260519-002', customer: 'XYZ集团', product: '协作机器人套装 x5', amount: 425000, status: 'shipped', paymentStatus: 'paid', deliveryStatus: 'in_transit', createdAt: '2026-05-19' },
  { id: 'O202605003', orderNo: 'SO-20260518-003', customer: 'DEF制造', product: '自动化生产线 x1', amount: 1280000, status: 'delivered', paymentStatus: 'paid', deliveryStatus: 'delivered', createdAt: '2026-05-18' },
  { id: 'O202605004', orderNo: 'SO-20260517-004', customer: 'GHI贸易', product: '机器人配件包 x10', amount: 120000, status: 'processing', paymentStatus: 'unpaid', deliveryStatus: 'pending', createdAt: '2026-05-17' },
];

const mockPayments = [
  { id: 'P202605001', orderNo: 'SO-20260520-001', customer: 'ABC科技', amount: 296000, method: 'bank_transfer', status: 'received', paidAt: '2026-05-20 15:30' },
  { id: 'P202605002', orderNo: 'SO-20260519-002', customer: 'XYZ集团', amount: 425000, method: 'credit_card', status: 'received', paidAt: '2026-05-19 14:20' },
  { id: 'P202605003', orderNo: 'SO-20260518-003', customer: 'DEF制造', amount: 640000, method: 'bank_transfer', status: 'received', paidAt: '2026-05-18 16:45' },
  { id: 'P202605004', orderNo: 'SO-20260517-004', customer: 'PQR设备', amount: 180000, method: 'paypal', status: 'pending', paidAt: null },
];

export default function CommerceCenter() {
  const [activeTab, setActiveTab] = useState<'quotations' | 'contracts' | 'orders' | 'payments'>('quotations');

  const tabs = [
    { id: 'quotations', label: '报价管理', icon: FileText },
    { id: 'contracts', label: '合同管理', icon: FileText },
    { id: 'orders', label: '订单管理', icon: ShoppingCart },
    { id: 'payments', label: '收款结算', icon: DollarSign },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">交易履约中心</h1>
          <p className="text-gray-500 mt-1">完成交易履约，确保款项安全到账</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>导出数据</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>新建报价</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月销售额</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">¥328万</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600" />
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
              <p className="text-sm text-gray-500">待收款</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">¥120万</p>
            </div>
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-yellow-600">
            <AlertCircle className="w-4 h-4" />
            <span>5笔待确认</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">进行中订单</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
            <Truck className="w-4 h-4" />
            <span>3笔发货中</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本月合同</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">8</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>6笔已签署</span>
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
          {activeTab === 'quotations' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索报价..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                    {mockQuotations.map((quote) => (
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQuotationStatusColor(quote.status)}`}>
                            {getQuotationStatusLabel(quote.status)}
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
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Send className="w-4 h-4" />
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

          {activeTab === 'contracts' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索合同..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">全部状态</option>
                    <option value="pending">待签署</option>
                    <option value="signed">已签署</option>
                    <option value="performing">执行中</option>
                    <option value="completed">已完成</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                  <Plus className="w-4 h-4" />
                  新建合同
                </button>
              </div>
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
                    {mockContracts.map((contract) => (
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
                            {contract.type === 'sale' ? '销售合同' : '服务合同'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContractStatusColor(contract.status)}`}>
                            {getContractStatusLabel(contract.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{contract.createdAt}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Send className="w-4 h-4" />
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

          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索订单..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                    {mockOrders.map((order) => (
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.paymentStatus === 'paid' ? '已支付' : '待支付'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.deliveryStatus === 'in_transit' ? 'bg-blue-100 text-blue-700' :
                            order.deliveryStatus === 'preparing' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.deliveryStatus === 'delivered' ? '已送达' :
                             order.deliveryStatus === 'in_transit' ? '运输中' :
                             order.deliveryStatus === 'preparing' ? '备货中' : '待发货'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Truck className="w-4 h-4" />
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

          {activeTab === 'payments' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索收款..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">全部状态</option>
                    <option value="pending">待支付</option>
                    <option value="received">已收款</option>
                    <option value="refunded">已退款</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 text-sm">
                  <RefreshCw className="w-4 h-4" />
                  对账
                </button>
              </div>
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
                    {mockPayments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <span className="font-mono text-sm text-blue-600">{payment.orderNo}</span>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{payment.orderNo}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-800">{payment.customer}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-semibold text-gray-800">¥{payment.amount.toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {payment.method === 'bank_transfer' ? '银行转账' :
                             payment.method === 'credit_card' ? '信用卡' : 'PayPal'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                            {getPaymentStatusLabel(payment.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{payment.paidAt || '-'}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
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
        </div>
      </div>
    </div>
  );
}