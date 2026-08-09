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

/** Routing bucket. Every chain has exactly one, unlike `categories`. */
export type ChainFamilySlug = "utxo" | "evm" | "cosmos" | "l1"

export type Chain = {
  /** Display name, and the search key alongside `ticker`. */
  name: string
  /**
   * URL segment under its family: /chains/evm/arb. Ticker-derived, except where
   * tickers collide — Base, Optimism and zkSync all report ETH, and QBTC
   * reports BTC — so those take their own name.
   */
  slug: string
  /**
   * The one family this chain is published under. `categories` can hold several
   * and drives the index's filter chips; this picks the single canonical URL,
   * so a chain never answers on two paths. EVM wins for the rollups and for the
   * Cosmos chains that execute EVM (Cronos, Sei), and `l1` collects the chains
   * that are their own architecture.
   */
  family: ChainFamilySlug
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
    slug: "akt",
    family: "cosmos",
    ticker: "AKT",
    icon: "akash",
    glow: "#FF414C",
    categories: ["cosmos"],
  },
  {
    name: "Arbitrum",
    slug: "arb",
    family: "evm",
    ticker: "ARB",
    icon: "arbitrum",
    glow: "#5C6C85",
    categories: ["evm", "l2"],
  },
  {
    name: "Avalanche",
    slug: "avax",
    family: "evm",
    ticker: "AVAX",
    icon: "avalanche",
    glow: "#FF394A",
    categories: ["evm"],
  },
  {
    name: "BSC",
    slug: "bnb",
    family: "evm",
    ticker: "BNB",
    icon: "bsc",
    glow: "#F0B90B",
    categories: ["evm"],
  },
  {
    name: "Base",
    slug: "base",
    family: "evm",
    ticker: "ETH",
    icon: "base",
    glow: "#0000FF",
    categories: ["evm", "l2"],
  },
  {
    name: "Bitcoin",
    slug: "btc",
    family: "utxo",
    ticker: "BTC",
    icon: "bitcoin",
    glow: "#F7931A",
    categories: ["utxo"],
  },
  {
    name: "Bitcoin-Cash",
    slug: "bch",
    family: "utxo",
    ticker: "BCH",
    icon: "bitcoin-cash",
    glow: "#0AC18E",
    categories: ["utxo"],
  },
  {
    name: "Bittensor",
    slug: "tao",
    family: "l1",
    ticker: "TAO",
    icon: "bittensor",
    glow: "#536C93",
    categories: [],
  },
  {
    name: "Blast",
    slug: "blast",
    family: "evm",
    ticker: "BLAST",
    icon: "blast",
    glow: "#ADAD00",
    categories: ["evm", "l2"],
  },
  {
    name: "Cardano",
    slug: "ada",
    family: "utxo",
    ticker: "ADA",
    icon: "cardano",
    glow: "#2359DC",
    categories: ["utxo"],
  },
  {
    name: "Cosmos",
    slug: "atom",
    family: "cosmos",
    ticker: "ATOM",
    icon: "cosmos",
    glow: "#525672",
    categories: ["cosmos"],
  },
  {
    name: "CronosChain",
    slug: "cro",
    family: "evm",
    ticker: "CRO",
    icon: "cronoschain",
    glow: "#536C93",
    categories: ["evm", "cosmos"],
  },
  {
    name: "Dash",
    slug: "dash",
    family: "utxo",
    ticker: "DASH",
    icon: "dash",
    glow: "#008DE4",
    categories: ["utxo"],
  },
  {
    name: "Dogecoin",
    slug: "doge",
    family: "utxo",
    ticker: "DOGE",
    icon: "dogecoin",
    glow: "#D8C173",
    categories: ["utxo"],
  },
  {
    name: "Dydx",
    slug: "dydx",
    family: "cosmos",
    ticker: "DYDX",
    icon: "dydx",
    glow: "#9293FB",
    categories: ["cosmos"],
  },
  {
    name: "Ethereum",
    slug: "eth",
    family: "evm",
    ticker: "ETH",
    icon: "ethereum",
    glow: "#8C8C8C",
    categories: ["evm"],
  },
  {
    name: "Hyperliquid",
    slug: "hype",
    family: "evm",
    ticker: "HYPE",
    icon: "hyperliquid",
    glow: "#2CFFAB",
    categories: ["evm"],
  },
  {
    name: "Kujira",
    slug: "kuji",
    family: "cosmos",
    ticker: "KUJI",
    icon: "kujira",
    glow: "#E53935",
    categories: ["cosmos"],
  },
  {
    name: "Litecoin",
    slug: "ltc",
    family: "utxo",
    ticker: "LTC",
    icon: "litecoin",
    glow: "#345D9D",
    categories: ["utxo"],
  },
  {
    name: "Mantle",
    slug: "mantle",
    family: "evm",
    ticker: "MNT",
    icon: "mantle",
    glow: "#536C93",
    categories: ["evm", "l2"],
  },
  {
    name: "MayaChain",
    slug: "cacao",
    family: "cosmos",
    ticker: "CACAO",
    icon: "mayachain",
    glow: "#35DFE8",
    categories: ["cosmos"],
  },
  {
    name: "Noble",
    slug: "noble",
    family: "cosmos",
    ticker: "USDC",
    icon: "noble",
    glow: "#8DABFF",
    categories: ["cosmos"],
  },
  {
    name: "Optimism",
    slug: "op",
    family: "evm",
    ticker: "ETH",
    icon: "optimism",
    glow: "#FF0420",
    categories: ["evm", "l2"],
  },
  {
    name: "Osmosis",
    slug: "osmo",
    family: "cosmos",
    ticker: "OSMO",
    icon: "osmosis",
    glow: "#A24A9C",
    categories: ["cosmos"],
  },
  {
    name: "Polkadot",
    slug: "dot",
    family: "l1",
    ticker: "DOT",
    icon: "polkadot",
    glow: "#FF2670",
    categories: [],
  },
  {
    name: "Polygon",
    slug: "pol",
    family: "evm",
    ticker: "POL",
    icon: "polygon",
    glow: "#6600FF",
    categories: ["evm", "l2"],
  },
  {
    name: "QBTC",
    slug: "qbtc",
    family: "l1",
    ticker: "BTC",
    icon: "qbtc",
    glow: "#DBAF54",
    categories: [],
  },
  {
    name: "Ripple",
    slug: "xrp",
    family: "l1",
    ticker: "XRP",
    icon: "ripple",
    glow: "#536C93",
    categories: [],
  },
  {
    name: "Sei",
    slug: "sei",
    family: "evm",
    ticker: "SEI",
    icon: "sei",
    glow: "#9D201A",
    categories: ["evm", "cosmos"],
  },
  {
    name: "Solana",
    slug: "sol",
    family: "l1",
    ticker: "SOL",
    icon: "solana",
    glow: "#A25AE7",
    categories: [],
  },
  {
    name: "Sui",
    slug: "sui",
    family: "l1",
    ticker: "SUI",
    icon: "sui",
    glow: "#536C93",
    categories: [],
  },
  {
    name: "THORChain",
    slug: "rune",
    family: "cosmos",
    ticker: "RUNE",
    icon: "thorchain",
    glow: "#15E1D6",
    categories: ["cosmos"],
  },
  {
    name: "Terra",
    slug: "luna",
    family: "cosmos",
    ticker: "LUNA",
    icon: "terra",
    glow: "#56B2A1",
    categories: ["cosmos"],
  },
  {
    name: "TerraClassic",
    slug: "lunc",
    family: "cosmos",
    ticker: "LUNC",
    icon: "terraclassic",
    glow: "#5494F8",
    categories: ["cosmos"],
  },
  {
    name: "Ton",
    slug: "ton",
    family: "l1",
    ticker: "TON",
    icon: "ton",
    glow: "#0098EA",
    categories: [],
  },
  {
    name: "Tron",
    slug: "trx",
    family: "l1",
    ticker: "TRX",
    icon: "tron",
    glow: "#FF060A",
    categories: [],
  },
  {
    name: "Zcash",
    slug: "zec",
    family: "utxo",
    ticker: "ZEC",
    icon: "zcash",
    glow: "#F3B724",
    categories: ["utxo"],
  },
  {
    name: "Zksync",
    slug: "zksync",
    family: "evm",
    ticker: "ETH",
    icon: "zksync",
    glow: "#536C93",
    categories: ["evm", "l2"],
  },
]
