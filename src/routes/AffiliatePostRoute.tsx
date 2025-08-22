// src/routes/AffiliatePostRoute.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AffiliatePost from "@/components/AffiliatePost";
import { fetchAffiliateBySlug } from "@/utils/affiliateLoader";

export default function AffiliatePostRoute() {
  const { slug } = useParams();
  const [data, setData] = useState<any | null>(null);
  const [status, setStatus] = useState<"loading"|"error"|"ok">("loading");

  useEffect(() => {
    (async () => {
      if (!slug) return setStatus("error");
      const d = await fetchAffiliateBySlug(slug);
      if (!d) return setStatus("error");
      setData(d);
      setStatus("ok");
    })();
  }, [slug]);

  if (status === "loading") return <div style={{ padding: 24 }}>Loading…</div>;
  if (status === "error" || !data) return <div style={{ padding: 24 }}>Post not found.</div>;
  return <AffiliatePost data={data} />;
}
