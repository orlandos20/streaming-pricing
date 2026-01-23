'use client';

import { useState } from 'react';
import { BillingCycle } from '../../../types';
import React from 'react';
import {
  PossibleSubscriptionPlans,
  VideoSubscriptionPlan,
} from '@/app/domain/entities/Subscription';
import {
  isVideoSubscriptionPlan,
  // isAudioSubscriptionPlan,
  // validatePlanTypeForCategory,
} from '@/app/domain/helpers/getSubscriptionPlanByCategory';
import { PlanProperties } from './PlanProperties';
import { Categories } from '@/app/domain/entities/Platform';

interface PlanOptionProps {
  category: Categories;
  plan: PossibleSubscriptionPlans;
  isSelected: boolean;
  onSelect: (planName: string) => void;
  children?: React.ReactNode;
}

export function PlanOption({
  category,
  plan,
  isSelected,
  onSelect,
}: PlanOptionProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    BillingCycle.MONTHLY,
  );
  const [sharingCount, setSharingCount] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const isVideo = isVideoSubscriptionPlan(plan);

  const planData = new VideoSubscriptionPlan(
    plan.id,
    plan.price,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    (plan as any).planName,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    (plan as any).maxParticipants,
    plan.color,
    plan.glowClass,
    plan.subscriptionColor,
    plan.subscriptionGlowClass,
    isVideo ? plan.screensAllowed : 0,
    isVideo ? plan.resolution : 'N/A',
  );

  const colorClass = plan.color;
  const borderColor = `${plan.glowClass} shadow-[0_0_25px_rgba(59,130,246,0.3)]`;

  const planSelection = () => {
    setIsExpanded(!isExpanded);
    if (!isSelected) onSelect(planData.getName());
  };

  if (isSelected && isExpanded) {
    return (
      <div
        onClick={planSelection}
        className={`bg-white/5 border-2 ${plan.glowClass} ${plan.glowClass} rounded-[28px] p-4 flex flex-col gap-4 transition-all backdrop-blur-3xl relative animate-in fade-in zoom-in-95 duration-300`}
      >
        <div className='flex items-center justify-between'>
          <div className='flex flex-col text-left'>
            <span className='text-white font-bold text-base'>
              {planData.getName().charAt(0) +
                planData.getName().slice(1).toLowerCase()}
            </span>
            <span className='text-white/80 text-[10px]'>
              {plan.resolution} • {Number(planData.getMaxParticipants())} Users
            </span>
          </div>
          <div className='text-right flex items-center gap-3'>
            <div>
              <span className='text-white font-black text-lg'>
                ${plan.price}
              </span>
              <span className='text-white/70 text-[9px] block uppercase font-semibold'>
                / month
              </span>
            </div>
            <div
              className={`flex rounded-full p-1 shadow-lg shadow/40 bg-${colorClass}/60`}
            >
              <span className='material-symbols-outlined text-white text-[12px] font-bold'>
                check
              </span>
            </div>
          </div>
        </div>
        <div className='pt-3 border-t border-white/10 space-y-4'>
          {/* {children} */}
          <div className='flex flex-col gap-2'>
            <label className='text-white/70 text-[10px] font-medium uppercase tracking-wider'>
              How many people sharing?
            </label>
            <div className='flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-1 px-2'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSharingCount((prev) => Math.max(1, prev - 1));
                }}
                className='z-10 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 active:scale-90 transition-transform'
              >
                <span className='material-symbols-outlined text-sm'>
                  remove
                </span>
              </button>
              <span className='text-white font-bold'>{sharingCount}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSharingCount((prev) => Math.min(5, prev + 1));
                }}
                className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 active:scale-90 transition-transform'
              >
                <span className='material-symbols-outlined text-sm'>add</span>
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-white/70 text-[10px] font-medium uppercase tracking-wider'>
              Billing Cycle
            </label>
            <div className='flex bg-white/5 border border-white/10 rounded-xl p-1 relative'>
              <div
                className={`absolute inset-1 w-[calc(50%-4px)] bg-primary/40 border border-white/20 rounded-lg shadow-inner-glow transition-all duration-300 transform ${
                  billingCycle === BillingCycle.ANNUAL
                    ? 'translate-x-[calc(100%+4px)]'
                    : 'translate-x-0'
                }`}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBillingCycle(BillingCycle.MONTHLY);
                }}
                className={`z-50 flex-1 py-1.5 text-[11px] font-bold relative transition-colors ${
                  billingCycle === BillingCycle.MONTHLY
                    ? 'text-white'
                    : 'text-white/40'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBillingCycle(BillingCycle.ANNUAL);
                }}
                className={`z-50 flex-1 py-1.5 text-[11px] font-bold relative transition-colors ${
                  billingCycle === BillingCycle.ANNUAL
                    ? 'text-white'
                    : 'text-white/40'
                }`}
              >
                Annual
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={planSelection}
      className={`z-10 bg-white/5 border ${borderColor} backdrop-blur-2xl rounded-2xl p-4 ${!isExpanded ? 'pb-0' : 'pb-4'} flex flex-col group cursor-pointer hover:bg-white/10 transition-all active:scale-[0.99]`}
    >
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col text-left'>
          <span className={`${colorClass} font-semibold text-sm`}>
            {planData.getName().charAt(0) +
              planData.getName().slice(1).toLowerCase()}
          </span>
          <PlanProperties
            category={category}
            plan={plan}
            maxParticipants={Number(planData.getMaxParticipants())}
          />
        </div>
        <div className='text-right'>
          <span className={`${colorClass} font-bold text-sm`}>
            ${plan.price}
          </span>
          <span className='text-white/40 text-[9px] block'>/mo</span>
        </div>
      </div>

      {/* Expand Indicator */}
      {(!isSelected || (isSelected && !isExpanded)) && (
        <div className='flex justify-center w-full animate-bounce opacity-30 group-hover:opacity-70 transition-opacity'>
          <span className={`material-symbols-outlined text-${colorClass}`}>
            keyboard_arrow_down
          </span>
        </div>
      )}
    </div>
  );
}
