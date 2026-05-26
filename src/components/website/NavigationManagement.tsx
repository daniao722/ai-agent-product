import { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Navigation,
  GripVertical
} from 'lucide-react';
import { NavigationItem } from '../../types';

const mockNavigation: NavigationItem[] = [
  { id: '1', label: '首页', url: '/', parentId: null, order: 1 },
  { id: '2', label: '产品中心', url: '/products', parentId: null, order: 2 },
  { id: '3', label: '解决方案', url: '/solutions', parentId: null, order: 3 },
  { id: '4', label: '关于我们', url: '/about', parentId: null, order: 4 },
  { id: '5', label: '联系我们', url: '/contact', parentId: null, order: 5 },
  { id: '6', label: '营销工具', url: '/products/marketing', parentId: '2', order: 1 },
  { id: '7', label: '数据分析', url: '/products/analytics', parentId: '2', order: 2 },
  { id: '8', label: '客户管理', url: '/products/crm', parentId: '2', order: 3 },
  { id: '9', label: '电商方案', url: '/solutions/ecommerce', parentId: '3', order: 1 },
  { id: '10', label: '金融方案', url: '/solutions/finance', parentId: '3', order: 2 },
];

export default function NavigationManagement() {
  const [items, setItems] = useState<NavigationItem[]>(mockNavigation);
  const [expandedItems, setExpandedItems] = useState<string[]>(['2', '3']);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const getChildren = (parentId: string | null) =>
    items.filter((item) => item.parentId === parentId).sort((a, b) => a.order - b.order);

  const handleCreate = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      label: '',
      url: '',
      parentId: null,
      order: items.filter((i) => i.parentId === null).length + 1,
    };
    setEditingItem(newItem);
    setShowCreateModal(true);
  };

  const handleSave = () => {
    if (editingItem) {
      if (items.find((i) => i.id === editingItem.id)) {
        setItems(items.map((i) => (i.id === editingItem.id ? editingItem : i)));
      } else {
        setItems([...items, editingItem]);
      }
      setShowCreateModal(false);
      setEditingItem(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个导航项吗？')) {
      const children = items.filter((i) => i.parentId === id);
      if (children.length > 0) {
        alert('请先删除子菜单');
        return;
      }
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const renderItem = (item: NavigationItem, depth = 0) => {
    const children = getChildren(item.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id}>
        <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          {hasChildren && (
            <button
              onClick={() => toggleExpand(item.id)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          {!hasChildren && <span className="w-6" />}
          <span className="flex-1 text-gray-800">{item.label}</span>
          <span className="text-sm text-gray-400 truncate max-w-32">{item.url}</span>
          <button
            onClick={() => {
              setEditingItem(item);
              setShowCreateModal(true);
            }}
            className="p-1 text-gray-400 hover:text-blue-600"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-6 mt-1 border-l-2 border-gray-100 pl-4">
            {children.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">导航管理</h1>
          <p className="text-gray-500 mt-1">管理网站导航菜单结构</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>添加菜单</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-800">导航菜单</span>
        </div>
        <div className="p-4">
          <div className="space-y-1">
            {getChildren(null).map((item) => renderItem(item))}
          </div>
          {getChildren(null).length === 0 && (
            <div className="py-12 text-center">
              <Navigation className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无导航菜单</p>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {items.find((i) => i.id === editingItem?.id) ? '编辑菜单' : '添加菜单'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingItem(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">菜单名称</label>
                <input
                  type="text"
                  value={editingItem?.label || ''}
                  onChange={(e) => editingItem && setEditingItem({ ...editingItem, label: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入菜单名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">链接地址</label>
                <input
                  type="text"
                  value={editingItem?.url || ''}
                  onChange={(e) => editingItem && setEditingItem({ ...editingItem, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入链接地址（如：/products）"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">上级菜单</label>
                <select
                  value={editingItem?.parentId || ''}
                  onChange={(e) => editingItem && setEditingItem({ ...editingItem, parentId: e.target.value || null })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">无（作为顶级菜单）</option>
                  {getChildren(null).map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingItem(null);
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