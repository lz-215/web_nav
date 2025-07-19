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
                <div className='group relative flex w-full items-center justify-center'>
                  <Input
                    placeholder={t('search')}
                    {...field}
                    className='h-12 w-full max-w-6xl rounded-full border border-gray-200 bg-white/10 pr-12 text-white transition-all duration-300 placeholder:text-gray-200 hover:border-gray-500 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/20 lg:h-14 lg:pr-14'
                  />
                  <Separator
                    className='absolute right-12 h-8 w-px bg-gray-600 transition-colors duration-300 group-focus-within:bg-cyan-400 lg:right-14'
                    orientation='vertical'
                  />
                  <button
                    type='submit'
                    className='absolute right-3 rounded-full p-2 transition-all duration-200 hover:scale-110 hover:bg-cyan-400/20 hover:text-cyan-400 active:scale-95 lg:right-4'
                  >
                    <Search className='size-5 text-gray-400 transition-colors duration-200 group-hover:text-cyan-400 lg:size-6' />
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
