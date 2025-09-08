export const PRICE_LADDER = [37, 47, 57, 67, 79, 89] as const

export const CURRENT_PRICE = 79

export const PREVIOUS_PRICE = (() => {
  const idx = PRICE_LADDER.indexOf(CURRENT_PRICE as (typeof PRICE_LADDER)[number])
  return idx > 0 ? PRICE_LADDER[idx - 1] : PRICE_LADDER[0]
})()

export const NEXT_PRICE = (() => {
  const idx = PRICE_LADDER.indexOf(CURRENT_PRICE as (typeof PRICE_LADDER)[number])
  return idx >= 0 && idx < PRICE_LADDER.length - 1
    ? PRICE_LADDER[idx + 1]
    : CURRENT_PRICE
})()

