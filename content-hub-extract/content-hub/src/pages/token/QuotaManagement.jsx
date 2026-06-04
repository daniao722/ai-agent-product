import { useState } from 'react'

const PRIMARY = '#C9A227'

const MEMBERS = [
  { name: '李明', role: '管理员', allocated: 800, used: 420, avatar: '李' },
  { name: '王芳', role: '设计师', allocated: 1500, used: 1250, avatar: '王' },
  { name: '赵磊', role: '运营', allocated: 700, used: 380, avatar: '赵' },
]

const DEPARTMENTS = [
  { name: '内容策略组', total: 800, used: 420 },
  { name: '视觉设计组', total: 1500, used: 1250 },
  { name: '社媒运营组', total: 700, used: 380 },
]

export default function QuotaManagement() {
  const [showAlert] = useState(true)

  const totalAllocated = MEMBERS.reduce((a, m) => a + m.allocated, 0)
  const totalUsed = MEMBERS.reduce((a, m) => a + m.used, 0)
  const planTotal = 3000

  return (
    <div className="p-6 space-y-5">
      {/* Plan Overview */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-base font-semibold text-gray-800">当前套餐：标准版</div>
            <div className="text-sm text-gray-500 mt-0.5">月度重置日：每月1日 · 5个席位 · 次月到期</div>
          </div>
          <button className="text-sm px-4 py-2 rounded-xl text-white font-medium" style={{ backgroundColor: PRIMARY }}>
            升级套餐
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '月度总额度', value: planTotal.toLocaleString(), unit: '豆', color: '#3B82F6' },
            { label: '已分配', value: totalAllocated.toLocaleString(), unit: '豆', color: PRIMARY },
            { label: '本月已用', value: totalUsed.toLocaleString(), unit: '豆', color: '#EF4444' },
            { label: '剩余可用', value: (planTotal - totalUsed).toLocaleString(), unit: '豆', color: '#10B981' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: s.color }}>
                {s.value}<span className="text-sm font-normal text-gray-400 ml-1">{s.unit}</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-3 rounded-full" style={{ width: `${(totalUsed / planTotal) * 100}%`, backgroundColor: PRIMARY }} />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>已使用 {Math.round((totalUsed / planTotal) * 100)}%</span>
            <span>总量 {planTotal.toLocaleString()} 豆</span>
          </div>
        </div>
      </div>

      {/* Warning alert */}
      {MEMBERS.some((m) => m.used / m.allocated >= 0.8) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
          <span>⚠️</span>
          <div className="text-sm text-amber-700">
            <strong>王芳</strong>的豆子用量已达分配额度的 83%，建议追加额度或提醒其减少用量。
          </div>
        </div>
      )}

      {/* Member Allocation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-gray-700">成员额度分配</div>
          <div className="text-xs text-gray-400">已分配 {totalAllocated} / 总量 {planTotal} 豆</div>
        </div>

        <div className="space-y-4">
          {MEMBERS.map((m) => {
            const pct = Math.round((m.used / m.allocated) * 100)
            const isHigh = pct >= 80
            return (
              <div key={m.name} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-600 font-medium flex-shrink-0">
                  {m.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">{m.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{m.role}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{m.used} / {m.allocated} 豆</span>
                      <span className={`font-semibold ${isHigh ? 'text-red-500' : 'text-gray-600'}`}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, pct)}%`, backgroundColor: isHigh ? '#EF4444' : PRIMARY }}
                    />
                  </div>
                </div>
                <button className="flex-shrink-0 text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  调整
                </button>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-sm px-4 py-2 rounded-xl text-white font-medium" style={{ backgroundColor: PRIMARY }}>
            + 添加席位
          </button>
        </div>
      </div>

      {/* Department Pools */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-gray-700">部门额度池</div>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">+ 新建部门池</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {DEPARTMENTS.map((dept) => {
            const pct = Math.round((dept.used / dept.total) * 100)
            return (
              <div key={dept.name} className="border border-gray-100 rounded-xl p-3">
                <div className="text-sm font-medium text-gray-700 mb-2">{dept.name}</div>
                <div className="text-lg font-bold text-gray-800">
                  {dept.used}<span className="text-xs text-gray-400 font-normal">/{dept.total} 豆</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: pct > 80 ? '#EF4444' : PRIMARY }} />
                </div>
                <div className="text-xs text-gray-400 mt-1">{pct}% 已使用</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Alert settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-700">额度预警设置</div>
          <div className="text-xs text-gray-400 mt-0.5">当成员用量达到分配额度的指定比例时，发送邮件/系统通知</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">预警阈值</span>
          <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none text-gray-700">
            <option>80%</option>
            <option>70%</option>
            <option>90%</option>
          </select>
          <button className="text-sm px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>保存</button>
        </div>
      </div>
    </div>
  )
}
