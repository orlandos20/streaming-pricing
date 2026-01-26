// infrastructure/api/PlatformApiRepository.ts
import { PlatformRepository } from '../../domain/repositories/platformRepository';
import { PlatformId } from '../../domain/value-objects/Platform';
import { Platform } from '../../domain/entities/Platform';
import { buildPlatform } from '@/lib/platforms';

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

    // mapping DTO → domain (simplified)
    return data.map(
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) => buildPlatform(p),
    );
  }
}
