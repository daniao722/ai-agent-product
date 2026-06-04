import { useState } from 'react'

const PRIMARY = '#C9A227'

const EVENT_TYPES = [
  { label: '电商大促', color: '#EF4444', bg: '#FEE2E2' },
  { label: '法定节假日', color: '#F97316', bg: '#FFEDD5' },
  { label: '行业节点', color: '#EAB308', bg: '#FEF9C3' },
  { label: '文化节点', color: '#22C55E', bg: '#DCFCE7' },
  { label: '企业内部', color: '#3B82F6', bg: '#DBEAFE' },
]

const calendarData = {
  month: '2026年6月',
  weeks: [
    [
      { day: 1, events: [{ label: '618预热开始', type: 0 }] },
      { day: 2, events: [{ label: '儿童节', type: 1 }] },
      { day: 3, events: [] },
      { day: 4, events: [{ label: '社媒帖子×2', type: 4 }] },
      { day: 5, events: [] },
      { day: 6, events: [{ label: 'EDM发送', type: 4 }] },
      { day: 7, events: [] },
    ],
    [
      { day: 8, events: [] },
      { day: 9, events: [{ label: '618预热高峰', type: 0 }] },
      { day: 10, events: [{ label: '端午节', type: 1 }, { label: '粽子主题内容', type: 3 }] },
      { day: 11, events: [{ label: '618冲刺期', type: 0 }] },
      { day: 12, events: [] },
      { day: 13, events: [{ label: '社媒帖子', type: 4 }] },
      { day: 14, events: [{ label: '父亲节', type: 3 }] },
    ],
    [
      { day: 15, events: [{ label: '618倒计时', type: 0 }] },
      { day: 16, events: [{ label: '官网Banner更新', type: 4 }] },
      { day: 17, events: [] },
      { day: 18, events: [{ label: '618当日', type: 0 }] },
      { day: 19, events: [{ label: '618返场', type: 0 }] },
      { day: 20, events: [] },
      { day: 21, events: [] },
    ],
    [
      { day: 22, events: [] },
      { day: 23, events: [{ label: '行业峰会', type: 2 }] },
      { day: 24, events: [{ label: '行业峰会', type: 2 }] },
      { day: 25, events: [{ label: '618收官复盘', type: 0 }] },
      { day: 26, events: [] },
      { day: 27, events: [{ label: '7月内容预热', type: 4 }] },
      { day: 28, events: [] },
    ],
    [
      { day: 29, events: [] },
      { day: 30, events: [{ label: '月度数据总结', type: 4 }] },
      null, null, null, null, null,
    ],
  ],
}

export default function ContentCalendar() {
  const [view, setView] = useState('month')
  const [showAiModal, setShowAiModal] = useState(false)

  return (
    <div className="p-6 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
            </svg>
          </button>
          <h2 className="text-base font-semibold text-gray-800">{calendarData.month}</h2>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
            </svg>
          </button>
          <button
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
          >
            今天
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {['month', 'week', 'list'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  view === v ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {v === 'month' ? '月' : v === 'week' ? '周' : '列表'}
              </button>
            ))}
          </div>

          {/* Add Event */}
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
            </svg>
            添加节点
          </button>

          {/* AI Generate */}
          <button
            onClick={() => setShowAiModal(true)}
            className="text-xs px-4 py-1.5 rounded-lg text-white font-medium flex items-center gap-1.5 shadow-sm"
            style={{ backgroundColor: PRIMARY }}
          >
            <span className="text-sm">✨</span>
            AI 生成6月计划
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {EVENT_TYPES.map((t) => (
          <div key={t.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
            <span className="text-xs text-gray-500">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Days header */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((d) => (
            <div key={d} className="text-center py-2 text-xs font-medium text-gray-500 border-r border-gray-100 last:border-r-0">
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {calendarData.weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-gray-100 last:border-b-0">
            {week.map((cell, di) => (
              <div
                key={di}
                className={`min-h-24 p-2 border-r border-gray-100 last:border-r-0 ${
                  cell ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                }`}
              >
                {cell && (
                  <>
                    <div className="text-xs font-medium text-gray-600 mb-1">{cell.day}</div>
                    <div className="space-y-0.5">
                      {cell.events.map((ev, ei) => {
                        const type = EVENT_TYPES[ev.type]
                        return (
                          <div
                            key={ei}
                            className="text-xs px-1.5 py-0.5 rounded truncate"
                            style={{ backgroundColor: type.bg, color: type.color, fontSize: '10px' }}
                          >
                            {ev.label}
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[560px] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-gray-800">AI 批量生成6月内容计划</h3>
                <p className="text-xs text-gray-500 mt-0.5">AI已识别618大促、端午节、父亲节共3个重要节点</p>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
              </button>
            </div>

            <div className="space-y-2 mb-5">
              {[
                { phase: '618预热期', dates: '6/1–6/10', items: ['社媒帖子×10', '官网Banner×2', 'EDM×1'], color: '#EF4444' },
                { phase: '618冲刺期', dates: '6/11–6/18', items: ['社媒帖子×15', '产品描述×5', 'EDM×2'], color: '#F97316' },
                { phase: '返场+常规', dates: '6/19–6/30', items: ['社媒帖子×8', '行业动态×3', 'EDM×1'], color: '#3B82F6' },
              ].map((p) => (
                <div key={p.phase} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-sm font-medium text-gray-700">{p.phase}</span>
                    </div>
                    <span className="text-xs text-gray-400">{p.dates}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {p.items.map((item) => (
                      <span key={item} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>共生成 42 条内容任务 · 消耗 <strong className="text-amber-600">30 豆子</strong></span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowAiModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                取消
              </button>
              <button
                onClick={() => setShowAiModal(false)}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium shadow-sm"
                style={{ backgroundColor: PRIMARY }}
              >
                确认生成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
