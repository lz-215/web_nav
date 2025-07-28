import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { STARTUP_LIST } from '@/lib/constants';

import PriceItem from './PriceItem';
import TagItem from './TagItem';

export default function MobileTable() {
  const t = useTranslations('Startup.table');

  return (
    <div className='space-y-1 lg:hidden'>
      <div className='overflow-x-auto'>
        <div className='flex h-12 items-center justify-between border-b border-gray-600 bg-white/10 px-6 py-4 text-lg font-bold text-white'>
          <div>{t('website')}</div>
          <div>{t('submission')}</div>
        </div>
        <div className='flex flex-col'>
          {STARTUP_LIST.map((item, index) => (
            <div
              key={item.DA}
              className={`flex min-h-[99px] items-center justify-between border-b border-white/20 bg-transparent px-6 py-3 even:bg-white/5 hover:bg-white/10 hover:shadow-md ${
                index % 2 === 0 ? '' : 'bg-white/5'
              }`}
            >
              <div className='flex flex-1 flex-col'>
                <div className='mb-[9px] text-sm font-medium text-white'>
                  <span className='text-white'>(DA{item.DA})</span> {item.Website}
                </div>
                <div className='mb-[6px] flex flex-wrap gap-1'>
                  {item.Tag ? item.Tag.split(',').map((tag) => <TagItem key={tag} title={tag} />) : null}
                </div>
                <PriceItem title={item.Price} isFree={item.Price.toLowerCase() === 'free'} />
              </div>
              <a
                href={item.URL}
                target='_blank'
                rel='noreferrer'
                className='flex-center h-[75px] w-9 rounded-[4px] hover:opacity-80'
              >
                <SquareArrowOutUpRight className='text-white' />
                <span className='sr-only'>{item.Website}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
