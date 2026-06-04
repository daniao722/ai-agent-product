import { useState } from 'react'

const PRIMARY = '#C9A227'

const assets = [
  { name: 'Logo主版（深色背景）', type: 'logo', format: 'SVG+PNG', size: '1.2MB', uses: 342 },
  { name: 'Logo主版（浅色背景）', type: 'logo', format: 'SVG+PNG', size: '1.1MB', uses: 218 },
  { name: '品牌主色卡', type: 'color', format: 'ASE', size: '0.1MB', uses: 156 },
  { name: '标题字体 · Noto Serif SC', type: 'font', format: 'TTF', size: '8.5MB', uses: 89 },
  { name: '正文字体 · PingFang SC', type: 'font', format: 'TTF', size: '12.3MB', uses: 89 },
  { name: '618大促主视觉', type: 'image', format: 'PSD+JPG', size: '45.2MB', uses: 23 },
  { name: '工厂实拍集（高清）', type: 'image', format: 'ZIP(JPG)', size: '284MB', uses: 78 },
  { name: '产品白底图合集', type: 'image', format: 'ZIP(PNG)', size: '128MB', uses: 145 },
]

const TYPES = [
  { id: 'all', label: '全部' },
  { id: 'logo', label: 'Logo', icon: '🏷️' },
  { id: 'color', label: '色板', icon: '🎨' },
  { id: 'font', label: '字体', icon: '🔤' },
  { id: 'image', label: '图片', icon: '🖼️' },
]

const COLORS = [
  { name: '主色 · 冠金', hex: '#C9A227', usage: '品牌高亮、按钮、重点文字' },
  { name: '辅色 · 深蓝', hex: '#1E3A5F', usage: '标题、深色背景' },
  { name: '白色', hex: '#FFFFFF', usage: '背景、卡片' },
  { name: '深灰', hex: '#333333', usage: '正文文字' },
  { name: '浅灰', hex: '#F5F5F0', usage: '页面背景、分割线' },
]

export default function BrandAssets() {
  const [activeType, setActiveType] = useState('all')

  const filtered = activeType === 'all' ? assets : assets.filter((a) => a.type === activeType)

  return (
    <div className="p-6 space-y-5">
      {/* Color Palette */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-gray-700">品牌色板</div>
          <button className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>编辑色板</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {COLORS.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-gray-200 shadow-sm" style={{ backgroundColor: c.hex }} />
              <div>
                <div className="text-xs font-semibold text-gray-700">{c.name}</div>
                <div className="text-xs text-gray-400">{c.hex}</div>
                <div className="text-xs text-gray-400 max-w-28">{c.usage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Library */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex gap-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveType(t.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${activeType === t.id ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={activeType === t.id ? { backgroundColor: PRIMARY } : {}}
              >
                {t.icon && <span className="mr-1">{t.icon}</span>}{t.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input placeholder="搜索素材..." className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 w-36 focus:outline-none" />
            <button className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>+ 上传</button>
          </div>
        </div>

        <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
          <div className="col-span-5">素材名称</div>
          <div className="col-span-1">类型</div>
          <div className="col-span-2">格式</div>
          <div className="col-span-1 text-center">大小</div>
          <div className="col-span-2 text-center">引用次数</div>
          <div className="col-span-1 text-right">操作</div>
        </div>

        {filtered.map((asset, i) => {
          const TYPE_ICONS = { logo: '🏷️', color: '🎨', font: '🔤', image: '🖼️' }
          return (
            <div key={i} className="grid grid-cols-12 px-5 py-3 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-5 flex items-center gap-3">
                <span className="text-lg">{TYPE_ICONS[asset.type]}</span>
                <span className="text-sm text-gray-800">{asset.name}</span>
              </div>
              <div className="col-span-1">
                <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                  {TYPES.find((t) => t.id === asset.type)?.label}
                </span>
              </div>
              <div className="col-span-2 text-xs text-gray-500">{asset.format}</div>
              <div className="col-span-1 text-center text-xs text-gray-500">{asset.size}</div>
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, asset.uses / 4)}%`, backgroundColor: PRIMARY }} />
                  </div>
                  <span className="text-xs text-gray-500">{asset.uses}</span>
                </div>
              </div>
              <div className="col-span-1 flex justify-end gap-2">
                <button className="text-xs text-gray-400 hover:text-gray-600">下载</button>
                <button className="text-xs" style={{ color: PRIMARY }}>使用</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
