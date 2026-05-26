import { useState } from 'react';
import {
  Sparkles,
  Target,
  Shield,
  MessageCircle,
  BookOpen,
  Play,
  Send,
  Copy,
  Check,
  RefreshCw,
  Search,
  Filter,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Zap,
  Users,
  Award,
  TrendingUp,
  Clock,
  X,
  Mic,
  Bot,
  User,
  MoreHorizontal,
} from 'lucide-react';

// 模拟数据 - 话术推荐
const mockScripts = [
  {
    id: '1',
    scene: '初次接触',
    customerType: '决策者',
    title: '高管开场白',
    content: '张总您好，我是XX公司的销售顾问。了解到贵司在自动化升级方面的规划，我们帮助过类似规模的企业实现了生产效率提升40%，投资回报周期缩短至18个月。想占用您3分钟时间，分享一个可能对您有价值的案例。',
    tags: ['高效', '专业', '数据驱动'],
    usageCount: 1280,
    successRate: 85,
  },
  {
    id: '2',
    scene: '需求挖掘',
    customerType: '技术负责人',
    title: '痛点探询话术',
    content: '李工，目前产线的自动化程度如何？在日常运营中，哪些环节最占用人力？如果出现设备故障，平均停机时间是多少？这些数据将帮助我们为您定制最优方案。',
    tags: ['专业', '开放式问题'],
    usageCount: 956,
    successRate: 78,
  },
  {
    id: '3',
    scene: '价格谈判',
    customerType: '采购经理',
    title: '价值锚定话术',
    content: '王经理，我理解您对成本的关注。除了设备本身，我们的报价还包含：免费上门安装调试、3年质保、24小时响应服务、以及操作培训。单独这些服务的市场价值就超过8万元。',
    tags: ['价值销售', '异议处理'],
    usageCount: 1543,
    successRate: 82,
  },
];

// 模拟数据 - 竞品应对
const mockCompetitorResponses: Record<string, { strengths: string[]; responses: string[] }> = {
  'ABB': {
    strengths: ['品牌知名度高', '产品线齐全', '全球服务网络'],
    responses: [
      'ABB确实是行业标杆，但我们的本地化服务响应更快，平均故障处理时间比他们快40%',
      '在同等配置下，我们的价格通常低15-20%，且提供更灵活的付款方案',
      '我们的系统与国产设备兼容性更好，改造现有产线的成本更低',
    ],
  },
  '发那科': {
    strengths: ['技术领先', '精度高', '稳定性好'],
    responses: [
      '发那科在高端领域确实有优势，但对于您的应用场景，我们的性价比更高',
      '我们提供更完善的本土化技术支持，沟通成本更低',
      '我们的设备能耗更低，长期使用成本优势明显',
    ],
  },
  '库卡': {
    strengths: ['德国品质', '重载能力强', '汽车行业应用广'],
    responses: [
      '库卡在汽车制造领域很强，但我们的方案更适合您的行业特点',
      '我们提供更快的交付周期，通常比进口品牌快2-3个月',
      '备件供应更及时，不会因为国际物流延误生产',
    ],
  },
};

// 模拟数据 - 异议处理库
const mockObjections = [
  {
    id: '1',
    category: '价格',
    objection: '你们的价格比竞品贵太多了',
    response: '我理解您的顾虑。让我帮您算一笔账：虽然 upfront cost 高出10%，但我们的能耗低30%，维护成本每年节省约5万元，3年下来总拥有成本反而更低。而且我们提供0首付分期方案，可以缓解资金压力。',
    effectiveness: 92,
  },
  {
    id: '2',
    category: '价格',
    objection: '我需要再比较几家',
    response: '非常理解，货比三家是明智的。为了帮您更好地比较，我可以提供一份详细的对比清单，列出关键技术指标和服务差异。另外，如果您在本周内确认，我们可以锁定当前的优惠价格。',
    effectiveness: 88,
  },
  {
    id: '3',
    category: '信任',
    objection: '我没听说过你们公司',
    response: '感谢您的坦诚。我们专注这个行业12年，服务过300+企业。我可以安排您参观离我们最近的客户现场，您可以直接听听他们的使用体验。另外，我们支持分期付款，降低您的决策风险。',
    effectiveness: 90,
  },
  {
    id: '4',
    category: '时机',
    objection: '现在不是采购的好时机',
    response: '理解您的考虑。不过根据行业数据，现在正是设备更新换代的最佳时机：一是年底有税收优惠政策，二是原材料价格相对稳定，三是我们的交期现在是3个月，年后可能会延长到5个月。',
    effectiveness: 85,
  },
  {
    id: '5',
    category: '需求',
    objection: '我们现有的设备还能用',
    response: '确实，能用和好用是有区别的。我们免费为您提供一次设备健康检测，出具详细的效率分析报告。您可以根据数据来决定是否需要升级，没有任何压力。',
    effectiveness: 87,
  },
];

// 模拟数据 - 销售培训场景
const mockTrainingScenarios = [
  {
    id: '1',
    title: '价格敏感型客户应对',
    difficulty: '中级',
    duration: '10分钟',
    description: '客户反复压价，要求给予最大折扣',
    role: '采购总监',
    avatar: '👨‍💼',
  },
  {
    id: '2',
    title: '技术型客户深度交流',
    difficulty: '高级',
    duration: '15分钟',
    description: '客户提出专业技术问题，需要展示产品优势',
    role: '技术总监',
    avatar: '👨‍🔧',
  },
  {
    id: '3',
    title: '决策链突破',
    difficulty: '高级',
    duration: '12分钟',
    description: '如何影响没有决策权但有影响力的关键人',
    role: '车间主任',
    avatar: '👷',
  },
  {
    id: '4',
    title: '竞品客户转化',
    difficulty: '中级',
    duration: '8分钟',
    description: '客户正在使用竞品，如何引导其转换',
    role: '生产经理',
    avatar: '👨‍🏭',
  },
];

// 模拟对话消息
const mockChatMessages = [
  { id: '1', role: 'customer', content: '你们这个设备价格太高了，我看过XX品牌的，比你们便宜20%' },
  { id: '2', role: 'ai', content: '感谢您的坦诚。价格确实是重要的考虑因素。除了设备本身，您是否了解过总拥有成本（TCO）呢？' },
  { id: '3', role: 'customer', content: 'TCO是什么意思？' },
  { id: '4', role: 'ai', content: 'TCO就是总拥有成本，包括设备采购价、能耗、维护、停机损失等。我们的设备虽然 upfront cost 高一些，但能耗低30%，故障率只有行业平均的1/3。' },
];

export default function SalesEnablement() {
  const [activeTab, setActiveTab] = useState<'scripts' | 'competitor' | 'objections' | 'training'>('scripts');
  const [selectedScene, setSelectedScene] = useState('全部场景');
  const [selectedCustomerType, setSelectedCustomerType] = useState('全部类型');
  const [competitorInput, setCompetitorInput] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedObjectionCategory, setSelectedObjectionCategory] = useState('全部');
  const [expandedObjection, setExpandedObjection] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [trainingStarted, setTrainingStarted] = useState(false);
  const [trainingScenario, setTrainingScenario] = useState<typeof mockTrainingScenarios[0] | null>(null);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [userInput, setUserInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'scripts', label: '智能话术', icon: MessageCircle },
    { id: 'competitor', label: '竞品应对', icon: Shield },
    { id: 'objections', label: '异议处理', icon: BookOpen },
    { id: 'training', label: '销售培训', icon: Target },
  ];

  const scenes = ['全部场景', '初次接触', '需求挖掘', '方案呈现', '价格谈判', '成交促成'];
  const customerTypes = ['全部类型', '决策者', '技术负责人', '采购经理', '最终用户'];
  const objectionCategories = ['全部', '价格', '信任', '时机', '需求', '竞品'];

  const filteredScripts = mockScripts.filter(script => {
    const matchScene = selectedScene === '全部场景' || script.scene === selectedScene;
    const matchType = selectedCustomerType === '全部类型' || script.customerType === selectedCustomerType;
    const matchSearch = searchQuery === '' || 
      script.title.includes(searchQuery) || 
      script.content.includes(searchQuery);
    return matchScene && matchType && matchSearch;
  });

  const filteredObjections = mockObjections.filter(obj => {
    const matchCategory = selectedObjectionCategory === '全部' || obj.category === selectedObjectionCategory;
    const matchSearch = searchQuery === '' || 
      obj.objection.includes(searchQuery) || 
      obj.response.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  const handleGenerateResponse = () => {
    if (!competitorInput.trim()) {
      alert('请输入竞品名称');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const response = mockCompetitorResponses[competitorInput] || {
        strengths: ['市场占有率较高', '品牌知名度好', '产品线丰富'],
        responses: [
          `${competitorInput}确实是市场上的知名品牌，我们在某些方面确实需要向他们学习。`,
          '不过，我们在本地化服务、响应速度、以及性价比方面有明显优势。',
          '我可以为您安排一次产品演示，让您亲自体验我们的差异化价值。',
        ],
      };
      setGeneratedResponse(response as any);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStartTraining = (scenario: typeof mockTrainingScenarios[0]) => {
    setTrainingScenario(scenario);
    setTrainingStarted(true);
    setChatMessages(mockChatMessages);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const newMessage = { id: Date.now().toString(), role: 'user', content: userInput };
    setChatMessages([...chatMessages, newMessage]);
    setUserInput('');
    
    setTimeout(() => {
      const aiResponse = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        content: '很好的回应！您抓住了客户的关注点。建议接下来可以引导客户关注长期价值，而不是仅仅看 upfront cost。' 
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleEndTraining = () => {
    setTrainingStarted(false);
    setTrainingScenario(null);
    alert('训练结束！您的表现评分：85分\n\n优点：\n- 善于倾听客户需求\n- 能够有效引导话题\n\n改进建议：\n- 可以更多地使用数据支撑观点\n- 尝试使用封闭式问题推进成交');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 顶部标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AI销售赋能</h1>
              <p className="text-gray-500 text-sm">智能话术、竞品应对、异议处理、销售培训一站式解决方案</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">成交率提升 23%</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">本月使用 1,280 次</span>
          </div>
        </div>
      </div>

      {/* 标签切换 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* 智能话术推荐 */}
          {activeTab === 'scripts' && (
            <div className="space-y-6">
              {/* 筛选栏 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索话术..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <select
                  value={selectedScene}
                  onChange={(e) => setSelectedScene(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {scenes.map(scene => (
                    <option key={scene} value={scene}>{scene}</option>
                  ))}
                </select>
                <select
                  value={selectedCustomerType}
                  onChange={(e) => setSelectedCustomerType(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {customerTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* 话术卡片列表 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredScripts.map((script) => (
                  <div key={script.id} className="border border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {script.scene}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {script.customerType}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">{script.successRate}%</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{script.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{script.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {script.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">使用 {script.usageCount} 次</span>
                        <button
                          onClick={() => handleCopy(script.id, script.content)}
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          {copiedId === script.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 快速生成区域 */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="font-semibold text-lg">AI 定制话术</h3>
                </div>
                <p className="text-sm opacity-80 mb-4">输入您的销售场景，AI 将为您生成专属话术</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="例如：向制造业客户推销自动化设备，客户关心ROI..."
                    className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
                  />
                  <button 
                    onClick={() => alert('AI正在为您生成定制话术...')}
                    className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    生成话术
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 竞品应对助手 */}
          {activeTab === 'competitor' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 输入区域 */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      输入竞品名称
                    </label>
                    <input
                      type="text"
                      value={competitorInput}
                      onChange={(e) => setCompetitorInput(e.target.value)}
                      placeholder="例如：ABB、发那科、库卡..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleGenerateResponse}
                      disabled={isGenerating}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          生成应对策略
                        </>
                      )}
                    </button>
                  </div>

                  {/* 常用竞品快捷选择 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h4 className="font-medium text-gray-800 mb-3">常用竞品</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(mockCompetitorResponses).map((name) => (
                        <button
                          key={name}
                          onClick={() => setCompetitorInput(name)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 生成结果区域 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="font-medium text-gray-800 mb-4">应对策略</h4>
                  {generatedResponse ? (
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-600 mb-2">竞品优势（知己知彼）</h5>
                        <ul className="space-y-2">
                          {(generatedResponse as any).strengths.map((strength: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <h5 className="text-sm font-medium text-gray-600 mb-2">我们的应对话术</h5>
                        <div className="space-y-3">
                          {(generatedResponse as any).responses.map((response: string, idx: number) => (
                            <div key={idx} className="bg-purple-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700">{response}</p>
                              <button
                                onClick={() => handleCopy(`resp-${idx}`, response)}
                                className="mt-2 text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                              >
                                {copiedId === `resp-${idx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copiedId === `resp-${idx}` ? '已复制' : '复制'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>输入竞品名称，AI 将为您生成专业应对策略</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 异议处理库 */}
          {activeTab === 'objections' && (
            <div className="space-y-6">
              {/* 分类标签 */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索异议..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {objectionCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedObjectionCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        selectedObjectionCategory === cat
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 异议列表 */}
              <div className="space-y-3">
                {filteredObjections.map((obj) => (
                  <div
                    key={obj.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-all"
                  >
                    <button
                      onClick={() => setExpandedObjection(expandedObjection === obj.id ? null : obj.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                          {obj.category}
                        </span>
                        <span className="font-medium text-gray-800">{obj.objection}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{obj.effectiveness}% 有效</span>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedObjection === obj.id ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </button>
                    {expandedObjection === obj.id && (
                      <div className="px-4 pb-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">最佳回复方案</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{obj.response}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => handleCopy(obj.id, obj.response)}
                              className="flex items-center gap-1 text-xs text-green-700 hover:text-green-800"
                            >
                              {copiedId === obj.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {copiedId === obj.id ? '已复制' : '复制回复'}
                            </button>
                            <button
                              onClick={() => alert('已添加到收藏夹')}
                              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                            >
                              <Star className="w-3 h-3" />
                              收藏
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 销售培训模拟 */}
          {activeTab === 'training' && (
            <div>
              {!trainingStarted ? (
                <div className="space-y-6">
                  {/* 培训统计 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">本月训练次数</p>
                          <p className="text-2xl font-bold text-gray-800 mt-1">24</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">平均得分</p>
                          <p className="text-2xl font-bold text-gray-800 mt-1">82</p>
                        </div>
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">训练时长</p>
                          <p className="text-2xl font-bold text-gray-800 mt-1">4.5h</p>
                        </div>
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">技能提升</p>
                          <p className="text-2xl font-bold text-gray-800 mt-1">+15%</p>
                        </div>
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 训练场景列表 */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">选择训练场景</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockTrainingScenarios.map((scenario) => (
                        <div
                          key={scenario.id}
                          className="border border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => handleStartTraining(scenario)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{scenario.avatar}</span>
                              <div>
                                <h4 className="font-semibold text-gray-800">{scenario.title}</h4>
                                <p className="text-sm text-gray-500">{scenario.role}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              scenario.difficulty === '高级' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {scenario.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {scenario.duration}
                            </div>
                            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                              <Play className="w-4 h-4" />
                              开始训练
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* 训练对话界面 */
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {/* 对话头部 */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{trainingScenario?.avatar}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">{trainingScenario?.title}</h4>
                        <p className="text-sm text-gray-500">AI 扮演：{trainingScenario?.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>05:32</span>
                      </div>
                      <button
                        onClick={handleEndTraining}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* 对话内容 */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${
                          msg.role === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'customer' 
                            ? 'bg-blue-100' 
                            : msg.role === 'ai' 
                            ? 'bg-purple-100' 
                            : 'bg-green-100'
                        }`}>
                          {msg.role === 'customer' ? (
                            <User className="w-4 h-4 text-blue-600" />
                          ) : msg.role === 'ai' ? (
                            <Bot className="w-4 h-4 text-purple-600" />
                          ) : (
                            <User className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-purple-600 text-white'
                            : msg.role === 'ai'
                            ? 'bg-purple-50 text-gray-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 输入区域 */}
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => alert('语音输入功能开发中...')}
                        className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="输入您的回复..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!userInput.trim()}
                        className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => alert('提示：尝试使用SPIN销售法，先了解客户的具体情况')}
                          className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
                        >
                          <Lightbulb className="w-3 h-3" />
                          获取提示
                        </button>
                        <button 
                          onClick={() => alert('已打开话术推荐面板')}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                        >
                          <BookOpen className="w-3 h-3" />
                          话术推荐
                        </button>
                      </div>
                      <button
                        onClick={handleEndTraining}
                        className="text-xs text-gray-500 hover:text-red-600"
                      >
                        结束训练
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
