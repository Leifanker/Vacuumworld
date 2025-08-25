import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { fetchAffiliateBySlug } from '../utils/affiliateLoader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AffiliatePost from '../components/AffiliatePost';
import ReviewPost from '../components/ReviewPost';
import EducationalPost from '../components/EducationalPost';

const BlogPostRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [affiliateData, setAffiliateData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const loadAffiliatePost = async () => {
      if (!slug) {
        setError(true);
        setLoading(false);
        return;
      }
      
      try {
        console.log('[BlogPostRoute] Loading affiliate post for slug:', slug);
        const data = await fetchAffiliateBySlug(slug);
        console.log('[BlogPostRoute] Loaded affiliate data:', data);
        
        if (data) {
          setAffiliateData(data);
        } else {
          setError(true);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading affiliate post:', error);
        setError(true);
        setLoading(false);
      }
    };

    loadAffiliatePost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <Helmet>
          <title>Loading... - VacuumWorld</title>
        </Helmet>
        <Header 
          isDark={isDark} 
          toggleDark={toggleDark}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        <div className="pt-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !affiliateData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Helmet>
          <title>Article Not Found - VacuumWorld</title>
          <meta name="description" content="The article you're looking for doesn't exist." />
        </Helmet>
        <Header 
          isDark={isDark} 
          toggleDark={toggleDark}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine if this is a review post or regular affiliate post
  const isReview = String(affiliateData?.template || "").toLowerCase() === "review";
  const isEducational = String(affiliateData?.template || "").toLowerCase() === "educational";
  
  // Generate SEO data
  const seoTitle = affiliateData?.seo?.meta_title_template || affiliateData?.product?.name || affiliateData?.metadata?.title || "VacuumWorld";
  const seoDescription = affiliateData?.seo?.meta_description_template || affiliateData?.metadata?.meta_description || "";
  const canonicalUrl = `https://www.vacuumworld.net/blog/${slug}`;
  const ogTitle = affiliateData?.seo?.og_title_template || seoTitle;
  const ogDescription = affiliateData?.seo?.og_description_template || seoDescription;
  const ogImage = affiliateData?.seo?.og_image_url || affiliateData?.product?.images?.[0] || affiliateData?.product?.image_url || affiliateData?.metadata?.featured_image?.src;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
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
        {affiliateData?.metadata?.author && <meta name="author" content={affiliateData.metadata.author} />}
        {affiliateData?.metadata?.publish_date && <meta property="article:published_time" content={affiliateData.metadata.publish_date} />}
        {affiliateData?.metadata?.last_updated && <meta property="article:modified_time" content={affiliateData.metadata.last_updated} />}
        {affiliateData?.seo?.primary_keyword && <meta name="keywords" content={affiliateData.seo.primary_keyword} />}
      </Helmet>
      
      <Header 
        isDark={isDark} 
        toggleDark={toggleDark}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      {/* Back Button */}
      <div className="pt-20 pb-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <Link
            to="/#blog"
            className="inline-flex items-center space-x-2 text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Render the appropriate post component */}
      {isReview ? (
        <ReviewPost data={affiliateData} />
      ) : isEducational ? (
        <EducationalPost data={affiliateData} />
      ) : (
        <AffiliatePost data={affiliateData} />
      )}

      <Footer />
    </div>
  );
};

export default BlogPostRoute;