import { Platform } from '@/app/domain/entities/Platform';
import { buildPlatform } from '@/lib/platforms';

export function PlatformDTO(platformsFromApi: Platform[]) {
  return Object.values(platformsFromApi).map((p) => buildPlatform(p));
}
