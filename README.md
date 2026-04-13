# NexaCore - 汽车短视频脚本AI创作平台

🚀 一个现代化的企业级Vue 3汽车短视频脚本AI创作平台UI系统

## ✨ 特性

- **🎨 企业级设计语言** - 对标字节跳动、阿里云、Apple、Linear等大厂设计风格
- **🧩 原子化组件** - Button、Input、Card、Table、Modal等可复用组件
- **📱 响应式布局** - 桌面端优先，支持各种屏幕尺寸
- **🎯 完整功能** - 7个核心页面完整实现
- **⚡ Vue 3 + TypeScript** - 现代前端技术栈

## 🛠️ 技术栈

- **框架**: Vue 3.4 + TypeScript 5
- **构建**: Vite 5
- **路由**: Vue Router 4
- **状态**: Pinia 2
- **样式**: CSS Variables + Scoped CSS

## 📦 安装

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
nexacore-vue-ui/
├── src/
│   ├── assets/          # 静态资源
│   │   └── styles/      # 全局样式
│   ├── components/      # 组件
│   │   ├── common/      # 通用组件 (Button, Tag)
│   │   ├── data/        # 数据组件 (Card, Table, Pagination)
│   │   ├── feedback/    # 反馈组件 (Modal)
│   │   ├── form/        # 表单组件 (Input, Select)
│   │   └── layout/      # 布局组件
│   ├── router/          # 路由配置
│   ├── store/           # Pinia状态管理
│   ├── types/           # TypeScript类型定义
│   ├── views/           # 页面视图
│   │   └── settings/    # 设置子页面
│   ├── App.vue
│   └── main.ts
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 📄 页面概览

### 1. 登录页 (Login)
- 简洁专业的登录/注册界面
- 品牌展示与表单结合

### 2. 控制台仪表盘 (Dashboard)
- 数据概览卡片（总脚本数、本周生成、模板数、知识库）
- 快捷操作入口
- 存储空间可视化
- 最近创作列表

### 3. 智能脚本生成工作台 (Generate)
- 左侧配置面板（车型、脚本类型、时长、风格等）
- 右侧实时预览
- AI生成脚本功能

### 4. 口播模板管理 (Templates)
- 卡片流/列表视图切换
- 分类筛选
- 收藏功能
- 搜索过滤

### 5. 车型&卖点知识库 (Knowledge)
- 左侧车型树形列表
- 右侧车型详情（参数配置/核心卖点）
- 品牌筛选

### 6. 生成历史与素材管理 (History)
- 高级筛选（类型、状态）
- 表格展示
- 分页功能

### 7. 系统设置 (Settings)
- 二级导航
- 基本设置
- 团队管理
- 权限管理
- 安全设置

## 🎨 设计系统

### 色彩
- **主色**: #165DFF (专业蓝)
- **成功**: #00B42A
- **警告**: #FF7D00
- **错误**: #F53F3F
- **信息**: #14A9FF

### 圆角
- xs: 2px | sm: 4px | md: 6px | lg: 8px | xl: 12px | 2xl: 16px | full: 9999px

### 阴影
- sm: 小卡片
- md: 悬浮状态
- lg: 弹窗
- xl: 引导
- 2xl: 模态框

## 🔗 在线预览

访问 [https://2w55555.github.io/nexacore-vue-ui/](https://2w55555.github.io/nexacore-vue-ui/) 查看在线演示

## 📝 License

MIT License © 2024 NexaCore
