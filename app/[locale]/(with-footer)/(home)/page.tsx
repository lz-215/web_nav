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
  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.rpc('get_categories_by_lang', { lang_code: locale }),
    supabase.from('web_navigation').select().order('collection_time', { ascending: false }).limit(12),
  ]);

  // 由于 Next.js 14 app router 的 server component 不支持 useRef/useEffect，需将标签区块拆为 client 组件
  // 这里将标签区块提取为 TagListWithScroll 客户端组件
  return (
    <div className='gradient-bg relative min-h-screen w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-5 flex flex-col text-center lg:mx-auto lg:my-10 lg:gap-1'>
          <h1 className='text-2xl font-bold text-foreground duration-1000 animate-in fade-in-50 lg:text-5xl'>
            {t('title')}
          </h1>
          <h2 className='text-balance text-xs font-bold text-muted-foreground delay-200 duration-1000 animate-in fade-in-50 lg:text-sm'>
            {t('subTitle')}
          </h2>
        </div>
        <div className='flex w-full items-center justify-center delay-300 duration-1000 animate-in slide-in-from-bottom-4'>
          <SearchForm />
        </div>
        {/* 标签区块改为客户端组件，传递数据 */}
        <TagListWithScroll
          data={categoryList!.map((item) => ({
            id: String(item.id),
            name: item.title, // 多语言 title
            href: `/category/${item.name}`,
          }))}
        />
        <div className='flex flex-col gap-5 delay-700 duration-1000 animate-in slide-in-from-bottom-4'>
          <h2 className='gradient-text text-center text-[18px] font-bold lg:text-[32px]'>{t('ai-navigate')}</h2>
          <WebNavCardList dataList={navigationList!} />
          <Link
            href='/explore'
            className='btn-primary-dark mx-auto mb-5 flex w-fit items-center justify-center gap-5 rounded-[9px] border border-primary p-[10px] text-sm leading-4 transition-all duration-300 hover:scale-105 hover:opacity-70 hover:shadow-lg hover:shadow-primary/20'
          >
            {t('exploreMore')}
            <CircleChevronRight className='mt-[0.5] h-[20px] w-[20px]' />
          </Link>
        </div>
        <Faq />
        <ScrollToTop />
      </div>
    </div>
  );
}
