#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 批量替换messages目录下JSON文件中的指定内容
 * Batch replace specified content in JSON files under messages directory
 */
class MessagesBatchReplacer {
  constructor() {
    this.messagesDir = path.join(process.cwd(), 'messages');
    this.backupDir = path.join(process.cwd(), 'messages-backup');
  }

  /**
   * 获取所有JSON文件
   * Get all JSON files
   */
  getJsonFiles() {
    try {
      const files = fs.readdirSync(this.messagesDir);
      return files.filter((file) => file.endsWith('.json'));
    } catch (error) {
      console.error('❌ 无法读取messages目录:', error.message);
      process.exit(1);
    }
  }

  /**
   * 创建备份
   * Create backup
   */
  createBackup() {
    try {
      if (!fs.existsSync(this.backupDir)) {
        fs.mkdirSync(this.backupDir, { recursive: true });
      }

      const files = this.getJsonFiles();
      files.forEach((file) => {
        const sourcePath = path.join(this.messagesDir, file);
        const backupPath = path.join(this.backupDir, file);
        fs.copyFileSync(sourcePath, backupPath);
      });

      console.log('✅ 备份已创建到 messages-backup 目录');
    } catch (error) {
      console.error('❌ 创建备份失败:', error.message);
      process.exit(1);
    }
  }

  /**
   * 在JSON对象中递归查找并替换
   * Recursively find and replace in JSON object
   */
  replaceInObject(obj, searchValue, replaceValue, caseSensitive = false) {
    let replacements = 0;

    const replace = (current) => {
      if (typeof current === 'string') {
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        if (regex.test(current)) {
          replacements++;
          return current.replace(regex, replaceValue);
        }
        return current;
      } else if (Array.isArray(current)) {
        return current.map((item) => replace(item));
      } else if (typeof current === 'object' && current !== null) {
        const newObj = {};
        for (const [key, value] of Object.entries(current)) {
          newObj[key] = replace(value);
        }
        return newObj;
      }
      return current;
    };

    const result = replace(obj);
    return { result, replacements };
  }

  /**
   * 批量替换
   * Batch replace
   */
  batchReplace(searchValue, replaceValue, options = {}) {
    const { caseSensitive = false, createBackup = true, dryRun = false } = options;

    if (createBackup && !dryRun) {
      this.createBackup();
    }

    const files = this.getJsonFiles();
    let totalReplacements = 0;
    const results = [];

    console.log(`\n🔍 搜索: "${searchValue}"`);
    console.log(`🔄 替换为: "${replaceValue}"`);
    console.log(`📁 处理文件数: ${files.length}`);
    console.log(`${dryRun ? '🧪 预览模式 (不会实际修改文件)' : '✏️  执行模式'}\n`);

    files.forEach((file) => {
      const filePath = path.join(this.messagesDir, file);

      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(content);

        const { result, replacements } = this.replaceInObject(jsonData, searchValue, replaceValue, caseSensitive);

        if (replacements > 0) {
          if (!dryRun) {
            fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf8');
          }

          console.log(`✅ ${file}: ${replacements} 处替换`);
          totalReplacements += replacements;

          results.push({
            file,
            replacements,
            success: true,
          });
        } else {
          console.log(`⚪ ${file}: 未找到匹配项`);
          results.push({
            file,
            replacements: 0,
            success: true,
          });
        }
      } catch (error) {
        console.error(`❌ ${file}: ${error.message}`);
        results.push({
          file,
          replacements: 0,
          success: false,
          error: error.message,
        });
      }
    });

    console.log(`\n📊 总计: ${totalReplacements} 处替换`);

    if (dryRun) {
      console.log('🧪 这是预览模式，没有实际修改文件');
    } else if (createBackup) {
      console.log('💾 原文件已备份到 messages-backup 目录');
    }

    return results;
  }

  /**
   * 恢复备份
   * Restore from backup
   */
  restoreBackup() {
    try {
      if (!fs.existsSync(this.backupDir)) {
        console.log('❌ 未找到备份目录');
        return false;
      }

      const backupFiles = fs.readdirSync(this.backupDir);
      backupFiles.forEach((file) => {
        const backupPath = path.join(this.backupDir, file);
        const targetPath = path.join(this.messagesDir, file);
        fs.copyFileSync(backupPath, targetPath);
      });

      console.log('✅ 已从备份恢复所有文件');
      return true;
    } catch (error) {
      console.error('❌ 恢复备份失败:', error.message);
      return false;
    }
  }
}

// 命令行接口
function showHelp() {
  console.log(`
📝 Messages批量替换工具

用法:
  node scripts/batch-replace-messages.js <搜索内容> <替换内容> [选项]

选项:
  --case-sensitive    区分大小写
  --no-backup        不创建备份
  --dry-run          预览模式，不实际修改文件
  --restore          从备份恢复文件
  --help             显示帮助信息

示例:
  # 基本替换
  node scripts/batch-replace-messages.js "NaviAI" "MyAI"
  
  # 区分大小写替换
  node scripts/batch-replace-messages.js "NaviAI" "MyAI" --case-sensitive
  
  # 预览模式
  node scripts/batch-replace-messages.js "NaviAI" "MyAI" --dry-run
  
  # 恢复备份
  node scripts/batch-replace-messages.js --restore
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.length === 0) {
    showHelp();
    return;
  }

  const replacer = new MessagesBatchReplacer();

  if (args.includes('--restore')) {
    replacer.restoreBackup();
    return;
  }

  if (args.length < 2) {
    console.error('❌ 请提供搜索内容和替换内容');
    showHelp();
    process.exit(1);
  }

  const [searchValue, replaceValue] = args;
  const options = {
    caseSensitive: args.includes('--case-sensitive'),
    createBackup: !args.includes('--no-backup'),
    dryRun: args.includes('--dry-run'),
  };

  replacer.batchReplace(searchValue, replaceValue, options);
}

if (require.main === module) {
  main();
}

module.exports = MessagesBatchReplacer;
