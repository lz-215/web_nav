import Markdown from 'react-markdown';

export default function MarkdownProse({ markdown, className }: { markdown: string; className?: string }) {
  return (
    <article className='prose prose-invert mx-auto max-w-pc marker:text-white [&_*]:text-foreground [&_li]:text-lg [&_li]:leading-relaxed [&_li]:text-white [&_ol>li]:text-white [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-white'>
      <Markdown className={className}>{markdown}</Markdown>
    </article>
  );
}
