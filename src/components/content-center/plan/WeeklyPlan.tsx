const PRIMARY = '#C9A227'

const WEEKLY_TASKS = [
  { title: '行业动态 - 6月政策解读', status: 'done', type: 'AI 文案', due: '06/03' },
  { title: 'X500 产品页更新', status: 'in-progress', type: 'AI 文案', due: '06/04' },
  { title: '展会海报设计', status: 'in-progress', type: 'AI 图片', due: '06/05' },
  { title: '产品视频脚本', status: 'pending', type: 'AI 文案', due: '06/06' },
  { title: 'FAQ 新增 5 条', status: 'pending', type: 'AI 文案', due: '06/07' },
  { title: 'LinkedIn 社媒帖子', status: 'pending', type: 'AI 文案', due: '06/07' },
]

export default function WeeklyPlan({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">本周内容计划</div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm"
            style={{ backgroundColor: PRIMARY }}
            onClick={() => onNavigate('creation/agent')}
          >
            + 新增任务
          </button>
          <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
            🤖 AI 生成计划
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '本周任务', value: '6', unit: '项', done: 1 },
          { label: '已完成', value: '1', unit: '项', icon: '✅' },
          { label: '进行中', value: '2', unit: '项', icon: '🔄' },
          { label: '待开始', value: '3', unit: '项', icon: '⏳' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-gray-800">
              {s.value}
              {s.unit && <span className="text-sm font-normal text-gray-500 ml-1">{s.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">任务列表</div>
        </div>
        <div className="divide-y divide-gray-50">
          {WEEKLY_TASKS.map((t) => (
            <div key={t.title} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {t.status === 'done' && <span className="text-green-500">✅</span>}
                {t.status === 'in-progress' && <span className="text-blue-500">🔄</span>}
                {t.status === 'pending' && <span className="text-gray-300">⏳</span>}
                <div>
                  <div className="text-sm text-gray-700">{t.title}</div>
                  <div className="text-xs text-gray-400">{t.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>截止 {t.due}</span>
                <button className="text-blue-600 hover:underline">编辑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
