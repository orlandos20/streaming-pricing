import { Platform } from '@/app/domain/entities/Platform';
import ActiveBadge from './ActiveBadge';
import { Country } from '../../../types';

interface PlatformCardProps {
  platform?: Platform;
  onSelectPlatform?: (id: string) => void;
  isLoading?: boolean;
  country?: Country;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  onSelectPlatform,
  isLoading = false,
  country,
}) => {
  if (isLoading) {
    return (
      <div className='relative glass-morphism group flex items-center p-4 rounded-3xl transition-all'>
        <div className='size-14 rounded-2xl flex items-center justify-center relative shadow-inner border border-white/5 bg-white/5 animate-pulse'></div>
        <div className='ml-4 flex-1'>
          <div className='h-5 bg-white/10 rounded animate-pulse mb-2 w-24'></div>
          <div className='h-4 bg-white/10 rounded animate-pulse w-32'></div>
        </div>
        <div className='bg-white/5 h-9 w-9 rounded-full flex items-center justify-center border border-white/10 animate-pulse'></div>
      </div>
    );
  }

  return (
    <div
      key={String(platform?.id)}
      onClick={() => onSelectPlatform?.(String(platform?.id))}
      className='relative glass-morphism group flex items-center p-4 rounded-3xl transition-all active:scale-[0.98] cursor-pointer hover:bg-white/8'
    >
      <div
        className={`size-14 rounded-2xl flex items-center justify-center relative shadow-inner border border-white/5 ${platform?.color}/20`}
      >
        {platform?.iconType === 'letter' ? (
          <span
            className={`text-xl font-black ${platform?.color.replace(
              'bg-',
              'text-',
            )}`}
          >
            {platform?.iconValue}
          </span>
        ) : (
          <span
            className={`material-symbols-outlined text-3xl font-light ${platform?.color.replace(
              'bg-',
              'text-',
            )}`}
          >
            {platform?.iconValue}
          </span>
        )}
        <div
          className={`absolute inset-0 blur-xl opacity-20 rounded-full ${platform?.color}`}
        ></div>
      </div>

      <div className='ml-4 flex-1'>
        <p className='text-white text-sm font-bold tracking-wide'>
          {platform?.getName()}
        </p>
        <p className='text-white/40 text-[11px] font-medium tracking-normal'>
          {country?.currencySymbol}
          {platform?.active
            ? platform.plans[platform.currentPlanTier].price
            : platform?.plans?.['BASIC'].price}
          /mo •{' '}
          <span
            className={
              platform?.daysLeft && platform?.daysLeft < 5
                ? 'text-orange-400/80 tracking-tight'
                : 'tracking-tight'
            }
          >
            {platform?.daysLeft} days left
          </span>
        </p>
      </div>

      <div className='bg-white/5 h-9 w-9 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all'>
        <span className='material-symbols-outlined text-white/30 group-hover:text-white/60 text-lg'>
          chevron_right
        </span>
      </div>

      <ActiveBadge show={platform?.active ?? false} />
    </div>
  );
};

export default PlatformCard;
