'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import AgentCard from './AgentCard';
import { AGENTS_DATA, VALUE_METRICS, BUSINESS_DATA, Agent } from '@/types/agent';
import { getStatusColor, getStatusText, getSkillStatusColor } from '@/lib/agent-utils';

const trafficData = Array.from({ length: 30 }, (_, i) => ({
  date: `4/${i + 1}`,
  uv: Math.floor(Math.random() * 500) + 1000,
  pv: Math.floor(Math.random() * 1000) + 2000,
}));

const funnelData = [
  { name: '访客', value: 15000, fill: '#8b5cf6' },
  { name: '浏览', value: 8500, fill: '#3b82f6' },
  { name: '咨询', value: 2300, fill: '#10b981' },
  { name: '留资', value: 780, fill: '#f59e0b' },
  { name: '线索', value: 230, fill: '#ec4899' },
];

type ViewMode = 'overview' | 'team' | 'value' | 'agent-detail';

export default function ValueDashboard({ onAgentClick }: { onAgentClick?: (agent: Agent) => void }) {
  const [language, setLanguage] = useState('zh');
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setViewMode('agent-detail');
    if (onAgentClick) {
      onAgentClick(agent);
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
          onClick={() => setViewMode('overview')}
          className={`flex-1 min-w-max px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'overview'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📊 数据概览
        </button>
        <button
          onClick={() => setViewMode('team')}
          className={`flex-1 min-w-max px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'team'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          👥 AI团队（5大数字员工）
        </button>
        <button
          onClick={() => setViewMode('value')}
          className={`flex-1 min-w-max px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'value'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          💰 商业价值
        </button>
      </div>

      {viewMode === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: '月度营收', value: `¥${(BUSINESS_DATA.revenue.current / 10000).toFixed(0)}万`, change: `+${BUSINESS_DATA.revenue.growth}%`, icon: '💰', color: 'from-green-500 to-emerald-600' },
              { label: '本月线索', value: BUSINESS_DATA.leads.current, change: `+${BUSINESS_DATA.leads.growth}%`, icon: '🎯', color: 'from-blue-500 to-cyan-600' },
              { label: '转化率', value: `${BUSINESS_DATA.conversion.rate}%`, change: `+${BUSINESS_DATA.conversion.improvement}%`, icon: '📈', color: 'from-purple-500 to-violet-600' },
              { label: '响应时间', value: BUSINESS_DATA.responseTime.current, change: BUSINESS_DATA.responseTime.improvement, icon: '⚡', color: 'from-orange-500 to-amber-600' },
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

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">👩‍💼 Ada · 运营主管 - 团队总览</h3>
            <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-3xl text-white shadow-lg">
                    {adaAgent.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{adaAgent.displayName}</h4>
                    <p className="text-sm text-gray-600">{adaAgent.mission}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(adaAgent.status)}`}></span>
                      <span className="text-xs text-gray-500">{getStatusText(adaAgent.status)} · 运营主管</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAgentClick(adaAgent)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  查看详情
                </button>
              </div>

              <div className="border-t border-pink-100 pt-4">
                <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                  <span>📋 协调的团队成员：</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {teamAgents.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => handleAgentClick(agent)}
                      className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center text-lg text-white`}>
                        {agent.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{agent.name}</div>
                        <div className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(agent.status)}`}></span>
                          <span className="text-xs text-gray-500">{agent.mission.substring(0, 6)}...</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">📈 营收趋势</h4>
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

              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">🔄 业务闭环流程</h4>
                <div className="space-y-3">
                  {[
                    { agent: 'Mia', mission: '把人引来', color: 'from-purple-500 to-indigo-600', icon: '🚀' },
                    { agent: 'Coco', mission: '让人留下', color: 'from-blue-500 to-cyan-600', icon: '✍️' },
                    { agent: 'Leo', mission: '让人下单', color: 'from-green-500 to-emerald-600', icon: '💼' },
                    { agent: 'Sara', mission: '让人信任', color: 'from-orange-500 to-amber-600', icon: '🤝' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-lg`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.agent}</div>
                        <div className="text-xs text-gray-500">{item.mission}</div>
                      </div>
                      {idx < 3 && <span className="text-gray-300 text-lg">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">网站流量趋势（近30天）</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="uv" stroke="#6366f1" strokeWidth={2} dot={false} name="UV" />
                    <Line type="monotone" dataKey="pv" stroke="#8b5cf6" strokeWidth={2} dot={false} name="PV" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">智能客服接待数据</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">128</div>
                    <div className="text-sm text-gray-600">今日接待</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">35%</div>
                    <div className="text-sm text-gray-600">留资率</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">9.2%</div>
                    <div className="text-sm text-gray-600">转化率</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">流量到线索转化漏斗</h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    {/* 简化的漏斗展示 */}
                    <div className="space-y-2">
                      {funnelData.map((item, idx) => (
                        <div key={idx} className="relative">
                          <div 
                            className="h-8 rounded flex items-center justify-between px-4 text-white text-sm font-medium"
                            style={{ 
                              width: `${100 - idx * 18}%`,
                              marginLeft: `${idx * 9}%`,
                              backgroundColor: item.fill 
                            }}
                          >
                            <span>{item.name}</span>
                            <span>{item.value.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ResponsiveContainer>
                </div>
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
                <p className="text-white/80">对应真实公司组织架构 · 一支完整的官网运营团队</p>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-3 mt-6">
              {AGENTS_DATA.map((agent, idx) => (
                <div key={agent.id} className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-2 ${agent.position === '运营主管' ? 'ring-2 ring-white' : ''}`}>
                    {agent.icon}
                  </div>
                  <div className="font-bold text-sm">{agent.name}</div>
                  <div className="text-xs text-white/70">{agent.position === '运营主管' ? '运营主管' : agent.mission.substring(0, 4)}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 text-center text-sm text-white/70">
              {'真实岗位成本：¥80-130万/年 → AI数字员工：< 10% 成本'}
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
                onClick={() => handleAgentClick(agent)}
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
                          <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                            运营主管
                          </span>
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
                          {metric.change} · 目标{metric.target}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">子Agent架构（{agent.subAgents.length}个）</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {agent.subAgents.map((subAgent, sIdx) => (
                      <div key={sIdx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{subAgent.icon}</span>
                          <span className="text-sm font-medium text-gray-900">{subAgent.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {subAgent.skills.slice(0, 3).map((skill, skIdx) => (
                            <span key={skIdx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white rounded text-xs text-gray-600">
                              <span className={`w-1.5 h-1.5 rounded-full ${getSkillStatusColor(skill.status)}`}></span>
                              {skill.description.substring(0, 6)}...
                            </span>
                          ))}
                          {subAgent.skills.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-200 rounded text-xs text-gray-500">
                              +{subAgent.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {viewMode === 'value' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-4">
              <span className="text-5xl">💰</span>
              <div>
                <h2 className="text-2xl font-bold">商业价值总览</h2>
                <p className="text-green-100 mt-1">5个AI数字员工 = 一支完整的官网运营团队</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">真实岗位 vs AI数字员工 成本对比</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">真实岗位</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">年薪成本</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">AI数字员工</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">核心使命</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">节省比例</th>
                  </tr>
                </thead>
                <tbody>
                  {VALUE_METRICS.map((metric, idx) => (
                    <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{metric.realJobTitle}</td>
                      <td className="py-3 px-4 text-red-500 line-through">{metric.realSalary}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-purple-600">{metric.agentName}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{metric.agentMission}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1 bg-green-100 text-green-700 font-medium rounded-full">
                          {metric.savingRatio}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold">
                    <td className="py-3 px-4">合计</td>
                    <td className="py-3 px-4 text-red-600">¥80-130万/年</td>
                    <td className="py-3 px-4 text-green-600">5大AI数字员工</td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-center"><span className="px-3 py-1 bg-green-500 text-white rounded-full">&gt;90%</span></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 核心价值</h3>
              <div className="space-y-3">
                {[
                  { icon: '🏷️', title: '降低成本', desc: '虚拟团队替代5个专业岗位，年节省90%+' },
                  { icon: '⚡', title: '提升效率', desc: '7×24h工作，响应速度从"天"级降到"分钟"级' },
                  { icon: '📈', title: '增长收入', desc: '询盘转化率提升30-50%，营销ROI提升50-100%' },
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

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 典型协同场景</h3>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-1">场景1：新品上线</h4>
                  <p className="text-sm text-gray-600">老板对Ada说："新品XX上线了" → Ada统筹Coco写内容 → Mia优化SEO → Leo准备报价 → Sara更新FAQ</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-1">场景2：询盘转化</h4>
                  <p className="text-sm text-gray-600">Mia引流 → Coco内容承接 → Sara即时解答 → Leo报价谈判 → Ada数据分析优化</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-1">场景3：数据驱动优化</h4>
                  <p className="text-sm text-gray-600">Ada发现异常 → 调度Coco创作内容 → Mia调整SEO → 持续监控转化率变化</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'agent-detail' && selectedAgent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewMode('overview')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>←</span>
              <span>返回概览</span>
            </button>
          </div>

          <div className={`bg-gradient-to-r ${selectedAgent.color} rounded-xl p-6 text-white`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                  {selectedAgent.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedAgent.displayName}</h1>
                  <p className="text-white/80">{selectedAgent.description}</p>
                  <p className="text-white/90 font-medium mt-2">"{selectedAgent.mission}"</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(selectedAgent.status)}`}></span>
                      {getStatusText(selectedAgent.status)}
                    </span>
                    <span>·</span>
                    <span>{selectedAgent.position}</span>
                    <span>·</span>
                    <span className="line-through text-white/60">{selectedAgent.realJobSalary}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 核心指标</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedAgent.metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-900">{metric.value}{metric.unit}</div>
                    <div className="text-sm text-gray-600 mt-1">{metric.name}</div>
                    {metric.change && (
                      <div className={`text-xs mt-2 ${metric.changeType === 'positive' ? 'text-green-600' : metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-400'}`}>
                        {metric.change} · 目标{metric.target}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 核心职责</h3>
              <div className="space-y-3">
                {selectedAgent.keyResponsibilities.map((resp, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
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
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔧 子Agent与Skills架构（{selectedAgent.subAgents.length}个子Agent · {selectedAgent.subAgents.reduce((acc, sa) => acc + sa.skills.length, 0)}个Skills）</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedAgent.subAgents.map((subAgent, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center text-xl">
                      {subAgent.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{subAgent.name}</h4>
                      <span className="text-xs text-gray-500">{subAgent.skills.length}个Skills</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {subAgent.skills.map((skill, skIdx) => (
                      <div key={skIdx} className="flex items-center justify-between p-2 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getSkillStatusColor(skill.status)}`}></span>
                          <span className="text-sm text-gray-700">{skill.description}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          skill.status === 'active' ? 'bg-green-100 text-green-700' :
                          skill.status === 'working' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {skill.status === 'active' ? '运行中' : skill.status === 'working' ? '执行中' : '待命'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🕐 最近活动</h3>
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
        </motion.div>
      )}
    </div>
  );
}
