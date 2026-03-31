'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WebsiteWizard } from '@/components/WebsiteWizard';
import { WebsiteEditor } from '@/components/WebsiteEditor';
import { WebsitePreview } from '@/components/WebsitePreview';
import { WebsiteConfig, WebsiteData } from '@/types';

export default function Home() {
  const [step, setStep] = useState<'wizard' | 'editor' | 'preview'>('wizard');
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);

  const handleWizardComplete = (config: WebsiteConfig) => {
    const generatedData = generateWebsiteData(config);
    setWebsiteData(generatedData);
    setStep('editor');
  };

  const generateWebsiteData = (config: WebsiteConfig): WebsiteData => {
    return {
      config,
      pages: [
        {
          id: 'home',
          name: '首页',
          slug: '/',
          components: [
            {
              id: 'nav-1',
              type: 'navigation',
              props: { companyName: config.companyName },
            },
            {
              id: 'banner-1',
              type: 'banner',
              props: {
                title: `${config.companyName} - 专业的${config.mainProducts}供应商`,
                subtitle: '我们致力于为客户提供最优质的产品和服务',
                ctaText: '了解更多',
              },
            },
            {
              id: 'products-1',
              type: 'product-list',
              props: { title: '主营产品' },
            },
            {
              id: 'about-1',
              type: 'about-us',
              props: { companyName: config.companyName },
            },
            {
              id: 'contact-1',
              type: 'contact-form',
              props: {},
            },
            {
              id: 'footer-1',
              type: 'footer',
              props: { companyName: config.companyName },
            },
          ],
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                AI建站工具
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                网站建设
              </Link>
              <Link 
                href="/digital-employees" 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all"
              >
                🤖 数字员工
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {step === 'wizard' && (
        <WebsiteWizard onComplete={handleWizardComplete} />
      )}
      {step === 'editor' && websiteData && (
        <WebsiteEditor 
          websiteData={websiteData} 
          onUpdate={setWebsiteData}
          onPreview={() => setStep('preview')}
        />
      )}
      {step === 'preview' && websiteData && (
        <WebsitePreview 
          websiteData={websiteData}
          onBack={() => setStep('editor')}
        />
      )}
    </div>
  );
}
