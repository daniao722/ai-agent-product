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
      case 'active':
        return 'bg-green-500';
      case 'working':
        return 'bg-blue-500 animate-pulse';
      case 'idle':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return '在线';
      case 'working':
        return '工作中';
      case 'idle':
        return '空闲';
      default:
        return '空闲';
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
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl text-white`}>
            {agent.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{agent.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
              <span className="text-xs text-gray-500">{getStatusText(agent.status)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs text-gray-500">
          {agent.description}
        </div>
      </div>

      {agent.metrics.length > 0 && (
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
          {agent.metrics.slice(0, 3).map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="text-sm font-bold text-gray-900">
                {metric.value}
                {metric.unit}
              </div>
              <div className="text-xs text-gray-500 truncate">{metric.name}</div>
              {metric.change && (
                <div className={`text-xs mt-1 ${metric.changeType === 'positive' ? 'text-green-600' : metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-400'}`}>
                  {metric.change}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
