// src/utils/affiliateLoader.ts
export type AffiliateData = Record<string, any>;

// Try multiple glob roots to be safe across setups
const a = import.meta.glob('../../content/posts/*.json', { eager: true, import: 'default' });
const b = import.meta.glob('/content/posts/*.json', { eager: true, import: 'default' });
const c = import.meta.glob('/**/content/posts/*.json', { eager: true, import: 'default' });

// Merge all matches
const modules: Record<string, unknown> = { ...a, ...b, ...c };

type Entry = { slug: string; data: AffiliateData };
const index: Entry[] = Object.entries(modules).map(([path, data]) => {
  const file = path.split('/').pop()!;           // e.g. best-vacuum-sealers-2025.json
  const slug = file.replace(/\.json$/i, '');     // e.g. best-vacuum-sealers-2025
  return { slug, data: data as AffiliateData };
});

export function getAffiliateSlugs(): string[] {
  return index.map(x => x.slug);
}
export function getAffiliateBySlug(slug: string): AffiliateData | undefined {
  return index.find(x => x.slug === slug)?.data;
}
export function getAffiliateIndex(): Entry[] {
  return index;
}

// (optional) quick debug:
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.log('[AffiliateLoader] slugs:', getAffiliateSlugs());
}
