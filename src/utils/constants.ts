import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Hefty Shrink-Pak – 4 Large Vacuum Storage Bags',
    description: 'Durable, reusable bags that shrink clothes, bedding, and towels to save space. Each bag holds ~10 sweaters. Easy Pack-Seal-Vac system, protects from moisture, dirt, and insects — ideal for storage, moving, or travel.',
    price: '$24.99',
    image: 'https://m.media-amazon.com/images/I/818NcYwtZ8L._AC_SL1500_.jpg',
    amazonUrl: 'https://amzn.to/41CX2r5',
    category: 'clothes',
    rating: 4.8,
    features: ['Holds ~10 Sweaters Each', 'Pack-Seal-Vac System', 'Moisture Protection', 'Reusable Design']
  },
  {
    id: '2',
    name: 'Cozy Essential – 20 Pack Vacuum Storage Bags with Electric Pump',
    description: 'Set of 20 space-saver bags with a compact electric pump. Reduces storage volume by up to 80%. Features triple-seal turbo valve and double-zip for protection. Includes multiple bag sizes (jumbo to x-small).',
    price: '$39.99',
    image: 'https://m.media-amazon.com/images/I/81V+q5MvidL._AC_SL1500_.jpg',
    amazonUrl: 'https://amzn.to/4lEeJNQ',
    category: 'clothes',
    rating: 4.7,
    features: ['20 Bags + Electric Pump', '80% Space Reduction', 'Triple-Seal Valve', 'Multiple Sizes']
  },
  {
    id: '3',
    name: 'Nesco Deluxe VS-12 Vacuum Sealer (130W, Silver)',
    description: 'High-performance sealer with double vacuum pump and 3 sealing modes (dry, moist, double). Gentle/normal pressure options for soft or large foods. Built-in bag storage & cutter. Includes 2 starter rolls.',
    price: '$89.99',
    image: 'https://m.media-amazon.com/images/I/81pW+v0C58L._AC_SL1500_.jpg',
    amazonUrl: 'https://amzn.to/3Vas0mx',
    category: 'machine',
    rating: 4.5,
    features: ['Double Vacuum Pump', '3 Sealing Modes', 'Built-in Storage & Cutter', '130W Power']
  },
  {
    id: '4',
    name: 'Chef Preserve Compact Handheld Vacuum Sealer + 30 Bags',
    description: 'Portable, rechargeable handheld vacuum sealer. Seals bags in 5 seconds. Comes with reusable, BPA-free, odor-free bags. Keeps food fresh up to 5x longer. Compact design (pepper grinder size), great for travel, camping, or everyday kitchen use.',
    price: '$49.99',
    image: 'https://m.media-amazon.com/images/I/71XEvtKF9oL._AC_SL1500_.jpg',
    amazonUrl: 'https://amzn.to/4fJTusC',
    category: 'machine',
    rating: 4.6,
    features: ['5-Second Sealing', 'Rechargeable Battery', '30 Bags Included', 'Compact Design']
  },
];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'Package' },
  { id: 'food', name: 'Food Storage', icon: 'Apple' },
  { id: 'clothes', name: 'Clothing', icon: 'Shirt' },
  { id: 'storage', name: 'Storage Solutions', icon: 'Archive' },
  { id: 'machine', name: 'Machines', icon: 'Zap' }
] as const;