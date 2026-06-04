import { useState } from 'react'

const PRIMARY = '#C9A227'

const STATUS_CONFIG = {
  draft: { label: '草稿', color: '#6B7280', bg: '#F3F4F6' },
  reviewing: { label: '审核中', color: '#F59E0B', bg: '#FFFBEB' },
  distributed: { label: '已分发', color: '#10B981', bg: '#F0FDF4' },
  archived: { label: '已归档', color: '#8B5CF6', bg: '#F5F3FF' },
}

const CHANNEL_ICONS = {
  linkedin: '💼',
  facebook: '📘',
  instagram: '📸',
  twitter: '🐦',
  wechat: '💬',
  xiaohongshu: '📕',
  website: '🌐',
  email: '📧',
  douyin: '🎵',
}

const HISTORY = [
  {
    id: 1,
    title: '618大促产品描述×3版本',
    type: 'copy',
    typeLabel: 'AI文案',
    typeColor: '#3B82F6',
    plan: '618大促内容计划',
    status: 'distributed',
    channels: ['linkedin', 'website', 'email'],
    createdAt: '2026-05-27 10:32',
    beans: 38,
    views: 2840,
    clicks: 198,
  },
  {
    id: 2,
    title: '618促销海报（5张）',
    type: 'visual',
    typeLabel: 'AI图片',
    typeColor: '#8B5CF6',
    plan: '618大促内容计划',
    status: 'distributed',
    channels: ['instagram', 'facebook', 'xiaohongshu'],
    createdAt: '2026-05-27 09:15',
    beans: 50,
    views: 12400,
    clicks: 620,
  },
  {
    id: 3,
    title: 'Facebook发布前审核',
    type: 'review',
    typeLabel: '审核记录',
    typeColor: '#F59E0B',
    plan: null,
    status: 'distributed',
    channels: ['facebook'],
    createdAt: '2026-05-26 17:40',
    beans: 2,
    views: 3200,
    clicks: 145,
  },
  {
    id: 4,
    title: '产品白皮书德语翻译（3100字）',
    type: 'translation',
    typeLabel: '翻译',
    typeColor: '#10B981',
    plan: '欧洲市场内容计划',
    status: 'distributed',
    channels: ['website'],
    createdAt: '2026-05-26 14:22',
    beans: 31,
    views: 860,
    clicks: 74,
  },
  {
    id: 5,
    title: '6月月度内容计划',
    type: 'plan',
    typeLabel: 'AI规划',
    typeColor: '#EC4899',
    plan: null,
    status: 'draft',
    channels: [],
    createdAt: '2026-05-26 10:05',
    beans: 0,
    views: null,
    clicks: null,
  },
  {
    id: 6,
    title: '工厂实拍主视觉（8张）',
    type: 'visual',
    typeLabel: 'AI图片',
    typeColor: '#8B5CF6',
    plan: '品牌形象内容计划',
    status: 'reviewing',
    channels: [],
    createdAt: '2026-05-25 11:30',
    beans: 0,
    views: null,
    clicks: null,
  },
  {
    id: 7,
    title: '社媒帖子×3版本（简短）',
    type: 'copy',
    typeLabel: 'AI文案',
    typeColor: '#3B82F6',
    plan: '日常运营内容计划',
    status: 'distributed',
    channels: ['wechat', 'douyin'],
    createdAt: '2026-05-24 15:48',
    beans: 13,
    views: 5600,
    clicks: 280,
  },
  {
    id: 8,
    title: 'MR-200产品介绍视频脚本（60秒）',
    type: 'copy',
    typeLabel: 'AI文案',
    typeColor: '#3B82F6',
    plan: '产品发布计划',
    status: 'draft',
    channels: [],
    createdAt: '2026-05-23 16:20',
    beans: 0,
    views: null,
    clicks: null,
  },
  {
    id: 9,
    title: 'LinkedIn企业动态 - 新品发布',
    type: 'copy',
    typeLabel: 'AI文案',
    typeColor: '#3B82F6',
    plan: '618大促内容计划',
    status: 'distributed',
    channels: ['linkedin'],
    createdAt: '2026-05-22 09:00',
    beans: 5,
    views: 1840,
    clicks: 96,
  },
]

const CHAIN_DATA = [
  {
    plan: '618大促内容计划',
    items: [
      { title: '618预热文案 ×3版本', status: 'distributed', beans: 38, channel: 'LinkedIn · 官网' },
      { title: '618促销海报（5张）', status: 'distributed', beans: 50, channel: 'Instagram · Facebook · 小红书' },
      { title: '倒计时短视频脚本', status: 'reviewing', beans: 0, channel: '审核中' },
    ],
  },
  {
    plan: '欧洲市场内容计划',
    items: [
      { title: '产品白皮书德语翻译', status: 'distributed', beans: 31, channel: '官网' },
      { title: '欧盟合规说明德语版', status: 'draft', beans: 0, channel: '草稿' },
    ],
  },
]

export default function ContentHistory({ onNavigate }) {
  const [view, setView] = useState('list')
  const [statusFilter, setStatusFilter] = useState('全部')
  const [typeFilter, setTypeFilter] = useState('全部')

  const filteredHistory = HISTORY.filter((h) => {
    const matchStatus = statusFilter === '全部' || h.status === Object.keys(STATUS_CONFIG).find(k => STATUS_CONFIG[k].label === statusFilter)
    const matchType = typeFilter === '全部' || h.typeLabel === typeFilter
    return matchStatus && matchType
  })

  const totalBeans = HISTORY.filter(h => h.status === 'distributed').reduce((a, h) => a + h.beans, 0)
  const distributedCount = HISTORY.filter(h => h.status === 'distributed').length
  const draftCount = HISTORY.filter(h => h.status === 'draft').length

  return (
    <div className="p-6 space-y-5">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '总创作记录', value: HISTORY.length, color: '#3B82F6', unit: '条' },
          { label: '已分发内容', value: distributedCount, color: '#10B981', unit: '条' },
          { label: '草稿/审核中', value: draftCount + HISTORY.filter(h => h.status === 'reviewing').length, color: '#F59E0B', unit: '条' },
          { label: '已消耗豆子', value: totalBeans, color: PRIMARY, unit: '豆' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
              <span className="text-sm font-normal text-gray-400 ml-1">{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bean Rule Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <span>🫘</span>
        <div className="text-xs text-amber-700">
          <strong>豆子消耗规则：</strong>仅<strong>已分发</strong>的内容消耗豆子；草稿和审核中内容显示 <strong>0 豆</strong>，放心创作、充分实验。
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {[{ key: 'list', label: '列表视图' }, { key: 'chain', label: '策略链路' }].map((v) => (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  view === v.key ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">状态：</span>
            {['全部', '已分发', '审核中', '草稿', '已归档'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === s ? 'text-white' : 'bg-gray-100 text-gray-600'
                }`}
                style={statusFilter === s ? { backgroundColor: PRIMARY } : {}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600">导出记录</button>
          <button
            onClick={() => onNavigate && onNavigate('creation/copy')}
            className="text-xs px-3 py-1.5 rounded-lg text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            + 新建内容
          </button>
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div
            className="grid px-5 py-3 border-b border-gray-100 text-xs text-gray-400 font-medium bg-gray-50"
            style={{ gridTemplateColumns: '160px 80px 1fr 110px 140px 80px 80px 80px 100px' }}
          >
            <div>创建时间</div>
            <div>类型</div>
            <div>内容标题</div>
            <div>关联计划</div>
            <div>分发渠道</div>
            <div>状态</div>
            <div className="text-center">豆子</div>
            <div className="text-center">浏览</div>
            <div className="text-center">操作</div>
          </div>

          {filteredHistory.map((h) => {
            const sc = STATUS_CONFIG[h.status]
            return (
              <div
                key={h.id}
                className="grid px-5 py-3.5 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50/50 transition-colors"
                style={{ gridTemplateColumns: '160px 80px 1fr 110px 140px 80px 80px 80px 100px' }}
              >
                <div className="text-xs text-gray-400">{h.createdAt}</div>
                <div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                    style={{ backgroundColor: h.typeColor }}
                  >
                    {h.typeLabel}
                  </span>
                </div>
                <div className="text-sm text-gray-700 truncate pr-3">{h.title}</div>
                <div className="text-xs text-gray-400 truncate pr-2">
                  {h.plan ? (
                    <button className="hover:underline" style={{ color: PRIMARY }}>
                      {h.plan}
                    </button>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  {h.channels.length > 0
                    ? h.channels.map((ch) => (
                        <span key={ch} title={ch} className="text-sm">{CHANNEL_ICONS[ch] || '📡'}</span>
                      ))
                    : <span className="text-xs text-gray-300">未分发</span>}
                </div>
                <div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ color: sc.color, backgroundColor: sc.bg }}
                  >
                    {sc.label}
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className={`text-sm font-bold ${h.beans === 0 ? 'text-gray-300' : 'text-amber-600'}`}
                  >
                    {h.beans === 0 ? '0' : h.beans}
                    <span className="text-xs font-normal ml-0.5">豆</span>
                  </span>
                </div>
                <div className="text-center text-xs text-gray-400">
                  {h.views ? h.views.toLocaleString() : '—'}
                </div>
                <div className="flex items-center gap-1.5 justify-center">
                  <button className="text-xs text-gray-500 hover:text-gray-700 px-1.5 py-1 rounded hover:bg-gray-100">预览</button>
                  {h.status === 'draft' && (
                    <button className="text-xs hover:underline" style={{ color: PRIMARY }}>发布</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Chain View */}
      {view === 'chain' && (
        <div className="space-y-4">
          {CHAIN_DATA.map((chain) => (
            <div key={chain.plan} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base">📅</span>
                <div className="text-sm font-semibold text-gray-800">{chain.plan}</div>
                <button
                  onClick={() => onNavigate && onNavigate('strategy/plan')}
                  className="text-xs hover:underline ml-auto"
                  style={{ color: PRIMARY }}
                >
                  查看计划 →
                </button>
              </div>

              <div className="space-y-2 pl-4 border-l-2" style={{ borderColor: PRIMARY + '40' }}>
                {chain.items.map((item, i) => {
                  const sc = STATUS_CONFIG[item.status] || { label: item.status, color: '#6B7280', bg: '#F3F4F6' }
                  return (
                    <div key={i} className="flex items-center gap-4 py-2 px-3 bg-gray-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: sc.color }} />
                      <div className="flex-1">
                        <div className="text-sm text-gray-700">{item.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">渠道：{item.channel}</div>
                      </div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ color: sc.color, backgroundColor: sc.bg }}
                      >
                        {sc.label}
                      </span>
                      <span className={`text-sm font-bold ${item.beans === 0 ? 'text-gray-300' : 'text-amber-600'}`}>
                        {item.beans} 豆
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>本计划累计消耗：<strong className="text-amber-600">{chain.items.reduce((a, i) => a + i.beans, 0)} 豆</strong></span>
                <span>已分发 {chain.items.filter(i => i.status === 'distributed').length}/{chain.items.length} 条</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
