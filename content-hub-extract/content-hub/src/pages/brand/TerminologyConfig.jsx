import { useState } from 'react'

const PRIMARY = '#C9A227'

const LANGS = ['中文', 'English', '日本語', 'Deutsch', 'Français', 'Español', 'Português', 'العربية']

const CATEGORIES = ['全部', '产品名称', '技术术语', '品牌资产', '行业缩写', '合规用词']

const TERMS = [
  {
    id: 1,
    zh: '工业机器人',
    category: '产品名称',
    en: 'Industrial Robot',
    ja: '産業用ロボット',
    de: 'Industrieroboter',
    fr: 'Robot Industriel',
    es: 'Robot Industrial',
    pt: 'Robô Industrial',
    ar: 'روبوت صناعي',
    status: 'approved',
  },
  {
    id: 2,
    zh: 'MR-200',
    category: '产品名称',
    en: 'MR-200',
    ja: 'MR-200',
    de: 'MR-200',
    fr: 'MR-200',
    es: 'MR-200',
    pt: 'MR-200',
    ar: 'MR-200',
    status: 'approved',
  },
  {
    id: 3,
    zh: '重复定位精度',
    category: '技术术语',
    en: 'Repeatability',
    ja: '繰り返し位置決め精度',
    de: 'Wiederholgenauigkeit',
    fr: 'Répétabilité',
    es: 'Repetibilidad',
    pt: 'Repetibilidade',
    ar: 'دقة تكرار التحديد',
    status: 'approved',
  },
  {
    id: 4,
    zh: 'AI视觉系统',
    category: '技术术语',
    en: 'AI Vision System',
    ja: 'AIビジョンシステム',
    de: 'KI-Bildverarbeitungssystem',
    fr: "Système de Vision par IA",
    es: 'Sistema de Visión IA',
    pt: 'Sistema de Visão IA',
    ar: 'نظام الرؤية بالذكاء الاصطناعي',
    status: 'approved',
  },
  {
    id: 5,
    zh: '数字门户',
    category: '品牌资产',
    en: 'Digital Gateway',
    ja: 'デジタルゲートウェイ',
    de: 'Digitales Gateway',
    fr: 'Passerelle Numérique',
    es: 'Portal Digital',
    pt: 'Portal Digital',
    ar: 'البوابة الرقمية',
    status: 'draft',
  },
  {
    id: 6,
    zh: 'ROI',
    category: '行业缩写',
    en: 'ROI (Return on Investment)',
    ja: '投資収益率（ROI）',
    de: 'ROI (Return on Investment)',
    fr: 'ROI (Retour sur Investissement)',
    es: 'ROI (Retorno de Inversión)',
    pt: 'ROI (Retorno sobre Investimento)',
    ar: 'عائد الاستثمار (ROI)',
    status: 'approved',
  },
  {
    id: 7,
    zh: '智能制造',
    category: '行业缩写',
    en: 'Smart Manufacturing',
    ja: 'スマートマニュファクチャリング',
    de: 'Intelligente Fertigung',
    fr: 'Fabrication Intelligente',
    es: 'Fabricación Inteligente',
    pt: 'Manufatura Inteligente',
    ar: 'التصنيع الذكي',
    status: 'approved',
  },
  {
    id: 8,
    zh: '保修期',
    category: '合规用词',
    en: 'Warranty Period',
    ja: '保証期間',
    de: 'Garantiezeitraum',
    fr: 'Période de Garantie',
    es: 'Período de Garantía',
    pt: 'Período de Garantia',
    ar: 'فترة الضمان',
    status: 'draft',
  },
]

const LANG_KEYS = ['en', 'ja', 'de', 'fr', 'es', 'pt', 'ar']
const LANG_LABELS = { en: 'English', ja: '日本語', de: 'Deutsch', fr: 'Français', es: 'Español', pt: 'Português', ar: 'العربية' }

export default function TerminologyConfig() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [editingId, setEditingId] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [searchText, setSearchText] = useState('')

  const filtered = TERMS.filter((t) => {
    const matchCat = activeCategory === '全部' || t.category === activeCategory
    const matchSearch = !searchText || t.zh.includes(searchText) || t.en.toLowerCase().includes(searchText.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="p-6 space-y-5">
      {/* Header Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-xl mt-0.5">📖</span>
        <div>
          <div className="text-sm font-semibold text-amber-800">词库管理 · 专有词多语言配置</div>
          <div className="text-xs text-amber-700 mt-0.5">
            在此配置企业专有词汇的标准多语言译名。AI 文案工场、视觉创作等模块在生成多语言内容时，将自动引用词库中的权威译名，确保跨语言内容零偏差。
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === c ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={activeCategory === c ? { backgroundColor: PRIMARY } : {}}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input
            placeholder="搜索词条..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-44 focus:outline-none focus:border-amber-300"
          />
          <button className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
            导入 Excel
          </button>
          <button className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
            导出
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="text-sm px-3 py-1.5 rounded-lg text-white font-medium"
            style={{ backgroundColor: PRIMARY }}
          >
            + 新增词条
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '词条总数', value: TERMS.length, color: '#3B82F6' },
          { label: '已审核', value: TERMS.filter(t => t.status === 'approved').length, color: '#10B981' },
          { label: '草稿', value: TERMS.filter(t => t.status === 'draft').length, color: '#F59E0B' },
          { label: '覆盖语言', value: 8, color: PRIMARY },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid px-4 py-3 border-b border-gray-100 bg-gray-50 text-xs text-gray-400 font-medium"
          style={{ gridTemplateColumns: '1fr 90px 1fr 1fr 1fr 1fr 1fr 80px 80px' }}>
          <div>中文原词</div>
          <div>分类</div>
          <div>English</div>
          <div>日本語</div>
          <div>Deutsch</div>
          <div>Français</div>
          <div>Español</div>
          <div>状态</div>
          <div className="text-center">操作</div>
        </div>

        {filtered.map((term) => (
          <div
            key={term.id}
            className={`grid px-4 py-3 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50/50 transition-colors ${
              editingId === term.id ? 'bg-amber-50/30' : ''
            }`}
            style={{ gridTemplateColumns: '1fr 90px 1fr 1fr 1fr 1fr 1fr 80px 80px' }}
          >
            <div className="text-sm font-medium text-gray-800">{term.zh}</div>
            <div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{term.category}</span>
            </div>
            <div className="text-xs text-gray-600 pr-2 truncate">{term.en}</div>
            <div className="text-xs text-gray-600 pr-2 truncate">{term.ja}</div>
            <div className="text-xs text-gray-600 pr-2 truncate">{term.de}</div>
            <div className="text-xs text-gray-600 pr-2 truncate">{term.fr}</div>
            <div className="text-xs text-gray-600 pr-2 truncate">{term.es}</div>
            <div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  term.status === 'approved'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-amber-50 text-amber-600'
                }`}
              >
                {term.status === 'approved' ? '已审核' : '草稿'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 justify-center">
              <button
                onClick={() => setEditingId(editingId === term.id ? null : term.id)}
                className="text-xs text-gray-500 hover:text-gray-700 px-1.5 py-1 rounded hover:bg-gray-100"
              >
                编辑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded edit row */}
      {editingId && (() => {
        const term = TERMS.find(t => t.id === editingId)
        if (!term) return null
        return (
          <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700">编辑词条：{term.zh}</div>
              <button onClick={() => setEditingId(null)} className="text-xs text-gray-400 hover:text-gray-600">关闭</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {LANG_KEYS.map((key) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1 block">{LANG_LABELS[key]}</label>
                  <input
                    defaultValue={term[key]}
                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-300"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                className="text-sm px-4 py-1.5 rounded-lg text-white font-medium"
                style={{ backgroundColor: PRIMARY }}
              >
                保存
              </button>
              <button className="text-sm px-4 py-1.5 rounded-lg border border-gray-200 text-gray-600">
                标记为已审核
              </button>
            </div>
          </div>
        )
      })()}

      {/* AI Suggestions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-gray-700">AI 建议词条</div>
          <span className="text-xs text-gray-400">基于品牌资产库文档自动识别</span>
        </div>
        <div className="space-y-2">
          {[
            { zh: '协作机器人', en: 'Collaborative Robot (Cobot)', count: 12 },
            { zh: '末端执行器', en: 'End Effector', count: 8 },
            { zh: '伺服电机', en: 'Servo Motor', count: 6 },
          ].map((s) => (
            <div key={s.zh} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">{s.zh}</span>
                <span className="text-xs text-gray-400">→</span>
                <span className="text-sm text-gray-500">{s.en}</span>
                <span className="text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">文档中出现 {s.count} 次</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-xs px-2.5 py-1 rounded-lg text-white"
                  style={{ backgroundColor: PRIMARY }}
                >
                  加入词库
                </button>
                <button className="text-xs px-2.5 py-1 rounded-lg border border-gray-200 text-gray-500">忽略</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
