import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AffiliatePost from "@/components/AffiliatePost";
import { fetchAffiliateBySlug } from "@/utils/affiliateLoader";

type Status = "loading" | "ok" | "error";

export default function AffiliatePostRoute() {
  const { slug } = useParams();
  const { search } = useLocation();
  const debug = useMemo(() => new URLSearchParams(search).get("debug") === "1", [search]);

  const [data, setData] = useState<any | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let alive = true;
    (async () => {
      console.log("[affposts] slug param:", slug);
      if (!slug) { setStatus("error"); return; }

      const d = await fetchAffiliateBySlug(slug);
      console.log("[affposts] fetched JSON:", d);
      if (!alive) return;

      if (!d) { setStatus("error"); return; }
      setData(d);
      setStatus("ok");
    })();

    return () => { alive = false; };
  }, [slug]);

  if (status === "loading") return <div style={{ padding: 24 }}>Loading…</div>;
  if (status === "error" || !data) return <div style={{ padding: 24 }}>Post not found.</div>;

  if (debug) {
    return (
      <pre style={{ padding: 24, whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  }

  return <AffiliatePost data={data} />;
}
