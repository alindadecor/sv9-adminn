import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Search, 
  Plus, 
  Filter, 
  Grid, 
  List, 
  ChevronRight, 
  Download, 
  Printer, 
  CheckCircle2, 
  XCircle,
  Clock,
  ArrowRight,
  MoreVertical,
  Edit,
  Trash2,
  Image as ImageIcon,
  Upload,
  ChevronDown,
  ExternalLink,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ChefHat,
  Megaphone,
  BarChart3,
  Settings,
  Bell,
  ArrowLeft,
  Layers,
  Ticket,
  MessageSquare,
  Truck,
  Store,
  Key,
  Info,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { cn, formatCurrency, formatDate } from './lib/utils';
import { NAV_ITEMS, MOCK_PRODUCTS, MOCK_ORDERS, MOCK_CUSTOMERS, MOCK_CATEGORIES, MOCK_CAMPAIGNS, MOCK_COUPONS, MOCK_NOTIFICATIONS, MOCK_THEMES } from './constants';
import { OrderStatus, Product, Order, Customer, Theme } from './types';

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }: { activeTab: string, setActiveTab: (id: string) => void, isOpen: boolean, onClose: () => void }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "w-64 h-screen bg-primary text-cream flex flex-col fixed left-0 top-0 z-[70] transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif italic tracking-tight">Ever After</h1>
            <p className="text-xs font-sans uppercase tracking-[0.2em] opacity-60 mt-1">Owner Dashboard</p>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-cream/60 hover:text-cream">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 space-y-1 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                  isActive 
                    ? "bg-accent text-primary font-medium shadow-lg" 
                    : "hover:bg-white/10 text-cream/70 hover:text-cream"
                )}
              >
                <Icon size={20} className={cn(isActive ? "text-primary" : "text-accent/60 group-hover:text-accent")} />
                <span className="text-sm font-sans">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-serif font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="text-xs opacity-50">Store Owner</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ title, onMenuClick }: { title: string, onMenuClick: () => void }) => {
  return (
    <header className="h-20 border-b vintage-border flex items-center justify-between px-4 lg:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 text-primary/60 hover:text-primary transition-colors">
          <Menu size={24} />
        </button>
        <h2 className="text-xl lg:text-2xl font-serif italic text-primary truncate max-w-[150px] lg:max-w-none">{title}</h2>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="pl-10 pr-4 py-2 bg-cream/50 border vintage-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 w-48 lg:w-64 transition-all"
          />
        </div>
        <button className="p-2 text-primary/60 hover:text-primary transition-colors md:hidden">
          <Search size={20} />
        </button>
        <button className="relative p-2 text-primary/60 hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};

// --- Screens ---

const DashboardScreen = () => {
  const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  const pieData = [
    { name: 'Pending', value: 400 },
    { name: 'Paid', value: 300 },
    { name: 'Preparing', value: 300 },
    { name: 'Delivered', value: 200 },
  ];

  const COLORS = ['#DCD0A8', '#4A9782', '#004030', '#FFF9E5'];

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: "Today Orders", value: "24", trend: "+12%", icon: ShoppingCart },
          { label: "Revenue", value: "฿124,500", trend: "+8.4%", icon: BarChart3 },
          { label: "Pending Payment", value: "฿12,000", trend: "-2%", icon: Clock },
          { label: "Low Stock", value: "8 Items", trend: "Alert", icon: Package, color: "text-red-500" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 lg:p-6 rounded-2xl vintage-shadow vintage-border group hover:border-accent transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-xl bg-cream group-hover:bg-accent/20 transition-colors", kpi.color)}>
                <kpi.icon size={24} />
              </div>
              <span className={cn("text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600", kpi.trend === 'Alert' && "bg-red-50 text-red-600")}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-sm text-primary/60 font-sans uppercase tracking-wider">{kpi.label}</p>
            <h3 className="text-xl lg:text-2xl font-serif font-bold mt-1">{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 bg-white p-4 lg:p-8 rounded-2xl vintage-shadow vintage-border">
          <div className="flex justify-between items-center mb-6 lg:mb-8">
            <h3 className="text-lg lg:text-xl font-serif italic">Revenue (Last 7 Days)</h3>
            <select className="text-[10px] lg:text-xs border vintage-border rounded-lg px-2 py-1 bg-cream/30">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="h-[250px] lg:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} />
                <Tooltip 
                  cursor={{ fill: '#FFF9E5' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="revenue" fill="#4A9782" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-8 rounded-2xl vintage-shadow vintage-border">
          <h3 className="text-lg lg:text-xl font-serif italic mb-6 lg:mb-8">Order Status</h3>
          <div className="h-[250px] lg:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-primary/70">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-primary p-6 lg:p-8 rounded-2xl text-cream flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl lg:text-2xl font-serif italic">Ready to grow your business?</h3>
          <p className="text-cream/60 mt-1 text-sm lg:text-base">Quickly manage your store with these actions.</p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-3 lg:gap-4">
          <button className="bg-accent text-primary px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white transition-all text-sm">
            <Plus size={18} /> New Order
          </button>
          <button className="bg-white/10 text-cream px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white/20 transition-all text-sm">
            <Package size={18} /> Add Product
          </button>
          <button className="bg-white/10 text-cream px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white/20 transition-all text-sm">
            <ImageIcon size={18} /> View Slips
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-cream w-full max-w-2xl rounded-3xl vintage-shadow border-4 border-white overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 lg:p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-serif italic">Quick View</h3>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden vintage-border">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{product.category}</p>
                <h4 className="text-3xl font-serif italic mb-2">{product.name}</h4>
                <p className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Description</p>
                <p className="text-sm text-primary/70 leading-relaxed line-clamp-4">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-xl vintage-border">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-primary/40 mb-1">SKU</p>
                  <p className="text-sm font-mono font-bold">{product.sku}</p>
                </div>
                <div className="p-3 bg-white rounded-xl vintage-border">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-primary/40 mb-1">Stock</p>
                  <p className="text-sm font-bold">{product.stock} units</p>
                </div>
              </div>

              <div className="pt-4">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
                  product.status === 'active' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {product.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BulkEditModal = ({ selectedCount, onClose, onSave }: { selectedCount: number, onClose: () => void, onSave: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-cream w-full max-w-lg rounded-3xl vintage-shadow border-4 border-white overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl lg:text-2xl font-serif italic">Bulk Edit Products</h3>
              <p className="text-xs lg:text-sm text-primary/60 mt-1">Modifying {selectedCount} selected items</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/40">Price Adjustment</label>
                <div className="flex gap-2">
                  <select className="flex-1 p-3 bg-white border vintage-border rounded-xl text-xs lg:text-sm outline-none focus:ring-2 focus:ring-accent">
                    <option>Set to</option>
                    <option>Increase by</option>
                    <option>Decrease by</option>
                  </select>
                  <input type="text" placeholder="Value" className="w-20 lg:w-24 p-3 bg-white border vintage-border rounded-xl text-xs lg:text-sm outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/40">Update Status</label>
                <select className="w-full p-3 bg-white border vintage-border rounded-xl text-xs lg:text-sm outline-none focus:ring-2 focus:ring-accent">
                  <option>No Change</option>
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/40">Change Category</label>
              <select className="w-full p-3 bg-white border vintage-border rounded-xl text-xs lg:text-sm outline-none focus:ring-2 focus:ring-accent">
                <option>No Change</option>
                {MOCK_CATEGORIES.map(cat => (
                  <option key={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-primary/40">Update Tags</label>
              <input type="text" placeholder="Add tags (comma separated)" className="w-full p-3 bg-white border vintage-border rounded-xl text-xs lg:text-sm outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-3 lg:py-4 border vintage-border rounded-full font-bold uppercase tracking-widest text-[10px] lg:text-xs hover:bg-white transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={onSave}
              className="flex-1 py-3 lg:py-4 bg-primary text-cream rounded-full font-bold uppercase tracking-widest text-[10px] lg:text-xs hover:bg-secondary transition-all shadow-lg"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProductListScreen = ({ onSelect, onAdd }: { onSelect: (p: Product) => void, onAdd: () => void }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkEditing, setIsBulkEditing] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === MOCK_PRODUCTS.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(MOCK_PRODUCTS.map(p => p.id));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg p-1 vintage-border">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-2 rounded-md transition-all", view === 'grid' ? "bg-accent text-primary" : "text-primary/40")}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-2 rounded-md transition-all", view === 'list' ? "bg-accent text-primary" : "text-primary/40")}
            >
              <List size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg vintage-border">
            <Filter size={16} className="text-primary/40" />
            <select className="text-sm bg-transparent focus:outline-none">
              <option>All Categories</option>
              <option>Gowns</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button 
              onClick={() => setIsBulkEditing(true)}
              className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-sm"
            >
              Bulk Edit ({selectedIds.length})
            </button>
          )}
          <button 
            onClick={onAdd}
            className="bg-primary text-cream px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-secondary transition-all"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <motion.div 
              layout
              key={product.id} 
              onClick={() => onSelect(product)}
              className={cn(
                "bg-white rounded-2xl overflow-hidden vintage-shadow vintage-border group cursor-pointer relative",
                selectedIds.includes(product.id) && "ring-2 ring-accent"
              )}
            >
              <div className="absolute top-3 left-3 lg:top-4 lg:left-4 z-10">
                <button 
                  onClick={(e) => toggleSelect(product.id, e)}
                  className={cn(
                    "w-5 h-5 lg:w-6 lg:h-6 rounded-md border-2 flex items-center justify-center transition-all",
                    selectedIds.includes(product.id) 
                      ? "bg-accent border-accent text-primary" 
                      : "bg-white/80 border-white text-transparent hover:border-accent"
                  )}
                >
                  <CheckCircle2 size={12} />
                </button>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="bg-white text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-accent transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                  >
                    <Eye size={14} /> Quick View
                  </button>
                </div>
                <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
                  <span className={cn(
                    "px-2 py-0.5 lg:px-3 lg:py-1 rounded-full text-[8px] lg:text-[10px] font-bold uppercase tracking-widest",
                    product.status === 'active' ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {product.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="p-4 lg:p-5">
                <p className="text-[8px] lg:text-[10px] text-accent font-bold uppercase tracking-widest mb-1">{product.category}</p>
                <h4 className="text-base lg:text-lg font-serif mb-2 truncate">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-lg lg:text-xl font-bold text-primary">{formatCurrency(product.price)}</span>
                  <span className="text-[10px] lg:text-xs text-primary/40">Stock: {product.stock}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl vintage-shadow vintage-border overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-cream/50 border-b vintage-border">
                <th className="px-4 lg:px-6 py-3 lg:py-4 w-10">
                  <button 
                    onClick={toggleSelectAll}
                    className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                      selectedIds.length === MOCK_PRODUCTS.length
                        ? "bg-accent border-accent text-primary"
                        : "bg-white border-primary/20 text-transparent"
                    )}
                  >
                    <CheckCircle2 size={12} />
                  </button>
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Product</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Category</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Price</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Stock</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Status</th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y vintage-border">
              {MOCK_PRODUCTS.map((product) => (
                <tr 
                  key={product.id} 
                  onClick={() => onSelect(product)} 
                  className={cn(
                    "hover:bg-cream/20 transition-colors cursor-pointer",
                    selectedIds.includes(product.id) && "bg-accent/5"
                  )}
                >
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <button 
                      onClick={(e) => toggleSelect(product.id, e)}
                      className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                        selectedIds.includes(product.id) 
                          ? "bg-accent border-accent text-primary" 
                          : "bg-white border-primary/20 text-transparent hover:border-accent"
                      )}
                    >
                      <CheckCircle2 size={12} />
                    </button>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-medium text-xs lg:text-sm">{product.name}</p>
                        <p className="text-[8px] lg:text-[10px] text-primary/40 uppercase tracking-widest">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-primary/70">{product.category}</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-medium">{formatCurrency(product.price)}</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">{product.stock}</td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[8px] lg:text-[10px] font-bold uppercase tracking-widest",
                      product.status === 'active' ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                    )}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                    <button className="p-2 hover:bg-cream rounded-full transition-colors text-primary/40 hover:text-primary">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {isBulkEditing && (
          <BulkEditModal 
            selectedCount={selectedIds.length} 
            onClose={() => setIsBulkEditing(false)} 
            onSave={() => {
              setIsBulkEditing(false);
              setSelectedIds([]);
            }}
          />
        )}
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetailScreen = ({ product, onBack }: { product: Product, onBack: () => void }) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors">
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden vintage-shadow border-4 border-white">
            <img src={product.images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="grid grid-cols-4 gap-3 lg:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden vintage-border cursor-pointer hover:opacity-80 transition-opacity">
                <img src={`https://picsum.photos/seed/prod${i}/200/200`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          <div>
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">{product.category}</p>
            <h3 className="text-3xl lg:text-4xl font-serif italic">{product.name}</h3>
            <p className="text-xl lg:text-2xl font-bold mt-4">{formatCurrency(product.price)}</p>
          </div>

          <div className="space-y-3 lg:space-y-4">
            <h4 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-primary/40">Description</h4>
            <p className="text-sm lg:text-base text-primary/70 leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="p-3 lg:p-4 bg-white rounded-2xl vintage-border">
              <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">SKU</p>
              <p className="text-sm lg:text-base font-mono font-bold">{product.sku}</p>
            </div>
            <div className="p-3 lg:p-4 bg-white rounded-2xl vintage-border">
              <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Stock Level</p>
              <p className="text-sm lg:text-base font-bold">{product.stock} units</p>
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4">
            <h4 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-primary/40">Variants</h4>
            <div className="bg-white rounded-2xl vintage-border overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-xs lg:text-sm min-w-[300px]">
                <thead className="bg-cream/50 border-b vintage-border">
                  <tr>
                    <th className="px-4 py-2 font-bold uppercase tracking-widest text-[8px] lg:text-[10px] opacity-40">Size/Color</th>
                    <th className="px-4 py-2 font-bold uppercase tracking-widest text-[8px] lg:text-[10px] opacity-40">Price</th>
                    <th className="px-4 py-2 font-bold uppercase tracking-widest text-[8px] lg:text-[10px] opacity-40">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y vintage-border">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <tr key={size}>
                      <td className="px-4 py-2 lg:py-3 font-medium">{size}</td>
                      <td className="px-4 py-2 lg:py-3">{formatCurrency(product.price)}</td>
                      <td className="px-4 py-2 lg:py-3">4</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3 lg:gap-4 pt-4">
            <button className="flex-1 bg-primary text-cream py-3 lg:py-4 rounded-full text-sm font-medium hover:bg-secondary transition-all flex items-center justify-center gap-2">
              <Edit size={18} /> Edit Product
            </button>
            <button className="p-3 lg:p-4 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddProductScreen = ({ onCancel }: { onCancel: () => void }) => {
  const [step, setStep] = useState(1);
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl lg:text-3xl font-serif italic">Add New Product</h3>
        <button onClick={onCancel} className="text-primary/40 hover:text-primary"><X size={24} /></button>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 lg:gap-4">
        {[1, 2, 3, 4].map((s) => (
          <React.Fragment key={s}>
            <div className={cn(
              "w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-base font-bold transition-all",
              step === s ? "bg-primary text-cream scale-110 shadow-lg" : step > s ? "bg-accent text-primary" : "bg-white text-primary/20 vintage-border"
            )}>
              {step > s ? <CheckCircle2 size={16} lg:size={20} /> : s}
            </div>
            {s < 4 && <div className={cn("flex-1 h-px", step > s ? "bg-accent" : "bg-primary/10")} />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white p-5 lg:p-8 rounded-3xl vintage-shadow vintage-border min-h-[350px] lg:min-h-[400px]">
        {step === 1 && (
          <div className="space-y-4 lg:space-y-6 animate-in slide-in-from-right duration-300">
            <h4 className="text-lg lg:text-xl font-serif italic">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Product Name</label>
                <input type="text" className="w-full p-2.5 lg:p-3 bg-cream/30 border vintage-border rounded-xl text-sm" placeholder="e.g. Silk Wedding Veil" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Category</label>
                <select className="w-full p-2.5 lg:p-3 bg-cream/30 border vintage-border rounded-xl text-sm">
                  <option>Select Category</option>
                  <option>Gowns</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Description</label>
                <textarea rows={4} className="w-full p-2.5 lg:p-3 bg-cream/30 border vintage-border rounded-xl text-sm" placeholder="Describe your product..."></textarea>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h4 className="text-xl font-serif italic">Variants & Options</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-primary/60">Add sizes, colors, or other variations.</p>
                <button className="text-accent hover:text-primary flex items-center gap-1 text-sm font-bold uppercase tracking-widest">
                  <Plus size={16} /> Add Variant
                </button>
              </div>
              <div className="bg-cream/30 p-4 rounded-2xl border-2 border-dashed border-accent/40 text-center py-12">
                <p className="text-primary/40 text-sm italic">No variants added yet.</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h4 className="text-xl font-serif italic">Product Images</h4>
            <div className="border-2 border-dashed border-accent/40 rounded-3xl p-12 text-center space-y-4 bg-cream/20">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent">
                <Upload size={32} />
              </div>
              <div>
                <p className="font-medium">Drag and drop images here</p>
                <p className="text-xs text-primary/40 mt-1">PNG, JPG, or WEBP up to 5MB</p>
              </div>
              <button className="bg-primary text-cream px-6 py-2 rounded-full text-sm font-medium">Browse Files</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h4 className="text-xl font-serif italic">Pricing & Inventory</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Base Price (฿)</label>
                <input type="number" className="w-full p-3 bg-cream/30 border vintage-border rounded-xl" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">SKU</label>
                <input type="text" className="w-full p-3 bg-cream/30 border vintage-border rounded-xl" placeholder="SKU-000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Initial Stock</label>
                <input type="number" className="w-full p-3 bg-cream/30 border vintage-border rounded-xl" placeholder="0" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4">
        <button 
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="px-8 py-3 rounded-full font-medium text-primary/40 hover:text-primary disabled:opacity-0 transition-all"
        >
          Previous
        </button>
        <button 
          onClick={() => step < 4 ? setStep(s => s + 1) : onCancel()}
          className="bg-primary text-cream px-12 py-3 rounded-full font-medium hover:bg-secondary transition-all shadow-xl shadow-primary/20"
        >
          {step === 4 ? 'Complete' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

const OrderListScreen = ({ onSelect }: { onSelect: (o: Order) => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {['All', 'Pending', 'Paid', 'Preparing', 'Delivered'].map((status) => (
            <button 
              key={status}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                status === 'All' ? "bg-primary text-cream" : "bg-white text-primary/60 hover:bg-cream vintage-border"
              )}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 vintage-border hover:bg-cream transition-all">
            <Download size={16} /> Export
          </button>
          <button className="bg-accent text-primary px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white transition-all">
            Bulk Update
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl vintage-shadow vintage-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream/50 border-b vintage-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Customer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Items</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Total</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Payment</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y vintage-border">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} onClick={() => onSelect(order)} className="hover:bg-cream/20 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-mono text-sm font-bold text-primary">{order.id}</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-sm">{order.customerName}</p>
                  <p className="text-[10px] text-primary/40 uppercase tracking-widest">{formatDate(order.createdAt)}</p>
                </td>
                <td className="px-6 py-4 text-sm text-primary/70">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </td>
                <td className="px-6 py-4 font-medium">{formatCurrency(order.total)}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-cream text-primary/70">
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    {
                      'bg-yellow-100 text-yellow-700': order.status === 'pending',
                      'bg-green-100 text-green-700': order.status === 'paid',
                      'bg-blue-100 text-blue-700': order.status === 'preparing',
                      'bg-purple-100 text-purple-700': order.status === 'delivered',
                    }[order.status]
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-accent hover:text-primary transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrderDetailScreen = ({ order, onBack }: { order: Order, onBack: () => void }) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Orders</span>
        </button>
        <div className="flex gap-2 lg:gap-3">
          <button className="flex-1 sm:flex-none bg-white text-primary px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium flex items-center justify-center gap-2 vintage-border hover:bg-cream">
            <Printer size={16} /> Print
          </button>
          <button className="flex-1 sm:flex-none bg-primary text-cream px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium hover:bg-secondary">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Order Info */}
          <div className="bg-white p-5 lg:p-8 rounded-3xl vintage-shadow vintage-border">
            <div className="flex justify-between items-start mb-6 lg:mb-8">
              <div>
                <h3 className="text-xl lg:text-2xl font-serif italic">Order {order.id}</h3>
                <p className="text-xs lg:text-sm text-primary/40 mt-1">Placed on {formatDate(order.createdAt)}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest">
                {order.status}
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary/40">Items</h4>
              <div className="divide-y vintage-border">
                {order.items.map((item, i) => (
                  <div key={i} className="py-3 lg:py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cream rounded-lg flex items-center justify-center text-accent">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm lg:text-base font-medium">{item.name}</p>
                        <p className="text-[10px] lg:text-xs text-primary/40">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm lg:text-base font-medium">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-between items-center text-lg lg:text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Verification */}
          {order.paymentMethod === 'PromptPay' && (
            <div className="bg-white p-5 lg:p-8 rounded-3xl vintage-shadow vintage-border">
              <h4 className="text-lg lg:text-xl font-serif italic mb-6">Payment Verification</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-4">
                  <p className="text-[10px] lg:text-sm font-bold uppercase tracking-widest text-primary/40">Payment Slip</p>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden vintage-border cursor-zoom-in">
                    <img src={order.slipUrl || 'https://picsum.photos/seed/slip/400/600'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4 lg:space-y-6">
                  <p className="text-[10px] lg:text-sm font-bold uppercase tracking-widest text-primary/40">OCR Result</p>
                  <div className="space-y-3 lg:space-y-4">
                    <div className="p-3 lg:p-4 bg-cream/30 rounded-xl border vintage-border">
                      <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-primary/40">Amount</p>
                      <p className="font-bold text-base lg:text-lg">{formatCurrency(order.ocrResult?.amount || 0)}</p>
                    </div>
                    <div className="p-3 lg:p-4 bg-cream/30 rounded-xl border vintage-border">
                      <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-primary/40">Reference</p>
                      <p className="font-mono text-xs lg:text-sm truncate">{order.ocrResult?.ref || 'N/A'}</p>
                    </div>
                    <div className="p-3 lg:p-4 bg-cream/30 rounded-xl border vintage-border">
                      <p className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-primary/40">Date/Time</p>
                      <p className="text-xs lg:text-sm">{order.ocrResult?.datetime || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 lg:gap-3 pt-4">
                    <button className="flex-1 bg-green-600 text-white py-2 lg:py-3 rounded-full text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} /> Approve
                    </button>
                    <button className="flex-1 bg-red-50 text-red-600 py-2 lg:py-3 rounded-full text-sm font-medium hover:bg-red-600 hover:text-white flex items-center justify-center gap-2">
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Customer Card */}
          <div className="bg-primary text-cream p-8 rounded-3xl vintage-shadow">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-6">Customer Information</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-serif font-bold">
                {order.customerName.charAt(0)}
              </div>
              <div>
                <p className="text-xl font-serif italic">{order.customerName}</p>
                <p className="text-sm opacity-60">Customer ID: {order.customerId}</p>
              </div>
            </div>
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm">
                <Users size={16} className="text-accent" />
                <span>081-234-5678</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MessageSquare size={16} className="text-accent" />
                <span>@sarah_j</span>
              </div>
              <button className="w-full py-3 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-all">
                View Profile
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-6">Order Timeline</h4>
            <div className="space-y-6">
              {[
                { status: 'Order Placed', time: '10:30 AM', done: true },
                { status: 'Payment Verified', time: '11:15 AM', done: true },
                { status: 'Preparing', time: '12:00 PM', done: true },
                { status: 'Delivered', time: 'Pending', done: false },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2",
                      step.done ? "bg-accent border-accent" : "bg-white border-primary/20"
                    )} />
                    {i < 3 && <div className="w-0.5 h-full bg-primary/10" />}
                  </div>
                  <div className="pb-6">
                    <p className={cn("text-sm font-medium", !step.done && "text-primary/40")}>{step.status}</p>
                    <p className="text-xs text-primary/40">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SlipQueueScreen = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ORDERS.filter(o => o.status === 'paid' || o.status === 'pending').map((order) => (
          <div key={order.id} className="bg-white rounded-2xl vintage-shadow vintage-border overflow-hidden flex flex-col">
            <div className="aspect-[4/3] relative group">
              <img src={order.slipUrl || 'https://picsum.photos/seed/slip/400/300'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-primary p-3 rounded-full shadow-xl"><Eye size={24} /></button>
              </div>
            </div>
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-xs font-bold text-accent">{order.id}</p>
                  <h4 className="font-serif italic text-lg">{order.customerName}</h4>
                </div>
                <span className="text-xl font-bold">{formatCurrency(order.total)}</span>
              </div>
              <div className="space-y-2 pt-4 border-t vintage-border">
                <div className="flex justify-between text-xs">
                  <span className="text-primary/40">OCR Amount</span>
                  <span className="font-bold text-green-600">{formatCurrency(order.ocrResult?.amount || 0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-primary/40">Reference</span>
                  <span className="font-mono">{order.ocrResult?.ref || 'N/A'}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-primary text-cream py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-all">Approve</button>
                <button className="flex-1 bg-red-50 text-red-500 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShippingSettingsScreen = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif italic">Shipping Zones</h3>
              <button className="text-accent hover:text-primary flex items-center gap-1 text-sm font-bold uppercase tracking-widest">
                <Plus size={16} /> Add Zone
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Bangkok & Vicinity', rate: '฿50', threshold: '฿2,000' },
                { name: 'Upcountry', rate: '฿80', threshold: '฿3,500' },
                { name: 'International', rate: 'Calculated', threshold: 'N/A' },
              ].map((zone, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-cream/30 border vintage-border rounded-xl group">
                  <div>
                    <p className="font-medium">{zone.name}</p>
                    <p className="text-xs text-primary/40">Flat rate: {zone.rate} • Free over {zone.threshold}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white rounded-lg text-primary/40 hover:text-primary"><Edit size={16} /></button>
                    <button className="p-2 hover:bg-white rounded-lg text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-primary text-cream p-8 rounded-3xl vintage-shadow">
            <h4 className="text-xl font-serif italic mb-4">Global Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-60">Free Shipping Threshold</span>
                <input type="text" defaultValue="฿5,000" className="w-24 p-2 bg-white/10 border border-white/20 rounded text-right text-sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-60">Default Rate</span>
                <input type="text" defaultValue="฿100" className="w-24 p-2 bg-white/10 border border-white/20 rounded text-right text-sm" />
              </div>
              <button className="w-full py-3 bg-accent text-primary rounded-full font-medium mt-4">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KitchenScreen = () => {
  const columns: { id: OrderStatus, label: string }[] = [
    { id: 'pending', label: 'New Orders' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'ready', label: 'Ready' },
    { id: 'delivered', label: 'Delivered' }
  ];

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div key={col.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-serif italic text-xl">{col.label}</h3>
            <span className="bg-accent text-primary text-xs font-bold px-2 py-1 rounded-full">
              {MOCK_ORDERS.filter(o => o.status === col.id).length}
            </span>
          </div>
          <div className="flex-1 bg-cream/30 rounded-2xl p-4 space-y-4 overflow-y-auto vintage-border">
            {MOCK_ORDERS.filter(o => o.status === col.id).map((order) => (
              <motion.div 
                layoutId={order.id}
                key={order.id} 
                className="bg-white p-4 rounded-xl vintage-shadow vintage-border space-y-3 cursor-grab active:cursor-grabbing"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold">{order.id}</span>
                  <div className="flex items-center gap-1 text-[10px] text-primary/40">
                    <Clock size={12} />
                    <span>12m ago</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-primary/70">{item.quantity}x {item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t vintage-border flex justify-between items-center">
                  <p className="text-xs font-medium">{order.customerName}</p>
                  <button className="p-1 hover:bg-cream rounded-md transition-colors text-accent">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const CustomerListScreen = ({ onSelect }: { onSelect: (c: Customer) => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            className="pl-10 pr-4 py-2 w-full bg-white border vintage-border rounded-lg text-sm focus:outline-none"
          />
        </div>
        <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 vintage-border hover:bg-cream transition-all">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl vintage-shadow vintage-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream/50 border-b vintage-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Customer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">LINE ID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Orders</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">LTV</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Last Visit</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y vintage-border">
            {MOCK_CUSTOMERS.map((customer) => (
              <tr key={customer.id} onClick={() => onSelect(customer)} className="hover:bg-cream/20 transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <p className="font-medium text-sm">{customer.name}</p>
                  <p className="text-xs text-primary/40">{customer.phone}</p>
                </td>
                <td className="px-6 py-4 text-sm text-primary/70">@{customer.lineId || 'N/A'}</td>
                <td className="px-6 py-4 text-sm font-medium">{customer.ordersCount}</td>
                <td className="px-6 py-4 font-medium">{formatCurrency(customer.ltv)}</td>
                <td className="px-6 py-4 text-sm text-primary/40">{formatDate(customer.lastVisit)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-accent hover:text-primary transition-colors">
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CustomerProfileScreen = ({ customer, onBack }: { customer: Customer, onBack: () => void }) => {
  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors">
        <ArrowRight className="rotate-180" size={18} />
        <span className="text-sm font-medium">Back to Customers</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border text-center">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-primary text-4xl font-serif font-bold mx-auto mb-6">
              {customer.name.charAt(0)}
            </div>
            <h3 className="text-2xl font-serif italic">{customer.name}</h3>
            <p className="text-sm text-primary/40 mt-1">Customer since 2023</p>
            <div className="flex justify-center gap-4 mt-6">
              <button className="p-3 bg-cream rounded-full text-accent hover:bg-accent hover:text-primary transition-all"><MessageSquare size={20} /></button>
              <button className="p-3 bg-cream rounded-full text-accent hover:bg-accent hover:text-primary transition-all"><Edit size={20} /></button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/40">Contact Details</h4>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-primary/40">Phone</span>
                <span className="font-medium">{customer.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary/40">LINE ID</span>
                <span className="font-medium">@{customer.lineId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary/40">Last Visit</span>
                <span className="font-medium">{formatDate(customer.lastVisit)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-primary text-cream p-8 rounded-3xl vintage-shadow">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Total Spend</p>
              <h4 className="text-3xl font-serif italic">{formatCurrency(customer.ltv)}</h4>
            </div>
            <div className="bg-accent text-primary p-8 rounded-3xl vintage-shadow">
              <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Total Orders</p>
              <h4 className="text-3xl font-serif italic">{customer.ordersCount} Orders</h4>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border">
            <h4 className="text-xl font-serif italic mb-6">Order History</h4>
            <div className="divide-y vintage-border">
              {MOCK_ORDERS.filter(o => o.customerId === customer.id).map((order) => (
                <div key={order.id} className="py-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-primary/40">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(order.total)}</p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-4">Internal Notes</h4>
            <textarea rows={4} className="w-full p-4 bg-cream/30 border vintage-border rounded-xl text-sm" defaultValue={customer.notes}></textarea>
            <button className="mt-4 bg-primary text-cream px-6 py-2 rounded-full text-sm font-medium hover:bg-secondary">Save Notes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketingScreen = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(1);

  if (isCreating) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsCreating(false)} className="text-primary/40 hover:text-primary flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
            <ArrowLeft size={16} /> Cancel
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 w-8 rounded-full ${s <= step ? 'bg-accent' : 'bg-primary/10'}`} />
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl vintage-shadow vintage-border space-y-8">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-2xl font-serif italic">Campaign Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setStep(2)} className="p-6 border-2 border-accent bg-cream/30 rounded-2xl text-left space-y-2 hover:bg-accent hover:text-primary transition-all group">
                  <MessageSquare className="text-accent group-hover:text-primary" />
                  <p className="font-bold">LINE Broadcast</p>
                  <p className="text-xs opacity-60">Send message to all LINE followers</p>
                </button>
                <button onClick={() => setStep(2)} className="p-6 border-2 border-transparent bg-cream/30 rounded-2xl text-left space-y-2 hover:border-accent transition-all">
                  <MessageSquare className="text-primary/40" />
                  <p className="font-bold">WhatsApp Blast</p>
                  <p className="text-xs opacity-60">Direct message to customer numbers</p>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-2xl font-serif italic">Compose Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary/40 mb-2">Message Content</label>
                  <textarea rows={5} className="w-full p-4 bg-cream/20 border vintage-border rounded-xl focus:ring-2 focus:ring-accent outline-none" placeholder="Write your campaign message here..." />
                </div>
                <div className="p-4 bg-blue-50 text-blue-600 rounded-xl text-xs flex gap-2">
                  <Info size={16} />
                  <span>Use {'{name}'} to personalize the message for each customer.</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border vintage-border rounded-full font-bold uppercase tracking-widest text-xs">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 py-4 bg-primary text-cream rounded-full font-bold uppercase tracking-widest text-xs">Next: Audience</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-2xl font-serif italic">Select Audience</h3>
              <div className="space-y-4">
                {['All Customers', 'VIP (LTV > ฿10,000)', 'Inactive (> 30 days)', 'New this month'].map((segment, i) => (
                  <label key={i} className="flex items-center justify-between p-4 bg-cream/30 border vintage-border rounded-xl cursor-pointer hover:bg-white transition-all">
                    <span className="font-medium">{segment}</span>
                    <input type="radio" name="audience" defaultChecked={i === 0} className="accent-accent w-5 h-5" />
                  </label>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(2)} className="flex-1 py-4 border vintage-border rounded-full font-bold uppercase tracking-widest text-xs">Back</button>
                <button onClick={() => setIsCreating(false)} className="flex-1 py-4 bg-accent text-primary rounded-full font-bold uppercase tracking-widest text-xs">Launch Campaign</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif italic">Active Campaigns</h3>
        <button onClick={() => { setIsCreating(true); setStep(1); }} className="bg-primary text-cream px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-secondary transition-all">
          <Plus size={18} /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CAMPAIGNS.map((camp) => (
          <div key={camp.id} className="bg-white p-6 rounded-2xl vintage-shadow vintage-border space-y-4">
            <div className="flex justify-between items-start">
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                camp.platform === 'LINE' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
              )}>
                {camp.platform}
              </div>
              <span className={cn(
                "text-xs font-medium",
                camp.status === 'sent' ? "text-green-600" : "text-yellow-600"
              )}>
                {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-serif">{camp.title}</h4>
              <p className="text-sm text-primary/60 mt-1">Audience: {camp.audience}</p>
            </div>
            <div className="pt-4 border-t vintage-border flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-primary/40">
                <Clock size={14} />
                <span>{formatDate(camp.scheduledAt)}</span>
              </div>
              <button className="text-accent hover:text-primary transition-colors text-sm font-medium">View Results</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReportsScreen = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl vintage-shadow vintage-border">
          <h3 className="text-xl font-serif italic mb-6">Revenue Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Jan', value: 40000 },
                { name: 'Feb', value: 55000 },
                { name: 'Mar', value: 85000 },
                { name: 'Apr', value: 65000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#FFF9E5' }} />
                <Bar dataKey="value" fill="#004030" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl vintage-shadow vintage-border">
          <h3 className="text-xl font-serif italic mb-6">Payment Methods</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'PromptPay', value: 65 },
                    { name: 'Cash', value: 20 },
                    { name: 'Transfer', value: 15 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#004030" />
                  <Cell fill="#4A9782" />
                  <Cell fill="#DCD0A8" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl vintage-shadow vintage-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-serif italic">Top Products by Revenue</h3>
          <button className="text-accent hover:text-primary flex items-center gap-2 text-sm font-medium">
            <Download size={16} /> Export Report
          </button>
        </div>
        <div className="space-y-6">
          {[
            { name: 'Vintage Lace Gown', sales: 12, revenue: 540000, percentage: 75 },
            { name: 'Silk Veil', sales: 45, revenue: 382500, percentage: 55 },
            { name: 'Crystal Tiara', sales: 8, revenue: 96000, percentage: 20 },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-primary/60">{formatCurrency(item.revenue)} ({item.sales} sales)</span>
              </div>
              <div className="h-2 bg-cream rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className="h-full bg-secondary"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsScreen = ({ type }: { type: 'line' | 'whatsapp' | 'shipping' | 'store' | 'api-keys' | 'notifications' }) => {
  return (
    <div className="max-w-3xl space-y-8">
      <div className="bg-white p-8 rounded-2xl vintage-shadow vintage-border space-y-6">
        {type === 'line' && (
          <>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Channel Access Token</label>
              <div className="relative">
                <input type="password" value="••••••••••••••••••••••••••••••" className="w-full p-3 bg-cream/30 border vintage-border rounded-lg pr-12" readOnly />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"><Eye size={18} /></button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Webhook URL</label>
              <div className="flex gap-2">
                <input type="text" value="https://api.everafter.com/webhooks/line" className="flex-1 p-3 bg-cream/30 border vintage-border rounded-lg" readOnly />
                <button className="p-3 bg-cream border vintage-border rounded-lg text-primary/40 hover:text-primary"><Copy size={18} /></button>
              </div>
            </div>
            <button className="bg-primary text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-all">Save LINE Settings</button>
          </>
        )}

        {type === 'store' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Store Name</label>
              <input type="text" defaultValue="Ever After Wedding Boutique" className="w-full p-3 bg-cream/30 border vintage-border rounded-lg" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/40">PromptPay ID</label>
              <input type="text" defaultValue="081-234-5678" className="w-full p-3 bg-cream/30 border vintage-border rounded-lg" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Address</label>
              <textarea rows={3} className="w-full p-3 bg-cream/30 border vintage-border rounded-lg" defaultValue="123 Sukhumvit Rd, Bangkok, Thailand"></textarea>
            </div>
            <button className="bg-primary text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-all">Update Profile</button>
          </div>
        )}

        {type === 'api-keys' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-primary/60">Manage your API keys for external integrations.</p>
              <button className="bg-accent text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Generate New Key</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Mobile App', key: 'sk_live_••••••••', created: '2024-01-15' },
                { name: 'Inventory Sync', key: 'sk_live_••••••••', created: '2024-02-20' },
              ].map((key, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-cream/30 border vintage-border rounded-xl">
                  <div>
                    <p className="font-medium text-sm">{key.name}</p>
                    <p className="font-mono text-xs text-primary/40">{key.key}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg text-primary/40 hover:text-primary"><RefreshCw size={16} /></button>
                    <button className="p-2 hover:bg-white rounded-lg text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'notifications' && (
          <div className="space-y-6">
            {[
              { label: 'Order Alerts', desc: 'Get notified when a new order is placed.' },
              { label: 'Payment Alerts', desc: 'Get notified when a payment slip is uploaded.' },
              { label: 'Stock Alerts', desc: 'Get notified when a product is low on stock.' },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{pref.label}</p>
                  <p className="text-xs text-primary/40">{pref.desc}</p>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryManagementScreen = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 rounded-2xl vintage-shadow vintage-border">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-serif italic">Category Hierarchy</h3>
          <button className="p-2 hover:bg-cream rounded-lg text-accent"><Plus size={20} /></button>
        </div>
        <div className="space-y-4">
          {MOCK_CATEGORIES.map((cat) => (
            <div key={cat.id} className="space-y-2">
              <div className="flex items-center justify-between p-4 bg-cream/30 border vintage-border rounded-xl group">
                <div className="flex items-center gap-3">
                  <Menu size={16} className="text-primary/20 cursor-move" />
                  <span className="font-medium">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:text-accent"><Edit size={14} /></button>
                  <button className="p-1 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              {cat.children && (
                <div className="ml-8 space-y-2 border-l-2 border-accent/20 pl-4">
                  {cat.children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between p-3 bg-white border vintage-border rounded-lg group">
                      <span className="text-sm text-primary/70">{child.name}</span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:text-accent"><Edit size={12} /></button>
                        <button className="p-1 hover:text-red-500"><Trash2 size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-primary p-8 rounded-2xl text-cream h-fit space-y-6">
        <h3 className="text-xl font-serif italic">Quick Tip</h3>
        <p className="text-sm text-cream/70 leading-relaxed">
          Drag and drop categories to reorder them. You can also nest categories up to 3 levels deep to organize your products better.
        </p>
        <div className="pt-6 border-t border-white/10">
          <button className="w-full py-3 bg-accent text-primary rounded-full font-medium hover:bg-white transition-all">
            Add New Root Category
          </button>
        </div>
      </div>
    </div>
  );
};

const CouponScreen = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif italic">Active Coupons</h3>
        <button className="bg-primary text-cream px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-secondary transition-all">
          <Plus size={18} /> Create Coupon
        </button>
      </div>

      <div className="bg-white rounded-2xl vintage-shadow vintage-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream/50 border-b vintage-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Code</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Discount</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Usage</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40">Expiry</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y vintage-border">
            {MOCK_COUPONS.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-cream/20 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono font-bold text-primary bg-accent/20 px-2 py-1 rounded">{coupon.code}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {coupon.type === 'percentage' ? `${coupon.discount}%` : formatCurrency(coupon.discount)}
                </td>
                <td className="px-6 py-4 text-sm">{coupon.usageCount} times</td>
                <td className="px-6 py-4 text-sm text-primary/40">{formatDate(coupon.expiryDate)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-accent hover:text-primary transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ThemeManagementScreen = ({ onEdit }: { onEdit: (t: Theme) => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-serif italic">Themes</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_THEMES.map((theme) => (
          <div key={theme.id} className="bg-white rounded-3xl vintage-shadow vintage-border overflow-hidden group">
            <div className="aspect-video relative">
              <img src={theme.previewUrl} alt={theme.name} className="w-full h-full object-cover" />
              {theme.isActive && (
                <div className="absolute top-4 right-4 bg-primary text-cream px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Active
                </div>
              )}
            </div>
            <div className="p-6">
              <h4 className="text-xl font-serif italic mb-2">{theme.name}</h4>
              <p className="text-sm text-primary/60 mb-4">{theme.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {theme.colors.map((color, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <button 
                  onClick={() => onEdit(theme)}
                  className="text-accent hover:text-primary flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors"
                >
                  <Edit size={16} /> Edit Theme
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ThemeEditScreen = ({ theme, onBack }: { theme: Theme, onBack: () => void }) => {
  const [selectedColor, setSelectedColor] = useState(theme.selectedColor);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Themes</span>
        </button>
        <button className="bg-primary text-cream px-6 py-2 rounded-full text-sm font-medium hover:bg-secondary transition-all">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border">
            <h3 className="text-2xl font-serif italic mb-6">Edit Theme: {theme.name}</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Theme Name</label>
                <input type="text" defaultValue={theme.name} className="w-full p-3 bg-cream/30 border vintage-border rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/40">Description</label>
                <textarea rows={3} defaultValue={theme.description} className="w-full p-3 bg-cream/30 border vintage-border rounded-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border">
            <h4 className="text-xl font-serif italic mb-6">Color Customization</h4>
            <p className="text-sm text-primary/60 mb-6">Choose from five distinct colors to personalize the theme according to your brand's color palette.</p>
            <div className="flex flex-wrap gap-4">
              {theme.colors.map((color) => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-12 h-12 rounded-full border-4 transition-all transform hover:scale-110",
                    selectedColor === color ? "border-accent scale-110 shadow-lg" : "border-white"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl vintage-shadow vintage-border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-6">Live Preview</h4>
            <div className="aspect-[9/16] rounded-2xl overflow-hidden vintage-border bg-cream relative">
              <div className="absolute inset-0 flex flex-col">
                <div className="h-12 w-full flex items-center px-4" style={{ backgroundColor: selectedColor }}>
                  <div className="w-20 h-2 bg-white/20 rounded-full" />
                </div>
                <div className="p-4 space-y-4">
                  <div className="h-4 w-3/4 bg-primary/10 rounded-full" />
                  <div className="h-32 w-full bg-white rounded-xl vintage-shadow" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-white rounded-xl vintage-shadow" />
                    <div className="h-20 bg-white rounded-xl vintage-shadow" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/20 rotate-45">Preview Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    if (isAdding && activeTab === 'products') return <AddProductScreen onCancel={() => setIsAdding(false)} />;
    if (selectedItem && activeTab === 'products') return <ProductDetailScreen product={selectedItem} onBack={() => setSelectedItem(null)} />;
    if (selectedItem && activeTab === 'orders') return <OrderDetailScreen order={selectedItem} onBack={() => setSelectedItem(null)} />;
    if (selectedItem && activeTab === 'customers') return <CustomerProfileScreen customer={selectedItem} onBack={() => setSelectedItem(null)} />;
    if (selectedItem && activeTab === 'themes') return <ThemeEditScreen theme={selectedItem} onBack={() => setSelectedItem(null)} />;

    switch (activeTab) {
      case 'dashboard': return <DashboardScreen />;
      case 'products': return <ProductListScreen onSelect={setSelectedItem} onAdd={() => setIsAdding(true)} />;
      case 'categories': return <CategoryManagementScreen />;
      case 'orders': return <OrderListScreen onSelect={setSelectedItem} />;
      case 'slip-queue': return <SlipQueueScreen />;
      case 'kitchen': return <KitchenScreen />;
      case 'customers': return <CustomerListScreen onSelect={setSelectedItem} />;
      case 'marketing': return <MarketingScreen />;
      case 'reports': return <ReportsScreen />;
      case 'coupons': return <CouponScreen />;
      case 'themes': return <ThemeManagementScreen onEdit={setSelectedItem} />;
      case 'line-bot': return <SettingsScreen type="line" />;
      case 'whatsapp': return <SettingsScreen type="whatsapp" />;
      case 'shipping': return <ShippingSettingsScreen />;
      case 'store': return <SettingsScreen type="store" />;
      case 'api-keys': return <SettingsScreen type="api-keys" />;
      case 'notifications': return <SettingsScreen type="notifications" />;
      default: return <DashboardScreen />;
    }
  };

  const activeTitle = useMemo(() => {
    return NAV_ITEMS.find(item => item.id === activeTab)?.label || 'Dashboard';
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-cream">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="lg:ml-64 min-h-screen flex flex-col">
        <Header title={activeTitle} onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="p-4 lg:p-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
