import React from 'react';
import { ShoppingBag, RotateCcw, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Topbar = ({ onOpenCart }) => {
  const {
    activeTab,
    cart,
    orders,
    resetDemoData
  } = useApp();

  const titleMap = {
    overview: 'Executive Ecosystem Overview',
    customer: 'Customer Hyperlocal Store',
    merchant: 'Merchant Partner Operations',
    partner: 'Delivery Partner Fleet & Earnings',
    'smart-delivery': 'Smart Delivery Decision Engine',
    profitability: 'Unit Economics & Profitability Engine',
    impact: 'Ecosystem Impact & Sustainability Analytics'
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'rejected').length;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{titleMap[activeTab] || 'Dunzo Reimagined'}</h1>
        <div className="live-badge" title="State changes are synchronized live across all 7 views">
          <span className="live-dot"></span>
          <span>Live Synced State</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="quick-stat-pill">
          <TrendingUp size={14} color="var(--green-primary)" />
          <span>Active Orders: <strong>{activeOrdersCount}</strong></span>
        </div>

        <button
          className="btn-reset-demo"
          onClick={resetDemoData}
          title="Reset application to initial demo seed"
        >
          <RotateCcw size={14} />
          <span>Reset Demo</span>
        </button>

        <button
          className="btn-cart-trigger"
          onClick={onOpenCart}
          title="Open shopping cart"
        >
          <ShoppingBag size={16} />
          <span>Cart</span>
          {totalCartCount > 0 && (
            <span className="cart-bubble">{totalCartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};
