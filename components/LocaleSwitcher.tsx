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
      <SelectTrigger className='flex h-8 w-[80px] items-center gap-1 rounded-[4px] bg-[#232330] px-2 text-[#FFFFFF66] transition-all duration-200 hover:bg-[#2a2a38] hover:shadow-md border border-white/10 hover:border-primary/40'>
        <Icon src='/icons/global.svg' />
        <SelectValue placeholder='locale'>{localeVal.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent className='bg-[#232330] border border-white/10 backdrop-blur-lg'>
        {languages.map((language) => (
          <SelectItem value={language.lang} key={language.code} className='hover:cursor-pointer hover:!bg-white/40 transition-colors duration-200'>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
