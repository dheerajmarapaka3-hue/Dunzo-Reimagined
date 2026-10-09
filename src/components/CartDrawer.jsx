import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Clock,
  Zap,
  Calendar,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer = ({ isOpen, onClose, onOrderPlaced }) => {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    cartDeliveryMode,
    setCartDeliveryMode,
    placeOrder
  } = useApp();

  const [customerName, setCustomerName] = useState('Ananya Deshmukh');
  const [customerAddress, setCustomerAddress] = useState('Flat 302, Palm Meadows, 12th Main Indiranagar');
  const [customerPhone, setCustomerPhone] = useState('+91 98860 41239');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  // Delivery fee logic
  let deliveryFee = 25;
  if (cartDeliveryMode === 'scheduled') {
    deliveryFee = subtotal >= 500 ? 0 : 15;
  } else if (cartDeliveryMode === 'express') {
    deliveryFee = 45;
  } else {
    deliveryFee = 25;
  }

  const packagingCost = 8;
  const grandTotal = subtotal + deliveryFee + packagingCost;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const orderId = placeOrder({
      customer: {
        name: customerName,
        phone: customerPhone,
        address: customerAddress
      },
      deliveryMode: cartDeliveryMode
    });

    if (orderId) {
      onClose();
      if (onOrderPlaced) {
        onOrderPlaced(orderId);
      }
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--green-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--green-primary)'
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Your Grocery Basket</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {cart.length} item{cart.length !== 1 ? 's' : ''} from local neighborhood retail
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'var(--text-light)'
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                Add farm-fresh produce or kitchen staples from our verified neighborhood stores.
              </p>
              <button
                className="btn-primary btn-sm"
                onClick={onClose}
                style={{ marginTop: '16px' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: '#F8FAFC',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: 'var(--text-dark)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.product.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          ₹{item.product.price} × {item.qty} = <strong style={{ color: 'var(--text-dark)' }}>₹{item.product.price * item.qty}</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-light)',
                          borderRadius: '6px',
                          background: '#FFFFFF'
                        }}
                      >
                        <button
                          onClick={() => updateCartQty(item.product.id, -1)}
                          style={{ padding: '4px 6px', color: 'var(--text-dark)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 6px' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.product.id, 1)}
                          style={{ padding: '4px 6px', color: 'var(--text-dark)' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ color: '#EF4444', padding: '4px' }}
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Speed Selector - Core Innovation */}
              <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    Select Delivery Speed
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'var(--green-hover)', fontWeight: 700 }}>
                    Flexible = Greener & Cheaper
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Scheduled Option */}
                  <div
                    onClick={() => setCartDeliveryMode('scheduled')}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${cartDeliveryMode === 'scheduled' ? 'var(--green-primary)' : 'var(--border-light)'}`,
                      background: cartDeliveryMode === 'scheduled' ? 'var(--green-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={16} color="var(--green-primary)" />
                        <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>Scheduled (Pooled Batch)</span>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--green-hover)' }}>
                        {subtotal >= 500 ? 'FREE' : '₹15'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Batch slot (2:00 PM – 4:00 PM). Bundled corridor drop; reduces vehicle dead-miles by 42%.
                    </p>
                  </div>

                  {/* Standard Option */}
                  <div
                    onClick={() => setCartDeliveryMode('standard')}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${cartDeliveryMode === 'standard' ? 'var(--green-primary)' : 'var(--border-light)'}`,
                      background: cartDeliveryMode === 'standard' ? 'var(--green-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={16} color="#3B82F6" />
                        <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>Standard Delivery</span>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>₹25</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Arrives in 30–45 mins. Balanced local fulfillment with guaranteed fair rider wage.
                    </p>
                  </div>

                  {/* Express Option */}
                  <div
                    onClick={() => setCartDeliveryMode('express')}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${cartDeliveryMode === 'express' ? 'var(--green-primary)' : 'var(--border-light)'}`,
                      background: cartDeliveryMode === 'express' ? 'var(--green-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={16} color="#E11D48" />
                        <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>Express Priority</span>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>₹45</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Arrives in 15–25 mins. Dedicated single-rider priority dispatch.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div style={{ marginTop: '12px', background: '#F8FAFC', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
                  <MapPin size={14} color="var(--green-primary)" />
                  <span>Delivery Address</span>
                </div>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.8rem', padding: '6px 10px', marginBottom: '6px' }}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Recipient Name"
                />
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Street / Flat Address"
                />
              </div>

              {/* Bill Details */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
                  Transparent Bill Breakdown
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>Item Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>Customer Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--green-hover)' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>Store Packing & Handling</span>
                  <span>₹{packagingCost}</span>
                </div>

                {/* Fair Partner Wage Callout */}
                <div
                  style={{
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.75rem',
                    color: '#065F46'
                  }}
                >
                  <ShieldCheck size={16} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Fair Compensation Guaranteed:</strong> Rider is paid ₹{cartDeliveryMode === 'express' ? '36' : cartDeliveryMode === 'scheduled' ? '26' : '28'} for this run.
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Final Total
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                  ₹{grandTotal}
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--green-hover)', fontWeight: 600 }}>
                ✓ Positive Unit Economics
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
              onClick={handleCheckout}
            >
              <span>Place Order Now</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
