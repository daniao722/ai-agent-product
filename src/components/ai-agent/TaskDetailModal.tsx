'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChecklistTask } from '@/types/launch-checklist';

interface TaskDetailModalProps {
  task: ChecklistTask;
  onClose: () => void;
  onAutoFix?: (task: ChecklistTask) => void;
}

const getIssueIcon = (type: 'error' | 'warning' | 'info') => {
  switch (type) {
    case 'error':
      return '🔴';
    case 'warning':
      return '🟡';
    case 'info':
      return '🔵';
  }
};

const getIssueBg = (type: 'error' | 'warning' | 'info') => {
  switch (type) {
    case 'error':
      return 'bg-red-50 border-red-200';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200';
    case 'info':
      return 'bg-blue-50 border-blue-200';
  }
};

const getIssueTextColor = (type: 'error' | 'warning' | 'info') => {
  switch (type) {
    case 'error':
      return 'text-red-800';
    case 'warning':
      return 'text-yellow-800';
    case 'info':
      return 'text-blue-800';
  }
};

export default function TaskDetailModal({ task, onClose, onAutoFix }: TaskDetailModalProps) {
  return (
    <AnimatePresence>
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
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">⚠️</div>
                <div>
                  <h2 className="text-xl font-bold text-white">{task.name}</h2>
                  <p className="text-indigo-100 text-sm">{task.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {task.issues && task.issues.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">检测到 {task.issues.length} 个问题</h3>
                
                {task.issues.map((issue, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getIssueBg(issue.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{getIssueIcon(issue.type)}</span>
                      <div className="flex-1">
                        <h4 className={`font-medium ${getIssueTextColor(issue.type)}`}>
                          {issue.type === 'error' ? '错误' : issue.type === 'warning' ? '警告' : '提示'}
                        </h4>
                        <p className={`mt-1 ${getIssueTextColor(issue.type)}`}>
                          {issue.message}
                        </p>
                        {issue.suggestion && (
                          <div className="mt-3 p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-2 text-sm">
                              <span>💡</span>
                              <span className="font-medium text-gray-700">修复建议：</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{issue.suggestion}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 flex items-center gap-2">
                <span>🔧</span>
                系统自动检测逻辑
              </h4>
              <p className="text-sm text-gray-600 mt-2">{task.checkLogic}</p>
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              关闭
            </button>
            <div className="flex items-center gap-3">
              {task.jumpTo && (
                <button
                  onClick={() => {
                    console.log('跳转到:', task.jumpTo);
                    onClose();
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <span>⚡</span>
                  一键跳转
                </button>
              )}
              {task.canAutoFix && onAutoFix && (
                <button
                  onClick={() => {
                    onAutoFix(task);
                    onClose();
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <span>🤖</span>
                  AI 一键优化
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
