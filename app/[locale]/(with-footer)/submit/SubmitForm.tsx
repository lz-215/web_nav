'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { createClient } from '@/db/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FORM_PLACEHOLDER, WEBSITE_EXAMPLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinning from '@/components/Spinning';

const FormSchema = z.object({
  website: z.string(),
  url: z.string().url(),
});

export default function SubmitForm({ className }: { className?: string }) {
  const supabase = createClient();
  const t = useTranslations('Submit');

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      website: '',
      url: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    let errMsg: any = t('networkError');
    try {
      setLoading(true);
      const { error } = await supabase.from('submit').insert({
        name: formData.website,
        url: formData.url,
        // email: ''
      });
      if (error) {
        errMsg = error.message;
        throw new Error();
      }
      toast.success(t('success'));
      form.reset();
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'mx-auto flex max-w-xl flex-col justify-between rounded-2xl bg-white/10 p-8 text-card-foreground shadow-2xl shadow-blue-500/10',
          className,
        )}
      >
        <div className='space-y-6'>
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='mb-2 block text-lg font-medium text-white'>{t('website')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='AIDock'
                    className='w-full rounded-lg border border-gray-600 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel className='mb-2 block text-lg font-medium text-white'>{t('url')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={FORM_PLACEHOLDER}
                    className='w-full rounded-lg border border-gray-600 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='mt-8 flex flex-col gap-6'>
          <button
            type='submit'
            disabled={loading}
            className={cn(
              'flex-center w-full gap-4 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-600 px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:from-cyan-500 hover:to-purple-700 hover:shadow-lg',
              loading && 'hover:cursor-not-allowed',
            )}
          >
            {loading ? <Spinning className='size-[22px]' /> : t('submit')}
          </button>
          <p className='text-sm leading-relaxed text-gray-400'>
            {t('add')} <span className='font-semibold text-blue-500 underline'>{WEBSITE_EXAMPLE}</span> {t('text')}
          </p>
        </div>
      </form>
    </Form>
  );
}
