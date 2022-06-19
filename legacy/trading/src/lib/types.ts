export enum OddsDisplayEnum {
  TICK = "tick",
  PERCENTAGE = "percentage",
  DECIMAL = "decimal",
  FRACTIONAL = "fractional",
  AMERICAN = "american"
}

export type PositionType = string | number;

export enum BetStateEnum {
  INITIAL = "INITIAL",
  UNMATCHED = "UNMATCHED",
  CANCELLED = "CANCELLED",
  MATCHED = "MATCHED",
  CASHED_OUT = "CASHED_OUT",
  WINNER = "WINNER",
  LOSER = "LOSER"
}
