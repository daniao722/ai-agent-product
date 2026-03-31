'use client';

import { cn } from '@/lib/utils';

interface AboutUsProps {
  companyName?: string;
  className?: string;
  isEditable?: boolean;
  onEdit?: (key: string, value: any) => void;
}

export function AboutUs({ 
  companyName = '数字门户', 
  className,
  isEditable = false,
  onEdit 
}: AboutUsProps) {
  return (
    <section className={cn('py-16 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              关于 {companyName}
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              我们是一家专注于提供高品质产品和服务的企业，致力于为客户创造价值。
            </p>
            <p className="text-gray-600 mb-4 text-lg">
              多年来，我们始终坚持以客户为中心，不断创新和改进，赢得了广大客户的信赖和好评。
            </p>
            <p className="text-gray-600 text-lg">
              我们的愿景是成为行业领先的企业，为社会做出更大的贡献。
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"
              alt="关于我们"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
