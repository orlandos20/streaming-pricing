// infrastructure/repositories/InMemoryPlatformRepository.ts
import { PlatformRepository } from '../../domain/repositories/platformRepository';
import { Platform } from '../../domain/entities/Platform';
import { PlatformId } from '../../domain/value-objects/Platform';

const Platforms = {
  Netflix: {
    id: '001',
    name: 'Netflix',
    active: true,
    currentPlanTier: 'BASIC',
    color: 'bg-red-600',
    renewalDate: 'March 15, 2024',
    daysLeft: 3,
    category: 'Video',
    iconType: 'letter',
    iconValue: 'N',
    billingCycleOptions: ['MONTHLY', 'ANNUAL'],
    billingCycle: 'MONTHLY',
    plans: {
      BASIC: {
        id: 'sub_001',
        planName: 'BASIC',
        price: 9.99,
        maxParticipants: 2,
        screensAllowed: 2,
        resolution: '720p',
        color: 'emerald-400',
        glowClass: 'border-emerald-500/30 neon-emerald-glow bg-white/10',
      },
      STANDARD: {
        id: 'sub_001',
        planName: 'STANDARD',
        price: 15.49,
        resolution: '1080p',
        maxParticipants: 2,
        screensAllowed: 2,
        color: 'blue-500',
        glowClass: 'border-blue-500/60 neon-blue-glow bg-white/10',
      },
      PREMIUM: {
        id: 'sub_001',
        planName: 'PREMIUM',
        price: 22.99,
        resolution: '4K + HDR',
        maxParticipants: 2,
        screensAllowed: 4,
        color: 'amber-400',
        glowClass: 'border-amber-500/30 neon-amber-glow bg-white/10',
      },
    },
  },
  Spotify: {
    id: '002',
    name: 'Spotify',
    active: false,
    color: 'bg-green-600',
    currentPlanTier: 'Duo',
    renewalDate: 'April 15, 2024',
    daysLeft: 15,
    category: 'Music',
    iconType: 'symbol',
    iconValue: 'headphones',
    billingCycleOptions: ['MONTHLY', 'ANNUAL'],
    billingCycle: 'MONTHLY',
    plans: {
      BASIC: {
        id: 'sub_002',
        planName: 'BASIC',
        price: 9.99,
        maxParticipants: 2,
        resolution: 'High Quality Audio',
        color: 'emerald-400',
        glowClass: 'border-emerald-500/30 neon-emerald-glow bg-white/10',
      },
      Duo: {
        id: 'sub_002',
        planName: 'Duo',
        price: 15.49,
        resolution: 'High Quality Audio + Video (Limited)',
        maxParticipants: 2,
        color: 'blue-500',
        glowClass: 'border-blue-500/60 neon-blue-glow bg-white/10',
      },
      Family: {
        id: 'sub_002',
        planName: 'Family',
        price: 22.99,
        resolution: 'High Quality Audio + Video (Unlimited)',
        maxParticipants: 2,
        color: 'amber-400',
        glowClass: 'border-amber-500/30 neon-amber-glow bg-white/10',
      },
    },
  },
};

export class InMemoryPlatformRepository implements PlatformRepository {
  private platforms = new Map<string, Platform>();

  async save(platform: Platform): Promise<void> {
    this.platforms.set(platform.id.value, platform);
  }

  async findAll(): Promise<Platform[]> {
    // return Array.from(this.platforms.values());
    return Array.from(Object.values(Platforms)).map((platformData) => {
      return new Platform(
        new PlatformId(platformData.id),
        platformData.name,
        platformData.active,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        (platformData as any).category,
        platformData.billingCycleOptions,
        platformData.billingCycle as 'MONTHLY' | 'ANNUAL',
        platformData.renewalDate,
        platformData.daysLeft,
        platformData.currentPlanTier,
        platformData.iconType,
        platformData.iconValue,
        platformData.color,
        platformData.plans,
        ...(platformData?.glowClass && { glowClass: platformData.glowClass }),
      );
    });
  }

  async findById(id: PlatformId): Promise<Platform | null> {
    return this.platforms.get(id.value) ?? null;
  }
}
