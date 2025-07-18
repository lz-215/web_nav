import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';

import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';

export async function generateMetadata({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.ai',
  });
  // locale 适配为标准短码
  const langMap: Record<string, string> = { jp: 'ja', zh: 'zh', cn: 'zh', en: 'en' };
  const lang = langMap[locale.split('-')[0]] || locale.split('-')[0];
  const { data } = await supabase
    .from('web_navigation')
    .select('*, web_navigation_i18n(id,lang,title,content,detail)')
    .eq('name', websiteName)
    .eq('web_navigation_i18n.lang', lang);

  if (!data || !data[0]) {
    notFound();
  }
  const nav = data[0] as any;
  const title = nav.web_navigation_i18n?.[0]?.title || nav.title;
  const content = nav.web_navigation_i18n?.[0]?.content || nav.content;

  return {
    title: `${title} | ${t('titleSubfix')}`,
    description: content,
  };
}

export default async function Page({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}) {
  const supabase = createClient();
  const t = await getTranslations({ locale, namespace: 'Startup.detail' });
  // locale 适配为标准短码
  const langMap: Record<string, string> = { jp: 'ja', zh: 'zh', cn: 'zh', en: 'en' };
  const lang = langMap[locale.split('-')[0]] || locale.split('-')[0];
  const { data: dataList } = await supabase
    .from('web_navigation')
    .select('*, web_navigation_i18n(id,lang,title,content,detail)')
    .eq('name', websiteName)
    .eq('web_navigation_i18n.lang', lang);
  if (!dataList) {
    notFound();
  }
  const nav = dataList[0] as any;
  const data = {
    ...nav,
    title: nav.web_navigation_i18n?.[0]?.title || nav.title,
    content: nav.web_navigation_i18n?.[0]?.content || nav.content,
    detail: nav.web_navigation_i18n?.[0]?.detail || nav.detail,
  };

  return (
    <div className='max-w-8xl mx-auto mt-16 rounded-2xl bg-white/5 p-10 shadow-2xl shadow-blue-500/10'>
      <div className='flex flex-col px-6 pt-4 lg:h-[323px] lg:flex-row lg:justify-between lg:px-0 lg:pt-8'>
        <div className='flex w-full flex-col items-center lg:items-start'>
          <h1 className='mb-4 text-5xl font-extrabold text-white'>{data.title}</h1>
          <p className='mb-8 text-lg leading-relaxed text-gray-300'>{data.content}</p>
          <a
            href={data.url}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors duration-200 hover:from-cyan-500 hover:to-purple-700'
          >
            {t('visitWebsite')}
            <ArrowTopRightOnSquareIcon className='ml-2 h-5 w-5' />
          </a>
        </div>
        <a
          href={data.url}
          target='_blank'
          rel='noreferrer'
          className='flex-center group relative h-[171px] w-full flex-shrink-0 lg:h-[234px] lg:w-[466px]'
        >
          <BaseImage
            title={data.title}
            alt={data.title}
            fill
            src={data.thumbnail_url || ''}
            className='absolute mt-3 aspect-[466/234] w-full rounded-[16px] border border-gray-700 bg-white/10 bg-cover shadow-sm shadow-blue-400/20 lg:mt-0'
          />
          <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-[16px] bg-background/80 text-2xl text-foreground transition-all duration-200 group-hover:flex'>
            {t('visitWebsite')} <ArrowTopRightOnSquareIcon className='ml-2 h-5 w-5' />
          </div>
        </a>
      </div>
      <div className='mb-5 px-3 lg:px-0'>
        <h2 className='my-5 text-4xl font-bold lg:my-10'>{t('introduction')}</h2>
        <MarkdownProse markdown={data?.detail || ''} />
      </div>
    </div>
  );
}
