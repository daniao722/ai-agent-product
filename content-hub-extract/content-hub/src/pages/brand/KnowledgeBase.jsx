import { useState } from 'react'

const PRIMARY = '#C9A227'

const CATEGORIES = ['全部', '产品信息', '案例库', '品牌规范', '行业知识', '合规文件', 'FAQ']

const docs = [
  { name: '断桥铝节能门窗产品手册 v2.3', category: '产品信息', type: 'PDF', size: '4.2MB', updated: '2026-05-10', status: 'active', chunks: 128 },
  { name: '企业品牌视觉规范手册', category: '品牌规范', type: 'PDF', size: '18.5MB', updated: '2026-03-20', status: 'active', chunks: 64 },
  { name: '欧洲建筑商客户案例集', category: '案例库', type: 'Word', size: '3.1MB', updated: '2026-04-15', status: 'active', chunks: 96 },
  { name: '建材行业出海竞争分析报告', category: '行业知识', type: 'PDF', size: '8.7MB', updated: '2026-02-28', status: 'active', chunks: 215 },
  { name: '产品FAQ知识库（中英双语）', category: 'FAQ', type: 'Excel', size: '1.2MB', updated: '2026-05-18', status: 'active', chunks: 340 },
  { name: '欧盟建筑节能合规要求', category: '合规文件', type: 'PDF', size: '2.8MB', updated: '2025-12-01', status: 'expired', chunks: 77 },
  { name: '企业写作风格指南', category: '品牌规范', type: 'Word', size: '0.8MB', updated: '2026-01-10', status: 'active', chunks: 42 },
]

const STATUS_CONFIG = {
  active: { label: '有效', color: '#10B981', bg: '#DCFCE7' },
  expired: { label: '已过期', color: '#EF4444', bg: '#FEE2E2' },
  processing: { label: '解析中', color: '#F59E0B', bg: '#FEF9C3' },
}

export default function KnowledgeBase() {
  const [category, setCategory] = useState('全部')
  const [tab, setTab] = useState('docs')

  const filtered = category === '全部' ? docs : docs.filter((d) => d.category === category)

  return (
    <div className="p-6 space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[
          { id: 'docs', label: '文档管理' },
          { id: 'faq', label: 'FAQ管理' },
          { id: 'url', label: 'URL导入' },
          { id: 'settings', label: '自动同步' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'docs' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: '总文档数', value: docs.length, color: '#3B82F6' },
              { label: '知识片段', value: docs.reduce((a, d) => a + d.chunks, 0), color: PRIMARY },
              { label: '已过期', value: docs.filter(d => d.status === 'expired').length, color: '#EF4444' },
              { label: '存储用量', value: '39.3MB', color: '#10B981' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Upload area */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-amber-400 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📁</div>
              <div className="text-sm font-medium text-gray-600">拖拽文件到此处，或点击上传</div>
              <div className="text-xs text-gray-400 mt-1">支持 PDF · Word · PPT · Excel · TXT · Markdown</div>
              <button className="mt-3 px-4 py-2 rounded-xl text-white text-xs font-medium" style={{ backgroundColor: PRIMARY }}>
                选择文件
              </button>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${category === c ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={category === c ? { backgroundColor: PRIMARY } : {}}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Docs table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
              <div className="col-span-4">文件名</div>
              <div className="col-span-1">分类</div>
              <div className="col-span-1 text-center">格式</div>
              <div className="col-span-1 text-center">大小</div>
              <div className="col-span-1 text-center">片段数</div>
              <div className="col-span-1 text-center">状态</div>
              <div className="col-span-2">更新时间</div>
              <div className="col-span-1 text-right">操作</div>
            </div>
            {filtered.map((doc, i) => {
              const st = STATUS_CONFIG[doc.status]
              return (
                <div key={i} className="grid grid-cols-12 px-5 py-3 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-4 flex items-center gap-2">
                    <span className={`text-lg ${doc.type === 'PDF' ? '📕' : doc.type === 'Word' ? '📘' : doc.type === 'Excel' ? '📗' : '📄'}`}>
                      {doc.type === 'PDF' ? '📕' : doc.type === 'Word' ? '📘' : doc.type === 'Excel' ? '📗' : '📄'}
                    </span>
                    <span className="text-sm text-gray-800">{doc.name}</span>
                  </div>
                  <div className="col-span-1 text-xs text-gray-500">{doc.category}</div>
                  <div className="col-span-1 text-center text-xs text-gray-400">{doc.type}</div>
                  <div className="col-span-1 text-center text-xs text-gray-400">{doc.size}</div>
                  <div className="col-span-1 text-center text-xs text-gray-600 font-medium">{doc.chunks}</div>
                  <div className="col-span-1 text-center">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                  </div>
                  <div className="col-span-2 text-xs text-gray-400">{doc.updated}</div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <button className="text-xs text-gray-400 hover:text-gray-600">删除</button>
                    <button className="text-xs" style={{ color: PRIMARY }}>更新</button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {tab === 'url' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="text-sm font-semibold text-gray-700">URL导入</div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">官网链接</label>
              <div className="flex gap-3">
                <input
                  placeholder="https://www.windows-global.com/sitemap.xml 或具体页面URL"
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
                <button className="px-4 py-2.5 rounded-xl text-white text-sm" style={{ backgroundColor: PRIMARY }}>导入</button>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              AI将自动抓取并提取页面核心内容入库，Sitemap导入将批量抓取所有列出的URL，大型站点可能需要 5-15 分钟。
            </div>
          </div>
        </div>
      )}

      {tab === 'settings' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="text-sm font-semibold text-gray-700">自动同步配置</div>
          <div className="space-y-3">
            {[
              { label: '官网内容变更检测', desc: '监控已入库URL，内容变化时自动触发更新', enabled: true },
              { label: '产品数据库定期同步', desc: '每天02:00从指定API抓取最新产品参数', enabled: false },
              { label: 'AI生成内容回流', desc: '用户采纳的AI生成内容可选择性入库', enabled: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                <div>
                  <div className="text-sm font-medium text-gray-700">{item.label}</div>
                  <div className="text-xs text-gray-400">{item.desc}</div>
                </div>
                <div className="w-10 h-5 rounded-full relative cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: item.enabled ? PRIMARY : '#E5E7EB' }}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${item.enabled ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'faq' && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <button className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">批量导入Excel</button>
            <button className="text-sm px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>+ 新增FAQ</button>
          </div>
          <div className="space-y-2">
            {[
              { q: '你们的断桥铝门窗通过了哪些国际认证？', a: '通过ISO 10077-1欧洲节能认证，CE认证，以及中国GB 55015-2021建筑节能标准认证。', tag: '认证' },
              { q: '最小订购量是多少？', a: '商业项目最小起订量为50平方米；零售/家装项目无最小起订量限制。', tag: '采购' },
              { q: '安装周期是多长时间？', a: '标准尺寸产品7-15工作日交货，定制尺寸20-30工作日，安装服务另议。', tag: '交付' },
              { q: '门窗的质保政策是什么？', a: '整窗质保20年，五金配件5年，玻璃10年（自然破损除外）。', tag: '售后' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{item.tag}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">Q: {item.q}</div>
                    <div className="text-sm text-gray-600">A: {item.a}</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="text-xs text-gray-400 hover:text-gray-600">编辑</button>
                    <button className="text-xs text-red-400 hover:text-red-600">删除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
