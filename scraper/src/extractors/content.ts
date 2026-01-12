import type { Page } from 'playwright';

export interface PageContent {
  url: string;
  title: string;
  metaDescription: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  paragraphs: string[];
  buttons: string[];
  links: Array<{ text: string; href: string }>;
  lists: string[][];
  testimonials: string[];
  callsToAction: string[];
  navigation: string[];
  footer: string[];
}

export interface SiteContent {
  pages: PageContent[];
  allHeadlines: string[];
  allCTAs: string[];
  allTestimonials: string[];
  uniquePhrases: string[];
}

// Use string-based evaluation to completely avoid TypeScript transpilation issues
const EXTRACT_PAGE_CONTENT_SCRIPT = `
(() => {
  const cleanText = (text) => {
    return text
      .replace(/\\s+/g, ' ')
      .replace(/[\\n\\r\\t]/g, ' ')
      .trim();
  };

  const getTexts = (selector) => {
    const elements = document.querySelectorAll(selector);
    const texts = [];
    elements.forEach(el => {
      const text = cleanText(el.textContent || '');
      if (text && text.length > 2 && text.length < 1000) {
        texts.push(text);
      }
    });
    return [...new Set(texts)];
  };

  const title = document.title || '';
  
  const metaDescEl = document.querySelector('meta[name="description"]');
  const metaDescription = metaDescEl ? metaDescEl.getAttribute('content') || '' : '';

  const h1s = getTexts('h1');
  const h2s = getTexts('h2');
  const h3s = getTexts('h3');

  const paragraphs = getTexts('p').filter(p => p.length > 20);

  const buttons = getTexts('button, .btn, [class*="button"], [class*="btn"], [role="button"]');

  const linkElements = document.querySelectorAll('a');
  const links = [];
  linkElements.forEach(el => {
    const text = cleanText(el.textContent || '');
    const href = el.getAttribute('href') || '';
    if (text && text.length > 1 && text.length < 100 && href) {
      links.push({ text, href });
    }
  });

  const listItems = document.querySelectorAll('ul, ol');
  const lists = [];
  listItems.forEach(list => {
    const items = Array.from(list.querySelectorAll('li'))
      .map(li => cleanText(li.textContent || ''))
      .filter(t => t.length > 2 && t.length < 200);
    if (items.length > 0) {
      lists.push(items);
    }
  });

  const testimonialSelectors = [
    '[class*="testimonial"]',
    '[class*="review"]',
    '[class*="quote"]',
    'blockquote',
    '[class*="customer-quote"]',
  ];
  const testimonials = [];
  testimonialSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      const text = cleanText(el.textContent || '');
      if (text && text.length > 20 && text.length < 500) {
        testimonials.push(text);
      }
    });
  });

  const ctaSelectors = [
    '[class*="cta"]',
    '[class*="hero"] button',
    '[class*="hero"] a',
    '[class*="banner"] button',
    '[class*="banner"] a',
    'a[class*="primary"]',
    'button[class*="primary"]',
  ];
  const callsToAction = [];
  ctaSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      const text = cleanText(el.textContent || '');
      if (text && text.length > 2 && text.length < 50) {
        callsToAction.push(text);
      }
    });
  });

  const navItems = getTexts('nav a, header a, .nav a, .navbar a');
  const footerItems = getTexts('footer, .footer');

  return {
    url: window.location.href,
    title,
    metaDescription,
    headings: { h1: h1s, h2: h2s, h3: h3s },
    paragraphs,
    buttons: [...new Set(buttons)],
    links: links.slice(0, 50),
    lists,
    testimonials: [...new Set(testimonials)],
    callsToAction: [...new Set(callsToAction)],
    navigation: [...new Set(navItems)],
    footer: footerItems,
  };
})()
`;

export async function extractPageContent(page: Page): Promise<PageContent> {
  const content = await page.evaluate(EXTRACT_PAGE_CONTENT_SCRIPT) as PageContent;
  return content;
}

export async function extractSiteContent(
  page: Page, 
  baseUrl: string,
  maxPages: number = 5
): Promise<SiteContent> {
  const pages: PageContent[] = [];
  const visitedUrls = new Set<string>();
  const urlsToVisit: string[] = [baseUrl];

  while (urlsToVisit.length > 0 && pages.length < maxPages) {
    const url = urlsToVisit.shift()!;
    
    const normalizedUrl = url.split('#')[0].split('?')[0];
    if (visitedUrls.has(normalizedUrl)) continue;
    visitedUrls.add(normalizedUrl);

    try {
      console.log(`   📄 Scraping content from: ${normalizedUrl}`);
      await page.goto(normalizedUrl, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);

      const content = await extractPageContent(page);
      pages.push(content);

      if (pages.length < maxPages) {
        const internalLinks = content.links
          .filter(link => {
            const href = link.href;
            return (
              href.startsWith(baseUrl) || 
              href.startsWith('/') ||
              (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
            );
          })
          .map(link => {
            if (link.href.startsWith('/')) {
              return new URL(link.href, baseUrl).href;
            }
            return link.href;
          })
          .filter(href => !visitedUrls.has(href.split('#')[0].split('?')[0]));

        const priorityPaths = ['about', 'schedule', 'program', 'class', 'contact', 'pricing', 'team', 'instructor'];
        const sortedLinks = internalLinks.sort((a, b) => {
          const aScore = priorityPaths.some(p => a.toLowerCase().includes(p)) ? 0 : 1;
          const bScore = priorityPaths.some(p => b.toLowerCase().includes(p)) ? 0 : 1;
          return aScore - bScore;
        });

        urlsToVisit.push(...sortedLinks.slice(0, 5));
      }
    } catch (error) {
      console.error(`   ⚠️ Failed to scrape ${normalizedUrl}:`, error);
    }
  }

  const allHeadlines = [
    ...new Set(pages.flatMap(p => [...p.headings.h1, ...p.headings.h2]))
  ];
  
  const allCTAs = [
    ...new Set(pages.flatMap(p => [...p.callsToAction, ...p.buttons]))
  ];
  
  const allTestimonials = [
    ...new Set(pages.flatMap(p => p.testimonials))
  ];

  const allParagraphs = pages.flatMap(p => p.paragraphs);
  const uniquePhrases = allParagraphs
    .filter(p => p.length > 30 && p.length < 300)
    .slice(0, 20);

  return {
    pages,
    allHeadlines,
    allCTAs,
    allTestimonials,
    uniquePhrases,
  };
}
