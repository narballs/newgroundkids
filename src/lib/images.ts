/**
 * Vercel Blob Image URLs
 *
 * All images are served from Vercel Blob storage with automatic CDN.
 * Use with next/image for automatic optimization.
 */

const BLOB_BASE = "https://hflb0i32sg7a4vfl.public.blob.vercel-storage.com";

export const images = {
  // Hero section images
  hero: {
    slide1: `${BLOB_BASE}/images/hero/DSC00727.jpg`,
    slide2: `${BLOB_BASE}/images/hero/DSC00789.jpg`,
    slide3: `${BLOB_BASE}/images/hero/DSC00995.jpg`,
    slide4: `${BLOB_BASE}/images/hero/DSC06067.JPG`,
  },

  // Birthday party images
  birthday: {
    DSC00546: `${BLOB_BASE}/images/birthday/DSC00546.jpg`,
    DSC00549: `${BLOB_BASE}/images/birthday/DSC00549.jpg`,
    DSC00555: `${BLOB_BASE}/images/birthday/DSC00555.jpg`,
    DSC00556: `${BLOB_BASE}/images/birthday/DSC00556.jpg`,
    DSC00557: `${BLOB_BASE}/images/birthday/DSC00557.jpg`,
    DSC00559: `${BLOB_BASE}/images/birthday/DSC00559.jpg`,
    DSC00703: `${BLOB_BASE}/images/birthday/DSC00703.jpg`,
    DSC00727: `${BLOB_BASE}/images/birthday/DSC00727.jpg`,
    DSC00728: `${BLOB_BASE}/images/birthday/DSC00728.jpg`,
    DSC00766: `${BLOB_BASE}/images/birthday/DSC00766.jpg`,
    DSC00771: `${BLOB_BASE}/images/birthday/DSC00771.jpg`,
    DSC00789: `${BLOB_BASE}/images/birthday/DSC00789.jpg`,
    DSC00808: `${BLOB_BASE}/images/birthday/DSC00808.jpg`,
    DSC00821: `${BLOB_BASE}/images/birthday/DSC00821.jpg`,
    DSC00824: `${BLOB_BASE}/images/birthday/DSC00824.jpg`,
    DSC00995: `${BLOB_BASE}/images/birthday/DSC00995.jpg`,
    DSC06037: `${BLOB_BASE}/images/birthday/DSC06037%202.JPG`,
    DSC06039: `${BLOB_BASE}/images/birthday/DSC06039.JPG`,
    DSC06056: `${BLOB_BASE}/images/birthday/DSC06056%202.JPG`,
    DSC06057: `${BLOB_BASE}/images/birthday/DSC06057.JPG`,
    DSC06065: `${BLOB_BASE}/images/birthday/DSC06065.JPG`,
    DSC06067: `${BLOB_BASE}/images/birthday/DSC06067.JPG`,
    DSC06085: `${BLOB_BASE}/images/birthday/DSC06085.JPG`,
  },

  // Camps page images
  camps: {
    hero: `${BLOB_BASE}/images/camps/hero.jpg`,
    training1: `${BLOB_BASE}/images/camps/training-1.jpg`,
    training2: `${BLOB_BASE}/images/camps/training-2.jpg`,
  },

  // Events page images
  events: {
    hero: `${BLOB_BASE}/images/events/hero.jpg`,
    action1: `${BLOB_BASE}/images/events/action-1.jpg`,
    venue1: `${BLOB_BASE}/images/events/venue-1.jpg`,
  },

  // Home/gallery images
  gallery: {
    DSC00789: `${BLOB_BASE}/images/gallery/DSC00789.jpg`,
    DSC00808: `${BLOB_BASE}/images/gallery/DSC00808.jpg`,
    DSC00995: `${BLOB_BASE}/images/gallery/DSC00995.jpg`,
    DSC06057: `${BLOB_BASE}/images/gallery/DSC06057.JPG`,
  },

  // Background images
  backgrounds: {
    about: `${BLOB_BASE}/images/backgrounds/about-bg.jpg`,
    cta: `${BLOB_BASE}/images/backgrounds/cta-bg.jpg`,
    hero: `${BLOB_BASE}/images/backgrounds/hero-bg.jpg`,
    programs: `${BLOB_BASE}/images/backgrounds/programs-bg.jpg`,
  },
} as const;

// Helper to get all birthday images as array (useful for galleries)
export const birthdayGallery = Object.values(images.birthday);

// Helper to get all hero images as array (useful for carousels)
export const heroSlides = Object.values(images.hero);

export type ImageCategory = keyof typeof images;
