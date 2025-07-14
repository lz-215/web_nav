import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

interface AccordionProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Root> {
  className?: string;
}

function Accordion({ className, ...props }: AccordionProps) {
  return <RadixAccordion.Root type='single' collapsible className={cn('w-full', className)} {...props} />;
}

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {
  className?: string;
}

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return <RadixAccordion.Item className={cn('border-b border-muted', className)} {...props} />;
}

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger> {
  className?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <RadixAccordion.Header>
      <RadixAccordion.Trigger
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between py-4 text-left text-lg font-medium text-foreground transition-all hover:underline focus:outline-none',
          className,
        )}
        {...props}
      >
        <span className='flex items-center gap-2'>{children}</span>
        <ChevronDown className='h-5 w-5 transition-transform data-[state=open]:rotate-180' />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  ),
);
AccordionTrigger.displayName = 'AccordionTrigger';

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Content> {
  className?: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <RadixAccordion.Content
      ref={ref}
      className={cn(
        'overflow-hidden text-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className,
      )}
      {...props}
    >
      <div className='pb-4'>{children}</div>
    </RadixAccordion.Content>
  ),
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
