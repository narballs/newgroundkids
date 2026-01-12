import type { Page } from 'playwright';

export interface ColorPalette {
  primary: string | null;
  secondary: string | null;
  accent: string | null;
  background: string | null;
  text: string | null;
  textLight: string | null;
  cssVariables: Record<string, string>;
  elementColors: {
    buttons: string[];
    links: string[];
    navigation: string[];
    headings: string[];
    backgrounds: string[];
  };
}

function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function isValidColor(color: string | null): boolean {
  if (!color) return false;
  if (color === 'transparent' || color === 'inherit' || color === 'initial') return false;
  if (color.includes('rgba') && color.includes(', 0)')) return false;
  return true;
}

function uniqueColors(colors: (string | null)[]): string[] {
  const unique = new Set<string>();
  colors.forEach(c => {
    if (isValidColor(c)) {
      const hex = c!.startsWith('#') ? c! : rgbToHex(c!);
      if (hex) unique.add(hex.toLowerCase());
    }
  });
  return Array.from(unique);
}

// Use string evaluation to avoid esbuild __name issues
const EXTRACT_COLORS_SCRIPT = `
  (() => {
    const getComputedColor = (el, prop) => getComputedStyle(el).getPropertyValue(prop);

    const getColors = (selector, props) => {
      const elements = document.querySelectorAll(selector);
      const colors = [];
      elements.forEach(el => {
        props.forEach(prop => {
          const color = getComputedColor(el, prop);
          if (color) colors.push(color);
        });
      });
      return colors;
    };

    const cssVars = {};
    const root = document.documentElement;
    const rootStyles = getComputedStyle(root);
    
    const commonVarNames = [
      '--primary', '--primary-color', '--brand-primary', '--color-primary',
      '--secondary', '--secondary-color', '--brand-secondary', '--color-secondary',
      '--accent', '--accent-color', '--brand-accent', '--color-accent',
      '--background', '--bg', '--bg-color', '--background-color',
      '--text', '--text-color', '--color-text', '--foreground',
      '--dark', '--light', '--white', '--black',
      '--heading-color', '--body-color', '--link-color',
    ];

    commonVarNames.forEach(varName => {
      const value = rootStyles.getPropertyValue(varName).trim();
      if (value) cssVars[varName] = value;
    });

    try {
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          Array.from(sheet.cssRules || []).forEach(rule => {
            if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
              const style = rule.style;
              for (let i = 0; i < style.length; i++) {
                const prop = style[i];
                if (prop.startsWith('--')) {
                  cssVars[prop] = style.getPropertyValue(prop).trim();
                }
              }
            }
          });
        } catch (e) {}
      });
    } catch (e) {}

    return {
      cssVariables: cssVars,
      buttons: getColors('button, .btn, [class*="button"], [class*="btn"], a[class*="cta"]', 
        ['background-color', 'color', 'border-color']),
      links: getColors('a', ['color']),
      navigation: getColors('nav, header, .nav, .navbar, .header', 
        ['background-color', 'color']),
      headings: getColors('h1, h2, h3', ['color']),
      backgrounds: getColors('body, main, section, .hero, [class*="hero"]', 
        ['background-color']),
    };
  })()
`;

export async function extractColors(page: Page): Promise<ColorPalette> {
  const colors = await page.evaluate(EXTRACT_COLORS_SCRIPT) as {
    cssVariables: Record<string, string>;
    buttons: string[];
    links: string[];
    navigation: string[];
    headings: string[];
    backgrounds: string[];
  };

  // Process and dedupe colors
  const buttonColors = uniqueColors(colors.buttons);
  const linkColors = uniqueColors(colors.links);
  const navColors = uniqueColors(colors.navigation);
  const headingColors = uniqueColors(colors.headings);
  const bgColors = uniqueColors(colors.backgrounds);

  const primary = buttonColors[0] || linkColors[0] || null;
  const secondary = buttonColors[1] || navColors.find(c => c !== primary) || null;
  const accent = buttonColors[2] || linkColors.find(c => c !== primary && c !== secondary) || null;
  
  const background = bgColors.find(c => 
    c === '#ffffff' || c === '#fff' || c === '#f5f5f5' || c === '#fafafa'
  ) || bgColors[0] || null;
  
  const text = headingColors[0] || '#333333';
  const textLight = headingColors[1] || '#666666';

  return {
    primary,
    secondary,
    accent,
    background,
    text,
    textLight,
    cssVariables: colors.cssVariables,
    elementColors: {
      buttons: buttonColors,
      links: linkColors,
      navigation: navColors,
      headings: headingColors,
      backgrounds: bgColors,
    },
  };
}
