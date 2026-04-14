export type ChecklistStatus = 'pending' | 'completed' | 'warning' | 'skipped' | 'manual';

export type ChecklistPhase = 'foundation' | 'content' | 'seo' | 'growth';

export interface TaskIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion?: string;
}

export interface ChecklistTask {
  id: string;
  name: string;
  description: string;
  tip: string;
  checkLogic: string;
  status: ChecklistStatus;
  phase: ChecklistPhase;
  isManual?: boolean;
  canSkip?: boolean;
  dependsOn?: string[];
  issues?: TaskIssue[];
  canAutoFix?: boolean;
  autoFixSuggestion?: string;
  jumpTo?: string;
}

export interface ChecklistPhaseData {
  id: ChecklistPhase;
  name: string;
  icon: string;
  description: string;
  tasks: ChecklistTask[];
}

export const INITIAL_CHECKLIST_TASKS: ChecklistTask[] = [
  {
    id: 'https',
    name: '启用 HTTPS 安全协议',
    description: '确保网站地址栏显示小锁图标，保障用户数据安全，提升搜索排名。',
    tip: '检测域名是否支持 https:// 且证书有效未过期。',
    checkLogic: '检测域名是否支持 https:// 且证书有效未过期。',
    status: 'completed',
    phase: 'foundation',
  },
  {
    id: 'custom-domain',
    name: '配置自定义域名',
    description: '绑定您的专属域名（如 www.yourbrand.com），而非使用默认子域名。',
    tip: '检测 CNAME/A 记录是否指向平台，且当前访问 Host 为非默认域名。',
    checkLogic: '检测 CNAME/A 记录是否指向平台，且当前访问 Host 为非默认域名。',
    status: 'pending',
    phase: 'foundation',
    jumpTo: '/settings/domain',
  },
  {
    id: 'favicon',
    name: '设置网站 favicon 图标',
    description: '上传品牌 Logo 作为浏览器标签页图标，提升品牌辨识度。',
    tip: '检测 &lt;head&gt; 中是否存在有效的 &lt;link rel="icon"&gt; 且资源可访问。',
    checkLogic: '检测 &lt;head&gt; 中是否存在有效的 &lt;link rel="icon"&gt; 且资源可访问。',
    status: 'warning',
    phase: 'foundation',
    issues: [
      {
        type: 'warning',
        message: '未检测到 favicon 图标',
        suggestion: '建议上传 32x32 或 64x64 的 PNG 格式图标'
      }
    ],
    jumpTo: '/settings/appearance',
  },
  {
    id: '404-page',
    name: '配置 404 错误页面',
    description: '自定义"页面未找到"提示，引导用户返回首页，避免流失。',
    tip: '请求一个不存在的 URL (e.g., /random-404-test)，检查返回状态码是否为 404 且内容有自定义 HTML。',
    checkLogic: '请求一个不存在的 URL (e.g., /random-404-test)，检查返回状态码是否为 404 且内容有自定义 HTML。',
    status: 'pending',
    phase: 'foundation',
    jumpTo: '/settings/pages',
  },
  {
    id: 'about-page',
    name: '完善"关于我们"页面',
    description: '介绍团队背景、使命愿景，建立用户信任感。',
    tip: '检测是否存在路径包含 /about 或标题含"关于"的页面，且字数 &gt; 200 字。',
    checkLogic: '检测是否存在路径包含 /about 或标题含"关于"的页面，且字数 &gt; 200 字。',
    status: 'completed',
    phase: 'content',
  },
  {
    id: 'contact-info',
    name: '添加联系方式/页脚信息',
    description: '在页脚或联系页展示邮箱、电话或社交媒体链接。',
    tip: '检测全站页脚区域是否包含 @ (邮箱) 或 tel: (电话) 或社交图标链接。',
    checkLogic: '检测全站页脚区域是否包含 @ (邮箱) 或 tel: (电话) 或社交图标链接。',
    status: 'pending',
    phase: 'content',
    jumpTo: '/settings/footer',
  },
  {
    id: 'core-content',
    name: '发布至少 3 篇核心内容',
    description: '填充博客或新闻板块，让网站看起来活跃且专业。',
    tip: '统计已发布状态的文章/动态数量 ≥ 3。',
    checkLogic: '统计已发布状态的文章/动态数量 ≥ 3。',
    status: 'warning',
    phase: 'content',
    issues: [
      {
        type: 'warning',
        message: '当前仅发布 1 篇内容，建议至少发布 3 篇',
        suggestion: '建议每周发布 1-2 篇高质量内容，保持网站活跃度'
      }
    ],
    canAutoFix: true,
    autoFixSuggestion: '启动 AI 内容自动发布任务，每周生成 2 篇原创文章',
  },
  {
    id: 'privacy-terms',
    name: '配置隐私政策与服务条款',
    description: '合规必备，尤其是涉及用户注册或数据收集时。',
    tip: '检测是否存在路径包含 /privacy 或 /terms 的页面。',
    checkLogic: '检测是否存在路径包含 /privacy 或 /terms 的页面。',
    status: 'pending',
    phase: 'content',
    jumpTo: '/settings/legal',
  },
  {
    id: 'seo-meta',
    name: '设置首页 Title 与 Description',
    description: '撰写吸引人的标题和描述，决定用户在搜索结果中是否点击。',
    tip: '检测首页 &lt;title&gt; 长度在 10-60 字符之间，且 &lt;meta name="description"&gt; 存在且非空。',
    checkLogic: '检测首页 &lt;title&gt; 长度在 10-60 字符之间，且 &lt;meta name="description"&gt; 存在且非空。',
    status: 'warning',
    phase: 'seo',
    issues: [
      {
        type: 'warning',
        message: 'Title 长度仅 8 个字符，建议 10-60 个字符',
        suggestion: '建议包含品牌词和核心关键词'
      },
      {
        type: 'warning',
        message: '未设置 meta description',
        suggestion: '建议 120-158 个字符，包含核心关键词'
      },
      {
        type: 'info',
        message: '当前 Title："首页"',
        suggestion: '建议改为："您的品牌 - 专业解决方案提供商"'
      }
    ],
    canAutoFix: true,
    autoFixSuggestion: 'AI 自动优化：基于您的业务生成 SEO 友好的 Title 和 Description',
    jumpTo: '/settings/seo',
  },
  {
    id: 'sitemap',
    name: '生成并提交 Sitemap',
    description: '自动生成网站地图，帮助搜索引擎快速发现所有页面。',
    tip: '检测 /sitemap.xml 是否可访问且包含有效 URL 列表。',
    checkLogic: '检测 /sitemap.xml 是否可访问且包含有效 URL 列表。',
    status: 'pending',
    phase: 'seo',
    jumpTo: '/settings/seo',
  },
  {
    id: 'robots-txt',
    name: '配置 robots.txt',
    description: '告诉搜索引擎哪些页面可以抓取，哪些禁止。',
    tip: '检测 /robots.txt 是否存在且语法正确。',
    checkLogic: '检测 /robots.txt 是否存在且语法正确。',
    status: 'pending',
    phase: 'seo',
    jumpTo: '/settings/seo',
  },
  {
    id: 'image-alt',
    name: '优化图片 Alt 属性',
    description: '为关键图片添加文字描述，提升无障碍访问及图片搜索排名。',
    tip: '抽样检测首页图片，若 &lt;img&gt; 标签缺失 alt 属性则提示警告。',
    checkLogic: '抽样检测首页图片，若 &lt;img&gt; 标签缺失 alt 属性则提示警告。',
    status: 'warning',
    phase: 'seo',
    issues: [
      {
        type: 'warning',
        message: '检测到 3 张图片缺少 alt 属性',
        suggestion: '为每张图片添加描述性的 alt 文本'
      }
    ],
    canAutoFix: true,
    autoFixSuggestion: 'AI 自动为所有图片生成描述性的 alt 属性',
  },
  {
    id: 'ga4',
    name: '接入 Google Analytics (GA4)',
    description: '追踪访客来源、浏览页数及停留时间。',
    tip: '检测 &lt;head&gt; 或 &lt;body&gt; 中是否包含 gtag.js 或 googletagmanager.com 代码片段。',
    checkLogic: '检测 &lt;head&gt; 或 &lt;body&gt; 中是否包含 gtag.js 或 googletagmanager.com 代码片段。',
    status: 'pending',
    phase: 'growth',
    jumpTo: '/settings/analytics',
  },
  {
    id: 'gsc',
    name: '验证 Google Search Console',
    description: '监控网站在 Google 搜索中的表现及索引状态。',
    tip: '提供"验证令牌"输入框，用户填入 GSC 提供的 HTML 标签内容后，系统检测首页是否包含该标签。',
    checkLogic: '提供"验证令牌"输入框，用户填入 GSC 提供的 HTML 标签内容后，系统检测首页是否包含该标签。',
    status: 'pending',
    phase: 'growth',
    isManual: true,
    jumpTo: '/settings/analytics',
  },
  {
    id: 'test-form',
    name: '测试核心转化表单',
    description: '亲自测试一次"联系我们"或"注册"表单，确保邮件能收到。',
    tip: '提供"我已测试"按钮，用户点击后手动打钩。',
    checkLogic: '提供"我已测试"按钮，用户点击后手动打钩。',
    status: 'pending',
    phase: 'growth',
    isManual: true,
  },
  {
    id: 'social-card',
    name: '配置社交媒体分享卡片',
    description: '确保链接分享到微信/LinkedIn 时显示精美的预览图和标题。',
    tip: '检测 &lt;head&gt; 中是否包含 og:title, og:image, og:description (Open Graph 标签)。',
    checkLogic: '检测 &lt;head&gt; 中是否包含 og:title, og:image, og:description (Open Graph 标签)。',
    status: 'pending',
    phase: 'growth',
    issues: [
      {
        type: 'warning',
        message: '缺少 Open Graph 标签',
        suggestion: '添加 og:title, og:image, og:description 标签'
      }
    ],
    canAutoFix: true,
    autoFixSuggestion: 'AI 自动生成社交媒体分享卡片配置',
    jumpTo: '/settings/social',
  },
];

export const CHECKLIST_PHASES: ChecklistPhaseData[] = [
  {
    id: 'foundation',
    name: '基础配置',
    icon: '🏗️',
    description: '这是网站的"地基"，必须优先完成。',
    tasks: INITIAL_CHECKLIST_TASKS.filter(t => t.phase === 'foundation'),
  },
  {
    id: 'content',
    name: '内容完善',
    icon: '📝',
    description: '解决"我是谁"和"我是否可信"的问题。',
    tasks: INITIAL_CHECKLIST_TASKS.filter(t => t.phase === 'content'),
  },
  {
    id: 'seo',
    name: 'SEO 与收录',
    icon: '🔍',
    description: '让 Google 和百度更容易找到你。',
    tasks: INITIAL_CHECKLIST_TASKS.filter(t => t.phase === 'seo'),
  },
  {
    id: 'growth',
    name: '分析与转化',
    icon: '📈',
    description: '装上"眼睛"，看清用户行为。',
    tasks: INITIAL_CHECKLIST_TASKS.filter(t => t.phase === 'growth'),
  },
];
