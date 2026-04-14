'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChecklistTask, ChecklistStatus, ChecklistPhase, CHECKLIST_PHASES, INITIAL_CHECKLIST_TASKS, TaskIssue } from '@/types/launch-checklist';
import TaskDetailModal from './TaskDetailModal';
import ContentPublishModal from './ContentPublishModal';

const getStatusIcon = (status: ChecklistStatus) => {
  switch (status) {
    case 'completed':
      return '✅';
    case 'warning':
      return '⚠️';
    case 'skipped':
      return '➖';
    case 'manual':
      return '☑️';
    default:
      return '⬜';
  }
};

const getStatusColor = (status: ChecklistStatus) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'warning':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'skipped':
      return 'text-gray-400 bg-gray-50 border-gray-200';
    case 'manual':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-400 bg-white border-gray-200';
  }
};

const getIssueIcon = (type: TaskIssue['type']) => {
  switch (type) {
    case 'error':
      return '🔴';
    case 'warning':
      return '🟡';
    case 'info':
      return '🔵';
  }
};

export default function OperationGuide() {
  const [tasks, setTasks] = useState<ChecklistTask[]>(INITIAL_CHECKLIST_TASKS);
  const [expandedPhase, setExpandedPhase] = useState<ChecklistPhase | null>('foundation');
  const [selectedTask, setSelectedTask] = useState<ChecklistTask | null>(null);
  const [showContentPublish, setShowContentPublish] = useState(false);

  const progress = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'completed' || t.status === 'manual').length;
    const total = tasks.length;
    return Math.round((completed / total) * 100);
  }, [tasks]);

  const pendingCount = useMemo(() => {
    return tasks.filter(t => t.status === 'pending' || t.status === 'warning').length;
  }, [tasks]);

  const warningCount = useMemo(() => {
    return tasks.filter(t => t.status === 'warning').length;
  }, [tasks]);

  const toggleTaskStatus = (taskId: string, newStatus: ChecklistStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const togglePhase = (phase: ChecklistPhase) => {
    setExpandedPhase(prev => prev === phase ? null : phase);
  };

  const getPhaseTasks = (phaseId: ChecklistPhase) => {
    return tasks.filter(t => t.phase === phaseId);
  };

  const handleTaskClick = (task: ChecklistTask) => {
    if (task.issues && task.issues.length > 0) {
      setSelectedTask(task);
    } else if (task.jumpTo) {
      console.log('跳转到:', task.jumpTo);
    }
  };

  const handleAutoFix = (task: ChecklistTask) => {
    console.log('AI自动优化:', task.name);
    toggleTaskStatus(task.id, 'completed');
  };

  const handleJumpTo = (task: ChecklistTask) => {
    console.log('跳转到设置页面:', task.jumpTo);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">🚀 网站上线检查清单</h1>
        <p className="text-gray-600 mt-1">验证价值 &gt; 获取流量 &gt; 建立信任 - 按顺序完成以下任务</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">网站准备度</h3>
            <p className="text-gray-600 text-sm">完成剩余任务，让您的网站更受搜索引擎青睐！</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {progress}%
            </div>
            <div className="text-sm text-gray-500">
              {pendingCount} 个待办 · {warningCount} 个警告
            </div>
          </div>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        {CHECKLIST_PHASES.map((phase) => {
          const phaseTasks = getPhaseTasks(phase.id);
          const phaseCompleted = phaseTasks.filter(t => 
            t.status === 'completed' || t.status === 'manual'
          ).length;
          const phaseWarnings = phaseTasks.filter(t => t.status === 'warning').length;
          const isExpanded = expandedPhase === phase.id;
          
          return (
            <div key={phase.id} className="border rounded-xl overflow-hidden">
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{phase.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {phase.name}
                      {phaseWarnings > 0 && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          {phaseWarnings} 警告
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{phase.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-600">
                      {phaseCompleted}/{phaseTasks.length}
                    </div>
                    <div className="text-xs text-gray-400">
                      {Math.round((phaseCompleted / phaseTasks.length) * 100)}%
                    </div>
                  </div>
                  <span className={`text-xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>
              
              {isExpanded && (
                <div className="p-4 space-y-3 bg-white">
                  {phaseTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${getStatusColor(task.status)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <span className="text-2xl">{getStatusIcon(task.status)}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900">{task.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          
                          {task.issues && task.issues.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {task.issues.slice(0, 2).map((issue, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                  <span>{getIssueIcon(issue.type)}</span>
                                  <span className={issue.type === 'warning' ? 'text-yellow-700' : issue.type === 'error' ? 'text-red-700' : 'text-blue-700'}>
                                    {issue.message}
                                  </span>
                                </div>
                              ))}
                              {task.issues.length > 2 && (
                                <button
                                  onClick={() => setSelectedTask(task)}
                                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                  查看全部 {task.issues.length} 个问题 →
                                </button>
                              )}
                            </div>
                          )}
                          
                          <div className="mt-4 flex items-center gap-3 flex-wrap">
                            {task.jumpTo && (
                              <button
                                onClick={() => handleJumpTo(task)}
                                className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
                              >
                                <span>⚡</span>
                                一键跳转
                              </button>
                            )}
                            
                            {task.issues && task.issues.length > 0 && task.canAutoFix && (
                              <button
                                onClick={() => handleAutoFix(task)}
                                className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1.5"
                              >
                                <span>🤖</span>
                                AI 一键优化
                              </button>
                            )}
                            
                            {task.id === 'core-content' && (
                              <button
                                onClick={() => setShowContentPublish(true)}
                                className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1.5"
                              >
                                <span>📝</span>
                                启动内容发布任务
                              </button>
                            )}
                            
                            {task.isManual && (
                              <button
                                onClick={() => toggleTaskStatus(task.id, task.status === 'manual' ? 'pending' : 'manual')}
                                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                              >
                                <span>✓</span>
                                {task.status === 'manual' ? '取消确认' : '我已完成'}
                              </button>
                            )}
                            
                            {task.status !== 'completed' && task.status !== 'manual' && (
                              <button
                                onClick={() => toggleTaskStatus(task.id, 'skipped')}
                                className="px-3 py-1.5 text-gray-600 text-sm hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                稍后处理
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onAutoFix={handleAutoFix}
        />
      )}

      {showContentPublish && (
        <ContentPublishModal
          onClose={() => setShowContentPublish(false)}
        />
      )}
    </div>
  );
}
