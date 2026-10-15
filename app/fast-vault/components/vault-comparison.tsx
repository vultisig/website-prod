import Image from "next/image"

import { LandingButton } from "@/components/ui/landing-button"
import { externalLinkAttrs } from "@/lib/external-link"

import { TERTIARY_BUTTON_CLASS } from "./button-styles"
import { ArrowRightIcon } from "./icons"

type ComparisonRow = {
  feature: string
  fast: string
  secure: string
}

const ROWS: ComparisonRow[] = [
  {
    feature: "Devices required",
    fast: "1 device + Vultiserver",
    secure: "2+ devices",
  },
  {
    feature: "Signing",
    fast: "One tap, automatic co-sign",
    secure: "Requires multiple devices to sign",
  },
  {
    feature: "Best for",
    fast: "Daily spending, smaller amounts",
    secure: "Long-term holdings, larger amounts",
  },
  {
    feature: "Setup",
    fast: "Email + password",
    secure: "Physical devices only",
  },
]

const SECURE_VAULT_DOCS_URL =
  "https://docs.vultisig.com/vultisig-vault-user-actions/creating-a-vault#secure-vault"

/*
 * The frame lays each row out as a three-column grid with a 16px gutter inside
 * 24px of padding, so the columns start at 24, 354 and 684 of the 1022px row.
 * A table splits that gutter across the cell edges: 8px each side, and the
 * outer cells take the 24px. The column widths are those spans over 1022.
 */
const COLUMNS = ["w-[33.855%]", "w-[32.29%]", "w-[33.855%]"]
const CELL_PADDING = ["pl-6 pr-2", "px-2", "pl-2 pr-6"]

export default function VaultComparison() {
  return (
    <section
      id="comparison"
      className="scroll-mt-24 bg-v5-page px-4 py-12 md:px-[30px] md:py-[90px]"
    >
      <div className="mx-auto flex max-w-v5-content flex-col items-center gap-8 md:gap-[30px]">
        <h2 className="text-center text-v5-display-sm font-medium text-v5-text-inverse md:text-v5-headline">
          Fast Vault VS. Secure Vault
        </h2>

        <div className="flex w-full flex-col items-center gap-6">
          {/* overflow-x-auto also clips the rows to the panel radius */}
          <div className="w-full max-w-[1024px] overflow-x-auto rounded-[20px] border border-v5-text-secondary/30 p-px md:rounded-v5-panel">
            <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-v5-text-inverse">
              <caption className="sr-only">
                Fast Vault compared with Secure Vault across devices required,
                signing, best use and setup
              </caption>
              <colgroup>
                {COLUMNS.map((width, index) => (
                  <col key={index} className={width} />
                ))}
              </colgroup>
              <thead>
                <tr className="h-[70px] border-b border-v5-text-secondary bg-v5-white">
                  <th scope="col" className={`${CELL_PADDING[0]} align-middle`}>
                    {/* Drawn at zero opacity in the frame; kept for the column's name. */}
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className={`${CELL_PADDING[1]} align-middle`}>
                    <span className="flex items-center gap-2.5 text-v5-title3 font-medium">
                      <Image
                        src="/v5/vault-type-fast.svg"
                        alt=""
                        width={14}
                        height={16}
                        className="h-4 w-3.5 shrink-0"
                      />
                      Fast Vault
                    </span>
                  </th>
                  <th scope="col" className={`${CELL_PADDING[2]} align-middle`}>
                    <span className="flex items-center gap-2.5 text-v5-title3 font-medium">
                      <Image
                        src="/v5/vault-type-secure.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 shrink-0"
                      />
                      Secure Vault
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.feature}
                    className="h-[73px] border-b border-v5-text-secondary bg-v5-white/[0.54]"
                  >
                    <th
                      scope="row"
                      className={`${CELL_PADDING[0]} align-middle text-v5-body-s font-medium`}
                    >
                      {row.feature}
                    </th>
                    <td
                      className={`${CELL_PADDING[1]} align-middle text-v5-body-s font-normal`}
                    >
                      {row.fast}
                    </td>
                    <td
                      className={`${CELL_PADDING[2]} align-middle text-v5-body-s font-medium`}
                    >
                      {row.secure}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-v5-footnote font-medium text-v5-text-tertiary">
            Both are keyless. Neither requires a seed phrase.
          </p>

          <LandingButton
            asChild
            variant="secondary"
            size="sm"
            invertOnHover
            className={`h-[50px] w-full md:w-[185px] ${TERTIARY_BUTTON_CLASS}`}
          >
            <a
              href={SECURE_VAULT_DOCS_URL}
              {...externalLinkAttrs(SECURE_VAULT_DOCS_URL)}
            >
              See Secure Vault
              <ArrowRightIcon />
            </a>
          </LandingButton>
        </div>
      </div>
    </section>
  )
}
