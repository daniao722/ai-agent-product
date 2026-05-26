import { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Globe,
  Lock,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Domain } from '../../types';

const mockDomains: Domain[] = [
  { id: '1', domainName: 'www.example.com', sslStatus: 'active', sslExpiryDate: '2027-05-20', createdAt: '2026-01-15' },
  { id: '2', domainName: 'api.example.com', sslStatus: 'active', sslExpiryDate: '2027-03-10', createdAt: '2026-02-20' },
  { id: '3', domainName: 'blog.example.com', sslStatus: 'pending', sslExpiryDate: '-', createdAt: '2026-05-18' },
  { id: '4', domainName: 'shop.example.com', sslStatus: 'expired', sslExpiryDate: '2026-05-15', createdAt: '2025-05-15' },
];

const getSSLStatusColor = (status: Domain['sslStatus']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'expired':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getSSLStatusIcon = (status: Domain['sslStatus']) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4" />;
    case 'pending':
      return <Clock className="w-4 h-4" />;
    case 'expired':
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Lock className="w-4 h-4" />;
  }
};

const getSSLStatusLabel = (status: Domain['sslStatus']) => {
  switch (status) {
    case 'active':
      return '有效';
    case 'pending':
      return '待验证';
    case 'expired':
      return '已过期';
    default:
      return '未知';
  }
};

export default function DomainManagement() {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDomain, setNewDomain] = useState('');

  const filteredDomains = domains.filter((domain) =>
    domain.domainName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个域名吗？')) {
      setDomains(domains.filter((d) => d.id !== id));
    }
  };

  const handleAdd = () => {
    if (newDomain.trim()) {
      const domain: Domain = {
        id: Date.now().toString(),
        domainName: newDomain,
        sslStatus: 'pending',
        sslExpiryDate: '-',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setDomains([...domains, domain]);
      setNewDomain('');
      setShowCreateModal(false);
    }
  };

  const handleRenewSSL = (id: string) => {
    setDomains(
      domains.map((d) =>
        d.id === id
          ? { ...d, sslStatus: 'active', sslExpiryDate: '2027-05-20' }
          : d
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">域名管理</h1>
          <p className="text-gray-500 mt-1">管理网站域名和SSL证书</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>添加域名</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索域名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">域名</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">SSL状态</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">证书到期</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">添加时间</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredDomains.map((domain) => (
                <tr key={domain.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-800">{domain.domainName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getSSLStatusColor(domain.sslStatus)}`}>
                      {getSSLStatusIcon(domain.sslStatus)}
                      {getSSLStatusLabel(domain.sslStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {domain.sslStatus === 'expired' ? (
                      <span className="text-red-600 font-medium">证书已过期</span>
                    ) : domain.sslStatus === 'pending' ? (
                      <span className="text-gray-400">待签发</span>
                    ) : (
                      <span className="text-gray-600">{domain.sslExpiryDate}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-500">{domain.createdAt}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {domain.sslStatus === 'expired' && (
                        <button
                          onClick={() => handleRenewSSL(domain.id)}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          续费证书
                        </button>
                      )}
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(domain.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDomains.length === 0 && (
          <div className="py-12 text-center">
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">没有找到匹配的域名</p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">域名统计</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">{domains.length}</p>
            <p className="text-sm text-gray-500 mt-1">总域名数</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {domains.filter((d) => d.sslStatus === 'active').length}
            </p>
            <p className="text-sm text-green-600 mt-1">证书有效</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              {domains.filter((d) => d.sslStatus === 'pending').length}
            </p>
            <p className="text-sm text-yellow-600 mt-1">待验证</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">
              {domains.filter((d) => d.sslStatus === 'expired').length}
            </p>
            <p className="text-sm text-red-600 mt-1">已过期</p>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">添加域名</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewDomain('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">域名</label>
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入域名（如：www.example.com）"
                />
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  添加域名后，系统将自动申请SSL证书，请确保域名已正确解析到本服务器。
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewDomain('');
                }}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}