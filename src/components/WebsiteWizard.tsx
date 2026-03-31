'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ShoppingBag, 
  Globe, 
  Palette, 
  Layout, 
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { WebsiteConfig } from '@/types';
import { cn } from '@/lib/utils';

interface WebsiteWizardProps {
  onComplete: (config: WebsiteConfig) => void;
}

const steps = [
  { id: 'company', title: '企业信息', icon: Building2 },
  { id: 'business', title: '业务类型', icon: ShoppingBag },
  { id: 'language', title: '网站语言', icon: Globe },
  { id: 'style', title: '样式风格', icon: Palette },
  { id: 'custom', title: '个性化需求', icon: MessageSquare },
];

export function WebsiteWizard({ onComplete }: WebsiteWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<Partial<WebsiteConfig>>({
    language: 'zh',
    businessType: 'marketing',
    colorScheme: 'blue',
    layoutStyle: 'modern',
    customPrompt: '',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(config as WebsiteConfig);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateConfig = (key: keyof WebsiteConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return config.companyName?.trim() && config.mainProducts?.trim();
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">AI 智能建站</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">创建您的企业网站</h1>
          <p className="text-lg text-gray-600">只需几步，AI 为您生成专业的企业网站</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-blue-500 text-white scale-110 shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  )}>
                    {index < currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={cn(
                    'mt-2 text-sm font-medium',
                    index === currentStep ? 'text-blue-600' : 'text-gray-500'
                  )}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    'w-16 h-1 mx-2',
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <CompanyStep 
                  config={config} 
                  updateConfig={updateConfig} 
                />
              )}
              {currentStep === 1 && (
                <BusinessStep 
                  config={config} 
                  updateConfig={updateConfig} 
                />
              )}
              {currentStep === 2 && (
                <LanguageStep 
                  config={config} 
                  updateConfig={updateConfig} 
                />
              )}
              {currentStep === 3 && (
                <StyleStep 
                  config={config} 
                  updateConfig={updateConfig} 
                />
              )}
              {currentStep === 4 && (
                <CustomStep 
                  config={config} 
                  updateConfig={updateConfig} 
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              上一步
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                !isStepValid()
                  ? 'opacity-50 cursor-not-allowed bg-gray-300'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
              )}
            >
              {currentStep === steps.length - 1 ? '生成网站' : '下一步'}
              {currentStep !== steps.length - 1 && (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyStep({ config, updateConfig }: { 
  config: Partial<WebsiteConfig>; 
  updateConfig: (key: keyof WebsiteConfig, value: any) => void; 
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">企业基本信息</h2>
        <p className="text-gray-600">告诉我们您的企业信息</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            企业名称
          </label>
          <input
            type="text"
            value={config.companyName || ''}
            onChange={(e) => updateConfig('companyName', e.target.value)}
            placeholder="例如：上海科技有限公司"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            主营产品/服务
          </label>
          <input
            type="text"
            value={config.mainProducts || ''}
            onChange={(e) => updateConfig('mainProducts', e.target.value)}
            placeholder="例如：智能家居设备、软件开发"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

function BusinessStep({ config, updateConfig }: { 
  config: Partial<WebsiteConfig>; 
  updateConfig: (key: keyof WebsiteConfig, value: any) => void; 
}) {
  const options = [
    { value: 'marketing', label: '营销型', desc: '重点展示产品优势，促进转化', icon: '📈' },
    { value: 'content', label: '内容展示型', desc: '展示企业信息和新闻资讯', icon: '📰' },
    { value: 'ecommerce', label: '电商型', desc: '在线销售产品，支持购物车', icon: '🛒' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">业务类型</h2>
        <p className="text-gray-600">选择您的网站主要用途</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => updateConfig('businessType', option.value)}
            className={cn(
              'p-6 rounded-xl border-2 text-left transition-all',
              config.businessType === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            )}
          >
            <div className="text-3xl mb-3">{option.icon}</div>
            <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
            <div className="text-sm text-gray-500">{option.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LanguageStep({ config, updateConfig }: { 
  config: Partial<WebsiteConfig>; 
  updateConfig: (key: keyof WebsiteConfig, value: any) => void; 
}) {
  const options = [
    { value: 'zh', label: '中文', flag: '🇨🇳' },
    { value: 'en', label: '英文', flag: '🇺🇸' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">网站语言</h2>
        <p className="text-gray-600">选择您网站的主要语言</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => updateConfig('language', option.value)}
            className={cn(
              'p-6 rounded-xl border-2 text-center transition-all',
              config.language === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            )}
          >
            <div className="text-4xl mb-3">{option.flag}</div>
            <div className="font-semibold text-gray-900 text-lg">{option.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StyleStep({ config, updateConfig }: { 
  config: Partial<WebsiteConfig>; 
  updateConfig: (key: keyof WebsiteConfig, value: any) => void; 
}) {
  const colorOptions = [
    { value: 'blue', label: '科技蓝', color: '#3b82f6' },
    { value: 'green', label: '自然绿', color: '#22c55e' },
    { value: 'purple', label: '创意紫', color: '#a855f7' },
    { value: 'orange', label: '活力橙', color: '#f97316' },
    { value: 'red', label: '热情红', color: '#ef4444' },
  ];

  const layoutOptions = [
    { value: 'modern', label: '现代风', desc: '简洁大气，适合科技企业' },
    { value: 'classic', label: '经典风', desc: '稳重专业，适合传统企业' },
    { value: 'minimal', label: '简约风', desc: '极简设计，突出内容' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">样式风格</h2>
        <p className="text-gray-600">选择您喜欢的颜色和布局风格</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">配色方案</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateConfig('colorScheme', option.value)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-xl transition-all',
                config.colorScheme === option.value
                  ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                  : 'hover:bg-gray-50'
              )}
            >
              <div 
                className="w-12 h-12 rounded-full shadow-md"
                style={{ backgroundColor: option.color }}
              />
              <span className="text-sm font-medium text-gray-700">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">布局风格</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {layoutOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateConfig('layoutStyle', option.value)}
              className={cn(
                'p-6 rounded-xl border-2 text-center transition-all',
                config.layoutStyle === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              )}
            >
              <div className="font-semibold text-gray-900 mb-2">{option.label}</div>
              <div className="text-sm text-gray-500">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomStep({ config, updateConfig }: { 
  config: Partial<WebsiteConfig>; 
  updateConfig: (key: keyof WebsiteConfig, value: any) => void; 
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">个性化需求</h2>
        <p className="text-gray-600">告诉 AI 您的特殊需求（可选）</p>
      </div>
      <div>
        <textarea
          value={config.customPrompt || ''}
          onChange={(e) => updateConfig('customPrompt', e.target.value)}
          placeholder="例如：我希望网站突出我们的技术创新优势，添加一个团队介绍页面，配色要更年轻化一些..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="text-sm text-gray-500 mt-2">
          💡 提示：您可以描述想要的功能、内容重点、特殊设计要求等
        </p>
      </div>
    </div>
  );
}
