'use client';

import { useState } from 'react';
import { 
  Edit3, 
  Eye, 
  Save, 
  Settings, 
  Layers, 
  Image as ImageIcon,
  Type,
  Sparkles,
  Download,
  ArrowLeft
} from 'lucide-react';
import { WebsiteData, ComponentData } from '@/types';
import { ComponentRenderer } from './website-components/ComponentRenderer';
import { cn } from '@/lib/utils';

interface WebsiteEditorProps {
  websiteData: WebsiteData;
  onUpdate: (data: WebsiteData) => void;
  onPreview: () => void;
}

type EditorTab = 'components' | 'properties' | 'ai-tools' | 'cms';

export function WebsiteEditor({ websiteData, onUpdate, onPreview }: WebsiteEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('components');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const currentPage = websiteData.pages[0];

  const handleComponentEdit = (componentId: string, key: string, value: any) => {
    const updatedPages = websiteData.pages.map(page => ({
      ...page,
      components: page.components.map(comp => 
        comp.id === componentId 
          ? { ...comp, props: { ...comp.props, [key]: value } }
          : comp
      )
    }));
    onUpdate({ ...websiteData, pages: updatedPages });
  };

  const handleAIOptimizeText = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('AI 文字优化功能演示 - 在实际项目中会调用 AI API');
  };

  const handleAIGenerateImage = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('AI 图片生成功能演示 - 在实际项目中会调用 AI API');
  };

  const handleExport = () => {
    alert('导出功能演示 - 会导出完整的网站代码');
  };

  const tabs = [
    { id: 'components' as EditorTab, label: '组件', icon: Layers },
    { id: 'properties' as EditorTab, label: '属性', icon: Settings },
    { id: 'ai-tools' as EditorTab, label: 'AI 工具', icon: Sparkles },
    { id: 'cms' as EditorTab, label: 'CMS', icon: Database },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-72 bg-white border-r flex flex-col">
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="text-lg font-bold text-white">网站编辑器</h2>
        </div>

        <div className="flex border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 py-3 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <Icon className="w-4 h-4 mx-auto" />
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'components' && (
            <ComponentsPanel 
              components={currentPage.components}
              selectedComponent={selectedComponent}
              onSelect={setSelectedComponent}
            />
          )}
          {activeTab === 'properties' && (
            <PropertiesPanel 
              components={currentPage.components}
              selectedComponent={selectedComponent}
              onEdit={handleComponentEdit}
            />
          )}
          {activeTab === 'ai-tools' && (
            <AIToolsPanel 
              onOptimizeText={handleAIOptimizeText}
              onGenerateImage={handleAIGenerateImage}
              isLoading={isSaving}
            />
          )}
          {activeTab === 'cms' && (
            <CMSPanel />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              返回
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-lg font-semibold text-gray-900">
              {currentPage.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaving(true)}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Save className="w-4 h-4" />
              {isSaving ? '保存中...' : '保存'}
            </button>
            <button
              onClick={onPreview}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              预览
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              导出
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
            {currentPage.components.map((component) => (
              <div
                key={component.id}
                onClick={() => setSelectedComponent(component.id)}
                className={cn(
                  'transition-all relative group',
                  selectedComponent === component.id && 'ring-2 ring-blue-500 ring-inset'
                )}
              >
                {selectedComponent === component.id && (
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50">
                      <Edit3 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50">
                      <Layers className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                )}
                <ComponentRenderer
                  component={component}
                  isEditable={true}
                  onEdit={handleComponentEdit}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentsPanel({ 
  components, 
  selectedComponent, 
  onSelect 
}: { 
  components: ComponentData[];
  selectedComponent: string | null;
  onSelect: (id: string) => void;
}) {
  const componentLabels: Record<string, string> = {
    'navigation': '导航栏',
    'banner': '横幅',
    'product-list': '产品列表',
    'about-us': '关于我们',
    'contact-form': '联系表单',
    'footer': '页脚',
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 mb-4">页面组件</h3>
      {components.map((component) => (
        <button
          key={component.id}
          onClick={() => onSelect(component.id)}
          className={cn(
            'w-full text-left p-3 rounded-lg border transition-all',
            selectedComponent === component.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          )}
        >
          <div className="font-medium text-gray-900">
            {componentLabels[component.type] || component.type}
          </div>
          <div className="text-sm text-gray-500">
            ID: {component.id}
          </div>
        </button>
      ))}
    </div>
  );
}

function PropertiesPanel({ 
  components, 
  selectedComponent, 
  onEdit 
}: { 
  components: ComponentData[];
  selectedComponent: string | null;
  onEdit: (componentId: string, key: string, value: any) => void;
}) {
  const component = selectedComponent 
    ? components.find(c => c.id === selectedComponent)
    : null;

  if (!component) {
    return (
      <div className="text-center text-gray-500 py-8">
        请选择一个组件以编辑属性
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 mb-4">组件属性</h3>
      {Object.entries(component.props).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {key}
          </label>
          {typeof value === 'string' ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onEdit(component.id, key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="text-gray-500 text-sm">
              {JSON.stringify(value)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AIToolsPanel({ 
  onOptimizeText, 
  onGenerateImage, 
  isLoading 
}: { 
  onOptimizeText: () => void;
  onGenerateImage: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 mb-4">AI 智能工具</h3>
      
      <button
        onClick={onOptimizeText}
        disabled={isLoading}
        className="w-full flex items-center gap-3 p-4 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors disabled:opacity-50"
      >
        <Type className="w-5 h-5 text-blue-600" />
        <div className="text-left">
          <div className="font-medium text-blue-900">AI 优化文字</div>
          <div className="text-sm text-blue-700">让 AI 帮您优化文案</div>
        </div>
      </button>

      <button
        onClick={onGenerateImage}
        disabled={isLoading}
        className="w-full flex items-center gap-3 p-4 border border-purple-200 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors disabled:opacity-50"
      >
        <ImageIcon className="w-5 h-5 text-purple-600" />
        <div className="text-left">
          <div className="font-medium text-purple-900">AI 生成图片</div>
          <div className="text-sm text-purple-700">根据描述生成图片</div>
        </div>
      </button>

      <button
        disabled={isLoading}
        className="w-full flex items-center gap-3 p-4 border border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors disabled:opacity-50"
      >
        <Sparkles className="w-5 h-5 text-green-600" />
        <div className="text-left">
          <div className="font-medium text-green-900">AI 整体优化</div>
          <div className="text-sm text-green-700">智能优化整个页面</div>
        </div>
      </button>
    </div>
  );
}

function CMSPanel() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 mb-4">CMS 数据管理</h3>
      
      <div className="space-y-3">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="font-medium text-gray-900 mb-2">产品数据</div>
          <div className="text-sm text-gray-500">3 个产品</div>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
            管理产品 &rarr;
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="font-medium text-gray-900 mb-2">新闻资讯</div>
          <div className="text-sm text-gray-500">0 条新闻</div>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
            添加新闻 &rarr;
          </button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="font-medium text-gray-900 mb-2">团队成员</div>
          <div className="text-sm text-gray-500">0 位成员</div>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
            添加成员 &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

function Database({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
