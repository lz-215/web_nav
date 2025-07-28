# URL 逻辑修复总结

## 问题描述
原始的 middleware.ts 路由匹配配置 `['/((?!api|_next|.*\\..*).*)']` 会排除所有包含点号的 URL，导致像 `character.ai`、`Leonardo.Ai` 这样的工具名称无法正确访问。

## 解决方案

### 1. 修复了 middleware 配置
- **文件**: `middleware.ts`
- **修改**: 简化了 matcher 规则，避免复杂的正则表达式
- **原配置**: `['/((?!api|_next|.*\\..*).*)']`
- **新配置**: `['/((?!api|_next/static|_next/image|favicon.ico).*)']`

### 2. 创建了 URL 处理工具函数
- **文件**: `lib/utils/urlUtils.ts`
- **功能**:
  - `encodeToolName()`: 将点号替换为连字符，用于生成 URL
  - `decodeToolName()`: 将连字符还原为点号，用于数据库查询
  - `needsEncoding()`: 检查名称是否需要编码

### 3. 在 WebNavCard 组件中使用编码函数
- **文件**: `components/webNav/WebNavCard.tsx`
- **修改**: 在生成工具详情页链接时使用 `encodeToolName(name)`
- **效果**: 确保包含点号的工具名称能正确生成 URL

### 4. 在详情页面中使用解码函数
- **文件**: `app/[locale]/(with-footer)/ai/[websiteName]/page.tsx`
- **修改**: 在数据库查询前使用 `decodeToolName(websiteName)`
- **效果**: 确保能正确查询到包含点号的工具数据

## 修复效果

现在支持的工具名称格式：
- **域名格式**: `character.ai`、`openai.com`、`huggingface.co`
- **AI服务**: `Leonardo.Ai`、`SPICYCHAT.AI`、`CrushOn.AI`
- **版本格式**: `GPT-4.turbo`、`Midjourney.v6`
- **复合格式**: `tool.with.multiple.dots`

## 保持的原有功能
- 静态文件正确排除（CSS、JS、图片等）
- API 路由不受影响
- 普通工具名称正常工作
- 多语言路由支持

## 技术实现
- 使用简单的字符串替换而非复杂正则表达式
- 在链接生成和数据查询之间保持一致性
- 向后兼容，不影响现有功能