"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "./section-header";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  faqs: FAQItem[];
  columns?: 1 | 2;
  className?: string;
}

function FAQList({ items, startIndex = 0 }: { items: FAQItem[]; startIndex?: number }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, index) => (
        <AccordionItem
          key={startIndex + index}
          value={`item-${startIndex + index}`}
          className="border-border border-b"
        >
          <AccordionTrigger className="hover:text-primary py-4 text-left font-semibold">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FAQSection({
  title = "Frequently Asked Questions",
  subtitle,
  badge = "FAQ",
  faqs,
  columns = 1,
  className,
}: FAQSectionProps) {
  // For 2 columns, split FAQs into two arrays
  const midpoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midpoint);
  const rightFaqs = faqs.slice(midpoint);

  return (
    <div className={className}>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />

      {columns === 2 ? (
        <div className="grid gap-x-12 gap-y-0 md:grid-cols-2">
          <FAQList items={leftFaqs} startIndex={0} />
          <FAQList items={rightFaqs} startIndex={midpoint} />
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <FAQList items={faqs} />
        </div>
      )}
    </div>
  );
}
