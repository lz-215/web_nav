import { cn } from '@/lib/utils';

export default function PriceItem({ title, isFree }: { title: string; isFree: boolean }) {
  return (
    <div
      className={cn(
        'flex-center w-fit gap-1 rounded-[4px] border border-border px-[10px] py-[2px] text-sm text-muted-foreground',
        isFree && 'border-accent text-accent',
      )}
    >
      <div className={cn('size-2 rounded-full bg-muted-foreground', isFree && 'bg-accent')} />
      {title}
    </div>
  );
}
