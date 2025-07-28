/* eslint-disable import/prefer-default-export */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 重新导出 URL 工具函数
export { encodeToolName, decodeToolName, needsEncoding } from './utils/urlUtils';
