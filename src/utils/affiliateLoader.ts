export type AffiliateData = Record<string, any>;
const BASE = "/affposts";

async function fetchJson(url: string) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000); // 8s timeout
  try {
    const res = await fetch(url, { cache: "no-store", signal: ctrl.signal });
    const text = await res.text(); // read once for better error visibility
    if (!res.ok) {
      console.error("[affposts] HTTP", res.status, url, text.slice(0, 120));
      return undefined;
    }
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      console.error("[affposts] Expected JSON, got", ct, "from", url, "body head:", text.slice(0, 120));
      try { return JSON.parse(text); } catch { return undefined; }
    }
    return JSON.parse(text);
  } catch (e) {
    console.error("[affposts] fetch error", url, e);
    return undefined;
  } finally {
    clearTimeout(t);
  }
}

export async function fetchAffiliateIndex(): Promise<string[]> {
  const json = await fetchJson(`${BASE}/index.json`);
  return json && Array.isArray(json.slugs) ? json.slugs : [];
}

export async function fetchAffiliateBySlug(slug: string): Promise<AffiliateData | undefined> {
  return fetchJson(`${BASE}/${slug}.json`);
}
