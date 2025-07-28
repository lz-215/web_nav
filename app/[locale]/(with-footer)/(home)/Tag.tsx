'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export function TagItem({ children, isSelected = false }: { children: React.ReactNode; isSelected?: boolean }) {
  return (
    <div
      className={cn(
        'flex h-[38px] items-center justify-center gap-[2px] whitespace-nowrap rounded-full border border-border px-3 text-xs text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-primary/10',
        isSelected
          ? 'bg-gradient-to-r from-cyan-400 to-purple-600'
          : 'bg-gradient-to-r from-cyan-300 to-purple-500 hover:from-cyan-400 hover:to-purple-500',
      )}
    >
      {children}
    </div>
  );
}

export function TagLink({ name, href, isSelected = false }: { name: string; href: string; isSelected?: boolean }) {
  // 将category路径转换为搜索路径
  const searchHref = href.startsWith('/category/') ? `/query/${encodeURIComponent(name)}` : href;

  return (
    <Link href={searchHref} title={name} className='transition-transform duration-200 hover:scale-105'>
      <TagItem isSelected={isSelected}>{name}</TagItem>
    </Link>
  );
}

const TAG_LABELS: Record<string, Record<string, string>> = {
  en: {
    image: 'Image',
    video: 'Video',
    'code-it': 'Code&IT',
    voice: 'Voice',
    business: 'Business',
    marketing: 'Marketing',
    'ai-detector': 'AI Detector',
    'design-art': 'Design&Art',
    'life-assistant': 'Life Assistant',
    '3d': '3D',
    education: 'Education',
    prompt: 'Prompt',
    productivity: 'Productivity',
    other: 'Other',
    chatbot: 'Chatbot',
    'text-writing': 'Text Writing',
  },
  ja: {
    image: '画像',
    video: '動画',
    'code-it': 'コード・IT',
    voice: '音声',
    business: 'ビジネス',
    marketing: 'マーケティング',
    'ai-detector': 'AI検出',
    'design-art': 'デザイン・アート',
    'life-assistant': '生活アシスタント',
    '3d': '3D',
    education: '教育',
    prompt: 'プロンプト',
    productivity: '生産性',
    other: 'その他',
    chatbot: 'チャットボット',
    'text-writing': 'テキスト作成',
  },
  zh: {
    image: '图片',
    video: '视频',
    'code-it': '代码&IT',
    voice: '语音',
    business: '商业',
    marketing: '营销',
    'ai-detector': 'AI检测',
    'design-art': '设计&艺术',
    'life-assistant': '生活助手',
    '3d': '3D',
    education: '教育',
    prompt: '提示词',
    productivity: '效率',
    other: '其他',
    chatbot: '聊天机器人',
    'text-writing': '文本写作',
  },
  'zh-TW': {
    image: '圖片',
    video: '視頻',
    'code-it': '程式&IT',
    voice: '語音',
    business: '商業',
    marketing: '行銷',
    'ai-detector': 'AI檢測',
    'design-art': '設計&藝術',
    'life-assistant': '生活助理',
    '3d': '3D',
    education: '教育',
    prompt: '提示詞',
    productivity: '效率',
    other: '其他',
    chatbot: '聊天機器人',
    'text-writing': '文本寫作',
  },
  de: {
    image: 'Bild',
    video: 'Video',
    'code-it': 'Code & IT',
    voice: 'Sprache',
    business: 'Geschäft',
    marketing: 'Marketing',
    'ai-detector': 'KI-Detektor',
    'design-art': 'Design & Kunst',
    'life-assistant': 'Lebensassistent',
    '3d': '3D',
    education: 'Bildung',
    prompt: 'Prompt',
    productivity: 'Produktivität',
    other: 'Andere',
    chatbot: 'Chatbot',
    'text-writing': 'Texterstellung',
  },
  ru: {
    image: 'Изображение',
    video: 'Видео',
    'code-it': 'Код и ИТ',
    voice: 'Голос',
    business: 'Бизнес',
    marketing: 'Маркетинг',
    'ai-detector': 'ИИ-детектор',
    'design-art': 'Дизайн и искусство',
    'life-assistant': 'Помощник по жизни',
    '3d': '3D',
    education: 'Образование',
    prompt: 'Промпт',
    productivity: 'Продуктивность',
    other: 'Другое',
    chatbot: 'Чат-бот',
    'text-writing': 'Написание текста',
  },
  fr: {
    image: 'Image',
    video: 'Vidéo',
    'code-it': 'Code & IT',
    voice: 'Voix',
    business: 'Affaires',
    marketing: 'Marketing',
    'ai-detector': 'Détecteur IA',
    'design-art': 'Design & Art',
    'life-assistant': 'Assistant de vie',
    '3d': '3D',
    education: 'Éducation',
    prompt: 'Invite',
    productivity: 'Productivité',
    other: 'Autre',
    chatbot: 'Chatbot',
    'text-writing': 'Rédaction de texte',
  },
  pt: {
    image: 'Imagem',
    video: 'Vídeo',
    'code-it': 'Código & TI',
    voice: 'Voz',
    business: 'Negócios',
    marketing: 'Marketing',
    'ai-detector': 'Detector de IA',
    'design-art': 'Design & Arte',
    'life-assistant': 'Assistente de vida',
    '3d': '3D',
    education: 'Educação',
    prompt: 'Prompt',
    productivity: 'Produtividade',
    other: 'Outro',
    chatbot: 'Chatbot',
    'text-writing': 'Redação de texto',
  },
  es: {
    image: 'Imagen',
    video: 'Vídeo',
    'code-it': 'Código e IT',
    voice: 'Voz',
    business: 'Negocios',
    marketing: 'Marketing',
    'ai-detector': 'Detector de IA',
    'design-art': 'Diseño y Arte',
    'life-assistant': 'Asistente de vida',
    '3d': '3D',
    education: 'Educación',
    prompt: 'Prompt',
    productivity: 'Productividad',
    other: 'Otro',
    chatbot: 'Chatbot',
    'text-writing': 'Redacción de texto',
  },
};

// fallback 机制
export const TagList = forwardRef<
  HTMLUListElement,
  { data: { name: string; href: string; id: string }[]; locale?: string }
>(({ data, locale }, ref) => {
  const pathname = usePathname();

  // locale 归一化
  function normalizeLocale(lc?: string) {
    if (!lc) return 'en';
    const l = lc.toLowerCase().replace('_', '-');
    if (['zh-tw', 'zh_tw', 'zh-hant', 'zh_hant', 'zh-hk', 'zh_hk', 'zh-mo', 'zh_mo'].includes(l)) return 'zh-TW';
    if (['zh', 'zh-cn', 'zh_cn', 'zh-hans', 'zh_hans'].includes(l)) return 'zh';
    return l.split('-')[0]; // 例如 de-DE → de
  }
  const normalized = normalizeLocale(locale);

  // 多级 fallback
  function getLabels() {
    if (TAG_LABELS[normalized]) return TAG_LABELS[normalized];
    if (normalized === 'zh-TW' && TAG_LABELS.zh) return TAG_LABELS.zh;
    return TAG_LABELS.en;
  }
  const labels = getLabels();

  return (
    <ul ref={ref} className='no-scrollbar flex max-w-full flex-1 items-center gap-3 overflow-auto'>
      {data.map((item) => {
        const isSelected = pathname === item.href || (pathname.includes(item.href) && item.href !== '/');
        return (
          <li key={item.href}>
            <TagLink
              name={labels[item.name] || TAG_LABELS.zh?.[item.name] || TAG_LABELS.en?.[item.name] || item.name}
              href={item.href}
              isSelected={isSelected}
            />
          </li>
        );
      })}
    </ul>
  );
});

TagList.displayName = 'TagList';

// 带滑动按钮的标签列表组件
export const TagListWithScroll = forwardRef<
  HTMLDivElement,
  { data: { name: string; href: string; id: string }[]; locale?: string }
>(({ data, locale }, ref) => {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // locale 归一化
  function normalizeLocale(lc?: string) {
    if (!lc) return 'en';
    const l = lc.toLowerCase().replace('_', '-');
    if (['zh-tw', 'zh_tw', 'zh-hant', 'zh_hant', 'zh-hk', 'zh_hk', 'zh-mo', 'zh_mo'].includes(l)) return 'zh-TW';
    if (['zh', 'zh-cn', 'zh_cn', 'zh-hans', 'zh_hans'].includes(l)) return 'zh';
    return l.split('-')[0]; // 例如 de-DE → de
  }
  const normalized = normalizeLocale(locale);

  // 多级 fallback
  function getLabels() {
    if (TAG_LABELS[normalized]) return TAG_LABELS[normalized];
    if (normalized === 'zh-TW' && TAG_LABELS.zh) return TAG_LABELS.zh;
    return TAG_LABELS.en;
  }
  const labels = getLabels();

  // 检查是否可以滚动
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
    return undefined;
  };

  // 滑动到左侧
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  // 滑动到右侧
  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // 监听滚动事件
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);

      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
    return undefined;
  }, [data]);

  return (
    <div ref={ref} className='relative flex items-center'>
      {/* 左侧滑动按钮 */}
      {canScrollLeft && (
        <button
          type='button'
          onClick={scrollLeft}
          className='absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/20'
          aria-label='Scroll left'
        >
          <ChevronLeft className='h-4 w-4' />
        </button>
      )}

      {/* 标签容器 */}
      <ul
        ref={scrollContainerRef}
        className='no-scrollbar flex max-w-full flex-1 items-center gap-3 overflow-auto px-2'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.map((item) => {
          const isSelected = pathname === item.href || (pathname.includes(item.href) && item.href !== '/');
          return (
            <li key={item.href} className='flex-shrink-0'>
              <TagLink
                name={labels[item.name] || TAG_LABELS.zh?.[item.name] || TAG_LABELS.en?.[item.name] || item.name}
                href={item.href}
                isSelected={isSelected}
              />
            </li>
          );
        })}
      </ul>

      {/* 右侧滑动按钮 */}
      {canScrollRight && (
        <button
          type='button'
          onClick={scrollRight}
          className='absolute right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/20'
          aria-label='Scroll right'
        >
          <ChevronRight className='h-4 w-4' />
        </button>
      )}
    </div>
  );
});

TagListWithScroll.displayName = 'TagListWithScroll';
