/**
 * Migration script to upload existing images to Vercel Blob
 *
 * Run with: node --env-file=.env.local scripts/migrate-to-blob.mjs
 *
 * Requires BLOB_READ_WRITE_TOKEN in .env.local
 */

import { put, list } from "@vercel/blob";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Category mapping for existing public/images folders
const CATEGORY_MAP = {
  birthday: "birthday",
  camps: "camps",
  events: "events",
  hero: "hero",
  home: "gallery",
};

// Files to skip (keep in public for fast loading)
const SKIP_FILES = [
  "favicon.ico",
  "logo.png",
  "logo-white.png",
  ".DS_Store",
  "Thumbs.db",
];

const SKIP_EXTENSIONS = [".svg"];

async function migrateImages() {
  const publicImagesDir = path.join(__dirname, "..", "public", "images");
  const results = {
    uploaded: [],
    skipped: [],
    errors: [],
  };

  console.log("🚀 Starting migration to Vercel Blob...\n");

  // Check for existing blobs
  const { blobs: existingBlobs } = await list({ prefix: "images/" });
  const existingPaths = new Set(existingBlobs.map((b) => b.pathname));
  console.log(`Found ${existingBlobs.length} existing blobs\n`);

  // Process each category folder
  for (const [folder, category] of Object.entries(CATEGORY_MAP)) {
    const folderPath = path.join(publicImagesDir, folder);

    if (!fs.existsSync(folderPath)) {
      console.log(`⏭️  Skipping ${folder} (folder not found)`);
      continue;
    }

    console.log(`📁 Processing ${folder} → ${category}...`);

    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      // Skip certain files
      if (SKIP_FILES.includes(file)) {
        results.skipped.push(`${folder}/${file}`);
        continue;
      }

      const ext = path.extname(file).toLowerCase();
      if (SKIP_EXTENSIONS.includes(ext)) {
        results.skipped.push(`${folder}/${file}`);
        continue;
      }

      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);

      if (!stat.isFile()) continue;

      const pathname = `images/${category}/${file}`;

      // Skip if already uploaded
      if (existingPaths.has(pathname)) {
        console.log(`   ⏭️  ${file} (already exists)`);
        results.skipped.push(pathname);
        continue;
      }

      try {
        const fileBuffer = fs.readFileSync(filePath);
        const blob = await put(pathname, fileBuffer, {
          access: "public",
          addRandomSuffix: false,
        });

        console.log(`   ✅ ${file} → ${blob.url}`);
        results.uploaded.push(blob.url);
      } catch (error) {
        console.log(`   ❌ ${file} failed: ${error}`);
        results.errors.push(`${folder}/${file}`);
      }
    }

    console.log("");
  }

  // Also process root-level images
  console.log("📁 Processing root images...");
  const rootFiles = fs.readdirSync(publicImagesDir);

  for (const file of rootFiles) {
    const filePath = path.join(publicImagesDir, file);
    const stat = fs.statSync(filePath);

    if (!stat.isFile()) continue;
    if (SKIP_FILES.includes(file)) continue;

    const ext = path.extname(file).toLowerCase();
    if (SKIP_EXTENSIONS.includes(ext)) continue;

    const pathname = `images/backgrounds/${file}`;

    if (existingPaths.has(pathname)) {
      console.log(`   ⏭️  ${file} (already exists)`);
      results.skipped.push(pathname);
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const blob = await put(pathname, fileBuffer, {
        access: "public",
        addRandomSuffix: false,
      });

      console.log(`   ✅ ${file} → ${blob.url}`);
      results.uploaded.push(blob.url);
    } catch (error) {
      console.log(`   ❌ ${file} failed: ${error}`);
      results.errors.push(file);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Migration Summary");
  console.log("=".repeat(50));
  console.log(`✅ Uploaded: ${results.uploaded.length}`);
  console.log(`⏭️  Skipped:  ${results.skipped.length}`);
  console.log(`❌ Errors:   ${results.errors.length}`);

  if (results.uploaded.length > 0) {
    console.log("\n📝 Uploaded URLs:");
    results.uploaded.forEach((url) => console.log(`   ${url}`));
  }

  if (results.errors.length > 0) {
    console.log("\n⚠️  Failed files:");
    results.errors.forEach((f) => console.log(`   ${f}`));
  }
}

migrateImages().catch(console.error);
