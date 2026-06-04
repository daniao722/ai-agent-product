const PRIMARY = '#C9A227'

const PRICING = [
  { module: 'AI 文案工场', unit: '每次生成（≤500字）', beans: 5, note: '超出按每100字 +1豆' },
  { module: 'AI 文案工场', unit: '每次生成（501-1500字）', beans: 15, note: '' },
  { module: 'AI 文案工场', unit: '每次生成（1500字+）', beans: 30, note: '' },
  { module: 'AI 文案工场', unit: '多版本生成（3个版本）', beans: '×2.5', note: '按单版本×2.5折扣' },
  { module: '内容裂变', unit: '1篇长文裂变为3个渠道版本', beans: 20, note: '' },
  { module: 'AI 视觉创作', unit: '图片生成（1-10张，单次）', beans: 50, note: '' },
  { module: 'AI 视觉创作', unit: '图片生成（超出10张，每张）', beans: 5, note: '追加计费' },
  { module: 'AI 视频工厂', unit: '视频生成（≤60秒）', beans: 200, note: '' },
  { module: 'AI 视频工厂', unit: '视频生成（60-120秒）', beans: 350, note: '' },
  { module: '全球化翻译', unit: '每1000字翻译', beans: 10, note: '' },
  { module: 'AI 内容规划', unit: '生成月度/周度内容计划', beans: 30, note: '每次' },
  { module: '内容审核', unit: '通用审核（每次）', beans: '免费', note: '平台基础能力' },
  { module: '平台专属审核', unit: '每次发布前审核（每个平台）', beans: 2, note: '' },
]

const PLANS = [
  { name: '基础版', beans: '500', seats: 1, overage: '超额后按市价购买充值包', color: '#6B7280', popular: false },
  { name: '标准版', beans: '3,000', seats: 5, overage: '超额自动提示，可购买追加包', color: '#3B82F6', popular: true },
  { name: '专业版', beans: '10,000', seats: 20, overage: '超额享8折优先补充', color: PRIMARY, popular: false },
  { name: '企业定制版', beans: '按需定制', seats: '无限', overage: '按年签约，统一结算', color: '#8B5CF6', popular: false },
]

const TOPUPS = [
  { beans: 500, price: 49, unit: 9.8 },
  { beans: 2000, price: 168, unit: 8.4 },
  { beans: 10000, price: 680, unit: 6.8 },
]

export default function PricingRules() {
  return (
    <div className="p-6 space-y-6">
      {/* Plans */}
      <div>
        <div className="text-sm font-semibold text-gray-700 mb-3">套餐层级</div>
        <div className="grid grid-cols-4 gap-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl border shadow-sm p-4 relative ${plan.popular ? 'border-blue-400 ring-1 ring-blue-400/20' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs text-white px-2.5 py-0.5 rounded-full" style={{ backgroundColor: '#3B82F6' }}>
                  推荐
                </div>
              )}
              <div className="text-sm font-bold mb-1" style={{ color: plan.color }}>{plan.name}</div>
              <div className="text-2xl font-bold text-gray-800">
                {plan.beans}
                <span className="text-sm font-normal text-gray-500 ml-1">豆/月</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">团队席位：{plan.seats}</div>
              <div className="text-xs text-gray-400 mt-2 leading-relaxed">{plan.overage}</div>
              <button
                className="mt-3 w-full py-1.5 rounded-xl text-xs font-medium border transition-all"
                style={{ borderColor: plan.color, color: plan.popular ? 'white' : plan.color, backgroundColor: plan.popular ? plan.color : 'transparent' }}
              >
                选择套餐
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Topup Packages */}
      <div>
        <div className="text-sm font-semibold text-gray-700 mb-3">豆子充值包（独立于月度订阅）</div>
        <div className="grid grid-cols-3 gap-4">
          {TOPUPS.map((pkg) => (
            <div key={pkg.beans} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">{pkg.beans.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 ml-1">豆</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">单价 ¥{pkg.unit}/豆 · 有效期12个月</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold" style={{ color: PRIMARY }}>¥{pkg.price}</div>
                <button className="mt-1 text-xs px-3 py-1 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>购买</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Table */}
      <div>
        <div className="text-sm font-semibold text-gray-700 mb-3">功能消耗明细</div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
            <div className="col-span-3">功能模块</div>
            <div className="col-span-5">消耗单位</div>
            <div className="col-span-2 text-center">豆子消耗</div>
            <div className="col-span-2">备注</div>
          </div>

          {(() => {
            let lastModule = null
            return PRICING.map((item, i) => {
              const showModule = item.module !== lastModule
              lastModule = item.module
              return (
                <div key={i} className={`grid grid-cols-12 px-5 py-3 border-b border-gray-50 last:border-b-0 items-center ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                  <div className="col-span-3">
                    {showModule && <span className="text-xs font-semibold text-gray-700">{item.module}</span>}
                  </div>
                  <div className="col-span-5 text-sm text-gray-600">{item.unit}</div>
                  <div className="col-span-2 text-center">
                    <span className={`text-sm font-bold ${item.beans === '免费' ? 'text-green-500' : 'text-gray-800'}`}>
                      {item.beans === '免费' ? '免费' : typeof item.beans === 'number' ? `${item.beans} 豆` : item.beans}
                    </span>
                  </div>
                  <div className="col-span-2 text-xs text-gray-400">{item.note}</div>
                </div>
              )
            })
          })()}
        </div>
      </div>
    </div>
  )
}
