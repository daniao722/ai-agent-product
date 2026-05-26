import {
  Users,
  Plus,
  MoreVertical,
  Calendar,
  Lightbulb,
} from 'lucide-react';

const mockFollowUps = [
  { id: '1', leadName: '张三', task: '发送产品资料', dueDate: '2026-05-21', priority: 'high', status: 'pending', assignee: '销售员A' },
  { id: '2', leadName: '李四', task: '电话跟进报价', dueDate: '2026-05-21', priority: 'medium', status: 'pending', assignee: '销售员B' },
  { id: '3', leadName: '王五', task: '安排现场演示', dueDate: '2026-05-22', priority: 'high', status: 'in_progress', assignee: '销售员A' },
  { id: '4', leadName: '孙七', task: '发送合作方案', dueDate: '2026-05-23', priority: 'low', status: 'pending', assignee: '销售员C' },
];

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const priorityLabels: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export default function FollowUpManagement() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">跟进管理</h1>
          <p className="text-gray-500 mt-1">智能跟进任务管理，确保不遗漏任何商机</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>添加任务</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 跟进任务列表 */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {mockFollowUps.map((task) => (
              <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{task.leadName}</p>
                      <p className="text-sm text-gray-500">{task.task}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                      {priorityLabels[task.priority]}
                    </span>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pl-13">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {task.dueDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {task.assignee}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`px-3 py-1 rounded-lg text-sm ${
                      task.status === 'pending' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-green-50 text-green-600'
                    }`}>
                      {task.status === 'pending' ? '开始处理' : '进行中'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI跟进建议面板 */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5" />
            <h4 className="font-semibold text-lg">AI跟进建议</h4>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">优先跟进</p>
              <p className="font-medium mt-1">赵六 - GHI贸易</p>
              <p className="text-sm opacity-80 mt-1">评分95分，上次联系3天前</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">即将过期</p>
              <p className="font-medium mt-1">DEF制造报价</p>
              <p className="text-sm opacity-80 mt-1">还有5天有效期，请及时跟进</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80">建议行动</p>
              <p className="font-medium mt-1">发送产品演示视频</p>
              <p className="text-sm opacity-80 mt-1">高优先级线索未充分培育</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
