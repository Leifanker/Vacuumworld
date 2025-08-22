import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAffiliateIndex, fetchAffiliateBySlug } from "@/utils/affiliateLoader";

export default function AffiliateIndexRoute() {
  const [slugs, setSlugs] = useState<string[] | null>(null);
  const [titles, setTitles] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const s = await fetchAffiliateIndex();
      setSlugs(s);
      const pairs = await Promise.all(
        s.map(async (slug) => {
          const data = await fetchAffiliateBySlug(slug);
          return [slug, data?.seo?.meta_title_template || slug] as const;
        })
      );
      setTitles(Object.fromEntries(pairs));
    })();
  }, []);

  if (slugs === null) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!slugs.length) return <div style={{ padding: 24 }}>
    No posts yet. Add slugs to <code>/public/affposts/index.json</code>.
  </div>;

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
