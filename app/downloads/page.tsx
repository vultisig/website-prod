import DownloadsFaq from "./downloads-faq"
import DownloadsTabs from "./downloads-tabs"
import { HashSection } from "./HashCard"
import { resolveTab } from "./tabs"

/** Bumped alongside the matching `href` in ./Gtag.tsx on every release. */
const hashes = [
  {
    os: "ios",
    hash: "sha256:89391e9d132a75cec88b276a63f68cac57d1099d7035d63eb9f1ecaaac907938",
  },
  {
    os: "linux",
    hash: "sha256:0dea3936efff515a2bfbe22e784988572abf9a12fba377dcaaae2b92218e69d1",
  },
  {
    os: "android",
    hash: "sha256:2b74413e23129cc831a95bbc399d614325f952cf6b5e4120ee01782f707acab8",
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
