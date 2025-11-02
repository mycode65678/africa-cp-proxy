[根目录](../../CLAUDE.md) > [africa-cp-proxy](../) > **africa-cp-proxy**

# Africa CP Proxy 模块文档

## 模块职责

Africa CP Proxy 是非洲彩票平台的代理端管理系统，负责：

- 代理账户管理和认证
- 下级代理和用户管理
- 佣金统计和结算
- 业务数据查询和分析
- 代理层级关系管理
- 营销工具和推广

## 入口与启动

### 技术栈

- **框架**: React 18 + Ant Design Pro 6
- **语言**: TypeScript
- **构建工具**: UmiJS 4
- **状态管理**: UmiJS 内置状态管理
- **UI 组件**: Ant Design 5

### 启动命令

```bash
# 安装依赖
npm install

# 开发环境
npm run proxy-dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 测试
npm test
```

### 端口配置

- **开发端口**: 8001 (默认，避免与管理后台冲突)
- **代理目标**: server API (9191)

## 对外接口

### 前端路由结构

基于 `config/routes.ts` 配置的约定式路由：

#### 主要页面模块

- **首页** (`/welcome`): 代理概览和统计
- **用户管理** (`/user`):
  - 用户列表 (`/user/user_lists`)
  - 代理列表 (`/user/proxy_lists`)
- **订单管理** (`/order`): 订单查询和管理
- **报表统计** (`/report`): 佣金和业绩报表
- **财务管理** (`/finance`): 资金流水和提现
- **营销工具** (`/marketing`): 推广链接和活动

### API 集成

- **基础 URL**: 通过 `config/proxy.ts` 配置
- **认证方式**: Token 认证
- **权限控制**: 基于代理层级的权限管理

## 关键依赖与配置

### 核心依赖 (package.json)

```json
{
  "dependencies": {
    "@ant-design/pro-components": "^2.7.9",
    "@ant-design/icons": "^4.8.3",
    "antd": "^5.18.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "dayjs": "^1.11.13",
    "antd-style": "^3.6.2"
  }
}
```

### 配置文件

- **主配置**: `config/config.ts`
- **路由配置**: `config/routes.ts`
- **代理配置**: `config/proxy.ts`
- **默认设置**: `config/defaultSettings.ts`

### 代理权限配置

```typescript
// 示例：代理权限控制
const proxyPermissions = {
  user_lists: ['read', 'create'],
  proxy_lists: ['read', 'create', 'update'],
  order_view: ['read'],
  report_view: ['read'],
};
```

## 数据模型

### 主要业务实体

1. **Agent**: 代理账户信息
2. **SubAgent**: 下级代理管理
3. **Commission**: 佣金计算规则
4. **Report**: 代理业绩报表
5. **Promotion**: 推广链接和活动

### 代理层级结构

```typescript
interface AgentHierarchy {
  level: number; // 代理层级
  parentId?: string; // 上级代理ID
  children: Agent[]; // 下级代理列表
  commissionRate: number; // 佣金比例
}
```

## 页面组件结构

### 目录结构

```
src/
├── pages/              # 页面组件
│   ├── User/          # 用户管理页面
│   ├── Order/         # 订单管理页面
│   ├── Report/        # 报表页面
│   ├── Finance/       # 财务管理页面
│   └── Marketing/     # 营销工具页面
├── components/        # 公共组件
│   ├── AgentTree/     # 代理层级树组件
│   └── CommissionCalc/ # 佣金计算组件
├── services/          # API服务
├── utils/            # 工具函数
└── types/            # TypeScript类型定义
```

### 典型页面结构

```typescript
// 示例：代理列表页面
export default function ProxyLists() {
  // 权限检查
  const { permissions } = useModel('permissions');

  // 数据获取
  const { data, loading, refresh } = useRequest(api.getProxyList);

  return (
    <PageContainer>
      <ProTable
        columns={proxyColumns}
        dataSource={data}
        loading={loading}
        toolBarRender={() => [
          <Button key="create" type="primary">
            新增代理
          </Button>,
        ]}
      />
    </PageContainer>
  );
}
```

## 特殊功能

### 代理层级管理

- **树形展示**: 使用 Tree 组件展示代理层级关系
- **权限继承**: 上级代理对下级的操作权限
- **佣金计算**: 基于层级的佣金分配规则

### 佣金结算

- **实时计算**: 实时计算代理佣金
- **结算周期**: 支持日结、周结、月结
- **提现管理**: 代理佣金提现申请和审核

### 推广工具

- **推广链接**: 生成专属推广链接
- **二维码**: 生成推广二维码
- **统计报表**: 推广效果统计

## 测试与质量

### 测试框架

- **单元测试**: Jest + React Testing Library
- **集成测试**: API 接口测试
- **权限测试**: 代理权限功能测试

### 测试命令

```bash
# 运行测试
npm test

# 测试覆盖率
npm run test:coverage

# 权限测试
npm run test:permissions
```

### 代码质量

- **ESLint**: JavaScript/TypeScript 代码检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查

## 常见问题 (FAQ)

### Q: 如何处理代理权限控制？

A:

1. 在登录时获取代理权限信息
2. 使用 HOC 或 Hook 进行权限检查
3. 根据权限控制页面和功能访问
4. 实现权限粒度的按钮级控制

### Q: 如何实现佣金自动计算？

A:

1. 定义佣金计算规则配置
2. 使用定时任务触发计算
3. 基于代理层级计算佣金比例
4. 记录佣金明细和历史

### Q: 如何处理代理层级管理？

A:

1. 使用树形结构存储代理关系
2. 实现递归查询下级代理
3. 提供层级可视化展示
4. 支持代理关系调整

## 相关文件清单

### 核心文件

- `package.json` - 依赖和脚本配置
- `config/config.ts` - UmiJS 主配置
- `config/routes.ts` - 路由配置
- `config/proxy.ts` - API 代理配置

### 重要目录

- `src/pages/` - 页面组件
- `src/components/` - 公共组件
- `src/services/` - API 服务
- `src/utils/` - 工具函数

### 特殊组件

- `src/components/AgentTree/` - 代理层级树
- `src/components/CommissionCalc/` - 佣金计算器
- `src/components/PromotionTools/` - 推广工具

## 开发规范

### 权限控制

- 所有页面必须进行权限检查
- 使用权限装饰器或 Hook
- 实现细粒度的权限控制
- 提供权限不足的友好提示

### 数据安全

- 敏感数据必须脱敏显示
- 使用 HTTPS 传输数据
- 实现操作日志记录
- 防止越权访问

### 用户体验

- 提供清晰的操作引导
- 实现数据实时更新
- 优化大列表加载性能
- 支持数据导出功能

## 变更记录 (Changelog)

### 2025-10-23 09:09:31

- 初始化 africa-cp-proxy 模块文档
- 完成代理功能和权限梳理
- 建立组件和工具说明
- 添加特殊功能开发指导

---

_此文档由 AI 自动生成，如有不准确之处，请人工核对和修正。_
