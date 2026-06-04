const PRIMARY = '#C9A227'

const AB_TESTS = [
  { name: 'X500 详情页首屏优化', status: 'running', variantA: '原版', variantB: '优化版', conversion: '+23%' },
  { name: 'CTA 按钮文案测试', status: 'completed', variantA: '立即询价', variantB: '获取报价', conversion: '+18%' },
  { name: '产品图片布局测试', status: 'planned', variantA: '网格布局', variantB: '轮播布局', conversion: '-' },
]

export default function ABTest() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">A/B 测试</div>
        <button className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm" style={{ backgroundColor: PRIMARY }}>
          + 新建测试
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">测试列表</div>
        </div>
        <div className="divide-y divide-gray-50">
          {AB_TESTS.map((t) => (
            <div key={t.name} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">🧪</span>
                <div>
                  <div className="text-sm text-gray-700">{t.name}</div>
                  <div className="text-xs text-gray-400">A: {t.variantA} vs B: {t.variantB}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  t.status === 'running' ? 'text-blue-600 bg-blue-50' : t.status === 'completed' ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'
                }`}>
                  {t.status === 'running' ? '进行中' : t.status === 'completed' ? '已完成' : '待开始'}
                </span>
                {t.conversion !== '-' && <span className="text-xs text-green-600 font-semibold">{t.conversion}</span>}
                <button className="text-blue-600 hover:underline">详情</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}