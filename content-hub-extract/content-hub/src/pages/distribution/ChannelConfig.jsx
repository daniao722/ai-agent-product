import { useState } from 'react'

const PRIMARY = '#C9A227'

const CHANNELS = [
  {
    category: '社交媒体（国际）',
    platforms: [
      { name: 'Twitter / X', icon: '✕', color: '#000000', accounts: [{ handle: 'Listen', username: 'mm7721748560283', status: 'connected', date: '2025-12-15 18:49:11' }] },
      { name: 'Facebook', icon: 'f', color: '#1877F2', accounts: [{ handle: '中企动力国际', username: 'page_12345', status: 'connected', date: '2025-11-10 17:11:51' }, { handle: 'Global Windows', username: 'page_67890', status: 'warning', date: '2025-09-01 09:00:00' }] },
      { name: 'Instagram', icon: '📸', color: '#E1306C', accounts: [{ handle: '@windows_global', username: 'instagram_id_001', status: 'connected', date: '2025-10-20 14:30:00' }] },
      { name: 'LinkedIn', icon: 'in', color: '#0A66C2', accounts: [] },
      { name: 'YouTube', icon: '▶', color: '#FF0000', accounts: [] },
      { name: 'TikTok', icon: '🎵', color: '#000000', accounts: [] },
    ],
  },
  {
    category: '社交媒体（国内）',
    platforms: [
      { name: '微信公众号', icon: '微', color: '#07C160', accounts: [{ handle: '中企动力', username: 'gh_abc123', status: 'connected', date: '2025-11-10 17:11:51' }, { handle: '生鲜百分百', username: 'gh_def456', status: 'connected', date: '2025-11-14 14:49:40' }, { handle: '悠然自得志', username: 'gh_ghi789', status: 'connected', date: '2026-04-10 17:56:53' }] },
      { name: '微博', icon: '微', color: '#E6162D', accounts: [] },
      { name: '小红书', icon: '📕', color: '#FF2442', accounts: [] },
      { name: '抖音', icon: '🎵', color: '#161823', accounts: [] },
    ],
  },
  {
    category: '邮件营销',
    platforms: [
      { name: 'Mailchimp', icon: '🐒', color: '#FFE01B', accounts: [{ handle: 'GlobalTeam', username: 'api_key_***xxx', status: 'connected', date: '2025-10-01 10:00:00' }] },
      { name: 'Klaviyo', icon: 'K', color: '#000000', accounts: [] },
      { name: 'HubSpot', icon: 'H', color: '#FF7A59', accounts: [] },
    ],
  },
  {
    category: '独立站 / 官网',
    platforms: [
      { name: 'WordPress', icon: 'W', color: '#21759B', accounts: [{ handle: 'windows-global.com', username: 'wp_api_key_***', status: 'connected', date: '2025-08-15 09:30:00' }] },
      { name: 'Shopify', icon: 'S', color: '#96BF48', accounts: [] },
      { name: '门户网站', icon: '🏛', color: '#6366F1', accounts: [], portalConfig: true },
    ],
  },
]

const STATUS_CONFIG = {
  connected: { label: '已授权', color: '#10B981', dot: '#10B981' },
  warning: { label: '需续期', color: '#F59E0B', dot: '#F59E0B' },
  error: { label: '已断开', color: '#EF4444', dot: '#EF4444' },
}

export default function ChannelConfig() {
  const [activePlatform, setActivePlatform] = useState('微信公众号')
  const [showAlert, setShowAlert] = useState(true)

  const allPlatforms = CHANNELS.flatMap((c) => c.platforms)
  const currentPlatform = allPlatforms.find((p) => p.name === activePlatform)

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-48 border-r border-gray-200 bg-white flex-shrink-0 overflow-y-auto py-2">
        {CHANNELS.map((cat) => (
          <div key={cat.category}>
            <div className="text-xs font-semibold text-gray-400 px-4 py-2 mt-2">{cat.category}</div>
            {cat.platforms.map((p) => {
              const hasAccounts = p.accounts.length > 0
              return (
                <button
                  key={p.name}
                  onClick={() => setActivePlatform(p.name)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-all ${
                    activePlatform === p.name ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-500' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{p.name}</span>
                  {hasAccounts && (
                    <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 space-y-4">
        {/* Alert */}
        {showAlert && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
            <span className="text-amber-500 flex-shrink-0">⚠</span>
            <div className="flex-1 text-sm text-amber-700">
              <span className="font-medium">抖音应用升级，2025年4月之前绑定的账号不再适用，请重新绑定。</span>
              <br />
              为达到更好的营销效果，请保持一定的发帖频率；连续90天未发帖的海外社媒账号将自动解绑，请知悉。
            </div>
            <button onClick={() => setShowAlert(false)} className="text-amber-400 hover:text-amber-600 flex-shrink-0">✕</button>
          </div>
        )}

        {/* Action bar */}
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-xl text-white text-sm font-medium"
            style={{ backgroundColor: PRIMARY }}
          >
            + 添加 {activePlatform} 账号
          </button>
          <button className="text-sm text-blue-500 flex items-center gap-1.5">
            <span>💡</span>
            授权成功后请 刷新页面
          </button>
        </div>

        {/* Accounts Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr className="text-xs text-gray-400 font-medium">
                <th className="text-left px-5 py-3">社交平台</th>
                <th className="text-left px-4 py-3">社交账号</th>
                <th className="text-left px-4 py-3">绑定状态</th>
                <th className="text-left px-4 py-3">绑定时间</th>
                <th className="text-right px-5 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {currentPlatform?.accounts.length ? (
                currentPlatform.accounts.map((acc, i) => {
                  const st = STATUS_CONFIG[acc.status]
                  return (
                    <tr key={i} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                            style={{ backgroundColor: currentPlatform.color }}
                          >
                            {typeof currentPlatform.icon === 'string' ? currentPlatform.icon : ''}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{currentPlatform.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600 font-medium">
                            {acc.handle[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-800">{acc.handle}</div>
                            <div className="text-xs text-gray-400">{acc.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: st.dot }} />
                          <span className="text-sm" style={{ color: st.color }}>{st.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">{acc.date}</td>
                      <td className="px-5 py-4 text-right">
                        {acc.status === 'connected' ? (
                          <button className="text-sm text-blue-500 hover:underline">管理</button>
                        ) : (
                          <button className="text-sm" style={{ color: PRIMARY }}>重新授权</button>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="text-4xl mb-3">🔗</div>
                    <div className="text-sm text-gray-500">暂未绑定 {activePlatform} 账号</div>
                    <button
                      className="mt-3 px-4 py-2 rounded-xl text-white text-sm font-medium"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      立即绑定
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Config notes */}
        {currentPlatform?.accounts.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-sm font-semibold text-gray-700 mb-3">发布规则配置</div>
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
              <div>
                <div className="font-medium text-gray-700 mb-1">默认发布时间</div>
                <input defaultValue="10:00, 20:00" className="w-full border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none text-sm" />
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">字数截断规则</div>
                <select className="w-full border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none text-sm bg-white">
                  <option>超出自动截断（平台限制）</option>
                  <option>超出时提示用户</option>
                </select>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">话题标签自动添加</div>
                <input defaultValue="#门窗 #节能建材 #工厂直供" className="w-full border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none text-sm" />
              </div>
            </div>
          </div>
        )}

        {/* 门户网站专属配置 */}
        {activePlatform === '门户网站' && (
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🏛</span>
                <div className="text-sm font-semibold text-indigo-700">门户网站配置</div>
                <span className="text-xs text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded-full">企业级 CMS 对接</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">CMS 类型</div>
                  <select className="w-full border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none text-sm bg-white">
                    <option>织梦 DEDE CMS</option>
                    <option>帝国 CMS</option>
                    <option>PHP168 / PHPCMS</option>
                    <option>Drupal</option>
                    <option>Joomla</option>
                    <option>自定义 REST API</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">API 接入地址</div>
                  <input placeholder="https://your-portal.com/api/v1" className="w-full border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none text-sm" />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">API Token / 密钥</div>
                  <input type="password" placeholder="Bearer token 或 API Key" className="w-full border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none text-sm" />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-1">默认发布栏目</div>
                  <input placeholder="新闻中心 / 行业资讯 / 产品动态" className="w-full border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none text-sm" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="text-sm font-semibold text-gray-700 mb-3">内容同步规则</div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: '同步方式', type: 'select', options: ['推送（主动 POST）', '拉取（定时 PULL）', '双向同步'] },
                  { label: '图片处理', type: 'select', options: ['上传至门户图床', '保留原始 URL', 'CDN 转存'] },
                  { label: '审核流程', type: 'select', options: ['先审后发', '发布后审核', '无需审核'] },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-xs font-medium text-gray-700 mb-1">{f.label}</div>
                    <select className="w-full border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none text-sm bg-white">
                      {f.options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-6 text-xs text-gray-600">
                {[
                  { label: 'SEO Meta 自动填充', checked: true },
                  { label: '关键词密度检测', checked: true },
                  { label: '同步更新至镜像站', checked: false },
                  { label: '发布后推送百度收录', checked: true },
                ].map((opt) => (
                  <label key={opt.label} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked={opt.checked} className="rounded" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl text-white text-sm font-medium" style={{ backgroundColor: '#6366F1' }}>
                测试连接
              </button>
              <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600">
                保存配置
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
