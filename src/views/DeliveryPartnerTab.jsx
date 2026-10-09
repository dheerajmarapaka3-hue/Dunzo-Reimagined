import React from 'react';
import {
  Bike,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Zap,
  Calendar,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DeliveryPartnerTab = () => {
  const {
    partners,
    activePartnerId,
    setActivePartnerId,
    orders,
    acceptDeliveryAssignment,
    updateDeliveryStatus,
    togglePartnerStatus
  } = useApp();

  const currentPartner = partners.find((p) => p.id === activePartnerId) || partners[0];

  // Available deliveries: orders that are ready_for_pickup or accepted without partner
  const availableDeliveries = orders.filter(
    (o) => (o.status === 'ready_for_pickup' || o.status === 'accepted' || o.status === 'preparing') && !o.partnerId
  );

  // Deliveries assigned to this partner that are still active
  const myActiveDeliveries = orders.filter(
    (o) => o.partnerId === currentPartner.id && o.status !== 'delivered' && o.status !== 'rejected'
  );

  // Deliveries completed today by this partner
  const myCompletedDeliveries = orders.filter(
    (o) => o.partnerId === currentPartner.id && o.status === 'delivered'
  );

  return (
    <div>
      {/* Rider Header & Profile Switcher */}
      <div className="view-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>{currentPartner.avatar}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 className="view-header-title">{currentPartner.name}</h2>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '999px',
                    background: currentPartner.status === 'Online' ? '#ECFDF5' : '#F1F5F9',
                    color: currentPartner.status === 'Online' ? '#047857' : '#64748B',
                    border: `1px solid ${currentPartner.status === 'Online' ? '#A7F3D0' : '#CBD5E1'}`
                  }}
                >
                  ● {currentPartner.status}
                </span>
              </div>
              <p className="view-header-desc">
                {currentPartner.vehicle} ({currentPartner.vehicleType}) • {currentPartner.zone} • Rating: {currentPartner.rating} ★
              </p>
            </div>
          </div>
        </div>

        {/* Rider Profile Selector & Status Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            className="form-input"
            style={{ width: 'auto', padding: '8px 12px', fontSize: '0.85rem' }}
            value={activePartnerId}
            onChange={(e) => setActivePartnerId(e.target.value)}
          >
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.vehicleType})
              </option>
            ))}
          </select>

          <button
            className={`btn-sm ${currentPartner.status === 'Online' ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => togglePartnerStatus(currentPartner.id)}
          >
            {currentPartner.status === 'Online' ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Rider KPIs */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
            <TrendingUp size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Today's Earnings</div>
            <div className="metric-value">₹{currentPartner.todayEarnings}</div>
            <div className="metric-sub positive">
              <ShieldCheck size={12} />
              <span>₹28 minimum pay floor met</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
            <Bike size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Completed Deliveries</div>
            <div className="metric-value">{currentPartner.todayDeliveries} runs</div>
            <div className="metric-sub">
              <span>Avg ₹{Math.round(currentPartner.todayEarnings / (currentPartner.todayDeliveries || 1))}/run</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#F5F3FF', color: '#8B5CF6' }}>
            <Navigation size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Corridor Batch Bonus</div>
            <div className="metric-value">+₹12/batch</div>
            <div className="metric-sub positive">
              <span>Multi-drop corridor pooling</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <ShieldCheck size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Fair Wage Index</div>
            <div className="metric-value">100%</div>
            <div className="metric-sub positive">
              <span>Zero below-floor dispatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active In-Progress Deliveries Stepper */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation size={20} color="var(--green-primary)" />
            <span>My Active Delivery Assignments ({myActiveDeliveries.length})</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Update fulfillment milestone as you ride
          </span>
        </div>

        {myActiveDeliveries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
            No active assignment right now. Accept an order from the available pool below!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {myActiveDeliveries.map((ord) => (
              <div
                key={ord.id}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  background: '#F8FAFC'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>{ord.id}</strong>
                      <span className={`badge badge-${ord.deliveryMode}`}>{ord.deliveryMode}</span>
                      <span className={`badge badge-${ord.status}`}>{ord.status.replace(/_/g, ' ')}</span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Store: <strong>{ord.retailerName}</strong> → Customer: <strong>{ord.customer?.name}</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Guaranteed Payout</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-mono)' }}>
                      ₹{ord.deliveryPartnerPayment}
                    </div>
                  </div>
                </div>

                {/* Pickup and Drop Details */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pickup Location</div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ord.retailerName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Distance: {ord.distanceKm} km</div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Delivery Drop</div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{ord.customer?.address}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Customer Phone: {ord.customer?.phone}</div>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                  {ord.status !== 'picked_up' && ord.status !== 'in_transit' && (
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => updateDeliveryStatus(ord.id, 'picked_up')}
                    >
                      <Bike size={14} />
                      <span>Confirm Picked Up from Store</span>
                    </button>
                  )}

                  {ord.status === 'picked_up' && (
                    <button
                      className="btn-secondary btn-sm"
                      style={{ color: '#0891B2', borderColor: '#A5F3FC' }}
                      onClick={() => updateDeliveryStatus(ord.id, 'in_transit')}
                    >
                      <Navigation size={14} />
                      <span>Start Ride (In Transit)</span>
                    </button>
                  )}

                  {(ord.status === 'picked_up' || ord.status === 'in_transit') && (
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => updateDeliveryStatus(ord.id, 'delivered')}
                    >
                      <CheckCircle2 size={16} />
                      <span>Mark Delivered to Customer</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Delivery Pool */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bike size={20} color="var(--green-primary)" />
            <span>Available Delivery Pool ({availableDeliveries.length})</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Transparent distance & fair compensation
          </span>
        </div>

        {availableDeliveries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
            No unassigned deliveries in the queue right now. All orders are assigned or fulfilled!
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Pickup Store</th>
                  <th>Delivery Corridor</th>
                  <th>Est. Distance</th>
                  <th>Speed Mode</th>
                  <th>Guaranteed Pay</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableDeliveries.map((ord) => (
                  <tr key={ord.id}>
                    <td><strong style={{ fontFamily: 'var(--font-mono)' }}>{ord.id}</strong></td>
                    <td>
                      <div>{ord.retailerName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Store status: {ord.status.replace(/_/g, ' ')}</div>
                    </td>
                    <td>
                      <div>{ord.customer?.address?.split(',')[0]}</div>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{ord.distanceKm} km</span>
                    </td>
                    <td>
                      <span className={`badge badge-${ord.deliveryMode}`}>{ord.deliveryMode}</span>
                    </td>
                    <td>
                      <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>
                        ₹{ord.deliveryPartnerPayment}
                      </strong>
                    </td>
                    <td>
                      <button
                        className="btn-primary btn-sm"
                        onClick={() => acceptDeliveryAssignment(ord.id, currentPartner.id)}
                      >
                        <span>Accept Assignment</span>
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Completed Today History */}
      <div className="card">
        <div className="card-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} color="var(--green-primary)" />
            <span>Today’s Completed Runs ({myCompletedDeliveries.length})</span>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Drop Area</th>
                <th>Mode</th>
                <th>Distance</th>
                <th>Rider Pay Earned</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myCompletedDeliveries.map((ord) => (
                <tr key={ord.id}>
                  <td><strong style={{ fontFamily: 'var(--font-mono)' }}>{ord.id}</strong></td>
                  <td>{ord.customer?.address}</td>
                  <td><span className={`badge badge-${ord.deliveryMode}`}>{ord.deliveryMode}</span></td>
                  <td>{ord.distanceKm} km</td>
                  <td><strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>+₹{ord.deliveryPartnerPayment}</strong></td>
                  <td><span className="badge badge-delivered">Delivered</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
