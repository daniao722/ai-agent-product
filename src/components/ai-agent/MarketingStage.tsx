'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MarketingData } from '@/types/value-chain';

interface MarketingStageProps {
  data: MarketingData;
  onBack: () => void;
}

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

export default function MarketingStage({ data, onBack }: MarketingStageProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span>←</span>
        <span>返回价值链总览</span>
      </button>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-5xl">📣</span>
          <div>
            <h1 className="text-2xl font-bold">营销获客</h1>
            <p className="text-white/80">多渠道营销触达，高效获取潜在客户</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">获客线索</div>
          <div className="text-3xl font-bold text-gray-900">{data.leads}</div>
          <div className="text-sm text-green-600 mt-1">+12.5% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">转化率</div>
          <div className="text-3xl font-bold text-gray-900">{data.conversionRate}%</div>
          <div className="text-sm text-green-600 mt-1">+1.8% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">活跃活动</div>
          <div className="text-3xl font-bold text-gray-900">{data.campaignCount}</div>
          <div className="text-sm text-blue-600 mt-1">进行中</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">广告投入</div>
          <div className="text-3xl font-bold text-gray-900">¥{data.adSpend.toLocaleString()}</div>
          <div className="text-sm text-blue-600 mt-1">本月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">ROI</div>
          <div className="text-3xl font-bold text-gray-900">{data.roi}x</div>
          <div className="text-sm text-green-600 mt-1">+0.3x 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">获客成本</div>
          <div className="text-3xl font-bold text-gray-900">¥{(data.adSpend / data.leads).toFixed(0)}</div>
          <div className="text-sm text-red-600 mt-1">+¥15 较上月</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 渠道效果分析</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.channelPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ channel, percent }) => `${channel} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="leads"
                >
                  {data.channelPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔝 热门营销活动</h3>
          <div className="space-y-4">
            {data.topCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-blue-500 text-2xl">📣</span>
                  <div>
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-xs text-gray-500">投入: ¥{campaign.cost.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{campaign.leads}</div>
                  <div className="text-xs text-gray-500">获客线索</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 营销优化建议</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">🚀</span>
              <div>
                <div className="font-medium text-blue-800">加大内容营销投入</div>
                <div className="text-sm text-blue-700 mt-1">内容营销渠道转化率最高(18.5%)，建议增加内容产出</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">🎯</span>
              <div>
                <div className="font-medium text-green-800">优化搜索引擎渠道</div>
                <div className="text-sm text-green-700 mt-1">搜索引擎获客最多，建议优化SEO策略和SEM投放</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-yellow-600 text-xl">📱</span>
              <div>
                <div className="font-medium text-yellow-800">提升社交媒体转化</div>
                <div className="text-sm text-yellow-700 mt-1">社交媒体转化率偏低(9.8%)，建议优化投放内容和定向</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-purple-600 text-xl">👥</span>
              <div>
                <div className="font-medium text-purple-800">拓展推荐引流</div>
                <div className="text-sm text-purple-700 mt-1">推荐引流ROI最高，建议设计推荐激励机制</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
