export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  status: 'active' | 'draft' | 'out_of_stock';
  category: string;
  images: string[];
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Small", "Blue"
  price: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  children?: Category[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: 'PromptPay' | 'Cash' | 'Transfer';
  createdAt: string;
  slipUrl?: string;
  ocrResult?: {
    amount: number;
    datetime: string;
    ref: string;
  };
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  lineId?: string;
  ordersCount: number;
  ltv: number;
  notes?: string;
  lastVisit: string;
}

export interface Campaign {
  id: string;
  title: string;
  platform: 'LINE' | 'WhatsApp';
  status: 'scheduled' | 'sent' | 'draft';
  audience: string;
  scheduledAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'fixed' | 'percentage';
  usageCount: number;
  expiryDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'stock';
  read: boolean;
  createdAt: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  colors: string[];
  selectedColor: string;
  isActive: boolean;
}
