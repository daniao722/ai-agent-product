import { useState } from 'react'

const PRIMARY = '#C9A227'

const plans = [
  { title: '618大促预热—产品核心竞争力', channel: 'Instagram', form: '图文', score: 92, status: 'done', owner: '李明', date: '2026-06-01' },
  { title: '618大促预热—UGC联动故事', channel: 'Facebook', form: '图文', score: 88, status: 'done', owner: '王芳', date: '2026-06-02' },
  { title: '618冲刺—工厂实拍生产工艺', channel: 'LinkedIn', form: '视频', score: 95, status: 'progress', owner: '李明', date: '2026-06-11' },
  { title: '端午节情感营销文案', channel: '微信公众号', form: '长文', score: 84, status: 'progress', owner: '赵磊', date: '2026-06-10' },
  { title: '父亲节定制礼品主题', channel: 'Instagram', form: '图文', score: 87, status: 'planned', owner: '王芳', date: '2026-06-14' },
  { title: '行业峰会现场报道', channel: 'LinkedIn', form: '图文', score: 79, status: 'planned', owner: '赵磊', date: '2026-06-23' },
  { title: '夏季隔热性能深度测评', channel: '小红书', form: '图文', score: 91, status: 'planned', owner: '李明', date: '2026-06-20' },
  { title: '7月新品预告视频脚本', channel: 'YouTube', form: '视频', score: 86, status: 'planned', owner: '王芳', date: '2026-06-27' },
  { title: '月度数据洞察报告', channel: '邮件EDM', form: '邮件', score: 83, status: 'planned', owner: '赵磊', date: '2026-06-30' },
]

const STATUS = {
  done: { label: '已完成', color: '#10B981', bg: '#DCFCE7' },
  progress: { label: '进行中', color: PRIMARY, bg: '#FBF5E0' },
  planned: { label: '计划中', color: '#6B7280', bg: '#F3F4F6' },
}

const CHANNELS = ['全部渠道', 'Instagram', 'Facebook', 'LinkedIn', '微信公众号', '小红书', 'YouTube', '邮件EDM']
const STATUSES = ['全部状态', '已完成', '进行中', '计划中']
const OWNERS = ['全部成员', '李明', '王芳', '赵磊']

export default function ContentPlan() {
  const [channelFilter, setChannelFilter] = useState('全部渠道')
  const [statusFilter, setStatusFilter] = useState('全部状态')
  const [ownerFilter, setOwnerFilter] = useState('全部成员')

  const filtered = plans.filter((p) => {
    if (channelFilter !== '全部渠道' && p.channel !== channelFilter) return false
    if (statusFilter !== '全部状态' && STATUS[p.status].label !== statusFilter) return false
    if (ownerFilter !== '全部成员' && p.owner !== ownerFilter) return false
    return true
  })

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white"
          >
            {CHANNELS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white"
          >
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white"
          >
            {OWNERS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <button className="text-sm px-4 py-1.5 rounded-lg text-white font-medium" style={{ backgroundColor: PRIMARY }}>
          + 新增任务
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '已完成', count: plans.filter(p=>p.status==='done').length, color: '#10B981' },
          { label: '进行中', count: plans.filter(p=>p.status==='progress').length, color: PRIMARY },
          { label: '计划中', count: plans.filter(p=>p.status==='planned').length, color: '#6B7280' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: s.color }}>
              {s.count}
            </div>
            <span className="text-sm text-gray-600">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
          <div className="col-span-4">内容标题</div>
          <div className="col-span-1">渠道</div>
          <div className="col-span-1">形式</div>
          <div className="col-span-1 text-center">AI评分</div>
          <div className="col-span-1">状态</div>
          <div className="col-span-1">负责人</div>
          <div className="col-span-2">计划日期</div>
          <div className="col-span-1 text-right">操作</div>
        </div>

        {filtered.map((p, i) => {
          const st = STATUS[p.status]
          return (
            <div key={i} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-4">
                <div className="text-sm text-gray-800">{p.title}</div>
              </div>
              <div className="col-span-1 text-xs text-gray-500">{p.channel}</div>
              <div className="col-span-1">
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{p.form}</span>
              </div>
              <div className="col-span-1 text-center">
                <span className={`text-xs font-semibold ${p.score >= 90 ? 'text-green-600' : p.score >= 80 ? 'text-amber-600' : 'text-gray-500'}`}>
                  {p.score}
                </span>
              </div>
              <div className="col-span-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>
                  {st.label}
                </span>
              </div>
              <div className="col-span-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                    {p.owner[0]}
                  </div>
                  <span className="text-xs text-gray-600">{p.owner}</span>
                </div>
              </div>
              <div className="col-span-2 text-xs text-gray-500">{p.date}</div>
              <div className="col-span-1 flex justify-end gap-1.5">
                <button className="text-xs text-gray-400 hover:text-gray-600 px-1.5">编辑</button>
                <button className="text-xs hover:underline" style={{ color: PRIMARY }}>生成</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
