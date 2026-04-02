'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TransactionData } from '@/types/value-chain';

interface TransactionStageProps {
  data: TransactionData;
  onBack: () => void;
}

export default function TransactionStage({ data, onBack }: TransactionStageProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span>←</span>
        <span>返回价值链总览</span>
      </button>

      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-5xl">🛒</span>
          <div>
            <h1 className="text-2xl font-bold">交易履约</h1>
            <p className="text-white/80">高效订单处理，确保按时交付，提升客户体验</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">订单数量</div>
          <div className="text-3xl font-bold text-gray-900">{data.orders}</div>
          <div className="text-sm text-green-600 mt-1">+8.3% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">交易金额</div>
          <div className="text-3xl font-bold text-gray-900">¥{(data.revenue / 10000).toFixed(1)}万</div>
          <div className="text-sm text-green-600 mt-1">+10.2% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">客单价</div>
          <div className="text-3xl font-bold text-gray-900">¥{data.avgOrderValue.toLocaleString()}</div>
          <div className="text-sm text-green-600 mt-1">+1.8% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">履约率</div>
          <div className="text-3xl font-bold text-gray-900">{data.fulfillmentRate}%</div>
          <div className="text-sm text-green-600 mt-1">+1.2% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">退货率</div>
          <div className="text-3xl font-bold text-gray-900">{data.returnRate}%</div>
          <div className="text-sm text-green-600 mt-1">-0.5% 较上月</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">复购率</div>
          <div className="text-3xl font-bold text-gray-900">38.5%</div>
          <div className="text-sm text-green-600 mt-1">+2.3% 较上月</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 销售趋势</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="销售额" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" name="订单数" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔝 热销商品</h3>
          <div className="space-y-4">
            {data.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-green-500 text-2xl">📦</span>
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">销量: {product.quantity}件</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">¥{(product.sales / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-gray-500">销售额</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ 履约优化建议</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✅</span>
              <div>
                <div className="font-medium text-green-800">保持高履约率</div>
                <div className="text-sm text-green-700 mt-1">履约率96.8%表现优秀，继续保持现有流程</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">📦</span>
              <div>
                <div className="font-medium text-blue-800">优化库存管理</div>
                <div className="text-sm text-blue-700 mt-1">针对热销商品确保库存充足，避免缺货</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-yellow-600 text-xl">🎁</span>
              <div>
                <div className="font-medium text-yellow-800">提升客单价</div>
                <div className="text-sm text-yellow-700 mt-1">设计捆绑销售和满减活动，提高客单价</div>
              </div>
            </div>
          </div>
          <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-purple-600 text-xl">📊</span>
              <div>
                <div className="font-medium text-purple-800">分析退货原因</div>
                <div className="text-sm text-purple-700 mt-1">深入分析退货原因，优化产品描述和质量</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
