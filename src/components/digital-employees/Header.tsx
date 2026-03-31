import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  backHref: string;
}

export default function Header({ title, backHref }: HeaderProps) {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link 
          href={backHref}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <span>←</span> 返回
        </Link>
        <div className="h-6 w-px bg-gray-300"></div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <span>🔔</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <span className="text-sm text-gray-700">用户</span>
        </div>
      </div>
    </header>
  );
}
