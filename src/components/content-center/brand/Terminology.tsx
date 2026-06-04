const PRIMARY = '#C9A227'

const TERMS = [
  { term: '伺服电机', translation: 'Servo Motor', usage: 156 },
  { term: '工业自动化', translation: 'Industrial Automation', usage: 89 },
  { term: '智能制造', translation: 'Smart Manufacturing', usage: 67 },
  { term: '数字化转型', translation: 'Digital Transformation', usage: 45 },
]

export default function Terminology() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">专业术语库</div>
        <button className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm" style={{ backgroundColor: PRIMARY }}>
          + 添加术语
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">术语列表</div>
        </div>
        <div className="divide-y divide-gray-50">
          {TERMS.map((t) => (
            <div key={t.term} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 font-medium">{t.term}</span>
                <span className="text-gray-300">→</span>
                <span className="text-sm text-gray-600">{t.translation}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">使用 {t.usage} 次</span>
                <button className="text-blue-600 hover:underline">编辑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}