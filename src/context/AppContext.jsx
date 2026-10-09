import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_RETAILERS,
  DEFAULT_PRODUCTS,
  DEFAULT_PARTNERS,
  DEFAULT_ORDERS,
  DEFAULT_UNIT_ECONOMICS,
  calculateProfitability,
  evaluateSmartDelivery
} from '../data/mockData';

const AppContext = createContext(null);
const STORAGE_KEY = 'dunzo_reimagined_state_v1';

export const AppProvider = ({ children }) => {
  // Load initial state from localStorage or defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          retailers: parsed.retailers || DEFAULT_RETAILERS,
          products: parsed.products || DEFAULT_PRODUCTS,
          partners: parsed.partners || DEFAULT_PARTNERS,
          orders: parsed.orders || DEFAULT_ORDERS,
          unitEconomics: parsed.unitEconomics || DEFAULT_UNIT_ECONOMICS
        };
      }
    } catch (e) {
      console.error('Failed to parse localStorage data:', e);
    }
    return {
      retailers: DEFAULT_RETAILERS,
      products: DEFAULT_PRODUCTS,
      partners: DEFAULT_PARTNERS,
      orders: DEFAULT_ORDERS,
      unitEconomics: DEFAULT_UNIT_ECONOMICS
    };
  });

  // UI state
  const [activeTab, setActiveTab] = useState('overview');
  const [cart, setCart] = useState([]);
  const [cartDeliveryMode, setCartDeliveryMode] = useState('standard');
  const [activeMerchantId, setActiveMerchantId] = useState('ret-1');
  const [activePartnerId, setActivePartnerId] = useState('part-1');
  const [toasts, setToasts] = useState([]);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [smartEngineParams, setSmartEngineParams] = useState({
    urgency: 'flexible',
    distanceKm: 2.2,
    basketValue: 500,
    compatibleOrders: 2,
    minPartnerCompensation: 28
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }, [data]);

  // Toast notification system
  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset demo data
  const resetDemoData = () => {
    const fresh = {
      retailers: DEFAULT_RETAILERS,
      products: DEFAULT_PRODUCTS,
      partners: DEFAULT_PARTNERS,
      orders: DEFAULT_ORDERS,
      unitEconomics: DEFAULT_UNIT_ECONOMICS
    };
    setData(fresh);
    setCart([]);
    setCartDeliveryMode('standard');
    localStorage.removeItem(STORAGE_KEY);
    addToast('Demo State Reset', 'Fresh simulated products, retailers, and order flows restored!', 'success');
  };

  // Cart operations
  const addToCart = (product) => {
    if (product.stock <= 0) {
      addToast('Out of Stock', `${product.name} is currently out of stock.`, 'warning');
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          addToast('Stock Limit', `Cannot add more than ${product.stock} units.`, 'warning');
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    addToast('Item Added', `${product.name} added to cart.`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.qty + delta;
            if (newQty <= 0) return null;
            if (newQty > item.product.stock) {
              addToast('Stock Limit', `Max available is ${item.product.stock}`, 'warning');
              return item;
            }
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Place order
  const placeOrder = ({ customer, deliveryMode }) => {
    if (cart.length === 0) return null;

    const basketValue = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

    // Delivery fee based on selected mode
    let deliveryFee = 25;
    let partnerPay = 28;
    let estMins = 30;

    if (deliveryMode === 'scheduled') {
      deliveryFee = basketValue >= 500 ? 0 : 15;
      partnerPay = 26;
      estMins = 60;
    } else if (deliveryMode === 'express') {
      deliveryFee = 45;
      partnerPay = 36;
      estMins = 18;
    } else {
      // standard
      deliveryFee = 25;
      partnerPay = 28;
      estMins = 30;
    }

    const retailerId = cart[0].product.retailerId;
    const retailer = data.retailers.find((r) => r.id === retailerId) || data.retailers[0];
    const commission = Math.round(basketValue * (retailer.commissionRate || 0.05) * 100) / 100;
    const pickingPackingCost = 8;
    const otherVariableCosts = 5;
    const platformDiscount = 0;

    // Evaluate smart rules recommendation for this order
    const smartEval = evaluateSmartDelivery({
      urgency: deliveryMode === 'express' ? 'urgent' : deliveryMode === 'scheduled' ? 'flexible' : 'normal',
      distanceKm: retailer.distanceKm || 1.8,
      basketValue,
      compatibleOrders: deliveryMode === 'scheduled' ? 3 : 1,
      minPartnerCompensation: 28
    });

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      customer: customer || {
        name: 'You (Demo Customer)',
        phone: '+91 98450 77123',
        address: '102, Shanthi Heights, 100ft Road, Indiranagar'
      },
      retailerId: retailer.id,
      retailerName: retailer.name,
      deliveryMode,
      deliveryFee,
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        qty: i.qty,
        price: i.product.price
      })),
      basketValue,
      retailerCommission: commission,
      deliveryPartnerPayment: partnerPay,
      pickingPackingCost,
      otherVariableCosts,
      platformDiscount,
      status: 'placed', // 'placed' -> 'accepted' -> 'preparing' -> 'ready_for_pickup' -> 'picked_up' -> 'in_transit' -> 'delivered'
      partnerId: null,
      partnerName: null,
      distanceKm: retailer.distanceKm || 1.8,
      estimatedMinutes: estMins,
      engineRecommendation: {
        recommendedMode: smartEval.recommendedMode,
        reason: smartEval.rationale,
        costSaved: smartEval.recommendedMode === 'scheduled' ? 18 : 8
      }
    };

    // Deduct stock from products
    const updatedProducts = data.products.map((p) => {
      const cartItem = cart.find((c) => c.product.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.qty) };
      }
      return p;
    });

    setData((prev) => ({
      ...prev,
      products: updatedProducts,
      orders: [newOrder, ...prev.orders]
    }));

    clearCart();
    addToast('Order Placed Successfully!', `Order ${newOrderId} dispatched to ${retailer.name}.`, 'success');

    // Trigger confetti if available
    if (typeof window !== 'undefined' && window.confetti) {
      window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }

    return newOrderId;
  };

  // Merchant actions: update status (accept, prepare, ready_for_pickup, reject)
  const updateOrderStatus = (orderId, newStatus, reason = '') => {
    setData((prev) => {
      const updatedOrders = prev.orders.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            rejectionReason: reason || ord.rejectionReason,
            updatedAt: new Date().toISOString()
          };
        }
        return ord;
      });
      return { ...prev, orders: updatedOrders };
    });

    const labelMap = {
      accepted: 'Accepted by Retailer',
      preparing: 'Preparing in Store',
      ready_for_pickup: 'Packed & Ready for Pickup',
      rejected: 'Rejected by Retailer'
    };
    addToast('Merchant Status Updated', `${orderId} is now: ${labelMap[newStatus] || newStatus}`, 'info');
  };

  // Delivery partner actions: accept assignment, update progress
  const acceptDeliveryAssignment = (orderId, partnerId) => {
    const partner = data.partners.find((p) => p.id === partnerId) || data.partners[0];
    setData((prev) => {
      const updatedOrders = prev.orders.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            partnerId: partner.id,
            partnerName: partner.name,
            assignedAt: new Date().toISOString()
          };
        }
        return ord;
      });
      return { ...prev, orders: updatedOrders };
    });
    addToast('Delivery Accepted', `${partner.name} accepted order ${orderId}`, 'success');
  };

  const updateDeliveryStatus = (orderId, newStatus) => {
    let earnedPay = 0;
    let partnerToCredit = null;

    setData((prev) => {
      const targetOrder = prev.orders.find((o) => o.id === orderId);
      if (targetOrder) {
        earnedPay = targetOrder.deliveryPartnerPayment || 28;
        partnerToCredit = targetOrder.partnerId;
      }

      const updatedOrders = prev.orders.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            deliveredAt: newStatus === 'delivered' ? new Date().toISOString() : ord.deliveredAt
          };
        }
        return ord;
      });

      // If delivered, update partner earnings & total count
      let updatedPartners = prev.partners;
      if (newStatus === 'delivered' && partnerToCredit) {
        updatedPartners = prev.partners.map((p) => {
          if (p.id === partnerToCredit) {
            return {
              ...p,
              todayEarnings: p.todayEarnings + earnedPay,
              todayDeliveries: p.todayDeliveries + 1
            };
          }
          return p;
        });
      }

      return {
        ...prev,
        orders: updatedOrders,
        partners: updatedPartners
      };
    });

    const statusLabels = {
      picked_up: 'Rider Picked Up Order',
      in_transit: 'Out for Delivery (In Transit)',
      delivered: 'Delivered to Customer'
    };

    addToast('Delivery Progress', `${orderId} is now: ${statusLabels[newStatus] || newStatus}`, 'success');

    if (newStatus === 'delivered' && typeof window !== 'undefined' && window.confetti) {
      window.confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    }
  };

  // Merchant inventory update
  const updateProductStock = (productId, newStock) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === productId ? { ...p, stock: Number(newStock) } : p))
    }));
    addToast('Inventory Updated', 'Stock count updated.', 'info');
  };

  // Partner status toggle
  const togglePartnerStatus = (partnerId) => {
    setData((prev) => ({
      ...prev,
      partners: prev.partners.map((p) => {
        if (p.id === partnerId) {
          const nextStatus = p.status === 'Online' ? 'Offline' : 'Online';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    }));
  };

  // Unit economics inputs update
  const updateUnitEconomics = (newValues) => {
    setData((prev) => ({
      ...prev,
      unitEconomics: { ...prev.unitEconomics, ...newValues }
    }));
  };

  return (
    <AppContext.Provider
      value={{
        retailers: data.retailers,
        products: data.products,
        partners: data.partners,
        orders: data.orders,
        unitEconomics: data.unitEconomics,
        activeTab,
        setActiveTab,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartDeliveryMode,
        setCartDeliveryMode,
        activeMerchantId,
        setActiveMerchantId,
        activePartnerId,
        setActivePartnerId,
        smartEngineParams,
        setSmartEngineParams,
        toasts,
        addToast,
        removeToast,
        showWalkthrough,
        setShowWalkthrough,
        placeOrder,
        updateOrderStatus,
        acceptDeliveryAssignment,
        updateDeliveryStatus,
        updateProductStock,
        togglePartnerStatus,
        updateUnitEconomics,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
