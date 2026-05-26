import {
  Plus,
  Building,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';

const mockQuotes = [
  { id: '1', code: 'QT-20260520-001', customer: 'ABC科技', product: 'IRB-2000工业机器人', quantity: 2, amount: 296000, status: 'pending', validUntil: '2026-06-19' },
  { id: '2', code: 'QT-20260519-002', customer: 'XYZ集团', product: '协作机器人套装', quantity: 5, amount: 425000, status: 'accepted', validUntil: '2026-06-18' },
  { id: '3', code: 'QT-20260518-003', customer: 'DEF制造', product: '自动化生产线', quantity: 1, amount: 1280000, status: 'negotiating', validUntil: '2026-06-17' },
];

const quoteStatusLabels: Record<string, string> = {
  pending: '待处理',
  accepted: '已接受',
  negotiating: '洽谈中',
};

const quoteStatusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700',
  accepted: 'bg-green-100 text-green-700',
  negotiating: 'bg-yellow-100 text-yellow-700',
};

export default function SmartQuote() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">智能报价</h1>
          <p className="text-gray-500 mt-1">AI辅助生成精准报价单</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>新建报价</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">报价单号</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">客户</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">产品</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">数量</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">金额</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">有效期至</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">状态</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockQuotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <span className="font-mono text-sm text-gray-800">{quote.code}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-800">{quote.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{quote.product}</td>
                    <td className="px-4 py-4 text-gray-600">{quote.quantity}</td>
                    <td className="px-4 py-4 font-semibold text-gray-800">¥{quote.amount.toLocaleString()}</td>
                    <td className="px-4 py-4 text-gray-600">{quote.validUntil}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${quoteStatusColors[quote.status]}`}>
                        {quoteStatusLabels[quote.status]}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
