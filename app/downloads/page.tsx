import DownloadsTabs from "./downloads-tabs"
import { HashSection } from "./HashCard"
import { resolveTab } from "./tabs"

/** Bumped alongside the matching `href` in ./Gtag.tsx on every release. */
const hashes = [
  {
    os: "ios",
    hash: "sha256:aaa5a4c4761f1dbecf3f425e70351e855be7027722878c5006d90ebb2cc8fe47",
  },
  {
    os: "linux",
    hash: "sha256:66a2a18b732f9108ec14544e5df470c14d3599cfbed30860cab1e1fe0383c882",
  },
  {
    os: "android",
    hash: "sha256:76af63d02ada295c148feaa1b060cb8cb4ab49426f347f231be9615025b1a066",
  },
  {
    os: "windows",
    hash: "sha256:46c06c0cead87deee71d6298d4250dfb53752633a6298d74a5509ac15744cde4",
  },
]

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const activeTab = resolveTab((await searchParams)?.tab)

  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[126px] md:px-[30px] md:pb-[30px] md:pt-[216px]">
      <div className="mx-auto max-w-v5-content">
        <DownloadsTabs
          initialTab={activeTab}
          checksums={
            <div className="flex flex-col gap-8 md:gap-5">
              <h2 className="text-v5-title2 font-medium text-v5-text-inverse md:text-v5-download-heading md:font-semibold">
                SHA Checksums
              </h2>
              <HashSection hashes={hashes} />
            </div>
          }
        />
      </div>
    </main>
  )
}
