import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import BlogSection from './components/BlogSection';
import About from './components/About';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AffiliatePostRoute from "@/routes/AffiliatePostRoute";
import AffiliateIndexRoute from "@/routes/AffiliateIndexRoute";
import BlogPostRoute from "@/routes/BlogPostRoute";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize dark mode from localStorage or system preference
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const HomePage = () => (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Helmet>
        <title>VacuumWorld - Vacuum Packaging Solutions & Product Recommendations</title>
        <meta name="description" content="Discover the best vacuum packaging solutions for food preservation and clothing storage at VacuumWorld. Expert recommendations and reviews of top-rated vacuum sealers and storage products." />
        <link rel="canonical" href="https://www.vacuumworld.net/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="VacuumWorld - Vacuum Packaging Solutions" />
        <meta property="og:description" content="Expert recommendations for vacuum packaging solutions that preserve food freshness and optimize storage space." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vacuumworld.net/" />
        <meta property="og:site_name" content="VacuumWorld" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VacuumWorld - Vacuum Packaging Solutions" />
        <meta name="twitter:description" content="Expert recommendations for vacuum packaging solutions that preserve food freshness and optimize storage space." />
      </Helmet>
      
      <Header 
        isDark={isDark} 
        toggleDark={toggleDark}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      <main>
        <Hero />
        <ProductGrid />
        <BlogSection />
        <About />
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<AffiliateIndexRoute />} />
        <Route path="/posts/:slug" element={<AffiliatePostRoute />} />
        <Route path="/blog/:slug" element={<BlogPostRoute />} />
        {/* fallback */}
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
