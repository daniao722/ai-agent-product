const PRIMARY = '#C9A227'

const STRUCTURE_RULES = [
  { module: '产品详情页', sections: ['产品概述', '产品详情', '竞争优势', '技术文档', '转化引导'], required: 5, optional: 2 },
  { module: '解决方案页', sections: ['方案概述', '方案详情', '应用案例', '技术优势', '转化引导'], required: 5, optional: 1 },
  { module: '品牌故事页', sections: ['企业概述', '发展历程', '企业文化', '荣誉资质'], required: 4, optional: 1 },
]

export default function StructureStandard() {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">结构标准化</div>

      <div className="space-y-4">
        {STRUCTURE_RULES.map((r) => (
          <div key={r.module} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-sm font-semibold text-gray-700 mb-3">{r.module}</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {r.sections.map((s) => (
                <span key={s} className="text-xs px-2 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-200">{s}</span>
              ))}
            </div>
            <div className="text-xs text-gray-400">必填 {r.required} 个模块，选填 {r.optional} 个模块</div>
          </div>
        ))}
      </div>
    </div>
  )
}