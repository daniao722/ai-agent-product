const PRIMARY = '#C9A227'

const DIAGNOSIS_ITEMS = [
  { page: 'X500 伺服电机详情页', type: '产品页', issues: 3, score: 62, status: 'critical' },
  { page: '企业介绍页面', type: '品牌页', issues: 2, score: 75, status: 'warning' },
  { page: '智能制造解决方案', type: '方案页', issues: 1, score: 88, status: 'good' },
  { page: '产品图片库', type: '素材页', issues: 1, score: 82, status: 'good' },
]

export default function ContentDiagnosis({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">内容诊断报告</div>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}
        >
           重新诊断
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '诊断页面数', value: '42', unit: '个', icon: '📄' },
          { label: '发现问题', value: '24', unit: '项', icon: '' },
          { label: '平均得分', value: '76', unit: '分', icon: '📊' },
          { label: '可一键优化', value: '18', unit: '项', icon: '' },
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
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">诊断结果</div>
        </div>
        <div className="divide-y divide-gray-50">
          {DIAGNOSIS_ITEMS.map((d) => (
            <div key={d.page} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {d.status === 'critical' ? <span className="text-red-500"></span> : d.status === 'warning' ? <span className="text-amber-500">🟡</span> : <span className="text-green-500">🟢</span>}
                <div>
                  <div className="text-sm text-gray-700">{d.page}</div>
                  <div className="text-xs text-gray-400">{d.type} · {d.issues} 项问题</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 rounded-full" style={{ width: `${d.score}%`, backgroundColor: d.score > 80 ? '#10B981' : d.score > 60 ? PRIMARY : '#EF4444' }} />
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">{d.score} 分</span>
                </div>
                <button
                  className="px-3 py-1 rounded-lg text-white text-xs font-medium"
                  style={{ backgroundColor: PRIMARY }}
                  onClick={() => onNavigate('optimize/auto')}
                >
                   一键优化
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}