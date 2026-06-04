import { useState } from 'react'

const PRIMARY = '#C9A227'

const archived = [
  { title: '断桥铝节能门窗技术解析白皮书', type: '长文', channel: 'LinkedIn', lang: '中英双语', tags: ['产品', '节能', '白皮书'], uses: 12, date: '2026-05-20' },
  { title: '618大促产品描述（3版本）', type: '文案', channel: 'Instagram/Facebook', lang: '中文', tags: ['618', '促销', '产品描述'], uses: 8, date: '2026-05-18' },
  { title: '工厂实拍系列海报（5张）', type: '图片', channel: 'Instagram', lang: '无文字', tags: ['工厂', '视觉', '618'], uses: 23, date: '2026-05-15' },
  { title: '父亲节感谢EDM文案', type: '邮件', channel: '邮件EDM', lang: '中文', tags: ['父亲节', '情感', 'EDM'], uses: 3, date: '2026-05-12' },
  { title: '节能认证说明视频脚本', type: '视频脚本', channel: 'YouTube', lang: '英文', tags: ['认证', '视频', '节能'], uses: 5, date: '2026-05-10' },
  { title: '欧洲建材展参展宣传文案', type: '文案', channel: 'LinkedIn', lang: '英文', tags: ['展会', 'B2B', '欧洲'], uses: 7, date: '2026-04-28' },
]

const TYPES = ['全部类型', '文案', '长文', '图片', '视频脚本', '邮件']
const CHANNELS = ['全部渠道', 'LinkedIn', 'Instagram', 'Facebook', '邮件EDM', 'YouTube']

export default function ContentArchive() {
  const [typeFilter, setTypeFilter] = useState('全部类型')
  const [search, setSearch] = useState('')

  const filtered = archived.filter((a) => {
    if (typeFilter !== '全部类型' && a.type !== typeFilter) return false
    if (search && !a.title.includes(search) && !a.tags.some((t) => t.includes(search))) return false
    return true
  })

  return (
    <div className="p-6 space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '已归档内容', value: '184', color: '#3B82F6' },
          { label: '总引用次数', value: '1,248', color: PRIMARY },
          { label: '本月新增', value: '28', color: '#10B981' },
          { label: '高价值素材', value: '23', color: '#8B5CF6' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            placeholder="搜索内容标题或标签..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-400"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none text-gray-600"
        >
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none text-gray-600">
          {CHANNELS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:border-amber-400 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-lg ${item.type === '图片' ? '🖼️' : item.type === '视频脚本' ? '🎬' : item.type === '邮件' ? '📧' : '📝'}`}>
                  {item.type === '图片' ? '🖼️' : item.type === '视频脚本' ? '🎬' : item.type === '邮件' ? '📧' : '📝'}
                </span>
                <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{item.type}</span>
              </div>
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
            <div className="text-sm font-semibold text-gray-800 mb-2 leading-snug">{item.title}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
              <span>{item.channel}</span>
              <span>·</span>
              <span>{item.lang}</span>
            </div>
            <div className="flex gap-1 flex-wrap mb-3">
              {item.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FBF5E0', color: PRIMARY }}>
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">被引用 {item.uses} 次</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-xs text-gray-400 hover:text-gray-600">复用</button>
                <button className="text-xs font-medium" style={{ color: PRIMARY }}>查看</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
