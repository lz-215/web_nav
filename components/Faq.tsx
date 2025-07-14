import { CircleHelp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

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
    {
      value: 'faq-11',
      question: t('11.question'),
      answers: [t('11.answer')],
    },
  ];
}

export default function Faq() {
  const t = useTranslations('Faq');
  const items = getFaqItems(t);
  // 分成两列
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <div className='mx-auto max-w-pc space-y-8 pb-5'>
      <h2 className='text-center text-2xl font-bold text-foreground lg:pb-3 lg:text-3xl'>{t('title')}</h2>
      <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2'>
        {[left, right].map((col, i) => (
          <Accordion key={col[0]?.value || i} className='w-full'>
            {col.map((item) => (
              <AccordionItem value={item.value} key={item.value}>
                <AccordionTrigger>
                  <CircleHelp className='mr-2' />
                  {item.question}
                </AccordionTrigger>
                {item.answers.map((ans) => (
                  <AccordionContent key={ans}>{ans}</AccordionContent>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        ))}
      </div>
    </div>
  );
}
