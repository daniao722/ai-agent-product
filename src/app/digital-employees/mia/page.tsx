'use client';

import React from 'react';
import Sidebar from '@/components/digital-employees/Sidebar';
import Header from '@/components/digital-employees/Header';
import StatCard from '@/components/digital-employees/StatCard';
import ChatButton from '@/components/digital-employees/ChatButton';

export default function MiaPage() {
  const menuItems = [
    { icon: '📊', label: '概览仪表盘', href: '/digital-employees/mia' },
    { icon: '🏢', label: '品牌信息', href: '/digital-employees/mia' },
    { icon: '🔑', label: '关键词库', href: '/digital-employees/mia' },
    { icon: '📝', label: '内容创作', href: '/digital-employees/mia' },
    { icon: '📈', label: '数据复盘', href: '/digital-employees/mia' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        employee="mia"
        name="Mia"
        role="海外数字营销经理"
        emoji="👩‍💼"
        gradient="bg-gradient-to-r from-blue-500 to-purple-600"
        menuItems={menuItems}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="概览仪表盘" 
          backHref="/digital-employees"
        />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="网站流量"
                value="12,847"
                subtitle="较上月"
                trend="+28%"
                trendType="positive"
                color="blue"
              />
              <StatCard 
                title="询盘量"
                value="89"
                subtitle="较上月"
                trend="+15%"
                trendType="positive"
                color="purple"
              />
              <StatCard 
                title="关键词排名"
                value="47"
                subtitle="Top 100关键词"
                trend="↑12"
                trendType="neutral"
                color="blue"
              />
              <StatCard 
                title="内容产出"
                value="5/7"
                subtitle="已完成任务"
                trend="本周12篇"
                trendType="neutral"
                color="purple"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">趋势图表</h3>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <div className="text-gray-500">流量 & 询盘趋势（过去30天）</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent工作状态</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">✅ 品牌学习Agent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">✅ 关键词发掘Agent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">🔄 内容生成中...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">⏸️ 竞品监测Agent</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">待确认任务</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm text-gray-700">📝 优化3篇博客</span>
                      <button className="text-xs text-blue-600 hover:text-blue-700">确认</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm text-gray-700">📊 查看上周报告</span>
                      <button className="text-xs text-blue-600 hover:text-blue-700">确认</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ChatButton 
          employee="mia"
          name="Mia"
          gradient="bg-gradient-to-r from-blue-500 to-purple-600"
        />
      </main>
    </div>
  );
}
