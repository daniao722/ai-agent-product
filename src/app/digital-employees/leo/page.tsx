'use client';

import React from 'react';
import Sidebar from '@/components/digital-employees/Sidebar';
import Header from '@/components/digital-employees/Header';
import StatCard from '@/components/digital-employees/StatCard';
import ChatButton from '@/components/digital-employees/ChatButton';

export default function LeoPage() {
  const menuItems = [
    { icon: '📊', label: '概览仪表盘', href: '/digital-employees/leo' },
    { icon: '🎯', label: '采购商发掘', href: '/digital-employees/leo' },
    { icon: '✉️', label: '开发信管理', href: '/digital-employees/leo' },
    { icon: '🏷️', label: '线索管理', href: '/digital-employees/leo' },
    { icon: '📈', label: '效果分析', href: '/digital-employees/leo' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        employee="leo"
        name="Leo"
        role="海外业务开发经理"
        emoji="👨‍💼"
        gradient="bg-gradient-to-r from-orange-500 to-red-600"
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
                title="新增线索"
                value="47"
                subtitle="本月"
                trend="+12"
                trendType="positive"
                color="orange"
              />
              <StatCard 
                title="开发信发送"
                value="234"
                subtitle="本周"
                trend="+156"
                trendType="positive"
                color="red"
              />
              <StatCard 
                title="邮件回复率"
                value="↑2.1%"
                subtitle="较上周"
                trend="14.2%"
                trendType="positive"
                color="orange"
              />
              <StatCard 
                title="线索转化率"
                value="↑1.2%"
                subtitle="较上月"
                trend="8.5%"
                trendType="neutral"
                color="red"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">线索转化漏斗</h3>
                <div className="h-64 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-gray-500">线索转化漏斗（全渠道）</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent工作状态</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">✅ 采购商发掘Agent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">🔄 开发信生成中...</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">✅ EDM发送Agent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">✅ 线索打标Agent</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 新线索通知</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">John Smith</div>
                          <div className="text-xs text-gray-500">ABC Manufacturing - 采购经理</div>
                        </div>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">热线索</span>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Sarah Johnson</div>
                          <div className="text-xs text-gray-500">XYZ Corp - 供应链总监</div>
                        </div>
                        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">温线索</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ChatButton 
          employee="leo"
          name="Leo"
          gradient="bg-gradient-to-r from-orange-500 to-red-600"
        />
      </main>
    </div>
  );
}
