import Image from "next/image"

import DarkSplit from "./dark-split"

const ILLUSTRATION_ALT =
  "A vault server and two laptops each holding one of three Vault Shares, wired together — share 1, share 2 and share 3 stored separately"

function SharesDiagram() {
  return (
    // The artwork bleeds past its layout box on both breakpoints, exactly as it
    // does in the design — the surrounding dark panel clips the overflow.
    <div className="relative -mx-4 aspect-[393/328] w-[calc(100%+2rem)] overflow-hidden md:mx-0 md:aspect-[530/402] md:w-[530px] md:shrink-0 md:overflow-visible">
      <Image
        src="/v5/hiw-vault-shares.webp"
        alt={ILLUSTRATION_ALT}
        width={547}
        height={477}
        sizes="(max-width: 767px) 114vw, 547px"
        className="absolute left-[-8.55%] top-0 w-[113.56%] max-w-none md:left-[-3.21%] md:w-[103.21%]"
      />
    </div>
  )
}

export default function VaultShares() {
  return (
    <section className="bg-v5-page md:px-[30px] md:pt-[30px]">
      <DarkSplit
        rounding="bottom"
        mediaFirst
        eyebrow="Vault Shares"
        title={
          <>
            Backups that
            <br />
            can&apos;t betray you.
          </>
        }
        body={
          <>
            <p>
              Each device produces a Vault Share - a secure backup of only its
              own fragment.{" "}
              <strong className="font-semibold text-v5-text-primary">
                A single Vault Share contains no funds and reveals nothing on
                its own.
              </strong>
            </p>
            <p>
              Store each share anywhere: cloud, USB, email. It doesn&apos;t
              matter where - it takes two to sign and zero single shares hold
              value.
            </p>
          </>
        }
        media={<SharesDiagram />}
      />
    </section>
  )
}
