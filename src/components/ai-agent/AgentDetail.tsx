'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';

interface AgentDetailProps {
  agent: Agent;
  onBack: () => void;
  onGoToConfig: () => void;
}

const sampleTasks = [
  { id: '1', title: '品牌内容策略制定', description: '分析当前品牌内容表现，制定Q2内容策略', status: 'in-progress' as const, progress: 65, createdAt: '2026-04-01 09:00:00', estimatedCompletion: '2026-04-01 11:00:00' },
  { id: '2', title: '竞品品牌分析', description: '分析主要竞争对手的品牌定位和内容策略', status: 'pending' as const, progress: 0, createdAt: '2026-04-01 11:00:00' },
];

const todayPlan = [
  { time: '09:00', task: '品牌内容策略制定' },
  { time: '11:00', task: '竞品品牌分析' },
  { time: '14:00', task: '品牌定位更新' },
  { time: '16:00', task: '内容日历规划' },
];

const taskHistory = [
  { id: 'h1', time: '2026-03-31 15:30', description: '品牌社交媒体形象优化', status: 'completed' as const, result: '优化完成，品牌形象统一度提升25%' },
  { id: 'h2', time: '2026-03-30 10:00', description: 'Q1品牌内容回顾分析', status: 'completed' as const, result: '分析完成，发现3个内容增长点' },
  { id: 'h3', time: '2026-03-29 14:00', description: '竞品品牌监测报告', status: 'completed' as const, result: '报告已生成，发现2个新竞品' },
];

export default function AgentDetail({ agent, onBack, onGoToConfig }: AgentDetailProps) {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      case 'maintenance':
        return 'bg-orange-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: Agent['status']) => {
    switch (status) {
      case 'running':
        return '运行中';
      case 'idle':
        return '待机';
      case 'offline':
        return '离线';
      case 'maintenance':
        return '维护中';
      default:
        return '离线';
    }
  };

  const getTaskStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '等待执行';
      case 'in-progress':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'failed':
        return '失败';
      default:
        return '未知';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-gray-500 bg-gray-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span>
          <span>返回</span>
        </button>
        <button
          onClick={onGoToConfig}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
        >
          <span>⚙️</span>
          <span>配置</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{agent.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{agent.name}</h1>
            <p className="text-white/80">{agent.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent状态概览</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} animate-pulse`} />
            <div>
              <div className="text-sm text-gray-500">运行状态</div>
              <div className="font-semibold text-gray-900">{getStatusText(agent.status)}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">启动时间</div>
            <div className="font-semibold text-gray-900">{agent.startTime}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">累计工作</div>
            <div className="font-semibold text-gray-900">{agent.totalWorkHours}小时</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 当前工作中任务</h3>
        <div className="space-y-4">
          {sampleTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium text-gray-900">{task.title}</div>
                  <div className="text-sm text-gray-500">{task.description}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                  {getTaskStatusText(task.status)}
                </span>
              </div>
              {task.status === 'in-progress' && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                    <span>进度</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                  {task.estimatedCompletion && (
                    <div className="text-xs text-gray-400 mt-1">
                      预计完成: {task.estimatedCompletion}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 今日工作计划</h3>
        <div className="space-y-3">
          {todayPlan.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-mono text-purple-600 w-16">{item.time}</span>
              <span className="text-gray-700">{item.task}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 本月任务统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{agent.monthlyCompleted}</div>
            <div className="text-sm text-gray-600">已完成</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{sampleTasks.filter(t => t.status === 'in-progress').length}</div>
            <div className="text-sm text-gray-600">进行中</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-600">{sampleTasks.filter(t => t.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">待执行</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{agent.successRate}%</div>
            <div className="text-sm text-gray-600">成功率</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📜 任务历史</h3>
        <div className="space-y-3">
          {taskHistory.map((task) => (
            <div key={task.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{task.time}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                    {getTaskStatusText(task.status)}
                  </span>
                </div>
                <div className="font-medium text-gray-900 mt-1">{task.description}</div>
                {task.result && (
                  <div className="text-sm text-gray-600 mt-1">{task.result}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
