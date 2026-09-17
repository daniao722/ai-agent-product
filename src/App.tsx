import React, { useState, useEffect } from 'react';
import TopNavbar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import ContentSidebar from './components/content-center/ContentSidebar';
import ContentHeader from './components/content-center/ContentHeader';
import Dashboard from './components/Dashboard';
import GrowthFlywheel from './components/GrowthFlywheel';
import ContentManagement from './components/website/ContentManagement';
import ProductManagement from './components/website/ProductManagement';
import NavigationManagement from './components/website/NavigationManagement';
import BannerManagement from './components/website/BannerManagement';
import SEOManagement from './components/website/SEOManagement';
import SecurityManagement from './components/website/SecurityManagement';
import DomainManagement from './components/website/DomainManagement';
// 设计器
import DesignerLogin from './components/designer/DesignerLogin';
import DesignerDashboard from './components/designer/DesignerDashboard';
import DesignerWorkspace from './components/designer/DesignerWorkspace';
import TemplatePreview from './components/designer/TemplatePreview';
// 营销增长中心
import MarketingOverview from './components/marketing/MarketingOverview';
import ConversionDiagnosis from './components/marketing/ConversionDiagnosis';
import AutoOptimization from './components/marketing/AutoOptimization';
import DesignWorkOrder from './components/marketing/DesignWorkOrder';
import SEOOptimization from './components/marketing/SEOOptimization';
import ChannelRecommendation from './components/marketing/ChannelRecommendation';
import GEOOptimization from './components/marketing/GEOOptimization';
import TrafficAnalysis from './components/marketing/TrafficAnalysis';
// 内容智能中心 (content-hub)
import ContentDashboard from './components/content-center/Dashboard';
import AgentChat from './components/content-center/creation/AgentChat';
import TranslateTool from './components/content-center/creation/TranslateTool';
import SocialDistribution from './components/content-center/distribution/SocialDistribution';
import ContentFission from './components/content-center/distribution/ContentFission';
import SchedulePublish from './components/content-center/distribution/SchedulePublish';
import DataOverview from './components/content-center/analytics/DataOverview';
import ContentPerformance from './components/content-center/analytics/ContentPerformance';
import BrandGuidelines from './components/content-center/brand/BrandGuidelines';
import Terminology from './components/content-center/brand/Terminology';
import QuotaManagement from './components/content-center/token/QuotaManagement';
// New pages
import BrandStory from './components/content-center/asset/BrandStory';
import ProductInfo from './components/content-center/asset/ProductInfo';
import Solutions from './components/content-center/asset/Solutions';
import FAQManagement from './components/content-center/asset/FAQManagement';
import IndustryInsights from './components/content-center/asset/IndustryInsights';
import AssetIntegrity from './components/content-center/asset/AssetIntegrity';
import WeeklyPlan from './components/content-center/plan/WeeklyPlan';
import AutoUpdatePlan from './components/content-center/plan/AutoUpdatePlan';
import UrgentContent from './components/content-center/plan/UrgentContent';
import IndustryTemplate from './components/content-center/plan/IndustryTemplate';
import ContentDiagnosis from './components/content-center/optimize/ContentDiagnosis';
import OptimizeSuggestions from './components/content-center/optimize/OptimizeSuggestions';
import OneClickOptimize from './components/content-center/optimize/OneClickOptimize';
import ABTest from './components/content-center/optimize/ABTest';
import StructureStandard from './components/content-center/optimize/StructureStandard';
// 销售转化中心
import SalesOverview from './components/sales/SalesOverview';
import LeadManagement from './components/sales/LeadManagement';
import SmartReply from './components/sales/SmartReply';
import SmartQuote from './components/sales/SmartQuote';
import FollowUpManagement from './components/sales/FollowUpManagement';
import SalesFunnel from './components/sales/SalesFunnel';
import SalesEnablement from './components/sales/SalesEnablement';
import DealReview from './components/sales/DealReview';
// AI智能中心（PRD v1.4：AI知识库 + 五大智能体，一期2个）
import AgentOverview from './components/ai-agent/AgentOverview';
import KnowledgeBase from './components/ai-agent/KnowledgeBase';
import AgentVisitorAnalysis from './components/ai-agent/AgentVisitorAnalysis';
import AgentContentOps from './components/ai-agent/AgentContentOps';
import MarketingStudio from './pages/studio/MarketingStudio';
// 服务体验中心
import ServiceOverview from './components/service/ServiceOverview';
import AISupport from './components/service/AISupport';
import TicketManagement from './components/service/TicketManagement';
import SatisfactionAnalysis from './components/service/SatisfactionAnalysis';
// 交易履约中心
import CommerceOverview from './components/commerce/CommerceOverview';
import QuotationManagement from './components/commerce/QuotationManagement';
import ContractManagement from './components/commerce/ContractManagement';
import OrderManagement from './components/commerce/OrderManagement';
import PaymentSettlement from './components/commerce/PaymentSettlement';
// 增长智能中心
import AnalyticsOverview from './components/analytics/AnalyticsOverview';
import DataDashboard from './components/analytics/DataDashboard';
import AttributionAnalysis from './components/analytics/AttributionAnalysis';
import SmartReports from './components/analytics/SmartReports';
import CompetitorAnalysis from './components/analytics/CompetitorAnalysis';
// 全球拓展中心
import GlobalOverview from './components/global/GlobalOverview';
import MarketResearch from './components/global/MarketResearch';
import ComplianceAssessment from './components/global/ComplianceAssessment';
import LocalizationDeploy from './components/global/LocalizationDeploy';
import RiskMonitoring from './components/global/RiskMonitoring';

const pageComponents: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  'growth-flywheel': GrowthFlywheel,
  // 网站管理中心
  content: ContentManagement,
  products: ProductManagement,
  navigation: NavigationManagement,
  banner: BannerManagement,
  seo: SEOManagement,
  security: SecurityManagement,
  domain: DomainManagement,
  // 营销增长中心
  marketing: MarketingOverview,
  'marketing-overview': MarketingOverview,
  'conversion-diagnosis': ConversionDiagnosis,
  'auto-optimization': AutoOptimization,
  'design-work-order': DesignWorkOrder,
  'seo-optimization': SEOOptimization,
  channels: ChannelRecommendation,
  geo: GEOOptimization,
  traffic: TrafficAnalysis,
  // 内容智能中心 (new structure)
  'content-overview': ContentDashboard,
  // 内容资产库
  'asset/brand': BrandStory,
  'asset/product': ProductInfo,
  'asset/solution': Solutions,
  'asset/faq': FAQManagement,
  'asset/insight': IndustryInsights,
  'asset/integrity': AssetIntegrity,
  // 生成计划
  'plan/weekly': WeeklyPlan,
  'plan/auto': AutoUpdatePlan,
  'plan/urgent': UrgentContent,
  'plan/template': IndustryTemplate,
  // AI 创作
  'creation/agent': AgentChat,
  'creation/translate': TranslateTool,
  // 智能优化
  'optimize/diagnosis': ContentDiagnosis,
  'optimize/suggestions': OptimizeSuggestions,
  'optimize/auto': OneClickOptimize,
  'optimize/abtest': ABTest,
  'optimize/structure': StructureStandard,
  // 内容分发
  'distribution/social': SocialDistribution,
  'distribution/fission': ContentFission,
  'distribution/schedule': SchedulePublish,
  // 效果分析
  'analytics/overview': DataOverview,
  'analytics/content': ContentPerformance,
  // 品牌管理
  'brand/guidelines': BrandGuidelines,
  'brand/terminology': Terminology,
  // Token 管理
  'token/quota': QuotaManagement,
  // 销售转化中心
  sales: SalesOverview,
  'sales-overview': SalesOverview,
  leads: LeadManagement,
  reply: SmartReply,
  quotes: SmartQuote,
  'follow-up': FollowUpManagement,
  'sales-funnel': SalesFunnel,
  'sales-enablement': SalesEnablement,
  'deal-review': DealReview,
  // AI智能中心（PRD v1.4 一期：总览 + AI知识库 + 2 个智能体）
  'agent-overview': AgentOverview,
  'ai-knowledge-base': KnowledgeBase,
  'agent-visitor': AgentVisitorAnalysis,
  'agent-content': AgentContentOps,
  'marketing-studio': MarketingStudio,
  // 服务体验中心
  service: ServiceOverview,
  'service-overview': ServiceOverview,
  'ai-support': AISupport,
  tickets: TicketManagement,
  satisfaction: SatisfactionAnalysis,
  // 交易履约中心
  commerce: CommerceOverview,
  'commerce-overview': CommerceOverview,
  quotations: QuotationManagement,
  contracts: ContractManagement,
  orders: OrderManagement,
  payments: PaymentSettlement,
  // 增长智能中心
  analytics: AnalyticsOverview,
  'analytics-overview': AnalyticsOverview,
  'dashboard-analytics': DataDashboard,
  attribution: AttributionAnalysis,
  reports: SmartReports,
  competitors: CompetitorAnalysis,
  // 全球拓展中心
  global: GlobalOverview,
  'global-overview': GlobalOverview,
  'market-research': MarketResearch,
  compliance: ComplianceAssessment,
  localization: LocalizationDeploy,
  'risk-control': RiskMonitoring,
  // 设计器
  'designer-login': DesignerLogin,
  'designer-dashboard': DesignerDashboard,
  'designer-workspace': DesignerWorkspace,
  'template-preview': TemplatePreview,
};

const pageToCenter: Record<string, string> = {
  dashboard: 'dashboard',
  'growth-flywheel': 'dashboard',
  // 网站管理中心
  content: 'website',
  products: 'website',
  navigation: 'website',
  banner: 'website',
  seo: 'website',
  security: 'website',
  domain: 'website',
  // 营销增长中心
  marketing: 'marketing',
  'marketing-overview': 'marketing',
  'conversion-diagnosis': 'marketing',
  'auto-optimization': 'marketing',
  'design-work-order': 'marketing',
  'seo-optimization': 'marketing',
  channels: 'marketing',
  geo: 'marketing',
  traffic: 'marketing',
  // 内容智能中心
  'content-center': 'content-center',
  'content-overview': 'content-center',
  // 内容资产库
  'asset/brand': 'content-center',
  'asset/product': 'content-center',
  'asset/solution': 'content-center',
  'asset/faq': 'content-center',
  'asset/insight': 'content-center',
  'asset/integrity': 'content-center',
  // 生成计划
  'plan/weekly': 'content-center',
  'plan/auto': 'content-center',
  'plan/urgent': 'content-center',
  'plan/template': 'content-center',
  // AI 创作
  'creation/agent': 'content-center',
  'creation/translate': 'content-center',
  // 智能优化
  'optimize/diagnosis': 'content-center',
  'optimize/suggestions': 'content-center',
  'optimize/auto': 'content-center',
  'optimize/abtest': 'content-center',
  'optimize/structure': 'content-center',
  // 内容分发
  'distribution/social': 'content-center',
  'distribution/fission': 'content-center',
  'distribution/schedule': 'content-center',
  // 效果分析
  'analytics/overview': 'content-center',
  'analytics/content': 'content-center',
  // 品牌管理
  'brand/guidelines': 'content-center',
  'brand/terminology': 'content-center',
  // Token 管理
  'token/quota': 'content-center',
  // 销售转化中心
  sales: 'sales',
  'sales-overview': 'sales',
  leads: 'sales',
  reply: 'sales',
  quotes: 'sales',
  'follow-up': 'sales',
  'sales-funnel': 'sales',
  'sales-enablement': 'sales',
  'deal-review': 'sales',
  // AI智能中心（PRD v1.4 一期）
  'agent-overview': 'ai-agent',
  'ai-knowledge-base': 'ai-agent',
  'agent-visitor': 'ai-agent',
  'agent-content': 'ai-agent',
  'marketing-studio': 'marketing',
  // 服务体验中心
  service: 'service',
  'service-overview': 'service',
  'ai-support': 'service',
  tickets: 'service',
  satisfaction: 'service',
  // 交易履约中心
  commerce: 'commerce',
  'commerce-overview': 'commerce',
  quotations: 'commerce',
  contracts: 'commerce',
  orders: 'commerce',
  payments: 'commerce',
  // 增长智能中心
  analytics: 'analytics',
  'analytics-overview': 'analytics',
  'dashboard-analytics': 'analytics',
  attribution: 'analytics',
  reports: 'analytics',
  competitors: 'analytics',
  // 全球拓展中心
  global: 'global',
  'global-overview': 'global',
  'market-research': 'global',
  compliance: 'global',
  localization: 'global',
  'risk-control': 'global',
  // 设计器
  'designer-login': 'designer',
  'designer-dashboard': 'designer',
  'designer-workspace': 'designer',
  'template-preview': 'designer',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    if (hash === '/designer' || hash === '/designer-login') return 'designer-login';
    if (hash === '/designer/workspace') return 'designer-workspace';
    if (hash.startsWith('/template-preview/')) return 'template-preview';
    if (hash === '/growth-flywheel') return 'growth-flywheel';
    return 'dashboard';
  });
  const [currentCenter, setCurrentCenter] = useState(() => {
    const hash = window.location.hash.slice(1);
    if (hash === '/designer' || hash === '/designer-login' || hash === '/designer/workspace' || hash.startsWith('/template-preview/')) return 'designer';
    return 'dashboard';
  });

  // 监听 URL hash 变化，支持设计器独立地址访问
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === '/designer' || hash === '/designer-login') {
        setCurrentPage('designer-login');
        setCurrentCenter('designer');
      } else if (hash === '/designer/workspace') {
        setCurrentPage('designer-workspace');
        setCurrentCenter('designer');
      } else if (hash.startsWith('/template-preview/')) {
        setCurrentPage('template-preview');
        setCurrentCenter('designer');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 监听来自概览页面的导航事件
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && pageComponents[detail]) {
        setCurrentPage(detail);
        const center = pageToCenter[detail];
        if (center) {
          setCurrentCenter(center);
        }
      }
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    const center = pageToCenter[page];
    if (center) {
      setCurrentCenter(center);
    }
  };

  const handleCenterChange = (center: string, firstPage: string) => {
    setCurrentCenter(center);
    setCurrentPage(firstPage);
  };

  const PageComponent = pageComponents[currentPage] || Dashboard;

  const isContentCenter = currentCenter === 'content-center';
  const isDesigner = currentCenter === 'designer';

  // Designer pages have their own layout
  if (isDesigner) {
    if (currentPage === 'designer-login') {
      return <DesignerLogin onLogin={() => setCurrentPage('designer-dashboard')} />;
    }
    if (currentPage === 'template-preview') {
      return <TemplatePreview />;
    }
    if (currentPage === 'designer-dashboard') {
      return (
        <DesignerDashboard
          onBack={() => setCurrentPage('dashboard')}
          onNewPage={() => setCurrentPage('designer-workspace')}
          onEditPage={(page) => {
            if (page.source === 'detail') {
              setCurrentPage('designer-workspace');
            }
          }}
        />
      );
    }
    return <DesignerWorkspace onBack={() => setCurrentPage('designer-dashboard')} />;
  }

  // Growth Flywheel: standalone full-screen layout
  if (currentPage === 'growth-flywheel') {
    return <GrowthFlywheel onNavigate={handlePageChange} />;
  }

  // content-hub pages need onNavigate prop, other pages don't
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PageContent = isContentCenter
    ? React.createElement(PageComponent as any, { onNavigate: handlePageChange })
    : React.createElement(PageComponent as any);

  if (isContentCenter) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        <TopNavbar currentCenter={currentCenter} onCenterChange={handleCenterChange} />
        <div className="flex flex-1 overflow-hidden">
          <ContentSidebar currentPage={currentPage} onNavigate={handlePageChange} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <ContentHeader currentPage={currentPage} />
            <main className="flex-1 overflow-auto">
              {PageContent}
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar currentCenter={currentCenter} onCenterChange={handleCenterChange} />
      <Sidebar currentPage={currentPage} currentCenter={currentCenter} onPageChange={handlePageChange} />
      <main className="lg:ml-64 pt-14">
        {PageContent}
      </main>
    </div>
  );
}
