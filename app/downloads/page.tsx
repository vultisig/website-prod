import DownloadsTabs from "./downloads-tabs"
import { HashSection } from "./HashCard"
import { resolveTab } from "./tabs"

/** Bumped alongside the matching `href` in ./Gtag.tsx on every release. */
const hashes = [
  {
    os: "ios",
    hash: "sha256:4dd5b28a2cd719d77e393455c2b465fb6f49b5093b7e9ea215c9c71b99b928c5",
  },
  {
    os: "linux",
    hash: "sha256:66a2a18b732f9108ec14544e5df470c14d3599cfbed30860cab1e1fe0383c882",
  },
  {
    os: "android",
    hash: "sha256:2e4469d2f9e77fff8f7e88df923e098f6b3ab48bfc84c32d7565c5e0de148ebc",
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
