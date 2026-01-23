import {
  VideoSubscriptionPlan,
  AudioSubscriptionPlan,
  PossibleSubscriptionPlans,
} from '../entities/Subscription';

export function isVideoSubscriptionPlan(
  plan: PossibleSubscriptionPlans,
): plan is VideoSubscriptionPlan {
  return 'screensAllowed' in plan && 'resolution' in plan;
}

export function isAudioSubscriptionPlan(
  plan: PossibleSubscriptionPlans,
): plan is AudioSubscriptionPlan {
  return !('screensAllowed' in plan);
}

export function validatePlanTypeForCategory(
  plan: PossibleSubscriptionPlans,
  category: string,
): boolean {
  switch (category) {
    case 'Video':
      return isVideoSubscriptionPlan(plan);
    case 'Music':
      return isAudioSubscriptionPlan(plan);
    default:
      return false;
  }
}
