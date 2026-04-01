import React, { useState } from 'react';
import { AGENTS, Agent } from '@/types/agent';

type SettingsView = 'general' | 'agents' | 'knowledge' | 'view';

export default function Settings() {
  const [currentView, setCurrentView] = useState<SettingsView>('agents');
  const [agents, setAgents] = useState<Agent[]>(AGENTS);
  const [autoAnalysis, setAutoAnalysis] = useState(true);
  const [analysisFrequency, setAnalysisFrequency] = useState('daily');
  const [autoExecute, setAutoExecute] = useState(false);
  const [language, setLanguage] = useState('zh');
  const [autoLearning, setAutoLearning] = useState(true);
  const [learningFrequency, setLearningFrequency] = useState('weekly');
  const [defaultView, setDefaultView] = useState('ai-agent');
  const [theme, setTheme] = useState('light');

  const toggleAgent = (agentId: string) => {
    setAgents(prev =>
      prev.map(agent =>
        agent.id === agentId
          ? { ...agent, enabled: !agent.enabled }
          : agent
      )
    );
  };

  const enableAllAgents = () => {
    setAgents(prev => prev.map(agent => ({ ...agent, enabled: true })));
  };

  const disableAllAgents = () => {
    setAgents(prev => prev.map(agent => ({ ...agent, enabled: false })));
  };

  const renderAgentsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">集成Agent列表</h2>
              <p className="text-sm text-gray-500">{agents.filter(a => a.enabled).length}/10 已启用</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={enableAllAgents}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
            >
              启用全部
            </button>
            <button
              onClick={disableAllAgents}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              禁用全部
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{agent.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{agent.name}</div>
                  <div className="text-sm text-gray-500">{agent.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  agent.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {agent.enabled ? '已启用' : '已禁用'}
                </div>
                <button
                  onClick={() => toggleAgent(agent.id)}
                  className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    agent.enabled ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      agent.enabled ? 'translate-x-8' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGeneralView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🤖</span>
          <h2 className="text-lg font-semibold text-gray-900">AI助手设置</h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">自动数据分析</h3>
              <p className="text-sm text-gray-500">定期自动分析网站运营数据</p>
            </div>
            <div className="ml-8">
              <button
                onClick={() => setAutoAnalysis(!autoAnalysis)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  autoAnalysis ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    autoAnalysis ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">分析频率</h3>
              <p className="text-sm text-gray-500">设置自动数据分析的频率</p>
            </div>
            <div className="ml-8">
              <select
                value={analysisFrequency}
                onChange={(e) => setAnalysisFrequency(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="daily">每天</option>
                <option value="weekly">每周</option>
                <option value="monthly">每月</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">自动执行任务</h3>
              <p className="text-sm text-gray-500">经用户确认后自动执行优化任务</p>
            </div>
            <div className="ml-8">
              <button
                onClick={() => setAutoExecute(!autoExecute)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  autoExecute ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    autoExecute ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">语言偏好</h3>
              <p className="text-sm text-gray-500">设置AI助手的交互语言</p>
            </div>
            <div className="ml-8">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKnowledgeView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🧠</span>
          <h2 className="text-lg font-semibold text-gray-900">知识库设置</h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">自动学习</h3>
              <p className="text-sm text-gray-500">自动从网站更新中学习新知识</p>
            </div>
            <div className="ml-8">
              <button
                onClick={() => setAutoLearning(!autoLearning)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  autoLearning ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    autoLearning ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">学习频率</h3>
              <p className="text-sm text-gray-500">设置自动学习的频率</p>
            </div>
            <div className="ml-8">
              <select
                value={learningFrequency}
                onChange={(e) => setLearningFrequency(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="daily">每天</option>
                <option value="weekly">每周</option>
                <option value="monthly">每月</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderViewSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">👁️</span>
          <h2 className="text-lg font-semibold text-gray-900">视图设置</h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">默认视图</h3>
              <p className="text-sm text-gray-500">设置登录后默认显示的视图</p>
            </div>
            <div className="ml-8">
              <select
                value={defaultView}
                onChange={(e) => setDefaultView(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="ai-agent">AI Agent视图</option>
                <option value="normal">普通视图</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">界面主题</h3>
              <p className="text-sm text-gray-500">选择您喜欢的界面主题</p>
            </div>
            <div className="ml-8">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="light">浅色</option>
                <option value="dark">深色</option>
                <option value="system">跟随系统</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">危险操作</h2>
          <p className="text-sm text-gray-500">重置所有设置和数据</p>
        </div>
        <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
          重置设置
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">⚙️ 设置</h1>
        <p className="text-gray-600 mt-1">配置AI Agent和系统偏好</p>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm p-1">
        <button
          onClick={() => setCurrentView('agents')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            currentView === 'agents'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🤖 Agent管理
        </button>
        <button
          onClick={() => setCurrentView('general')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            currentView === 'general'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🤖 AI助手设置
        </button>
        <button
          onClick={() => setCurrentView('knowledge')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            currentView === 'knowledge'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🧠 知识库设置
        </button>
        <button
          onClick={() => setCurrentView('view')}
          className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            currentView === 'view'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          👁️ 视图设置
        </button>
      </div>

      {currentView === 'agents' && renderAgentsView()}
      {currentView === 'general' && renderGeneralView()}
      {currentView === 'knowledge' && renderKnowledgeView()}
      {currentView === 'view' && renderViewSettings()}

      <div className="flex items-center justify-end gap-3">
        <button className="px-6 py-2 text-gray-600 hover:text-gray-800">
          取消
        </button>
        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity">
          保存设置
        </button>
      </div>
    </div>
  );
}
