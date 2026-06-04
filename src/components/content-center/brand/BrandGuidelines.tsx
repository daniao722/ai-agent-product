const PRIMARY = '#C9A227'

export default function BrandGuidelines() {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">品牌规范</div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">品牌色卡</div>
          <div className="flex gap-3">
            {[PRIMARY, '#1E3A5F', '#FFFFFF', '#333333', '#F5F5F0'].map((c) => (
              <div key={c} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-lg border border-gray-200" style={{ backgroundColor: c }} />
                <span className="text-xs text-gray-500">{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">品牌 Logo</div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-3xl">🏢</span>
            </div>
            <div className="text-xs text-gray-500">
              <p>已上传品牌 Logo</p>
              <p>格式：PNG / SVG</p>
              <p>尺寸：512x512</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">字体规范</div>
          <div className="space-y-2 text-xs text-gray-600">
            <p>标题：微软雅黑 / PingFang SC</p>
            <p>正文：思源黑体 / Noto Sans SC</p>
            <p>英文：Inter / Roboto</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">品牌语调</div>
          <div className="space-y-2 text-xs text-gray-600">
            <p>专业 · 可信赖 · 创新</p>
            <p>避免过度营销化表达</p>
            <p>保持技术严谨性</p>
          </div>
        </div>
      </div>
    </div>
  )
}