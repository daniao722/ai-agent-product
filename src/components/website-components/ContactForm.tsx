'use client';

import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
  isEditable?: boolean;
  onEdit?: (key: string, value: any) => void;
}

export function ContactForm({ 
  className,
  isEditable = false,
  onEdit 
}: ContactFormProps) {
  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          联系我们
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                姓名
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入您的姓名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <input 
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入您的邮箱"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              主题
            </label>
            <input 
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入主题"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              留言内容
            </label>
            <textarea 
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="请输入您的留言"
            />
          </div>
          <div className="text-center">
            <button 
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              发送消息
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
