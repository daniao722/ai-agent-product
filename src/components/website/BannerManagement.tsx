import { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Image,
  Calendar,
  Link,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Banner } from '../../types';

const mockBanners: Banner[] = [
  { id: '1', title: '夏季促销活动', imageUrl: 'https://via.placeholder.com/800x400', linkUrl: '/promotion/summer', position: '首页顶部', isActive: true, startDate: '2026-05-01', endDate: '2026-06-30' },
  { id: '2', title: '新品上市', imageUrl: 'https://via.placeholder.com/800x400', linkUrl: '/products/new', position: '首页中部', isActive: true, startDate: '2026-05-15', endDate: '2026-07-15' },
  { id: '3', title: '会员专享优惠', imageUrl: 'https://via.placeholder.com/800x400', linkUrl: '/members', position: '首页底部', isActive: false, startDate: '2026-05-20', endDate: '2026-08-20' },
];

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个Banner吗？')) {
      setBanners(banners.filter((b) => b.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setBanners(
      banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
  };

  const handleCreate = () => {
    const newBanner: Banner = {
      id: Date.now().toString(),
      title: '',
      imageUrl: '',
      linkUrl: '',
      position: '首页顶部',
      isActive: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    setEditingBanner(newBanner);
    setShowCreateModal(true);
  };

  const handleSave = () => {
    if (editingBanner) {
      if (banners.find((b) => b.id === editingBanner.id)) {
        setBanners(banners.map((b) => (b.id === editingBanner.id ? editingBanner : b)));
      } else {
        setBanners([...banners, editingBanner]);
      }
      setShowCreateModal(false);
      setEditingBanner(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Banner管理</h1>
          <p className="text-gray-500 mt-1">管理网站轮播图和广告位</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>添加Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <Image className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleStatus(banner.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    banner.isActive ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                  }`}
                  title={banner.isActive ? '点击禁用' : '点击启用'}
                >
                  {banner.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  banner.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                }`}>
                  {banner.isActive ? '运行中' : '已禁用'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{banner.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Link className="w-4 h-4" />
                  <span className="truncate">{banner.position}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{banner.startDate} ~ {banner.endDate}</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setEditingBanner(banner);
                    setShowCreateModal(true);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="py-12 text-center bg-white rounded-xl border border-gray-100">
          <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无Banner</p>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {banners.find((b) => b.id === editingBanner?.id) ? '编辑Banner' : '添加Banner'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingBanner(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner标题</label>
                <input
                  type="text"
                  value={editingBanner?.title || ''}
                  onChange={(e) => editingBanner && setEditingBanner({ ...editingBanner, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入Banner标题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片地址</label>
                <input
                  type="text"
                  value={editingBanner?.imageUrl || ''}
                  onChange={(e) => editingBanner && setEditingBanner({ ...editingBanner, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入图片URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">链接地址</label>
                <input
                  type="text"
                  value={editingBanner?.linkUrl || ''}
                  onChange={(e) => editingBanner && setEditingBanner({ ...editingBanner, linkUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入跳转链接"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">显示位置</label>
                  <select
                    value={editingBanner?.position || ''}
                    onChange={(e) => editingBanner && setEditingBanner({ ...editingBanner, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="首页顶部">首页顶部</option>
                    <option value="首页中部">首页中部</option>
                    <option value="首页底部">首页底部</option>
                    <option value="产品页">产品页</option>
                    <option value="详情页">详情页</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">是否启用</label>
                  <button
                    onClick={() => editingBanner && setEditingBanner({ ...editingBanner, isActive: !editingBanner.isActive })}
                    className={`w-full px-4 py-2 rounded-lg transition-colors ${
                      editingBanner?.isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {editingBanner?.isActive ? '启用' : '禁用'}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                  <input
                    type="date"
                    value={editingBanner?.startDate || ''}
                    onChange={(e) => editingBanner && setEditingBanner({ ...editingBanner, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                  <input
                    type="date"
                    value={editingBanner?.endDate || ''}
                    onChange={(e) => editingBanner && setEditingBanner({ ...editingBanner, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingBanner(null);
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