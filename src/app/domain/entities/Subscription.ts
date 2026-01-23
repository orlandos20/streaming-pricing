// domain/entities/SubscriptionPlan.ts
import {
  SubscriptionPlanId,
  PlanName,
  MaxParticipants,
} from '../value-objects/Subscription';

export class SubscriptionPlan {
  constructor(
    readonly id: SubscriptionPlanId,
    readonly price: number,
    private planName: PlanName['value'],
    private maxParticipants: MaxParticipants,
    readonly color: string,
    readonly glowClass: string,
    readonly subscriptionColor: string,
    readonly subscriptionGlowClass: string,
    readonly resolution: string,
  ) {}

  getName(): PlanName['value'] {
    return this.planName;
  }

  getMaxParticipants(): MaxParticipants {
    return this.maxParticipants;
  }

  rename(newName: PlanName['value']) {
    this.planName = newName;
  }

  changeMaxParticipants(newValue: MaxParticipants) {
    this.maxParticipants = newValue;
  }
}

export class AudioSubscriptionPlan extends SubscriptionPlan {
  constructor(
    id: SubscriptionPlanId,
    planTier: string,
    price: number,
    planName: PlanName['value'],
    maxParticipants: MaxParticipants,
    resolution: string,
    color: string,
    glowClass: string,
    subscriptionColor: string,
    subscriptionGlowClass: string,
  ) {
    super(
      id,
      price,
      planName,
      maxParticipants,
      resolution,
      color,
      glowClass,
      subscriptionColor,
      subscriptionGlowClass,
    );
  }
}

export class VideoSubscriptionPlan extends SubscriptionPlan {
  constructor(
    id: SubscriptionPlanId,
    price: number,
    planName: PlanName['value'],
    maxParticipants: MaxParticipants,
    color: string,
    glowClass: string,
    subscriptionColor: string,
    subscriptionGlowClass: string,
    readonly screensAllowed: number,
    readonly resolution: string,
  ) {
    super(
      id,
      price,
      planName,
      maxParticipants,
      resolution,
      color,
      glowClass,
      subscriptionColor,
      subscriptionGlowClass,
    );
  }

  getResolution(): string {
    return this.resolution;
  }

  getSubscriptionColor(): string {
    return this.subscriptionColor;
  }

  getSubscriptionGlowClass(): string {
    return this.subscriptionGlowClass;
  }
}

export type PossibleSubscriptionPlans =
  | VideoSubscriptionPlan
  | AudioSubscriptionPlan;

// Or use conditional types to extract specific types:
export type ExtractVideoPlans = Extract<
  PossibleSubscriptionPlans,
  VideoSubscriptionPlan
>;
export type ExtractAudioPlans = Extract<
  PossibleSubscriptionPlans,
  AudioSubscriptionPlan
>;
