import { useState } from 'react'
import { Play, RotateCcw, Eye, Download, Zap, TrendingUp, Clock, BarChart3 } from 'lucide-react'

type TaskStatus = 'pending' | 'running' | 'completed' | 'rolledback'

interface OptimizationTask {
  id: number
  name: string
  type: string
  content: string
  status: TaskStatus
  url: string
}

const initialTasks: OptimizationTask[] = [
  { id: 1, name: '首屏CTA按钮添加', type: '系统配置', content: '在产品详情页首屏右侧添加"立即询价"按钮，使用品牌蓝色 #1E40AF', status: 'pending', url: '/products_details/23.html' },
  { id: 2, name: '表单字段精简', type: '表单优化', content: '将询盘表单从8个字段精简至5个：姓名、邮箱、电话、公司、留言内容', status: 'pending', url: '/contact' },
  { id: 3, name: 'CTA颜色对比度优化', type: '按钮样式', content: '将CTA按钮颜色从 #6B7280 调整为 #1E40AF，对比度提升至7.2:1', status: 'completed', url: '/products_details/23.html' },
  { id: 4, name: 'AI客服悬浮按钮', type: '系统配置', content: '在页面右下角添加智能客服悬浮按钮，支持多语言问候', status: 'completed', url: '/' },
  { id: 5, name: '表单验证优化', type: '表单优化', content: '添加实时邮箱格式验证和电话格式验证，减少无效提交', status: 'pending', url: '/contact' },
  { id: 6, name: '移动端CTA置顶', type: '按钮样式', content: '移动端首屏CTA按钮固定在屏幕底部，确保随时可见', status: 'completed', url: '/products_details/23.html' },
]

const optimizationHistory = [
  { id: 1, name: 'CTA颜色对比度优化', date: '2026-05-28 10:30', status: 'completed', operator: '系统' },
  { id: 2, name: 'AI客服悬浮按钮', date: '2026-05-27 16:15', status: 'completed', operator: '系统' },
  { id: 3, name: '移动端CTA置顶', date: '2026-05-27 09:45', status: 'completed', operator: '系统' },
  { id: 4, name: '添加Meta描述优化', date: '2026-05-26 14:20', status: 'completed', operator: '系统' },
  { id: 5, name: '表单字段优化(回滚)', date: '2026-05-25 11:00', status: 'rolledback', operator: '系统' },
]

const trackingData = [
  { metric: '表单转化率', before: '2.3%', after: '3.8%', change: '+65%' },
  { metric: 'CTA点击率', before: '1.8%', after: '3.2%', change: '+78%' },
  { metric: '页面停留时长', before: '45s', after: '62s', change: '+38%' },
  { metric: '跳出率', before: '68%', after: '52%', change: '-24%' },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending': return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">待执行</span>
    case 'running': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><Clock className="w-3 h-3 animate-pulse" />执行中</span>
    case 'completed': return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">已完成</span>
    case 'rolledback': return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">已回滚</span>
    default: return null
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case '系统配置': return <Zap className="w-4 h-4 text-blue-500" />
    case '按钮样式': return <TrendingUp className="w-4 h-4 text-purple-500" />
    case '表单优化': return <BarChart3 className="w-4 h-4 text-green-500" />
    default: return <Zap className="w-4 h-4 text-gray-500" />
  }
}

export default function AutoOptimization() {
  const [tasks, setTasks] = useState<OptimizationTask[]>(initialTasks)
  const [runningTaskId, setRunningTaskId] = useState<number | null>(null)

  const handleExecute = (id: number) => {
    setRunningTaskId(id)
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed' as TaskStatus } : t))
      setRunningTaskId(null)
    }, 2000)
  }

  const handleRollback = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'rolledback' as TaskStatus } : t))
  }

  const handleExecuteAll = () => {
    const pendingTasks = tasks.filter(t => t.status === 'pending')
    pendingTasks.forEach((task, index) => {
      setTimeout(() => {
        handleExecute(task.id)
      }, index * 2500)
    })
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length
  const pendingCount = tasks.filter(t => t.status === 'pending').length
  const rolledbackCount = tasks.filter(t => t.status === 'rolledback').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">一键优化管理</h1>
            <p className="text-gray-500 mt-1">自动化执行转化优化方案，追踪优化效果</p>
          </div>
          <button
            onClick={handleExecuteAll}
            disabled={pendingCount === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Zap className="w-4 h-4" />
            执行全部优化 ({pendingCount})
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">总任务数</div>
            <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">已完成</div>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">待执行</div>
            <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">已回滚</div>
            <div className="text-2xl font-bold text-red-600">{rolledbackCount}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">优化任务列表</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">任务名称</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">优化类型</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">优化内容</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">状态</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{task.name}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 text-gray-600">
                        {getTypeIcon(task.type)}
                        {task.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate" title={task.content}>{task.content}</td>
                    <td className="py-3 px-4">{getStatusBadge(runningTaskId === task.id ? 'running' : task.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {task.status === 'pending' && (
                          <button onClick={() => handleExecute(task.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="执行">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        {task.status === 'completed' && (
                          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded" title="预览">
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {(task.status === 'completed' || runningTaskId === task.id) && (
                          <button onClick={() => handleRollback(task.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="回滚">
                            <RotateCcw className="w-4 h-4" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">优化效果追踪</h2>
            <div className="space-y-4">
              {trackingData.map(item => (
                <div key={item.metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.metric}</div>
                    <div className="text-sm text-gray-500">优化前: {item.before} → 优化后: {item.after}</div>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">优化历史 (近7天)</h2>
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                <Download className="w-4 h-4" />
                导出
              </button>
            </div>
            <div className="space-y-3">
              {optimizationHistory.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.date} · {item.operator}</div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
