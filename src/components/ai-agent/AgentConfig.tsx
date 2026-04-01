'use client';

import React, { useState } from 'react';
import { Agent } from '@/types/agent';

interface AgentConfigProps {
  agent: Agent;
  onBack: () => void;
}

const skills = [
  { id: 'skill1', name: '品牌定位分析', enabled: true },
  { id: 'skill2', name: '内容策略制定', enabled: true },
  { id: 'skill3', name: '竞品品牌监控', enabled: true },
  { id: 'skill4', name: '品牌素材制作', enabled: false },
];

export default function AgentConfig({ agent, onBack }: AgentConfigProps) {
  const [enabled, setEnabled] = useState(agent.enabled);
  const [agentName, setAgentName] = useState(agent.name);
  const [workMode, setWorkMode] = useState('auto');
  const [workTimeStart, setWorkTimeStart] = useState('08:00');
  const [workTimeEnd, setWorkTimeEnd] = useState('22:00');
  const [priority, setPriority] = useState('medium');
  const [autoExecute, setAutoExecute] = useState(true);
  const [requireConfirm, setRequireConfirm] = useState(false);
  const [maxConcurrent, setMaxConcurrent] = useState(3);
  const [taskTimeout, setTaskTimeout] = useState(2);
  const [notifyComplete, setNotifyComplete] = useState(true);
  const [notifyFail, setNotifyFail] = useState(true);
  const [dailyReport, setDailyReport] = useState(true);
  const [notificationMethods, setNotificationMethods] = useState<string[]>(['in-app']);
  const [enabledSkills, setEnabledSkills] = useState<string[]>(
    skills.filter(s => s.enabled).map(s => s.id)
  );

  const toggleSkill = (skillId: string) => {
    setEnabledSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const toggleNotificationMethod = (method: string) => {
    setNotificationMethods(prev =>
      prev.includes(method)
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleSave = () => {
    alert('配置已保存！');
  };

  const handleReset = () => {
    if (confirm('确定要重置为默认配置吗？')) {
      setEnabled(agent.enabled);
      setAgentName(agent.name);
      setWorkMode('auto');
      setWorkTimeStart('08:00');
      setWorkTimeEnd('22:00');
      setPriority('medium');
      setAutoExecute(true);
      setRequireConfirm(false);
      setMaxConcurrent(3);
      setTaskTimeout(2);
      setNotifyComplete(true);
      setNotifyFail(true);
      setDailyReport(true);
      setNotificationMethods(['in-app']);
      setEnabledSkills(skills.filter(s => s.enabled).map(s => s.id));
    }
  };

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
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{agent.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">⚙️ {agent.name}配置</h1>
            <p className="text-white/80">配置Agent的工作模式和参数</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🟢 Agent开关</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">{agent.name}</div>
            <div className="text-sm text-gray-500">{enabled ? '当前已启用' : '当前已禁用'}</div>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              enabled ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                enabled ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 基本配置</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent名称
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              工作模式
            </label>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="auto">自动</option>
              <option value="confirm">手动确认</option>
              <option value="suggest">仅建议</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                工作时间 - 开始
              </label>
              <input
                type="time"
                value={workTimeStart}
                onChange={(e) => setWorkTimeStart(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                工作时间 - 结束
              </label>
              <input
                type="time"
                value={workTimeEnd}
                onChange={(e) => setWorkTimeEnd(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              优先级
            </label>
            <div className="flex gap-4">
              {['high', 'medium', 'low'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    priority === p
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {p === 'high' ? '高' : p === 'medium' ? '中' : '低'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 任务配置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">自动执行</div>
              <div className="text-sm text-gray-500">启用后Agent将自动执行任务</div>
            </div>
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
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">执行确认</div>
              <div className="text-sm text-gray-500">每次执行前需要用户确认</div>
            </div>
            <button
              onClick={() => setRequireConfirm(!requireConfirm)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                requireConfirm ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  requireConfirm ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              最大并发任务数
            </label>
            <input
              type="number"
              value={maxConcurrent}
              onChange={(e) => setMaxConcurrent(parseInt(e.target.value))}
              min="1"
              max="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              任务超时时间（小时）
            </label>
            <input
              type="number"
              value={taskTimeout}
              onChange={(e) => setTaskTimeout(parseInt(e.target.value))}
              min="1"
              max="24"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 通知配置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">任务完成</div>
              <div className="text-sm text-gray-500">任务完成时发送通知</div>
            </div>
            <button
              onClick={() => setNotifyComplete(!notifyComplete)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                notifyComplete ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notifyComplete ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">任务失败</div>
              <div className="text-sm text-gray-500">任务失败时发送通知</div>
            </div>
            <button
              onClick={() => setNotifyFail(!notifyFail)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                notifyFail ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notifyFail ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">每日报告</div>
              <div className="text-sm text-gray-500">每天发送工作日报</div>
            </div>
            <button
              onClick={() => setDailyReport(!dailyReport)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                dailyReport ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  dailyReport ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              通知方式
            </label>
            <div className="flex gap-4">
              {[
                { id: 'in-app', label: '站内消息' },
                { id: 'email', label: '邮件' },
                { id: 'wechat', label: '微信' },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => toggleNotificationMethod(method.id)}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    notificationMethods.includes(method.id)
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🛠️ 技能配置</h3>
        <div className="space-y-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSkill(skill.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    enabledSkills.includes(skill.id) ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      enabledSkills.includes(skill.id) ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="font-medium text-gray-900">{skill.name}</span>
              </div>
              {!enabledSkills.includes(skill.id) && (
                <span className="text-sm text-gray-400">(可选项)</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          onClick={handleReset}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          重置为默认
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          保存配置
        </button>
      </div>
    </div>
  );
}
