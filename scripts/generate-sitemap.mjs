import fs from "fs";
import path from "path";

const SITE = "https://www.vacuumworld.net";
const PUBLIC_DIR = path.resolve("public");
const AFF_DIR = path.join(PUBLIC_DIR, "affposts");
const OUT = path.join(PUBLIC_DIR, "sitemap.xml");

// try index.json first; fall back to reading files in /public/affposts
function getPostSlugs() {
  const idxPath = path.join(AFF_DIR, "index.json");
  try {
    const idx = JSON.parse(fs.readFileSync(idxPath, "utf8"));
    // support { slugs: [...] } or simple array
    const slugs = Array.isArray(idx) ? idx : idx.slugs || [];
    return slugs.filter(Boolean);
  } catch {
    // fallback: read *.json filenames and strip .json
    return fs
      .readdirSync(AFF_DIR)
      .filter((f) => f.endsWith(".json") && f !== "index.json")
      .map((f) => f.replace(/\.json$/i, ""));
  }
}

const now = new Date().toISOString();
const staticUrls = [
  "/", "/posts" // add other static routes you want indexed
];

const postUrls = getPostSlugs().map(
  (slug) => `/posts/${slug}`
);

function urlTag(u) {
  return `
  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === "/" ? "1.0" : "0.7"}</priority>
  </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].map(urlTag).join("\n")}
</urlset>`.trim();

fs.writeFileSync(OUT, xml, "utf8");
console.log(`✓ sitemap written: ${OUT}`);
