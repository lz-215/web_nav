import { createClient } from '@/db/supabase/client';

import SearchForm from '@/components/home/SearchForm';
import BasePagination from '@/components/page/BasePagination';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from '../(home)/Tag';

const WEB_PAGE_SIZE = 12;

export default async function ExploreList({ pageNum, locale }: { pageNum?: string; locale: string }) {
  const supabase = createClient();
  const currentPage = pageNum ? Number(pageNum) : 1;

  // locale 适配为标准短码
  const langMap: Record<string, string> = { jp: 'ja', zh: 'zh', cn: 'zh', en: 'en' };
  const lang = langMap[locale.split('-')[0]] || locale.split('-')[0];

  // start and end
  const start = (currentPage - 1) * WEB_PAGE_SIZE;
  const end = start + WEB_PAGE_SIZE - 1;

  // 硬编码的标签数据
  const hardcodedTags = [
    { id: '1', name: 'image', href: '/category/image' },
    { id: '2', name: 'video', href: '/category/video' },
    { id: '3', name: 'code-it', href: '/category/code-it' },
    { id: '4', name: 'voice', href: '/category/voice' },
    { id: '5', name: 'business', href: '/category/business' },
    { id: '6', name: 'marketing', href: '/category/marketing' },
    { id: '7', name: 'ai-detector', href: '/category/ai-detector' },
    { id: '8', name: 'design-art', href: '/category/design-art' },
    { id: '9', name: 'life-assistant', href: '/category/life-assistant' },
    { id: '10', name: '3d', href: '/category/3d' },
    { id: '11', name: 'education', href: '/category/education' },
    { id: '12', name: 'prompt', href: '/category/prompt' },
    { id: '13', name: 'productivity', href: '/category/productivity' },
    { id: '14', name: 'other', href: '/category/other' },
    { id: '15', name: 'chatbot', href: '/category/chatbot' },
    { id: '16', name: 'text-writing', href: '/category/text-writing' },
  ];

  const { data: navigationList, count } = await supabase
    .from('web_navigation')
    .select('*, web_navigation_i18n(id,lang,title,content,detail)')
    .eq('web_navigation_i18n.lang', lang)
    .order('collection_time', { ascending: false })
    .range(start, end);

  // 合并翻译字段，优先用i18n
  const mergedList =
    navigationList?.map((item: any) => ({
      ...item,
      title: item.web_navigation_i18n?.[0]?.title || item.title,
      content: item.web_navigation_i18n?.[0]?.content || item.content,
      detail: item.web_navigation_i18n?.[0]?.detail || item.detail,
    })) || [];

  return (
    <>
      <div className='mt-8 flex w-full items-center justify-center lg:mt-12'>
        <SearchForm />
      </div>
      <div className='mb-10 mt-5'>
        <TagList
          data={hardcodedTags}
          locale={lang}
        />
      </div>
      <WebNavCardList dataList={mergedList} />
      <BasePagination
        currentPage={currentPage}
        pageSize={WEB_PAGE_SIZE}
        total={count!}
        route='/explore'
        subRoute='/page'
        className='my-5 lg:my-10'
      />
    </>
  );
}
