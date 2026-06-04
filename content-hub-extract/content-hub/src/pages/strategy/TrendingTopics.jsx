import { useState } from 'react'

const PRIMARY = '#C9A227'

const topics = [
  { rank: 1, title: '节能门窗市场渗透率突破30%', source: 'Google Trends', heat: 98, decay: '3天', direction: '↑', tags: ['行业报告', '节能'], type: 'industry' },
  { rank: 2, title: '618工厂直供，打通消费者认知', source: '抖音话题', heat: 95, decay: '5天', direction: '↑', tags: ['618', '工厂直供'], type: 'ecom' },
  { rank: 3, title: '铝合金门窗 vs 断桥铝，谁更值得买？', source: '小红书', heat: 87, decay: '10天', direction: '→', tags: ['对比测评', '产品'], type: 'product' },
  { rank: 4, title: '父亲节定制礼品：品质家居故事', source: 'Facebook', heat: 82, decay: '8天', direction: '↑', tags: ['父亲节', '情感营销'], type: 'holiday' },
  { rank: 5, title: '智能家居集成：门窗系统新赛道', source: 'LinkedIn', heat: 76, decay: '14天', direction: '→', tags: ['智能家居', 'B2B'], type: 'industry' },
  { rank: 6, title: '碳中和认证门窗品牌竞争加剧', source: '行业媒体', heat: 71, decay: '7天', direction: '↑', tags: ['ESG', '认证'], type: 'industry' },
  { rank: 7, title: '夏季隔热：建材消费高峰来临', source: 'Google Search', heat: 68, decay: '20天', direction: '→', tags: ['季节', '隔热'], type: 'seasonal' },
  { rank: 8, title: '独立站出海品牌如何建立信任？', source: 'Twitter/X', heat: 63, decay: '12天', direction: '↓', tags: ['出海', '品牌建设'], type: 'industry' },
  { rank: 9, title: '防盗门窗：海外家庭安全消费新增点', source: 'Amazon Review', heat: 58, decay: '15天', direction: '→', tags: ['安全', '海外市场'], type: 'product' },
  { rank: 10, title: '6月建材展：展前内容营销攻略', source: '微信指数', heat: 52, decay: '6天', direction: '↑', tags: ['展会', '营销'], type: 'event' },
]

const TYPE_LABELS = {
  industry: { label: '行业', color: '#3B82F6', bg: '#DBEAFE' },
  ecom: { label: '电商', color: '#EF4444', bg: '#FEE2E2' },
  product: { label: '产品', color: '#8B5CF6', bg: '#EDE9FE' },
  holiday: { label: '节日', color: '#22C55E', bg: '#DCFCE7' },
  seasonal: { label: '季节', color: '#F97316', bg: '#FFEDD5' },
  event: { label: '活动', color: '#EC4899', bg: '#FCE7F3' },
}

export default function TrendingTopics() {
  const [added, setAdded] = useState({})

  const addToPlan = (i) => setAdded((prev) => ({ ...prev, [i]: true }))

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">实时监控行业热点 · 每日更新 · 上次更新 10:30</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white">
            <option>全部来源</option>
            <option>Google Trends</option>
            <option>小红书</option>
            <option>抖音</option>
            <option>LinkedIn</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white">
            <option>全部类型</option>
            <option>行业</option>
            <option>电商</option>
            <option>节日</option>
          </select>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
        <span className="text-amber-500 mt-0.5">⚠️</span>
        <div>
          <div className="text-sm font-medium text-amber-800">618大促倒计时 12天</div>
          <div className="text-xs text-amber-600 mt-0.5">建议立即启动预热内容生产，当前已规划 8/25 条预热内容</div>
        </div>
        <button className="ml-auto text-xs px-3 py-1.5 rounded-lg text-white flex-shrink-0" style={{ backgroundColor: PRIMARY }}>
          查看日历
        </button>
      </div>

      {/* Topic List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
          <div className="col-span-1">排名</div>
          <div className="col-span-4">话题</div>
          <div className="col-span-1">类型</div>
          <div className="col-span-2">来源</div>
          <div className="col-span-1">热度</div>
          <div className="col-span-1">预计衰减</div>
          <div className="col-span-2 text-right">操作</div>
        </div>

        {topics.map((t, i) => {
          const typeInfo = TYPE_LABELS[t.type]
          return (
            <div key={i} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? 'text-white' : 'text-gray-400 bg-gray-100'}`}
                  style={i < 3 ? { backgroundColor: ['#EF4444', '#F97316', '#EAB308'][i] } : {}}>
                  {t.rank}
                </div>
              </div>
              <div className="col-span-4">
                <div className="text-sm text-gray-800 font-medium">{t.title}</div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="col-span-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: typeInfo.bg, color: typeInfo.color }}>
                  {typeInfo.label}
                </span>
              </div>
              <div className="col-span-2 text-xs text-gray-500">{t.source}</div>
              <div className="col-span-1">
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 rounded-full bg-red-400" style={{ width: `${t.heat}%` }} />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{t.heat}</div>
              </div>
              <div className="col-span-1 text-xs text-gray-500">
                <span className={t.direction === '↑' ? 'text-red-500' : t.direction === '↓' ? 'text-blue-400' : 'text-gray-400'}>
                  {t.direction}
                </span>{' '}
                {t.decay}后
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                {added[i] ? (
                  <span className="text-xs text-green-600 flex items-center gap-1">✓ 已加入计划</span>
                ) : (
                  <button
                    onClick={() => addToPlan(i)}
                    className="text-xs px-2.5 py-1 rounded-lg border text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    加入内容计划
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
