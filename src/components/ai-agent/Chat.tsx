import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: '您好！我是您的智能运营助手 🤖\n\n我可以帮您：\n- 📊 分析网站运营数据\n- 📝 生成内容建议\n- 🎯 优化关键词策略\n- 🔧 自动执行运营任务\n\n有什么可以帮您的吗？',
    timestamp: new Date(),
    suggestions: ['分析最近的运营情况', '帮我生成一些内容', '优化我的关键词'],
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '好的，让我为您分析一下...\n\n📈 **数据分析中...**\n- 正在获取流量数据\n- 正在分析关键词排名\n- 正在检查转化数据\n\n🔍 **分析完成！** 我发现：\n\n✨ **亮点：**\n- 流量增长 25% 🚀\n- 询盘量提升 18%\n\n⚠️ **需要关注：**\n- 跳出率上升 8%，建议优化落地页\n- 核心关键词排名有所下降\n\n💡 **建议：**\n1. 优化 3 个高跳出率页面\n2. 更新 5 篇博客内容\n3. 调整关键词策略\n\n需要我自动执行这些优化吗？',
        timestamp: new Date(),
        suggestions: ['生成优化任务清单', '查看详细报告', '自动执行优化'],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const chatHistory = [
    { id: '1', title: '网站运营分析', date: '今天 10:30', preview: '分析了最近的流量数据...' },
    { id: '2', title: '内容生成', date: '昨天 15:20', preview: '生成了3篇博客文章...' },
    { id: '3', title: '关键词优化', date: '3天前', preview: '优化了10个核心关键词...' },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col">
        <div className="border-b p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">💬 对话</h1>
            <p className="text-sm text-gray-500">与AI Agent自然对话</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'new'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              新建对话
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              对话历史
            </button>
          </div>
        </div>

        {activeTab === 'history' ? (
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-3">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{chat.title}</h3>
                    <span className="text-xs text-gray-500">{chat.date}</span>
                  </div>
                  <p className="text-sm text-gray-500">{chat.preview}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-50 text-gray-900'
                    } rounded-2xl px-4 py-3`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.suggestions && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSend(suggestion)}
                            className={`px-3 py-1.5 rounded-full text-sm border ${
                              message.role === 'user'
                                ? 'border-white/30 hover:bg-white/20'
                                : 'border-purple-200 text-purple-700 hover:bg-purple-50'
                            } transition-colors`}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              <div className="flex gap-3">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="请描述您的需求..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={1}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity font-medium"
                >
                  发送
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
