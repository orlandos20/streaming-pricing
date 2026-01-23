export class Price {
  readonly amount: number;
  readonly currency: string;

  constructor(amount: number, currency: string) {
    if (amount < 0) {
      throw new Error('Price cannot be negative');
    }

    if (!['EUR', 'USD', 'MXN'].includes(currency)) {
      throw new Error('Unsupported currency');
    }

    this.amount = amount;
    this.currency = currency;
  }

  equals(other: Price): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
