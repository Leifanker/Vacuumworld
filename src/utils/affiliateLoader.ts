// src/utils/affiliateLoader.ts
export type AffiliateData = Record<string, any>;

// Import every JSON under /content/posts at build time
// Absolute path from project root works in Vite.
const modules = import.meta.glob('/content/posts/*.json', {
  eager: true,
  import: 'default', // give us the default export directly
});

// Build an in-memory index: [{ slug, data }]
type Entry = { slug: string; data: AffiliateData };
const index: Entry[] = Object.entries(modules).map(([path, data]) => {
  const slug = path.split('/').pop()!.replace('.json', '');
  return { slug, data: data as AffiliateData };
});

// ---- named exports (this is what your route imports) ----
export function getAffiliateSlugs(): string[] {
  return index.map((x) => x.slug);
}

export function getAffiliateBySlug(slug: string): AffiliateData | undefined {
  return index.find((x) => x.slug === slug)?.data;
}

export function getAffiliateIndex(): Entry[] {
  return index;
}
