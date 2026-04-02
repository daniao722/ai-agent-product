'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BrandData } from '@/types/value-chain';

interface BrandStageProps {
  data: BrandData;
  onBack: () => void;
}

export default function BrandStage({ data, onBack }: BrandStageProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span>←</span>
        <span>返回价值链总览</span>
      </button>

      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-5xl">🎯</span>
          <div>
            <h1 className="text-2xl font-bold">品牌认知</h1>
            <p className="text-white/80">建立品牌知名度和美誉度，提升市场影响力</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">品牌认知度</div>
          <div className="text-3xl font-bold text-gray-900">{data.awareness}%</div>
          <div className="text-sm text-green-600 mt-1">+5.2% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">品牌综合得分</div>
          <div className="text-3xl font-bold text-gray-900">{data.brandScore}</div>
          <div className="text-sm text-green-600 mt-1">+3.1 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">品牌提及数</div>
          <div className="text-3xl font-bold text-gray-900">{data.mentions.toLocaleString()}</div>
          <div className="text-sm text-green-600 mt-1">+12.3% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">品牌情感指数</div>
          <div className="text-3xl font-bold text-gray-900">{data.sentiment}%</div>
          <div className="text-sm text-green-600 mt-1">+2.1% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">内容发布数</div>
          <div className="text-3xl font-bold text-gray-900">{data.contentPublished}</div>
          <div className="text-sm text-blue-600 mt-1">本月发布</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">社交触达</div>
          <div className="text-3xl font-bold text-gray-900">{(data.socialReach / 10000).toFixed(1)}万</div>
          <div className="text-sm text-green-600 mt-1">+8.5% 较上月</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 品牌实力分析</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.brandStrength} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="#9ca3af" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="score" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔝 品牌关键词排名</h3>
          <div className="space-y-4">
            {data.topKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 font-medium w-8">#{index + 1}</span>
                  <div>
                    <div className="font-medium text-gray-900">{keyword.keyword}</div>
                    <div className="text-xs text-gray-500">排名: #{keyword.rank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">{keyword.traffic.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">流量</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 品牌策略建议</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-purple-600 text-xl">✨</span>
              <div>
                <div className="font-medium text-purple-800">强化品牌忠诚建设</div>
                <div className="text-sm text-purple-700 mt-1">品牌忠诚维度得分较低，建议开展会员忠诚度计划</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">📝</span>
              <div>
                <div className="font-medium text-blue-800">优化内容策略</div>
                <div className="text-sm text-blue-700 mt-1">建议增加品牌故事和用户案例内容的发布频率</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">📱</span>
              <div>
                <div className="font-medium text-green-800">扩大社交传播</div>
                <div className="text-sm text-green-700 mt-1">建议与KOL合作，扩大品牌在社交媒体的影响力</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-orange-600 text-xl">🔍</span>
              <div>
                <div className="font-medium text-orange-800">监控品牌舆情</div>
                <div className="text-sm text-orange-700 mt-1">建立品牌舆情监测机制，及时响应负面评价</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
