// 系统级页面组件库 - 基于行业产品详情页内容结构标准（30个标准模块）
export interface PageComponent {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  fields: { key: string; label: string; type: string }[];
}

export const PAGE_COMPONENTS: PageComponent[] = [
  // 基础信息类
  {
    id: 'product-title',
    name: '产品标题与核心卖点',
    category: '基础信息',
    icon: 'T',
    description: '产品主标题、副标题、核心卖点标签',
    fields: [
      { key: 'title', label: '产品标题', type: 'text' },
      { key: 'subtitle', label: '副标题', type: 'text' },
      { key: 'sellingPoints', label: '核心卖点', type: 'tags' },
    ],
  },
  {
    id: 'product-specs',
    name: '产品规格参数表',
    category: '基础信息',
    icon: '',
    description: '技术参数表格，支持多行多列',
    fields: [
      { key: 'specs', label: '规格参数', type: 'table' },
    ],
  },
  {
    id: 'product-features',
    name: '产品功能/性能介绍',
    category: '基础信息',
    icon: '⚡',
    description: '核心功能与性能特点展示',
    fields: [
      { key: 'features', label: '功能列表', type: 'list' },
      { key: 'description', label: '详细描述', type: 'richtext' },
    ],
  },
  {
    id: 'product-scenarios',
    name: '应用场景/使用案例',
    category: '基础信息',
    icon: '🏭',
    description: '产品在不同场景下的应用展示',
    fields: [
      { key: 'scenarios', label: '场景列表', type: 'cards' },
    ],
  },
  {
    id: 'product-media',
    name: '产品图片/视频展示',
    category: '基础信息',
    icon: '🖼️',
    description: '产品主图、细节图、视频轮播',
    fields: [
      { key: 'images', label: '图片列表', type: 'gallery' },
      { key: 'videos', label: '视频列表', type: 'video' },
    ],
  },

  // 技术深度类
  {
    id: 'tech-principle',
    name: '技术原理/工艺流程',
    category: '技术深度',
    icon: '🔬',
    description: '技术原理图解、工艺流程说明',
    fields: [
      { key: 'principle', label: '技术原理', type: 'richtext' },
      { key: 'process', label: '工艺流程', type: 'steps' },
    ],
  },
  {
    id: 'quality-cert',
    name: '质量认证/检测报告',
    category: '技术深度',
    icon: '',
    description: 'ISO认证、CE认证、检测报告展示',
    fields: [
      { key: 'certifications', label: '认证列表', type: 'list' },
      { key: 'reports', label: '检测报告', type: 'files' },
    ],
  },
  {
    id: 'brand-story',
    name: '品牌故事/企业实力',
    category: '技术深度',
    icon: '🏢',
    description: '企业介绍、发展历程、实力展示',
    fields: [
      { key: 'story', label: '品牌故事', type: 'richtext' },
      { key: 'milestones', label: '发展里程碑', type: 'timeline' },
    ],
  },
  {
    id: 'after-sales',
    name: '售后服务承诺',
    category: '技术深度',
    icon: '🛡️',
    description: '质保政策、售后支持、服务网络',
    fields: [
      { key: 'warranty', label: '质保政策', type: 'text' },
      { key: 'support', label: '服务支持', type: 'list' },
    ],
  },

  // 商业信息类
  {
    id: 'pricing',
    name: '价格体系/报价方式',
    category: '商业信息',
    icon: '💰',
    description: '价格区间、报价方式、阶梯定价',
    fields: [
      { key: 'priceRange', label: '价格区间', type: 'text' },
      { key: 'pricingModel', label: '报价方式', type: 'select' },
    ],
  },
  {
    id: 'packaging-logistics',
    name: '包装与物流信息',
    category: '商业信息',
    icon: '📦',
    description: '包装规格、物流方式、交货周期',
    fields: [
      { key: 'packaging', label: '包装规格', type: 'text' },
      { key: 'logistics', label: '物流信息', type: 'text' },
      { key: 'leadTime', label: '交货周期', type: 'text' },
    ],
  },
  {
    id: 'installation-guide',
    name: '安装/使用指南',
    category: '商业信息',
    icon: '📖',
    description: '安装步骤、使用说明、操作视频',
    fields: [
      { key: 'steps', label: '安装步骤', type: 'steps' },
      { key: 'manual', label: '使用手册', type: 'files' },
    ],
  },
  {
    id: 'faq',
    name: '常见问题FAQ',
    category: '商业信息',
    icon: '',
    description: '客户常见问题与解答',
    fields: [
      { key: 'faqs', label: '问答列表', type: 'accordion' },
    ],
  },

  // 信任背书类
  {
    id: 'customer-reviews',
    name: '客户评价/案例见证',
    category: '信任背书',
    icon: '⭐',
    description: '客户评价、使用案例、效果数据',
    fields: [
      { key: 'reviews', label: '客户评价', type: 'cards' },
      { key: 'cases', label: '案例见证', type: 'cards' },
    ],
  },
  {
    id: 'competitive-advantage',
    name: '对比优势/竞品分析',
    category: '信任背书',
    icon: '📊',
    description: '与竞品的对比分析、核心优势',
    fields: [
      { key: 'comparison', label: '对比表格', type: 'table' },
      { key: 'advantages', label: '核心优势', type: 'list' },
    ],
  },
  {
    id: 'customization',
    name: '定制服务说明',
    category: '信任背书',
    icon: '',
    description: 'OEM/ODM定制能力、定制流程',
    fields: [
      { key: 'capabilities', label: '定制能力', type: 'list' },
      { key: 'process', label: '定制流程', type: 'steps' },
    ],
  },

  // 合规安全类
  {
    id: 'safety-notes',
    name: '安全注意事项',
    category: '合规安全',
    icon: '⚠️',
    description: '产品安全使用注意事项',
    fields: [
      { key: 'warnings', label: '安全警告', type: 'list' },
      { key: 'precautions', label: '注意事项', type: 'list' },
    ],
  },
  {
    id: 'environmental',
    name: '环保/可持续性说明',
    category: '合规安全',
    icon: '🌿',
    description: '环保认证、可持续性承诺',
    fields: [
      { key: 'certifications', label: '环保认证', type: 'list' },
      { key: 'commitment', label: '可持续承诺', type: 'richtext' },
    ],
  },
  {
    id: 'compliance',
    name: '法规合规声明',
    category: '合规安全',
    icon: '📜',
    description: '行业法规合规、标准声明',
    fields: [
      { key: 'standards', label: '适用标准', type: 'list' },
      { key: 'declarations', label: '合规声明', type: 'richtext' },
    ],
  },

  // 转化引导类
  {
    id: 'industry-solutions',
    name: '行业解决方案',
    category: '转化引导',
    icon: '💡',
    description: '针对不同行业的解决方案',
    fields: [
      { key: 'solutions', label: '方案列表', type: 'cards' },
    ],
  },
  {
    id: 'tech-docs',
    name: '技术文档下载',
    category: '转化引导',
    icon: '📥',
    description: '产品手册、技术白皮书下载',
    fields: [
      { key: 'documents', label: '文档列表', type: 'files' },
    ],
  },
  {
    id: 'supply-chain',
    name: '供应链/产能说明',
    category: '转化引导',
    icon: '🏗️',
    description: '产能规模、供应链能力展示',
    fields: [
      { key: 'capacity', label: '产能数据', type: 'stats' },
      { key: 'supplyChain', label: '供应链说明', type: 'richtext' },
    ],
  },
  {
    id: 'rd-team',
    name: '研发团队/专利展示',
    category: '转化引导',
    icon: '👨‍🔬',
    description: '研发团队介绍、专利成果展示',
    fields: [
      { key: 'team', label: '团队介绍', type: 'richtext' },
      { key: 'patents', label: '专利列表', type: 'list' },
    ],
  },
  {
    id: 'success-cases',
    name: '合作客户/成功案例',
    category: '转化引导',
    icon: '',
    description: '知名客户logo、合作案例展示',
    fields: [
      { key: 'clients', label: '客户列表', type: 'logos' },
      { key: 'cases', label: '成功案例', type: 'cards' },
    ],
  },
  {
    id: 'product-updates',
    name: '产品迭代/更新日志',
    category: '转化引导',
    icon: '🔄',
    description: '产品版本更新、功能迭代记录',
    fields: [
      { key: 'changelog', label: '更新日志', type: 'timeline' },
    ],
  },
  {
    id: 'compatibility',
    name: '兼容性/适配信息',
    category: '转化引导',
    icon: '🔌',
    description: '产品兼容性、适配标准说明',
    fields: [
      { key: 'compatibility', label: '兼容列表', type: 'table' },
    ],
  },
  {
    id: 'maintenance',
    name: '维护保养指南',
    category: '转化引导',
    icon: '🔧',
    description: '日常维护、保养周期说明',
    fields: [
      { key: 'maintenance', label: '维护指南', type: 'richtext' },
      { key: 'schedule', label: '保养周期', type: 'table' },
    ],
  },

  // 特殊行业类
  {
    id: 'ingredients',
    name: '营养成分/成分说明',
    category: '特殊行业',
    icon: '🧪',
    description: '食品/化工/医药行业成分说明',
    fields: [
      { key: 'ingredients', label: '成分列表', type: 'table' },
      { key: 'nutrition', label: '营养信息', type: 'table' },
    ],
  },
  {
    id: 'target-audience',
    name: '适用人群/禁忌说明',
    category: '特殊行业',
    icon: '👥',
    description: '适用人群、使用禁忌说明',
    fields: [
      { key: 'audience', label: '适用人群', type: 'list' },
      { key: 'contraindications', label: '禁忌说明', type: 'list' },
    ],
  },

  // 转化CTA
  {
    id: 'cta-inquiry',
    name: '询盘/购买引导CTA',
    category: '转化引导',
    icon: '',
    description: '询盘表单、在线咨询、立即购买按钮',
    fields: [
      { key: 'ctaText', label: '按钮文案', type: 'text' },
      { key: 'ctaType', label: '按钮类型', type: 'select' },
      { key: 'formFields', label: '表单字段', type: 'list' },
    ],
  },
];

export const COMPONENT_CATEGORIES = [
  '基础信息',
  '技术深度',
  '商业信息',
  '信任背书',
  '合规安全',
  '转化引导',
  '特殊行业',
];

// 200+行业模板数据
export const INDUSTRY_TEMPLATES = [
  { id: 'mechanical-equipment', name: '机械设备', category: '工业制造', products: ['数控机床', '注塑机', '激光切割机', '包装机械', '工程机械'] },
  { id: 'auto-parts', name: '汽车零部件', category: '工业制造', products: ['发动机配件', '制动系统', '传动系统', '电子控制系统', '车身部件'] },
  { id: 'biomedical', name: '生物医药', category: '医疗健康', products: ['原料药', '制剂产品', '医疗器械', '诊断试剂', '生物制品'] },
  { id: 'industrial-products', name: '工业制品', category: '工业制造', products: ['密封件', '轴承', '紧固件', '弹簧', '模具'] },
  { id: 'electronics', name: '电子元器件', category: '电子电气', products: ['被动元件', '半导体', '连接器', '传感器', '电源模块'] },
  { id: 'chemical', name: '专用化学品', category: '材料化工', products: ['化学试剂', '涂料', '胶粘剂', '催化剂', '表面活性剂'] },
  { id: 'food-beverage', name: '食品饮料', category: '消费品', products: ['焙烤食品', '保健食品', '白酒', '乳制品', '休闲食品'] },
  { id: 'textile', name: '纺织服装', category: '消费品', products: ['产业用纺织品', '服装面料', '家纺产品', '功能性纤维'] },
  { id: 'construction-materials', name: '建筑材料', category: '建筑建材', products: ['玻璃及复合材料', '水泥制品', '钢材', '管材', '防水材料'] },
  { id: 'energy', name: '新能源', category: '能源环保', products: ['光伏组件', '锂电池', '风力发电设备', '储能系统'] },
  { id: 'agriculture', name: '农业机械', category: '农业', products: ['拖拉机', '收割机', '灌溉设备', '温室设备'] },
  { id: 'medical-devices', name: '医疗设备', category: '医疗健康', products: ['影像设备', '手术器械', '康复设备', '监护仪'] },
  { id: 'logistics-equipment', name: '物流设备', category: '工业制造', products: ['搬运设备', '仓储货架', '输送线', 'AGV小车'] },
  { id: 'security', name: '安防设备', category: '电子电气', products: ['监控摄像头', '门禁系统', '报警设备', '安检设备'] },
  { id: 'jewelry', name: '珠宝首饰', category: '消费品', products: ['金银首饰', '钻石饰品', '玉石制品', '时尚配饰'] },
  { id: 'chinese-medicine', name: '中药/中药饮片', category: '医疗健康', products: ['中药材', '中药饮片', '中成药', '中药配方颗粒'] },
  { id: 'rubber-plastic', name: '橡胶塑料', category: '材料化工', products: ['橡胶制品', '塑料制品', '改性材料', '复合材料'] },
  { id: 'paper-packaging', name: '纸制品包装', category: '消费品', products: ['纸箱', '纸盒', '标签', '软包装', '缓冲材料'] },
  { id: 'furniture', name: '家具家居', category: '消费品', products: ['办公家具', '酒店家具', '民用家具', '户外家具'] },
  { id: 'sports-equipment', name: '体育器材', category: '消费品', products: ['健身器材', '球类器材', '户外装备', '运动护具'] },
];

// 每个行业的默认组件配置（用于AI生成时参考）
export const INDUSTRY_DEFAULT_COMPONENTS: Record<string, string[]> = {
  'mechanical-equipment': ['product-title', 'product-specs', 'product-features', 'product-scenarios', 'product-media', 'tech-principle', 'quality-cert', 'after-sales', 'pricing', 'packaging-logistics', 'installation-guide', 'faq', 'customer-reviews', 'competitive-advantage', 'customization', 'supply-chain', 'rd-team', 'success-cases', 'maintenance', 'cta-inquiry'],
  'auto-parts': ['product-title', 'product-specs', 'product-features', 'product-media', 'tech-principle', 'quality-cert', 'brand-story', 'compatibility', 'customer-reviews', 'competitive-advantage', 'supply-chain', 'rd-team', 'success-cases', 'compliance', 'cta-inquiry'],
  'biomedical': ['product-title', 'product-specs', 'product-features', 'product-media', 'tech-principle', 'quality-cert', 'ingredients', 'target-audience', 'safety-notes', 'compliance', 'environmental', 'rd-team', 'tech-docs', 'faq', 'cta-inquiry'],
  'industrial-products': ['product-title', 'product-specs', 'product-features', 'product-scenarios', 'product-media', 'quality-cert', 'compatibility', 'customization', 'packaging-logistics', 'faq', 'customer-reviews', 'competitive-advantage', 'supply-chain', 'maintenance', 'cta-inquiry'],
};
