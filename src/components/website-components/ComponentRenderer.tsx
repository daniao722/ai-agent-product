'use client';

import { ComponentData } from '@/types';
import { Navigation } from './Navigation';
import { Banner } from './Banner';
import { ProductList } from './ProductList';
import { AboutUs } from './AboutUs';
import { ContactForm } from './ContactForm';
import { Footer } from './Footer';

interface ComponentRendererProps {
  component: ComponentData;
  isEditable?: boolean;
  onEdit?: (componentId: string, key: string, value: any) => void;
}

export function ComponentRenderer({ 
  component, 
  isEditable = false,
  onEdit 
}: ComponentRendererProps) {
  const handleEdit = (key: string, value: any) => {
    if (onEdit) {
      onEdit(component.id, key, value);
    }
  };

  switch (component.type) {
    case 'navigation':
      return (
        <Navigation 
          {...component.props}
          isEditable={isEditable}
          onEdit={handleEdit}
        />
      );
    case 'banner':
      return (
        <Banner 
          {...component.props}
          isEditable={isEditable}
          onEdit={handleEdit}
        />
      );
    case 'product-list':
      return (
        <ProductList 
          {...component.props}
          isEditable={isEditable}
          onEdit={handleEdit}
        />
      );
    case 'about-us':
      return (
        <AboutUs 
          {...component.props}
          isEditable={isEditable}
          onEdit={handleEdit}
        />
      );
    case 'contact-form':
      return (
        <ContactForm 
          {...component.props}
          isEditable={isEditable}
          onEdit={handleEdit}
        />
      );
    case 'footer':
      return (
        <Footer 
          {...component.props}
          isEditable={isEditable}
          onEdit={handleEdit}
        />
      );
    default:
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          未知组件类型: {component.type}
        </div>
      );
  }
}
