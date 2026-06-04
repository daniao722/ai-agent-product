const PRIMARY = '#C9A227'

const LANGUAGES = [
  { code: 'zh', name: '中文', status: 'source', count: 248 },
  { code: 'en', name: 'English', status: 'synced', count: 248 },
  { code: 'ja', name: '日本語', status: 'partial', count: 236 },
  { code: 'de', name: 'Deutsch', status: 'partial', count: 180 },
  { code: 'fr', name: 'Français', status: 'pending', count: 0 },
  { code: 'es', name: 'Español', status: 'pending', count: 0 },
]

export default function TranslateTool({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-gray-800">多语言翻译</div>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm"
          style={{ backgroundColor: PRIMARY }}
          onClick={() => onNavigate('creation/agent')}
        >
           AI 批量翻译
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '源语言内容', value: '248', unit: '篇', icon: '🇨🇳' },
          { label: '已翻译语言', value: '2', unit: '种', icon: '✅' },
          { label: '待翻译内容', value: '150', unit: '篇', icon: '⏳' },
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

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">语言状态</div>
        </div>
        <div className="divide-y divide-gray-50">
          {LANGUAGES.map((l) => (
            <div key={l.code} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-lg">{l.code === 'zh' ? '🇨🇳' : l.code === 'en' ? '🇺🇸' : l.code === 'ja' ? '🇯🇵' : l.code === 'de' ? '🇩🇪' : l.code === 'fr' ? '🇷' : '🇪'}</span>
                <div>
                  <div className="text-sm text-gray-700">{l.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{l.count} 篇</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  l.status === 'synced' ? 'text-green-600 bg-green-50' : l.status === 'partial' ? 'text-amber-600 bg-amber-50' : l.status === 'pending' ? 'text-gray-400 bg-gray-50' : 'text-blue-600 bg-blue-50'
                }`}>
                  {l.status === 'synced' ? '已同步' : l.status === 'partial' ? '部分翻译' : l.status === 'pending' ? '未开始' : '源语言'}
                </span>
                {l.status !== 'source' && l.status !== 'synced' && (
                  <button className="px-3 py-1 rounded-lg text-white text-xs font-medium" style={{ backgroundColor: PRIMARY }}>
                    翻译
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
