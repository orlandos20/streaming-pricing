'use client';
import React, { createContext, useContext, useState } from 'react';
import { User, UserSubscriptionId } from '@/app/domain/entities/User';
import { Country, Currency } from '@/app/domain/entities/Country';
import { PlatformId } from '@/app/domain/value-objects/Platform';
import { SubscriptionPlanId } from '@/app/domain/value-objects/Subscription';
import { Money } from '@/app/domain/value-objects/Money';
import { SharedPeople } from '@/app/domain/value-objects/shared-people';
import { UserId, UserName } from '@/app/domain/value-objects/User';

interface UserState {
  id: UserId;
  name: UserName;
  country: Country;
  currency: Currency;
  userSubscriptions: {
    subscriptionId: UserSubscriptionId;
    userId: UserId;
    platformId: PlatformId;
    planId: SubscriptionPlanId;
    price: Money;
    sharedWith: SharedPeople;
  }[];
}

interface UserContext {
  state: UserState;
  setState: React.Dispatch<React.SetStateAction<UserState>>;
}

const UserContext = createContext<UserContext | null>(null);

export function UserProvider({
  user: userFromApi,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  children: React.ReactNode;
}) {
  console.log('userFromApi --> ', userFromApi);

  const { id, name, country, currency } = userFromApi;

  const [state, setState] = useState<UserState>(
    new User(
      id,
      name,
      country,
      currency,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (userFromApi as any).userSubscriptions,
    ) as unknown as UserState,
  );

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
