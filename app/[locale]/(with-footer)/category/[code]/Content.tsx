/* eslint-disable react/jsx-props-no-spreading */
import { WebNavigation } from '@/db/supabase/types';
import { useTranslations } from 'next-intl';

import Empty from '@/components/Empty';
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb';
import BasePagination from '@/components/page/BasePagination';
import WebNavCard from '@/components/webNav/WebNavCard';

export default function Content({
  headerTitle,
  navigationList,
  currentPage,
  total,
  pageSize,
  route,
}: {
  headerTitle: string;
  navigationList: WebNavigation[];
  currentPage: number;
  total: number;
  pageSize: number;
  route: string;
}) {
  const t = useTranslations('Category');

  return (
    <>
      <div className='mx-auto flex flex-col gap-3 pt-8 lg:pt-16'>
        <h1 className='text-center text-[28px] font-bold text-foreground lg:text-5xl'>{headerTitle}</h1>
        <div className='mx-auto'>
          <ExploreBreadcrumb
            linkList={[
              {
                href: '/',
                title: t('home'),
              },
              {
                title: headerTitle,
                isLast: true,
              },
            ]}
          />
        </div>
      </div>
      <div className='mt-3'>
        {navigationList && !!navigationList?.length ? (
          <>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {navigationList.map((item) => (
                <WebNavCard key={item.id} {...item} />
              ))}
            </div>
            <div className='my-5 flex items-center justify-center lg:my-10'>
              <BasePagination
                currentPage={currentPage}
                total={total}
                pageSize={pageSize}
                route={route}
                subRoute='/page'
              />
            </div>
          </>
        ) : (
          <div className='mb-3 lg:mb-5'>
            <Empty title={t('empty')} />
          </div>
        )}
      </div>
    </>
  );
}
