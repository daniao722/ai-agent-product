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
  Sparkles,
  Brain,
} from 'lucide-react';

interface TopNavbarProps {
  currentCenter: string;
  onCenterChange: (center: string, firstPage: string) => void;
}

const centers = [
  { id: 'dashboard', label: '数据看板', icon: LayoutDashboard, firstPage: 'dashboard' },
  { id: 'website', label: '站点管理', icon: Globe, firstPage: 'content' },
  { id: 'marketing', label: '营销增长', icon: TrendingUp, firstPage: 'marketing-overview' },
  { id: 'content-center', label: '内容智能', icon: FileText, firstPage: 'content-overview' },
  { id: 'sales', label: '销售转化', icon: Users, firstPage: 'sales-overview' },
  { id: 'ai-agent', label: 'AI智能', icon: Brain, firstPage: 'agent-overview' },
  { id: 'service', label: '服务体验', icon: Headphones, firstPage: 'service-overview' },
  { id: 'commerce', label: '交易履约', icon: CreditCard, firstPage: 'commerce-overview' },
  { id: 'analytics', label: '增长智能', icon: BarChart3, firstPage: 'analytics-overview' },
  { id: 'global', label: '全球拓展', icon: Globe2, firstPage: 'global-overview' },
];

export default function TopNavbar({ currentCenter, onCenterChange }: TopNavbarProps) {
  const isActive = (centerId: string) => {
    if (centerId === 'dashboard') return currentCenter === 'dashboard';
    return currentCenter === centerId || currentCenter.startsWith(centerId.replace('-', ''));
  };

  const isCenterActive = (centerId: string) => {
    if (centerId === 'dashboard') return currentCenter === 'dashboard';
    if (centerId === 'website') return ['content', 'products', 'navigation', 'banner', 'seo', 'security', 'domain'].includes(currentCenter);
    if (centerId === 'marketing') return currentCenter.startsWith('marketing') || ['conversion-diagnosis', 'auto-optimization', 'design-work-order', 'seo-optimization', 'channels', 'geo', 'traffic'].includes(currentCenter);
    if (centerId === 'content-center') return currentCenter.startsWith('content');
    if (centerId === 'sales') return currentCenter.startsWith('sales');
    if (centerId === 'ai-agent') return currentCenter.startsWith('agent-') || currentCenter === 'ai-knowledge-base';
    if (centerId === 'service') return currentCenter.startsWith('service');
    if (centerId === 'commerce') return currentCenter.startsWith('commerce');
    if (centerId === 'analytics') return currentCenter.startsWith('analytics') || currentCenter === 'dashboard-analytics' || currentCenter === 'attribution' || currentCenter === 'reports' || currentCenter === 'competitors';
    if (centerId === 'global') return currentCenter.startsWith('global');
    return false;
  };

  const handleCenterClick = (centerId: string, firstPage: string) => {
    onCenterChange(centerId, firstPage);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-lg pointer-events-auto">
      <div className="max-w-full px-4 pointer-events-auto">
        <div className="flex items-center h-14 pointer-events-auto">
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center pointer-events-auto">
              <Globe className="w-5 h-5 text-white pointer-events-auto" />
            </div>
            <span className="text-lg font-bold text-white">数字门户</span>
          </div>
          <button
            onClick={() => onCenterChange('dashboard', 'growth-flywheel')}
            className="flex items-center gap-1.5 ml-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white hover:from-blue-600 hover:to-purple-600 transition-all whitespace-nowrap pointer-events-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden md:inline">AI 增长飞轮</span>
            <span className="md:hidden">飞轮</span>
          </button>
          
          <div className="flex items-center gap-1 flex-1 overflow-x-auto pointer-events-auto ml-2">
            {centers.map((center) => {
              const active = isCenterActive(center.id);
              return (
                <button
                  key={center.id}
                  onClick={() => handleCenterClick(center.id, center.firstPage)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer pointer-events-auto ${
                    active
                      ? 'bg-blue-600/30 text-white shadow-md'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <center.icon className="w-4 h-4" />
                  <span>{center.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
