import { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  FileText,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';
import { PageContent } from '../../types';

const mockPages: PageContent[] = [
  { id: '1', title: '首页', content: '首页内容...', slug: 'home', status: 'published', createdAt: '2026-05-01', updatedAt: '2026-05-20' },
  { id: '2', title: '关于我们', content: '关于我们内容...', slug: 'about', status: 'published', createdAt: '2026-05-02', updatedAt: '2026-05-18' },
  { id: '3', title: '产品中心', content: '产品中心内容...', slug: 'products', status: 'published', createdAt: '2026-05-03', updatedAt: '2026-05-19' },
  { id: '4', title: '服务介绍', content: '服务介绍内容...', slug: 'services', status: 'draft', createdAt: '2026-05-10', updatedAt: '2026-05-15' },
  { id: '5', title: '新闻资讯', content: '新闻资讯内容...', slug: 'news', status: 'published', createdAt: '2026-05-05', updatedAt: '2026-05-17' },
  { id: '6', title: '联系我们', content: '联系我们内容...', slug: 'contact', status: 'published', createdAt: '2026-05-06', updatedAt: '2026-05-16' },
];

export default function ContentManagement() {
  const [pages, setPages] = useState<PageContent[]>(mockPages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);

  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个页面吗？')) {
      setPages(pages.filter((page) => page.id !== id));
    }
  };

  const handleCreate = () => {
    const newPage: PageContent = {
      id: Date.now().toString(),
      title: '',
      content: '',
      slug: '',
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setEditingPage(newPage);
    setShowCreateModal(true);
  };

  const handleSave = () => {
    if (editingPage) {
      if (editingPage.id === Date.now().toString()) {
        setPages([...pages, editingPage]);
      } else {
        setPages(pages.map((p) => (p.id === editingPage.id ? editingPage : p)));
      }
      setShowCreateModal(false);
      setEditingPage(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">内容管理</h1>
          <p className="text-gray-500 mt-1">管理网站页面内容</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>新建页面</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索页面标题或路径..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部状态</option>
              <option value="published">已发布</option>
              <option value="draft">草稿</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">标题</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">路径</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">更新时间</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-800">{page.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{page.slug}</td>
                  <td className="px-4 py-4">
                    {page.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        已发布
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        草稿
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {page.updatedAt}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingPage(page);
                          setShowCreateModal(true);
                        }}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPages.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">没有找到匹配的页面</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingPage?.id === Date.now().toString() ? '新建页面' : '编辑页面'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingPage(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
                <input
                  type="text"
                  value={editingPage?.title || ''}
                  onChange={(e) => editingPage && setEditingPage({ ...editingPage, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入页面标题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">页面路径</label>
                <input
                  type="text"
                  value={editingPage?.slug || ''}
                  onChange={(e) => editingPage && setEditingPage({ ...editingPage, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入页面路径（如：about）"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">页面内容</label>
                <textarea
                  value={editingPage?.content || ''}
                  onChange={(e) => editingPage && setEditingPage({ ...editingPage, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="请输入页面内容"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                <select
                  value={editingPage?.status || 'draft'}
                  onChange={(e) => editingPage && setEditingPage({ ...editingPage, status: e.target.value as 'draft' | 'published' })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">草稿</option>
                  <option value="published">已发布</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingPage(null);
                }}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}