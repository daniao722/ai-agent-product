import { useState } from 'react'

const PRIMARY = '#C9A227'

const PRESETS = [
  { id: 'product', label: '产品展示', icon: '🖼️' },
  { id: 'poster', label: '展会海报', icon: '🎪' },
  { id: 'banner', label: '广告横幅', icon: '📐' },
  { id: 'promo', label: '节日促销图', icon: '🎉' },
  { id: 'infographic', label: '信息图表', icon: '📊' },
  { id: 'cover', label: '社媒封面', icon: '📱' },
  { id: 'case', label: '案例展示', icon: '🏗️' },
  { id: 'cert', label: '认证徽章', icon: '🏆' },
  { id: 'team', label: '团队/企业', icon: '🤝' },
  { id: 'how', label: '使用教程', icon: '📖' },
  { id: 'compare', label: '对比图', icon: '⚖️' },
  { id: 'data', label: '数据可视化', icon: '📈' },
]

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', sizes: ['1:1 方形', '9:16 Story', '4:5 竖版'] },
  { id: 'facebook', label: 'Facebook', sizes: ['16:9 封面', '1:1 帖子'] },
  { id: 'linkedin', label: 'LinkedIn', sizes: ['1.91:1 横版', '1:1 帖子'] },
  { id: 'xiaohongshu', label: '小红书', sizes: ['3:4 竖版', '1:1 方形'] },
]

const GALLERY = [
  { label: '618促销海报 A', size: '1:1', platform: 'Instagram', color: '#FEE2E2' },
  { label: '618促销海报 B', size: '9:16', platform: 'Story', color: '#DBEAFE' },
  { label: '产品展示图', size: '4:5', platform: 'Instagram', color: '#DCFCE7' },
  { label: '工厂实力背书', size: '1.91:1', platform: 'LinkedIn', color: '#F3E8FF' },
  { label: '节能认证徽章', size: '1:1', platform: 'Facebook', color: '#FEF9C3' },
  { label: '产品对比信息图', size: '16:9', platform: 'Facebook', color: '#FFE4E6' },
]

export default function VisualCreation() {
  const [preset, setPreset] = useState('poster')
  const [platform, setPlatform] = useState('instagram')
  const [generating, setGenerating] = useState(false)

  const generate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2000)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-3 gap-5">
        {/* Left Config */}
        <div className="col-span-1 space-y-4">
          {/* Scene Presets */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">场景预设</div>
            <div className="grid grid-cols-3 gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`flex flex-col items-center gap-1 py-2 rounded-xl border text-center transition-all ${
                    preset === p.id ? 'border-transparent text-amber-700' : 'border-gray-100 text-gray-600 hover:border-gray-200'
                  }`}
                  style={preset === p.id ? { backgroundColor: '#FBF5E0', borderColor: PRIMARY } : {}}
                >
                  <span className="text-base">{p.icon}</span>
                  <span className="text-xs leading-tight">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Constraints */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">品牌规范约束</div>
            <div className="space-y-2">
              {[
                { label: 'Logo', status: '已上传', ok: true },
                { label: '品牌色卡', status: '已配置 5色', ok: true },
                { label: '字体规范', status: '未配置', ok: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{item.label}</span>
                  <span className={item.ok ? 'text-green-600' : 'text-orange-500'}>{item.status}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 mt-3">
              <div className="w-5 h-5 rounded" style={{ backgroundColor: '#C9A227' }} title="主色" />
              <div className="w-5 h-5 rounded" style={{ backgroundColor: '#1E3A5F' }} title="辅色" />
              <div className="w-5 h-5 rounded" style={{ backgroundColor: '#FFFFFF', border: '1px solid #e5e7eb' }} title="白色" />
              <div className="w-5 h-5 rounded" style={{ backgroundColor: '#333333' }} title="深色" />
              <div className="w-5 h-5 rounded" style={{ backgroundColor: '#F5F5F0' }} title="浅灰" />
            </div>
          </div>

          {/* Platform */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">目标平台（多尺寸批量）</div>
            <div className="space-y-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition-all ${
                    platform === p.id ? 'border-amber-400' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={platform === p.id ? { backgroundColor: '#FBF5E0' } : {}}
                >
                  <div className="font-medium text-gray-700 mb-0.5">{p.label}</div>
                  <div className="text-gray-400">{p.sizes.join(' · ')}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">内容描述</div>
            <textarea
              rows={3}
              placeholder="618大促海报，突出工厂直供、节能认证，金色+深蓝色调..."
              className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-amber-400 resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-amber-600">消耗 50 豆子</span>
              <button
                onClick={generate}
                className="px-4 py-2 rounded-xl text-white text-xs font-medium shadow-sm"
                style={{ backgroundColor: PRIMARY }}
              >
                {generating ? '生成中...' : '✨ 批量生成'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Gallery */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-gray-700">图片库（最近生成）</div>
              <div className="flex gap-2">
                <input placeholder="搜索素材..." className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 w-36 focus:outline-none" />
                <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">筛选</button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {GALLERY.map((item, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all cursor-pointer">
                  <div
                    className="h-36 flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-1">🖼️</div>
                      <div className="text-xs text-gray-500 font-medium">{item.size}</div>
                    </div>
                  </div>
                  <div className="p-2 bg-white">
                    <div className="text-xs font-medium text-gray-700 truncate">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.platform}</div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button className="bg-white text-xs px-2.5 py-1 rounded-lg shadow font-medium text-gray-700">下载</button>
                      <button className="text-xs px-2.5 py-1 rounded-lg shadow font-medium text-white" style={{ backgroundColor: PRIMARY }}>发布</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
