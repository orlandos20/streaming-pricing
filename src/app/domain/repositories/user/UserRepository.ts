import { UserId } from '@/app/domain/value-objects/User';
import { UserSubscription } from '@/app/domain/value-objects/UserSubscription';
import { UserFromApi } from '@/app/domain/entities/User';

export interface UserRepository {
  saveSubscription(subscription: UserSubscription): Promise<void>;
  findSubscriptionsById(userId: UserId): Promise<UserSubscription[]>;
  deleteSubscription(subscriptionId: string): Promise<void>;
  findSubscriptionById(
    subscriptionId: string,
  ): Promise<UserSubscription | null>;
  findById(userId: UserId): Promise<UserFromApi | null>;
}
