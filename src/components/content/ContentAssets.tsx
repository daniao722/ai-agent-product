import { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';

interface ContentAsset {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  status: 'draft' | 'published';
}

const mockContentAssets: ContentAsset[] = [
  { id: '1', title: '工业机器人产品描述', content: '我们专注于工业机器人研发与制造，提供高效、稳定、智能的自动化解决方案。通过先进的AI算法和精密传感技术，我们的产品能够显著提升生产线效率。', type: 'product', createdAt: '2026-05-20 14:30', status: 'published' },
  { id: '2', title: '企业解决方案白皮书', content: '数字化转型解决方案介绍，帮助企业实现智能制造转型，降低运营成本，提升生产效率。', type: 'whitepaper', createdAt: '2026-05-19 11:20', status: 'published' },
  { id: '3', title: '新品发布文案', content: '全新一代智能设备即将上市，融合最新AI技术，为用户带来前所未有的使用体验。', type: 'marketing', createdAt: '2026-05-18 16:45', status: 'draft' },
  { id: '4', title: '客户成功案例', content: '某大型制造企业通过部署我们的智能产线解决方案，产能提升35%，人力成本降低40%。', type: 'case', createdAt: '2026-05-17 09:15', status: 'published' },
  { id: '5', title: '技术博客文章', content: '深度解析工业4.0时代的智能制造趋势，探讨AI与物联网如何重塑传统制造业。', type: 'blog', createdAt: '2026-05-16 13:50', status: 'draft' },
  { id: '6', title: '展会邀请函', content: '诚邀您参加2026国际智能制造博览会，我们将展示最新产品和技术解决方案。', type: 'marketing', createdAt: '2026-05-15 10:30', status: 'published' },
];

export default function ContentAssets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentAssets, setContentAssets] = useState<ContentAsset[]>(mockContentAssets);

  const filteredAssets = contentAssets.filter(asset =>
    asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteContent = (id: string) => {
    if (confirm('确定要删除吗？')) {
      setContentAssets(contentAssets.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      {/* 搜索和导出功能 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">内容资产库</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索内容..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>
      </div>

      {/* 内容卡片网格展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((content) => (
          <div key={content.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{content.title}</h4>
                  <p className="text-xs text-gray-500">{content.createdAt}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                content.status === 'published'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {content.status === 'published' ? '已发布' : '草稿'}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{content.content}</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => handleDeleteContent(content.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-3" />
          <p className="text-lg">未找到匹配的内容</p>
          <p className="text-sm mt-1">请尝试其他搜索关键词</p>
        </div>
      )}
    </div>
  );
}
