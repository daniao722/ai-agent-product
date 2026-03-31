import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'attention';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  estimatedTime?: string;
  steps?: string[];
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: '优化高跳出率页面',
    description: '优化 3 个跳出率超过 70% 的落地页',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2026-03-30 10:00',
    estimatedTime: '2小时',
    steps: ['分析页面问题', '优化内容结构', '改善CTA设计', 'A/B测试验证'],
  },
  {
    id: '2',
    title: '更新博客内容',
    description: '更新 5 篇老旧博客文章',
    status: 'pending',
    priority: 'medium',
    createdAt: '2026-03-30 09:30',
    estimatedTime: '3小时',
  },
  {
    id: '3',
    title: '调整关键词策略',
    description: '重新优化 10 个核心关键词布局',
    status: 'pending',
    priority: 'high',
    createdAt: '2026-03-30 09:00',
    estimatedTime: '1.5小时',
  },
  {
    id: '4',
    title: '生成月度运营报告',
    description: '自动生成 3 月份运营分析报告',
    status: 'completed',
    priority: 'medium',
    createdAt: '2026-03-29 18:00',
  },
  {
    id: '5',
    title: '检查网站安全',
    description: '发现安全漏洞，需要立即处理',
    status: 'attention',
    priority: 'high',
    createdAt: '2026-03-29 15:00',
  },
];

const statusLabels = {
  pending: { label: '待执行', color: 'text-gray-600', bg: 'bg-gray-100' },
  'in-progress': { label: '进行中', color: 'text-blue-600', bg: 'bg-blue-100' },
  completed: { label: '已完成', color: 'text-green-600', bg: 'bg-green-100' },
  attention: { label: '需关注', color: 'text-red-600', bg: 'bg-red-100' },
};

const priorityLabels = {
  high: { label: '高', color: 'text-red-600', bg: 'bg-red-50' },
  medium: { label: '中', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  low: { label: '低', color: 'text-green-600', bg: 'bg-green-50' },
};

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'attention'>('all');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = activeTab === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === activeTab);

  const getStatusCount = (status: Task['status']) => 
    tasks.filter(task => task.status === status).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📋 任务中心</h1>
          <p className="text-gray-600 mt-1">管理和追踪所有运营任务</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
          <span>+</span> 新建任务
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusLabels).map(([status, config]) => (
          <button
            key={status}
            onClick={() => setActiveTab(status as any)}
            className={`p-4 rounded-xl border-2 transition-all ${
              activeTab === status
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <div className={`text-3xl font-bold ${config.color}`}>
              {status === 'all' ? tasks.length : getStatusCount(status as Task['status'])}
            </div>
            <div className={`text-sm font-medium ${config.color}`}>
              {status === 'all' ? '全部任务' : config.label}
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              全部
            </button>
            {Object.entries(statusLabels).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setActiveTab(status as any)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === status ? config.bg : ''
                } ${config.color}`}
              >
                {config.label}
              </button>
            ))}
          </div>
          <div className="divide-y">
            {filteredTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedTask?.id === task.id ? 'bg-purple-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityLabels[task.priority].bg} ${priorityLabels[task.priority].color}`}>
                        {priorityLabels[task.priority].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>🕐 {task.createdAt}</span>
                      {task.estimatedTime && <span>⏱️ {task.estimatedTime}</span>}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusLabels[task.status].bg} ${statusLabels[task.status].color}`}>
                    {statusLabels[task.status].label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {selectedTask ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{selectedTask.title}</h2>
                <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusLabels[selectedTask.status].bg} ${statusLabels[selectedTask.status].color}`}>
                  {statusLabels[selectedTask.status].label}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityLabels[selectedTask.priority].bg} ${priorityLabels[selectedTask.priority].color}`}>
                  {priorityLabels[selectedTask.priority].label}优先级
                </span>
              </div>

              <p className="text-gray-600 mb-6">{selectedTask.description}</p>

              {selectedTask.steps && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">执行步骤</h3>
                  <div className="space-y-2">
                    {selectedTask.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {selectedTask.status === 'pending' && (
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                    开始执行
                  </button>
                )}
                {selectedTask.status === 'in-progress' && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    标记完成
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  编辑
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <span className="text-4xl mb-4 block">📋</span>
              <p className="text-gray-500">选择一个任务查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
