import { HTMLAttributeAnchorTarget } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { CONTACT_US_EMAIL } from '@/lib/env';

function InfoLink({
  href,
  title,
  target,
  type,
}: {
  href: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  type?: string;
}) {
  return (
    <Link
      href={href}
      title={title}
      className='whitespace-nowrap text-xs text-foreground hover:opacity-70 lg:text-sm'
      target={target}
      type={type}
    >
      {title}
    </Link>
  );
}

export function Footer() {
  const t = useTranslations('Footer');

  const INFO_LIST = [
    {
      title: t('privacy'),
      href: '/privacy-policy',
    },
    {
      title: t('termsConditions'),
      href: '/terms-of-service',
    },
  ];

  return (
    <footer className='w-full'>
      <div className='mx-auto flex min-h-[80px] max-w-pc flex-col items-center justify-center p-6 lg:flex-row lg:justify-between lg:px-0'>
        <div className='flex flex-row items-center gap-6'>
          {INFO_LIST.map((item) => (
            <InfoLink key={item.href} href={item.href} title={item.title} />
          ))}
          <a
            href={`mailto:${CONTACT_US_EMAIL}`}
            className='whitespace-nowrap text-xs text-muted-foreground hover:opacity-70 lg:text-sm'
            title={t('contactUs')}
            type='email'
          >
            {t('contactUs')}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
