export class UserName {
  constructor(private value: string) {
    if (value.length < 2 || value.length > 50) {
      throw new Error('UserName must be between 2 and 50 characters long.');
    }
    this.value = value;
  }

  get name(): string {
    return this.value;
  }

  set newName(newName: string) {
    this.value = newName;
  }
}

export class UserId {
  constructor(private value: string) {
    if (!value) {
      throw new Error('UserId cannot be empty.');
    }
    this.value = value;
  }
  get Id(): string {
    return this.value;
  }
}
