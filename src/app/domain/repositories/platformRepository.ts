// domain/repositories/PlatformRepository.ts
import { Platform } from '../entities/Platform';
import { PlatformId } from '../value-objects/Platform';

export interface PlatformRepository {
  save(platform: Platform): Promise<void>;
  findAll(): Promise<Platform[]>;
  findById(id: PlatformId): Promise<Platform | null>;
}
