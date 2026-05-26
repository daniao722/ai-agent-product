export interface Website {
  id: string;
  name: string;
  domain: string;
  language: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface App {
  id: string;
  websiteId: string;
  name: string;
  type: 'content' | 'product' | 'blog' | 'landing';
  status: 'active' | 'inactive';
}

export const websites: Website[] = [
  { id: '1', name: '主站官网', domain: 'www.example.com', language: 'zh-CN', status: 'active', createdAt: '2026-01-15' },
  { id: '2', name: '英文站点', domain: 'en.example.com', language: 'en', status: 'active', createdAt: '2026-02-20' },
  { id: '3', name: '日文站点', domain: 'jp.example.com', language: 'ja', status: 'active', createdAt: '2026-03-10' },
  { id: '4', name: '德语站点', domain: 'de.example.com', language: 'de', status: 'inactive', createdAt: '2026-04-05' },
];

export const apps: App[] = [
  { id: '1', websiteId: '1', name: '产品中心', type: 'product', status: 'active' },
  { id: '2', websiteId: '1', name: '解决方案', type: 'content', status: 'active' },
  { id: '3', websiteId: '1', name: '新闻动态', type: 'blog', status: 'active' },
  { id: '4', websiteId: '2', name: 'Product Center', type: 'product', status: 'active' },
  { id: '5', websiteId: '2', name: 'Solutions', type: 'content', status: 'active' },
  { id: '6', websiteId: '3', name: '製品センター', type: 'product', status: 'active' },
  { id: '7', websiteId: '1', name: '营销落地页', type: 'landing', status: 'active' },
];

export const languages = [
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: '英语', flag: '🇺🇸' },
  { code: 'ja', name: '日语', flag: '🇯🇵' },
  { code: 'de', name: '德语', flag: '🇩🇪' },
  { code: 'es', name: '西班牙语', flag: '🇪🇸' },
  { code: 'fr', name: '法语', flag: '🇫🇷' },
  { code: 'ko', name: '韩语', flag: '🇰🇷' },
  { code: 'pt', name: '葡萄牙语', flag: '🇵🇹' },
];

export const imageScenes = [
  { id: 'product-showcase', name: '产品展示', category: '产品', icon: '📦' },
  { id: 'exhibition-poster', name: '展会海报', category: '营销', icon: '🎨' },
  { id: 'advertising-banner', name: '广告横幅', category: '营销', icon: '📣' },
  { id: 'product-scene', name: '产品场景图', category: '产品', icon: '🏭' },
  { id: 'company-profile', name: '企业形象', category: '品牌', icon: '🏢' },
  { id: 'infographic', name: '信息图表', category: '营销', icon: '📊' },
];

export const videoScenes = [
  { id: 'product-demo', name: '产品演示视频', duration: '30-60秒', icon: '🎬' },
  { id: 'company-intro', name: '企业宣传片', duration: '1-2分钟', icon: '🏢' },
  { id: 'product-showcase', name: '产品展示视频', duration: '45-90秒', icon: '📦' },
  { id: 'how-to', name: '操作教程视频', duration: '2-5分钟', icon: '📖' },
  { id: 'testimonial', name: '客户案例视频', duration: '1-3分钟', icon: '💬' },
];

export const contentScenes = [
  { id: 'website', name: '官网版', description: '适合官网展示', usage: 234 },
  { id: 'social', name: '社媒推广版', description: '适合社交媒体发布', usage: 156 },
  { id: 'email', name: '开发信版', description: '适合邮件营销', usage: 89 },
  { id: 'advertisement', name: '广告版', description: '适合付费广告', usage: 312 },
  { id: 'newsletter', name: '新闻通讯版', description: '适合订阅邮件', usage: 76 },
];