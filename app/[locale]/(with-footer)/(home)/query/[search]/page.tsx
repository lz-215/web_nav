import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';
import Empty from '@/components/Empty';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from '../../Tag';
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
  
  const { data: dataList } = await supabase
    .from('web_navigation')
    .select()
    .ilike('detail', `%${decodeURI(params?.search || '')}%`);

  return (
    <Suspense fallback={<Loading />}>
      <div className='mb-10 mt-5'>
        {params?.search && (
          <TagList
            data={hardcodedTags}
            locale={params.locale}
          />
        )}
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
