export interface Reward {
  category: string;
  value: string; // Flexible: "5%", "4 lounges/quarter", "₹500", "10X points", etc.
  description?: string;
  type: 'cashback' | 'lounge' | 'fuel_waiver' | 'points' | 'milestone' | 'other';
}

export interface CreditCard {
  id: string;
  name: string;
  color: string; // For card visual styling
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  rewards: Reward[];
  addedDate?: Date;
}
