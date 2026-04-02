'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ServiceData } from '@/types/value-chain';

interface ServiceStageProps {
  data: ServiceData;
  onBack: () => void;
}

export default function ServiceStage({ data, onBack }: ServiceStageProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span>←</span>
        <span>返回价值链总览</span>
      </button>

      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-5xl">💬</span>
          <div>
            <h1 className="text-2xl font-bold">服务支持</h1>
            <p className="text-white/80">提供优质服务，提升客户满意度，促进客户留存</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">服务工单</div>
          <div className="text-3xl font-bold text-gray-900">{data.tickets}</div>
          <div className="text-sm text-blue-600 mt-1">本月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">客户满意度</div>
          <div className="text-3xl font-bold text-gray-900">{data.satisfactionScore.toFixed(1)}分</div>
          <div className="text-sm text-green-600 mt-1">+0.3分 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">平均响应时间</div>
          <div className="text-3xl font-bold text-gray-900">{data.resolutionTime}小时</div>
          <div className="text-sm text-green-600 mt-1">-0.5小时 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">重复咨询率</div>
          <div className="text-3xl font-bold text-gray-900">{data.repeatRate}%</div>
          <div className="text-sm text-green-600 mt-1">-1.2% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">客户留存率</div>
          <div className="text-3xl font-bold text-gray-900">{data.customerRetention}%</div>
          <div className="text-sm text-green-600 mt-1">+1.5% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">首问解决率</div>
          <div className="text-3xl font-bold text-gray-900">78.5%</div>
          <div className="text-sm text-green-600 mt-1">+2.8% 较上月</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 满意度趋势</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.satisfactionTrend}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis domain={[4, 5]} stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="score" name="满意度" stroke="#f97316" fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🏷️ 工单分类</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ticketCategories}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="category" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🌟 服务优化建议</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-orange-600 text-xl">🤖</span>
              <div>
                <div className="font-medium text-orange-800">扩大智能客服覆盖</div>
                <div className="text-sm text-orange-700 mt-1">产品咨询工单最多，建议优化智能客服FAQ</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">📚</span>
              <div>
                <div className="font-medium text-blue-800">完善技术文档</div>
                <div className="text-sm text-blue-700 mt-1">技术支持工单较多，建议完善产品使用文档</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">💝</span>
              <div>
                <div className="font-medium text-green-800">主动客户关怀</div>
                <div className="text-sm text-green-700 mt-1">建立定期回访机制，提升客户满意度</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-purple-600 text-xl">📣</span>
              <div>
                <div className="font-medium text-purple-800">重视用户反馈</div>
                <div className="text-sm text-purple-700 mt-1">建立反馈闭环，快速响应和改进产品</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
