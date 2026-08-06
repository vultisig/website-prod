import { GitBranch, Layers, Puzzle, ShieldCheck } from "lucide-react"

import CopyButton from "@/components/ui/copy-button"
import SectionHeading from "@/components/ui/section-heading"

const AGENT_TS = `import { VultisigSDK } from '@vultisig/sdk'

// Create a Fast Vault with agent co-signer
const vault = await VultisigSDK.createFastVault({
  parties: [userDevice, agentDevice],
  threshold: 2,
})

// Define agent policy — hard limits
const policy = await vault.setPolicy({
  dailyLimit: '500', // USD
  maxPerTx: '200',
  allowedChains: ['ethereum', 'bitcoin'],
  blockWithdrawals: true,
})

// Agent signs a transaction autonomously
const tx = await vault.signTransaction({
  chain: 'ethereum',
  type: 'swap',
  from: 'USDC',
  to: 'BTC',
  amount: '100',
  route: 'thorchain',
})`

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "DKLS23 threshold signatures",
    body: "Industry-leading MPC protocol. Fast Vault (2-of-2) for speed, Secure Vault (N-of-M) for maximum security.",
  },
  {
    icon: Puzzle,
    title: "Any AI framework",
    body: "Works with LangChain, AutoGPT, custom agents, or any autonomous system. No lock-in.",
  },
  {
    icon: Layers,
    title: "Full vault lifecycle APIs",
    body: "Vault creation, transaction signing, key resharing, policy enforcement - all in one SDK.",
  },
  {
    icon: GitBranch,
    title: "100% open source",
    body: "Full TypeScript, auditable, on GitHub. Build with confidence - no black boxes in your security stack.",
  },
]

export default function SdkOverview() {
  return (
    <section className="bg-v5-page px-4 pt-[30px] md:px-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-10 rounded-[20px] bg-v5-white px-4 py-10 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            title="Build agents with MPC-grade security."
            subtitle="TypeScript SDK for integrating MPC vault signing into any AI agent, bot, or automated workflow. From DCA bots to full autonomous DeFi strategies."
          />

          <div className="flex flex-col gap-[30px] lg:flex-row lg:items-center">
            {/* Editor-chrome code panel, mirroring the Figma mock */}
            <div className="flex flex-col overflow-hidden rounded-[20px] border border-v5-border-light bg-v5-surface-dark lg:w-[525px] lg:shrink-0">
              <div className="flex items-center justify-between gap-3 border-b border-v5-border-light px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="size-3 rounded-full bg-v5-negative-mark" />
                    <span className="size-3 rounded-full bg-v5-warning" />
                    <span className="size-3 rounded-full bg-v5-positive" />
                  </span>
                  <span className="font-mono text-v5-body-s text-v5-text-secondary">
                    agent.ts
                  </span>
                </div>
                <CopyButton value={AGENT_TS} label="agent.ts example" />
              </div>
              <pre className="max-h-[560px] overflow-auto p-5">
                <code className="font-mono text-v5-footnote leading-6 text-v5-text-secondary">
                  {AGENT_TS}
                </code>
              </pre>
            </div>

            <ul className="flex flex-1 flex-col gap-5">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex items-center gap-5 rounded-[20px] bg-v5-page px-5 py-5 md:gap-[30px] md:px-[30px]"
                >
                  <span
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-v5-surface-dark"
                    aria-hidden
                  >
                    <Icon className="size-6 text-v5-info" />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-v5-title2 font-semibold text-v5-text-inverse md:text-v5-card-title-md">
                      {title}
                    </h3>
                    <p className="text-v5-body-m font-normal text-v5-text-inverse md:text-v5-body-l-relaxed">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
