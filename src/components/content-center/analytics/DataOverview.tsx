const PRIMARY = '#C9A227'

export default function DataOverview() {
  return (
    <div className="p-6 space-y-5">
      <div className="text-lg font-semibold text-gray-800">数据总览</div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: '内容产出', value: '248', unit: '篇', delta: '+12%', up: true },
          { label: '发布数量', value: '183', unit: '篇', delta: '+8%', up: true },
          { label: '总阅读量', value: '45,678', unit: '次', delta: '+15%', up: true },
          { label: '带来线索', value: '1,786', unit: '条', delta: '+18%', up: true },
          { label: '转化率', value: '32%', unit: '', delta: '+5%', up: true },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-gray-800">
              {s.value}
              {s.unit && <span className="text-sm font-normal text-gray-500 ml-1">{s.unit}</span>}
            </div>
            <div className={`text-xs mt-1 ${s.up ? 'text-green-500' : 'text-red-400'}`}>{s.delta} 较上月</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">渠道效果排名</div>
          {[
            { channel: '官网', value: '18,456', pct: '100%' },
            { channel: '社媒', value: '12,800', pct: '69%' },
            { channel: '搜索引擎', value: '9,500', pct: '51%' },
            { channel: '邮件营销', value: '4,922', pct: '27%' },
          ].map((c) => (
            <div key={c.channel} className="flex items-center gap-3 py-2">
              <span className="text-xs text-gray-600 w-16">{c.channel}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full">
                <div className="h-2 rounded-full" style={{ width: c.pct, backgroundColor: PRIMARY }} />
              </div>
              <span className="text-xs text-gray-500">{c.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-sm font-semibold text-gray-700 mb-3">内容类型分布</div>
          {[
            { type: '产品文案', value: 42, color: '#3B82F6' },
            { type: '行业洞察', value: 28, color: PRIMARY },
            { type: '解决方案', value: 18, color: '#10B981' },
            { type: '品牌故事', value: 12, color: '#8B5CF6' },
          ].map((t) => (
            <div key={t.type} className="flex items-center gap-3 py-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="text-xs text-gray-600 flex-1">{t.type}</span>
              <span className="text-xs text-gray-500">{t.value} 篇</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}