import {
  MessageSquare,
  Zap,
  Star,
  Edit,
  Send,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

const mockAIReplies = [
  { id: '1', type: '产品咨询', subject: '工业机器人价格咨询', content: '尊敬的用户，感谢您的咨询。我们的工业机器人产品线覆盖多种型号，从入门级到高端配置价格从15万到80万不等。具体价格取决于您的生产需求和配置要求。', quality: 95 },
  { id: '2', type: '技术方案', subject: '自动化改造方案咨询', content: '您好，针对您的自动化改造需求，我们建议采用"智能协作机器人+视觉系统"的组合方案。该方案可提升生产效率40%以上，投资回报周期约18个月。', quality: 88 },
  { id: '3', type: '商务合作', subject: '代理商合作咨询', content: '感谢您对我们产品的认可。我们诚邀有志之士成为区域代理商。代理政策包括：极具竞争力的代理价格、全面的技术培训、丰富的市场支持。', quality: 92 },
];

export default function SmartReply() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">智能回复</h1>
          <p className="text-gray-500 mt-1">AI驱动的客户咨询自动回复</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Zap className="w-4 h-4" />
          <span>启用AI自动回复</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI回复列表 */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">AI回复列表</h3>
          {mockAIReplies.map((reply) => (
            <div key={reply.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {reply.type}
                  </span>
                  <span className="text-sm text-gray-500">{reply.subject}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{reply.quality}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{reply.content}</p>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  <Edit className="w-3 h-3" />
                  编辑
                </button>
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  <Send className="w-3 h-3" />
                  发送
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                  <RefreshCw className="w-3 h-3" />
                  重新生成
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI回复优势面板 */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white h-fit">
          <h4 className="font-semibold mb-4 text-lg">AI回复优势</h4>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-medium">5秒极速响应</span>
              </div>
              <p className="text-sm opacity-80">24小时即时回复，不流失任何商机</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">RAG知识库支撑</span>
              </div>
              <p className="text-sm opacity-80">基于企业真实数据，避免AI幻觉</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">多版本草稿</span>
              </div>
              <p className="text-sm opacity-80">生成3个版本供选择，质量更有保障</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
