const PRIMARY = '#C9A227'

const SOLUTIONS = [
  { name: '智能制造解决方案', industry: '制造业', downloads: 342, status: 'complete', completeness: 88 },
  { name: '新能源行业解决方案', industry: '新能源', downloads: 256, status: 'complete', completeness: 82 },
  { name: '自动化产线方案', industry: '制造业', downloads: 198, status: 'complete', completeness: 75 },
  { name: '智慧物流方案', industry: '物流', downloads: 89, status: 'incomplete', completeness: 60 },
]

export default function Solutions({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">解决方案管理</div>
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
          { label: '方案总数', value: '45', unit: '个', icon: '💡' },
          { label: '总下载量', value: '1,286', unit: '次', icon: '📥' },
          { label: '平均完整度', value: '78%', unit: '', icon: '✅' },
          { label: '覆盖行业', value: '6', unit: '个', icon: '' },
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
          <div className="text-sm font-semibold text-gray-700">解决方案列表</div>
        </div>
        <div className="divide-y divide-gray-50">
          {SOLUTIONS.map((s) => (
            <div key={s.name} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">💡</span>
                <div>
                  <div className="text-sm text-gray-700">{s.name}</div>
                  <div className="text-xs text-gray-400">{s.industry}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{s.downloads} 次下载</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 rounded-full" style={{ width: `${s.completeness}%`, backgroundColor: s.completeness > 80 ? '#10B981' : PRIMARY }} />
                  </div>
                  <span>{s.completeness}%</span>
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
