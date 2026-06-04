import { useState } from 'react'

const PRIMARY = '#C9A227'

const competitors = [
  {
    name: '冠成门窗',
    logo: '冠',
    posts: 42,
    avgEngagement: '3.2%',
    topContent: '工厂实拍 + 施工案例',
    platforms: ['Instagram', 'Facebook', '小红书'],
    strength: '视觉内容强，工厂透明度高',
    weakness: '缺乏价格锚点内容',
    color: '#3B82F6',
  },
  {
    name: 'Andersen Windows',
    logo: 'A',
    posts: 18,
    avgEngagement: '1.8%',
    topContent: '家装效果图 + 节能数据',
    platforms: ['Instagram', 'LinkedIn', 'YouTube'],
    strength: '品牌调性稳定，白皮书权威',
    weakness: '互动频次低，社区感弱',
    color: '#8B5CF6',
  },
]

const gapData = [
  { dimension: '视觉内容', ours: 62, competitor: 88 },
  { dimension: '视频内容', ours: 20, competitor: 55 },
  { dimension: '发帖频率', ours: 45, competitor: 78 },
  { dimension: '互动率', ours: 2.1, competitor: 3.2, isPercent: true },
  { dimension: '内容多样性', ours: 50, competitor: 72 },
]

export default function CompetitorAnalysis() {
  const [step, setStep] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(true)

  const runAnalysis = () => {
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); setStep(1) }, 2000)
  }

  return (
    <div className="p-6 space-y-5">
      {/* Upload Panel */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="text-sm font-semibold text-gray-700 mb-4">上传竞品内容样本</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-amber-300 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-xs font-medium text-gray-600">上传文章/文案</div>
            <div className="text-xs text-gray-400 mt-0.5">PDF / Word / TXT</div>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-amber-300 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-xs font-medium text-gray-600">上传海报/图片</div>
            <div className="text-xs text-gray-400 mt-0.5">JPG / PNG / WebP</div>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-amber-300 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">🔗</div>
            <div className="text-xs font-medium text-gray-600">粘贴内容链接</div>
            <div className="text-xs text-gray-400 mt-0.5">Instagram / 小红书 / YouTube</div>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <input
            placeholder="输入竞品主页链接，如 https://instagram.com/competitor"
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={runAnalysis}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: PRIMARY }}
          >
            {analyzing ? '分析中...' : '开始分析'}
          </button>
        </div>
      </div>

      {analyzed && (
        <>
          {/* Competitor Cards */}
          <div className="grid grid-cols-2 gap-4">
            {competitors.map((c) => (
              <div key={c.name} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: c.color }}>
                    {c.logo}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{c.name}</div>
                    <div className="flex gap-1 mt-0.5">
                      {c.platforms.map((p) => (
                        <span key={p} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-lg font-bold text-gray-800">{c.posts}</div>
                    <div className="text-xs text-gray-400">月均发帖</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-400 mb-0.5">平均互动率</div>
                    <div className="font-semibold text-gray-700">{c.avgEngagement}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-400 mb-0.5">高互动内容类型</div>
                    <div className="font-semibold text-gray-700 truncate">{c.topContent}</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs text-green-600 bg-green-50 rounded-lg px-2 py-1.5">
                    <span className="font-medium">优势：</span>{c.strength}
                  </div>
                  <div className="text-xs text-orange-600 bg-orange-50 rounded-lg px-2 py-1.5">
                    <span className="font-medium">弱点：</span>{c.weakness}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gap Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="text-sm font-semibold text-gray-700 mb-4">差距分析报告（vs 冠成门窗）</div>
            <div className="space-y-3">
              {gapData.map((item) => (
                <div key={item.dimension}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{item.dimension}</span>
                    <span>
                      我方 {item.isPercent ? `${item.ours}%` : item.ours} / 竞品 {item.isPercent ? `${item.competitor}%` : item.competitor}
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full">
                    <div className="absolute h-2 rounded-full bg-blue-300" style={{ width: `${item.isPercent ? item.competitor * 30 : item.competitor}%` }} />
                    <div className="absolute h-2 rounded-full" style={{ width: `${item.isPercent ? item.ours * 30 : item.ours}%`, backgroundColor: PRIMARY }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="text-xs font-semibold text-amber-800 mb-1">AI 建议内容方向</div>
              <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                <li>增加短视频内容（15-60秒工厂实拍），提升视频发布比例至40%</li>
                <li>提高发帖频率至每周6-8篇，重点加强周四、周六发布</li>
                <li>添加节能数据可视化信息图，强化产品技术权威感</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
