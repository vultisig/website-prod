/** Filter groups offered above the grid, in Figma's order. */
export const CHAIN_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "utxo", label: "UTXO" },
  { id: "evm", label: "EVM" },
  { id: "cosmos", label: "Cosmos SDK" },
  { id: "l2", label: "L2s" },
] as const

export type ChainCategory = Exclude<
  (typeof CHAIN_CATEGORIES)[number]["id"],
  "all"
>

export type Chain = {
  /** Display name, and the search key alongside `ticker`. */
  name: string
  /** Asset ticker shown under the name. */
  ticker: string
  /** `public/v5/chains/chain-<icon>.svg`, exported from the Figma logo set. */
  icon: string
  /**
   * Brand colour. In Figma this fills a 152px circle behind the mark under a
   * 115px layer blur, hidden until hover — so it is the glow colour, not a
   * surface, and stays inline as data rather than a theme token.
   */
  glow: string
  /**
   * Groups this chain answers to. Figma specifies the filter chips but not the
   * membership, so these follow the chains' own architecture: `l2` is Ethereum
   * rollups and sidechains, `cosmos` is anything built on the Cosmos SDK, and a
   * chain can hold several (Cronos and Sei are Cosmos chains with EVM
   * execution). Chains in their own families — Solana, Sui, TON, Tron, XRP,
   * Polkadot, Bittensor, QBTC — carry none and surface only under "All".
   */
  categories: ChainCategory[]
}

/** The 38 chains on the Figma frame, alphabetical as laid out there. */
export const CHAINS: Chain[] = [
  {
    name: "Akash",
    ticker: "AKT",
    icon: "akash",
    glow: "#FF414C",
    categories: ["cosmos"],
  },
  {
    name: "Arbitrum",
    ticker: "ARB",
    icon: "arbitrum",
    glow: "#5C6C85",
    categories: ["evm", "l2"],
  },
  {
    name: "Avalanche",
    ticker: "AVAX",
    icon: "avalanche",
    glow: "#FF394A",
    categories: ["evm"],
  },
  {
    name: "BSC",
    ticker: "BNB",
    icon: "bsc",
    glow: "#F0B90B",
    categories: ["evm"],
  },
  {
    name: "Base",
    ticker: "ETH",
    icon: "base",
    glow: "#0000FF",
    categories: ["evm", "l2"],
  },
  {
    name: "Bitcoin",
    ticker: "BTC",
    icon: "bitcoin",
    glow: "#F7931A",
    categories: ["utxo"],
  },
  {
    name: "Bitcoin-Cash",
    ticker: "BCH",
    icon: "bitcoin-cash",
    glow: "#0AC18E",
    categories: ["utxo"],
  },
  {
    name: "Bittensor",
    ticker: "TAO",
    icon: "bittensor",
    glow: "#536C93",
    categories: [],
  },
  {
    name: "Blast",
    ticker: "BLAST",
    icon: "blast",
    glow: "#ADAD00",
    categories: ["evm", "l2"],
  },
  {
    name: "Cardano",
    ticker: "ADA",
    icon: "cardano",
    glow: "#2359DC",
    categories: ["utxo"],
  },
  {
    name: "Cosmos",
    ticker: "ATOM",
    icon: "cosmos",
    glow: "#525672",
    categories: ["cosmos"],
  },
  {
    name: "CronosChain",
    ticker: "CRO",
    icon: "cronoschain",
    glow: "#536C93",
    categories: ["evm", "cosmos"],
  },
  {
    name: "Dash",
    ticker: "DASH",
    icon: "dash",
    glow: "#008DE4",
    categories: ["utxo"],
  },
  {
    name: "Dogecoin",
    ticker: "DOGE",
    icon: "dogecoin",
    glow: "#D8C173",
    categories: ["utxo"],
  },
  {
    name: "Dydx",
    ticker: "DYDX",
    icon: "dydx",
    glow: "#9293FB",
    categories: ["cosmos"],
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    icon: "ethereum",
    glow: "#8C8C8C",
    categories: ["evm"],
  },
  {
    name: "Hyperliquid",
    ticker: "HYPE",
    icon: "hyperliquid",
    glow: "#2CFFAB",
    categories: ["evm"],
  },
  {
    name: "Kujira",
    ticker: "KUJI",
    icon: "kujira",
    glow: "#E53935",
    categories: ["cosmos"],
  },
  {
    name: "Litecoin",
    ticker: "LTC",
    icon: "litecoin",
    glow: "#345D9D",
    categories: ["utxo"],
  },
  {
    name: "Mantle",
    ticker: "MNT",
    icon: "mantle",
    glow: "#536C93",
    categories: ["evm", "l2"],
  },
  {
    name: "MayaChain",
    ticker: "CACAO",
    icon: "mayachain",
    glow: "#35DFE8",
    categories: ["cosmos"],
  },
  {
    name: "Noble",
    ticker: "USDC",
    icon: "noble",
    glow: "#8DABFF",
    categories: ["cosmos"],
  },
  {
    name: "Optimism",
    ticker: "ETH",
    icon: "optimism",
    glow: "#FF0420",
    categories: ["evm", "l2"],
  },
  {
    name: "Osmosis",
    ticker: "OSMO",
    icon: "osmosis",
    glow: "#A24A9C",
    categories: ["cosmos"],
  },
  {
    name: "Polkadot",
    ticker: "DOT",
    icon: "polkadot",
    glow: "#FF2670",
    categories: [],
  },
  {
    name: "Polygon",
    ticker: "POL",
    icon: "polygon",
    glow: "#6600FF",
    categories: ["evm", "l2"],
  },
  {
    name: "QBTC",
    ticker: "BTC",
    icon: "qbtc",
    glow: "#DBAF54",
    categories: [],
  },
  {
    name: "Ripple",
    ticker: "XRP",
    icon: "ripple",
    glow: "#536C93",
    categories: [],
  },
  {
    name: "Sei",
    ticker: "SEI",
    icon: "sei",
    glow: "#9D201A",
    categories: ["evm", "cosmos"],
  },
  {
    name: "Solana",
    ticker: "SOL",
    icon: "solana",
    glow: "#A25AE7",
    categories: [],
  },
  { name: "Sui", ticker: "SUI", icon: "sui", glow: "#536C93", categories: [] },
  {
    name: "THORChain",
    ticker: "RUNE",
    icon: "thorchain",
    glow: "#15E1D6",
    categories: ["cosmos"],
  },
  {
    name: "Terra",
    ticker: "LUNA",
    icon: "terra",
    glow: "#56B2A1",
    categories: ["cosmos"],
  },
  {
    name: "TerraClassic",
    ticker: "LUNC",
    icon: "terraclassic",
    glow: "#5494F8",
    categories: ["cosmos"],
  },
  { name: "Ton", ticker: "TON", icon: "ton", glow: "#0098EA", categories: [] },
  {
    name: "Tron",
    ticker: "TRX",
    icon: "tron",
    glow: "#FF060A",
    categories: [],
  },
  {
    name: "Zcash",
    ticker: "ZEC",
    icon: "zcash",
    glow: "#F3B724",
    categories: ["utxo"],
  },
  {
    name: "Zksync",
    ticker: "ETH",
    icon: "zksync",
    glow: "#536C93",
    categories: ["evm", "l2"],
  },
]
