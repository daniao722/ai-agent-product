const PRIMARY = '#C9A227'

const AUTO_RULES = [
  { module: '行业动态专栏', frequency: '每周 2 篇', priority: '高', status: 'active' },
  { module: '产品新闻', frequency: '每月 4 篇', priority: '中', status: 'active' },
  { module: '解决方案更新', frequency: '每季度 2 篇', priority: '中', status: 'active' },
  { module: 'FAQ 问答', frequency: '每月 5 条', priority: '低', status: 'paused' },
]

export default function AutoUpdatePlan({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">自动更新计划</div>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm"
          style={{ backgroundColor: PRIMARY }}
        >
          + 新增规则
        </button>
      </div>

      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
        <div className="text-sm font-semibold text-amber-800 mb-1">🤖 智能计划已激活</div>
        <div className="text-sm text-amber-700">
          AI 已根据您的网站结构和行业特性，自动生成周期性内容更新计划。系统将持续监控行业动态，优先更新时效性强的内容。
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">自动更新规则</div>
        </div>
        <div className="divide-y divide-gray-50">
          {AUTO_RULES.map((r) => (
            <div key={r.module} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📅</span>
                <div>
                  <div className="text-sm text-gray-700">{r.module}</div>
                  <div className="text-xs text-gray-400">频率：{r.frequency}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  r.priority === '高' ? 'text-red-600 bg-red-50' : r.priority === '中' ? 'text-amber-600 bg-amber-50' : 'text-gray-500 bg-gray-50'
                }`}>{r.priority} 优先级</span>
                <span className={`text-xs px-2 py-0.5 rounded ${r.status === 'active' ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
                  {r.status === 'active' ? '已启用' : '已暂停'}
                </span>
                <button className="text-blue-600 hover:underline">编辑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
