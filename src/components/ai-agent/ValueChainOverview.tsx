'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ValueChainStage, VALUE_CHAIN_DATA, ValueChainData } from '@/types/value-chain';
import BrandStage from './BrandStage';
import MarketingStage from './MarketingStage';
import TransactionStage from './TransactionStage';
import ServiceStage from './ServiceStage';

interface ValueChainOverviewProps {
  onBack?: () => void;
}

const stages: { id: ValueChainStage; name: string; icon: string; color: string; description: string }[] = [
  { 
    id: 'brand', 
    name: '品牌认知', 
    icon: '🎯', 
    color: 'from-purple-500 to-purple-600',
    description: '建立品牌知名度和美誉度'
  },
  { 
    id: 'marketing', 
    name: '营销获客', 
    icon: '📣', 
    color: 'from-blue-500 to-blue-600',
    description: '获取潜在客户和销售线索'
  },
  { 
    id: 'transaction', 
    name: '交易履约', 
    icon: '🛒', 
    color: 'from-green-500 to-green-600',
    description: '完成订单和交易交付'
  },
  { 
    id: 'service', 
    name: '服务支持', 
    icon: '💬', 
    color: 'from-orange-500 to-orange-600',
    description: '提供优质服务和客户关怀'
  },
];

export default function ValueChainOverview({ onBack }: ValueChainOverviewProps) {
  const [activeStage, setActiveStage] = useState<ValueChainStage | null>(null);
  const [data] = useState<ValueChainData>(VALUE_CHAIN_DATA);

  const getStageComponent = (stage: ValueChainStage) => {
    switch (stage) {
      case 'brand':
        return <BrandStage data={data.brand} onBack={() => setActiveStage(null)} />;
      case 'marketing':
        return <MarketingStage data={data.marketing} onBack={() => setActiveStage(null)} />;
      case 'transaction':
        return <TransactionStage data={data.transaction} onBack={() => setActiveStage(null)} />;
      case 'service':
        return <ServiceStage data={data.service} onBack={() => setActiveStage(null)} />;
      default:
        return null;
    }
  };

  const getOverallStats = () => {
    return [
      { label: '品牌认知度', value: `${data.brand.awareness}%`, change: '+5.2%', positive: true },
      { label: '获客线索', value: data.marketing.leads, change: '+12.5%', positive: true },
      { label: '交易金额', value: `¥${(data.transaction.revenue / 10000).toFixed(1)}万`, change: '+8.3%', positive: true },
      { label: '客户满意度', value: `${data.service.satisfactionScore.toFixed(1)}分`, change: '+0.3分', positive: true },
    ];
  };

  if (activeStage) {
    return getStageComponent(activeStage);
  }

  const overallStats = getOverallStats();

  return (
    <div className="space-y-6">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span>
          <span>返回</span>
        </button>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">🔗 业务价值链总览</h1>
        <p className="text-gray-600 mt-1">从品牌认知到服务支持的完整业务闭环</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className={`text-sm mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">业务价值流转</h2>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-blue-200 via-green-200 to-orange-200 -translate-y-1/2 z-0 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 }}
                onClick={() => setActiveStage(stage.id)}
                className="cursor-pointer group"
              >
                <div className={`bg-gradient-to-br ${stage.color} rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                  <div className="text-4xl mb-3">{stage.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{stage.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{stage.description}</p>
                  
                  <div className="space-y-2">
                    {stage.id === 'brand' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>品牌认知度</span>
                          <span className="font-bold">{data.brand.awareness}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>品牌得分</span>
                          <span className="font-bold">{data.brand.brandScore}</span>
                        </div>
                      </>
                    )}
                    {stage.id === 'marketing' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>获客线索</span>
                          <span className="font-bold">{data.marketing.leads}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>转化率</span>
                          <span className="font-bold">{data.marketing.conversionRate}%</span>
                        </div>
                      </>
                    )}
                    {stage.id === 'transaction' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>订单数</span>
                          <span className="font-bold">{data.transaction.orders}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>履约率</span>
                          <span className="font-bold">{data.transaction.fulfillmentRate}%</span>
                        </div>
                      </>
                    )}
                    {stage.id === 'service' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>满意度</span>
                          <span className="font-bold">{data.service.satisfactionScore.toFixed(1)}分</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>客户留存</span>
                          <span className="font-bold">{data.service.customerRetention}%</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/20 text-center">
                    <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                      点击查看详情 →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">📊 价值流转分析</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">各阶段转化漏斗</h3>
            <div className="space-y-4">
              {[
                { stage: '品牌认知', value: 100, color: 'bg-purple-500' },
                { stage: '营销获客', value: 65, color: 'bg-blue-500' },
                { stage: '交易履约', value: 38, color: 'bg-green-500' },
                { stage: '服务留存', value: 28, color: 'bg-orange-500' },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.stage}</span>
                    <span className="font-medium text-gray-900">{item.value}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">🔍 关键洞察</h3>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">📈</span>
                  <div>
                    <div className="font-medium text-green-800">亮点：品牌认知持续提升</div>
                    <div className="text-sm text-green-700 mt-1">品牌认知度较上月提升5.2%，品牌建设成效显著</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">💡</span>
                  <div>
                    <div className="font-medium text-blue-800">机会：营销转化潜力大</div>
                    <div className="text-sm text-blue-700 mt-1">内容营销渠道转化率最高，建议加大投入</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <div>
                    <div className="font-medium text-yellow-800">关注：交易到服务的衔接</div>
                    <div className="text-sm text-yellow-700 mt-1">建议优化订单完成后的服务跟进流程</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
