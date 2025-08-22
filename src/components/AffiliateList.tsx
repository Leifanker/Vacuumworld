import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAffiliateIndex, fetchAffiliateBySlug } from "@/utils/affiliateLoader";

export default function AffiliateList() {
  const [items, setItems] = useState<{ slug: string; title: string }[]>([]);

  useEffect(() => {
    (async () => {
      const slugs = await fetchAffiliateIndex();
      const data = await Promise.all(
        slugs.map(async (slug) => {
          const d = await fetchAffiliateBySlug(slug);
          return { slug, title: d?.seo?.meta_title_template || slug };
        })
      );
      setItems(data);
    })();
  }, []);

  return (
    <ul>
      {items.map(({ slug, title }) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}
