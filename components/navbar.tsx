"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, Phone, Laptop, Monitor, Puzzle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 5)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {isAtTop && pathname === '/' && (
        <a href="/vult"
          className="
            fixed top-0 left-0 w-full z-[60] h-8 flex items-center justify-center text-sm font-normal
            bg-gradient-to-r from-[var(--border-color)] to-[#33e6bf]
            border-b border-blue-500
            text-white
            font-extrabold
          "
        >
          Join $VULT airdrop today
        </a>
      )}
      <nav className={`fixed ${isAtTop && pathname === '/' ? 'top-8' : 'top-0'} left-0 right-0 z-50 transition-all duration-300 ${isAtTop
        ? 'w-full max-w-[100vw] bg-transparent rounded-none px-0 pt-4'
        : 'top-6 inset-x-0 px-4 lg:px-2'
      } `}>
        <div className={`transition-all duration-300 w-full
          ${isAtTop
            ? 'px-4 lg:px-8 bg-[var(--background-secondary)]/90 backdrop-blur-md border border-transparent rounded-none lg:bg-transparent lg:backdrop-blur-0 lg:border-transparent'
            : 'bg-[var(--background-secondary)]/90 backdrop-blur-md border border-slate-700 rounded-2xl px-6 py-3'
          }
          lg:max-w-7xl lg:mx-auto
        `}>
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center">
              <img src={'/images/vultisig-logo.svg'} width={'25px'} height={'25px'}></img>
              <span className="text-white text-xl font-semibold pl-3">Vultisig</span>
            </a>

            <div className="hidden lg:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                    <span>Products</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-[var(--background-secondary)] border border-[var(--border-color)] shadow-lg rounded-xl p-2 min-w-[220px]">
                  <a href="/downloads" className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors">
                    <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                      <Image src="/images/navbar-product-1.png" alt="Apps" width={28} height={28} />
                    </div>
                    <span className="font-medium">Vultisig Apps</span>
                  </a>
                  <a href="/downloads" className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors">
                    <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                      <Image src="/images/navbar-product-4.png" alt="Extension" width={28} height={28} />
                    </div>
                    <span className="font-medium">Vultisig Extension</span>
                  </a>
                  <a href="/downloads" className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors">
                    <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                      <Image src="/images/navbar-product-3.png" alt="Web" width={28} height={28} />
                    </div>
                    <span className="font-medium">Vultisig Web</span>
                  </a>
                  {/* <a href="/downloads" className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors">
                    <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                      <Image src="/images/navbar-product-3.png" alt="Windows" width={28} height={28} />
                    </div>
                    <span className="font-medium">Vultisig Windows</span>
                  </a> */}
                </DropdownMenuContent>
              </DropdownMenu>
              <a href="/how-it-works" className="text-gray-300 hover:text-white ml-8">
                How It Works
              </a>
              {/* <a href="#" className="text-gray-300 hover:text-white ml-8">
                Backed By
              </a> */}
              <a href="/docs" className="text-gray-300 hover:text-white ml-8">
                Docs
              </a>
              <a href="/vult" className="text-gray-300 hover:text-white ml-8">
                $VULT
              </a>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center text-gray-300 hover:text-white cursor-pointer ml-8">
                    <span>Solutions</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-[var(--background-secondary)] border border-[var(--border-color)] shadow-lg rounded-xl p-2 min-w-[340px]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-1.png" alt="Funds & Treasuries" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Funds & Treasuries</div>
                        <div className="text-xs text-gray-300">Institutional grade security with cross-chain support</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-2.png" alt="Whales" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Whales</div>
                        <div className="text-xs text-gray-300">Protect and grow wealth across generations</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-3.png" alt="Payroll" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Payroll</div>
                        <div className="text-xs text-gray-300">Automate cross-chain payroll operations</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-4.png" alt="Retail" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Retail</div>
                        <div className="text-xs text-gray-300">One wallet for all of crypto</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-5.png" alt="DAOs" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">DAOs</div>
                        <div className="text-xs text-gray-300">Cross-chain multisig powered by Thorchain</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-6.png" alt="Financial Advisors" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Financial Advisors</div>
                        <div className="text-xs text-gray-300">Premier cross-chain wallet for your clients</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-7.png" alt="Ai Agents" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Ai Agents</div>
                        <div className="text-xs text-gray-300">Ai-enhanced MPC wallet infrastructure</div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>

            <div className="hidden lg:block">
              <a href="/downloads" className="text-gray-300 hover:text-white ml-8">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Download App</Button>
              </a>
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
              <div className="flex flex-col space-y-4">
                <button
                  className="flex items-center text-gray-300 hover:text-white cursor-pointer py-2 focus:outline-none"
                  onClick={() => setMobileProductsOpen((v) => !v)}
                  aria-expanded={mobileProductsOpen}
                  aria-controls="mobile-products-menu"
                  type="button"
                >
                  <span>Products</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileProductsOpen && (
                  <div id="mobile-products-menu" className="flex flex-col gap-1 pl-6">
                    <a href="/downloads" className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-product-1.png" alt="Mobile App" width={28} height={28} />
                      </div>
                      <span className="font-medium">Vultisig Mobile App</span>
                    </a>
                    <a href="/downloads" className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-product-2.png" alt="macOS" width={28} height={28} />
                      </div>
                      <span className="font-medium">Vultisig macOS</span>
                    </a>
                    <a href="/downloads" className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-product-3.png" alt="Windows" width={28} height={28} />
                      </div>
                      <span className="font-medium">Vultisig Windows</span>
                    </a>
                    <a href="/downloads" className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-product-4.png" alt="Extension" width={28} height={28} />
                      </div>
                      <span className="font-medium">Vultisig Extension</span>
                    </a>
                  </div>
                )}
                {/* <button
                  className="flex items-center text-gray-300 hover:text-white cursor-pointer py-2 focus:outline-none"
                  onClick={() => setMobileSolutionsOpen((v) => !v)}
                  aria-expanded={mobileSolutionsOpen}
                  aria-controls="mobile-solutions-menu"
                  type="button"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSolutionsOpen && (
                  <div id="mobile-solutions-menu" className="flex flex-col gap-1 pl-6">
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-1.png" alt="Funds & Treasuries" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Funds & Treasuries</div>
                        <div className="text-xs text-gray-300">Institutional grade security with cross-chain support</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-2.png" alt="Whales" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Whales</div>
                        <div className="text-xs text-gray-300">Protect and grow wealth across generations</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-3.png" alt="Payroll" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Payroll</div>
                        <div className="text-xs text-gray-300">Automate cross-chain payroll operations</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-4.png" alt="Retail" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Retail</div>
                        <div className="text-xs text-gray-300">One wallet for all of crypto</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-5.png" alt="DAOs" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">DAOs</div>
                        <div className="text-xs text-gray-300">Cross-chain multisig powered by Thorchain</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-6.png" alt="Financial Advisors" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Financial Advisors</div>
                        <div className="text-xs text-gray-300">Premier cross-chain wallet for your clients</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 px-3 py-3 rounded-lg text-white hover:bg-blue-900/40 transition-colors max-w-xs break-words">
                      <div className="w-10 h-10 bg-[#193B7A] rounded-lg flex items-center justify-center">
                        <Image src="/images/navbar-solution-7.png" alt="Ai Agents" width={28} height={28} />
                      </div>
                      <div>
                        <div className="font-medium">Ai Agents</div>
                        <div className="text-xs text-gray-300">Ai-enhanced MPC wallet infrastructure</div>
                      </div>
                    </div>
                  </div>
                )} */}
                <a href="/how-it-works" className="text-gray-300 hover:text-white py-2">
                  How It Works
                </a>
                {/* <a href="#" className="text-gray-300 hover:text-white py-2">
                  Backed By
                </a> */}
                <a href="/docs" className="text-gray-300 hover:text-white py-2">
                  Docs
                </a>
                <a href="/vult" className="text-gray-300 hover:text-white py-2">
                  $VULT
                </a>
              </div>
              <div className="pt-2">
                <a href="/downloads" className="text-gray-300 hover:text-white">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full">Download App</Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
