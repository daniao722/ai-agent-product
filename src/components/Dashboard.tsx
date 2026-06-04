import { useState, useEffect } from 'react';
import {
  Users,
  FileText,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3,
  Globe,
  Clock,
  Target,
  Award,
  Calendar
} from 'lucide-react';
import { DashboardStats, TrafficData, Lead } from '../types';
import { getLeadStatusColor, getLeadStatusLabel } from '../lib/agent-utils';

const mockDashboardStats: DashboardStats = {
  totalUsers: 12453,
  totalPages: 892,
  totalProducts: 2341,
  totalOrders: 389,
  trafficGrowth: 12.5,
  conversionRate: 3.8,
  customerSatisfaction: 94.2,
  activeCampaigns: 12,
};

const mockTrafficData: TrafficData[] = [
  { date: '05-14', visitors: 1200, pageViews: 3500, bounceRate: 45, avgTimeOnSite: 240 },
  { date: '05-15', visitors: 1350, pageViews: 4200, bounceRate: 42, avgTimeOnSite: 265 },
  { date: '05-16', visitors: 1420, pageViews: 4800, bounceRate: 38, avgTimeOnSite: 290 },
  { date: '05-17', visitors: 1180, pageViews: 3200, bounceRate: 48, avgTimeOnSite: 220 },
  { date: '05-18', visitors: 1560, pageViews: 5200, bounceRate: 35, avgTimeOnSite: 310 },
  { date: '05-19', visitors: 1680, pageViews: 5800, bounceRate: 32, avgTimeOnSite: 340 },
  { date: '05-20', visitors: 1820, pageViews: 6200, bounceRate: 30, avgTimeOnSite: 365 },
];

const mockRecentLeads: Lead[] = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', phone: '13800138001', company: 'ABC科技', score: 92, status: 'qualified', source: '官网表单', createdAt: '2026-05-20 14:30' },
  { id: '2', name: '李四', email: 'lisi@example.com', phone: '13900139002', company: 'XYZ集团', score: 78, status: 'contacted', source: 'Google广告', createdAt: '2026-05-20 13:15' },
  { id: '3', name: '王五', email: 'wangwu@example.com', phone: '13700137003', company: 'DEF制造', score: 85, status: 'new', source: '社交媒体', createdAt: '2026-05-20 11:45' },
  { id: '4', name: '赵六', email: 'zhaoliu@example.com', phone: '13600136004', company: 'GHI贸易', score: 95, status: 'converted', source: '官网表单', createdAt: '2026-05-19 16:20' },
  { id: '5', name: '孙七', email: 'sunqi@example.com', phone: '13500135005', company: 'JKL物流', score: 65, status: 'new', source: '合作伙伴', createdAt: '2026-05-19 14:00' },
];

const StatCard = ({ icon: Icon, title, value, change, changeType }: {
  icon: typeof Users;
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
        {change && (
          <div className={`flex items-center gap-1 mt-2 text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {changeType === 'increase' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{change}%</span>
            <span className="text-gray-400">vs 上周</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
        changeType === 'increase' ? 'bg-green-50' : 'bg-blue-50'
      }`}>
        <Icon className={`w-6 h-6 ${changeType === 'increase' ? 'text-green-600' : 'text-blue-600'}`} />
      </div>
    </div>
  </div>
);

const TrafficChart = () => {
  const maxPageViews = Math.max(...mockTrafficData.map(d => d.pageViews));
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">流量趋势</h3>
          <p className="text-sm text-gray-500">过去7天的页面浏览量</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">页面浏览</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">访客数</span>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between h-48 gap-3">
        {mockTrafficData.map((item) => (
          <div key={item.date} className="flex-1 flex flex-col items-center">
            <div className="w-full flex gap-1 items-end justify-center h-40">
              <div
                className="bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                style={{ height: `${(item.pageViews / maxPageViews) * 100}%`, width: '40%' }}
                title={`页面浏览: ${item.pageViews}`}
              />
              <div
                className="bg-green-500 rounded-t-md transition-all hover:bg-green-600"
                style={{ height: `${(item.visitors / maxPageViews) * 100}%`, width: '40%' }}
                title={`访客数: ${item.visitors}`}
              />
            </div>
            <span className="text-xs text-gray-500 mt-2">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentLeads = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">最新线索</h3>
          <p className="text-sm text-gray-500">最近获取的潜在客户</p>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">查看全部</button>
      </div>
      <div className="space-y-4">
        {mockRecentLeads.map((lead) => (
          <div key={lead.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{lead.name}</p>
                <p className="text-sm text-gray-500">{lead.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">评分: {lead.score}</p>
                <p className="text-xs text-gray-400">{lead.createdAt}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeadStatusColor(lead.status)}`}>
                {getLeadStatusLabel(lead.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickStats = () => (
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm opacity-80">转化率</p>
          <p className="text-2xl font-bold">{mockDashboardStats.conversionRate}%</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-sm">
        <ArrowUpRight className="w-4 h-4" />
        <span>+1.2% vs 上月</span>
      </div>
    </div>
    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm opacity-80">客户满意度</p>
          <p className="text-2xl font-bold">{mockDashboardStats.customerSatisfaction}%</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-sm">
        <ArrowUpRight className="w-4 h-4" />
        <span>+2.5% vs 上月</span>
      </div>
    </div>
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm opacity-80">平均停留时间</p>
          <p className="text-2xl font-bold">5分45秒</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-sm">
        <ArrowUpRight className="w-4 h-4" />
        <span>+30秒 vs 上月</span>
      </div>
    </div>
    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-5 text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm opacity-80">活跃活动</p>
          <p className="text-2xl font-bold">{mockDashboardStats.activeCampaigns}个</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-sm">
        <ArrowUpRight className="w-4 h-4" />
        <span>+3个 vs 上周</span>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 3),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">欢迎回来，管理员</h1>
        <p className="text-gray-500 mt-1">这是您的业务概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} title="总用户数" value={stats.totalUsers.toLocaleString()} change={8.2} changeType="increase" />
        <StatCard icon={FileText} title="页面数量" value={stats.totalPages} />
        <StatCard icon={ShoppingCart} title="今日订单" value={stats.totalOrders} change={15.3} changeType="increase" />
        <StatCard icon={TrendingUp} title="产品总数" value={stats.totalProducts.toLocaleString()} change={5.8} changeType="increase" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <div>
          <QuickStats />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentLeads />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">实时数据概览</h3>
              <p className="text-sm text-gray-500">关键业务指标</p>
            </div>
            <Activity className="w-6 h-6 text-green-500 animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">流量增长率</span>
              </div>
              <span className="text-green-600 font-medium">+{stats.trafficGrowth}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700">覆盖国家</span>
              </div>
              <span className="text-gray-800 font-medium">128个</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">今日访客</span>
              </div>
              <span className="text-gray-800 font-medium">{mockTrafficData[mockTrafficData.length - 1].visitors.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">本月销售额</span>
              </div>
              <span className="text-gray-800 font-medium">¥128,450</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}