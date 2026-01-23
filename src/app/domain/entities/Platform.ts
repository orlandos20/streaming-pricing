// domain/entities/Platform.ts
import { PlatformId, PlatformName } from '../value-objects/Platform';
import {
  PossibleSubscriptionPlans,
  VideoSubscriptionPlan,
} from './Subscription';

export class Platform {
  constructor(
    readonly id: PlatformId,
    private name: PlatformName['value'],
    readonly active: boolean,
    readonly category: Categories,
    readonly billingCycleOptions: string[],
    readonly billingCycle: 'MONTHLY' | 'ANNUAL',
    readonly currentPlanTier: string,
    readonly renewalDate: string,
    readonly daysLeft: number,
    readonly iconType: string,
    readonly iconValue: string,
    readonly color: string,
    readonly plans: Record<string, PossibleSubscriptionPlans>,
    readonly glowClass?: string,
  ) {}

  getId(): string {
    return this.id.value;
  }

  getName(): PlatformName['value'] {
    return this.name;
  }

  rename(newName: PlatformName['value']) {
    this.name = newName;
  }
}

export class VideoPlatform extends Platform {
  constructor(
    id: PlatformId,
    name: PlatformName['value'],
    active: boolean,
    category: Categories,
    billingCycleOptions: Array<string>,
    billingCycle: 'MONTHLY' | 'ANNUAL',
    renewalDate: string,
    daysLeft: number,
    currentPlanTier: string,
    iconType: string,
    iconValue: string,
    color: string,
    readonly plans: Record<string, VideoSubscriptionPlan>,
    glowClass?: string,
  ) {
    super(
      id,
      name,
      active,
      category,
      billingCycleOptions,
      billingCycle,
      renewalDate,
      daysLeft,
      currentPlanTier,
      iconType,
      iconValue,
      color,
      plans,
      glowClass,
    );
  }
}

export type Categories = 'Music' | 'Video' | 'SaaS' | 'Cloud' | 'Other';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  renewalDate: string;
  daysLeft: number;
  category: Categories;
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
