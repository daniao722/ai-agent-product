import { useState } from 'react';
import {
  Globe,
  Languages,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Copy,
  Search,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  BookOpen,
  MapPin,
  X,
  ChevronDown,
  Check,
  Info,
} from 'lucide-react';

// 语言选项
const languageOptions = [
  { code: 'zh', name: '中文', flag: '🇨🇳', region: '中国大陆' },
  { code: 'en', name: 'English', flag: '🇺🇸', region: '美国' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', region: '日本' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', region: '韩国' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', region: '德国' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', region: '法国' },
  { code: 'es', name: 'Español', flag: '🇪🇸', region: '西班牙' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', region: '沙特阿拉伯' },
];

// 文化适配检测项目
const cultureCheckItems = [
  { id: 'color', name: '色彩文化', description: '检查颜色在当地文化中的含义', icon: '🎨' },
  { id: 'symbol', name: '符号象征', description: '检查符号和图案的文化含义', icon: '🔣' },
  { id: 'religion', name: '宗教敏感', description: '避免宗教禁忌内容', icon: '🙏' },
  { id: 'holiday', name: '节日习俗', description: '符合当地节日传统', icon: '🎉' },
  { id: 'humor', name: '幽默理解', description: '检查幽默是否跨文化适用', icon: '😄' },
  { id: 'gesture', name: '肢体语言', description: '检查手势和动作的含义', icon: '👋' },
];

// SEO分析数据
const seoAnalysisData = [
  { language: '中文', score: 92, keywords: 15, traffic: '12.5K', trend: '+15%' },
  { language: 'English', score: 88, keywords: 18, traffic: '28.3K', trend: '+22%' },
  { language: '日本語', score: 85, keywords: 12, traffic: '8.7K', trend: '+8%' },
  { language: 'Deutsch', score: 90, keywords: 14, traffic: '6.2K', trend: '+12%' },
  { language: 'Français', score: 87, keywords: 13, traffic: '5.1K', trend: '+10%' },
];

// 本地化优化建议
const localizationSuggestions = [
  { id: 1, type: 'improvement', title: '关键词优化', description: '建议在日语版本中加入更多长尾关键词，提升搜索排名', impact: 'high', region: '日本' },
  { id: 2, type: 'warning', title: '文化适配提醒', description: '德语版本中的某些表达可能过于直接，建议调整语气', impact: 'medium', region: '德国' },
  { id: 3, type: 'opportunity', title: '市场机会', description: '阿拉伯语版本在沙特地区表现优异，建议增加投放预算', impact: 'high', region: '沙特阿拉伯' },
  { id: 4, type: 'improvement', title: '图片本地化', description: '西班牙语版本建议使用更多本地化图片，提升用户共鸣', impact: 'medium', region: '西班牙' },
];

// 翻译历史记录
const translationHistory = [
  { id: 1, source: '中文', target: 'English', content: '智能制造解决方案', status: 'completed', time: '2分钟前' },
  { id: 2, source: 'English', target: '日本語', content: 'Industrial Automation', status: 'completed', time: '15分钟前' },
  { id: 3, source: '中文', target: 'Deutsch', content: '数字化转型服务', status: 'completed', time: '1小时前' },
];

export default function GlobalContent() {
  const [sourceLang, setSourceLang] = useState('zh');
  const [targetLang, setTargetLang] = useState('en');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState<'source' | 'target' | null>(null);
  const [cultureScore, setCultureScore] = useState(85);
  const [selectedRegion, setSelectedRegion] = useState('美国');
  const [showCultureModal, setShowCultureModal] = useState(false);
  const [showSEOModal, setShowSEOModal] = useState(false);
  const [selectedSEOItem, setSelectedSEOItem] = useState<typeof seoAnalysisData[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'translate' | 'culture' | 'optimize' | 'seo'>('translate');
  const [checkedItems, setCheckedItems] = useState<string[]>(['color', 'symbol', 'religion']);
  const [showTermBank, setShowTermBank] = useState(false);

  const handleTranslate = () => {
    if (!inputText.trim()) {
      alert('请输入需要翻译的内容');
      return;
    }
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      const targetLangName = languageOptions.find(l => l.code === targetLang)?.name || 'English';
      setTranslatedText(`[${targetLangName} Translation]\n\n${inputText}\n\n【AI翻译完成】专业术语已自动匹配，文化适配建议已生成。`);
    }, 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  const handleCultureCheck = () => {
    setShowCultureModal(true);
    // 模拟检测过程
    setTimeout(() => {
      setCultureScore(Math.floor(Math.random() * 15) + 80);
    }, 1500);
  };

  const toggleCheckItem = (itemId: string) => {
    setCheckedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSEOClick = (item: typeof seoAnalysisData[0]) => {
    setSelectedSEOItem(item);
    setShowSEOModal(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* 顶部标题和描述 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">全球化内容中心</h1>
            <p className="text-indigo-100">智能翻译引擎 + 文化适配检测 + 本地化优化 + 多语言SEO</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-300" />
            <span className="text-sm">支持8种语言</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-300" />
            <span className="text-sm">专业术语库</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-300" />
            <span className="text-sm">AI文化适配</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-300" />
            <span className="text-sm">多语言SEO优化</span>
          </div>
        </div>
      </div>

      {/* 导航标签 */}
      <div className="flex items-center gap-2 bg-white rounded-xl p-2 border border-gray-100">
        {[
          { id: 'translate', label: '智能翻译', icon: Languages },
          { id: 'culture', label: '文化适配', icon: MapPin },
          { id: 'optimize', label: '本地化优化', icon: Zap },
          { id: 'seo', label: '多语言SEO', icon: Search },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 智能翻译引擎区域 */}
      {activeTab === 'translate' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 翻译主区域 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-indigo-600" />
                  智能翻译引擎
                </h3>
                <button
                  onClick={() => setShowTermBank(true)}
                  className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <BookOpen className="w-4 h-4" />
                  专业术语库
                </button>
              </div>

              {/* 语言选择 */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                  <label className="block text-xs text-gray-500 mb-1">源语言</label>
                  <button
                    onClick={() => setShowLangDropdown(showLangDropdown === 'source' ? null : 'source')}
                    className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{languageOptions.find(l => l.code === sourceLang)?.flag}</span>
                      <span>{languageOptions.find(l => l.code === sourceLang)?.name}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showLangDropdown === 'source' && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setSourceLang(lang.code); setShowLangDropdown(null); }}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="flex-1">{lang.name}</span>
                          {sourceLang === lang.code && <Check className="w-4 h-4 text-indigo-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => { setSourceLang(targetLang); setTargetLang(sourceLang); }}
                  className="mt-5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-gray-500" />
                </button>

                <div className="flex-1 relative">
                  <label className="block text-xs text-gray-500 mb-1">目标语言</label>
                  <button
                    onClick={() => setShowLangDropdown(showLangDropdown === 'target' ? null : 'target')}
                    className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{languageOptions.find(l => l.code === targetLang)?.flag}</span>
                      <span>{languageOptions.find(l => l.code === targetLang)?.name}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showLangDropdown === 'target' && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setTargetLang(lang.code); setShowLangDropdown(null); }}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="flex-1">{lang.name}</span>
                          {targetLang === lang.code && <Check className="w-4 h-4 text-indigo-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 输入区域 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="请输入需要翻译的内容..."
                    className="w-full h-48 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">{inputText.length} 字符</span>
                    <button
                      onClick={() => setInputText('')}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      清空
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={translatedText}
                    readOnly
                    placeholder="翻译结果将显示在这里..."
                    className="w-full h-48 p-4 border border-gray-200 rounded-lg resize-none bg-gray-50"
                  />
                  {translatedText && (
                    <button
                      onClick={() => handleCopy(translatedText)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* 翻译按钮 */}
              <button
                onClick={handleTranslate}
                disabled={isTranslating}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
              >
                {isTranslating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>AI翻译中...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>开始翻译</span>
                  </>
                )}
              </button>
            </div>

            {/* 翻译历史 */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">最近翻译</h4>
              <div className="space-y-2">
                {translationHistory.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">{item.source}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-gray-600">{item.target}</span>
                    </div>
                    <div className="flex-1 text-sm text-gray-700 truncate">{item.content}</div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：翻译统计 */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
              <h4 className="font-medium mb-4">本月翻译统计</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-indigo-100">翻译次数</span>
                  <span className="text-2xl font-bold">1,248</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-100">字符总量</span>
                  <span className="text-2xl font-bold">856K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-100">准确率</span>
                  <span className="text-2xl font-bold">98.5%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">热门语言对</h4>
              <div className="space-y-3">
                {[
                  { pair: '中文 → English', percent: 45 },
                  { pair: 'English → 日本語', percent: 25 },
                  { pair: '中文 → Deutsch', percent: 15 },
                  { pair: 'English → Français', percent: 10 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.pair}</span>
                      <span className="text-gray-500">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 文化适配检测区域 */}
      {activeTab === 'culture' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  文化适配检测
                </h3>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">目标市场:</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.code} value={lang.region}>{lang.region}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 评分展示 */}
              <div className="flex items-center gap-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#f97316"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${cultureScore * 2.51} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">{cultureScore}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">文化适配评分</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    内容基本符合{selectedRegion}的文化习惯，建议关注色彩和符号方面的细节调整。
                  </p>
                  <button
                    onClick={handleCultureCheck}
                    className="mt-3 flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700"
                  >
                    <RefreshCw className="w-4 h-4" />
                    重新检测
                  </button>
                </div>
              </div>

              {/* 检测项目列表 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cultureCheckItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheckItem(item.id)}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      checkedItems.includes(item.id)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      {checkedItems.includes(item.id) && (
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                    <h5 className="font-medium text-gray-800 text-sm">{item.name}</h5>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 检测结果详情 */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">检测详情</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-green-800 text-sm">色彩文化检查通过</h5>
                    <p className="text-xs text-green-600 mt-1">当前配色方案在{selectedRegion}文化中无负面含义</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-800 text-sm">符号象征建议调整</h5>
                    <p className="text-xs text-yellow-600 mt-1">建议使用更中性的图标设计，避免可能的误解</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-green-800 text-sm">宗教敏感检查通过</h5>
                    <p className="text-xs text-green-600 mt-1">内容未涉及宗教敏感话题</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：文化指南 */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 text-white">
              <h4 className="font-medium mb-3">{selectedRegion}文化指南</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>重视直接、清晰的沟通方式</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>蓝色和白色是受欢迎的颜色</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>避免使用过于复杂的隐喻</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">常见文化差异</h4>
              <div className="space-y-3">
                {[
                  { region: '美国', tip: '偏好直接表达' },
                  { region: '日本', tip: '重视礼貌用语' },
                  { region: '德国', tip: '注重细节准确' },
                  { region: '沙特', tip: '避免人物图像' },
                ].map((item) => (
                  <div key={item.region} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{item.region}</span>
                    <span className="text-xs text-gray-500">{item.tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 本地化优化区域 */}
      {activeTab === 'optimize' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-600" />
                本地化优化建议
              </h3>

              <div className="space-y-4">
                {localizationSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      suggestion.impact === 'high'
                        ? 'border-l-red-500 bg-red-50'
                        : 'border-l-yellow-500 bg-yellow-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-800">{suggestion.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            suggestion.impact === 'high'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {suggestion.impact === 'high' ? '高优先级' : '中优先级'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{suggestion.region}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert(`已应用优化建议: ${suggestion.title}`)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        应用
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 优化效果预览 */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">优化效果对比</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">优化前</span>
                  </div>
                  <p className="text-sm text-gray-600">我们的产品质量很好，价格也很优惠。</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>点击率: 2.3%</span>
                    <span>转化率: 1.1%</span>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-green-200 text-green-800 rounded">优化后</span>
                  </div>
                  <p className="text-sm text-gray-700">采用德国精密工艺制造，通过ISO9001质量认证，提供30天无理由退换保障。</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-green-700">
                    <span>点击率: 4.8% ↑109%</span>
                    <span>转化率: 2.9% ↑164%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：市场数据 */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-5 text-white">
              <h4 className="font-medium mb-4">本地化效果统计</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-100">平均点击率提升</span>
                    <span className="text-xl font-bold">+45%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full mt-1">
                    <div className="h-full bg-white rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-100">转化率提升</span>
                    <span className="text-xl font-bold">+32%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full mt-1">
                    <div className="h-full bg-white rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-100">用户停留时长</span>
                    <span className="text-xl font-bold">+68%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full mt-1">
                    <div className="h-full bg-white rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">各市场表现</h4>
              <div className="space-y-3">
                {[
                  { region: '美国', score: 92, trend: '+15%' },
                  { region: '德国', score: 88, trend: '+12%' },
                  { region: '日本', score: 85, trend: '+8%' },
                  { region: '沙特', score: 90, trend: '+22%' },
                ].map((item) => (
                  <div key={item.region} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">{item.region}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-green-600">{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 多语言SEO区域 */}
      {activeTab === 'seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Search className="w-5 h-5 text-green-600" />
                  多语言SEO分析
                </h3>
                <button
                  onClick={() => alert('正在生成SEO报告...')}
                  className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
                >
                  <BarChart3 className="w-4 h-4" />
                  生成报告
                </button>
              </div>

              {/* SEO数据表格 */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">语言</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">SEO评分</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">关键词数</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">月流量</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-600">趋势</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoAnalysisData.map((item) => (
                      <tr key={item.language} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <span className="font-medium text-gray-800">{item.language}</span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 h-2 bg-gray-100 rounded-full">
                              <div
                                className={`h-full rounded-full ${getScoreBg(item.score)}`}
                                style={{ width: `${item.score}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                              {item.score}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center text-sm text-gray-600">{item.keywords}</td>
                        <td className="py-3 px-2 text-center text-sm text-gray-600">{item.traffic}</td>
                        <td className="py-3 px-2 text-center">
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            {item.trend}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => handleSEOClick(item)}
                            className="text-sm text-green-600 hover:text-green-700"
                          >
                            详情
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 关键词排名 */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">热门关键词排名</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { keyword: '智能制造', rank: 3, volume: '12.5K', lang: '中文' },
                  { keyword: 'Smart Manufacturing', rank: 5, volume: '28.3K', lang: 'English' },
                  { keyword: 'スマート工場', rank: 8, volume: '8.7K', lang: '日本語' },
                  { keyword: 'Industrie 4.0', rank: 2, volume: '15.2K', lang: 'Deutsch' },
                  { keyword: '数字化转型', rank: 4, volume: '9.8K', lang: '中文' },
                  { keyword: 'Digital Transformation', rank: 6, volume: '22.1K', lang: 'English' },
                  { keyword: 'デジタル化', rank: 7, volume: '6.5K', lang: '日本語' },
                  { keyword: 'Digitale Transformation', rank: 3, volume: '11.8K', lang: 'Deutsch' },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">{item.lang}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        item.rank <= 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        #{item.rank}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800 text-sm truncate">{item.keyword}</p>
                    <p className="text-xs text-gray-500 mt-1">月搜索: {item.volume}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：SEO工具 */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-5 text-white">
              <h4 className="font-medium mb-4">SEO健康度</h4>
              <div className="text-center py-4">
                <div className="text-5xl font-bold">88</div>
                <div className="text-green-100 mt-1">整体评分</div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-100">技术SEO</span>
                  <span>95/100</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-100">内容质量</span>
                  <span>88/100</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-100">用户体验</span>
                  <span>82/100</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">SEO优化建议</h4>
              <div className="space-y-3">
                {[
                  { title: '添加结构化数据', priority: 'high' },
                  { title: '优化页面加载速度', priority: 'medium' },
                  { title: '增加内部链接', priority: 'medium' },
                  { title: '完善Meta描述', priority: 'low' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{item.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.priority === 'high' ? 'bg-red-100 text-red-700' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h4 className="font-medium text-gray-800 mb-3">流量趋势</h4>
              <div className="h-32 flex items-end gap-1">
                {[40, 55, 45, 60, 75, 65, 80, 70, 85, 90, 88, 95].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-green-100 rounded-t hover:bg-green-200 transition-colors"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>1月</span>
                <span>6月</span>
                <span>12月</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 术语库弹窗 */}
      {showTermBank && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                专业术语库
              </h2>
              <button onClick={() => setShowTermBank(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {[
                  { term: 'Industrial Automation', translations: { zh: '工业自动化', ja: '産業自動化', de: 'Industrielle Automation' }, category: '技术' },
                  { term: 'Digital Transformation', translations: { zh: '数字化转型', ja: 'デジタルトランスフォーメーション', de: 'Digitale Transformation' }, category: '商业' },
                  { term: 'Smart Manufacturing', translations: { zh: '智能制造', ja: 'スマート製造', de: 'Intelligente Fertigung' }, category: '技术' },
                  { term: 'Supply Chain', translations: { zh: '供应链', ja: 'サプライチェーン', de: 'Lieferkette' }, category: '商业' },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-800">{item.term}</span>
                      <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">{item.category}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {Object.entries(item.translations).map(([lang, trans]) => (
                        <div key={lang} className="flex items-center gap-1">
                          <span className="text-gray-400 text-xs">{lang.toUpperCase()}:</span>
                          <span className="text-gray-700">{trans}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO详情弹窗 */}
      {showSEOModal && selectedSEOItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">{selectedSEOItem.language} SEO详情</h2>
              <button onClick={() => setShowSEOModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedSEOItem.score)}`}>
                    {selectedSEOItem.score}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">SEO评分</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">{selectedSEOItem.keywords}</div>
                  <div className="text-sm text-gray-500 mt-1">优化关键词</div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-800">月访问量</span>
                  <span className="text-xl font-bold text-green-700">{selectedSEOItem.traffic}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>环比增长 {selectedSEOItem.trend}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">优化建议</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>增加长尾关键词覆盖，提升精准流量</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>优化页面标题和Meta描述，提高点击率</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>加强本地化内容建设，提升用户粘性</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button onClick={() => setShowSEOModal(false)} className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                关闭
              </button>
              <button
                onClick={() => { alert('已生成详细SEO报告'); setShowSEOModal(false); }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                导出报告
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
