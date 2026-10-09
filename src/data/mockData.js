export const DEFAULT_RETAILERS = [
  {
    id: 'ret-1',
    name: 'Sri Krishna Supermarket',
    tagline: 'Neighborhood Grocery & Provisions Since 1998',
    area: 'Indiranagar, 100ft Road',
    city: 'Bengaluru',
    rating: 4.8,
    reviewsCount: 420,
    commissionRate: 0.05, // 5%
    distanceKm: 1.4,
    prepTimeMins: 12,
    openStatus: 'Open Now',
    bannerColor: '#0F766E',
    iconEmoji: '🏪'
  },
  {
    id: 'ret-2',
    name: 'Green Basket Organics & Farm Produce',
    tagline: 'Farm-direct fresh vegetables, fruits & whole grains',
    area: 'Koramangala 4th Block',
    city: 'Bengaluru',
    rating: 4.9,
    reviewsCount: 310,
    commissionRate: 0.05,
    distanceKm: 2.1,
    prepTimeMins: 15,
    openStatus: 'Open Now',
    bannerColor: '#15803D',
    iconEmoji: '🥬'
  },
  {
    id: 'ret-3',
    name: 'Daily Fresh Kirana & Provisions',
    tagline: 'Trusted staples, dairy, snacks & household essentials',
    area: 'HSR Layout Sector 2',
    city: 'Bengaluru',
    rating: 4.7,
    reviewsCount: 285,
    commissionRate: 0.05,
    distanceKm: 2.8,
    prepTimeMins: 10,
    openStatus: 'Open Now',
    bannerColor: '#B45309',
    iconEmoji: '🛒'
  }
];

export const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aashirvaad Shudh Chakki Atta',
    category: 'Daily Staples',
    unit: '5 kg',
    price: 245,
    mrp: 275,
    retailerId: 'ret-1',
    stock: 24,
    badge: 'Bestseller',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    description: '100% whole wheat grain flour with superior softness and natural aroma.'
  },
  {
    id: 'prod-2',
    name: 'Amul Taaza Homogenised Toned Milk',
    category: 'Dairy & Eggs',
    unit: '1 Litre (Pouch)',
    price: 54,
    mrp: 56,
    retailerId: 'ret-1',
    stock: 40,
    badge: 'Essential',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    description: 'Pasteurized toned milk with 3.0% fat and 8.5% SNF.'
  },
  {
    id: 'prod-3',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    category: 'Daily Staples',
    unit: '1 Litre Pouch',
    price: 135,
    mrp: 160,
    retailerId: 'ret-1',
    stock: 18,
    badge: '16% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    description: 'Light, healthy cooking oil enriched with Vitamins A & D.'
  },
  {
    id: 'prod-4',
    name: 'Farm Fresh Organic Tomatoes',
    category: 'Fruits & Vegetables',
    unit: '1 kg',
    price: 36,
    mrp: 45,
    retailerId: 'ret-2',
    stock: 35,
    badge: 'Farm Direct',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    description: 'Vine-ripened, pesticide-free fresh local Bangalore tomatoes.'
  },
  {
    id: 'prod-5',
    name: 'Fresh Alphonso Mangoes (Ratnagiri Box)',
    category: 'Fruits & Vegetables',
    unit: '1 kg (approx 4 pcs)',
    price: 299,
    mrp: 380,
    retailerId: 'ret-2',
    stock: 8,
    badge: 'Seasonal Treat',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
    description: 'Naturally ripened, sweet GI-tagged Alphonso mangoes.'
  },
  {
    id: 'prod-6',
    name: 'Tender Coconut (Selected Large)',
    category: 'Fruits & Vegetables',
    unit: '1 piece (~350ml water)',
    price: 55,
    mrp: 65,
    retailerId: 'ret-2',
    stock: 22,
    badge: 'Hydration',
    imageUrl: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=400&q=80',
    description: 'Freshly cut Pollachi green tender coconut with cooling electrolyte water.'
  },
  {
    id: 'prod-7',
    name: 'Tata Salt Vacuum Evaporated',
    category: 'Daily Staples',
    unit: '1 kg',
    price: 28,
    mrp: 30,
    retailerId: 'ret-3',
    stock: 50,
    badge: 'Staple',
    imageUrl: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=400&q=80',
    description: 'Desh Ka Namak. Iodized table salt with high purity.'
  },
  {
    id: 'prod-8',
    name: 'Britannia 100% Whole Wheat Bread',
    category: 'Dairy & Eggs',
    unit: '400g Loaf',
    price: 45,
    mrp: 50,
    retailerId: 'ret-3',
    stock: 14,
    badge: 'Fresh Today',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    description: 'Zero maida wholesome brown bread baked this morning.'
  },
  {
    id: 'prod-9',
    name: 'Nescafe Classic Instant Coffee Jar',
    category: 'Snacks & Beverages',
    unit: '100g Glass Jar',
    price: 215,
    mrp: 235,
    retailerId: 'ret-3',
    stock: 16,
    badge: 'Popular',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
    description: '100% pure roasted coffee beans with rich aroma and bold taste.'
  },
  {
    id: 'prod-10',
    name: 'Haldiram’s Nagpur Bhujia Sev',
    category: 'Snacks & Beverages',
    unit: '350g Pack',
    price: 95,
    mrp: 110,
    retailerId: 'ret-1',
    stock: 30,
    badge: '14% OFF',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
    description: 'Crispy, spiced moth bean flour noodles seasoned with Indian spices.'
  },
  {
    id: 'prod-11',
    name: 'Dettol Germ Protection Liquid Handwash',
    category: 'Household & Personal',
    unit: '750ml Refill Pouch',
    price: 119,
    mrp: 145,
    retailerId: 'ret-1',
    stock: 19,
    badge: 'Hygiene',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    description: 'pH balanced formula with 99.9% protection against germs.'
  },
  {
    id: 'prod-12',
    name: 'India Gate Basmati Rice Feast Rozzana',
    category: 'Daily Staples',
    unit: '1 kg Pack',
    price: 110,
    mrp: 130,
    retailerId: 'ret-3',
    stock: 25,
    badge: 'Premium Grain',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    description: 'Aged basmati grains with aromatic fragrance for daily gourmet cooking.'
  }
];

export const DEFAULT_PARTNERS = [
  {
    id: 'part-1',
    name: 'Ramesh Kumar',
    vehicle: 'Hero Electric Nyx (EV)',
    vehicleType: 'EV Scooter',
    rating: 4.92,
    todayEarnings: 420,
    todayDeliveries: 11,
    status: 'Online',
    zone: 'Indiranagar Cluster',
    phone: '+91 98450 12849',
    avatar: '👨🏽'
  },
  {
    id: 'part-2',
    name: 'Pooja Sharma',
    vehicle: 'Ather 450X (EV)',
    vehicleType: 'EV Scooter',
    rating: 4.88,
    todayEarnings: 364,
    todayDeliveries: 9,
    status: 'Online',
    zone: 'Koramangala Corridor',
    phone: '+91 97421 98231',
    avatar: '👩🏽'
  },
  {
    id: 'part-3',
    name: 'Vijay Manjunath',
    vehicle: 'TVS iQube (EV)',
    vehicleType: 'EV Scooter',
    rating: 4.95,
    todayEarnings: 532,
    todayDeliveries: 14,
    status: 'Online',
    zone: 'HSR Layout & Bellandur',
    phone: '+91 99014 43210',
    avatar: '👨🏾'
  }
];

export const DEFAULT_ORDERS = [
  {
    id: 'ORD-8901',
    createdAt: new Date(Date.now() - 38 * 60 * 1000).toISOString(),
    customer: {
      name: 'Ananya Deshmukh',
      phone: '+91 98860 41239',
      address: 'Flat 302, Palm Meadows, 12th Main Indiranagar'
    },
    retailerId: 'ret-1',
    retailerName: 'Sri Krishna Supermarket',
    deliveryMode: 'standard', // scheduled, standard, express
    deliveryFee: 25,
    items: [
      { productId: 'prod-1', name: 'Aashirvaad Shudh Chakki Atta', qty: 1, price: 245 },
      { productId: 'prod-3', name: 'Fortune Sunlite Refined Sunflower Oil', qty: 1, price: 135 },
      { productId: 'prod-10', name: 'Haldiram’s Nagpur Bhujia Sev', qty: 1, price: 95 },
      { productId: 'prod-7', name: 'Tata Salt Vacuum Evaporated', qty: 1, price: 25 }
    ],
    basketValue: 500,
    retailerCommission: 25, // 5%
    deliveryPartnerPayment: 28,
    pickingPackingCost: 8,
    otherVariableCosts: 5,
    platformDiscount: 0,
    status: 'ready_for_pickup', // placed, accepted, preparing, ready_for_pickup, picked_up, in_transit, delivered, rejected
    partnerId: 'part-1',
    partnerName: 'Ramesh Kumar',
    distanceKm: 1.8,
    estimatedMinutes: 25,
    engineRecommendation: {
      recommendedMode: 'standard',
      reason: 'Dense cluster within 1.8 km corridor. Balanced partner wage of ₹28 with positive unit contribution.',
      costSaved: 12
    }
  },
  {
    id: 'ORD-8902',
    createdAt: new Date(Date.now() - 52 * 60 * 1000).toISOString(),
    customer: {
      name: 'Karthik Ramanathan',
      phone: '+91 97412 88392',
      address: 'Villa 14, Green Glen Layout, Koramangala 4th Block'
    },
    retailerId: 'ret-2',
    retailerName: 'Green Basket Organics & Farm Produce',
    deliveryMode: 'scheduled',
    deliveryFee: 15,
    items: [
      { productId: 'prod-4', name: 'Farm Fresh Organic Tomatoes', qty: 2, price: 36 },
      { productId: 'prod-5', name: 'Fresh Alphonso Mangoes (Ratnagiri Box)', qty: 1, price: 299 },
      { productId: 'prod-6', name: 'Tender Coconut (Selected Large)', qty: 3, price: 55 }
    ],
    basketValue: 536,
    retailerCommission: 26.8,
    deliveryPartnerPayment: 26,
    pickingPackingCost: 6,
    otherVariableCosts: 4,
    platformDiscount: 0,
    status: 'in_transit',
    partnerId: 'part-2',
    partnerName: 'Pooja Sharma',
    distanceKm: 2.3,
    estimatedMinutes: 40,
    engineRecommendation: {
      recommendedMode: 'scheduled',
      reason: 'Batch-pooled corridor: 3 orders grouped together for 4 PM delivery slot, reducing rider dead-miles.',
      costSaved: 22
    }
  },
  {
    id: 'ORD-8903',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    customer: {
      name: 'Sneha Rao',
      phone: '+91 99801 32748',
      address: 'Tower B - 804, Salarpuria Symphony, HSR Sector 2'
    },
    retailerId: 'ret-3',
    retailerName: 'Daily Fresh Kirana & Provisions',
    deliveryMode: 'express',
    deliveryFee: 45,
    items: [
      { productId: 'prod-8', name: 'Britannia 100% Whole Wheat Bread', qty: 2, price: 45 },
      { productId: 'prod-9', name: 'Nescafe Classic Instant Coffee Jar', qty: 1, price: 215 },
      { productId: 'prod-2', name: 'Amul Taaza Homogenised Toned Milk', qty: 2, price: 54 }
    ],
    basketValue: 413,
    retailerCommission: 20.65,
    deliveryPartnerPayment: 36,
    pickingPackingCost: 8,
    otherVariableCosts: 5,
    platformDiscount: 0,
    status: 'preparing',
    partnerId: null,
    partnerName: null,
    distanceKm: 1.2,
    estimatedMinutes: 18,
    engineRecommendation: {
      recommendedMode: 'express',
      reason: 'Urgent customer request with priority premium fee ₹45. Allocated dedicated rider slot.',
      costSaved: 0
    }
  },
  {
    id: 'ORD-8899',
    createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    customer: {
      name: 'Vikram Mehta',
      phone: '+91 98451 00214',
      address: 'House #84, 5th Cross Defence Colony, Indiranagar'
    },
    retailerId: 'ret-1',
    retailerName: 'Sri Krishna Supermarket',
    deliveryMode: 'standard',
    deliveryFee: 25,
    items: [
      { productId: 'prod-12', name: 'India Gate Basmati Rice Feast Rozzana', qty: 2, price: 110 },
      { productId: 'prod-11', name: 'Dettol Germ Protection Liquid Handwash', qty: 1, price: 119 },
      { productId: 'prod-10', name: 'Haldiram’s Nagpur Bhujia Sev', qty: 2, price: 95 }
    ],
    basketValue: 529,
    retailerCommission: 26.45,
    deliveryPartnerPayment: 28,
    pickingPackingCost: 8,
    otherVariableCosts: 5,
    platformDiscount: 0,
    status: 'delivered',
    partnerId: 'part-1',
    partnerName: 'Ramesh Kumar',
    distanceKm: 1.6,
    estimatedMinutes: 22,
    engineRecommendation: {
      recommendedMode: 'standard',
      reason: 'Completed successfully within SLA. High satisfaction score 5/5.',
      costSaved: 14
    }
  }
];

export const DEFAULT_UNIT_ECONOMICS = {
  basketValue: 500,
  customerDeliveryFee: 25,
  retailerCommission: 25, // 5% of basket
  deliveryPartnerPayment: 28,
  pickingPackingCost: 8,
  otherVariableCosts: 5,
  platformDiscount: 0
};

// Calculations as mandated:
// Platform revenue = delivery fee + retailer commission + promotional revenue
// Variable costs = partner payment + fulfilment cost + other variable costs + platform-funded discount
// Contribution margin = platform revenue - variable costs
// Default: 25 + 25 + 0 = 50 rev; 28 + 8 + 5 + 0 = 41 costs; CM = 50 - 41 = 9
export function calculateProfitability(inputs) {
  const basket = Number(inputs.basketValue) || 0;
  const deliveryFee = Number(inputs.customerDeliveryFee) || 0;
  const commission = Number(inputs.retailerCommission) || 0;
  const promotionalRev = Number(inputs.promotionalRevenue || 0);

  const platformRevenue = deliveryFee + commission + promotionalRev;

  const partnerPayment = Number(inputs.deliveryPartnerPayment) || 0;
  const pickingCost = Number(inputs.pickingPackingCost) || 0;
  const otherVarCosts = Number(inputs.otherVariableCosts) || 0;
  const discount = Number(inputs.platformDiscount) || 0;

  const variableCosts = partnerPayment + pickingCost + otherVarCosts + discount;
  const contributionMargin = platformRevenue - variableCosts;
  const marginPercentage = platformRevenue > 0 ? (contributionMargin / platformRevenue) * 100 : 0;
  const isNegative = contributionMargin < 0;

  return {
    basket,
    platformRevenue: Math.round(platformRevenue * 100) / 100,
    variableCosts: Math.round(variableCosts * 100) / 100,
    contributionMargin: Math.round(contributionMargin * 100) / 100,
    marginPercentage: Math.round(marginPercentage * 10) / 10,
    isNegative,
    breakdown: {
      deliveryFee,
      commission,
      partnerPayment,
      pickingCost,
      otherVarCosts,
      discount
    }
  };
}

// Transparent Rules-Based Decision Engine logic:
export function evaluateSmartDelivery({
  urgency = 'normal', // 'flexible' | 'normal' | 'urgent'
  distanceKm = 2.0,
  basketValue = 500,
  compatibleOrders = 2,
  minPartnerCompensation = 28
}) {
  let recommendedMode = 'standard';
  let deliveryFee = 25;
  let partnerPay = Math.max(minPartnerCompensation, 28);
  let rationale = '';
  let ruleId = '';
  let efficiencyScore = 80;
  let carbonSavedGrams = 140;

  // Rule 1: Urgent priority
  if (urgency === 'urgent') {
    recommendedMode = 'express';
    deliveryFee = 45;
    partnerPay = Math.max(minPartnerCompensation, 36);
    rationale = `Rule #1 (High Urgency): Customer prioritized sub-25 min delivery. Dedicated single-rider dispatch assigned. Express fee (₹${deliveryFee}) guarantees high partner wage (₹${partnerPay}) while maintaining unit economics.`;
    ruleId = 'RULE-EXPRESS-URGENT';
    efficiencyScore = 65;
    carbonSavedGrams = 0;
  }
  // Rule 2: High batchability + Flexible urgency
  else if (urgency === 'flexible' || compatibleOrders >= 2) {
    recommendedMode = 'scheduled';
    deliveryFee = basketValue >= 500 ? 0 : 15;
    // Multi-drop batch bonus for partner
    partnerPay = Math.max(minPartnerCompensation, 26 + (compatibleOrders * 4));
    rationale = `Rule #2 (Multi-Order Corridor Pool): Found ${compatibleOrders} active compatible drops in a 1.5km radius corridor. Batching deliveries allows zero or low customer fee (₹${deliveryFee}), higher combined rider earnings (₹${partnerPay}), and a 42% reduction in fleet transit miles.`;
    ruleId = 'RULE-POOL-CORRIDOR';
    efficiencyScore = 96;
    carbonSavedGrams = 320;
  }
  // Rule 3: Long distance single drop
  else if (distanceKm > 4.5) {
    recommendedMode = 'standard';
    deliveryFee = 35;
    partnerPay = Math.max(minPartnerCompensation, 34);
    rationale = `Rule #3 (Extended Distance Guardrail): Drop point is ${distanceKm} km away. Standard balanced speed allocated with calibrated distance incentive (₹${partnerPay}) to ensure fair driver pay without running negative margin.`;
    ruleId = 'RULE-DISTANCE-CALIBRATED';
    efficiencyScore = 74;
    carbonSavedGrams = 80;
  }
  // Rule 4: Default Standard Balanced
  else {
    recommendedMode = 'standard';
    deliveryFee = 25;
    partnerPay = Math.max(minPartnerCompensation, 28);
    rationale = `Rule #4 (Hyperlocal Balanced Dispatch): Distance ${distanceKm} km within standard neighborhood cluster. Standard 30-40 min window balances customer convenience with optimal rider fulfillment.`;
    ruleId = 'RULE-STANDARD-BALANCED';
    efficiencyScore = 88;
    carbonSavedGrams = 180;
  }

  // Profitability check for this recommendation
  const retailerCommission = basketValue * 0.05;
  const pickingCost = 8;
  const otherCost = 5;
  const estPlatformRev = deliveryFee + retailerCommission;
  const estVarCosts = partnerPay + pickingCost + otherCost;
  const estCM = estPlatformRev - estVarCosts;

  return {
    recommendedMode,
    ruleId,
    rationale,
    deliveryFee,
    partnerPay,
    efficiencyScore,
    carbonSavedGrams,
    estPlatformRev: Math.round(estPlatformRev * 100) / 100,
    estVarCosts: Math.round(estVarCosts * 100) / 100,
    estCM: Math.round(estCM * 100) / 100,
    isProfitable: estCM >= 0
  };
}
