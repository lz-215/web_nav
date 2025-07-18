import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { STARTUP_LIST } from '@/lib/constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import PriceItem from './PriceItem';
import TagItem from './TagItem';

export default function DesktopTable() {
  const t = useTranslations('Startup.table');

  return (
    <div className='hidden w-full lg:block'>
      <div className='overflow-x-auto'>
        <Table className='w-full bg-transparent'>
          <TableHeader>
            <TableRow className='rounded-t-lg border-none bg-white/10'>
              <TableHead className='w-[100px] border-b border-gray-600 px-6 py-4 text-lg font-bold text-white'>
                {t('da')}
              </TableHead>
              <TableHead className='w-[200px] border-b border-gray-600 px-6 py-4 text-lg font-bold text-white'>
                {t('website')}
              </TableHead>
              <TableHead className='w-[200px] border-b border-gray-600 px-6 py-4 text-lg font-bold text-white'>
                {t('tags')}
              </TableHead>
              <TableHead className='w-[200px] border-b border-gray-600 px-6 py-4 text-lg font-bold text-white'>
                {t('price')}
              </TableHead>
              <TableHead className='w-16 border-b border-gray-600 px-6 py-4 text-lg font-bold text-white'>
                {t('submission')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STARTUP_LIST.map((item, index) => (
              <TableRow
                key={item.DA}
                className={`border-b border-white/50 bg-transparent px-6 py-3 even:bg-white/5 hover:bg-white/10 hover:shadow-md ${
                  index % 2 === 0 ? '' : 'bg-white/5'
                }`}
              >
                <TableCell className='px-6 py-3 font-medium text-white'>{item.DA}</TableCell>
                <TableCell className='px-6 py-3 text-[18px] font-medium text-white'>{item.Website}</TableCell>
                <TableCell className='flex gap-1 px-6 py-3'>
                  {item.Tag ? item.Tag.split(',').map((tag) => <TagItem key={tag} title={tag} />) : null}
                </TableCell>
                <TableCell className='px-6 py-3'>
                  <PriceItem title={item.Price} isFree={item.Price.toLowerCase() === 'free'} />
                </TableCell>
                <TableCell className='px-6 py-3'>
                  <a
                    href={item.URL}
                    target='_blank'
                    rel='noreferrer'
                    className='flex-center h-10 w-full rounded-[4px] hover:opacity-80'
                  >
                    <SquareArrowOutUpRight className='text-white' />
                    <span className='sr-only'>{item.Website}</span>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
