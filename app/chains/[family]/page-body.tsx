import Image from "next/image"
import Link from "next/link"

import FaqSection from "@/components/ui/faq-section"
import {
  fill,
  FAMILY_ACTIONS,
  type ChainFamily,
} from "@/content/chain-families"
import type { Chain } from "@/content/chains"
import type { Article } from "@/lib/articles"

import {
  BuyIcon,
  FunctionIcon,
  ReceiveIcon,
  SendIcon,
  SwapIcon,
} from "../components/action-icons"

const ACTION_ICONS = [SwapIcon, SendIcon, BuyIcon, FunctionIcon, ReceiveIcon]

/** Outer panel shared by the lower sections. */
export const PANEL = "rounded-[20px] px-5 py-10 md:rounded-v5-panel md:p-[60px]"

export type PageBodyProps = {
  family: ChainFamily
  /**
   * What the copy is about. A family page passes its representative chain, a
   * chain page passes itself, and every `{chain}` / `{asset}` resolves from it.
   */
  subject: Pick<Chain, "name" | "ticker">
  /**
   * Fills `{chain}` in the headline only, which is the one line that names the
   * whole family on a family page — "Hold EVM chains…" over "Hold Ethereum…".
   */
  headline: string
  heroArt: string
  /** Trailing breadcrumb label, after Chains / family. */
  breadcrumb: { label: string; familyHref?: string }
  /** Rail of sibling chains; the current one is rendered as plain text. */
  chains: Chain[]
  currentSlug?: string
  articles: Article[]
}

/**
 * One layout for the family pages and the chain pages under them.
 *
 * The two differ only in what fills the template and what the chain rail points
 * at, so they share this rather than drifting apart — the family page is the
 * same page with the family's representative chain as its subject.
 */
export default function ChainPageBody({
  family,
  subject,
  headline,
  heroArt,
  breadcrumb,
  chains,
  currentSlug,
  articles,
}: PageBodyProps) {
  const t = (text: string) => fill(text, subject)

  return (
    <>
      <div className="mx-auto flex max-w-v5-content flex-col gap-[30px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-v5-body-s text-v5-text-tertiary">
            <li>
              <Link href="/chains" className="hover:text-v5-text-inverse">
                Chains
              </Link>
            </li>
            <li aria-hidden>/</li>
            {breadcrumb.familyHref ? (
              <>
                <li>
                  <Link
                    href={breadcrumb.familyHref}
                    className="hover:text-v5-text-inverse"
                  >
                    {family.name}
                  </Link>
                </li>
                <li aria-hidden>/</li>
              </>
            ) : null}
            <li className="text-v5-text-inverse">{breadcrumb.label}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="flex flex-col gap-[30px] lg:flex-row lg:items-center">
          <div className="flex flex-col gap-6 lg:w-[696px] lg:shrink-0">
            <h1 className="text-v5-hero-sm font-medium text-v5-text-inverse md:text-v5-hero">
              {fill(family.hero.title, {
                name: headline,
                ticker: subject.ticker,
              })}
            </h1>
            <p className="text-v5-subtitle font-normal text-v5-text-inverse lg:w-[577px]">
              {t(family.hero.body)}
            </p>
            <Link
              href="/downloads"
              className="flex h-[50px] w-fit items-center rounded-xl bg-v5-cta px-4 text-v5-button font-medium text-v5-text-primary transition-opacity hover:opacity-90"
            >
              {t(family.hero.cta)}
            </Link>
          </div>

          {/*
            The device and coins overhang the tinted card below them, which is
            why the group exports taller than the 400px card and is not clipped
            to it. `priority` because it is the LCP element on every one.
          */}
          <Image
            src={`/v5/chains/${heroArt}.webp`}
            alt={`The Vultisig vault open on ${subject.name}, with its balance and actions`}
            width={1308}
            height={1036}
            priority
            className="w-full lg:w-[654px] lg:shrink-0"
          />
        </section>

        {/* One vault view */}
        <section
          className={`${PANEL} flex flex-col gap-10 bg-v5-white md:gap-[50px]`}
        >
          <div className="flex flex-col gap-3.5 text-center">
            <h2 className="text-v5-display-sm font-medium text-v5-text-inverse md:text-v5-display">
              {t(family.vaultView.title)}
            </h2>
            <p className="mx-auto max-w-[772px] text-v5-subtitle font-normal text-v5-text-inverse">
              {t(family.vaultView.body)}
            </p>
          </div>

          <div className="flex flex-col gap-[30px] lg:flex-row lg:gap-[50px]">
            <div className="overflow-hidden rounded-v5-panel bg-v5-accent lg:w-[605px] lg:shrink-0">
              <Image
                src="/v5/chains-vault-view.webp"
                alt={`The Vultisig vault view showing ${subject.name} alongside every other asset`}
                width={1308}
                height={1271}
                className="size-full object-cover"
              />
            </div>

            <ul className="flex flex-1 flex-col gap-[30px]">
              {family.vaultView.features.map((feature) => (
                <li
                  key={feature.title}
                  className="flex flex-1 flex-col justify-center gap-3.5 rounded-[20px] bg-v5-page p-5"
                >
                  <Image
                    src={`/v5/chains/${feature.icon}.svg`}
                    alt=""
                    width={42}
                    height={42}
                    className="size-[42px] max-w-none object-contain"
                  />
                  <h3 className="text-v5-prose-h3 font-semibold text-v5-text-inverse">
                    {t(feature.title)}
                  </h3>
                  <p className="text-v5-body-m font-normal text-v5-text-inverse">
                    {t(feature.body)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Every action, one vault */}
        <section
          className={`${PANEL} flex flex-col gap-10 bg-v5-white md:gap-[50px]`}
        >
          <h2 className="text-center text-v5-display-sm font-semibold text-v5-text-inverse md:text-v5-display">
            Every action, one vault
          </h2>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {FAMILY_ACTIONS.map((action, index) => {
              const Icon = ACTION_ICONS[index]
              return (
                <li
                  key={action.label}
                  className="flex flex-col gap-3 rounded-[20px] bg-v5-page p-6"
                >
                  <span className="flex size-[49px] items-center justify-center rounded-[15px] bg-v5-white text-v5-text-inverse">
                    <Icon aria-hidden className="size-[19px]" />
                  </span>
                  <h3 className="text-v5-prose-h3 font-semibold text-v5-text-inverse">
                    {action.label}
                  </h3>
                  <p className="text-v5-body-l-relaxed font-normal text-v5-text-inverse">
                    {t(action.body)}
                  </p>
                </li>
              )
            })}
          </ul>
        </section>

        {/*
          The rail is how every chain page is reachable without a crawler having
          to guess a slug, and it puts each one link from its siblings.
        */}
        {chains.length > 1 && (
          <section
            className={`${PANEL} flex flex-col gap-8 bg-v5-white md:gap-10`}
          >
            {/* `name` is already plural — "EVM chains", "independent L1s". */}
            <h2 className="text-v5-display-sm font-medium text-v5-text-inverse first-letter:uppercase">
              All {family.name}, in one vault
            </h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
              {chains.map((chain) => {
                const current = chain.slug === currentSlug
                const inner = (
                  <>
                    <Image
                      src={`/v5/chains/chain-${chain.icon}.svg`}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 max-w-none object-contain"
                    />
                    <span className="text-v5-body-s font-medium">
                      {chain.name}
                    </span>
                  </>
                )
                return (
                  <li key={chain.slug}>
                    {current ? (
                      <span
                        aria-current="page"
                        className="flex flex-col items-center gap-2 text-center text-v5-text-tertiary"
                      >
                        {inner}
                      </span>
                    ) : (
                      <Link
                        href={`/chains/${family.slug}/${chain.slug}`}
                        className="flex flex-col items-center gap-2 text-center text-v5-text-inverse transition-opacity hover:opacity-70"
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>

      {/* FAQ — force-mounted answers keep every one in the server HTML */}
      <FaqSection
        className="bg-transparent px-0 py-[30px] md:px-0"
        panelClassName={`${PANEL} bg-v5-success`}
        aside={
          <h2 className="text-v5-display-sm font-medium text-v5-text-inverse v5wide:w-[476px] v5wide:shrink-0 v5wide:text-v5-faq-title">
            {t(family.faq.title)}
          </h2>
        }
        items={family.faq.items.map((item) => ({
          question: t(item.question),
          answer: t(item.answer),
        }))}
      />

      {articles.length > 0 && (
        <div className="mx-auto max-w-v5-content">
          <section
            className={`${PANEL} flex flex-col gap-10 bg-v5-accent md:gap-[50px]`}
          >
            <h2 className="text-v5-display-sm font-medium text-v5-text-inverse md:text-v5-display">
              More on {subject.name} and Vultisig
            </h2>
            <ul className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-3xl bg-v5-white transition-opacity hover:opacity-90"
                  >
                    {article.image && (
                      <Image
                        src={article.image}
                        alt=""
                        width={440}
                        height={242}
                        className="h-[242px] w-full object-cover"
                      />
                    )}
                    <span className="flex flex-1 flex-col gap-3.5 p-5">
                      <span className="text-v5-title2 font-medium text-v5-text-inverse">
                        {article.title}
                      </span>
                      <span className="line-clamp-3 text-v5-body-s text-v5-text-inverse/70">
                        {article.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </>
  )
}
