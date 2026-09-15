import { useState, useEffect } from 'react';
import {
  Sparkles,
  Building2,
  FileText,
  Layout,
  Wand2,
  Palette,
  Save,
  CheckCircle2,
  Loader2,
  Send,
  ChevronRight,
  Edit3,
  Eye,
  ArrowRight,
} from 'lucide-react';
import {
  getIndustryModuleConfigs,
  getRequiredModules,
  getOptionalModules,
  getIndustryName,
  DEFAULT_INDUSTRY_ID,
  DEFAULT_INDUSTRY_NAME,
  getSafeIndustryName,
} from './pageComponents';

// ========== Types ==========
interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  type?: 'text' | 'proposal' | 'progress';
  proposalData?: DesignProposal;
  progressData?: StepProgress;
}

export interface BrandInfo {
  companyName: string;
  logo: string;
  industry: string;
  mainProducts: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  source: 'knowledge-base' | 'homepage' | 'manual';
}

interface DesignProposal {
  title: string;
  modules: { id: string; name: string; required: boolean }[];
  styleNotes: string;
}

interface StepProgress {
  current: number;
  total: number;
  label: string;
}

export type WorkflowStep = 'idle' | 'brand' | 'industry' | 'proposal' | 'template' | 'generating' | 'editing' | 'done';

// ========== Constants ==========
const STEPS = [
  { key: 'brand', label: '品牌信息', icon: Building2 },
  { key: 'industry', label: '行业规范', icon: FileText },
  { key: 'proposal', label: '设计提案', icon: Layout },
  { key: 'template', label: '选择模板', icon: Palette },
  { key: 'generating', label: 'AI生成', icon: Wand2 },
  { key: 'editing', label: '编辑调整', icon: Edit3 },
  { key: 'done', label: '保存发布', icon: Save },
] as const;

// ========== Component ==========
interface DesignerAIChatProps {
  onStepChange: (step: WorkflowStep) => void;
  onBrandInfo: (info: BrandInfo) => void;
  onProposalConfirm: (proposal: { modules: { id: string; name: string; required: boolean }[] }) => void;
  onStartGenerate: () => void;
  onEnterEdit: () => void;
  onSavePage: () => void;
  selectedTemplate: string | null;
  brandInfo: BrandInfo | null;
  currentStep: WorkflowStep;
}

export default function DesignerAIChat({
  onStepChange,
  onBrandInfo,
  onProposalConfirm,
  onStartGenerate,
  onEnterEdit,
  onSavePage,
  selectedTemplate,
  brandInfo,
  currentStep,
}: DesignerAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 您好！我是产品详情页AI设计助手。\n\n我将通过7个步骤帮您完成高质量产品详情页的设计：\n\n1️ 分析品牌信息\n2️⃣ 匹配行业规范\n3️⃣ 生成设计提案\n4️⃣ 选择页面模板\n5️⃣ AI生成页面\n6️⃣ 编辑调整\n7️ 保存发布\n\n让我们从第一步开始 — 分析您的企业品牌信息。',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [proposalModules, setProposalModules] = useState<{ id: string; name: string; required: boolean }[]>([]);
  const [proposalEditable, setProposalEditable] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(false);

  // 监听模板选择事件
  useEffect(() => {
    const handleTemplateSelected = (e: Event) => {
      const templateId = (e as CustomEvent).detail;
      setTemplateSelected(true);
      addMessage('assistant', `✅ 已选择模板：**${getIndustryName(templateId)}**\n\n接下来我将开始AI生成页面，请稍候...`);
      setTimeout(() => {
        onStartGenerate();
      }, 1000);
    };
    window.addEventListener('template-selected', handleTemplateSelected);
    return () => window.removeEventListener('template-selected', handleTemplateSelected);
  }, []);

  const addMessage = (role: 'assistant' | 'user', content: string, extra?: Partial<Message>) => {
    setMessages((prev) => [...prev, { role, content, timestamp: new Date(), ...extra }]);
  };

  const simulateAI = (callback: () => void, delay = 1500) => {
    setIsProcessing(true);
    setTimeout(() => {
      callback();
      setIsProcessing(false);
    }, delay);
  };

  // Step 1: Brand Info
  const handleBrandInput = () => {
    if (!input.trim()) return;
    const text = input;
    addMessage('user', text);
    setInput('');

    simulateAI(() => {
      // Try to extract brand info
      const info: BrandInfo = {
        companyName: text.includes('公司') || text.includes('科技') || text.includes('集团')
          ? text.match(/(.+?)(?:公司|科技|集团|有限)/)?.[0] + (text.includes('公司') ? '公司' : text.includes('科技') ? '科技' : '集团') || '示例企业'
          : '示例企业',
        logo: '',
        industry: selectedTemplate ? getIndustryName(selectedTemplate) : DEFAULT_INDUSTRY_NAME,
        mainProducts: text,
        primaryColor: '#1e40af',
        secondaryColor: '#3b82f6',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        source: 'manual',
      };

      onBrandInfo(info);
      onStepChange('industry');

      addMessage('assistant',
        `✅ 已记录企业品牌信息！\n\n` +
        `**企业名称**：${info.companyName}\n` +
        `**所属行业**：${info.industry}\n` +
        `**主营产品**：${info.mainProducts}\n` +
        `**品牌主色**：${info.primaryColor}\n\n` +
        `接下来我将分析 **${info.industry}** 行业的产品详情页内容规范，确定页面应包含的内容模块。`
      );

      // Auto proceed to step 2
      setTimeout(() => handleIndustryAnalysis(info.industry), 1000);
    });
  };

  // Step 2: Industry Analysis
  const handleIndustryAnalysis = (industry?: string) => {
    const templateKey = selectedTemplate || DEFAULT_INDUSTRY_ID;
    const targetIndustry = industry || (selectedTemplate ? getIndustryName(selectedTemplate) : DEFAULT_INDUSTRY_NAME);
    const modules = getIndustryModuleConfigs(templateKey);

    simulateAI(() => {
      const requiredModules = getRequiredModules(templateKey);
      const optionalModules = getOptionalModules(templateKey);
      const requiredCount = requiredModules.length;
      const optionalCount = optionalModules.length;

      addMessage('assistant',
        `📋 **${targetIndustry}行业 — 产品详情页内容规范分析完成**\n\n` +
        `根据行业标准，建议页面包含 **${modules.length}** 个内容模块：\n\n` +
        `**必选模块（${requiredCount}个）：**\n` +
        requiredModules.map((m, i) => `  ${i + 1}. ${m.name}`).join('\n') +
        `\n\n**推荐模块（${optionalCount}个）：**\n` +
        optionalModules.map((m) => `  • ${m.name}`).join('\n') +
        `\n\n接下来我将基于以上规范生成设计提案，您可以修改模块配置。`
      );

      setProposalModules(modules);
      onStepChange('proposal');

      // Auto generate proposal
      setTimeout(() => handleGenerateProposal(modules, targetIndustry), 800);
    }, 2000);
  };

  // Step 3: Generate Proposal
  const handleGenerateProposal = (modules?: { id: string; name: string; required: boolean }[], industry?: string) => {
    const targetModules = modules || proposalModules;
    const targetIndustry = industry || (selectedTemplate ? getIndustryName(selectedTemplate) : DEFAULT_INDUSTRY_NAME);

    const proposal: DesignProposal = {
      title: `${brandInfo?.companyName || '企业'} — ${targetIndustry}产品详情页设计方案`,
      modules: targetModules,
      styleNotes: `• 主色调：${brandInfo?.primaryColor || '#1e40af'}\n• 辅助色：${brandInfo?.secondaryColor || '#3b82f6'}\n• 字体：${brandInfo?.fontFamily || 'PingFang SC'}\n• 风格：专业、简洁、工业感\n• 布局：响应式，适配PC和移动端`,
    };

    addMessage('assistant', '', {
      type: 'proposal',
      proposalData: proposal,
    });

    setProposalModules(targetModules);
    setProposalEditable(true);
  };

  // Toggle module in proposal
  const toggleModule = (moduleId: string) => {
    setProposalModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, required: !m.required } : m))
    );
  };

  const confirmProposal = () => {
    setProposalEditable(false);
    const proposal = {
      modules: proposalModules,
    };

    addMessage('user', '✅ 确认提案，下一步选择模板');
    onProposalConfirm(proposal);
    onStepChange('template');

    addMessage('assistant', '请在右侧选择适合您行业的页面模板，或输入参考页面URL。');
  };

  const handleSendMessage = () => {
    if (!input.trim() || isProcessing) return;

    switch (currentStep) {
      case 'brand':
        handleBrandInput();
        break;
      case 'industry':
        addMessage('user', input);
        setInput('');
        simulateAI(() => {
          addMessage('assistant', '正在分析行业规范...');
          handleIndustryAnalysis();
        });
        break;
      case 'proposal':
        addMessage('user', input);
        setInput('');
        simulateAI(() => {
          addMessage('assistant', '已更新设计提案，请查看提案内容并确认。');
          handleGenerateProposal();
        });
        break;
      default:
        addMessage('user', input);
        setInput('');
        simulateAI(() => {
          addMessage('assistant', '收到！我正在处理您的请求...');
        });
        break;
    }
  };

  const renderStepIndicator = () => (
    <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
      <div className="flex items-center gap-1 overflow-x-auto">
        {STEPS.map((step, i) => {
          const stepIndex = STEPS.findIndex((s) => s.key === currentStep);
          const isActive = step.key === currentStep;
          const isDone = i < stepIndex;
          const Icon = step.icon;
          return (
            <div key={step.key} className="flex items-center gap-1 flex-shrink-0">
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isDone
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                <span className="whitespace-nowrap">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderProposal = (proposal: DesignProposal) => (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <Layout className="w-4 h-4 text-blue-600" />
        <h4 className="font-semibold text-blue-800 text-sm">{proposal.title}</h4>
      </div>
      <div className="space-y-1 mb-3 max-h-48 overflow-y-auto">
        {proposalModules.map((m) => (
          <button
            key={m.id}
            onClick={() => proposalEditable && toggleModule(m.id)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-all ${
              m.required
                ? 'bg-white text-gray-800 border border-blue-200'
                : 'bg-blue-100/50 text-gray-500 border border-transparent'
            } ${proposalEditable ? 'cursor-pointer hover:border-blue-400' : 'cursor-default'}`}
          >
            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${
              m.required ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
            }`}>
              {m.required && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className={m.required ? 'font-medium' : ''}>{m.name}</span>
            {!m.required && <span className="text-gray-400 ml-auto">可选</span>}
          </button>
        ))}
      </div>
      {proposalEditable && (
        <button
          onClick={confirmProposal}
          className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-1"
        >
          <CheckCircle2 className="w-4 h-4" />
          确认提案，选择模板
        </button>
      )}
    </div>
  );

  const renderProgress = (progress: StepProgress) => (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
        <span className="text-sm font-medium text-gray-700">AI生成中...</span>
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              step < progress.current
                ? 'bg-green-500'
                : step === progress.current
                ? 'bg-blue-500 animate-pulse'
                : 'bg-gray-200'
            }`}>
              {step < progress.current ? (
                <CheckCircle2 className="w-3 h-3 text-white" />
              ) : (
                <div className={`w-2 h-2 rounded-full ${step === progress.current ? 'bg-white' : 'bg-gray-400'}`} />
              )}
            </div>
            <span className={`text-xs ${
              step <= progress.current ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {step === 1 && '分析行业规范与品牌风格'}
              {step === 2 && '生成页面组件与布局'}
              {step === 3 && '应用品牌样式与交互'}
              {step === 4 && '优化细节与响应式适配'}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${(progress.current / progress.total) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">AI 生成助手</h3>
            <p className="text-xs text-gray-500">
              {currentStep === 'brand' && '步骤 1/7 — 分析品牌信息'}
              {currentStep === 'industry' && '步骤 2/7 — 匹配行业规范'}
              {currentStep === 'proposal' && '步骤 3/7 — 生成设计提案'}
              {currentStep === 'template' && '步骤 4/7 — 选择页面模板'}
              {currentStep === 'generating' && '步骤 5/7 — AI生成页面'}
              {currentStep === 'editing' && '步骤 6/7 — 编辑调整'}
              {currentStep === 'done' && '步骤 7/7 — 保存发布'}
              {currentStep === 'idle' && '准备开始'}
            </p>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'user' ? (
              <div className="max-w-[85%] bg-blue-600 text-white rounded-2xl px-4 py-3 text-sm">
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            ) : (
              <div className="max-w-[90%] space-y-2">
                {msg.type === 'proposal' && msg.proposalData ? (
                  renderProposal(msg.proposalData)
                ) : msg.type === 'progress' && msg.progressData ? (
                  renderProgress(msg.progressData)
                ) : (
                  <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3 text-sm">
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isProcessing && currentStep !== 'generating' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              <span className="text-sm text-gray-500">AI思考中...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {currentStep === 'brand' && !brandInfo && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 mb-2">快捷输入：</p>
          <div className="flex gap-2 flex-wrap">
            {[
              '我们是一家机械设备制造企业',
              '公司是汽车零部件供应商',
              '我们做生物医药原料药',
              '工业密封件制造商',
            ].map((text) => (
              <button
                key={text}
                onClick={() => { setInput(text); }}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 'editing' && (
        <div className="px-4 py-3 border-t border-gray-100 bg-green-50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">页面已生成，可以编辑调整</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEnterEdit}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-1"
            >
              <Edit3 className="w-4 h-4" />
              进入编辑模式
            </button>
            <button
              onClick={onSavePage}
              className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-1"
            >
              <Save className="w-4 h-4" />
              保存发布
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      {currentStep !== 'done' && currentStep !== 'editing' && currentStep !== 'template' && (
        <div className="p-3 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                currentStep === 'brand' ? '描述您的企业/品牌信息...' :
                currentStep === 'industry' ? '输入行业相关信息...' :
                currentStep === 'proposal' ? '修改提案要求...' :
                '输入您的需求...'
              }
              className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isProcessing}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isProcessing}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
