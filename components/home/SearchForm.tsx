'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const FormSchema = z.object({
  search: z.string(),
});

export default function SearchForm({ defaultSearch }: { defaultSearch?: string }) {
  const t = useTranslations('Home');
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: defaultSearch || '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!data.search.trim()) return;
    router.push(`/query/${data.search}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='group relative flex w-full items-center'>
                  <Input
                    placeholder={t('search')}
                    {...field}
                    className='h-8 w-full rounded-full border border-border !bg-background pr-10 text-foreground transition-all duration-300 placeholder:text-muted-foreground hover:border-primary focus:border-primary focus:shadow-lg focus:shadow-primary/20 lg:h-[38px] lg:w-[392px] lg:pr-12'
                  />
                  <Separator
                    className='absolute right-8 h-6 w-px bg-border transition-colors duration-300 group-focus-within:bg-primary lg:right-10'
                    orientation='vertical'
                  />
                  <button
                    type='submit'
                    className='absolute right-2 rounded-full p-1 transition-all duration-200 hover:scale-110 hover:bg-primary/20 active:scale-95 lg:right-3'
                  >
                    <Search className='size-[18px] text-foreground lg:size-5' />
                    <span className='sr-only'>search</span>
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
