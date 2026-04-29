'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AGENTS_DATA } from '@/types/agent';
import Link from 'next/link';

export default function ProductIntroPage() {
  const agents = [
    {
      id: 'ada',
      name: 'Ada',
      title: '运营主管',
      icon: '👩‍💼',
      color: 'from-pink-500 to-rose-600',
      mission: '统筹全局战略与品牌建设',
      realJobTitle: '运营主管/品牌经理',
      realCost: '¥15-25万/年',
      capabilities: [
        { icon: '🎯', title: '品牌定位策略', desc: '品牌定位、价值主张、视觉体系' },
        { icon: '📊', title: '数据诊断分析', desc: '实时监控核心指标、异常识别' },
        { icon: '🎯', title: '跨部门任务调度', desc: '智能分配任务、协同工作流' },
        { icon: '📈', title: '自动化报告生成', desc: '周报月报、数据可视化' }
      ],
      metrics: [
        { value: '65%', label: '策略采纳率', change: '+5%' },
        { value: '12次/周', label: '任务调度数', change: '+3次' },
        { value: '72%', label: '效率提升', change: '+7%' },
        { value: '85%', label: '报告自动生成率', change: '+5%' }
      ]
    },
    {
      id: 'mia',
      name: 'Mia',
      title: '推广专员',
      icon: '🚀',
      color: 'from-purple-500 to-indigo-600',
      mission: '让目标客户在各大平台找到你',
      realJobTitle: 'SEO/推广专员',
      realCost: '¥12-18万/年',
      capabilities: [
        { icon: '🔍', title: 'SEO优化', desc: '关键词研究、页面优化、排名监控' },
        { icon: '📢', title: '广告投放', desc: '智能出价、预算分配、效果优化' },
        { icon: '🌐', title: '客户拓客', desc: '潜在客户搜索、开发信生成' },
        { icon: '📊', title: '市场情报收集', desc: '竞品监控、趋势分析' }
      ],
      metrics: [
        { value: '45,230+', label: '官网月均流量', change: '+15%' },
        { value: '42%', label: '自然搜索占比', change: '+8%' },
        { value: '3.8x', label: '广告ROI', change: '+0.8x' },
        { value: '¥256', label: '线索获取成本', change: '-¥89' }
      ]
    },
    {
      id: 'coco',
      name: 'Coco',
      title: '内容运营',
      icon: '✍️',
      color: 'from-blue-500 to-cyan-600',
      mission: '让官网内容专业、丰富、有吸引力',
      realJobTitle: '内容运营+翻译',
      realCost: '¥15-25万/年',
      capabilities: [
        { icon: '📦', title: '产品内容创作', desc: '描述、参数表、对比表、FAQ' },
        { icon: '📝', title: '博客与SEO内容', desc: '长尾词覆盖、行业文章' },
        { icon: '🌍', title: '多语言翻译', desc: '英/法/西/阿等多语种适配' },
        { icon: '🎨', title: '多媒体内容', desc: '图片处理、视频脚本、社媒素材' }
      ],
      metrics: [
        { value: '28+', label: '月产出页面数', change: '+8页' },
        { value: '27%', label: '内容转化率', change: '+5%' },
        { value: '2分35秒', label: '平均停留时长', change: '+45秒' },
        { value: '85%', label: '多语言覆盖', change: '+10%' }
      ]
    },
    {
      id: 'sara',
      name: 'Sara',
      title: '客服专员',
      icon: '🤝',
      color: 'from-orange-500 to-amber-600',
      mission: '让客户随时找到人并获得专业服务',
      realJobTitle: '客服专员',
      realCost: '¥8-12万/年',
      capabilities: [
        { icon: '❓', title: '智能问答系统', desc: 'RAG知识库精准回答、多语言对话' },
        { icon: '💡', title: '售前咨询转线索', desc: '购买意图识别、转交业务员跟进' },
        { icon: '🛠️', title: '售后工单管理', desc: '自动创建工单、进度跟踪' },
        { icon: '✅', title: '客户满意度管理', desc: '反馈收集、服务优化' }
      ],
      metrics: [
        { value: '78%', label: '问题解决率', change: '+3%' },
        { value: '25秒', label: '平均响应时间', change: '-15秒' },
        { value: '17%', label: '服务转线索率', change: '+2%' },
        { value: '4.4/5.0', label: '客户满意度', change: '+0.2' }
      ]
    },
    {
      id: 'leo',
      name: 'Leo',
      title: '销售经理',
      icon: '💼',
      color: 'from-green-500 to-emerald-600',
      mission: '让每一条商机都不被浪费，实现高效成交',
      realJobTitle: '销售经理×2',
      realCost: '¥30-50万/年',
      capabilities: [
        { icon: '⚡', title: '7×24h即时响应', desc: '多渠道统一响应、基于知识库回答' },
        { icon: '💰', title: '智能报价系统', desc: '价格计算、报价单生成、合同管理' },
        { icon: '🌱', title: '商机培育跟进', desc: '线索评分、培育流程编排' },
        { icon: '👥', title: '客户复购管理', desc: '客户档案、订单追踪、续订提醒' }
      ],
      metrics: [
        { value: '3分钟', label: '响应时间', change: '-2小时' },
        { value: '9.2%', label: '转化率', change: '+5.2%' },
        { value: '88%', label: '高意向识别率', change: '+3%' },
        { value: '28%', label: '客户复购率', change: '+8%' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/ai-agent"
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <span className="text-xl">←</span>
              <span>返回后台</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              <span className="font-bold text-xl text-gray-900">数字门户</span>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
              立即咨询
            </button>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🚀</span>
              <span>AI驱动的数字化增长新范式</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              数字门户 AI数字员工
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                全链路数字营销平台
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              从<strong>品牌建设</strong> → 内容创作 → 客户触达 → 询盘响应 → 销售沟通 → <strong>成交转化</strong>
              <br />
              <strong className="text-purple-600">5大AI数字员工</strong> 助您实现业务全链路增长
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                免费试用14天
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-purple-400 hover:text-purple-600 transition-all">
                预约产品演示
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-3">💰</div>
                <div className="text-3xl font-bold text-purple-600 mb-1">&lt;10%</div>
                <div className="text-gray-600">传统人力成本占比</div>
                <div className="text-sm text-gray-500 mt-2">真实团队 ¥80-130万/年 → AI &lt;10%</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-3">⏰</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">7×24h</div>
                <div className="text-gray-600">全天候不间断运营</div>
                <div className="text-sm text-gray-500 mt-2">无需休息，全天候在线服务</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-3">📈</div>
                <div className="text-3xl font-bold text-green-600 mb-1">300%+</div>
                <div className="text-gray-600">整体效率提升</div>
                <div className="text-sm text-gray-500 mt-2">自动化流程 + 智能决策</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">业务增长全链路</h2>
            <p className="text-xl text-gray-600">每个环节都有AI数字员工专业执行</p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 via-purple-200 via-blue-200 to-cyan-200 to-green-200 -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
              {[
                { step: '01', title: '品牌建设', icon: '🏆', desc: 'Ada全局策略规划', color: 'bg-pink-500' },
                { step: '02', title: '内容创作', icon: '✍️', desc: 'Coco专业内容生成', color: 'bg-blue-500' },
                { step: '03', title: '客户触达', icon: '🎯', desc: 'Mia SEO+Ads引流', color: 'bg-purple-500' },
                { step: '04', title: '询盘响应', icon: '💬', desc: 'Sara智能客服接待', color: 'bg-orange-500' },
                { step: '05', title: '销售沟通', icon: '⚡', desc: 'Leo即时专业跟进', color: 'bg-green-500' },
                { step: '06', title: '成交转化', icon: '💰', desc: '智能报价+合同管理', color: 'bg-cyan-500' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg relative z-10`}>
                    {item.icon}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{item.step}</div>
                  <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">认识您的5大AI数字员工</h2>
            <p className="text-xl text-gray-600">对应真实岗位角色 · 完整的数字运营团队</p>
          </div>

          <div className="space-y-8">
            {agents.map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden ${
                  idx % 2 === 0 ? '' : ''
                }`}
              >
                <div className={`bg-gradient-to-r ${agent.color} p-8 md:p-12`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-6xl flex-shrink-0">
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-3xl font-bold text-white">{agent.name}</h3>
                        <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
                          {agent.title}
                        </span>
                      </div>
                      <p className="text-xl text-white/90 mb-3">"{agent.mission}"</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded text-sm">
                          对应岗位：{agent.realJobTitle}
                        </span>
                        <span className="bg-red-500/80 text-white px-3 py-1 rounded text-sm line-through">
                          {agent.realCost}
                        </span>
                        <span className="bg-green-500/80 text-white px-3 py-1 rounded text-sm font-medium">
                          AI替代成本：&lt;10%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <h4 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                        <span>⚡</span>
                        核心能力
                      </h4>
                      <div className="space-y-3">
                        {agent.capabilities.map((cap, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                            <span className="text-2xl flex-shrink-0">{cap.icon}</span>
                            <div>
                              <div className="font-semibold text-white">{cap.title}</div>
                              <div className="text-sm text-white/70">{cap.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <h4 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                        <span>📊</span>
                        关键指标
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {agent.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="bg-white/10 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-white">{metric.value}</div>
                            <div className="text-sm text-white/70 mt-1">{metric.label}</div>
                            <div className="text-xs text-green-300 mt-1">{metric.change}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">为客户创造的核心价值</h2>
            <p className="text-xl text-gray-600">从成本、效率、增长三个维度全面提升竞争力</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 p-8 border-2 border-green-200"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-bl-2xl font-bold text-lg">
                节省90%
              </div>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-green-800 mb-6">成本优势</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>人力成本大幅降低</strong>
                    <p className="text-sm text-gray-600">从¥80-130万降至&lt;10%，年度节省超百万</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>零培训周期</strong>
                    <p className="text-sm text-gray-600">即开即用，无需招聘培训等待期</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>无管理负担</strong>
                    <p className="text-sm text-gray-600">无需HR、考薪、绩效等管理投入</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>规避人员风险</strong>
                    <p className="text-sm text-gray-600">无离职风险、无知识流失问题</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-100 p-8 border-2 border-blue-200"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-bl-2xl font-bold text-lg">
                提升3倍
              </div>
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-blue-800 mb-6">效率提升</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>极速响应能力</strong>
                    <p className="text-sm text-gray-600">3分钟内响应客户 vs 人工数小时</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>全天候运营</strong>
                    <p className="text-sm text-gray-600">7×24小时不间断工作，随时在线服务</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>多任务并行</strong>
                    <p className="text-sm text-gray-600">同时处理多个客户和多个任务</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>标准化输出</strong>
                    <p className="text-sm text-gray-600">质量稳定一致，不受情绪状态影响</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-pink-100 p-8 border-2 border-purple-200"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-bl-2xl font-bold text-lg">
                增长200%
              </div>
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-purple-800 mb-6">业务增长</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>流量持续增长</strong>
                    <p className="text-sm text-gray-600">SEO + 广告双重引流，获客成本降低</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>转化率提升</strong>
                    <p className="text-sm text-gray-600">专业内容 + 即时响应提升转化</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>客户留存提高</strong>
                    <p className="text-sm text-gray-600">优质服务体验促进复购和口碑</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl mt-0.5">✓</span>
                  <div>
                    <strong>数据驱动决策</strong>
                    <p className="text-sm text-gray-600">实时数据分析，持续优化ROI</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 rounded-3xl p-12 border-2 border-yellow-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">适用场景</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🏭', title: '制造型企业', desc: '需要建立完整的数字化营销体系', features: ['品牌官网建设', '产品展示推广', '线上线下融合'] },
                { icon: '🌐', title: 'B2B/B2C企业', desc: '希望拓展市场增加获客渠道', features: ['多渠道获客', '智能客服系统', '销售流程优化'] },
                { icon: '🛒', title: '电商/零售企业', desc: '需要强大的内容运营和客户服务能力', features: ['内容批量生产', '多平台管理', '客户精细化运营'] },
                { icon: '💡', title: '创业公司/中小企业', desc: '低成本快速启动数字化业务', features: ['快速搭建', '轻量运营', '快速验证市场'] }
              ].map((scene, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{scene.icon}</div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">{scene.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{scene.desc}</p>
                  <div className="space-y-2">
                    {scene.features.map((f, fIdx) => (
                      <div key={fIdx} className="inline-block bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs mr-2 mb-2">
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              立即开启您的AI数字化增长之旅
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              加入10000+企业，用AI数字员工实现降本增效，让业务增长更简单高效
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-white text-purple-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl">
                开始免费试用14天
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                联系销售顾问
              </button>
            </div>
            <div className="mt-12 flex justify-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>无需信用卡</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>全功能试用</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>随时取消</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>专属客服支持</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏢</span>
                <span className="font-bold text-xl text-white">数字门户</span>
              </div>
              <p className="text-sm">AI驱动的全链路数字营销平台</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">产品功能</h4>
              <ul className="space-y-2 text-sm">
                <li>AI运营主管 Ada</li>
                <li>AI推广专员 Mia</li>
                <li>AI内容运营 Coco</li>
                <li>AI客服专员 Sara</li>
                <li>AI销售经理 Leo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">解决方案</h4>
              <ul className="space-y-2 text-sm">
                <li>制造型企业数字化</li>
                <li>B2B/B2C企业增长</li>
                <li>电商零售运营</li>
                <li>创业公司启动</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">联系我们</h4>
              <ul className="space-y-2 text-sm">
                <li>📧 contact@example.com</li>
                <li>📞 400-xxx-xxxx</li>
                <li>💬 微信在线咨询</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 数字门户. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
