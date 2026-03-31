import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  color?: 'blue' | 'purple' | 'orange' | 'red' | 'green';
}

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendType = 'neutral', 
  color = 'blue' 
}: StatCardProps) {
  const trendColors = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-blue-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500">{title}</span>
        {trend && (
          <span className={`text-sm font-medium ${trendColors[trendType]}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{subtitle}</div>
    </div>
  );
}
