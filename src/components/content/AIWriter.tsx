import { useState } from 'react';
import {
  FileText,
  Sparkles,
  RefreshCw,
  Copy,
  Globe,
  SplitSquareVertical,
  Save,
  Wand2,
  ChevronDown,
  Layers,
  X,
} from 'lucide-react';
import { websites, apps, languages, contentScenes } from '../../data/websites';

interface GeneratedContent {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  status: 'draft' | 'published';
}

const mockGeneratedContents: GeneratedContent[] = [
  { id: '1', title: '工业机器人产品描述', content: '我们专注于工业机器人研发与制造...', type: 'product', createdAt: '2026-05-20 14:30', status: 'published' },
  { id: '2', title: '企业解决方案白皮书', content: '数字化转型解决方案介绍...', type: 'whitepaper', createdAt: '2026-05-19 11:20', status: 'published' },
  { id: '3', title: '新品发布文案', content: '全新一代智能设备即将上市...', type: 'marketing', createdAt: '2026-05-18 16:45', status: 'draft' },
];

export default function AIWriter() {
  const [selectedWebsite, setSelectedWebsite] = useState('');
  const [selectedApp, setSelectedApp] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedScenes, setSelectedScenes] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>(mockGeneratedContents);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showTranslateModal, setShowTranslateModal] = useState(false);
  const [showSceneModal, setShowSceneModal] = useState(false);

  const handleGenerateContent = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedContent('我们专注于工业机器人研发与制造，提供高效、稳定、智能的自动化解决方案。通过先进的AI算法和精密传感技术，我们的产品能够显著提升生产线效率，降低人工成本，帮助企业实现智能制造转型。我们的团队拥有丰富的行业经验和技术积累，为客户提供从方案设计到售后服务的全流程支持。');
    }, 2500);
  };

  const handleSaveContent = () => {
    if (!generatedContent) return;
    const newContent: GeneratedContent = {
      id: Date.now().toString(),
      title: '未命名内容',
      content: generatedContent,
      type: 'article',
      createdAt: new Date().toLocaleString(),
      status: 'draft'
    };
    setGeneratedContents([newContent, ...generatedContents]);
    setGeneratedContent('');
    setShowPublishModal(false);
  };

  const handleToggleScene = (sceneId: string) => {
    setSelectedScenes(prev =>
      prev.includes(sceneId) ? prev.filter(id => id !== sceneId) : [...prev, sceneId]
    );
  };

  const getAppsByWebsite = (websiteId: string) => apps.filter(app => app.websiteId === websiteId && app.status === 'active' && app.type === 'content');

  return (
    <div className="space-y-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：创作设置 + 发布设置 */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4">创作设置</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">内容类型</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>产品描述</option>
                  <option>公司介绍</option>
                  <option>营销文案</option>
                  <option>新闻稿</option>
                  <option>白皮书</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">关键词</label>
                <input
                  type="text"
                  placeholder="输入产品名称或主题"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">内容长度</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>简短 (100-200字)</option>
                  <option>中等 (300-500字)</option>
                  <option>详细 (800-1000字)</option>
                  <option>长篇 (1500+字)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">风格要求</label>
                <div className="flex flex-wrap gap-2">
                  {['专业', '活泼', '正式', '简洁', '详细'].map((style) => (
                    <label key={style} className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4">发布设置</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">目标网站</label>
                <div className="relative">
                  <select
                    value={selectedWebsite}
                    onChange={(e) => {
                      setSelectedWebsite(e.target.value);
                      setSelectedApp('');
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">选择网站</option>
                    {websites.filter(w => w.status === 'active').map((website) => (
                      <option key={website.id} value={website.id}>{website.name} ({website.domain})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {selectedWebsite && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">目标应用</label>
                  <select
                    value={selectedApp}
                    onChange={(e) => setSelectedApp(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">选择应用</option>
                    {getAppsByWebsite(selectedWebsite).map((app) => (
                      <option key={app.id} value={app.id}>{app.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleGenerateContent}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>AI创作中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>开始生成</span>
              </>
            )}
          </button>
        </div>

        {/* 右侧：生成结果面板 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">生成结果</h3>
              {generatedContent && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedContent)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    复制
                  </button>
                  <button
                    onClick={() => setShowTranslateModal(true)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    翻译
                  </button>
                  <button
                    onClick={() => setShowSceneModal(true)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <SplitSquareVertical className="w-4 h-4" />
                    裂变
                  </button>
                  <button
                    onClick={() => setShowPublishModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    保存/发布
                  </button>
                </div>
              )}
            </div>
            <div className="p-6 min-h-[400px]">
              {generatedContent ? (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{generatedContent}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Wand2 className="w-16 h-16 mb-4" />
                  <p className="text-lg">点击左侧"开始生成"按钮</p>
                  <p className="text-sm mt-1">AI将为您创作专业内容</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 翻译弹窗 */}
      {showTranslateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">多语言翻译</h2>
              <button onClick={() => setShowTranslateModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">选择目标语言</label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors ${
                      selectedLanguage === lang.code
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-xs">{lang.name}</span>
                  </button>
                ))}
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
                <Globe className="w-5 h-5" />
                开始翻译
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 裂变弹窗 */}
      {showSceneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">多场景裂变</h2>
              <button onClick={() => setShowSceneModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">选择裂变场景</label>
              <div className="space-y-2 mb-4">
                {contentScenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => handleToggleScene(scene.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      selectedScenes.includes(scene.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Layers className={`w-5 h-5 ${selectedScenes.includes(scene.id) ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{scene.name}</p>
                        <p className="text-xs text-gray-500">{scene.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">使用 {scene.usage} 次</span>
                  </button>
                ))}
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700">
                <SplitSquareVertical className="w-5 h-5" />
                生成裂变版本
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 发布弹窗 */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">保存/发布内容</h2>
              <button onClick={() => setShowPublishModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容标题</label>
                <input
                  type="text"
                  placeholder="输入内容标题"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">发布状态</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="status" defaultChecked />
                    <span className="text-sm">保存为草稿</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="status" />
                    <span className="text-sm">立即发布</span>
                  </label>
                </div>
              </div>
              {selectedWebsite && selectedApp && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    将发布到: <span className="font-medium">{websites.find(w => w.id === selectedWebsite)?.name}</span> / {apps.find(a => a.id === selectedApp)?.name}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100">
              <button onClick={() => setShowPublishModal(false)} className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                取消
              </button>
              <button onClick={handleSaveContent} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                确认保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
