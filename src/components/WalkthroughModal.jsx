import React from 'react';
import { X, ArrowRight, ShoppingBag, Store, Bike, Calculator, Cpu, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WalkthroughModal = () => {
  const { showWalkthrough, setShowWalkthrough, setActiveTab } = useApp();

  if (!showWalkthrough) return null;

  const steps = [
    {
      num: 1,
      title: 'Customer Places Order',
      icon: ShoppingBag,
      tab: 'customer',
      desc: 'Browse fresh groceries from Indiranagar/Koramangala merchants, select delivery speed (Scheduled, Standard, or Express), and hit "Place Order".'
    },
    {
      num: 2,
      title: 'Merchant Fulfills Order',
      icon: Store,
      tab: 'merchant',
      desc: 'Switch to Merchant Dashboard. The order appears instantly. Click "Accept Order" -> "Start Preparing" -> "Ready for Pickup".'
    },
    {
      num: 3,
      title: 'Rider Delivers Package',
      icon: Bike,
      tab: 'partner',
      desc: 'Switch to Delivery Partners. Rider claims available pickup, clicks "Picked Up" -> "In Transit" -> "Delivered", earning guaranteed fair compensation.'
    },
    {
      num: 4,
      title: 'Verify Unit Economics',
      icon: Calculator,
      tab: 'profitability',
      desc: 'Check the Profitability Engine: see how our ₹500 basket yields an exact +₹9 Contribution Margin (unlike dark-store -₹45 cash burn).'
    },
    {
      num: 5,
      title: 'Inspect Smart Delivery Rules',
      icon: Cpu,
      tab: 'smart-delivery',
      desc: 'Experience our transparent rules-based batching engine with interactive sliders for corridor batching and fair partner pay.'
    }
  ];

  const handleJump = (tabId) => {
    setActiveTab(tabId);
    setShowWalkthrough(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowWalkthrough(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--green-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--green-primary)'
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Full-Circle Demo Guide</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Test the end-to-end local commerce and unit-positive logistics workflow
              </p>
            </div>
          </div>
          <button onClick={() => setShowWalkthrough(false)} style={{ color: 'var(--text-muted)', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: '#F8FAFC',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--navy-sidebar)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}
                >
                  {s.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      {s.title}
                    </div>
                    <button
                      onClick={() => handleJump(s.tab)}
                      className="btn-sm"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--green-hover)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'var(--green-light)',
                        borderRadius: '6px'
                      }}
                    >
                      Jump to Screen <ArrowRight size={12} />
                    </button>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={() => setShowWalkthrough(false)}>
            Got it, Let's Explore!
          </button>
        </div>
      </div>
    </div>
  );
};
