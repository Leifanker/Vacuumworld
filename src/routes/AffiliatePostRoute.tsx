import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthorBox from "@/components/AuthorBox";
import InternalLinks from "@/components/InternalLinks";
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

  // Breadcrumb data
  const breadcrumbs = [
    { label: 'Blog', href: '/#blog' },
    { label: seoTitle, current: true }
  ];

  // Internal links for better SEO
  const internalLinks = [
    {
      title: "Best Vacuum Sealers 2025 (Home Use)",
      href: "/posts/best-vacuum-sealers-2025",
      description: "Complete buyer's guide with top picks for every budget and use case.",
      category: "guide" as const
    },
    {
      title: "Vacuum Sealing Meat: Complete Guide",
      href: "/posts/best-vacumes-for-meat",
      description: "Expert tips for sealing meat safely with recommended equipment.",
      category: "guide" as const
    },
    {
      title: "What Is Vacuum Packaging?",
      href: "/posts/what-is-vacuum-packaging",
      description: "Learn the basics of vacuum packaging and when to use it.",
      category: "guide" as const
    }
  ];

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.vacuumworld.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.vacuumworld.net/#blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": seoTitle,
        "item": canonicalUrl
      }
    ]
  };

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
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-pink-50/40 via-purple-50/40 to-yellow-50/40 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10">
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Main Content */}
        {isReview ? (
          <ReviewPost data={data} />
        ) : isEducational ? (
          <EducationalPost data={data} />
        ) : (
          <AffiliatePost data={data} />
        )}

        {/* Author Box */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <AuthorBox
            author={data?.metadata?.author}
            publishDate={data?.metadata?.publish_date}
            lastUpdated={data?.metadata?.last_updated}
            experience="Tested 50+ vacuum sealers and storage solutions for home cooks and professionals"
          />
        </div>

        {/* Internal Links */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
          <InternalLinks links={internalLinks} />
        </div>
      </div>
    </>
  );
}