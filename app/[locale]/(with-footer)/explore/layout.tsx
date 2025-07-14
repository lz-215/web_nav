import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Faq from '@/components/Faq';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.explore',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-y-center mx-auto w-full max-w-pc px-3'>
      {children}
      <Faq />
    </div>
  );
}
