import Image from "next/image"

import DarkSplit from "./dark-split"

const SHARE_BARS = ["bg-v5-cta", "bg-v5-info-dark", "bg-v5-info"]

type ConnectedDevice = {
  name: string
  status: string
  badge: string
  icon: string
}

const CONNECTED: ConnectedDevice[] = [
  {
    name: "iPhone",
    status: "This device",
    badge: "1 of 3",
    icon: "/v5/hiw-device-iphone.svg",
  },
  {
    name: "MacBook",
    status: "Connected",
    badge: "2 of 3",
    icon: "/v5/hiw-device-macbook.svg",
  },
]

const BADGE_CLASS =
  "shrink-0 rounded-[99px] border border-v5-border-faint bg-v5-surface-2 px-2.5 py-1 text-v5-caption-sm font-medium text-v5-text-secondary md:px-4 md:py-2 md:text-v5-caption"

function ConnectedRow({ name, status, badge, icon }: ConnectedDevice) {
  return (
    <li className="flex items-center gap-2 rounded-2xl border border-v5-border-light bg-v5-surface-1 p-2.5 md:h-[68px] md:gap-3 md:rounded-3xl md:p-4">
      <Image
        src={icon}
        alt=""
        width={32}
        height={32}
        className="size-[21px] shrink-0 md:size-8"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-v5-caption font-medium text-v5-white md:text-v5-body-s">
          {name}
        </span>
        <span className="text-v5-caption-sm font-medium text-v5-success md:text-v5-caption">
          {status}
        </span>
      </div>
      <span className={BADGE_CLASS}>{badge}</span>
    </li>
  )
}

function PendingRow() {
  return (
    <li className="flex items-center gap-2 rounded-2xl border border-dashed border-v5-border-faint bg-v5-surface-1/50 p-2.5 shadow-[0px_-4px_12px_0px_rgba(3,13,29,0.35)] md:h-[68px] md:gap-3 md:rounded-3xl md:p-4">
      <span className="relative size-[21px] shrink-0 md:size-8">
        <Image
          src="/v5/hiw-device-pending-ring.svg"
          alt=""
          width={32}
          height={32}
          className="size-full"
        />
        <Image
          src="/v5/hiw-device-pending-glyph.svg"
          alt=""
          width={16}
          height={16}
          className="absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </span>
      <span className="min-w-0 flex-1 text-v5-caption-sm font-medium text-v5-text-secondary md:text-v5-footnote">
        Waiting for device to join
      </span>
      <span className={BADGE_CLASS}>3 of 3</span>
    </li>
  )
}

function DeviceMock() {
  return (
    <div className="flex w-full max-w-[348px] flex-col gap-2 self-center rounded-2xl border border-v5-border-light bg-v5-surface-disabled p-5 md:w-[530px] md:max-w-none md:shrink-0 md:gap-3 md:self-auto md:rounded-3xl md:p-[30px]">
      <ul className="flex flex-col gap-2 md:gap-3">
        {CONNECTED.map((device) => (
          <ConnectedRow key={device.name} {...device} />
        ))}
        <PendingRow />
      </ul>
      <div className="flex h-[67px] flex-col gap-3 pt-6 md:h-[102px] md:gap-[18px] md:pt-[37px]">
        <div className="flex gap-[9px] pl-[7px] md:gap-[13px] md:pl-[10px]">
          {SHARE_BARS.map((bar) => (
            <span
              key={bar}
              className={`h-1.5 flex-1 rounded-2xl md:h-[9px] ${bar}`}
            />
          ))}
        </div>
        <p className="text-center text-v5-caption-sm font-normal text-v5-text-tertiary md:text-v5-footnote-relaxed">
          Vault key - distributed across 3 devices
        </p>
      </div>
    </div>
  )
}

export default function MultiDevice() {
  return (
    <section className="bg-v5-page pt-8 md:px-[30px] md:pt-[30px]">
      <DarkSplit
        rounding="top"
        eyebrow="Multi-device"
        title={
          <>
            Bring your
            <br />
            own devices.
          </>
        }
        body={
          <>
            <p>
              Phone, desktop, tablet - any device you already own becomes part
              of your vault.{" "}
              <strong className="font-semibold text-v5-text-primary">
                No hardware wallet required. No extra purchases.
              </strong>{" "}
              Just the devices in your pocket and on your desk.
            </p>
            <p>
              Together, your devices form a vault that no single one of them can
              access alone. If one is lost or stolen, your funds are safe.
            </p>
          </>
        }
        media={<DeviceMock />}
      />
    </section>
  )
}
