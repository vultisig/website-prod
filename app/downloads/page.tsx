import DownloadsFaq from "./downloads-faq"
import DownloadsTabs from "./downloads-tabs"
import { HashSection } from "./HashCard"
import { resolveTab } from "./tabs"

/** Bumped alongside the matching `href` in ./Gtag.tsx on every release. */
const hashes = [
  {
    os: "ios",
    hash: "sha256:243a4f90247b2006f45ef06779408ee12a7d5b14812d04e2a29d3fd2c743e600",
  },
  {
    os: "linux",
    hash: "sha256:0dea3936efff515a2bfbe22e784988572abf9a12fba377dcaaae2b92218e69d1",
  },
  {
    os: "android",
    hash: "sha256:216a7205a1de9cb40da670584b6816a10600a6a45dba451afc5d33082871434d",
  },
  {
    os: "windows",
    hash: "sha256:a97e4d8391dabdc65cc3d6ecc9586d1b15ab7b50e49379982e8f44f3f67850e2",
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
        <DownloadsFaq />
      </div>
    </main>
  )
}
