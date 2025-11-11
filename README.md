一个基于 Vue3 + Element Plus 构建的现代化后台管理系统，提供完整的文章管理和用户中心功能。

🚀 功能特性
📝 文章管理
文章分类 - 灵活的栏目分类管理

文章管理 - 文章的增删改查操作

内容管理 - 富文本编辑器支持

👤 用户中心
基本资料 - 个人信息维护

更换头像 - 头像上传与裁剪

重置密码 - 安全密码修改

🛠 技术特色
基于 Vue3 Composition API

Element Plus UI 组件库

响应式布局设计

路由权限控制

状态管理集成

📦 项目结构
text
big-event/
├── src/
│   ├── api/           # 接口管理
│   ├── assets/        # 静态资源
│   ├── components/    # 通用组件
│   ├── router/        # 路由配置
│   │   └── index.js   # 路由入口
│   ├── stores/        # 状态管理
│   │   └── index.js   # Store 入口
│   ├── utils/         # 工具函数
│   └── views/         # 页面组件
│       ├── article/   # 文章管理
│       │   ├── components/
│       │   │   ├── ArticleChannel.vue    # 文章分类
│       │   │   └── ArticleManage.vue     # 文章管理
│       ├── layout/    # 布局组件
│       │   └── LayoutContainer.vue       # 主布局
│       ├── login/     # 登录页面
│       │   └── LoginPage.vue             # 用户登录
│       └── user/      # 用户中心
│           ├── UserAvatar.vue            # 更换头像
│           ├── UserPassword.vue          # 重置密码
│           └── UserProfile.vue           # 基本资料
├── public/            # 公共资源
├── package.json       # 项目配置
└── README.md          # 项目文档
🛠 技术栈
前端框架

Vue 3 - 渐进式 JavaScript 框架

Vue Router 4 - 路由管理

Pinia - 状态管理

UI 组件库

Element Plus - 企业级 UI 组件库

构建工具

Vite - 下一代前端构建工具

开发工具

ESLint - 代码质量检查

Prettier - 代码格式化

Husky - Git hooks 工具

📥 快速开始
环境要求
Node.js >= 16.0.0

pnpm >= 7.0.0

安装依赖
bash
pnpm install
开发运行
bash
pnpm dev
访问 http://localhost:5173

构建生产版本
bash
pnpm build
代码检查
bash
pnpm lint
🎯 页面功能
登录认证
用户登录验证

权限控制

会话管理

主控制台
数据统计展示

快捷操作入口

系统导航菜单

文章管理模块
文章分类管理

分类增删改查

分类排序

状态管理

文章内容管理

文章列表展示

文章发布/编辑

内容富文本编辑

文章状态管理

用户中心模块
基本资料

个人信息展示

资料修改

表单验证

更换头像

图片上传

头像裁剪

预览功能

重置密码

密码强度验证

安全确认

操作日志

🔧 开发指南
项目配置
项目使用标准的 Vue3 项目配置，主要配置文件包括：

vite.config.js - Vite 构建配置

eslint.config.js - ESLint 代码规范配置

jsconfig.json - JavaScript 配置

代码规范
使用 Composition API 进行开发

遵循 Element Plus 设计规范

统一的代码风格和命名约定

组件化开发思想

目录规范
components/ - 可复用组件

views/ - 页面级组件

api/ - 接口管理

utils/ - 工具函数

stores/ - 状态管理

📱 响应式设计
项目采用响应式布局设计，支持：

🖥️ 桌面端 (≥1200px)

📱 平板端 (768px ~ 1199px)

📱 移动端 (<768px)

🚀 部署说明
构建生产版本
bash
pnpm build
预览构建结果
bash
pnpm preview
部署到 GitHub Pages
在 vite.config.js 中设置正确的 base URL

运行 pnpm build

将 dist 目录部署到 GitHub Pages

🤝 贡献指南
欢迎为项目贡献代码！请遵循以下步骤：

Fork 本项目

创建功能分支 (git checkout -b feature/AmazingFeature)

提交更改 (git commit -m 'Add some AmazingFeature')

推送到分支 (git push origin feature/AmazingFeature)

开启 Pull Request

📄 许可证
本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情

👥 作者
Lq-git-hub

GitHub: @ld-git-hub

🙏 致谢
感谢以下开源项目：

Vue.js

Element Plus

Vite

项目地址: https://github.com/ld-git-hub/big-event

如果觉得这个项目对你有帮助，请给个 ⭐️ 支持一下！

最后更新: 2024年11月
