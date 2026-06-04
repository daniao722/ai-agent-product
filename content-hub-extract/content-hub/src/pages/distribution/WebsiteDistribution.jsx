import { useState } from 'react'

const PRIMARY = '#C9A227'

const sites = [
  { name: 'windows-global.com', platform: 'WordPress', status: 'connected', lastSync: '2026-05-26 14:30', posts: 128 },
  { name: 'shop.windows-global.com', platform: 'Shopify', status: 'disconnected', lastSync: '—', posts: 0 },
]

const pushHistory = [
  { title: '断桥铝门窗节能技术深度解析', type: '博客文章', site: 'windows-global.com', status: 'published', publishMode: '立即发布', date: '2026-05-25' },
  { title: '高隔热系统窗产品描述（更新版）', type: '产品详情页', site: 'windows-global.com', status: 'published', publishMode: '立即发布', date: '2026-05-22' },
  { title: '父亲节促销活动公告', type: '新闻列表页', site: 'windows-global.com', status: 'scheduled', publishMode: '定时 6/12 10:00', date: '2026-06-12' },
  { title: '618大促落地页更新', type: '活动页面', site: 'windows-global.com', status: 'draft', publishMode: '草稿', date: '2026-06-01' },
]

const STATUS = {
  published: { label: '已发布', color: '#10B981', bg: '#DCFCE7' },
  scheduled: { label: '定时发布', color: PRIMARY, bg: '#FBF5E0' },
  draft: { label: '草稿', color: '#6B7280', bg: '#F3F4F6' },
}

export default function WebsiteDistribution() {
  const [showPushModal, setShowPushModal] = useState(false)

  return (
    <div className="p-6 space-y-5">
      {/* Connected Sites */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-gray-700">已绑定站点</div>
          <button className="text-sm px-4 py-1.5 rounded-lg text-white font-medium" style={{ backgroundColor: PRIMARY }}>
            + 绑定新站点
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {sites.map((site) => (
            <div key={site.name} className={`border rounded-xl p-4 ${site.status === 'connected' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-gray-800">{site.name}</div>
                  <div className="text-xs text-gray-500">{site.platform}</div>
                </div>
                <div className={`flex items-center gap-1.5 text-xs ${site.status === 'connected' ? 'text-green-600' : 'text-red-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${site.status === 'connected' ? 'bg-green-500' : 'bg-red-400'}`} />
                  {site.status === 'connected' ? '已连接' : '未连接'}
                </div>
              </div>
              {site.status === 'connected' && (
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>最后同步：{site.lastSync}</div>
                  <div>已发布文章：{site.posts} 篇</div>
                </div>
              )}
              <div className="mt-3 flex gap-2">
                {site.status === 'connected' ? (
                  <>
                    <button className="text-xs px-3 py-1 rounded-lg border border-green-300 text-green-700 hover:bg-green-100">管理</button>
                    <button
                      onClick={() => setShowPushModal(true)}
                      className="text-xs px-3 py-1 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>
                      推送内容
                    </button>
                  </>
                ) : (
                  <button className="text-xs px-3 py-1 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>立即连接</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Push History */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">内容推送记录</div>
          <button
            onClick={() => setShowPushModal(true)}
            className="text-sm px-4 py-1.5 rounded-lg text-white font-medium"
            style={{ backgroundColor: PRIMARY }}
          >
            + 推送新内容
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {pushHistory.map((item, i) => {
            const st = STATUS[item.status]
            return (
              <div key={i} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{item.title}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{item.type}</span>
                    <span>{item.site}</span>
                    <span>{item.publishMode}</span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>
                  {st.label}
                </span>
                <div className="text-xs text-gray-400 w-24 text-right">{item.date}</div>
                <button className="text-xs text-gray-400 hover:text-gray-600">查看</button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Push Modal */}
      {showPushModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[520px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-800">推送内容至官网</h3>
              <button onClick={() => setShowPushModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">选择内容</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 bg-white">
                  <option>断桥铝门窗节能技术深度解析</option>
                  <option>618大促产品描述</option>
                  <option>父亲节感恩活动公告</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">内容类型映射</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 bg-white">
                  <option>博客文章</option>
                  <option>商品详情页</option>
                  <option>新闻列表页</option>
                  <option>活动页面</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">发布模式</label>
                <div className="grid grid-cols-3 gap-2">
                  {['立即发布', '草稿', '定时发布'].map((m, i) => (
                    <button key={m} className={`py-2 rounded-xl border text-xs font-medium transition-all ${i === 0 ? 'text-white border-transparent' : 'border-gray-200 text-gray-600'}`}
                      style={i === 0 ? { backgroundColor: PRIMARY } : {}}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600">
                <div className="font-medium text-gray-700 mb-1">SEO元数据（AI自动填写）</div>
                <div>Meta Title：断桥铝节能门窗技术解析 | 冠成门窗</div>
                <div className="mt-1">Meta Description：20年工厂经验，ISO认证节能断桥铝门窗，导热系数0.15...</div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowPushModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600">取消</button>
              <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>确认推送</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
