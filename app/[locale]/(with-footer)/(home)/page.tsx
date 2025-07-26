import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import Faq from '@/components/Faq';
import SearchForm from '@/components/home/SearchForm';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import TagListWithScroll from './TagListWithScroll';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './',
    },
  };
}

export const revalidate = RevalidateOneHour;

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const supabase = createClient();
  const t = await getTranslations('Home');

  // locale 适配为标准短码
  const langMap: Record<string, string> = {
    jp: 'ja',
    zh: 'zh',
    cn: 'zh',
    'zh-tw': 'zh-TW',
    zh_tw: 'zh-TW',
    'zh-hant': 'zh-TW',
    en: 'en',
  };
  const localeKey = locale.replace('_', '-').toLowerCase();
  const lang = langMap[localeKey] || localeKey;

  // 硬编码的标签数据
  const hardcodedTags = [
    { id: '1', name: 'image', href: '/category/image' },
    { id: '2', name: 'video', href: '/category/video' },
    { id: '3', name: 'code-it', href: '/category/code-it' },
    { id: '4', name: 'voice', href: '/category/voice' },
    { id: '5', name: 'business', href: '/category/business' },
    { id: '6', name: 'marketing', href: '/category/marketing' },
    { id: '7', name: 'ai-detector', href: '/category/ai-detector' },
    { id: '8', name: 'design-art', href: '/category/design-art' },
    { id: '9', name: 'life-assistant', href: '/category/life-assistant' },
    { id: '10', name: '3d', href: '/category/3d' },
    { id: '11', name: 'education', href: '/category/education' },
    { id: '12', name: 'prompt', href: '/category/prompt' },
    { id: '13', name: 'productivity', href: '/category/productivity' },
    { id: '14', name: 'other', href: '/category/other' },
    { id: '15', name: 'chatbot', href: '/category/chatbot' },
    { id: '16', name: 'text-writing', href: '/category/text-writing' },
  ];

  const { data: navigationList } = await supabase
    .from('web_navigation')
    .select('*, web_navigation_i18n(id,lang,title,content,detail)')
    .eq('web_navigation_i18n.lang', lang)
    .order('collection_time', { ascending: false })
    .limit(12);

  // 合并翻译字段，优先用i18n
  const mergedList =
    navigationList?.map((item: any) => ({
      ...item,
      title: item.web_navigation_i18n?.[0]?.title || item.title,
      content: item.web_navigation_i18n?.[0]?.content || item.content,
      detail: item.web_navigation_i18n?.[0]?.detail || item.detail,
    })) || [];

  // 由于 Next.js 14 app router 的 server component 不支持 useRef/useEffect，需将标签区块拆为 client 组件
  // 这里将标签区块提取为 TagListWithScroll 客户端组件
  return (
    <div className='relative min-h-screen w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='mt-8 flex flex-col text-center lg:mx-auto lg:mt-16 lg:gap-1'>
          <h1 className='text-2xl font-bold text-white duration-1000 animate-in fade-in-50 lg:text-5xl'>
            {t('title')}
          </h1>
          <h2 className='text-balance text-xs font-bold text-gray-500 delay-200 duration-1000 animate-in fade-in-50 lg:text-sm'>
            {t('subTitle')}
          </h2>
        </div>
        <div className='mt-8 flex w-full items-center justify-center delay-300 duration-1000 animate-in slide-in-from-bottom-4 lg:mt-12'>
          <SearchForm />
        </div>
        {/* 使用硬编码的标签数据 */}
        <TagListWithScroll
          data={hardcodedTags}
          locale={lang}
        />
        <div className='flex flex-col gap-5 delay-700 duration-1000 animate-in slide-in-from-bottom-4'>
          <h2 className='text-center text-[18px] font-bold text-white lg:text-[32px]'>{t('ai-navigate')}</h2>
          <WebNavCardList dataList={mergedList} />
          <div className='border-flow mx-auto mb-5 flex w-fit'>
            <Link
              href='/explore'
              className='border-flow-inner flex items-center justify-center gap-5 text-sm leading-4 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20'
            >
              {t('exploreMore')}
              <CircleChevronRight className='mt-[0.5] h-[20px] w-[20px]' />
            </Link>
          </div>
        </div>
        <Faq />
        <ScrollToTop />
      </div>
    </div>
  );
}
