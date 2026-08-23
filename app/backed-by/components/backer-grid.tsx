import Image from "next/image"
import { FaXTwitter } from "react-icons/fa6"

import { xUrl, type BackerGroup } from "../backers"

const PILL =
  "inline-flex items-center gap-2 self-start rounded-full bg-v5-white px-4 py-2 text-v5-body-m font-normal text-v5-text-inverse"

function HandlePill({ handle }: { handle: string }) {
  const href = xUrl(handle)
  const content = (
    <>
      <FaXTwitter className="size-4 shrink-0" aria-hidden />
      {handle}
    </>
  )

  // A malformed handle gets no link — see the note in backers.ts.
  if (!href) return <span className={PILL}>{content}</span>

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${PILL} transition-colors hover:bg-v5-page`}
    >
      {content}
    </a>
  )
}

export default function BackerGrid({ group }: { group: BackerGroup }) {
  return (
    <section
      aria-labelledby={group.id}
      className="flex flex-col gap-6 pt-10 md:gap-[30px] md:pt-[30px]"
    >
      <h2
        id={group.id}
        className="text-center text-v5-display-xs font-medium text-v5-text-inverse md:text-v5-hero"
      >
        {group.title}
      </h2>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {group.backers.map((backer, index) => (
          <li
            key={`${backer.name}-${index}`}
            className="flex flex-col justify-between gap-6 rounded-[20px] bg-v5-panel p-[30px] md:gap-7"
          >
            <Image
              src={`/v5/backed-by/${backer.logo}`}
              alt=""
              width={66}
              height={66}
              className="size-[66px] rounded-[20px] object-cover"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-v5-prose-h3 font-semibold text-v5-text-inverse">
                {backer.name}
              </h3>
              <p className="text-v5-body-m font-normal text-v5-text-inverse">
                {backer.detail}
              </p>
            </div>
            <HandlePill handle={backer.handle} />
          </li>
        ))}
      </ul>
    </section>
  )
}
