import { Currency } from '../../../../types';

export class Money {
  constructor(
    readonly amount: number,
    readonly currency: Currency,
  ) {
    if (amount < 0) throw new Error('Invalid amount');
  }

  divide(divisor: number): Money {
    return new Money(this.amount / divisor, this.currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}
