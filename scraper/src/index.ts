import { chromium, type Browser, type Page } from 'playwright';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { extractColors, type ColorPalette } from './extractors/colors.js';
import { extractTypography, type Typography } from './extractors/typography.js';
import { extractLogos, downloadLogo, type LogoResult, type LogoInfo } from './extractors/logo.js';
import { extractImages, downloadImage, extractDominantColors, type ImageInfo } from './extractors/images.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SiteConfig {
  name: string;
  slug: string;
  url: string;
}

interface BrandData {
  name: string;
  url: string;
  scrapedAt: string;
  logo: {
    primary: string | null;
    favicon: string | null;
    appleTouchIcon: string | null;
    all: Array<{ path: string; type: string }>;
  };
  colors: ColorPalette & {
    fromLogo?: ImageInfo['dominantColors'];
  };
  typography: Typography;
  images: Array<{
    name: string;
    path: string;
    type: string;
    dominantColors?: ImageInfo['dominantColors'];
  }>;
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

async function scrapeSite(browser: Browser, config: SiteConfig): Promise<BrandData> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔍 Scraping: ${config.name}`);
  console.log(`   URL: ${config.url}`);
  console.log(`${'='.repeat(60)}\n`);

  const outputBase = path.resolve(__dirname, '../../brand-assets', config.slug);
  const assetsDir = path.join(outputBase, 'assets');
  const logosDir = path.join(assetsDir, 'logos');
  const imagesDir = path.join(assetsDir, 'images');

  // Create directories
  await fs.mkdir(logosDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });

  const page = await browser.newPage();
  
  try {
    // Navigate to site
    console.log('📄 Loading page...');
    await page.goto(config.url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for dynamic content
    await page.waitForTimeout(2000);

    // Extract data
    console.log('🎨 Extracting colors...');
    const colors = await extractColors(page);
    console.log(`   Found ${Object.keys(colors.cssVariables).length} CSS variables`);
    console.log(`   Button colors: ${colors.elementColors.buttons.slice(0, 3).join(', ')}`);

    console.log('📝 Extracting typography...');
    const typography = await extractTypography(page);
    console.log(`   Headings: ${typography.headings?.fontFamily || 'Not found'}`);
    console.log(`   Body: ${typography.body?.fontFamily || 'Not found'}`);
    console.log(`   Google Fonts: ${typography.googleFonts.join(', ') || 'None detected'}`);

    console.log('🖼️  Extracting logos...');
    const logos = await extractLogos(page, config.url);
    console.log(`   Found ${logos.logos.length} potential logos`);

    console.log('📸 Extracting images...');
    const images = await extractImages(page, config.url);
    console.log(`   Found ${images.length} images`);

    // Download logos
    console.log('\n💾 Downloading logos...');
    const downloadedLogos: Array<{ path: string; type: string }> = [];
    let primaryLogoPath: string | null = null;
    let logoColors: ImageInfo['dominantColors'] | undefined;

    if (logos.primary) {
      const localPath = await downloadLogo(logos.primary, logosDir, 'logo-primary');
      if (localPath) {
        primaryLogoPath = path.relative(outputBase, localPath);
        downloadedLogos.push({ path: primaryLogoPath, type: 'primary' });
        console.log(`   ✓ Primary logo: ${primaryLogoPath}`);
        
        // Extract colors from logo
        if (!localPath.endsWith('.svg')) {
          logoColors = await extractDominantColors(localPath);
          if (logoColors?.vibrant) {
            console.log(`   🎨 Logo colors: ${Object.values(logoColors).filter(Boolean).join(', ')}`);
          }
        }
      }
    }

    if (logos.favicon) {
      const localPath = await downloadLogo(logos.favicon, logosDir, 'favicon');
      if (localPath) {
        downloadedLogos.push({ path: path.relative(outputBase, localPath), type: 'favicon' });
        console.log(`   ✓ Favicon downloaded`);
      }
    }

    if (logos.appleTouchIcon) {
      const localPath = await downloadLogo(logos.appleTouchIcon, logosDir, 'apple-touch-icon');
      if (localPath) {
        downloadedLogos.push({ path: path.relative(outputBase, localPath), type: 'apple-touch-icon' });
        console.log(`   ✓ Apple touch icon downloaded`);
      }
    }

    // Download additional logos (first 3)
    for (let i = 1; i < Math.min(logos.logos.length, 4); i++) {
      const logo = logos.logos[i];
      if (logo.src !== logos.primary?.src) {
        const localPath = await downloadLogo(logo, logosDir, `logo-${i}`);
        if (localPath) {
          downloadedLogos.push({ path: path.relative(outputBase, localPath), type: 'alternate' });
        }
      }
    }

    // Download images (limit to 10 most important)
    console.log('\n💾 Downloading images...');
    const downloadedImages: BrandData['images'] = [];
    const imagesToDownload = images.slice(0, 10);

    for (let i = 0; i < imagesToDownload.length; i++) {
      const image = imagesToDownload[i];
      const filename = `${image.type}-${i + 1}`;
      const localPath = await downloadImage(image, imagesDir, filename);
      
      if (localPath) {
        const relativePath = path.relative(outputBase, localPath);
        let dominantColors: ImageInfo['dominantColors'] | undefined;
        
        // Extract colors from hero images
        if (image.type === 'hero' && !localPath.endsWith('.svg')) {
          dominantColors = await extractDominantColors(localPath);
        }
        
        downloadedImages.push({
          name: path.basename(localPath),
          path: relativePath,
          type: image.type,
          dominantColors,
        });
        console.log(`   ✓ ${relativePath}`);
      }
    }

    // Compile brand data
    const brandData: BrandData = {
      name: config.name,
      url: config.url,
      scrapedAt: new Date().toISOString(),
      logo: {
        primary: primaryLogoPath,
        favicon: downloadedLogos.find(l => l.type === 'favicon')?.path || null,
        appleTouchIcon: downloadedLogos.find(l => l.type === 'apple-touch-icon')?.path || null,
        all: downloadedLogos,
      },
      colors: {
        ...colors,
        fromLogo: logoColors,
      },
      typography,
      images: downloadedImages,
    };

    // Save brand.json
    const brandJsonPath = path.join(outputBase, 'brand.json');
    await fs.writeFile(brandJsonPath, JSON.stringify(brandData, null, 2));
    console.log(`\n✅ Brand data saved to: ${brandJsonPath}`);

    return brandData;

  } finally {
    await page.close();
  }
}

async function generateUnifiedBrand(brands: BrandData[]): Promise<void> {
  console.log(`\n${'='.repeat(60)}`);
  console.log('🎨 Generating unified brand spec for NGK');
  console.log(`${'='.repeat(60)}\n`);

  // Prefer jiujitsu brand as primary (main academy)
  const primaryBrand = brands.find(b => b.url.includes('jiujitsu')) || brands[0];
  const secondaryBrand = brands.find(b => b !== primaryBrand);

  // Merge colors - prefer primary brand
  const unifiedColors = {
    primary: primaryBrand.colors.primary || 
             primaryBrand.colors.fromLogo?.vibrant ||
             secondaryBrand?.colors.primary ||
             '#1a1a1a',
    secondary: primaryBrand.colors.secondary ||
               primaryBrand.colors.fromLogo?.muted ||
               secondaryBrand?.colors.secondary ||
               '#666666',
    accent: primaryBrand.colors.accent ||
            primaryBrand.colors.fromLogo?.lightVibrant ||
            secondaryBrand?.colors.accent ||
            '#c4a747',
    background: primaryBrand.colors.background || '#ffffff',
    text: primaryBrand.colors.text || '#333333',
    textLight: primaryBrand.colors.textLight || '#666666',
    fromLogos: {
      primary: primaryBrand.colors.fromLogo,
      secondary: secondaryBrand?.colors.fromLogo,
    },
    allExtracted: {
      primary: primaryBrand.colors.elementColors,
      secondary: secondaryBrand?.colors.elementColors,
    },
  };

  // Merge typography
  const unifiedTypography = {
    headings: primaryBrand.typography.headings || secondaryBrand?.typography.headings,
    body: primaryBrand.typography.body || secondaryBrand?.typography.body,
    allFonts: [
      ...new Set([
        ...primaryBrand.typography.allFonts,
        ...(secondaryBrand?.typography.allFonts || []),
      ]),
    ],
    googleFonts: [
      ...new Set([
        ...primaryBrand.typography.googleFonts,
        ...(secondaryBrand?.typography.googleFonts || []),
      ]),
    ],
  };

  const unified = {
    generatedAt: new Date().toISOString(),
    generatedFor: 'NewGround Kids (NGK)',
    sources: brands.map(b => ({ name: b.name, url: b.url })),
    
    // Recommended brand settings for NGK
    recommended: {
      colors: {
        primary: unifiedColors.primary,
        secondary: unifiedColors.secondary,
        accent: unifiedColors.accent,
        background: '#ffffff',
        text: unifiedColors.text,
        textLight: unifiedColors.textLight,
        // Kid-friendly adjustments
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      typography: {
        headings: unifiedTypography.headings?.fontFamily || 'Inter, sans-serif',
        body: unifiedTypography.body?.fontFamily || 'Inter, sans-serif',
        googleFonts: unifiedTypography.googleFonts,
      },
      logos: {
        primary: brands.find(b => b.logo.primary)?.logo.primary,
        sources: brands.map(b => b.logo),
      },
    },

    // Raw extracted data for reference
    raw: {
      colors: unifiedColors,
      typography: unifiedTypography,
      brands: brands.map(b => ({
        name: b.name,
        url: b.url,
        colors: b.colors,
        typography: b.typography,
        logo: b.logo,
        images: b.images,
      })),
    },
  };

  const outputPath = path.resolve(__dirname, '../../brand-assets/unified-brand.json');
  await fs.writeFile(outputPath, JSON.stringify(unified, null, 2));
  console.log(`✅ Unified brand spec saved to: ${outputPath}`);

  // Print summary
  console.log('\n📊 Brand Summary:');
  console.log('─'.repeat(40));
  console.log(`Primary Color:   ${unified.recommended.colors.primary}`);
  console.log(`Secondary Color: ${unified.recommended.colors.secondary}`);
  console.log(`Accent Color:    ${unified.recommended.colors.accent}`);
  console.log(`Heading Font:    ${unified.recommended.typography.headings}`);
  console.log(`Body Font:       ${unified.recommended.typography.body}`);
  console.log(`Google Fonts:    ${unified.recommended.typography.googleFonts.join(', ') || 'None'}`);
  console.log('─'.repeat(40));
}

async function main(): Promise<void> {
  console.log('🚀 NGK Brand Scraper');
  console.log('Extracting brand assets from New Ground websites...\n');

  // Parse CLI args
  const args = process.argv.slice(2);
  const siteArg = args.find(a => a.startsWith('--site='))?.split('=')[1];

  const sitesToScrape = siteArg 
    ? [SITES[siteArg]].filter(Boolean)
    : Object.values(SITES);

  if (sitesToScrape.length === 0) {
    console.error('❌ Invalid site specified. Use: --site=apparel or --site=jiujitsu');
    process.exit(1);
  }

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const results: BrandData[] = [];

    for (const site of sitesToScrape) {
      const brandData = await scrapeSite(browser, site);
      results.push(brandData);
    }

    // Generate unified brand if we scraped both sites
    if (results.length > 1) {
      await generateUnifiedBrand(results);
    }

    console.log('\n✨ Scraping complete!');
    console.log(`   Assets saved to: brand-assets/`);

  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('❌ Scraper failed:', error);
  process.exit(1);
});
