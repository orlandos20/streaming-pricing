// infrastructure/api/PlatformApiRepository.ts
import { PlatformRepository } from '../../domain/repositories/platformRepository';
import { PlatformId, PlatformName } from '../../domain/value-objects/Platform';
import { Platform } from '../../domain/entities/Platform';

export class PlatformApiRepository implements PlatformRepository {
  async save(): Promise<void> {
    throw new Error('Not implemented');
  }

  async findAll(): Promise<Platform[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MOCK_URL}/platforms`,
    );

    const data = await res.json();

    return data;
  }

  async findById(platformId: PlatformId): Promise<Platform | null> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_MOCK_URL}/api/platforms/${platformId.value}/plans`,
    );

    const data = await res.json();

    // mapping DTO → dominio (simplificado)
    return data.map(
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) =>
        new Platform(
          new PlatformId(p.id),
          new PlatformName(p.name).value,
          // Comprobar si es necesario crear value objects para estos campos
          // new PlatformCategory(p.category),
          // new PlatformIconType(p.iconType),
          // new PlatformIconValue(p.iconValue),
          // new PlatformBillingCycle(p.billingCycle),
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
          p.glowClass,
          p.plans,
        ),
    );
  }
}
