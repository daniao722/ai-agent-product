const PRIMARY = '#C9A227'

const TEMPLATES = [
  { name: 'B2B 制造业标准模板', industry: '制造业', sections: 12, usage: 45 },
  { name: 'SaaS 软件行业模板', industry: 'SaaS', sections: 10, usage: 23 },
  { name: '新能源行业模板', industry: '新能源', sections: 14, usage: 18 },
  { name: '物流行业模板', industry: '物流', sections: 8, usage: 12 },
]

export default function IndustryTemplate() {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">行业模板库</div>

      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map((t) => (
          <div key={t.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">{t.name}</span>
              <span className="text-xs text-gray-400">{t.industry}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>{t.sections} 个内容模块</span>
              <span>{t.usage} 次使用</span>
            </div>
            <button
              className="w-full py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: PRIMARY }}
            >
              使用此模板
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
