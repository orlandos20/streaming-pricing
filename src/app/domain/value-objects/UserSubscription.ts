import { Money } from './Money';
import { PlatformId } from './Platform';
import { SharedPeople } from './shared-people';
import { SubscriptionPlanId } from './Subscription';
import { UserId } from './User';
import { UserSubscriptionId } from '../entities/User';

export class UserSubscription {
  constructor(
    readonly subscriptionId: UserSubscriptionId,
    readonly userId: UserId,
    readonly platformId: PlatformId,
    readonly planId: SubscriptionPlanId,
    readonly price: Money,
    readonly sharedWith: SharedPeople,
  ) {}

  costPerUser(): Money {
    return this.price.divide(this.sharedWith.total());
  }
}
