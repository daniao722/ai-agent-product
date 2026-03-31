import React, { useState } from 'react';

export default function Settings() {
  const [autoAnalysis, setAutoAnalysis] = useState(true);
  const [analysisFrequency, setAnalysisFrequency] = useState('daily');
  const [autoExecute, setAutoExecute] = useState(false);
  const [language, setLanguage] = useState('zh');
  const [autoLearning, setAutoLearning] = useState(true);
  const [learningFrequency, setLearningFrequency] = useState('weekly');
  const [defaultView, setDefaultView] = useState('ai-agent');
  const [theme, setTheme] = useState('light');

  const settingsSections = [
    {
      title: 'AI助手设置',
      icon: '🤖',
      items: [
        {
          label: '自动数据分析',
          description: '定期自动分析网站运营数据',
          type: 'toggle',
          value: autoAnalysis,
          onChange: setAutoAnalysis,
        },
        {
          label: '分析频率',
          description: '设置自动数据分析的频率',
          type: 'select',
          value: analysisFrequency,
          onChange: setAnalysisFrequency,
          options: [
            { label: '每天', value: 'daily' },
            { label: '每周', value: 'weekly' },
            { label: '每月', value: 'monthly' },
          ],
        },
        {
          label: '自动执行任务',
          description: '经用户确认后自动执行优化任务',
          type: 'toggle',
          value: autoExecute,
          onChange: setAutoExecute,
        },
        {
          label: '语言偏好',
          description: '设置AI助手的交互语言',
          type: 'select',
          value: language,
          onChange: setLanguage,
          options: [
            { label: '中文', value: 'zh' },
            { label: 'English', value: 'en' },
            { label: '日本語', value: 'ja' },
          ],
        },
      ],
    },
    {
      title: '知识库设置',
      icon: '🧠',
      items: [
        {
          label: '自动学习',
          description: '自动从网站更新中学习新知识',
          type: 'toggle',
          value: autoLearning,
          onChange: setAutoLearning,
        },
        {
          label: '学习频率',
          description: '设置自动学习的频率',
          type: 'select',
          value: learningFrequency,
          onChange: setLearningFrequency,
          options: [
            { label: '每天', value: 'daily' },
            { label: '每周', value: 'weekly' },
            { label: '每月', value: 'monthly' },
          ],
        },
      ],
    },
    {
      title: '视图设置',
      icon: '👁️',
      items: [
        {
          label: '默认视图',
          description: '设置登录后默认显示的视图',
          type: 'select',
          value: defaultView,
          onChange: setDefaultView,
          options: [
            { label: 'AI Agent视图', value: 'ai-agent' },
            { label: '普通视图', value: 'normal' },
          ],
        },
        {
          label: '界面主题',
          description: '选择您喜欢的界面主题',
          type: 'select',
          value: theme,
          onChange: setTheme,
          options: [
            { label: '浅色', value: 'light' },
            { label: '深色', value: 'dark' },
            { label: '跟随系统', value: 'system' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">⚙️ 设置</h1>
        <p className="text-gray-600 mt-1">配置AI Agent和系统偏好</p>
      </div>

      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{section.icon}</span>
            <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
          </div>
          <div className="space-y-6">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="ml-8">
                  {item.type === 'toggle' && (
                    <button
                      onClick={() => item.onChange(!item.value)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.value ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          item.value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  )}
                  {item.type === 'select' && item.options && (
                    <select
                      value={item.value}
                      onChange={(e) => item.onChange(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      {item.options.map((option, optIndex) => (
                        <option key={optIndex} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">危险操作</h2>
          <p className="text-sm text-gray-500">重置所有设置和数据</p>
        </div>
        <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
          重置设置
        </button>
      </div>

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
