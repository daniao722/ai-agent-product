import {
  Globe2,
  Search,
  Shield,
  Map,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  ArrowUpRight,
  ChevronRight,
  Zap,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';

const valueChain = [
  { icon: Search, label: '市场调研', desc: '目标市场分析', color: 'bg-blue-500' },
  { icon: Shield, label: '合规评估', desc: '法规合规检查', color: 'bg-purple-500' },
  { icon: Map, label: '本地化部署', desc: '多语言适配', color: 'bg-green-500' },
  { icon: AlertTriangle, label: '风控监测', desc: '风险预警管理', color: 'bg-orange-500' },
];

const ongoingTasks = [
  { name: '欧盟GDPR合规评估', progress: 75, status: 'in_progress' },
  { name: '日语本地化部署', progress: 72, status: 'in_progress' },
  { name: '东南亚市场调研', progress: 100, status: 'completed' },
];

const aiInsights = [
  { title: '市场拓展机会', desc: '东南亚市场增长率25.3%，建议优先布局', type: 'opportunity' },
  { title: '合规风险预警', desc: '欧盟GDPR新规将于Q3生效，需尽快更新隐私政策', type: 'warning' },
  { title: '本地化优化建议', desc: '阿拉伯语RTL排版适配复杂，建议分配更多资源', type: 'insight' },
];

export default function GlobalOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* 核心价值链 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">核心价值链</h3>
        <div className="flex items-center justify-between">
          {valueChain.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-2`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="font-medium text-gray-800 text-sm">{item.label}</span>
                <span className="text-xs text-gray-500 mt-1">{item.desc}</span>
              </div>
              {index < valueChain.length - 1 && (
                <ChevronRight className="w-6 h-6 text-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 数据汇总卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">覆盖国家</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">18个</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span>+3个新增</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">合规通过率</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">85%</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>+5% vs 上季度</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">本地化进度</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">72%</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Map className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
            <RefreshCw className="w-4 h-4" />
            <span>6种语言</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">风险预警</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">2个</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-orange-600">
            <Clock className="w-4 h-4" />
            <span>需关注</span>
          </div>
        </div>
      </div>

      {/* 正在进行的任务 + AI洞察 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 正在进行的任务 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">正在进行的任务</h3>
          <div className="space-y-4">
            {ongoingTasks.map((task, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{task.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {task.status === 'completed' ? '已完成' : '进行中'}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">进度 {task.progress}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI洞察 */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">AI洞察</h3>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {insight.type === 'opportunity' && <TrendingUp className="w-4 h-4" />}
                  {insight.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                  {insight.type === 'insight' && <Lightbulb className="w-4 h-4" />}
                  <span className="font-medium">{insight.title}</span>
                </div>
                <p className="text-sm opacity-80">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
