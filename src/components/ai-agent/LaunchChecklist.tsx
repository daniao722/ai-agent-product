'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChecklistTask, ChecklistStatus, ChecklistPhase, CHECKLIST_PHASES, INITIAL_CHECKLIST_TASKS } from '@/types/launch-checklist';

interface LaunchChecklistProps {
  onClose: () => void;
}

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

export default function LaunchChecklist({ onClose }: LaunchChecklistProps) {
  const [tasks, setTasks] = useState<ChecklistTask[]>(INITIAL_CHECKLIST_TASKS);
  const [expandedPhase, setExpandedPhase] = useState<ChecklistPhase | null>('foundation');
  const [showOnboarding, setShowOnboarding] = useState(true);

  const progress = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'completed' || t.status === 'manual').length;
    const total = tasks.length;
    return Math.round((completed / total) * 100);
  }, [tasks]);

  const pendingCount = useMemo(() => {
    return tasks.filter(t => t.status === 'pending' || t.status === 'warning').length;
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🚀</div>
              <div>
                <h2 className="text-2xl font-bold text-white">网站上线检查清单</h2>
                <p className="text-indigo-100">完成剩余任务，让您的网站更受搜索引擎青睐！</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">网站准备度</span>
              <span className="text-white font-bold text-xl">{progress}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence>
            {showOnboarding && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-800 mb-1">新手引导</h3>
                    <p className="text-blue-700 text-sm">建议从"基础配置"开始，按照顺序完成各个阶段的任务。</p>
                  </div>
                  <button
                    onClick={() => setShowOnboarding(false)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {CHECKLIST_PHASES.map((phase) => {
              const phaseTasks = getPhaseTasks(phase.id);
              const phaseCompleted = phaseTasks.filter(t => 
                t.status === 'completed' || t.status === 'manual'
              ).length;
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
                        <h3 className="font-semibold text-gray-900">{phase.name}</h3>
                        <p className="text-sm text-gray-500">{phase.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-600">
                        {phaseCompleted}/{phaseTasks.length}
                      </span>
                      <span className={`text-xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-3 bg-white">
                          {phaseTasks.map((task) => (
                            <div
                              key={task.id}
                              className={`p-4 rounded-lg border transition-all hover:shadow-md ${getStatusColor(task.status)}`}
                            >
                              <div className="flex items-start gap-4">
                                <button
                                  onClick={() => {
                                    if (task.isManual) {
                                      toggleTaskStatus(task.id, task.status === 'manual' ? 'pending' : 'manual');
                                    } else {
                                      toggleTaskStatus(task.id, task.status === 'completed' ? 'pending' : 'completed');
                                    }
                                  }}
                                  className="flex-shrink-0 mt-0.5"
                                >
                                  <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">
                                    {getStatusIcon(task.status)}
                                  </span>
                                </button>
                                
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{task.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                  
                                  <div className="mt-3 flex items-center gap-4 flex-wrap">
                                    <div className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
                                      💡 {task.tip}
                                    </div>
                                    
                                    {task.canSkip && (
                                      <button
                                        onClick={() => toggleTaskStatus(task.id, 'skipped')}
                                        className="text-xs text-gray-500 hover:text-gray-700"
                                      >
                                        稍后处理
                                      </button>
                                    )}
                                    
                                    {task.isManual && (
                                      <button
                                        onClick={() => toggleTaskStatus(task.id, 'manual')}
                                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                      >
                                        我已完成
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            还剩 <span className="font-semibold text-orange-600">{pendingCount}</span> 个待办任务
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            继续工作
          </button>
        </div>
      </motion.div>
    </div>
  );
}
