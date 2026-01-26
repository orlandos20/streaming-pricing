export class SharedPeople {
  constructor(private readonly value: number) {
    if (value < 1) throw new Error('Must be at least 1 person');
  }

  total(): number {
    return this.value;
  }
}
