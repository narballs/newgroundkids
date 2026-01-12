import type { Page } from 'playwright';
import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';
import Vibrant from 'node-vibrant';

export interface ImageInfo {
  src: string;
  alt: string;
  type: 'hero' | 'background' | 'product' | 'general';
  width?: number;
  height?: number;
  localPath?: string;
  dominantColors?: {
    vibrant?: string;
    muted?: string;
    darkVibrant?: string;
    darkMuted?: string;
    lightVibrant?: string;
    lightMuted?: string;
  };
}

export async function extractImages(page: Page, baseUrl: string): Promise<ImageInfo[]> {
  const images = await page.evaluate((base) => {
    const results: Array<{
      src: string;
      alt: string;
      type: string;
      width?: number;
      height?: number;
    }> = [];
    const foundSrcs = new Set<string>();

    const heroSelectors = [
      '.hero img',
      '[class*="hero"] img',
      '#hero img',
      '.banner img',
      '[class*="banner"] img',
      '.slider img',
      '.carousel img',
      'section:first-of-type img',
    ];

    heroSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(img => {
        const imgEl = img as HTMLImageElement;
        const src = imgEl.src;
        
        if (!src || foundSrcs.has(src)) return;
        if (src.includes('data:')) return;
        if (imgEl.naturalWidth < 200) return;
        
        foundSrcs.add(src);
        results.push({
          src,
          alt: imgEl.alt || '',
          type: 'hero',
          width: imgEl.naturalWidth || undefined,
          height: imgEl.naturalHeight || undefined,
        });
      });
    });

    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      const bgImage = style.backgroundImage;
      
      if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
        const match = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (match && match[1]) {
          let src = match[1];
          if (!src.startsWith('http') && !src.startsWith('data:')) {
            try {
              src = new URL(src, base).href;
            } catch {
              return;
            }
          }
          
          if (!foundSrcs.has(src) && !src.includes('data:')) {
            foundSrcs.add(src);
            results.push({
              src,
              alt: '',
              type: 'background',
            });
          }
        }
      }
    });

    document.querySelectorAll('img').forEach(img => {
      const imgEl = img as HTMLImageElement;
      const src = imgEl.src;
      
      if (!src || foundSrcs.has(src)) return;
      if (src.includes('data:')) return;
      if (imgEl.naturalWidth < 300 || imgEl.naturalHeight < 200) return;
      
      if (imgEl.className && imgEl.className.toLowerCase().includes('logo')) return;
      if (imgEl.alt && imgEl.alt.toLowerCase().includes('logo')) return;
      if (src.toLowerCase().includes('logo')) return;
      
      foundSrcs.add(src);
      results.push({
        src,
        alt: imgEl.alt || '',
        type: 'general',
        width: imgEl.naturalWidth || undefined,
        height: imgEl.naturalHeight || undefined,
      });
    });

    return results;
  }, baseUrl);

  return images.map(img => ({
    ...img,
    type: img.type as ImageInfo['type'],
  }));
}

export async function downloadImage(
  image: ImageInfo,
  outputDir: string,
  filename: string
): Promise<string | null> {
  try {
    const response = await axios.get(image.src, {
      responseType: 'arraybuffer',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const contentType = response.headers['content-type'] || '';
    let ext = '.jpg';
    if (contentType.includes('png')) ext = '.png';
    else if (contentType.includes('webp')) ext = '.webp';
    else if (contentType.includes('gif')) ext = '.gif';
    else if (contentType.includes('svg')) ext = '.svg';
    else {
      const urlExt = path.extname(new URL(image.src).pathname);
      if (urlExt) ext = urlExt;
    }

    const filePath = path.join(outputDir, `${filename}${ext}`);
    
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(filePath, response.data);
    
    return filePath;
  } catch (error) {
    console.error(`Failed to download image from ${image.src}:`, error);
    return null;
  }
}

export async function extractDominantColors(
  imagePath: string
): Promise<ImageInfo['dominantColors']> {
  try {
    const palette = await Vibrant.from(imagePath).getPalette();
    
    return {
      vibrant: palette.Vibrant?.hex,
      muted: palette.Muted?.hex,
      darkVibrant: palette.DarkVibrant?.hex,
      darkMuted: palette.DarkMuted?.hex,
      lightVibrant: palette.LightVibrant?.hex,
      lightMuted: palette.LightMuted?.hex,
    };
  } catch (error) {
    console.error(`Failed to extract colors from ${imagePath}:`, error);
    return undefined;
  }
}
