export type ValueChainStage = 'brand' | 'marketing' | 'transaction' | 'service';

export interface ValueChainData {
  brand: BrandData;
  marketing: MarketingData;
  transaction: TransactionData;
  service: ServiceData;
}

export interface BrandData {
  awareness: number;
  brandScore: number;
  mentions: number;
  sentiment: number;
  contentPublished: number;
  socialReach: number;
  topKeywords: { keyword: string; rank: number; traffic: number }[];
  brandStrength: { category: string; score: number }[];
}

export interface MarketingData {
  leads: number;
  conversionRate: number;
  campaignCount: number;
  adSpend: number;
  roi: number;
  channelPerformance: { channel: string; leads: number; conversion: number }[];
  topCampaigns: { name: string; leads: number; cost: number }[];
}

export interface TransactionData {
  orders: number;
  revenue: number;
  avgOrderValue: number;
  fulfillmentRate: number;
  returnRate: number;
  topProducts: { name: string; sales: number; quantity: number }[];
  salesTrend: { date: string; revenue: number; orders: number }[];
}

export interface ServiceData {
  tickets: number;
  satisfactionScore: number;
  resolutionTime: number;
  repeatRate: number;
  customerRetention: number;
  ticketCategories: { category: string; count: number }[];
  satisfactionTrend: { date: string; score: number }[];
}

export const VALUE_CHAIN_DATA: ValueChainData = {
  brand: {
    awareness: 78,
    brandScore: 85,
    mentions: 1234,
    sentiment: 88,
    contentPublished: 156,
    socialReach: 45678,
    topKeywords: [
      { keyword: '智能解决方案', rank: 3, traffic: 1250 },
      { keyword: '数字化转型', rank: 5, traffic: 890 },
      { keyword: '企业服务', rank: 8, traffic: 654 },
    ],
    brandStrength: [
      { category: '品牌认知', score: 78 },
      { category: '品牌形象', score: 82 },
      { category: '品牌信任', score: 85 },
      { category: '品牌忠诚', score: 72 },
    ],
  },
  marketing: {
    leads: 234,
    conversionRate: 12.5,
    campaignCount: 8,
    adSpend: 15680,
    roi: 3.2,
    channelPerformance: [
      { channel: '搜索引擎', leads: 89, conversion: 15.2 },
      { channel: '社交媒体', leads: 67, conversion: 9.8 },
      { channel: '内容营销', leads: 45, conversion: 18.5 },
      { channel: '推荐引流', leads: 33, conversion: 14.2 },
    ],
    topCampaigns: [
      { name: '春季促销活动', leads: 89, cost: 3200 },
      { name: '新品发布会', leads: 67, cost: 2800 },
      { name: '节日特惠', leads: 52, cost: 2100 },
    ],
  },
  transaction: {
    orders: 156,
    revenue: 234500,
    avgOrderValue: 1503,
    fulfillmentRate: 96.8,
    returnRate: 3.2,
    topProducts: [
      { name: '智能解决方案A', sales: 78500, quantity: 45 },
      { name: '数字化工具B', sales: 65200, quantity: 38 },
      { name: '企业服务C', sales: 52800, quantity: 28 },
    ],
    salesTrend: Array.from({ length: 7 }, (_, i) => ({
      date: `3/${25 + i}`,
      revenue: 28000 + Math.floor(Math.random() * 10000),
      orders: 18 + Math.floor(Math.random() * 10),
    })),
  },
  service: {
    tickets: 89,
    satisfactionScore: 4.6,
    resolutionTime: 2.3,
    repeatRate: 8.5,
    customerRetention: 92.5,
    ticketCategories: [
      { category: '产品咨询', count: 35 },
      { category: '技术支持', count: 28 },
      { category: '售后问题', count: 15 },
      { category: '建议反馈', count: 11 },
    ],
    satisfactionTrend: Array.from({ length: 7 }, (_, i) => ({
      date: `3/${25 + i}`,
      score: 4.3 + Math.random() * 0.6,
    })),
  },
};
