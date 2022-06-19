import { Odds, ticks, decimal, percentage } from '../lib/odds'
import { RandInt } from '@lesm-repo/utils'

describe("Module::Odds", () => {
  describe("Class::Odds", () => {
    it("Test::Constructor with valid tick index", () => {
      const tick = RandInt(0, ticks.length);
      const odds = new Odds(tick);
      expect(odds).toBeDefined();
      expect(odds.tick).toBe(ticks[tick]);
      expect(odds.decimal).toBe(decimal[tick]);
      expect(odds.percentage).toBe(percentage[tick]);
    });

    it("Test::Constructor with invalid tick index", () => {
      const tick = RandInt(ticks.length, ticks.length*2);
      expect(() => new Odds(tick, true)).toThrowError();
    });

    it("Test::inc with valid tick values", () => {
      const tick = RandInt(0, ticks.length/2);
      const odds = new Odds(tick);
      expect(odds).toBeDefined();
      odds.inc();
      expect(odds.tick).toBe(ticks[tick+1]);
    });
  });
});
