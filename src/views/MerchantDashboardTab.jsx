import React, { useState } from 'react';
import {
  Store,
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  TrendingUp,
  AlertCircle,
  Layers,
  ArrowRight,
  Eye,
  Check,
  Percent
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MerchantDashboardTab = () => {
  const {
    retailers,
    activeMerchantId,
    setActiveMerchantId,
    orders,
    updateOrderStatus,
    products,
    updateProductStock
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState('orders'); // 'orders' | 'inventory' | 'sales'
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const currentRetailer = retailers.find((r) => r.id === activeMerchantId) || retailers[0];

  // Filter orders for this merchant
  const merchantOrders = orders.filter((o) => o.retailerId === activeMerchantId);

  // Grouped by stage
  const incomingOrders = merchantOrders.filter((o) => o.status === 'placed');
  const activePreparingOrders = merchantOrders.filter((o) => o.status === 'accepted' || o.status === 'preparing');
  const readyOrders = merchantOrders.filter((o) => o.status === 'ready_for_pickup');
  const pastOrders = merchantOrders.filter((o) => o.status === 'picked_up' || o.status === 'in_transit' || o.status === 'delivered');

  // Stats
  const totalSales = merchantOrders.reduce((sum, o) => sum + o.basketValue, 0);
  const platformCommissionPaid = merchantOrders.reduce((sum, o) => sum + o.retailerCommission, 0);
  const netMerchantEarnings = totalSales - platformCommissionPaid;

  // Merchant's inventory items
  const merchantProducts = products.filter((p) => p.retailerId === activeMerchantId);

  return (
    <div>
      {/* Merchant Header & Store Selector */}
      <div className="view-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>{currentRetailer.iconEmoji}</span>
            <div>
              <h2 className="view-header-title">{currentRetailer.name}</h2>
              <p className="view-header-desc">
                {currentRetailer.area} • Store Operations Dashboard • Fair 5% Platform Fee
              </p>
            </div>
          </div>
        </div>

        {/* Store Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Switch Store:
          </label>
          <select
            className="form-input"
            style={{ width: 'auto', padding: '8px 12px', fontSize: '0.85rem' }}
            value={activeMerchantId}
            onChange={(e) => setActiveMerchantId(e.target.value)}
          >
            {retailers.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.area.split(',')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
            <TrendingUp size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Gross Sales Today</div>
            <div className="metric-value">₹{totalSales.toLocaleString()}</div>
            <div className="metric-sub positive">
              <span>{merchantOrders.length} total orders</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
            <Package size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Orders to Fulfill</div>
            <div className="metric-value">{incomingOrders.length + activePreparingOrders.length}</div>
            <div className="metric-sub">
              <span>{incomingOrders.length} pending action</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#F5F3FF', color: '#8B5CF6' }}>
            <Percent size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Net Merchant Payout</div>
            <div className="metric-value">₹{netMerchantEarnings.toLocaleString()}</div>
            <div className="metric-sub positive">
              <span>After 5% commission (₹{platformCommissionPaid})</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <Clock size={24} />
          </div>
          <div className="metric-details">
            <div className="metric-label">Avg Store Prep Time</div>
            <div className="metric-value">9.4 min</div>
            <div className="metric-sub">
              <span>Standard SLA: &lt; 15 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTabSub('orders')}
          className={`btn-sm ${activeTabSub === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <span>Incoming & Active Orders</span>
          {incomingOrders.length > 0 && (
            <span style={{ background: '#EF4444', color: '#FFF', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '999px' }}>
              {incomingOrders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTabSub('inventory')}
          className={`btn-sm ${activeTabSub === 'inventory' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <span>Store Inventory ({merchantProducts.length} items)</span>
        </button>

        <button
          onClick={() => setActiveTabSub('sales')}
          className={`btn-sm ${activeTabSub === 'sales' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <span>Sales & Payout Ledger</span>
        </button>
      </div>

      {/* Orders Sub-Tab */}
      {activeTabSub === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* New / Action Required Orders */}
          {incomingOrders.length > 0 && (
            <div className="card" style={{ borderLeft: '4px solid #EF4444', background: '#FEF2F2' }}>
              <div className="card-title" style={{ color: '#991B1B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={20} color="#DC2626" />
                  <span>New Incoming Order Request — Immediate Action Needed</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {incomingOrders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      border: '1px solid #FECACA',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                          {ord.id}
                        </strong>
                        <span className={`badge badge-${ord.deliveryMode}`}>
                          {ord.deliveryMode}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Just now
                        </span>
                      </div>

                      <div style={{ marginTop: '6px', fontSize: '0.85rem' }}>
                        <strong>Customer:</strong> {ord.customer?.name} ({ord.customer?.address})
                      </div>

                      <div style={{ marginTop: '4px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Items: {ord.items.map((it) => `${it.name} (x${it.qty})`).join(', ')}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ textAlign: 'right', marginRight: '10px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Order Value</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                          ₹{ord.basketValue}
                        </div>
                      </div>

                      <button
                        className="btn-primary btn-sm"
                        onClick={() => updateOrderStatus(ord.id, 'accepted')}
                      >
                        <CheckCircle2 size={16} />
                        <span>Accept Order</span>
                      </button>

                      <button
                        className="btn-secondary btn-sm"
                        style={{ color: '#DC2626', borderColor: '#FECACA' }}
                        onClick={() => updateOrderStatus(ord.id, 'rejected', 'Stock unavailable')}
                      >
                        <XCircle size={16} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Orders In Fulfillment */}
          <div className="card">
            <div className="card-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} color="var(--green-primary)" />
                <span>Orders In Fulfillment & Preparation</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Move orders through packaging lifecycle
              </span>
            </div>

            {activePreparingOrders.length === 0 && readyOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                No orders currently in preparation. Place a new order from Customer Store to test!
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer & Address</th>
                      <th>Items To Pack</th>
                      <th>Value</th>
                      <th>Speed</th>
                      <th>Current Stage</th>
                      <th>Fulfillment Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...activePreparingOrders, ...readyOrders].map((ord) => (
                      <tr key={ord.id}>
                        <td>
                          <strong style={{ fontFamily: 'var(--font-mono)' }}>{ord.id}</strong>
                        </td>
                        <td>
                          <div>{ord.customer?.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {ord.customer?.address}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>
                            {ord.items.length} items:
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {ord.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}
                          </div>
                        </td>
                        <td>
                          <strong style={{ fontFamily: 'var(--font-mono)' }}>₹{ord.basketValue}</strong>
                        </td>
                        <td>
                          <span className={`badge badge-${ord.deliveryMode}`}>{ord.deliveryMode}</span>
                        </td>
                        <td>
                          <span className={`badge badge-${ord.status}`}>
                            {ord.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td>
                          {ord.status === 'accepted' && (
                            <button
                              className="btn-secondary btn-sm"
                              onClick={() => updateOrderStatus(ord.id, 'preparing')}
                              style={{ color: '#D97706', borderColor: '#FDE68A' }}
                            >
                              <span>Start Packing</span>
                              <ArrowRight size={14} />
                            </button>
                          )}
                          {ord.status === 'preparing' && (
                            <button
                              className="btn-primary btn-sm"
                              onClick={() => updateOrderStatus(ord.id, 'ready_for_pickup')}
                            >
                              <span>Mark Ready for Pickup</span>
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                          {ord.status === 'ready_for_pickup' && (
                            <span style={{ fontSize: '0.78rem', color: 'var(--green-hover)', fontWeight: 700 }}>
                              ✓ Awaiting Rider Pickup
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Past / Dispatched Orders */}
          <div className="card">
            <div className="card-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="var(--green-primary)" />
                <span>Recently Dispatched & Delivered Orders</span>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Delivery Partner</th>
                    <th>Order Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pastOrders.slice(0, 4).map((ord) => (
                    <tr key={ord.id}>
                      <td><strong style={{ fontFamily: 'var(--font-mono)' }}>{ord.id}</strong></td>
                      <td>{ord.customer?.name}</td>
                      <td>{ord.partnerName || 'Assigned Rider'}</td>
                      <td>₹{ord.basketValue}</td>
                      <td>
                        <span className={`badge badge-${ord.status}`}>{ord.status.replace(/_/g, ' ')}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Sub-Tab */}
      {activeTabSub === 'inventory' && (
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={20} color="var(--green-primary)" />
              <span>Live Store Stock & Inventory Control</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Updates reflect instantly in the Customer Store
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Selling Price</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                  <th>Quick Adjustment</th>
                </tr>
              </thead>
              <tbody>
                {merchantProducts.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                        />
                        <div>
                          <strong>{prod.name}</strong>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{prod.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td>{prod.category}</td>
                    <td>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>₹{prod.price}</strong>
                    </td>
                    <td>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: prod.stock <= 5 ? '#DC2626' : 'var(--text-dark)'
                        }}
                      >
                        {prod.stock} units
                      </span>
                    </td>
                    <td>
                      {prod.stock <= 0 ? (
                        <span className="badge badge-rejected">Out of Stock</span>
                      ) : prod.stock <= 8 ? (
                        <span className="badge badge-preparing">Low Stock ({prod.stock})</span>
                      ) : (
                        <span className="badge badge-delivered">Healthy</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          className="btn-secondary btn-sm"
                          style={{ padding: '4px 8px' }}
                          onClick={() => updateProductStock(prod.id, Math.max(0, prod.stock - 5))}
                        >
                          -5
                        </button>
                        <button
                          className="btn-secondary btn-sm"
                          style={{ padding: '4px 8px' }}
                          onClick={() => updateProductStock(prod.id, prod.stock + 10)}
                        >
                          +10
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sales Sub-Tab */}
      {activeTabSub === 'sales' && (
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="var(--green-primary)" />
              <span>Merchant Settlement & Daily Ledger</span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Transparent next-day bank payout
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Customer Basket</th>
                  <th>Platform Fee (5%)</th>
                  <th>Net Merchant Payout</th>
                  <th>Settlement Status</th>
                </tr>
              </thead>
              <tbody>
                {merchantOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>{ord.id}</strong>
                    </td>
                    <td>₹{ord.basketValue}</td>
                    <td style={{ color: '#DC2626' }}>-₹{ord.retailerCommission}</td>
                    <td>
                      <strong style={{ fontFamily: 'var(--font-mono)', color: '#059669' }}>
                        ₹{ord.basketValue - ord.retailerCommission}
                      </strong>
                    </td>
                    <td>
                      <span className="badge badge-delivered">Processed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
