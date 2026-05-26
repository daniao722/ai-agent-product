import {
  Globe2,
  Plus,
  MoreVertical,
} from 'lucide-react';

const mockLocalizationData = [
  { region: '北美英语', completion: 95, status: 'completed', tasks: 45, done: 43 },
  { region: '欧盟德语', completion: 88, status: 'completed', tasks: 45, done: 40 },
  { region: '欧盟法语', completion: 85, status: 'completed', tasks: 45, done: 38 },
  { region: '日语', completion: 72, status: 'in_progress', tasks: 45, done: 32 },
  { region: '韩语', completion: 65, status: 'in_progress', tasks: 45, done: 29 },
  { region: '阿拉伯语', completion: 30, status: 'in_progress', tasks: 45, done: 14 },
];

export default function LocalizationDeploy() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">本地化部署进度</h3>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
          <Plus className="w-4 h-4" />
          添加语言
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 本地化进度列表 */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {mockLocalizationData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Globe2 className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-800">{item.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.status === 'completed' ? '已完成' : '进行中'}
                    </span>
                    <span className="font-semibold text-gray-800">{item.completion}%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${item.completion}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>任务进度: {item.done}/{item.tasks}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-700">查看详情</button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 本地化洞察面板 */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <h4 className="font-semibold mb-4">本地化洞察</h4>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">最快完成</p>
              <p className="font-medium mt-1">北美英语</p>
              <p className="text-sm opacity-80 mt-1">进度 95%，即将上线</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">重点推进</p>
              <p className="font-medium mt-1">日语</p>
              <p className="text-sm opacity-80 mt-1">日本市场增长强劲</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">挑战最大</p>
              <p className="font-medium mt-1">阿拉伯语</p>
              <p className="text-sm opacity-80 mt-1">RTL排版和文化适配复杂</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
