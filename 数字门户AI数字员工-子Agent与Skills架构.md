#  数字门户 AI 数字员工 — 子Agent与Skills架构设计

## 架构层级说明

```
数字员工（Digital Employee）  →  对应一个真实岗位
  └── 子Agent（Sub-Agent）    →  对应岗位的一项核心职责
        └── Skill（技能）      →  对应一个可执行的原子操作
```

**设计原则：**

- 子Agent = 职责域，是一个相对独立的工作模块
- Skill = 原子能力，是一个可被调用的具体操作（对应一个API/工具调用）
- 子Agent之间可协同，Skill之间可组合

---

## 1. Mia · 推广专员

### 子Agent架构

```
Mia · 推广专员
├── SEO Agent（搜索引擎优化）
│     ├── keyword_research        关键词研究
│     ├── page_seo_audit          页面SEO诊断
│     ├── tdk_optimization        TDK优化生成
│     ├── internal_link_suggest   内链建议
│     ├── rank_tracking           排名监控
│     └── seo_weekly_report       SEO周报生成
│
├── Ads Agent（广告投放）
│     ├── campaign_create         广告计划创建
│     ├── bid_optimization        出价优化
│     ├── keyword_management      广告关键词管理
│     ├── budget_allocation       预算分配
│     ├── ad_copy_generation      广告文案生成
│     └── ads_performance_report  广告效果报告
│
├── Outreach Agent（主动拓客）
│     ├── prospect_search         潜在客户搜索
│     ├── profile_analysis        客户画像分析
│     ├── outreach_message_gen    开发信生成
│     ├── email_send_track        邮件发送与追踪
│     ├── linkedin_connect        LinkedIn连接管理
│     └── follow_up_scheduler     跟进计划排期
│
└── Intel Agent（市场情报）
      ├── competitor_monitor      竞品动态监控
      ├── market_trend_scan       市场趋势扫描
      ├── compliance_check        合规风险检查
      └── opportunity_alert       机会预警推送
```

### Skills详细说明

#### SEO Agent

| Skill                   | 输入           | 输出                             | 调用外部服务                               |
| ----------------------- | ------------ | ------------------------------ | ------------------------------------ |
| `keyword_research`      | 目标市场、行业、种子词  | 关键词列表+搜索量+难度+意图分类              | Google Keyword Plan API / Ahrefs API |
| `page_seo_audit`        | 官网页面URL      | SEO问题清单+优先级+修复建议               | 爬虫+Lighthouse API                    |
| `tdk_optimization`      | 页面内容+目标关键词   | 优化后的Title/Description/Keywords | LLM生成                                |
| `internal_link_suggest` | 官网全站页面数据     | 内链建议图+锚文本建议                    | 站内数据分析                               |
| `rank_tracking`         | 目标关键词列表      | 各关键词排名+变化趋势                    | SEO追踪API                             |
| `seo_weekly_report`     | 本周排名/流量/索引数据 | SEO周报Markdown/PDF              | 数据聚合+LLM生成                           |

#### Ads Agent

| Skill                    | 输入            | 输出             | 调用外部服务               |
| ------------------------ | ------------- | -------------- | -------------------- |
| `campaign_create`        | 推广目标、预算、目标市场  | 广告计划配置+广告组+关键词 | Google Ads API       |
| `bid_optimization`       | 广告数据+转化数据     | 出价调整建议/自动执行    | Google Ads API       |
| `keyword_management`     | 广告组+搜索词报告     | 否定词/新增词建议      | Google Ads API       |
| `budget_allocation`      | 各广告组ROI数据     | 预算分配调整方案       | 内部数据分析               |
| `ad_copy_generation`     | 产品信息+目标受众+关键词 | 广告标题+描述文案      | LLM生成                |
| `ads_performance_report` | 广告账户数据        | 效果报告+优化建议      | Google Ads API + LLM |

#### Outreach Agent

| Skill                  | 输入              | 输出            | 调用外部服务                    |
| ---------------------- | --------------- | ------------- | ------------------------- |
| `prospect_search`      | 目标行业+地区+职位      | 潜在客户列表+联系方式   | LinkedIn API / Apollo API |
| `profile_analysis`     | 客户LinkedIn/公司信息 | 客户画像+兴趣点+沟通建议 | LLM分析                     |
| `outreach_message_gen` | 客户画像+产品信息       | 个性化开发信/连接请求   | LLM生成                     |
| `email_send_track`     | 邮件内容+收件人        | 发送状态+打开/点击追踪  | SMTP + 邮件追踪API            |
| `linkedin_connect`     | 目标客户列表          | 连接请求发送+状态追踪   | LinkedIn API              |
| `follow_up_scheduler`  | 客户互动记录          | 跟进时间表+跟进内容建议  | 内部调度                      |

#### Intel Agent

| Skill                | 输入        | 输出                | 调用外部服务                  |
| -------------------- | --------- | ----------------- | ----------------------- |
| `competitor_monitor` | 竞品官网列表    | 竞品动态报告（内容更新/广告变化） | 爬虫 + SimilarWeb API     |
| `market_trend_scan`  | 目标行业+地区   | 行业趋势报告+机会点        | Google Trends API + LLM |
| `compliance_check`   | 目标市场+产品类别 | 合规风险清单+应对建议       | 合规知识库 + LLM             |
| `opportunity_alert`  | 市场数据+官网数据 | 机会预警通知            | 数据分析 + LLM              |

---

## 2. Coco · 内容运营

### 子Agent架构

```
Coco · 内容运营
├── Product Content Agent（产品内容）
│     ├── product_desc_gen        产品描述生成
│     ├── spec_sheet_gen          规格参数表生成
│     ├── comparison_table_gen    产品对比表生成
│     ├── selection_guide_gen     选型指南生成
│     └── faq_gen                 产品FAQ生成
│
├── Blog Agent（博客与SEO内容）
│     ├── topic_ideation          选题策划
│     ├── blog_article_gen        博客文章生成
│     ├── seo_content_optimize    SEO内容优化
│     ├── content_calendar_plan   内容日历规划
│     └── content_publish         内容发布到官网
│
├── Localization Agent（多语言本地化）
│     ├── translate_content       多语言翻译
│     ├── cultural_adapt          文化适配审查
│     ├── locale_seo_adjust       本地SEO调整
│     └── multilingual_review     多语言质量审核
│
└── Media Agent（多媒体内容）
      ├── image_process           图片处理（水印/尺寸/ALT）
      ├── video_script_gen        视频脚本生成
      ├── social_media_asset      社交媒体素材生成
      └── product_showcase_config 产品展示配置（3D/选型器）
```

### Skills详细说明

#### Product Content Agent

| Skill                  | 输入           | 输出          | 调用外部服务    |
| ---------------------- | ------------ | ----------- | --------- |
| `product_desc_gen`     | 产品手册/参数+目标语言 | 产品描述文案（多语言） | RAG + LLM |
| `spec_sheet_gen`       | 产品技术参数       | 规格参数表（结构化）  | 模板渲染      |
| `comparison_table_gen` | 多个产品参数       | 产品对比表       | LLM + 模板  |
| `selection_guide_gen`  | 产品线+应用场景     | 选型指南文档      | RAG + LLM |
| `faq_gen`              | 产品信息+历史咨询    | FAQ列表       | RAG + LLM |

#### Blog Agent

| Skill                   | 输入          | 输出           | 调用外部服务         |
| ----------------------- | ----------- | ------------ | -------------- |
| `topic_ideation`        | 行业+关键词+趋势   | 选题列表+优先级     | Mia关键词数据 + LLM |
| `blog_article_gen`      | 选题+关键词+产品信息 | 博客文章（含SEO元素） | RAG + LLM      |
| `seo_content_optimize`  | 现有内容+目标关键词  | 优化后内容+修改说明   | LLM            |
| `content_calendar_plan` | 内容策略+季节性事件  | 内容发布日历       | LLM + 日历API    |
| `content_publish`       | 内容+目标页面     | 发布到官网CMS     | CMS API        |

#### Localization Agent

| Skill                 | 输入       | 输出            | 调用外部服务         |
| --------------------- | -------- | ------------- | -------------- |
| `translate_content`   | 源内容+目标语言 | 翻译后内容         | LLM + 翻译API    |
| `cultural_adapt`      | 内容+目标文化  | 文化适配建议+修改后内容  | LLM + 文化知识库    |
| `locale_seo_adjust`   | 内容+目标市场  | 本地化SEO关键词+元数据 | Mia关键词数据 + LLM |
| `multilingual_review` | 多语言内容    | 质量评分+修改建议     | LLM            |

#### Media Agent

| Skill                     | 输入        | 输出               | 调用外部服务      |
| ------------------------- | --------- | ---------------- | ----------- |
| `image_process`           | 原始图片+处理要求 | 处理后图片（水印/裁剪/ALT） | 图片处理API     |
| `video_script_gen`        | 产品信息+视频类型 | 视频脚本+分镜建议        | LLM         |
| `social_media_asset`      | 内容+平台+尺寸  | 社交媒体配图+文案        | LLM + 图片API |
| `product_showcase_config` | 产品3D模型/参数 | 展示配置文件           | 3D引擎API     |

---

## 3. Leo · 外贸业务员

### 子Agent架构

```
Leo · 外贸业务员
├── Inquiry Agent（询盘响应）
│     ├── inquiry_classify         询盘分类与意向评级
│     ├── auto_reply_gen           自动回复生成
│     ├── multi_channel_respond    多渠道统一响应
│     ├── intent_notify            高意向线索通知
│     └── conversation_summary     对话摘要生成
│
├── Quote Agent（智能报价）
│     ├── price_calc               价格计算（含贸易术语）
│     ├── exchange_rate_fetch      实时汇率获取
│     ├── freight_estimate         运费估算
│     ├── quotation_gen            报价单生成
│     └── quote_strategy_suggest   报价策略建议
│
├── Nurture Agent（线索培育）
│     ├── lead_scoring             线索评分
│     ├── nurture_sequence         培育流程编排
│     ├── revisit_detect           回访行为检测
│     ├── follow_up_remind         跟进提醒
│     └── drip_email_gen           培育邮件生成
│
└── Account Agent（客户管理）
      ├── customer_profile         客户档案管理
      ├── order_track              订单进度追踪
      ├── reorder_detect           复购机会识别
      ├── reorder_remind           续订提醒发送
      └── satisfaction_survey      满意度调查
```

### Skills详细说明

#### Inquiry Agent

| Skill                   | 输入          | 输出                     | 调用外部服务    |
| ----------------------- | ----------- | ---------------------- | --------- |
| `inquiry_classify`      | 询盘内容+客户信息   | 意向等级(A/B/C)+需求摘要       | LLM + RAG |
| `auto_reply_gen`        | 询盘内容+RAG知识库 | 回复内容（多语言）              | RAG + LLM |
| `multi_channel_respond` | 回复内容+渠道     | 发送到官网聊天/WhatsApp/Email | 各渠道API    |
| `intent_notify`         | 高意向询盘信息     | 通知推送到业务员（钉钉/短信/邮件）     | 通知API     |
| `conversation_summary`  | 对话历史        | 对话摘要+关键信息+下一步建议        | LLM       |

#### Quote Agent

| Skill                    | 输入             | 输出             | 调用外部服务     |
| ------------------------ | -------------- | -------------- | ---------- |
| `price_calc`             | 产品+数量+贸易术语+汇率  | 价格明细           | 内部产品库      |
| `exchange_rate_fetch`    | 货币对            | 实时汇率           | 汇率API      |
| `freight_estimate`       | 起运港+目的港+重量/体积  | 运费估算           | 物流API      |
| `quotation_gen`          | 价格明细+客户信息+贸易术语 | 报价单(PDF/Excel) | 模板渲染       |
| `quote_strategy_suggest` | 产品+客户+历史成交     | 报价策略建议         | LLM + 历史数据 |

#### Nurture Agent

| Skill              | 输入        | 输出             | 调用外部服务   |
| ------------------ | --------- | -------------- | -------- |
| `lead_scoring`     | 线索行为数据+属性 | 线索评分+等级        | 评分模型     |
| `nurture_sequence` | 线索等级+产品信息 | 培育流程（邮件序列+时间表） | LLM + 调度 |
| `revisit_detect`   | 官网访客数据    | 回访行为报告+意图判断    | 埋点数据分析   |
| `follow_up_remind` | 客户互动记录    | 跟进提醒+建议内容      | LLM + 调度 |
| `drip_email_gen`   | 培育主题+客户画像 | 培育邮件内容         | LLM      |

#### Account Agent

| Skill                 | 输入        | 输出             | 调用外部服务      |
| --------------------- | --------- | -------------- | ----------- |
| `customer_profile`    | 客户互动/交易数据 | 客户360°档案       | CDP数据聚合     |
| `order_track`         | 订单号       | 订单进度（生产/物流/到港） | ERP/物流API   |
| `reorder_detect`      | 客户历史订单+行为 | 复购机会评分+建议      | LLM + 数据分析  |
| `reorder_remind`      | 复购机会+产品信息 | 续订提醒内容         | LLM + 通知API |
| `satisfaction_survey` | 订单完成事件    | 满意度调查问卷+发送     | LLM + 问卷API |

---

## 4. Sara · 客服专员

### 子Agent架构

```
Sara · 客服专员
├── Q&A Agent（智能问答）
│     ├── knowledge_search         知识库检索
│     ├── answer_gen               答案生成
│     ├── question_classify        问题分类
│     ├── unknown_escalate         未知问题升级
│     └── knowledge_gap_detect     知识缺口检测
│
├── PreSales Agent（售前咨询）
│     ├── consult_guide            咨询引导
│     ├── intent_detect            购买意图识别
│     ├── lead_capture             线索信息采集
│     ├── handoff_to_leo           转交Leo跟进
│     └── product_recommend        产品推荐
│
├── AfterSales Agent（售后管理）
│     ├── ticket_create            工单创建
│     ├── ticket_track             工单追踪
│     ├── ticket_escalate          工单升级
│     ├── complaint_handle         投诉处理
│     └── ticket_report            售后报告
│
└── Verify Agent（业务查询与验证）
      ├── traceability_query       防伪溯源查询
      ├── order_status_query       订单状态查询
      ├── anomaly_detect           异常检测预警
      └── certificate_display      资质证书展示
```

### Skills详细说明

#### Q&A Agent

| Skill                  | 输入        | 输出                | 调用外部服务     |
| ---------------------- | --------- | ----------------- | ---------- |
| `knowledge_search`     | 用户问题      | 相关知识片段+置信度        | RAG向量检索    |
| `answer_gen`           | 知识片段+用户问题 | 回答内容（多语言）         | LLM        |
| `question_classify`    | 用户问题      | 问题类型（售前/售后/投诉/查询） | LLM分类      |
| `unknown_escalate`     | 低置信度回答    | 转人工通知+上下文摘要       | 通知API      |
| `knowledge_gap_detect` | 未解决问题统计   | 知识缺口报告+补充建议       | 数据分析 + LLM |

#### PreSales Agent

| Skill               | 输入        | 输出                  | 调用外部服务    |
| ------------------- | --------- | ------------------- | --------- |
| `consult_guide`     | 用户咨询内容    | 引导性回复+产品信息          | LLM + RAG |
| `intent_detect`     | 对话内容      | 购买意图评分+需求摘要         | LLM       |
| `lead_capture`      | 对话内容      | 线索卡片（姓名/公司/需求/联系方式） | LLM提取     |
| `handoff_to_leo`    | 线索卡片+对话摘要 | 转交Leo+通知业务员         | 内部调度      |
| `product_recommend` | 用户需求+产品库  | 推荐产品列表+推荐理由         | RAG + LLM |

#### AfterSales Agent

| Skill              | 输入          | 输出            | 调用外部服务     |
| ------------------ | ----------- | ------------- | ---------- |
| `ticket_create`    | 售后问题描述+订单信息 | 工单（编号/类型/优先级） | 工单系统API    |
| `ticket_track`     | 工单编号        | 处理进度+预计完成时间   | 工单系统API    |
| `ticket_escalate`  | 超时/高优先级工单   | 升级通知+处理建议     | 通知API      |
| `complaint_handle` | 投诉内容        | 初步回复+处理方案建议   | LLM + 知识库  |
| `ticket_report`    | 时间范围        | 售后统计报告        | 数据聚合 + LLM |

#### Verify Agent

| Skill                 | 输入       | 输出              | 调用外部服务    |
| --------------------- | -------- | --------------- | --------- |
| `traceability_query`  | 溯源码/产品编号 | 生产批次+质检报告+物流轨迹  | 溯源系统API   |
| `order_status_query`  | 订单号/客户信息 | 订单状态+物流信息       | ERP/物流API |
| `anomaly_detect`      | 查询行为数据   | 异常预警（如同一编码多次查询） | 数据分析      |
| `certificate_display` | 产品/公司信息  | 资质证书+认证信息       | 知识库检索     |

---

## 5. Ada · 运营主管

### 子Agent架构

```
Ada · 运营主管
├── Analytics Agent（数据分析）
│     ├── health_score_calc        官网健康度评分
│     ├── anomaly_detect           异常波动检测
│     ├── funnel_analysis          转化漏斗分析
│     ├── insight_gen              洞察与建议生成
│     └── competitor_benchmark     竞品对比分析
│
├── Coordination Agent（团队协调）
│     ├── task_create              跨员工任务创建
│     ├── task_dispatch            任务分派与调度
│     ├── task_track               任务进度追踪
│     ├── workflow_orchestrate     工作流编排
│     └── cross_agent_notify       跨员工通知
│
├── SiteOps Agent（网站管理）
│     ├── nl_command_parse         自然语言指令解析
│     ├── site_config_exec         站点配置执行
│     ├── content_batch_ops        内容批量操作
│     ├── domain_ssl_manage        域名SSL管理
│     └── notification_rule_config 通知规则配置
│
└── Report Agent（运营报告）
      ├── daily_report_gen         日报生成
      ├── weekly_report_gen        周报生成
      ├── monthly_report_gen       月报生成
      ├── roi_attribution          ROI归因分析
      └── custom_report_gen        自定义报告
```

### Skills详细说明

#### Analytics Agent

| Skill                  | 输入        | 输出                 | 调用外部服务           |
| ---------------------- | --------- | ------------------ | ---------------- |
| `health_score_calc`    | 官网各项指标数据  | 健康度评分(0-100)+各维度得分 | 数据聚合 + 评分模型      |
| `anomaly_detect`       | 指标时间序列    | 异常事件列表+影响分析        | 统计模型             |
| `funnel_analysis`      | 访客行为数据    | 转化漏斗图+各环节转化率+流失点   | 埋点数据分析           |
| `insight_gen`          | 异常事件+指标数据 | 可执行优化建议            | LLM              |
| `competitor_benchmark` | 竞品数据+官网数据 | 对比报告+差距分析          | SimilarWeb + LLM |

#### Coordination Agent

| Skill                  | 输入         | 输出                | 调用外部服务     |
| ---------------------- | ---------- | ----------------- | ---------- |
| `task_create`          | 数据洞察/用户指令  | 任务卡片（执行人+内容+截止时间） | LLM + 内部调度 |
| `task_dispatch`        | 任务卡片       | 分派到对应数字员工         | 内部调度       |
| `task_track`           | 任务ID       | 执行进度+结果           | 内部调度       |
| `workflow_orchestrate` | 复杂指令（跨多员工） | 工作流（任务序列+依赖关系）    | LLM + 调度引擎 |
| `cross_agent_notify`   | 事件+目标员工    | 通知消息              | 内部消息       |

#### SiteOps Agent

| Skill                      | 输入      | 输出      | 调用外部服务            |
| -------------------------- | ------- | ------- | ----------------- |
| `nl_command_parse`         | 自然语言指令  | 结构化操作指令 | LLM               |
| `site_config_exec`         | 结构化指令   | 执行结果    | CMS API / DNS API |
| `content_batch_ops`        | 批量操作指令  | 批量执行结果  | CMS API           |
| `domain_ssl_manage`        | 域名+操作类型 | 配置结果    | DNS API + SSL API |
| `notification_rule_config` | 规则描述    | 通知规则配置  | 通知系统API           |

#### Report Agent

| Skill                | 输入        | 输出           | 调用外部服务     |
| -------------------- | --------- | ------------ | ---------- |
| `daily_report_gen`   | 当日数据      | 日报（流量+询盘+转化） | 数据聚合 + LLM |
| `weekly_report_gen`  | 本周数据      | 周报（趋势+异常+建议） | 数据聚合 + LLM |
| `monthly_report_gen` | 本月数据      | 月报（全景+对比+策略） | 数据聚合 + LLM |
| `roi_attribution`    | 投入数据+产出数据 | ROI归因报告      | 数据分析 + LLM |
| `custom_report_gen`  | 报告需求描述    | 自定义报告        | LLM + 数据聚合 |

---

## 全局架构总览

### 5大数字员工 × 20个子Agent × 84个Skills

| 数字员工            | 子Agent数 | Skills数 | 核心能力域                 |
| --------------- | ------- | ------- | --------------------- |
| **Mia · 推广专员**  | 4       | 22      | SEO优化、广告投放、主动拓客、市场情报  |
| **Coco · 内容运营** | 4       | 18      | 产品内容、博客SEO、多语言本地化、多媒体 |
| **Leo · 外贸业务员** | 4       | 20      | 询盘响应、智能报价、线索培育、客户管理   |
| **Sara · 客服专员** | 4       | 19      | 智能问答、售前转线索、售后工单、业务查询  |
| **Ada · 运营主管**  | 4       | 20      | 数据分析、团队协调、网站管理、运营报告   |
| **合计**          | **20**  | **99**  |                       |

### 跨员工共享Skills

以下Skills被多个数字员工共用：

| 共享Skill  | 使用方             | 说明                |
| -------- | --------------- | ----------------- |
| RAG知识库检索 | Leo, Sara, Coco | 统一的产品/企业知识库       |
| LLM多语言生成 | 全部5人            | 统一的多语言内容生成能力      |
| 通知推送     | Leo, Sara, Ada  | 统一的通知渠道（钉钉/短信/邮件） |
| CDP客户数据  | Leo, Ada, Sara  | 统一的客户数据平台         |
| CMS内容发布  | Coco, Ada       | 统一的官网内容管理接口       |

### 外部服务依赖总览

| 外部服务                    | 使用方            | 用途        |
| ----------------------- | -------------- | --------- |
| Google Keyword Plan API | Mia            | 关键词研究     |
| Google Ads API          | Mia            | 广告投放管理    |
| Google Trends API       | Mia            | 市场趋势      |
| LinkedIn API            | Mia            | 拓客连接      |
| Apollo/SimilarWeb API   | Mia            | 竞品分析      |
| Ahrefs/SEMrush API      | Mia            | SEO数据     |
| SMTP + 邮件追踪API          | Mia, Leo       | 邮件发送与追踪   |
| 汇率API                   | Leo            | 实时汇率      |
| 物流API                   | Leo, Sara      | 运费估算/物流追踪 |
| ERP API                 | Leo, Sara      | 订单/库存查询   |
| 溯源系统API                 | Sara           | 防伪溯源      |
| 通知API（钉钉/短信）            | Leo, Sara, Ada | 消息推送      |
| 图片处理API                 | Coco           | 图片处理      |
| DNS/SSL API             | Ada            | 域名证书管理    |
| CMS API                 | Coco, Ada      | 官网内容管理    |
| LLM API                 | 全部             | 内容生成/分析   |
| RAG向量数据库                | 全部             | 知识检索      |
