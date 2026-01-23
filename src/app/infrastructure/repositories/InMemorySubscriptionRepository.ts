// infrastructure/repositories/InMemorySubscriptionPlanRepository.ts
import { PlatformId } from '../../domain/value-objects/Platform';
import { SubscriptionPlanRepository } from '../../domain/repositories/subscriptionRepository';
import { SubscriptionPlan } from '../../domain/entities/Subscription';

export class InMemorySubscriptionPlanRepository implements SubscriptionPlanRepository {
  private plans: SubscriptionPlan[] = [];

  async save(plan: SubscriptionPlan): Promise<void> {
    this.plans.push(plan);
  }

  async findByPlatform(platformId: PlatformId): Promise<SubscriptionPlan[]> {
    return this.plans.filter((p) => p.id.value === platformId.value);
  }
}
