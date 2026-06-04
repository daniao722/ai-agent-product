import { useState } from 'react'

const PRIMARY = '#C9A227'

const reviewItems = [
  {
    title: '618大促—工厂直供核心优势文案',
    type: '社媒帖子',
    channel: 'Facebook',
    brandScore: 95,
    qualityScore: 88,
    riskScore: 92,
    overall: 'pass',
    issues: [],
  },
  {
    title: 'Q2行业动态白皮书',
    type: '长文',
    channel: '官网博客',
    brandScore: 72,
    qualityScore: 91,
    riskScore: 98,
    overall: 'warning',
    issues: [
      { level: 'warn', rule: '品牌名称一致性', desc: '"冠成Window"应统一使用"冠成门窗"' },
      { level: 'warn', rule: '联系方式准确性', desc: '页面中邮件地址与档案不符' },
    ],
  },
  {
    title: '促销广告图—"第一节能品牌"海报',
    type: '图文',
    channel: 'Instagram',
    brandScore: 88,
    qualityScore: 84,
    riskScore: 45,
    overall: 'block',
    issues: [
      { level: 'block', rule: '虚假宣传风险', desc: '"第一节能品牌"属绝对化表述，无第三方认证支撑，将被拦截' },
      { level: 'warn', rule: '品牌色调一致性', desc: '海报背景色与品牌主色偏差超18%（阈值15%）' },
    ],
  },
]

const OVERALL_CONFIG = {
  pass: { label: '审核通过', color: '#10B981', bg: '#DCFCE7' },
  warning: { label: '有警告', color: '#F59E0B', bg: '#FEF9C3' },
  block: { label: '已拦截', color: '#EF4444', bg: '#FEE2E2' },
}

const LEVEL_CONFIG = {
  block: { icon: '🔴', label: '拦截', color: '#EF4444' },
  warn: { icon: '🟡', label: '警告', color: '#F59E0B' },
  info: { icon: '⚪', label: '提示', color: '#9CA3AF' },
}

export default function GeneralReview() {
  const [selected, setSelected] = useState(0)
  const item = reviewItems[selected]
  const overall = OVERALL_CONFIG[item.overall]

  return (
    <div className="p-6 space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '总审核内容', value: 138, icon: '📄', color: '#6B7280' },
          { label: '审核通过', value: 112, icon: '✅', color: '#10B981' },
          { label: '有警告', value: 19, icon: '⚠️', color: '#F59E0B' },
          { label: '已拦截', value: 7, icon: '🚫', color: '#EF4444' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left: Content list */}
        <div className="col-span-1 space-y-2">
          <div className="text-sm font-semibold text-gray-700 mb-2">待审核内容</div>
          {reviewItems.map((rv, i) => {
            const ov = OVERALL_CONFIG[rv.overall]
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${selected === i ? 'border-amber-400' : 'border-gray-200 hover:border-gray-300'}`}
                style={selected === i ? { backgroundColor: '#FFFDF0' } : {}}
              >
                <div className="text-sm font-medium text-gray-800 truncate">{rv.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{rv.type}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{rv.channel}</span>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: ov.bg, color: ov.color }}>{ov.label}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right: Review detail */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-base font-semibold text-gray-800">{item.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{item.type}</span>
                  <span className="text-xs text-gray-400">{item.channel}</span>
                </div>
              </div>
              <span className="text-sm px-3 py-1.5 rounded-xl font-medium" style={{ backgroundColor: overall.bg, color: overall.color }}>
                {overall.label}
              </span>
            </div>

            {/* Three dimension scores */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: '品牌合规', score: item.brandScore, icon: '🏷️' },
                { label: '内容质量', score: item.qualityScore, icon: '✍️' },
                { label: '风控检测', score: item.riskScore, icon: '🛡️' },
              ].map((dim) => (
                <div key={dim.label} className={`rounded-xl p-3 text-center ${dim.score >= 90 ? 'bg-green-50' : dim.score >= 70 ? 'bg-amber-50' : 'bg-red-50'}`}>
                  <div className="text-xl mb-1">{dim.icon}</div>
                  <div className={`text-2xl font-bold ${dim.score >= 90 ? 'text-green-600' : dim.score >= 70 ? 'text-amber-600' : 'text-red-500'}`}>
                    {dim.score}
                  </div>
                  <div className="text-xs text-gray-500">{dim.label}</div>
                </div>
              ))}
            </div>

            {/* Issues */}
            {item.issues.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-500 mb-2">审核问题详情</div>
                {item.issues.map((issue, i) => {
                  const lv = LEVEL_CONFIG[issue.level]
                  return (
                    <div key={i} className={`rounded-xl p-3 border ${issue.level === 'block' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span>{lv.icon}</span>
                        <span className="text-xs font-semibold" style={{ color: lv.color }}>{lv.label}</span>
                        <span className="text-xs text-gray-600 font-medium">{issue.rule}</span>
                      </div>
                      <div className="text-xs text-gray-600 ml-5">{issue.desc}</div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-green-600 text-sm font-medium">✅ 所有审核维度均通过，内容可直接发布</div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
              <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">返回修改</button>
              {item.overall === 'warning' && (
                <button className="flex-1 py-2.5 rounded-xl border text-sm font-medium" style={{ borderColor: '#F59E0B', color: '#F59E0B', backgroundColor: '#FEF9C3' }}>
                  忽略警告，继续发布
                </button>
              )}
              {item.overall === 'pass' && (
                <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium" style={{ backgroundColor: PRIMARY }}>
                  进入分发队列
                </button>
              )}
              {item.overall === 'block' && (
                <button disabled className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium opacity-50 cursor-not-allowed bg-gray-400">
                  拦截中，请先修改
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
