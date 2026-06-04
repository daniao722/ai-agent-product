import { useState } from 'react'

const PRIMARY = '#C9A227'

const PLUGINS = [
  {
    id: 'sales',
    name: '销售转化中心',
    icon: '💰',
    status: 'connected',
    desc: '追踪内容带来的线索、商机、成交，展示内容到收入的完整链路',
    lastSync: '2026-05-28 06:00',
    leadsReceived: 1786,
    color: '#10B981',
  },
  {
    id: 'crm',
    name: '客户服务中心',
    icon: '🎧',
    status: 'available',
    desc: '将高频客诉与 FAQ 热点反馈到内容选题与知识库更新',
    color: '#3B82F6',
  },
  {
    id: 'product',
    name: '产品研发中心',
    icon: '🔧',
    status: 'available',
    desc: '产品版本更新时自动触发内容更新任务',
    color: '#8B5CF6',
  },
  {
    id: 'analytics',
    name: '数据分析中心',
    icon: '📊',
    status: 'available',
    desc: '用户行为热图与转化路径，优化内容结构与 CTA 设计',
    color: '#F59E0B',
  },
]

const LEADS = [
  { id: 'L-2891', content: 'MR-200工业机器人产品白皮书', channel: '官网', source: 'utm_content=whitepaper-mr200', stage: '商机', date: '2026-05-27', value: '¥280,000', contact: '张总 / 华东机械' },
  { id: 'L-2887', content: '618大促产品描述（LinkedIn版）', channel: 'LinkedIn', source: 'utm_campaign=618promo', stage: '成交', date: '2026-05-26', value: '¥145,000', contact: 'Mr. Schmidt / EU Client' },
  { id: 'L-2880', content: '技术博客-工业机器人精度解析', channel: '官网', source: 'utm_content=tech-blog-01', stage: '线索', date: '2026-05-25', value: '—', contact: '李工 / 深圳电子' },
  { id: 'L-2874', content: '新品发布会邀请函（EDM）', channel: '邮件', source: 'utm_campaign=launch-edm', stage: '商机', date: '2026-05-24', value: '¥95,000', contact: 'Ms. Chen / HK Trade' },
  { id: 'L-2869', content: '智能制造解决方案视频', channel: '社媒', source: 'utm_content=solution-video', stage: '线索', date: '2026-05-23', value: '—', contact: '王总 / 苏州制造' },
  { id: 'L-2855', content: '客户案例集-欧洲建筑商', channel: '官网', source: 'utm_content=case-eu-builder', stage: '成交', date: '2026-05-21', value: '¥320,000', contact: 'Mr. Mueller / DE Bauhaus' },
]

const STAGE_CONFIG = {
  '线索': { color: '#3B82F6', bg: '#EFF6FF' },
  '商机': { color: PRIMARY, bg: '#FFFBEB' },
  '成交': { color: '#10B981', bg: '#F0FDF4' },
}

const FUNNEL_DATA = [
  { stage: '内容触达', value: 300200, color: '#3B82F6' },
  { stage: '线索产生', value: 1786, color: PRIMARY },
  { stage: '商机转化', value: 428, color: '#8B5CF6' },
  { stage: '成交', value: 86, color: '#10B981' },
]

export default function LeadTracking() {
  const [pluginConnected] = useState(true)
  const [stageFilter, setStageFilter] = useState('全部')

  const filteredLeads = LEADS.filter(
    l => stageFilter === '全部' || l.stage === stageFilter
  )

  return (
    <div className="p-6 space-y-5">
      {/* Plugin Marketplace */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-semibold text-gray-700">跨中心集成插件</div>
            <div className="text-xs text-gray-400 mt-0.5">订阅外部中心数据，在内容中心直接查看内容带来的业务价值</div>
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600">插件市场</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {PLUGINS.map((p) => (
            <div
              key={p.id}
              className={`rounded-xl border p-4 ${
                p.status === 'connected' ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-xs font-semibold text-gray-700">{p.name}</span>
                </div>
                {p.status === 'connected' ? (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">已连接</span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">未接入</span>
                )}
              </div>
              <div className="text-xs text-gray-400 mb-3 leading-relaxed">{p.desc}</div>
              {p.status === 'connected' ? (
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">已接收线索：<strong style={{ color: p.color }}>{p.leadsReceived.toLocaleString()}</strong></div>
                  <div className="text-xs text-gray-400">同步于 {p.lastSync}</div>
                </div>
              ) : (
                <button
                  className="w-full text-xs py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  申请接入
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards - only when connected */}
      {pluginConnected && (
        <>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: '内容带来线索', value: '1,786', sub: '本月通过内容触达产生', color: '#3B82F6' },
              { label: '线索转商机率', value: '24%', sub: '1,786 → 428 商机', color: PRIMARY },
              { label: '最终成交', value: '86', sub: '带来收入 ¥2.84M', color: '#10B981' },
              { label: '内容整体 ROI', value: '3.82x', sub: '内容成本 vs 带来收入', color: '#8B5CF6' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* UTM Tracking Config */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-lg mt-0.5">🔗</span>
            <div className="flex-1">
              <div className="text-sm font-semibold text-amber-800">UTM 追踪钩子已启用</div>
              <div className="text-xs text-amber-700 mt-0.5">
                所有发布内容自动植入 UTM 参数：
                <code className="bg-amber-100 px-1 rounded text-xs">utm_source=content_hub&utm_medium=[渠道]&utm_content=[内容ID]</code>
              </div>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg border border-amber-300 text-amber-700 whitespace-nowrap">配置钩子</button>
          </div>

          {/* Mini Funnel */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="text-sm font-semibold text-gray-700 mb-4">内容 → 销售转化漏斗</div>
            <div className="flex items-end gap-3 h-28">
              {FUNNEL_DATA.map((f, i) => {
                const maxVal = FUNNEL_DATA[0].value
                const h = Math.max((f.value / maxVal) * 100, 8)
                return (
                  <div key={f.stage} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs font-bold" style={{ color: f.color }}>
                      {f.value >= 1000 ? `${(f.value / 10000).toFixed(1)}万` : f.value.toLocaleString()}
                    </div>
                    <div
                      className="w-full rounded-t-lg transition-all"
                      style={{ height: `${h}px`, backgroundColor: f.color }}
                    />
                    <div className="text-xs text-gray-500 text-center">{f.stage}</div>
                    {i < FUNNEL_DATA.length - 1 && (
                      <div className="text-xs text-gray-300 absolute">→</div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-400">
              <span>内容触达 → 成交转化率：<strong style={{ color: PRIMARY }}>0.029%</strong></span>
              <span>行业均值：0.015%</span>
            </div>
          </div>

          {/* Lead Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700">线索明细（来自销售转化中心）</div>
              <div className="flex items-center gap-2">
                {['全部', '线索', '商机', '成交'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStageFilter(s)}
                    className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                      stageFilter === s ? 'text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                    style={stageFilter === s ? { backgroundColor: PRIMARY } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="grid px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium bg-gray-50"
              style={{ gridTemplateColumns: '80px 1fr 80px 180px 70px 70px 130px' }}
            >
              <div>线索ID</div>
              <div>来源内容</div>
              <div>渠道</div>
              <div>UTM 参数</div>
              <div>阶段</div>
              <div>预期价值</div>
              <div>联系人</div>
            </div>
            {filteredLeads.map((lead) => {
              const sc = STAGE_CONFIG[lead.stage]
              return (
                <div
                  key={lead.id}
                  className="grid px-5 py-3.5 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors"
                  style={{ gridTemplateColumns: '80px 1fr 80px 180px 70px 70px 130px' }}
                >
                  <div className="text-xs font-mono text-gray-400">{lead.id}</div>
                  <div className="text-sm text-gray-700 truncate pr-2">{lead.content}</div>
                  <div className="text-xs text-gray-500">{lead.channel}</div>
                  <div className="text-xs font-mono text-gray-400 truncate">{lead.source}</div>
                  <div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ color: sc.color, backgroundColor: sc.bg }}
                    >
                      {lead.stage}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700">{lead.value}</div>
                  <div className="text-xs text-gray-500 truncate">{lead.contact}</div>
                </div>
              )
            })}
          </div>

          {/* Top Content by Leads */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="text-sm font-semibold text-gray-700 mb-3">内容带来线索 TOP 5</div>
            <div className="space-y-2.5">
              {[
                { title: '工业机器人产品白皮书', leads: 180, channel: '官网' },
                { title: '新品发布会邀请函（EDM）', leads: 86, channel: '邮件' },
                { title: '客户案例集-欧洲建筑商', leads: 72, channel: '官网' },
                { title: '智能制造解决方案视频', leads: 65, channel: '社媒' },
                { title: '618大促产品描述（LinkedIn）', leads: 58, channel: 'LinkedIn' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: i === 0 ? '#F59E0B' : i === 1 ? '#9CA3AF' : i === 2 ? '#92400E' : '#D1D5DB' }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-700">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.channel}</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: PRIMARY }}>{item.leads} 条</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
