import React from 'react';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  menuItems: MenuItem[];
}

export default function Sidebar({ activePage, setActivePage, menuItems }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-[calc(100vh-64px)]">
      <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">AI Agent</h2>
            <p className="text-white/80 text-xs">智能运营助手</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                isActive
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 font-medium border border-purple-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600">Agent在线工作中</span>
        </div>
        <div className="text-xs text-gray-400">v2.1.0</div>
      </div>
    </aside>
  );
}
