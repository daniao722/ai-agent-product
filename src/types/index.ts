export type BusinessType = 'marketing' | 'content' | 'ecommerce';

export type Language = 'zh' | 'en';

export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'red';

export type LayoutStyle = 'modern' | 'classic' | 'minimal';

export interface WebsiteConfig {
  companyName: string;
  mainProducts: string;
  language: Language;
  businessType: BusinessType;
  colorScheme: ColorScheme;
  layoutStyle: LayoutStyle;
  customPrompt: string;
}

export type ComponentType = 
  | 'navigation' 
  | 'banner' 
  | 'product-list' 
  | 'product-detail' 
  | 'about-us' 
  | 'contact-form' 
  | 'image-gallery' 
  | 'video-section' 
  | 'testimonials' 
  | 'footer';

export interface ComponentData {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
}

export interface PageData {
  id: string;
  name: string;
  slug: string;
  components: ComponentData[];
}

export interface WebsiteData {
  config: WebsiteConfig;
  pages: PageData[];
}

export interface CMSItem {
  id: string;
  type: 'product' | 'news' | 'team' | 'testimonial';
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
