const PRIMARY = '#C9A227'

const CONTENT_PERFORMANCE = [
  { title: 'X500 伺服电机产品页', views: 4523, conversion: '12%', time: '2m30s', score: 85 },
  { title: '智能制造解决方案', views: 3210, conversion: '8%', time: '3m15s', score: 78 },
  { title: '618 大促产品宣传', views: 8765, conversion: '15%', time: '1m45s', score: 92 },
  { title: '企业介绍页面', views: 2345, conversion: '5%', time: '1m10s', score: 65 },
]

export default function ContentPerformance() {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">内容表现</div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">内容表现排名</div>
        </div>
        <div className="divide-y divide-gray-50">
          {CONTENT_PERFORMANCE.map((c) => (
            <div key={c.title} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div>
                <div className="text-sm text-gray-700">{c.title}</div>
                <div className="text-xs text-gray-400 mt-1">
                  停留 {c.time} · 转化 {c.conversion}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{c.views} 次浏览</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 rounded-full" style={{ width: `${c.score}%`, backgroundColor: c.score > 80 ? '#10B981' : PRIMARY }} />
                  </div>
                  <span>{c.score} 分</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}