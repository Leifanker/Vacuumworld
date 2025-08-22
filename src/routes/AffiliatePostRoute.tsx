import { useParams } from "react-router-dom";
import AffiliatePost from "@/components/AffiliatePost";
import { getAffiliateBySlug } from "@/utils/affiliateLoader";

export default function AffiliatePostRoute() {
  const { slug } = useParams();
  const data = slug ? getAffiliateBySlug(slug) : null;

  if (!data) return <div style={{ padding: 24 }}>Post not found.</div>;
  return <AffiliatePost data={data} />;
}
