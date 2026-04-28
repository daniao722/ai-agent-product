'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';
import { getStatusColor, getStatusText } from '@/lib/agent-utils';

interface AgentCardProps {
  agent: Agent;
  onClick: (agent: Agent) => void;
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
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
            <h3 className="font-semibold text-gray-900 text-sm">{agent.displayName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
              <span className="text-xs text-gray-500">{getStatusText(agent.status)}</span>
              {agent.position === '运营主管' && (
                <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                  主管
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-purple-600 font-medium">"{agent.mission}"</p>
        <p className="text-xs text-gray-500 mt-1">{agent.description}</p>
      </div>

      {agent.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
          {agent.metrics.slice(0, 4).map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="text-sm font-bold text-gray-900">
                {metric.value}
                {metric.unit}
              </div>
              <div className="text-xs text-gray-500 truncate">{metric.name}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{agent.subAgents.length}个子Agent</span>
          <span>{agent.subAgents.reduce((acc, sa) => acc + sa.skills.length, 0)}个Skills</span>
        </div>
      </div>
    </motion.div>
  );
}
