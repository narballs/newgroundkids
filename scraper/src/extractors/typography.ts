import type { Page } from 'playwright';

export interface FontStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface Typography {
  headings: FontStyle | null;
  body: FontStyle | null;
  navigation: FontStyle | null;
  buttons: FontStyle | null;
  allFonts: string[];
  googleFonts: string[];
}

function cleanFontFamily(family: string): string {
  return family
    .replace(/['"]/g, '')
    .split(',')
    .map(f => f.trim())
    .filter(f => f.length > 0)
    .join(', ');
}

function extractGoogleFonts(fonts: string[]): string[] {
  const systemFonts = [
    'arial', 'helvetica', 'times', 'times new roman', 'courier', 
    'courier new', 'verdana', 'georgia', 'palatino', 'garamond',
    'bookman', 'comic sans ms', 'trebuchet ms', 'impact',
    'system-ui', '-apple-system', 'blinkmacsystemfont', 'segoe ui',
    'roboto', 'sans-serif', 'serif', 'monospace', 'ui-sans-serif',
    'ui-serif', 'ui-monospace'
  ];

  const googleFonts = new Set<string>();
  
  fonts.forEach(fontStack => {
    const families = fontStack.toLowerCase().split(',').map(f => f.trim().replace(/['"]/g, ''));
    families.forEach(family => {
      if (!systemFonts.includes(family) && family.length > 0) {
        const properName = fontStack
          .split(',')[0]
          .trim()
          .replace(/['"]/g, '');
        if (properName && !systemFonts.includes(properName.toLowerCase())) {
          googleFonts.add(properName);
        }
      }
    });
  });

  return Array.from(googleFonts);
}

const EXTRACT_TYPOGRAPHY_SCRIPT = `
  (() => {
    const getFontStyle = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      
      const style = getComputedStyle(el);
      return {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
      };
    };

    const allFonts = new Set();
    document.querySelectorAll('*').forEach(el => {
      const fontFamily = getComputedStyle(el).fontFamily;
      if (fontFamily) allFonts.add(fontFamily);
    });

    const googleFontLinks = [];
    document.querySelectorAll('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href) googleFontLinks.push(href);
    });

    const fontFaces = [];
    try {
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          Array.from(sheet.cssRules || []).forEach(rule => {
            if (rule instanceof CSSFontFaceRule) {
              const family = rule.style.getPropertyValue('font-family');
              if (family) fontFaces.push(family.replace(/['"]/g, ''));
            }
          });
        } catch (e) {}
      });
    } catch (e) {}

    return {
      headings: getFontStyle('h1') || getFontStyle('h2') || getFontStyle('h3'),
      body: getFontStyle('p') || getFontStyle('body'),
      navigation: getFontStyle('nav a') || getFontStyle('header a') || getFontStyle('.nav a'),
      buttons: getFontStyle('button') || getFontStyle('.btn') || getFontStyle('[class*="button"]'),
      allFonts: Array.from(allFonts),
      googleFontLinks,
      fontFaces,
    };
  })()
`;

export async function extractTypography(page: Page): Promise<Typography> {
  const typography = await page.evaluate(EXTRACT_TYPOGRAPHY_SCRIPT) as {
    headings: FontStyle | null;
    body: FontStyle | null;
    navigation: FontStyle | null;
    buttons: FontStyle | null;
    allFonts: string[];
    googleFontLinks: string[];
    fontFaces: string[];
  };

  const cleanedFonts = typography.allFonts.map(cleanFontFamily);
  const googleFonts = extractGoogleFonts(cleanedFonts);

  return {
    headings: typography.headings ? {
      ...typography.headings,
      fontFamily: cleanFontFamily(typography.headings.fontFamily),
    } : null,
    body: typography.body ? {
      ...typography.body,
      fontFamily: cleanFontFamily(typography.body.fontFamily),
    } : null,
    navigation: typography.navigation ? {
      ...typography.navigation,
      fontFamily: cleanFontFamily(typography.navigation.fontFamily),
    } : null,
    buttons: typography.buttons ? {
      ...typography.buttons,
      fontFamily: cleanFontFamily(typography.buttons.fontFamily),
    } : null,
    allFonts: [...new Set(cleanedFonts)],
    googleFonts,
  };
}
