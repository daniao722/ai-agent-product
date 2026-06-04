import { useState } from 'react'

const PRIMARY = '#C9A227'

const RULES = [
  { id: 1, name: '品牌名称一致性', dim: '品牌合规', desc: '检测品牌名、产品名是否与品牌资产库登记一致', level: 'warn', enabled: true, param: '支持添加品牌别名白名单' },
  { id: 2, name: '品牌禁用词过滤', dim: '品牌合规', desc: '检测是否使用了品牌禁止出现的词汇', level: 'block', enabled: true, param: '用户可自定义禁用词表' },
  { id: 3, name: '品牌色调一致性', dim: '品牌合规', desc: 'AI检测图片色彩是否偏离品牌主色调超过设定阈值', level: 'warn', enabled: true, param: '色差阈值 ±15%' },
  { id: 4, name: '联系方式准确性', dim: '品牌合规', desc: '自动校验内容中的电话、邮件、官网地址是否与档案一致', level: 'warn', enabled: true, param: '支持多地区联系方式维护' },
  { id: 5, name: '语言流畅度', dim: '内容质量', desc: 'AI评分（0-100），低于阈值则标注为待优化', level: 'info', enabled: true, param: '评分阈值：70分' },
  { id: 6, name: '事实核查', dim: '内容质量', desc: '检测数字、日期、产品参数是否与品牌资产库数据一致', level: 'warn', enabled: true, param: '可关闭（非产品参数内容）' },
  { id: 7, name: '重复内容检测', dim: '内容质量', desc: '与已发布内容相似度超过阈值则提示重复', level: 'warn', enabled: true, param: '相似度阈值：85%' },
  { id: 8, name: 'CTA检测', dim: '内容质量', desc: '检查内容是否包含明确的行动引导，无CTA则提示', level: 'info', enabled: true, param: '可关闭（纯品宣内容）' },
  { id: 9, name: '违禁词过滤', dim: '风控', desc: '内置多地区违禁词词库（中国、美国、欧盟）', level: 'block', enabled: true, param: '可添加企业专属合规词表' },
  { id: 10, name: '虚假宣传风险', dim: '风控', desc: '检测"最""第一""100%"等绝对化表述的使用', level: 'warn', enabled: true, param: '可配置高风险词提示等级' },
  { id: 11, name: '版权风险提示', dim: '风控', desc: '检测内容中引用的图片、文字是否有版权风险', level: 'warn', enabled: false, param: '可设置版权检测严格程度' },
  { id: 12, name: '隐私数据泄露', dim: '风控', desc: '检测内容中是否意外包含手机号、邮箱、身份证等', level: 'block', enabled: true, param: '默认开启，不可关闭' },
]

const LEVEL_CONFIG = {
  block: { label: '拦截', bg: '#FEE2E2', color: '#EF4444', desc: '必须修改才能发布' },
  warn: { label: '警告', bg: '#FEF9C3', color: '#D97706', desc: '用户确认后可继续' },
  info: { label: '提示', bg: '#F3F4F6', color: '#6B7280', desc: '仅信息提醒' },
}

const DIMS = ['全部', '品牌合规', '内容质量', '风控']

export default function ReviewConfig() {
  const [dim, setDim] = useState('全部')
  const [rules, setRules] = useState(RULES)

  const toggleRule = (id) => {
    setRules((prev) => prev.map((r) => r.id === id ? { ...r, enabled: !r.enabled } : r))
  }

  const setLevel = (id, level) => {
    setRules((prev) => prev.map((r) => r.id === id ? { ...r, level } : r))
  }

  const filtered = dim === '全部' ? rules : rules.filter((r) => r.dim === dim)

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {DIMS.map((d) => (
            <button
              key={d}
              onClick={() => setDim(d)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${dim === d ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              style={dim === d ? { backgroundColor: PRIMARY } : {}}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
            导入规则（JSON/YAML）
          </button>
          <button className="text-sm px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: PRIMARY }}>
            + 新增自定义规则
          </button>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-400 font-medium">
          <div className="col-span-2">规则名称</div>
          <div className="col-span-1">维度</div>
          <div className="col-span-4">执行标准</div>
          <div className="col-span-2">可配置范围</div>
          <div className="col-span-1 text-center">规则级别</div>
          <div className="col-span-1 text-center">状态</div>
          <div className="col-span-1 text-right">操作</div>
        </div>

        {filtered.map((rule) => {
          const lv = LEVEL_CONFIG[rule.level]
          const isFixed = rule.id === 12
          return (
            <div key={rule.id} className={`grid grid-cols-12 px-5 py-3 border-b border-gray-50 last:border-b-0 items-center transition-colors ${rule.enabled ? 'hover:bg-gray-50' : 'opacity-50'}`}>
              <div className="col-span-2 text-sm font-medium text-gray-800">{rule.name}</div>
              <div className="col-span-1">
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  rule.dim === '品牌合规' ? 'bg-blue-100 text-blue-600' :
                  rule.dim === '内容质量' ? 'bg-green-100 text-green-600' :
                  'bg-red-100 text-red-600'
                }`}>{rule.dim}</span>
              </div>
              <div className="col-span-4 text-xs text-gray-500">{rule.desc}</div>
              <div className="col-span-2 text-xs text-gray-400">{rule.param}</div>
              <div className="col-span-1 text-center">
                <select
                  value={rule.level}
                  onChange={(e) => setLevel(rule.id, e.target.value)}
                  disabled={isFixed}
                  className="text-xs border rounded px-1.5 py-1 focus:outline-none bg-white"
                  style={{ borderColor: lv.color, color: lv.color }}
                >
                  {Object.entries(LEVEL_CONFIG).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => !isFixed && toggleRule(rule.id)}
                  disabled={isFixed}
                  className={`w-10 h-5 rounded-full transition-all relative ${isFixed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{ backgroundColor: rule.enabled ? PRIMARY : '#E5E7EB' }}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${rule.enabled ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="col-span-1 flex justify-end">
                <button className="text-xs text-gray-400 hover:text-gray-600">编辑</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(LEVEL_CONFIG).map(([key, lv]) => (
          <div key={key} className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lv.color }} />
            <div>
              <div className="text-xs font-semibold" style={{ color: lv.color }}>{lv.label}</div>
              <div className="text-xs text-gray-400">{lv.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
