'use client';

import { ArrowLeft, Monitor, Smartphone, Tablet } from 'lucide-react';
import { WebsiteData } from '@/types';
import { ComponentRenderer } from './website-components/ComponentRenderer';
import { useState } from 'react';

interface WebsitePreviewProps {
  websiteData: WebsiteData;
  onBack: () => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export function WebsitePreview({ websiteData, onBack }: WebsitePreviewProps) {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const currentPage = websiteData.pages[0];

  const deviceSizes = {
    desktop: 'w-full max-w-none',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto',
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              返回编辑器
            </button>
            
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 rounded-md ${
                  device === 'desktop' 
                    ? 'bg-white shadow text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Monitor className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-2 rounded-md ${
                  device === 'tablet' 
                    ? 'bg-white shadow text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Tablet className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded-md ${
                  device === 'mobile' 
                    ? 'bg-white shadow text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Smartphone className="w-5 h-5" />
              </button>
            </div>

            <div className="text-sm text-gray-500">
              预览模式
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className={deviceSizes[device]}>
          <div className="bg-white shadow-2xl min-h-screen">
            {currentPage.components.map((component) => (
              <ComponentRenderer
                key={component.id}
                component={component}
                isEditable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
