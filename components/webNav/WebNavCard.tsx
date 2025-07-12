/* eslint-disable react/jsx-no-target-blank */

import Link from 'next/link';
import { WebNavigation } from '@/db/supabase/types';
import { CircleArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WebNavCard({ name, thumbnail_url, title, url, content }: WebNavigation) {
  const t = useTranslations('Home');

  return (
    <div className='flex h-[210px] flex-col gap-3 rounded-xl bg-[#2C2D36] p-1 lg:h-[343px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 group border border-white/5'>
      <Link href={`/ai/${name}`} title={title} className='group/image relative overflow-hidden rounded-xl'>
        <img
          src={thumbnail_url || ''}
          alt={title}
          title={title}
          width={310}
          height={174}
          className='aspect-[310/174] w-full rounded-xl bg-white/40 transition-all duration-300 group-hover/image:scale-110 group-hover/image:opacity-70'
        />
        <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-xl bg-background/80 text-xl text-foreground transition-all duration-200 group-hover/image:flex backdrop-blur-sm'>
          {t('checkDetail')} <CircleArrowRight className='size-4' />
        </div>
      </Link>
      <div className='flex items-center justify-between px-[6px]'>
        <a href={url} title={title} target='_blank' rel='nofollow' className='hover:opacity-70 transition-opacity duration-200'>
          <h3 className='line-clamp-1 flex-1 text-sm font-bold lg:text-base text-card-foreground group-hover:text-primary transition-colors duration-200'>{title}</h3>
        </a>
        <a href={url} title={title} target='_blank' rel='nofollow' className='hover:opacity-70 transition-all duration-200 hover:scale-110 p-1 rounded-md hover:bg-white/10'>
          <SquareArrowOutUpRight className='size-5' />
          <span className='sr-only'>{title}</span>
        </a>
      </div>
      <p className='line-clamp-3 px-[6px] text-xs text-muted-foreground lg:line-clamp-5 lg:text-sm leading-relaxed'>{content}</p>
    </div>
  );
}
