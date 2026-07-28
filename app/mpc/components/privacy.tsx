import Image from "next/image"

type PrivacyPromise = {
  label: string
  icon: { src: string; alt: string }
}

const PROMISES: PrivacyPromise[] = [
  {
    label: "No account creation",
    icon: {
      src: "/v5/mpc-privacy-no-account.svg",
      alt: "A blue ID card",
    },
  },
  {
    label: "No email required",
    icon: {
      src: "/v5/mpc-privacy-no-email.svg",
      alt: "A red envelope",
    },
  },
  {
    label: "No balance tracking",
    icon: {
      src: "/v5/mpc-privacy-no-tracking.svg",
      alt: "A dark tile with an eye on it",
    },
  },
]

export default function Privacy() {
  return (
    <section className="bg-v5-page px-4 pt-4 md:px-[30px] md:pt-[30px]">
      <div className="mx-auto max-w-v5-content">
        <div className="flex flex-col items-center gap-8 rounded-[20px] bg-v5-panel px-4 py-9 text-v5-text-inverse md:gap-[30px] md:rounded-3xl md:p-[60px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-v5-display-sm-tight font-semibold md:text-v5-display-tight">
              We Don&apos;t Track You.{" "}
              <span className="text-v5-sapphire">Period.</span>
            </h2>
            <p className="max-w-[798px] text-v5-body-m font-normal md:text-v5-subtitle">
              Vultisig is a truly private wallet. We can&apos;t see your
              balances, we don&apos;t collect your data, and we do not store any
              information. Like self-custody should be done.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-6 md:w-[810px] md:gap-8">
            <ul className="flex w-full flex-col gap-4 md:flex-row md:gap-5">
              {PROMISES.map((promise) => (
                <li
                  key={promise.label}
                  className="flex flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-v5-white p-5"
                >
                  <Image
                    src={promise.icon.src}
                    alt={promise.icon.alt}
                    width={42}
                    height={42}
                    className="size-[42px]"
                  />
                  <p className="text-v5-body-m font-semibold">
                    {promise.label}
                  </p>
                </li>
              ))}
            </ul>
            <p className="max-w-[722px] text-center text-v5-body-m font-normal italic md:px-[33px] md:py-8">
              All wallet operations happen locally on your devices. No data
              leaves your phone. No telemetry, no tracking pixels, no
              third-party analytics. Your financial activity is yours alone.
              Your transaction history, balances, and blockchain interactions
              are known only to you and the public blockchain - by default never
              to Vultisig.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
