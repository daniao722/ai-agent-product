const PRIMARY = '#C9A227'

const PAGE_TITLES: Record<string, string> = {
  'content-overview': '内容概览',
  'asset/brand': '品牌故事',
  'asset/product': '产品信息',
  'asset/solution': '解决方案',
  'asset/faq': 'FAQ 问答',
  'asset/insight': '行业洞察',
  'asset/integrity': '资产完整度',
  'plan/weekly': '本周计划',
  'plan/auto': '自动更新计划',
  'plan/urgent': '时效内容识别',
  'plan/template': '行业模板库',
  'creation/agent': '智能 Agent 对话',
  'creation/copy': 'AI 文案工场',
  'creation/visual': 'AI 视觉创作',
  'creation/video': 'AI 视频工厂',
  'creation/translate': '多语言翻译',
  'creation/history': '创作历史',
  'optimize/diagnosis': '内容诊断报告',
  'optimize/suggestions': '优化建议',
  'optimize/auto': '一键优化',
  'optimize/abtest': 'A/B 测试',
  'optimize/structure': '结构标准化',
  'distribution/channels': '渠道配置',
  'distribution/website': '官网发布',
  'distribution/social': '社媒同步',
  'distribution/fission': '内容裂变',
  'distribution/schedule': '定时发布',
  'analytics/overview': '数据总览',
  'analytics/funnel': '内容转化漏斗',
  'analytics/channels': '渠道效果',
  'analytics/content': '内容表现',
  'brand/guidelines': '品牌规范',
  'brand/terminology': '专业术语库',
  'brand/assets': '品牌素材库',
  'brand/rules': '创作规则',
  'token/pricing': '消耗规则',
  'token/quota': '额度管理',
  'token/usage': '使用明细',
}

const PAGE_SECTIONS: Record<string, string> = {
  'content-overview': '',
  'asset/brand': '内容资产库',
  'asset/product': '内容资产库',
  'asset/solution': '内容资产库',
  'asset/faq': '内容资产库',
  'asset/insight': '内容资产库',
  'asset/integrity': '内容资产库',
  'plan/weekly': '生成计划',
  'plan/auto': '生成计划',
  'plan/urgent': '生成计划',
  'plan/template': '生成计划',
  'creation/agent': 'AI 创作',
  'creation/copy': 'AI 创作',
  'creation/visual': 'AI 创作',
  'creation/video': 'AI 创作',
  'creation/translate': 'AI 创作',
  'creation/history': 'AI 创作',
  'optimize/diagnosis': '智能优化',
  'optimize/suggestions': '智能优化',
  'optimize/auto': '智能优化',
  'optimize/abtest': '智能优化',
  'optimize/structure': '智能优化',
  'distribution/channels': '内容分发',
  'distribution/website': '内容分发',
  'distribution/social': '内容分发',
  'distribution/fission': '内容分发',
  'distribution/schedule': '内容分发',
  'analytics/overview': '效果分析',
  'analytics/funnel': '效果分析',
  'analytics/channels': '效果分析',
  'analytics/content': '效果分析',
  'brand/guidelines': '品牌管理',
  'brand/terminology': '品牌管理',
  'brand/assets': '品牌管理',
  'brand/rules': '品牌管理',
  'token/pricing': 'Token 管理',
  'token/quota': 'Token 管理',
  'token/usage': 'Token 管理',
}

export default function ContentHeader({ currentPage }: { currentPage: string }) {
  const title = PAGE_TITLES[currentPage] || '内容概览'
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
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
          <span className="text-sm">🫘</span>
          <span className="text-xs font-semibold text-amber-700">3,000 豆子</span>
        </div>

        <button className="relative p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
