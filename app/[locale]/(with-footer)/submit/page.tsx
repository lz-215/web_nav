import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import SubmitPageClient from './SubmitPageClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.submit',
  });

  return {
    title: t('title'),
  };
}

export default function Page() {
  return <SubmitPageClient />;
}
