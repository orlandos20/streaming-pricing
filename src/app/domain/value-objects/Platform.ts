// domain/value-objects/PlatformName.ts
export class PlatformName {
  readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Platform name is invalid');
    }

    this.value = value.trim();
  }

  getName(): string {
    return this.value;
  }
}

// domain/value-objects/PlatformId.ts
export class PlatformId {
  readonly value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('PlatformId is required');
    }
    this.value = value;
  }

  getId(): string {
    return this.value;
  }
}
