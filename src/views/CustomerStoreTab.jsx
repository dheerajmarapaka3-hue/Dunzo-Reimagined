import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Minus,
  ShoppingBag,
  Store,
  MapPin,
  Star,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomerStoreTab = ({ onOpenCart }) => {
  const {
    products,
    retailers,
    cart,
    addToCart,
    updateCartQty,
    orders
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRetailerId, setSelectedRetailerId] = useState('all');

  const categories = [
    'All',
    'Daily Staples',
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Snacks & Beverages',
    'Household & Personal'
  ];

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesRetailer = selectedRetailerId === 'all' || p.retailerId === selectedRetailerId;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesRetailer && matchesSearch;
  });

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Customer's placed orders for tracking
  const customerOrders = orders.slice(0, 3);

  return (
    <div>
      {/* Top Welcome / Retailer Strip */}
      <div className="view-header">
        <div>
          <h2 className="view-header-title">Neighborhood Customer Store</h2>
          <p className="view-header-desc">
            Shop directly from verified local retailers in Indiranagar & Koramangala. Flexible delivery speeds designed for sustainability.
          </p>
        </div>

        {cart.length > 0 && (
          <button className="btn-primary" onClick={onOpenCart}>
            <ShoppingBag size={18} />
            <span>View Cart ({totalCartCount} items • ₹{cartSubtotal})</span>
          </button>
        )}
      </div>

      {/* Verified Partner Retailers Carousel / Badges */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Select Neighborhood Merchant
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div
            onClick={() => setSelectedRetailerId('all')}
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: selectedRetailerId === 'all' ? '#0F172A' : '#FFFFFF',
              color: selectedRetailerId === 'all' ? '#FFFFFF' : 'var(--text-dark)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.4rem' }}>🛒</span>
              <div>
                <strong style={{ fontSize: '0.9rem' }}>All Neighborhood Stores</strong>
                <div style={{ fontSize: '0.72rem', color: selectedRetailerId === 'all' ? '#94A3B8' : 'var(--text-muted)' }}>
                  Combined catalog • 3 partner stores
                </div>
              </div>
            </div>
          </div>

          {retailers.map((ret) => {
            const isSelected = selectedRetailerId === ret.id;
            return (
              <div
                key={ret.id}
                onClick={() => setSelectedRetailerId(ret.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? '#0F172A' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-dark)',
                  border: `1px solid ${isSelected ? '#0F172A' : 'var(--border-light)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{ret.iconEmoji}</span>
                  <div>
                    <strong style={{ fontSize: '0.88rem' }}>{ret.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: isSelected ? '#94A3B8' : 'var(--text-muted)' }}>
                      {ret.area} • {ret.distanceKm} km
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 700, color: '#F59E0B' }}>
                  <Star size={13} fill="#F59E0B" />
                  <span>{ret.rating}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search and Category Filters Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          background: '#FFFFFF',
          padding: '14px 18px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          marginBottom: '24px'
        }}
      >
        <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
          <Search size={16} color="var(--text-light)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search atta, fresh mangoes, milk, coffee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: selectedCategory === cat ? 'var(--green-primary)' : 'var(--bg-card-subtle)',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-dark)',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--green-primary)' : 'var(--border-light)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid" style={{ marginBottom: '36px' }}>
        {filteredProducts.map((p) => {
          const cartItem = cart.find((i) => i.product.id === p.id);
          const retailer = retailers.find((r) => r.id === p.retailerId);
          const discountPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);

          return (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap">
                <img src={p.imageUrl} alt={p.name} className="product-img" loading="lazy" />
                {p.badge && <span className="product-badge">{p.badge}</span>}
                {discountPct > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      background: '#047857',
                      color: '#FFFFFF',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    {discountPct}% OFF
                  </span>
                )}
              </div>

              <div className="product-body">
                <div className="product-vendor">
                  🏪 {retailer ? retailer.name : 'Local Retailer'}
                </div>
                <h4 className="product-name">{p.name}</h4>
                <div className="product-unit">{p.unit}</div>

                <div className="product-footer">
                  <div className="price-box">
                    <span className="price-current">₹{p.price}</span>
                    {p.mrp > p.price && <span className="price-mrp">₹{p.mrp}</span>}
                  </div>

                  {cartItem ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--green-light)',
                        border: '1px solid var(--green-primary)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => updateCartQty(p.id, -1)}
                        style={{ padding: '6px 10px', color: 'var(--green-hover)' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          color: 'var(--green-hover)',
                          padding: '0 4px',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}
                      >
                        {cartItem.qty}
                      </span>
                      <button
                        onClick={() => updateCartQty(p.id, 1)}
                        style={{ padding: '6px 10px', color: 'var(--green-hover)' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => addToCart(p)}
                      disabled={p.stock <= 0}
                      style={{
                        opacity: p.stock <= 0 ? 0.6 : 1,
                        cursor: p.stock <= 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Plus size={14} />
                      <span>{p.stock <= 0 ? 'Out of Stock' : 'Add'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Order Tracker Section for Customer */}
      <div className="card">
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="var(--green-primary)" />
            <span>Recent Orders & Live Status Tracking</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Updated in real time
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {customerOrders.map((ord) => {
            const steps = [
              { key: 'placed', label: 'Order Placed' },
              { key: 'accepted', label: 'Accepted' },
              { key: 'preparing', label: 'Preparing' },
              { key: 'ready_for_pickup', label: 'Ready' },
              { key: 'picked_up', label: 'Picked Up' },
              { key: 'in_transit', label: 'In Transit' },
              { key: 'delivered', label: 'Delivered' }
            ];

            const currentIdx = steps.findIndex((s) => s.key === ord.status);
            const activeStepIndex = currentIdx >= 0 ? currentIdx : 0;
            const progressPercent = Math.min(100, Math.round(((activeStepIndex) / (steps.length - 1)) * 100));

            return (
              <div
                key={ord.id}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  background: '#F8FAFC'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>
                      {ord.id}
                    </span>
                    <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      from <strong>{ord.retailerName}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`badge badge-${ord.deliveryMode}`}>
                      {ord.deliveryMode} Delivery
                    </span>
                    <span className={`badge badge-${ord.status}`}>
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ position: 'relative', margin: '20px 8px 10px' }}>
                  <div style={{ height: '4px', background: 'var(--border-light)', borderRadius: '2px' }}>
                    <div
                      style={{
                        height: '100%',
                        background: 'var(--green-primary)',
                        width: `${progressPercent}%`,
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    {steps.map((st, i) => {
                      const isDone = i <= activeStepIndex;
                      const isCurrent = i === activeStepIndex;
                      return (
                        <div key={st.key} style={{ textAlign: 'center', flex: 1 }}>
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: isCurrent ? 800 : isDone ? 600 : 500,
                              color: isCurrent ? 'var(--green-hover)' : isDone ? 'var(--text-dark)' : 'var(--text-light)'
                            }}
                          >
                            {st.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                  <div>
                    Items: {ord.items.map((it) => `${it.name} (x${it.qty})`).join(', ')}
                  </div>
                  <div>
                    Basket: <strong style={{ color: 'var(--text-dark)' }}>₹{ord.basketValue}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
