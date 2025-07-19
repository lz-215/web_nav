'use client';

import { useState } from 'react';
import { CircleHelp } from 'lucide-react';
import { useTranslations } from 'next-intl';

function getFaqItems(t: ReturnType<typeof useTranslations>) {
  return [
    {
      value: 'faq-1',
      question: t('1.question'),
      answers: [t('1.answer')],
    },
    {
      value: 'faq-2',
      question: t('2.question'),
      answers: [t('2.answer-1'), t('2.answer-2'), t('2.answer-3')],
    },
    {
      value: 'faq-3',
      question: t('3.question'),
      answers: [t('3.answer-1'), t('3.answer-2')],
    },
    {
      value: 'faq-4',
      question: t('4.question'),
      answers: [t('4.answer')],
    },
    {
      value: 'faq-5',
      question: t('5.question'),
      answers: [t('5.answer')],
    },
    {
      value: 'faq-6',
      question: t('6.question'),
      answers: [t('6.answer')],
    },
    {
      value: 'faq-7',
      question: t('7.question'),
      answers: [t('7.answer')],
    },
    {
      value: 'faq-8',
      question: t('8.question'),
      answers: [t('8.answer')],
    },
    {
      value: 'faq-9',
      question: t('9.question'),
      answers: [t('9.answer')],
    },
    {
      value: 'faq-10',
      question: t('10.question'),
      answers: [t('10.answer')],
    },
    // faq-11 已移除
  ];
}

export default function Faq() {
  const t = useTranslations('Faq');
  const items = getFaqItems(t);
  const [openItem, setOpenItem] = useState<string | null>(null);

  // 分成两列
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  const handleItemClick = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <div className='mx-auto mt-12 max-w-pc space-y-8 pb-5'>
      <h2 className='text-center text-2xl font-bold text-foreground lg:pb-3 lg:text-3xl'>{t('title')}</h2>
      <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
        <div className='w-full space-y-3'>
          {left.map((item) => (
            <div
              key={item.value}
              className='group rounded-xl border border-gray-600/30 bg-white/20 transition-all duration-200 hover:border-gray-500/50'
            >
              <button
                type='button'
                onClick={() => handleItemClick(item.value)}
                className='flex w-full items-center justify-between px-6 py-4 text-left hover:no-underline'
              >
                <div className='flex items-center text-left'>
                  <CircleHelp className='mr-3 h-5 w-5 flex-shrink-0 text-gray-500 transition-colors duration-200 group-hover:text-blue-500' />
                  <span className='font-medium text-gray-800 transition-colors duration-200 group-hover:text-blue-500'>
                    {item.question}
                  </span>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-500 transition-all duration-300 ease-in-out group-hover:text-blue-500 ${
                    openItem === item.value ? 'rotate-180' : ''
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === item.value ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className='px-6 pb-4'>
                  <div className='space-y-2'>
                    {item.answers.map((ans) => (
                      <p key={item.value} className='leading-relaxed text-gray-600'>
                        {ans}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full space-y-3'>
          {right.map((item) => (
            <div
              key={item.value}
              className='group rounded-xl border border-gray-600/30 bg-white/20 transition-all duration-200 hover:border-gray-500/50'
            >
              <button
                type='button'
                onClick={() => handleItemClick(item.value)}
                className='flex w-full items-center justify-between px-6 py-4 text-left hover:no-underline'
              >
                <div className='flex items-center text-left'>
                  <CircleHelp className='mr-3 h-5 w-5 flex-shrink-0 text-gray-500 transition-colors duration-200 group-hover:text-blue-500' />
                  <span className='font-medium text-gray-800 transition-colors duration-200 group-hover:text-blue-500'>
                    {item.question}
                  </span>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-500 transition-all duration-300 ease-in-out group-hover:text-blue-500 ${
                    openItem === item.value ? 'rotate-180' : ''
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === item.value ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className='px-6 pb-4'>
                  <div className='space-y-2'>
                    {item.answers.map((ans) => (
                      <p key={item.value} className='leading-relaxed text-gray-600'>
                        {ans}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
