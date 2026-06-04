import { useState } from 'react'

const PRIMARY = '#C9A227'

const RULE_CATEGORIES = [
  {
    id: 'tone',
    label: '语气与语调',
    icon: '🎙️',
    rules: [
      {
        id: 'base-tone',
        name: '品牌主基调',
        desc: '所有 AI 生成内容默认采用的语气风格',
        enabled: true,
        priority: 'P1',
        value: '专业且亲和',
        type: 'select',
        options: ['专业且亲和', '严肃权威', '活泼轻松', '数据驱动'],
      },
      {
        id: 'sentence-length',
        name: '句式偏好',
        desc: '控制 AI 输出的句子平均长度',
        enabled: true,
        priority: 'P2',
        value: '短句优先（≤20字/句）',
        type: 'select',
        options: ['短句优先（≤20字/句）', '中等长度（20-40字/句）', '长句详细型'],
      },
      {
        id: 'pronouns',
        name: '人称设定',
        desc: '品牌自称与对用户的称呼',
        enabled: true,
        priority: 'P1',
        value: '品牌称"我们"，用户称"您"',
        type: 'select',
        options: ['品牌称"我们"，用户称"您"', '品牌称"我们"，用户称"你"', '去人称化（不使用第一人称）'],
      },
      {
        id: 'banned-phrases',
        name: '禁用表达',
        desc: '严格禁止出现的词汇或句式',
        enabled: true,
        priority: 'P1',
        value: '"非常""首先其次最后""随着...的发展"',
        type: 'text',
      },
    ],
  },
  {
    id: 'structure',
    label: '内容结构',
    icon: '🏗️',
    rules: [
      {
        id: 'opening',
        name: '开头结构规范',
        desc: '文章开头必须遵循的结构形式',
        enabled: true,
        priority: 'P2',
        value: '必须以提问或场景描述开头，禁止以"随着"开头',
        type: 'text',
      },
      {
        id: 'cta-required',
        name: '结尾 CTA 要求',
        desc: '内容结尾是否必须包含行动引导',
        enabled: true,
        priority: 'P2',
        value: '必须包含明确 CTA，文案从词库选取',
        type: 'toggle',
      },
      {
        id: 'data-citation',
        name: '数据引用规范',
        desc: '涉及数字的展示要求与来源限制',
        enabled: true,
        priority: 'P1',
        value: '数字优先引用品牌资产库数据，禁止自行编造数字',
        type: 'text',
      },
      {
        id: 'paragraph-rhythm',
        name: '段落节奏控制',
        desc: '段落长度与标题插入规则',
        enabled: false,
        priority: 'P3',
        value: '单段不超过5句；每隔2-3段插入小标题',
        type: 'text',
      },
    ],
  },
  {
    id: 'channel',
    label: '渠道专属规则',
    icon: '📡',
    rules: [
      {
        id: 'wechat-title',
        name: '微信公众号标题规范',
        desc: '公众号推文标题的字数与关键词要求',
        enabled: true,
        priority: 'P2',
        value: '标题不超过20字，必须包含核心关键词',
        type: 'text',
        channel: '微信',
      },
      {
        id: 'linkedin-endorsement',
        name: 'LinkedIn 专业背书',
        desc: 'LinkedIn 内容必须引用的数据来源类型',
        enabled: true,
        priority: 'P2',
        value: '必须引用至少一项第三方数据或行业认证',
        type: 'text',
        channel: 'LinkedIn',
      },
      {
        id: 'product-page-order',
        name: '产品页特性描述顺序',
        desc: '产品页卖点呈现的固定顺序',
        enabled: true,
        priority: 'P3',
        value: '技术参数用表格；卖点顺序：精度→速度→兼容性',
        type: 'text',
        channel: '官网',
      },
      {
        id: 'email-subject',
        name: 'EDM 主题行规范',
        desc: '邮件主题行字数与前缀要求',
        enabled: false,
        priority: 'P3',
        value: '主题行不超过50字符；以"[品牌名]"开头',
        type: 'text',
        channel: '邮件',
      },
    ],
  },
]

const PRIORITY_COLORS = { P1: '#EF4444', P2: '#F59E0B', P3: '#6B7280' }

export default function CreationRules() {
  const [rules, setRules] = useState(() => {
    const map = {}
    RULE_CATEGORIES.forEach(cat => cat.rules.forEach(r => { map[r.id] = r.enabled }))
    return map
  })
  const [expandedCat, setExpandedCat] = useState({ tone: true, structure: true, channel: false })
  const [sandboxInput, setSandboxInput] = useState('')
  const [sandboxResult, setSandboxResult] = useState('')

  const toggleRule = (id) => {
    setRules(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const enabledCount = Object.values(rules).filter(Boolean).length
  const totalCount = RULE_CATEGORIES.reduce((a, c) => a + c.rules.length, 0)

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-xl mt-0.5">⚙️</span>
        <div>
          <div className="text-sm font-semibold text-amber-800">创作规则配置</div>
          <div className="text-xs text-amber-700 mt-0.5">
            在此定义 AI 生成内容时必须遵守的规则。规则一次配置，全模块自动应用——无需每次在提示词中重复说明。
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '已启用规则', value: enabledCount, color: '#10B981' },
          { label: '总规则数', value: totalCount, color: '#3B82F6' },
          { label: 'P1 高优先级', value: RULE_CATEGORIES.reduce((a, c) => a + c.rules.filter(r => r.priority === 'P1').length, 0), color: '#EF4444' },
          { label: '渠道专属规则', value: RULE_CATEGORIES.find(c => c.id === 'channel').rules.length, color: PRIMARY },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Rule Categories */}
      <div className="space-y-4">
        {RULE_CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedCat(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{cat.label}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {cat.rules.filter(r => rules[r.id]).length}/{cat.rules.length} 已启用
                </span>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-4 h-4 text-gray-400 transition-transform ${expandedCat[cat.id] ? 'rotate-180' : ''}`}
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </button>

            {expandedCat[cat.id] && (
              <div className="border-t border-gray-100 divide-y divide-gray-50">
                {cat.rules.map((rule) => (
                  <div key={rule.id} className={`px-5 py-4 flex items-start gap-4 ${!rules[rule.id] ? 'opacity-50' : ''}`}>
                    {/* Toggle */}
                    <div className="flex-shrink-0 mt-0.5">
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          rules[rule.id] ? '' : 'bg-gray-200'
                        }`}
                        style={rules[rule.id] ? { backgroundColor: PRIMARY } : {}}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                            rules[rule.id] ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-gray-700">{rule.name}</span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded font-semibold text-white"
                          style={{ backgroundColor: PRIORITY_COLORS[rule.priority] }}
                        >
                          {rule.priority}
                        </span>
                        {rule.channel && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                            {rule.channel}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">{rule.desc}</div>
                      <div className="flex items-center gap-2">
                        {rule.type === 'select' ? (
                          <select
                            disabled={!rules[rule.id]}
                            defaultValue={rule.value}
                            className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs bg-white focus:outline-none text-gray-600"
                          >
                            {rule.options.map(o => <option key={o}>{o}</option>)}
                          </select>
                        ) : rule.type === 'toggle' ? (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            {rule.value}
                          </div>
                        ) : (
                          <input
                            disabled={!rules[rule.id]}
                            defaultValue={rule.value}
                            className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs w-80 focus:outline-none text-gray-600 bg-white"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sandbox */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="text-sm font-semibold text-gray-700 mb-1">规则测试沙盒</div>
        <div className="text-xs text-gray-400 mb-3">输入一段测试内容，查看规则应用前后的对比效果</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1.5">输入内容（未应用规则）</div>
            <textarea
              value={sandboxInput}
              onChange={e => setSandboxInput(e.target.value)}
              placeholder="随着人工智能技术的快速发展，我们的产品非常厉害，首先能提高效率，其次降低成本，最后提升品质..."
              className="w-full h-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none text-gray-600"
            />
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1.5">应用规则后（AI 优化）</div>
            <div className="w-full h-28 border border-green-200 rounded-lg px-3 py-2 text-sm bg-green-50 text-gray-600 overflow-auto">
              {sandboxResult || (
                <span className="text-gray-300 italic">点击"测试"后，AI 将展示规则应用后的内容版本</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            setSandboxResult(
              '您是否正在寻找一种更高效的生产方式？\n\n我们的工业机器人 MR-200，重复定位精度达到 ±0.02mm，负载能力 15kg，内置 AI 视觉系统，助您实现精准、高速、稳定的自动化生产。\n\n了解更多产品规格，欢迎联系我们获取定制化方案。',
            )
          }
          className="mt-3 text-sm px-4 py-2 rounded-xl text-white font-medium"
          style={{ backgroundColor: PRIMARY }}
        >
          测试规则效果
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          className="text-sm px-5 py-2 rounded-xl text-white font-medium"
          style={{ backgroundColor: PRIMARY }}
        >
          保存所有规则
        </button>
        <button className="text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-600">导出规则集（JSON）</button>
        <button className="text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-600">导入规则集</button>
      </div>

      {/* AI Suggestion */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-lg mt-0.5">🤖</span>
        <div>
          <div className="text-sm font-semibold text-blue-800 mb-1">AI 建议新规则</div>
          <div className="text-xs text-blue-700">
            基于近 30 天您的手动修改记录，AI 发现您频繁将 AI 生成内容中的
            <strong>"解决方案"</strong> 改为 <strong>"方案"</strong>，建议添加词汇简化规则：
            <em>避免使用"解决方案"，改用"方案"</em>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button className="text-xs px-2.5 py-1 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>
              添加为规则
            </button>
            <button className="text-xs px-2.5 py-1 rounded-lg border border-blue-200 text-blue-600">忽略</button>
          </div>
        </div>
      </div>
    </div>
  )
}
