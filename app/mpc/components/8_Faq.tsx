import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Heading from "./Heading"
import { cn, MOTION_CONSTANTS } from "@/lib/utils"

const FAQ_ITEMS = [
  {
    question: "What happens if I lose one of my devices?",
    answer:
      "Your vault uses a threshold model (e.g., 2-of-3), meaning you only need a subset of your devices to recover full access. If you lose one device, your remaining devices can re-share the vault to a new replacement device. No seed phrase needed, no company to contact. As long as you meet the threshold, your funds are safe.",
  },
  {
    question: "What is an MPC wallet",
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
      "Vultisig does not hold any of your key shares, so we cannot recover your vault. This is by design: True self-custody means no third party has access. To protect against total device loss, we recommend using a 2-of-3 vault configuration where your third share is stored on a secure backup device kept in a separate location. You can also export encrypted vault backups.",
  },
  {
    question: "Does Vultisig charge fees?",
    answer:
      "Vultisig is free to download and use. There are no subscription fees, no premium tiers, and no per-transaction charges from Vultisig. The only fees you pay are swap fees, going to Vultisigs token $VULT or standard blockchain network fees (gas fees) which go to network validators.",
  },
  {
    question: "Which blockchains does Vultisig support?",
    answer:
      "Vultisig supports 30+ blockchains including Bitcoin, Ethereum, Solana, THORChain, Cosmos, Polygon, Avalanche, Arbitrum, Optimism, BNB Chain, Polkadot, Cardano, and more. All chains are supported from a single vault. No need to create separate wallets or manage multiple seed phrases for different networks.",
  },
  {
    question: "Is an MPC wallet safe?",
    answer:
      "MPC wallets are considered one of the most secure approaches to crypto custody. By eliminating the single private key, they remove the most exploited attack vector in crypto theft. Vultisig adds additional security layers: open-source code for public verification, independent security audits, the modern DKLS23 protocol, and a fully self-custodial architecture where no company holds any key material.",
  },
  {
    question: "What are the risks of MPC wallets?",
    answer:
      "The primary risk with most MPC wallets is vendor dependency. Many MPC providers hold one key share on their servers, creating a single point of failure if the company is compromised or shuts down. Vultisig eliminates this risk entirely: All key shares live on your own devices. The only risk is losing enough devices or backups to fall below your vault threshold, which is why we recommend 2-of-3 configurations with a secure backup device.",
  },
  {
    question: "MPC wallet vs hardware wallet: Which is more secure?",
    answer:
      "Hardware wallets protect your key with a dedicated secure chip, but your entire private key still exists in one place. If the device is lost, stolen, or compromised, you depend on a seed phrase : The same single point of failure MPC eliminates. MPC wallets distribute key material across multiple devices, so no single device compromise can access your funds. Vultisig combines MPC security with the convenience of using devices you already own.",
  },
  {
    question: "Do MPC wallets have seed phrases?",
    answer:
      "Most MPC wallets still generate a seed phrase as a backup mechanism. Vultisig does not. Your vault is secured entirely through distributed key shares across your devices. There is no seed phrase to write down, store, lose, or have stolen. Recovery is handled through threshold-based re-sharing using your remaining devices.",
  },
  {
    question: "Can I use Vultisig for DeFi and swaps?",
    answer:
      "Yes. Vultisig supports native in-app swaps via THORChain and 1inch, plus full DeFi interaction through the Vultisig web extension. Because MPC transactions look identical to standard transactions on-chain, Vultisig is compatible with every DeFi protocol, DEX, and dApp that works with regular wallet signatures.",
  },
  {
    question: "How is Vultisig different from ZenGo?",
    answer:
      "Both are MPC wallets without seed phrases, but the architectures differ. ZenGo holds one key share on their servers: If ZenGo goes down, recovery depends on their infrastructure. Vultisig is fully self-custodial: all key shares live on your devices with zero server dependency. Vultisig is also free, open source, and supports 30+ chains compared to ZenGo's more limited selection.",
  },
  {
    question: "Is Vultisig really free? What's the catch?",
    answer:
      "There is no catch. Vultisig is fully free and open source. There are no premium tiers, no subscription fees. The Vultisig codebase is publicly auditable on GitHub. Revenue comes from optional services and integrations like swap fees or plugins, not from charging users for basic wallet security.",
  },
]

export default function Faq() {
  return (
    <section className="px-6 md:px-20 py-20 max-w-4xl mx-auto" id="faq">
      <Heading className="mb-12">Frequently Asked Questions</Heading>
      <Accordion type="multiple" className="w-full space-y-3">
        {FAQ_ITEMS.map((item, idx) => (
          <AccordionItem
            key={item.question}
            value={`item-${item.question}`}
            className={cn(
              "border border-borderLight bg-backgroundSecondary/70 rounded-lg px-6",
              "intersect-once intersect:motion-preset-slide-up-md",
            )}
            style={
              {
                "--motion-delay": `${idx * MOTION_CONSTANTS.delayBetween}ms`,
              } as React.CSSProperties
            }
          >
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-textSecondary">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
