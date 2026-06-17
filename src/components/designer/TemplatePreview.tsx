import { useState, useEffect } from 'react';
import {
  ArrowLeft, Download, Phone, MessageSquare, CheckCircle, Star, Shield, Award,
  TrendingUp, Zap, Globe, Users, Clock, ThumbsUp, ChevronRight, Mail,
  Factory, Wrench, BarChart3, BookOpen, FileText, HeadphonesIcon,
  Truck, Package, Heart, Thermometer, FlaskConical, Microscope,
  Leaf, Atom, Beaker, TestTube, AlertTriangle, CheckCircle2,
  BadgeCheck, Building2, Target, Layers, Settings, Gauge,
  Cog, CircleDot, CircleDotIcon, Flame, Droplet, Wind,
  Activity, Brain, Stethoscope, Pill, Syringe, Dna,
  Sparkles, ArrowRight, Play, Quote, Calendar, MapPin,
  ChevronDown, ChevronUp, Send, ExternalLink, Eye,
  TrendingUp as TrendUp, Percent, Timer, Layers as LayersIcon,
  Lightbulb, Handshake, ShieldCheck, ClipboardCheck,
  Rocket, Users2, Award as AwardIcon,
} from 'lucide-react';

// ==================== 行业模板数据 ====================
const INDUSTRY_TEMPLATES: Record<string, IndustryTemplate> = {
  'mechanical-equipment': {
    id: 'mechanical-equipment',
    name: '机械设备',
    color: '#1e40af',
    product: 'X500 高精度五轴数控车床',
    tagline: '智能制造 · 精密加工 · 高效生产',
    heroImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200',
    sections: {
      hero: {
        title: 'X500 高精度五轴数控车床',
        subtitle: '智能制造 · 精密加工 · 高效生产',
        description: '专为航空航天、汽车制造、精密模具等高端领域设计，实现微米级加工精度，助力企业智能制造升级。',
        ctaPrimary: '获取报价方案',
        ctaSecondary: '下载技术手册',
      },
      trustBar: {
        items: [
          { icon: 'factory', label: '20年制造经验', value: '行业深耕' },
          { icon: 'award', label: 'ISO 9001认证', value: '品质保障' },
          { icon: 'globe', label: '出口50+国家', value: '全球信赖' },
          { icon: 'users', label: '3000+客户', value: '广泛认可' },
        ],
      },
      specs: {
        title: '核心技术参数',
        subtitle: '每一项参数都经过严格测试与验证',
        data: [
          { label: '主轴转速', value: '0-8000 rpm', unit: '' },
          { label: '加工精度', value: '±0.005', unit: 'mm' },
          { label: '工作台尺寸', value: '800×500', unit: 'mm' },
          { label: '主轴功率', value: '15', unit: 'kW' },
          { label: '定位精度', value: '±0.01', unit: 'mm' },
          { label: '重复定位', value: '±0.005', unit: 'mm' },
          { label: '刀库容量', value: '24', unit: '把' },
          { label: '最大加工直径', value: '500', unit: 'mm' },
          { label: '快速移动', value: '36', unit: 'm/min' },
        ],
      },
      features: {
        title: '六大核心优势',
        subtitle: '技术领先，性能卓越',
        items: [
          { icon: 'target', title: '微米级精度', desc: '采用进口高精度滚珠丝杠和直线导轨，重复定位精度达±0.005mm，满足航空航天级加工要求。' },
          { icon: 'thermometer', title: '智能温控系统', desc: '内置热变形补偿算法，主轴温升控制在2°C以内，确保长时间连续加工的尺寸稳定性。' },
          { icon: 'zap', title: '高效换刀', desc: 'BT40刀柄搭配凸轮式换刀机构，换刀时间仅1.2秒，模块化设计使换刀效率提升40%。' },
          { icon: 'brain', title: '智能监控', desc: '集成IoT远程监控模块，实时采集设备运行数据，支持预测性维护和远程故障诊断。' },
          { icon: 'shield', title: '安全防护', desc: '全封闭加工区域+三重安全联锁，符合CE机械指令，保障操作人员安全。' },
          { icon: 'cog', title: '易维护设计', desc: '模块化结构设计，关键部件可快速更换，平均维护时间缩短60%，降低停机成本。' },
        ],
      },
      principle: {
        title: '技术原理与工艺',
        subtitle: '五轴联动，复杂曲面一次成型',
        content: 'X500采用先进的五轴联动数控系统，通过X/Y/Z三直线轴与A/C两旋转轴的协同运动，实现复杂空间曲面的高精度加工。配备海德汉TNC 640数控系统，支持3D刀具补偿和自适应进给控制，确保加工表面粗糙度Ra≤0.4μm。',
        highlights: ['五轴联动加工', '自适应进给控制', '3D刀具补偿', '在线测量系统'],
      },
      scenarios: {
        title: '典型应用场景',
        subtitle: '覆盖多个高端制造领域',
        items: [
          { title: '航空航天', desc: '发动机叶片、机匣、结构件等复杂曲面零件加工', icon: 'rocket' },
          { title: '汽车制造', desc: '发动机缸体、缸盖、变速箱壳体等关键部件加工', icon: 'car' },
          { title: '精密模具', desc: '注塑模具、冲压模具、压铸模具型腔精密加工', icon: 'layers' },
          { title: '医疗器械', desc: '人工关节、牙科种植体等医疗植入物加工', icon: 'stethoscope' },
        ],
      },
      cases: {
        title: '客户成功案例',
        subtitle: '真实数据，见证价值',
        items: [
          { company: '某航空制造企业', industry: '航空航天', result: '加工效率提升35%，废品率降低至0.2%', quote: 'X500的精度和稳定性完全满足我们对航空零部件的严苛要求，是值得信赖的合作伙伴。' },
          { company: '某汽车零部件集团', industry: '汽车制造', result: '年产能提升50%，综合成本降低20%', quote: '引入X500后，我们的缸体加工线实现了从粗加工到精加工的一体化，大幅缩短了生产周期。' },
          { company: '某精密模具厂', industry: '模具制造', result: '模具交期缩短30%，客户满意度提升', quote: '五轴联动功能让我们能够加工更复杂的模具型腔，竞争力显著提升。' },
        ],
      },
      certifications: {
        title: '质量认证与资质',
        subtitle: '国际认证，品质保障',
        items: [
          { name: 'ISO 9001:2015', desc: '质量管理体系认证' },
          { name: 'CE', desc: '欧盟机械安全认证' },
          { name: 'SGS', desc: '第三方检测认证' },
          { name: '国家高新技术企业', desc: '科技部认定' },
          { name: '专精特新企业', desc: '省级认定' },
          { name: '发明专利12项', desc: '核心技术创新' },
        ],
      },
      afterSales: {
        title: '售后服务保障',
        subtitle: '全生命周期服务支持',
        items: [
          { icon: 'headphones', title: '7×24h技术支持', desc: '专业工程师团队全天候响应' },
          { icon: 'wrench', title: '48h现场服务', desc: '全国服务网点快速到达' },
          { icon: 'book', title: '操作培训', desc: '免费上门培训及操作指导' },
          { icon: 'clock', title: '2年整机质保', desc: '核心部件3年质保' },
        ],
      },
      faq: {
        title: '常见问题',
        items: [
          { q: 'X500数控车床的加工精度能达到多少？', a: 'X500的定位精度为±0.01mm，重复定位精度为±0.005mm，可满足航空航天、汽车等高端制造领域的精密加工需求。实际加工精度还受刀具、工件材料、冷却方式等因素影响。' },
          { q: '设备交货周期是多长？', a: '标准配置设备交货周期为60-90天，定制配置根据具体需求确定。我们提供加急交付选项，最快可在45天内完成交付。' },
          { q: '是否提供安装调试服务？', a: '是的，我们提供免费的现场安装、调试和验收服务。同时提供为期5天的操作培训，确保您的团队能够熟练使用设备。' },
          { q: '设备支持哪些数控系统？', a: 'X500标配海德汉TNC 640系统，也可根据客户需求选配发那科、西门子等主流数控系统。' },
        ],
      },
      cta: {
        title: '获取专属解决方案',
        subtitle: '专业工程师为您量身定制加工方案',
        primary: '立即咨询',
        secondary: '预约参观工厂',
      },
    },
  },
  'auto-parts': {
    id: 'auto-parts',
    name: '汽车零部件',
    color: '#dc2626',
    product: 'BP-Pro 高性能陶瓷刹车片',
    tagline: '安全制动 · 可靠品质 · 原厂配套',
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200',
    sections: {
      hero: {
        title: 'BP-Pro 高性能陶瓷刹车片',
        subtitle: '安全制动 · 可靠品质 · 原厂配套',
        description: '采用先进陶瓷复合摩擦材料，为乘用车和商用车提供卓越的制动性能和超长使用寿命，已为多家主机厂提供OEM配套。',
        ctaPrimary: '索取样品测试',
        ctaSecondary: '查看适配车型',
      },
      trustBar: {
        items: [
          { icon: 'factory', label: '15年制动经验', value: '行业深耕' },
          { icon: 'award', label: 'IATF 16949', value: '品质认证' },
          { icon: 'globe', label: '配套30+主机厂', value: '原厂品质' },
          { icon: 'users', label: '500万+装车', value: '市场验证' },
        ],
      },
      specs: {
        title: '产品技术参数',
        subtitle: '严格遵循国际制动标准',
        data: [
          { label: '适用车型', value: '乘用车/商用车', unit: '' },
          { label: '制动方式', value: '盘式制动', unit: '' },
          { label: '工作温度', value: '-40~150', unit: '°C' },
          { label: '摩擦系数', value: '0.35-0.45', unit: 'μ' },
          { label: '使用寿命', value: '≥50000', unit: 'km' },
          { label: '噪音等级', value: '≤65', unit: 'dB' },
          { label: '磨损率', value: '≤0.03', unit: 'mm/万次' },
          { label: '认证标准', value: 'ECE R90', unit: '' },
        ],
      },
      features: {
        title: '核心技术特点',
        subtitle: '陶瓷复合材料，性能全面升级',
        items: [
          { icon: 'zap', title: '低噪音设计', desc: '采用NVH优化配方和倒角设计，制动噪音降低30%，提供安静舒适的驾驶体验。' },
          { icon: 'flame', title: '高温稳定性', desc: '陶瓷纤维增强配方，抗热衰退性能优异，连续制动工况下摩擦系数波动<5%。' },
          { icon: 'leaf', title: '环保无石棉', desc: '100%无石棉配方，符合欧盟REACH法规，对人体和环境友好，粉尘排放降低40%。' },
          { icon: 'timer', title: '超长寿命', desc: '耐磨配方设计，使用寿命较普通刹车片提升50%，降低更换频率和维护成本。' },
          { icon: 'shield', title: '全天候性能', desc: '优异的低温制动性能，-40°C冷态制动响应迅速，确保极端天气下的行车安全。' },
          { icon: 'droplet', title: '抗水衰退', desc: '特殊表面处理工艺，湿态制动性能恢复快，涉水后制动效能恢复时间<3秒。' },
        ],
      },
      principle: {
        title: '材料科学与工艺',
        subtitle: '陶瓷复合摩擦材料的创新应用',
        content: 'BP-Pro采用第三代陶瓷复合摩擦材料，以陶瓷纤维为增强体，配合铜粉、石墨、芳纶纤维等多种功能组分，通过高温热压成型工艺制造。该材料在高温下保持稳定的摩擦系数，同时有效降低制动噪音和粉尘排放，是当前高性能刹车片的理想选择。',
        highlights: ['陶瓷纤维增强', '高温热压成型', 'NVH优化设计', '环保无石棉配方'],
      },
      scenarios: {
        title: '配套应用场景',
        subtitle: '覆盖全车型制动需求',
        items: [
          { title: '主机厂OEM', desc: '为乘用车和商用车主机厂提供原厂配套刹车片', icon: 'factory' },
          { title: '售后维修', desc: '覆盖主流车型的售后替换市场', icon: 'wrench' },
          { title: '商用车队', desc: '为重卡、客车等商用车队提供长寿命方案', icon: 'truck' },
          { title: '新能源适配', desc: '针对电动车再生制动特性优化的专用配方', icon: 'zap' },
        ],
      },
      cases: {
        title: '合作案例',
        subtitle: '与行业领先企业深度合作',
        items: [
          { company: '某知名乘用车主机厂', industry: 'OEM配套', result: '连续5年供应商，年配套量200万套', quote: 'BP-Pro的制动性能和一致性完全满足我们的OEM标准，是值得信赖的长期合作伙伴。' },
          { company: '某大型物流集团', industry: '商用车队', result: '刹车片使用寿命提升60%，维护成本降低35%', quote: '更换BP-Pro后，我们车队的制动系统维护频率大幅降低，运营效率显著提升。' },
          { company: '某连锁汽修品牌', industry: '售后市场', result: '客户投诉率降低80%，复购率提升45%', quote: 'BP-Pro的低噪音和长寿命特点深受车主好评，是我们门店的推荐首选。' },
        ],
      },
      certifications: {
        title: '资质认证',
        subtitle: '全球主流市场准入认证',
        items: [
          { name: 'IATF 16949', desc: '汽车行业质量管理体系' },
          { name: 'ECE R90', desc: '欧洲制动系统认证' },
          { name: 'DOT', desc: '美国交通部认证' },
          { name: 'CCC', desc: '中国强制认证' },
          { name: 'REACH', desc: '欧盟化学品法规' },
          { name: 'ISO 14001', desc: '环境管理体系' },
        ],
      },
      afterSales: {
        title: '服务与支持',
        subtitle: '全方位的技术与商务支持',
        items: [
          { icon: 'headphones', title: '技术选型支持', desc: '专业团队协助匹配车型和工况' },
          { icon: 'truck', title: '快速物流配送', desc: '全国仓储网络，48小时送达' },
          { icon: 'book', title: '安装指导', desc: '提供详细安装手册和视频指导' },
          { icon: 'shield', title: '质量保证', desc: '3年或10万公里质量保证' },
        ],
      },
      faq: {
        title: '常见问题',
        items: [
          { q: 'BP-Pro刹车片适配哪些车型？', a: 'BP-Pro系列覆盖市面上95%以上的乘用车和商用车车型，包括德系、日系、美系、韩系及国产主流品牌。我们提供在线车型查询工具，输入车牌号即可快速匹配。' },
          { q: '陶瓷刹车片和普通刹车片有什么区别？', a: '陶瓷刹车片采用陶瓷纤维复合材料，相比普通半金属刹车片，具有噪音更低、粉尘更少、寿命更长、高温性能更稳定等优势，但价格略高。综合使用成本反而更低。' },
          { q: '最小起订量是多少？', a: '售后市场最小起订量为100套（同型号），OEM配套根据项目需求协商。我们提供样品测试服务，可先小批量试用验证性能。' },
          { q: '是否提供OEM/ODM定制服务？', a: '是的，我们提供完整的OEM/ODM服务，包括配方定制、包装定制、品牌定制等，可根据客户的具体需求提供个性化解决方案。' },
        ],
      },
      cta: {
        title: '申请样品测试',
        subtitle: '免费获取样品，亲自验证制动性能',
        primary: '索取样品',
        secondary: '在线咨询',
      },
    },
  },
  'biomedical': {
    id: 'biomedical',
    name: '生物医药',
    color: '#059669',
    product: 'VaxGuard™ 重组蛋白疫苗原料',
    tagline: '生物制药 · 高纯度 · 合规生产',
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200',
    sections: {
      hero: {
        title: 'VaxGuard™ 重组蛋白疫苗原料',
        subtitle: '生物制药 · 高纯度 · 合规生产',
        description: '基于CHO细胞表达系统的高纯度重组蛋白原料，纯度≥98%，内毒素<0.1 EU/mg，完整DMF文件支持全球注册申报，助力疫苗研发与生产。',
        ctaPrimary: '联系技术专家',
        ctaSecondary: '下载COA样本',
      },
      trustBar: {
        items: [
          { icon: 'factory', label: 'GMP认证工厂', value: '合规生产' },
          { icon: 'award', label: 'FDA DMF备案', value: '全球认可' },
          { icon: 'globe', label: '服务40+国家', value: '国际供应' },
          { icon: 'users', label: '100+药企客户', value: '行业信赖' },
        ],
      },
      specs: {
        title: '产品质量标准',
        subtitle: '严格遵循ICH和各国药典要求',
        data: [
          { label: '纯度', value: '≥98', unit: '% (HPLC)' },
          { label: '内毒素', value: '<0.1', unit: 'EU/mg' },
          { label: '宿主蛋白', value: '<100', unit: 'ppm' },
          { label: '宿主DNA', value: '<10', unit: 'ng/mg' },
          { label: '储存条件', value: '-20', unit: '°C' },
          { label: '有效期', value: '24', unit: '个月' },
          { label: '表达量', value: '≥5', unit: 'g/L' },
          { label: '比活性', value: '≥2×10⁶', unit: 'IU/mg' },
        ],
      },
      features: {
        title: '核心优势',
        subtitle: '从研发到生产的全链条保障',
        items: [
          { icon: 'microscope', title: '高表达量', desc: '自主优化的CHO细胞株，表达量≥5g/L，显著降低单位生产成本，提升规模化生产效率。' },
          { icon: 'shield', title: '严格质控', desc: '建立200+项质量控制指标，每批产品均经过放行检测，确保批次间一致性RSD<3%。' },
          { icon: 'file', title: '完整DMF', desc: '已在美国FDA完成DMF备案，提供完整的CTD格式注册文件，支持客户快速完成申报。' },
          { icon: 'rocket', title: '规模供应', desc: '万升级生物反应器生产能力，年产能满足千万剂疫苗生产需求，保障稳定供应。' },
          { icon: 'brain', title: '技术支持', desc: '专业RA团队提供注册申报全程支持，包括工艺验证、稳定性研究、变更控制等。' },
          { icon: 'leaf', title: '合规体系', desc: '通过FDA、EMA、NMPA等多国GMP检查，质量管理体系符合ICH Q7/Q8/Q9/Q10要求。' },
        ],
      },
      principle: {
        title: '技术平台与工艺',
        subtitle: '先进的重组蛋白表达技术',
        content: 'VaxGuard™采用自主开发的CHO-K1细胞表达平台，通过基因工程手段将目标抗原基因整合至宿主基因组，经高通量筛选获得高表达稳定细胞株。上游采用灌流培养工艺，下游经多步层析纯化和病毒灭活/去除工艺，确保产品的高纯度和安全性。',
        highlights: ['CHO细胞表达平台', '灌流培养工艺', '多步层析纯化', '病毒安全工艺'],
      },
      scenarios: {
        title: '应用领域',
        subtitle: '覆盖疫苗全产业链',
        items: [
          { title: '疫苗生产', desc: '作为重组蛋白疫苗的核心抗原原料', icon: 'syringe' },
          { title: '诊断试剂', desc: '用于ELISA、化学发光等免疫诊断试剂开发', icon: 'test-tube' },
          { title: '药物研发', desc: '支持临床前研究和IND申报', icon: 'flask' },
          { title: '细胞治疗', desc: 'CAR-T等细胞治疗产品的质量控制', icon: 'dna' },
        ],
      },
      cases: {
        title: '合作案例',
        subtitle: '助力全球疫苗研发与生产',
        items: [
          { company: '某国际疫苗企业', industry: '疫苗生产', result: '支持3款疫苗获批上市，年供应原料500kg+', quote: 'VaxGuard™的质量和供应稳定性是我们项目成功的关键因素，技术团队的专业支持也令人印象深刻。' },
          { company: '某CRO研究机构', industry: '药物研发', result: '缩短IND申报周期6个月', quote: '完整的DMF文件和注册支持大大加速了我们的申报进程，是值得信赖的合作伙伴。' },
          { company: '某诊断试剂企业', industry: '诊断试剂', result: '产品灵敏度提升30%，批间差<5%', quote: '高纯度和低背景信号使我们的诊断试剂性能显著提升，客户反馈非常好。' },
        ],
      },
      certifications: {
        title: '合规认证',
        subtitle: '全球主要市场监管认可',
        items: [
          { name: 'GMP', desc: '药品生产质量管理规范' },
          { name: 'FDA DMF', desc: '药物主文件备案' },
          { name: 'EDQM CEP', desc: '欧洲药典适用性证书' },
          { name: 'ISO 13485', desc: '医疗器械质量管理' },
          { name: 'ISO 9001', desc: '质量管理体系' },
          { name: 'NMPA', desc: '中国药监局认证' },
        ],
      },
      afterSales: {
        title: '技术支持与服务',
        subtitle: '全生命周期的专业服务',
        items: [
          { icon: 'headphones', title: '专属技术顾问', desc: '一对一技术支持，快速响应技术需求' },
          { icon: 'file', title: '注册申报支持', desc: '提供完整的CTD文件和申报指导' },
          { icon: 'truck', title: '冷链物流', desc: '全程-20°C冷链运输，确保产品质量' },
          { icon: 'clock', title: '长期供应保障', desc: '战略库存管理，确保不间断供应' },
        ],
      },
      faq: {
        title: '常见问题',
        items: [
          { q: 'VaxGuard™的纯度如何保证？', a: '我们采用多步层析纯化工艺（离子交换+疏水+凝胶过滤），结合超滤浓缩，最终纯度≥98%（HPLC法）。每批产品均经过严格的质量检测，包括纯度、内毒素、宿主蛋白残留等200+项指标。' },
          { q: '是否提供定制表达服务？', a: '是的，我们提供从基因合成、细胞株构建、工艺开发到规模化生产的一站式定制服务。可根据客户需求优化表达条件，提供定制化的产品质量标准。' },
          { q: '最小订购量和交货周期？', a: '标准品最小订购量为100mg，定制产品根据项目规模协商。标准品现货3-5个工作日发货，定制产品工艺开发周期约3-6个月。' },
          { q: '产品如何储存和运输？', a: '产品需在-20°C条件下储存和运输，我们提供干冰包装的冷链物流方案，确保运输过程中温度波动不超过±5°C。收到后请立即转移至-20°C冰箱保存。' },
        ],
      },
      cta: {
        title: '联系技术专家',
        subtitle: '获取产品资料、COA样本及技术支持',
        primary: '联系专家',
        secondary: '下载产品手册',
      },
    },
  },
  'industrial-products': {
    id: 'industrial-products',
    name: '工业制品',
    color: '#7c3aed',
    product: 'CatMax™ 高效工业催化剂',
    tagline: '高效催化 · 精准定制 · 绿色工艺',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200',
    sections: {
      hero: {
        title: 'CatMax™ 高效工业催化剂',
        subtitle: '高效催化 · 精准定制 · 绿色工艺',
        description: '基于纳米复合催化技术，为石油化工、精细化工、环保治理等领域提供高效、稳定、可定制的催化剂解决方案，助力企业实现绿色高效生产。',
        ctaPrimary: '获取技术方案',
        ctaSecondary: '预约技术交流',
      },
      trustBar: {
        items: [
          { icon: 'factory', label: '18年催化经验', value: '技术积淀' },
          { icon: 'award', label: 'ISO 9001认证', value: '品质保障' },
          { icon: 'globe', label: '服务200+企业', value: '行业认可' },
          { icon: 'users', label: '50+专利', value: '技术创新' },
        ],
      },
      specs: {
        title: '产品技术参数',
        subtitle: '精确控制，性能稳定',
        data: [
          { label: '催化活性', value: '≥95', unit: '%' },
          { label: '选择性', value: '≥98', unit: '%' },
          { label: '比表面积', value: '200-500', unit: 'm²/g' },
          { label: '孔容', value: '0.5-1.2', unit: 'mL/g' },
          { label: '工作温度', value: '200-600', unit: '°C' },
          { label: '工作压力', value: '≤25', unit: 'MPa' },
          { label: '使用寿命', value: '≥3', unit: '年' },
          { label: '再生次数', value: '≥5', unit: '次' },
        ],
      },
      features: {
        title: '核心技术优势',
        subtitle: '纳米复合催化技术，性能全面领先',
        items: [
          { icon: 'atom', title: '高催化活性', desc: '纳米级活性组分均匀分散，比表面积高达500m²/g，催化效率较传统催化剂提升30-50%。' },
          { icon: 'target', title: '高选择性', desc: '精准的孔道结构和酸性位点设计，目标产物选择性≥98%，有效减少副产物生成。' },
          { icon: 'timer', title: '长寿命设计', desc: '抗中毒、抗烧结配方设计，使用寿命≥3年，支持5次以上再生，综合使用成本低。' },
          { icon: 'leaf', title: '绿色环保', desc: '无重金属污染，可回收再生，符合绿色化工要求，助力企业实现碳中和目标。' },
          { icon: 'cog', title: '定制开发', desc: '根据客户工艺条件定制催化剂配方和成型方式，7天交付样品，快速验证性能。' },
          { icon: 'shield', title: '稳定供应', desc: '自动化生产线，年产能10000吨，严格的质量控制体系确保批次间一致性。' },
        ],
      },
      principle: {
        title: '催化技术与工艺',
        subtitle: '纳米复合催化技术的创新应用',
        content: 'CatMax™采用自主开发的纳米复合催化技术，将活性金属纳米颗粒均匀负载于介孔分子筛载体上，通过精确控制孔径分布和酸性位点，实现催化活性和选择性的最佳平衡。独特的成型工艺确保催化剂具有优异的机械强度和传质性能，适用于固定床、流化床等多种反应器类型。',
        highlights: ['纳米活性组分', '介孔分子筛载体', '精准孔道设计', '高强度成型工艺'],
      },
      scenarios: {
        title: '行业应用',
        subtitle: '覆盖多个工业催化领域',
        items: [
          { title: '石油化工', desc: '催化裂化、加氢精制、重整等炼油工艺', icon: 'flame' },
          { title: '精细化工', desc: '有机合成、选择性加氢、氧化反应', icon: 'flask' },
          { title: '环保治理', desc: 'VOCs催化燃烧、脱硝脱硫、废水处理', icon: 'leaf' },
          { title: '新能源', desc: '氢能制备、燃料电池、生物质转化', icon: 'zap' },
        ],
      },
      cases: {
        title: '应用案例',
        subtitle: '真实数据，见证催化效果',
        items: [
          { company: '某大型石化企业', industry: '石油化工', result: '转化率提升15%，能耗降低20%', quote: 'CatMax™催化剂的活性和稳定性远超我们的预期，显著提升了装置的经济效益。' },
          { company: '某精细化工企业', industry: '精细化工', result: '产品纯度从95%提升至99.5%', quote: '高选择性催化剂帮助我们解决了长期困扰的副产物问题，产品质量达到国际领先水平。' },
          { company: '某环保工程公司', industry: '环保治理', result: 'VOCs去除率≥99%，运行成本降低30%', quote: 'CatMax™催化剂的高效性和长寿命使我们的环保装置运行更加稳定经济。' },
        ],
      },
      certifications: {
        title: '质量保障',
        subtitle: '严格的质量管理体系',
        items: [
          { name: 'ISO 9001', desc: '质量管理体系认证' },
          { name: 'ISO 14001', desc: '环境管理体系认证' },
          { name: 'RoHS', desc: '有害物质限制认证' },
          { name: 'REACH', desc: '欧盟化学品法规' },
          { name: '发明专利50+', desc: '核心技术创新' },
          { name: '高新技术企业', desc: '国家认定' },
        ],
      },
      afterSales: {
        title: '服务与支持',
        subtitle: '全方位的技术与商务支持',
        items: [
          { icon: 'headphones', title: '技术咨询', desc: '专业催化工程师提供工艺优化建议' },
          { icon: 'flask', title: '样品测试', desc: '免费提供样品进行小试和中试验证' },
          { icon: 'truck', title: '快速交付', desc: '标准品现货供应，定制品7天交付样品' },
          { icon: 'shield', title: '质量保证', desc: '产品性能保证，不满意可退换' },
        ],
      },
      faq: {
        title: '常见问题',
        items: [
          { q: '催化剂的使用寿命是多久？', a: '在正常工况下，CatMax™催化剂的使用寿命≥3年。实际寿命取决于具体应用条件，包括反应温度、压力、原料纯度等。我们提供催化剂寿命评估和再生服务，可延长使用寿命至5年以上。' },
          { q: '是否提供定制催化剂开发服务？', a: '是的，我们拥有专业的催化研发团队，可根据客户的具体工艺条件和产品需求，定制开发专用催化剂。从配方设计、样品制备到性能测试，通常3-6个月可完成开发。' },
          { q: '催化剂如何储存和运输？', a: '催化剂需在干燥、通风的环境中储存，避免受潮和污染。我们提供密封包装，确保运输过程中的产品质量。收到后请储存在干燥处，开封后尽快使用。' },
          { q: '最小订购量是多少？', a: '标准品最小订购量为100kg，定制产品根据项目需求协商。我们提供从小试（1kg级）到工业化生产（吨级）的全系列供应能力。' },
        ],
      },
      cta: {
        title: '获取技术方案',
        subtitle: '专业催化工程师为您量身定制解决方案',
        primary: '立即咨询',
        secondary: '预约技术交流',
      },
    },
  },
};

// ==================== 类型定义 ====================
interface IndustryTemplate {
  id: string;
  name: string;
  color: string;
  product: string;
  tagline: string;
  heroImage: string;
  sections: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    trustBar: {
      items: Array<{ icon: string; label: string; value: string }>;
    };
    specs: {
      title: string;
      subtitle: string;
      data: Array<{ label: string; value: string; unit: string }>;
    };
    features: {
      title: string;
      subtitle: string;
      items: Array<{ icon: string; title: string; desc: string }>;
    };
    principle: {
      title: string;
      subtitle: string;
      content: string;
      highlights: string[];
    };
    scenarios: {
      title: string;
      subtitle: string;
      items: Array<{ title: string; desc: string; icon: string }>;
    };
    cases: {
      title: string;
      subtitle: string;
      items: Array<{ company: string; industry: string; result: string; quote: string }>;
    };
    certifications: {
      title: string;
      subtitle: string;
      items: Array<{ name: string; desc: string }>;
    };
    afterSales: {
      title: string;
      subtitle: string;
      items: Array<{ icon: string; title: string; desc: string }>;
    };
    faq: {
      title: string;
      items: Array<{ q: string; a: string }>;
    };
    cta: {
      title: string;
      subtitle: string;
      primary: string;
      secondary: string;
    };
  };
}

// ==================== 图标映射 ====================
function getIcon(name: string, className: string = 'w-5 h-5') {
  const icons: Record<string, React.ReactNode> = {
    factory: <Factory className={className} />,
    award: <Award className={className} />,
    globe: <Globe className={className} />,
    users: <Users className={className} />,
    target: <Target className={className} />,
    thermometer: <Thermometer className={className} />,
    zap: <Zap className={className} />,
    brain: <Brain className={className} />,
    shield: <Shield className={className} />,
    cog: <Cog className={className} />,
    rocket: <Rocket className={className} />,
    layers: <Layers className={className} />,
    stethoscope: <Stethoscope className={className} />,
    flame: <Flame className={className} />,
    leaf: <Leaf className={className} />,
    timer: <Timer className={className} />,
    droplet: <Droplet className={className} />,
    truck: <Truck className={className} />,
    wrench: <Wrench className={className} />,
    headphones: <HeadphonesIcon className={className} />,
    book: <BookOpen className={className} />,
    clock: <Clock className={className} />,
    microscope: <Microscope className={className} />,
    file: <FileText className={className} />,
    syringe: <Syringe className={className} />,
    'test-tube': <TestTube className={className} />,
    flask: <FlaskConical className={className} />,
    dna: <Dna className={className} />,
    atom: <Atom className={className} />,
    car: <CircleDot className={className} />,
  };
  return icons[name] || <CheckCircle className={className} />;
}

// ==================== 组件 ====================
function TrustBar({ items, color }: { items: Array<{ icon: string; label: string; value: string }>; color: string }) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '12' }}>
                <span style={{ color }}>{getIcon(item.icon, 'w-5 h-5')}</span>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecsSection({ title, subtitle, data, color }: { title: string; subtitle: string; data: Array<{ label: string; value: string; unit: string }>; color: string }) {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow group">
            <div className="text-sm text-gray-500 mb-2">{item.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold" style={{ color: color }}>{item.value}</span>
              {item.unit && <span className="text-sm text-gray-400">{item.unit}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection({ title, subtitle, items, color }: { title: string; subtitle: string; items: Array<{ icon: string; title: string; desc: string }>; color: string }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: color + '12' }}>
              <span style={{ color }}>{getIcon(item.icon, 'w-6 h-6')}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PrincipleSection({ title, subtitle, content, highlights, color }: { title: string; subtitle: string; content: string; highlights: string[]; color: string }) {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-6">{content}</p>
          <div className="flex flex-wrap gap-3">
            {highlights.map((item, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: color + '12', color }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScenariosSection({ title, subtitle, items, color }: { title: string; subtitle: string; items: Array<{ title: string; desc: string; icon: string }>; color: string }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow text-center">
            <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: color + '12' }}>
              <span style={{ color }}>{getIcon(item.icon, 'w-7 h-7')}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CasesSection({ title, subtitle, items, color }: { title: string; subtitle: string; items: Array<{ company: string; industry: string; result: string; quote: string }>; color: string }) {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Quote className="w-5 h-5" style={{ color: color + '80' }} />
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: color + '12', color }}>{item.industry}</span>
            </div>
            <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">"{item.quote}"</p>
            <div className="border-t border-gray-100 pt-4">
              <div className="font-bold text-gray-900 text-sm">{item.company}</div>
              <div className="text-xs text-green-600 font-medium mt-1">{item.result}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection({ title, subtitle, items, color }: { title: string; subtitle: string; items: Array<{ name: string; desc: string }>; color: string }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: color + '12' }}>
              <BadgeCheck className="w-6 h-6" style={{ color }} />
            </div>
            <div className="font-bold text-gray-900 text-sm mb-1">{item.name}</div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AfterSalesSection({ title, subtitle, items, color }: { title: string; subtitle: string; items: Array<{ icon: string; title: string; desc: string }>; color: string }) {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: color + '12' }}>
              <span style={{ color }}>{getIcon(item.icon, 'w-6 h-6')}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ title, items, color }: { title: string; items: Array<{ q: string; a: string }>; color: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 text-sm pr-4">{item.q}</span>
              {openIndex === i ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color }} /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-gray-400" />}
            </button>
            {openIndex === i && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ title, subtitle, primary, secondary, color }: { title: string; subtitle: string; primary: string; secondary: string; color: string }) {
  return (
    <section className="py-20">
      <div className="rounded-2xl p-12 text-center text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="relative">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-white/80 mb-8">{subtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-8 py-3 bg-white rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm flex items-center gap-2" style={{ color }}>
              {primary}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3 border-2 border-white rounded-lg font-medium hover:bg-white/10 transition-colors text-sm">
              {secondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== 主组件 ====================
function getIndustryIdFromHash(): string {
  const hash = window.location.hash.slice(1);
  const match = hash.match(/^\/template-preview\/(.+)$/);
  return match ? match[1] : '';
}

export default function TemplatePreview() {
  const [industryId, setIndustryId] = useState(getIndustryIdFromHash());

  useEffect(() => {
    const handleHashChange = () => setIndustryId(getIndustryIdFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const template = INDUSTRY_TEMPLATES[industryId];

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">模板不存在</p>
          <button onClick={() => window.location.hash = '#/designer'} className="text-blue-600 hover:underline">
            返回设计器
          </button>
        </div>
      </div>
    );
  }

  const goBack = () => {
    window.location.hash = '#/designer/workspace';
  };

  const { sections: s, color } = template;

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={goBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">返回设计器</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">{template.name}行业模板</span>
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 px-4 py-2 text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: color }}
            >
              <Download className="w-4 h-4" />
              使用此模板
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-14">
        <div className="relative h-[500px] overflow-hidden">
          <img src={template.heroImage} alt={s.hero.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">{template.name}</span>
                  <span className="text-xs text-white/70">产品详情页模板</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{s.hero.title}</h1>
                <p className="text-lg text-white/80 mb-2">{s.hero.subtitle}</p>
                <p className="text-sm text-white/60 mb-8 leading-relaxed">{s.hero.description}</p>
                <div className="flex gap-3 flex-wrap">
                  <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm flex items-center gap-2">
                    {s.hero.ctaPrimary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-sm">
                    {s.hero.ctaSecondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 信任条 */}
      <TrustBar items={s.trustBar.items} color={color} />

      {/* 内容区域 */}
      <div className="max-w-7xl mx-auto px-6">
        {/* 技术规格 */}
        <SpecsSection title={s.specs.title} subtitle={s.specs.subtitle} data={s.specs.data} color={color} />

        {/* 核心优势 */}
        <FeaturesSection title={s.features.title} subtitle={s.features.subtitle} items={s.features.items} color={color} />

        {/* 技术原理 */}
        <PrincipleSection title={s.principle.title} subtitle={s.principle.subtitle} content={s.principle.content} highlights={s.principle.highlights} color={color} />

        {/* 应用场景 */}
        <ScenariosSection title={s.scenarios.title} subtitle={s.scenarios.subtitle} items={s.scenarios.items} color={color} />

        {/* 客户案例 */}
        <CasesSection title={s.cases.title} subtitle={s.cases.subtitle} items={s.cases.items} color={color} />

        {/* 质量认证 */}
        <CertificationsSection title={s.certifications.title} subtitle={s.certifications.subtitle} items={s.certifications.items} color={color} />

        {/* 售后服务 */}
        <AfterSalesSection title={s.afterSales.title} subtitle={s.afterSales.subtitle} items={s.afterSales.items} color={color} />

        {/* FAQ */}
        <FAQSection title={s.faq.title} items={s.faq.items} color={color} />

        {/* CTA */}
        <CTASection title={s.cta.title} subtitle={s.cta.subtitle} primary={s.cta.primary} secondary={s.cta.secondary} color={color} />
      </div>

      {/* 底部联系栏 */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xl font-bold mb-2">需要更多产品信息？</div>
              <div className="text-gray-400 text-sm">我们的专家团队随时为您提供专业支持</div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm">
                <Phone className="w-4 h-4" />
                电话联系
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors" style={{ backgroundColor: color }}>
                <MessageSquare className="w-4 h-4" />
                在线咨询
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                发送邮件
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>© 2024 {template.name}产品详情页模板 · 仅供参考</div>
            <div className="flex gap-4">
              <span>隐私政策</span>
              <span>使用条款</span>
              <span>网站地图</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
