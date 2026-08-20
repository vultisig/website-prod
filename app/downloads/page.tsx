import Image from "next/image"

import { cn } from "@/lib/utils"

import DownloadCard from "./Gtag"
import { HashCard } from "./HashCard"
import TabToggle from "./tab-toggle"
import { resolveTab, TAB_CONTENT } from "./tabs"

/** Bumped alongside the matching `href` in ./Gtag.tsx on every release. */
const hashes = [
  {
    os: "ios",
    hash: "sha256:98c3de85549a993bf89e1b52e1336e4a5f09c77f96cdeb64915b9b6e5c9b346b",
  },
  {
    os: "linux",
    hash: "sha256:78e7eca744085e747cfa3397f0140c3288f249f3ea5b0a3f51ca32f92086493c",
  },
  {
    os: "android",
    hash: "sha256:6409452465ae0cf96c894c9c64d6ce1830b7851ec380956becce962e82b4cb47",
  },
  {
    os: "windows",
    hash: "sha256:7011792fef6f54358193ef88b98106fb9d8fe5e181828c55315ebf5a996566f2",
  },
]

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const activeTab = resolveTab((await searchParams)?.tab)
  const content = TAB_CONTENT[activeTab]

  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] md:px-[30px] md:pb-[30px] md:pt-[216px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-5">
          <div className="flex flex-col gap-4 text-v5-text-inverse md:w-[579px] md:gap-3.5">
            <h1 className="text-v5-display-xs font-semibold md:text-v5-display md:font-medium">
              {content.title}
            </h1>
            <p className="text-v5-body-m-relaxed font-normal md:text-v5-subtitle">
              {content.description}
            </p>
          </div>
          <TabToggle activeTab={activeTab} />
        </div>

        <div className="mt-8 md:mt-[30px] md:grid md:grid-cols-2 md:gap-[30px]">
          <div className="flex flex-col gap-8 md:gap-5">
            {/* Fixed height keeps the checksums level with the mockup on both tabs. */}
            <div
              className={cn(
                "grid gap-3.5 md:h-[427px] md:content-start md:gap-5",
                content.cardGrid,
              )}
            >
              {content.channels.map((channelKey) => (
                <DownloadCard
                  key={channelKey}
                  channelKey={channelKey}
                  className={content.cardClass}
                />
              ))}
            </div>

            <div className="flex flex-col gap-8 md:gap-5">
              <h2 className="text-v5-title2 font-medium text-v5-text-inverse md:text-v5-download-heading md:font-semibold">
                SHA Checksums
              </h2>
              <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-5">
                {hashes.map((entry) => (
                  <HashCard key={entry.os} {...entry} />
                ))}
              </div>
            </div>
          </div>

          <Image
            src={content.mockup.src}
            alt={content.mockup.alt}
            width={675}
            height={657}
            priority
            className="hidden rounded-3xl md:block"
          />
        </div>
      </div>
    </main>
  )
}
