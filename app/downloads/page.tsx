import DownloadsFaq from "./downloads-faq"
import DownloadsTabs from "./downloads-tabs"
import { HashSection } from "./HashCard"
import { resolveTab } from "./tabs"

/** Bumped alongside the matching `href` in ./Gtag.tsx on every release. */
const hashes = [
  {
    os: "ios",
    hash: "sha256:fbc062f9a2b74432614b32215d2bdab6345d8210b90b6e5170b340a7a52e3980",
  },
  {
    os: "linux",
    hash: "sha256:84aae992c5eda94db91288daec6e1fc8474eed3f68ed9fd549eb456eaaa5fb8a",
  },
  {
    os: "android",
    hash: "sha256:1725795e158a97fb71bced456b4bd16510c28da1638cb337bc0ef65ecf2bde7e",
  },
  {
    os: "windows",
    hash: "sha256:e29868169617d23d52ac6ba4a8950569095f1f86fdb04c26de82606f9b96fa5c",
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
