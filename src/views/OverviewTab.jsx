import React from 'react';
import {
  TrendingUp,
  Store,
  Bike,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
  Zap,
  ShoppingBag,
  Sparkles,
  Layers,
  Percent,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OverviewTab = () => {
  const { orders, products, retailers, partners, setActiveTab, setShowWalkthrough } = useApp();

  const totalGMV = orders.reduce((sum, o) => sum + o.basketValue, 0);
  const totalOrdersCount = orders.length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
  const activeOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'rejected');
  const totalPartnerPayouts = orders.reduce((sum, o) => sum + o.deliveryPartnerPayment, 0);
  const totalRetailerCommission = orders.reduce((sum, o) => sum + o.retailerCommission, 0);

  return (
    <div>
      {/* Hero Pitch Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0B132B 0%, #1C2541 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 32px',
          color: '#FFFFFF',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-30px',
            top: '-30px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,179,126,0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,179,126,0.18)', border: '1px solid rgba(0,179,126,0.4)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, color: '#34D399', marginBottom: '14px' }}>
            <Sparkles size={14} />
            <span>Sustainable Local Commerce • Unit-Economic Positive</span>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            Dunzo Reimagined — Local Commerce, Smarter Deliveries
          </h2>

          <p style={{ fontSize: '0.92rem', color: '#CBD5E1', marginTop: '10px', lineHeight: 1.55 }}>
            Moving beyond high-burn 10-minute dark warehouses. We empower Bangalore’s existing neighborhood kiranas with transparent unit-economics, intelligent corridor batching, and fair-wage delivery partners.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={() => setShowWalkthrough(true)}
              style={{ fontSize: '0.85rem' }}
            >
              <span>Explore Demo Flow</span>
              <ArrowRight size={16} />
            </button>

            <button
              className="btn-secondary"
              onClick={() => setActiveTab('profitability')}
              style={{
                fontSize: '0.85rem',
                background: 'rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                borderColor: 'rgba(255,255,255,0.15)'
              }}
            >
              <Percent size={16} />
              <span>Inspect ₹9 Contribution Margin</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Ticker Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: 'var(--green-light)', color: 'var(--green-primary)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Platform GMV</div>
            <div className="metric-value">₹{totalGMV.toLocaleString()}</div>
            <div className="metric-sub positive">
              <span>Across {totalOrdersCount} orders</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
            <ShoppingBag size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Active Orders</div>
            <div className="metric-value">{activeOrders.length}</div>
            <div className="metric-sub">
              <span>{deliveredOrders} completed today</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#F5F3FF', color: '#8B5CF6' }}>
            <Bike size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Rider Payouts</div>
            <div className="metric-value">₹{totalPartnerPayouts.toLocaleString()}</div>
            <div className="metric-sub positive">
              <ShieldCheck size={12} />
              <span>100% fair wage compliance</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
            <Percent size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Contribution Margin</div>
            <div className="metric-value">+₹9.00</div>
            <div className="metric-sub positive">
              <span>18.0% CM per ₹500 basket</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Comparison Matrix: Dark Store vs Dunzo Reimagined */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={20} color="var(--green-primary)" />
            <span>Business Model Comparison: Dark Store Cash Burn vs. Reimagined Local Network</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Unit Economics & Operational Viability
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Legacy Dark Store Box */}
          <div
            style={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid #FECACA',
              background: '#FEF2F2',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: 800, fontSize: '0.95rem', marginBottom: '12px' }}>
              <AlertTriangle size={18} />
              <span>Traditional 10-Min Dark Store Model</span>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#7F1D1D' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#EF4444', fontWeight: 700 }}>✕</span>
                <span><strong>Heavy Real Estate Capex:</strong> ₹2.5L–₹4L/month rent per dark store plus warehouse fitments.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#EF4444', fontWeight: 700 }}>✕</span>
                <span><strong>Extreme Per-Order Loss:</strong> -₹40 to -₹55 burned on every single order through subsidized rush riders.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#EF4444', fontWeight: 700 }}>✕</span>
                <span><strong>Destroys Neighborhood Kiranas:</strong> Starves local family-owned retail of customer footfall.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#EF4444', fontWeight: 700 }}>✕</span>
                <span><strong>Dangerous Delivery Pressure:</strong> 10-minute speed timers risk delivery partner safety on chaotic roads.</span>
              </li>
            </ul>
          </div>

          {/* Dunzo Reimagined Box */}
          <div
            style={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid #A7F3D0',
              background: '#ECFDF5',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', fontWeight: 800, fontSize: '0.95rem', marginBottom: '12px' }}>
              <CheckCircle2 size={18} />
              <span>Dunzo Reimagined: Sustainable Local Commerce</span>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#064E3B' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Zero Warehouse Capex:</strong> Connects to verified neighborhood retailers with existing, trusted inventory.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Guaranteed +₹9 Contribution Margin:</strong> Sustainable platform unit economics from Day 1 on a ₹500 basket.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Empowers Local Retailers:</strong> Merchants gain online reach without paying predatory 20-30% marketplace fees.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Check size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Smart Corridor Batching:</strong> Flexible & scheduled delivery options reduce rider transit dead-miles by 42%.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Live Active Order Pipeline Monitor */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="var(--green-primary)" />
            <span>Live Order Pipeline & State Transition Monitor</span>
          </div>
          <button
            className="btn-secondary btn-sm"
            onClick={() => setActiveTab('merchant')}
          >
            View Merchant Kanban <ArrowRight size={14} />
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Retailer Store</th>
                <th>Items & Value</th>
                <th>Delivery Speed</th>
                <th>Current Status</th>
                <th>Unit Margin</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((ord) => {
                const badgeClass = `badge-${ord.status}`;
                const speedBadge = `badge-${ord.deliveryMode}`;
                return (
                  <tr key={ord.id}>
                    <td>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                        {ord.id}
                      </strong>
                    </td>
                    <td>
                      <div>{ord.customer?.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {ord.customer?.address?.split(',')[0]}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{ord.retailerName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {ord.distanceKm} km away
                      </div>
                    </td>
                    <td>
                      <div>
                        {ord.items.length} item{ord.items.length > 1 ? 's' : ''} •{' '}
                        <strong style={{ fontFamily: 'var(--font-mono)' }}>₹{ord.basketValue}</strong>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {ord.items[0]?.name}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${speedBadge}`}>
                        {ord.deliveryMode}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${badgeClass}`}>
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: '#059669',
                          background: 'var(--green-light)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.78rem'
                        }}
                      >
                        +₹9.00
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Persona Quick Actions Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div
          className="card"
          style={{ cursor: 'pointer', borderLeft: '4px solid var(--green-primary)' }}
          onClick={() => setActiveTab('customer')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <ShoppingBag size={20} color="var(--green-primary)" />
            <strong style={{ fontSize: '0.95rem' }}>Customer Store</strong>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Browse local groceries, test cart checkout, and pick scheduled vs express speeds.
          </p>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer', borderLeft: '4px solid #3B82F6' }}
          onClick={() => setActiveTab('merchant')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Store size={20} color="#3B82F6" />
            <strong style={{ fontSize: '0.95rem' }}>Merchant Hub</strong>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Accept incoming orders, update packing statuses, and manage store stock.
          </p>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer', borderLeft: '4px solid #8B5CF6' }}
          onClick={() => setActiveTab('partner')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Bike size={20} color="#8B5CF6" />
            <strong style={{ fontSize: '0.95rem' }}>Delivery Fleet</strong>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Accept available delivery runs and progress through Picked Up to Delivered.
          </p>
        </div>

        <div
          className="card"
          style={{ cursor: 'pointer', borderLeft: '4px solid #F59E0B' }}
          onClick={() => setActiveTab('smart-delivery')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Zap size={20} color="#F59E0B" />
            <strong style={{ fontSize: '0.95rem' }}>Smart Delivery</strong>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Transparent rules engine with corridor batching simulation and zero black-box AI.
          </p>
        </div>
      </div>
    </div>
  );
};
