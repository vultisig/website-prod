import CopyButton from "@/components/ui/copy-button"
import SectionHeading from "@/components/ui/section-heading"

const SDK_SNIPPET = `import { Vultisig, MemoryStorage } from '@vultisig/sdk'

const sdk = new Vultisig({ storage: new MemoryStorage() })
await sdk.initialize()

const vaultId = await sdk.createFastVault({
  name: 'Agent Wallet',
  email: 'agent@example.com',
  password: 'pass'
})
const vault = await sdk.verifyVault(vaultId, code)

const address = await vault.address('Ethereum')
const balance = await vault.balance('Ethereum')`

const CLI_SNIPPET = `# Vault management
vultisig create fast --name "Wallet" --email user@example.com --password pass
vultisig create secure --name "Team Wallet" --shares 3
vultisig import /path/to/vault.vult
vultisig vaults
vultisig export

# Balances & addresses
vultisig balance                      # All chains
vultisig balance ethereum --tokens    # Specific chain + tokens
vultisig addresses
vultisig portfolio

# Transactions
vultisig send ethereum 0xRecipient 0.1
vultisig send ethereum 0xRecipient 100 --token 0xTokenAddress

# Swaps
vultisig swap-quote ethereum bitcoin 0.1
vultisig swap ethereum bitcoin 0.1

# Natural-language, one-shot — built for AI agent integration
vultisig agent ask "What is my ETH balance?" --password "$VAULT_PASSWORD" --json
vultisig agent ask "Send 0.01 ETH to 0x742d..." --session abc123 --password "$VAULT_PASSWORD"

# Advanced: sign arbitrary bytes, broadcast raw tx
vultisig sign --chain ethereum --bytes "base64hash" -o json
vultisig broadcast --chain ethereum --raw-tx "0x02f8..."

# Seedphrase import
vultisig create-from-seedphrase fast --name "Imported" --email user@example.com --discover-chains`

const CARD =
  "flex h-full flex-col gap-3.5 rounded-[24px] bg-v5-surface-1 p-5 md:p-[30px]"
const CODE_SURFACE =
  "rounded-[20px] border border-v5-border-light bg-v5-surface-dark"

/** Install line — the one bit of a card meant to be copied in a single click. */
function InstallLine({ command }: { command: string }) {
  return (
    <div
      className={`${CODE_SURFACE} flex items-center justify-between gap-4 p-5 md:p-6`}
    >
      <code className="overflow-x-auto font-mono text-v5-body-s text-v5-info md:text-v5-body-m">
        {command}
      </code>
      <CopyButton value={command} label={`${command} command`} />
    </div>
  )
}

/**
 * Fixed-height scroller so the two cards stay the same height regardless of
 * snippet length, matching the equal-height code panels in Figma. The copy
 * button is taken out of flow so it cannot squeeze the code column.
 */
function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className={`${CODE_SURFACE} relative`}>
      <pre className="max-h-[338px] overflow-auto p-5 pr-16 md:p-6 md:pr-16">
        <code className="font-mono text-v5-footnote leading-6 text-v5-text-tertiary">
          {code}
        </code>
      </pre>
      <CopyButton
        value={code}
        label={label}
        className="absolute right-4 top-4 md:right-5 md:top-5"
      />
    </div>
  )
}

export default function Toolchain() {
  return (
    <section className="bg-v5-page px-4 pt-[30px] md:px-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-10 rounded-[20px] bg-v5-surface-dark px-4 py-10 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            tone="onDark"
            title="Get an agent talking to a vault."
            subtitle="Two ways in, depending on whether you're scripting a one-off task or building a persistent agent."
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className={CARD}>
              <h3 className="text-v5-card-title-sm font-semibold text-v5-text-primary md:text-v5-display-sm">
                SDK - @vultisig/sdk
              </h3>
              <p className="text-v5-body-m font-normal text-v5-text-primary">
                TypeScript. Vault creation, signing, balances, swaps.
              </p>
              <InstallLine command="npm install @vultisig/sdk" />
              <p className="text-v5-body-m font-normal text-v5-text-primary">
                {"// Initialize → Create vault → Verify → Use"}
              </p>
              <CodeBlock code={SDK_SNIPPET} label="SDK example" />
              <p className="text-v5-body-m font-normal text-v5-text-primary">
                Fast Vault = full autonomy, no human in the loop. Secure Vault =
                human co-signs every transaction.
              </p>
            </div>

            <div className={CARD}>
              <h3 className="text-v5-card-title-sm font-semibold text-v5-text-primary md:text-v5-display-sm">
                CLI - @vultisig/cli
              </h3>
              <p className="text-v5-body-m font-normal text-v5-text-primary">
                Mirrors the full SDK. Built for scripting and pipelines.
              </p>
              <InstallLine command="npm install -g @vultisig/cli" />
              <CodeBlock code={CLI_SNIPPET} label="CLI examples" />
              <p className="text-v5-body-m font-normal text-v5-text-primary">
                Non-interactive mode auto-detected. Use{" "}
                <code className="font-mono">--ci</code> for full automation:
                JSON output, no prompts, silent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
