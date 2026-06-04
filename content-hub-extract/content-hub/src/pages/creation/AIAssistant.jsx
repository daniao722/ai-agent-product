import { useState } from 'react'

const PRIMARY = '#C9A227'

/* ───────────────────────────────────────────────
   Example briefs the user can click to prefill
─────────────────────────────────────────────── */
const EXAMPLES = [
  {
    label: '产品内容设计',
    icon: '📦',
    text: '我需要为工业机器人 MR-200 撰写一篇产品介绍，重点突出其重复定位精度±0.02mm、15kg 负载能力和内置 AI 视觉系统，面向欧洲市场的采购决策者。',
  },
  {
    label: '618 促销文案',
    icon: '🎉',
    text: '618 大促即将到来，我需要一套全渠道促销文案，包括社媒帖子、邮件主题行和官网 Banner 文案，强调限时折扣和工厂直供优势。',
  },
  {
    label: 'LinkedIn 企业动态',
    icon: '💼',
    text: '发布一条 LinkedIn 企业动态，宣布我们的工业机器人通过了 CE 认证，正式进入欧洲市场，语气专业，配数据，带行动引导。',
  },
  {
    label: '行业洞察文章',
    icon: '🔍',
    text: '撰写一篇关于「AI 视觉系统如何改变精密制造质检流程」的深度洞察文章，约 1000 字，引用行业数据，适合发布在技术媒体和官网博客。',
  },
]

/* ───────────────────────────────────────────────
   Wizard steps definition
   type: 'single' | 'multi' | 'text'
─────────────────────────────────────────────── */
const STEPS = [
  {
    key: 'content_type',
    title: '内容类型',
    question: '您想创作哪种类型的内容？',
    type: 'single',
    options: ['产品描述', '新闻稿 / 公告', '社媒帖子', '白皮书 / 深度文章', '邮件正文（EDM）', '活动预热文案', '客户案例故事', '行业洞察分析'],
  },
  {
    key: 'target_audience',
    title: '目标受众',
    question: '这篇内容主要写给谁看？（可多选）',
    type: 'multi',
    options: [
      '技术决策者（CTO / 工程师）',
      '采购决策者（采购总监 / VP）',
      '最终使用用户',
      '投资人 / 分析师',
      '行业媒体 / KOL',
      '企业客户（B2B 通用）',
      '消费者（B2C）',
    ],
  },
  {
    key: 'key_points',
    title: '核心卖点',
    question: '需要重点突出哪些卖点？（可多选，也可自填）',
    type: 'multi',
    options: [
      '重复定位精度 ±0.02mm',
      '额定负载 15 kg',
      'AI 视觉系统',
      '快速换型设计（< 8 分钟）',
      'CE / ISO 合规认证',
      '节能降耗（降低 40% 能耗）',
      '远程运维支持',
      '交货周期短（4 周）',
    ],
    allowCustom: true,
    customPlaceholder: '其他卖点，如：定制化服务、本地化支持…',
  },
  {
    key: 'channels',
    title: '目标渠道',
    question: '这篇内容将发布在哪些渠道？（可多选）',
    type: 'multi',
    options: [
      '官网产品页',
      'LinkedIn',
      'Instagram / Facebook',
      '微信公众号',
      '小红书',
      '邮件 EDM',
      '行业媒体 / 展会物料',
      'YouTube / 抖音',
    ],
  },
  {
    key: 'style',
    title: '语气风格',
    question: '您希望内容的语气和风格是？',
    type: 'single',
    options: [
      '专业技术向（精准、有深度）',
      '商务正式（严谨、权威）',
      '亲和力强（温暖、易读）',
      '数据驱动（图表思维、以数字说话）',
      '故事化叙事（场景感、有画面）',
    ],
  },
  {
    key: 'length',
    title: '内容长度',
    question: '期望内容的篇幅是？',
    type: 'single',
    options: [
      '简短（100–200 字，社媒帖 / 标题）',
      '中等（300–500 字，产品描述 / 邮件）',
      '详细（800–1,000 字，博客 / 新闻稿）',
      '长篇（1,500 字 +，白皮书 / 深度分析）',
      '多版本（同时生成 3 个不同长度）',
    ],
  },
  {
    key: 'extra',
    title: '补充要求',
    question: '还有什么特别说明？（选填）',
    type: 'text',
    placeholder: '例如：需要引用 2 个客户案例数据；结尾加上 CTA 引导下载白皮书；不要用"随着"开头；德语翻译版本同步生成…',
  },
]

/* ───────────────────────────────────────────────
   Mock generated content (shown after wizard)
─────────────────────────────────────────────── */
const GENERATED_CONTENT = `**MR-200 工业机器人 · 产品描述**

在精密制造领域，毫米级偏差往往是良品率的分水岭。

MR-200 工业机器人以 **±0.02mm 重复定位精度**，将误差控制在人类肉眼无法分辨的范围内。在连续 8 小时生产后，第 10,000 次落点与第 1 次的偏差，不超过一根头发丝的三分之一。

**三大核心优势：**

- **AI 视觉系统**：内置深度学习模块，无治具识别成功率 ≥ 99.7%，自动适配 12 种工件形态
- **快速换型设计**：平均换型时间 < 8 分钟，减少非生产时间 62%
- **CE / ISO 合规认证**：完全符合欧盟机械指令，可直接进入欧洲市场部署

额定负载 15 kg，最大运动速度 2.5 m/s，适用于精密装配、质量检测、物料搬运、焊接作业等多种场景。

**立即获取产品规格书 →**`

/* ───────────────────────────────────────────────
   Label mappings for summary display
─────────────────────────────────────────────── */
const STEP_LABELS = {
  content_type: '内容类型',
  target_audience: '目标受众',
  key_points: '核心卖点',
  channels: '目标渠道',
  style: '语气风格',
  length: '内容长度',
  extra: '补充要求',
}

/* ─── Helpers ─── */
const stripParens = (s) => s.replace(/（[^）]*）/g, '').replace(/\s*\([^)]*\)/g, '').trim()

export default function AIAssistant() {
  const [brief, setBrief] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [customText, setCustomText] = useState('')
  const [phase, setPhase] = useState('input') // 'input' | 'summary' | 'generating' | 'done'

  const step = STEPS[currentStep]
  const totalSteps = STEPS.length

  /* ── selection helpers ── */
  const getSelected = () => answers[step.key] || (step.type === 'multi' ? [] : '')

  const toggleOption = (opt) => {
    if (step.type === 'single') {
      setAnswers((prev) => ({ ...prev, [step.key]: opt }))
    } else {
      const cur = answers[step.key] || []
      const next = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]
      setAnswers((prev) => ({ ...prev, [step.key]: next }))
    }
  }

  const isSelected = (opt) => {
    const sel = getSelected()
    return step.type === 'multi' ? (sel || []).includes(opt) : sel === opt
  }

  const canAdvance = () => {
    if (step.type === 'text') return true // optional
    const sel = getSelected()
    return step.type === 'single' ? !!sel : (sel || []).length > 0
  }

  const handleNext = () => {
    // save custom text into the multi answer if present
    if (step.allowCustom && customText.trim()) {
      setAnswers((prev) => ({
        ...prev,
        [step.key]: [...(prev[step.key] || []), customText.trim()],
      }))
      setCustomText('')
    }
    if (step.type === 'text') {
      setAnswers((prev) => ({ ...prev, [step.key]: customText.trim() }))
      setCustomText('')
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      // Done — close modal, show summary
      setShowModal(false)
      setPhase('summary')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  const handleGenerate = () => {
    setPhase('generating')
    setTimeout(() => setPhase('done'), 1800)
  }

  const handleReset = () => {
    setBrief('')
    setShowModal(false)
    setCurrentStep(0)
    setAnswers({})
    setCustomText('')
    setPhase('input')
  }

  /* ── format answer for summary ── */
  const formatAnswer = (key, val) => {
    if (!val || (Array.isArray(val) && val.length === 0)) return '—'
    if (Array.isArray(val)) return val.map(stripParens).join(', ')
    return stripParens(String(val))
  }

  /* ─── Bean cost estimate ─── */
  const estimateBeans = () => {
    const len = answers.length || ''
    if (len.includes('简短')) return 5
    if (len.includes('中等')) return 15
    if (len.includes('详细')) return 30
    if (len.includes('长篇')) return 30
    if (len.includes('多版本')) return 38
    return 15
  }

  /* ════════════════════════════════════════
     RENDER
  ════════════════════════════════════════ */
  return (
    <div className="flex h-full">
      {/* ── LEFT: Main work area ── */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header bar */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-center gap-3 bg-white">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #C9A227, #A07820)' }}
          >
            AI
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">AI 创作助手</div>
            <div className="text-xs text-gray-400">输入创作需求 → 逐步确认参数 → 精准生成内容</div>
          </div>
          {phase !== 'input' && (
            <button
              onClick={handleReset}
              className="ml-auto text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              重新开始
            </button>
          )}
        </div>

        {/* ── PHASE: input ── */}
        {phase === 'input' && (
          <div className="flex-1 p-6 space-y-5">
            {/* Brief input */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                描述您的创作需求
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="用自己的话描述想要创作的内容，例如：为工业机器人 MR-200 写一篇面向欧洲采购商的英文产品描述，重点突出精度和认证..."
                className="w-full h-32 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-300 resize-none text-gray-700 leading-relaxed"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">{brief.length} 字</span>
                <button
                  disabled={!brief.trim()}
                  onClick={() => { setShowModal(true); setCurrentStep(0) }}
                  className={`text-sm px-5 py-2 rounded-xl text-white font-medium transition-all ${
                    brief.trim() ? 'opacity-100 hover:opacity-90' : 'opacity-40 cursor-not-allowed'
                  }`}
                  style={{ backgroundColor: PRIMARY }}
                >
                  完善创作参数 →
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">或选择示例需求</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Example cards */}
            <div className="grid grid-cols-2 gap-3">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => {
                    setBrief(ex.text)
                    setShowModal(true)
                    setCurrentStep(0)
                  }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all text-left group"
                >
                  <span className="text-2xl flex-shrink-0">{ex.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">{ex.label}</div>
                    <div className="text-xs text-gray-400 leading-relaxed line-clamp-2">{ex.text}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PHASE: summary ── */}
        {(phase === 'summary' || phase === 'generating' || phase === 'done') && (
          <div className="flex-1 p-6 space-y-4">
            {/* Brief recap */}
            <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              <div className="text-xs text-gray-400 mb-1">原始需求</div>
              <div className="text-sm text-gray-600 leading-relaxed">{brief}</div>
            </div>

            {/* Structured summary */}
            <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-amber-100 flex items-center gap-2">
                <span className="text-sm">✅</span>
                <span className="text-sm font-semibold text-gray-700">Questions answered:</span>
              </div>
              <div className="px-5 py-4 space-y-2 font-mono text-sm">
                {STEPS.filter((s) => s.key !== 'extra' || answers.extra).map((s) => (
                  <div key={s.key} className="flex items-start gap-2">
                    <span className="text-gray-400 flex-shrink-0">-</span>
                    <span className="text-gray-500 flex-shrink-0 w-36">{s.key}:</span>
                    <span className="text-gray-800">{formatAnswer(s.key, answers[s.key])}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit + Generate actions */}
            {phase === 'summary' && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setShowModal(true); setCurrentStep(0) }}
                  className="text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  修改参数
                </button>
                <button
                  onClick={handleGenerate}
                  className="text-sm px-6 py-2.5 rounded-xl text-white font-medium"
                  style={{ backgroundColor: PRIMARY }}
                >
                  生成内容（预计消耗 {estimateBeans()} 豆）
                </button>
              </div>
            )}

            {/* Generating state */}
            {phase === 'generating' && (
              <div className="flex items-center gap-3 py-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: PRIMARY, animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  正在基于品牌词库 + 创作规则生成内容…
                </span>
              </div>
            )}

            {/* Done — generated content inline */}
            {phase === 'done' && (
              <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-green-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">✨</span>
                    <span className="text-sm font-semibold text-gray-700">生成结果</span>
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200">
                      已消耗 {estimateBeans()} 豆
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                      复制
                    </button>
                    <button className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                      保存草稿
                    </button>
                    <button
                      className="text-xs px-2.5 py-1 rounded-lg text-white"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      发布
                    </button>
                  </div>
                </div>
                <div className="px-5 py-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {GENERATED_CONTENT}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── RIGHT: Steps sidebar ── */}
      <div className="w-64 flex-shrink-0 bg-gray-50 border-l border-gray-200 p-4">
        <div className="text-xs font-semibold text-gray-500 mb-3">参数确认进度</div>
        <div className="space-y-1.5">
          {STEPS.map((s, i) => {
            const val = answers[s.key]
            const done = val && (Array.isArray(val) ? val.length > 0 : String(val).trim().length > 0)
            const active = showModal && i === currentStep
            return (
              <div
                key={s.key}
                className={`flex items-start gap-2.5 px-3 py-2 rounded-lg transition-all ${
                  active ? 'bg-amber-50 border border-amber-200' : ''
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    done
                      ? 'bg-green-500 text-white'
                      : active
                      ? 'text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                  style={active && !done ? { backgroundColor: PRIMARY } : {}}
                >
                  {done ? '✓' : i + 1}
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-medium ${done ? 'text-green-700' : active ? 'text-gray-800' : 'text-gray-400'}`}>
                    {s.title}
                  </div>
                  {done && (
                    <div className="text-xs text-gray-400 truncate mt-0.5">
                      {formatAnswer(s.key, val).slice(0, 28)}{formatAnswer(s.key, val).length > 28 ? '…' : ''}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {phase === 'done' && (
          <button
            onClick={handleReset}
            className="mt-4 w-full text-xs py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-white transition-colors"
          >
            + 创建新内容
          </button>
        )}
      </div>

      {/* ════════════════════════════════════════
          MODAL WIZARD OVERLAY
      ════════════════════════════════════════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          {/* Modal card */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-[540px] max-h-[82vh] flex flex-col overflow-hidden">
            {/* Modal header + progress */}
            <div className="px-6 pt-5 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold text-white px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    {currentStep + 1}/{totalSteps}
                  </span>
                  <span className="text-xs text-gray-400">完善创作参数</span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  ×
                </button>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%`, backgroundColor: PRIMARY }}
                />
              </div>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-auto px-6 py-5">
              <div className="text-base font-semibold text-gray-800 mb-4">{step.question}</div>

              {/* Single / Multi select */}
              {(step.type === 'single' || step.type === 'multi') && (
                <div className="space-y-2">
                  {step.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleOption(opt)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                        isSelected(opt)
                          ? 'border-amber-400 bg-amber-50 text-gray-800 font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-amber-50/40'
                      }`}
                    >
                      {/* checkbox / radio indicator */}
                      <span
                        className={`w-4 h-4 rounded-${step.type === 'single' ? 'full' : 'sm'} border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                          isSelected(opt) ? 'border-transparent' : 'border-gray-300'
                        }`}
                        style={isSelected(opt) ? { backgroundColor: PRIMARY } : {}}
                      >
                        {isSelected(opt) && (
                          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                            {step.type === 'single' ? (
                              <circle cx="5" cy="5" r="2.5" fill="white" />
                            ) : (
                              <path d="M1.5 5.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                          </svg>
                        )}
                      </span>
                      {opt}
                    </button>
                  ))}

                  {/* Custom text input for multi-select */}
                  {step.allowCustom && (
                    <div className="flex gap-2 mt-1">
                      <input
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && customText.trim()) {
                            setAnswers((prev) => ({
                              ...prev,
                              [step.key]: [...(prev[step.key] || []), customText.trim()],
                            }))
                            setCustomText('')
                          }
                        }}
                        placeholder={step.customPlaceholder}
                        className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-300 text-gray-600"
                      />
                      <button
                        onClick={() => {
                          if (customText.trim()) {
                            setAnswers((prev) => ({
                              ...prev,
                              [step.key]: [...(prev[step.key] || []), customText.trim()],
                            }))
                            setCustomText('')
                          }
                        }}
                        className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-500 hover:bg-gray-50"
                      >
                        添加
                      </button>
                    </div>
                  )}

                  {/* Show custom tags added */}
                  {step.allowCustom && (answers[step.key] || []).filter(o => !step.options.includes(o)).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {(answers[step.key] || [])
                        .filter((o) => !step.options.includes(o))
                        .map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full text-white"
                            style={{ backgroundColor: PRIMARY }}
                          >
                            {tag}
                            <button
                              onClick={() =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [step.key]: (prev[step.key] || []).filter((x) => x !== tag),
                                }))
                              }
                              className="opacity-70 hover:opacity-100 leading-none"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Text input */}
              {step.type === 'text' && (
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder={step.placeholder}
                  className="w-full h-32 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-300 resize-none text-gray-700 leading-relaxed"
                />
              )}
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`text-sm px-4 py-2 rounded-xl border border-gray-200 transition-all ${
                  currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                ← 上一步
              </button>

              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: i === currentStep ? PRIMARY : i < currentStep ? PRIMARY + '60' : '#E5E7EB',
                      width: i === currentStep ? '16px' : '6px',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!canAdvance() && step.type !== 'text'}
                className={`text-sm px-5 py-2 rounded-xl text-white font-medium transition-all ${
                  !canAdvance() && step.type !== 'text' ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: PRIMARY }}
              >
                {currentStep === totalSteps - 1 ? '确认完成 ✓' : '下一步 →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
