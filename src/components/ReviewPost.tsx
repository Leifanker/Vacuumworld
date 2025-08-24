import React from "react";

const Box = ({ children }: any) => <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">{children}</div>;
const Badge = ({ children }: any) => <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 border">{children}</span>;
const Button = ({ href, children }: any) => (
  <a href={href} target="_blank" rel="nofollow sponsored noopener noreferrer"
     className="inline-flex items-center justify-center px-4 py-2 rounded-2xl border shadow-sm hover:shadow-md">
    {children}
  </a>
);

const FaqJsonLd = ({ items }: { items: { q: string; a: string }[] }) => {
  if (!items?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(x => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } }))
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
    image: product.images?.[0],
    description: product.summary_value_prop,
    offers: product.affiliate_url ? { "@type": "Offer", url: product.affiliate_url, price: product.price_display, priceCurrency: product.currency || "USD" } : undefined,
  };
  if (review) {
    schema.review = {
      "@type": "Review",
      author: { "@type": "Organization", name: review.author_name },
      datePublished: review.date_published_iso,
      reviewRating: { "@type": "Rating", ratingValue: review.rating_value, bestRating: review.rating_scale }
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

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      {/* Header + disclosure */}
      <header className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{data.seo?.meta_title_template || `${p.name} Review: Is It Worth It?`}</h1>
        <p className="text-gray-600">{data.seo?.meta_description_template}</p>
      </header>
      {data.compliance?.affiliate_disclosure_text && (
        <div className="mb-6 text-xs text-gray-700 bg-amber-50 border border-amber-200 rounded-2xl p-3">
          {data.compliance.affiliate_disclosure_text}
        </div>
      )}

      {/* Quick Verdict Box */}
      <Box>
        <div className="flex flex-wrap items-start gap-4">
          <div className="grow">
            <div className="text-lg font-semibold mb-1">Quick verdict</div>
            <ul className="list-disc pl-5 text-sm">
              {(v.benefit_bullets || []).map((b: string, i: number) => <li key={i}>{b}</li>)}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {typeof v.score_out_of_10 === "number" && <Badge>Score: {v.score_out_of_10}/10</Badge>}
              {p.price_display && <Badge>~${p.price_display}</Badge>}
              {p.warranty && <Badge>{p.warranty}</Badge>}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {Array.isArray(v.for_who) && v.for_who.length > 0 && <div><span className="font-medium">For:</span> {v.for_who.join(", ")}</div>}
              {Array.isArray(v.not_for) && v.not_for.length > 0 && <div><span className="font-medium">Not for:</span> {v.not_for.join(", ")}</div>}
            </div>
          </div>
          <div className="shrink-0">
            <Button href={(v.primary_cta && v.primary_cta.url) || p.affiliate_url}>{(v.primary_cta && v.primary_cta.text) || "See price"}</Button>
          </div>
        </div>
      </Box>

      {/* Proof of testing */}
      {data.proof_of_testing?.how_we_tested && (
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-2">How we tested</h2>
          <p className="text-gray-800">{data.proof_of_testing.how_we_tested}</p>
        </section>
      )}

      {/* Benefits first */}
      {Array.isArray(data.benefits) && data.benefits.length > 0 && (
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-2">Benefits (with evidence)</h2>
          <div className="space-y-4">
            {data.benefits.map((b: any, i: number) => (
              <Box key={i}>
                <div className="text-lg font-semibold">{b.title}</div>
                <p className="text-gray-800">{b.use_case}</p>
                {b.evidence && (
                  <div className="text-sm text-gray-700 mt-1">
                    <strong>Evidence:</strong> {b.evidence.metric}: {b.evidence.before} → {b.evidence.after}
                  </div>
                )}
                {b.how_to_tip && <div className="text-sm mt-2"><strong>Tip:</strong> {b.how_to_tip}</div>}
              </Box>
            ))}
          </div>
        </section>
      )}

      {/* Pros / Cons */}
      {(data.pros_cons?.pros?.length || data.pros_cons?.cons?.length) && (
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-2">Pros & Cons</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Box>
              <div className="font-medium mb-1">Pros</div>
              <ul className="list-disc pl-5 text-sm">{(data.pros_cons.pros || []).map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
            </Box>
            <Box>
              <div className="font-medium mb-1">Cons</div>
              <ul className="list-disc pl-5 text-sm">{(data.pros_cons.cons || []).map((x: string, i: number) => <li key={i}>{x}</li>)}</ul>
            </Box>
          </div>
        </section>
      )}

      {/* Comparisons & Alternatives */}
      {(data.comparisons?.vs_competitors?.length || data.comparisons?.alternatives?.length) && (
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-2">Comparisons & Alternatives</h2>
          <div className="space-y-4">
            {(data.comparisons?.vs_competitors || []).map((v: any, i: number) => (
              <div key={i} className="text-sm">
                <strong>{v.competitor}:</strong> {v.claim_or_question} — <em>{v.result}</em> {v.link && (<a className="underline" href={v.link}>Learn more</a>)}
              </div>
            ))}
            {(data.comparisons?.alternatives || []).map((a: any, i: number) => (
              <div key={i} className="text-sm">
                <strong>{a.name}:</strong> {a.reason} {a.url && (<a className="underline" href={a.url} target="_blank" rel="nofollow sponsored noopener noreferrer">See price</a>)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Objections & Risk */}
      {data.objections_and_risks?.items?.length > 0 && (
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-2">Objections & Risk</h2>
          <ul className="list-disc pl-5 text-sm">
            {data.objections_and_risks.items.map((x: any, i: number) => <li key={i}><strong>{x.objection}:</strong> {x.response}</li>)}
          </ul>
          {data.objections_and_risks.durability_notes && <p className="text-sm mt-2">{data.objections_and_risks.durability_notes}</p>}
        </section>
      )}

      {/* Social proof */}
      {(sp.rating_summary || sp.quotes?.length) && (
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-2">What others say</h2>
          {sp.rating_summary && (
            <div className="text-sm mb-2">Average rating: <strong>{sp.rating_summary.value}/5</strong> ({sp.rating_summary.count}+ reviews, {sp.rating_summary.source})</div>
          )}
          {(sp.quotes || []).map((q: any, i: number) => <blockquote key={i} className="text-sm italic border-l-4 pl-3 my-2">{q.quote} — {q.source}</blockquote>)}
        </section>
      )}

      {/* FAQ */}
      {faq?.length > 0 && (
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-2">FAQ</h2>
          <div className="divide-y">
            {faq.map((x: any, i: number) => (
              <div key={i} className="py-3">
                <div className="font-medium">Q: {x.q}</div>
                <div className="text-gray-700">A: {x.a}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final verdict */}
      <section className="py-6">
        <h2 className="text-xl font-semibold mb-2">Final verdict</h2>
        <p className="text-gray-800">{data.final_verdict?.summary}</p>
        <div className="mt-3">
          <Button href={data.final_verdict?.cta?.url || p.affiliate_url}>{data.final_verdict?.cta?.text || "See price"}</Button>
        </div>
        {data.compliance?.pricing_disclaimer_text && <div className="text-xs text-gray-500 mt-2">{data.compliance.pricing_disclaimer_text}</div>}
      </section>

      {/* JSON-LD */}
      {data.schema_settings?.enable_faq_schema ? <FaqJsonLd items={faq} /> : null}
      <ProductJsonLd product={p} review={data.schema_settings?.enable_review_schema ? data.schema_settings?.review_schema_metadata : null} />
    </div>
  );
}
