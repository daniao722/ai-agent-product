import { useState } from 'react'

const PRIMARY = '#C9A227'

const campaigns = [
  { name: '5月新品上线通知', subject: '【冠成门窗】全新断桥铝系列正式发布', group: '全部客户', sent: 1240, open: 28.4, click: 6.2, unsub: 0.3, status: 'sent', date: '2026-05-15' },
  { name: '618大促预告EDM', subject: '提前锁定！618工厂直供价来了', group: 'VIP客户', sent: 856, open: 35.1, click: 11.8, unsub: 0.2, status: 'sent', date: '2026-06-01' },
  { name: '父亲节感谢信', subject: '谢谢您信任我们，父亲节特别优惠', group: '历史下单', sent: 0, open: 0, click: 0, unsub: 0, status: 'scheduled', date: '2026-06-14' },
  { name: '行业动态月报', subject: '6月建材行业洞察：节能趋势加速', group: '行业用户', sent: 0, open: 0, click: 0, unsub: 0, status: 'draft', date: '2026-06-25' },
]

const STATUS = {
  sent: { label: '已发送', color: '#10B981', bg: '#DCFCE7' },
  scheduled: { label: '定时发送', color: PRIMARY, bg: '#FBF5E0' },
  draft: { label: '草稿', color: '#6B7280', bg: '#F3F4F6' },
}

const groups = [
  { name: '全部客户', count: 3480, tags: ['邮件有效'] },
  { name: 'VIP客户', count: 856, tags: ['下单3次+', '高价值'] },
  { name: '历史下单', count: 1240, tags: ['下单1次+'] },
  { name: '行业用户', count: 920, tags: ['建筑商', '设计师'] },
  { name: '欧洲市场', count: 1100, tags: ['EU地区'] },
]

export default function EmailMarketing() {
  const [tab, setTab] = useState('campaigns')

  return (
    <div className="p-6 space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { id: 'campaigns', label: '邮件活动' },
          { id: 'groups', label: '收件人分组' },
          { id: 'templates', label: '模板库' },
          { id: 'stats', label: '数据统计' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'campaigns' && (
        <>
          {/* AI Recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-3">
            <span className="text-blue-500">💡</span>
            <div className="text-sm text-blue-700 flex-1">
              AI建议：根据历史数据，<strong>周四下午14:00</strong> 发送打开率最高（历史均值35.1%）。父亲节EDM建议提前2天发送，即 <strong>6月12日</strong>。
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg text-white flex-shrink-0" style={{ backgroundColor: '#3B82F6' }}>采纳建议</button>
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-xl text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>
              + 创建新邮件活动
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
              <div className="col-span-3">活动名称</div>
              <div className="col-span-1">分组</div>
              <div className="col-span-1 text-center">发送量</div>
              <div className="col-span-1 text-center">打开率</div>
              <div className="col-span-1 text-center">点击率</div>
              <div className="col-span-1 text-center">退订率</div>
              <div className="col-span-1">状态</div>
              <div className="col-span-2">日期</div>
              <div className="col-span-1 text-right">操作</div>
            </div>

            {campaigns.map((c, i) => {
              const st = STATUS[c.status]
              return (
                <div key={i} className="grid grid-cols-12 px-5 py-3.5 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-3">
                    <div className="text-sm font-medium text-gray-800">{c.name}</div>
                    <div className="text-xs text-gray-400 truncate mt-0.5">{c.subject}</div>
                  </div>
                  <div className="col-span-1 text-xs text-gray-500">{c.group}</div>
                  <div className="col-span-1 text-center text-sm font-medium text-gray-700">
                    {c.sent > 0 ? c.sent.toLocaleString() : '—'}
                  </div>
                  <div className="col-span-1 text-center">
                    {c.open > 0 ? (
                      <span className={`text-sm font-semibold ${c.open > 30 ? 'text-green-600' : 'text-gray-600'}`}>{c.open}%</span>
                    ) : <span className="text-gray-300">—</span>}
                  </div>
                  <div className="col-span-1 text-center">
                    {c.click > 0 ? <span className="text-sm text-gray-700">{c.click}%</span> : <span className="text-gray-300">—</span>}
                  </div>
                  <div className="col-span-1 text-center">
                    {c.unsub > 0 ? <span className="text-sm text-gray-500">{c.unsub}%</span> : <span className="text-gray-300">—</span>}
                  </div>
                  <div className="col-span-1">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                  <div className="col-span-2 text-xs text-gray-500">{c.date}</div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <button className="text-xs text-gray-400 hover:text-gray-600">复制</button>
                    <button className="text-xs" style={{ color: PRIMARY }}>
                      {c.status === 'draft' ? '编辑' : '查看'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {tab === 'groups' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-xl text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>
              + 新建分组
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {groups.map((g) => (
              <div key={g.name} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-800">{g.name}</div>
                  <div className="text-lg font-bold text-gray-700">{g.count.toLocaleString()}</div>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {g.tags.map((t) => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
                <button className="mt-3 text-xs" style={{ color: PRIMARY }}>管理分组 →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'stats' && (
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '总发送量', value: '2,096', unit: '封', color: '#3B82F6' },
            { label: '平均打开率', value: '31.8', unit: '%', color: '#10B981' },
            { label: '平均点击率', value: '9.0', unit: '%', color: PRIMARY },
            { label: '平均退订率', value: '0.25', unit: '%', color: '#EF4444' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="text-3xl font-bold" style={{ color: s.color }}>
                {s.value}<span className="text-base font-normal text-gray-400 ml-1">{s.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'templates' && (
        <div className="grid grid-cols-3 gap-4">
          {['新品发布', '节日促销', '月度简报', '活动邀请', '感谢信', '空白模板'].map((t) => (
            <div key={t} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group cursor-pointer hover:border-amber-400 transition-all">
              <div className="h-40 bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center">
                <div className="text-4xl">📧</div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{t}</span>
                <button className="text-xs opacity-0 group-hover:opacity-100" style={{ color: PRIMARY }}>使用</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
