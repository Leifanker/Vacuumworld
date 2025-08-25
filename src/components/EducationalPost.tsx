import React from "react";
import { Clock, CheckCircle, Users, Lightbulb, BookOpen, Star, ExternalLink, ArrowRight, Package, Zap, Shield } from "lucide-react";

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

const TableOfContents = ({ items }: { items: any[] }) => (
  <Card className="p-6 mb-8">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
        <BookOpen className="w-5 h-5 text-white" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Table of Contents</h2>
    </div>
    <nav className="grid md:grid-cols-2 gap-2">
      {items.map((item: any, i: number) => (
        <a
          key={i}
          href={item.anchor}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
        >
          <span className="w-6 h-6 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center text-xs font-medium">
            {i + 1}
          </span>
          <span className="text-sm">{item.label}</span>
        </a>
      ))}
    </nav>
  </Card>
);

const StepByStep = ({ block }: any) => (
  <Card className="p-6 md:p-8">
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
        <Lightbulb className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{block.h2}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{block.prep_time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Package className="w-4 h-4" />
            <span>{block.tools?.length || 0} tools needed</span>
          </div>
        </div>
      </div>
    </div>

    {block.image_url && (
      <img
        src={block.image_url}
        alt={block.h2}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
    )}

    <div className="space-y-6">
      {block.steps?.map((step: any, i: number) => (
        <div key={i} className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            {step.step_no}
          </div>
          <div className="flex-1">
            <p className="text-gray-700 dark:text-gray-300 text-lg">{step.action}</p>
          </div>
        </div>
      ))}
    </div>

    {block.pro_tips?.length > 0 && (
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Pro Tips
        </h3>
        <ul className="space-y-2">
          {block.pro_tips.map((tip: string, i: number) => (
            <li key={i} className="text-yellow-700 dark:text-yellow-300 flex items-start">
              <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    )}
  </Card>
);

const ComparisonTable = ({ block }: any) => (
  <Card className="p-6 md:p-8">
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
        <Zap className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{block.h2}</h2>
    </div>

    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{block.intro}</p>

    {block.image_url && (
      <img
        src={block.image_url}
        alt={block.h2}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
    )}

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
            {block.comparison_table?.columns?.map((col: string, i: number) => (
              <th key={i} className="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.comparison_table?.rows?.map((row: any, i: number) => (
            <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="p-4 font-medium text-gray-900 dark:text-white">{row.type}</td>
              <td className="p-4 text-gray-700 dark:text-gray-300">{row.best_for}</td>
              <td className="p-4 text-green-600 dark:text-green-400">{row.pros}</td>
              <td className="p-4 text-red-600 dark:text-red-400">{row.cons}</td>
              <td className="p-4">
                <Badge variant="primary">{row.price}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {block.buying_hint && (
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <p className="text-blue-800 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: block.buying_hint }} />
      </div>
    )}
  </Card>
);

const StorageTable = ({ block }: any) => (
  <Card className="p-6 md:p-8">
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
        <Shield className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{block.h2}</h2>
    </div>

    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{block.note}</p>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
            {block.storage_table?.columns?.map((col: string, i: number) => (
              <th key={i} className="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.storage_table?.rows?.map((row: any, i: number) => (
            <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="p-4 font-medium text-gray-900 dark:text-white">{row[0]}</td>
              <td className="p-4 text-gray-700 dark:text-gray-300">{row[1]}</td>
              <td className="p-4 text-gray-700 dark:text-gray-300">{row[2]}</td>
              <td className="p-4 text-gray-600 dark:text-gray-400 text-sm">{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const EquipmentRecommendations = ({ equipment }: any) => (
  <Card className="p-6 md:p-8">
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
        <Package className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Recommended Equipment</h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment?.map((item: any, i: number) => (
        <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="text-center mb-4">
            <Badge variant="primary">{item.category}</Badge>
          </div>
          
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
          )}
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
          
          <div className="space-y-2 mb-4">
            {item.key_benefits?.map((benefit: string, j: number) => (
              <div key={j} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <Badge variant="success">${item.price_display}</Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.best_for}</span>
          </div>
          
          <Button href={item.affiliate_url} size="sm">
            View Product
          </Button>
        </div>
      ))}
    </div>
  </Card>
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

export default function EducationalPost({ data }: any) {
  const hero = data.hero || {};
  const toc = data.table_of_contents || {};
  const intro = data.intro || {};
  const blocks = data.content_blocks || [];
  const equipment = data.equipment_recommendations || [];
  const faq = data.faq || [];

  const heroImg = data.seo?.og_image_url || data.metadata?.featured_image?.src;
  const title = hero.h1 || data.seo?.meta_title_template || "Educational Guide";
  const subtitle = hero.hook || data.seo?.meta_description_template;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/40 via-purple-50/40 to-yellow-50/40 dark:from-gray-900 dark:via-purple-900/10 dark:to-pink-900/10">
      {/* HERO */}
      <header className="relative pt-0">
        <div className="h-64 md:h-80 w-full relative overflow-hidden">
          {heroImg ? (
            <>
              <img 
                src={heroImg} 
                alt={title} 
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
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                {title}
              </h1>
              {subtitle && <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">{subtitle}</p>}
              
              {/* Value Props */}
              {hero.value_prop_bullets?.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {hero.value_prop_bullets.map((bullet: string, i: number) => (
                    <div key={i} className="flex items-center space-x-2 text-left">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Social Proof */}
              {hero.social_proof?.stat && (
                <div className="mb-6 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 inline-block">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-pink-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">{hero.social_proof.stat}</span>
                    {hero.social_proof.source && (
                      <span className="text-gray-600 dark:text-gray-400">• {hero.social_proof.source}</span>
                    )}
                  </div>
                </div>
              )}

              {data.compliance?.affiliate_disclosure_text && (
                <div className="mb-6 text-xs text-gray-700 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 max-w-2xl mx-auto">
                  {data.compliance.affiliate_disclosure_text}
                </div>
              )}
            </div>
          </Card>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 space-y-12">
        {/* Table of Contents */}
        {toc.enable && toc.items?.length > 0 && <TableOfContents items={toc.items} />}

        {/* Introduction */}
        {intro.paragraphs?.length > 0 && (
          <Card className="p-6 md:p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {intro.paragraphs.map((paragraph: string, i: number) => (
                <p key={i} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>
        )}

        {/* Content Blocks */}
        {blocks.map((block: any, i: number) => {
          const blockId = block.id;
          
          if (block.type === "howto") {
            return <div key={i} id={blockId}><StepByStep block={block} /></div>;
          }
          
          if (block.type === "comparison") {
            return <div key={i} id={blockId}><ComparisonTable block={block} /></div>;
          }
          
          if (block.type === "table") {
            return <div key={i} id={blockId}><StorageTable block={block} /></div>;
          }

          // Default content block
          return (
            <Card key={i} id={blockId} className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">{block.h2}</h2>
              
              {block.image_url && (
                <img
                  src={block.image_url}
                  alt={block.h2}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
              )}

              {block.summary && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{block.summary}</p>
              )}

              {block.body && (
                <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                  <p className="text-gray-700 dark:text-gray-300">{block.body}</p>
                </div>
              )}

              {block.bullets?.length > 0 && (
                <ul className="space-y-3 mb-6">
                  {block.bullets.map((bullet: string, j: number) => (
                    <li key={j} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {block.list?.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {block.list.map((item: any, j: number) => (
                    <div key={j} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.item}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.note}</p>
                    </div>
                  ))}
                </div>
              )}

              {block.steps?.length > 0 && (
                <div className="space-y-4 mb-6">
                  {block.steps.map((step: any, j: number) => (
                    <div key={j} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {step.step_no}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {block.faqs?.length > 0 && (
                <div className="space-y-6">
                  {block.faqs.map((item: any, j: number) => (
                    <div key={j} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Q: {item.q}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        A: {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {block.proof_notes && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">{block.proof_notes}</p>
                </div>
              )}
            </Card>
          );
        })}

        {/* Equipment Recommendations */}
        {equipment.length > 0 && (
          <div id="equipment">
            <EquipmentRecommendations equipment={equipment} />
          </div>
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

        {/* Call to Action */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Vacuum Packaging?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Get started with our recommended equipment and start preserving food like a pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#equipment" size="lg">
              View Equipment Guide
            </Button>
            <Button href="/#products" variant="secondary" size="lg">
              Browse All Products
            </Button>
          </div>
        </Card>
      </main>

      {/* JSON-LD */}
      {data.schema_settings?.enable_faq_schema && faq?.length ? <FaqJsonLd items={faq} /> : null}
    </div>
  );
}