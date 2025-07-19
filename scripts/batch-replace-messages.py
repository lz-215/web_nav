#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
import shutil
import argparse
import re
from pathlib import Path

class MessagesBatchReplacer:
    """批量替换messages目录下JSON文件中的指定内容"""
    
    def __init__(self):
        self.messages_dir = Path('messages')
        self.backup_dir = Path('messages-backup')
    
    def get_json_files(self):
        """获取所有JSON文件"""
        if not self.messages_dir.exists():
            raise FileNotFoundError(f"Messages目录不存在: {self.messages_dir}")
        
        return list(self.messages_dir.glob('*.json'))
    
    def create_backup(self):
        """创建备份"""
        if self.backup_dir.exists():
            shutil.rmtree(self.backup_dir)
        
        shutil.copytree(self.messages_dir, self.backup_dir)
        print(f"✅ 备份已创建到 {self.backup_dir} 目录")
    
    def replace_in_data(self, data, search_value, replace_value, case_sensitive=False):
        """在数据结构中递归查找并替换"""
        replacements = 0
        flags = 0 if case_sensitive else re.IGNORECASE
        pattern = re.compile(re.escape(search_value), flags)
        
        def replace_recursive(obj):
            nonlocal replacements
            
            if isinstance(obj, str):
                if pattern.search(obj):
                    replacements += obj.count(search_value) if case_sensitive else obj.lower().count(search_value.lower())
                    return pattern.sub(replace_value, obj)
                return obj
            elif isinstance(obj, dict):
                return {key: replace_recursive(value) for key, value in obj.items()}
            elif isinstance(obj, list):
                return [replace_recursive(item) for item in obj]
            else:
                return obj
        
        result = replace_recursive(data)
        return result, replacements
    
    def batch_replace(self, search_value, replace_value, case_sensitive=False, 
                     create_backup=True, dry_run=False):
        """批量替换"""
        
        if create_backup and not dry_run:
            self.create_backup()
        
        json_files = self.get_json_files()
        total_replacements = 0
        results = []
        
        print(f"\n🔍 搜索: \"{search_value}\"")
        print(f"🔄 替换为: \"{replace_value}\"")
        print(f"📁 处理文件数: {len(json_files)}")
        print(f"{'🧪 预览模式 (不会实际修改文件)' if dry_run else '✏️  执行模式'}\n")
        
        for file_path in json_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                new_data, replacements = self.replace_in_data(
                    data, search_value, replace_value, case_sensitive
                )
                
                if replacements > 0:
                    if not dry_run:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            json.dump(new_data, f, ensure_ascii=False, indent=2)
                    
                    print(f"✅ {file_path.name}: {replacements} 处替换")
                    total_replacements += replacements
                    
                    results.append({
                        'file': file_path.name,
                        'replacements': replacements,
                        'success': True
                    })
                else:
                    print(f"⚪ {file_path.name}: 未找到匹配项")
                    results.append({
                        'file': file_path.name,
                        'replacements': 0,
                        'success': True
                    })
                    
            except Exception as e:
                print(f"❌ {file_path.name}: {str(e)}")
                results.append({
                    'file': file_path.name,
                    'replacements': 0,
                    'success': False,
                    'error': str(e)
                })
        
        print(f"\n📊 总计: {total_replacements} 处替换")
        
        if dry_run:
            print("🧪 这是预览模式，没有实际修改文件")
        elif create_backup:
            print(f"💾 原文件已备份到 {self.backup_dir} 目录")
        
        return results
    
    def restore_backup(self):
        """恢复备份"""
        if not self.backup_dir.exists():
            print("❌ 未找到备份目录")
            return False
        
        try:
            # 删除当前messages目录
            if self.messages_dir.exists():
                shutil.rmtree(self.messages_dir)
            
            # 从备份恢复
            shutil.copytree(self.backup_dir, self.messages_dir)
            print("✅ 已从备份恢复所有文件")
            return True
            
        except Exception as e:
            print(f"❌ 恢复备份失败: {str(e)}")
            return False

def main():
    parser = argparse.ArgumentParser(
        description='📝 Messages批量替换工具',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  # 基本替换
  python scripts/batch-replace-messages.py "NaviAI" "MyAI"
  
  # 区分大小写替换
  python scripts/batch-replace-messages.py "NaviAI" "MyAI" --case-sensitive
  
  # 预览模式
  python scripts/batch-replace-messages.py "NaviAI" "MyAI" --dry-run
  
  # 恢复备份
  python scripts/batch-replace-messages.py --restore
        """
    )
    
    parser.add_argument('search_value', nargs='?', help='要搜索的内容')
    parser.add_argument('replace_value', nargs='?', help='替换后的内容')
    parser.add_argument('--case-sensitive', action='store_true', help='区分大小写')
    parser.add_argument('--no-backup', action='store_true', help='不创建备份')
    parser.add_argument('--dry-run', action='store_true', help='预览模式，不实际修改文件')
    parser.add_argument('--restore', action='store_true', help='从备份恢复文件')
    
    args = parser.parse_args()
    
    replacer = MessagesBatchReplacer()
    
    if args.restore:
        replacer.restore_backup()
        return
    
    if not args.search_value or not args.replace_value:
        parser.error("请提供搜索内容和替换内容")
    
    try:
        replacer.batch_replace(
            search_value=args.search_value,
            replace_value=args.replace_value,
            case_sensitive=args.case_sensitive,
            create_backup=not args.no_backup,
            dry_run=args.dry_run
        )
    except Exception as e:
        print(f"❌ 执行失败: {str(e)}")

if __name__ == '__main__':
    main()