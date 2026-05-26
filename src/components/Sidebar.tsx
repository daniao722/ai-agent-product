import { useState } from 'react';
import {
  LayoutDashboard,
  Globe,
  TrendingUp,
  FileText,
  Users,
  Headphones,
  CreditCard,
  BarChart3,
  Globe2,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard, path: '/dashboard' },
  {
    id: 'website',
    label: '网站管理中心',
    icon: Globe,
    path: '/website',
    children: [
      { id: 'content', label: '内容管理', path: '/website/content' },
      { id: 'products', label: '产品管理', path: '/website/products' },
      { id: 'navigation', label: '导航管理', path: '/website/navigation' },
      { id: 'banner', label: 'Banner管理', path: '/website/banner' },
      { id: 'seo', label: 'SEO设置', path: '/website/seo' },
      { id: 'security', label: '安全管理', path: '/website/security' },
      { id: 'domain', label: '域名管理', path: '/website/domain' },
    ],
  },
  {
    id: 'marketing',
    label: '营销增长中心',
    icon: TrendingUp,
    path: '/marketing',
    children: [
      { id: 'marketing-overview', label: '概览', path: '/marketing/overview' },
      { id: 'seo-optimization', label: '智能SEO优化', path: '/marketing/seo' },
      { id: 'channels', label: '渠道推荐', path: '/marketing/channels' },
      { id: 'geo', label: 'GEO优化', path: '/marketing/geo' },
      { id: 'traffic', label: '流量分析', path: '/marketing/traffic' },
    ],
  },
  {
    id: 'content-center',
    label: '内容智能中心',
    icon: FileText,
    path: '/content-center',
    children: [
      { id: 'content-overview', label: '概览', path: '/content-center/overview' },
      { id: 'content-strategy', label: '内容策略', path: '/content-center/strategy' },
      { id: 'ai-writer', label: 'AI文案工场', path: '/content-center/ai-writer' },
      { id: 'ai-image', label: 'AI视觉创作', path: '/content-center/ai-image' },
      { id: 'ai-video', label: 'AI视频工厂', path: '/content-center/ai-video' },
      { id: 'global-content', label: '全球化内容', path: '/content-center/global' },
      { id: 'content-analytics', label: '内容效果分析', path: '/content-center/analytics' },
      { id: 'content-assets', label: '品牌资产库', path: '/content-center/assets' },
    ],
  },
  {
    id: 'sales',
    label: '销售转化中心',
    icon: Users,
    path: '/sales',
    children: [
      { id: 'sales-overview', label: '概览', path: '/sales/overview' },
      { id: 'leads', label: '智能线索中心', path: '/sales/leads' },
      { id: 'reply', label: 'AI智能响应', path: '/sales/reply' },
      { id: 'follow-up', label: '智能跟进管理', path: '/sales/follow-up' },
      { id: 'quotes', label: '智能报价与成交', path: '/sales/quotes' },
      { id: 'sales-funnel', label: '销售漏斗与预测', path: '/sales/funnel' },
      { id: 'sales-enablement', label: 'AI销售赋能', path: '/sales/enablement' },
      { id: 'deal-review', label: '成交复盘与优化', path: '/sales/review' },
    ],
  },
  {
    id: 'service',
    label: '服务体验中心',
    icon: Headphones,
    path: '/service',
    children: [
      { id: 'service-overview', label: '概览', path: '/service/overview' },
      { id: 'ai-support', label: 'AI客服', path: '/service/ai-support' },
      { id: 'tickets', label: '工单管理', path: '/service/tickets' },
      { id: 'satisfaction', label: '满意度分析', path: '/service/satisfaction' },
    ],
  },
  {
    id: 'commerce',
    label: '交易履约中心',
    icon: CreditCard,
    path: '/commerce',
    children: [
      { id: 'commerce-overview', label: '概览', path: '/commerce/overview' },
      { id: 'quotations', label: '报价管理', path: '/commerce/quotations' },
      { id: 'contracts', label: '合同管理', path: '/commerce/contracts' },
      { id: 'orders', label: '订单管理', path: '/commerce/orders' },
      { id: 'payments', label: '收款结算', path: '/commerce/payments' },
    ],
  },
  {
    id: 'analytics',
    label: '增长智能中心',
    icon: BarChart3,
    path: '/analytics',
    children: [
      { id: 'analytics-overview', label: '概览', path: '/analytics/overview' },
      { id: 'dashboard-analytics', label: '数据仪表盘', path: '/analytics/dashboard' },
      { id: 'attribution', label: '归因分析', path: '/analytics/attribution' },
      { id: 'reports', label: '智能报表', path: '/analytics/reports' },
      { id: 'competitors', label: '竞品分析', path: '/analytics/competitors' },
    ],
  },
  {
    id: 'global',
    label: '全球拓展中心',
    icon: Globe2,
    path: '/global',
    children: [
      { id: 'global-overview', label: '概览', path: '/global/overview' },
      { id: 'market-research', label: '市场调研', path: '/global/market' },
      { id: 'compliance', label: '合规评估', path: '/global/compliance' },
      { id: 'localization', label: '本地化部署', path: '/global/localization' },
      { id: 'risk-control', label: '风控监测', path: '/global/risk' },
    ],
  },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
    );
  };

  const renderMenuItem = (item: typeof menuItems[0], depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.id);
    const isActive = currentPage === item.id || item.children?.some((child) => currentPage === child.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.id);
            } else {
              onPageChange(item.id);
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
            isActive
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          } ${depth > 0 ? `pl-${8 + depth * 4}` : ''}`}
        >
          <item.icon className="w-5 h-5" />
          <span className="flex-1">{item.label}</span>
          {hasChildren && (
            isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map((child) => renderMenuItem({ ...child, icon: ChevronRight }, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">数字门户</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="py-4 overflow-y-auto h-[calc(100%-64px)]">
          {menuItems.map(renderMenuItem)}
        </nav>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}