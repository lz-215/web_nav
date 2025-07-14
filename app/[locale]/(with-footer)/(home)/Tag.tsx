import { forwardRef } from 'react';
import Link from 'next/link';

export function TagItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-[38px] items-center justify-center gap-[2px] whitespace-nowrap rounded-full border border-border bg-card px-3 text-xs text-card-foreground transition-all duration-200 hover:scale-105 hover:text-primary hover:shadow-md hover:shadow-primary/10'>
      {children}
    </div>
  );
}

export function TagLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} title={name} className='transition-transform duration-200 hover:scale-105'>
      <TagItem>{name}</TagItem>
    </Link>
  );
}

export const TagList = forwardRef<HTMLUListElement, { data: { name: string; href: string; id: string }[] }>(
  ({ data }, ref) => (
    <ul ref={ref} className='no-scrollbar flex max-w-full flex-1 items-center gap-3 overflow-auto'>
      {data.map((item) => (
        <li key={item.href}>
          <TagLink name={item.name} href={item.href} />
        </li>
      ))}
    </ul>
  ),
);
