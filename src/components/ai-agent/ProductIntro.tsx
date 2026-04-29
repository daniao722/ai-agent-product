'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AGENTS_DATA, Agent } from '@/types/agent';

interface ProductIntroProps {
  onClose: () => void;
}

export default function ProductIntro({ onClose }: ProductIntroProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'value' | 'pricing'>('overview');

  const agentDetails = [
    {
      id: 'mia',
      name: 'Mia',
      title: '推广专员',
      icon: '🚀',
      color: 'from-purple-500 to-indigo-600',
      mission: '让海外买家在Google上找到你',
      capabilities: ['SEO优化', 'Google Ads投放', '外贸客户拓客', '市场情报收集'],
      metrics: ['官网月均流量 45,230+', '自然搜索占比 42%', '广告ROI 3.8x', '线索成本 ¥256'],
      realCost: '¥12-18万/年',
    },
    {
      id: 'coco',
      name: 'Coco',
      title: '内容运营',
      icon: '✍️',
      color: 'from-blue-500 to-cyan-600',
      mission: '让官网内容专业、丰富、有吸引力',
      capabilities: ['产品内容创作', '博客与SEO内容', '多语言翻译', '多媒体适配'],
      metrics: ['月产出28+页面', '内容转化率27%', '停留时长2分35秒', '多语言覆盖85%'],
      realCost: '¥15-25万/年',
    },
    {
      id: 'leo',
      name: 'Leo',
      title: '外贸业务员',
      icon: '💼',
      color: 'from-green-500 to-emerald-600',
      mission: '让每一条询盘都不被浪费',
      capabilities: ['7×24h即时响应', '智能报价系统', '线索培育跟进', '客户复购管理'],
      metrics: ['响应时间3分钟', '询盘转化率9.2%', 'A级线索识别88%', '复购率28%'],
      realCost: '¥30-50万/年',
    },
    {
      id: 'sara',
      name: 'Sara',
      title: '客服专员',
      icon: '🤝',
      color: 'from-orange-500 to-amber-600',
      mission: '让海外买家随时找到人',
      capabilities: ['智能问答系统', '售前咨询转线索', '售后工单管理', '防伪溯源查询'],
      metrics: ['问题解决率78%', '响应时间25秒', '服务转线索率17%', '满意度4.4/5.0'],
      realCost: '¥8-12万/年',
    },
    {
      id: 'ada',
      name: 'Ada',
      title: '运营主管',
      icon: '👩‍💼',
      color: 'from-pink-500 to-rose-600',
      mission: '统筹官网运营全局',
      capabilities: ['数据诊断策略', '跨员工任务调度', '自动化报告生成', '协同工作流编排'],
      metrics: ['诊断采纳率65%', '调度12次/周', '效率提升72%', '报告生成率85%'],
      realCost: '¥15-25万/年',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-8 py-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">数字门户 AI数字员工产品介绍</h1>
              <p className="text-white/80">5大AI数字员工 · 完整的外贸官网运营团队 · 降低90%成本</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-2xl transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-2 mt-6">
            {[
              { id: 'overview', label: '产品概览' },
              { id: 'agents', label: '5大数字员工' },
              { id: 'value', label: '客户价值' },
              { id: 'pricing', label: '价格方案' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">重新定义外贸官网运营</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  用AI数字员工替代传统人工团队，实现7×24小时不间断运营，
                  成本降低90%，效率提升300%
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                  <div className="text-5xl mb-4">💰</div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">&lt;10%</div>
                  <div className="text-gray-600">传统成本占比</div>
                  <div className="text-sm text-gray-500 mt-2">真实团队：¥80-130万/年 → AI团队：&lt;10%</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                  <div className="text-5xl mb-4">⏰</div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">7×24h</div>
                  <div className="text-gray-600">全天候运营</div>
                  <div className="text-sm text-gray-500 mt-2">无需休息，全球时区全覆盖</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                  <div className="text-5xl mb-4">📈</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">300%</div>
                  <div className="text-gray-600">效率提升</div>
                  <div className="text-sm text-gray-500 mt-2">自动化流程 + 智能决策</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">为什么选择数字门户？</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: '🎯',
                      title: '精准获客',
                      desc: 'Mia通过SEO和Ads精准引流，获取高质量海外买家询盘',
                    },
                    {
                      icon: '✍️',
                      title: '内容引擎',
                      desc: 'Coco自动生成多语种专业内容，提升网站转化率',
                    },
                    {
                      icon: '💬',
                      title: '即时响应',
                      desc: 'Leo 3分钟内响应询盘，Sara提供24小时客服支持',
                    },
                    {
                      icon: '📊',
                      title: '数据驱动',
                      desc: 'Ada实时监控数据，自动优化策略，持续提升ROI',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 bg-white p-6 rounded-lg">
                      <div className="text-4xl">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'agents' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">认识您的AI数字员工团队</h2>
                <p className="text-lg text-gray-600">每个数字员工都对应真实的岗位角色，具备专业的技能和能力</p>
              </div>

              <div className="space-y-6">
                {agentDetails.map((agent, idx) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-gradient-to-r ${agent.color} rounded-xl p-8 text-white`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl">
                          {agent.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{agent.name} · {agent.title}</h3>
                          <p className="text-white/80 text-lg mt-1">"{agent.mission}"</p>
                          <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                            对应真实岗位成本：{agent.realCost}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <h4 className="font-bold text-lg mb-4">核心能力</h4>
                        <div className="space-y-2">
                          {agent.capabilities.map((cap, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-2">
                              <span className="text-green-300">✓</span>
                              <span>{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <h4 className="font-bold text-lg mb-4">关键指标</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {agent.metrics.map((metric, mIdx) => (
                            <div key={mIdx} className="bg-white/10 rounded px-3 py-2 text-center">
                              <div className="font-bold">{metric.split(' ')[0]}</div>
                              <div className="text-xs text-white/70">{metric.split(' ').slice(1).join(' ')}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'value' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">为客户创造的核心价值</h2>
                <p className="text-lg text-gray-600">从成本、效率、增长三个维度，全面提升您的外贸业务竞争力</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="border-2 border-green-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg font-bold">
                    节省90%
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">💰 成本优势</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>人力成本：</strong>从¥80-130万降至&lt;10%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>培训成本：</strong>零培训周期，即开即用</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>管理成本：</strong>无需HR、考薪等管理投入</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span><strong>风险成本：</strong>无人员流动风险</span>
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-blue-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg font-bold">
                    提升3倍
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">⚡ 效率提升</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span><strong>响应速度：</strong>3分钟 vs 人工数小时</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span><strong>工作时间：</strong>7×24h vs 8×5天</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span><strong>产出能力：</strong>多任务并行处理</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span><strong>一致性：</strong>标准化输出质量稳定</span>
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-purple-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg font-bold">
                    增长200%
                  </div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-4">📈 业务增长</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span><strong>流量增长：</strong>SEO+Ads双重引流</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span><strong>转化优化：</strong>专业内容提升转化率</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span><strong>客户留存：</strong>优质服务提升复购</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">✓</span>
                      <span><strong>数据驱动：</strong>持续优化ROI</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 border-2 border-yellow-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">适用场景</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: '🌐', title: 'B2B外贸企业', desc: '需要建立海外营销体系' },
                    { icon: '🏭', title: '制造型企业', desc: '希望拓展国际市场' },
                    { icon: '🛒', title: '跨境电商', desc: '需要多渠道运营能力' },
                    { icon: '💡', title: '创业公司', desc: '低成本快速启动外贸业务' },
                  ].map((scene, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 text-center">
                      <div className="text-4xl mb-2">{scene.icon}</div>
                      <h4 className="font-bold text-gray-900 mb-1">{scene.title}</h4>
                      <p className="text-sm text-gray-600">{scene.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'pricing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">灵活的价格方案</h2>
                <p className="text-lg text-gray-600">根据您的业务规模选择最适合的方案</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-purple-400 transition-colors">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">基础版</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-4">¥2,999<span className="text-lg text-gray-500">/月</span></div>
                  <ul className="space-y-3 mb-6 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Mia 推广专员</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Coco 内容运营</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Sara 客服专员</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>基础数据分析</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-300">✗</span>
                      <span>Ada 运营主管</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-300">✗</span>
                      <span>Leo 外贸业务员</span>
                    </li>
                  </ul>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors">
                    选择基础版
                  </button>
                </div>

                <div className="border-2 border-purple-500 rounded-xl p-8 relative bg-purple-50 transform scale-105">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-6 py-1 rounded-full font-bold">
                    最受欢迎
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">专业版</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-4">¥5,999<span className="text-lg text-gray-500">/月</span></div>
                  <ul className="space-y-3 mb-6 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Mia 推广专员</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Coco 内容运营</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Leo 外贸业务员</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Sara 客服专员</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>高级数据分析</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Ada 运营主管</span>
                    </li>
                  </ul>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    选择专业版
                  </button>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-purple-400 transition-colors">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">企业版</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-4">定制报价</div>
                  <ul className="space-y-3 mb-6 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>完整5大数字员工</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>专属客户成功经理</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>定制化功能开发</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>API接口对接</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>私有化部署选项</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>7×24小时技术支持</span>
                    </li>
                  </ul>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors">
                    联系销售
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">立即开始免费试用</h3>
                <p className="text-gray-600 mb-6">14天全功能试用，无需信用卡，随时取消</p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                    开始免费试用
                  </button>
                  <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-8 rounded-lg transition-colors">
                    预约演示
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
