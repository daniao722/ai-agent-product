import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts';
import AgentCard from './AgentCard';
import { AGENTS, Agent } from '@/types/agent';

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

type ViewMode = 'dashboard' | 'agents';

interface OverviewProps {
  onAgentClick?: (agent: Agent) => void;
}

export default function Overview({ onAgentClick }: OverviewProps) {
  const [language, setLanguage] = useState('zh');
  const [viewMode, setViewMode] = useState<ViewMode>('agents');

  const handleAgentClickInternal = (agent: Agent) => {
    if (onAgentClick) {
      onAgentClick(agent);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                v2.1.0
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
          onClick={() => setViewMode('agents')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'agents'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🤖 10大领域Agent
        </button>
        <button
          onClick={() => setViewMode('dashboard')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            viewMode === 'dashboard'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📊 运营数据
        </button>
      </div>

      {viewMode === 'agents' && (
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
              {AGENTS.slice(0, 5).map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={handleAgentClickInternal}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
              {AGENTS.slice(5, 10).map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={handleAgentClickInternal}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'dashboard' && (
        <div className="space-y-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">关键词排名 TOP10</h3>
              <div className="space-y-3">
                {keywordData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 font-medium w-6">#{index + 1}</span>
                      <div>
                        <div className="font-medium text-gray-900">{item.keyword}</div>
                        <div className="text-xs text-gray-500">
                          落地页: {item.landingPage}
                        </div>
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
        </div>
      )}
    </div>
  );
}
