import { UserFromApi } from '@/app/domain/entities/User';
import { UserRepository } from '@/app/domain/repositories/user/UserRepository';
import { UserId } from '@/app/domain/value-objects/User';
import { UserSubscription } from '@/app/domain/value-objects/UserSubscription';

export class UserApiRepository implements UserRepository {
  async saveSubscription(subscription: UserSubscription): Promise<void> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MOCK_URL}/user/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      },
    );

    if (!res.ok) {
      throw new Error('Failed to save subscription');
    }
  }

  async findSubscriptionsById(userId: UserId): Promise<UserSubscription[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MOCK_URL}/user/${userId.Id}/subscriptions`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch subscriptions');
    }

    const data = await res.json();
    return data;
  }

  async deleteSubscription(subscriptionId: string): Promise<void> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MOCK_URL}/user/subscriptions/${subscriptionId}`,
      {
        method: 'DELETE',
      },
    );

    if (!res.ok) {
      throw new Error('Failed to delete subscription');
    }
  }

  async findSubscriptionById(
    subscriptionId: string,
  ): Promise<UserSubscription | null> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MOCK_URL}/user/subscriptions/${subscriptionId}`,
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  }

  async findById(userId: UserId): Promise<UserFromApi | null> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MOCK_URL}/user/${userId.Id}`,
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    // TODO: Map DTO to domain User entity
    return data;
  }
}
