import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Megaphone, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Key, 
  Bell, 
  Ticket, 
  Truck, 
  Store,
  ChefHat,
  Layers,
  Image as ImageIcon,
  Palette
} from 'lucide-react';
import { Order, Product, Customer, Campaign, Coupon, Notification, Category, Theme } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'slip-queue', label: 'Slip Queue', icon: ImageIcon },
  { id: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'coupons', label: 'Coupons', icon: Ticket },
  { id: 'line-bot', label: 'LINE Bot', icon: MessageSquare },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'store', label: 'Store', icon: Store },
  { id: 'themes', label: 'Themes', icon: Palette },
  { id: 'api-keys', label: 'API Keys', icon: Key },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Vintage Lace Gown',
    description: 'A beautiful hand-crafted lace gown for the perfect wedding.',
    price: 45000,
    sku: 'VG-001',
    stock: 5,
    status: 'active',
    category: 'Gowns',
    images: ['https://picsum.photos/seed/gown1/400/600'],
  },
  {
    id: 'p2',
    name: 'Silk Veil',
    description: 'Elegant silk veil with floral embroidery.',
    price: 8500,
    sku: 'VL-002',
    stock: 12,
    status: 'active',
    category: 'Accessories',
    images: ['https://picsum.photos/seed/veil1/400/600'],
  },
  {
    id: 'p3',
    name: 'Crystal Tiara',
    description: 'Sparkling crystal tiara for a royal look.',
    price: 12000,
    sku: 'TR-003',
    stock: 3,
    status: 'out_of_stock',
    category: 'Accessories',
    images: ['https://picsum.photos/seed/tiara1/400/600'],
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7721',
    customerId: 'c1',
    customerName: 'Sarah Jenkins',
    items: [{ productId: 'p1', name: 'Vintage Lace Gown', quantity: 1, price: 45000 }],
    total: 45000,
    status: 'paid',
    paymentMethod: 'PromptPay',
    createdAt: new Date().toISOString(),
    slipUrl: 'https://picsum.photos/seed/slip1/400/600',
    ocrResult: { amount: 45000, datetime: '2024-03-15 14:30', ref: 'PP123456789' }
  },
  {
    id: 'ORD-7722',
    customerId: 'c2',
    customerName: 'John Doe',
    items: [{ productId: 'p2', name: 'Silk Veil', quantity: 2, price: 8500 }],
    total: 17000,
    status: 'pending',
    paymentMethod: 'Transfer',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    phone: '081-234-5678',
    lineId: 'sarah_j',
    ordersCount: 3,
    ltv: 125000,
    lastVisit: '2024-03-10',
    notes: 'Prefers lace over silk.'
  },
  {
    id: 'c2',
    name: 'Emily Rose',
    phone: '089-999-8888',
    lineId: 'emily_rose',
    ordersCount: 1,
    ltv: 8500,
    lastVisit: '2024-03-12',
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Gowns', children: [
    { id: 'cat1-1', name: 'A-Line' },
    { id: 'cat1-2', name: 'Ball Gown' },
  ]},
  { id: 'cat2', name: 'Accessories' },
  { id: 'cat3', name: 'Decor' },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: 'camp1', title: 'Summer Wedding Sale', platform: 'LINE', status: 'sent', audience: 'All Customers', scheduledAt: '2024-03-01' },
  { id: 'camp2', title: 'New Collection Launch', platform: 'WhatsApp', status: 'scheduled', audience: 'VIP Segment', scheduledAt: '2024-04-01' },
];

export const MOCK_COUPONS: Coupon[] = [
  { id: 'cp1', code: 'WEDDING10', discount: 10, type: 'percentage', usageCount: 45, expiryDate: '2024-12-31' },
  { id: 'cp2', code: 'SAVE500', discount: 500, type: 'fixed', usageCount: 12, expiryDate: '2024-06-30' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'New Order', message: 'Order ORD-7721 has been placed.', type: 'order', read: false, createdAt: new Date().toISOString() },
  { id: 'n2', title: 'Low Stock', message: 'Crystal Tiara is almost out of stock.', type: 'stock', read: true, createdAt: new Date().toISOString() },
];

export const MOCK_THEMES: Theme[] = [
  {
    id: 't1',
    name: 'Vintage Elegance',
    description: 'A classic look with soft tones and elegant typography.',
    previewUrl: 'https://picsum.photos/seed/theme1/400/300',
    colors: ['#004030', '#4A9782', '#DCD0A8', '#FFF9E5', '#8B4513'],
    selectedColor: '#004030',
    isActive: true
  },
  {
    id: 't2',
    name: 'Modern Minimal',
    description: 'Clean lines and high contrast for a contemporary feel.',
    previewUrl: 'https://picsum.photos/seed/theme2/400/300',
    colors: ['#000000', '#FFFFFF', '#808080', '#F5F5F5', '#333333'],
    selectedColor: '#000000',
    isActive: false
  },
  {
    id: 't3',
    name: 'Royal Bloom',
    description: 'Rich colors and floral patterns for a luxurious experience.',
    previewUrl: 'https://picsum.photos/seed/theme3/400/300',
    colors: ['#4B0082', '#DA70D6', '#FFD700', '#FFF0F5', '#800080'],
    selectedColor: '#4B0082',
    isActive: false
  }
];
