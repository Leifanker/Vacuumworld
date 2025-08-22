// src/utils/affiliateLoader.ts
export type AffiliateData = Record<string, any>;
const BASE = "/affposts";

export async function fetchAffiliateIndex(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE}/index.json`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.slugs) ? json.slugs : [];
  } catch {
    return [];
  }
}

export async function fetchAffiliateBySlug(slug: string): Promise<AffiliateData | undefined> {
  try {
    const res = await fetch(`${BASE}/${slug}.json`, { cache: "no-store" });
    if (!res.ok) return undefined;
    return await res.json();
  } catch {
    return undefined;
  }
}
