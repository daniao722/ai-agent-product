import { useState } from 'react'

const PRIMARY = '#C9A227'

const PLATFORMS = [
  {
    id: 'facebook',
    label: 'Facebook',
    color: '#1877F2',
    rules: [
      { name: '广告文字占比', standard: '图片内文字面积 ≤ 20%', status: 'pass', level: 'block' },
      { name: '点击诱导禁止', standard: '禁止"分享此帖""点击点赞"等明确引导语', status: 'pass', level: 'block' },
      { name: '酒精/赌博内容限制', standard: '此类内容需年龄设置 ≥ 18岁', status: 'pass', level: 'warn' },
      { name: '图片清晰度', standard: '建议 ≥ 1080px 宽度', status: 'warn', level: 'warn' },
    ],
  },
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    rules: [
      { name: '图片清晰度', standard: '≥ 1080px 分辨率', status: 'pass', level: 'block' },
      { name: '医疗/美容夸张宣称', standard: '禁止无法证实的健康功效声明', status: 'pass', level: 'block' },
      { name: 'Reels 时长限制', standard: '视频时长 ≤ 90秒', status: 'pass', level: 'block' },
      { name: '受众年龄设置', standard: '当前未配置年龄限制', status: 'warn', level: 'warn' },
    ],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
    rules: [
      { name: 'B2B专业语气检测', standard: '禁用过于口语化/娱乐性表达', status: 'pass', level: 'warn' },
      { name: '帖子字数建议', standard: '150-700字效果最佳', status: 'warn', level: 'info' },
      { name: '行业属性标注', standard: '建议设置行业与受众职级', status: 'pass', level: 'info' },
    ],
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    color: '#161823',
    rules: [
      { name: '开场3秒规则', standard: '禁止在前3秒出现第三方平台Logo', status: 'pass', level: 'block' },
      { name: '背景音乐版权', standard: '仅可使用TikTok授权曲库', status: 'warn', level: 'block' },
      { name: '字幕覆盖比例', standard: '建议字幕覆盖>60%时长以提升无声播放体验', status: 'pass', level: 'info' },
    ],
  },
  {
    id: 'xiaohongshu',
    label: '小红书',
    color: '#FF2442',
    rules: [
      { name: '"种草"表述授权', standard: '禁止无授权使用误导性"种草"推广表述', status: 'pass', level: 'block' },
      { name: '图片数量限制', standard: '1-18张图片', status: 'pass', level: 'block' },
      { name: '视频格式推荐', standard: '竖版 9:16 优先，横版次之', status: 'warn', level: 'info' },
    ],
  },
  {
    id: 'website',
    label: '独立站/官网',
    color: '#6B7280',
    rules: [
      { name: 'SEO关键词密度', standard: '关键词密度 1%-3%，过高将被降权', status: 'pass', level: 'warn' },
      { name: '标题层级规范', standard: 'H1唯一性，H2/H3层级清晰', status: 'pass', level: 'warn' },
      { name: '图片文件大小', standard: '单张 ≤ 500KB，建议WebP格式', status: 'warn', level: 'warn' },
      { name: '内链建议', standard: '至少3个内链指向核心产品页', status: 'warn', level: 'info' },
    ],
  },
]

const LEVEL_BADGE = {
  block: { label: '拦截', bg: '#FEE2E2', color: '#EF4444' },
  warn: { label: '警告', bg: '#FEF9C3', color: '#D97706' },
  info: { label: '提示', bg: '#F3F4F6', color: '#6B7280' },
}

const STATUS_CONFIG = {
  pass: { icon: '✓', color: '#10B981' },
  warn: { icon: '⚠', color: '#F59E0B' },
  fail: { icon: '✕', color: '#EF4444' },
}

export default function PlatformReview() {
  const [activePlatform, setActivePlatform] = useState('facebook')
  const platform = PLATFORMS.find((p) => p.id === activePlatform)

  return (
    <div className="p-6 space-y-4">
      {/* Platform Tabs */}
      <div className="flex gap-2 flex-wrap">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePlatform(p.id)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
              activePlatform === p.id ? 'text-white border-transparent shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
            style={activePlatform === p.id ? { backgroundColor: p.color } : {}}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100" style={{ backgroundColor: platform?.color + '10' }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: platform?.color }}>
            {platform?.label[0]}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">{platform?.label} 平台规范</div>
            <div className="text-xs text-gray-500">内置 {platform?.rules.length} 条审核规则</div>
          </div>
          <button className="ml-auto text-xs px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>
            + 添加自定义规则
          </button>
        </div>

        <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
          <div className="col-span-3">规则名称</div>
          <div className="col-span-5">执行标准</div>
          <div className="col-span-1 text-center">级别</div>
          <div className="col-span-1 text-center">当前状态</div>
          <div className="col-span-2 text-right">操作</div>
        </div>

        {platform?.rules.map((rule, i) => {
          const lv = LEVEL_BADGE[rule.level]
          const st = STATUS_CONFIG[rule.status]
          return (
            <div key={i} className="grid grid-cols-12 px-5 py-3.5 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-3 text-sm font-medium text-gray-800">{rule.name}</div>
              <div className="col-span-5 text-sm text-gray-500">{rule.standard}</div>
              <div className="col-span-1 text-center">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: lv.bg, color: lv.color }}>
                  {lv.label}
                </span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-sm font-bold" style={{ color: st.color }}>{st.icon}</span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <button className="text-xs text-gray-400 hover:text-gray-600">修改阈值</button>
                <button className="text-xs" style={{ color: PRIMARY }}>查看详情</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
        <span className="font-medium">规则同步说明：</span>
        平台规范内容与各平台官方指南保持同步，最近更新：2026-05-15。如发现规则过时，请联系客服提交更新申请。
      </div>
    </div>
  )
}
