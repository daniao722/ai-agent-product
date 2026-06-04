import { useState } from 'react'

const PRIMARY = '#C9A227'

const PLATFORMS = [
  { id: 'wechat', name: '微信公众号', icon: '💬', color: '#07C160', account: 'MR工业科技', followers: '12.4万', status: 'connected' },
  { id: 'weibo', name: '微博', icon: '🌐', color: '#E6162D', account: '@MR工业科技', followers: '8.2万', status: 'connected' },
  { id: 'xiaohongshu', name: '小红书', icon: '📕', color: '#FF2442', account: 'MR智能制造', followers: '3.1万', status: 'connected' },
  { id: 'douyin', name: '抖音', icon: '🎵', color: '#010101', account: 'MR机器人', followers: '15.7万', status: 'connected' },
  { id: 'shipinhao', name: '视频号', icon: '📹', color: '#07C160', account: 'MR工业科技', followers: '2.3万', status: 'disconnected' },
]

const POSTS = [
  {
    id: 1,
    title: '618大促 | MR-200工业机器人限时特惠',
    platforms: ['wechat', 'xiaohongshu'],
    status: 'scheduled',
    scheduledTime: '2026-06-01 09:00',
    preview: '618限时福利来了！MR-200工业机器人，精度±0.02mm，让您的产线效率飞跃10倍……',
    type: 'image',
    imageCount: 5,
  },
  {
    id: 2,
    title: '工厂实拍 | 智能制造新标杆',
    platforms: ['douyin', 'shipinhao'],
    status: 'published',
    publishedTime: '2026-05-27 10:32',
    preview: '带你走进现代工厂，感受AI驱动的智能制造……',
    type: 'video',
    duration: '45秒',
    views: 28400,
    likes: 1240,
  },
  {
    id: 3,
    title: '技术干货 | 重复定位精度±0.02mm是什么概念？',
    platforms: ['wechat', 'weibo', 'xiaohongshu'],
    status: 'draft',
    preview: '很多工程师朋友问过我们这个问题，今天用一个简单的对比让你秒懂……',
    type: 'article',
  },
]

const STATUS_CONFIG = {
  published: { label: '已发布', color: '#10B981', bg: '#F0FDF4' },
  scheduled: { label: '定时发布', color: '#3B82F6', bg: '#EFF6FF' },
  draft: { label: '草稿', color: '#6B7280', bg: '#F3F4F6' },
}

const PEAK_TIMES = {
  wechat: ['8:00-9:00', '12:00-13:00', '18:00-20:00'],
  weibo: ['7:00-8:00', '11:00-12:00', '20:00-22:00'],
  xiaohongshu: ['18:00-22:00'],
  douyin: ['12:00-14:00', '19:00-23:00'],
  shipinhao: ['9:00-11:00', '20:00-22:00'],
}

export default function DomesticSocial() {
  const [activeTab, setActiveTab] = useState('posts')
  const [selectedPlatforms, setSelectedPlatforms] = useState(['wechat', 'xiaohongshu'])

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-6 space-y-5">
      {/* Platform Overview */}
      <div className="grid grid-cols-5 gap-3">
        {PLATFORMS.map((p) => (
          <div
            key={p.id}
            className={`bg-white rounded-xl border p-3 text-center cursor-pointer transition-all ${
              selectedPlatforms.includes(p.id)
                ? 'border-amber-300 shadow-sm'
                : 'border-gray-200 opacity-60'
            }`}
            onClick={() => togglePlatform(p.id)}
          >
            <div className="text-2xl mb-1">{p.icon}</div>
            <div className="text-xs font-medium text-gray-700">{p.name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{p.followers}</div>
            <div className="mt-1.5">
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  p.status === 'connected'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {p.status === 'connected' ? '已连接' : '未连接'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { key: 'posts', label: '内容发布' },
          { key: 'schedule', label: 'AI批量安排' },
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
              当前选中平台：
              {selectedPlatforms.map((id) => {
                const p = PLATFORMS.find((pp) => pp.id === id)
                return (
                  <span key={id} className="mx-1 text-sm">{p?.icon}{p?.name}</span>
                )
              })}
            </div>
            <button
              className="text-sm px-4 py-2 rounded-xl text-white font-medium"
              style={{ backgroundColor: PRIMARY }}
            >
              + 创建新帖子
            </button>
          </div>

          {POSTS.map((post) => {
            const sc = STATUS_CONFIG[post.status]
            return (
              <div key={post.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ color: sc.color, backgroundColor: sc.bg }}
                      >
                        {sc.label}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {post.type === 'image' ? `图文·${post.imageCount}张` : post.type === 'video' ? `视频·${post.duration}` : '文章'}
                      </span>
                      <div className="flex gap-1">
                        {post.platforms.map((pid) => {
                          const pp = PLATFORMS.find((p) => p.id === pid)
                          return <span key={pid} className="text-sm" title={pp?.name}>{pp?.icon}</span>
                        })}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-800">{post.title}</div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-1">{post.preview}</div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {post.views && (
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-700">{post.views.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">浏览</div>
                      </div>
                    )}
                    <button className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                      {post.status === 'draft' ? '发布' : '详情'}
                    </button>
                  </div>
                </div>
                {post.scheduledTime && (
                  <div className="text-xs text-blue-500 mt-1">⏰ 定时：{post.scheduledTime}</div>
                )}
                {post.publishedTime && (
                  <div className="text-xs text-gray-400 mt-1">✓ 发布于 {post.publishedTime}</div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* AI Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="text-sm font-semibold text-amber-800 mb-1">AI 批量排期</div>
            <div className="text-xs text-amber-700">选择多篇内容，AI 自动规划发布时间表，避免同一账号内容堆叠，并匹配各平台高峰时段。</div>
          </div>

          {['2026-06-01', '2026-06-02', '2026-06-03'].map((date) => (
            <div key={date}>
              <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
                <span>{date}</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="space-y-2">
                {[
                  { time: '09:00', platform: '微信公众号', title: '618大促内容预热', icon: '💬', beans: 5 },
                  { time: '12:00', platform: '小红书', title: '产品实测图文×5', icon: '📕', beans: 50 },
                  date === '2026-06-01' && { time: '19:00', platform: '抖音', title: '工厂实拍短视频', icon: '🎵', beans: 0 },
                ].filter(Boolean).map((item) => (
                  <div
                    key={item.time}
                    className="flex items-center gap-4 px-4 py-3 bg-white rounded-xl border border-amber-200"
                    style={{ borderLeftWidth: '3px', borderLeftColor: PRIMARY }}
                  >
                    <div className="text-sm font-bold text-gray-600 w-12">{item.time}</div>
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-gray-700">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.platform}</div>
                    </div>
                    <span className="text-xs text-amber-600 font-semibold">{item.beans > 0 ? `-${item.beans}豆` : '免费'}</span>
                    <button className="text-xs px-2 py-1 rounded-lg border border-gray-200 text-gray-500">调整</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Peak Times Tab */}
      {activeTab === 'peak' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="text-sm font-semibold text-gray-700 mb-4">各平台最优发布时段（中国大陆用户）</div>
          <div className="space-y-4">
            {PLATFORMS.filter(p => p.status === 'connected').map((p) => (
              <div key={p.id} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-28">
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-sm text-gray-600">{p.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {(PEAK_TIMES[p.id] || []).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
            时段基于近 90 天各平台算法分析与账号历史互动数据，每月自动更新
          </div>
        </div>
      )}
    </div>
  )
}
