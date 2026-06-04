import { useState } from 'react'

const PRIMARY = '#C9A227'

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', color: '#E1306C', shortLabel: 'IG' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2', shortLabel: 'FB' },
  { id: 'linkedin', label: 'LinkedIn', color: '#0A66C2', shortLabel: 'in' },
  { id: 'twitter', label: 'Twitter/X', color: '#000000', shortLabel: 'X' },
  { id: 'xiaohongshu', label: '小红书', color: '#FF2442', shortLabel: '红' },
  { id: 'wechat', label: '微信公众号', color: '#07C160', shortLabel: '微' },
]

const scheduledPosts = [
  {
    date: '08.09（周日）',
    platform: 'instagram',
    title: '核心竞争力',
    summary: '以{高品质节能系统窗产品}...',
    hasImage: false,
  },
  {
    date: '08.10（周一）',
    platform: 'facebook',
    title: 'UGC联动',
    summary: '围绕{主叙事结构}讲述{品牌...',
    hasImage: false,
  },
  {
    date: '08.10（周一）',
    platform: 'linkedin',
    title: '生产工艺',
    summary: '以{先进工艺}为锚点，通...',
    hasImage: true,
  },
  {
    date: '08.11（周二）',
    platform: 'facebook',
    title: '研发实力',
    summary: '以{高标准的质量管控体系}...',
    hasImage: false,
  },
  {
    date: '08.11（周二）',
    platform: 'instagram',
    title: '品牌价值',
    summary: '以{匠心工艺}传递{品质...',
    hasImage: false,
  },
]

const history = [
  { title: '工厂实拍 · 节能门窗生产线', platforms: ['instagram', 'facebook'], likes: 342, comments: 28, shares: 56, date: '2026-05-24' },
  { title: 'B2B建材出海趋势分析 2026', platforms: ['linkedin'], likes: 187, comments: 42, shares: 91, date: '2026-05-22' },
  { title: '618倒计时：工厂直供进行中', platforms: ['instagram', 'facebook', 'xiaohongshu'], likes: 621, comments: 84, shares: 132, date: '2026-05-20' },
]

export default function SocialDistribution() {
  const [tab, setTab] = useState('compose')
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'facebook', 'linkedin'])
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [content, setContent] = useState('')

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-6 space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { id: 'compose', label: '内容发布' },
          { id: 'batch', label: 'AI批量安排' },
          { id: 'history', label: '发布历史' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'compose' && (
        <div className="grid grid-cols-3 gap-5">
          {/* Composer */}
          <div className="col-span-2 space-y-4">
            {/* Platform Selector */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="text-xs font-semibold text-gray-500 mb-3">选择发布平台（可多选）</div>
              <div className="flex gap-2 flex-wrap">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                      selectedPlatforms.includes(p.id) ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                    style={selectedPlatforms.includes(p.id) ? { backgroundColor: p.color } : {}}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${selectedPlatforms.includes(p.id) ? 'bg-white/20' : 'bg-gray-100'}`}
                      style={selectedPlatforms.includes(p.id) ? {} : { color: p.color }}
                    >
                      {p.shortLabel}
                    </span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="text-xs font-semibold text-gray-500 mb-2">内容正文</div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                placeholder="输入内容，或从 AI 文案工场导入..."
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <button className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">+ 图片</button>
                  <button className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">+ 视频</button>
                  <button className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"># 话题标签</button>
                </div>
                <span className="text-xs text-gray-400">{content.length} / 280</span>
              </div>
            </div>

            {/* Platform-specific adjustments */}
            {selectedPlatforms.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="text-xs font-semibold text-gray-500 mb-3">各平台内容调整</div>
                <div className="space-y-3">
                  {selectedPlatforms.map((pid) => {
                    const p = PLATFORMS.find((pl) => pl.id === pid)
                    return (
                      <div key={pid} className="border border-gray-100 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded text-white text-xs flex items-center justify-center font-bold"
                            style={{ backgroundColor: p.color }}>
                            {p.shortLabel}
                          </div>
                          <span className="text-xs font-medium text-gray-700">{p.label}</span>
                          <span className="text-xs text-gray-400 ml-auto">
                            {pid === 'twitter' ? '字数 ≤280' : pid === 'linkedin' ? '150-700字最佳' : pid === 'xiaohongshu' ? '图片1-18张' : ''}
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          placeholder={`${p.label} 专属内容（可与主文不同）`}
                          className="w-full text-xs border border-gray-100 rounded-lg px-2.5 py-2 focus:outline-none focus:border-amber-400 resize-none bg-gray-50"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Schedule */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="text-xs font-semibold text-gray-500 mb-3">发布时间</div>
              <div className="space-y-2">
                {['立即发布', '定时发布', '智能推荐时间'].map((opt, i) => (
                  <label key={opt} className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${i === 2 ? 'border-amber-400' : 'border-gray-200'}`}
                    style={i === 2 ? { backgroundColor: '#FBF5E0' } : {}}>
                    <input type="radio" name="timing" defaultChecked={i === 2} className="text-amber-500" />
                    <span className="text-sm text-gray-700">{opt}</span>
                    {i === 2 && <span className="text-xs text-amber-600 ml-auto">Thu 14:00</span>}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="text-xs font-semibold text-gray-500 mb-3">审核设置</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <span>自动审核</span>
                  <div className="w-8 h-4 rounded-full relative" style={{ backgroundColor: PRIMARY }}>
                    <span className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>品牌合规检测</span>
                  <div className="w-8 h-4 rounded-full relative" style={{ backgroundColor: PRIMARY }}>
                    <span className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl text-white text-sm font-medium shadow-sm" style={{ backgroundColor: PRIMARY }}>
              {selectedPlatforms.length > 0 ? `发布到 ${selectedPlatforms.length} 个平台` : '请选择平台'}
            </button>
          </div>
        </div>
      )}

      {tab === 'batch' && (
        <div className="space-y-4">
          {/* Time range + buttons */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-6 mb-5">
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">计划时间</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700">
                  <span>📅</span>
                  <span>2026-08-08  —  2026-08-14</span>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">发布计划</label>
                  <input placeholder="发布渠道及内容主题要点" className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-56 focus:outline-none focus:border-amber-400" />
                </div>
                <button className="px-4 py-2 rounded-xl text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>✨ AI帮我规划</button>
                <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">手动添加</button>
                <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">一键清空</button>
              </div>
            </div>

            {/* Post Cards */}
            <div className="space-y-3">
              {scheduledPosts.map((post, i) => {
                const platform = PLATFORMS.find((p) => p.id === post.platform)
                const showDate = i === 0 || scheduledPosts[i-1].date !== post.date
                return (
                  <div key={i}>
                    {showDate && (
                      <div className="text-sm text-gray-500 py-1">{post.date}</div>
                    )}
                    <div className="border-2 rounded-xl p-4 ml-24" style={{ borderColor: '#E5C75A', backgroundColor: '#FFFDF0' }}>
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded text-xs text-white flex items-center justify-center font-bold flex-shrink-0"
                          style={{ backgroundColor: '#C9A227', fontSize: '9px' }}>
                          Ai
                        </div>
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ backgroundColor: platform?.color }}
                        >
                          {platform?.shortLabel}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-800">{post.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">内容摘要：{post.summary}</div>
                        </div>
                        {/* Image slots */}
                        <div className="flex gap-2">
                          {post.hasImage && (
                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
                              🖼️
                            </div>
                          )}
                          <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-xl cursor-pointer hover:border-amber-400 hover:text-amber-400 transition-colors">
                            +
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button className="w-6 h-6 rounded text-gray-400 hover:text-red-400 flex items-center justify-center text-sm">✕</button>
                          <button className="w-6 h-6 rounded text-gray-400 hover:text-blue-400 flex items-center justify-center text-sm">✏</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
              <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                预约08.07日再生成
              </button>
              <button className="px-5 py-2.5 rounded-xl text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>
                立即生成
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
            <div className="col-span-4">内容</div>
            <div className="col-span-2">平台</div>
            <div className="col-span-1 text-center">点赞</div>
            <div className="col-span-1 text-center">评论</div>
            <div className="col-span-1 text-center">分享</div>
            <div className="col-span-2">日期</div>
            <div className="col-span-1 text-right">操作</div>
          </div>
          {history.map((item, i) => (
            <div key={i} className="grid grid-cols-12 px-5 py-3.5 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-4 text-sm font-medium text-gray-800">{item.title}</div>
              <div className="col-span-2">
                <div className="flex gap-1">
                  {item.platforms.map((pid) => {
                    const p = PLATFORMS.find((pl) => pl.id === pid)
                    return (
                      <div key={pid} className="w-5 h-5 rounded text-white text-xs flex items-center justify-center font-bold"
                        style={{ backgroundColor: p?.color, fontSize: '8px' }}>
                        {p?.shortLabel}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="col-span-1 text-center text-sm text-gray-700">❤️ {item.likes}</div>
              <div className="col-span-1 text-center text-sm text-gray-700">💬 {item.comments}</div>
              <div className="col-span-1 text-center text-sm text-gray-700">🔄 {item.shares}</div>
              <div className="col-span-2 text-xs text-gray-400">{item.date}</div>
              <div className="col-span-1 text-right">
                <button className="text-xs" style={{ color: PRIMARY }}>详情</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
