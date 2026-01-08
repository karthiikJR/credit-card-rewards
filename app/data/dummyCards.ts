import { CreditCard } from '../types/card';

export const dummyCards: CreditCard[] = [
  {
    id: '1',
    name: 'IDFC Millenia',
    color: '#FF6B9D',
    network: 'Visa',
    rewards: [
      {
        category: 'Fuel',
        value: '1%',
        description: 'Fuel surcharge waiver',
        type: 'fuel_waiver'
      },
      {
        category: 'Amazon',
        value: '2%',
        description: 'Cashback on Amazon purchases',
        type: 'cashback'
      },
      {
        category: 'Lounge Access',
        value: '4 visits/quarter',
        description: 'Domestic airport lounge access',
        type: 'lounge'
      },
      {
        category: 'Flight Booking',
        value: '3%',
        description: 'Cashback on flight bookings',
        type: 'cashback'
      }
    ]
  },
  {
    id: '2',
    name: 'HDFC Regalia',
    color: '#8B5CF6',
    network: 'Mastercard',
    rewards: [
      {
        category: 'Fuel',
        value: '0.5%',
        description: 'Fuel surcharge waiver',
        type: 'fuel_waiver'
      },
      {
        category: 'Dining',
        value: '10X',
        description: 'Reward points on dining',
        type: 'points'
      },
      {
        category: 'Lounge Access',
        value: '6 visits/quarter',
        description: 'International airport lounge access',
        type: 'lounge'
      },
      {
        category: 'Groceries',
        value: '2%',
        description: 'Cashback on grocery shopping',
        type: 'cashback'
      }
    ]
  },
  {
    id: '3',
    name: 'Amazon Pay ICICI',
    color: '#F59E0B',
    network: 'Visa',
    rewards: [
      {
        category: 'Amazon',
        value: '3%',
        description: 'Unlimited cashback on Amazon',
        type: 'cashback'
      },
      {
        category: 'Amazon Prime',
        value: '5%',
        description: 'Cashback for Prime members',
        type: 'cashback'
      },
      {
        category: 'Bill Payments',
        value: '2%',
        description: 'Cashback on bill payments',
        type: 'cashback'
      },
      {
        category: 'Fuel',
        value: '0%',
        description: 'No fuel benefits',
        type: 'fuel_waiver'
      }
    ]
  },
  {
    id: '4',
    name: 'Axis Magnus',
    color: '#10B981',
    network: 'RuPay',
    rewards: [
      {
        category: 'Travel',
        value: '12X',
        description: 'Accelerated reward points',
        type: 'points'
      },
      {
        category: 'Milestone',
        value: '25,000 points',
        description: 'On spending ₹10L annually',
        type: 'milestone'
      },
      {
        category: 'Lounge Access',
        value: 'Unlimited',
        description: 'Domestic & international lounges',
        type: 'lounge'
      },
      {
        category: 'Golf',
        value: '8 rounds/year',
        description: 'Complimentary golf rounds',
        type: 'other'
      },
      {
        category: 'Fuel',
        value: '1%',
        description: 'Fuel surcharge waiver',
        type: 'fuel_waiver'
      }
    ]
  },
  {
    id: '5',
    name: 'SBI Cashback',
    color: '#EF4444',
    network: 'Visa',
    rewards: [
      {
        category: 'Online Shopping',
        value: '5%',
        description: 'Cashback on all online spends',
        type: 'cashback'
      },
      {
        category: 'Offline Shopping',
        value: '1%',
        description: 'Cashback on offline purchases',
        type: 'cashback'
      },
      {
        category: 'Amazon',
        value: '5%',
        description: 'Cashback on Amazon',
        type: 'cashback'
      },
      {
        category: 'Fuel',
        value: '1%',
        description: 'Fuel surcharge waiver',
        type: 'fuel_waiver'
      }
    ]
  }
];
