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