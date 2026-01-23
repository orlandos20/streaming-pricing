// application/use-cases/GetSubscriptionPlans.ts
import { PlatformRepository } from '../../domain/repositories/platformRepository';

export class GetPlatforms {
  constructor(private repository: PlatformRepository) {}

  async execute() {
    return this.repository.findAll();
  }
}
