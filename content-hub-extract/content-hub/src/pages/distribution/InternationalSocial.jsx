import { useState } from 'react'

const PRIMARY = '#C9A227'

const PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2', account: 'MR Robotics Official', followers: '4.2K', status: 'connected', region: 'Global' },
  { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2', account: 'MR Industrial', followers: '8.7K', status: 'connected', region: 'EU/NA' },
  { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E1306C', account: '@mr_robotics', followers: '6.1K', status: 'connected', region: 'Global' },
  { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: '#000000', account: '@MRRobotics', followers: '2.8K', status: 'connected', region: 'NA/EU' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', color: '#FF0000', account: 'MR Robotics', followers: '1.2K', status: 'connected', region: 'Global' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#010101', account: '@mrrobotics', followers: '3.4K', status: 'disconnected', region: 'Global' },
]

const POSTS = [
  {
    id: 1,
    title: 'MR-200: Precision meets Power — ±0.02mm Repeatability',
    platforms: ['linkedin', 'facebook'],
    status: 'published',
    publishedTime: '2026-05-27 14:00 CET',
    preview: 'When precision matters most, the MR-200 delivers. Our latest industrial robot achieves ±0.02mm repeatability...',
    type: 'image',
    imageCount: 3,
    views: 4820,
    likes: 186,
    region: '面向欧洲受众',
  },
  {
    id: 2,
    title: 'Smart Manufacturing Revolution — Factory Tour [Video]',
    platforms: ['youtube', 'instagram'],
    status: 'scheduled',
    scheduledTime: '2026-06-01 10:00 EST',
    preview: 'Step inside the future of manufacturing. See how AI-driven robotics transforms production lines...',
    type: 'video',
    duration: '3:42',
    region: '面向北美受众',
  },
  {
    id: 3,
    title: 'Innovative Robotics for the EU Market — Compliance & Performance',
    platforms: ['linkedin'],
    status: 'draft',
    preview: 'Meeting CE standards while pushing performance boundaries — the MR-200 is certified for European markets...',
    type: 'article',
    region: '面向欧洲市场',
  },
  {
    id: 4,
    title: 'Industrial AI in 60 Seconds 🤖',
    platforms: ['tiktok', 'instagram'],
    status: 'draft',
    preview: 'Quick look at how MR-200\'s AI vision system works in real production...',
    type: 'video',
    duration: '58秒',
    region: '全球受众',
  },
]

const STATUS_CONFIG = {
  published: { label: 'Published', color: '#10B981', bg: '#F0FDF4' },
  scheduled: { label: 'Scheduled', color: '#3B82F6', bg: '#EFF6FF' },
  draft: { label: 'Draft', color: '#6B7280', bg: '#F3F4F6' },
}

const PEAK_TIMES = {
  linkedin: { eu: ['CET 9:00-11:00', 'CET 17:00-19:00'], na: ['EST 8:00-10:00', 'EST 17:00-18:00'] },
  facebook: { eu: ['CET 13:00-16:00', 'CET 20:00-22:00'], na: ['EST 13:00-16:00', 'EST 20:00-22:00'] },
  instagram: { eu: ['CET 11:00-13:00', 'CET 19:00-21:00'], na: ['EST 11:00-13:00', 'EST 19:00-21:00'] },
  twitter: { eu: ['CET 8:00-10:00', 'CET 12:00-13:00'], na: ['EST 9:00-11:00', 'EST 15:00-17:00'] },
  youtube: { global: ['12:00-16:00 local time'] },
  tiktok: { global: ['7:00-9:00 local', '19:00-23:00 local'] },
}

export default function InternationalSocial() {
  const [activeTab, setActiveTab] = useState('posts')
  const [selectedPlatforms, setSelectedPlatforms] = useState(['linkedin', 'facebook', 'instagram'])

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-6 space-y-5">
      {/* Platform Cards */}
      <div className="grid grid-cols-6 gap-3">
        {PLATFORMS.map((p) => (
          <div
            key={p.id}
            onClick={() => togglePlatform(p.id)}
            className={`bg-white rounded-xl border p-3 text-center cursor-pointer transition-all ${
              selectedPlatforms.includes(p.id) ? 'border-amber-300 shadow-sm' : 'border-gray-200 opacity-60'
            }`}
          >
            <div className="text-2xl mb-1">{p.icon}</div>
            <div className="text-xs font-medium text-gray-700">{p.name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{p.followers}</div>
            <div className="text-xs text-gray-300 mt-0.5">{p.region}</div>
            <div className="mt-1.5">
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  p.status === 'connected' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {p.status === 'connected' ? 'Connected' : 'Connect'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { key: 'posts', label: '内容发布' },
          { key: 'batch', label: 'AI批量安排' },
          { key: 'adapt', label: '内容适配规则' },
          { key: 'peak', label: '最优发布时段' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.key ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              选中平台：
              {selectedPlatforms.map((id) => {
                const p = PLATFORMS.find((pp) => pp.id === id)
                return <span key={id} className="mx-1">{p?.icon}{p?.name}</span>
              })}
            </div>
            <button
              className="text-sm px-4 py-2 rounded-xl text-white font-medium"
              style={{ backgroundColor: PRIMARY }}
            >
              + 创建帖子
            </button>
          </div>

          {POSTS.map((post) => {
            const sc = STATUS_CONFIG[post.status]
            return (
              <div key={post.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ color: sc.color, backgroundColor: sc.bg }}
                      >
                        {sc.label}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {post.type === 'image' ? `Image ×${post.imageCount}` : post.type === 'video' ? `Video · ${post.duration}` : 'Article'}
                      </span>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{post.region}</span>
                      <div className="flex gap-1">
                        {post.platforms.map((pid) => {
                          const pp = PLATFORMS.find((p) => p.id === pid)
                          return <span key={pid} className="text-sm" title={pp?.name}>{pp?.icon}</span>
                        })}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-800">{post.title}</div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-1 italic">{post.preview}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {post.views && (
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-700">{post.views.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">views</div>
                      </div>
                    )}
                    <button className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500">
                      {post.status === 'draft' ? 'Publish' : '详情'}
                    </button>
                  </div>
                </div>
                {post.scheduledTime && (
                  <div className="text-xs text-blue-500 mt-2">⏰ Scheduled: {post.scheduledTime}</div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Batch Tab */}
      {activeTab === 'batch' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-blue-800 mb-1">AI 国际社媒批量排期</div>
            <div className="text-xs text-blue-700">AI 按目标受众时区自动分配发布时间，避免跨时区内容堆叠，同一平台间隔至少 24 小时。</div>
          </div>

          {[
            { date: '2026-06-01', items: [
              { time: '10:00 CET', platform: 'LinkedIn', title: 'MR-200 Launch Announcement', icon: '💼', audience: '欧洲受众' },
              { time: '10:00 EST', platform: 'Facebook', title: 'MR-200 Launch — NA Market', icon: '📘', audience: '北美受众' },
            ]},
            { date: '2026-06-02', items: [
              { time: '11:00 CET', platform: 'Instagram', title: 'Factory Tour Reel', icon: '📸', audience: '全球受众' },
              { time: '15:00 GMT', platform: 'Twitter/X', title: '618 Tech Thread', icon: '🐦', audience: '全球受众' },
            ]},
          ].map((day) => (
            <div key={day.date}>
              <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                <span>{day.date}</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="space-y-2">
                {day.items.map((item) => (
                  <div
                    key={item.time + item.platform}
                    className="flex items-center gap-4 px-4 py-3 bg-white rounded-xl border border-amber-200"
                    style={{ borderLeftWidth: '3px', borderLeftColor: PRIMARY }}
                  >
                    <div className="text-sm font-bold text-gray-600 w-20">{item.time}</div>
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-gray-700">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.platform} · {item.audience}</div>
                    </div>
                    <button className="text-xs px-2 py-1 rounded-lg border border-gray-200 text-gray-500">调整</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Adapt Rules Tab */}
      {activeTab === 'adapt' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="text-sm font-semibold text-gray-700 mb-4">各平台内容适配规则</div>
          <div className="space-y-4">
            {[
              { platform: 'LinkedIn', icon: '💼', rules: ['字数建议 150-700 词', 'B2B 专业语气检测', '引用第三方数据', '行业 Hashtag 推荐'] },
              { platform: 'Instagram', icon: '📸', rules: ['图片自动生成 1:1 / 4:5 / 9:16 Story 三种尺寸', '正文 ≤ 2,200 字符', '推荐 5-10 个 Hashtag', 'Reels 时长 ≤ 90 秒'] },
              { platform: 'Twitter/X', icon: '🐦', rules: ['英文 ≤ 280 字符', '自动推荐 2-3 个 Hashtag', '图片 4:3 或 16:9', '无链接时优先图文'] },
              { platform: 'YouTube', icon: '▶️', rules: ['标题 ≤ 100 字符', '描述首 3 行含核心关键词', '缩略图文字 ≤ 30% 面积', '标签最多 500 字符'] },
            ].map((p) => (
              <div key={p.platform} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-2 w-28">
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{p.platform}</span>
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {p.rules.map((rule) => (
                    <span key={rule} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {rule}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Peak Times Tab */}
      {activeTab === 'peak' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="text-sm font-semibold text-gray-700 mb-4">最优发布时段（按目标市场时区）</div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-3">面向欧洲受众（CET 时区）</div>
              <div className="space-y-3">
                {['linkedin', 'facebook', 'instagram', 'twitter'].map((pid) => {
                  const p = PLATFORMS.find(pp => pp.id === pid)
                  const times = PEAK_TIMES[pid]?.eu || []
                  return (
                    <div key={pid} className="flex items-center gap-3">
                      <span className="text-lg w-6">{p?.icon}</span>
                      <div className="flex gap-2 flex-wrap">
                        {times.map((t) => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: PRIMARY }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-3">面向北美受众（EST 时区）</div>
              <div className="space-y-3">
                {['linkedin', 'facebook', 'instagram', 'twitter'].map((pid) => {
                  const p = PLATFORMS.find(pp => pp.id === pid)
                  const times = PEAK_TIMES[pid]?.na || PEAK_TIMES[pid]?.global || []
                  return (
                    <div key={pid} className="flex items-center gap-3">
                      <span className="text-lg w-6">{p?.icon}</span>
                      <div className="flex gap-2 flex-wrap">
                        {times.map((t) => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#3B82F6' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
            时段基于各平台官方数据与账号历史互动分析，每月自动更新
          </div>
        </div>
      )}
    </div>
  )
}
