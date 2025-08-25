// src/components/ReviewPost.tsx
import React from "react";
import BrandButton from "@/components/ui/BrandButton";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";

const Card = ({ children, className = "" }: any) => (
  <div className={`rounded-3xl border border-violet-200/60 bg-white shadow-sm ${className}`}>{children}</div>
);

const Pill = ({ children }: any) => (
  <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700">
    {children}
  </span>
);

// JSON-LD helpers
const FaqJsonLd = ({ items }: { items: { q: string; a: string }[] }) => {
  if (!items?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

const ProductJsonLd = ({ product, review }: any) => {
  if (!product) return null;
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand,
    image: product.images?.[0] || product.image_url,
    description: product.summary_value_prop,
    offers: product.affiliate_url
      ? { "@type": "Offer", url: product.affiliate_url, price: product.price_display, priceCurrency: product.currency || "USD" }
      : undefined,
  };
  if (review) {
    schema.review = {
      "@type": "Review",
      author: { "@type": "Organization", name: review.author_name },
      datePublished: review.date_published_iso,
      reviewRating: { "@type": "Rating", ratingValue: review.rating_value, bestRating: review.rating_scale },
    };
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export default function ReviewPost({ data }: any) {
  const p = data.product || {};
  const v = data.verdict_box || {};
  const sp = data.social_proof || {};
  const faq = data.faq || [];
  const schemaMeta = data.schema_settings?.review_schema_metadata;

  const heroImg = data.seo?.og_image_url || p.images?.[0] || p.image_url;
  const title = data.seo?.meta_title_template || `${p.name} Review: Is It Worth It?`;
  const subtitle = data.seo?.meta_description_template;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/40 to-white">
      {/* HERO */}
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
          <Card className="p-5 md:p-7 shadow-md">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h1>
            {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
            {data.compliance?.affiliate_disclosure_text && (
              <div className="mt-3 text-xs text-slate-700 bg-amber-50 border border-amber-200 rounded-2xl p-2.5">
                {data.compliance.affiliate_disclosure_text}
              </div>
            )}
            <div className="mt-4">
              <BrandButton href={(data.ctas?.intro?.url || v?.primary_cta?.url || p.affiliate_url)}>
                {(data.ctas?.intro?.text || v?.primary_cta?.text || "See price")}
              </BrandButton>
            </div>
          </Card>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* QUICK VERDICT */}
        <Card className="p-5">
          <div className="flex flex-wrap items-start gap-4">
            <div className="grow">
              <div className="text-lg font-semibold mb-1">Quick verdict</div>
              <ul className="list-disc pl-5 text-sm">
                {(v.benefit_bullets || []).map((b: string, i: number) => <li key={i}>{b}</li>)}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {typeof v.score_out_of_10 === "number" && <Pill>Score: {v.score_out_of_10}/10</Pill>}
                {p.price_display && <Pill>~${p.price_display}</Pill>}
                {p.warranty && <Pill>{p.warranty}</Pill>}
              </div>
              <div className="mt-2 text-xs text-slate-600">
                {Array.isArray(v.for_who) && v.for_who.length > 0 && <div><strong>For:</strong> {v.for_who.join(", ")}</div>}
                {Array.isArray(v.not_for) && v.not_for.length > 0 && <div><strong>Not for:</strong> {v.not_for.join(", ")}</div>}
              </div>
            </div>

            {/* product thumbnail */}
            {(p.images?.[0] || p.image_url) && (
              <div className="shrink-0">
                <a href={v.primary_cta?.url || p.affiliate_url} target="_blank" rel="nofollow sponsored noopener noreferrer">
                  <img
                    src={p.images?.[0] || p.image_url}
                    alt={`${p.name} product photo`}
                    loading="lazy"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border object-cover"
                  />
                </a>
              </div>
            )}
          </div>
        </Card>

        {/* HOW WE TESTED */}
        {data.proof_of_testing?.how_we_tested && (
          <Card className="p-5">
            <h2 className="text-xl font-semibold mb-2">How we tested</h2>
            <p className="text-slate-800">{data.proof_of_testing.how_we_tested}</p>

            {/* photos gallery */}
            {Array.isArray(data.proof_of_testing?.photos) && data.proof_of_testing.photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.proof_of_testing.photos.map((url: string, i: number) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={url}
                      alt={`Testing photo ${i + 1}`}
                      loading="lazy"
                      className="w-full h-40 md:h-48 object-cover rounded-2xl border"
                    />
                  </a>
                ))}
              </div>
            )}

            {/* optional video */}
            {data.proof_of_testing?.video_url && (
              <div className="mt-4 aspect-video rounded-2xl overflow-hidden border">
                <video src={data.proof_of_testing.video_url} controls className="w-full h-full" />
              </div>
            )}
          </Card>
        )}

        {/* BENEFITS */}
        {Array.isArray(data.benefits) && data.benefits.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Benefits (with evidence)</h2>
            {data.benefits.map((b: any, i: number) => (
              <Card key={i} className="p-5">
                {b.image_url && (
                  <img
                    src={b.image_url}
                    alt={b.title}
                    loading="lazy"
                    className="w-full h-44 md:h-56 object-cover rounded-2xl border mb-3"
                    <div className="mt-3">
  <BrandButton href={v?.primary_cta?.url || p.affiliate_url}>Check current price</BrandButton>
</div>

                  />
                )}
                <div className="text-lg font-semibold">{b.title}</div>
                <p className="text-slate-800">{b.use_case}</p>
                {b.evidence && (
                  <div className="text-sm text-slate-700 mt-1">
                    <strong>Evidence:</strong> {b.evidence.metric}: {b.evidence.before} → {b.evidence.after}
                  </div>
                )}
                {b.how_to_tip && <div className="text-sm mt-2"><strong>Tip:</strong> {b.how_to_tip}</div>}
              </Card>
            ))}
          </section>
        )}

        {/* PROS & CONS */}
        {(data.pros_cons?.pros?.length || data.pros_cons?.cons?.length) && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-5">
                <div className="font-medium mb-1">Pros</div>
                <ul className="list-disc pl-5 text-sm">{(data.pros_cons.pros || []).map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
              </Card>
              <Card className="p-5">
                <div className="font-medium mb-1">Cons</div>
                <ul className="list-disc pl-5 text-sm">{(data.pros_cons.cons || []).map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
              </Card>
            </div>
          </section>
        )}

        {/* Comparisons & Alternatives */}
{(data.comparisons?.vs_competitors?.length || data.comparisons?.alternatives?.length) && (
  <Card id="comparisons" className="p-5">
    <h2 className="text-xl font-semibold mb-2">Comparisons & Alternatives</h2>

    {/* vs competitors (keep text) */}
    <div className="space-y-3 text-sm mb-4">
      {(data.comparisons?.vs_competitors || []).map((v: any, i: number) => (
        <div key={i}>
          <strong>{v.competitor}:</strong> {v.claim_or_question} — <em>{v.result}</em>{" "}
          {v.link && <a className="underline text-violet-700" href={v.link}>Learn more</a>}
        </div>
      ))}
    </div>

    {/* alternatives as cards */}
    {Array.isArray(data.comparisons?.alternatives) && data.comparisons.alternatives.length > 0 && (
      <div className="grid md:grid-cols-2 gap-4">
        {data.comparisons.alternatives.map((a: any, i: number) => (
          <div key={i} className="rounded-2xl border border-gray-200 p-4 flex gap-3 bg-white">
            {a.image_url && (
              <img src={a.image_url} alt={a.name} loading="lazy" className="w-24 h-24 rounded-xl border object-cover" />
            )}
            <div className="min-w-0">
              <div className="font-semibold">{a.name}</div>
              <p className="text-sm text-slate-700">{a.reason}</p>
              {a.url && (
                <div className="mt-2">
                  <BrandButton href={a.url}>See price</BrandButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </Card>
)}


        {/* OBJECTIONS & RISK */}
        {data.objections_and_risks?.items?.length > 0 && (
          <Card className="p-5">
            <h2 className="text-xl font-semibold mb-2">Objections & Risk</h2>
            <ul className="list-disc pl-5 text-sm">
              {data.objections_and_risks.items.map((x: any, i: number) => (
                <li key={i}><strong>{x.objection}:</strong> {x.response}</li>
              ))}
            </ul>
            {data.objections_and_risks.durability_notes && <p className="text-sm mt-2">{data.objections_and_risks.durability_notes}</p>}
          </Card>
        )}

        {/* SOCIAL PROOF */}
        {(sp.rating_summary || sp.quotes?.length) && (
          <Card className="p-5">
            <h2 className="text-xl font-semibold mb-2">What others say</h2>
            {sp.rating_summary && (
              <div className="text-sm mb-2">
                Average rating: <strong>{sp.rating_summary.value}/5</strong> ({sp.rating_summary.count}+ reviews, {sp.rating_summary.source})
              </div>
            )}
            {(sp.quotes || []).map((q: any, i: number) => (
              <blockquote key={i} className="text-sm italic border-l-4 border-violet-300 pl-3 my-2">{q.quote} — {q.source}</blockquote>
            ))}
          </Card>
        )}

        {/* FAQ */}
        {faq?.length > 0 && (
          <Card className="p-5">
            <h2 className="text-xl font-semibold mb-2">FAQ</h2>
            <div className="divide-y">
              {faq.map((x: any, i: number) => (
                <div key={i} className="py-3">
                  <div className="font-medium">Q: {x.q}</div>
                  <div className="text-slate-700">A: {x.a}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* FINAL VERDICT */}
        <Card className="p-5">
          <h2 className="text-xl font-semibold mb-2">Final verdict</h2>
          <p className="text-slate-800">{data.final_verdict?.summary}</p>
          <div className="mt-3">
            <BrandButton href={(data.final_verdict?.cta?.url || p.affiliate_url)}>
              {(data.final_verdict?.cta?.text || "See price")}
            </BrandButton>
          </div>
          {data.compliance?.pricing_disclaimer_text && (
            <div className="text-xs text-slate-500 mt-2">{data.compliance.pricing_disclaimer_text}</div>
          )}
        </Card>
        import ReviewTOC from "@/components/ui/ReviewTOC";
// after the hero Card
<ReviewTOC />

        <StickyMobileCTA label={p.name} price={p.price_display} href={v?.primary_cta?.url || p.affiliate_url} />
      </main>

      {/* JSON-LD */}
      {data.schema_settings?.enable_faq_schema ? <FaqJsonLd items={faq} /> : null}
      <ProductJsonLd product={p} review={data.schema_settings?.enable_review_schema ? schemaMeta : null} />
    </div>
  );
}
