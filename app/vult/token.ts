/**
 * $VULT on-chain identity. Carried over verbatim from the pre-V5 /vult page —
 * money-path values are never retyped from a design file.
 */
export const VULT_CONTRACT_ADDRESS =
  "0xb788144DF611029C60b859DF47e79B7726C4DEBa"

export const VULT_BUY_URL =
  "https://app.uniswap.org/explore/tokens/ethereum/0xb788144df611029c60b859df47e79b7726c4deba?inputCurrency=NATIVE"

export const VULT_MAX_SUPPLY = 100_000_000

/** Figma shows the address as `0xb78...EBa` — 5 leading, 3 trailing characters. */
export const VULT_CONTRACT_SHORT = `${VULT_CONTRACT_ADDRESS.slice(0, 5)}...${VULT_CONTRACT_ADDRESS.slice(-3)}`
