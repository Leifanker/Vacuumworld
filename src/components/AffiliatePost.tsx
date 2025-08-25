// src/components/AffiliatePost.tsx
import React from "react";

const Section = ({ id, title, children }: any) => (
  <section id={id} className="scroll-mt-24 py-8 border-b border-gray-200">
    {title && <h2 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h2>}
    <div className="prose prose-gray max-w-none">{children}</div>
  </section>
);

const Badge = ({ children }: any) => (
  <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-gray-100 border border-gray-200">
    {children}
  </span>
);

const Card = ({ children }: any) => (
  <div className="rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 bg-white">
    {children}
  </div>
);

const Button = ({ href, children }: any) => (
  <a
    href={href}
    target="_blank"
    rel="nofollow sponsored noopener noreferrer"
    className="inline-flex items-center justify-center px-4 py-2 rounded-2xl shadow-sm border border-gray-300 hover:shadow-md active:scale-[.99] transition text-sm md:text-base"
  >
    {children}
  </a>
);

// simple path reader (supports key[index] like key_specs[0])
const readFieldPath = (obj: any, path: string) => {
  try {
    return path
      .split(/\.(?![^\[]*\])|(\[\d+\])/)
      .filter(Boolean)
      .map((seg) => (seg?.startsWith("[") ? Number(seg.slice(1, -1)) : seg))
      .reduce((acc: any, k: any) => (acc == null ? acc : acc[k]), obj);
  } catch {
    return undefined;
  }
};

const getProductById = (data: any, id?: string) =>
  data?.products?.find((p: any) => p.id === id);

// --- JSON-LD helpers ---
const FaqJsonLd = ({ items }: { items: { q: string; a_template: string }[] }) => {
  if (!items?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a_template }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a_template },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

const ProductListJsonLd = ({ products }: { products: any[] }) => {
  if (!products?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        ...(p.image_url ? { image: p.image_url } : {}),
        ...(p.summary_value_prop ? { description: p.summary_value_prop } : {}),
        ...(p.rating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: Number(p.rating),
                reviewCount: Number(p.review_count || 0) || undefined,
              },
            }
          : {}),
        ...(p.affiliate_url
          ? {
              offers: {
                "@type": "Offer",
                url: p.affiliate_url,
                priceCurrency: p.currency || undefined,
                price: p.price_display || undefined,
              },
            }
          : {}),
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export default function AffiliatePost({ data = {} as any }) {
  if (!data || typeof data !== "object") {
    return <div style={{ padding: 24 }}>Invalid post data.</div>;
  }

  const { settings = {}, seo = {}, compliance = {}, ux = {}, comparison_table = {}, sections = [] } = data;

  const faqs = sections.find((s: any) => s.id === "faqs");
  const howTo = sections.find((s: any) => s.id === "how_to_tips");
  const conclusion = sections.find((s: any) => s.id === "conclusion");

  // default how-to bullets if none provided
  const howToBullets: string[] =
    (data as any).how_to_bullets || [
      "Chill soft cuts 30–60 minutes before sealing to reduce juice near the seal.",
      "Use Moist or Gentle/Pulse mode for juicy or delicate items.",
      "Wipe the sealing edge dry; moisture causes weak seals.",
      "Double-seal for long freezer storage (press Seal again).",
      "Label bags with cut + date; rotate older packs first.",
      "For marinades: pre-chill to thicken or pre-freeze 20–30 minutes.",
      "Sanitize surfaces and never reuse bags that touched raw meat.",
    ];

  // ✅ HERO image is computed *inside* the component
  const heroImg = seo?.og_image_url || data?.products?.[0]?.image_url;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/40 to-white">
      {/* HERO HEADER */}
      <header className="relative">
        <div className="h-44 md:h-64 w-full relative overflow-hidden">
          {heroImg ? (
            <>
              <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/60 to-violet-600/60" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-violet-600" />
          )}
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative">
          <div className="rounded-3xl border border-violet-200/60 bg-white shadow-md p-5 md:p-7">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {seo?.meta_title_template || "Affiliate Post"}
            </h1>
            {seo?.meta_description_template && (
              <p className="text-slate-600 mt-1">{seo.meta_description_template}</p>
            )}
            {compliance?.affiliate_disclosure_text && (
              <div className="mt-3 text-xs text-slate-700 bg-amber-50 border border-amber-200 rounded-2xl p-2.5">
                {compliance.affiliate_disclosure_text}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Intro */}
        <Section
          id="intro"
          title={`Keep Food Fresh: ${seo?.primary_keyword || settings?.niche || "Top Picks"}`}
        >
          <p>
            Quick recommendations, detailed reviews, and a simple buyer’s guide for{" "}
            {settings?.audience_persona || "everyday readers"}.
          </p>
        </Section>

        {/* Quick Picks */}
        {Array.isArray(data.quick_picks) && data.quick_picks.length > 0 && (
          <section id="quick-picks" className="scroll-mt-24 py-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Quick Picks</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {data.quick_picks.map((qp: any, i: number) => {
                const p = getProductById(data, qp.product_id);
                if (!p) return null;
                return (
                  <Card key={i}>
                    <div className="flex items-start gap-3">
                      <Badge>{qp.label}</Badge>
                    </div>
                    <div className="mt-3 space-y-3">
                      <div className="font-semibold">{p.name}</div>
                      {p.image_url && (
                        <a href={p.affiliate_url} target="_blank" rel="nofollow sponsored noopener noreferrer">
                          <img
                            src={p.image_url}
                            alt={`${p.name} product image`}
                            loading={ux?.lazy_load_images ? "lazy" : undefined}
                            className="w-full h-40 object-cover rounded-xl border"
                          />
                        </a>
                      )}
                      <p className="text-sm text-gray-700">{p.summary_value_prop}</p>
                      <div className="flex items-center gap-2 text-sm">
                        {p.deal_badge && <Badge>{p.deal_badge}</Badge>}
                        {p.price_display && <Badge>${p.price_display}</Badge>}
                      </div>
                      <Button href={p.affiliate_url}>
                        {qp.cta_text || ux?.button_label_default || "Check price"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Products */}
{Array.isArray(data.products) && data.products.length > 0 && (
  <section id="products" className="scroll-mt-24 py-6">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">Top Picks Explained</h2>
    <div className="space-y-6">
      {data.products.map((p: any) => (
        <Card key={p.id}>
          <div className="grid md:grid-cols-[180px,1fr] gap-4 items-start">
            {/* NEW: product image */}
            {p.image_url ? (
              <a
                href={p.affiliate_url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="block"
              >
                <img
                  src={p.image_url}
                  alt={`${p.name} product image`}
                  loading={ux?.lazy_load_images ? "lazy" : undefined}
                  className="w-full h-44 md:h-40 object-cover rounded-xl border"
                />
              </a>
            ) : (
              <div className="hidden md:block rounded-xl border bg-gray-50 h-40" />
            )}

            {/* details */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-gray-700">{p.summary_value_prop}</p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <div className="font-medium mb-1">Key specs</div>
                  <ul className="text-sm list-disc pl-5">
                    {(p.key_specs || []).map((s: any, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-1">Pros</div>
                  <ul className="text-sm list-disc pl-5">
                    {(p.pros || []).map((s: any, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-1">Cons</div>
                  <ul className="text-sm list-disc pl-5">
                    {(p.cons || []).map((s: any, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                {p.rating && <span>⭐ {p.rating} ({p.review_count || 0} reviews)</span>}
              </div>

              <div className="flex items-center gap-3">
                {p.price_display && <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-gray-100 border border-gray-200">${p.price_display}</span>}
                {p.coupon_text && <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-gray-100 border border-gray-200">{p.coupon_text}</span>}
              </div>

              <div className="pt-1">
                <a
                  href={p.affiliate_url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-2xl shadow-sm border border-gray-300 hover:shadow-md active:scale-[.99] transition text-sm md:text-base"
                >
                  {ux?.button_label_default || "Check price"}
                </a>
              </div>

              {compliance?.pricing_disclaimer_text && (
                <div className="text-xs text-gray-500">{compliance.pricing_disclaimer_text}</div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  </section>
)}


        {/* Comparison Table */}
        {comparison_table?.enabled && Array.isArray(data.products) && data.products.length > 0 && (
          <section id="compare" className="scroll-mt-24 py-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Compare</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-2xl">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {(comparison_table.columns || []).map((c: any, i: number) => (
                      <th key={i} className="text-left px-4 py-3 font-medium">
                        {c.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((p: any) => (
                    <tr key={p.id} className="border-t bg-white">
                      {(comparison_table.columns || []).map((c: any, i: number) => (
                        <td key={i} className="px-4 py-3">
                          {String(readFieldPath(p, c.field) ?? "—")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* How-To Tips */}
        {howTo && (
          <Section id="tips" title={howTo.title_template || "Tips"}>
            <ul className="list-disc pl-5">
              {howToBullets.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* FAQs */}
        {faqs && (
          <Section id="faqs" title={faqs.title_template || "FAQs"}>
            <div className="divide-y">
              {(faqs.items || []).map((it: any, i: number) => (
                <div key={i} className="py-3">
                  <div className="font-medium">Q: {it.q}</div>
                  <div className="text-gray-700">A: {it.a_template}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Conclusion */}
        {(() => {
          const target = conclusion?.final_cta?.target_product_id
            ? getProductById(data, conclusion.final_cta.target_product_id)
            : data.products?.[0];
          return (
            <Section id="conclusion" title={conclusion?.title_template || "Conclusion"}>
              {target ? (
                <>
                  <p>
                    For most households, <strong>{target.name}</strong> is the easiest pick.
                  </p>
                  <div className="mt-3">
                    <Button href={target.affiliate_url}>
                      {conclusion?.final_cta?.text || ux?.button_label_default || "Check price"}
                    </Button>
                  </div>
                </>
              ) : (
                <p>Thanks for reading!</p>
              )}
            </Section>
          );
        })()}

        {/* Safety note */}
        {compliance?.safety_notice_text && (
          <div className="mt-6 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-2xl p-3">
            {compliance.safety_notice_text}
          </div>
        )}
      </main>

      {/* JSON-LD toggles */}
      {data.schema_settings?.enable_faq_schema && faqs?.items?.length ? <FaqJsonLd items={faqs.items} /> : null}
      {data.schema_settings?.enable_product_schema && data.products?.length ? (
        <ProductListJsonLd products={data.products} />
      ) : null}
    </div>
  );
}
