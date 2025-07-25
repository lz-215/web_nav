import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/home/Navigation';

import './globals.css';

import { Suspense } from 'react';
import { ThemeProvider } from 'next-themes';

import GoogleAdScript from '@/components/ad/GoogleAdScript';
import SeoScript from '@/components/seo/SeoScript';

import Loading from './loading';

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className='relative mx-auto flex min-h-screen flex-col bg-gradient-to-br from-blue-700 via-gray-300 to-purple-500 text-white'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Toaster
              position='top-center'
              toastOptions={{
                classNames: {
                  error: 'bg-red-400',
                  success: 'text-green-400',
                  warning: 'text-yellow-400',
                  info: 'bg-blue-400',
                },
              }}
            />
            <Navigation />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </NextIntlClientProvider>
          <SeoScript />
          <GoogleAdScript />
        </ThemeProvider>
      </body>
    </html>
  );
}
