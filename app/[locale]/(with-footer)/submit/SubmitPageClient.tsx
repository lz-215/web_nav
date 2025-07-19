'use client';

import { useTranslations } from 'next-intl';

import SubmitForm from './SubmitForm';

export default function SubmitPageClient() {
  const t = useTranslations('Submit');

  return (
    <div className='mx-auto flex min-h-screen max-w-pc flex-col justify-center text-foreground'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='mb-4 text-4xl font-bold text-white'>{t('title')}</h1>
        <h2 className='mb-8 text-lg text-gray-500'>{t('subTitle')}</h2>
        <SubmitForm />
      </div>
    </div>
  );
}
