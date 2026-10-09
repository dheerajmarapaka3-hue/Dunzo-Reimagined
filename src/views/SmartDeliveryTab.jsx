import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Zap,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sliders,
  Layers,
  Leaf,
  Info,
  MapPin,
  TrendingUp,
  Percent
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { evaluateSmartDelivery } from '../data/mockData';

export const SmartDeliveryTab = () => {
  const { smartEngineParams, setSmartEngineParams } = useApp();

  // Local state for interactive slider exploration
  const [urgency, setUrgency] = useState(smartEngineParams.urgency || 'flexible');
  const [distanceKm, setDistanceKm] = useState(smartEngineParams.distanceKm || 2.2);
  const [basketValue, setBasketValue] = useState(smartEngineParams.basketValue || 500);
  const [compatibleOrders, setCompatibleOrders] = useState(smartEngineParams.compatibleOrders || 2);
  const [minPartnerCompensation, setMinPartnerCompensation] = useState(smartEngineParams.minPartnerCompensation || 28);

  // Run transparent rules engine evaluation
  const evaluation = evaluateSmartDelivery({
    urgency,
    distanceKm,
    basketValue,
    compatibleOrders,
    minPartnerCompensation
  });

  const handleApplyPreset = (presetName) => {
    if (presetName === 'corridor-batch') {
      setUrgency('flexible');
      setDistanceKm(1.8);
      setBasketValue(520);
      setCompatibleOrders(3);
      setMinPartnerCompensation(28);
    } else if (presetName === 'urgent-single') {
      setUrgency('urgent');
      setDistanceKm(2.5);
      setBasketValue(350);
      setCompatibleOrders(0);
      setMinPartnerCompensation(28);
    } else if (presetName === 'long-distance') {
      setUrgency('normal');
      setDistanceKm(5.8);
      setBasketValue(750);
      setCompatibleOrders(1);
      setMinPartnerCompensation(30);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'var(--green-light)', color: 'var(--green-primary)', padding: '6px', borderRadius: '8px' }}>
              <Cpu size={22} />
            </span>
            <h2 className="view-header-title">Smart Delivery Decision Engine</h2>
          </div>
          <p className="view-header-desc">
            A real, transparent rules-based logistics optimizer. No opaque "black-box AI" claims — every routing, pricing, and batching decision is deterministic, explainable, and respects fair driver compensation floors.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn-secondary btn-sm"
            onClick={() => handleApplyPreset('corridor-batch')}
          >
            Preset: Pooled Batch
          </button>
          <button
            className="btn-secondary btn-sm"
            onClick={() => handleApplyPreset('urgent-single')}
          >
            Preset: Express Urgent
          </button>
          <button
            className="btn-secondary btn-sm"
            onClick={() => handleApplyPreset('long-distance')}
          >
            Preset: Long Distance
          </button>
        </div>
      </div>

      {/* Main Grid: Simulator Controls (Left) + Engine Recommendation & Explanation (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        {/* Simulator Controls */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="var(--green-primary)" />
              <span>Interactive Decision Simulator</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Real-time rule evaluation
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Urgency */}
            <div>
              <label className="form-label">Customer Urgency Level</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'flexible', label: 'Flexible (Batchable)', icon: Calendar },
                  { id: 'normal', label: 'Normal (Standard)', icon: Clock },
                  { id: 'urgent', label: 'Urgent (Express)', icon: Zap }
                ].map((u) => {
                  const Icon = u.icon;
                  const isSelected = urgency === u.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => setUrgency(u.id)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${isSelected ? 'var(--green-primary)' : 'var(--border-light)'}`,
                        background: isSelected ? 'var(--green-light)' : '#FFFFFF',
                        color: isSelected ? 'var(--green-hover)' : 'var(--text-dark)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Icon size={16} />
                      <span>{u.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Distance Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Fulfillment Distance</label>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{distanceKm} km</strong>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>0.5 km (Hyperlocal)</span>
                <span>4.5 km (Boundary)</span>
                <span>8.0 km (Extended)</span>
              </div>
            </div>

            {/* Compatible Batchable Orders Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Nearby Compatible Orders in Corridor</label>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{compatibleOrders} orders</strong>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={compatibleOrders}
                onChange={(e) => setCompatibleOrders(parseInt(e.target.value, 10))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>0 (Solo run)</span>
                <span>2 (Cluster candidate)</span>
                <span>5 (High density batch)</span>
              </div>
            </div>

            {/* Basket Value Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Customer Basket Value</label>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>₹{basketValue}</strong>
              </div>
              <input
                type="range"
                min="150"
                max="1500"
                step="50"
                value={basketValue}
                onChange={(e) => setBasketValue(parseInt(e.target.value, 10))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>₹150</span>
                <span>₹500 (Standard)</span>
                <span>₹1500 (Bulk)</span>
              </div>
            </div>

            {/* Configurable Partner Compensation Floor */}
            <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--green-primary)" />
                  <label className="form-label" style={{ margin: 0 }}>Partner Min. Compensation Floor</label>
                </div>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#059669' }}>
                  ₹{minPartnerCompensation}
                </strong>
              </div>
              <input
                type="range"
                min="24"
                max="50"
                step="2"
                value={minPartnerCompensation}
                onChange={(e) => setMinPartnerCompensation(parseInt(e.target.value, 10))}
              />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Platform rule: No delivery is ever dispatched below this fair wage floor.
              </p>
            </div>
          </div>
        </div>

        {/* Engine Recommendation Output Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="var(--green-primary)" />
              <span>Engine Decision & Transparent Rationale</span>
            </div>
            <span className="brand-badge" style={{ fontSize: '0.7rem' }}>
              Deterministic Rule Output
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Primary Recommendation Banner */}
            <div
              style={{
                padding: '18px 20px',
                borderRadius: 'var(--radius-md)',
                background: evaluation.recommendedMode === 'scheduled' ? '#ECFDF5' : evaluation.recommendedMode === 'express' ? '#FFF1F2' : '#EFF6FF',
                border: `1.5px solid ${evaluation.recommendedMode === 'scheduled' ? '#A7F3D0' : evaluation.recommendedMode === 'express' ? '#FECDD3' : '#BFDBFE'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Optimal Speed Recommendation
                </span>
                <span className={`badge badge-${evaluation.recommendedMode}`} style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
                  {evaluation.recommendedMode.toUpperCase()} DELIVERY
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Triggered Rule ID: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dark)' }}>{evaluation.ruleId}</code>
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-dark)', marginTop: '8px', lineHeight: 1.5, background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                {evaluation.rationale}
              </div>
            </div>

            {/* Economic Metrics Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Customer Fee</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  {evaluation.deliveryFee === 0 ? <span style={{ color: '#059669' }}>FREE</span> : `₹${evaluation.deliveryFee}`}
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rider Pay</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#059669', marginTop: '2px' }}>
                  ₹{evaluation.partnerPay}
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Est. Unit CM</div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    color: evaluation.estCM >= 0 ? '#059669' : '#DC2626',
                    marginTop: '2px'
                  }}
                >
                  {evaluation.estCM >= 0 ? `+₹${evaluation.estCM}` : `-₹${Math.abs(evaluation.estCM)}`}
                </div>
              </div>
            </div>

            {/* Environmental & Efficiency Impact */}
            <div style={{ background: '#F1F5F9', padding: '14px 16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Leaf size={18} color="#059669" />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Corridor Carbon Offset</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Saved {evaluation.carbonSavedGrams}g CO2e vs individual rushed trips
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Efficiency Score</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--green-hover)', fontFamily: 'var(--font-mono)' }}>
                  {evaluation.efficiencyScore}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Transparent Rule Logic Table */}
      <div className="card">
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={20} color="var(--green-primary)" />
            <span>Complete Deterministic Rule Architecture</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            100% Audit-compliant rules logic
          </span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Conditions Checked</th>
                <th>Recommended Action</th>
                <th>Customer Fee</th>
                <th>Rider Compensation</th>
                <th>Impact Rationale</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: evaluation.ruleId === 'RULE-EXPRESS-URGENT' ? 'var(--green-light)' : 'transparent' }}>
                <td>
                  <strong>RULE-EXPRESS-URGENT</strong>
                </td>
                <td><code>urgency == 'urgent'</code></td>
                <td><span className="badge badge-express">Express Delivery</span></td>
                <td>₹45</td>
                <td>₹36+ (Guaranteed)</td>
                <td>Single-rider direct point-to-point dispatch for critical needs. High fee preserves positive unit economics.</td>
              </tr>

              <tr style={{ background: evaluation.ruleId === 'RULE-POOL-CORRIDOR' ? 'var(--green-light)' : 'transparent' }}>
                <td>
                  <strong>RULE-POOL-CORRIDOR</strong>
                </td>
                <td><code>urgency == 'flexible' OR compatible_orders &gt;= 2</code></td>
                <td><span className="badge badge-scheduled">Scheduled Delivery</span></td>
                <td>₹0 (if &ge;₹500) else ₹15</td>
                <td>₹26 + (₹4 × orders)</td>
                <td>Multi-drop corridor bundling. Customer enjoys free/cheap delivery; rider earns multi-drop stacked pay; saves dead miles.</td>
              </tr>

              <tr style={{ background: evaluation.ruleId === 'RULE-DISTANCE-CALIBRATED' ? 'var(--green-light)' : 'transparent' }}>
                <td>
                  <strong>RULE-DISTANCE-CALIBRATED</strong>
                </td>
                <td><code>distance &gt; 4.5 km</code></td>
                <td><span className="badge badge-standard">Standard Delivery</span></td>
                <td>₹35</td>
                <td>₹34+</td>
                <td>Prevents dark-store perimeter losses by calibrating distance compensation while preserving platform margin.</td>
              </tr>

              <tr style={{ background: evaluation.ruleId === 'RULE-STANDARD-BALANCED' ? 'var(--green-light)' : 'transparent' }}>
                <td>
                  <strong>RULE-STANDARD-BALANCED</strong>
                </td>
                <td><code>Default Hyperlocal Fallback</code></td>
                <td><span className="badge badge-standard">Standard Delivery</span></td>
                <td>₹25</td>
                <td>₹28+</td>
                <td>Our baseline benchmark: balances 30-min neighborhood delivery with guaranteed ₹28 fair driver compensation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
