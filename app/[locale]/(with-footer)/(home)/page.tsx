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

  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.rpc('get_categories_by_lang', { lang_code: lang }),
    supabase
      .from('web_navigation')
      .select('*, web_navigation_i18n(id,lang,title,content,detail)')
      .eq('web_navigation_i18n.lang', lang)
      .order('collection_time', { ascending: false })
      .limit(12),
  ]);

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
        {/* 标签区块改为客户端组件，传递数据 */}
        <TagListWithScroll
          data={categoryList!.map((item) => ({
            id: String(item.id),
            name: item.name, // 用英文唯一标识作为 key，便于多语言切换
            href: `/category/${item.name}`,
          }))}
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
