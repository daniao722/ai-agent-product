import { useState } from 'react';
import {
  Headphones,
  Send,
  Bot,
  User,
  Plus,
  Edit,
  TrendingUp
} from 'lucide-react';

const mockChatHistory = [
  { id: '1', customer: '张三', company: 'ABC科技', message: '您好，我想咨询一下工业机器人的操作培训服务', time: '10:30', source: 'website', status: 'resolved' },
  { id: '2', customer: 'AI客服', type: 'bot', message: '您好！我是AI客服，很高兴为您服务。关于操作培训，我们提供以下服务：\n1. 线上视频培训（免费）\n2. 现场实操培训（付费）\n3. 定制化培训方案\n\n请问您对哪种方式感兴趣？', time: '10:30' },
  { id: '3', customer: '张三', company: 'ABC科技', message: '对现场实操培训比较感兴趣，请问怎么收费？', time: '10:32', source: 'website', status: 'resolved' },
  { id: '4', customer: 'AI客服', type: 'bot', message: '现场实操培训根据内容和时长收费：\n- 标准课程（2天）：¥5000/人\n- 高级课程（5天）：¥12000/人\n- 企业内训（定制）：需评估后报价\n\n您公司有多少人需要参加培训呢？我可以为您推荐最合适的方案。', time: '10:32' },
];

const mockAIResponses = [
  { keyword: '价格咨询', response: '您好，我们的产品价格根据型号和配置不同，从15万到80万不等。具体报价需要根据您的生产需求定制。', usage: 234 },
  { keyword: '培训服务', response: '我们提供线上视频培训和现场实操培训两种方式。现场培训标准课程¥5000/人，高级课程¥12000/人。', usage: 156 },
  { keyword: '售后服务', response: '我们提供12个月免费质保，以及终身技术支持。响应时间为：紧急问题4小时内，一般问题24小时内。', usage: 189 },
];

export default function AISupport() {
  const [message, setMessage] = useState('');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">AI客服</h1>
          <p className="text-gray-500 mt-1">智能客服对话与知识库管理</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：实时会话面板 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">实时会话</h3>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex-1 h-[500px] overflow-y-auto space-y-4">
            {mockChatHistory.map((chat) => (
              <div key={chat.id} className={`flex ${chat.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] ${chat.type === 'bot' ? 'order-1' : ''}`}>
                  <div className={`rounded-2xl p-4 ${
                    chat.type === 'bot'
                      ? 'bg-white border border-gray-200'
                      : 'bg-blue-600 text-white'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {chat.type === 'bot' ? (
                        <>
                          <Bot className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-600">AI客服</span>
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4 text-white" />
                          <span className="text-sm font-medium">{chat.customer}</span>
                        </>
                      )}
                      <span className="text-xs opacity-60">{chat.time}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 底部：消息输入框和发送按钮 */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="输入消息..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <Send className="w-4 h-4" />
                发送
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：AI回复知识库 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">AI回复知识库</h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {mockAIResponses.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                    {item.keyword}
                  </span>
                  <span className="text-xs text-gray-500">使用 {item.usage} 次</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.response}</p>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                    <Edit size={12} />
                    编辑
                  </button>
                  <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
                    <TrendingUp size={12} />
                    查看使用统计
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg py-3 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              添加知识库条目
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
