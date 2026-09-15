import { useState } from 'react';
import {
  Plus, Search, FileText, Eye, Edit3, Trash2, Copy,
  ChevronRight, Sparkles,
} from 'lucide-react';

export interface PageItem {
  id: string;
  name: string;
  type: string;
  updatedAt: string;
  status: 'published' | 'draft';
  source?: 'detail';
}

const DEFAULT_PAGES: PageItem[] = [
  { id: '1', name: '首页', type: 'Home', updatedAt: '2024-01-15', status: 'published' },
  { id: '2', name: '关于我们', type: 'About', updatedAt: '2024-01-14', status: 'published' },
  { id: '3', name: '产品中心', type: 'Products', updatedAt: '2024-01-13', status: 'published' },
  { id: '4', name: '新闻动态', type: 'News', updatedAt: '2024-01-12', status: 'draft' },
  { id: '5', name: '联系我们', type: 'Contact', updatedAt: '2024-01-11', status: 'published' },
  { id: '6', name: 'X500 数控车床', type: 'ProductDetail', updatedAt: '2024-01-10', status: 'published', source: 'detail' },
];

interface DesignerDashboardProps {
  onBack: () => void;
  onNewPage: () => void;
  onEditPage: (page: PageItem) => void;
}

export default function DesignerDashboard({ onBack, onNewPage, onEditPage }: DesignerDashboardProps) {
  const [pages, setPages] = useState<PageItem[]>(DEFAULT_PAGES);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [search, setSearch] = useState('');

  const filteredPages = pages.filter((p) => {
    if (filter === 'published' && p.status !== 'published') return false;
    if (filter === 'draft' && p.status !== 'draft') return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDelete = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDuplicate = (page: PageItem) => {
    const newPage: PageItem = {
      ...page,
      id: Date.now().toString(),
      name: `${page.name} (副本)`,
      updatedAt: new Date().toISOString().split('T')[0],
      status: 'draft',
    };
    setPages((prev) => [newPage, ...prev]);
  };

  const statusCounts = {
    all: pages.length,
    published: pages.filter((p) => p.status === 'published').length,
    draft: pages.filter((p) => p.status === 'draft').length,
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            ← 返回
          </button>
          <div className="h-6 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              D
            </div>
            <span className="font-semibold text-gray-800 text-sm">设计云平台</span>
          </div>
          <span className="text-xs text-gray-400">页面管理</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs text-gray-500 hover:text-gray-700">帮助文档</button>
          <button className="text-xs text-gray-500 hover:text-gray-700">设置</button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">A</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          {/* 产品详情页设计器入口 */}
          <div className="p-4 border-b border-gray-100">
            <button
              onClick={onNewPage}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm font-semibold">产品详情页设计器</div>
                <div className="text-xs text-blue-200">AI智能生成</div>
              </div>
            </button>
          </div>

          {/* 页面列表 */}
          <div className="flex-1 overflow-y-auto p-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">页面管理</h3>
            <div className="space-y-1">
              {pages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => onEditPage(page)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all group ${
                    page.source === 'detail'
                      ? 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <FileText className={`w-4 h-4 flex-shrink-0 ${page.source === 'detail' ? 'text-purple-500' : 'text-gray-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-700 truncate">{page.name}</div>
                    <div className="text-xs text-gray-400 truncate">{page.type}</div>
                  </div>
                  {page.source === 'detail' && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-600 font-medium flex-shrink-0">
                      详情
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 底部新建按钮 */}
          <div className="p-3 border-t border-gray-100">
            <button
              onClick={onNewPage}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              新建页面
            </button>
          </div>
        </div>

        {/* Main Content - Page List Table */}
        <div className="flex-1 overflow-y-auto">
          {/* Search & Filter Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索页面..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(['all', 'published', 'draft'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    filter === f ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f === 'all' ? '全部' : f === 'published' ? '已发布' : '草稿'} ({statusCounts[f]})
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">页面名称</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">类型</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">更新时间</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">状态</th>
                  <th className="text-right text-xs font-medium text-gray-400 px-6 py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page) => (
                  <tr
                    key={page.id}
                    onClick={() => onEditPage(page)}
                    className={`border-b border-gray-50 cursor-pointer transition-colors ${
                      page.source === 'detail' ? 'bg-purple-50/50 hover:bg-purple-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          page.source === 'detail' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <FileText className={`w-4 h-4 ${page.source === 'detail' ? 'text-purple-500' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{page.name}</div>
                        </div>
                        {page.source === 'detail' && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 font-medium flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            详情
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{page.type}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{page.updatedAt}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        page.status === 'published'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {page.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="编辑">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="预览">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(page)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                          title="复制"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPages.length === 0 && (
              <div className="py-16 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">暂无页面</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
