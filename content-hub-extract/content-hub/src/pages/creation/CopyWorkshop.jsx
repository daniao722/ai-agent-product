import { useState } from 'react'

const PRIMARY = '#C9A227'

const CONTENT_TYPES = ['产品描述', '新闻稿', '社媒帖子', '邮件正文', '博客文章', '白皮书摘要', '公司简介', '活动通知']
const LENGTHS = [
  { label: '简短', desc: '100-200字', beans: 5 },
  { label: '中等', desc: '300-500字', beans: 5 },
  { label: '详细', desc: '800-1000字', beans: 15 },
  { label: '长篇', desc: '1500字+', beans: 30 },
]
const STYLES = ['专业', '活泼', '正式', '简洁', '详细']
const CHANNELS = ['官网', 'LinkedIn', 'Instagram', 'Facebook', '小红书', '邮件', '微信公众号']

const SAMPLE_OUTPUT = [
  {
    ver: 'A · 专业版',
    content: `凭借20年门窗行业深耕积累，我司推出全新断桥铝隔热门窗系列——以德国SCHÜCO铝合金型材为基础，采用PA66尼龙断桥工艺，导热系数低至0.15 W/(m·K)，较传统铝合金门窗节能效率提升42%。

产品通过ISO 10077-1欧洲节能认证，适配欧洲被动房标准（Passive House）及中国《建筑节能与可再生能源利用通用规范》GB 55015-2021要求，适用于商业建筑幕墙及高端住宅改造场景。

核心优势：三腔结构设计 / 12mm中空Low-E玻璃 / 隔声量≥42dB / 气密性6级 / 20年质保。`,
    score: 94,
  },
  {
    ver: 'B · 活泼版',
    content: `夏天烈日晒进来、冬天冷风灌进来？你家的窗户可能该「升级」了！

我们的断桥铝门窗，简单说就是——用科技「截断」热传导，让室内冬暖夏凉！配置12mm中空Low-E玻璃，隔热又隔噪，城市喧嚣瞬间安静下来。

已有超过15,000个家庭和1,200家企业选择了我们。工厂直供、极致性价比，安装完在房间里感受的第一口安静，绝对是今年最值得花的钱。

→ 点击了解方案详情，免费定制测量，48小时内报价`,
    score: 88,
  },
  {
    ver: 'C · 简洁版',
    content: `断桥铝隔热门窗 · 核心参数

• 型材：德国SCHÜCO / 国产冠铝
• 断桥工艺：PA66尼龙腔体
• 传热系数：Uw ≤ 1.5 W/(m²·K)
• 隔声量：≥ 42dB（STC 42）
• 气密等级：6级
• 适用场景：商业楼宇 / 高端住宅 / 工业厂房
• 认证：ISO 10077 / CE / 中国建筑节能认证
• 质保：整窗20年 / 五金配件5年`,
    score: 82,
  },
]

export default function CopyWorkshop() {
  const [contentType, setContentType] = useState('产品描述')
  const [length, setLength] = useState(0)
  const [selectedStyles, setSelectedStyles] = useState(['专业'])
  const [channel, setChannel] = useState('LinkedIn')
  const [multiVer, setMultiVer] = useState(true)
  const [prompt, setPrompt] = useState('断桥铝隔热门窗，目标客户为欧洲建筑商，强调节能认证和工厂实力')
  const [generated, setGenerated] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [selectedVer, setSelectedVer] = useState(0)

  const toggleStyle = (s) => {
    setSelectedStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const generate = () => {
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 1800)
  }

  const beans = multiVer ? Math.round(LENGTHS[length].beans * 2.5) : LENGTHS[length].beans

  return (
    <div className="p-6 flex gap-6 h-full">
      {/* Left Config Panel */}
      <div className="w-72 flex-shrink-0 space-y-4">
        {/* Content Type */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">内容类型</div>
          <div className="grid grid-cols-2 gap-1.5">
            {CONTENT_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setContentType(t)}
                className={`text-xs py-1.5 px-2 rounded-lg border transition-all ${
                  contentType === t ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={contentType === t ? { backgroundColor: PRIMARY, borderColor: PRIMARY } : {}}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Length */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">内容长度</div>
          <div className="space-y-1.5">
            {LENGTHS.map((l, i) => (
              <button
                key={l.label}
                onClick={() => setLength(i)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition-all ${
                  length === i ? 'border-transparent text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={length === i ? { backgroundColor: PRIMARY } : {}}
              >
                <span className="font-medium">{l.label}</span>
                <span className={length === i ? 'text-amber-100' : 'text-gray-400'}>{l.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">写作风格（可多选）</div>
          <div className="flex flex-wrap gap-1.5">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => toggleStyle(s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  selectedStyles.includes(s) ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={selectedStyles.includes(s) ? { backgroundColor: PRIMARY } : {}}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Channel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">目标渠道</div>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 bg-white"
          >
            {CHANNELS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Multi Version */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-700">生成3个版本</div>
              <div className="text-xs text-gray-400 mt-0.5">消耗 ×2.5 豆，对比选优</div>
            </div>
            <button
              onClick={() => setMultiVer(!multiVer)}
              className={`w-10 h-5 rounded-full transition-all relative ${multiVer ? '' : 'bg-gray-200'}`}
              style={multiVer ? { backgroundColor: PRIMARY } : {}}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${multiVer ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Input + Output */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Input */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">内容指令</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="描述你需要的内容，如：产品特点、目标受众、核心卖点、营销场景..."
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>📚 已启用知识库</span>
              <span className="text-gray-300">|</span>
              <span className="text-amber-600">预计消耗 {beans} 豆子</span>
            </div>
            <button
              onClick={generate}
              disabled={generating}
              className="px-5 py-2 rounded-xl text-white text-sm font-medium shadow-sm disabled:opacity-70 flex items-center gap-2"
              style={{ backgroundColor: PRIMARY }}
            >
              {generating && <span className="animate-spin">⟳</span>}
              {generating ? '生成中...' : '✨ 立即生成'}
            </button>
          </div>
        </div>

        {/* Output */}
        {generated && (
          <div className="flex-1 space-y-3 overflow-auto">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-gray-700">生成结果</div>
              <div className="flex gap-1">
                {SAMPLE_OUTPUT.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVer(i)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${selectedVer === i ? 'text-white border-transparent' : 'border-gray-200 text-gray-500'}`}
                    style={selectedVer === i ? { backgroundColor: PRIMARY } : {}}
                  >
                    {o.ver.split(' · ')[0]}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex gap-2">
                <button className="text-xs px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">内容裂变</button>
                <button className="text-xs px-3 py-1 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>采纳并发布</button>
              </div>
            </div>

            {SAMPLE_OUTPUT.map((o, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border shadow-sm p-4 cursor-pointer transition-all ${selectedVer === i ? 'border-amber-400 ring-1 ring-amber-400/30' : 'border-gray-200 opacity-70'}`}
                onClick={() => setSelectedVer(i)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold" style={{ color: PRIMARY }}>{o.ver}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${o.score >= 90 ? 'text-green-600' : 'text-amber-600'}`}>质量评分 {o.score}</span>
                    <button className="text-xs text-gray-400 hover:text-gray-600">复制</button>
                  </div>
                </div>
                <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">{o.content}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
