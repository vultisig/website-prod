import Image from "next/image"

/**
 * The files an agent should fetch instead of scraping this page. Hrefs are
 * root-relative where the file is served by this site, so the links stay
 * correct across environments.
 */
const FILES = [
  {
    name: "SKILL.md",
    body: "Full operating procedure — 14 steps covering vault creation, sends, swaps, balances, gas estimation.",
    display: "vultisig.com/SKILL.md",
    href: "/SKILL.md",
  },
  {
    name: "llms.txt",
    body: "Spec-compliant link index in llmstxt.org format.",
    display: "vultisig.com/llms.txt",
    href: "/llms.txt",
  },
  {
    name: "llms-full.txt",
    body: "Full SDK context with verified code examples and source references.",
    display: "vultisig.com/llms-full.txt",
    href: "/llms-full.txt",
  },
  {
    name: "agent.json",
    body: "Structured capabilities manifest — chains, operations, SDK info.",
    display: "vultisig.com/.well-known/agent.json",
    href: "/.well-known/agent.json",
  },
]

export default function MachineReadable() {
  return (
    <section className="bg-v5-page px-4 pt-[30px] md:px-[30px]">
      <div className="mx-auto flex max-w-v5-content flex-col gap-[30px]">
        <div className="flex flex-col items-center gap-6 pt-10 text-center text-v5-text-inverse md:pt-20">
          <h2 className="text-v5-display-xs font-medium md:text-v5-hero">
            If you&apos;re an agent reading this page.
          </h2>
          <p className="text-v5-body-m-relaxed font-normal md:text-v5-subtitle">
            These files are built for machine consumption. Fetch them directly
            instead of parsing this HTML.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-5 rounded-[24px] bg-gradient-to-r from-[#2f63ec] to-v5-highlight p-6 md:gap-7">
            {/* Decorative — the sentence beside it carries the whole message */}
            <Image
              src="/v5/agent-structured-index.svg"
              alt=""
              width={62}
              height={62}
              className="size-10 shrink-0 md:size-[62px]"
              aria-hidden
            />
            <p className="text-v5-body-m font-medium text-v5-text-primary md:text-v5-body-l-relaxed">
              Structured index available. Query{" "}
              <code className="font-mono">
                docs.vultisig.com/agent.md?ask=&lt;question&gt;
              </code>{" "}
              for a direct, sourced answer instead of crawling the site.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {FILES.map((file) => (
              <li key={file.name}>
                <a
                  href={file.href}
                  className="flex flex-col gap-3 rounded-[24px] bg-v5-white p-6 transition-shadow hover:shadow-v5-menu md:flex-row md:items-center md:gap-7"
                >
                  <span className="whitespace-nowrap font-mono text-v5-body-l-relaxed font-medium text-v5-success md:w-[128px] md:shrink-0">
                    {file.name}
                  </span>
                  <span className="flex flex-1 flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-3">
                    <span className="text-v5-body-m font-medium text-v5-text-inverse md:text-v5-body-l-relaxed">
                      {file.body}
                    </span>
                    <span className="text-v5-footnote font-medium text-v5-text-tertiary md:shrink-0 md:text-[17px]">
                      {file.display}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
