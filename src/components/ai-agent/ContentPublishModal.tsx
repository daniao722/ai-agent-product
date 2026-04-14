'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentPublishModalProps {
  onClose: () => void;
}

const articleTypes = [
  { value: 'blog', label: '博客文章', desc: '深度行业洞察和观点分享' },
  { value: 'news', label: '新闻动态', desc: '公司新闻和产品更新' },
  { value: 'case', label: '客户案例', desc: '成功案例和客户故事' },
  { value: 'guide', label: '使用指南', desc: '产品教程和操作手册' },
];

const publishFrequencies = [
  { value: 'weekly', label: '每周 1 篇' },
  { value: 'biweekly', label: '每周 2 篇' },
  { value: 'triweekly', label: '每周 3 篇' },
  { value: 'daily', label: '每天 1 篇' },
];

const wordCounts = [
  { value: 500, label: '500 字（短篇）' },
  { value: 1000, label: '1000 字（中篇）' },
  { value: 1500, label: '1500 字（长篇）' },
  { value: 2000, label: '2000 字（深度）' },
];

export default function ContentPublishModal({ onClose }: ContentPublishModalProps) {
  const [formData, setFormData] = useState({
    keywords: '',
    articleType: 'blog',
    wordCount: 1000,
    publishFrequency: 'biweekly',
    targetWebsite: '',
    tone: 'professional',
  });

  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    setTimeout(() => {
      setIsCreating(false);
      setCreated(true);
    }, 2000);
  };

  if (created) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">任务创建成功！</h3>
            <p className="text-gray-600 mb-6">
              AI 内容发布任务已启动，每周将自动生成 2 篇原创文章并发布到您的网站。
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <span>📝</span>
                  文章类型：{articleTypes.find(t => t.value === formData.articleType)?.label}
                </span>
                <span className="flex items-center gap-1">
                  <span>📅</span>
                  发布频率：{publishFrequencies.find(f => f.value === formData.publishFrequency)?.label}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium"
            >
              完成
            </button>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🤖</div>
                <div>
                  <h2 className="text-xl font-bold text-white">创建 AI 内容发布任务</h2>
                  <p className="text-purple-100 text-sm">自动生成高质量内容，保持网站活跃度</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <span>🔑</span>
                    核心关键词
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="例如：智能解决方案、数字化转型、企业服务"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">多个关键词用逗号分隔</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <span className="flex items-center gap-2">
                    <span>📝</span>
                    文章类型
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {articleTypes.map((type) => (
                    <label key={type.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="articleType"
                        value={type.value}
                        checked={formData.articleType === type.value}
                        onChange={(e) => setFormData({ ...formData, articleType: e.target.value })}
                        className="sr-only"
                      />
                      <div className={`p-4 border rounded-lg transition-all ${
                        formData.articleType === type.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}>
                        <div className="font-medium text-gray-900">{type.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{type.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <span>📊</span>
                      文章字数
                    </span>
                  </label>
                  <select
                    value={formData.wordCount}
                    onChange={(e) => setFormData({ ...formData, wordCount: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  >
                    {wordCounts.map((wc) => (
                      <option key={wc.value} value={wc.value}>{wc.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <span>📅</span>
                      发布频率
                    </span>
                  </label>
                  <select
                    value={formData.publishFrequency}
                    onChange={(e) => setFormData({ ...formData, publishFrequency: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  >
                    {publishFrequencies.map((freq) => (
                      <option key={freq.value} value={freq.value}>{freq.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <span>🎨</span>
                    写作风格
                  </span>
                </label>
                <div className="flex gap-3">
                  {[
                    { value: 'professional', label: '专业', icon: '💼' },
                    { value: 'friendly', label: '友好', icon: '😊' },
                    { value: 'authoritative', label: '权威', icon: '🏛️' },
                    { value: 'casual', label: '轻松', icon: '✨' },
                  ].map((tone) => (
                    <label key={tone.value} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="tone"
                        value={tone.value}
                        checked={formData.tone === tone.value}
                        onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                        className="sr-only"
                      />
                      <div className={`p-3 border rounded-lg text-center transition-all ${
                        formData.tone === tone.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}>
                        <div className="text-xl mb-1">{tone.icon}</div>
                        <div className="text-sm font-medium">{tone.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>

          <div className="p-6 border-t bg-gray-50 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isCreating}
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isCreating ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  创建中...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  启动任务
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
