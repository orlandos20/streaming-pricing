'use client';

import { useState } from 'react';
import {} from // Subscription,
// PLAN_DATA,
// PlanTier,
// BillingCycle,
'../../../types';
import { PlanOption } from '../ui/plan-option';
import ActiveBadge from './ActiveBadge';
import { Platform } from '@/app/domain/entities/Platform';
import { SubscriptionPlan } from '@/app/domain/entities/Subscription';

interface ManagePlanModalProps {
  platform: Platform;
  handleSetPlatformAsActive: (
    platform: Platform,
    selectedPlanTier: string,
  ) => void;
  handleDeactivatePlatform: (platform: Platform) => void;
  onClose: () => void;
}

const ManagePlanModal: React.FC<ManagePlanModalProps> = ({
  platform,
  handleSetPlatformAsActive,
  handleDeactivatePlatform,
  onClose,
}) => {
  const [selectedPlanTier, setSelectedPlanTier] = useState<string>(
    platform.currentPlanTier,
  );

  // const [isAiLoading, setIsAiLoading] = useState(false);
  // const [aiMessage, setAiMessage] = useState<string | null>(null);

  const buildPlan = (plan: SubscriptionPlan) =>
    new SubscriptionPlan(
      plan.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (plan as any).price,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (plan as any).planName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (plan as any).maxParticipants,
      plan.color,
      plan.glowClass,
      plan.subscriptionColor,
      plan.subscriptionGlowClass,
      plan.resolution,
    );

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center xs:p-6 animate-in fade-in duration-300'>
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-xl'
        onClick={onClose}
      ></div>

      <button
        onClick={onClose}
        className='absolute top-12 right-6 w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80 backdrop-blur-md active:scale-90 transition-transform z-110'
      >
        <span className='material-symbols-outlined text-xl'>close</span>
      </button>

      <div className='glass-morphism w-full max-w-92.5 rounded-[3rem] p-8 flex flex-col items-center gap-6 shadow-2xl relative z-110 animate-in zoom-in-95 duration-300 ease-out'>
        {/* Service Icon */}
        <div className='flex flex-col items-center xs:gap-4 md:gap-1'>
          <div
            className={`${platform.color} w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10 xs:text-4xl font-black text-white`}
          >
            {platform.iconType === 'letter' ? (
              platform.iconValue
            ) : (
              <span className='material-symbols-outlined text-5xl'>
                {platform.iconValue}
              </span>
            )}
          </div>
          <div className='text-center'>
            <h2 className='text-white text-2xl font-bold tracking-tight'>
              Manage Plan
            </h2>
            <p className='text-white/50 text-sm xs:mt-1 md:mt-0.5'>
              Select your streaming experience
            </p>
          </div>
        </div>

        {/* Plans Selection */}
        <div className='w-full space-y-3'>
          {Object.values(platform.plans).map((plan) => {
            const planData = buildPlan(plan);
            const isSelected = String(planData.getName()) === selectedPlanTier;

            return (
              <div className='relative' key={String(planData.getName())}>
                <PlanOption
                  category={platform.category}
                  plan={plan}
                  isSelected={isSelected}
                  onSelect={setSelectedPlanTier}
                ></PlanOption>
                <ActiveBadge show={isSelected} />
              </div>
            );
          })}
        </div>

        {/* Confirm Button */}
        <div className='w-full mt-2 space-y-3'>
          {!platform.active ? (
            <button
              className='w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all border border-white/20'
              onClick={() =>
                handleSetPlatformAsActive(platform, selectedPlanTier)
              }
            >
              Lo tengo
            </button>
          ) : (
            <button
              className='w-full py-4 rounded-2xl bg-linear-to-r from-red-600 via-rose-600 to-pink-600 text-white font-bold text-lg shadow-xl shadow-red-500/20 active:scale-[0.98] transition-all border border-white/20'
              onClick={() => handleDeactivatePlatform(platform)}
            >
              Ya no lo tengo
            </button>
          )}
          <p className='text-white/30 text-[9px] text-center mt-6 px-6 uppercase tracking-[0.2em] leading-relaxed font-bold'>
            Changes apply from the next billing cycle on March 15
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagePlanModal;
