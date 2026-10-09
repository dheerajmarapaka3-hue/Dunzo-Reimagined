import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { CartDrawer } from './components/CartDrawer';
import { WalkthroughModal } from './components/WalkthroughModal';
import { ToastContainer } from './components/ToastContainer';

import { OverviewTab } from './views/OverviewTab';
import { CustomerStoreTab } from './views/CustomerStoreTab';
import { MerchantDashboardTab } from './views/MerchantDashboardTab';
import { DeliveryPartnerTab } from './views/DeliveryPartnerTab';
import { SmartDeliveryTab } from './views/SmartDeliveryTab';
import { ProfitabilityTab } from './views/ProfitabilityTab';
import { ImpactAnalyticsTab } from './views/ImpactAnalyticsTab';

// Mount confetti to window for celebrations
if (typeof window !== 'undefined') {
  window.confetti = confetti;
}

const AppContent = () => {
  const { activeTab, setActiveTab } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'customer':
        return (
          <CustomerStoreTab
            onOpenCart={() => setIsCartOpen(true)}
          />
        );
      case 'merchant':
        return <MerchantDashboardTab />;
      case 'partner':
        return <DeliveryPartnerTab />;
      case 'smart-delivery':
        return <SmartDeliveryTab />;
      case 'profitability':
        return <ProfitabilityTab />;
      case 'impact':
        return <ImpactAnalyticsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="app-container">
      {/* Dark Navy Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Topbar onOpenCart={() => setIsCartOpen(true)} />

        <main className="content-scroll">
          {renderActiveView()}
        </main>
      </div>

      {/* Interactive Drawers & Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderPlaced={(orderId) => {
          // Open merchant tab or notify
        }}
      />
      <WalkthroughModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
