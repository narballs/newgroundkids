"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

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

  const FAQList = ({ items, startIndex = 0 }: { items: FAQItem[]; startIndex?: number }) => (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, index) => (
        <AccordionItem
          key={startIndex + index}
          value={`item-${startIndex + index}`}
          className="border-b border-border"
        >
          <AccordionTrigger className="text-left font-semibold hover:text-primary py-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <div className={className}>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />

      {columns === 2 ? (
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          <FAQList items={leftFaqs} startIndex={0} />
          <FAQList items={rightFaqs} startIndex={midpoint} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <FAQList items={faqs} />
        </div>
      )}
    </div>
  );
}
