type ModFuncType = (num :number) => number;

export const Round = (num: number, digits: number) => {
  const d = Math.pow(10, digits);
  return Math.round((num + Number.EPSILON) * d) / d;
}

export const RoundInt: ModFuncType = (num: number) => Round(num, 0);
export const Round2dp: ModFuncType = (num: number) => Round(num, 2);

export const RandNumber = (max: number, min = 0, ModFunc: ModFuncType): number => {
  return min + ModFunc(Math.random() * (max - min));
}

export const RandInt = (max: number, min = 0) => RandNumber(max, min, RoundInt);

