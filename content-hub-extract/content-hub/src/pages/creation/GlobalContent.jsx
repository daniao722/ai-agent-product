import { useState } from 'react'

const PRIMARY = '#C9A227'

const LANGUAGES = [
  { code: 'en', label: '英语 English', flag: '🇬🇧' },
  { code: 'de', label: '德语 Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: '法语 Français', flag: '🇫🇷' },
  { code: 'es', label: '西班牙语 Español', flag: '🇪🇸' },
  { code: 'ar', label: '阿拉伯语 العربية', flag: '🇸🇦' },
  { code: 'ja', label: '日语 日本語', flag: '🇯🇵' },
  { code: 'ko', label: '韩语 한국어', flag: '🇰🇷' },
  { code: 'ru', label: '俄语 Русский', flag: '🇷🇺' },
]

const SOURCE_TEXT = `凭借20年门窗行业深耕积累，我司推出全新断桥铝隔热门窗系列。采用德国SCHÜCO铝合金型材，PA66尼龙断桥工艺，导热系数低至0.15 W/(m·K)，较传统铝合金门窗节能效率提升42%。

产品通过ISO 10077-1欧洲节能认证，适配欧洲被动房标准（Passive House），适用于商业建筑幕墙及高端住宅改造场景。`

const TRANSLATIONS = {
  en: `With 20 years of deep expertise in the door and window industry, we present our latest Thermal-Break Aluminum Window & Door series. Engineered with German SCHÜCO aluminum profiles and PA66 nylon thermal-break technology, achieving a heat conductivity as low as 0.15 W/(m·K) — 42% more energy-efficient than conventional aluminum systems.

Certified to ISO 10077-1 European Energy Efficiency Standard and compliant with the Passive House Institute (PHI) requirements, our products are ideal for commercial curtain walls and premium residential renovation projects.`,
  de: `Mit 20 Jahren Erfahrung in der Fenster- und Türenbranche stellen wir unsere neueste Thermisch-Gebrochene Aluminium-Fenster & Türen-Serie vor. Gefertigt mit deutschen SCHÜCO-Aluminiumprofilen und PA66-Nylon-Thermisch-Bruch-Technologie, mit einem Wärmedurchgangskoeffizienten von nur 0,15 W/(m·K) — 42% energieeffizienter als herkömmliche Aluminiumsysteme.

Zertifiziert nach ISO 10077-1 Europäischer Energieeffizienz-Norm und konform mit den Anforderungen des Passivhaus-Instituts (PHI).`,
}

const CULTURE_NOTES = {
  de: [
    { type: 'ok', text: '"Passivhaus" — 德语市场对被动房认证认知度高，保留原词效果更好' },
    { type: 'ok', text: 'DIN标准在德国更具权威性，可补充 DIN EN ISO 10077 认证表述' },
    { type: 'warn', text: '"42%提升"等具体数据在德语市场需提供第三方检测机构背书' },
  ],
  en: [
    { type: 'ok', text: '"Passive House" 在英语市场通用，PHI认证在欧美建筑商中认可度高' },
    { type: 'ok', text: '使用英制/公制双单位可提升北美市场接受度' },
    { type: 'warn', text: '"Energy-efficient" 表述在美国市场建议关联 ENERGY STAR 认证' },
  ],
}

export default function GlobalContent() {
  const [sourceLang] = useState('zh')
  const [targetLang, setTargetLang] = useState('de')
  const [translated, setTranslated] = useState(true)
  const [translating, setTranslating] = useState(false)

  const translate = () => {
    setTranslating(true)
    setTimeout(() => { setTranslating(false); setTranslated(true) }, 1500)
  }

  const notes = CULTURE_NOTES[targetLang] || CULTURE_NOTES.en
  const translationText = TRANSLATIONS[targetLang] || TRANSLATIONS.en

  return (
    <div className="p-6 space-y-4">
      {/* Language Selector */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-xs font-semibold text-gray-500">源语言：</div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
            <span>🇨🇳</span>
            <span className="text-sm text-gray-700">中文</span>
          </div>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
          </svg>
          <div className="text-xs font-semibold text-gray-500">目标语言：</div>
          <div className="flex gap-2 flex-wrap">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setTargetLang(l.code); setTranslated(false) }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                  targetLang === l.code ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={targetLang === l.code ? { backgroundColor: PRIMARY } : {}}
              >
                <span>{l.flag}</span>
                <span>{l.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Translation Panel */}
      <div className="grid grid-cols-2 gap-4">
        {/* Source */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-700">中文原文</div>
            <span className="text-xs text-gray-400">{SOURCE_TEXT.length} 字</span>
          </div>
          <textarea
            value={SOURCE_TEXT}
            className="w-full text-sm border border-gray-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 resize-none text-gray-700 leading-relaxed bg-gray-50"
            rows={10}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-amber-600">消耗 10 豆子 / 1000字</span>
            <button
              onClick={translate}
              className="px-4 py-2 rounded-xl text-white text-xs font-medium"
              style={{ backgroundColor: PRIMARY }}
            >
              {translating ? '翻译中...' : '✨ AI翻译 + 本地化优化'}
            </button>
          </div>
        </div>

        {/* Target */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-700">
              {LANGUAGES.find(l => l.code === targetLang)?.label} 译文
            </div>
            {translated && <span className="text-xs text-green-600">✓ 翻译完成</span>}
          </div>
          {translated ? (
            <>
              <textarea
                value={translationText}
                className="w-full text-sm border border-gray-100 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 resize-none text-gray-700 leading-relaxed bg-gray-50"
                rows={10}
              />
              <div className="flex justify-end gap-2 mt-3">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600">复制</button>
                <button className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>
                  SEO优化 + 发布
                </button>
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
              翻译结果将显示在这里
            </div>
          )}
        </div>
      </div>

      {/* Cultural Adaptation Notes */}
      {translated && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">
            文化适配检测报告 · {LANGUAGES.find(l => l.code === targetLang)?.label}市场
          </div>
          <div className="space-y-2">
            {notes.map((note, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 px-3 py-2.5 rounded-xl text-xs ${
                  note.type === 'ok' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                }`}
              >
                <span className="flex-shrink-0 mt-0.5">{note.type === 'ok' ? '✅' : '⚠️'}</span>
                <span>{note.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
