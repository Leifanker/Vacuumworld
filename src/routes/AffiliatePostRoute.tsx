import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AffiliatePost from "@/components/AffiliatePost";
import ReviewPost from "@/components/ReviewPost";
import EducationalPost from "@/components/EducationalPost";
import { fetchAffiliateBySlug } from "@/utils/affiliateLoader";

type Status = "loading" | "ok" | "error";

export default function AffiliatePostRoute() {
  const { slug } = useParams();
  const { search } = useLocation();
  const debug = useMemo(
    () => new URLSearchParams(search).get("debug") === "1",
    [search]
  );

  const [data, setData] = useState<any | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let alive = true;
    (async () => {
      console.log("[affposts] slug param:", slug);
      if (!slug) {
        setStatus("error");
        return;
      }
      const d = await fetchAffiliateBySlug(slug);
      console.log("[affposts] fetched JSON:", d);
      if (!alive) return;
      if (!d) {
        setStatus("error");
        return;
      }
      setData(d);
      setStatus("ok");
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (status === "loading") return <div style={{ padding: 24 }}>Loading…</div>;
  if (status === "error" || !data) return <div style={{ padding: 24 }}>Post not found.</div>;

  // Generate SEO data
  const seoTitle = data?.seo?.meta_title_template || data?.product?.name || data?.metadata?.title || "VacuumWorld";
  const seoDescription = data?.seo?.meta_description_template || data?.metadata?.meta_description || "";
  const canonicalUrl = `https://www.vacuumworld.net/posts/${slug}`;
  const ogTitle = data?.seo?.og_title_template || seoTitle;
  const ogDescription = data?.seo?.og_description_template || seoDescription;
  const ogImage = data?.seo?.og_image_url || data?.product?.images?.[0] || data?.product?.image_url || data?.metadata?.featured_image?.src;

  if (debug) {
    return (
      <>
        <Helmet>
          <title>Debug: {seoTitle}</title>
        </Helmet>
      <pre style={{ padding: 24, whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
      </>
    );
  }

  const isReview =
    String((data as any)?.template || "").toLowerCase() === "review";
  const isEducational =
    String((data as any)?.template || "").toLowerCase() === "educational" ||
    String((data as any)?.post_type || "").toLowerCase() === "educational";

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:site_name" content="VacuumWorld" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        
        {/* Article specific */}
        {data?.metadata?.author && <meta name="author" content={data.metadata.author} />}
        {data?.metadata?.publish_date && <meta property="article:published_time" content={data.metadata.publish_date} />}
        {data?.metadata?.last_updated && <meta property="article:modified_time" content={data.metadata.last_updated} />}
        {data?.seo?.primary_keyword && <meta name="keywords" content={data.seo.primary_keyword} />}
      </Helmet>
      
      {isReview ? (
        <ReviewPost data={data} />
      ) : isEducational ? (
        <EducationalPost data={data} />
      ) : (
        <AffiliatePost data={data} />
      )}
    </>
  );
}
