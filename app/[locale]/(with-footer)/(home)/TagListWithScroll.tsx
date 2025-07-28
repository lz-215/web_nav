'use client';

import { useRef } from 'react';

import { TagList } from './Tag';

interface TagListWithScrollProps {
  data: { name: string; href: string; id: string }[];
  locale?: string;
}

export default function TagListWithScroll({ data, locale }: TagListWithScrollProps) {
  const listRef = useRef<HTMLUListElement>(null);

  function scrollLeft() {
    listRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  }
  function scrollRight() {
    listRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  }

  return (
    <div className='mb-10 mt-5 flex items-center gap-2 delay-500 duration-1000 animate-in slide-in-from-bottom-4'>
      <button
        type='button'
        className='flex h-8 w-8 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10'
        onClick={scrollLeft}
        aria-label='向左滚动'
      >
        {'<'}
      </button>
      <TagList ref={listRef} data={data} locale={locale} />
      <button
        type='button'
        className='flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 text-purple-500 transition hover:bg-purple-500/10'
        onClick={scrollRight}
        aria-label='向右滚动'
      >
        {'>'}
      </button>
    </div>
  );
}
