import { Round2dp, RandNumber, RandInt, RoundInt } from '../lib/maths'

describe("Module::Maths", () => {

  describe("Function::Round*", () => {
    test("Test::Round2dp 2.65123 to 2.65", () => {
      expect(Round2dp(2.65123)).toEqual(2.65);
    });

    test("Test::RoundInt 2.65123 to 3", () => {
      expect(RoundInt(2.65123)).toEqual(3);
    });
  });

  describe("Function::Rand*", () => {
    test("Test::Get random integer between 0 and 100", () => {
      const min = 0;
      const max = 100;
      const rand = RandInt(min, max);

      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThan(max);
    });

    test("Test::Get random integer between 100 and 1000", () => {
      const min = 100;
      const max = 1000;

      const rand = RandInt(min, max);

      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThan(max);
    });
  });

  describe("Function::RandInt(ModFunc)", () => {
    test("Test::Get random rounded number using Round2dp", () => {
      const min = 0;
      const max = 100;

      const rand = RandNumber(min, max, Round2dp);
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThan(max);
    });

    test("Test::Get random rounded number using Math.ceil", () => {
      const min = 0;
      const max = 100;

      const rand = RandNumber(min, max, Math.ceil);
      expect(rand).toBeGreaterThanOrEqual(min);
      expect(rand).toBeLessThan(max);
    });
  });
});
