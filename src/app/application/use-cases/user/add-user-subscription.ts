import { UserSubscription } from '@/app/domain/value-objects/UserSubscription';
import { Money } from '@/app/domain/value-objects/Money';
import { PlatformId } from '@/app/domain/value-objects/Platform';
import { SharedPeople } from '@/app/domain/value-objects/shared-people';
import { SubscriptionPlanId } from '@/app/domain/value-objects/Subscription';
import { UserId } from '@/app/domain/value-objects/User';
import { UserRepository } from '@/app/domain/repositories/user/UserRepository';
import { randomUUID } from 'crypto';

function generateId(): string {
  return randomUUID();
}

export class AddUserSubscription {
  constructor(private repository: UserRepository) {}

  execute(input: {
    userId: string;
    platformId: PlatformId;
    planId: SubscriptionPlanId;
    price: Money;
    sharedWith: number;
  }) {
    const newUserSubscription = new UserSubscription(
      generateId(),
      new UserId(input.userId),
      input.platformId,
      input.planId,
      input.price,
      new SharedPeople(input.sharedWith),
    );

    return this.repository.saveSubscription(newUserSubscription);
  }
}
