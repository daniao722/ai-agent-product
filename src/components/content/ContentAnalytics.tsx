import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Target,
  DollarSign,
  Globe,
  Mail,
  Megaphone,
  Monitor,
  Sparkles,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Zap,
  Lightbulb,
  ChevronRight,
  Filter,
  Download,
  SplitSquareVertical,
  Award,
  Clock,
  Users,
  ShoppingCart,
} from 'lucide-react';

interface ChannelData {
  name: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  exposure: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cvr: number;
  cost: number;
  revenue: number;
  roi: number;
  trend: 'up' | 'down' | 'flat';
  trendValue: number;
}

interface ContentROI {
  id: string;
  title: string;
  channel: string;
  exposure: number;
  cost: number;
  revenue: number;
  roi: number;
  leads: number;
  cpl: number;
  status: 'active' | 'paused' | 'ended';
}

interface AIAdvice {
  id: string;
  type: 'optimize' | 'test' | 'budget' | 'content';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  adopted: boolean;
}

interface ABTest {
  id: string;
  name: string;
  channel: string;
  variantA: { name: string; ctr: number; cvr: number; traffic: number };
  variantB: { name: string; ctr: number; cvr: number; traffic: number };
  status: 'running' | 'paused' | 'completed';
  winner: 'A' | 'B' | null;
  confidence: number;
  startDate: string;
}

const channelData: ChannelData[] = [
  { name: '官网', icon: Monitor, iconColor: 'text-blue-600', bgColor: 'bg-blue-100', exposure: 45200, clicks: 3850, ctr: 8.5, conversions: 462, cvr: 12.0, cost: 15000, revenue: 85000, roi: 4.67, trend: 'up', trendValue: 12.3 },
  { name: '社媒', icon: Globe, iconColor: 'text-purple-600', bgColor: 'bg-purple-100', exposure: 128000, clicks: 6400, ctr: 5.0, conversions: 512, cvr: 8.0, cost: 22000, revenue: 96000, roi: 3.36, trend: 'up', trendValue: 8.7 },
  { name: '邮件', icon: Mail, iconColor: 'text-green-600', bgColor: 'bg-green-100', exposure: 32000, clicks: 2880, ctr: 9.0, conversions: 432, cvr: 15.0, cost: 5000, revenue: 64800, roi: 11.96, trend: 'down', trendValue: 3.2 },
  { name: '广告', icon: Megaphone, iconColor: 'text-orange-600', bgColor: 'bg-orange-100', exposure: 95000, clicks: 4750, ctr: 5.0, conversions: 380, cvr: 8.0, cost: 35000, revenue: 76000, roi: 1.17, trend: 'up', trendValue: 15.5 },
];

const contentROIList: ContentROI[] = [
  { id: '1', title: '工业机器人产品白皮书', channel: '官网', exposure: 12500, cost: 3000, revenue: 45000, roi: 14.0, leads: 180, cpl: 16.7, status: 'active' },
  { id: '2', title: '智能制造解决方案视频', channel: '社媒', exposure: 48000, cost: 8000, revenue: 32000, roi: 3.0, leads: 240, cpl: 33.3, status: 'active' },
  { id: '3', title: '新品发布会邀请函', channel: '邮件', exposure: 8600, cost: 500, revenue: 25800, roi: 50.6, leads: 86, cpl: 5.8, status: 'active' },
  { id: '4', title: '春季促销活动海报', channel: '广告', exposure: 32000, cost: 12000, revenue: 24000, roi: 1.0, leads: 160, cpl: 75.0, status: 'paused' },
  { id: '5', title: '客户成功案例集', channel: '官网', exposure: 9800, cost: 2000, revenue: 36000, roi: 17.0, leads: 120, cpl: 16.7, status: 'active' },
  { id: '6', title: '技术博客系列-第1期', channel: '社媒', exposure: 22000, cost: 1500, revenue: 12000, roi: 7.0, leads: 80, cpl: 18.8, status: 'active' },
];

const initialAdvices: AIAdvice[] = [
  { id: '1', type: 'optimize', title: '优化邮件主题行', description: '检测到邮件打开率下降12%，建议测试更具紧迫感的主题行，如"限时优惠：智能制造方案免费试用"', impact: 'high', adopted: false },
  { id: '2', type: 'budget', title: '调整广告预算分配', description: 'LinkedIn广告ROI(2.8x)显著高于百度广告(0.9x)，建议将百度预算的30%转移至LinkedIn', impact: 'high', adopted: false },
  { id: '3', type: 'content', title: '增加视频内容投入', description: '视频内容的平均转化率(15.2%)是图文内容(8.5%)的1.8倍，建议下月视频内容占比提升至40%', impact: 'medium', adopted: false },
  { id: '4', type: 'test', title: '启动A/B测试：CTA按钮', description: '产品页"立即咨询"按钮点击率低于行业均值，建议测试"免费获取方案" vs "预约专家演示"', impact: 'medium', adopted: false },
  { id: '5', type: 'optimize', title: '优化落地页加载速度', description: '移动端落地页加载时间3.2s，超过2s阈值，建议压缩图片并启用CDN，预计转化率提升8%', impact: 'low', adopted: false },
];

const abTestsData: ABTest[] = [
  { id: '1', name: '首页主标题测试', channel: '官网', variantA: { name: '专业工业机器人解决方案', ctr: 4.2, cvr: 12.5, traffic: 50 }, variantB: { name: '让智能制造更简单', ctr: 5.8, cvr: 14.2, traffic: 50 }, status: 'completed', winner: 'B', confidence: 96, startDate: '2026-05-01' },
  { id: '2', name: '邮件发送时间测试', channel: '邮件', variantA: { name: '周二上午10:00', ctr: 8.5, cvr: 15.2, traffic: 50 }, variantB: { name: '周四下午14:00', ctr: 11.2, cvr: 18.6, traffic: 50 }, status: 'running', winner: null, confidence: 78, startDate: '2026-05-15' },
  { id: '3', name: '社媒配图风格测试', channel: '社媒', variantA: { name: '产品实拍图', ctr: 3.2, cvr: 6.8, traffic: 50 }, variantB: { name: '信息图表', ctr: 4.5, cvr: 9.2, traffic: 50 }, status: 'running', winner: null, confidence: 65, startDate: '2026-05-18' },
];

const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + '万';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const formatCurrency = (num: number) => {
  return '¥' + num.toLocaleString();
};

export default function ContentAnalytics() {
  const [advices, setAdvices] = useState<AIAdvice[]>(initialAdvices);
  const [abTests, setAbTests] = useState<ABTest[]>(abTestsData);
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [newTestName, setNewTestName] = useState('');
  const [newTestChannel, setNewTestChannel] = useState('官网');

  const handleAdoptAdvice = (id: string) => {
    setAdvices(prev => prev.map(advice => 
      advice.id === id ? { ...advice, adopted: true } : advice
    ));
    console.log(`已采纳建议: ${id}`);
  };

  const handleDismissAdvice = (id: string) => {
    setAdvices(prev => prev.filter(advice => advice.id !== id));
    console.log(`已忽略建议: ${id}`);
  };

  const handleToggleTestStatus = (testId: string) => {
    setAbTests(prev => prev.map(test => {
      if (test.id === testId) {
        const newStatus = test.status === 'running' ? 'paused' : 'running';
        return { ...test, status: newStatus };
      }
      return test;
    }));
  };

  const handleCreateTest = () => {
    if (!newTestName.trim()) {
      alert('请输入测试名称');
      return;
    }
    const newTest: ABTest = {
      id: Date.now().toString(),
      name: newTestName,
      channel: newTestChannel,
      variantA: { name: '版本 A (原始)', ctr: 0, cvr: 0, traffic: 50 },
      variantB: { name: '版本 B (AI生成)', ctr: 0, cvr: 0, traffic: 50 },
      status: 'running',
      winner: null,
      confidence: 0,
      startDate: new Date().toISOString().split('T')[0],
    };
    setAbTests(prev => [newTest, ...prev]);
    setNewTestName('');
    setShowCreateTestModal(false);
    console.log('创建新A/B测试:', newTest);
  };

  const handleExportData = () => {
    console.log('导出数据');
    alert('数据导出中...');
  };

  const handleRefreshData = () => {
    console.log('刷新数据');
    alert('数据已刷新');
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'high': return '高影响';
      case 'medium': return '中影响';
      case 'low': return '低影响';
      default: return '未知';
    }
  };

  const getAdviceTypeIcon = (type: string) => {
    switch (type) {
      case 'optimize': return <Zap className="w-4 h-4" />;
      case 'test': return <SplitSquareVertical className="w-4 h-4" />;
      case 'budget': return <DollarSign className="w-4 h-4" />;
      case 'content': return <Lightbulb className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const filteredContentROI = selectedChannel === 'all' 
    ? contentROIList 
    : contentROIList.filter(item => item.channel === selectedChannel);

  return (
    <div className="space-y-6">
      {/* 顶部标题和描述 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">内容效果分析</h2>
          <p className="text-gray-500 mt-1">全渠道数据看板 · 内容ROI追踪 · AI优化建议 · A/B测试自动化</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefreshData}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>刷新数据</span>
          </button>
          <button 
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>导出报告</span>
          </button>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">总内容曝光</p>
              <p className="text-2xl font-bold mt-1">30.02万</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-blue-100 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+18.5% vs 上月</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">平均点击率</p>
              <p className="text-2xl font-bold mt-1">6.8%</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <MousePointer className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-purple-100 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+5.2% vs 上月</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">平均转化率</p>
              <p className="text-2xl font-bold mt-1">10.5%</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-green-100 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+8.3% vs 上月</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">整体ROI</p>
              <p className="text-2xl font-bold mt-1">3.82x</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-orange-100 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12.1% vs 上月</span>
          </div>
        </div>
      </div>

      {/* 渠道数据对比 */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">全渠道数据看板</h3>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部渠道</option>
              <option value="官网">官网</option>
              <option value="社媒">社媒</option>
              <option value="邮件">邮件</option>
              <option value="广告">广告</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">渠道</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">曝光量</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">点击量</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">CTR</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">转化数</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">CVR</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">成本</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">收入</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">ROI</th>
                <th className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase">趋势</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {channelData.map((channel) => (
                <tr key={channel.name} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${channel.bgColor} rounded-lg flex items-center justify-center`}>
                        <channel.icon className={`w-4 h-4 ${channel.iconColor}`} />
                      </div>
                      <span className="font-medium text-gray-800">{channel.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-sm text-gray-700">{formatNumber(channel.exposure)}</td>
                  <td className="px-5 py-4 text-right text-sm text-gray-700">{formatNumber(channel.clicks)}</td>
                  <td className="px-5 py-4 text-right text-sm font-medium text-gray-800">{channel.ctr}%</td>
                  <td className="px-5 py-4 text-right text-sm text-gray-700">{channel.conversions}</td>
                  <td className="px-5 py-4 text-right text-sm font-medium text-gray-800">{channel.cvr}%</td>
                  <td className="px-5 py-4 text-right text-sm text-gray-700">{formatCurrency(channel.cost)}</td>
                  <td className="px-5 py-4 text-right text-sm font-medium text-green-600">{formatCurrency(channel.revenue)}</td>
                  <td className="px-5 py-4 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      channel.roi >= 3 ? 'bg-green-100 text-green-700' : 
                      channel.roi >= 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {channel.roi}x
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {channel.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : channel.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`text-xs ${channel.trend === 'up' ? 'text-green-600' : channel.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                        {channel.trendValue}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 内容ROI排行榜 + AI优化建议 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 内容ROI排行榜 */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-800">内容ROI排行榜</h3>
            </div>
            <button 
              onClick={() => console.log('查看全部内容')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-5 space-y-4">
            {filteredContentROI.sort((a, b) => b.roi - a.roi).slice(0, 5).map((content, index) => (
              <div key={content.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-200 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">{content.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{content.channel}</span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-500">{content.leads} 线索</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{content.roi}x</p>
                  <p className="text-xs text-gray-500">ROI</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI优化建议 */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <div className="flex items-center justify-between p-5 border-b border-indigo-100">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-800">AI内容优化建议</h3>
            </div>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {advices.filter(a => !a.adopted).length} 条待处理
            </span>
          </div>
          <div className="p-5 space-y-3">
            {advices.filter(a => !a.adopted).slice(0, 4).map((advice) => (
              <div key={advice.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getAdviceTypeIcon(advice.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-800 text-sm">{advice.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(advice.impact)}`}>
                        {getImpactText(advice.impact)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{advice.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button 
                        onClick={() => handleAdoptAdvice(advice.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <CheckCircle className="w-3 h-3" />
                        采纳
                      </button>
                      <button 
                        onClick={() => handleDismissAdvice(advice.id)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <XCircle className="w-3 h-3" />
                        忽略
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* A/B测试管理 */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <SplitSquareVertical className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">A/B测试自动化</h3>
          </div>
          <button 
            onClick={() => setShowCreateTestModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>创建AI测试</span>
          </button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {abTests.map((test) => (
              <div key={test.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-800">{test.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{test.channel} · {test.startDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    test.status === 'running' ? 'bg-green-100 text-green-700' :
                    test.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {test.status === 'running' ? '进行中' : test.status === 'paused' ? '已暂停' : '已完成'}
                  </span>
                </div>

                {/* 版本对比 */}
                <div className="space-y-3 mb-4">
                  <div className={`p-3 rounded-lg ${test.winner === 'A' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">版本 A</span>
                      {test.winner === 'A' && <Award className="w-4 h-4 text-green-600" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{test.variantA.name}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-600">CTR: {test.variantA.ctr}%</span>
                      <span className="text-xs text-gray-600">CVR: {test.variantA.cvr}%</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${test.winner === 'B' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">版本 B</span>
                      {test.winner === 'B' && <Award className="w-4 h-4 text-green-600" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{test.variantB.name}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-600">CTR: {test.variantB.ctr}%</span>
                      <span className="text-xs text-gray-600">CVR: {test.variantB.cvr}%</span>
                    </div>
                  </div>
                </div>

                {/* 置信度和操作 */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">置信度</p>
                    <p className={`text-sm font-medium ${test.confidence >= 95 ? 'text-green-600' : test.confidence >= 80 ? 'text-yellow-600' : 'text-gray-600'}`}>
                      {test.confidence}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {test.status !== 'completed' && (
                      <button 
                        onClick={() => handleToggleTestStatus(test.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          test.status === 'running' 
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {test.status === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    )}
                    {test.winner && test.status === 'completed' && (
                      <button 
                        onClick={() => console.log(`应用获胜版本: ${test.winner}`)}
                        className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                      >
                        应用版本 {test.winner}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 创建测试弹窗 */}
      {showCreateTestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">创建AI A/B测试</h3>
              <button 
                onClick={() => setShowCreateTestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">测试名称</label>
                <input 
                  type="text"
                  value={newTestName}
                  onChange={(e) => setNewTestName(e.target.value)}
                  placeholder="例如：首页CTA按钮测试"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">测试渠道</label>
                <select 
                  value={newTestChannel}
                  onChange={(e) => setNewTestChannel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="官网">官网</option>
                  <option value="社媒">社媒</option>
                  <option value="邮件">邮件</option>
                  <option value="广告">广告</option>
                </select>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">AI将自动生成测试版本</span>
                </div>
                <p className="text-xs text-purple-600">基于历史数据，AI会自动生成优化的B版本，并自动分配流量进行测试。</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button 
                onClick={() => setShowCreateTestModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleCreateTest}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                创建测试
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
