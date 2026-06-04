const PRIMARY = '#C9A227'

const BRAND_ITEMS = [
  { name: '企业概述', status: 'complete', count: 1, wordCount: 800 },
  { name: '品牌故事', status: 'complete', count: 3, wordCount: 2400 },
  { name: '发展历程', status: 'complete', count: 1, wordCount: 600 },
  { name: '企业文化', status: 'incomplete', count: 0, wordCount: 0 },
  { name: '荣誉资质', status: 'complete', count: 12, wordCount: 300 },
  { name: '团队介绍', status: 'incomplete', count: 0, wordCount: 0 },
]

export default function BrandStory({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">品牌故事管理</div>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}
          onClick={() => onNavigate('creation/agent')}
        >
          + AI 辅助创建
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '品牌内容总数', value: '17', unit: '篇', icon: '📝' },
          { label: '总字数', value: '4,100', unit: '字', icon: '📊' },
          { label: '完整度', value: '72%', unit: '', icon: '✅' },
          { label: '多语言版本', value: '3', unit: '种', icon: '🌐' },
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

      {/* Content List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">内容清单</div>
        </div>
        <div className="divide-y divide-gray-50">
          {BRAND_ITEMS.map((item) => (
            <div key={item.name} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📄</span>
                <span className="text-sm text-gray-700">{item.name}</span>
                {item.status === 'complete' ? (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">已完成</span>
                ) : (
                  <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">待补充</span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{item.count} 篇</span>
                <span>{item.wordCount} 字</span>
                <button className="text-blue-600 hover:underline">编辑</button>
                <button className="text-gray-400 hover:text-gray-600">预览</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
        <div className="text-sm font-semibold text-amber-800 mb-2">🤖 AI 补充建议</div>
        <div className="text-sm text-amber-700">
          <p>检测到您的品牌故事缺少以下内容，AI 可辅助快速生成：</p>
          <ul className="list-disc ml-5 mt-1 space-y-1">
            <li>企业文化 - 建议生成 300-500 字企业文化描述</li>
            <li>团队介绍 - 建议生成核心团队成员介绍</li>
          </ul>
          <button
            className="mt-3 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm"
            style={{ backgroundColor: PRIMARY }}
            onClick={() => onNavigate('creation/agent')}
          >
             一键生成补充内容
          </button>
        </div>
      </div>
    </div>
  )
}
