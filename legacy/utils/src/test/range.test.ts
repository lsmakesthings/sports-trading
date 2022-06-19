// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Range, MinMaxInterface, RangeInterface, RangedNumber, Percentage } from '../lib/range';

describe("Module::Range", () => {

  describe("Class::Range", () => {
    test("Test::Constructor::Input RangeInterface with numbers: min < max", () =>{
      expect(() => new Range({ min: 5, max: 72})).toBeDefined();
    });

    test("Test::Constructor::Input RangeInterface with numbers: min > max [ILLEGAL]", () => {
      expect(() => new Range({ min: 50, max: 2})).toThrowError();
    });

    // TODO: Add tests for inputting MinMaxInterface
    test("Test::Constructor::Input RangeInterface with MinMaxInterface: min < max", () => {
      expect(() => new Range({ min: { value: 5 }, max: { value: 72} })).toBeDefined();
    });

    test("Test::Constructor::Input RangeInterface with MinMaxInterface: min > max [ILLEGAL]", () => {
      expect(() => new Range({ min: { value: 50 }, max: { value: 7} })).toThrowError();
    });
    // TODO: Add tests for limit/error = true
    // TODO: Add tests for all combinations of min, max
    // TODO: Add random tests??
  });

  describe("Class::RangedNumber", () => {
    test("Test::Constructor::Input (number, RangeInterface with numbers): num is legal", () => {
      // const min =
      const ranged_number = new RangedNumber(5, { min: 2, max: 72 });
      expect(ranged_number).toBeDefined();
      expect(ranged_number.min.value).toBe(2);
    });

    test("Test::Constructor::Input (number, RangeInterface with numbers): num is illegal", () => {
      expect(() => new RangedNumber(500, { min: 2, max: 72 })).toThrowError();
    });

    // TODO: Add tests for limit/error = true
    test("Test::Constructor::Input RangeInterface with MinMaxInterface: num < min, limit = true, error = false", () => {
      expect(new RangedNumber(-40, { min: { value: 5, limit: true, error: false }, max: { value: 72} }).num).toBe(5);
    });

    test("Test::Constructor::Input RangeInterface with MinMaxInterface: num > max, limit = true, error = false", () => {
      expect(new RangedNumber(100, { min: { value: 2 }, max: { value: 72, limit: true, error: false} }).num).toBe(72);
    });
  });

  describe("Class::Percentage", () => {

    return;
  });
});
