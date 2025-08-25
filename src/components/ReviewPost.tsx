import React from "react";
import { Star, ExternalLink, CheckCircle, XCircle, Award, TrendingUp, Shield, Clock, Users, Package } from "lucide-react";

const Card = ({ children, className = "" }: any) => (
  <div className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default" }: any) => {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600",
    success: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    error: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
    primary: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800"
  };
  
  return (
    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${variants[variant as keyof typeof variants] || variants.default}`}>
      {children}
    </span>
  );
};

const Button = ({ href, children, variant = "primary", size = "md" }: any) => {
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white",
    secondary: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${variants[variant]} ${sizes[size]}`}
    >
      {children}
      <ExternalLink className="w-4 h-4 ml-2" />
    </a>
  );
};

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
      ? {
          "@type": "Offer",
          url: product.affiliate_url,
          price: product.price_display,
          priceCurrency: product.currency || "USD",
          availability: "https://schema.org/InStock"
        }
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
  const specs = data.specifications || {};
  const metrics = data.performance_metrics || {};

  const heroImg = data.seo?.og_image_url || p.images?.[0] || p.image_url;
  const title = data.seo?.meta_title_template || `${p.name} Review: Is It Worth It?`;
  const subtitle = data.seo?.meta_description_template;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/40 via-purple-50/40 to-yellow-50/40 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10">
      {/* HERO */}
      <header className="relative pt-0">
        <div className="h-64 md:h-80 w-full relative overflow-hidden">
          {heroImg ? (
            <>
              <img 
                src={heroImg} 
                alt={`${p.name} product review`} 
                className="absolute inset-0 w-full h-full object-cover"
                width="1200"
                height="600"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/60 to-purple-600/60" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600" />
          )}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-16 md:-mt-20 relative">
          <Card className="p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                  {title}
                </h1>
                {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{subtitle}</p>}
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {typeof v.score_out_of_10 === "number" && (
                    <Badge variant="success">
                      <Star className="w-3 h-3 inline mr-1" />
                      {v.score_out_of_10}/10 Score
                    </Badge>
                  )}
                  {p.price_display && <Badge variant="primary">${p.price_display}</Badge>}
                  {p.warranty && <Badge>{p.warranty}</Badge>}
                  {sp.rating_summary && (
                    <Badge variant="warning">
                      {sp.rating_summary.value}★ ({sp.rating_summary.count}+ reviews)
                    </Badge>
                  )}
                </div>

                {data.compliance?.affiliate_disclosure_text && (
                  <div className="mb-6 text-xs text-gray-700 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3">
                    {data.compliance.affiliate_disclosure_text}
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <Button href={v?.primary_cta?.url || p.affiliate_url} size="lg">
                    {v?.primary_cta?.text || "See Price on Amazon"}
                  </Button>
                  <Button href="#specifications" variant="secondary">
                    View Specs
                  </Button>
                </div>
              </div>

              {/* Product Image */}
              {(p.images?.[0] || p.image_url) && (
                <div className="shrink-0">
                  <a href={v.primary_cta?.url || p.affiliate_url} target="_blank" rel="nofollow sponsored noopener noreferrer">
                    <img
                      src={p.images?.[0] || p.image_url}
                      alt={`${p.name} product photo`}
                      loading="lazy"
                      className="w-full lg:w-80 h-64 lg:h-80 rounded-2xl border object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </a>
                </div>
              )}
            </div>
          </Card>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 space-y-12">
        {/* QUICK VERDICT */}
        <Card id="quick-verdict" className="p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Quick Verdict</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Benefits</h3>
              <ul className="space-y-3">
                {(v.benefit_bullets || []).map((b: string, i: number) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Perfect For</h3>
                <div className="flex flex-wrap gap-2">
                  {(v.for_who || []).map((who: string, i: number) => (
                    <Badge key={i} variant="success">{who}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Not Ideal For</h3>
                <div className="flex flex-wrap gap-2">
                  {(v.not_for || []).map((who: string, i: number) => (
                    <Badge key={i} variant="error">{who}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* SPECIFICATIONS */}
        {Object.keys(specs).length > 0 && (
          <Card id="specifications" className="p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Specifications</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(specs).map(([key, value]: [string, any]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 capitalize">
                    {key.replace(/_/g, ' ')}
                  </div>
                  <div className="text-gray-900 dark:text-white font-semibold">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* PERFORMANCE METRICS */}
        {Object.keys(metrics).length > 0 && (
          <Card className="p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Performance</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(metrics).map(([key, value]: [string, any]) => (
                <div key={key} className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                    {key.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* HOW WE TESTED */}
        {data.proof_of_testing?.how_we_tested && (
          <Card id="how-we-tested" className="p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">How We Tested</h2>
            </div>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{data.proof_of_testing.how_we_tested}</p>

            {Array.isArray(data.proof_of_testing?.photos) && data.proof_of_testing.photos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {data.proof_of_testing.photos.map((url: string, i: number) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Testing photo ${i + 1}`}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded-xl border shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                ))}
              </div>
            )}

            {data.proof_of_testing?.hours_used && (
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5" />
                <span>Testing duration: {data.proof_of_testing.hours_used} hours</span>
              </div>
            )}
          </Card>
        )}

        {/* BENEFITS */}
        {Array.isArray(data.benefits) && data.benefits.length > 0 && (
          <section id="benefits" className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Real-World Benefits
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Here's how the {p.name} performs in actual use cases
              </p>
            </div>
            
            {data.benefits.map((b: any, i: number) => (
              <Card key={i} className="p-6 md:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{b.title}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{b.use_case}</p>
                    
                    {b.evidence && (
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 mb-4">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Test Results</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {b.evidence.metric}: {b.evidence.before} → {b.evidence.after}
                        </div>
                      </div>
                    )}
                    
                    {b.how_to_tip && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                        <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Pro Tip</div>
                        <div className="text-yellow-700 dark:text-yellow-300">{b.how_to_tip}</div>
                      </div>
                    )}
                  </div>
                  
                  {b.image_url && (
                    <div>
                      <img
                        src={b.image_url}
                        alt={b.title}
                        loading="lazy"
                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </section>
        )}

        {/* PROS & CONS */}
        {(data.pros_cons?.pros?.length || data.pros_cons?.cons?.length) && (
          <Card id="pros-cons" className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Pros & Cons
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300">Pros</h3>
                </div>
                <ul className="space-y-3">
                  {(data.pros_cons.pros || []).map((pro: string, i: number) => (
                    <li key={i} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-green-700 dark:text-green-300">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-300">Cons</h3>
                </div>
                <ul className="space-y-3">
                  {(data.pros_cons.cons || []).map((con: string, i: number) => (
                    <li key={i} className="flex items-start space-x-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-red-700 dark:text-red-300">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* ALTERNATIVES */}
        {data.comparisons?.alternatives?.length > 0 && (
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Alternative Options
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {data.comparisons.alternatives.map((alt: any, i: number) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                  <div className="flex gap-4">
                    {alt.image_url && (
                      <img 
                        src={alt.image_url} 
                        alt={alt.name} 
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0" 
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{alt.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{alt.reason}</p>
                      {alt.price && <Badge variant="primary">{alt.price}</Badge>}
                      {alt.url && (
                        <div className="mt-4">
                          <Button href={alt.url} size="sm">View Product</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* SOCIAL PROOF */}
        {(sp.rating_summary || sp.quotes?.length) && (
          <Card className="p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">What Users Say</h2>
            </div>
            
            {sp.rating_summary && (
              <div className="text-center mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {sp.rating_summary.value}/5
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${i < Math.floor(parseFloat(sp.rating_summary.value)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Based on {sp.rating_summary.count}+ {sp.rating_summary.source}
                </div>
              </div>
            )}
            
            {sp.quotes?.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sp.quotes.map((quote: any, i: number) => (
                  <blockquote key={i} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
                    <div className="text-gray-700 dark:text-gray-300 mb-4 italic">"{quote.quote}"</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">— {quote.source}</div>
                  </blockquote>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* FAQ */}
        {faq?.length > 0 && (
          <Card id="faq" className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faq.map((item: any, i: number) => (
                <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Q: {item.q}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    A: {item.a}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* FINAL VERDICT */}
        <Card id="final-verdict" className="p-6 md:p-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Final Verdict
            </h2>
            
            {typeof v.score_out_of_10 === "number" && (
              <div className="mb-6">
                <div className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {v.score_out_of_10}/10
                </div>
                <div className="text-gray-600 dark:text-gray-400">Overall Score</div>
              </div>
            )}
            
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {data.final_verdict?.summary}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={data.final_verdict?.cta?.url || p.affiliate_url} size="lg">
                {data.final_verdict?.cta?.text || "See Best Price"}
              </Button>
              <Button href="#quick-verdict" variant="secondary" size="lg">
                Read Summary
              </Button>
            </div>
            
            {data.compliance?.pricing_disclaimer_text && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
                {data.compliance.pricing_disclaimer_text}
              </div>
            )}
          </div>
        </Card>
      </main>

      {/* JSON-LD */}
      {data.schema_settings?.enable_faq_schema && faq?.length ? <FaqJsonLd items={faq} /> : null}
      {data.schema_settings?.enable_product_schema ? (
        <ProductJsonLd product={p} review={data.schema_settings?.enable_review_schema ? schemaMeta : null} />
      ) : null}
    </div>
  );
}