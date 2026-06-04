import { useState } from 'react'

const PRIMARY = '#C9A227'

const VIDEO_TYPES = [
  { id: 'demo', label: '产品演示', duration: '30-60秒', beans: 200, icon: '📦' },
  { id: 'brand', label: '品牌宣传片', duration: '1-2分钟', beans: 350, icon: '🏆' },
  { id: 'short', label: '社媒短视频', duration: '15-60秒', beans: 200, icon: '📱' },
  { id: 'tutorial', label: '操作教程', duration: '2-5分钟', beans: 350, icon: '📖' },
  { id: 'case', label: '客户案例', duration: '60-90秒', beans: 200, icon: '🤝' },
]

const SCRIPT_SAMPLE = `[开场 0-5s]
镜头：工厂外景，宏大航拍视角，晨光照射

旁白（数字人）：
"每一扇门窗的背后，是20年的工艺传承。"

[产品特写 5-20s]
镜头：断桥铝型材切面，PA66尼龙腔体细节特写

旁白：
"采用德国SCHÜCO铝合金型材，三腔断桥结构，
导热系数低至0.15 W/(m·K)——
比传统铝合金节能42%。"

[认证画面 20-35s]
镜头：ISO认证证书，欧洲CE标志，被动房认证

旁白：
"通过ISO 10077欧洲节能认证，
满足欧洲被动房Passive House最严苛标准。"

[结尾CTA 35-45s]
镜头：成品窗户安装实景，家庭使用场景

旁白：
"超过1,200家企业的选择。
立即联系我们，获取免费方案定制。"
`

const steps = ['选择类型', '生成脚本', '确认脚本', '生成视频']

export default function VideoFactory() {
  const [videoType, setVideoType] = useState('demo')
  const [step, setStep] = useState(1)
  const [scriptGenerated, setScriptGenerated] = useState(true)
  const [platform, setPlatform] = useState('Instagram')
  const [avatar, setAvatar] = useState(true)

  const selectedType = VIDEO_TYPES.find((v) => v.id === videoType)

  return (
    <div className="p-6 space-y-5">
      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-4">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: i < step ? PRIMARY : i === step ? PRIMARY : '#E5E7EB',
                    color: i <= step ? 'white' : '#9CA3AF',
                  }}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <div className={`text-xs mt-1 ${i <= step ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{s}</div>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < step ? '' : 'bg-gray-200'}`}
                  style={i < step ? { backgroundColor: PRIMARY } : {}} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left Config */}
        <div className="col-span-1 space-y-4">
          {/* Video Type */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">视频类型</div>
            <div className="space-y-2">
              {VIDEO_TYPES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVideoType(v.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                    videoType === v.id ? 'border-amber-400' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={videoType === v.id ? { backgroundColor: '#FBF5E0' } : {}}
                >
                  <span className="text-lg">{v.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-700">{v.label}</div>
                    <div className="text-xs text-gray-400">{v.duration}</div>
                  </div>
                  <span className="text-xs text-amber-600">{v.beans}豆</span>
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">目标平台</div>
            <div className="grid grid-cols-2 gap-1.5">
              {['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Facebook', '抖音'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`text-xs py-1.5 rounded-lg border transition-all ${
                    platform === p ? 'text-white border-transparent' : 'border-gray-200 text-gray-600'
                  }`}
                  style={platform === p ? { backgroundColor: PRIMARY } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Digital Avatar */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-gray-700">数字人播报</div>
              <button
                onClick={() => setAvatar(!avatar)}
                className={`w-10 h-5 rounded-full transition-all relative`}
                style={{ backgroundColor: avatar ? PRIMARY : '#E5E7EB' }}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${avatar ? 'left-5' : 'left-0.5'}`} />
              </button>
            </div>
            {avatar && (
              <div className="flex gap-2 mt-2">
                {['👩‍💼', '👨‍💼', '👩', '👨'].map((a, i) => (
                  <button key={i} className={`w-10 h-10 rounded-xl border-2 text-xl flex items-center justify-center transition-all ${i === 0 ? 'border-amber-400' : 'border-gray-200'}`}>
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">内容主题</div>
            <textarea
              rows={3}
              defaultValue="断桥铝节能门窗，突出工厂实力、欧洲认证、节能效率，面向欧洲建筑商"
              className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-amber-400 resize-none"
            />
            <button
              onClick={() => setStep(1)}
              className="mt-2 w-full py-2 rounded-xl text-white text-xs font-medium"
              style={{ backgroundColor: PRIMARY }}
            >
              ✨ 生成视频脚本
            </button>
          </div>
        </div>

        {/* Right: Script Editor */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-700">视频脚本</div>
              {scriptGenerated && (
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">重新生成</button>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs px-3 py-1.5 rounded-lg text-white font-medium"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    确认脚本，生成视频
                  </button>
                </div>
              )}
            </div>

            {scriptGenerated ? (
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                  <span>类型：{selectedType?.label}</span>
                  <span>·</span>
                  <span>时长：{selectedType?.duration}</span>
                  <span>·</span>
                  <span>平台：{platform}</span>
                  <span>·</span>
                  <span className="text-amber-600">消耗 {selectedType?.beans} 豆子</span>
                </div>
                <textarea
                  value={SCRIPT_SAMPLE}
                  className="w-full text-xs border border-gray-200 rounded-xl px-3 py-3 focus:outline-none focus:border-amber-400 resize-none leading-relaxed font-mono"
                  rows={24}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-3">🎬</div>
                  <div className="text-sm">填写内容主题后，AI将自动生成专业视频脚本</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
