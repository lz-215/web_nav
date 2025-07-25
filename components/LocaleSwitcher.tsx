'use client';

import { useState } from 'react';
import { languages } from '@/i18n';
import { useLocale } from 'next-intl';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { usePathname, useRouter } from '../app/navigation';
import Icon from './image/Icon';

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [localeVal, setLocaleVal] = useState(currentLocale);

  const onValueChange = (newLocale: string) => {
    setLocaleVal(newLocale);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select value={localeVal} defaultValue={currentLocale} onValueChange={onValueChange}>
      <SelectTrigger className='flex h-8 w-[80px] items-center gap-1 rounded-[4px] border border-primary bg-primary/90 px-2 text-white shadow transition-all duration-200 hover:bg-primary hover:shadow-md'>
        <Icon src='/icons/global.svg' />
        <SelectValue placeholder='locale'>{localeVal.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent className='border border-primary bg-primary/95 text-white shadow-lg'>
        {languages.map((language) => (
          <SelectItem
            value={language.lang}
            key={language.code}
            className='transition-colors duration-200 hover:cursor-pointer hover:!bg-primary/80'
          >
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
