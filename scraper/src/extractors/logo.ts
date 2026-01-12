import type { Page } from 'playwright';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface LogoInfo {
  src: string;
  alt: string;
  type: 'logo' | 'favicon' | 'apple-touch-icon';
  width?: number;
  height?: number;
  localPath?: string;
}

export interface LogoResult {
  logos: LogoInfo[];
  favicon: LogoInfo | null;
  appleTouchIcon: LogoInfo | null;
  primary: LogoInfo | null;
}

export async function extractLogos(page: Page, baseUrl: string): Promise<LogoResult> {
  const logos = await page.evaluate((base) => {
    const results: Array<{
      src: string;
      alt: string;
      type: string;
      width?: number;
      height?: number;
      score: number;
    }> = [];
    const foundSrcs = new Set<string>();
    
    const logoSelectors = [
      'header img[src*="logo" i]',
      'header img[alt*="logo" i]',
      '.logo img',
      '#logo img',
      'img[class*="logo" i]',
      'img[id*="logo" i]',
      'img[src*="logo" i]',
      'img[alt*="logo" i]',
      'a[href="/"] img',
      'header a img',
      '.header img',
      '.navbar-brand img',
      '.site-logo img',
    ];

    logoSelectors.forEach((selector, index) => {
      document.querySelectorAll(selector).forEach(img => {
        const imgEl = img as HTMLImageElement;
        const src = imgEl.src;
        
        if (!src || foundSrcs.has(src)) return;
        if (src.includes('data:image/gif')) return;
        
        foundSrcs.add(src);
        
        let score = 100 - index * 5;
        if (src.includes('.svg')) score += 20;
        if (imgEl.closest('header')) score += 15;
        if (imgEl.className && imgEl.className.toLowerCase().includes('logo')) score += 10;
        if (imgEl.id && imgEl.id.toLowerCase().includes('logo')) score += 10;
        if (imgEl.alt && imgEl.alt.toLowerCase().includes('logo')) score += 10;
        if (src.toLowerCase().includes('logo')) score += 10;
        if (imgEl.naturalWidth < 50 || imgEl.naturalHeight < 20) score -= 30;
        if (imgEl.naturalWidth > 500) score -= 20;
        
        results.push({
          src,
          alt: imgEl.alt || '',
          type: 'logo',
          width: imgEl.naturalWidth || undefined,
          height: imgEl.naturalHeight || undefined,
          score,
        });
      });
    });

    const faviconLink = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]') as HTMLLinkElement | null;
    let favicon = null;
    if (faviconLink && faviconLink.href) {
      try {
        favicon = {
          src: new URL(faviconLink.href, base).href,
          alt: 'favicon',
          type: 'favicon',
          score: 0,
        };
      } catch {}
    }

    const appleTouchLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement | null;
    let appleTouchIcon = null;
    if (appleTouchLink && appleTouchLink.href) {
      try {
        appleTouchIcon = {
          src: new URL(appleTouchLink.href, base).href,
          alt: 'apple-touch-icon',
          type: 'apple-touch-icon',
          score: 0,
        };
      } catch {}
    }

    return {
      logos: results.sort((a, b) => b.score - a.score),
      favicon,
      appleTouchIcon,
    };
  }, baseUrl);

  const logoInfos: LogoInfo[] = logos.logos.map(({ score, ...rest }) => ({
    ...rest,
    type: rest.type as LogoInfo['type'],
  }));

  return {
    logos: logoInfos,
    favicon: logos.favicon as LogoInfo | null,
    appleTouchIcon: logos.appleTouchIcon as LogoInfo | null,
    primary: logoInfos[0] || null,
  };
}

export async function downloadLogo(
  logo: LogoInfo,
  outputDir: string,
  filename?: string
): Promise<string | null> {
  try {
    const response = await axios.get(logo.src, {
      responseType: 'arraybuffer',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const contentType = response.headers['content-type'] || '';
    let ext = '.png';
    if (contentType.includes('svg')) ext = '.svg';
    else if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = '.jpg';
    else if (contentType.includes('png')) ext = '.png';
    else if (contentType.includes('ico')) ext = '.ico';
    else if (contentType.includes('webp')) ext = '.webp';
    else {
      const urlExt = path.extname(new URL(logo.src).pathname);
      if (urlExt) ext = urlExt;
    }

    const name = filename || `logo-${logo.type}`;
    const filePath = path.join(outputDir, `${name}${ext}`);
    
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(filePath, response.data);
    
    return filePath;
  } catch (error) {
    console.error(`Failed to download logo from ${logo.src}:`, error);
    return null;
  }
}
