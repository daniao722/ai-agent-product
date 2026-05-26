import { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Eye,
  Filter
} from 'lucide-react';
import { SecurityRecord } from '../../types';

const mockSecurityRecords: SecurityRecord[] = [
  { id: '1', type: 'attack', message: '检测到恶意IP访问尝试', ipAddress: '192.168.1.100', timestamp: '2026-05-20 14:32:15' },
  { id: '2', type: 'warning', message: '异常登录尝试', ipAddress: '10.0.0.55', timestamp: '2026-05-20 13:45:22' },
  { id: '3', type: 'success', message: '安全扫描完成，未发现威胁', ipAddress: '127.0.0.1', timestamp: '2026-05-20 12:00:00' },
  { id: '4', type: 'attack', message: 'SQL注入攻击被拦截', ipAddress: '172.16.0.23', timestamp: '2026-05-20 10:22:18' },
  { id: '5', type: 'warning', message: '多次登录失败，账户已锁定', ipAddress: '192.168.0.88', timestamp: '2026-05-20 09:15:44' },
  { id: '6', type: 'success', message: 'SSL证书状态正常', ipAddress: '-', timestamp: '2026-05-20 08:00:00' },
];

const getStatusColor = (type: SecurityRecord['type']) => {
  switch (type) {
    case 'attack':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'success':
      return 'bg-green-100 text-green-700 border-green-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusIcon = (type: SecurityRecord['type']) => {
  switch (type) {
    case 'attack':
      return <AlertTriangle className="w-5 h-5" />;
    case 'warning':
      return <Clock className="w-5 h-5" />;
    case 'success':
      return <CheckCircle className="w-5 h-5" />;
    default:
      return <Shield className="w-5 h-5" />;
  }
};

export default function SecurityManagement() {
  const [records, setRecords] = useState<SecurityRecord[]>(mockSecurityRecords);
  const [filterType, setFilterType] = useState<'all' | 'attack' | 'warning' | 'success'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(new Date());

  const filteredRecords = records.filter((record) =>
    filterType === 'all' || record.type === filterType
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLastScanTime(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastScanTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalAttacks: records.filter((r) => r.type === 'attack').length,
    totalWarnings: records.filter((r) => r.type === 'warning').length,
    totalSuccess: records.filter((r) => r.type === 'success').length,
    uptime: '99.9%',
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">安全管理</h1>
          <p className="text-gray-500 mt-1">安防系统运营看板及防护记录</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? '扫描中...' : '重新扫描'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">今日攻击拦截</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.totalAttacks}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">安全警告</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.totalWarnings}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">安全事件</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.totalSuccess}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">系统正常运行</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.uptime}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-800">防护记录</span>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部类型</option>
              <option value="attack">攻击拦截</option>
              <option value="warning">安全警告</option>
              <option value="success">安全事件</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredRecords.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getStatusColor(record.type)}`}>
                  {getStatusIcon(record.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{record.message}</p>
                  <p className="text-sm text-gray-500">IP: {record.ipAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{record.timestamp}</span>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="py-12 text-center">
            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">没有找到匹配的记录</p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-600" />
          <h3 className="font-semibold text-gray-800">安全状态概览</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-800">SSL证书</p>
              <p className="text-sm text-green-600">有效，有效期至 2027-05-20</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-800">防火墙</p>
              <p className="text-sm text-green-600">已启用，运行正常</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-800">安全扫描</p>
              <p className="text-sm text-green-600">最近扫描: {lastScanTime.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}