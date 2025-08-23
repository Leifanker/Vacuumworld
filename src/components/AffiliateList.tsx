// e.g. src/components/AffiliateList.tsx
import { Link } from "react-router-dom";
import { fetchAffiliateIndex } from "@/utils/affiliateLoader";

export default function AffiliateList() {
  const items = fetchAffiliateIndex();
  return (
    <ul>
      {items.map(({ slug, data }) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>{data?.seo?.meta_title_template || slug}</Link>
        </li>
      ))}
    </ul>
  );
}
