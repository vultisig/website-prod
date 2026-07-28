import Image from "next/image"

import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

const ROW_CLASS =
  "flex items-center gap-4 rounded-3xl border border-v5-border-light bg-v5-surface-1 px-6 py-4"

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="size-5 shrink-0"
    >
      <path
        d="M14.167 14.167V5.833H5.833M14.167 5.833 5.833 14.167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function OpenSourceCard() {
  return (
    <BentoCard height="short" className="justify-between">
      <ul className="flex w-full flex-col gap-3">
        <li className={`${ROW_CLASS} text-v5-text-primary`}>
          <Image
            src="/v5/bento-github.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 shrink-0"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
            <span className="truncate text-v5-body-s font-medium">
              github.com/vultisig
            </span>
            <span className="truncate text-v5-caption font-medium text-v5-text-secondary">
              All source code - public
            </span>
          </div>
          <ArrowUpRight />
        </li>
        <li className={ROW_CLASS}>
          <div className="flex min-w-0 flex-col justify-center gap-1">
            <span className="truncate text-v5-body-s font-medium text-v5-text-primary">
              Trail of Bits
            </span>
            <span className="truncate text-v5-caption font-medium text-v5-text-secondary">
              DKLS23 protocol audit
            </span>
          </div>
        </li>
      </ul>
      <BentoCopy title="100% open source." />
    </BentoCard>
  )
}
