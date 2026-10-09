import React, { useState } from 'react';
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Percent,
  HelpCircle,
  RotateCcw,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Info,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateProfitability } from '../data/mockData';

export const ProfitabilityTab = () => {
  const { unitEconomics, updateUnitEconomics, orders } = useApp();

  // Local state for inputs
  const [basketValue, setBasketValue] = useState(unitEconomics.basketValue || 500);
  const [customerDeliveryFee, setCustomerDeliveryFee] = useState(unitEconomics.customerDeliveryFee || 25);
  const [retailerCommission, setRetailerCommission] = useState(unitEconomics.retailerCommission || 25);
  const [deliveryPartnerPayment, setDeliveryPartnerPayment] = useState(unitEconomics.deliveryPartnerPayment || 28);
  const [pickingPackingCost, setPickingPackingCost] = useState(unitEconomics.pickingPackingCost || 8);
  const [otherVariableCosts, setOtherVariableCosts] = useState(unitEconomics.otherVariableCosts || 5);
  const [platformDiscount, setPlatformDiscount] = useState(unitEconomics.platformDiscount || 0);

  // Perform calculation
  const result = calculateProfitability({
    basketValue,
    customerDeliveryFee,
    retailerCommission,
    deliveryPartnerPayment,
    pickingPackingCost,
    otherVariableCosts,
    platformDiscount
  });

  const handleResetToDefault = () => {
    setBasketValue(500);
    setCustomerDeliveryFee(25);
    setRetailerCommission(25);
    setDeliveryPartnerPayment(28);
    setPickingPackingCost(8);
    setOtherVariableCosts(5);
    setPlatformDiscount(0);
    updateUnitEconomics({
      basketValue: 500,
      customerDeliveryFee: 25,
      retailerCommission: 25,
      deliveryPartnerPayment: 28,
      pickingPackingCost: 8,
      otherVariableCosts: 5,
      platformDiscount: 0
    });
  };

  const handleApplyPreset = (type) => {
    if (type === 'dark-store') {
      // Subsidized flash sale dark store scenario
      setBasketValue(220);
      setCustomerDeliveryFee(0); // Subsidized free delivery
      setRetailerCommission(11); // 5% of 220
      setDeliveryPartnerPayment(45); // High rush rider surge
      setPickingPackingCost(14); // Micro-warehouse picker
      setOtherVariableCosts(8);
      setPlatformDiscount(15); // Burn coupon
    } else if (type === 'bulk-scheduled') {
      // Pooled bulk schedule
      setBasketValue(850);
      setCustomerDeliveryFee(15);
      setRetailerCommission(42.5); // 5% of 850
      setDeliveryPartnerPayment(30);
      setPickingPackingCost(8);
      setOtherVariableCosts(5);
      setPlatformDiscount(0);
    } else if (type === 'express-priority') {
      // Urgent express run
      setBasketValue(450);
      setCustomerDeliveryFee(45);
      setRetailerCommission(22.5);
      setDeliveryPartnerPayment(36);
      setPickingPackingCost(8);
      setOtherVariableCosts(5);
      setPlatformDiscount(0);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'var(--green-light)', color: 'var(--green-primary)', padding: '6px', borderRadius: '8px' }}>
              <Calculator size={22} />
            </span>
            <h2 className="view-header-title">Unit Economics & Profitability Engine</h2>
          </div>
          <p className="view-header-desc">
            Analyze single-order financial viability. Instant calculation of platform revenue, variable costs, and contribution margin per order.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn-secondary btn-sm" onClick={handleResetToDefault}>
            <RotateCcw size={14} />
            <span>Reset to Default (₹9 CM)</span>
          </button>
          <button className="btn-secondary btn-sm" onClick={() => handleApplyPreset('dark-store')} style={{ color: '#DC2626' }}>
            Simulate Dark Store Burn
          </button>
          <button className="btn-secondary btn-sm" onClick={() => handleApplyPreset('bulk-scheduled')}>
            Simulate Bulk Scheduled
          </button>
        </div>
      </div>

      {/* Negative Margin Alert (Dynamic) */}
      {result.isNegative && (
        <div
          style={{
            background: '#FEF2F2',
            border: '2px solid #F87171',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            animation: 'toast-slide 0.2s ease-out'
          }}
        >
          <AlertTriangle size={24} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ fontSize: '1rem', color: '#991B1B' }}>
              Negative Contribution Margin Warning (Cash Burn Detected)
            </strong>
            <p style={{ fontSize: '0.85rem', color: '#B91C1C', marginTop: '4px', lineHeight: 1.45 }}>
              This order configuration loses <strong>₹{Math.abs(result.contributionMargin)} ({Math.abs(result.marginPercentage)}%)</strong> on every single delivery.
              In hyper-growth quick commerce, this is the fatal flaw that burns investor capital.
              <strong> Recommended mitigation:</strong> Introduce a minimum basket size of ₹500, charge a standard ₹25 delivery fee, or bundle with nearby corridor orders.
            </p>
          </div>
        </div>
      )}

      {/* Summary KPI Result Banner */}
      <div
        style={{
          background: result.isNegative ? '#FFF1F2' : '#FFFFFF',
          border: `2px solid ${result.isNegative ? '#FECDD3' : result.contributionMargin === 9 ? 'var(--green-primary)' : 'var(--border-light)'}`,
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Platform Revenue
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
              ₹{result.platformRevenue}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Fee (₹{customerDeliveryFee}) + Comm (₹{retailerCommission})
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Variable Costs
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
              ₹{result.variableCosts}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Rider (₹{deliveryPartnerPayment}) + Pack (₹{pickingPackingCost}) + Other (₹{otherVariableCosts})
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Contribution Margin (CM)
            </div>
            <div
              style={{
                fontSize: '2.2rem',
                fontWeight: 900,
                color: result.isNegative ? '#DC2626' : '#059669',
                fontFamily: 'var(--font-mono)',
                marginTop: '2px',
                letterSpacing: '-0.03em'
              }}
            >
              {result.contributionMargin >= 0 ? `+₹${result.contributionMargin}` : `-₹${Math.abs(result.contributionMargin)}`}
            </div>
            <div style={{ fontSize: '0.78rem', color: result.isNegative ? '#DC2626' : '#059669', fontWeight: 700 }}>
              {result.marginPercentage}% Contribution Margin
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: result.isNegative ? '#FEF2F2' : 'var(--green-light)',
                border: `1px solid ${result.isNegative ? '#FECACA' : '#A7F3D0'}`,
                fontSize: '0.82rem',
                fontWeight: 700,
                color: result.isNegative ? '#991B1B' : '#047857',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {result.isNegative ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
              <span>
                {result.isNegative ? 'Unit Loss (Unsustainable)' : 'Unit Positive (Sustainable)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Input Form & Visual Waterfall Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        {/* Editable Inputs Card */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Percent size={18} color="var(--green-primary)" />
              <span>Editable Unit Economic Parameters</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Edit inputs to recompute live
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Basket Value (₹)</label>
              <input
                type="number"
                className="form-input"
                value={basketValue}
                onChange={(e) => setBasketValue(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Customer Delivery Fee (₹)</label>
              <input
                type="number"
                className="form-input"
                value={customerDeliveryFee}
                onChange={(e) => setCustomerDeliveryFee(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Retailer Commission (₹)</label>
              <input
                type="number"
                className="form-input"
                value={retailerCommission}
                onChange={(e) => setRetailerCommission(Number(e.target.value))}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Default: 5% of basket (₹25)</span>
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Partner Pay (₹)</label>
              <input
                type="number"
                className="form-input"
                value={deliveryPartnerPayment}
                onChange={(e) => setDeliveryPartnerPayment(Number(e.target.value))}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Default benchmark: ₹28</span>
            </div>

            <div className="form-group">
              <label className="form-label">Picking / Packing (₹)</label>
              <input
                type="number"
                className="form-input"
                value={pickingPackingCost}
                onChange={(e) => setPickingPackingCost(Number(e.target.value))}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Store packaging: ₹8</span>
            </div>

            <div className="form-group">
              <label className="form-label">Other Variable Costs (₹)</label>
              <input
                type="number"
                className="form-input"
                value={otherVariableCosts}
                onChange={(e) => setOtherVariableCosts(Number(e.target.value))}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Payment gateway / SMS: ₹5</span>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Platform-Funded Discount / Coupon (₹)</label>
              <input
                type="number"
                className="form-input"
                value={platformDiscount}
                onChange={(e) => setPlatformDiscount(Number(e.target.value))}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Zero artificial burn subsidy (Default: ₹0)</span>
            </div>
          </div>
        </div>

        {/* Visual Calculation Formula Breakdown */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--green-primary)" />
              <span>Formula & Cashflow Ledger</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Step-by-step audit
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Step 1: Revenue */}
            <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.85rem' }}>
                <span>1. Platform Inflows (Revenue)</span>
                <span style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>+₹{result.platformRevenue}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                = Delivery Fee (₹{customerDeliveryFee}) + Commission (₹{retailerCommission})
              </div>
            </div>

            {/* Step 2: Variable Costs */}
            <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.85rem' }}>
                <span>2. Variable Outflows (Direct Costs)</span>
                <span style={{ color: '#DC2626', fontFamily: 'var(--font-mono)' }}>-₹{result.variableCosts}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                = Rider Pay (₹{deliveryPartnerPayment}) + Fulfillment (₹{pickingPackingCost}) + Other (₹{otherVariableCosts}) + Promo Discount (₹{platformDiscount})
              </div>
            </div>

            {/* Step 3: Margin */}
            <div
              style={{
                background: result.isNegative ? '#FEF2F2' : 'var(--green-light)',
                padding: '14px 16px',
                borderRadius: '8px',
                border: `1.5px solid ${result.isNegative ? '#FECACA' : '#A7F3D0'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.95rem' }}>
                <span>3. Net Contribution Margin</span>
                <span style={{ color: result.isNegative ? '#DC2626' : '#059669', fontFamily: 'var(--font-mono)', fontSize: '1.2rem' }}>
                  {result.contributionMargin >= 0 ? `+₹${result.contributionMargin}` : `-₹${Math.abs(result.contributionMargin)}`}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: result.isNegative ? '#991B1B' : '#065F46', marginTop: '4px' }}>
                = Platform Revenue (₹{result.platformRevenue}) - Variable Costs (₹{result.variableCosts})
              </div>
            </div>

            {/* Verification Note */}
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: '#F1F5F9', padding: '10px 12px', borderRadius: '6px' }}>
              ✓ <strong>Default Specification Check:</strong> With basket ₹500, delivery fee ₹25, commission ₹25, partner payment ₹28, packing ₹8, other ₹5, discount ₹0:
              Contribution Margin equals exactly <strong>₹9.00</strong> (18.0%).
            </div>
          </div>
        </div>
      </div>

      {/* Critical Financial Callout: Contribution Margin vs Net Profit */}
      <div
        className="card"
        style={{
          borderLeft: '5px solid #3B82F6',
          background: '#EFF6FF',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Info size={22} color="#1D4ED8" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1E40AF', marginBottom: '6px' }}>
              Important Financial Distinction: Contribution Margin (CM) vs. Net Profit
            </h4>
            <div style={{ fontSize: '0.85rem', color: '#1E3A8A', lineHeight: 1.55 }}>
              <p style={{ marginBottom: '8px' }}>
                <strong>Contribution Margin (CM)</strong> measures the marginal profitability of a single transaction.
                It answers: <em>"Does fulfilling this order generate cash to cover company overheads, or does each additional order accelerate bankruptcy?"</em>
                Our benchmark generates <strong>+₹9 per order</strong>.
              </p>
              <p>
                <strong>Net Profit (Bottom Line)</strong> is calculated only after subtracting company-wide fixed overheads (software engineering salaries, cloud AWS hosting, marketing, executive leadership, legal, corporate rent) from total cumulative contribution margins across millions of monthly orders.
                Because Dunzo Reimagined operates with positive unit contribution from Day 1, scaling order volume leads directly to corporate net profitability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order-by-Order Margin Table */}
      <div className="card">
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="var(--green-primary)" />
            <span>Order-by-Order Unit Economics Ledger (Live Ecosystem Orders)</span>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Basket Value</th>
                <th>Delivery Mode</th>
                <th>Delivery Fee</th>
                <th>Merchant Commission</th>
                <th>Partner Payout</th>
                <th>Fulfilment & Other</th>
                <th>Contribution Margin</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => {
                const comm = ord.retailerCommission;
                const fee = ord.deliveryFee;
                const rev = fee + comm;
                const costs = ord.deliveryPartnerPayment + ord.pickingPackingCost + ord.otherVariableCosts + ord.platformDiscount;
                const cm = Math.round((rev - costs) * 100) / 100;
                const cmPct = Math.round((cm / rev) * 100);

                return (
                  <tr key={ord.id}>
                    <td><strong style={{ fontFamily: 'var(--font-mono)' }}>{ord.id}</strong></td>
                    <td><strong style={{ fontFamily: 'var(--font-mono)' }}>₹{ord.basketValue}</strong></td>
                    <td><span className={`badge badge-${ord.deliveryMode}`}>{ord.deliveryMode}</span></td>
                    <td>₹{fee}</td>
                    <td>₹{comm}</td>
                    <td>₹{ord.deliveryPartnerPayment}</td>
                    <td>₹{ord.pickingPackingCost + ord.otherVariableCosts}</td>
                    <td>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          color: cm >= 0 ? '#059669' : '#DC2626',
                          background: cm >= 0 ? 'var(--green-light)' : '#FEF2F2',
                          padding: '4px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {cm >= 0 ? `+₹${cm}` : `-₹${Math.abs(cm)}`} ({cmPct}%)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
