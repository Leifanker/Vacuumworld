// src/utils/affiliateLoader.ts
export type AffiliateData = Record<string, any>;

const a = import.meta.glob('../../content/posts/*.json', { eager: true, import: 'default' });
const b = import.meta.glob('/content/posts/*.json', { eager: true, import: 'default' });
const c = import.meta.glob('/**/content/posts/*.json', { eager: true, import: 'default' });

const modules: Record<string, unknown> = { ...a, ...b, ...c };

type Entry = { slug: string; data: AffiliateData };
const index: Entry[] = Object.entries(modules).map(([path, data]) => {
  const file = path.split('/').pop()!;
  const slug = file.replace(/\.json$/i, '');
  return { slug, data: data as AffiliateData };
});

export function getAffiliateSlugs(): string[] { return index.map(x => x.slug); }
export function getAffiliateBySlug(slug: string): AffiliateData | undefined { return index.find(x => x.slug === slug)?.data; }
export function getAffiliateIndex(): Entry[] { return index; }

// Debug in browser console
if (typeof window !== 'undefined') console.log('[AffiliateLoader] slugs:', getAffiliateSlugs());
