import { useState } from 'react';

const PRIMARY = '#C9A227';

const menuConfig = [
  {
    id: 'content-overview',
    label: '内容概览',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
  },
  {
    id: 'asset',
    label: '内容资产库',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.12 15.88 0 13.3 0c-1.48 0-2.79.74-3.6 1.86L12 4.69l2.3-2.83C14.76 1.3 15.48 1 16.3 1c1.54 0 2.7 1.16 2.7 2.7 0 .7-.27 1.3-.7 1.3H4C2.9 5 2 5.9 2 7v13c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM11 17H9v-2H7v-2h2v-2h2v2h2v2h-2v2zm7-1h-4v-2h4v2zm0-4h-6v-2h6v2z" />
      </svg>
    ),
    children: [
      { id: 'asset/brand', label: '品牌故事' },
      { id: 'asset/product', label: '产品信息' },
      { id: 'asset/solution', label: '解决方案' },
      { id: 'asset/faq', label: 'FAQ 问答' },
      { id: 'asset/insight', label: '行业洞察' },
      { id: 'asset/integrity', label: '资产完整度', badge: 'New' },
    ],
  },
  {
    id: 'plan',
    label: '生成计划',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
    children: [
      { id: 'plan/weekly', label: '本周计划' },
      { id: 'plan/auto', label: '自动更新计划' },
      { id: 'plan/urgent', label: '时效内容识别', badge: 'New' },
      { id: 'plan/template', label: '行业模板库' },
    ],
  },
  {
    id: 'creation',
    label: 'AI 创作',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>
    ),
    children: [
      { id: 'creation/agent', label: '智能 Agent 对话', badge: 'AI' },
      { id: 'creation/translate', label: '多语言翻译' },
    ],
  },
  {
    id: 'optimize',
    label: '智能优化',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    ),
    children: [
      { id: 'optimize/diagnosis', label: '内容诊断报告', badge: 'New' },
      { id: 'optimize/suggestions', label: '优化建议' },
      { id: 'optimize/auto', label: '一键优化' },
      { id: 'optimize/abtest', label: 'A/B 测试' },
      { id: 'optimize/structure', label: '结构标准化' },
    ],
  },
  {
    id: 'distribution',
    label: '内容分发',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    ),
    children: [
      { id: 'distribution/social', label: '社媒同步' },
      { id: 'distribution/fission', label: '内容裂变', badge: 'New' },
      { id: 'distribution/schedule', label: '定时发布' },
    ],
  },
  {
    id: 'analytics',
    label: '效果分析',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
      </svg>
    ),
    children: [
      { id: 'analytics/overview', label: '数据总览' },
      { id: 'analytics/content', label: '内容表现' },
    ],
  },
  {
    id: 'brand',
    label: '品牌管理',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
    children: [
      { id: 'brand/guidelines', label: '品牌规范' },
      { id: 'brand/terminology', label: '专业术语库' },
    ],
  },
  {
    id: 'token',
    label: 'Token 管理',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
    children: [
      { id: 'token/quota', label: '额度管理' },
    ],
  },
];

export default function ContentSidebar({ currentPage, onNavigate }) {
  const [expanded, setExpanded] = useState({
    asset: false,
    plan: true,
    creation: true,
    optimize: false,
    distribution: false,
    analytics: false,
    brand: false,
    token: false,
  });

  const toggleSection = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (id) => currentPage === id;
  const isChildActive = (item) =>
    item.children && item.children.some((c) => c.id === currentPage);

  return (
    <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #C9A227, #A07820)' }}
          >
            内
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800 leading-tight">内容智能中心</div>
            <div className="text-xs text-gray-400">AI Content Hub</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {menuConfig.map((item) => {
          if (!item.children) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive(item.id)
                    ? 'text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
                style={isActive(item.id) ? { backgroundColor: PRIMARY } : {}}
              >
                <span className={isActive(item.id) ? 'text-white' : 'text-gray-400'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          }

          return (
            <div key={item.id}>
              <button
                onClick={() => toggleSection(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isChildActive(item)
                    ? 'text-gray-800 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span
                  className={isChildActive(item) ? '' : 'text-gray-400'}
                  style={isChildActive(item) ? { color: PRIMARY } : {}}
                >
                  {item.icon}
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-3 h-3 text-gray-400 transition-transform ${
                    expanded[item.id] ? 'rotate-180' : ''
                  }`}
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>

              {expanded[item.id] && (
                <div className="ml-6 mt-0.5 space-y-0.5">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => onNavigate(child.id)}
                      className={`w-full flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg text-xs transition-all ${
                        isActive(child.id)
                          ? 'font-medium'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                      style={
                        isActive(child.id)
                          ? { color: PRIMARY, backgroundColor: '#FBF5E0' }
                          : {}
                      }
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: isActive(child.id) ? PRIMARY : '#D1D5DB' }}
                      />
                      <span className="flex-1 text-left">{child.label}</span>
                      {child.badge && (
                        <span
                          className="text-white text-xs px-1 py-0.5 rounded font-bold leading-none"
                          style={{ backgroundColor: PRIMARY, fontSize: '9px' }}
                        >
                          {child.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 px-3 py-3 mt-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
            李
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-700 truncate">李明 (管理员)</div>
            <div className="text-xs text-gray-400">3,000 豆子余额</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
