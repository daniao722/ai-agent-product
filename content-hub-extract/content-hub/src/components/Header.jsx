const PRIMARY = '#C9A227'

const PAGE_TITLES = {
  dashboard: '概览',
  'strategy/calendar': '内容日历',
  'strategy/trending': '热点趋势',
  'strategy/competitor': '竞品分析',
  'strategy/plan': '内容计划',
  'creation/copy': 'AI 文案工场',
  'creation/visual': 'AI 视觉创作',
  'creation/video': 'AI 视频工厂',
  'creation/terminology': '词库管理',
  'creation/assistant': 'AI 创作助手',
  'creation/history': '创作历史',
  'distribution/channels': '渠道配置',
  'distribution/email': '邮件营销',
  'distribution/website': '网站分发',
  'distribution/domestic': '国内社媒',
  'distribution/international': '国际社媒',
  'review/general': '通用审核',
  'review/platform': '平台专属审核',
  'review/config': '审核配置中心',
  'analytics/channels': '渠道数据',
  'analytics/funnel': '内容漏斗',
  'analytics/leads': '线索追踪',
  'brand/knowledge': '知识库管理',
  'brand/assets': '品牌素材',
  'brand/archive': '内容归档',
  'brand/rules': '创作规则',
  'token/pricing': '消耗规则',
  'token/quota': '额度管理',
  'token/usage': '使用明细',
}

const PAGE_SECTIONS = {
  dashboard: '',
  'strategy/calendar': '内容策略',
  'strategy/trending': '内容策略',
  'strategy/competitor': '内容策略',
  'strategy/plan': '内容策略',
  'creation/copy': '内容创作',
  'creation/visual': '内容创作',
  'creation/video': '内容创作',
  'creation/terminology': '内容创作',
  'creation/assistant': '内容创作',
  'creation/history': '内容创作',
  'distribution/channels': '内容分发',
  'distribution/email': '内容分发',
  'distribution/website': '内容分发',
  'distribution/domestic': '内容分发',
  'distribution/international': '内容分发',
  'review/general': '内容审核',
  'review/platform': '内容审核',
  'review/config': '内容审核',
  'analytics/channels': '效果分析',
  'analytics/funnel': '效果分析',
  'analytics/leads': '效果分析',
  'brand/knowledge': '品牌资产库',
  'brand/assets': '品牌资产库',
  'brand/archive': '品牌资产库',
  'brand/rules': '品牌资产库',
  'token/pricing': 'Token 管理',
  'token/quota': 'Token 管理',
  'token/usage': 'Token 管理',
}

export default function Header({ currentPage }) {
  const title = PAGE_TITLES[currentPage] || '概览'
  const section = PAGE_SECTIONS[currentPage]

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {section && (
          <>
            <span>{section}</span>
            <span className="text-gray-300">/</span>
          </>
        )}
        <span className="text-gray-800 font-medium">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Bean balance */}
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
          <span className="text-sm">🫘</span>
          <span className="text-xs font-semibold text-amber-700">3,000 豆子</span>
        </div>

        {/* Notification */}
        <button className="relative p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Help */}
        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
