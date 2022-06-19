export * from "./ticks";
import { ticks, percentage, decimal } from './ticks';
import { RangedNumber } from '@lesm-repo/utils';

export interface OddsInterface {
  tick: number;
  percentage: string;
  decimal: string;
}

export class Odds implements OddsInterface {

  tick_: RangedNumber;

  constructor(tick: number, error = false) {
    this.tick_ = new RangedNumber(tick, {
      min: {
        value: 0,
        limit: true,
        error: error
      },
      max: {
        value: ticks.length-1,
        limit: true,
        error: error
      }});
  }

  set tick(tick:number) {
    this.tick_.num = tick;
  }

  get tick()
  {
    return ticks[this.tick_.num];
  }

  get percentage()
  {
    return percentage[this.tick_.num];
  }

  get decimal()
  {
    return decimal[this.tick_.num];
  }

  public dir(dir: -1 | 1) {
    this.tick_.num += dir;
  }

  public inc() {
    this.dir(1);
  }

  public dec() {
    this.dir(-1);
  }
}

