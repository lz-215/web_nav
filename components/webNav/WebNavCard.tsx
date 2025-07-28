/* eslint-disable react/jsx-no-target-blank */

import Image from 'next/image';
import Link from 'next/link';
import { WebNavigation } from '@/db/supabase/types';
import { CircleArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { encodeToolName } from '@/lib/utils/urlUtils';

export default function WebNavCard({ name, thumbnail_url, title, url, content }: WebNavigation) {
  const t = useTranslations('Home');

  return (
    <div className='group relative overflow-hidden rounded-lg bg-white/10 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20'>
      {/* Gradient line animation at top */}
      <div className='absolute left-0 right-0 top-0 z-10 h-0.5 scale-x-0 transform bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 ease-in-out group-hover:scale-x-100' />

      <Link href={`/ai/${encodeToolName(name)}`} title={title} className='group/image relative block'>
        <Image
          src={thumbnail_url || ''}
          alt={title}
          title={title}
          width={310}
          height={174}
          className='w-full rounded-t-lg transition-all duration-300 ease-in-out group-hover/image:scale-110 group-hover/image:opacity-70'
        />
        <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-t-lg bg-background/80 text-xl text-foreground backdrop-blur-sm transition-all duration-300 ease-in-out group-hover/image:flex'>
          {t('checkDetail')} <CircleArrowRight className='size-4' />
        </div>
      </Link>
      <div className='p-4'>
        <div className='mb-2 flex items-center justify-between'>
          <a
            href={url}
            title={title}
            target='_blank'
            rel='nofollow'
            className='transition-all duration-300 ease-in-out hover:opacity-70'
          >
            <h3 className='line-clamp-2 font-semibold text-white transition-all duration-300 ease-in-out group-hover:text-purple-500'>
              {title}
            </h3>
          </a>
          <a
            href={url}
            title={title}
            target='_blank'
            rel='nofollow'
            className='rounded-md p-1 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white/10 hover:opacity-70 hover:shadow-md'
          >
            <SquareArrowOutUpRight className='size-5 text-white transition-all duration-300 ease-in-out' />
            <span className='sr-only'>{title}</span>
          </a>
        </div>
        <p className='line-clamp-3 text-sm leading-relaxed text-gray-600 transition-all duration-300 ease-in-out'>
          {content}
        </p>
      </div>
    </div>
  );
}
