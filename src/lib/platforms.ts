import { Platform } from '@/app/domain/entities/Platform';
import { PlatformId, PlatformName } from '@/app/domain/value-objects/Platform';

export function buildPlatform(p: Platform) {
  return new Platform(
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    new PlatformId((p as any).id),
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    new PlatformName((p as any).name).value,
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
  );
}
