import Image from "next/image"
import { FaGithub, FaTelegramPlane } from "react-icons/fa"
import { FaDiscord, FaInstagram, FaXTwitter } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-16 px-4">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
          {/* Left side - Logo and socials */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src={"/images/vultisig-logo.svg"}
                alt="Vultisig logo"
                width={35}
                height={35}
              />
              <span className="text-white text-2xl sm:text-3xl font-bold">
                Vultisig
              </span>
            </div>

            <div className="flex divide-x divide-foreground/20 mb-6">
              {[
                {
                  href: "https://github.com/vultisig",
                  icon: <FaGithub />,
                  label: "GitHub",
                },
                {
                  href: "https://discord.gg/thq64eaYVN",
                  icon: <FaDiscord />,
                  label: "Discord",
                },
                {
                  href: "https://x.com/vultisig",
                  icon: <FaXTwitter />,
                  label: "X",
                },
                {
                  href: "https://t.me/vultisig",
                  icon: <FaTelegramPlane />,
                  label: "Telegram",
                },
                {
                  href: "https://www.instagram.com/vultisig",
                  icon: <FaInstagram />,
                  label: "Instagram",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2 pl-2 text-textSecondary hover:text-foreground"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <p className="text-gray-400 text-sm">© Copyright 2025 - Vultisig</p>
          </div>

          {/* Right side - Link columns */}
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            <div>
              <h4 className="text-white font-semibold mb-4">VULTISIG</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/how-it-works"
                    className="text-gray-400 hover:text-white"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  {/* <a href="#" className="text-gray-400 hover:text-white">
                    Backed By
                  </a> */}
                </li>
                <li>
                  <a href="/docs" className="text-gray-400 hover:text-white">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="/vult" className="text-gray-400 hover:text-white">
                    $VULT
                  </a>
                </li>
                {/* <li>
                  <a href="/download" className="text-gray-400 hover:text-white">
                    Extension
                  </a>
                </li> */}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">SUPPORT</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/support" className="text-gray-400 hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.vultisig.com/other/security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    Audits
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">LEGAL</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/termofservice"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
