'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import AgentCard from './AgentCard';
import { AGENTS_DATA, VALUE_METRICS, BUSINESS_DATA, Agent } from '@/types/agent';

const trafficData = Array.from({ length: 30 }, (_, i) => ({
  date: `3/${i + 1}`,
  uv: Math.floor(Math.random() * 500) + 1000,
  pv: Math.floor(Math.random() * 1000) + 2000,
}));

const keywordData = [
  { keyword: '工业自动化设备', rank: 3, change: 'up', traffic: 1250, landingPage: '/products/automation' },
  { keyword: '智能机器人', rank: 7, change: 'up', traffic: 890, landingPage: '/products/robots' },
  { keyword: '工业机器人', rank: 12, change: 'down', traffic: 654, landingPage: '/products/industrial' },
  { keyword: '智能工厂解决方案', rank: 15, change: 'up', traffic: 520, landingPage: '/solutions/factory' },
  { keyword: '工业4.0设备', rank: 18, change: 'same', traffic: 410, landingPage: '/solutions/industry4' },
];

const funnelData = [
  { name: '访客', value: 15000, fill: '#6366f1' },
  { name: '浏览', value: 8500, fill: '#8b5cf6' },
  { name: '咨询', value: 2300, fill: '#a855f7' },
  { name: '留资', value: 780, fill: '#c084fc' },
  { name: '线索', value: 230, fill: '#d8b4fe' },
];

type ViewMode = 'overview' | 'agents' | 'value';

export default function ValueDashboard({ onAgentClick }: { onAgentClick?: (agent: Agent) => void }) {
  const [language, setLanguage] = useState('zh');
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  
  const handleAgentClick = (agent: Agent) => {
    if (onAgentClick) {
      onAgentClick(agent);
    }
  };

  const frontAgents = AGENTS_DATA.filter(a => a.position === 'front');
  const backAgents = AGENTS_DATA.filter(a => a.position === 'back');

  const getCategoryColor = (category: string) => {
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

  const getCategoryIcon = (category: string) => {
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

  const getStatusColor = (status: string) => {
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
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
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

      <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm p-1">
        <button
          onClick={() => setViewMode('overview')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'overview'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📊 数据概览
        </button>
        <button
          onClick={() => setViewMode('agents')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'agents'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🤖 AI团队
        </button>
        <button
          onClick={() => setViewMode('value')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'value'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🎯 价值成果
        </button>
      </div>

      {viewMode === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">内容发布</span>
                <span className="text-green-500 text-sm font-medium">+12%</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-500 mt-1">本周发布</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">页面总数</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">328</div>
              <div className="text-sm text-gray-500 mt-1">活跃页面</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">百度收录</span>
                <span className="text-blue-500 text-sm font-medium">+8%</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">215</div>
              <div className="text-sm text-gray-500 mt-1">已收录页面</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm">Google收录</span>
                <span className="text-green-500 text-sm font-medium">+15%</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">189</div>
              <div className="text-sm text-gray-500 mt-1">已收录页面</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">网站流量趋势（近30天）</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
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
                    <div className="text-2xl font-bold text-green-600">12%</div>
                    <div className="text-sm text-gray-600">转化率</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    热门问题: "产品价格是多少？"
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">流量到线索转化漏斗</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <FunnelChart>
                      <Funnel data={funnelData} dataKey="value">
                        <LabelList position="right" fill="#fff" stroke="none" dataKey="name" />
                        <LabelList position="center" fill="#fff" stroke="none" dataKey="value" fontSize={14} fontWeight="bold" />
                      </Funnel>
                      <Tooltip />
                    </FunnelChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">关键词排名 TOP10</h3>
            <div className="space-y-3">
              {keywordData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 font-medium w-6">#{index + 1}</span>
                    <div>
                      <div className="font-medium text-gray-900">{item.keyword}</div>
                      <div className="text-xs text-gray-500">落地页: {item.landingPage}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-gray-900">#{item.rank}</div>
                      <div className="text-xs text-gray-500">{item.traffic} 流量</div>
                    </div>
                    <span className={`text-lg ${
                      item.change === 'up' ? 'text-green-500' : 
                      item.change === 'down' ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {item.change === 'up' ? '↑' : item.change === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 4+2 AI智能团队</h3>
              <div className="space-y-6">
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

      {viewMode === 'agents' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  🤖 10大领域Agent工作状态
                </h2>
                <span className="text-sm text-gray-500">
                  点击任意Agent卡片进入详情页面
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {AGENTS_DATA.slice(0, 5).map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onClick={handleAgentClick}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
                {AGENTS_DATA.slice(5, 10).map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onClick={handleAgentClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'value' && (
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
