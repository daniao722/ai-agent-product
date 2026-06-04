const PRIMARY = '#C9A227'

const PRODUCTS = [
  { name: 'X500 伺服电机', category: '工业自动化', languages: 4, status: 'complete', completeness: 92 },
  { name: 'S200 传感器', category: '工业自动化', languages: 3, status: 'complete', completeness: 85 },
  { name: 'C300 控制器', category: '控制设备', languages: 4, status: 'complete', completeness: 78 },
  { name: 'P100 驱动模块', category: '动力设备', languages: 2, status: 'incomplete', completeness: 65 },
  { name: 'M50 电机模块', category: '动力设备', languages: 2, status: 'incomplete', completeness: 58 },
]

export default function ProductInfo({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">产品信息管理</div>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}
          onClick={() => onNavigate('creation/agent')}
        >
          + AI 辅助创建
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '产品总数', value: '24', unit: '款', icon: '📦' },
          { label: '产品页总数', value: '156', unit: '篇', icon: '📄' },
          { label: '平均完整度', value: '85%', unit: '', icon: '✅' },
          { label: '多语言覆盖', value: '4', unit: '种', icon: '🌐' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">{s.icon} {s.label}</div>
            <div className="text-2xl font-bold text-gray-800">
              {s.value}
              {s.unit && <span className="text-sm font-normal text-gray-500 ml-1">{s.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">产品列表</div>
          <div className="flex gap-2">
            <input placeholder="搜索产品..." className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none" />
            <select className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none">
              <option>全部状态</option>
              <option>已完成</option>
              <option>待补充</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📦</span>
                <div>
                  <div className="text-sm text-gray-700">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{p.languages} 种语言</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 rounded-full" style={{ width: `${p.completeness}%`, backgroundColor: p.completeness > 80 ? '#10B981' : PRIMARY }} />
                  </div>
                  <span>{p.completeness}%</span>
                </div>
                <button className="text-blue-600 hover:underline">编辑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
