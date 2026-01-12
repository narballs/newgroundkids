import { chromium } from 'playwright';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { extractSiteContent, type SiteContent } from './extractors/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SiteConfig {
  name: string;
  slug: string;
  url: string;
}

const SITES: Record<string, SiteConfig> = {
  apparel: {
    name: 'New Ground Apparel',
    slug: 'newground-apparel',
    url: 'https://www.newgroundapparel.com/',
  },
  jiujitsu: {
    name: 'New Ground Jiu Jitsu',
    slug: 'newground-jiujitsu',
    url: 'https://www.newgroundjiujitsu.com/',
  },
};

async function scrapeSiteContent(config: SiteConfig): Promise<SiteContent & { name: string }> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📝 Scraping content from: ${config.name}`);
  console.log(`   URL: ${config.url}`);
  console.log(`${'='.repeat(60)}\n`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const content = await extractSiteContent(page, config.url, 8);
    
    console.log(`\n   ✅ Scraped ${content.pages.length} pages`);
    console.log(`   📰 Found ${content.allHeadlines.length} headlines`);
    console.log(`   🔘 Found ${content.allCTAs.length} CTAs`);
    console.log(`   💬 Found ${content.allTestimonials.length} testimonials`);

    return { ...content, name: config.name };
  } finally {
    await browser.close();
  }
}

function generateContentMarkdown(sites: Array<SiteContent & { name: string }>): string {
  let md = `## Content & Copy\n\n`;
  md += `> **Scraped:** ${new Date().toISOString()}\n\n`;

  for (const site of sites) {
    md += `### ${site.name}\n\n`;

    // Headlines
    if (site.allHeadlines.length > 0) {
      md += `#### Headlines & Taglines\n\n`;
      site.allHeadlines.slice(0, 15).forEach(h => {
        md += `- "${h}"\n`;
      });
      md += `\n`;
    }

    // CTAs
    if (site.allCTAs.length > 0) {
      md += `#### Calls to Action\n\n`;
      site.allCTAs.slice(0, 10).forEach(cta => {
        md += `- "${cta}"\n`;
      });
      md += `\n`;
    }

    // Testimonials
    if (site.allTestimonials.length > 0) {
      md += `#### Testimonials\n\n`;
      site.allTestimonials.forEach(t => {
        md += `> "${t}"\n\n`;
      });
    }

    // Key phrases
    if (site.uniquePhrases.length > 0) {
      md += `#### Key Copy & Phrases\n\n`;
      site.uniquePhrases.forEach(p => {
        md += `- "${p}"\n`;
      });
      md += `\n`;
    }

    // Navigation structure
    const navItems = site.pages[0]?.navigation || [];
    if (navItems.length > 0) {
      md += `#### Navigation Structure\n\n`;
      navItems.slice(0, 15).forEach(item => {
        md += `- ${item}\n`;
      });
      md += `\n`;
    }

    // Page details
    md += `#### Pages Scraped\n\n`;
    site.pages.forEach(page => {
      md += `**${page.title || page.url}**\n`;
      if (page.metaDescription) {
        md += `> ${page.metaDescription}\n`;
      }
      if (page.headings.h1.length > 0) {
        md += `- H1: ${page.headings.h1.join(', ')}\n`;
      }
      if (page.headings.h2.length > 0) {
        md += `- H2s: ${page.headings.h2.slice(0, 5).join(', ')}\n`;
      }
      md += `\n`;
    });

    md += `---\n\n`;
  }

  return md;
}

async function main(): Promise<void> {
  console.log('🚀 NGK Content Scraper');
  console.log('Extracting text content from New Ground websites...\n');

  const results: Array<SiteContent & { name: string }> = [];

  for (const site of Object.values(SITES)) {
    const content = await scrapeSiteContent(site);
    results.push(content);
  }

  // Save raw content JSON
  const outputDir = path.resolve(__dirname, '../../brand-assets');
  const contentJsonPath = path.join(outputDir, 'scraped-content.json');
  await fs.writeFile(contentJsonPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Raw content saved to: ${contentJsonPath}`);

  // Generate markdown section
  const contentMarkdown = generateContentMarkdown(results);
  
  // Append to project_knowledge.md
  const docsDir = path.resolve(__dirname, '../../docs');
  const knowledgePath = path.join(docsDir, 'project_knowledge.md');
  
  try {
    let existingContent = await fs.readFile(knowledgePath, 'utf-8');
    
    // Find and replace the Content & Copy section
    const contentSectionStart = existingContent.indexOf('## Content & Copy');
    const contentSectionEnd = existingContent.indexOf('## CSS Variables Reference');
    
    if (contentSectionStart !== -1 && contentSectionEnd !== -1) {
      existingContent = 
        existingContent.slice(0, contentSectionStart) + 
        contentMarkdown +
        '\n---\n\n' +
        existingContent.slice(contentSectionEnd);
      
      await fs.writeFile(knowledgePath, existingContent);
      console.log(`✅ Updated docs/project_knowledge.md with scraped content`);
    } else {
      // Append to end
      await fs.appendFile(knowledgePath, '\n\n' + contentMarkdown);
      console.log(`✅ Appended content to docs/project_knowledge.md`);
    }
  } catch (error) {
    console.error('⚠️ Could not update project_knowledge.md:', error);
  }

  // Print summary
  console.log('\n📊 Content Summary:');
  console.log('─'.repeat(40));
  for (const site of results) {
    console.log(`\n${site.name}:`);
    console.log(`  Pages: ${site.pages.length}`);
    console.log(`  Headlines: ${site.allHeadlines.length}`);
    console.log(`  CTAs: ${site.allCTAs.length}`);
    console.log(`  Testimonials: ${site.allTestimonials.length}`);
    console.log(`  Key phrases: ${site.uniquePhrases.length}`);
  }
  console.log('\n' + '─'.repeat(40));
  console.log('\n✨ Content scraping complete!');
}

main().catch(error => {
  console.error('❌ Scraper failed:', error);
  process.exit(1);
});
