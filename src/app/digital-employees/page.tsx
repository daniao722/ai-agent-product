'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DigitalEmployeesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-2xl">🤖</span>
            <span className="text-white font-medium">数智增长合伙人</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">选择您的数字员工</h1>
          <p className="text-xl text-white/80">两位专业的AI数字员工，7×24小时为您服务</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <Link href="/digital-employees/mia" className="block">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-center">
                <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">👩‍💼</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Mia</h2>
                <p className="text-white/90 text-lg mt-2">海外数字营销经理</p>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">🔍</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">关键词研究</div>
                      <div className="text-sm text-gray-500">智能发掘高价值关键词</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600">✍️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">SEO内容创作</div>
                      <div className="text-sm text-gray-500">生成高质量原创内容</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">📊</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">数据复盘</div>
                      <div className="text-sm text-gray-500">按周提供优化建议</div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all">
                  开始与Mia合作 →
                </button>
              </div>
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <Link href="/digital-employees/leo" className="block">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 text-center">
                <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">👨‍💼</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Leo</h2>
                <p className="text-white/90 text-lg mt-2">海外业务开发经理</p>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600">🎯</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">采购商发掘</div>
                      <div className="text-sm text-gray-500">多源数据智能匹配</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600">✉️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">开发信生成</div>
                      <div className="text-sm text-gray-500">个性化高回复率邮件</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <span className="text-amber-600">🏷️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">线索管理</div>
                      <div className="text-sm text-gray-500">全渠道线索自动跟进</div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-8 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all">
                  开始与Leo合作 →
                </button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
