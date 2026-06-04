const PRIMARY = '#C9A227'

const SUGGESTIONS = [
  { page: 'X500 伺服电机详情页', issue: '跳出率过高', suggestion: '优化首屏内容结构，增加应用场景展示', impact: '转化率 +25%', priority: 'high' },
  { page: '企业介绍页面', issue: 'SEO 评分偏低', suggestion: '补充关键词密度，优化 Meta 标签', impact: '搜索排名 +15%', priority: 'medium' },
  { page: '产品图片库', issue: '缺少 ALT 标签', suggestion: 'AI 自动生成图片描述', impact: '图片搜索 +30%', priority: 'low' },
  { page: '智能制造方案', issue: '内容结构不完整', suggestion: '补充技术参数和应用案例模块', impact: '完整度 +10%', priority: 'medium' },
]

export default function OptimizeSuggestions({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">优化建议</div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">待处理优化任务</div>
          <span className="text-xs text-gray-400">共 {SUGGESTIONS.length} 项</span>
        </div>
        <div className="divide-y divide-gray-50">
          {SUGGESTIONS.map((s) => (
            <div key={s.page} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {s.priority === 'high' ? <span className="text-red-500"></span> : s.priority === 'medium' ? <span className="text-amber-500">🟡</span> : <span className="text-green-500"></span>}
                <div>
                  <div className="text-sm text-gray-700">{s.page}</div>
                  <div className="text-xs text-gray-400">{s.issue}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.suggestion}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-green-600">{s.impact}</span>
                <button
                  className="px-3 py-1 rounded-lg text-white text-xs font-medium"
                  style={{ backgroundColor: PRIMARY }}
                  onClick={() => onNavigate('optimize/auto')}
                >
                   一键优化
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}