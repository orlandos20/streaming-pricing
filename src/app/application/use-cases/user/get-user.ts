import { UserFromApi } from '@/app/domain/entities/User';
import { UserId } from '@/app/domain/value-objects/User';
import { UserApiRepository } from '@/app/infrastructure/api/user/UserApiRepository';

export class GetUser {
  constructor(private repository: UserApiRepository) {}

  async execute(userId: string): Promise<UserFromApi | null> {
    const id = new UserId(userId);
    return this.repository.findById(id);
  }
}
