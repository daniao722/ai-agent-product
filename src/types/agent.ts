export type AgentId = 
  | 'mia'
  | 'coco'
  | 'leo'
  | 'sara'
  | 'ada';

export type AgentStatus = 'active' | 'idle' | 'working';

export interface SubAgent {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  description: string;
  status?: 'active' | 'idle' | 'working';
}

export interface AgentMetric {
  name: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  unit?: string;
  target?: string;
}

export interface Agent {
  id: AgentId;
  name: string;
  displayName: string;
  icon: string;
  color: string;
  description: string;
  mission: string;
  status: AgentStatus;
  realJobTitle: string;
  realJobSalary: string;
  position: string; // 运营主管/团队成员
  metrics: AgentMetric[];
  keyResponsibilities: {
    title: string;
    description: string;
    result: string;
  }[];
  subAgents: SubAgent[];
  recentActivities: {
    time: string;
    action: string;
    result?: string;
  }[];
}

export interface ValueMetric {
  category: 'cost' | 'efficiency' | 'revenue' | 'capability';
  realJobTitle: string;
  realSalary: string;
  agentName: string;
  agentMission: string;
  subscriptionCost: string;
  savingRatio: string;
  description: string;
}

export interface BusinessData {
  revenue: {
    current: number;
    growth: number;
    trend: { date: string; value: number }[];
  };
  leads: {
    current: number;
    growth: number;
    quality: number;
  };
  conversion: {
    rate: number;
    improvement: number;
  };
  responseTime: {
    current: string;
    before: string;
    improvement: string;
  };
}

export const AGENTS_DATA: Agent[] = [
  {
    id: 'mia',
    name: 'Mia',
    displayName: 'Mia · 推广专员',
    icon: '🚀',
    color: 'from-purple-500 to-indigo-600',
    description: 'SEO/推广专员、数字营销专员',
    mission: '让海外买家在Google上找到你',
    status: 'active',
    realJobTitle: 'SEO/推广专员',
    realJobSalary: '¥12-18万/年',
    position: '团队成员',
    metrics: [
      { name: '官网月均流量', value: '45,230', change: '+15%', changeType: 'positive', target: '月均增长15%+' },
      { name: '自然搜索流量占比', value: '42%', change: '+8%', changeType: 'positive', target: '>40%' },
      { name: '广告ROI', value: '3.8x', change: '+0.8x', changeType: 'positive', target: '>3:1' },
      { name: '线索获取成本', value: '¥256', change: '-¥89', changeType: 'positive', target: '低于行业均值30%' },
    ],
    keyResponsibilities: [
      {
        title: 'Google SEO优化',
        description: '关键词研究、页面SEO优化、排名监控、输出周报',
        result: '官网自然搜索流量持续增长'
      },
      {
        title: 'Google Ads智能投放',
        description: '自动优化出价和关键词、智能分配预算、生成效果报告',
        result: '官网付费流量ROI提升'
      },
      {
        title: '外贸客户主动拓客',
        description: '搜索潜在买家、个性化开发信、跟踪转化情况',
        result: '商机量增长'
      },
      {
        title: '市场情报收集',
        description: '监控竞品动态、扫描市场趋势、转化为推广建议',
        result: '推广策略与市场机会对齐'
      }
    ],
    subAgents: [
      {
        id: 'seo-agent',
        name: 'SEO Agent',
        icon: '🔍',
        skills: [
          { name: 'keyword_research', description: '关键词研究', status: 'active' },
          { name: 'page_seo_audit', description: '页面SEO诊断', status: 'active' },
          { name: 'tdk_optimization', description: 'TDK优化生成', status: 'working' },
          { name: 'internal_link_suggest', description: '内链建议', status: 'idle' },
          { name: 'rank_tracking', description: '排名监控', status: 'active' },
          { name: 'seo_weekly_report', description: 'SEO周报生成', status: 'idle' },
        ]
      },
      {
        id: 'ads-agent',
        name: 'Ads Agent',
        icon: '📢',
        skills: [
          { name: 'campaign_create', description: '广告计划创建', status: 'idle' },
          { name: 'bid_optimization', description: '出价优化', status: 'active' },
          { name: 'keyword_management', description: '广告关键词管理', status: 'active' },
          { name: 'budget_allocation', description: '预算分配', status: 'idle' },
          { name: 'ad_copy_generation', description: '广告文案生成', status: 'working' },
          { name: 'ads_performance_report', description: '广告效果报告', status: 'idle' },
        ]
      },
      {
        id: 'outreach-agent',
        name: 'Outreach Agent',
        icon: '📧',
        skills: [
          { name: 'prospect_search', description: '潜在客户搜索', status: 'active' },
          { name: 'profile_analysis', description: '客户画像分析', status: 'working' },
          { name: 'outreach_message_gen', description: '开发信生成', status: 'active' },
          { name: 'email_send_track', description: '邮件发送与追踪', status: 'active' },
          { name: 'linkedin_connect', description: 'LinkedIn连接管理', status: 'idle' },
          { name: 'follow_up_scheduler', description: '跟进计划排期', status: 'idle' },
        ]
      },
      {
        id: 'intel-agent',
        name: 'Intel Agent',
        icon: '🔎',
        skills: [
          { name: 'competitor_monitor', description: '竞品动态监控', status: 'active' },
          { name: 'market_trend_scan', description: '市场趋势扫描', status: 'idle' },
          { name: 'compliance_check', description: '合规风险检查', status: 'idle' },
          { name: 'opportunity_alert', description: '机会预警推送', status: 'active' },
        ]
      }
    ],
    recentActivities: [
      { time: '2分钟前', action: '完成关键词排名监控', result: '发现3个关键词进入首页' },
      { time: '15分钟前', action: '优化Google Ads出价', result: 'ROI提升至3.8x' },
      { time: '1小时前', action: '发送50封个性化开发信', result: '已送达，等待回复' },
      { time: '3小时前', action: '监控到竞品广告调整', result: '已生成应对建议' },
    ],
  },
  {
    id: 'coco',
    name: 'Coco',
    displayName: 'Coco · 内容运营',
    icon: '✍️',
    color: 'from-blue-500 to-cyan-600',
    description: '内容运营、文案策划、多语种翻译',
    mission: '让官网内容专业、丰富、有吸引力',
    status: 'working',
    realJobTitle: '内容运营+翻译',
    realJobSalary: '¥15-25万/年',
    position: '团队成员',
    metrics: [
      { name: '月内容产出量', value: '28', unit: '页/月', change: '+8', changeType: 'positive', target: '>20页/月' },
      { name: '内容转化贡献率', value: '27%', change: '+5%', changeType: 'positive', target: '>25%' },
      { name: '页面平均停留时长', value: '2分35秒', change: '+45秒', changeType: 'positive', target: '>2分钟' },
      { name: '多语言覆盖率', value: '85%', change: '+10%', changeType: 'positive', target: '>80%' },
    ],
    keyResponsibilities: [
      {
        title: '产品内容创作',
        description: '产品描述、技术参数表、对比表、选型指南、FAQ',
        result: '官网产品页专业度和转化率提升'
      },
      {
        title: '博客与SEO内容',
        description: '根据Mia的关键词策略创作博客文章、覆盖长尾词',
        result: '官网内容搜索排名和流量提升'
      },
      {
        title: '内容更新与维护',
        description: '新品上线自动生成内容、过期内容标记、季节性规划',
        result: '官网内容时效性和回访率提升'
      },
      {
        title: '多媒体内容适配',
        description: '图片处理、视频脚本、社交媒体素材、产品展示配置',
        result: '官网视觉体验和互动性提升'
      }
    ],
    subAgents: [
      {
        id: 'product-content-agent',
        name: 'Product Content Agent',
        icon: '📦',
        skills: [
          { name: 'product_desc_gen', description: '产品描述生成', status: 'active' },
          { name: 'spec_sheet_gen', description: '规格参数表生成', status: 'working' },
          { name: 'comparison_table_gen', description: '产品对比表生成', status: 'idle' },
          { name: 'selection_guide_gen', description: '选型指南生成', status: 'idle' },
          { name: 'faq_gen', description: '产品FAQ生成', status: 'active' },
        ]
      },
      {
        id: 'blog-agent',
        name: 'Blog Agent',
        icon: '📝',
        skills: [
          { name: 'topic_ideation', description: '选题策划', status: 'active' },
          { name: 'blog_article_gen', description: '博客文章生成', status: 'working' },
          { name: 'seo_content_optimize', description: 'SEO内容优化', status: 'active' },
          { name: 'content_calendar_plan', description: '内容日历规划', status: 'idle' },
          { name: 'content_publish', description: '内容发布到官网', status: 'active' },
        ]
      },
      {
        id: 'localization-agent',
        name: 'Localization Agent',
        icon: '🌐',
        skills: [
          { name: 'translate_content', description: '多语言翻译', status: 'active' },
          { name: 'cultural_adapt', description: '文化适配审查', status: 'working' },
          { name: 'locale_seo_adjust', description: '本地SEO调整', status: 'idle' },
          { name: 'multilingual_review', description: '多语言质量审核', status: 'idle' },
        ]
      },
      {
        id: 'media-agent',
        name: 'Media Agent',
        icon: '🎨',
        skills: [
          { name: 'image_process', description: '图片处理', status: 'active' },
          { name: 'video_script_gen', description: '视频脚本生成', status: 'idle' },
          { name: 'social_media_asset', description: '社交媒体素材生成', status: 'working' },
          { name: 'product_showcase_config', description: '产品展示配置', status: 'idle' },
        ]
      }
    ],
    recentActivities: [
      { time: '5分钟前', action: '正在生成德语产品描述', result: '进行中...' },
      { time: '30分钟前', action: '完成5篇英文博客优化', result: '已发布' },
      { time: '1小时前', action: '为新品生成全套内容', result: '产品页+博客+FAQ已完成' },
      { time: '4小时前', action: '处理50张产品图片', result: '水印+尺寸+ALT标签已完成' },
    ],
  },
  {
    id: 'leo',
    name: 'Leo',
    displayName: 'Leo · 外贸业务员',
    icon: '💼',
    color: 'from-green-500 to-emerald-600',
    description: '外贸业务员、外贸跟单员',
    mission: '让每一条询盘都不被浪费',
    status: 'working',
    realJobTitle: '外贸业务员×2',
    realJobSalary: '¥30-50万/年',
    position: '团队成员',
    metrics: [
      { name: '询盘响应时间', value: '3分钟', change: '-2小时', changeType: 'positive', target: '<5分钟' },
      { name: '询盘转化率', value: '9.2%', change: '+5.2%', changeType: 'positive', target: '>8%' },
      { name: 'A级线索识别率', value: '88%', change: '+3%', changeType: 'positive', target: '>85%' },
      { name: '客户复购率', value: '28%', change: '+8%', changeType: 'positive', target: '>25%' },
    ],
    keyResponsibilities: [
      {
        title: '询盘即时响应',
        description: '7×24h多渠道响应、基于RAG知识库回答、识别意向等级',
        result: '询盘零流失'
      },
      {
        title: '智能报价',
        description: '价格计算、汇率获取、运费估算、报价单生成',
        result: '报价效率提升5倍'
      },
      {
        title: '线索培育与跟进',
        description: '线索评分、培育流程编排、回访检测、跟进提醒',
        result: '线索流失率降低50%'
      },
      {
        title: '客户管理与复购',
        description: '客户档案管理、订单进度追踪、复购识别、续订提醒',
        result: '客户复购率提升30%'
      }
    ],
    subAgents: [
      {
        id: 'inquiry-agent',
        name: 'Inquiry Agent',
        icon: '💬',
        skills: [
          { name: 'inquiry_classify', description: '询盘分类与意向评级', status: 'active' },
          { name: 'auto_reply_gen', description: '自动回复生成', status: 'active' },
          { name: 'multi_channel_respond', description: '多渠道统一响应', status: 'working' },
          { name: 'intent_notify', description: '高意向线索通知', status: 'active' },
          { name: 'conversation_summary', description: '对话摘要生成', status: 'idle' },
        ]
      },
      {
        id: 'quote-agent',
        name: 'Quote Agent',
        icon: '💰',
        skills: [
          { name: 'price_calc', description: '价格计算', status: 'active' },
          { name: 'exchange_rate_fetch', description: '实时汇率获取', status: 'active' },
          { name: 'freight_estimate', description: '运费估算', status: 'idle' },
          { name: 'quotation_gen', description: '报价单生成', status: 'working' },
          { name: 'quote_strategy_suggest', description: '报价策略建议', status: 'idle' },
        ]
      },
      {
        id: 'nurture-agent',
        name: 'Nurture Agent',
        icon: '🌱',
        skills: [
          { name: 'lead_scoring', description: '线索评分', status: 'active' },
          { name: 'nurture_sequence', description: '培育流程编排', status: 'idle' },
          { name: 'revisit_detect', description: '回访行为检测', status: 'active' },
          { name: 'follow_up_remind', description: '跟进提醒', status: 'active' },
          { name: 'drip_email_gen', description: '培育邮件生成', status: 'working' },
        ]
      },
      {
        id: 'account-agent',
        name: 'Account Agent',
        icon: '👥',
        skills: [
          { name: 'customer_profile', description: '客户档案管理', status: 'active' },
          { name: 'order_track', description: '订单进度追踪', status: 'active' },
          { name: 'reorder_detect', description: '复购机会识别', status: 'working' },
          { name: 'reorder_remind', description: '续订提醒发送', status: 'idle' },
          { name: 'satisfaction_survey', description: '满意度调查', status: 'idle' },
        ]
      }
    ],
    recentActivities: [
      { time: '1分钟前', action: '正在回复德国客户询盘', result: '进行中...' },
      { time: '10分钟前', action: '生成智能报价单', result: '已发送给客户' },
      { time: '1小时前', action: '识别到3个A级线索', result: '已通知业务员' },
      { time: '3小时前', action: '发送续订提醒邮件', result: '已发送给5位老客户' },
    ],
  },
  {
    id: 'sara',
    name: 'Sara',
    displayName: 'Sara · 客服专员',
    icon: '🤝',
    color: 'from-orange-500 to-amber-600',
    description: '客服专员、售后支持',
    mission: '让海外买家随时找到人',
    status: 'active',
    realJobTitle: '客服专员',
    realJobSalary: '¥8-12万/年',
    position: '团队成员',
    metrics: [
      { name: '问题解决率', value: '78%', change: '+3%', changeType: 'positive', target: '>75%' },
      { name: '平均响应时间', value: '25秒', change: '-15秒', changeType: 'positive', target: '<30秒' },
      { name: '服务转线索率', value: '17%', change: '+2%', changeType: 'positive', target: '>15%' },
      { name: '客户满意度(CSAT)', value: '4.4/5.0', change: '+0.2', changeType: 'positive', target: '>4.2/5.0' },
    ],
    keyResponsibilities: [
      {
        title: '智能问答',
        description: '基于RAG知识库精准回答、多语言实时对话、问题分类路由',
        result: '访客问题解决率>75%'
      },
      {
        title: '售前咨询转线索',
        description: '解答时引导了解产品、识别高意向咨询、转交Leo跟进',
        result: '服务转线索率>15%'
      },
      {
        title: '售后工单管理',
        description: '自动创建工单、跟踪处理进度、超时升级、常见问题自动回复',
        result: '售后工单按时结案率>90%'
      },
      {
        title: '业务查询与验证',
        description: '防伪溯源查询、订单状态查询、异常检测预警',
        result: '品牌公信力和买家信任度提升'
      }
    ],
    subAgents: [
      {
        id: 'qa-agent',
        name: 'Q&A Agent',
        icon: '❓',
        skills: [
          { name: 'knowledge_search', description: '知识库检索', status: 'active' },
          { name: 'answer_gen', description: '答案生成', status: 'active' },
          { name: 'question_classify', description: '问题分类', status: 'active' },
          { name: 'unknown_escalate', description: '未知问题升级', status: 'idle' },
          { name: 'knowledge_gap_detect', description: '知识缺口检测', status: 'working' },
        ]
      },
      {
        id: 'presales-agent',
        name: 'PreSales Agent',
        icon: '💡',
        skills: [
          { name: 'consult_guide', description: '咨询引导', status: 'active' },
          { name: 'intent_detect', description: '购买意图识别', status: 'working' },
          { name: 'lead_capture', description: '线索信息采集', status: 'active' },
          { name: 'handoff_to_leo', description: '转交Leo跟进', status: 'active' },
          { name: 'product_recommend', description: '产品推荐', status: 'idle' },
        ]
      },
      {
        id: 'aftersales-agent',
        name: 'AfterSales Agent',
        icon: '🛠️',
        skills: [
          { name: 'ticket_create', description: '工单创建', status: 'active' },
          { name: 'ticket_track', description: '工单追踪', status: 'active' },
          { name: 'ticket_escalate', description: '工单升级', status: 'idle' },
          { name: 'complaint_handle', description: '投诉处理', status: 'working' },
          { name: 'ticket_report', description: '售后报告', status: 'idle' },
        ]
      },
      {
        id: 'verify-agent',
        name: 'Verify Agent',
        icon: '✅',
        skills: [
          { name: 'traceability_query', description: '防伪溯源查询', status: 'active' },
          { name: 'order_status_query', description: '订单状态查询', status: 'active' },
          { name: 'anomaly_detect', description: '异常检测预警', status: 'idle' },
          { name: 'certificate_display', description: '资质证书展示', status: 'idle' },
        ]
      }
    ],
    recentActivities: [
      { time: '3分钟前', action: '解答产品使用问题', result: '客户满意' },
      { time: '15分钟前', action: '识别高意向售前咨询', result: '已转交Leo' },
      { time: '45分钟前', action: '创建售后工单#20260427001', result: '已分配处理人' },
      { time: '2小时前', action: '完成防伪溯源验证', result: '正品确认' },
    ],
  },
  {
    id: 'ada',
    name: 'Ada',
    displayName: 'Ada · 运营主管',
    icon: '👩‍💼',
    color: 'from-pink-500 to-rose-600',
    description: '运营主管、电商经理、网站运营经理',
    mission: '统筹官网运营全局',
    status: 'active',
    realJobTitle: '运营主管',
    realJobSalary: '¥15-25万/年',
    position: '运营主管',
    metrics: [
      { name: '诊断建议采纳率', value: '65%', change: '+5%', changeType: 'positive', target: '>60%' },
      { name: '跨员工任务调度数', value: '12', unit: '次/周', change: '+3', changeType: 'positive', target: '>10/周' },
      { name: '操作效率提升', value: '72%', change: '+7%', changeType: 'positive', target: '>70%' },
      { name: '报告自动生成率', value: '85%', change: '+5%', changeType: 'positive', target: '>80%' },
    ],
    keyResponsibilities: [
      {
        title: '数据诊断与策略建议',
        description: '实时监控核心指标、自动识别异常、给出可执行优化建议',
        result: '官网问题及时发现，优化方向明确可执行'
      },
      {
        title: '团队协调与任务调度',
        description: '将数据洞察转化为执行任务、跨员工协同工作流编排',
        result: '全链路协同，从"单点优化"升级为"系统优化"'
      },
      {
        title: '网站管理与操作',
        description: '自然语言操控官网、批量操作、系统配置一键完成',
        result: '官网操作效率提升80%'
      },
      {
        title: '运营报告与决策支持',
        description: '自动生成日报/周报/月报、竞品分析、ROI归因分析',
        result: '运营成果可量化、可汇报、可决策'
      }
    ],
    subAgents: [
      {
        id: 'analytics-agent',
        name: 'Analytics Agent',
        icon: '📊',
        skills: [
          { name: 'health_score_calc', description: '官网健康度评分', status: 'active' },
          { name: 'anomaly_detect', description: '异常波动检测', status: 'active' },
          { name: 'funnel_analysis', description: '转化漏斗分析', status: 'working' },
          { name: 'insight_gen', description: '洞察与建议生成', status: 'active' },
          { name: 'competitor_benchmark', description: '竞品对比分析', status: 'idle' },
        ]
      },
      {
        id: 'coordination-agent',
        name: 'Coordination Agent',
        icon: '🔄',
        skills: [
          { name: 'task_create', description: '跨员工任务创建', status: 'active' },
          { name: 'task_dispatch', description: '任务分派与调度', status: 'active' },
          { name: 'task_track', description: '任务进度追踪', status: 'active' },
          { name: 'workflow_orchestrate', description: '工作流编排', status: 'working' },
          { name: 'cross_agent_notify', description: '跨员工通知', status: 'active' },
        ]
      },
      {
        id: 'siteops-agent',
        name: 'SiteOps Agent',
        icon: '⚙️',
        skills: [
          { name: 'nl_command_parse', description: '自然语言指令解析', status: 'active' },
          { name: 'site_config_exec', description: '站点配置执行', status: 'active' },
          { name: 'content_batch_ops', description: '内容批量操作', status: 'idle' },
          { name: 'domain_ssl_manage', description: '域名SSL管理', status: 'idle' },
          { name: 'notification_rule_config', description: '通知规则配置', status: 'working' },
        ]
      },
      {
        id: 'report-agent',
        name: 'Report Agent',
        icon: '📋',
        skills: [
          { name: 'daily_report_gen', description: '日报生成', status: 'active' },
          { name: 'weekly_report_gen', description: '周报生成', status: 'active' },
          { name: 'monthly_report_gen', description: '月报生成', status: 'working' },
          { name: 'roi_attribution', description: 'ROI归因分析', status: 'idle' },
          { name: 'custom_report_gen', description: '自定义报告', status: 'idle' },
        ]
      }
    ],
    recentActivities: [
      { time: '5分钟前', action: '识别到首页跳出率异常', result: '已生成优化建议' },
      { time: '30分钟前', action: '调度Mia和Coco协作', result: '德语区内容优化任务已分发' },
      { time: '1小时前', action: '完成周度运营报告', result: '已推送给老板' },
      { time: '3小时前', action: '执行用户指令：更新Banner', result: '已完成' },
    ],
  },
];

export const VALUE_METRICS: ValueMetric[] = [
  {
    category: 'cost',
    realJobTitle: 'SEO/推广专员',
    realSalary: '¥12-18万/年',
    agentName: 'Mia · 推广专员',
    agentMission: '让海外买家找到你',
    subscriptionCost: '含在套餐中',
    savingRatio: '>90%',
    description: '招一个SEO专员年薪12-18万，还要3-6个月上手期。Mia上岗即用，7×24h工作，成本不到1/10。',
  },
  {
    category: 'cost',
    realJobTitle: '内容运营+翻译',
    realSalary: '¥15-25万/年',
    agentName: 'Coco · 内容运营',
    agentMission: '让官网内容会说话',
    subscriptionCost: '含在套餐中',
    savingRatio: '>90%',
    description: '招一个内容运营年薪10-15万，还得多语种翻译外包费5-10万/年。Coco一个人搞定所有语言，成本不到1/15。',
  },
  {
    category: 'cost',
    realJobTitle: '外贸业务员×2',
    realSalary: '¥30-50万/年',
    agentName: 'Leo · 外贸业务员',
    agentMission: '让每条询盘不浪费',
    subscriptionCost: '含在套餐中',
    savingRatio: '>90%',
    description: '招一个外贸业务员年薪15-25万，但时差导致50%询盘流失。Leo 7×24h在线，不漏一条询盘，相当于2-3个业务员的接单能力。',
  },
  {
    category: 'cost',
    realJobTitle: '客服专员',
    realSalary: '¥8-12万/年',
    agentName: 'Sara · 客服专员',
    agentMission: '让买家随时找到人',
    subscriptionCost: '含在套餐中',
    savingRatio: '>90%',
    description: '招一个客服专员年薪8-12万，但只能覆盖8小时工作时段。Sara 7×24h在线，覆盖全球时区，成本不到1/8。',
  },
  {
    category: 'cost',
    realJobTitle: '运营主管',
    realSalary: '¥15-25万/年',
    agentName: 'Ada · 运营主管',
    agentMission: '让运营看得清做得快',
    subscriptionCost: '含在套餐中',
    savingRatio: '>90%',
    description: '运营主管是最难招的岗位——要懂数据、懂网站、懂协调，年薪15-25万还经常招不到合适的。Ada是完美运营主管：懂数据、会操作、能协调、7×24h在岗。',
  },
];

export const BUSINESS_DATA: BusinessData = {
  revenue: {
    current: 8500000,
    growth: 35,
    trend: Array.from({ length: 6 }, (_, i) => ({
      date: `2026-${String(i + 10).padStart(2, '0')}`,
      value: 5200000 + i * 550000 + Math.random() * 200000,
    })),
  },
  leads: {
    current: 328,
    growth: 65,
    quality: 8.2,
  },
  conversion: {
    rate: 9.2,
    improvement: 178,
  },
  responseTime: {
    current: '3分钟',
    before: '2小时',
    improvement: '97%',
  },
};
