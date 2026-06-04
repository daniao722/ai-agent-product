import { useState } from 'react'
import { Search, Download, BarChart3, AlertCircle, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const targetUrl = 'https://en.aojingemc.com/products_details/23.html'

const dimensionScores = [
  { name: '表单转化', score: 58, color: '#EF4444' },
  { name: 'CTA按钮', score: 45, color: '#EF4444' },
  { name: '页面结构', score: 72, color: '#F59E0B' },
  { name: '交互体验', score: 60, color: '#F59E0B' },
  { name: '技术性能', score: 75, color: '#F59E0B' },
  { name: '信任建设', score: 68, color: '#F59E0B' },
]

const diagnosisReport = [
  { id: 1, item: '首屏CTA缺失', status: 'critical' as const, description: '首屏3秒内无明显转化按钮', impact: '流失率+35%', suggestion: '添加"立即询价"按钮到首屏右侧', actionType: '一键优化' },
  { id: 2, item: '表单字段过多', status: 'warning' as const, description: '表单有8个字段，超过推荐数量', impact: '完成率-40%', suggestion: '精简至5个核心字段', actionType: '一键优化' },
  { id: 3, item: 'CTA颜色对比度不足', status: 'critical' as const, description: '按钮与背景对比度1.8:1，低于4.5:1标准', impact: '点击率-25%', suggestion: '调整CTA按钮颜色为品牌蓝', actionType: '一键优化' },
  { id: 4, item: 'AI客服未启用', status: 'warning' as const, description: '页面无智能客服入口', impact: '留资率-20%', suggestion: '添加智能客服悬浮按钮', actionType: '一键优化' },
  { id: 5, item: '缺少成功案例', status: 'warning' as const, description: '页面缺少客户案例展示', impact: '信任度-15%', suggestion: '添加"成功案例"模块到产品描述下方', actionType: '设计工单' },
  { id: 6, item: '加载速度待优化', status: 'warning' as const, description: '首屏加载3.2秒，超过2秒标准', impact: '跳出率+18%', suggestion: '优化图片大小和加载方式', actionType: '设计工单' },
  { id: 7, item: '移动端CTA位置', status: 'pass' as const, description: '移动端CTA位置合理', impact: '-', suggestion: '-', actionType: '-' },
  { id: 8, item: '隐私政策', status: 'pass' as const, description: '底部有完整隐私声明', impact: '-', suggestion: '-', actionType: '-' },
]

const score = 62
const progressRadius = 80
const progressCircumference = 2 * Math.PI * progressRadius

const CircularProgress = ({ value, radius, color }: { value: number; radius: number; color: string }) => {
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  return (
    <svg width={radius * 2} height={radius * 2} className="transform -rotate-90">
      <circle cx={radius} cy={radius} r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
      <circle cx={radius} cy={radius} r={radius} fill="none" stroke={color} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
    </svg>
  )
}

const MiniCircularProgress = ({ score, color }: { score: number; color: string }) => {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  return (
    <div className="relative w-16 h-16">
      <svg width="64" height="64" className="transform -rotate-90">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="4" />
        <circle cx="32" cy="32" r={radius} fill="none" stroke={color} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{score}</span>
    </div>
  )
}

const getScoreGrade = (score: number) => {
  if (score >= 80) return { grade: '优秀', color: '#10B981' }
  if (score >= 60) return { grade: '待优化', color: '#F59E0B' }
  return { grade: '需改进', color: '#EF4444' }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'critical': return <XCircle className="w-5 h-5 text-red-500" />
    case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />
    default: return null
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'critical': return '严重'
    case 'warning': return '警告'
    case 'pass': return '通过'
    default: return ''
  }
}

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'critical': return 'bg-red-100 text-red-700'
    case 'warning': return 'bg-yellow-100 text-yellow-700'
    case 'pass': return 'bg-green-100 text-green-700'
    default: return ''
  }
}

type FilterType = 'all' | 'critical' | 'warning' | 'pass'

export default function ConversionDiagnosis() {
  const [url, setUrl] = useState(targetUrl)
  const [isDiagnosing, setIsDiagnosing] = useState(false)
  const [diagnoseProgress, setDiagnoseProgress] = useState(0)
  const [showResults, setShowResults] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')

  const handleDiagnose = () => {
    if (!url.trim()) return
    setIsDiagnosing(true)
    setDiagnoseProgress(0)
    setShowResults(false)
    const timer = setInterval(() => {
      setDiagnoseProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsDiagnosing(false)
          setShowResults(true)
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  const filteredReport = filter === 'all' ? diagnosisReport : diagnosisReport.filter(item => item.status === filter)
  const { grade, color } = getScoreGrade(score)
  const counts = {
    all: diagnosisReport.length,
    critical: diagnosisReport.filter(i => i.status === 'critical').length,
    warning: diagnosisReport.filter(i => i.status === 'warning').length,
    pass: diagnosisReport.filter(i => i.status === 'pass').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">转化诊断与优化</h1>
          <p className="text-gray-500 mt-1">分析目标网站转化漏斗，识别流失节点，提供优化建议</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="输入目标网站URL..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleDiagnose}
              disabled={isDiagnosing}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium whitespace-nowrap"
            >
              {isDiagnosing ? '诊断中...' : '开始诊断'}
            </button>
          </div>

          {isDiagnosing && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>正在扫描页面元素...</span>
                <span>{diagnoseProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${diagnoseProgress}%` }} />
              </div>
            </div>
          )}
        </div>

        {showResults && (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">综合评分</h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
                  <Download className="w-4 h-4" />
                  导出报告
                </button>
              </div>
              <div className="flex items-center gap-8">
                <div className="relative">
                  <CircularProgress value={score} radius={progressRadius} color={color} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold" style={{ color }}>{score}</span>
                    <span className="text-sm text-gray-500">分</span>
                  </div>
                </div>
                <div>
                  <div className="text-xl font-semibold" style={{ color }}>{grade}</div>
                  <p className="text-gray-500 mt-1">页面转化率有较大提升空间，建议优先处理严重问题</p>
                  <div className="flex gap-4 mt-3">
                    <span className="flex items-center gap-1 text-sm text-red-600"><XCircle className="w-4 h-4" />严重 {counts.critical}</span>
                    <span className="flex items-center gap-1 text-sm text-yellow-600"><AlertTriangle className="w-4 h-4" />警告 {counts.warning}</span>
                    <span className="flex items-center gap-1 text-sm text-green-600"><CheckCircle className="w-4 h-4" />通过 {counts.pass}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">维度评分</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {dimensionScores.map(item => (
                  <div key={item.name} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                    <MiniCircularProgress score={item.score} color={item.color} />
                    <span className="mt-2 text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">诊断报告</h2>
              <div className="flex gap-2 mb-4">
                {([['all', '全部问题'], ['critical', '严重'], ['warning', '警告'], ['pass', '通过']] as [FilterType, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === key ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {label} ({counts[key]})
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">问题项</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">状态</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">描述</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">影响</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">优化建议</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">操作类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReport.map(item => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{item.item}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBgColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {getStatusLabel(item.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{item.description}</td>
                        <td className="py-3 px-4 text-red-600 font-medium">{item.impact}</td>
                        <td className="py-3 px-4 text-gray-600">{item.suggestion}</td>
                        <td className="py-3 px-4">
                          {item.actionType === '一键优化' && (
                            <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">一键优化</button>
                          )}
                          {item.actionType === '设计工单' && (
                            <button className="px-3 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600">设计工单</button>
                          )}
                          {item.actionType === '-' && (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
