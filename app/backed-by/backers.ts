/**
 * Backers shown on /backed-by, transcribed verbatim from Figma 425:94746.
 *
 * The design carries several data errors that are NOT corrected here, because
 * guessing a real company's X handle would ship a wrong outbound link:
 *   - "Delphi Ventures" appears twice, with @21e8Capital and @Magnet_Capital
 *   - "Kotti Capital" and "Proof Group" share @njess
 *   - "@Banter Capital" contains a space, so it is not a valid handle
 *   - the `detail` line on the "voices" group repeats the "investors" group's
 *     wallet names, which do not describe those accounts
 * `xUrl` returns null for anything that is not a single valid handle, so those
 * pills render as plain text. Replace the values below once the real data is
 * confirmed.
 */
export type Backer = {
  name: string
  /** Second line: what the fund does, or the person's affiliation. */
  detail: string
  handle: string
  /** File under /public/v5/backed-by. */
  logo: string
}

export type BackerGroup = {
  id: string
  title: string
  backers: Backer[]
}

const HANDLE_PATTERN = /^@[A-Za-z0-9_]{1,15}$/

/** Null for handles the design left malformed — better no link than a wrong one. */
export function xUrl(handle: string): string | null {
  if (!HANDLE_PATTERN.test(handle)) return null
  return `https://x.com/${handle.slice(1)}`
}

export const BACKER_GROUPS: BackerGroup[] = [
  {
    id: "funds",
    title: "Backed by funds who bet on self-custody first",
    backers: [
      {
        name: "21e8 Capital",
        detail: "A private Australian Crypto Fund trading on macro timelines.",
        handle: "@21e8Capital",
        logo: "21e8-capital.webp",
      },
      {
        name: "Apollo Crypto",
        detail: "Institutional Asset Management For A New Asset Class.",
        handle: "@ApolloCryptoFM",
        logo: "apollo-crypto.webp",
      },
      {
        name: "Delphi Ventures",
        detail:
          "A thesis-driven, high-conviction firm that allocates capital across core themes.",
        handle: "@21e8Capital",
        logo: "delphi-ventures.webp",
      },
      {
        name: "Wintermute Ventures",
        detail:
          "Leading early-stage investor in the DeFi ecosystem to fuel your long-term growth",
        handle: "wintermute-ventures",
        logo: "wintermute-ventures.webp",
      },
      {
        name: "Danxia Capital",
        detail: "Fueling the future o crypto & DeFi.",
        handle: "@Danxia_Capital",
        logo: "danxia-capital.webp",
      },
      {
        name: "Banter Capital",
        detail: "Investing in protocols that change the world.",
        handle: "@Banter Capital",
        logo: "banter-capital.webp",
      },
      {
        name: "Proof Group",
        detail: "Investing at Proof Group.",
        handle: "@njess",
        logo: "proof-group.webp",
      },
      {
        name: "UpsideDAO",
        detail: "Crypto and web3 community.",
        handle: "@0xUpside",
        logo: "upsidedao.webp",
      },
      {
        name: "Magnet Capital",
        detail:
          "Invest in protocols that change the world, and give them enough time and support to do it.",
        handle: "@Magnet_Capital",
        logo: "magnet-capital.webp",
      },
      {
        name: "MV Global",
        detail: "We invest in and build businesses for the future.",
        handle: "@buildwithMV",
        logo: "mv-global.webp",
      },
      {
        name: "Kotti Capital",
        detail: "Investment Management",
        handle: "@njess",
        logo: "kotti-capital.webp",
      },
      {
        name: "Delphi Ventures",
        detail:
          "A thesis-driven, high-conviction firm that allocates capital across core themes.",
        handle: "@Magnet_Capital",
        logo: "delphi-ventures-2.webp",
      },
    ],
  },
  {
    id: "investors",
    title: "Backed by industry leading Investors",
    backers: [
      {
        name: "JP THOR",
        detail: "THORChain",
        handle: "@jpthor",
        logo: "jp-thor.webp",
      },
      {
        name: "Michael Perklin",
        detail: "Shapeshift",
        handle: "@mperklin",
        logo: "michael-perklin.webp",
      },
      {
        name: "Loi Luu",
        detail: "Kyber",
        handle: "@loi_luu",
        logo: "loi-luu.webp",
      },
      {
        name: "Marcel Harmann",
        detail: "ThorWallet",
        handle: "@marcelharmann",
        logo: "marcel-harmann.webp",
      },
      {
        name: "Viktor",
        detail: "TrustWallet",
        handle: "@Vikemeup",
        logo: "viktor.webp",
      },
      {
        name: "Vik Sharɱa",
        detail: "CakeWallet",
        handle: "@vikrantnyc",
        logo: "vik-shar-a.webp",
      },
    ],
  },
  {
    id: "voices",
    title: "Trusted by the voices crypto actually listens to",
    backers: [
      {
        name: "THORTrades",
        detail: "THORChain",
        handle: "@ThorTrades8",
        logo: "thortrades.webp",
      },
      {
        name: "Coach Bruce",
        detail: "Shapeshift",
        handle: "@OX_DAO",
        logo: "coach-bruce.webp",
      },
      {
        name: "Saunders Nuggets",
        detail: "Kyber",
        handle: "@NuggetsNewsAU",
        logo: "saunders-nuggets.webp",
      },
      {
        name: "NCF",
        detail: "ThorWallet",
        handle: "@NoTableNoFun",
        logo: "ncf.webp",
      },
      {
        name: "Elroy ARC",
        detail: "TrustWallet",
        handle: "@icunucmi",
        logo: "elroy-arc.webp",
      },
      {
        name: "Mechanism Capital",
        detail: "CakeWallet",
        handle: "@MechanismCap",
        logo: "mechanism-capital.webp",
      },
      {
        name: "Wolf of Defi",
        detail: "ThorWallet",
        handle: "@thewolfofdefi",
        logo: "wolf-of-defi.webp",
      },
      {
        name: "Tyler Reynolds",
        detail: "TrustWallet",
        handle: "@tbr90",
        logo: "tyler-reynolds.webp",
      },
      {
        name: "SliceX",
        detail: "CakeWallet",
        handle: "@SliceTank",
        logo: "slicex.webp",
      },
    ],
  },
]
