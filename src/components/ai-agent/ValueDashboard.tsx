'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { VALUE_PROPOSITIONS, ValueProposition } from '@/types/value-proposition';
import { AGENTS_DATA, Agent, BUSINESS_DATA } from '@/types/agent';

type ViewMode = 'value-overview' | 'value-detail' | 'team' | 'pricing';

export default function ValueDashboard({ onAgentClick }: { onAgentClick?: (agent: Agent) => void }) {
  const [language, setLanguage] = useState('zh');
  const [viewMode, setViewMode] = useState<ViewMode>('value-overview');
  const [selectedValue, setSelectedValue] = useState<ValueProposition | null>(null);

  const handleValueClick = (vp: ValueProposition) => {
    setSelectedValue(vp);
    setViewMode('value-detail');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'working': return 'bg-blue-500 animate-pulse';
      case 'idle': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '在线';
      case 'working': return '工作中';
      case 'idle': return '空闲';
      default: return '空闲';
    }
  };

  const adaAgent = AGENTS_DATA.find(a => a.id === 'ada')!;
  const teamAgents = AGENTS_DATA.filter(a => a.id !== 'ada');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                数字门户全球营销版 v2.1.0
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-1">科技有限公司</h1>
            <p className="text-white/80 mb-3">www.example.com</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                运行中
              </span>
              <span>有效期: 2026-12-31</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <span>🌐</span>
              <span className="text-sm">{language === 'zh' ? '中文' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm p-1 overflow-x-auto">
        <button
          onClick={() => setViewMode('value-overview')}
          className={`flex-1 min-w-max px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'value-overview'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          💎 产品价值
        </button>
        <button
          onClick={() => setViewMode('team')}
          className={`flex-1 min-w-max px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'team'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          👥 AI团队
        </button>
        <button
          onClick={() => setViewMode('pricing')}
          className={`flex-1 min-w-max px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'pricing'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          💰 版本与定价
        </button>
      </div>

      {viewMode === 'value-overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">💎</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">客户价值驱动的产品体系</h2>
                <p className="text-sm text-gray-600">基于您的业务痛点，选择需要解决的核心价值</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              我们的底座是一个可以满足全链条客户价值的产品，您可以为不同的产品价值买单，产品会根据您购买的价值用对应的产品能力来支撑实现。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUE_PROPOSITIONS.map((vp, idx) => (
              <motion.div
                key={vp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleValueClick(vp)}
                className="cursor-pointer"
              >
                <div className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-indigo-200 h-full flex flex-col ${!vp.enabled ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${vp.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {vp.icon}
                    </div>
                    {vp.enabled ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">已开通</span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">未开通</span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">{vp.name}</h3>
                  <p className="text-sm font-medium text-purple-600 mb-2">"{vp.tagline}"</p>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{vp.painPoint}</p>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">量化价值</span>
                      <span className="font-bold text-green-600">{vp.quantifiedValue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">支撑能力</span>
                      <span className="text-gray-700">{vp.capabilities.length}个AI数字员工</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">版本</span>
                      <span className="font-medium text-indigo-600">{vp.pricing.name}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 营收趋势</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={BUSINESS_DATA.revenue.trend}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} />
                    <YAxis stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `${(v/10000).toFixed(0)}万`} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} formatter={(v: number) => [`¥${(v/10000).toFixed(1)}万`, '营收']} />
                    <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 价值实现路径</h3>
              <div className="space-y-3">
                {[
                  { step: '1', label: '识别痛点', desc: '基于客户业务场景识别核心痛点', icon: '🔍' },
                  { step: '2', label: '选择价值', desc: '客户选择需要解决的核心产品价值', icon: '💎' },
                  { step: '3', label: '激活能力', desc: '产品激活对应的AI数字员工和Skills', icon: '⚡' },
                  { step: '4', label: '价值交付', desc: 'AI团队协同工作，持续交付业务价值', icon: '🎯' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'value-detail' && selectedValue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <button
            onClick={() => setViewMode('value-overview')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span>←</span>
            <span>返回产品价值</span>
          </button>

          <div className={`bg-gradient-to-r ${selectedValue.color} rounded-xl p-6 text-white`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                  {selectedValue.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedValue.name}</h1>
                  <p className="text-white/90 font-medium">"{selectedValue.tagline}"</p>
                  <p className="text-white/70 text-sm mt-2">{selectedValue.painPoint}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{selectedValue.quantifiedValue}</div>
                <div className="text-white/70 text-sm">量化价值</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 价值指标（使用前 vs 使用后）</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedValue.metrics.map((metric, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-xs text-gray-500 mb-2">{metric.name}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-gray-400 line-through">{metric.before}</span>
                    <span className="text-gray-300">→</span>
                    <span className="text-green-600 font-medium">+{metric.improvement}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">目标: {metric.target}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 价值实现路径（AI数字员工支撑）</h3>
            <div className="space-y-4">
              {selectedValue.capabilities.map((cap, idx) => {
                const agent = AGENTS_DATA.find(a => a.id === cap.agentId);
                return (
                  <div key={idx} className="p-5 bg-gray-50 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent?.color || 'from-gray-400 to-gray-500'} flex items-center justify-center text-2xl text-white shadow`}>
                        {cap.agentIcon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900">{cap.agentName}</h4>
                          {idx === 0 && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">核心驱动</span>}
                          {idx > 0 && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">支撑</span>}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{cap.contribution}</p>
                        <div className="flex flex-wrap gap-2">
                          {cap.subAgents.map((sa, saIdx) => (
                            <span key={saIdx} className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 shadow-sm">
                              {sa}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{selectedValue.pricing.name}</h3>
                <p className="text-sm text-gray-600">{selectedValue.pricing.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{selectedValue.pricing.price}</div>
                <div className="text-sm text-gray-500">/{selectedValue.pricing.period}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-200">
              <div className="flex flex-wrap gap-2">
                {selectedValue.pricing.included.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white rounded-full text-xs text-green-700 shadow-sm">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'team' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🏢</span>
              <div>
                <h2 className="text-2xl font-bold">5大AI数字员工团队</h2>
                <p className="text-white/80">产品价值的实现路径 · 对应真实公司组织架构</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3 mt-6">
              {AGENTS_DATA.map((agent) => (
                <div key={agent.id} className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-2 ${agent.position === '运营主管' ? 'ring-2 ring-white' : ''}`}>
                    {agent.icon}
                  </div>
                  <div className="font-bold text-sm">{agent.name}</div>
                  <div className="text-xs text-white/70">{agent.mission.substring(0, 4)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {AGENTS_DATA.map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onAgentClick && onAgentClick(agent)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-3xl text-white shadow-lg`}>
                      {agent.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{agent.displayName}</h3>
                        {agent.position === '运营主管' && (
                          <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">运营主管</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{agent.description}</p>
                      <p className="text-sm font-medium text-purple-600 mt-1">"{agent.mission}"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">对应真实岗位</div>
                      <div className="text-sm font-medium text-gray-700">{agent.realJobTitle}</div>
                      <div className="text-xs text-red-500 line-through">{agent.realJobSalary}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  {agent.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{metric.value}{metric.unit}</div>
                      <div className="text-xs text-gray-500">{metric.name}</div>
                      {metric.change && (
                        <div className={`text-xs mt-1 ${metric.changeType === 'positive' ? 'text-green-600' : metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-400'}`}>
                          {metric.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">支撑的产品价值</h4>
                  <div className="flex flex-wrap gap-2">
                    {VALUE_PROPOSITIONS.filter(vp => vp.capabilities.some(c => c.agentId === agent.id)).map(vp => (
                      <span key={vp.id} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${vp.color} text-white`}>
                        {vp.icon} {vp.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {viewMode === 'pricing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-4">
              <span className="text-5xl">💰</span>
              <div>
                <h2 className="text-2xl font-bold">按价值付费，按需激活</h2>
                <p className="text-green-100 mt-1">为解决的业务痛点买单，产品自动激活对应能力</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUE_PROPOSITIONS.map((vp, idx) => (
              <motion.div
                key={vp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 ${vp.id === 'global-expansion' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-transparent'}`}
              >
                {vp.id === 'global-expansion' && (
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    ⭐ 推荐方案 · 最受欢迎
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${vp.color} flex items-center justify-center text-2xl`}>
                      {vp.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{vp.pricing.name}</h3>
                      <p className="text-xs text-gray-500">{vp.tagline}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">{vp.pricing.price}</span>
                      <span className="text-gray-500">/{vp.pricing.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{vp.pricing.description}</p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {vp.pricing.included.map((item, iIdx) => (
                      <div key={iIdx} className="flex items-center gap-2 text-sm">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-xs text-gray-500 mb-2">解决的核心痛点：</div>
                    <p className="text-sm text-gray-600">{vp.painPoint}</p>
                  </div>

                  <button className={`w-full mt-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    vp.id === 'global-expansion'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {vp.enabled ? '已开通' : '立即开通'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 价值对比：真实岗位 vs AI数字员工</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">产品价值</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">真实岗位成本</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">AI方案</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">节省</th>
                  </tr>
                </thead>
                <tbody>
                  {VALUE_PROPOSITIONS.map((vp, idx) => (
                    <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span>{vp.icon}</span>
                          <span className="font-medium text-gray-900">{vp.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-red-500 line-through">
                        {vp.capabilities.map(c => c.agentId).filter((v, i, a) => a.indexOf(v) === i).map(id => AGENTS_DATA.find(a => a.id === id)?.realJobSalary).join(' + ')}
                      </td>
                      <td className="py-3 px-4 font-medium text-green-600">{vp.pricing.price}/{vp.pricing.period}</td>
                      <td className="py-3 px-4 text-center"><span className="px-3 py-1 bg-green-100 text-green-700 font-medium rounded-full">&gt;90%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
