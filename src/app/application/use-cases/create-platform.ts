// application/use-cases/CreatePlatform.ts
// import { Platform } from '../../domain/entities/Platform';
// import { PlatformId, PlatformName } from '../../domain/value-objects/Platform';
import { PlatformRepository } from '../../domain/repositories/platformRepository';

export class CreatePlatform {
  constructor(private repository: PlatformRepository) {}

  async execute() // input: { id: string; name: string }
  {
    // const platform = new Platform(
    //   new PlatformId(input.id),
    //   new PlatformName(input.name),
    // );
    // await this.repository.save(platform);
  }
}
