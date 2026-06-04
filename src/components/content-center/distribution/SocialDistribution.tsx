const PRIMARY = '#C9A227'

const SOCIAL_CHANNELS = [
  { name: '微信公众号', icon: '📱', followers: '12,456', status: 'connected' },
  { name: 'LinkedIn', icon: '💼', followers: '8,234', status: 'connected' },
  { name: 'Facebook', icon: '📘', followers: '5,678', status: 'connected' },
  { name: 'Twitter/X', icon: '🐦', followers: '3,456', status: 'disconnected' },
]

export default function SocialDistribution() {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">社媒同步</div>

      <div className="grid grid-cols-2 gap-4">
        {SOCIAL_CHANNELS.map((c) => (
          <div key={c.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="text-sm font-semibold text-gray-700">{c.name}</div>
                <div className="text-xs text-gray-400">{c.followers} 粉丝</div>
              </div>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded ${c.status === 'connected' ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
                {c.status === 'connected' ? '已连接' : '未连接'}
              </span>
            </div>
            <button className="w-full py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>
              发布内容
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}