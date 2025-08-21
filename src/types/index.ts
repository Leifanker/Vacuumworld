export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  amazonUrl: string;
  category: 'food' | 'clothes' | 'storage' | 'machine';
  rating: number;
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  image: string;
  tags: string[];
  category: 'tips' | 'reviews' | 'guides' | 'news';
  featured: boolean;
}