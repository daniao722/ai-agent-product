# 内容智能中心 · Content Hub

基于 **React 18 + Vite 5 + Tailwind CSS 3** 构建的内容营销管理平台前端原型。

---

## 功能模块

| 模块 | 子页面 |
|------|--------|
| 工作台总览 | 数据看板、快捷操作、漏斗预览 |
| 内容策略 | 内容日历、热点追踪、内容规划、竞品分析 |
| 内容创作 | AI 文案工厂、AI 视觉创作、AI 视频工厂、AI 创作助手、全球化内容、创作历史 |
| 内容分发 | 渠道配置（官网/社媒/广告/门户）、国际社媒、国内社媒、网站分发、多平台裂变 |
| 内容审核 | 综合审核、平台合规审核、审核规则配置 |
| 效果分析 | 渠道数据看板、内容转化漏斗、线索追踪 |
| 品牌资产库 | 知识库、品牌资产、术语配置、创作规则、内容归档 |
| 豆子管理 | 用量明细、配额管理、计价规则 |

---

## 环境要求

- **Node.js** ≥ 18.0
- **npm** ≥ 9.0（或 yarn / pnpm 均可）

---

## 快速启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

启动后终端会显示本地地址，默认为：

```
http://localhost:5173
```

浏览器打开即可查看完整原型。

---

## 其他命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动本地开发服务器（热更新） |
| `npm run build` | 构建生产包，输出到 `dist/` |
| `npm run preview` | 预览构建产物（需先执行 build） |

---

## 项目结构

```
content-hub/
├── index.html              # 入口 HTML
├── vite.config.js          # Vite 配置
├── tailwind.config.js      # Tailwind 配置
├── package.json
└── src/
    ├── main.jsx            # React 挂载入口
    ├── App.jsx             # 路由 & 布局（useState 路由）
    ├── index.css           # 全局样式 / Tailwind 指令
    ├── components/
    │   ├── Sidebar.jsx     # 左侧导航栏
    │   └── Header.jsx      # 顶部栏
    └── pages/
        ├── Dashboard.jsx   # 工作台总览
        ├── strategy/       # 内容策略
        ├── creation/       # 内容创作
        ├── distribution/   # 内容分发
        ├── review/         # 内容审核
        ├── analytics/      # 效果分析
        ├── brand/          # 品牌资产库
        └── token/          # 豆子管理
```

---

## 技术栈

- **React 18.2** — UI 框架
- **Vite 5** — 构建工具 & 开发服务器
- **Tailwind CSS 3.4** — 原子化 CSS
- **PostCSS + Autoprefixer** — CSS 后处理

> 本项目为纯前端原型，所有数据均为静态 Mock，无需后端服务。
