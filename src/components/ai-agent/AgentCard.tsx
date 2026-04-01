'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
  onClick: (agent: Agent) => void;
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
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

  const getWorkStatusText = (workStatus: Agent['workStatus']) => {
    switch (workStatus) {
      case 'working':
        return '工作中';
      case 'idle':
        return '空闲';
      case 'waiting':
        return '等待确认';
      case 'paused':
        return '已暂停';
      default:
        return '空闲';
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

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(agent)}
      className="bg-white rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{agent.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{agent.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)} animate-pulse`} />
              <span className="text-xs text-gray-500">{getStatusText(agent.status)}</span>
            </div>
          </div>
        </div>
      </div>

      {agent.currentTask && (
        <div className="mb-3">
          <div className="text-xs text-purple-600 font-medium mb-1">
            {getWorkStatusText(agent.workStatus)}
          </div>
          <div className="text-xs text-gray-600 truncate">
            {agent.currentTask}
          </div>
          {agent.currentTaskProgress !== undefined && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.currentTaskProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                />
              </div>
              <div className="text-xs text-gray-400 mt-1 text-right">
                {agent.currentTaskProgress}%
              </div>
            </div>
          )}
        </div>
      )}

      {!agent.currentTask && (
        <div className="mb-3">
          <div className="text-xs text-gray-500">
            {getWorkStatusText(agent.workStatus)}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{agent.todayTasks}</div>
          <div className="text-xs text-gray-500">今日任务</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{agent.monthlyCompleted}</div>
          <div className="text-xs text-gray-500">本月完成</div>
        </div>
      </div>
    </motion.div>
  );
}
