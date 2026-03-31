'use client';

import { cn } from '@/lib/utils';

interface FooterProps {
  companyName: string;
  className?: string;
  isEditable?: boolean;
  onEdit?: (key: string, value: any) => void;
}

export function Footer({ 
  companyName, 
  className,
  isEditable = false,
  onEdit 
}: FooterProps) {
  return (
    <footer className={cn('bg-gray-900 text-white py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-400">
              专业的产品和服务，为您创造价值。
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">首页</a></li>
              <li><a href="#" className="hover:text-white">产品中心</a></li>
              <li><a href="#" className="hover:text-white">关于我们</a></li>
              <li><a href="#" className="hover:text-white">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">联系方式</h4>
            <ul className="space-y-2 text-gray-400">
              <li>电话：400-123-4567</li>
              <li>邮箱：contact@example.com</li>
              <li>地址：上海市浦东新区</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">关注我们</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-2xl">微信</a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">微博</a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">抖音</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 {companyName}. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
