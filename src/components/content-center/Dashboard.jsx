const PRIMARY = '#C9A227'

const stats = [
  { label: '本月内容生成', value: '248', unit: '篇', delta: '+12%', up: true, icon: '✍️' },
  { label: '已发布内容', value: '183', unit: '篇', delta: '+8%', up: true, icon: '📤' },
  { label: '待审核内容', value: '17', unit: '篇', delta: '-3', up: false, icon: '⏳' },
  { label: '本月带来线索', value: '1,786', unit: '条', delta: '+18%', up: true, icon: '🎯' },
  { label: '豆子余额', value: '3,000', unit: '豆', delta: '标准版', up: true, icon: '🫘' },
]

const recentActivities = [
  { type: 'copy', action: '生成文案', content: '618大促产品描述×3版本', time: '10分钟前', beans: -15 },
  { type: 'review', action: '审核通过', content: 'LinkedIn企业动态 - 新品发布', time: '32分钟前', beans: -2 },
  { type: 'social', action: '发布成功', content: 'Instagram帖子 - 工厂实拍系列', time: '1小时前', beans: 0 },
  { type: 'visual', action: '生成图片', content: '618促销海报 5张', time: '2小时前', beans: -50 },
  { type: 'email', action: '邮件发送', content: '5月新品上线EDM · 1,240封', time: '昨天', beans: 0 },
  { type: 'plan', action: 'AI生成计划', content: '6月内容计划 · 42条任务', time: '昨天', beans: -30 },
]

const quickActions = [
  { label: 'AI生成文案', page: 'creation/copy', icon: '✍️', color: '#3B82F6' },
  { label: 'AI创作助手', page: 'creation/assistant', icon: '🤖', color: '#8B5CF6' },
  { label: '发布到社媒', page: 'distribution/international', icon: '📤', color: '#10B981' },
  { label: '渠道配置', page: 'distribution/channels', icon: '🔗', color: '#F59E0B' },
]

const moduleCards = [
  { label: '内容策略', desc: '日历·热点·计划', page: 'strategy/calendar', bg: '#EFF6FF', border: '#BFDBFE', icon: '📅' },
  { label: '内容创作', desc: '文案·图片·助手', page: 'creation/copy', bg: '#F0FDF4', border: '#BBF7D0', icon: '✍️' },
  { label: '内容分发', desc: '邮件·社媒·官网', page: 'distribution/channels', bg: '#FDF4FF', border: '#E9D5FF', icon: '📤' },
  { label: '内容审核', desc: '品牌·质量·风控', page: 'review/general', bg: '#FFF7ED', border: '#FED7AA', icon: '✅' },
  { label: '效果分析', desc: '渠道·漏斗·线索', page: 'analytics/channels', bg: '#F0FDF4', border: '#BBF7D0', icon: '📊' },
  { label: '品牌资产库', desc: '知识库·规则·词库', page: 'brand/knowledge', bg: '#FFF1F2', border: '#FECDD3', icon: '📚' },
]

const calendarEvents = [
  { day: '01', events: [{ label: '618预热开始', color: '#EF4444' }] },
  { day: '02', events: [] },
  { day: '03', events: [{ label: '端午节内容', color: '#10B981' }] },
  { day: '04', events: [] },
  { day: '05', events: [{ label: 'EDM发送', color: '#3B82F6' }] },
  { day: '06', events: [{ label: '618冲刺', color: '#EF4444' }] },
  { day: '07', events: [] },
]

const FUNNEL_STAGES = [
  { label: '内容创作', value: 1248, color: '#3B82F6' },
  { label: '多场景裂变', value: 899, color: PRIMARY },
  { label: '发布上线', value: 724, color: '#10B981' },
  { label: '用户转化', value: 399, color: '#EF4444' },
]

const CHANNEL_ROWS = [
  { channel: '官网', icon: '🌐', exposure: '4.5万', ctr: '8.5%', cvr: '12%', up: true },
  { channel: '社媒', icon: '📱', exposure: '12.8万', ctr: '5.0%', cvr: '8%', up: true },
  { channel: '广告', icon: '📣', exposure: '9.5万', ctr: '5.1%', cvr: '7.9%', up: false },
]

export default function Dashboard({ onNavigate }) {
  const maxFunnel = FUNNEL_STAGES[0].value

  return (
    <div className="p-6 space-y-5">
      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className="text-2xl font-bold text-gray-800">
                  {s.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{s.unit}</span>
                </div>
                <div className={`text-xs mt-1 ${s.up ? 'text-green-500' : 'text-red-400'}`}>
                  {s.delta} 较上月
                </div>
              </div>
              <span className="text-2xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Left col */}
        <div className="col-span-2 space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-sm font-semibold text-gray-700 mb-3">快捷操作</div>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => onNavigate(a.page)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: a.color + '18' }}
                  >
                    {a.icon}
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-gray-800 text-center leading-tight">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Module Entry */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-sm font-semibold text-gray-700 mb-3">功能模块</div>
            <div className="grid grid-cols-3 gap-3">
              {moduleCards.map((m) => (
                <button
                  key={m.label}
                  onClick={() => onNavigate(m.page)}
                  className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-sm text-left"
                  style={{ backgroundColor: m.bg, borderColor: m.border }}
                >
                  <span className="text-xl">{m.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-gray-700">{m.label}</div>
                    <div className="text-xs text-gray-400">{m.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-700">内容价值转化漏斗</div>
              <button
                onClick={() => onNavigate('analytics/funnel')}
                className="text-xs hover:underline"
                style={{ color: PRIMARY }}
              >
                查看详情 →
              </button>
            </div>
            <div className="flex items-end gap-2 h-24">
              {FUNNEL_STAGES.map((s) => {
                const h = Math.max((s.value / maxFunnel) * 80, 16)
                const pct = Math.round((s.value / maxFunnel) * 100)
                return (
                  <div key={s.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs text-gray-500 font-semibold" style={{ fontSize: '10px' }}>{s.value.toLocaleString()}</div>
                    <div
                      className="w-full rounded-t-lg"
                      style={{ height: `${h}px`, backgroundColor: s.color }}
                    />
                    <div className="text-xs text-gray-400 text-center leading-tight" style={{ fontSize: '10px' }}>
                      {s.label}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-xs text-gray-400">
              <span>总创作 <strong className="text-gray-600">1,248</strong> 条</span>
              <span>最终转化率 <strong style={{ color: PRIMARY }}>32%</strong></span>
              <span>带来线索 <strong className="text-gray-600">1,786</strong> 条</span>
            </div>
          </div>

          {/* Channel Effect Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-700">渠道效果数据</div>
              <button
                onClick={() => onNavigate('analytics/channels')}
                className="text-xs hover:underline"
                style={{ color: PRIMARY }}
              >
                完整分析 →
              </button>
            </div>
            <div
              className="grid text-xs text-gray-400 font-medium pb-2 border-b border-gray-100 mb-1"
              style={{ gridTemplateColumns: '80px 100px 70px 70px' }}
            >
              <div>渠道</div>
              <div>曝光量</div>
              <div>点击率</div>
              <div>转化率</div>
            </div>
            {CHANNEL_ROWS.map((r) => (
              <div
                key={r.channel}
                className="grid items-center py-2 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
                style={{ gridTemplateColumns: '80px 100px 70px 70px' }}
              >
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <span>{r.icon}</span>
                  {r.channel}
                </div>
                <div className="text-sm text-gray-600">{r.exposure}</div>
                <div className="text-sm font-semibold" style={{ color: PRIMARY }}>{r.ctr}</div>
                <div className="text-sm font-semibold text-gray-700">{r.cvr}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-4">
          {/* Bean Usage */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-sm font-semibold text-gray-700 mb-3">豆子消耗（本月）</div>
            <div className="space-y-2">
              {[
                { label: 'AI文案', used: 180, total: 300, color: '#3B82F6' },
                { label: 'AI图片', used: 250, total: 600, color: '#8B5CF6' },
                { label: '内容规划', used: 60, total: 100, color: '#10B981' },
                { label: '翻译', used: 30, total: 100, color: '#F59E0B' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{item.label}</span>
                    <span>{item.used}/{item.total} 豆</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${(item.used / item.total) * 100}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-500">共消耗 520 豆</span>
              <button onClick={() => onNavigate('token/usage')} className="text-xs" style={{ color: PRIMARY }}>
                查看明细
              </button>
            </div>
          </div>

          {/* Mini Calendar */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-700">本周内容计划</div>
              <button
                onClick={() => onNavigate('strategy/calendar')}
                className="text-xs hover:underline"
                style={{ color: PRIMARY }}
              >
                查看日历 →
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {calendarEvents.map((day) => (
                <div key={day.day} className="text-center">
                  <div className="text-xs text-gray-400 mb-1">{day.day}日</div>
                  <div className="min-h-8 space-y-1">
                    {day.events.map((ev) => (
                      <div
                        key={ev.label}
                        className="text-white px-0.5 py-0.5 rounded leading-tight"
                        style={{ backgroundColor: ev.color, fontSize: '9px' }}
                      >
                        {ev.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-sm font-semibold text-gray-700 mb-3">最近操作</div>
            <div className="space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    {a.type === 'copy' && '✍️'}
                    {a.type === 'review' && '✅'}
                    {a.type === 'social' && '📤'}
                    {a.type === 'visual' && '🖼️'}
                    {a.type === 'email' && '📧'}
                    {a.type === 'plan' && '📅'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-700 truncate">{a.content}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{a.time}</span>
                      {a.beans !== 0 && (
                        <span className="text-xs text-amber-600">{a.beans} 豆</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
