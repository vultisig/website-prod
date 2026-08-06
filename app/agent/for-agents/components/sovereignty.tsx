import SectionHeading from "@/components/ui/section-heading"

/** The three-step explanation of what an agent can and cannot do with a vault. */
const STEPS = [
  {
    number: "01",
    title: "Your agent gets a share, not a key",
    body: "When you deploy an agent, it holds one share of your vault's MPC key. No agent, including yours, ever holds a complete private key on its own.",
  },
  {
    number: "02",
    title: "It proposes, you stay in control",
    body: "Your agent reviews conditions and prepares transactions when its rules are met. Depending on how you've set it up, it either signs autonomously within limits you define, or waits for your approval.",
  },
  {
    number: "03",
    title: "You can step in any time",
    body: "Nothing your agent does is locked in ahead of time. Pause it, adjust it, or shut it down whenever you want.",
  },
]

export default function Sovereignty() {
  return (
    <section className="bg-v5-page px-4 pt-[30px] md:px-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-10 rounded-[20px] bg-v5-accent px-4 py-10 md:gap-[50px] md:rounded-v5-panel md:p-[60px]">
          <SectionHeading
            tone="onDark"
            title="Autonomous execution with human sovereignty."
            subtitle="Vultisig uses threshold signatures so agents can co-sign transactions without ever holding a complete private key."
          />

          <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="flex flex-col gap-3.5 rounded-[24px] bg-v5-white p-[30px]"
              >
                <span className="font-mono text-v5-score font-medium text-v5-cta md:text-[48px] md:leading-[1.32]">
                  {step.number}
                </span>
                <div className="flex flex-col gap-3.5">
                  <h3 className="text-v5-card-title-sm font-semibold text-v5-text-inverse md:text-v5-display-sm">
                    {step.title}
                  </h3>
                  <p className="text-v5-body-m font-normal text-v5-text-inverse">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
