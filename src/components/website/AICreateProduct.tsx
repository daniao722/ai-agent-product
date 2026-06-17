import { useState } from 'react';
import {
  Sparkles,
  Upload,
  FileText,
  Image,
  X,
  Check,
  Loader2,
  Send,
  Package,
  Tag,
  DollarSign,
  BarChart3,
  ClipboardList,
} from 'lucide-react';

interface AICreateProductProps {
  onClose: () => void;
  onSave: (product: Record<string, unknown>) => void;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  specs: string;
  features: string;
  images: string[];
  documents: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    content: '👋 您好！我是AI产品运营助手，可以帮您快速创建产品数据。\n\n请通过以下方式提供产品信息：\n\n1. **直接描述** — 告诉我产品名称、参数、特点等\n2. **上传文档** — 上传产品图册、PDF、Word等介绍文档\n3. **上传图片** — 上传产品图片，我将自动识别\n\n我会自动提取信息并填入产品数据字段。',
    timestamp: new Date(),
  },
];

const QUICK_ACTIONS = [
  { label: '上传产品图册', icon: <Image className="w-3.5 h-3.5" /> },
  { label: '上传PDF文档', icon: <FileText className="w-3.5 h-3.5" /> },
  { label: '上传Word文档', icon: <FileText className="w-3.5 h-3.5" /> },
  { label: '手动输入产品信息', icon: <ClipboardList className="w-3.5 h-3.5" /> },
];

const FIELD_GROUPS = [
  {
    title: '基本信息',
    icon: <Package className="w-4 h-4" />,
    fields: [
      { key: 'name', label: '产品名称', type: 'text', placeholder: '例如：X500 高精度伺服电机' },
      { key: 'category', label: '产品分类', type: 'text', placeholder: '例如：伺服电机' },
      { key: 'description', label: '产品描述', type: 'textarea', placeholder: '产品概述和核心卖点...' },
    ],
  },
  {
    title: '商业信息',
    icon: <DollarSign className="w-4 h-4" />,
    fields: [
      { key: 'price', label: '参考价格', type: 'text', placeholder: '例如：¥2,999 或 面议' },
      { key: 'stock', label: '库存状态', type: 'text', placeholder: '例如：现货 / 定制 / 预售' },
    ],
  },
  {
    title: '技术参数',
    icon: <BarChart3 className="w-4 h-4" />,
    fields: [
      { key: 'specs', label: '规格参数', type: 'textarea', placeholder: '例如：功率 500W，转速 3000rpm，精度 ±0.01mm...' },
      { key: 'features', label: '核心特点', type: 'textarea', placeholder: '例如：高精度、低噪音、长寿命...' },
    ],
  },
];

export default function AICreateProduct({ onClose, onSave }: AICreateProductProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    specs: '',
    features: '',
    images: [],
    documents: [],
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let aiResponse = '';
      const updatedForm = { ...formData };

      if (lowerInput.includes('名称') || lowerInput.includes('叫') || lowerInput.includes('产品')) {
        // Try to extract product name
        const nameMatch = input.match(/(?:叫|名称|产品)[：:]*\s*(.+)/);
        if (nameMatch) {
          updatedForm.name = nameMatch[1].trim();
          aiResponse = `✅ 已识别产品名称：**${nameMatch[1].trim()}**\n\n请继续提供以下信息：\n- 产品类别/分类\n- 核心参数和规格\n- 主要特点和应用场景\n\n或者您可以直接上传产品文档，我将自动提取所有信息。`;
        } else {
          aiResponse = '我已收到您的描述。请告诉我：\n\n1. 产品的具体名称是什么？\n2. 属于哪个产品类别？\n3. 有哪些核心技术参数？\n\n您也可以上传产品图册或PDF文档，我会自动识别并提取信息。';
        }
      } else if (lowerInput.includes('参数') || lowerInput.includes('规格') || lowerInput.includes('功率') || lowerInput.includes('尺寸')) {
        updatedForm.specs = input;
        aiResponse = '✅ 已记录产品规格参数！\n\n我还需要了解：\n- 产品的核心特点和优势\n- 主要应用场景\n- 价格区间和交货周期\n\n请继续补充，或上传完整的产品文档。';
      } else if (lowerInput.includes('特点') || lowerInput.includes('优势') || lowerInput.includes('功能')) {
        updatedForm.features = input;
        aiResponse = '✅ 已记录产品特点！\n\n目前我已收集到以下信息：\n' +
          (updatedForm.name ? `- 产品名称：${updatedForm.name}\n` : '') +
          (updatedForm.specs ? `- 规格参数：已记录\n` : '') +
          (updatedForm.features ? `- 核心特点：已记录\n` : '') +
          '\n还需要补充：产品图片、价格信息、认证资质等。\n\n您可以上传产品图册或继续文字描述。';
      } else if (lowerInput.includes('上传') || lowerInput.includes('文档') || lowerInput.includes('pdf') || lowerInput.includes('word')) {
        aiResponse = '📎 请直接将文件拖拽到对话框，或点击下方的上传按钮。\n\n支持格式：\n- **文档**：PDF、Word (.docx)、Excel (.xlsx)、PPT\n- **图片**：JPG、PNG、WebP（支持多张）\n- **压缩包**：ZIP（包含产品图册）\n\n上传后我将自动解析文档内容，提取产品名称、参数、特点等信息并填入表单。';
      } else if (lowerInput.includes('图片') || lowerInput.includes('照片') || lowerInput.includes('图')) {
        aiResponse = '️ 请上传产品图片，支持以下类型：\n\n- **产品主图** — 正面展示图（建议白底）\n- **细节图** — 关键部位特写\n- **场景图** — 产品使用场景\n- **尺寸图** — 带标注的尺寸图\n\n我会根据图片内容自动补充产品描述和规格参数。';
      } else {
        aiResponse = '收到！我正在分析您提供的信息...\n\n基于您的描述，我已初步提取了以下产品数据：\n\n' +
          (updatedForm.name ? `📦 **产品名称**：${updatedForm.name}\n` : '📦 **产品名称**：待补充\n') +
          (updatedForm.category ? `🏷️ **产品分类**：${updatedForm.category}\n` : '🏷️ **产品分类**：待补充\n') +
          (updatedForm.specs ? `📊 **规格参数**：已记录\n` : '📊 **规格参数**：待补充\n') +
          (updatedForm.features ? `⚡ **核心特点**：已记录\n` : '⚡ **核心特点**：待补充\n') +
          '\n请继续补充缺失信息，或上传产品文档让我自动提取。';
      }

      setFormData(updatedForm);

      const aiMsg: Message = { role: 'assistant', content: aiResponse, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleQuickAction = (label: string) => {
    if (label.includes('上传')) {
      const fileType = label.includes('PDF') ? 'PDF' : label.includes('Word') ? 'Word' : '图片';
      const fileName = `产品${fileType === '图片' ? '图册' : '介绍'}${fileType === 'PDF' ? '.pdf' : fileType === 'Word' ? '.docx' : '.zip'}`;
      setUploadedFiles((prev) => [...prev, fileName]);

      const userMsg: Message = { role: 'user', content: `[上传文件] ${fileName}`, timestamp: new Date() };
      setMessages((prev) => [...prev, userMsg]);
      setIsProcessing(true);

      setTimeout(() => {
        const aiMsg: Message = {
          role: 'assistant',
          content: ` 已收到文件 **${fileName}**，正在解析中...\n\n✅ 解析完成！已自动提取以下信息：\n\n- **产品名称**：X500 高精度伺服电机\n- **产品分类**：伺服电机 / 工业自动化\n- **规格参数**：功率500W，额定转速3000rpm，精度±0.01mm，防护等级IP65\n- **核心特点**：高精度定位、低噪音运行、长寿命设计、智能温控\n- **应用场景**：CNC机床、机器人关节、精密装配线\n- **认证资质**：CE、ISO9001、RoHS\n\n以上信息已自动填入右侧表单，您可以查看并修改。还需要补充产品图片和价格信息吗？`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);

        setFormData({
          name: 'X500 高精度伺服电机',
          description: 'X500系列高精度伺服电机，采用先进永磁同步技术，适用于CNC机床、机器人关节、精密装配线等工业自动化场景。具备高精度定位、低噪音运行、长寿命设计等特点。',
          category: '伺服电机',
          price: '面议',
          stock: '现货',
          specs: '功率：500W\n额定转速：3000rpm\n额定扭矩：1.59N·m\n精度：±0.01mm\n防护等级：IP65\n绝缘等级：F级\n编码器：2500线增量式',
          features: '• 高精度定位，重复精度±0.01mm\n• 低噪音运行，噪音≤55dB\n• 长寿命设计，MTBF>50000小时\n• 智能温控，过载自动保护\n• 多种安装方式，适配性强\n• 支持RS485/CANopen通讯',
          images: [],
          documents: [fileName],
        });

        setIsProcessing(false);
      }, 2000);
    } else {
      setInput(label);
    }
  };

  const handleSave = () => {
    onSave(formData as unknown as Record<string, unknown>);
    onClose();
  };

  const filledFieldsCount = Object.values(formData).filter((v) => {
    if (Array.isArray(v)) return v.length > 0;
    return typeof v === 'string' && v.trim() !== '';
  }).length;
  const totalFields = 7;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">AI 创建产品</h2>
              <p className="text-xs text-gray-500">AI运营助手将引导您完成产品数据录入</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left - Chat */}
          <div className="w-[420px] flex-shrink-0 border-r border-gray-100 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-sm text-gray-500">AI正在分析中...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex gap-2 flex-wrap">
                {QUICK_ACTIONS.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => handleQuickAction(a.label)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    {a.icon}
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
                  placeholder="描述产品信息，或上传文档..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
                  disabled={isProcessing}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isProcessing}
                  className="px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Progress */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">数据填充进度</span>
                <span className="text-xs text-blue-600 font-medium">{filledFieldsCount}/{totalFields} 字段已填充</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(filledFieldsCount / totalFields) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {FIELD_GROUPS.map((group) => (
                <div key={group.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-600">{group.icon}</span>
                    <h3 className="text-sm font-semibold text-gray-700">{group.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {group.fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            value={(formData[field.key as keyof ProductFormData] as string) || ''}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            rows={field.key === 'description' ? 3 : 4}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={(formData[field.key as keyof ProductFormData] as string) || ''}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-700">已上传文件</h3>
                  </div>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-700 flex-1">{file}</span>
                        <Check className="w-4 h-4 text-green-600" />
                        <button
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, j) => j !== i))}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Auto-filled indicator */}
              {formData.name && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-100">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-700">
                    已自动填充 {filledFieldsCount} 个字段，您可以手动修改
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Tag className="w-3.5 h-3.5" />
                <span>AI自动提取 · 人工审核确认</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formData.name}
                  className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  保存产品
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
