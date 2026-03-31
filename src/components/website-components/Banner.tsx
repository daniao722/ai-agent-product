'use client';

import { cn } from '@/lib/utils';

interface BannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  className?: string;
  isEditable?: boolean;
  onEdit?: (key: string, value: any) => void;
}

export function Banner({ 
  title = '欢迎来到我们的网站', 
  subtitle = '探索精彩内容，开启新旅程', 
  ctaText = '立即了解',
  className,
  isEditable = false,
  onEdit 
}: BannerProps) {
  return (
    <section className={cn(
      'bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          {subtitle}
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          {ctaText}
        </button>
      </div>
    </section>
  );
}
