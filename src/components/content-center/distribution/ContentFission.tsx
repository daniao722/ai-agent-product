const PRIMARY = '#C9A227'

export default function ContentFission() {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">内容裂变</div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '社交分享次数', value: '3,456', unit: '次', icon: '📤' },
          { label: '链接传播次数', value: '1,234', unit: '次', icon: '🔗' },
          { label: '裂变转化率', value: '8.5%', unit: '', icon: '📈' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">{s.icon} {s.label}</div>
            <div className="text-2xl font-bold text-gray-800">
              {s.value}
              {s.unit && <span className="text-sm font-normal text-gray-500 ml-1">{s.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
        <div className="text-sm font-semibold text-amber-800 mb-2">💡 裂变策略建议</div>
        <div className="text-sm text-amber-700 space-y-1">
          <p>基于您的内容数据，建议尝试以下裂变策略：</p>
          <ul className="list-disc ml-5 mt-1 space-y-1">
            <li>在 LinkedIn 发布行业洞察文章，配合话题标签</li>
            <li>将产品案例制作成信息图表，提升分享率</li>
            <li>设置内容下载奖励机制，鼓励转发传播</li>
          </ul>
        </div>
      </div>
    </div>
  )
}