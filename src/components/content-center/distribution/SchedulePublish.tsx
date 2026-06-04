const PRIMARY = '#C9A227'

const SCHEDULED_ITEMS = [
  { title: '618 大促产品宣传', channels: ['官网', '微信', 'LinkedIn'], time: '06/18 10:00', status: 'scheduled' },
  { title: '新品发布新闻稿', channels: ['官网', 'LinkedIn'], time: '06/20 09:00', status: 'scheduled' },
  { title: '行业趋势报告', channels: ['微信', 'LinkedIn', 'Facebook'], time: '06/25 14:00', status: 'draft' },
]

export default function SchedulePublish() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">定时发布</div>
        <button className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm" style={{ backgroundColor: PRIMARY }}>
          + 创建定时任务
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">定时任务列表</div>
        </div>
        <div className="divide-y divide-gray-50">
          {SCHEDULED_ITEMS.map((s) => (
            <div key={s.title} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-500"></span>
                <div>
                  <div className="text-sm text-gray-700">{s.title}</div>
                  <div className="text-xs text-gray-400">渠道：{s.channels.join(' · ')}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">{s.time}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${s.status === 'scheduled' ? 'text-blue-600 bg-blue-50' : 'text-gray-400 bg-gray-50'}`}>
                  {s.status === 'scheduled' ? '已排期' : '草稿'}
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