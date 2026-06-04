import { useState } from 'react'

const PRIMARY = '#C9A227'

const STAGE_META = [
  { key: 'created',   label: '内容创作',   icon: '✍️', color: '#3B82F6', desc: '所有渠道生成并保存的内容条数' },
  { key: 'split',     label: '多场景裂变', icon: '🔀', color: PRIMARY,   desc: '已进行渠道适配裂变的内容条数' },
  { key: 'published', label: '发布上线',   icon: '📤', color: '#10B981', desc: '成功发布到至少一个渠道的内容条数' },
  { key: 'converted', label: '用户转化',   icon: '🎯', color: '#EF4444', desc: '带来至少一次用户行为（点击/留资/咨询）的内容' },
]

const CHANNEL_FUNNELS = {
  all:     { label: '全部渠道', values: [1248, 899, 724, 399] },
  website: { label: '官网',     values: [320,  248, 200, 145] },
  social:  { label: '社媒',     values: [580,  420, 340, 182] },
  ads:     { label: '广告',     values: [348,  231, 184, 72]  },
}

const CHANNEL_TABS = [
  { id: 'all',     label: '全部渠道', icon: '📊' },
  { id: 'website', label: '官网',     icon: '🌐' },
  { id: 'social',  label: '社媒',     icon: '📱' },
  { id: 'ads',     label: '广告',     icon: '📣' },
]

const DROP_REASONS = {
  all: [
    { dropPct: 28, drop: 349, reason: '内容创作后未配置多渠道裂变模板，直接跳过适配流程', action: '建议在创作完成时触发自动渠道适配提示，预计可减少流失 60%' },
    { dropPct: 19, drop: 175, reason: '内容停留在草稿/审核中状态，未完成发布', action: '发布阻塞内容共 97 条，建议审核人员优先处理，启用定时发布规则' },
    { dropPct: 45, drop: 325, reason: '已发布内容未带来可追踪的用户行为，CTA 引导不足', action: '建议在官网和社媒内容中强化 CTA，并植入 UTM 追踪钩子以获得精准数据' },
  ],
  website: [
    { dropPct: 22, drop: 72, reason: '官网内容适配渠道模板覆盖不完整', action: '建议完善官网 SEO 内容模板，启用自动裂变至博客/产品页' },
    { dropPct: 19, drop: 48, reason: '官网内容审核流程较长，审核均值 2.4 天', action: '建议将低风险内容（产品更新）纳入免审快发通道' },
    { dropPct: 28, drop: 55, reason: '官网落地页转化引导不足，CTA 点击率低', action: '建议 A/B 测试不同 CTA 按钮文案，官网内容转化率可提升约 15%' },
  ],
  social: [
    { dropPct: 28, drop: 160, reason: '社媒内容适配多平台格式工作量大，部分内容未完成适配', action: '建议启用 AI 自动适配，一键生成微信/微博/LinkedIn 多格式版本' },
    { dropPct: 19, drop: 80, reason: '部分社媒平台发布失败（权限失效/内容违规）', action: '建议加强渠道账号健康监控，在发布前进行内容合规预检' },
    { dropPct: 46, drop: 158, reason: '社媒发布后互动率低，内容与受众兴趣匹配度不足', action: '建议基于热点趋势分析调整内容方向，优化发布时间至用户活跃峰值' },
  ],
  ads: [
    { dropPct: 34, drop: 117, reason: '广告素材适配版本不足，仅有单一尺寸', action: '建议 AI 自动生成多尺寸广告素材（Banner/信息流/开屏），覆盖更多展位' },
    { dropPct: 20, drop: 47, reason: '广告审核被拒比例较高（占比 18%）', action: '建议启用广告内容预审功能，提前识别违规词汇和限制图片' },
    { dropPct: 61, drop: 112, reason: '广告着陆页与广告内容不匹配，跳出率高达 72%', action: '建议针对每条广告创建专属着陆页，提升广告到转化的一致性' },
  ],
}

const CHANNEL_BREAKDOWN = [
  { channel: '官网',    icon: '🌐', published: 180, exposure: 45000,  clicks: 3900, leads: 462 },
  { channel: '社媒（国际）', icon: '🌍', published: 210, exposure: 68000,  clicks: 3400, leads: 272 },
  { channel: '社媒（国内）', icon: '📱', published: 165, exposure: 60000,  clicks: 3000, leads: 240 },
  { channel: '广告',    icon: '📣', published: 169, exposure: 95000,  clicks: 4800, leads: 380 },
]

export default function ContentFunnel({ onNavigate }) {
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [selectedStage, setSelectedStage] = useState(null)

  const funnel = CHANNEL_FUNNELS[selectedChannel]
  const drops = DROP_REASONS[selectedChannel]
  const maxBar = 560

  const stages = STAGE_META.map((s, i) => ({
    ...s,
    value: funnel.values[i],
    pct: Math.round((funnel.values[i] / funnel.values[0]) * 100),
  }))

  const finalRate = Math.round((funnel.values[funnel.values.length - 1] / funnel.values[0]) * 100)
  const publishRate = Math.round((funnel.values[2] / funnel.values[0]) * 100)
  const maxDropPct = Math.max(...drops.map((d) => d.dropPct))
  const maxDropStage = drops.find((d) => d.dropPct === maxDropPct)
  const maxDropIdx = drops.indexOf(maxDropStage)
  const maxDropLabel = `${STAGE_META[maxDropIdx + 1].label} (${maxDropPct}%)`

  return (
    <div className="p-6 space-y-5">
      {/* Channel Tabs */}
      <div className="flex items-center gap-2">
        {CHANNEL_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setSelectedChannel(tab.id); setSelectedStage(null) }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              selectedChannel === tab.id ? 'text-white border-transparent shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-700'
            }`}
            style={selectedChannel === tab.id ? { backgroundColor: PRIMARY } : {}}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
        <span className="ml-2 text-xs text-gray-400">选择渠道后查看该渠道独立漏斗数据</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '内容整体转化率', value: `${finalRate}%`, sub: `创作 → 带来用户行为`, color: '#EF4444' },
          { label: '发布转化率',     value: `${publishRate}%`, sub: `创作 → 成功发布`,     color: '#10B981' },
          { label: '最大流失环节',   value: STAGE_META[maxDropIdx + 1].label, sub: `流失 ${maxDropPct}%（${maxDropStage.drop} 条）`, color: PRIMARY },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-semibold text-gray-700">内容价值转化漏斗</div>
          <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
            {funnel.label} · 总量 <strong>{funnel.values[0].toLocaleString()}</strong> 条
          </div>
        </div>
        <div className="space-y-2">
          {stages.map((stage, i) => {
            const barWidth = (stage.pct / 100) * maxBar
            const isSelected = selectedStage === stage.key
            return (
              <div key={stage.key}>
                <button
                  className="w-full text-left"
                  onClick={() => setSelectedStage(isSelected ? null : stage.key)}
                >
                  <div className="flex items-center gap-4 mb-1">
                    <span className="text-sm w-4">{stage.icon}</span>
                    <span className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">{stage.label}</span>
                    <div
                      className="h-9 rounded-lg flex items-center px-3 transition-all"
                      style={{
                        width: `${barWidth}px`,
                        backgroundColor: stage.color + (isSelected ? 'ff' : 'cc'),
                        minWidth: '60px',
                      }}
                    >
                      <span className="text-white text-sm font-bold">{stage.value.toLocaleString()}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-500">{stage.pct}%</span>
                    {isSelected && (
                      <span className="text-xs text-gray-400 italic">{stage.desc}</span>
                    )}
                  </div>
                </button>

                {/* Drop indicator */}
                {i < stages.length - 1 && (
                  <div className="ml-32 flex items-center gap-2 py-0.5">
                    <div className="w-px h-3 bg-gray-200 ml-4" />
                    <span className="text-xs text-red-400 font-medium">
                      ↓ 流失 {stages[i].value - stages[i + 1].value} 条
                      （-{stages[i + 1].pct === 0 ? 100 : 100 - Math.round((stages[i + 1].value / stages[i].value) * 100)}%）
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-4 gap-3">
          {stages.map((s) => (
            <div key={s.key} className="text-center">
              <div className="w-4 h-4 rounded mx-auto mb-1" style={{ backgroundColor: s.color }} />
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Drop-off Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">各阶段流失分析与 AI 建议</div>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{funnel.label}</span>
        </div>
        <div className="divide-y divide-gray-50">
          {drops.map((d, i) => (
            <div key={i} className="px-5 py-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 text-center w-12">
                  <div className="text-sm text-red-500 font-bold">-{d.dropPct}%</div>
                  <div className="text-xs text-gray-400">{d.drop}条</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-600 mb-0.5">
                    {STAGE_META[i].label}
                    <span className="mx-1.5 text-gray-300">→</span>
                    {STAGE_META[i + 1].label}
                  </div>
                  <div className="text-xs text-gray-500 mb-1">原因：{d.reason}</div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-xs text-amber-600 font-medium flex-shrink-0">AI建议：</span>
                    <span className="text-xs text-amber-700">{d.action}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Breakdown Table (only shown in 全部 view) */}
      {selectedChannel === 'all' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-700">各渠道发布 → 转化明细</div>
            <button
              onClick={() => onNavigate && onNavigate('analytics/channels')}
              className="text-xs hover:underline"
              style={{ color: PRIMARY }}
            >
              查看完整渠道数据 →
            </button>
          </div>
          <div
            className="grid px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium bg-gray-50"
            style={{ gridTemplateColumns: '140px 80px 100px 80px 80px 100px' }}
          >
            <div>渠道</div>
            <div>发布条数</div>
            <div>曝光量</div>
            <div>点击量</div>
            <div>线索数</div>
            <div>点击转化率</div>
          </div>
          {CHANNEL_BREAKDOWN.map((c) => (
            <div
              key={c.channel}
              className="grid px-5 py-3.5 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors"
              style={{ gridTemplateColumns: '140px 80px 100px 80px 80px 100px' }}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>{c.icon}</span>
                {c.channel}
              </div>
              <div className="text-sm text-gray-600">{c.published}</div>
              <div className="text-sm text-gray-600">{(c.exposure / 10000).toFixed(1)} 万</div>
              <div className="text-sm text-gray-600">{c.clicks.toLocaleString()}</div>
              <div className="text-sm font-semibold" style={{ color: PRIMARY }}>{c.leads}</div>
              <div className="text-sm text-gray-600">
                {((c.leads / c.clicks) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
