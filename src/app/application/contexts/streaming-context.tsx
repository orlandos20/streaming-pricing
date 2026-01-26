// application/context/StreamingContext.tsx
'use client';

import { Platform } from '@/app/domain/entities/Platform';
import { createContext, useContext, useState } from 'react';
import { Country } from '../../../../types';
import { PlatformDTO } from '../dto/platform-dto';

// const extraCountries = [
//   {
//     countryName: 'France',
//     countryIcon: '🇫🇷',
//     countryCode: 'FR',
//     currency: 'EUR',
//     currencySymbol: '€',
//   },
//   {
//     countryName: 'Germany',
//     countryIcon: '🇩🇪',
//     countryCode: 'DE',
//     currency: 'EUR',
//     currencySymbol: '€',
//   },
//   {
//     countryName: 'Italy',
//     countryIcon: '🇮🇹',
//     countryCode: 'IT',
//     currency: 'EUR',
//     currencySymbol: '€',
//   },
//   {
//     countryName: 'United Kingdom',
//     countryIcon: '🇬🇧',
//     countryCode: 'GB',
//     currency: 'GBP',
//     currencySymbol: '£',
//   },
//   {
//     countryName: 'Japan',
//     countryIcon: '🇯🇵',
//     countryCode: 'JP',
//     currency: 'JPY',
//     currencySymbol: '¥',
//   },
//   {
//     countryName: 'Mexico',
//     countryIcon: '🇲🇽',
//     countryCode: 'MX',
//     currency: 'MXN',
//     currencySymbol: '$',
//   },
//   {
//     countryName: 'Brazil',
//     countryIcon: '🇧🇷',
//     countryCode: 'BR',
//     currency: 'BRL',
//     currencySymbol: 'R$',
//   },
//   {
//     countryName: 'Australia',
//     countryIcon: '🇦🇺',
//     countryCode: 'AU',
//     currency: 'AUD',
//     currencySymbol: 'A$',
//   },
// ];

const SUPPORTED_COUNTRIES = [
  {
    countryName: 'Spain',
    countryIcon: '🇪🇸',
    countryCode: 'ES',
    currency: 'EUR',
    currencySymbol: '€',
  },
  {
    countryName: 'United States',
    countryIcon: '🇺🇸',
    countryCode: 'US',
    currency: 'USD',
    currencySymbol: '$',
  },
];

const CATEGORIES = [
  'My subscriptions',
  'Platforms',
  'Music',
  'Video',
  'Cloud',
  'SaaS',
];

interface StreamingState {
  platforms: Platform[];
  selected: Platform | undefined;
  supportedCountries: Country[];
  categories: string[];
  country: Country;
}

interface StreamingContext {
  state: StreamingState;
  setState: React.Dispatch<React.SetStateAction<StreamingState>>;
}

const StreamingContext = createContext<StreamingContext | null>(null);

export function StreamingProvider({
  platforms,
  children,
}: {
  platforms: Platform[];
  children: React.ReactNode;
}) {
  const [state, setState] = useState<StreamingState>({
    platforms: PlatformDTO(platforms),
    selected: undefined,
    supportedCountries: SUPPORTED_COUNTRIES || [],
    categories: CATEGORIES,
    country: {
      countryName: 'Spain',
      countryIcon: '🇪🇸',
      countryCode: 'ES',
      currency: 'EUR',
      currencySymbol: '€',
    },
  });

  return (
    <StreamingContext.Provider value={{ state, setState }}>
      {children}
    </StreamingContext.Provider>
  );
}

export function useStreaming() {
  const context = useContext(StreamingContext);
  if (!context) {
    throw new Error('useStreaming must be used within a StreamingProvider');
  }
  return context;
}
