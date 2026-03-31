'use client';

import { cn } from '@/lib/utils';

interface NavigationProps {
  companyName: string;
  className?: string;
  isEditable?: boolean;
  onEdit?: (key: string, value: any) => void;
}

export function Navigation({ 
  companyName, 
  className,
  isEditable = false,
  onEdit 
}: NavigationProps) {
  const navItems = [
    { label: '首页', href: '#' },
    { label: '产品中心', href: '#' },
    { label: '关于我们', href: '#' },
    { label: '联系我们', href: '#' },
  ];

  return (
    <nav className={cn(
      'bg-white shadow-sm border-b',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              {companyName}
            </h1>
          </div>
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
