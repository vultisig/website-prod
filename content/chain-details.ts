import type { ActionLabel, FaqEntry, FaqId, Feature } from "./chain-families"

/** What a chain page can say that no other chain page can. */
export type ChainFacts = {
  /** What the vault's address looks like; also answers the page's address question. */
  address: string
  /** What pays the network fee. */
  fee: string
  /** One to three facts true in every Vultisig app (desktop, extension, iOS, Android). */
  notes: string[]
}

/** Family copy a chain replaces because it is not true for that chain. */
export type ChainCopyOverrides = {
  heroBody?: string
  vaultViewBody?: string
  features?: Feature[]
  /** Replaces a family question by id, or removes it with `null`. */
  faq?: Partial<Record<FaqId, FaqEntry | null>>
  /** Questions only this chain asks, appended after the family's. */
  extraFaq?: FaqEntry[]
  metaDescription?: string
  /** Action cards a chain does not offer in every app. */
  hiddenActions?: ActionLabel[]
}

export type ChainDetails = {
  facts: ChainFacts
  overrides?: ChainCopyOverrides
  /**
   * False until the chain's Figma hero and vault-view art exist; the page then
   * shows the chain's logo in their place instead of another chain's artwork.
   */
  hasArt?: false
}

const AUTO_ERC20_NOTE = "ERC-20 tokens are found automatically, with no import step."

const NO_AUTO_ERC20_FAQ: FaqEntry = {
  question: "Do ERC-20 tokens show up automatically?",
  answer:
    "Not on {chain}. Automatic ERC-20 discovery runs on Ethereum, Base, Arbitrum, Polygon, Optimism, BNB Chain and Avalanche. On {chain}, native {asset} shows automatically, and token support depends on each app's token list.",
}

const NO_STAKING_FAQ: FaqEntry = {
  question: "Can I stake {asset} from my vault?",
  answer:
    "Not today. Vultisig holds and sends {asset}; in-app staking covers THORChain, MayaChain, Terra and Terra Classic.",
}

const THORCHAIN_SWAP_FEATURES: Feature[] = [
  {
    title: "Native swap routing",
    body: "Swaps for {asset} settle through THORChain's liquidity, so it trades for BTC or ETH without leaving the vault.",
    icon: "feature-1",
  },
  {
    title: "No bridging step",
    body: "Swaps are routed natively, so there's no wrapped-asset or bridge-contract risk in the middle.",
    icon: "feature-2",
  },
  {
    title: "Hold and send {asset}",
    body: "Hold and send {asset} directly, each action approved by your device threshold.",
    icon: "feature-3",
  },
]

const THORCHAIN_SWAP_FAQ: FaqEntry[] = [
  {
    question: "Why does Vultisig use THORChain for {asset} swaps?",
    answer:
      "THORChain enables native cross-chain swaps without wrapping assets or routing through a bridge contract, which removes a common attack surface.",
  },
  {
    question: "Do I need RUNE to swap on Vultisig?",
    answer:
      "No. RUNE is the settlement asset THORChain uses under the hood, but you do not have to hold it. You choose the assets on each side and Vultisig handles the route.",
  },
]

const NO_SWAP_OR_FUNCTION: ActionLabel[] = ["Swap", "Function"]

/**
 * Per-chain facts, read from the wallet source on 2026-10-09 (vultisig-sdk,
 * vultisig-windows, vultisig-ios, vultisig-android `main`). A fact that holds on
 * only some apps is left out rather than qualified.
 */
export const CHAIN_DETAILS: Record<string, ChainDetails> = {
  // EVM
  arb: {
    facts: {
      address: "A 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in ETH, not ARB. ARB is an ERC-20 token on Arbitrum.",
      notes: [AUTO_ERC20_NOTE],
    },
  },
  avax: {
    facts: {
      address: "A 0x address on Avalanche's C-Chain, the same one your vault uses on every EVM chain.",
      fee: "Paid in AVAX.",
      notes: [AUTO_ERC20_NOTE],
    },
  },
  bnb: {
    facts: {
      address: "A 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in BNB.",
      notes: [AUTO_ERC20_NOTE],
    },
  },
  base: {
    facts: {
      address: "A 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in ETH, plus the small L1 data fee every OP Stack chain charges.",
      notes: [AUTO_ERC20_NOTE],
    },
  },
  blast: {
    facts: {
      address: "A 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in ETH, not BLAST.",
      notes: ["Blast tokens such as USDB can be added by their contract address."],
    },
    overrides: { faq: { tokens: NO_AUTO_ERC20_FAQ } },
  },
  cro: {
    facts: {
      address: "A 0x address on the Cronos EVM, the same one your vault uses on every EVM chain.",
      fee: "Paid in CRO.",
      notes: ["CRO swaps route through LI.FI."],
    },
    overrides: { faq: { tokens: NO_AUTO_ERC20_FAQ } },
  },
  eth: {
    facts: {
      address: "An EIP-55 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in ETH.",
      notes: [
        AUTO_ERC20_NOTE,
        "The VULT token lives on Ethereum at 0xb788144DF611029C60b859DF47e79B7726C4DEBa.",
      ],
    },
  },
  hype: {
    facts: {
      address: "A 0x address on HyperEVM (chain ID 999), the same one your vault uses on every EVM chain.",
      fee: "Paid in HYPE.",
      notes: ["HyperEVM swaps route through LI.FI."],
    },
    overrides: { faq: { tokens: NO_AUTO_ERC20_FAQ } },
  },
  mantle: {
    facts: {
      address: "A 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in MNT, Mantle's own gas token, not ETH.",
      notes: ["Mantle is an OP Stack chain, so transactions also carry a small L1 data fee."],
    },
    overrides: { faq: { tokens: NO_AUTO_ERC20_FAQ } },
  },
  op: {
    facts: {
      address: "A 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in ETH, plus the small L1 data fee every OP Stack chain charges.",
      notes: [AUTO_ERC20_NOTE],
    },
  },
  pol: {
    facts: {
      address: "A 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in POL.",
      notes: [AUTO_ERC20_NOTE],
    },
  },
  robinhood: {
    facts: {
      address: "A 0x address on Robinhood Chain (chain ID 4663), the same one your vault uses on every EVM chain.",
      fee: "Paid in ETH.",
      notes: ["Robinhood Chain swaps route through 1inch and KyberSwap."],
    },
    overrides: { faq: { tokens: NO_AUTO_ERC20_FAQ } },
    hasArt: false,
  },
  sei: {
    facts: {
      address: "A 0x address on Sei's EVM (chain ID 1329). Vultisig doesn't hold a sei1 Cosmos-side account.",
      fee: "Paid in SEI.",
      notes: ["Your Sei address is the same 0x address your vault uses on every other EVM chain."],
    },
    overrides: {
      heroBody:
        "Send SEI and call smart contracts on Sei's EVM. Every transaction requires your device threshold to approve it, not one exposed private key.",
      metaDescription:
        "Hold Sei in a Vultisig MPC vault. Send SEI and use dApps on Sei's EVM, each approved by your own devices. No seed phrase, no single private key.",
      faq: { tokens: NO_AUTO_ERC20_FAQ },
      hiddenActions: NO_SWAP_OR_FUNCTION,
    },
  },
  zksync: {
    facts: {
      address: "A 0x address, the same one your vault uses on every EVM chain.",
      fee: "Paid in ETH.",
      notes: ["zkSync swaps route through 1inch and LI.FI."],
    },
    overrides: { faq: { tokens: NO_AUTO_ERC20_FAQ } },
  },

  // UTXO
  btc: {
    facts: {
      address: "A Native SegWit (bech32) address that starts with bc1q.",
      fee: "Paid in BTC, priced per byte of transaction size.",
      notes: ["BTC swaps route natively through THORChain and MayaChain, with no wrapped BTC."],
    },
  },
  bch: {
    facts: {
      address: "A CashAddr address, shown without the bitcoincash: prefix, so it starts with q.",
      fee: "Paid in BCH.",
      notes: ["BCH swaps route natively through THORChain."],
    },
  },
  ada: {
    facts: {
      address: "A Shelley enterprise address that starts with addr1v. It carries no staking part.",
      fee: "Paid in ADA.",
      notes: ["Cardano requires every output to carry a minimum amount of ADA, so very small sends aren't possible."],
    },
    overrides: { hiddenActions: NO_SWAP_OR_FUNCTION },
  },
  dash: {
    facts: {
      address: "A base58 address that starts with X.",
      fee: "Paid in DASH.",
      notes: ["DASH swaps route through MayaChain."],
    },
  },
  doge: {
    facts: {
      address: "A base58 address that starts with D.",
      fee: "Paid in DOGE.",
      notes: ["DOGE swaps route natively through THORChain."],
    },
  },
  ltc: {
    facts: {
      address: "A Native SegWit (bech32) address that starts with ltc1q.",
      fee: "Paid in LTC.",
      notes: ["LTC swaps route natively through THORChain."],
    },
  },
  zec: {
    facts: {
      address: "A transparent address that starts with t1. Vultisig doesn't use shielded addresses.",
      fee: "Paid in ZEC, under Zcash's ZIP-317 fee rules.",
      notes: ["ZEC swaps route natively through THORChain and MayaChain."],
    },
  },

  // Cosmos
  akt: {
    facts: {
      address: "A bech32 address that starts with akash1.",
      fee: "Paid in AKT.",
      notes: ["On-chain, AKT is held in the uakt denomination: 1 AKT is 1,000,000 uakt."],
    },
    overrides: { faq: { stake: NO_STAKING_FAQ }, hiddenActions: NO_SWAP_OR_FUNCTION },
  },
  atom: {
    facts: {
      address: "A bech32 address that starts with cosmos1.",
      fee: "Paid in ATOM.",
      notes: [
        "ATOM swaps route natively through THORChain.",
        "Move ATOM between Cosmos Hub and Osmosis with an IBC transfer.",
      ],
    },
    overrides: {
      heroBody:
        "Hold and send ATOM, swap it natively through THORChain, and move it between Cosmos Hub and Osmosis over IBC. Every transaction requires your device threshold to approve it, not one exposed private key.",
      features: THORCHAIN_SWAP_FEATURES,
      faq: { stake: NO_STAKING_FAQ },
      extraFaq: THORCHAIN_SWAP_FAQ,
    },
  },
  cacao: {
    facts: {
      address: "A bech32 address that starts with maya1, derived from the same key as your vault's THORChain address.",
      fee: "Paid in CACAO.",
      notes: [
        "Stake CACAO in the MayaChain CACAO pool, or bond it, from the vault.",
        "CACAO swaps route natively through MayaChain.",
      ],
    },
    overrides: {
      heroBody:
        "Hold and send CACAO, swap it natively through MayaChain, and stake it in the CACAO pool. Every transaction requires your device threshold to approve it, not one exposed private key.",
      faq: {
        stake: {
          question: "Can I stake CACAO from my vault?",
          answer:
            "Yes. Add CACAO to the MayaChain CACAO pool or bond it from the vault, each action approved by your device threshold.",
        },
      },
    },
  },
  dydx: {
    facts: {
      address: "A bech32 address that starts with dydx1.",
      fee: "Paid in DYDX.",
      notes: ["DYDX uses 18 decimal places on-chain, where most Cosmos tokens use 6."],
    },
    overrides: { faq: { stake: NO_STAKING_FAQ }, hiddenActions: NO_SWAP_OR_FUNCTION },
  },
  noble: {
    facts: {
      address: "A bech32 address that starts with noble1.",
      fee: "Paid in USDC. Noble has no separate gas token.",
      notes: ["Noble's native asset is USDC."],
    },
    overrides: { faq: { stake: NO_STAKING_FAQ }, hiddenActions: NO_SWAP_OR_FUNCTION },
  },
  osmo: {
    facts: {
      address: "A bech32 address that starts with osmo1.",
      fee: "Paid in OSMO.",
      notes: ["Move OSMO between Osmosis and Cosmos Hub with an IBC transfer."],
    },
    overrides: {
      heroBody:
        "Hold and send OSMO, and move it between Osmosis and Cosmos Hub over IBC. Every transaction requires your device threshold to approve it, not one exposed private key.",
      faq: { stake: NO_STAKING_FAQ },
      hiddenActions: ["Swap"],
    },
  },
  rune: {
    facts: {
      address: "A bech32 address that starts with thor1.",
      fee: "Paid in RUNE.",
      notes: [
        "Bond and stake RUNE from the vault.",
        "Swaps settle natively on THORChain, with no wrapped assets.",
      ],
    },
    overrides: {
      heroBody:
        "Hold, send, bond and stake RUNE, and swap natively across chains through THORChain. Every transaction requires your device threshold to approve it, not one exposed private key.",
      features: THORCHAIN_SWAP_FEATURES,
      faq: {
        stake: {
          question: "Can I stake RUNE from my vault?",
          answer:
            "Yes. Bond and stake RUNE from the vault, each action approved by your device threshold rather than a single private key.",
        },
      },
      extraFaq: THORCHAIN_SWAP_FAQ,
    },
  },
  luna: {
    facts: {
      address: "A bech32 address that starts with terra1. Terra and Terra Classic share the same address in your vault.",
      fee: "Paid in LUNA.",
      notes: ["Stake LUNA from the vault: delegate, undelegate, redelegate and claim rewards."],
    },
    overrides: {
      heroBody:
        "Hold, send and stake LUNA from the same vault as every other chain. Every transaction requires your device threshold to approve it, not one exposed private key.",
      faq: {
        stake: {
          question: "Can I stake LUNA from my vault?",
          answer:
            "Yes. Delegate, undelegate, redelegate and claim rewards from the vault, each action approved by your device threshold.",
        },
      },
      hiddenActions: ["Swap"],
    },
  },
  lunc: {
    facts: {
      address: "A bech32 address that starts with terra1. Terra and Terra Classic share the same address in your vault.",
      fee: "Paid in LUNC, plus Terra Classic's on-chain tax where it applies.",
      notes: ["Stake LUNC from the vault: delegate, undelegate, redelegate and claim rewards."],
    },
    overrides: {
      heroBody:
        "Hold, send and stake LUNC from the same vault as every other chain. Every transaction requires your device threshold to approve it, not one exposed private key.",
      faq: {
        stake: {
          question: "Can I stake LUNC from my vault?",
          answer:
            "Yes. Delegate, undelegate, redelegate and claim rewards from the vault, each action approved by your device threshold.",
        },
      },
      hiddenActions: ["Swap"],
    },
  },

  // Their own architecture
  tao: {
    facts: {
      address: "An SS58 address with network prefix 42, so it starts with 5.",
      fee: "Paid in TAO.",
      notes: ["Bittensor accounts keep a small existential deposit, so a balance can't be sent down to exactly zero."],
    },
    overrides: { hiddenActions: NO_SWAP_OR_FUNCTION },
  },
  dot: {
    facts: {
      address: "An SS58 address with network prefix 0, so it starts with 1.",
      fee: "Paid in DOT.",
      notes: ["Polkadot accounts must keep a minimum balance, the existential deposit, or the network removes them."],
    },
    overrides: { hiddenActions: NO_SWAP_OR_FUNCTION },
  },
  xrp: {
    facts: {
      address: "A classic XRP Ledger address that starts with r.",
      fee: "Paid in XRP.",
      notes: [
        "The XRP Ledger reserves part of every balance: a base reserve, plus 0.2 XRP for each trust line or other object you own.",
        "XRP swaps route natively through THORChain.",
      ],
    },
  },
  sol: {
    facts: {
      address: "A base58 Solana address, derived with Ed25519.",
      fee: "Paid in SOL.",
      notes: ["Solana swaps route through THORChain, Jupiter and LI.FI."],
    },
  },
  sui: {
    facts: {
      address: "A 0x address of 64 hex characters (32 bytes), derived with Ed25519.",
      fee: "Paid in SUI.",
      notes: ["Sui identifies every coin by its full coin type rather than a contract address."],
    },
    overrides: { hiddenActions: NO_SWAP_OR_FUNCTION },
  },
  ton: {
    facts: {
      address: "A standard TON wallet address.",
      fee: "Paid in GRAM.",
      notes: ["The TON network's coin is GRAM; the apps label the network TON (GRAM)."],
    },
    overrides: { hiddenActions: NO_SWAP_OR_FUNCTION },
  },
  trx: {
    facts: {
      address: "A base58 address that starts with T.",
      fee: "Paid with Tron bandwidth and energy, burned as TRX when you don't hold enough of either.",
      notes: ["TRX swaps route natively through THORChain."],
    },
  },
}
