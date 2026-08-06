import Image from "next/image"

const RESOURCES = [
  {
    icon: "/v5/agent-resource-docs.svg",
    label: "SDK Docs",
    href: "https://docs.vultisig.com",
    external: true,
  },
  {
    icon: "/v5/agent-resource-github.svg",
    label: "GitHub",
    href: "https://github.com/vultisig",
    external: true,
  },
  {
    icon: "/v5/agent-resource-llms.svg",
    label: "llms-full.txt",
    href: "/llms-full.txt",
    external: false,
  },
  {
    icon: "/v5/agent-resource-agent-json.svg",
    label: "agent.json",
    href: "/.well-known/agent.json",
    external: false,
  },
]

export default function Resources() {
  return (
    <section className="bg-v5-page px-4 pt-[30px] md:px-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-10 rounded-[20px] bg-v5-accent px-4 py-10 md:gap-20 md:rounded-[24px] md:px-[60px] md:py-20">
          <h2 className="text-center text-v5-display-sm font-semibold text-v5-text-primary md:text-v5-display">
            Everything you need to start building
          </h2>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:justify-center">
            {RESOURCES.map(({ icon, label, href, external }) => (
              <li key={label} className="lg:w-[280px]">
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-full flex-col items-center justify-center gap-6 rounded-[20px] bg-v5-white px-5 py-6 transition-shadow hover:shadow-v5-menu"
                >
                  {/* Decorative — the label below names the resource */}
                  <Image
                    src={icon}
                    alt=""
                    width={62}
                    height={62}
                    className="size-[62px] object-contain"
                    aria-hidden
                  />
                  <span className="text-v5-body-m font-semibold text-v5-text-inverse">
                    {label}
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
