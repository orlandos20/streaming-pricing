'use client';

import { useMemo, useState } from 'react';
import { Platform } from '@/app/domain/entities/Platform';
import PlatformCard from './PlatformCard';
import DashboardHeader from './dashboard-header';
import DashboardSummaryCard from './dashboard-summary-card';
import DashboardCategoryFilters from './dashboard-category-filters';
import ManagePlanModal from '@/components/ui/manage-plan-modal';

import { PlatformDTO } from '@/app/application/dto/platform-dto';
import { Country } from '../../../types';

interface DashboardProps {
  onSelectPlatform?: (platform: Platform) => void;
  platformsFromApi: Platform[];
}

const CATEGORIES = [
  'My subscriptions',
  'Platforms',
  'Music',
  'Video',
  'Cloud',
  'SaaS',
];

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

const Dashboard: React.FC<DashboardProps> = ({ platformsFromApi }) => {
  const platforms = PlatformDTO(platformsFromApi);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>();
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[1]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    SUPPORTED_COUNTRIES[0],
  );

  const filteredPlatforms = useMemo(() => {
    if (activeCategory === CATEGORIES[1]) return Object.values(platforms);
    return Object.values(platforms).filter((platform) => {
      if (activeCategory === CATEGORIES[0]) return platform.active;
      return platform.category === activeCategory;
    });

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const totalMonthly = useMemo(() => {
    return Object.values(platforms).reduce(
      (acc, { active, currentPlanTier, plans }) =>
        active ? acc + plans[currentPlanTier].price : acc,
      0,
    );
  }, [platforms]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    if (!showModal) setShowModal(true);
  };

  return (
    <div className='flex flex-col pb-32'>
      <DashboardHeader
        backgroundImage='https://picsum.photos/seed/alex/100/100'
        userName='Orlando Jimenez'
        countries={SUPPORTED_COUNTRIES}
        setSelectedCountry={setSelectedCountry}
      />

      <DashboardSummaryCard
        totalMonthly={totalMonthly}
        nextRenewalDate='March 15, 2024'
        country={selectedCountry}
      />

      <DashboardCategoryFilters
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Active Plans List */}
      <div className='px-6 mt-8 flex items-center justify-between mb-4'>
        <h3 className='text-white/80 text-[11px] font-black uppercase tracking-[0.2em]'>
          {activeCategory}
        </h3>
        <span className='text-[10px] font-bold text-white/20 uppercase tracking-widest'>
          {filteredPlatforms.length} Total
        </span>
      </div>

      <div className='px-4 flex flex-col gap-3'>
        {filteredPlatforms.map((platform) => (
          <PlatformCard
            key={String(platform.id)}
            platform={platform}
            country={selectedCountry}
            onSelectPlatform={() => handlePlatformSelect(platform)}
          />
        ))}
      </div>

      {/* Manage Plan Modal Overlay */}
      {showModal && selectedPlatform && (
        <ManagePlanModal
          platform={selectedPlatform}
          onClose={() => handleCloseModal()}
        />
      )}
    </div>
  );
};

export default Dashboard;
