export interface Subscription {
  id: string;
  name: string;
  price: number;
  renewalDate: string;
  daysLeft: number;
  category: 'Music' | 'Video' | 'SaaS' | 'Cloud' | 'Other';
  iconType: 'letter' | 'symbol';
  iconValue: string;
  color: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  billingCycle: string;
  colorClass: string;
  glowClass: string;
  accentColor: string;
}

export type Screen = 'home' | 'analytics' | 'calendar' | 'profile';

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

export enum PlanTier {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export interface PlanDetails {
  tier: PlanTier;
  price: number;
  resolution: string;
  screens: number;
  color: string;
  glowClass: string;
}

export const PLAN_DATA: Record<PlanTier, PlanDetails> = {
  [PlanTier.BASIC]: {
    tier: PlanTier.BASIC,
    price: 9.99,
    resolution: '720p',
    screens: 1,
    color: 'emerald-accent',
    glowClass: 'neon-emerald-glow',
  },
  [PlanTier.STANDARD]: {
    tier: PlanTier.STANDARD,
    price: 15.49,
    resolution: '1080p',
    screens: 2,
    color: 'primary',
    glowClass: 'neon-blue-glow',
  },
  [PlanTier.PREMIUM]: {
    tier: PlanTier.PREMIUM,
    price: 22.99,
    resolution: '4K + HDR',
    screens: 4,
    color: 'amber-accent',
    glowClass: 'neon-amber-glow',
  },
};

export interface Country {
  countryName: string;
  countryIcon: string;
  countryCode?: string;
  currency?: string;
  currencySymbol?: string;
}
