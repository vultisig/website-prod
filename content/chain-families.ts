import { CHAINS, type Chain, type ChainCategory } from "./chains"

export type Feature = {
  title: string
  body: string
  /**
   * `public/v5/chains/<icon>.svg`. The illustrations are positional rather than
   * per-feature — Figma reuses the same trio down every family's column.
   */
  icon: string
}

export type FaqEntry = {
  question: string
  answer: string
}

export type ChainFamily = {
  /** URL segment: /chains/<slug>. */
  slug: string
  /** Ties the page to the chips on the chains index. */
  category: ChainCategory
  /** Reads inside headings — "EVM chains", "UTXO chains". */
  name: string
  /** The chain the Figma frame was drawn around, for the closing heading. */
  chainLabel: string
  /** The asset the shared action copy speaks about. */
  asset: string
  hero: { title: string; body: string; cta: string }
  vaultView: { title: string; body: string; features: Feature[] }
  faq: { title: string; items: FaqEntry[] }
  meta: { title: string; description: string }
  /** Matched against article titles and tags for the closing rail. */
  articleTerms: string[]
  /**
   * `public/v5/chains/hero-<slug>.webp`, exported from the frame's hero group.
   * The wash behind the device is part of the artwork — the card under it is
   * plain white on all three frames — so the family's colour arrives with the
   * image rather than as a fill.
   */
  heroArt: string
}

/**
 * The three families the chains index filters to, each with its own page.
 *
 * Copy is Figma's, read from the Ethereum, Bitcoin and THORChain frames. Two
 * places depart from it deliberately:
 *
 * - Every frame's second and third FAQ answers are the same two paragraphs of
 *   unrelated boilerplate ("Vultisig offers enhanced security with…"), left
 *   over from another accordion. The questions are real, so they are kept and
 *   answered properly. The last two questions on each page are additions.
 * - Its Ethereum button reads "Add Etherium to your Vault".
 *
 * Each frame speaks for one chain while these pages cover its family, which
 * mostly reads fine — ETH for EVM, BTC for UTXO — but leaves the Cosmos page
 * talking about RUNE specifically. Worth a copywriter's pass.
 *
 * L2s stay a filter on the index rather than a fourth page. Every L2 Vultisig
 * supports is also an EVM chain and signs identically — same curve, same
 * address, same threshold — so the page would restate the EVM one closely
 * enough to compete with it in search rather than add reach.
 */
export const CHAIN_FAMILIES: ChainFamily[] = [
  {
    slug: "evm",
    category: "evm",
    name: "EVM chains",
    chainLabel: "Ethereum",
    asset: "ETH",
    heroArt: "hero-evm",
    hero: {
      title: "Hold EVM chains without holding a single key",
      body: "Send ETH, swap tokens, and call smart contracts. Every transaction requires your device threshold to approve it, not one exposed private key.",
      cta: "Add Ethereum to your Vault",
    },
    vaultView: {
      title: "Your ETH and tokens, in one vault view",
      body: "ERC-20 balances sit alongside native ETH in the same vault. No separate wallet needed for tokens.",
      features: [
        {
          title: "EVM signing",
          body: "Standard secp256k1 transaction signing, compatible with every EVM tool and explorer.",
          icon: "feature-1",
        },
        {
          title: "Smart contract calls",
          body: "Approve, stake, or interact with dApps directly, with the same threshold approval as a send.",
          icon: "feature-2",
        },
        {
          title: "Token support",
          body: "ERC-20 balances display natively alongside ETH, no separate import step.",
          icon: "feature-3",
        },
      ],
    },
    faq: {
      title: "Ethereum on Vultisig, answered",
      items: [
        {
          question: "Can I use Vultisig to interact with dApps on Ethereum?",
          answer:
            "Yes. Vultisig supports smart contract calls, so you can approve, stake, or interact with supported dApps directly from your vault.",
        },
        {
          question: "Do ERC-20 tokens show up automatically?",
          answer:
            "Yes. ERC-20 balances display alongside native ETH in the same vault view, with no separate import or custom token step for supported tokens.",
        },
        {
          question: "Does Vultisig control my gas fees?",
          answer:
            "No. Gas is paid to the network, not to Vultisig, and you keep control of the fee on every transaction. Vultisig does not add a charge on top of network fees.",
        },
        {
          question: "Is the same address used across every EVM chain?",
          answer:
            "Yes. EVM chains share the secp256k1 curve and the same address derivation, so your vault presents one address across Ethereum, Arbitrum, Base, Optimism, Polygon and the rest.",
        },
        {
          question: "Do I need to bridge to use an L2?",
          answer:
            "Not to hold or receive. Every supported L2 is a chain in the same vault, so you can receive and send on it directly. Bridging only matters when moving funds between chains, and Vultisig's swap can often do that without a separate bridge app.",
        },
      ],
    },
    meta: {
      title:
        "EVM Wallet — Hold Ethereum, Arbitrum & Base Without a Seed Phrase",
      description:
        "Hold ETH, ERC-20 tokens and every EVM chain in one MPC vault. Smart contract calls and swaps approved by your device threshold — no seed phrase, no single private key.",
    },
    articleTerms: ["ethereum", "evm", "erc-20", "arbitrum", "base", "layer 2"],
  },
  {
    slug: "utxo",
    category: "utxo",
    name: "UTXO chains",
    chainLabel: "Bitcoin",
    asset: "BTC",
    heroArt: "hero-utxo",
    hero: {
      title: "Hold UTXO chains without holding a single key",
      body: "No seed phrase. No custodian. Your BTC is split across your own devices using MPC, and it takes your threshold to move a single sat.",
      cta: "Add Bitcoin to your Vault",
    },
    vaultView: {
      title: "Your BTC, in one vault view",
      body: "Same interface as every other asset in Vultisig. Balance, address, and history, backed by your device threshold instead of a private key sitting on one phone.",
      features: [
        {
          title: "Native SegWit addresses",
          body: "Lower fees, standard compatibility with every BTC service you already use.",
          icon: "feature-1",
        },
        {
          title: "UTXO-aware signing",
          body: "Vultisig selects and signs inputs the same way a single-key wallet would. Nothing about the chain logic changes.",
          icon: "feature-2",
        },
        {
          title: "Fast Vault & Secure Vault",
          body: "Use 1-of-2 for daily spending or 2-of-3 for cold storage of larger holdings.",
          icon: "feature-3",
        },
      ],
    },
    faq: {
      title: "Bitcoin on Vultisig, answered",
      items: [
        {
          question: "Do I need a hardware wallet to hold Bitcoin on Vultisig?",
          answer:
            "No. Vultisig splits your key across the devices you already own — phone, laptop, tablet. A hardware wallet is optional, not required.",
        },
        {
          question: "What address format does Vultisig use for Bitcoin?",
          answer:
            "Native SegWit. Anyone can send to it from any wallet or exchange, fees are lower than legacy formats, and it appears on every block explorer like any other address.",
        },
        {
          question:
            "Can I hold Bitcoin in a Secure Vault instead of a Fast Vault?",
          answer:
            "Yes. A Fast Vault is 1-of-2 for day-to-day spending; a Secure Vault is 2-of-3 and better suited to larger holdings. The same Bitcoin can live in either, and you choose per vault.",
        },
        {
          question: "What happens to my Bitcoin if I lose a device?",
          answer:
            "Nothing, as long as you can still meet your threshold. A 2-of-3 vault keeps working with two devices, and you can re-share to a replacement device without moving funds or restoring a seed phrase.",
        },
        {
          question: "Does MPC change how Bitcoin transactions work on-chain?",
          answer:
            "No. Threshold signing produces one ordinary signature, so the transaction is indistinguishable on-chain from a single-key one. There is no multisig script, no extra fee, and no on-chain trace of your security setup.",
        },
      ],
    },
    meta: {
      title: "Bitcoin MPC Wallet — Hold BTC, LTC & DOGE Without a Seed Phrase",
      description:
        "Hold Bitcoin and every UTXO chain in one MPC vault. Native SegWit addresses, standard on-chain transactions, and no seed phrase — your key is split across devices you already own.",
    },
    articleTerms: ["bitcoin", "btc", "utxo", "segwit", "litecoin"],
  },
  {
    slug: "cosmos",
    category: "cosmos",
    name: "Cosmos chains",
    chainLabel: "THORChain",
    asset: "RUNE",
    heroArt: "hero-cosmos",
    hero: {
      title: "Hold Cosmos chains without holding a single key",
      body: "RUNE settles every native cross-chain swap in Vultisig. Hold it, send it, or let it work quietly in the background every time you swap.",
      cta: "Add THORChain to your Vault",
    },
    vaultView: {
      title: "Your RUNE, in one vault view",
      body: "RUNE behaves like any other asset in your vault, but it's also the settlement layer for every swap you run through Vultisig.",
      features: [
        {
          title: "Native swap routing",
          body: "Every cross-chain swap in Vultisig: BTC to ETH, SOL to RUNE, settles through THORChain's liquidity.",
          icon: "feature-1",
        },
        {
          title: "No bridging step",
          body: "Swaps are routed natively, so there's no wrapped-asset or bridge-contract risk in the middle.",
          icon: "feature-2",
        },
        {
          title: "RUNE as an asset",
          body: "Hold and send RUNE directly, independent of its role in swap routing.",
          icon: "feature-3",
        },
      ],
    },
    faq: {
      title: "THORChain on Vultisig, answered",
      items: [
        {
          question: "Why does Vultisig use THORChain for swaps?",
          answer:
            "THORChain enables native cross-chain swaps without wrapping assets or routing through a bridge contract, which removes a common attack surface.",
        },
        {
          question: "Do I need RUNE to swap on Vultisig?",
          answer:
            "No. RUNE is the settlement asset THORChain uses under the hood, but you do not have to hold it. You choose the assets on each side and Vultisig handles the route.",
        },
        {
          question: "Can I stake RUNE from my vault?",
          answer:
            "Yes. Staking and delegation run from the vault, and each action is approved by your device threshold rather than a single private key.",
        },
        {
          question: "Which Cosmos SDK chains does Vultisig support?",
          answer:
            "Cosmos Hub, Osmosis, THORChain, MayaChain, Kujira, dYdX, Akash, Noble, Terra, Terra Classic and Sei are all held in the same vault.",
        },
        {
          question: "Do I get a standard Cosmos address?",
          answer:
            "Yes. Vultisig derives ordinary bech32 accounts for each chain, so your address works with every Cosmos explorer, IBC transfer and service as normal.",
        },
      ],
    },
    meta: {
      title: "Cosmos Wallet — Hold ATOM, RUNE & OSMO Without a Seed Phrase",
      description:
        "Hold Cosmos SDK chains in one MPC vault. Stake, transfer over IBC and settle native cross-chain swaps through THORChain — every action approved by your device threshold.",
    },
    articleTerms: ["cosmos", "thorchain", "rune", "osmosis", "atom", "ibc"],
  },
]

/**
 * Shared across the three pages. Figma leaves `[Chain]` in place for the family
 * to fill, so `{asset}` is substituted per page.
 *
 * The wallet routes "Function" to its deposit flow — staking, bonding, and the
 * chain-specific actions a plain transfer cannot express. Figma repeats the Send
 * description on that card, which reads as an unfinished line rather than an
 * intent, so it is described by what the button actually does.
 */
export const FAMILY_ACTIONS = [
  {
    label: "Swap",
    body: "Trade {asset} for any other supported asset. No bridge, no separate app.",
  },
  {
    label: "Send",
    body: "Transfer to any address. Signing happens across your device threshold.",
  },
  {
    label: "Buy",
    body: "Buy {asset} directly with a card or bank transfer, straight into your vault.",
  },
  {
    label: "Function",
    body: "Chain-specific actions like staking and deposits, approved by your threshold.",
  },
  {
    label: "Receive",
    body: "Share your address or QR code to receive funds into your vault.",
  },
]

/** Looks up a family by URL segment. */
export function getChainFamily(slug: string): ChainFamily | undefined {
  return CHAIN_FAMILIES.find((family) => family.slug === slug)
}

/** The chains this family covers, in the index's alphabetical order. */
export function chainsInFamily(family: ChainFamily): Chain[] {
  return CHAINS.filter((chain) => chain.categories.includes(family.category))
}
