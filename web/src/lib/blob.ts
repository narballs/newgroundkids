import { put, del, list, type PutBlobResult } from "@vercel/blob";

/**
 * Vercel Blob utilities for image management
 *
 * Environment variable required:
 * BLOB_READ_WRITE_TOKEN - Get from Vercel Dashboard > Storage > Blob
 */

export type ImageCategory =
  | "hero"
  | "gallery"
  | "team"
  | "backgrounds"
  | "birthday"
  | "camps"
  | "events"
  | "logos";

/**
 * Upload an image to Vercel Blob
 */
export async function uploadImage(
  file: File | Blob,
  filename: string,
  category: ImageCategory
): Promise<PutBlobResult> {
  const pathname = `images/${category}/${filename}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false, // Keep original filename
  });

  return blob;
}

/**
 * Delete an image from Vercel Blob
 */
export async function deleteImage(url: string): Promise<void> {
  await del(url);
}

/**
 * List all images in a category
 */
export async function listImages(category?: ImageCategory) {
  const prefix = category ? `images/${category}/` : "images/";
  const { blobs } = await list({ prefix });
  return blobs;
}

/**
 * Get the optimized URL for Next.js Image component
 * Vercel Blob URLs work directly with next/image optimization
 */
export function getBlobImageUrl(
  category: ImageCategory,
  filename: string,
  baseUrl: string
): string {
  return `${baseUrl}/images/${category}/${filename}`;
}

/**
 * Image URL constants for easy imports
 * Update these after uploading images to blob
 */
export const BLOB_IMAGES = {
  // Will be populated after migration
  // Example:
  // hero: {
  //   main: 'https://xxx.public.blob.vercel-storage.com/images/hero/main.jpg',
  // },
} as const;
