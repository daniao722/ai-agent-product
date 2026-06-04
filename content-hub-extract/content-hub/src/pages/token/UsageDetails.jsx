import { useState } from 'react'

const PRIMARY = '#C9A227'

const MODULES = [
  { label: 'AI文案工场', beans: 180, color: '#3B82F6' },
  { label: 'AI视觉创作', beans: 250, color: '#8B5CF6' },
  { label: 'AI视频工厂', beans: 0, color: '#F97316' },
  { label: '内容规划', beans: 60, color: '#10B981' },
  { label: '全球化翻译', beans: 30, color: '#EC4899' },
  { label: '平台审核', beans: 14, color: '#F59E0B' },
]

const LOGS = [
  { time: '2026-05-27 10:32', module: 'AI视觉创作', action: '生成618促销海报（5张）', beans: -50, user: '王芳' },
  { time: '2026-05-27 09:15', module: 'AI文案工场', action: '生成产品描述×3版本（中等长度）', beans: -38, user: '李明' },
  { time: '2026-05-26 17:40', module: '平台专属审核', action: 'Facebook发布前审核', beans: -2, user: '赵磊' },
  { time: '2026-05-26 14:22', module: '全球化翻译', action: '产品白皮书德语翻译（3100字）', beans: -31, user: '李明' },
  { time: '2026-05-26 10:05', module: 'AI内容规划', action: '生成6月月度内容计划', beans: -30, user: '李明' },
  { time: '2026-05-25 16:11', module: 'AI文案工场', action: '生成邮件正文（简短版）', beans: -5, user: '赵磊' },
  { time: '2026-05-25 11:30', module: 'AI视觉创作', action: '工厂实拍主视觉（8张）', beans: -50, user: '王芳' },
  { time: '2026-05-24 15:48', module: 'AI文案工场', action: '生成社媒帖子×3版本（简短）', beans: -13, user: '赵磊' },
]

const DAILY = [
  { day: '05-20', beans: 45 },
  { day: '05-21', beans: 20 },
  { day: '05-22', beans: 88 },
  { day: '05-23', beans: 12 },
  { day: '05-24', beans: 63 },
  { day: '05-25', beans: 68 },
  { day: '05-26', beans: 83 },
  { day: '05-27', beans: 91 },
]

const maxBar = Math.max(...DAILY.map((d) => d.beans))

export default function UsageDetails() {
  const [view, setView] = useState('personal')
  const [period, setPeriod] = useState('30天')

  const total = MODULES.reduce((a, m) => a + m.beans, 0)

  return (
    <div className="p-6 space-y-5">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {['personal', 'enterprise'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === v ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {v === 'personal' ? '个人维度' : '企业维度'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {['30天', '90天', '自定义'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${period === p ? 'text-white' : 'bg-gray-100 text-gray-600'}`}
              style={period === p ? { backgroundColor: PRIMARY } : {}}
            >
              {p}
            </button>
          ))}
          <button className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
            导出CSV
          </button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Daily bar chart */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-4">每日豆子消耗趋势</div>
          <div className="flex items-end gap-2 h-32">
            {DAILY.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-gray-500 h-4">{d.beans}</div>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{ height: `${(d.beans / maxBar) * 80}px`, backgroundColor: PRIMARY }}
                />
                <div className="text-xs text-gray-400 whitespace-nowrap" style={{ fontSize: '10px' }}>{d.day}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>近{period}消耗：<strong className="text-gray-800">{total + 380} 豆</strong></span>
            <span>日均消耗：<strong className="text-gray-800">{Math.round((total + 380) / 30)} 豆</strong></span>
          </div>
        </div>

        {/* Module distribution */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-4">模块消耗分布</div>
          <div className="space-y-2.5">
            {MODULES.filter(m => m.beans > 0).map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{m.label}</span>
                  <span>{m.beans} 豆 ({Math.round((m.beans / total) * 100)}%)</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 rounded-full" style={{ width: `${(m.beans / total) * 100}%`, backgroundColor: m.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
            总计 <strong className="text-gray-800">{total} 豆</strong>
          </div>
        </div>
      </div>

      {/* Enterprise: Member ranking */}
      {view === 'enterprise' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">成员消耗排行榜</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: '王芳', role: '设计师', beans: 1250, rank: 1 },
              { name: '李明', role: '管理员', beans: 420, rank: 2 },
              { name: '赵磊', role: '运营', beans: 380, rank: 3 },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${m.rank === 1 ? 'bg-amber-400' : m.rank === 2 ? 'bg-gray-400' : 'bg-amber-700'}`}>
                  {m.rank}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">{m.name}</div>
                  <div className="text-xs text-gray-400">{m.role}</div>
                </div>
                <div className="text-sm font-bold text-gray-800">{m.beans.toLocaleString()} 豆</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Log */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-700">操作明细记录</div>
        </div>
        <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
          <div className="col-span-2">时间</div>
          <div className="col-span-2">功能模块</div>
          <div className="col-span-5">操作内容</div>
          <div className="col-span-1 text-center">消耗</div>
          <div className="col-span-2">操作人</div>
        </div>
        {LOGS.map((log, i) => (
          <div key={i} className="grid grid-cols-12 px-5 py-3 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
            <div className="col-span-2 text-xs text-gray-400">{log.time}</div>
            <div className="col-span-2 text-xs text-gray-600">{log.module}</div>
            <div className="col-span-5 text-sm text-gray-700">{log.action}</div>
            <div className="col-span-1 text-center text-sm font-semibold text-amber-600">{log.beans}</div>
            <div className="col-span-2 text-xs text-gray-500">{log.user}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
