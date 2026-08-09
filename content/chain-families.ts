import { CHAINS, type Chain, type ChainCategory } from "./chains"

export type Feature = {
  title: string
  body: string
  /**
   * `public/v5/chains/<icon>.svg`. The three illustrations are positional
   * rather than per-feature — Figma reuses the same trio down every family's
   * column — and have no export yet, so the slot renders empty until they land.
   */
  icon?: string
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
  /** The asset the shared action copy speaks about. */
  asset: string
  hero: { title: string; body: string; cta: string }
  vaultView: { title: string; body: string; features: Feature[] }
  faq: { title: string; items: FaqEntry[] }
  meta: { title: string; description: string }
  /** Matched against article titles and tags for the closing rail. */
  articleTerms: string[]
  /**
   * Each family carries its own accent, taken from the chain the Figma frame
   * was drawn around: `panel` fills the FAQ card, `heroTint` the wash behind
   * the hero device. Only Cosmos is measured — its frame is the one the API
   * returned before the file endpoint rate-limited. The other two are matched
   * to the hero art and want confirming against Figma.
   */
  accent: { panel: string; heroTint: string }
}

/**
 * The three families the chains index filters to, each with its own page.
 *
 * Figma draws this template per chain — its frames are Bitcoin, Ethereum and
 * THORChain, and the copy names RUNE and ETH directly. These pages cover a
 * family instead, so the chain-specific lines are widened to the family and the
 * feature cards keep the ones that hold for every chain in it. Worth a
 * copywriter's pass before launch; the structure is Figma's, the wording is not.
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
    asset: "ETH",
    hero: {
      title: "Hold EVM chains without holding a single key",
      body: "Send ETH, swap tokens, and call smart contracts across every EVM network Vultisig supports. Every transaction needs your device threshold to approve it, not one exposed private key.",
      cta: "Add an EVM chain to your vault",
    },
    vaultView: {
      title: "Your ETH and tokens, in one vault view",
      body: "ERC-20 balances sit alongside native ETH in the same vault. No separate wallet needed for tokens, and no separate key to protect.",
      features: [
        {
          title: "EVM signing",
          body: "Standard secp256k1 transaction signing, compatible with every EVM tool and explorer.",
        },
        {
          title: "Smart contract calls",
          body: "Approve, stake, or interact with dApps directly, with the same threshold approval as a send.",
        },
        {
          title: "Token support",
          body: "ERC-20 balances display natively alongside ETH, no separate import step.",
        },
      ],
    },
    faq: {
      title: "EVM chains on Vultisig, answered",
      items: [
        {
          question: "Can I use Vultisig to interact with dApps on Ethereum?",
          answer:
            "Yes. Vultisig supports smart contract calls, so you can approve, stake, or interact with supported dApps directly from your vault. The call is approved by your device threshold, exactly like a transfer.",
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
            "Not to hold or receive. Every supported L2 is a chain in the same vault, so you can receive and send on it directly. Bridging is only relevant when you want to move funds between chains, and Vultisig's swap can often do that without a separate bridge app.",
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
    accent: { panel: "#4879FD", heroTint: "#DEE5FF" },
  },
  {
    slug: "utxo",
    category: "utxo",
    name: "UTXO chains",
    asset: "BTC",
    hero: {
      title: "Hold UTXO chains without holding a single key",
      body: "No seed phrase. No custodian. Your BTC is split across your own devices using MPC, and it takes your threshold to move a single sat.",
      cta: "Add Bitcoin to your vault",
    },
    vaultView: {
      title: "Your BTC, in one vault view",
      body: "The same interface as every other asset in Vultisig. Balance, address and history, backed by your device threshold instead of a private key sitting on one phone.",
      features: [
        {
          title: "Native SegWit addresses",
          body: "Lower fees, and standard compatibility with every BTC service you already use.",
        },
        {
          title: "UTXO-aware signing",
          body: "Vultisig selects and signs inputs the same way a single-key wallet would. Nothing about the chain logic changes.",
        },
        {
          title: "Fast Vault & Secure Vault",
          body: "Use 1-of-2 for daily spending, or 2-of-3 for cold storage of larger holdings.",
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
          question: "Is my Bitcoin address a normal Bitcoin address?",
          answer:
            "Yes. Vultisig produces standard native SegWit addresses. Anyone can send to it from any wallet or exchange, and it appears on every block explorer like any other address.",
        },
        {
          question: "What happens to my Bitcoin if I lose a device?",
          answer:
            "Nothing, as long as you can still meet your threshold. A 2-of-3 vault keeps working with two devices, and you can re-share to a replacement device without moving funds or restoring a seed phrase.",
        },
        {
          question: "Which UTXO chains does Vultisig support?",
          answer:
            "Bitcoin, Bitcoin Cash, Litecoin, Dogecoin, Dash, Zcash and Cardano are all held in the same vault, alongside every other chain Vultisig supports.",
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
    accent: { panel: "#F7931A", heroTint: "#FCEBD8" },
  },
  {
    slug: "cosmos",
    category: "cosmos",
    name: "Cosmos chains",
    asset: "ATOM",
    hero: {
      title: "Hold Cosmos chains without holding a single key",
      body: "ATOM, RUNE, OSMO and the rest of the Cosmos SDK chains live in one vault. Stake, transfer over IBC, or settle a native cross-chain swap, each approved by your device threshold.",
      cta: "Add a Cosmos chain to your vault",
    },
    vaultView: {
      title: "Your Cosmos assets, in one vault view",
      body: "Cosmos chains behave like any other asset in your vault — and THORChain and MayaChain double as the settlement layer for every native swap you run through Vultisig.",
      features: [
        {
          title: "Native cross-chain swaps",
          body: "THORChain and MayaChain settle swaps between chains natively, with no bridge and no wrapped assets.",
        },
        {
          title: "Staking and delegation",
          body: "Delegate to validators and manage rewards from the vault, approved by the same threshold as a send.",
        },
        {
          title: "IBC-ready accounts",
          body: "Standard Cosmos SDK accounts and bech32 addresses, compatible with the explorers and services you already use.",
        },
      ],
    },
    faq: {
      title: "Cosmos chains on Vultisig, answered",
      items: [
        {
          question: "Can I stake my Cosmos assets from Vultisig?",
          answer:
            "Yes. Delegation and reward management run from the vault, and each action is approved by your device threshold rather than a single private key.",
        },
        {
          question: "How do native swaps work without a bridge?",
          answer:
            "THORChain and MayaChain hold liquidity on each chain and settle between them natively, so a swap moves real assets rather than minting a wrapped token. Vultisig routes swaps through them directly from your vault.",
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
        {
          question: "Is RUNE needed to swap through Vultisig?",
          answer:
            "No. RUNE is the settlement asset THORChain uses under the hood, but you do not have to hold it to swap. You choose the assets on each side and Vultisig handles the route.",
        },
      ],
    },
    meta: {
      title: "Cosmos Wallet — Hold ATOM, RUNE & OSMO Without a Seed Phrase",
      description:
        "Hold Cosmos SDK chains in one MPC vault. Stake, transfer over IBC and settle native cross-chain swaps through THORChain — every action approved by your device threshold.",
    },
    articleTerms: ["cosmos", "thorchain", "rune", "osmosis", "atom", "ibc"],
    accent: { panel: "#13C89D", heroTint: "#D6F5EC" },
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
