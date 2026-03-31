import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  employee: 'mia' | 'leo';
  name: string;
  role: string;
  emoji: string;
  gradient: string;
  menuItems: {
    icon: string;
    label: string;
    href: string;
  }[];
}

export default function Sidebar({ 
  employee, 
  name, 
  role, 
  emoji, 
  gradient, 
  menuItems 
}: SidebarProps) {
  const pathname = usePathname();
  const activeColorClass = employee === 'mia' 
    ? 'text-blue-600 bg-blue-50' 
    : 'text-orange-600 bg-orange-50';

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className={`p-6 border-b ${gradient}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">{emoji}</span>
          </div>
          <div>
            <h2 className="text-white font-bold">{name}</h2>
            <p className="text-white/80 text-sm">{role}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={index} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? activeColorClass + ' font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span> {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Agent在线工作中</span>
        </div>
      </div>
    </aside>
  );
}
