import CopyButton from "@/components/ui/copy-button"
import SectionHeading from "@/components/ui/section-heading"

const OPTIONS = [
  {
    title: "SDK",
    lead: "TypeScript, embed directly in your agent.",
    command: "npm install @vultisig/sdk",
    note: "Fast Vault = full autonomy, no human in the loop. Secure Vault = human co-signs every transaction.",
  },
  {
    title: "CLI - @vultisig/cli",
    lead: "Mirrors the full SDK. Built for scripting and pipelines.",
    command: "npm install -g @vultisig/cli",
    note: "Non-interactive mode auto-detected. Use --ci for full automation: JSON output, no prompts, silent.",
  },
]

export default function TwoWays() {
  return (
    <section className="bg-v5-page px-4 pt-[30px] md:px-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-10 rounded-[20px] bg-v5-surface-dark px-4 py-10 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            tone="onDark"
            title="Two ways to build"
            subtitle="SDK for embedding in your agent's codebase. CLI for scripting and pipelines."
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {OPTIONS.map((option) => (
              <div
                key={option.title}
                className="flex h-full flex-col gap-3.5 rounded-[24px] bg-v5-surface-1 p-5 md:p-[30px]"
              >
                <h3 className="text-v5-card-title-sm font-semibold text-v5-text-primary md:text-v5-display-sm">
                  {option.title}
                </h3>
                <p className="text-v5-body-m font-normal text-v5-text-primary">
                  {option.lead}
                </p>
                <div className="flex items-center justify-between gap-4 rounded-[20px] border border-v5-border-light bg-v5-surface-dark p-5 md:p-6">
                  <code className="overflow-x-auto font-mono text-v5-body-s text-v5-info md:text-v5-body-m">
                    {option.command}
                  </code>
                  <CopyButton
                    value={option.command}
                    label={`${option.command} command`}
                  />
                </div>
                <p className="text-v5-body-m font-normal text-v5-text-primary">
                  {option.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
