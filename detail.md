import { Metadata } from 'next'; import { notFound } from 'next/navigation'; import { createClient } from
'@/db/supabase/client'; import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'; import {
getTranslations } from 'next-intl/server';

import BaseImage from '@/components/image/BaseImage'; import MarkdownProse from '@/components/MarkdownProse';

export async function generateMetadata({ params: { locale, websiteName }, }: { params: { locale: string; websiteName:
string }; }): Promise<Metadata> { const supabase = createClient(); const t = await getTranslations({ locale, namespace:
'Metadata.ai', }); // locale 适配为标准短码 const langMap: Record<string, string> = { jp: 'ja', zh: 'zh', cn: 'zh', en:
'en' }; const lang = langMap[locale.split('-')[0]] || locale.split('-')[0]; const { data } = await supabase
.from('web_navigation') .select('\*, web_navigation_i18n(id,lang,title,content,detail)') .eq('name', websiteName)
.eq('web_navigation_i18n.lang', lang);

if (!data || !data[0]) { notFound(); } const nav = data[0] as any; const title = nav.web_navigation_i18n?.[0]?.title ||
nav.title; const content = nav.web_navigation_i18n?.[0]?.content || nav.content;

return { title: `${title} | ${t('titleSubfix')}`, description: content, }; }

export default async function Page({ params: { locale, websiteName }, }: { params: { locale: string; websiteName: string
}; }) { const supabase = createClient(); const t = await getTranslations({ locale, namespace: 'Startup.detail' }); //
locale 适配为标准短码 const langMap: Record<string, string> = { jp: 'ja', zh: 'zh', cn: 'zh', en: 'en' }; const lang =
langMap[locale.split('-')[0]] || locale.split('-')[0]; const { data: dataList } = await supabase .from('web_navigation')
.select('\*, web_navigation_i18n(id,lang,title,content,detail)') .eq('name', websiteName)
.eq('web_navigation_i18n.lang', lang); if (!dataList) { notFound(); } const nav = dataList[0] as any; const data = {
...nav, title: nav.web_navigation_i18n?.[0]?.title || nav.title, content: nav.web_navigation_i18n?.[0]?.content ||
nav.content, detail: nav.web_navigation_i18n?.[0]?.detail || nav.detail, };

// 结构化 detail 字段 let detailObj: any = {}; try { detailObj = typeof data.detail === 'string' ?
JSON.parse(data.detail) : data.detail; } catch { detailObj = {}; }

return ( <div className='max-w-8xl mx-auto mt-16 rounded-2xl bg-white/5 p-10 shadow-2xl shadow-blue-500/10'>
<div className='flex flex-col px-6 pt-4 lg:h-[323px] lg:flex-row lg:justify-between lg:px-0 lg:pt-8'>
<div className='flex w-full flex-col items-center lg:items-start'>
<h1 className='mb-4 text-5xl font-extrabold text-white'>{data.title}</h1>
<p className='mb-8 text-lg leading-relaxed text-gray-300'>{data.content}</p> <a
            href={data.url}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors duration-200 hover:from-cyan-500 hover:to-purple-700'
          > {t('visitWebsite')} <ArrowTopRightOnSquareIcon className='ml-2 h-5 w-5' /> </a> </div> <a
          href={data.url}
          target='_blank'
          rel='noreferrer'
          className='flex-center group relative h-[171px] w-full flex-shrink-0 lg:h-[234px] lg:w-[466px]'
        > <BaseImage title={data.title} alt={data.title} fill src={data.thumbnail_url || ''} className='absolute mt-3
aspect-[466/234] w-full rounded-[16px] border border-gray-700 bg-white/10 bg-cover shadow-sm shadow-blue-400/20 lg:mt-0'
/>
<div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-[16px] bg-background/80 text-2xl text-foreground transition-all duration-200 group-hover:flex'>
{t('visitWebsite')} <ArrowTopRightOnSquareIcon className='ml-2 h-5 w-5' /> </div> </a> </div>
<div className='mb-5 px-3 lg:px-0 space-y-8'> {/_ 简介 _/} {detailObj.what_is && ( <section>
<h2 className='text-2xl font-bold mb-2'>What is {detailObj.website_name}?</h2>
<MarkdownProse markdown={detailObj.what_is} /> </section> )} {/_ 使用方法 _/} {detailObj.how_to_use && ( <section>
<h2 className='text-2xl font-bold mb-2'>How to use</h2> <MarkdownProse markdown={detailObj.how_to_use} /> </section> )}
{/_ 核心功能 _/} {detailObj.core_features && ( <section> <h2 className='text-2xl font-bold mb-2'>Core Features</h2>
<ul className='list-disc pl-6'> {detailObj.core_features.map((f: string) => ( <li key={f}>{f}</li> ))} </ul> </section>
)} {/_ 适用场景 _/} {detailObj.use_cases && ( <section> <h2 className='text-2xl font-bold mb-2'>Use Cases</h2>
<ul className='list-disc pl-6'> {detailObj.use_cases.map((u: string) => ( <li key={u}>{u}</li> ))} </ul> </section> )}
{/_ FAQ _/} {detailObj.faq && ( <section> <h2 className='text-2xl font-bold mb-2'>FAQ</h2> <div className='space-y-4'>
{detailObj.faq.map((item: { q: string; a: string }) => ( <div key={item.q}>
<div className='font-semibold'>{item.q}</div> <div className='text-gray-500'>{item.a}</div> </div> ))} </div> </section>
)} {/_ 价格 _/} {detailObj.pricing && ( <section> <h2 className='text-2xl font-bold mb-2'>Pricing</h2>
<div className='grid grid-cols-1 md:grid-cols-3 gap-4'> {detailObj.pricing.map((p: { name: string; price: string;
description: string }) => ( <div key={p.name} className='rounded-lg border p-4 bg-white/5'>
<div className='font-bold text-lg'>{p.name}</div> <div className='text-purple-600 font-semibold'>{p.price}</div>
<div className='text-gray-500'>{p.description}</div> </div> ))} </div> </section> )} {/_ 优缺点 _/}
{detailObj.pros_and_cons && ( <section> <h2 className='text-2xl font-bold mb-2'>Pros & Cons</h2>
<div className='flex flex-col md:flex-row gap-8'> <div> <div className='font-semibold text-green-600 mb-1'>Pros</div>
<ul className='list-disc pl-6'> {detailObj.pros_and_cons.pros.map((p: string) => ( <li key={p}>{p}</li> ))} </ul> </div>
<div> <div className='font-semibold text-red-600 mb-1'>Cons</div> <ul className='list-disc pl-6'>
{detailObj.pros_and_cons.cons.map((c: string) => ( <li key={c}>{c}</li> ))} </ul> </div> </div> </section> )} </div>
</div> ); } 前端 detail 字段的结构化展示改造，自动解析 detail 字段为 JSON，并分区块渲染简介、使用方法、核心功能、FAQ、价
格、优缺点等内容。每个区块都有清晰的标题和样式，FAQ、价格、优缺点等均为结构化展示，支持 markdown 渲染。
