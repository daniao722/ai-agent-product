import { useState } from 'react';
import {
  FileText,
  Sparkles,
  Image,
  Video,
  TrendingUp,
  TrendingDown,
  Target,
  Globe,
  Send,
  SplitSquareVertical,
  Compass,
  BarChart3,
  Layers,
  ArrowRight,
  Zap,
  CheckCircle,
  Clock,
  Eye,
  MousePointer,
  ShoppingBag,
  Palette,
  Languages,
  FolderOpen,
} from 'lucide-react';

interface GeneratedContent {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
  status: 'draft' | 'published';
  views?: number;
  clicks?: number;
  conversions?: number;
}

const mockGeneratedContents: GeneratedContent[] = [
  { id: '1', title: '工业机器人产品描述', content: '我们专注于工业机器人研发与制造...', type: 'product', createdAt: '2026-05-20 14:30', status: 'published', views: 3240, clicks: 186, conversions: 24 },
  { id: '2', title: '企业解决方案白皮书', content: '数字化转型解决方案介绍...', type: 'whitepaper', createdAt: '2026-05-19 11:20', status: 'published', views: 1890, clicks: 145, conversions: 18 },
  { id: '3', title: '新品发布文案', content: '全新一代智能设备即将上市...', type: 'marketing', createdAt: '2026-05-18 16:45', status: 'draft', views: 0, clicks: 0, conversions: 0 },
];

const funnelSteps = [
  { label: '内容创作', value: 100, color: 'bg-blue-600', bgColor: 'bg-blue-200', count: 1248 },
  { label: '多语言翻译', value: 85, color: 'bg-indigo-500', bgColor: 'bg-indigo-200', count: 1061 },
  { label: '多场景裂变', value: 72, color: 'bg-purple-500', bgColor: 'bg-purple-200', count: 899 },
  { label: '发布上线', value: 58, color: 'bg-pink-500', bgColor: 'bg-pink-200', count: 724 },
  { label: '用户转化', value: 32, color: 'bg-green-500', bgColor: 'bg-green-200', count: 399 },
];

const moduleCards = [
  { id: 'content-strategy', icon: Compass, label: '内容策略', desc: 'AI规划师+竞品分析+热点捕捉', color: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 'ai-writer', icon: Sparkles, label: 'AI文案工场', desc: 'RAG文案生成+多场景裂变', color: 'from-indigo-500 to-indigo-600', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { id: 'ai-image', icon: Palette, label: 'AI视觉创作', desc: '场景图生成+海报设计', color: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 'ai-video', icon: Video, label: 'AI视频工厂', desc: '产品视频+数字人播报', color: 'from-pink-500 to-pink-600', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
  { id: 'global-content', icon: Languages, label: '全球化内容', desc: '智能翻译+文化适配', color: 'from-cyan-500 to-cyan-600', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
  { id: 'content-analytics', icon: BarChart3, label: '效果分析', desc: 'ROI追踪+A/B测试', color: 'from-orange-500 to-orange-600', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { id: 'content-assets', icon: FolderOpen, label: '品牌资产库', desc: '素材管理+智能标签', color: 'from-emerald-500 to-emerald-600', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
];

const ongoingTasks = [
  { label: 'AI文案工场 - 产品白皮书', progress: 75, color: 'bg-blue-500', module: 'ai-writer' },
  { label: 'AI视觉创作 - 展会海报', progress: 40, color: 'bg-purple-500', module: 'ai-image' },
  { label: 'AI视频工厂 - 产品演示', progress: 20, color: 'bg-pink-500', module: 'ai-video' },
  { label: '全球化内容 - 德语站点翻译', progress: 60, color: 'bg-cyan-500', module: 'global-content' },
];

const channelStats = [
  { channel: '官网', exposure: '12.5万', ctr: '4.2%', roi: '3.8x', trend: 'up' },
  { channel: '社媒', exposure: '8.3万', ctr: '6.8%', roi: '2.5x', trend: 'up' },
  { channel: '邮件', exposure: '5.1万', ctr: '12.5%', roi: '5.2x', trend: 'up' },
  { channel: '广告', exposure: '4.2万', ctr: '3.1%', roi: '2.1x', trend: 'down' },
];

export default function ContentOverview() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
    // 触发自定义事件通知App切换页面
    window.dispatchEvent(new CustomEvent('navigate', { detail: moduleId }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">内容智能中心</h1>
        <p className="text-gray-500 mt-1">AI驱动的全链路内容生产与资产管理平台</p>
      </div>

      {/* 核心业务数据汇总卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">本月生成内容</p>
              <p className="text-2xl font-bold mt-1">1,248</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-blue-100 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+23% vs 上月</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">生成图片</p>
              <p className="text-2xl font-bold mt-1">326</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Image className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-purple-100 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+45% vs 上月</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">生成视频</p>
              <p className="text-2xl font-bold mt-1">48</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-green-100 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+120% vs 上月</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">内容转化率</p>
              <p className="text-2xl font-bold mt-1">32.5%</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-orange-100 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+8.2% vs 上月</span>
          </div>
        </div>
      </div>

      {/* 七大功能模块入口 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">功能模块</h2>
          <span className="text-sm text-gray-500">7大模块，覆盖内容全链路</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {moduleCards.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`flex flex-col items-center p-4 rounded-xl border transition-all hover:shadow-md ${
                selectedModule === module.id
                  ? 'border-blue-300 bg-blue-50 shadow-md'
                  : 'border-gray-100 hover:border-blue-200'
              }`}
            >
              <div className={`w-12 h-12 ${module.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <module.icon className={`w-6 h-6 ${module.iconColor}`} />
              </div>
              <span className="text-sm font-medium text-gray-800">{module.label}</span>
              <span className="text-xs text-gray-500 mt-1 text-center">{module.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 内容价值转化漏斗 + 渠道效果 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">内容价值转化漏斗</h3>
          <div className="space-y-4">
            {funnelSteps.map((step) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className={`w-32 h-12 ${step.color} rounded-lg flex items-center justify-center text-white font-medium text-sm`}>
                  {step.label}
                </div>
                <div className={`flex-1 h-2 ${step.bgColor} rounded-full`}>
                  <div className={`h-full ${step.color} rounded-full`} style={{ width: `${step.value}%` }}></div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700">{step.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({step.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">渠道效果数据</h3>
          <div className="space-y-3">
            {channelStats.map((stat) => (
              <div key={stat.channel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{stat.channel}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">曝光</p>
                    <p className="font-medium text-gray-800">{stat.exposure}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">CTR</p>
                    <p className="font-medium text-gray-800">{stat.ctr}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">ROI</p>
                    <p className="font-medium text-gray-800">{stat.roi}</p>
                  </div>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 最近创作 + 正在进行的任务 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h4 className="font-medium text-gray-800">最近创作</h4>
            <button 
              onClick={() => handleModuleClick('content-assets')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              查看全部 <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {mockGeneratedContents.map((content) => (
              <div key={content.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                <FileText className="w-8 h-8 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{content.title}</p>
                  <p className="text-xs text-gray-500">{content.createdAt}</p>
                  {content.views !== undefined && content.views > 0 && (
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {content.views}</span>
                      <span className="flex items-center gap-1"><MousePointer className="w-3 h-3" /> {content.clicks}</span>
                      <span className="flex items-center gap-1"><ShoppingBag className="w-3 h-3" /> {content.conversions}</span>
                    </div>
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  content.status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {content.status === 'published' ? '已发布' : '草稿'}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h4 className="font-medium text-gray-800">正在进行的任务</h4>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">4 个进行中</span>
          </div>
          <div className="p-4 space-y-3">
            {ongoingTasks.map((task) => (
              <div key={task.label} className="flex items-start gap-3">
                <div className={`w-2 h-2 ${task.color} rounded-full mt-2`}></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{task.label}</p>
                  <div className="mt-2">
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className={`h-full ${task.color} rounded-full`} style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{task.progress}% 完成</p>
                      <button 
                        onClick={() => handleModuleClick(task.module)}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        继续
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI效率提升数据 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">AI效率提升</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-blue-600">10x</div>
            <div className="text-sm text-gray-600 mt-1">文案创作效率</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <Image className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-600">8x</div>
            <div className="text-sm text-gray-600 mt-1">图片生成效率</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <Video className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-600">6x</div>
            <div className="text-sm text-gray-600 mt-1">视频制作效率</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-orange-600">12x</div>
            <div className="text-sm text-gray-600 mt-1">翻译效率</div>
          </div>
        </div>
      </div>
    </div>
  );
}
