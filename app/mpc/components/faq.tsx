import { supportedChainCountLabel } from "@/content/chain-count"
import FaqSection from "@/components/ui/faq-section"

type MpcFaqItem = {
  question: string
  answer: string
}

const FAQ_ITEMS: MpcFaqItem[] = [
  {
    question: "What happens if I lose one of my devices?",
    answer:
      "Your vault uses a threshold model (e.g., 2-of-3), meaning you only need a subset of your devices to recover full access. If you lose one device, your remaining devices can re-share the vault to a new replacement device. No seed phrase needed, no company to contact. As long as you meet the threshold, your funds are safe.",
  },
  {
    question: "What is an MPC wallet?",
    answer:
      "An MPC (Multi-Party Computation) wallet is a crypto wallet that splits your private key into multiple shares distributed across separate devices. When you sign a transaction, these devices compute the signature together without ever combining the key shares into a single private key. This eliminates the single point of failure that makes traditional wallets vulnerable to theft, phishing, and human error.",
  },
  {
    question: "How is MPC different from a multisig wallet?",
    answer:
      "Multisig wallets require multiple separate on-chain signatures, which means higher gas fees, limited chain compatibility, and visible multi-party transaction structures. MPC wallets perform all the multi-party computation off-chain and produce a single standard signature. This means lower fees, compatibility with any blockchain that supports standard signatures, and no on-chain footprint revealing your security setup.",
  },
  {
    question: "Is TSS the same as MPC?",
    answer:
      "TSS (Threshold Signature Scheme) is a specific application of MPC focused on generating digital signatures. MPC is the broader cryptographic field; TSS is the part Vultisig uses. Vultisig implements the DKLS23 threshold ECDSA protocol and EdDSA extension, which is a modern TSS scheme optimized for speed and security across consumer devices.",
  },
  {
    question: "Can Vultisig recover my wallet if all devices are lost?",
    answer:
      "No. Vultisig can never sign or recover a vault on its own. In a Secure Vault, every share is on your devices; in a Fast Vault, VultiServer holds one share and emails you an encrypted copy, but it still needs your device's share. To protect against losing every device, export each device's backup file and store the files in separate places, or use a 2-of-3 vault with one device kept as a backup.",
  },
  {
    question: "Does Vultisig charge fees?",
    answer:
      "Vultisig is free to download and use, with no subscription and no premium tiers. Sending pays only the network fee. Swaps carry a 0.50% Vultisig fee, which drops to as low as 0% for $VULT holders.",
  },
  {
    question: "Which blockchains does Vultisig support?",
    answer:
      `Vultisig supports ${supportedChainCountLabel} blockchains including Bitcoin, Ethereum, Solana, THORChain, Cosmos, Polygon, Avalanche, Arbitrum, Optimism, BNB Chain, Polkadot, Cardano, and more. All chains are supported from a single vault. No need to create separate wallets or manage multiple seed phrases for different networks.`,
  },
  {
    question: "Is an MPC wallet safe?",
    answer:
      "MPC wallets are considered one of the most secure approaches to crypto custody. By eliminating the single private key, they remove the most exploited attack vector in crypto theft. Vultisig adds additional security layers: open-source code for public verification, the DKLS23 protocol in an implementation audited by Trail of Bits, and a self-custodial design in which Vultisig can never move your funds.",
  },
  {
    question: "What are the risks of MPC wallets?",
    answer:
      "The primary risk with most MPC wallets is vendor dependency. Many MPC providers hold one key share on their servers, creating a single point of failure if the company is compromised or shuts down. In a Vultisig Secure Vault, every key share lives on your own devices, so no company is involved at all. In a Fast Vault, VultiServer co-signs, and its share is emailed to you so recovery never depends on Vultisig. The risk that remains is losing enough devices and backups to fall below your vault threshold, which is why each device exports a backup file.",
  },
  {
    question: "MPC wallet vs hardware wallet: Which is more secure?",
    answer:
      "Hardware wallets protect your key with a dedicated secure chip, but your entire private key still exists in one place. If the device is lost, stolen, or compromised, you depend on a seed phrase: The same single point of failure MPC eliminates. MPC wallets distribute key material across multiple devices, so no single device compromise can access your funds. Vultisig combines MPC security with the convenience of using devices you already own.",
  },
  {
    question: "Do MPC wallets have seed phrases?",
    answer:
      "Not in Vultisig. Your vault is secured entirely through key shares across your devices, so there is no seed phrase to write down, store, lose, or have stolen. Each device exports its own backup file, and a lost device is replaced by re-sharing from your remaining devices.",
  },
  {
    question: "Can I use Vultisig for DeFi and swaps?",
    answer:
      "Yes. Vultisig supports native in-app swaps via THORChain and 1inch, plus full DeFi interaction through the Vultisig web extension. Because MPC transactions look identical to standard transactions on-chain, Vultisig is compatible with every DeFi protocol, DEX, and dApp that works with regular wallet signatures.",
  },
  {
    question: "How is Vultisig different from ZenGo?",
    answer:
      `Both are MPC wallets without seed phrases, but the architectures differ. ZenGo holds one key share on its servers, and that share signs every transaction. Vultisig's Secure Vault keeps every share on your own devices with no server in the signing loop, and its Fast Vault emails you a copy of the server's share. Vultisig is also free, open source, and supports ${supportedChainCountLabel} chains compared to ZenGo's more limited selection.`,
  },
  {
    question: "Is Vultisig really free? What's the catch?",
    answer:
      "There is no catch. Vultisig is fully free and open source. There are no premium tiers, no subscription fees. The Vultisig codebase is publicly auditable on GitHub. Revenue comes from optional services and integrations like swap fees or plugins, not from charging users for basic wallet security.",
  },
]

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

export default function MpcFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <FaqSection
        className="py-9 md:py-[60px]"
        items={FAQ_ITEMS}
        aside={
          <h2
            id="faq"
            className="text-v5-hero-sm font-medium text-v5-text-inverse v5wide:w-[476px] v5wide:shrink-0 v5wide:text-v5-faq-title"
          >
            Frequently Asked Questions
          </h2>
        }
      />
    </>
  )
}
