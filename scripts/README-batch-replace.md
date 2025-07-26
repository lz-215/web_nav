# Messages 批量替换工具

这个工具用于批量替换 `messages` 目录下所有 JSON 文件中的指定内容，支持多语言国际化文件的统一修改。

## 功能特性

- ✅ 批量处理所有 JSON 文件
- ✅ 自动创建备份
- ✅ 支持预览模式
- ✅ 支持区分大小写
- ✅ 递归处理嵌套的 JSON 结构
- ✅ 详细的执行报告
- ✅ 备份恢复功能

## 使用方法

### Node.js 版本

```bash
# 基本替换
node scripts/batch-replace-messages.js "NaviAI" "MyAI"

# 区分大小写替换
node scripts/batch-replace-messages.js "NaviAI" "MyAI" --case-sensitive

# 预览模式（不实际修改文件）
node scripts/batch-replace-messages.js "NaviAI" "MyAI" --dry-run

# 不创建备份
node scripts/batch-replace-messages.js "NaviAI" "MyAI" --no-backup

# 恢复备份
node scripts/batch-replace-messages.js --restore

# 显示帮助
node scripts/batch-replace-messages.js --help
```

### Python 版本

```bash
# 基本替换
python scripts/batch-replace-messages.py "NaviAI" "MyAI"

# 区分大小写替换
python scripts/batch-replace-messages.py "NaviAI" "MyAI" --case-sensitive

# 预览模式（不实际修改文件）
python scripts/batch-replace-messages.py "NaviAI" "MyAI" --dry-run

# 不创建备份
python scripts/batch-replace-messages.py "NaviAI" "MyAI" --no-backup

# 恢复备份
python scripts/batch-replace-messages.py --restore
```

## 参数说明

| 参数 | 说明 |
|------|------|
| `search_value` | 要搜索的内容 |
| `replace_value` | 替换后的内容 |
| `--case-sensitive` | 区分大小写匹配 |
| `--no-backup` | 不创建备份文件 |
| `--dry-run` | 预览模式，只显示会进行的更改，不实际修改文件 |
| `--restore` | 从备份恢复所有文件 |

## 安全特性

1. **自动备份**: 默认会在 `messages-backup` 目录创建备份
2. **预览模式**: 使用 `--dry-run` 可以先预览更改
3. **恢复功能**: 可以随时恢复到备份状态

## 使用示例

### 场景1: 更换品牌名称
```bash
# 预览更改
node scripts/batch-replace-messages.js "NaviAI" "MyBrand" --dry-run

# 确认无误后执行
node scripts/batch-replace-messages.js "NaviAI" "MyBrand"
```

### 场景2: 更新版权信息
```bash
python scripts/batch-replace-messages.py "2024" "2025"
```

### 场景3: 修正拼写错误
```bash
# 区分大小写的精确替换
node scripts/batch-replace-messages.js "recieve" "receive" --case-sensitive
```

## 输出示例

```
🔍 搜索: "NaviAI"
🔄 替换为: "MyAI"
📁 处理文件数: 9
✏️  执行模式

✅ en.json: 5 处替换
✅ cn.json: 3 处替换
✅ de.json: 4 处替换
⚪ es.json: 未找到匹配项
✅ fr.json: 2 处替换
✅ jp.json: 3 处替换
✅ pt.json: 4 处替换
✅ ru.json: 3 处替换
✅ tw.json: 3 处替换

📊 总计: 27 处替换
💾 原文件已备份到 messages-backup 目录
```

## 注意事项

1. 执行前建议先使用 `--dry-run` 预览更改
2. 备份文件会保存在 `messages-backup` 目录
3. 工具会递归处理 JSON 中的所有字符串值
4. 支持正则表达式特殊字符的自动转义