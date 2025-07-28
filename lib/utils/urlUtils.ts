/**
 * 编码工具名称用于 URL
 * 将点号替换为连字符，避免被误认为文件扩展名
 */
export function encodeToolName(name: string): string {
  return name.replace(/\./g, '-');
}

/**
 * 解码 URL 中的工具名称
 * 将连字符还原为点号
 */
export function decodeToolName(encodedName: string): string {
  return encodedName.replace(/-/g, '.');
}

/**
 * 检查名称是否需要编码
 */
export function needsEncoding(name: string): boolean {
  return name.includes('.');
}
