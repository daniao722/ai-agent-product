import { useState } from 'react'

const PRIMARY = '#C9A227'

const INITIAL_MESSAGES = [
  { role: 'agent', content: ' 您好！我是您的内容智能助手。我可以帮助您完成以下操作：\n\n• 智能内容创作（文案、图片、视频）\n• 精准内容发布（官网、社媒多渠道）\n• 实时效果数据查询\n• 内容优化指令下达\n\n请告诉我您的需求，例如："帮我写一篇关于 X500 伺服电机的产品宣传文章"' },
]

const QUICK_ACTIONS = [
  { label: '写一篇产品文章', icon: '✍️' },
  { label: '生成营销海报', icon: '🎨' },
  { label: '翻译内容到英文', icon: '🌐' },
  { label: '查询内容效果数据', icon: '📊' },
]

export default function AgentChat({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    // Simulate agent response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', content: '收到您的需求！正在为您处理中...\n\n基于您的品牌资料库，我已生成内容草稿。您可以在"AI 文案工场"中查看和编辑。\n\n是否需要直接发布到指定渠道？' },
      ])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-2xl rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                msg.role === 'user'
                  ? 'text-white'
                  : 'bg-white border border-gray-100 text-gray-700 shadow-sm'
              }`}
              style={msg.role === 'user' ? { backgroundColor: PRIMARY } : {}}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-2">
        <div className="flex gap-2 flex-wrap">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              onClick={() => setInput(a.label)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-amber-300 hover:bg-amber-50 transition-all"
            >
              <span>{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="输入您的需求，例如：帮我写一篇关于 X500 伺服电机的产品宣传文章..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-xl text-white text-sm font-medium shadow-sm hover:opacity-90"
            style={{ backgroundColor: PRIMARY }}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  )
}
