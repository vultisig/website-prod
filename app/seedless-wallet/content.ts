import type { ComparisonTableProps } from "@/app/mpc/components/comparison-table"
import type { MpcFaqItem } from "@/app/mpc/components/faq"
import type { HeroProps } from "@/app/mpc/components/hero"
import type { Explainer } from "@/app/mpc/components/what-is-mpc"
import { supportedChainCountLabel } from "@/content/chain-count"

export const HERO: HeroProps = {
  title: "The Seedless Wallet With No Single Point of Failure",
  body: "No seed phrase to write down, store, or lose. Vultisig splits signing power into key shares with threshold signatures, so there is no single secret for anyone to steal.",
}

export const EXPLAINERS: Explainer[] = [
  {
    title: "No Seed Phrase",
    body: "A seedless wallet lets you hold and use crypto without a 12- or 24-word recovery phrase. In Vultisig, the full private key is never created at all. There is no master secret to write down, store, or have phished.",
    image: {
      src: "/v5/mpc-what-key-never-exists.webp",
      alt: "A shield in a glass tile wired to two blue key-share tiles",
    },
  },
  {
    title: "Backups You Control",
    body: "Instead of one seed phrase, each device holds a key share and exports its own backup file. Store the files wherever you choose: iCloud, Google Drive, Dropbox, or offline. A single share can't sign on its own.",
    image: {
      src: "/v5/mpc-what-distributed.webp",
      alt: "Stacked device cards labelled MacBook connected, iPhone this device, and one still waiting",
    },
  },
  {
    title: "Two Kinds of Seedless",
    body: "Some seedless wallets move the single key somewhere else: onto a card, behind a social login, or into a cloud account.\nMPC wallets like Vultisig never create the single key in the first place. Nothing to move, nothing to steal.",
    image: {
      src: "/v5/mpc-what-key-difference.webp",
      alt: "A honeycomb of hexagon tiles, three of them holding key, shield and signature glyphs",
    },
  },
]

export const COMPARISON: ComparisonTableProps = {
  title: "Not All Seedless Wallets Are Equal",
  othersLabel: "Other Seedless Wallets",
  caption:
    "Vultisig compared with other seedless wallets across private key, signing, recovery, custody, cost, chains and source code",
  footnote:
    "* Comparison based on typical seedless wallet offerings as of November 2026",
  rows: [
    {
      feature: "Private key",
      others: "One key on a card, login, or server",
      vultisig: "Never exists in one place",
    },
    {
      feature: "Signing",
      others: "One device or one company",
      vultisig: "Threshold of key shares",
    },
    {
      feature: "Recovery Model",
      others: "Depends on a company or cloud login",
      vultisig: "Your own backup files",
    },
    {
      feature: "Custody model",
      others: "Hybrid / delegated",
      vultisig: "Fully self-custodial",
    },
    {
      feature: "Cost",
      others: "Hardware purchase or subscription",
      vultisig: "Free",
    },
    {
      feature: "Chains",
      others: "Limited selection",
      vultisig: `${supportedChainCountLabel} blockchains`,
    },
    {
      feature: "Source code",
      others: "Proprietary / closed",
      vultisig: "100% open source",
    },
  ],
}

/** Visible FAQ and FAQPage JSON-LD; each answer is one string for both. */
export const FAQ_ITEMS: MpcFaqItem[] = [
  {
    question: "What is a seedless wallet?",
    answer:
      "A seedless wallet is a crypto wallet that doesn't ask you to write down a 12- or 24-word seed phrase. Vultisig is a seedless MPC wallet: your private key is split into key shares, held on your devices or, in a Fast Vault, on your device and Vultiserver. The full key is never created, stored, or exposed.",
  },
  {
    question: "Are seedless wallets safe?",
    answer:
      "It depends on where the key goes. Some seedless wallets keep one full key on a card, behind a social login, or with a company server, and that becomes the new single point of failure. Vultisig removes the single key entirely. Every transaction needs a threshold of key shares, so no single share, whether in a leaked backup file or on a server, can move your funds on its own.",
  },
  {
    question: "How do I back up a seedless wallet?",
    answer:
      "Each device in your Vultisig vault exports its own backup file. Save each file in a different place, such as iCloud, Google Drive, Dropbox, or offline storage. Because each file holds only one key share, a single backup can't sign transactions on its own.",
  },
  {
    question: "What happens if I lose my phone?",
    answer:
      "Import that device's backup file on a new phone to regain access. If your remaining devices meet your vault threshold, they can also re-share the vault to a replacement device. No seed phrase needed, no company to contact.",
  },
  {
    question: "Can Vultisig recover my wallet for me?",
    answer:
      "No. Vultisig can never sign or recover a vault on its own, which is what keeps it fully self-custodial. In a Secure Vault, every key share lives on your devices. In a Fast Vault, Vultiserver co-signs and emails you an encrypted copy of its share, so recovery never depends on Vultisig.",
  },
  {
    question: "What's the difference between Fast Vault and Secure Vault?",
    answer:
      "Fast Vault pairs one of your devices with Vultiserver as an automatic second signer, built for daily spending and smaller amounts. Secure Vault splits signing across two or more of your own devices, built for long-term holdings and larger amounts. Both are seedless.",
  },
  {
    question: "Seedless wallet vs hardware wallet: Which is more secure?",
    answer:
      "A hardware wallet guards one private key on one device, and that key is still backed by a seed phrase. If the phrase is exposed, anyone can rebuild your wallet without ever touching the device. A seedless MPC wallet like Vultisig splits the key into shares held by separate signers, so there is no single phrase whose exposure hands over your funds.",
  },
  {
    question: "Which blockchains does Vultisig support?",
    answer: `Vultisig supports ${supportedChainCountLabel} blockchains, including Bitcoin, Ethereum, Solana, THORChain, Cosmos, and BNB Chain. Every chain runs from a single seedless vault, so there are no separate wallets or phrases per network.`,
  },
  {
    question: "Is Vultisig free?",
    answer:
      "Yes. Vultisig is free to download and use, with no subscription and no premium tiers. Sending pays only the network fee. Swaps carry a 0.50% Vultisig fee, which drops to as low as 0% for $VULT holders.",
  },
]
