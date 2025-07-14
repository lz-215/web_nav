'use client';

import { useTranslations } from 'next-intl';

import Faq from '@/components/Faq';

import SubmitForm from './SubmitForm';

export default function SubmitPageClient() {
  const t = useTranslations('Submit');

  return (
    <div className='mx-auto max-w-pc'>
      <div className='flex-y-center my-3 flex lg:my-10'>
        <h1 className='text-5xl font-bold'>{t('title')}</h1>
        <h2 className='mt-[5px] text-sm font-bold lg:my-3'>{t('subTitle')}</h2>
        <SubmitForm />
      </div>
      <Faq />
    </div>
  );
}
