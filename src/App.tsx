import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import BlogSection from './components/BlogSection';
import About from './components/About';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AffiliatePostRoute from "./routes/AffiliatePostRoute";
import AffiliateIndexRoute from "@/routes/AffiliateIndexRoute";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
      {/* Simple header (optional) */}
      <div style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/">Home</Link>{" "}
        | <Link to="/home/project/src/content/posts/Best vacumes for meat.json">Sample Affiliate Post</Link>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:slug" element={<AffiliatePostRoute />} />
        {/* fallback */}
        <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}