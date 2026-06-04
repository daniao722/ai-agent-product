const PRIMARY = '#C9A227'

const ASSET_SCORES = [
  { category: '品牌故事', score: 92, items: 28, status: 'excellent' },
  { category: '产品信息', score: 85, items: 156, status: 'good' },
  { category: '解决方案', score: 78, items: 45, status: 'good' },
  { category: 'FAQ 问答', score: 95, items: 89, status: 'excellent' },
  { category: '行业洞察', score: 71, items: 67, status: 'warning' },
]

export default function AssetIntegrity({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">资产完整度分析</div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '整体完整度', value: '87%', icon: '📊', color: '#10B981' },
          { label: '总内容数', value: '385', unit: '篇', icon: '📝' },
          { label: '待完善内容', value: '42', unit: '篇', icon: '⚠️' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">{s.icon} {s.label}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
              {s.unit && <span className="text-sm font-normal text-gray-500 ml-1">{s.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="text-sm font-semibold text-gray-700 mb-4">各模块完整度</div>
        <div className="space-y-4">
          {ASSET_SCORES.map((a) => (
            <div key={a.category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">{a.category}</span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">{a.items} 篇</span>
                  <span className="font-semibold" style={{ color: PRIMARY }}>{a.score}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${a.score}%`,
                    backgroundColor: a.score > 85 ? '#10B981' : a.score > 70 ? PRIMARY : '#EF4444',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
        <div className="text-sm font-semibold text-amber-800 mb-2">🤖 AI 完善建议</div>
        <div className="text-sm text-amber-700 space-y-2">
          <p>基于当前资产完整度分析，建议优先完善以下内容：</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>行业洞察 - 建议新增 15 篇行业分析文章（当前完整度 71%）</li>
            <li>解决方案 - 建议补充 8 个行业方案（当前完整度 78%）</li>
            <li>产品信息 - 12 款产品缺少应用场景描述</li>
          </ul>
          <button
            className="mt-3 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm"
            style={{ backgroundColor: PRIMARY }}
            onClick={() => onNavigate('creation/agent')}
          >
            ✨ AI 一键补充
          </button>
        </div>
      </div>
    </div>
  )
}
