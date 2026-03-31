'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Overview from './Overview';
import KnowledgeBase from './KnowledgeBase';
import Chat from './Chat';
import Tasks from './Tasks';
import Settings from './Settings';

type ViewMode = 'normal' | 'ai-agent';
type ActivePage = 'overview' | 'knowledge' | 'chat' | 'tasks' | 'settings';

export default function AIAgentDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('ai-agent');
  const [activePage, setActivePage] = useState<ActivePage>('overview');

  const menuItems = [
    { id: 'overview' as ActivePage, icon: '📊', label: '概览' },
    { id: 'knowledge' as ActivePage, icon: '🧠', label: '知识库' },
    { id: 'chat' as ActivePage, icon: '💬', label: '对话' },
    { id: 'tasks' as ActivePage, icon: '📋', label: '任务中心' },
    { id: 'settings' as ActivePage, icon: '⚙️', label: '设置' },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <Overview />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'chat':
        return <Chat />;
      case 'tasks':
        return <Tasks />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏢</span>
                <span className="font-bold text-xl text-gray-900">数字门户</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('normal')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'normal'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  普通视图
                </button>
                <button
                  onClick={() => setViewMode('ai-agent')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === 'ai-agent'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>🤖</span>
                  AI Agent
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  🔔
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  管
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {viewMode === 'ai-agent' ? (
          <motion.div
            key="ai-agent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
            <Sidebar
              activePage={activePage}
              setActivePage={setActivePage}
              menuItems={menuItems}
            />
            <main className="flex-1 p-6 overflow-auto">
              {renderPage()}
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <span className="text-6xl mb-4 block">🔧</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">普通视图</h2>
              <p className="text-gray-600">点击上方"AI Agent"按钮体验智能运营助手</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
