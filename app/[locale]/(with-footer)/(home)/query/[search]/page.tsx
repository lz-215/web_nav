import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';
import Empty from '@/components/Empty';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagListWithScroll } from '../../Tag';
import Loading from './loading';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export const revalidate = RevalidateOneHour / 2;

export default async function Page({ params }: { params: { search?: string; locale: string } }) {
  const supabase = createClient();
  const t = await getTranslations('Home');

  // 硬编码的标签数据
  const hardcodedTags = [
    { id: '1', name: 'image', href: '/query/image' },
    { id: '2', name: 'video', href: '/query/video' },
    { id: '3', name: 'code-it', href: '/query/code-it' },
    { id: '4', name: 'voice', href: '/query/voice' },
    { id: '5', name: 'business', href: '/query/business' },
    { id: '6', name: 'marketing', href: '/query/marketing' },
    { id: '7', name: 'ai-detector', href: '/query/ai-detector' },
    { id: '8', name: 'design-art', href: '/query/design-art' },
    { id: '9', name: 'life-assistant', href: '/query/life-assistant' },
    { id: '10', name: '3d', href: '/query/3d' },
    { id: '11', name: 'education', href: '/query/education' },
    { id: '12', name: 'prompt', href: '/query/prompt' },
    { id: '13', name: 'productivity', href: '/query/productivity' },
    { id: '14', name: 'other', href: '/query/other' },
    { id: '15', name: 'chatbot', href: '/query/chatbot' },
    { id: '16', name: 'text-writing', href: '/query/text-writing' },
  ];

  const searchTerm = decodeURI(params?.search || '');

  // 搜索detail字段和category_name字段
  const { data: dataList } = await supabase
    .from('web_navigation')
    .select()
    .or(`detail.ilike.%${searchTerm}%,category_name.ilike.%${searchTerm}%`);

  return (
    <Suspense fallback={<Loading />}>
      <div className='mb-8 mt-8 lg:mb-10 lg:mt-10'>
        {params?.search && <TagListWithScroll data={hardcodedTags} locale={params.locale} />}
      </div>
      <section className='flex flex-col gap-5'>
        {dataList && !!dataList.length && params?.search ? (
          <>
            <h2 className='mb-1 text-left text-[18px] lg:text-2xl'>{t('result')}</h2>
            <WebNavCardList dataList={dataList!} />
          </>
        ) : (
          <Empty title={t('empty')} />
        )}
      </section>
      <Separator className='mx-auto my-10 h-px w-4/5 bg-[#2C2D36] lg:my-16' />
      <ScrollToTop />
    </Suspense>
  );
}
