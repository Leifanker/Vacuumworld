import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAffiliateIndex, fetchAffiliateBySlug } from "@/utils/affiliateLoader";

export default function AffiliateIndexRoute() {
  const [slugs, setSlugs] = useState<string[] | null>(null);
  const [titles, setTitles] = useState<Record<string, string>>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      const s = await fetchAffiliateIndex();
      if (!alive) return;
      console.log("[affposts] index slugs:", s);
      setSlugs(s);

      const pairs = await Promise.all(
        s.map(async (slug) => {
          const data = await fetchAffiliateBySlug(slug);
          return [slug, data?.seo?.meta_title_template || slug] as const;
        })
      );
      if (!alive) return;
      setTitles(Object.fromEntries(pairs));
    })();
    return () => { alive = false; };
  }, []);

  if (slugs === null) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!slugs.length) return <div style={{ padding: 24 }}>No JSON posts were loaded. Check the folder and filename.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Affiliate posts</h2>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <Link to={`/posts/${slug}`}>{titles[slug] || slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
