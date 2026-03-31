import React, { useState } from 'react';

interface KnowledgeCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  lastUpdated: string;
}

const categories: KnowledgeCategory[] = [
  { id: 'brand', name: '品牌知识', icon: '🏷️', count: 24, lastUpdated: '2026-03-28' },
  { id: 'product', name: '产品知识', icon: '📦', count: 56, lastUpdated: '2026-03-29' },
  { id: 'solution', name: '解决方案', icon: '💡', count: 18, lastUpdated: '2026-03-27' },
  { id: 'case', name: '客户案例', icon: '📚', count: 32, lastUpdated: '2026-03-26' },
  { id: 'company', name: '企业知识', icon: '🏢', count: 15, lastUpdated: '2026-03-25' },
];

const learningSources = [
  { id: 'auto', name: '从本站应用数据学习', desc: '自动爬取网站内容，定期更新', default: true, icon: '🔄' },
  { id: 'upload', name: '本地上传文档', desc: '支持PDF、Word、PPT、TXT等格式', icon: '📁' },
  { id: 'url', name: '外部URL学习', desc: '输入URL列表，自动抓取学习', icon: '🔗' },
];

export default function KnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState('brand');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [learningMethod, setLearningMethod] = useState('auto');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">知识库</h1>
          <p className="text-gray-600 mt-1">管理和学习您的企业知识</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span>+</span> 学习新知识
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'
                  : 'bg-white border border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className={`font-semibold ${
                    activeCategory === category.id ? 'text-purple-700' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500">{category.count} 条知识</p>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                最后更新: {category.lastUpdated}
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">学习方式</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {learningSources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => setLearningMethod(source.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    learningMethod === source.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{source.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{source.name}</h4>
                      {source.default && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">默认</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{source.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">知识列表</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="搜索知识..."
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📄</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">知识文档 {i}</h4>
                      <p className="text-sm text-gray-500">
                        质量评分: <span className="text-green-600 font-medium">92分</span> · 2026-03-28
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded">
                      👁️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded">
                      ✏️
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">学习新知识</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <span className="text-4xl mb-2 block">📁</span>
                <p className="text-gray-600 mb-2">拖拽文件到这里或</p>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  选择文件
                </button>
                <p className="text-xs text-gray-400 mt-2">支持 PDF, Word, PPT, TXT</p>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90"
                >
                  开始学习
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
