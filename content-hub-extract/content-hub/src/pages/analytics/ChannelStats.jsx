import { useState } from 'react'

const PRIMARY = '#C9A227'

const MODULES = [
  {
    id: 'copy',
    name: 'AI文案工厂',
    icon: '✍️',
    color: '#3B82F6',
    published: 380,
    exposure: 185000,
    clicks: 14800,
    conversions: 892,
    trend: '+15.2%',
    channels: [
      { name: '官网', published: 95, exposure: 22000, conversions: 220 },
      { name: '社媒', published: 180, exposure: 88000, conversions: 420 },
      { name: '广告', published: 105, exposure: 75000, conversions: 252 },
    ],
  },
  {
    id: 'visual',
    name: 'AI视觉创作',
    icon: '🎨',
    color: '#8B5CF6',
    published: 220,
    exposure: 82000,
    clicks: 5740,
    conversions: 534,
    trend: '+9.8%',
    channels: [
      { name: '官网', published: 55, exposure: 15000, conversions: 180 },
      { name: '社媒', published: 140, exposure: 60000, conversions: 300 },
      { name: '广告', published: 25, exposure: 7000, conversions: 54 },
    ],
  },
  {
    id: 'video',
    name: 'AI视频工厂',
    icon: '🎬',
    color: '#10B981',
    published: 124,
    exposure: 33000,
    clicks: 2310,
    conversions: 360,
    trend: '+22.1%',
    channels: [
      { name: '官网', published: 30, exposure: 8000, conversions: 62 },
      { name: '社媒', published: 55, exposure: 18000, conversions: 210 },
      { name: '广告', published: 39, exposure: 7000, conversions: 88 },
    ],
  },
]

const CHANNEL_STATS = [
  {
    id: 'website',
    name: '官网',
    icon: '🌐',
    color: '#3B82F6',
    published: 180,
    exposure: 45000,
    ctr: 8.5,
    cvr: 11.8,
    trend: '+12.3%',
    up: true,
    modules: [
      { name: 'AI文案', icon: '✍️', published: 95, exposure: 22000, ctr: 9.2, cvr: 13.1 },
      { name: 'AI视觉', icon: '🎨', published: 55, exposure: 15000, ctr: 8.1, cvr: 11.5 },
      { name: 'AI视频', icon: '🎬', published: 30, exposure: 8000, ctr: 7.4, cvr: 9.2 },
    ],
  },
  {
    id: 'social',
    name: '社媒',
    icon: '📱',
    color: '#8B5CF6',
    published: 375,
    exposure: 128000,
    ctr: 5.0,
    cvr: 8.0,
    trend: '+8.7%',
    up: true,
    modules: [
      { name: 'AI文案', icon: '✍️', published: 180, exposure: 75000, ctr: 5.6, cvr: 9.1 },
      { name: 'AI视觉', icon: '🎨', published: 140, exposure: 40000, ctr: 4.7, cvr: 7.2 },
      { name: 'AI视频', icon: '🎬', published: 55, exposure: 13000, ctr: 4.2, cvr: 6.8 },
    ],
  },
  {
    id: 'ads',
    name: '广告',
    icon: '📣',
    color: '#F59E0B',
    published: 169,
    exposure: 95000,
    ctr: 5.1,
    cvr: 7.9,
    trend: '+15.5%',
    up: true,
    modules: [
      { name: 'AI文案', icon: '✍️', published: 105, exposure: 58000, ctr: 5.8, cvr: 8.5 },
      { name: 'AI视觉', icon: '🎨', published: 45, exposure: 27000, ctr: 4.2, cvr: 6.9 },
      { name: 'AI视频', icon: '🎬', published: 19, exposure: 10000, ctr: 3.9, cvr: 6.4 },
    ],
  },
]

const DAILY_DATA = [
  { day: '05-21', copy: 980, visual: 460, video: 240 },
  { day: '05-22', copy: 1200, visual: 540, video: 310 },
  { day: '05-23', copy: 1050, visual: 490, video: 280 },
  { day: '05-24', copy: 1480, visual: 620, video: 380 },
  { day: '05-25', copy: 1820, visual: 740, video: 440 },
  { day: '05-26', copy: 2200, visual: 890, video: 560 },
  { day: '05-27', copy: 2100, visual: 850, video: 520 },
]

const maxDaily = Math.max(...DAILY_DATA.map((d) => d.copy + d.visual + d.video))

const totalPublished = MODULES.reduce((a, m) => a + m.published, 0)
const totalExposure = CHANNEL_STATS.reduce((a, c) => a + c.exposure, 0)
const totalConversions = MODULES.reduce((a, m) => a + m.conversions, 0)
const avgCTR = (CHANNEL_STATS.reduce((a, c) => a + c.ctr, 0) / CHANNEL_STATS.length).toFixed(1)

export default function ChannelStats() {
  const [period, setPeriod] = useState('30天')
  const [expandedModule, setExpandedModule] = useState(null)

  return (
    <div className="p-6 space-y-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">统计周期</div>
        <div className="flex items-center gap-2">
          {['7天', '30天', '90天'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                period === p ? 'text-white' : 'bg-gray-100 text-gray-600'
              }`}
              style={period === p ? { backgroundColor: PRIMARY } : {}}
            >
              {p}
            </button>
          ))}
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600">
            导出报告
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '总发布内容', value: `${totalPublished}`, unit: '条', sub: 'AI创作并已发布', color: PRIMARY },
          { label: '总曝光量', value: `${(totalExposure / 10000).toFixed(1)}万`, unit: '', sub: '各渠道合并统计', color: '#3B82F6' },
          { label: '总转化数', value: totalConversions.toLocaleString(), unit: '', sub: '带来用户行为', color: '#10B981' },
          { label: '平均点击率', value: `${avgCTR}%`, unit: '', sub: '优于行业均值 3.2%', color: '#8B5CF6' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
              {s.unit && <span className="text-sm font-normal text-gray-500 ml-1">{s.unit}</span>}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Module Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-gray-700">按创作模块统计</div>
          <div className="text-xs text-gray-400">点击模块查看渠道明细</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {MODULES.map((m) => {
            const isOpen = expandedModule === m.id
            return (
              <div key={m.id}>
                <button
                  onClick={() => setExpandedModule(isOpen ? null : m.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    isOpen ? 'border-transparent shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={isOpen ? { backgroundColor: m.color + '12', borderColor: m.color + '40' } : {}}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{m.name}</span>
                    </div>
                    <span className="text-xs text-green-500 font-medium">{m.trend}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-gray-800">{m.published}</div>
                      <div className="text-xs text-gray-400">已发布</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: m.color }}>
                        {(m.exposure / 10000).toFixed(1)}万
                      </div>
                      <div className="text-xs text-gray-400">曝光量</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{m.conversions}</div>
                      <div className="text-xs text-gray-400">转化数</div>
                    </div>
                  </div>
                </button>

                {/* Expanded: channel breakdown for this module */}
                {isOpen && (
                  <div
                    className="mt-2 rounded-xl border p-3 space-y-2"
                    style={{ borderColor: m.color + '40', backgroundColor: m.color + '08' }}
                  >
                    {m.channels.map((ch) => (
                      <div key={ch.name} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 w-12">{ch.name}</span>
                        <div className="flex-1 mx-2 h-1.5 bg-gray-100 rounded-full">
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${(ch.published / m.published) * 100}%`,
                              backgroundColor: m.color,
                            }}
                          />
                        </div>
                        <span className="text-gray-500 w-12 text-right">{ch.published} 条</span>
                        <span className="text-gray-400 w-14 text-right">{(ch.exposure / 10000).toFixed(1)}万曝</span>
                        <span className="font-semibold w-12 text-right" style={{ color: m.color }}>
                          {ch.conversions} 转
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Exposure trend chart */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="text-xs font-medium text-gray-500 mb-3">各模块每日曝光量趋势（近7天）</div>
          <div className="flex items-end gap-2 h-24">
            {DAILY_DATA.map((d) => {
              const total = d.copy + d.visual + d.video
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col-reverse gap-px" style={{ height: `${(total / maxDaily) * 80}px` }}>
                    <div style={{ height: `${(d.video / total) * 100}%`, backgroundColor: '#10B981', minHeight: '2px' }} className="w-full rounded-sm" />
                    <div style={{ height: `${(d.visual / total) * 100}%`, backgroundColor: '#8B5CF6', minHeight: '2px' }} className="w-full" />
                    <div style={{ height: `${(d.copy / total) * 100}%`, backgroundColor: '#3B82F6', minHeight: '2px' }} className="w-full rounded-t-sm" />
                  </div>
                  <div className="text-xs text-gray-400" style={{ fontSize: '10px' }}>{d.day.slice(3)}</div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-2">
            {[{ name: 'AI文案', color: '#3B82F6' }, { name: 'AI视觉', color: '#8B5CF6' }, { name: 'AI视频', color: '#10B981' }].map((l) => (
              <div key={l.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                <span className="text-xs text-gray-500">{l.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Section */}
      <div>
        <div className="text-sm font-semibold text-gray-700 mb-3">按渠道统计</div>
        <div className="grid grid-cols-3 gap-4">
          {CHANNEL_STATS.map((ch) => (
            <div key={ch.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Channel Header */}
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ backgroundColor: ch.color + '12', borderBottom: `1px solid ${ch.color}30` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{ch.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{ch.name}</span>
                </div>
                <span className={`text-xs font-medium ${ch.up ? 'text-green-500' : 'text-red-400'}`}>
                  {ch.trend}
                </span>
              </div>

              {/* Channel top metrics */}
              <div className="px-4 py-3 grid grid-cols-2 gap-3 border-b border-gray-100">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">发布内容</div>
                  <div className="text-xl font-bold text-gray-800">{ch.published} <span className="text-sm font-normal text-gray-500">条</span></div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">总曝光</div>
                  <div className="text-xl font-bold" style={{ color: ch.color }}>{(ch.exposure / 10000).toFixed(1)}<span className="text-sm font-normal text-gray-500 ml-0.5">万</span></div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">点击率 CTR</div>
                  <div className="text-lg font-bold text-gray-700">{ch.ctr}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">转化率 CVR</div>
                  <div className="text-lg font-bold text-gray-700">{ch.cvr}%</div>
                </div>
              </div>

              {/* Module breakdown */}
              <div className="px-4 py-3 space-y-2.5">
                <div className="text-xs font-medium text-gray-400 mb-1">按模块细分</div>
                {ch.modules.map((mod) => (
                  <div key={mod.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-1">
                        <span>{mod.icon}</span>
                        <span className="text-gray-600">{mod.name}</span>
                        <span className="text-gray-400 ml-1">{mod.published}条</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <span className="font-medium" style={{ color: ch.color }}>曝{((mod.exposure / ch.exposure) * 100).toFixed(0)}%</span>
                        <span>转{mod.cvr}%</span>
                      </div>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full">
                      <div
                        className="h-1 rounded-full"
                        style={{ width: `${(mod.exposure / ch.exposure) * 100}%`, backgroundColor: ch.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
