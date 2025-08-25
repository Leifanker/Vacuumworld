import { BlogPost } from '../types';
import { fetchAffiliateIndex, fetchAffiliateBySlug } from './affiliateLoader';

// Convert affiliate post data to BlogPost format
function convertAffiliatePostToBlogPost(slug: string, data: any): BlogPost {
  const seo = data.seo || {};
  const settings = data.settings || {};
  const product = data.product || {};
  
  return {
    id: slug,
    title: seo.meta_title_template || 'Untitled Post',
    slug: slug,
    excerpt: seo.meta_description_template || 'No description available',
    content: generateContentFromAffiliateData(data),
    author: 'VacuumWorld Team',
    publishDate: new Date().toISOString().split('T')[0], // Use current date as fallback
    readTime: 5, // Default read time
    image: seo.og_image_url || product.images?.[0] || product.image_url || data.products?.[0]?.image_url || 'https://images.pexels.com/photos/4792081/pexels-photo-4792081.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: extractTagsFromAffiliateData(data),
    category: determineCategory(data),
    featured: data.quick_picks?.length > 0 || false
  };
}

// Generate readable content from affiliate data
function generateContentFromAffiliateData(data: any): string {
  let content = '';
  
  // Add introduction
  if (data.seo?.meta_description_template) {
    content += `${data.seo.meta_description_template}\n\n`;
  }
  
  // Add quick picks section
  if (data.quick_picks?.length > 0) {
    content += '## Quick Picks\n\n';
    data.quick_picks.forEach((pick: any) => {
      const product = data.products?.find((p: any) => p.id === pick.product_id);
      if (product) {
        content += `**${pick.label}**: ${product.name} - ${product.summary_value_prop}\n\n`;
      }
    });
  }
  
  // Add products section
  if (data.products?.length > 0) {
    content += '## Featured Products\n\n';
    data.products.forEach((product: any) => {
      content += `### ${product.name}\n\n`;
      content += `${product.summary_value_prop}\n\n`;
      
      if (product.key_specs?.length > 0) {
        content += '**Key Features:**\n';
        product.key_specs.forEach((spec: string) => {
          content += `- ${spec}\n`;
        });
        content += '\n';
      }
      
      if (product.pros?.length > 0) {
        content += '**Pros:**\n';
        product.pros.forEach((pro: string) => {
          content += `- ${pro}\n`;
        });
        content += '\n';
      }
      
      if (product.cons?.length > 0) {
        content += '**Cons:**\n';
        product.cons.forEach((con: string) => {
          content += `- ${con}\n`;
        });
        content += '\n';
      }
    });
  }
  
  // Add FAQ section
  const faqSection = data.sections?.find((s: any) => s.id === 'faqs');
  if (faqSection?.items?.length > 0) {
    content += '## Frequently Asked Questions\n\n';
    faqSection.items.forEach((faq: any) => {
      content += `**Q: ${faq.q}**\n\n`;
      content += `A: ${faq.a_template}\n\n`;
    });
  }
  
  return content;
}

// Extract tags from affiliate data
function extractTagsFromAffiliateData(data: any): string[] {
  const tags: string[] = [];
  
  if (data.settings?.niche) {
    tags.push(data.settings.niche);
  }
  
  if (data.seo?.secondary_keywords) {
    tags.push(...data.seo.secondary_keywords);
  }
  
  // Add product-based tags
  if (data.products?.length > 0) {
    tags.push('Product Review');
    if (data.products.length > 1) {
      tags.push('Comparison');
    }
  }
  
  return tags.slice(0, 4); // Limit to 4 tags
}

// Determine category based on affiliate data
function determineCategory(data: any): 'tips' | 'reviews' | 'guides' | 'news' {
  if (data.template === 'review') {
    return 'reviews';
  }
  
  if (data.products?.length > 0) {
    return 'reviews';
  }
  
  if (data.sections?.find((s: any) => s.id === 'how_to_tips')) {
    return 'guides';
  }
  
  return 'guides';
}

// Load blog posts from affiliate data
export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    const slugs = await fetchAffiliateIndex();
    const posts: BlogPost[] = [];
    
    for (const slug of slugs) {
      try {
        const data = await fetchAffiliateBySlug(slug);
        if (data) {
          const blogPost = convertAffiliatePostToBlogPost(slug, data);
          posts.push(blogPost);
        }
      } catch (error) {
        console.error(`Error loading affiliate post ${slug}:`, error);
      }
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error loading affiliate posts:', error);
    return [];
  }
}

// Initialize blog posts (this will be called by components)
let blogPostsCache: BlogPost[] | null = null;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!blogPostsCache) {
    blogPostsCache = await loadBlogPosts();
  }
  return blogPostsCache;
}

// Export blog posts and derived data
export const blogPosts: BlogPost[] = [];

// Initialize the cache
getBlogPosts().then(posts => {
  blogPosts.splice(0, blogPosts.length, ...posts);
});

export const blogCategories = [
  { id: 'all', name: 'All Posts', count: 0 },
  { id: 'guides', name: 'Guides', count: 0 },
  { id: 'reviews', name: 'Reviews', count: 0 },
  { id: 'tips', name: 'Tips', count: 0 },
  { id: 'news', name: 'News', count: 0 }
];

export const featuredPosts: BlogPost[] = [];
export const recentPosts: BlogPost[] = [];

// Update categories and featured posts when data loads
getBlogPosts().then(posts => {
  // Update category counts
  blogCategories[0].count = posts.length; // all
  blogCategories[1].count = posts.filter(post => post.category === 'guides').length;
  blogCategories[2].count = posts.filter(post => post.category === 'reviews').length;
  blogCategories[3].count = posts.filter(post => post.category === 'tips').length;
  blogCategories[4].count = posts.filter(post => post.category === 'news').length;
  
  // Update featured and recent posts
  const featured = posts.filter(post => post.featured);
  const recent = posts.slice(0, 3);
  
  featuredPosts.splice(0, featuredPosts.length, ...featured);
  recentPosts.splice(0, recentPosts.length, ...recent);
});