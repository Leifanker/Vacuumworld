import { Link } from "react-router-dom";
import { getAffiliateIndex } from "@/utils/affiliateLoader";

export default function AffiliateIndexRoute() {
  const items = getAffiliateIndex();
  return (
    <div style={{ padding: 24 }}>
      <h2>Affiliate posts</h2>
      <ul>
        {items.map(({ slug, data }) => (
          <li key={slug}>
            <Link to={`/posts/${slug}`}>{data?.seo?.meta_title_template || slug}</Link>
          </li>
        ))}
      </ul>
      {!items.length && <p>No JSON posts were loaded. Check the folder and glob.</p>}
    </div>
  );
}
