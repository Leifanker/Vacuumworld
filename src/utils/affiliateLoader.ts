export type AffiliateData = Record<string, any>;
const BASE = "/affposts";

function cacheBust(url: string) {
  const u = new URL(url, window.location.origin);
  u.searchParams.set("_v", String(Date.now()));
  return u.toString();
}

async function fetchJson(url: string) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(cacheBust(url), { cache: "no-store", signal: ctrl.signal });
    const text = await res.text();
    if (!res.ok) {
      console.error("[affposts] HTTP", res.status, url, text.slice(0, 140));
      return undefined;
    }
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("[affposts] JSON parse error from", url, "body head:", text.slice(0, 140));
      return undefined;
    }
  } catch (e) {
    console.error("[affposts] fetch error", url, e);
    return undefined;
  } finally {
    clearTimeout(t);
  }
}

export async function fetchAffiliateIndex(): Promise<string[]> {
  const json = await fetchJson(`${BASE}/index.json`);
  if (!json) return [];
  if (Array.isArray(json)) return json.filter(Boolean);
  if (Array.isArray(json.slugs)) return json.slugs.filter(Boolean);
  if (Array.isArray(json.posts)) return json.posts.map((p: any) => p?.slug).filter(Boolean);
  console.warn("[affposts] index.json unexpected shape:", json);
  return [];
}

export async function fetchAffiliateBySlug(slug: string): Promise<AffiliateData | undefined> {
  return (await fetchJson(`${BASE}/${slug}.json`)) as AffiliateData | undefined;
}
