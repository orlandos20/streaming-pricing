// domain/repositories/SubscriptionPlanRepository.ts
import { PlatformId } from '../value-objects/Platform';
import { SubscriptionPlan } from '../entities/Subscription';

export interface SubscriptionPlanRepository {
  save(plan: SubscriptionPlan): Promise<void>;
  findByPlatform(platformId: PlatformId): Promise<SubscriptionPlan[]>;
}
