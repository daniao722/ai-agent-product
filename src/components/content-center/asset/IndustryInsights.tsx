const PRIMARY = '#C9A227'

const INSIGHTS = [
  { title: '2026 年工业自动化行业趋势报告', date: '2026-05-15', views: 2345, type: '白皮书' },
  { title: '智能制造技术最新发展动态', date: '2026-05-10', views: 1876, type: '行业分析' },
  { title: '新能源产业市场前景分析', date: '2026-05-05', views: 1234, type: '市场报告' },
  { title: '全球供应链变化对企业的影响', date: '2026-04-28', views: 987, type: '深度解读' },
]

export default function IndustryInsights({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">行业洞察管理</div>
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
          { label: '洞察文章总数', value: '67', unit: '篇', icon: '📰' },
          { label: '总阅读量', value: '45,678', unit: '次', icon: '👁️' },
          { label: '平均完整度', value: '71%', unit: '', icon: '✅' },
          { label: '月度更新', value: '8', unit: '篇', icon: '📅' },
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
          <div className="text-sm font-semibold text-gray-700">洞察文章列表</div>
        </div>
        <div className="divide-y divide-gray-50">
          {INSIGHTS.map((i) => (
            <div key={i.title} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📰</span>
                <div>
                  <div className="text-sm text-gray-700">{i.title}</div>
                  <div className="text-xs text-gray-400">{i.date} · {i.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{i.views} 次阅读</span>
                <button className="text-blue-600 hover:underline">编辑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
