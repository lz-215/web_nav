export default function TagItem({ title }: { title: string }) {
  return (
    <div className='w-fit rounded-[4px] border border-border px-1 text-center text-[10px] text-muted-foreground'>
      {title}
    </div>
  );
}
