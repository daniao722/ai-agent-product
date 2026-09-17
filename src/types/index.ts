export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  lastLogin: string;
}

export interface PageContent {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  createdAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
  order: number;
}

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface SEOConfig {
  id: string;
  robots: string;
  sitemapEnabled: boolean;
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  updatedAt: string;
}

export interface SecurityRecord {
  id: string;
  type: 'attack' | 'warning' | 'success';
  message: string;
  ipAddress: string;
  timestamp: string;
}

export interface Domain {
  id: string;
  domainName: string;
  sslStatus: 'active' | 'expired' | 'pending';
  sslExpiryDate: string;
  createdAt: string;
}

export interface TrafficData {
  date: string;
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgTimeOnSite: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  customerId: string;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  avgOrderValue: number;
  newCustomers: number;
  returningCustomers: number;
}

export interface GlobalMarket {
  id: string;
  name: string;
  country: string;
  language: string;
  currency: string;
  complianceStatus: 'compliant' | 'pending' | 'non-compliant';
  marketPotential: 'high' | 'medium' | 'low';
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

export interface DashboardStats {
  totalUsers: number;
  totalPages: number;
  totalProducts: number;
  totalOrders: number;
  trafficGrowth: number;
  conversionRate: number;
  customerSatisfaction: number;
  activeCampaigns: number;
}

// ── Marketing Studio types (from marketing-frontend integration) ────────
export type FlowState =
  | 'IDLE'
  | 'DRAFTING_INTENT'
  | 'RESEARCHING'
  | 'COPY_DRAFT'
  | 'PAGE_GENERATING'
  | 'PAGE_EDITING'
  | 'PUBLISHED'

export type PageType =
  | 'product-marketing'
  | 'lead-gen'
  | 'brand'
  | 'promotion'
  | 'exhibition'

export type MessageRole = 'user' | 'assistant' | 'system'
export type MessageType = 'text' | 'thinking' | 'chips' | 'tool_call' | 'tool_result' | 'draft_section' | 'image'

export interface ChipOption {
  id: string
  label: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  type: MessageType
  content: string
  chips?: ChipOption[]
  timestamp: number
  agentName?: string
  isStreaming?: boolean
  imageUrl?: string
  imagePlacement?: string
}

export type AgentStep = 'research' | 'copywriting' | 'ui-design' | 'code-build'
export type StepStatus = 'pending' | 'active' | 'done'

export interface ProgressStep {
  id: AgentStep
  label: string
  status: StepStatus
  artifact?: string
}

export type SectionStatus = 'pending' | 'confirmed' | 'editing'
export type DataSource = 'ai' | 'backend' | 'hybrid'

export interface DraftSection {
  id: string
  title: string
  content: string
  dataSource: DataSource
  status: SectionStatus
  bindingInfo?: string
  imageDescription?: string
}

export interface RecognizedInfo {
  industry?: string
  mainProducts?: string
  targetMarket?: string
  competitors?: string[]
  language?: string
  sellingPoints?: string[]
  certifications?: string[]
  companyName?: string
  primaryColor?: string
}

export interface GeneratedImage {
  url: string
  placement: string
  prompt: string
  isMock: boolean
}

export interface CompanyInfo {
  name: string
  industry: string
  main_products: string
  website: string
  logo_url: string
  employee_count: string
  founded_year: string
  data_source: string
}

export interface ProductOption {
  id: string
  name: string
  model: string
  category: string
  imageUrl: string
  price: string
  url: string
  certs: string[]
}

export interface SidebarFields {
  competitorUrls: string
  sellingPoints: string
  targetAudience: string
  contactInfo: string
  selectedForms: string[]
  selectedProducts: ProductOption[]
  logoUrl: string
  heroImageUrl: string
  primaryColor: string
  language: string
  targetRegion: string
  enableImageGen: boolean
}

export const defaultSidebarFields: SidebarFields = {
  competitorUrls: '',
  sellingPoints: '',
  targetAudience: '',
  contactInfo: '',
  selectedForms: [],
  selectedProducts: [],
  logoUrl: '',
  heroImageUrl: '',
  primaryColor: '#4F46E5',
  language: '中文简体',
  targetRegion: '中国大陆',
  enableImageGen: false,
}

export interface SessionState {
  sessionId: string
  flowState: FlowState
  pageType: PageType | null
  recognizedInfo: RecognizedInfo
  messages: ChatMessage[]
  draftSections: DraftSection[]
  generatedHtml: string
  progressSteps: ProgressStep[]
}

export type SSEEventType =
  | 'text'
  | 'thinking'
  | 'tool_call'
  | 'tool_result'
  | 'question'
  | 'draft_section'
  | 'page_patch'
  | 'flow_state'
  | 'step_update'
  | 'recognized_info'
  | 'image_generated'
  | 'done'
  | 'error'

export interface SSEEvent {
  type: SSEEventType
  data: Record<string, unknown>
  sessionId?: string
}