// src/components/AffiliatePost.tsx
import React from "react";

const Section = ({ id, title, children }: any) => (
  <section id={id} className="scroll-mt-24 py-8 border-b border-gray-200">
    {title && <h2 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h2>}
    <div className="prose prose-gray max-w-none">{children}</div>
  </section>
);

const Badge = ({ children }: any) => (
  <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-gray-100 border border-gray-200">{children}</span>
);
const Card = ({ children }: any) => <div className="rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 bg-white">{children}</div>;
const Button = ({ href, children }: any) => (
  <a href={href} target="_blank" rel="nofollow sponsored noopener noreferrer"
     className="inline-flex items-center justify-center px-4 py-2 rounded-2xl shadow-sm border border-gray-300 hover:shadow-md active:scale-[.99] transition text-sm md:text-base">
    {children}
  </a>
);

const getProductById = (data: any, id?: string) => data?.products?.find((p: any) => p.id === id);

export default function AffiliatePost({ data = {} as any }) {
  // quick defensive guard + debug
  if (!data || typeof data !== "object") {
    return <div style={{ padding: 24 }}>Invalid post data.</div>;
  }
  const { settings = {}, seo = {}, compliance = {}, ux = {}, comparison_table = {}, sections = [] } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              {seo?.meta_title_template || "Affiliate Post"}
            </h1>
            <p className="text-sm text-gray-600">{seo?.meta_description_template}</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {compliance?.affiliate_disclosure_text && (
          <div className="mb-6 text-xs text-gray-600 bg-amber-50 border border-amber-200 rounded-2xl p-3">
            {compliance.affiliate_disclosure_text}
          </div>
        )}

        <Section id="intro" title={`Keep Food Fresh: ${seo?.primary_keyword || settings?.niche || "Top Picks"}`}>
          <p>
            Quick recommendations, detailed reviews, and a simple buyer’s guide for{" "}
            {settings?.audience_persona || "everyday readers"}.
          </p>
        </Section>

        {/* Quick Picks (only if provided) */}
        {Array.isArray(data.quick_picks) && data.quick_picks.length > 0 && (
          <section id="quick-picks" className="scroll-mt-24 py-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Quick Picks</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {data.quick_picks.map((qp: any, i: number) => {
                const p = getProductById(data, qp.product_id);
                if (!p) return null;
                return (
                  <Card key={i}>
                    <Badge>{qp.label}</Badge>
                    <div className="mt-3 space-y-3">
                      <div className="font-semibold">{p.name}</div>
                      {p.image_url && (
                        <a href={p.affiliate_url} target="_blank" rel="nofollow sponsored noopener noreferrer">
                          <img src={p.image_url} alt={`${p.name} product image`} loading={ux?.lazy_load_images ? "lazy" : undefined}
                               className="w-full h-40 object-cover rounded-xl border" />
                        </a>
                      )}
                      <p className="text-sm text-gray-700">{p.summary_value_prop}</p>
                      <div className="flex items-center gap-2 text-sm">
                        {p.deal_badge && <Badge>{p.deal_badge}</Badge>}
                        {p.price_display && <Badge>${p.price_display}</Badge>}
                      </div>
                      <Button href={p.affiliate_url}>{qp.cta_text || ux?.button_label_default || "Check price"}</Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Products (only if provided) */}
        {Array.isArray(data.products) && data.products.length > 0 && (
          <section id="products" className="scroll-mt-24 py-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Top Picks Explained</h2>
            <div className="space-y-6">
              {data.products.map((p: any) => (
                <Card key={p.id}>
                  <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                  <p className="text-gray-700 mb-2">{p.summary_value_prop}</p>
                  <div className="flex gap-2 text-sm">
                    {p.price_display && <Badge>${p.price_display}</Badge>}
                    {p.coupon_text && <Badge>{p.coupon_text}</Badge>}
                  </div>
                  <div className="pt-2">
                    <Button href={p.affiliate_url}>{ux?.button_label_default || "Check price"}</Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Conclusion CTA (if present) */}
        {(() => {
          const concl = sections.find((s: any) => s.id === "conclusion");
          const target = concl?.final_cta?.target_product_id
            ? getProductById(data, concl.final_cta.target_product_id)
            : data.products?.[0];
          return concl ? (
            <Section id="conclusion" title={concl.title_template || "Conclusion"}>
              {target ? (
                <>
                  <p>For most households, <strong>{target.name}</strong> is the easiest pick.</p>
                  <div className="mt-3">
                    <Button href={target.affiliate_url}>{concl.final_cta?.text || ux?.button_label_default || "Check price"}</Button>
                  </div>
                </>
              ) : (
                <p>Thanks for reading!</p>
              )}
            </Section>
          ) : null;
        })()}

        {compliance?.safety_notice_text && (
          <div className="mt-6 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-2xl p-3">
            {compliance.safety_notice_text}
          </div>
        )}
      </main>
    </div>
  );
}
