const PRIMARY = '#C9A227'

const FAQ_ITEMS = [
  { question: '你们的交货周期是多长？', category: '产品交付', views: 1245, status: 'complete' },
  { question: '是否支持定制化服务？', category: '服务政策', views: 986, status: 'complete' },
  { question: '产品质量保修政策是什么？', category: '售后服务', views: 876, status: 'complete' },
  { question: '如何获取产品报价？', category: '商务咨询', views: 765, status: 'complete' },
  { question: '产品是否符合CE/UL认证？', category: '资质认证', views: 543, status: 'incomplete' },
]

export default function FAQManagement({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">FAQ 问答管理</div>
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
          { label: 'FAQ 总数', value: '89', unit: '条', icon: '❓' },
          { label: '总浏览量', value: '12,456', unit: '次', icon: '👁️' },
          { label: '平均完整度', value: '95%', unit: '', icon: '✅' },
          { label: '分类数', value: '8', unit: '个', icon: '📂' },
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
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">问答列表</div>
          <div className="flex gap-2">
            <input placeholder="搜索问题..." className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none" />
            <select className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none">
              <option>全部分类</option>
              <option>产品交付</option>
              <option>服务政策</option>
              <option>售后服务</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {FAQ_ITEMS.map((faq) => (
            <div key={faq.question} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">❓</span>
                <div>
                  <div className="text-sm text-gray-700">{faq.question}</div>
                  <div className="text-xs text-gray-400">{faq.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{faq.views} 次浏览</span>
                <button className="text-blue-600 hover:underline">编辑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
