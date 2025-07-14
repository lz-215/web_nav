/* eslint-disable react/jsx-no-target-blank */

import Link from 'next/link';
import { WebNavigation } from '@/db/supabase/types';
import { CircleArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WebNavCard({ name, thumbnail_url, title, url, content }: WebNavigation) {
  const t = useTranslations('Home');

  return (
    <div className='group flex h-[210px] flex-col gap-3 rounded-xl border border-border bg-card p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 lg:h-[343px]'>
      <Link href={`/ai/${name}`} title={title} className='group/image relative overflow-hidden rounded-xl'>
        <img
          src={thumbnail_url || ''}
          alt={title}
          title={title}
          width={310}
          height={174}
          className='aspect-[310/174] w-full rounded-xl bg-white/40 transition-all duration-300 group-hover/image:scale-110 group-hover/image:opacity-70'
        />
        <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-xl bg-background/80 text-xl text-foreground backdrop-blur-sm transition-all duration-200 group-hover/image:flex'>
          {t('checkDetail')} <CircleArrowRight className='size-4' />
        </div>
      </Link>
      <div className='flex items-center justify-between px-[6px]'>
        <a
          href={url}
          title={title}
          target='_blank'
          rel='nofollow'
          className='transition-opacity duration-200 hover:opacity-70'
        >
          <h3 className='line-clamp-1 flex-1 text-sm font-bold text-card-foreground transition-colors duration-200 group-hover:text-primary lg:text-base'>
            {title}
          </h3>
        </a>
        <a
          href={url}
          title={title}
          target='_blank'
          rel='nofollow'
          className='rounded-md p-1 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:opacity-70'
        >
          <SquareArrowOutUpRight className='size-5' />
          <span className='sr-only'>{title}</span>
        </a>
      </div>
      <p className='line-clamp-3 px-[6px] text-xs leading-relaxed text-muted-foreground lg:line-clamp-5 lg:text-sm'>
        {content}
      </p>
    </div>
  );
}
