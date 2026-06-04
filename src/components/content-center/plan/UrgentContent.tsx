const PRIMARY = '#C9A227'

const URGENT_ITEMS = [
  { title: '新政策：6月工业自动化补贴政策解读', urgency: 'high', source: '政府官网', detected: '10分钟前' },
  { title: '行业重大：2026 Q2 制造业 PMI 数据发布', urgency: 'high', source: '国家统计局', detected: '2小时前' },
  { title: '竞品动态：竞争对手发布新品 X900 系列', urgency: 'medium', source: '竞品官网', detected: '昨天' },
  { title: '展会预告：6月上海工博会参展指南', urgency: 'medium', source: '展会官网', detected: '昨天' },
]

export default function UrgentContent() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">时效内容识别</div>
        <div className="text-xs text-gray-400">AI 实时监控行业动态，自动识别需更新的高时效内容</div>
      </div>

      <div className="bg-red-50 rounded-xl border border-red-200 p-4">
        <div className="text-sm font-semibold text-red-800 mb-1"> 高时效内容提醒</div>
        <div className="text-sm text-red-700">检测到 2 条高时效性内容需要立即更新，建议优先处理。</div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">识别结果</div>
        </div>
        <div className="divide-y divide-gray-50">
          {URGENT_ITEMS.map((item) => (
            <div key={item.title} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {item.urgency === 'high' ? <span className="text-red-500">🔴</span> : <span className="text-amber-500">🟡</span>}
                <div>
                  <div className="text-sm text-gray-700">{item.title}</div>
                  <div className="text-xs text-gray-400">{item.source} · 检测于 {item.detected}</div>
                </div>
              </div>
              <button className="px-3 py-1 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: PRIMARY }}>
                立即处理
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
