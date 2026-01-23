// ui/hooks/useSubscriptionPlans.ts
import { useEffect, useState } from 'react';
import { Platform } from '../domain/entities/Platform';
import { PlatformApiRepository } from '../infrastructure/api/platformApiRepository';
import { GetPlatforms } from '../application/use-cases/get-platforms';

export function usePlatform() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  function setEntities(platformsFromApi: Platform[]) {
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

  useEffect(() => {
    const repo = new PlatformApiRepository();
    const useCase = new GetPlatforms(repo);

    useCase
      .execute()
      .then(setEntities)
      .then(setPlatforms)
      .finally(() => setLoading(false));
  }, []);

  return { platforms, loading };
}
