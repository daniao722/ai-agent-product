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
  Menu,
  X,
  Palette,
  Sparkles,
  Brain,
  Bot,
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  currentCenter: string;
  onPageChange: (page: string) => void;
}

const centerMenus: Record<string, { id: string; label: string; icon?: React.ElementType; path?: string; comingSoon?: boolean }[]> = {
  dashboard: [
    { id: 'growth-flywheel', label: 'AI 增长飞轮', icon: Sparkles },
    { id: 'dashboard', label: '概览', icon: LayoutDashboard },
    { id: 'designer-login', label: '设计器', icon: Palette },
  ],
  website: [
    { id: 'content', label: '内容管理' },
    { id: 'products', label: '产品管理' },
    { id: 'navigation', label: '导航管理' },
    { id: 'banner', label: 'Banner管理' },
    { id: 'seo', label: 'SEO设置' },
    { id: 'security', label: '安全管理' },
    { id: 'domain', label: '域名管理' },
  ],
  marketing: [
    { id: 'marketing-overview', label: '概览' },
    { id: 'conversion-diagnosis', label: '转化诊断' },
    { id: 'auto-optimization', label: '自动优化' },
    { id: 'marketing-studio', label: '智能营销页工作台' },
    { id: 'design-work-order', label: '设计工单' },
    { id: 'seo-optimization', label: '智能SEO优化' },
    { id: 'channels', label: '渠道推荐' },
    { id: 'geo', label: 'GEO优化' },
    { id: 'traffic', label: '流量分析' },
  ],
  'content-center': [
    { id: 'content-overview', label: '概览' },
    { id: 'content-strategy', label: '内容策略' },
    { id: 'ai-writer', label: 'AI文案工场' },
    { id: 'ai-image', label: 'AI视觉创作' },
    { id: 'ai-video', label: 'AI视频工厂' },
    { id: 'global-content', label: '全球化内容' },
    { id: 'content-analytics', label: '内容效果分析' },
    { id: 'content-assets', label: '品牌资产库' },
  ],
  sales: [
    { id: 'sales-overview', label: '概览' },
    { id: 'leads', label: '智能线索中心' },
    { id: 'reply', label: 'AI智能响应' },
    { id: 'follow-up', label: '智能跟进管理' },
    { id: 'quotes', label: '智能报价与成交' },
    { id: 'sales-funnel', label: '销售漏斗与预测' },
    { id: 'sales-enablement', label: 'AI销售赋能' },
    { id: 'deal-review', label: '成交复盘与优化' },
  ],
  'ai-agent': [
    { id: 'agent-overview', label: '总览', icon: LayoutDashboard },
    { id: 'ai-knowledge-base', label: 'AI知识库' },
    { id: 'agent-visitor', label: 'AI访客行为分析' },
    { id: 'agent-content', label: 'AI内容运营' },
    { id: 'agent-personalize', label: 'AI个性化体验', comingSoon: true },
    { id: 'agent-service', label: 'AI智能客服PRO', comingSoon: true },
    { id: 'agent-abtest', label: 'AI A/B测试', comingSoon: true },
  ],
  service: [
    { id: 'service-overview', label: '概览' },
    { id: 'ai-support', label: 'AI客服' },
    { id: 'tickets', label: '工单管理' },
    { id: 'satisfaction', label: '满意度分析' },
  ],
  commerce: [
    { id: 'commerce-overview', label: '概览' },
    { id: 'quotations', label: '报价管理' },
    { id: 'contracts', label: '合同管理' },
    { id: 'orders', label: '订单管理' },
    { id: 'payments', label: '收款结算' },
  ],
  analytics: [
    { id: 'analytics-overview', label: '概览' },
    { id: 'dashboard-analytics', label: '数据仪表盘' },
    { id: 'attribution', label: '归因分析' },
    { id: 'reports', label: '智能报表' },
    { id: 'competitors', label: '竞品分析' },
  ],
  global: [
    { id: 'global-overview', label: '概览' },
    { id: 'market-research', label: '市场调研' },
    { id: 'compliance', label: '合规评估' },
    { id: 'localization', label: '本地化部署' },
    { id: 'risk-control', label: '风控监测' },
  ],
};

const centerIcons: Record<string, React.ElementType> = {
  website: Globe,
  marketing: TrendingUp,
  'content-center': FileText,
  sales: Users,
  service: Headphones,
  commerce: CreditCard,
  analytics: BarChart3,
  global: Globe2,
  designer: Palette,
  'ai-agent': Brain,
};

const centerNames: Record<string, string> = {
  dashboard: '数据看板',
  website: '站点管理',
  marketing: '营销增长',
  'content-center': '内容智能',
  sales: '销售转化',
  service: '服务体验',
  commerce: '交易履约',
  analytics: '增长智能',
  global: '全球拓展',
  designer: '设计器',
  'ai-agent': 'AI智能',
};

export default function Sidebar({ currentPage, currentCenter, onPageChange }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = centerMenus[currentCenter] || centerMenus['dashboard'];
  const CenterIcon = centerIcons[currentCenter] || LayoutDashboard;
  const centerName = centerNames[currentCenter] || '数据看板';

  const isActive = (itemId: string) => currentPage === itemId;

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-20 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`fixed top-14 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 lg:translate-x-0 h-[calc(100vh-3.5rem)] ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-2">
            <CenterIcon className="w-5 h-5 text-blue-600" />
            <span className="text-base font-semibold text-gray-800">{centerName}</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="py-2 overflow-y-auto h-[calc(100%-3.5rem)]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.comingSoon) {
                  alert(`${item.label} · 即将上线，敬请期待`);
                  return;
                }
                onPageChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200 ${
                item.comingSoon
                  ? 'text-gray-300 cursor-not-allowed'
                  : isActive(item.id)
                  ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}
              {!item.icon && <div className="w-4 h-4 flex-shrink-0" />}
              <span className={`text-sm ${item.comingSoon ? 'line-through' : ''}`}>{item.label}</span>
              {item.comingSoon && (
                <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">即将上线</span>
              )}
            </button>
          ))}
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
