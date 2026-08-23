import DownloadsTabs from "./downloads-tabs"
import { HashSection } from "./HashCard"
import { resolveTab } from "./tabs"

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
