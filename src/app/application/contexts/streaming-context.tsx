// application/context/StreamingContext.tsx
'use client';

import { Platform } from '@/app/domain/entities/Platform';
import { createContext, useContext, useState } from 'react';
import { Country } from '@/app/domain/entities/Country';
import { PlatformDTO } from '../dto/platform-dto';

// const extraCountries = [
//   {
//     countryName: 'France',
//     countryIcon: '🇫🇷',
//     countryCode: 'FR',
//     currency: {
//       code: 'EUR',
//       symbol: '€',
//       icon: '🇫🇷',
//       name: 'Euro',
//     },
//   },
//   {
//     countryName: 'Germany',
//     countryIcon: '🇩🇪',
//     countryCode: 'DE',
//     currency: {
//       code: 'EUR',
//       symbol: '€',
//       icon: '🇩🇪',
//       name: 'Euro',
//     },
//   },
//   {
//     countryName: 'Italy',
//     countryIcon: '🇮🇹',
//     countryCode: 'IT',
//     currency: {
//       code: 'EUR',
//       symbol: '€',
//       icon: '🇮🇹',
//       name: 'Euro',
//     },
//   },
//   {
//     countryName: 'United Kingdom',
//     countryIcon: '🇬🇧',
//     countryCode: 'GB',
//     currency: {
//       code: 'GBP',
//       symbol: '£',
//       icon: '🇬🇧',
//       name: 'British Pound',
//     },
//   },
//   {
//     countryName: 'Japan',
//     countryIcon: '🇯🇵',
//     countryCode: 'JP',
//     currency: {
//       code: 'JPY',
//       symbol: '¥',
//       icon: '🇯🇵',
//       name: 'Japanese Yen',
//     },
//   },
//   {
//     countryName: 'Mexico',
//     countryIcon: '🇲🇽',
//     countryCode: 'MX',
//     currency: {
//       code: 'MXN',
//       symbol: '$',
//       icon: '🇲🇽',
//       name: 'Mexican Peso',
//     },
//   },
//   {
//     countryName: 'Brazil',
//     countryIcon: '🇧🇷',
//     countryCode: 'BR',
//     currency: {
//       code: 'BRL',
//       symbol: 'R$',
//       icon: '🇧🇷',
//       name: 'Brazilian Real',
//     },
//   },
//   {
//     countryName: 'Australia',
//     countryIcon: '🇦🇺',
//     countryCode: 'AU',
//     currency: {
//       code: 'AUD',
//       symbol: 'A$',
//       icon: '🇦🇺',
//       name: 'Australian Dollar',
//     },
//   },
// ];

export const SUPPORTED_COUNTRIES = [
  {
    countryName: 'Spain',
    countryIcon: '🇪🇸',
    countryCode: 'ES',
    currency: {
      code: 'EUR',
      symbol: '€',
      icon: '🇪🇸',
      name: 'Euro',
    },
  },
  {
    countryName: 'United States',
    countryIcon: '🇺🇸',
    countryCode: 'US',
    currency: {
      code: 'USD',
      symbol: '$',
      icon: '🇺🇸',
      name: 'US Dollar',
    },
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
      currency: {
        code: 'EUR',
        symbol: '€',
        icon: '🇪🇸',
        name: 'Euro',
      },
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
