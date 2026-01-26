import { Country, Currency } from '@/app/domain/entities/Country';
import { UserId, UserName } from '../value-objects/User';
import { UserSubscription } from '../value-objects/UserSubscription';

export type UserSubscriptionId = string;

export interface UserFromApi {
  id: string;
  name: string;
  country: Country;
  currency: Currency;
  userSubscriptions: UserSubscription[];
}

export class User {
  constructor(
    readonly id: UserId,
    readonly name: UserName,
    readonly country: Country,
    readonly currency: Currency,
    private userSubscriptions: UserSubscription[],
  ) {}

  get Subscriptions() {
    return this.userSubscriptions;
  }

  set UpdateSubscriptions(subscription: UserSubscription) {
    this.userSubscriptions = [...this.userSubscriptions, subscription];
  }
}
