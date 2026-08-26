import DownloadsTabs from "./downloads-tabs"
import { HashSection } from "./HashCard"
import { resolveTab } from "./tabs"

/** Bumped alongside the matching `href` in ./Gtag.tsx on every release. */
const hashes = [
  {
    os: "ios",
    hash: "sha256:3fcc60d54f71b5aec673ef2a25b3b59309b312056729267a457869123355e3bc",
  },
  {
    os: "linux",
    hash: "sha256:9d210b0abdb54895057972a73bf3e2082c80673648e4c900ed2765e09959145f",
  },
  {
    os: "android",
    hash: "sha256:ac6fff7a363750accb1f0109b5c065ffe8d3c65d060510a31df8952c40eda1cb",
  },
  {
    os: "windows",
    hash: "sha256:c6db94e523712f62515b8d34f04710f367e2af7b294b68a04ea8f3db196429df",
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
