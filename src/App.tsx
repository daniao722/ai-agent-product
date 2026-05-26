import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContentManagement from './components/website/ContentManagement';
import ProductManagement from './components/website/ProductManagement';
import NavigationManagement from './components/website/NavigationManagement';
import BannerManagement from './components/website/BannerManagement';
import SEOManagement from './components/website/SEOManagement';
import SecurityManagement from './components/website/SecurityManagement';
import DomainManagement from './components/website/DomainManagement';
// 营销增长中心
import MarketingOverview from './components/marketing/MarketingOverview';
import SEOOptimization from './components/marketing/SEOOptimization';
import ChannelRecommendation from './components/marketing/ChannelRecommendation';
import GEOOptimization from './components/marketing/GEOOptimization';
import TrafficAnalysis from './components/marketing/TrafficAnalysis';
// 内容智能中心
import ContentOverview from './components/content/ContentOverview';
import AIWriter from './components/content/AIWriter';
import AIImageGenerator from './components/content/AIImageGenerator';
import AIVideoCreator from './components/content/AIVideoCreator';
import ContentAssets from './components/content/ContentAssets';
import ContentStrategy from './components/content/ContentStrategy';
import GlobalContent from './components/content/GlobalContent';
import ContentAnalytics from './components/content/ContentAnalytics';
// 销售转化中心
import SalesOverview from './components/sales/SalesOverview';
import LeadManagement from './components/sales/LeadManagement';
import SmartReply from './components/sales/SmartReply';
import SmartQuote from './components/sales/SmartQuote';
import FollowUpManagement from './components/sales/FollowUpManagement';
import SalesFunnel from './components/sales/SalesFunnel';
import SalesEnablement from './components/sales/SalesEnablement';
import DealReview from './components/sales/DealReview';
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
  'seo-optimization': SEOOptimization,
  channels: ChannelRecommendation,
  geo: GEOOptimization,
  traffic: TrafficAnalysis,
  // 内容智能中心
  'content-center': ContentOverview,
  'content-overview': ContentOverview,
  'content-strategy': ContentStrategy,
  'ai-writer': AIWriter,
  'ai-image': AIImageGenerator,
  'ai-video': AIVideoCreator,
  'global-content': GlobalContent,
  'content-analytics': ContentAnalytics,
  'content-assets': ContentAssets,
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
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // 监听来自概览页面的导航事件
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && pageComponents[detail]) {
        setCurrentPage(detail);
      }
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  const PageComponent = pageComponents[currentPage] || Dashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="lg:ml-64">
        <PageComponent />
      </main>
    </div>
  );
}
