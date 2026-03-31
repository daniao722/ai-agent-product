import React from 'react';

interface ChatButtonProps {
  employee: 'mia' | 'leo';
  name: string;
  gradient: string;
}

export default function ChatButton({ employee, name, gradient }: ChatButtonProps) {
  return (
    <div className="fixed bottom-6 right-6">
      <button 
        className={`${gradient} text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 hover:shadow-xl transition-all`}
        onClick={() => alert(`与${name}对话功能开发中...`)}
      >
        <span className="text-xl">💬</span>
        <span className="font-medium">与{name}对话</span>
      </button>
    </div>
  );
}
