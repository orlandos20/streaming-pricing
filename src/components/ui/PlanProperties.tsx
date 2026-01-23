import { PossibleSubscriptionPlans } from '@/app/domain/entities/Subscription';
import { Categories } from '@/app/domain/entities/Platform';

interface PlanPropertiesProps {
  category: Categories;
  plan: PossibleSubscriptionPlans;
  maxParticipants: number;
}

export function PlanProperties({
  category,
  plan,
  maxParticipants,
}: PlanPropertiesProps) {
  switch (category) {
    case 'Video':
      return (
        <span className='text-white/50 text-[10px]'>
          {plan.resolution} • {maxParticipants} Screen
          {maxParticipants > 1 ? 's' : ''}
        </span>
      );

    case 'Music':
      return (
        <span className='text-white/50 text-[10px]'>
          {plan.resolution} • {maxParticipants} User
          {maxParticipants > 1 ? 's' : ''}
        </span>
      );

    case 'Cloud':
    case 'SaaS':
      return (
        <span className='text-white/50 text-[10px]'>
          {plan.resolution} • {maxParticipants} Device
          {maxParticipants > 1 ? 's' : ''}
        </span>
      );

    default:
      return (
        <span className='text-white/50 text-[10px]'>
          {plan.resolution} • {maxParticipants} Slot
          {maxParticipants > 1 ? 's' : ''}
        </span>
      );
  }
}
