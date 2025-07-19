import React from 'react';
import { useTranslations } from 'next-intl';

import { formatTime } from '@/lib/utils/timeUtils';

import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';

export default function Page() {
  const t = useTranslations('Startup');

  // Create a function to render the subtitle with email link
  const renderSubtitleWithEmail = () => {
    const subtitle = t('subTitle');
    const email = 'ytsgabcde01@2925.com';

    // Find the email in the subtitle and replace it with a link
    const parts = subtitle.split(email);

    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <a href='mailto:ytsgabcde01@2925.com' className='text-blue-500 hover:underline'>
            {email}
          </a>
          {parts[1]}
        </>
      );
    }

    // Fallback if email is not found in the expected format
    return subtitle;
  };

  return (
    <div className='flex flex-col'>
      <div className='mx-auto mt-16 w-full max-w-7xl'>
        <div className='rounded-xl bg-white/5 p-8 shadow-2xl shadow-blue-500/10'>
          <div className='flex flex-col text-center lg:mx-auto lg:my-10 lg:gap-1'>
            <h1 className='mb-6 text-center text-5xl font-extrabold text-white'>{t('title')}</h1>
            <div className='space-y-2'>
              <h2 className='text-lg text-gray-300'>{renderSubtitleWithEmail()}</h2>
              <h2 className='text-sm text-gray-500'>
                {t('updateTime')} {formatTime(new Date().setDate(new Date().getDate() - 1), 'YYYY-MM-DD')}
              </h2>
            </div>
          </div>
          <DesktopTable />
          <MobileTable />
        </div>
      </div>
    </div>
  );
}
