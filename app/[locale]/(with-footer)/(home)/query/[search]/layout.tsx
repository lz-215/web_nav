import { getTranslations } from 'next-intl/server';

import SearchForm from '@/components/home/SearchForm';

export default async function Layout({ children, params }: { children: React.ReactNode; params: { search?: string } }) {
  const t = await getTranslations('Home');

  return (
    <div className='relative mx-auto w-full max-w-pc px-3 lg:px-0'>
      <div className='mt-8 flex flex-col text-center lg:mx-auto lg:mt-16'>
        <h1 className='mb-2 bg-clip-text text-2xl font-bold leading-tight text-foreground lg:mb-4 lg:text-5xl lg:leading-tight'>{t('title')}</h1>
        <h2 className='text-balance text-xs font-bold text-muted-foreground lg:text-sm'>{t('subTitle')}</h2>
      </div>
      <div className='mt-8 flex w-full items-center justify-center lg:mt-12'>
        <SearchForm defaultSearch={decodeURI(params?.search || '')} />
      </div>
      <div className='pb-4' />
      {children}
    </div>
  );
}
