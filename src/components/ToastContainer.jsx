import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        if (toast.type === 'warning') Icon = AlertCircle;
        if (toast.type === 'info') Icon = Info;

        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <Icon size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{toast.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '2px', lineHeight: 1.35 }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: '#94A3B8', padding: '2px', marginLeft: '6px' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
