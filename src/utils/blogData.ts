import { BlogPost } from '../types';
import { loadBlogPosts } from './blogLoader';

// Load blog posts from separate files
export const blogPosts: BlogPost[] = await loadBlogPosts();

export const blogCategories = [
  { id: 'all', name: 'All Posts', count: blogPosts.length },
  { id: 'guides', name: 'Guides', count: blogPosts.filter(post => post.category === 'guides').length },
  { id: 'reviews', name: 'Reviews', count: blogPosts.filter(post => post.category === 'reviews').length },
  { id: 'tips', name: 'Tips', count: blogPosts.filter(post => post.category === 'tips').length },
  { id: 'news', name: 'News', count: blogPosts.filter(post => post.category === 'news').length }
];

export const featuredPosts = blogPosts.filter(post => post.featured);
export const recentPosts = blogPosts.slice(0, 3);