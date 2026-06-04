const PRIMARY = '#C9A227'

const OPTIMIZE_TASKS = [
  { task: 'X500 详情页 - 关键词密度优化', status: 'pending', type: 'SEO' },
  { task: '企业介绍 - Meta 标签优化', status: 'pending', type: 'SEO' },
  { task: '产品图片 - ALT 标签自动生成', status: 'pending', type: 'SEO' },
  { task: '智能制造方案 - 内容结构补充', status: 'pending', type: '内容' },
]

export default function OneClickOptimize() {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">一键优化</div>

      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
        <div className="text-sm font-semibold text-amber-800 mb-1">🤖 AI 优化引擎就绪</div>
        <div className="text-sm text-amber-700">检测到 18 项可自动化处理的优化任务，预计执行时间 3-5 分钟。</div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">待执行任务</div>
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm"
            style={{ backgroundColor: PRIMARY }}
          >
             一键执行全部 ({OPTIMIZE_TASKS.length})
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {OPTIMIZE_TASKS.map((t) => (
            <div key={t.task} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">⏳</span>
                <div>
                  <div className="text-sm text-gray-700">{t.task}</div>
                  <div className="text-xs text-gray-400">类型：{t.type}</div>
                </div>
              </div>
              <button className="px-3 py-1 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: PRIMARY }}>
                执行
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}