import { Github, MessageCircle, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
          {/* Left side - Logo and socials */}
          <div className="flex-shrink-0">
            <div className="flex items-center mb-6">
              <img src={'/images/vultisig-logo.svg'} width={'35px'} height={'35px'}></img>
              <span className="text-white text-2xl sm:text-3xl font-bold pl-1">Vultisig</span>
            </div>

            <div className="flex space-x-4 mb-6">
              <a href="https://github.com/vultisig" target="_blank" rel="noopener noreferrer">
                <img src={'/images/github-logo.svg'} width={'25px'} height={'25px'}></img>
              </a>
              <a href="https://discord.com/invite/54wEtGYxuv" target="_blank" rel="noopener noreferrer">
                <img src={'/images/discord-logo.svg'} width={'25px'} height={'25px'}></img>
              </a>
              <a href="https://x.com/vultisig" target="_blank" rel="noopener noreferrer">
                <img src={'/images/x-logo.svg'} width={'25px'} height={'25px'}></img>
              </a>
              <a href="https://t.me/vultisig" target="_blank" rel="noopener noreferrer">
                <img src={'/images/tg-logo.svg'} width={'25px'} height={'25px'}></img>
              </a>
              <a href="https://www.instagram.com/vultisig" target="_blank" rel="noopener noreferrer">
                <img src={'/images/instagram-logo.svg'} width={'25px'} height={'25px'}></img>
              </a>
              {/* <Github className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <MessageCircle className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" /> */}
            </div>

            <p className="text-gray-400 text-sm">© Copyright 2025 - Vultisig</p>
          </div>

          {/* Right side - Link columns */}
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            <div>
              <h4 className="text-white font-semibold mb-4">VULTISIG</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/how-it-works" className="text-gray-400 hover:text-white">
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
                  <a href="/faq" className="text-gray-400 hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="https://docs.vultisig.com/other/security" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    Audits
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">LEGAL</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white">
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
