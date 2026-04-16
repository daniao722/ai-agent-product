'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AGENTS_DATA, VALUE_METRICS, BUSINESS_DATA, AgentData, ValueMetric } from '@/types/value-dashboard';

export default function ValueDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'value'>('overview');

  const frontAgents = AGENTS_DATA.filter(a => a.position === 'front');
  const backAgents = AGENTS_DATA.filter(a => a.position === 'back');

  const getCategoryColor = (category: ValueMetric['category']) => {
    switch (category) {
      case 'cost':
        return 'from-red-500 to-pink-600';
      case 'efficiency':
        return 'from-blue-500 to-cyan-600';
      case 'revenue':
        return 'from-green-500 to-emerald-600';
      case 'capability':
        return 'from-purple-500 to-violet-600';
    }
  };

  const getCategoryIcon = (category: ValueMetric['category']) => {
    switch (category) {
      case 'cost':
        return '💰';
      case 'efficiency':
        return '⚡';
      case 'revenue':
        return '📈';
      case 'capability':
        return '💪';
    }
  };

  const getStatusColor = (status: AgentData['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'working':
        return 'bg-blue-500 animate-pulse';
      case 'idle':
        return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🚀 数智增长仪表盘</h1>
          <p className="text-gray-600 mt-1">从"数字化建设者"到"数智增长合伙人"的完整价值链条</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: '数据概览', icon: '📊' },
            { id: 'agents', label: 'AI团队', icon: '🤖' },
            { id: 'value', label: '价值成果', icon: '🎯' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                label: '月度营收', 
                value: `¥${(BUSINESS_DATA.revenue.current / 10000).toFixed(0)}万`,
                change: `+${BUSINESS_DATA.revenue.growth}%`,
                icon: '💰',
                color: 'from-green-500 to-emerald-600'
              },
              { 
                label: '本月线索', 
                value: BUSINESS_DATA.leads.current,
                change: `+${BUSINESS_DATA.leads.growth}%`,
                icon: '🎯',
                color: 'from-blue-500 to-cyan-600'
              },
              { 
                label: '转化率', 
                value: `${BUSINESS_DATA.conversion.rate}%`,
                change: `+${BUSINESS_DATA.conversion.improvement}%`,
                icon: '📈',
                color: 'from-purple-500 to-violet-600'
              },
              { 
                label: '响应时间', 
                value: BUSINESS_DATA.responseTime.current,
                change: BUSINESS_DATA.responseTime.improvement,
                icon: '⚡',
                color: 'from-orange-500 to-amber-600'
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </span>
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                </div>
                <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 营收趋势</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={BUSINESS_DATA.revenue.trend}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      formatter={(value: number) => [`¥${(value / 10000).toFixed(1)}万`, '营收']}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 4+2 AI 智能团队</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🎯</span>
                    <h4 className="font-semibold text-gray-900">前台业务流（开源）</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {frontAgents.map((agent, idx) => (
                      <div key={agent.id} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center text-white text-sm`}>
                          {agent.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{agent.name}</div>
                          <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}></span>
                            <span className="text-xs text-gray-500">
                              {agent.status === 'active' ? '在线' : agent.status === 'working' ? '工作中' : '空闲'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🏭</span>
                    <h4 className="font-semibold text-gray-900">后台支撑流（提效）</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {backAgents.map((agent, idx) => (
                      <div key={agent.id} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center text-white text-sm`}>
                          {agent.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{agent.name}</div>
                          <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}></span>
                            <span className="text-xs text-gray-500">
                              {agent.status === 'active' ? '在线' : agent.status === 'working' ? '工作中' : '空闲'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'agents' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {AGENTS_DATA.map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedAgent(agent)}
                className="cursor-pointer"
              >
                <div className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-indigo-200 ${
                  selectedAgent?.id === agent.id ? 'border-indigo-500 shadow-lg' : ''
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-3xl shadow-lg`}>
                        {agent.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-500">{agent.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></span>
                      <span className="text-sm text-gray-600">
                        {agent.status === 'active' ? '在线' : agent.status === 'working' ? '工作中' : '空闲'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {agent.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">{metric.value}{metric.unit}</div>
                        <div className="text-xs text-gray-500 mt-1">{metric.name}</div>
                        {metric.change && (
                          <div className={`text-xs mt-1 ${metric.changeType === 'positive' ? 'text-green-600' : metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'}`}>
                            {metric.change}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">最近活动</h4>
                    <div className="space-y-2">
                      {agent.recentActivities.slice(0, 2).map((activity, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-sm">
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{activity.action}</span>
                          <span className="text-gray-400 ml-auto">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedAgent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAgent(null)} />
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
                <div className={`p-6 bg-gradient-to-r ${selectedAgent.color}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">
                        {selectedAgent.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
                        <p className="text-white/80">{selectedAgent.description}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedAgent(null)} className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">核心指标</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedAgent.metrics.map((metric, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-xl text-center">
                          <div className="text-2xl font-bold text-gray-900">{metric.value}{metric.unit}</div>
                          <div className="text-sm text-gray-600 mt-1">{metric.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">关键职责</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedAgent.keyResponsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <span className="text-indigo-500">✓</span>
                          <span className="text-gray-700">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">最近活动</h3>
                    <div className="space-y-3">
                      {selectedAgent.recentActivities.map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-gray-400 text-sm whitespace-nowrap">{activity.time}</div>
                          <div className="flex-1">
                            <div className="text-gray-900 font-medium">{activity.action}</div>
                            {activity.result && <div className="text-sm text-gray-500 mt-1">{activity.result}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {activeTab === 'value' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-4">
              <span className="text-5xl">💎</span>
              <div>
                <h2 className="text-2xl font-bold">客户价值成果</h2>
                <p className="text-indigo-100 mt-1">对比使用前后的真实价值提升</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUE_METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(metric.category)} flex items-center justify-center text-2xl`}>
                    {getCategoryIcon(metric.category)}
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    +{metric.improvement}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{metric.description}</p>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">使用前</div>
                    <div className="text-lg font-medium text-gray-400 line-through">{metric.beforeValue}</div>
                  </div>
                  <div className="text-2xl text-gray-300">→</div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">使用后</div>
                    <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 ROI 测算</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">传统方式（5人团队）</span>
                  <span className="text-xl font-bold text-gray-400 line-through">¥75万/年</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">我们的方案（专业版）</span>
                  <span className="text-xl font-bold text-green-600">¥39,999/年</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg">
                  <span className="font-medium">年节省成本</span>
                  <span className="text-2xl font-bold">¥71万+ (95%)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 核心价值</h3>
              <div className="space-y-3">
                {[
                  { icon: '🏷️', title: '降低成本', desc: '虚拟团队替代5个专业岗位，年节省80-150万' },
                  { icon: '⚡', title: '提升效率', desc: '7×24h工作，响应速度从"天"级降到"分钟"级' },
                  { icon: '📈', title: '增长收入', desc: '线索转化率提升30-50%，营销ROI提升50-100%' },
                  { icon: '💪', title: '沉淀能力', desc: '数据和知识沉淀在自己手里，不依赖"能人"' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
