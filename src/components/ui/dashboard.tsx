'use client';

import { useMemo, useState } from 'react';
import { Platform } from '@/app/domain/entities/Platform';
import PlatformCard from './PlatformCard';
import DashboardSummaryCard from './dashboard-summary-card';
import DashboardCategoryFilters from './dashboard-category-filters';
import ManagePlanModal from '@/components/ui/manage-plan-modal';

import { useStreaming } from '@/app/application/contexts/streaming-context';
import { buildPlatform } from '@/lib/platforms';
import { useUser } from '@/app/application/contexts/user-context';

const Dashboard = () => {
  const {
    state: { platforms, country: selectedCountry, categories },
    setState,
  } = useStreaming();

  const {
    state: { country: userCountry },
  } = useUser();

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>();
  const [activeCategory, setActiveCategory] = useState<string>(categories[1]);
  const [showModal, setShowModal] = useState(false);

  const filteredPlatforms = useMemo(() => {
    if (activeCategory === categories[1]) return platforms;
    return platforms.filter((platform) => {
      if (activeCategory === categories[0]) return platform.active;
      return platform.category === activeCategory;
    });
  }, [activeCategory, platforms, categories]);

  const totalMonthly = useMemo(() => {
    return platforms.reduce(
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

  const handleDeactivatePlatform = (selectedPlatform: Platform) => {
    // Logic to deactivate the platform
    const newPlatforms = platforms.map((currentPlatform) => {
      if (currentPlatform.id === selectedPlatform.id) {
        return buildPlatform({ ...currentPlatform, active: false } as Platform);
      }
      return currentPlatform;
    });

    setState((prevState) => ({
      ...prevState,
      platforms: newPlatforms,
    }));

    handleCloseModal();
  };

  const handleSetPlatformAsActive = (
    selectedPlatform: Platform,
    selectedPlanTier: string,
  ) => {
    // Logic to set the platform as active
    const newPlatforms = platforms.map((currentPlatform) => {
      if (currentPlatform.id === selectedPlatform.id) {
        return buildPlatform({
          ...currentPlatform,
          active: true,
          currentPlanTier: selectedPlanTier,
        } as Platform);
      }

      return currentPlatform;
    });

    setState((prevState) => ({
      ...prevState,
      platforms: newPlatforms,
    }));

    // Close the modal after setting the platform as active
    handleCloseModal();
  };

  return (
    <div className='flex flex-col pb-32'>
      <DashboardSummaryCard
        totalMonthly={totalMonthly}
        nextRenewalDate='March 15, 2024'
        country={userCountry}
      />

      <DashboardCategoryFilters
        categories={categories}
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
            key={platform.getId()}
            platform={platform}
            country={selectedCountry}
            onSelectPlatform={() => handlePlatformSelect(platform)}
          />
        ))}
      </div>

      {/* Manage Plan Modal Overlay */}
      {showModal && selectedPlatform && (
        <ManagePlanModal
          handleSetPlatformAsActive={handleSetPlatformAsActive}
          handleDeactivatePlatform={handleDeactivatePlatform}
          platform={selectedPlatform}
          onClose={() => handleCloseModal()}
        />
      )}
    </div>
  );
};

export default Dashboard;
