import { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Package,
  Calendar,
  DollarSign,
  Tag,
  Sparkles,
} from 'lucide-react';
import { Product } from '../../types';
import AICreateProduct from './AICreateProduct';

const mockProducts: Product[] = [
  { id: '1', name: '智能营销系统', description: 'AI驱动的智能营销解决方案', price: 2999, category: '营销工具', stock: 100, images: [], createdAt: '2026-05-01' },
  { id: '2', name: '客户管理平台', description: '全渠道客户关系管理系统', price: 3999, category: 'CRM', stock: 80, images: [], createdAt: '2026-05-02' },
  { id: '3', name: '数据分析套件', description: '一站式数据分析与可视化', price: 1999, category: '数据分析', stock: 150, images: [], createdAt: '2026-05-03' },
  { id: '4', name: '跨境电商解决方案', description: '全球电商运营支持', price: 4999, category: '电商', stock: 60, images: [], createdAt: '2026-05-05' },
  { id: '5', name: 'AI客服机器人', description: '7x24小时智能客服', price: 1499, category: '客服', stock: 200, images: [], createdAt: '2026-05-08' },
];

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAICreate, setShowAICreate] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个产品吗？')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleCreate = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      images: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setEditingProduct(newProduct);
    setShowCreateModal(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      if (products.find((p) => p.id === editingProduct.id)) {
        setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
      } else {
        setProducts([...products, editingProduct]);
      }
      setShowCreateModal(false);
      setEditingProduct(null);
    }
  };

  const handleAICreateSave = (productData: Record<string, unknown>) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: (productData.name as string) || '新产品',
      description: (productData.description as string) || '',
      price: 0,
      category: (productData.category as string) || '',
      stock: 0,
      images: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">产品管理</h1>
          <p className="text-gray-500 mt-1">管理网站产品信息</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAICreate(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-sm"
          >
            <Sparkles className="w-5 h-5" />
            <span>AI 创建产品</span>
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>新建产品</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索产品名称或分类..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setShowCreateModal(true);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-orange-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{product.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Tag className="w-4 h-4" />
                  <span>{product.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>库存: {product.stock}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">没有找到匹配的产品</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {products.find((p) => p.id === editingProduct?.id) ? '编辑产品' : '新建产品'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">产品名称</label>
                <input
                  type="text"
                  value={editingProduct?.name || ''}
                  onChange={(e) => editingProduct && setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入产品名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">产品描述</label>
                <textarea
                  value={editingProduct?.description || ''}
                  onChange={(e) => editingProduct && setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="请输入产品描述"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
                  <input
                    type="number"
                    value={editingProduct?.price || ''}
                    onChange={(e) => editingProduct && setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入价格"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">库存</label>
                  <input
                    type="number"
                    value={editingProduct?.stock || ''}
                    onChange={(e) => editingProduct && setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入库存"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <input
                  type="text"
                  value={editingProduct?.category || ''}
                  onChange={(e) => editingProduct && setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入分类"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingProduct(null);
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

      {showAICreate && (
        <AICreateProduct
          onClose={() => setShowAICreate(false)}
          onSave={handleAICreateSave}
        />
      )}
    </div>
  );
}