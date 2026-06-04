import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

import Dashboard from './pages/Dashboard'
import ContentCalendar from './pages/strategy/ContentCalendar'
import TrendingTopics from './pages/strategy/TrendingTopics'
import CompetitorAnalysis from './pages/strategy/CompetitorAnalysis'
import ContentPlan from './pages/strategy/ContentPlan'
import CopyWorkshop from './pages/creation/CopyWorkshop'
import VisualCreation from './pages/creation/VisualCreation'
import VideoFactory from './pages/creation/VideoFactory'
import TerminologyConfig from './pages/brand/TerminologyConfig'
import AIAssistant from './pages/creation/AIAssistant'
import ContentHistory from './pages/creation/ContentHistory'
import ChannelConfig from './pages/distribution/ChannelConfig'
import EmailMarketing from './pages/distribution/EmailMarketing'
import WebsiteDistribution from './pages/distribution/WebsiteDistribution'
import DomesticSocial from './pages/distribution/DomesticSocial'
import InternationalSocial from './pages/distribution/InternationalSocial'
import GeneralReview from './pages/review/GeneralReview'
import PlatformReview from './pages/review/PlatformReview'
import ReviewConfig from './pages/review/ReviewConfig'
import ChannelStats from './pages/analytics/ChannelStats'
import ContentFunnel from './pages/analytics/ContentFunnel'
import LeadTracking from './pages/analytics/LeadTracking'
import KnowledgeBase from './pages/brand/KnowledgeBase'
import BrandAssets from './pages/brand/BrandAssets'
import ContentArchive from './pages/brand/ContentArchive'
import CreationRules from './pages/brand/CreationRules'
import PricingRules from './pages/token/PricingRules'
import QuotaManagement from './pages/token/QuotaManagement'
import UsageDetails from './pages/token/UsageDetails'

const PAGE_MAP = {
  dashboard: Dashboard,
  'strategy/calendar': ContentCalendar,
  'strategy/trending': TrendingTopics,
  'strategy/competitor': CompetitorAnalysis,
  'strategy/plan': ContentPlan,
  'creation/copy': CopyWorkshop,
  'creation/visual': VisualCreation,
  'creation/video': VideoFactory,
  'creation/terminology': TerminologyConfig,
  'creation/assistant': AIAssistant,
  'creation/history': ContentHistory,
  'distribution/channels': ChannelConfig,
  'distribution/email': EmailMarketing,
  'distribution/website': WebsiteDistribution,
  'distribution/domestic': DomesticSocial,
  'distribution/international': InternationalSocial,
  'review/general': GeneralReview,
  'review/platform': PlatformReview,
  'review/config': ReviewConfig,
  'analytics/channels': ChannelStats,
  'analytics/funnel': ContentFunnel,
  'analytics/leads': LeadTracking,
  'brand/knowledge': KnowledgeBase,
  'brand/assets': BrandAssets,
  'brand/archive': ContentArchive,
  'brand/rules': CreationRules,
  'token/pricing': PricingRules,
  'token/quota': QuotaManagement,
  'token/usage': UsageDetails,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const PageComponent = PAGE_MAP[currentPage] || Dashboard

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header currentPage={currentPage} />
        <main className="flex-1 overflow-auto">
          <PageComponent onNavigate={setCurrentPage} />
        </main>
      </div>
    </div>
  )
}
