import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  Bike,
  Cpu,
  Calculator,
  BarChart3,
  HelpCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    cart,
    orders,
    setShowWalkthrough,
    resetDemoData
  } = useApp();

  const pendingMerchantOrders = orders.filter(
    (o) => o.status === 'placed' || o.status === 'accepted' || o.status === 'preparing'
  ).length;

  const availablePartnerDeliveries = orders.filter(
    (o) => o.status === 'ready_for_pickup' && !o.partnerId
  ).length;

  const activeDeliveries = orders.filter(
    (o) => o.status === 'picked_up' || o.status === 'in_transit'
  ).length;

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'customer',
      label: 'Customer Store',
      icon: ShoppingBag,
      badge: cart.length > 0 ? `${cart.length} item${cart.length > 1 ? 's' : ''}` : null
    },
    {
      id: 'merchant',
      label: 'Merchant Dashboard',
      icon: Store,
      badge: pendingMerchantOrders > 0 ? `${pendingMerchantOrders} open` : null
    },
    {
      id: 'partner',
      label: 'Delivery Partners',
      icon: Bike,
      badge: availablePartnerDeliveries > 0 ? `${availablePartnerDeliveries} avail` : activeDeliveries > 0 ? `${activeDeliveries} transit` : null
    },
    {
      id: 'smart-delivery',
      label: 'Smart Delivery Engine',
      icon: Cpu,
      badge: 'Core Diff'
    },
    {
      id: 'profitability',
      label: 'Profitability Engine',
      icon: Calculator,
      badge: '₹9 CM'
    },
    {
      id: 'impact',
      label: 'Impact Analytics',
      icon: BarChart3,
      badge: null
    }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-icon">
          <Sparkles size={22} />
        </div>
        <div className="brand-title">
          <div className="brand-name">
            Dunzo <span className="brand-badge">Reimagined</span>
          </div>
          <div className="brand-subtitle">
            Local Commerce • Smarter Deliveries
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        <div className="nav-section-title">Platform Ecosystem</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="nav-item-left">
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
              </div>
              {item.badge && <span className="nav-counter">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer with Walkthrough & Reset Actions */}
      <div className="sidebar-footer">
        <button
          className="quick-guide-btn"
          onClick={() => setShowWalkthrough(true)}
          title="See complete interactive demo flow"
        >
          <HelpCircle size={16} />
          <span>Demo Flow Guide</span>
        </button>

        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={resetDemoData}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              color: 'var(--navy-text-dim)',
              padding: '4px 8px'
            }}
          >
            <RotateCcw size={12} />
            <span>Reset Demo Seed</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
