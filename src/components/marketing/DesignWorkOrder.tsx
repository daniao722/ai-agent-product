import { useState } from 'react'
import { Plus, X, AlertCircle, Clock, Send, Eye } from 'lucide-react'

type Priority = 'critical' | 'high' | 'medium' | 'low'
type OrderStatus = 'pending' | 'in_progress' | 'completed'

interface WorkOrder {
  id: string
  title: string
  type: string
  priority: Priority
  status: OrderStatus
  submitTime: string
  description: string
  page: string
}

const workOrders: WorkOrder[] = [
  { id: 'DW-202605001', title: '添加成功案例展示模块', type: '组件添加', priority: 'high', status: 'in_progress', submitTime: '2026-05-26 14:30', description: '在产品详情页添加客户案例展示区域，包含案例图片、客户评价和合作品牌Logo', page: '/products_details/23.html' },
  { id: 'DW-202605002', title: '优化首屏内容布局', type: '布局优化', priority: 'medium', status: 'pending', submitTime: '2026-05-25 10:15', description: '调整首屏布局，将产品核心卖点前置，增加产品应用场景图', page: '/products_details/23.html' },
  { id: 'DW-202605003', title: '优化图片加载性能', type: '页面设计', priority: 'high', status: 'pending', submitTime: '2026-05-24 16:45', description: '将产品图片压缩至WebP格式，添加懒加载功能，目标首屏加载时间<2秒', page: '/products_details/23.html' },
  { id: 'DW-202605004', title: '添加行业认证标识', type: '组件添加', priority: 'low', status: 'completed', submitTime: '2026-05-20 09:30', description: '在产品详情页底部添加ISO9001、CE等认证标识', page: '/products_details/23.html' },
]

type OrderFilter = 'all' | 'pending' | 'in_progress' | 'completed'

const priorityConfig = {
  critical: { label: '紧急', color: 'bg-red-100 text-red-700', order: 0 },
  high: { label: '高', color: 'bg-orange-100 text-orange-700', order: 1 },
  medium: { label: '中', color: 'bg-blue-100 text-blue-700', order: 2 },
  low: { label: '低', color: 'bg-gray-100 text-gray-700', order: 3 },
}

const statusConfig = {
  pending: { label: '待处理', color: 'bg-gray-100 text-gray-700' },
  in_progress: { label: '进行中', color: 'bg-blue-100 text-blue-700' },
  completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
}

export default function DesignWorkOrder() {
  const [orders, setOrders] = useState<WorkOrder[]>(workOrders)
  const [filter, setFilter] = useState<OrderFilter>('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null)
  const [newOrder, setNewOrder] = useState({ title: '', page: '', type: '', priority: 'medium', description: '' })

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const handleCreateOrder = () => {
    if (!newOrder.title || !newOrder.type) return
    const id = `DW-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(orders.length + 1).padStart(3, '0')}`
    const submitTime = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`
    setOrders([{ id, title: newOrder.title, type: newOrder.type, priority: newOrder.priority as Priority, status: 'pending', submitTime, description: newOrder.description, page: newOrder.page || '/' }, ...orders])
    setNewOrder({ title: '', page: '', type: '', priority: 'medium', description: '' })
    setShowModal(false)
  }

  const handleCloseOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'completed' as OrderStatus } : o))
  }

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    in_progress: orders.filter(o => o.status === 'in_progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
  }

  const filterTabs: { key: OrderFilter; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待处理' },
    { key: 'in_progress', label: '进行中' },
    { key: 'completed', label: '已完成' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">设计工单管理</h1>
            <p className="text-gray-500 mt-1">管理设计需求工单，追踪设计任务进度</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            新建工单
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">工单列表</h2>
          <div className="flex gap-2 mb-4">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === tab.key ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {tab.label} ({counts[tab.key]})
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">工单编号</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">标题</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">类型</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">优先级</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">提交时间</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs text-gray-600">{order.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{order.title}</td>
                    <td className="py-3 px-4 text-gray-600">{order.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig[order.priority].color}`}>
                        {priorityConfig[order.priority].label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{order.submitTime}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="查看">
                          <Eye className="w-4 h-4" />
                        </button>
                        {order.status === 'pending' && order.priority === 'high' && (
                          <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded" title="催办">
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        )}
                        {order.status !== 'completed' && (
                          <button onClick={() => handleCloseOrder(order.id)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="关闭">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">新建工单</h2>
                <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">工单标题 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newOrder.title}
                    onChange={e => setNewOrder({ ...newOrder, title: e.target.value })}
                    placeholder="请输入工单标题"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">关联页面</label>
                    <input
                      type="text"
                      value={newOrder.page}
                      onChange={e => setNewOrder({ ...newOrder, page: e.target.value })}
                      placeholder="输入页面URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">工单类型 <span className="text-red-500">*</span></label>
                    <select
                      value={newOrder.type}
                      onChange={e => setNewOrder({ ...newOrder, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">请选择类型</option>
                      <option value="页面设计">页面设计</option>
                      <option value="布局优化">布局优化</option>
                      <option value="组件添加">组件添加</option>
                      <option value="风格调整">风格调整</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                  <div className="flex gap-3">
                    {Object.entries(priorityConfig).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setNewOrder({ ...newOrder, priority: key })}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${newOrder.priority === key ? `${config.color} border-transparent` : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">需求描述</label>
                  <textarea
                    value={newOrder.description}
                    onChange={e => setNewOrder({ ...newOrder, description: e.target.value })}
                    placeholder="请详细描述设计需求..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">附件上传 (可选)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                    <Send className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">点击或拖拽文件到此区域上传</p>
                    <p className="text-xs text-gray-400 mt-1">支持 PNG, JPG, PDF 格式</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">取消</button>
                <button onClick={handleCreateOrder} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">提交工单</button>
              </div>
            </div>
          </div>
        )}

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">工单详情</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-1.5 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">工单编号</span>
                    <p className="font-mono text-sm font-medium">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">状态</span>
                    <div className="mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[selectedOrder.status].color}`}>
                        {statusConfig[selectedOrder.status].label}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">标题</span>
                  <p className="font-medium text-gray-900 mt-1">{selectedOrder.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">类型</span>
                    <p className="text-gray-900 mt-1">{selectedOrder.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">优先级</span>
                    <div className="mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig[selectedOrder.priority].color}`}>
                        {priorityConfig[selectedOrder.priority].label}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">关联页面</span>
                  <p className="text-blue-600 text-sm mt-1">{selectedOrder.page}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">提交时间</span>
                  <p className="text-gray-900 mt-1">{selectedOrder.submitTime}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">需求描述</span>
                  <p className="text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg">{selectedOrder.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
