// domain/value-objects/SubscriptionPlanId.ts
export class SubscriptionPlanId {
  readonly value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('SubscriptionPlanId is required');
    }
    this.value = value;
  }
}

// domain/value-objects/PlanName.ts
export class PlanName {
  readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Plan name is invalid');
    }

    this.value = value.trim();
  }

  getName(): string {
    return this.value;
  }
}

// domain/value-objects/MaxParticipants.ts
export class MaxParticipants {
  readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('MaxParticipants must be a positive integer');
    }

    this.value = value;
  }
}
