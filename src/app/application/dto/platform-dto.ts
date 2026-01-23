import { Platform } from '@/app/domain/entities/Platform';

export function PlatformDTO(platformsFromApi: Platform[]) {
  const mappedPlatforms = Object.values(platformsFromApi).map(
    (p) =>
      new Platform(
        p.id,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p as any).name,
        p.active,
        p.category,
        p.billingCycleOptions,
        p.billingCycle,
        p.currentPlanTier,
        p.renewalDate,
        p.daysLeft,
        p.iconType,
        p.iconValue,
        p.color,
        p.plans,
        p.glowClass,
      ),
  );

  return mappedPlatforms;
}
