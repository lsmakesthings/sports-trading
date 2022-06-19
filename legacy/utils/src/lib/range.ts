export interface MinMaxInterface {
  value: number;
  limit?: boolean;
  error?: boolean;
}

export interface RangeInterface {
  min: MinMaxInterface | number;
  max: MinMaxInterface | number;
}

export class Range implements RangeInterface {
  min: MinMaxInterface;
  max: MinMaxInterface;

  // TODO: Add function overloads:
  //      - min: number, max, number, limit?: boolean, error?: boolean
  //      - [min: number, max, number], limit?: boolean, error?: boolean
  constructor(input: RangeInterface) {
    if (typeof (input.min) === 'number')
      this.min = {
        value: input.min ?? 0,
        limit: false,
        error: false
      }
    else
      this.min = input.min;

    if (typeof (input.max) === 'number')
      this.max = {
        value: input.max,
        limit: false,
        error: false
      }
    else
      this.max = input.max;

    if (this.min.value > this.max.value)
      throw new RangeError(`Min can not be greater than Max: min = ${this.min.value}, max = ${this.max.value}`)
  }

  public isValid(num: number) {
    return this.isMaxValid(num) && this.isMinValid(num);
  }

  public isMaxValid(num: number) {
    return num <= this.max.value;
  }

  public isMinValid(num: number) {
    return num >= this.min.value;
  }
}

export class RangedNumber extends Range {
  num_: number;

  constructor(num: number, range: RangeInterface) {
    super(range);

    this.num_ = NaN;
    this.num = num;
  }

  public set num(num: number) {

    if (this.isValid(num)) {
      this.num_ = num;
      return;
    }

    if (this.min.limit && !this.isMinValid(num)) {
      this.num_ = this.min.value;

      return;
    }

    if (this.max.limit && !this.isMaxValid(num)) {
      this.num_ = this.max.value;
      return;
    }

    this.num_ = NaN;
    throw new RangeError(`Number is outside of range [${this.min.value}:${this.max.value}]: ${num}`)
  }

  public get num(): number {
    return this.num_;
  }
}

export class Percentage extends RangedNumber {
  constructor(percent: number, error = false) {
    super(percent, {
      min: {
        value: 0,
        limit: true,
        error: error
      },
      max: {
        value: 100,
        limit: true,
        error: error
      },
    });
  }

  set percent(num: number) {
    this.num = num;
  }

  get percent() {
    return this.num;
  }
}
