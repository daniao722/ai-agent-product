'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';
import { getStatusColor, getStatusText, getTaskStatusColor } from '@/lib/agent-utils';

interface AgentDetailProps {
  agent: Agent;
  onBack: () => void;
  onGoToConfig: () => void;
}

export default function AgentDetail({ agent, onBack, onGoToConfig }: AgentDetailProps) {
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

      <div className={`bg-gradient-to-r ${agent.color} rounded-xl p-6 text-white`}>
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
            <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
            <div>
              <div className="text-sm text-gray-500">运行状态</div>
              <div className="font-semibold text-gray-900">{getStatusText(agent.status)}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">位置</div>
            <div className="font-semibold text-gray-900">{agent.position === 'front' ? '前台业务流' : '后台支撑流'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">类型</div>
            <div className="font-semibold text-gray-900">{agent.position === 'front' ? '开源类' : '提效类'}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 核心指标</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {agent.metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="text-2xl font-bold text-gray-900">{metric.value}{metric.unit}</div>
              <div className="text-sm text-gray-600">{metric.name}</div>
              {metric.change && (
                <div className={`text-xs mt-2 ${metric.changeType === 'positive' ? 'text-green-600' : metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-400'}`}>
                  {metric.change}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 关键职责</h3>
        <div className="space-y-3">
          {agent.keyResponsibilities.map((resp, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">{resp.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{resp.description}</p>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <span>✓</span>
                <span>{resp.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🕐 最近活动</h3>
        <div className="space-y-3">
          {agent.recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="text-gray-400 text-sm whitespace-nowrap">{activity.time}</div>
              <div className="flex-1">
                <div className="text-gray-900 font-medium">{activity.action}</div>
                {activity.result && (
                  <div className="text-sm text-gray-500 mt-1">{activity.result}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
