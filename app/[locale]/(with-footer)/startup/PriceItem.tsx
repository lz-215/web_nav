import { cn } from '@/lib/utils';

export default function PriceItem({ title, isFree }: { title: string; isFree: boolean }) {
  return (
    <div
      className={cn(
        'flex-center w-fit gap-1 rounded-[4px] border border-purple-400 px-[10px] py-[2px] text-sm font-medium text-white',
        isFree && 'border-purple-400 text-purple-600',
      )}
    >
      <div className={cn('size-2 rounded-full bg-white', isFree && 'bg-purple-400')} />
      {title}
    </div>
  );
}
