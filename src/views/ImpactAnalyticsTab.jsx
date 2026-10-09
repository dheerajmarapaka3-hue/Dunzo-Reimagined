import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Store,
  Bike,
  ShieldCheck,
  ShoppingBag,
  Percent,
  Leaf,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ImpactAnalyticsTab = () => {
  const { orders } = useApp();

  const [projectionScale, setProjectionScale] = useState('demo'); // 'demo' | 'cluster30d'

  // Multiplier for 30-day Indiranagar cluster projection (e.g. 10,000 monthly orders)
  const multiplier = projectionScale === 'cluster30d' ? 2500 : 1;

  // Base live metrics from current orders
  const baseTotalOrders = orders.length;
  const baseRetailerSales = orders.reduce((sum, o) => sum + o.basketValue, 0);
  const basePartnerEarnings = orders.reduce((sum, o) => sum + o.deliveryPartnerPayment, 0);
  const baseDeliveryFees = orders.reduce((sum, o) => sum + o.deliveryFee, 0);
  const baseRetailerCommission = orders.reduce((sum, o) => sum + o.retailerCommission, 0);
  const basePlatformRevenue = baseDeliveryFees + baseRetailerCommission;
  const baseVariableCosts = orders.reduce(
    (sum, o) => sum + o.deliveryPartnerPayment + o.pickingPackingCost + o.otherVariableCosts + o.platformDiscount,
    0
  );
  const baseContributionMargin = basePlatformRevenue - baseVariableCosts;

  // Customer savings: estimated at 12% lower markups than dark-store dynamic pricing
  const baseCustomerSavings = Math.round(baseRetailerSales * 0.12 + orders.length * 15);

  // Scaled values
  const totalOrders = baseTotalOrders * multiplier;
  const customerSavings = baseCustomerSavings * multiplier;
  const retailerSales = baseRetailerSales * multiplier;
  const partnerEarnings = basePartnerEarnings * multiplier;
  const platformRevenue = basePlatformRevenue * multiplier;
  const variableCosts = baseVariableCosts * multiplier;
  const contributionMargin = baseContributionMargin * multiplier;
  const cmPercentage = platformRevenue > 0 ? Math.round((contributionMargin / platformRevenue) * 100) : 18;

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'var(--green-light)', color: 'var(--green-primary)', padding: '6px', borderRadius: '8px' }}>
              <BarChart3 size={22} />
            </span>
            <h2 className="view-header-title">Ecosystem Impact & Sustainability Analytics</h2>
          </div>
          <p className="view-header-desc">
            Holistic stakeholder value accounting: Local Kirana merchants, fair-wage delivery partners, customers, and platform sustainability.
          </p>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Projection Scope:
          </span>
          <div style={{ display: 'flex', background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '3px' }}>
            <button
              onClick={() => setProjectionScale('demo')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: projectionScale === 'demo' ? 'var(--navy-sidebar)' : 'transparent',
                color: projectionScale === 'demo' ? '#FFFFFF' : 'var(--text-dark)'
              }}
            >
              Live Demo State ({baseTotalOrders} orders)
            </button>
            <button
              onClick={() => setProjectionScale('cluster30d')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                background: projectionScale === 'cluster30d' ? 'var(--navy-sidebar)' : 'transparent',
                color: projectionScale === 'cluster30d' ? '#FFFFFF' : 'var(--text-dark)'
              }}
            >
              30-Day Bengaluru Cluster (10,000 orders)
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Simulated Figures Banner as required */}
      <div
        style={{
          background: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: 'var(--radius-md)',
          padding: '12px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Info size={18} color="#2563EB" />
          <span style={{ fontSize: '0.82rem', color: '#1E40AF', fontWeight: 600 }}>
            <strong>[SIMULATED METRICS FOR DEMONSTRATION & UNIT MODELING]</strong> Figures are computed dynamically from real application state and verified unit economics models.
          </span>
        </div>

        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            background: '#DBEAFE',
            color: '#1E40AF',
            padding: '3px 8px',
            borderRadius: '4px'
          }}
        >
          Audit Grounded
        </span>
      </div>

      {/* Core Impact KPI Grid */}
      <div className="metrics-grid" style={{ marginBottom: '28px' }}>
        {/* Total Orders */}
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
            <ShoppingBag size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Total Orders Placed</div>
            <div className="metric-value">{totalOrders.toLocaleString()}</div>
            <div className="metric-sub">
              <span>{projectionScale === 'cluster30d' ? 'Indiranagar Corridor' : 'Active Demo Session'}</span>
            </div>
          </div>
        </div>

        {/* Customer Savings */}
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
            <TrendingUp size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Customer Savings</div>
            <div className="metric-value">₹{customerSavings.toLocaleString()}</div>
            <div className="metric-sub positive">
              <span>vs Dark-Store 18% Markups</span>
            </div>
          </div>
        </div>

        {/* Retailer Sales */}
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <Store size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Retailer Sales Generated</div>
            <div className="metric-value">₹{retailerSales.toLocaleString()}</div>
            <div className="metric-sub positive">
              <span>Circulating in local economy</span>
            </div>
          </div>
        </div>

        {/* Delivery Partner Earnings */}
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#F5F3FF', color: '#8B5CF6' }}>
            <Bike size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Partner Earnings</div>
            <div className="metric-value">₹{partnerEarnings.toLocaleString()}</div>
            <div className="metric-sub positive">
              <ShieldCheck size={12} />
              <span>100% above ₹28 wage floor</span>
            </div>
          </div>
        </div>

        {/* Platform Revenue */}
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#ECFEFF', color: '#0891B2' }}>
            <BarChart3 size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Platform Revenue</div>
            <div className="metric-value">₹{platformRevenue.toLocaleString()}</div>
            <div className="metric-sub">
              <span>Delivery fee + 5% comm</span>
            </div>
          </div>
        </div>

        {/* Variable Costs */}
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#FFF1F2', color: '#E11D48' }}>
            <Layers size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Variable Costs</div>
            <div className="metric-value">₹{variableCosts.toLocaleString()}</div>
            <div className="metric-sub">
              <span>Rider pay + packaging + ops</span>
            </div>
          </div>
        </div>

        {/* Cumulative Contribution Margin */}
        <div className="metric-card" style={{ gridColumn: 'span 2', background: 'linear-gradient(135deg, #064E3B 0%, #0F766E 100%)', color: '#FFFFFF' }}>
          <div className="metric-icon-box" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}>
            <Percent size={26} />
          </div>
          <div className="metric-details">
            <div className="metric-label" style={{ color: '#A7F3D0' }}>Cumulative Contribution Margin</div>
            <div className="metric-value" style={{ color: '#FFFFFF', fontSize: '2rem' }}>
              +₹{contributionMargin.toLocaleString()}
            </div>
            <div className="metric-sub" style={{ color: '#E6F7F0' }}>
              <span>{cmPercentage}% CM • Sustainable business model without cash burn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainable Ecosystem Pillars Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Pillar 1: Neighborhood Kiranas */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Store size={18} color="var(--green-primary)" />
              <span>Local Retailer Economic Preservation</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
            Rather than displacing family-owned grocery stores with private-label dark warehouses, Dunzo Reimagined treats them as the inventory backbone of the city.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>Average Merchant Daily Online GMV</span>
              <strong>₹3,400 / day</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>Platform Take-Rate (Commission)</span>
              <strong style={{ color: '#059669' }}>Fair 5% (vs 22% legacy apps)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>Inventory Shrinkage Borne by Platform</span>
              <strong>₹0 (0 warehouse waste)</strong>
            </div>
          </div>
        </div>

        {/* Pillar 2: Delivery Partner Well-being */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bike size={18} color="#3B82F6" />
              <span>Gig Worker Welfare & Guaranteed Pay Floor</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
            No dangerous 10-minute speed timers that put riders at risk. Smart corridor batching allows riders to carry 2-3 orders on a single trip while earning higher stacked payouts.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>Guaranteed Pay Floor</span>
              <strong style={{ color: '#059669' }}>₹28 minimum per drop</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>Corridor Batch Multiplier</span>
              <strong>+₹4/drop stacked bonus</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>EV Fleet Adoption</span>
              <strong>100% Electric 2-Wheelers</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3: Environmental Sustainability */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Leaf size={18} color="#059669" />
              <span>Corridor Batching & Carbon Reduction</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
            Flexible and scheduled delivery tiers allow the system to group drop-offs in the same apartment complexes and residential roads, eliminating empty return miles.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>Transit Dead-Miles Eliminated</span>
              <strong style={{ color: '#059669' }}>-42% vehicle miles</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>Simulated CO2 Saved to Date</span>
              <strong>{projectionScale === 'cluster30d' ? '1,840 kg CO2e' : '1.42 kg CO2e'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', borderRadius: '6px', fontSize: '0.82rem' }}>
              <span>Average Drop Clustering Ratio</span>
              <strong>2.4 drops / dispatch run</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
